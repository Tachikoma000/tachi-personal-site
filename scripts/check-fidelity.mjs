// Diffs built HTML text against the canonical arrays in the handoff refs.
// Exit 1 on any mismatch. Run after `npm run build`.
// Same trust model as port-content.mjs: extracted literals are pure data from
// this repo's own handoff files, evaluated in an empty vm sandbox.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { load } from 'cheerio';

const REFS = 'design_handoff_tachi_site/ui_kits/site';
let failures = 0;

function extractArray(file, name) {
  const source = readFileSync(path.join(REFS, file), 'utf8')
    .split('\n')
    .filter((l) => !/^\s*(meta|coverTitle):/.test(l))
    .join('\n');
  const match = source.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\}\\]);`));
  if (!match) throw new Error(`Could not find ${name} in ${file}`);
  return vm.runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 1000 });
}

const norm = (s) => s.normalize('NFC').replace(/\s+/g, ' ').trim();

function page(rel) {
  const $ = load(readFileSync(path.join('dist', rel), 'utf8'));
  // <br> and block-level .poem-line spans render as line breaks but contribute
  // no whitespace to .text(); add separators so extracted text matches
  // space-joined expectations.
  $('br').replaceWith(' ');
  $('.poem-line').each((_, el) => {
    $(el).append(' ');
  });
  return $;
}

function expectEqual(where, actual, expected) {
  if (norm(actual) !== norm(expected)) {
    failures++;
    console.error(`✗ ${where}\n  expected: ${norm(expected).slice(0, 120)}\n  actual:   ${norm(actual).slice(0, 120)}`);
  } else {
    console.log(`✓ ${where}`);
  }
}

// ——— poems: comparison retired 2026-07-25 ———
// All five poems that shipped in the design handoff have since been revised by
// the author — bodies, openings and excerpts alike:
//
//   the year the factory stopped   rewritten: mill-waking restart, new close,
//                                  proverb demoted out of the opening
//   If i get jollof and you get…   rewritten: a full movement for each brother
//   love in human form             revised: exhortative asides trimmed
//   this, that, and the other…     revised: four subtractions
//   the sound his back made        revised: signpost lines cut
//
// The handoff arrays therefore no longer describe the live poems, and comparing
// against them would only ever report on text the author has replaced. Rather
// than keep a loop that skips every case while still printing reassuring output,
// the poem comparison is retired. The essay and the book below are unrevised and
// remain guarded word for word — that is the part of this check still doing work.
//
// New poems were never in the handoff and were never compared. If a poem ever
// needs guarding again, the right source of truth is a snapshot of the live
// poem, not this bundle.
console.log('~ poems: comparison retired — all five handoff poems have been revised by the author (see comment)');

// ——— writings ———
const pieces = extractArray('WritingsScreen.ref.jsx', 'PIECES');
for (const piece of pieces) {
  const $ = page(`writings/${piece.id}/index.html`);
  expectEqual(`essay ${piece.id}: title`, $('.section-title').first().text(), piece.title);
  const expectedBlocks = piece.blocks
    .map((b) => (typeof b === 'string' ? b : b.h ? b.h : b.sig ? 'Ad Astra, Tachi' : ''))
    .join(' ');
  const actualBlocks = $('.essay').children().map((_, el) => $(el).text()).get().join(' ');
  expectEqual(`essay ${piece.id}: body`, actualBlocks, expectedBlocks);
  if (piece.note) {
    const expectedNote = piece.note.join(' ') + ' — tachi';
    const actualNote = $('.author-note p').map((_, el) => $(el).text()).get().join(' ');
    expectEqual(`essay ${piece.id}: author note`, actualNote, expectedNote);
  }
}

// ——— books ———
const works = extractArray('BookScreen.ref.jsx', 'WORKS');
for (const w of works) {
  const $ = page(`books/${w.id}/index.html`);
  expectEqual(`book ${w.id}: lede`, $('.book-detail .lede').text(), w.lede);
  expectEqual(`book ${w.id}: body`, $('.book-detail .col > p').last().text(), w.body);
  for (const s of w.stores) {
    const found = $(`.book-detail .stores a[href="${s.href}"]`);
    if (found.length !== 1 || norm(found.text()) !== norm(s.label)) {
      failures++;
      console.error(`✗ book ${w.id}: store link ${s.label} missing or wrong`);
    } else {
      console.log(`✓ book ${w.id}: store ${s.label}`);
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} fidelity failure(s)`);
  process.exit(1);
}
console.log('\nAll fidelity checks passed — the essay and the book match the handoff word for word. Poems are no longer compared (see the note above).');
