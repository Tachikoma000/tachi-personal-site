# tachi.com — real implementation, content system, and deployment

**Date:** 2026-07-23
**Status:** Approved
**Authoritative visual spec:** `design_handoff_tachi_site/` (its README + prototype win any visual disagreement with this document)

## Goal

Turn the high-fidelity design handoff into a production site: pixel-faithful to the prototype, deployed automatically from a GitHub repo, with all writing stored as plain files the author can add to for years without touching site code.

## Decisions (locked with the author)

| Decision | Choice |
|---|---|
| Framework | Astro, fully static output |
| Content storage | Plain markdown files in the repo, one folder per piece (Approach A) |
| Structured data | Small YAML files for link lists (books, selected works) |
| Hosting | GitHub Pages via GitHub Actions |
| Repo | `Tachikoma000/tachi-personal-site`, public (required for free-plan Pages) |
| Domain | `tachikoma000.github.io/tachi-personal-site/` now; custom domain later (two-line config change + DNS) |
| Fonts | Self-hosted via Fontsource (`@fontsource/*`): Cormorant Garamond, EB Garamond, Zen Kaku Gothic New — same weights/styles as `tokens/fonts.css`. Zero third-party requests site-wide |
| Extras | RSS feed + sitemap. No analytics, no trackers, ever (handoff mandate) |

## 1. Architecture

Static routes replace the prototype's client-side view swap (endorsed by handoff README):

```
/                       arrival
/poems/                 poem index
/poems/[slug]/          poem detail
/writings/              essay index
/writings/[slug]/       essay detail
/books/                 book index
/books/[slug]/          book detail
/about/                 about
/404                    quiet not-found page: whisper-style line + link back to arrival
/rss.xml, /sitemap-*.xml
```

- Nav order everywhere: **poems · writings · books · about** (nav ids use `books`, unifying the prototype's `book` id).
- Back links per handoff: poems "← the shorter breaths", writings "← the writings", books "← the shelf".
- The `.view` fade-up (0.9s) runs as a CSS animation on each page load — same entry feel as the prototype.
- The only JavaScript on the site is the hour system (~25 lines, vanilla, no framework runtime).

### Project structure

```
tachi-personal-site/
  design_handoff_tachi_site/     # untouched reference spec
  content/                       # ALL writing lives here, at repo root
    poems/<slug>/index.md        # + optional note.md, images
    writings/<slug>/index.md     # + optional note.md, images
    books/<slug>.yaml
    about/bio.md
    about/selected-works.yaml
  public/
    illustrations/*.svg          # the 50 spot illustrations, copied as-is
    favicon.svg                  # bird-creature mark
  src/
    components/                  # Sky, Washi, Spot, TopBar, PathList, SectionHeading,
                                 # PieceEntry, PoemBody, AuthorNote, Epigraph, BookCover,
                                 # StoreLinks, HourDial
    layouts/Base.astro           # head, fonts, hour script, Sky, Washi, dial, meta tags
    pages/                       # routes listed above
    styles/                      # 9 CSS files ported near-verbatim (tokens/ + css/)
    lib/                         # poem-parser.ts, hour constants, content helpers
  .github/workflows/deploy.yml
  astro.config.mjs  package.json  tsconfig.json  .gitignore  README.md
  docs/superpowers/specs/        # this document
```

## 2. Content model

Astro content-layer collections with glob loaders pointed at root-level `content/` (writing stays out of `src/`).

### Poems (`content/poems/<slug>/index.md`)

Frontmatter schema (zod, build-time validated):

```yaml
title: love in human form        # verbatim, incl. authored lowercase
sub: (for mummy)                 # optional
excerpt: if you want to know…    # index-page excerpt, verbatim
illustration: mother-child       # validated against the actual 50 filenames
tailpiece: mother-child          # optional, defaults to illustration
year: 2026                       # renders meta "poem · 2026 · by tachi"
order: 3                         # index ordering (handoff fixes current order)
```

Body = the poem as written. Parsing rules (custom loader, unit-tested):
- Blank line(s) → stanza break (rendered as the prototype's 1.6rem spacer).
- Newline → line break within a stanza.
- `*text*` within a line → `<em>` (Cormorant 300 italic per `.poem em`). A stanza entirely wrapped in `*…*` reproduces the prototype's italic-stanza mechanism.
- All characters verbatim — curly quotes, em-dashes, "jumped(all of us," quirks. Files are UTF-8; no smart-quote transformation is applied.
- Detail page ends with `— tachi` em line + tailpiece spot (72px, centered, 3.2rem above), per prototype.

### Writings (`content/writings/<slug>/index.md`)

Same frontmatter shape (meta renders "essay · 2026"). The `excerpt` for The Knock is the prototype's derived value — first 160 characters of the first paragraph + "…" — stored explicitly so the fidelity check stays exact. Body is **standard markdown** rendered through Astro:
- `### Heading` → the essay's inline section-heading style (Cormorant 1.5rem/400/0.04em, margins 2.8rem/1.1rem).
- Paragraphs → 58ch max-width prose.
- `![alt](./image.jpg)` → optimized by Astro's image pipeline; styled full column width, hairline border, 2rem vertical margins (the handoff `Block` img style). GIFs pass through unoptimized to preserve animation. Night mode never inverts content images (invert is scoped to `.spot img` already).
- Sign-off: optional frontmatter `signoff: "Ad Astra,"` → template renders the sig block ("Ad Astra,<br><em>Tachi</em>", 2.4rem top margin) matching the prototype's `{sig:true}` block.

### Author's notes (`note.md` beside `index.md`)

Optional plain-markdown file; paragraphs render italic soft-ink. Labels and sign-offs live in templates per collection:
- Poems: label "a note from the author, before the poem", sign-off "With love and gratitude, / Tachi".
- Writings: label "a note, before we begin", sign-off "— tachi".
- (Post-launch evolution, approved 2026-07-23:) label weight 400 at 0.7rem, and a "↓ the poem" / "↓ the essay" continuation whisper closes the note block — wayfinding for long notes.

### Books (`content/books/<slug>.yaml`)

```yaml
title: Handles, Not Halos
coverLines: ["Handles,", "Not Halos"]   # explicit cover line-break
sub: a novel
excerpt: In a city where the hum…       # index excerpt, verbatim incl. nbsp
year: 2025                              # meta "novel · 2025"
illustration: teamwork-people
lede: In a city where the hum of surveillance…
body: Chorus was supposed to save lives…
stores:
  - { label: barnes & noble, href: https://www.barnesandnoble.com/w/… }
  - { label: everand, href: https://www.everand.com/book/… }
  - { label: apple books, href: https://books.apple.com/at/… }
```

(URLs truncated here for readability; the content files copy them **verbatim** from `BookScreen.ref.jsx`.)

### About (`content/about/bio.md` + `selected-works.yaml`)

- `bio.md` frontmatter: `lede` ("Tachi is the pen of Jephthah Akene."), `motto` ("Handles, not halos."), `thread` (the full arrow line). Body = the three paragraphs, verbatim. **Never add a photo or portrait** (handoff mandate).
- `selected-works.yaml`: groups (`fiction`, `research & instruments`) → items (title, `italic` flag for the novel, optional sub, links). All URLs verbatim from the handoff. Page ends with continuous-line spot (64px centered). No colophon.

### Arrival copy

Lives in the arrival page template (wordmark, whisper line, epigraph "“The best of it arrives. It is not made.” — the knock", four path rows with hints). It is site chrome, rarely edited; changing it is a one-file edit.

### Adding a new piece (the author's future workflow)

1. `mkdir content/poems/new-poem-slug` and write `index.md` (frontmatter + poem).
2. Drop any images/GIFs in the same folder; reference with `![…](./file.jpg)`.
3. Commit, push. Live in ~90 seconds. Schema errors (typo'd illustration name, missing title) fail the build with a clear message and never break the live site.

## 3. The hour system

- Palettes, boundaries, and transitions exactly per `tokens/colors.css` + handoff README: `dawn 5–8, morning 8–12, midday 12–16, dusk 16–19, bleue 19–21, night otherwise`; all color change over 2.4s.
- **Pre-paint script** (small, inline in `<head>`, render-blocking by design): `data-hour = sessionStorage override ?? hourOf(new Date())`. No palette flash, no on-load transition.
- **Dial** (vanilla JS): click → set `body[data-hour]`, update `aria-pressed`, write sessionStorage. Override persists across pages within the visit; next visit returns to the clock (the dial is a *preview*, per README).
- `prefers-reduced-motion`: animations disabled by the existing CSS rule; instant color changes remain (README allows).

## 4. Components & styling port

- The 9 CSS files (`tokens/fonts|colors|typography|spacing|motion`, `css/base|textures|prose|mobile`) port near-verbatim, same import order. `fonts.css` swaps its Google Fonts `@import` for Fontsource imports (same families/weights/styles). Small additions: content-image styling for essays (from the ref `Block` styles), sig-block and author's-note styles (currently inline in the refs), promoted to `prose.css` with the same values.
- `.ref.jsx` components → `.astro` components, same class names and DOM shape. `Spot` resolves `/illustrations/<name>.svg` from `public/` (base-path aware). `TopBar` links are real `<a href>` routes with `.here` on the active section.
- **Not built** (unplaced in current site per README): QuietField, Mei, Enso, Colophon. Their assets/CSS stay in the repo for future placement.
- Illustrations ship as-is — never recolored; night inversion via existing `.spot img` rule.

## 5. Head, meta, feeds

- Per-page `<title>`: "tachi — handles, not halos" (arrival); "<piece title> — tachi" elsewhere. Meta description from excerpt/sub.
- OpenGraph basics (title, description, type=article for pieces). No OG images initially (the site has no photographic identity; can add typographic cards later).
- RSS at `/rss.xml`: poems + writings + books, newest first, full text omitted (title + excerpt + link) to keep readers visiting the actual, hour-lit site. Sitemap via `@astrojs/sitemap`.
- Favicon: bird-creature SVG.
- `lang="en"`; skip-to-content not needed (single column, nav is first focusable content and short).

## 6. Repo & deployment

- `git init` (done), first commit = handoff as received (done), then scaffold.
- Create **public** repo `Tachikoma000/tachi-personal-site` via `gh repo create`; push `main`.
- `.github/workflows/deploy.yml`: official `withastro/action` → build → deploy to Pages on every push to `main`. Enable Pages (workflow source) via `gh api`.
- `astro.config.mjs`: `site: 'https://tachikoma000.github.io'`, `base: '/tachi-personal-site'`. All internal links/assets use base-aware helpers.
- **Future custom domain swap** (documented in repo README): set `site` to the domain, remove `base`, add CNAME/DNS, enable HTTPS in Pages settings. ~5 minutes, no content changes.
- `.gitignore`: `node_modules/`, `dist/`, `.astro/`.
- Repo README: what this is, how to add a piece (the workflow above), how to run locally (`npm run dev`), the domain-swap steps.

## 7. Verification & error handling

- **Content fidelity script** (one-time, kept in `scripts/`): extracts text from the handoff's canonical arrays (`POEMS`, `PIECES`, `WORKS`, About copy) and from built HTML; normalizes whitespace; diffs. Zero tolerance — verbatim reproduction is a handoff mandate.
- **Visual fidelity**: side-by-side prototype vs. built site — 6 hours × 5 screens, desktop + 390px mobile — before done is declared.
- **Poem parser**: unit-tested (TDD) — stanza splits, line breaks, inline em, italic stanzas, unicode passthrough.
- **Build-time**: zod schema validation on all collections; `illustration`/`tailpiece` validated against the real SVG filename list.
- **Accessibility checks**: keyboard-only pass; `aria-pressed` dial state; `focus-visible` outlines; reduced-motion pass.
- **Broken external links**: not checked at build (store/publication URLs are author-owned facts).

## Out of scope (explicitly)

- Web CMS UI (Keystatic/Decap) — the file workflow was chosen; a git-based CMS can layer on later without changing storage.
- Custom domain purchase/setup — structured for a later 5-minute swap.
- OG card images, search, comments, newsletters (QuietField exists in the kit if ever wanted), analytics (never, per handoff).
