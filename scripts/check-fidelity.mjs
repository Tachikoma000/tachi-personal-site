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

// ——— poems ———
const poems = extractArray('PoemsScreen.ref.jsx', 'POEMS');
// Poems the author has deliberately rewritten since the handoff. Their bodies
// are no longer expected to match the handoff arrays — the living poem wins.
// Everything else about them (title, sub, excerpt, note) is still guarded, and
// every poem not listed here is still checked word for word.
const REVISED_SINCE_HANDOFF = new Map([
  ['year-factory-stopped', 'rewritten 2026-07-25: mill-waking restart + new closing movement'],
  ['jollof-fried-rice', 'rewritten 2026-07-25: a full movement for each brother'],
]);
// The five handoff poems are all "tellings"; their full entries (with excerpts)
// live on the tellings family page now, not the poems overview.
const tellingsIndex = page('poems/tellings/index.html');
for (const p of poems) {
  const $ = page(`poems/${p.id}/index.html`);
  expectEqual(`poem ${p.id}: title`, $('.section-title').first().text(), p.title);
  if (p.sub) expectEqual(`poem ${p.id}: sub`, $('.section-note').first().text(), p.sub);
  if (REVISED_SINCE_HANDOFF.has(p.id)) {
    console.log(`~ poem ${p.id}: body — author revision, not compared (${REVISED_SINCE_HANDOFF.get(p.id)})`);
  } else {
    const expectedPoem = p.stanzas.map((lines) => lines.join(' ')).join(' ') + ' — tachi';
    expectEqual(`poem ${p.id}: body`, $('.poem').first().text(), expectedPoem);
  }
  if (p.note) {
    const expectedNote = p.note.join(' ') + ' With love and gratitude, Tachi';
    const actualNote = $('.author-note p').map((_, el) => $(el).text()).get().join(' ');
    expectEqual(`poem ${p.id}: author note`, actualNote, expectedNote);
  }
  expectEqual(
    `tellings index: excerpt for ${p.id}`,
    tellingsIndex(`a[href$="/poems/${p.id}/"] .piece-excerpt`).text(),
    p.excerpt,
  );
}

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
const revisedNote = REVISED_SINCE_HANDOFF.size
  ? ` (${REVISED_SINCE_HANDOFF.size} author revision${REVISED_SINCE_HANDOFF.size > 1 ? 's' : ''} skipped, listed above)`
  : '';
console.log(`\nAll fidelity checks passed — every compared word matches the handoff${revisedNote}.`);
