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
| Domain | **tachi.ink** (live 2026-07-24: A records + www CNAME at name.com → GitHub Pages; HTTPS enforced; old github.io URL 301s here) |
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
- (2026-07-24:) each verse line renders as a block with a **1.5em hanging indent** — overflow continuations indent, so flush-left always means an authored line start and stanza shape survives narrow screens. Inert when nothing wraps.
- (2026-07-24:) poem body type is **fluid** — `clamp(0.82rem, calc(5vw - 3px), 1.5rem)` — so authored lines keep fitting the column as screens narrow (worst-case poem: line-wrap fell from ~39% to ~6% at 390px). Capped at the original 1.5rem so **desktop is unchanged**; on mobile the poem also drops its off-center indent to reclaim column width. The hanging indent remains the safety net for the rare still-too-long line. Verse stays left-aligned (never justified — that would stretch a poem's cadence).
- (2026-07-26, standing craft note, not a build rule:) six of the fourteen tellings end in uncertainty. Existing endings stay — unwinding one to fix a statistic would damage a poem. **The next telling should end on something known**: a fact, an arrival, a door actually closed. Not triumph; just certainty.
- (2026-07-26:) poems may carry an optional **epigraph** — `epigraph` (YAML block scalar for multiple lines) + `epigraphSource` in frontmatter, rendered above the poem through the design system's existing `Epigraph` component (italic display face, tracked attribution). First used by `the-ground-was-holy`.
- (2026-07-25, first-person casing:) **tellings use capital `I`; breaths use lowercase `i`** — the two families read as different registers before a word is read. Two standing exceptions: `this-that-other` keeps lowercase throughout (it is the cummings poem, and lives among the tellings only by length), and in `jollof-fried-rice` the single line *"i love you, please come back."* stays lowercase by the author's decision — its power is in its smallness. Both exceptions are annotated in the files themselves; do not normalize them. Titles keep the site's lowercase voice, except `jollof`, whose title quotes the poem's own refrain and tracks it.
- (2026-07-24:) poems carry a `family` field — `telling` (long narrative praise-songs) or `breath` (short lyrics, the default). `order` sorts ascending *within* a family, numbered with gaps of ten.
- (2026-07-26, **E · Light**, from `docs/design/2026-07-26-decisions.md` §7): a poem may carry an optional `hour:` and open in its own light. **Precedence, ruled by the author: a visitor's own choice > the poem's hour > the clock.** A poem suggests its light only to someone who has not chosen — the hour mark is never overridden. The poem's hour is applied to `body[data-hour]` at pre-paint and **never written to sessionStorage**, so it cannot leak to the next page; the SSR fallback is the poem's own hour, so no-JS readers get it too. Assigned sparingly (5 of 23): `the-ground-was-holy` and `hidden-stair-hydra` dawn, `year-factory-stopped` and `ogun-if-it-was-you` bleue, `small-sun-beside-my-name` morning.
- (2026-07-26, **5i · the turning epigraph**, from `docs/design/2026-07-26-decisions.md` §7): the arrival page's fixed quotation from The Knock is replaced by a couplet drawn from a poem, attributed to it. **Rotation is per build** — deterministic output, no client JS, and publishing moves the front door. The pool is **authorial**: a poem joins it by carrying a `couplet:`, the same field the family wall uses, so the poet controls what may appear on the front page. Falls back to the original Knock quotation if no poem carries a couplet. Couplets serving this pool should stand alone as sentences (a wall couplet may be a fragment; a front-door epigraph should not).
- (2026-07-26, **5k · after the last line**, from `docs/design/2026-07-26-decisions.md` §7): each poem page ends with a quiet coda beneath the tailpiece — `next in {family name}` over the next poem's title — so the authored order is legible to a reader arriving from RSS or a shared link, not only from an index. The last poem of each family **crosses to the head of the other**, making all 23 poems one loop with no dead ends; the label always names the family, so a crossing explains itself without special copy.
- (2026-07-26, design 6c — family pages, per `docs/design/2026-07-26-decisions.md` §3–4): each family page **hangs its two newest as a wall** on desktop (emblem 54px above title, then a couplet from the poem) and **shelves the rest** as hairline rows carrying frontmatter excerpts (emblem 44px). **Below 640px there is no wall** — the same two links restyle into ordinary rows showing their excerpt, so the phone page reads in one rhythm. One DOM, one link per poem, one tab stop; couplet and excerpt swap by CSS so exactly one is rendered. The hung item carries `.piece` so it inherits the hairline row wholesale on mobile and cannot drift from its neighbours. Couplets are an optional `couplet:` frontmatter field falling back to the poem's first two lines.
- (2026-07-26, design 7b — `docs/design/2026-07-26-poems-index-two-doors.md`, **supersedes 4g for the index page only**): the index no longer previews poems. It is **two doors**, one per family: name, italic description, a whisper of the first five titles ending in "and {word} others", and a baseline carrying the total as a word plus the breathing dots. Whole door is one link and one tab stop; whisper titles are not individually clickable and regenerate on build. The three preview rows, the more-link, and the `PoemRow` component are removed. Verified: the entire index sits above the fold at 390×720. Family pages are unchanged.
- (2026-07-24, design 4g — designer spec at `docs/design/2026-07-24-poems-index-families.md`, answering the discoverability brief) — *index portion superseded by 7b above; family pages still per this spec*: the poems index was two family blocks, **the short breaths first** (fast-growing family), each = a header (family name + italic description + three breathing ink dots) → three newest compact rows → a "{n} more breaths →" link. Header, dots, and more-link all reach the family page (`/poems/breaths/`, `/poems/tellings/`), which holds the full entries with excerpts. Poem detail back-links point to the poem's own family page ("← the short breaths" / "← the long tellings"), replacing the former stale "← the shorter breaths". Counts spelled as words, recomputed from content, more-link omitted at ≤3. Adaptation: compact overview rows show the dedication only for tellings (per spec §1); breath dedications still appear on the poem page and the family page.

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
- (Post-launch evolution:) label weight 400 at 0.7rem for presence. Wayfinding for long notes is the **skip-note indicator** per the designer spec at `docs/design/2026-07-24-skip-note-indicator.md` (supersedes the earlier floating beacon, which obstructed text on mobile): an in-flow head skip ("to the poem ↓", breathing ink + drifting arrow) in the note's label row, and a bridge (label + stem with falling accent drop) at the note's end. Both smooth-scroll to the piece with a −24px landing offset; reduced motion disables the animations (global base.css rule) and jumps instantly. Implemented as anchors (spec-sanctioned) for a no-JS fallback.

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
- **Hour control** (owner-approved evolutions 2026-07-24, replacing the prototype's floating bottom dial, which obstructed content): the **hour mark** — six hand-drawn-style stroke SVGs (rising half-sun, climbing sun, full sun, sinking sun, first star, crescent) as a button after the "about" nav link (top-right corner on arrival, which has no topbar). Tap cycles dawn → … → night → around. Mark visibility is pure CSS keyed to `body[data-hour]` (correct on first paint); the hour's *name* stays available via `title` + aria-label. This consciously amends the handoff's "no icons — words instead" rule for this one control, in the illustration language. Same persistence contract: sessionStorage for the visit, clock on the next.
- **Topbar** (same evolution): left side is a single home link — bird mark + the word "home" (word hides ≤360px; bird alone suffices) — hover tilts the bird and underlines the word. Right side: nav links then the hour mark.
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
