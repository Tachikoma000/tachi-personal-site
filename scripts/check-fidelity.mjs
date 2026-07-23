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
  // <br> renders as a line break but contributes no whitespace to .text();
  // replace with a space so extracted text matches space-joined expectations.
  $('br').replaceWith(' ');
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
const poemsIndex = page('poems/index.html');
for (const p of poems) {
  const $ = page(`poems/${p.id}/index.html`);
  expectEqual(`poem ${p.id}: title`, $('.section-title').first().text(), p.title);
  if (p.sub) expectEqual(`poem ${p.id}: sub`, $('.section-note').first().text(), p.sub);
  const expectedPoem = p.stanzas.map((lines) => lines.join(' ')).join(' ') + ' — tachi';
  expectEqual(`poem ${p.id}: body`, $('.poem').first().text(), expectedPoem);
  if (p.note) {
    const expectedNote = p.note.join(' ') + ' With love and gratitude, Tachi';
    const actualNote = $('.author-note p').map((_, el) => $(el).text()).get().join(' ');
    expectEqual(`poem ${p.id}: author note`, actualNote, expectedNote);
  }
  expectEqual(
    `poems index: excerpt for ${p.id}`,
    poemsIndex(`a[href$="/poems/${p.id}/"] .piece-excerpt`).text(),
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
console.log('\nAll fidelity checks passed — every word matches the handoff.');
