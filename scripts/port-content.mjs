// One-time porter: extracts the canonical POEMS / PIECES / WORKS arrays from the
// design handoff .ref.jsx files and emits content/ files with verbatim text.
// The extracted literals are pure data (meta/coverTitle JSX lines are stripped);
// they are evaluated in an EMPTY vm sandbox — no process, no require, no scope —
// so anything that isn't a plain data literal fails instead of executing.
// Input is this repo's own committed design handoff; run locally at dev time only.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const REFS = 'design_handoff_tachi_site/ui_kits/site';
const YEAR = 2026; // all current poems + the essay carry "· 2026" in their ref meta

/** Pull `const NAME = [...];` out of a ref file and evaluate it as data. */
function extractArray(file, name) {
  const source = readFileSync(path.join(REFS, file), 'utf8')
    .split('\n')
    .filter((l) => !/^\s*(meta|coverTitle):/.test(l))
    .join('\n');
  const match = source.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\}\\]);`));
  if (!match) throw new Error(`Could not find ${name} in ${file}`);
  return vm.runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 1000 });
}

const q = JSON.stringify; // JSON string = valid YAML double-quoted scalar

function writeFileEnsured(rel, text) {
  mkdirSync(path.dirname(rel), { recursive: true });
  writeFileSync(rel, text, 'utf8');
  console.log(`wrote ${rel}`);
}

// ——— poems ———
const poems = extractArray('PoemsScreen.ref.jsx', 'POEMS');
poems.forEach((p, i) => {
  for (const st of p.stanzas) {
    if (!Array.isArray(st)) throw new Error(`Unexpected stanza shape in ${p.id} — extend the porter`);
  }
  const fm = [
    '---',
    `title: ${q(p.title)}`,
    ...(p.sub ? [`sub: ${q(p.sub)}`] : []),
    `excerpt: ${q(p.excerpt)}`,
    `illustration: ${q(p.illustration)}`,
    ...(p.tailpiece && p.tailpiece !== p.illustration ? [`tailpiece: ${q(p.tailpiece)}`] : []),
    `year: ${YEAR}`,
    `order: ${i + 1}`,
    '---',
  ].join('\n');
  const body = p.stanzas.map((lines) => lines.join('\n')).join('\n\n');
  writeFileEnsured(`content/poems/${p.id}/index.md`, `${fm}\n${body}\n`);
  if (p.note) writeFileEnsured(`content/poems/${p.id}/note.md`, p.note.join('\n\n') + '\n');
});

// ——— writings ———
const pieces = extractArray('WritingsScreen.ref.jsx', 'PIECES');
pieces.forEach((piece, i) => {
  const first = piece.blocks.find((b) => typeof b === 'string');
  const excerpt = first.slice(0, 160) + '…';
  const hasSig = piece.blocks.some((b) => typeof b === 'object' && b.sig);
  const fm = [
    '---',
    `title: ${q(piece.title)}`,
    ...(piece.sub ? [`sub: ${q(piece.sub)}`] : []),
    `excerpt: ${q(excerpt)}`,
    `illustration: ${q(piece.illustration)}`,
    `year: ${YEAR}`,
    `order: ${i + 1}`,
    ...(hasSig ? [`signoff: ${q('Ad Astra,')}`] : []),
    '---',
  ].join('\n');
  const body = piece.blocks
    .map((b) => {
      if (typeof b === 'string') return b;
      if (b.h) return `### ${b.h}`;
      if (b.sig) return null; // rendered from the signoff frontmatter
      throw new Error(`Unknown block type in ${piece.id}: ${JSON.stringify(b)} — extend the porter`);
    })
    .filter(Boolean)
    .join('\n\n');
  writeFileEnsured(`content/writings/${piece.id}/index.md`, `${fm}\n${body}\n`);
  if (piece.note) writeFileEnsured(`content/writings/${piece.id}/note.md`, piece.note.join('\n\n') + '\n');
});

// ——— books ———
const works = extractArray('BookScreen.ref.jsx', 'WORKS');
works.forEach((w) => {
  const yaml = [
    `title: ${q(w.title)}`,
    `coverLines: [${q('Handles,')}, ${q('Not Halos')}]`,
    `sub: ${q(w.sub)}`,
    `excerpt: ${q(w.excerpt)}`,
    `year: 2025`,
    `illustration: ${q(w.illustration)}`,
    `lede: ${q(w.lede)}`,
    `body: ${q(w.body)}`,
    'stores:',
    ...w.stores.map((s) => `  - { label: ${q(s.label)}, href: ${q(s.href)} }`),
  ].join('\n');
  writeFileEnsured(`content/books/${w.id}.yaml`, yaml + '\n');
});

console.log('port complete');
