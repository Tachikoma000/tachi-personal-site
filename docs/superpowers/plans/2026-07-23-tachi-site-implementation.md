# tachi.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production tachi personal site — an Astro static site recreating `design_handoff_tachi_site/` 1:1, with markdown-per-piece content, and deploy it to GitHub Pages from a public repo.

**Architecture:** Fully static Astro 6 site. All writing lives in root-level `content/` collections (markdown per piece + YAML for link lists), validated by zod schemas at build. The signature hour system is ~25 lines of vanilla JS (pre-paint script + dial listeners) driving `body[data-hour]`; the handoff's CSS custom properties do everything else. Deployed by GitHub Actions (`withastro/action@v6`) on push to `main`.

**Tech Stack:** Astro ^6, `@astrojs/rss`, `@astrojs/sitemap`, Fontsource (Cormorant Garamond, EB Garamond, Zen Kaku Gothic New), vitest (poem parser tests), cheerio (fidelity script only). No client framework.

**Authoritative visual spec:** `design_handoff_tachi_site/` — when in doubt, the prototype wins. Approved design: `docs/superpowers/specs/2026-07-23-tachi-site-design.md`.

**Conventions used throughout:**
- All shell commands run from the repo root `/Users/tachi/Documents/github-local/tachi-personal-site`.
- Components that *build* internal hrefs (TopBar, PathList) call `withBase()` themselves; components that *receive* an href (PieceEntry) get a final, already-based href from the caller.
- Every content string must be reproduced **verbatim** — curly quotes `“”’`, em-dashes `—`, middle dots `·`, the nbsp in "60 Hz", lowercase quirks like "jumped(all of us,". The port script (Task 5) and fidelity script (Task 12) enforce this.
- The port/fidelity scripts evaluate array literals extracted from this repo's own committed handoff files — trusted, local, dev-time-only input. They still evaluate inside an **empty `node:vm` sandbox** (no `process`, no `require`, no ambient scope) so anything that isn't pure data fails loudly instead of executing.

---

## File structure (end state)

```
tachi-personal-site/
├── .github/workflows/deploy.yml        # Pages CI (Task 14)
├── .gitignore
├── astro.config.mjs                    # site/base/sitemap (Task 1)
├── package.json  tsconfig.json
├── README.md                           # author's manual (Task 13)
├── design_handoff_tachi_site/          # untouched reference
├── docs/superpowers/{specs,plans}/
├── content/                            # ALL writing (Task 5)
│   ├── poems/<slug>/index.md           # 5 poems (+ this-that-other/note.md)
│   ├── writings/the-knock/{index.md,note.md}
│   ├── books/handles-not-halos.yaml
│   └── about/{bio.md,selected-works.yaml}
├── public/
│   ├── illustrations/*.svg             # 50 spots (Task 3)
│   └── favicon.svg                     # bird-creature copy
├── scripts/
│   ├── port-content.mjs                # one-time ref→content porter (Task 5)
│   └── check-fidelity.mjs              # built HTML vs refs diff (Task 12)
├── src/
│   ├── content.config.ts               # collections + schemas (Task 5)
│   ├── lib/{url.ts,poem.ts}            # base helper, stanza parser (Task 4)
│   ├── styles/
│   │   ├── global.css                  # import chain (Task 2)
│   │   ├── tokens/{colors,typography,spacing,motion}.css   # verbatim copies
│   │   └── {base,textures,prose,mobile}.css                # verbatim + documented additions to prose.css
│   ├── components/
│   │   ├── Sky.astro Washi.astro Spot.astro HourDial.astro          # Task 6
│   │   ├── Epigraph.astro PathList.astro                            # Task 6
│   │   ├── TopBar.astro SectionHeading.astro PieceEntry.astro       # Task 7
│   │   ├── AuthorNote.astro PoemBody.astro                          # Task 7
│   │   └── BookCover.astro StoreLinks.astro                         # Task 9
│   ├── layouts/Base.astro              # head, fonts, hour script, chrome (Task 6)
│   └── pages/
│       ├── index.astro                 # arrival (Task 6)
│       ├── poems/{index.astro,[slug].astro}      # Task 7
│       ├── writings/{index.astro,[slug].astro}   # Task 8
│       ├── books/{index.astro,[slug].astro}      # Task 9
│       ├── about.astro  404.astro                # Task 10
│       └── rss.xml.ts                            # Task 11
└── tests/poem.test.ts                  # Task 4
```

---

### Task 1: Scaffold the Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `src/pages/index.astro` (temporary placeholder)

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "tachi-personal-site",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "port-content": "node scripts/port-content.mjs",
    "fidelity": "node scripts/check-fidelity.mjs"
  }
}
```

- [ ] **Step 2: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tachikoma000.github.io',
  base: '/tachi-personal-site',
  integrations: [sitemap()],
});
```

(When a custom domain arrives later: set `site` to it, delete the `base` line. Nothing else changes — documented in Task 13's README.)

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "src/**/*", "tests/**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Write `.gitignore`**

```
node_modules/
dist/
.astro/
```

- [ ] **Step 5: Write temporary `src/pages/index.astro`** (replaced in Task 6; exists so the build has output to verify)

```astro
---
---
<html lang="en"><head><meta charset="UTF-8" /><title>tachi</title></head><body><h1>tachi</h1></body></html>
```

- [ ] **Step 6: Install dependencies**

Run:
```bash
node -v   # expect >= 20; CI uses Node 24
npm install astro @astrojs/rss @astrojs/sitemap @fontsource/cormorant-garamond @fontsource/eb-garamond @fontsource/zen-kaku-gothic-new
npm install -D vitest cheerio
```
Expected: installs succeed, `package-lock.json` created, astro resolves to ^6.

- [ ] **Step 7: Verify the build**

Run: `npm run build`
Expected: `Complete!` output; `dist/index.html` exists (check `ls dist/`).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src/pages/index.astro
git commit -m "feat: scaffold Astro project (site/base for GitHub Pages, sitemap)"
```

---

### Task 2: Port the CSS system

**Files:**
- Create: `src/styles/tokens/{colors,typography,spacing,motion}.css` (verbatim copies), `src/styles/{base,textures,prose,mobile}.css` (verbatim copies), `src/styles/global.css`
- Note: handoff `tokens/fonts.css` is only a Google Fonts `@import` — it is **not ported**; Fontsource imports in Base.astro (Task 6) replace it.

- [ ] **Step 1: Copy the eight CSS files verbatim**

Run:
```bash
mkdir -p src/styles/tokens
cp design_handoff_tachi_site/tokens/colors.css src/styles/tokens/colors.css
cp design_handoff_tachi_site/tokens/typography.css src/styles/tokens/typography.css
cp design_handoff_tachi_site/tokens/spacing.css src/styles/tokens/spacing.css
cp design_handoff_tachi_site/tokens/motion.css src/styles/tokens/motion.css
cp design_handoff_tachi_site/css/base.css src/styles/base.css
cp design_handoff_tachi_site/css/textures.css src/styles/textures.css
cp design_handoff_tachi_site/css/prose.css src/styles/prose.css
cp design_handoff_tachi_site/css/mobile.css src/styles/mobile.css
```
Expected: 8 files copied; `diff design_handoff_tachi_site/css/prose.css src/styles/prose.css` prints nothing.

- [ ] **Step 2: Write `src/styles/global.css`** (same order as handoff `styles.css`, minus fonts.css)

```css
@import './tokens/colors.css';
@import './tokens/typography.css';
@import './tokens/spacing.css';
@import './tokens/motion.css';
@import './base.css';
@import './textures.css';
@import './prose.css';
@import './mobile.css';
```

- [ ] **Step 3: Append production additions to `src/styles/prose.css`**

These promote inline styles from the `.ref.jsx` files into classes — every value comes from the refs. Append this block exactly (end of file):

```css

/* ————— production additions — values promoted from the handoff .ref.jsx inline styles ————— */
.piece-meta strong { font-weight: 500; }
a.home-mark { display: inline-block; }
.back-link { display: inline-block; font-family: var(--font-utility); font-weight: 300; font-size: var(--size-caption); letter-spacing: var(--track-nav); text-transform: lowercase; color: var(--ink-soft); margin-bottom: 2.2rem; }
.author-note { margin-bottom: 2.8rem; padding-bottom: 2.4rem; border-bottom: 1px solid var(--hairline); }
.author-note .note-label { font-family: var(--font-utility); font-weight: 300; font-size: var(--size-hint); letter-spacing: var(--track-poemtitle); text-transform: lowercase; color: var(--accent); margin-bottom: 1.4rem; }
.author-note p { font-style: italic; color: var(--ink-soft); margin-bottom: var(--ma-para); max-width: 56ch; }
.author-note p:last-child { margin-bottom: 0; }
.stanza-gap { display: block; height: 1.6rem; }
.essay p { margin-bottom: var(--ma-para); max-width: 58ch; }
.essay h3 { font-family: var(--font-display); font-weight: 400; font-size: 1.5rem; letter-spacing: 0.04em; margin: 2.8rem 0 1.1rem; }
.essay img { width: 100%; max-width: 58ch; display: block; margin: 2rem 0; border: 1px solid var(--hairline); }
.essay .essay-sig { margin-top: 2.4rem; }
.book-detail { display: flex; gap: 2.6rem; align-items: flex-start; flex-wrap: wrap; }
.book-detail .col { flex: 1 1 300px; }
.book-detail p { margin-bottom: 1.2rem; max-width: 54ch; }
.book-detail .stores { margin-top: 1.8rem; }
.about p { margin-bottom: var(--ma-para); max-width: 58ch; }
.about .about-lede { font-family: var(--font-display); font-style: italic; font-size: 1.35rem; line-height: 1.65; margin-bottom: 1.6rem; max-width: none; }
.about .about-motto { font-family: var(--font-display); font-style: italic; font-size: 1.2rem; margin-bottom: 1.6rem; }
.about .thread { margin: 2.4rem 0; }
.about .works-title { margin-top: 3.5rem; font-size: 1.7rem; }
.about .works-group { margin-top: 1.8rem; }
.about .works-group-label { font-family: var(--font-utility); font-weight: 300; font-size: var(--size-hint); letter-spacing: var(--track-poemtitle); text-transform: lowercase; color: var(--accent); margin-bottom: 0.4rem; }
.about .work-row { padding: 1.1rem 0.2rem; border-top: 1px solid var(--hairline); transition: border-color var(--transition-sky); }
.about .work-title { font-size: 1.05rem; }
.about .work-sub { font-style: italic; color: var(--ink-soft); font-size: 0.9rem; margin-top: 0.15rem; }
.about .work-links { margin-top: 0.6rem; }
.not-found { text-align: center; padding-top: 18vh; }
```

- [ ] **Step 4: Verify build still passes**

Run: `npm run build`
Expected: `Complete!` (CSS not yet imported by any page — this just proves nothing is syntactically broken).

- [ ] **Step 5: Commit**

```bash
git add src/styles
git commit -m "feat: port design-system CSS (verbatim tokens + documented prose additions)"
```

---

### Task 3: Ship the illustrations and favicon

**Files:**
- Create: `public/illustrations/*.svg` (50 files), `public/favicon.svg`

- [ ] **Step 1: Copy assets**

Run:
```bash
mkdir -p public/illustrations
cp design_handoff_tachi_site/assets/illustrations/*.svg public/illustrations/
cp design_handoff_tachi_site/assets/illustrations/bird-creature.svg public/favicon.svg
ls public/illustrations | wc -l
```
Expected: last command prints `50`.

- [ ] **Step 2: Commit**

```bash
git add public
git commit -m "feat: add 50 spot illustrations and bird-creature favicon"
```

---

### Task 4: Base-URL helper + poem parser (TDD)

**Files:**
- Create: `src/lib/url.ts`, `src/lib/poem.ts`
- Test: `tests/poem.test.ts`

- [ ] **Step 1: Write `src/lib/url.ts`** (no test — one-line normalization; exercised by every page build)

```ts
/** Prefix an absolute site path with the configured base (works whether
 *  Astro reports BASE_URL with or without a trailing slash). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}
```

- [ ] **Step 2: Write the failing tests `tests/poem.test.ts`**

Parsing rules (from the spec): blank line(s) = stanza break; newline = line break; lines are trimmed; a stanza containing exactly two `*` — one at the very start, one at the very end — is an italic stanza; `*text*` inside a line is inline emphasis; HTML is escaped; unicode passes through verbatim.

```ts
import { describe, expect, it } from 'vitest';
import { parsePoem, renderLine } from '../src/lib/poem';

describe('parsePoem', () => {
  it('splits stanzas on blank lines and lines on newlines', () => {
    expect(parsePoem('a\nb\n\nc\nd')).toEqual([
      { italic: false, lines: ['a', 'b'] },
      { italic: false, lines: ['c', 'd'] },
    ]);
  });

  it('treats runs of blank lines (with stray spaces) as one break', () => {
    expect(parsePoem('a\n\n  \n\nb')).toEqual([
      { italic: false, lines: ['a'] },
      { italic: false, lines: ['b'] },
    ]);
  });

  it('ignores leading/trailing blank lines and trims line whitespace', () => {
    expect(parsePoem('\n\n  a  \nb\n\n')).toEqual([{ italic: false, lines: ['a', 'b'] }]);
  });

  it('preserves unicode and punctuation verbatim', () => {
    const line = '“The best of it arrives.” — jumped(all of us,';
    expect(parsePoem(line)[0].lines[0]).toBe(line);
  });

  it('marks a stanza wrapped in a single asterisk pair as italic', () => {
    expect(parsePoem('*go softly\ninto the field*')).toEqual([
      { italic: true, lines: ['go softly', 'into the field'] },
    ]);
  });

  it('does NOT treat multiple inline emphases as an italic stanza', () => {
    expect(parsePoem('*this* and *that*')).toEqual([
      { italic: false, lines: ['*this* and *that*'] },
    ]);
  });
});

describe('renderLine', () => {
  it('escapes HTML', () => {
    expect(renderLine('a <b> & c')).toBe('a &lt;b&gt; &amp; c');
  });

  it('renders inline emphasis', () => {
    expect(renderLine('go *softly* now')).toBe('go <em>softly</em> now');
  });

  it('leaves an unpaired asterisk alone', () => {
    expect(renderLine('5 * 3')).toBe('5 * 3');
  });
});
```

- [ ] **Step 3: Run tests — verify they fail**

Run: `npm test`
Expected: FAIL — `Cannot find module '../src/lib/poem'` (or equivalent).

- [ ] **Step 4: Write `src/lib/poem.ts`**

```ts
export interface Stanza {
  lines: string[];
  italic: boolean;
}

/** Blank line(s) = stanza break; newline = line break; a stanza whose only
 *  two asterisks are its first and last characters renders entirely in <em>. */
export function parsePoem(body: string): Stanza[] {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
    .map((block) => {
      const asterisks = (block.match(/\*/g) ?? []).length;
      const wrapped = asterisks === 2 && block.startsWith('*') && block.endsWith('*');
      const text = wrapped ? block.slice(1, -1).trim() : block;
      return {
        italic: wrapped,
        lines: text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0),
      };
    });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Escape a poem line for HTML, then apply `*inline emphasis*`. */
export function renderLine(line: string): string {
  return escapeHtml(line).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
```

- [ ] **Step 5: Run tests — verify they pass**

Run: `npm test`
Expected: `9 passed`.

- [ ] **Step 6: Commit**

```bash
git add src/lib tests
git commit -m "feat: withBase helper and TDD'd poem stanza parser"
```

---

### Task 5: Content collections + port all content from the refs

**Files:**
- Create: `src/content.config.ts`, `scripts/port-content.mjs`, `content/about/bio.md`, `content/about/selected-works.yaml`
- Generated by script: `content/poems/*/index.md` (5), `content/poems/this-that-other/note.md`, `content/writings/the-knock/{index.md,note.md}`, `content/books/handles-not-halos.yaml`

**Why a port script instead of hand-transcription:** ~400 lines of poetry with `\uXXXX` escapes in the refs. Evaluating the refs' own array literals (in an empty vm sandbox) guarantees character-exact output; hand-typing does not. The script is also the foundation of Task 12's fidelity checker.

- [ ] **Step 1: Write `src/content.config.ts`**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { readdirSync } from 'node:fs';

const ILLUSTRATIONS = readdirSync('public/illustrations')
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace(/\.svg$/, ''));

const illustration = z.string().refine(
  (name) => ILLUSTRATIONS.includes(name),
  (name) => ({ message: `Unknown illustration "${name}" — must match a file in public/illustrations/` }),
);

const pieceSchema = z.object({
  title: z.string(),
  sub: z.string().optional(),
  excerpt: z.string(),
  illustration,
  tailpiece: illustration.optional(),
  year: z.number().int(),
  order: z.number().int(),
});

const dirSlug = (suffix: string) => ({ entry }: { entry: string }) => entry.replace(suffix, '');

const poems = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './content/poems', generateId: dirSlug('/index.md') }),
  schema: pieceSchema,
});

const poemNotes = defineCollection({
  loader: glob({ pattern: '*/note.md', base: './content/poems', generateId: dirSlug('/note.md') }),
});

const writings = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './content/writings', generateId: dirSlug('/index.md') }),
  schema: pieceSchema.extend({ signoff: z.string().optional() }),
});

const writingNotes = defineCollection({
  loader: glob({ pattern: '*/note.md', base: './content/writings', generateId: dirSlug('/note.md') }),
});

const books = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './content/books', generateId: dirSlug('.yaml') }),
  schema: z.object({
    title: z.string(),
    coverLines: z.array(z.string()),
    sub: z.string(),
    excerpt: z.string(),
    year: z.number().int(),
    illustration,
    lede: z.string(),
    body: z.string(),
    stores: z.array(z.object({ label: z.string(), href: z.string().url() })),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'bio.md', base: './content/about', generateId: () => 'bio' }),
  schema: z.object({ lede: z.string(), motto: z.string(), thread: z.string() }),
});

const selectedWorks = defineCollection({
  loader: glob({ pattern: 'selected-works.yaml', base: './content/about', generateId: () => 'selected-works' }),
  schema: z.object({
    groups: z.array(
      z.object({
        group: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            italic: z.boolean().optional(),
            sub: z.string().nullable().optional(),
            links: z.array(z.object({ label: z.string(), href: z.string().url() })),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { poems, poemNotes, writings, writingNotes, books, about, selectedWorks };
```

- [ ] **Step 2: Write `scripts/port-content.mjs`**

```js
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
```

- [ ] **Step 3: Run the porter and spot-check**

Run:
```bash
npm run port-content
head -12 content/poems/love-in-human-form/index.md
head -6 content/writings/the-knock/index.md
cat content/books/handles-not-halos.yaml
```
Expected: 9 `wrote …` lines then `port complete`. The poem file shows the frontmatter then "If you want to know what love is," etc. The book YAML shows the nbsp inside `"60 Hz"` (invisible but present — verify with `grep -c $' ' content/books/handles-not-halos.yaml` → `2`, one in excerpt, one in lede).

- [ ] **Step 4: Hand-write `content/about/bio.md`** (About copy is JSX-embedded, small, and hand-ported here verbatim from `AboutScreen.ref.jsx`)

```markdown
---
lede: "Tachi is the pen of Jephthah Akene."
motto: "Handles, not halos."
thread: "physics → mechanical engineering → spacecraft & instruments → ai → playgrounds & lattivox labs → rig · ryzome · arc → a novel → this quiet place"
---
Every story earns its teller, so let me account for mine. It begins in Lagos, in a loud and loving house of five boys, where a curious child crept into the storehouse to open the bodies of dead radios and ask them what made them sing. I have been asking that question ever since. I asked it of heat, and it became instruments that measure the smallest whispers of energy. I asked it of other worlds, and it became probes built to taste the breath of moons and regolith. I asked it of machines, and it became Playgrounds, where I build with Rig, Ryzome, and the ARC ecosystem. I ask it still, of quiet anomalies at the edge of known physics, under the roof of Lattivox Labs. The boy with the screwdriver never left. He only found bigger radios.

But an engineer's ledger is half a life. The other half lives here. The physicist and the poet were never rivals; they are twin apprentices of the same master, light, and what passes through us. So I write. Poems, musings, stories, a novel, each one another way of asking the older questions, the ones no instrument can measure. Who are we? What are we for? Where do we belong in this vast and tender world? I do not write because I have the answers. I write because the asking itself is a way of being alive, and because beauty, Monet's water, Hiroshige's skies, ink on paper, has always felt to me like evidence of something worth pursuing.

You will not find my face here. Where I come from, the drum outlives the drummer, and a story well told needs no portrait of its teller. Only my works, and the hand behind the ink.
```

- [ ] **Step 5: Hand-write `content/about/selected-works.yaml`** (URLs verbatim from `AboutScreen.ref.jsx`)

```yaml
groups:
  - group: "fiction"
    items:
      - title: "Handles, Not Halos"
        italic: true
        sub: "a novel"
        links:
          - { label: "barnes & noble", href: "https://www.barnesandnoble.com/w/handles-not-halos-tachi/1148448873" }
          - { label: "apple books", href: "https://books.apple.com/at/book/handles-not-halos/id6753576884" }
          - { label: "everand", href: "https://www.everand.com/book/927296672/Handles-Not-Halos" }
  - group: "research & instruments"
    items:
      - title: "An open system differential vacuum calorimeter"
        sub: "Journal of Thermal Analysis and Calorimetry, 150, 9995–10005 (2025)"
        links:
          - { label: "springer", href: "https://link.springer.com/article/10.1007/s10973-025-14348-9" }
      - title: "A solid-state, open-system, differential calorimeter"
        sub: "Review of Scientific Instruments, 91, 095102 (2020)"
        links:
          - { label: "aip", href: "https://pubs.aip.org/aip/rsi/article-abstract/91/9/095102/910247/A-solid-state-open-system-differential-calorimeter" }
      - title: "VESPAIO"
        sub: "Volatile Evolution Sampling Probe for Advanced In-Situ Operation, Southwest Research Institute"
        links:
          - { label: "swri", href: "https://www.swri.org/what-we-do/internal-research-development/2021/earth-space/vespaio-volatile-evolution-sampling-probe-advanced-situ-operation-15-r8934" }
      - title: "Raman spectral assays of planetary returned samples and terrestrial analogs"
        sub: "Southwest Research Institute"
        links:
          - { label: "swri", href: "https://www.swri.org/what-we-do/internal-research-development/2021/earth-space/capability-development-raman-spectral-assays-of-planetary-returned-samples-field-based-terrestrial-analogs-15-r6083" }
      - title: "Far-UV studies of lunar regolith simulants"
        sub: "LunGradCon 2021"
        links:
          - { label: "abstract", href: "https://impact.colorado.edu/lungradcon/2021/abstracts/Gimar_LunGradCon2021_Abstract.pdf" }
      - title: "AAS Division for Planetary Sciences meeting abstract"
        sub: "2022"
        links:
          - { label: "ads", href: "https://ui.adsabs.harvard.edu/abs/2022DPS....5452109M/abstract" }
      - title: "NASA TechPort project"
        sub: null
        links:
          - { label: "techport", href: "https://techport.nasa.gov/projects/145078" }
```

- [ ] **Step 6: Verify collections load and validate**

Run: `npx astro sync && npm run build`
Expected: sync generates types without schema errors; build completes. **Contingency:** if the glob loader rejects `.yaml` parsing, change the two YAML files to `.json` (port script: emit `JSON.stringify(obj, null, 2)`), update the two glob patterns to `*.json`/`selected-works.json` — schemas unchanged.

- [ ] **Step 7: Commit**

```bash
git add src/content.config.ts scripts/port-content.mjs content
git commit -m "feat: content collections with schemas; port all writing from handoff refs"
```

---

### Task 6: Base layout, chrome components, hour system, arrival page

**Files:**
- Create: `src/components/{Sky,Washi,Spot,HourDial,Epigraph,PathList}.astro`, `src/layouts/Base.astro`
- Modify: `src/pages/index.astro` (replace placeholder with the real arrival screen)

- [ ] **Step 1: Write `src/components/Sky.astro`**

```astro
<div class="sky" aria-hidden="true" style="height:52vh"></div>
```

- [ ] **Step 2: Write `src/components/Washi.astro`**

```astro
<div class="washi" aria-hidden="true"></div>
```

- [ ] **Step 3: Write `src/components/Spot.astro`**

```astro
---
import { withBase } from '../lib/url';

interface Props {
  name: string;
  size?: number;
  style?: string;
  alt?: string;
}
const { name, size = 88, style, alt = '' } = Astro.props;
---
<span class="spot" style={`width:${size}px;height:${size}px;${style ?? ''}`} aria-hidden={alt ? undefined : 'true'}>
  <img src={withBase(`/illustrations/${name}.svg`)} alt={alt} />
</span>
```

- [ ] **Step 4: Write `src/components/HourDial.astro`** (markup + all dial behavior)

```astro
---
const HOURS = [
  ['dawn', 'dawn'],
  ['morning', 'morning'],
  ['midday', 'midday'],
  ['dusk', 'dusk'],
  ['bleue', 'l’heure bleue'],
  ['night', 'night'],
] as const;
---
<div class="dial floating" role="group" aria-label="Preview the light at different hours">
  {HOURS.map(([id, label]) => (
    <button data-hour={id} aria-pressed="false">{label}</button>
  ))}
</div>

<script>
  const KEY = 'tachi-hour';
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.dial button'));

  const sync = () => {
    const current = document.body.dataset.hour;
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.hour === current));
  };

  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      document.body.dataset.hour = btn.dataset.hour!;
      try {
        sessionStorage.setItem(KEY, btn.dataset.hour!);
      } catch {}
      sync();
    });
  }
  sync();
</script>
```

- [ ] **Step 5: Write `src/components/Epigraph.astro`**

```astro
---
interface Props {
  attribution?: string;
  style?: string;
}
const { attribution, style } = Astro.props;
---
<blockquote class="epigraph" style={style}>
  <slot />
  {attribution && <span class="attr">{`— ${attribution}`}</span>}
</blockquote>
```

- [ ] **Step 6: Write `src/components/PathList.astro`**

```astro
---
import { withBase } from '../lib/url';

interface Props {
  paths: { href: string; name: string; hint?: string }[];
  style?: string;
}
const { paths, style } = Astro.props;
---
<nav class="paths" aria-label="Site sections" style={style}>
  {paths.map((p) => (
    <a href={withBase(p.href)}>
      <span class="path-name">{p.name}</span>
      {p.hint && <span class="path-hint">{p.hint}</span>}
    </a>
  ))}
</nav>
```

- [ ] **Step 7: Write `src/layouts/Base.astro`** — head, fonts, pre-paint hour script, fixed chrome

The pre-paint script is deliberately render-blocking and sits first inside `<body>` (it must run before anything paints, and `document.body` must exist). The SSR fallback `data-hour="midday"` covers no-JS visitors — palette stays midday, dial inert, everything else works.

```astro
---
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/300-italic.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/eb-garamond/400.css';
import '@fontsource/eb-garamond/500.css';
import '@fontsource/eb-garamond/400-italic.css';
import '@fontsource/zen-kaku-gothic-new/300.css';
import '@fontsource/zen-kaku-gothic-new/400.css';
import '../styles/global.css';
import Sky from '../components/Sky.astro';
import Washi from '../components/Washi.astro';
import HourDial from '../components/HourDial.astro';
import { withBase } from '../lib/url';

interface Props {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
}
const { title, description, ogType = 'website' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={ogType} />
    <link rel="icon" type="image/svg+xml" href={withBase('/favicon.svg')} />
    <link rel="alternate" type="application/rss+xml" title="tachi" href={withBase('/rss.xml')} />
    <link rel="sitemap" href={withBase('/sitemap-index.xml')} />
  </head>
  <body data-hour="midday">
    <script is:inline>
      (function () {
        var h = null;
        try {
          h = sessionStorage.getItem('tachi-hour');
        } catch (e) {}
        var VALID = ['dawn', 'morning', 'midday', 'dusk', 'bleue', 'night'];
        if (VALID.indexOf(h) === -1) {
          var n = new Date().getHours();
          h =
            n >= 5 && n < 8 ? 'dawn'
            : n >= 8 && n < 12 ? 'morning'
            : n >= 12 && n < 16 ? 'midday'
            : n >= 16 && n < 19 ? 'dusk'
            : n >= 19 && n < 21 ? 'bleue'
            : 'night';
        }
        document.body.setAttribute('data-hour', h);
      })();
    </script>
    <Sky />
    <Washi />
    <main class="page"><slot /></main>
    <HourDial />
  </body>
</html>
```

- [ ] **Step 8: Replace `src/pages/index.astro` with the arrival screen** (copy verbatim from `ArrivalScreen.ref.jsx`; hints match the handoff paths)

```astro
---
import Base from '../layouts/Base.astro';
import Spot from '../components/Spot.astro';
import Epigraph from '../components/Epigraph.astro';
import PathList from '../components/PathList.astro';
---
<Base title="tachi — handles, not halos" description="writings · poems · musings · beauty — the personal site of the writer tachi">
  <section class="view" style="text-align:center;padding-top:15vh">
    <Spot name="bird-creature" size={104} style="margin:0 auto 2.2rem" />
    <h1 style="font-family:var(--font-display);font-weight:300;font-size:var(--size-hero);letter-spacing:var(--track-hero);text-indent:var(--track-hero);text-transform:lowercase;transition:color var(--transition-sky)">tachi</h1>
    <p class="whisper" style="margin-top:0.9rem">writings · poems · musings · beauty</p>
    <Epigraph attribution="the knock" style="margin-top:4.2rem;max-width:none">“The best of it arrives. It is not made.”</Epigraph>
    <PathList
      style="margin-top:5.5rem"
      paths={[
        { href: '/poems/', name: 'Poems', hint: 'the shorter breaths' },
        { href: '/writings/', name: 'Writings', hint: 'essays & musings' },
        { href: '/books/', name: 'Books', hint: 'the longer works' },
        { href: '/about/', name: 'About', hint: 'the hand behind the ink' },
      ]}
    />
  </section>
</Base>
```

- [ ] **Step 9: Build and verify the arrival HTML**

Run:
```bash
npm run build
grep -c 'data-hour="midday"' dist/index.html                          # expect 1 (SSR fallback)
grep -c 'the shorter breaths' dist/index.html                          # expect 1
grep -c 'The best of it arrives' dist/index.html                       # expect 1
grep -c '/tachi-personal-site/illustrations/bird-creature.svg' dist/index.html   # expect >= 1 (base-prefixed)
grep -c 'l’heure bleue' dist/index.html                                # expect 1 (dial label)
```
Expected: counts as annotated.

- [ ] **Step 10: Smoke-check in a browser**

Run: `npm run dev` then open `http://localhost:4321/tachi-personal-site/` (note the base path).
Expected: sky gradient, washi grain, centered bird + "tachi" wordmark, path list, floating dial; clicking "night" flips the palette smoothly over ~2.4s; reload keeps night (sessionStorage).

- [ ] **Step 11: Commit**

```bash
git add src/components src/layouts src/pages/index.astro
git commit -m "feat: base layout with hour system, chrome components, arrival page"
```

---

### Task 7: Poems — shared piece components, index, detail

**Files:**
- Create: `src/components/{TopBar,SectionHeading,PieceEntry,AuthorNote,PoemBody}.astro`, `src/pages/poems/index.astro`, `src/pages/poems/[slug].astro`

- [ ] **Step 1: Write `src/components/TopBar.astro`**

```astro
---
import Spot from './Spot.astro';
import { withBase } from '../lib/url';

interface Props {
  active?: 'poems' | 'writings' | 'books' | 'about';
}
const { active } = Astro.props;
const items = [
  { id: 'poems', label: 'poems', href: '/poems/' },
  { id: 'writings', label: 'writings', href: '/writings/' },
  { id: 'books', label: 'books', href: '/books/' },
  { id: 'about', label: 'about', href: '/about/' },
] as const;
---
<div class="topbar">
  <a class="home-mark" aria-label="Return to arrival" href={withBase('/')}>
    <Spot name="bird-creature" size={34} />
  </a>
  <nav class="topnav">
    {items.map((it) => (
      <a href={withBase(it.href)} class={active === it.id ? 'here' : undefined}>{it.label}</a>
    ))}
  </nav>
</div>
```

- [ ] **Step 2: Write `src/components/SectionHeading.astro`**

```astro
---
interface Props {
  title: string;
  note?: string;
}
const { title, note } = Astro.props;
---
<header>
  <h2 class="section-title">{title}</h2>
  {note && <p class="section-note">{note}</p>}
</header>
```

- [ ] **Step 3: Write `src/components/PieceEntry.astro`** (meta strings: `poem · 2026 · by tachi` with weighted byline, or `essay · 2026` / `novel · 2025` without — never a dangling dot)

```astro
---
import Spot from './Spot.astro';

interface Props {
  title: string;
  sub?: string;
  excerpt?: string;
  kind: string;
  year: number;
  byline?: boolean;
  href: string;
  illustration?: string;
}
const { title, sub, excerpt, kind, year, byline = false, href, illustration } = Astro.props;
---
<a class="piece piece-link" href={href} style="display:block;color:inherit">
  <div style="display:flex;gap:1.8rem;align-items:center;justify-content:space-between">
    <div style="min-width:0">
      <div class="piece-title">{title}</div>
      {sub && <div class="piece-sub">{sub}</div>}
      {excerpt && <p class="piece-excerpt">{excerpt}</p>}
      <div class="piece-meta">
        {byline ? <>{`${kind} · ${year} · `}<strong>by tachi</strong></> : `${kind} · ${year}`}
      </div>
    </div>
    {illustration && <Spot name={illustration} size={72} style="flex:none" />}
  </div>
</a>
```

- [ ] **Step 4: Write `src/components/AuthorNote.astro`**

```astro
---
interface Props {
  label: string;
}
---
<div class="author-note">
  <div class="note-label">{Astro.props.label}</div>
  <slot />
</div>
```

- [ ] **Step 5: Write `src/components/PoemBody.astro`**

```astro
---
import Spot from './Spot.astro';
import { parsePoem, renderLine } from '../lib/poem';

interface Props {
  body: string;
  tailpiece?: string;
}
const { body, tailpiece } = Astro.props;
const stanzas = parsePoem(body);
---
<div class="poem">
  {stanzas.map((st) => {
    const html = st.lines.map((line) => renderLine(line) + '<br>').join('');
    return (
      <>
        {st.italic ? <em set:html={html} /> : <Fragment set:html={html} />}
        <span class="stanza-gap"></span>
      </>
    );
  })}
  <em>— tachi</em>
</div>
{tailpiece && <Spot name={tailpiece} size={72} style="margin:3.2rem auto 0" />}
```

- [ ] **Step 6: Write `src/pages/poems/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import TopBar from '../../components/TopBar.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import PieceEntry from '../../components/PieceEntry.astro';
import { withBase } from '../../lib/url';

const poems = (await getCollection('poems')).sort((a, b) => a.data.order - b.data.order);
---
<Base title="poems — tachi" description="the shorter breaths — poems by tachi">
  <section class="view">
    <TopBar active="poems" />
    <SectionHeading title="Poems" note="the shorter breaths" />
    {poems.map((p) => (
      <PieceEntry
        title={p.data.title}
        sub={p.data.sub}
        excerpt={p.data.excerpt}
        kind="poem"
        year={p.data.year}
        byline={true}
        href={withBase(`/poems/${p.id}/`)}
        illustration={p.data.illustration}
      />
    ))}
  </section>
</Base>
```

- [ ] **Step 7: Write `src/pages/poems/[slug].astro`**

```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import TopBar from '../../components/TopBar.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import AuthorNote from '../../components/AuthorNote.astro';
import PoemBody from '../../components/PoemBody.astro';
import { withBase } from '../../lib/url';

export async function getStaticPaths() {
  const poems = await getCollection('poems');
  return poems.map((poem) => ({ params: { slug: poem.id }, props: { poem } }));
}
const { poem } = Astro.props;
const note = await getEntry('poemNotes', poem.id);
const NoteContent = note ? (await render(note)).Content : null;
---
<Base title={`${poem.data.title} — tachi`} description={poem.data.excerpt} ogType="article">
  <section class="view">
    <TopBar active="poems" />
    <a class="back-link" href={withBase('/poems/')}>← the shorter breaths</a>
    <SectionHeading title={poem.data.title} note={poem.data.sub} />
    {NoteContent && (
      <AuthorNote label="a note from the author">
        <NoteContent />
        <p>With love and gratitude,<br />Tachi</p>
      </AuthorNote>
    )}
    <PoemBody body={poem.body ?? ''} tailpiece={poem.data.tailpiece ?? poem.data.illustration} />
  </section>
</Base>
```

- [ ] **Step 8: Build and verify**

Run:
```bash
npm run build
ls dist/poems                                                    # expect 5 slug dirs + index.html
grep -c 'the shorter breaths' dist/poems/index.html              # expect 1 (section note)
grep -c 'by tachi' dist/poems/index.html                         # expect 5
grep -c 'a note from the author' dist/poems/this-that-other/index.html   # expect 1
grep -c 'Come, sit. The floor is cool.' dist/poems/jollof-fried-rice/index.html  # expect >= 1
grep -c 'stanza-gap' dist/poems/love-in-human-form/index.html    # expect 9 (9 stanzas)
grep -c '— tachi' dist/poems/love-in-human-form/index.html       # expect >= 1
```
Expected: counts as annotated (the love-in-human-form poem has 9 stanzas in the ref).

- [ ] **Step 9: Commit**

```bash
git add src/components src/pages/poems
git commit -m "feat: poems index and detail pages with piece components"
```

---

### Task 8: Writings — index and essay detail

**Files:**
- Create: `src/pages/writings/index.astro`, `src/pages/writings/[slug].astro`

- [ ] **Step 1: Write `src/pages/writings/index.astro`** (section note verbatim from `WritingsScreen.ref.jsx`)

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import TopBar from '../../components/TopBar.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import PieceEntry from '../../components/PieceEntry.astro';
import { withBase } from '../../lib/url';

const writings = (await getCollection('writings')).sort((a, b) => a.data.order - b.data.order);
---
<Base title="writings — tachi" description="essays, musings, and things that arrived unbidden">
  <section class="view">
    <TopBar active="writings" />
    <SectionHeading title="Writings" note="essays, musings, and things that arrived unbidden" />
    {writings.map((w) => (
      <PieceEntry
        title={w.data.title}
        sub={w.data.sub}
        excerpt={w.data.excerpt}
        kind="essay"
        year={w.data.year}
        href={withBase(`/writings/${w.id}/`)}
        illustration={w.data.illustration}
      />
    ))}
  </section>
</Base>
```

- [ ] **Step 2: Write `src/pages/writings/[slug].astro`**

```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import TopBar from '../../components/TopBar.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import AuthorNote from '../../components/AuthorNote.astro';
import { withBase } from '../../lib/url';

export async function getStaticPaths() {
  const writings = await getCollection('writings');
  return writings.map((writing) => ({ params: { slug: writing.id }, props: { writing } }));
}
const { writing } = Astro.props;
const { Content } = await render(writing);
const note = await getEntry('writingNotes', writing.id);
const NoteContent = note ? (await render(note)).Content : null;
---
<Base title={`${writing.data.title} — tachi`} description={writing.data.excerpt} ogType="article">
  <section class="view">
    <TopBar active="writings" />
    <a class="back-link" href={withBase('/writings/')}>← the writings</a>
    <SectionHeading title={writing.data.title} note={writing.data.sub} />
    {NoteContent && (
      <AuthorNote label="a note, before we begin">
        <NoteContent />
        <p>— tachi</p>
      </AuthorNote>
    )}
    <div class="essay">
      <Content />
      {writing.data.signoff && (
        <p class="essay-sig">{writing.data.signoff}<br /><em>Tachi</em></p>
      )}
    </div>
  </section>
</Base>
```

- [ ] **Step 3: Build and verify**

Run:
```bash
npm run build
grep -c 'a note, before we begin' dist/writings/the-knock/index.html   # expect 1
grep -c '<h3' dist/writings/the-knock/index.html                       # expect 2 (The Field, The Door)
grep -c 'Ad Astra,' dist/writings/the-knock/index.html                 # expect 1
grep -c 'Be home.' dist/writings/the-knock/index.html                  # expect 1
grep -c 'essay · 2026' dist/writings/index.html                        # expect 1
```
Expected: counts as annotated.

- [ ] **Step 4: Commit**

```bash
git add src/pages/writings
git commit -m "feat: writings index and essay detail with author's note and sign-off"
```

---

### Task 9: Books — cover, store links, index, detail

**Files:**
- Create: `src/components/{BookCover,StoreLinks}.astro`, `src/pages/books/index.astro`, `src/pages/books/[slug].astro`

- [ ] **Step 1: Write `src/components/BookCover.astro`** (mobile.css overrides the inline width with `!important` — by design)

```astro
---
interface Props {
  coverLines: string[];
  author?: string;
  width?: number;
}
const { coverLines, author = 'a novel · tachi', width = 190 } = Astro.props;
---
<div class="cover" style={`width:${width}px;flex:0 0 ${width}px`}>
  <div class="cover-title">
    {coverLines.map((line, i) => (
      <>{line}{i < coverLines.length - 1 && <br />}</>
    ))}
  </div>
  <div class="cover-author">{author}</div>
</div>
```

- [ ] **Step 2: Write `src/components/StoreLinks.astro`**

```astro
---
interface Props {
  links: { label: string; href: string }[];
}
const { links } = Astro.props;
---
<div class="stores">
  {links.map((l) => (
    <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
  ))}
</div>
```

- [ ] **Step 3: Write `src/pages/books/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import TopBar from '../../components/TopBar.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import PieceEntry from '../../components/PieceEntry.astro';
import { withBase } from '../../lib/url';

const books = (await getCollection('books')).sort((a, b) => b.data.year - a.data.year);
---
<Base title="books — tachi" description="the longer works — books by tachi">
  <section class="view">
    <TopBar active="books" />
    <SectionHeading title="Books" note="the longer works" />
    {books.map((b) => (
      <PieceEntry
        title={b.data.title}
        sub={b.data.sub}
        excerpt={b.data.excerpt}
        kind="novel"
        year={b.data.year}
        href={withBase(`/books/${b.id}/`)}
        illustration={b.data.illustration}
      />
    ))}
  </section>
</Base>
```

- [ ] **Step 4: Write `src/pages/books/[slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import TopBar from '../../components/TopBar.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import BookCover from '../../components/BookCover.astro';
import StoreLinks from '../../components/StoreLinks.astro';
import { withBase } from '../../lib/url';

export async function getStaticPaths() {
  const books = await getCollection('books');
  return books.map((book) => ({ params: { slug: book.id }, props: { book } }));
}
const { book } = Astro.props;
---
<Base title={`${book.data.title} — tachi`} description={book.data.excerpt} ogType="article">
  <section class="view">
    <TopBar active="books" />
    <a class="back-link" href={withBase('/books/')}>← the shelf</a>
    <SectionHeading title={book.data.title} note={book.data.sub} />
    <div class="book-detail">
      <BookCover coverLines={book.data.coverLines} />
      <div class="col">
        <p class="lede">{book.data.lede}</p>
        <p>{book.data.body}</p>
        <StoreLinks links={book.data.stores} />
      </div>
    </div>
  </section>
</Base>
```

- [ ] **Step 5: Build and verify**

Run:
```bash
npm run build
grep -c '← the shelf' dist/books/handles-not-halos/index.html          # expect 1
grep -c 'a novel · tachi' dist/books/handles-not-halos/index.html      # expect 1 (cover author line)
grep -c 'barnesandnoble.com' dist/books/handles-not-halos/index.html   # expect 1
grep -c 'everand.com' dist/books/handles-not-halos/index.html          # expect 1
grep -c 'books.apple.com' dist/books/handles-not-halos/index.html      # expect 1
grep -c 'novel · 2025' dist/books/index.html                           # expect 1
```
Expected: counts as annotated.

- [ ] **Step 6: Commit**

```bash
git add src/components/BookCover.astro src/components/StoreLinks.astro src/pages/books
git commit -m "feat: books index and detail with typographic cover and store links"
```

---

### Task 10: About page and 404

**Files:**
- Create: `src/pages/about.astro`, `src/pages/404.astro`

- [ ] **Step 1: Write `src/pages/about.astro`**

```astro
---
import { getEntry, render } from 'astro:content';
import Base from '../layouts/Base.astro';
import TopBar from '../components/TopBar.astro';
import SectionHeading from '../components/SectionHeading.astro';
import Spot from '../components/Spot.astro';

const bio = await getEntry('about', 'bio');
if (!bio) throw new Error('content/about/bio.md is missing');
const { Content: BioContent } = await render(bio);
const selectedWorks = await getEntry('selectedWorks', 'selected-works');
if (!selectedWorks) throw new Error('content/about/selected-works.yaml is missing');
const groups = selectedWorks.data.groups;
---
<Base title="about — tachi" description="the hand behind the ink — about the writer tachi">
  <section class="view about">
    <TopBar active="about" />
    <SectionHeading title="About" note="the hand behind the ink" />
    <p class="about-lede">{bio.data.lede}</p>
    <BioContent />
    <p class="about-motto">{bio.data.motto}</p>
    <div class="thread">{bio.data.thread}</div>
    <h2 class="section-title works-title">Selected Works</h2>
    {groups.map((g) => (
      <div class="works-group">
        <div class="works-group-label">{g.group}</div>
        {g.items.map((w) => (
          <div class="work-row">
            <div class="work-title">{w.italic ? <em>{w.title}</em> : w.title}</div>
            {w.sub && <div class="work-sub">{w.sub}</div>}
            <div class="stores work-links">
              {w.links.map((l) => (
                <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
    <Spot name="continuous-line" size={64} style="margin:3.5rem auto 0" />
  </section>
</Base>
```

- [ ] **Step 2: Write `src/pages/404.astro`** (new page, in the site's voice; GitHub Pages serves `404.html` automatically)

```astro
---
import Base from '../layouts/Base.astro';
import { withBase } from '../lib/url';
---
<Base title="lost — tachi" description="this path leads nowhere">
  <section class="view not-found">
    <p class="whisper">this path leads nowhere</p>
    <p style="margin-top:2.2rem"><a class="back-link" href={withBase('/')}>← return to the arrival</a></p>
  </section>
</Base>
```

- [ ] **Step 3: Build and verify**

Run:
```bash
npm run build
grep -c 'Tachi is the pen of Jephthah Akene.' dist/about/index.html    # expect 1
grep -c 'Handles, not halos.' dist/about/index.html                    # expect 1
grep -c 'this quiet place' dist/about/index.html                       # expect 1 (thread)
grep -c 'work-row' dist/about/index.html                               # expect 8 (1 fiction + 7 research)
grep -c 'techport.nasa.gov' dist/about/index.html                      # expect 1
grep -c 'this path leads nowhere' dist/404.html                        # expect >= 1
```
Expected: counts as annotated.

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro src/pages/404.astro
git commit -m "feat: about page with selected works, quiet 404"
```

---

### Task 11: RSS feed

**Files:**
- Create: `src/pages/rss.xml.ts`
(Sitemap already emits via the integration from Task 1; head links already in Base from Task 6.)

- [ ] **Step 1: Write `src/pages/rss.xml.ts`**

```ts
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const poems = await getCollection('poems');
  const writings = await getCollection('writings');
  const books = await getCollection('books');

  const items = [
    ...poems.map((p) => ({
      title: p.data.title,
      description: p.data.excerpt,
      link: withBase(`/poems/${p.id}/`),
      pubDate: new Date(Date.UTC(p.data.year, 0, 1)),
    })),
    ...writings.map((w) => ({
      title: w.data.title,
      description: w.data.excerpt,
      link: withBase(`/writings/${w.id}/`),
      pubDate: new Date(Date.UTC(w.data.year, 0, 1)),
    })),
    ...books.map((b) => ({
      title: b.data.title,
      description: b.data.excerpt,
      link: withBase(`/books/${b.id}/`),
      pubDate: new Date(Date.UTC(b.data.year, 0, 1)),
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'tachi',
    description: 'writings · poems · musings · beauty',
    site: context.site!,
    items,
  });
}
```

(Items carry title + excerpt + link only — readers visit the hour-lit site for the full text. `pubDate` is Jan 1 of the piece's year; if per-piece dates ever matter, add an optional `published` field to the schema.)

- [ ] **Step 2: Build and verify**

Run:
```bash
npm run build
grep -c '<item>' dist/rss.xml                                          # expect 7 (5 poems + 1 essay + 1 book)
grep -c 'tachikoma000.github.io/tachi-personal-site/poems/' dist/rss.xml   # expect 5
ls dist/sitemap-index.xml                                              # expect file exists
```
Expected: counts as annotated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.ts
git commit -m "feat: RSS feed (title + excerpt + link, newest first)"
```

---

### Task 12: Content fidelity check

**Files:**
- Create: `scripts/check-fidelity.mjs`

**What it proves:** every word of the built site matches the handoff's canonical arrays — titles, subs, excerpts, notes, stanzas, essay blocks, book copy, store URLs. Whitespace is normalized (so `<br>` vs newline compare equal); characters are not (curly quotes and em-dashes must survive). Scope: poems, writings, books (the machine-extractable refs). About page copy is verified by Task 10's greps + Task 13's visual pass.

- [ ] **Step 1: Write `scripts/check-fidelity.mjs`**

```js
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
  return load(readFileSync(path.join('dist', rel), 'utf8'));
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
    expectEqual(`poem ${p.id}: author note`, $('.author-note p').text(), expectedNote);
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
  expectEqual(`essay ${piece.id}: body`, $('.essay').first().text(), expectedBlocks);
  if (piece.note) {
    const expectedNote = piece.note.join(' ') + ' — tachi';
    expectEqual(`essay ${piece.id}: author note`, $('.author-note p').text(), expectedNote);
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
```

- [ ] **Step 2: Run it**

Run:
```bash
npm run build && npm run fidelity
```
Expected: a `✓` line per check, ending `All fidelity checks passed — every word matches the handoff.` If any `✗` appears, fix the discrepancy (usually a template dropping punctuation or the porter mishandling a field) before proceeding.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-fidelity.mjs
git commit -m "test: fidelity script diffing built HTML against handoff canonical arrays"
```

---

### Task 13: Repo README + full visual verification pass

**Files:**
- Create: `README.md`, `.claude/launch.json`

- [ ] **Step 1: Write `README.md`**

```markdown
# tachi — handles, not halos

The personal literary site of Tachi (pen name of Jephthah Akene): poems, essays,
books, and an about page in a quiet, gallery-like space. The page's sky, accent,
and (at night) paper shift with the visitor's local hour.

Live: https://tachikoma000.github.io/tachi-personal-site/

## Adding a new piece

1. Create a folder: `content/poems/<slug>/` (or `content/writings/<slug>/`).
2. Write `index.md` — frontmatter + the piece:

   ```markdown
   ---
   title: the new poem
   sub: (optional subtitle)
   excerpt: first breath of the poem, shown on the index page…
   illustration: moon-crescent      # any name from public/illustrations/
   year: 2026
   order: 6                         # position on the index page
   ---
   The poem itself, written exactly as a poem.
   Each line is a line.

   A blank line starts a new stanza.
   *asterisks* make italics.
   ```

3. Optional: an author's note in `note.md` beside it (plain paragraphs).
4. Optional: images/GIFs in the same folder, referenced as `![alt](./file.jpg)`
   (essays render them full column width with a hairline border).
5. Commit and push to `main` — live in ~90 seconds via GitHub Actions.

A typo'd illustration name or missing field fails the build with a clear error;
the live site is never broken by a bad push.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321/tachi-personal-site/
npm test           # poem parser tests
npm run build && npm run fidelity   # verbatim-content check against the design handoff
```

## Custom domain (when ready)

1. In `astro.config.mjs`: set `site` to `https://yourdomain.com`, delete the `base` line.
2. GitHub repo → Settings → Pages → Custom domain (creates the CNAME); add the
   DNS records GitHub shows you; enable "Enforce HTTPS".
3. Push. Done.

## Design source

`design_handoff_tachi_site/` is the authoritative design reference (tokens,
components, prototype, illustration catalog). The prototype at
`design_handoff_tachi_site/ui_kits/site/index.html` opens in any browser.
No trackers, no analytics, no cookie banners — ever.
```

- [ ] **Step 2: Write `.claude/launch.json`** (dev-server config for preview tooling)

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "tachi-site",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["astro", "dev", "--port", "4321"],
      "port": 4321
    }
  ]
}
```

- [ ] **Step 3: Side-by-side visual verification (the "prototype wins" gate)**

Start the dev server (`npm run dev`) and open the prototype (`open design_handoff_tachi_site/ui_kits/site/index.html` — needs internet for its CDN React). Compare systematically; the executor may use the Claude Preview tools (`preview_start` with `tachi-site`, `preview_screenshot`, `preview_resize`, `preview_inspect`) for the built site's screenshots and DOM/style assertions.

Checklist (fix anything off, then re-verify):
- [ ] Arrival, poems index, poem detail (this-that-other with note), writings index, The Knock, books index, book detail, about — each visually matches the prototype at **midday**
- [ ] Dial through all six hours on the arrival page: gradients, accent, and (night) paper/ink flip match; transition is slow (~2.4s); spots invert at night
- [ ] Hour override persists when navigating arrival → poems → poem (sessionStorage)
- [ ] 390px viewport (`preview_resize` mobile): 17px body, 56px entry spots, 150px cover, dial compresses, poem indent 3%
- [ ] Hover behaviors: path rows slide 0.8rem; piece rows slide; nav underline; home mark tilts −8°; store links dim
- [ ] Keyboard: tab reaches home mark, nav, entries, dial buttons; focus-visible outlines appear; dial `aria-pressed` follows the active hour
- [ ] `prefers-reduced-motion: reduce` (via OS setting or DevTools emulation): no fade-up animation; site still fully usable
- [ ] No console errors on any page (`preview_console_logs`)

- [ ] **Step 4: Commit**

```bash
git add README.md .claude/launch.json
git commit -m "docs: author's manual README; preview launch config"
```

---

### Task 14: GitHub repo, Actions workflow, deploy, live verification

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write `.github/workflows/deploy.yml`** (current official recipe — verified against Astro docs July 2026)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v7
      - name: Install, build, and upload your site
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 2: Commit the workflow**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: GitHub Pages deploy workflow (withastro/action)"
```

- [ ] **Step 3: Create the public repo and push**

Run:
```bash
gh repo create Tachikoma000/tachi-personal-site --public --source=. --remote=origin --push
```
Expected: repo created, `main` pushed. (The first workflow run may fail at the deploy job because Pages isn't enabled yet — expected; fixed next.)

- [ ] **Step 4: Enable Pages with Actions as the source**

Run:
```bash
gh api repos/Tachikoma000/tachi-personal-site/pages -X POST -F build_type=workflow \
  || gh api repos/Tachikoma000/tachi-personal-site/pages -X PUT -F build_type=workflow
```
Expected: JSON response containing `"build_type":"workflow"`.

- [ ] **Step 5: Run the workflow and watch it**

Run:
```bash
gh workflow run deploy.yml
sleep 10
gh run watch $(gh run list --workflow=deploy.yml --limit 1 --json databaseId -q '.[0].databaseId') --exit-status
```
Expected: build and deploy jobs green; exit code 0.

- [ ] **Step 6: Verify the live site**

Run:
```bash
curl -sI https://tachikoma000.github.io/tachi-personal-site/ | head -1                          # HTTP/2 200
curl -s https://tachikoma000.github.io/tachi-personal-site/ | grep -c 'the shorter breaths'     # 1
curl -s https://tachikoma000.github.io/tachi-personal-site/poems/love-in-human-form/ | grep -c 'I will tell you about my mother.'   # >= 1
curl -sI https://tachikoma000.github.io/tachi-personal-site/illustrations/bird-creature.svg | head -1   # HTTP/2 200
curl -s https://tachikoma000.github.io/tachi-personal-site/rss.xml | grep -c '<item>'           # 7
curl -sI https://tachikoma000.github.io/tachi-personal-site/definitely-not-a-page | head -1     # HTTP/2 404 (custom 404 serves)
```
Expected: annotated values. Then open the live URL in a real browser and click through all five sections + the dial.

- [ ] **Step 7: Final commit of any verification fixes**

If Steps 3–6 of Task 13 or Step 6 here surfaced fixes, commit them:
```bash
git add -A && git commit -m "fix: visual/deploy verification adjustments" && git push
```

---

## Plan self-review (done at authoring time)

- **Spec coverage:** routes ✓ (T6–T11), content model + schemas ✓ (T5), poem format rules ✓ (T4/T5), notes ✓ (T5/T7/T8), hour system incl. pre-paint + sessionStorage ✓ (T6), CSS verbatim port + documented additions ✓ (T2), unplaced components skipped ✓, fonts self-hosted ✓ (T1/T6), RSS + sitemap ✓ (T1/T11), favicon ✓ (T3), repo/Pages/domain-swap docs ✓ (T13/T14), fidelity + visual + a11y verification ✓ (T12/T13), 404 ✓ (T10), public-repo requirement ✓ (T14).
- **Placeholder scan:** none — every step has full code or an exact command with expected output; the two "hand-write" steps contain the complete file contents.
- **Type consistency:** `withBase` (T4) used by T6–T11 ✓; `Stanza {lines, italic}` (T4) consumed by PoemBody (T7) ✓; collection names `poems/poemNotes/writings/writingNotes/books/about/selectedWorks` consistent across T5 config and T7–T10 pages ✓; PieceEntry props (T7) match all call sites (T7/T8/T9) ✓; `coverLines` (T5 schema) matches BookCover prop (T9) ✓.
