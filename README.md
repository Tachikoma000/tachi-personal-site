# tachi — handles, not halos

The personal literary site of Tachi (pen name of Jephthah Akene): poems, essays,
books, and an about page in a quiet, gallery-like space. The page's sky, accent,
and (at night) paper shift with the visitor's local hour.

Live: https://tachi.ink

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
the live site is never broken by a bad push. Punctuation renders exactly as
typed (no smart-quote rewriting) — type curly quotes where you want them.

## Local development

Requires Node ≥ 22.12 (a `.nvmrc` pins 24 — `nvm use` picks it up).

```bash
npm install
npm run dev        # http://localhost:4321/
npm test           # poem parser tests
npm run build && npm run fidelity   # verbatim-content check against the design handoff
```

## Domain

The site lives at **tachi.ink** (configured 2026-07-24): four A records +
`www` CNAME at name.com point to GitHub Pages; `public/CNAME` and the Pages
settings both carry the domain; `site` in `astro.config.mjs` is the single
source for every absolute URL (OG tags, RSS, sitemap). The old
tachikoma000.github.io/tachi-personal-site URL redirects here permanently.

## Design source

`design_handoff_tachi_site/` is the authoritative design reference (tokens,
components, prototype, illustration catalog). The prototype at
`design_handoff_tachi_site/ui_kits/site/index.html` opens in any browser.
No trackers, no analytics, no cookie banners — ever.
