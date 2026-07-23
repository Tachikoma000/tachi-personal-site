# Handoff: tachi.com — personal literary site

## Overview
The personal site of the writer **Tachi** (pen name of Jephthah Akene): poems, essays, books, and an about page, presented in a quiet, gallery-like space. Aesthetic thesis: **French Impressionism meets Japonisme** — Monet's light with a Japanese printmaker's restraint. The site's defining behavior: the page's sky gradient, accent color, and (at night) paper color shift with the visitor's **local hour**, in six named palettes. Motto: *handles, not halos*.

## About the Design Files
Everything in this bundle is a **design reference built in HTML/JSX prototypes** — it shows intended look, copy, and behavior; it is not production code to ship. Your task is to **recreate these designs 1:1 in your target stack** (Next.js/Astro/plain HTML — any is fine; the site is fully static + a few lines of client JS) using the exact values in this doc and in the CSS token files. The content (poems, essays, about) is **final copy** — reproduce it verbatim, including lowercase quirks like "jumped(all of us," and stanza breaks.

**View the working prototype:** open `ui_kits/site/index.html` in a browser (needs internet for Google Fonts + React CDN). `ui_kits/site/mobile.html` shows the same site in a 390×844 phone frame. These ARE the spec; when this doc and the prototype disagree, the prototype wins.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, and interactions are final. Recreate pixel-perfectly.

## Architecture (recreate this, not React specifically)
- One column, `max-width: 640px`, centered, `padding: 0 1.6rem 7rem`.
- Fixed layers: bokashi **sky** gradient (top, 52vh, z-0), **washi grain** overlay (whole viewport, z-50, pointer-events none), **hour dial** (fixed bottom-center, z-60).
- Five views: **arrival** (home), **poems**, **writings**, **book** (books), **about**. The prototype swaps views client-side; real site can be separate routes. Nav order everywhere: **poems · writings · books · about**.
- All state the site needs: current hour palette (auto from clock, user-overridable via dial), current view/route, and per-index "open piece" (poems and writings and books each have index → detail).

## The Hour System (signature feature)
`body[data-hour]` ∈ `dawn | morning | midday | dusk | bleue | night`. On load, set from local time: 5–8 dawn, 8–12 morning, 12–16 midday, 16–19 dusk, 19–21 bleue, else night. The floating dial lets visitors preview any hour (aria-pressed on active). All color changes transition over **2.4s** (`cubic-bezier(0.4,0,0.2,1)`).

Palettes (sky gradient top → mid → fade-into-paper; plus accent):
- dawn: #EFC3BC → #F0D9C6 → #F7F1E5 · accent #B8797E (dusty rose)
- morning: #C5D6E2 → #E3E7DD → #F7F2E8 · accent #6E89A8
- midday: #A9C3D9 → #CDD9DD → #F5F1E6 · accent #3D5A80 (indigo)
- dusk: #DFAF74 → #E4BBA8 → #F6EFE2 · accent #A9713F (burnt gold)
- bleue: #46557E → #8B90AE → #EFECE4 · accent #46557E
- night: #0E1220 → #1A2033 → #232838 · accent #93A7CB — **and** paper flips to #232838, ink to #E7E2D6, ink-soft #A9A6B4, hairline rgba(231,226,214,.22), washi opacity 0.035 with `screen` blend, spot illustrations get `filter: invert(0.88)`.

Base (all non-night hours): paper #F7F2E8 (warm washi cream), ink #33323B (blue-black), ink-soft #5B5963, hairline rgba(51,50,59,0.18). **Never pure black or pure white anywhere.**

## Design Tokens
Authoritative files: `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/motion.css`. Highlights:
- **Fonts** (Google Fonts, exact families): Cormorant Garamond (display/poems; weights 300/400/500 + italics), EB Garamond (body; 400/500 + italic), Zen Kaku Gothic New (utility/nav/captions; 300/400). No mono, no grotesque.
- **Body text**: EB Garamond 19px / 1.75 (17px under 640px).
- **Utility text** is always Zen Kaku 300, lowercase, widely tracked: nav 0.68rem/0.24em, whisper 0.68rem/0.38em, hints 0.66rem/0.16em, meta 0.62rem/0.2em, mei 0.66rem/0.55em.
- **Display**: hero wordmark "tachi" 3.4rem/300/0.42em tracking lowercase; section titles 2.3rem/300/0.05em; piece titles 1.65rem/400; poems 1.5rem/400/2.1 line-height with 6% left indent.
- **Spacing (ma)**: section note → content 3.5rem; topbar → title 4.5rem; epigraph → paths 5.5rem; piece rows 2rem vertical padding; paragraphs 1.3rem.
- **Borders**: 1px hairlines only. **Radii**: none, except the 999px pill dial. **Shadows**: none, except book cover `8px 10px 0 -3px` at 7% ink.
- **Motion**: view fade-up 0.9s (opacity 0→1, translateY 10px→0); hovers 0.3–0.4s; sky 2.4s; respect `prefers-reduced-motion` (disable all animation; colors may still change instantly).

## Textures & Marks
- **Washi grain**: SVG fractal noise (see `assets/washi-noise.svg` / inline data-URI in `css/textures.css`), fixed full-viewport, opacity 0.05, `mix-blend-mode: multiply` (`screen` at night).
- **Sky**: linear-gradient band + subtle horizontal-line overlay (`repeating-linear-gradient`, white 2.8%, `overlay` blend) suggesting woodblock bokashi.
- **Home mark**: the **bird-creature** illustration (34px) in the top bar; tilts −8° on hover (0.5s). The ensō (`assets/enso.svg`) exists in the brand kit but is NOT used in current site chrome.
- **Spot illustrations**: 50 hand-drawn ink SVGs in `assets/illustrations/`. Usage rules in `guidelines/illustration-catalog.md`: spot art never icons, one per view (two max), 64–120px, transparent on paper, inverted at night. Current placements listed per screen below.

## Screens

### 1. Arrival (`ArrivalScreen.jsx`)
Centered column, starts 15vh from top. Order: bird-creature spot (104px, centered) · "tachi" wordmark (h1) · whisper line "writings · poems · musings · beauty" · epigraph "“The best of it arrives. It is not made.”" with attribution "— the knock" (Cormorant italic 1.35rem, soft ink, attribution 0.85rem/0.2em tracking, 70% opacity) · path list (5.5rem above). Path rows (hairline top rule each + bottom on last, 1.25rem padding): Poems/"the shorter breaths", Writings/"essays & musings", Books/"the longer works", About/"the hand behind the ink". Row = serif name (1.5rem) left + utility hint right; whole row is a link; on hover slides `padding-left: 0.8rem` (0.45s ease).

### 2. Poems (`PoemsScreen.jsx`)
Index: TopBar + "Poems" title + note "the shorter breaths" + clickable piece entries (whole entry is the link, same hover slide). Entry = title (1.65rem serif) + italic sub + excerpt (1rem soft ink, 56ch) + meta "poem · 2026 · **by tachi**" (byline weight 500) + 72px spot illustration right (56px mobile).
Poem detail: back link "← the shorter breaths" (utility, lowercase) + title/sub + poem body (Cormorant 1.5rem, line-height 2.1, 6% indent, stanza gaps 1.6rem) + tailpiece spot (72px, centered, 3.2rem above) . One poem ("this, that, and the other thing.") opens with an **author's note**: accent label "a note from the author" (0.66rem/0.3em lowercase), italic soft-ink paragraphs, sign-off "With love and gratitude, / Tachi", hairline rule below.
Poems in order (emblem = index illustration = tailpiece): jollof-fried-rice/moon-crescent, this-that-other/hand-heart, love-in-human-form/mother-child, sound-his-back-made/arch-geometric, year-factory-stopped/cross-faith. Full canonical text lives in `ui_kits/site/PoemsScreen.jsx` (POEMS array).

### 3. Writings (`WritingsScreen.jsx`)
Same index pattern. One essay: **The Knock** (emblem burst-energy). Detail: back link "← the writings", author's note (label "a note, before we begin", sign-off "— tachi"), body paragraphs (58ch max), section headings inside essay (Cormorant 1.5rem/400/0.04em, margins 2.8rem top 1.1rem bottom), sign-off block "Ad Astra, / *Tachi*". Canonical text in the PIECES array.

### 4. Books (`BookScreen.jsx`)
Index ("Books" / "the longer works"): piece entries; one book: *Handles, Not Halos*, emblem teamwork-people, meta "novel · 2025".
Detail: back link "← the shelf", title + note "a novel", flex row (gap 2.6rem, wraps): **BookCover** (190px wide, aspect 2/3.1, hairline border, gradient `160deg` sky-b→sky-c, offset shadow, title Cormorant 1.45rem top-left, author line "a novel · tachi" 0.62rem/0.34em bottom) + lede paragraph (Cormorant italic 1.3rem/1.65) + body paragraph + store links row: barnes & noble / everand / apple books (lowercase utility 0.66rem/0.2em, accent color, accent underline `border-bottom`, 65% opacity hover). URLs in the JSX.

### 5. About (`AboutScreen.jsx`)
Title "About" / "the hand behind the ink". Italic display lede "Tachi is the pen of Jephthah Akene." Three body paragraphs (58ch) — Lagos/radios account, physicist-and-poet, "You will not find my face here" (**never add a photo or portrait**). Italic display line "Handles, not halos." Then the **thread** (hairline rules top+bottom, utility 0.7rem/0.24em, line-height 2.4): "physics → mechanical engineering → spacecraft & instruments → ai → playgrounds & lattivox labs → rig · ryzome · arc → a novel → this quiet place". Then **Selected Works**: "Selected Works" (section-title style 1.7rem); groups "fiction" and "research & instruments" (accent lowercase labels); each work = hairline-top row (1.1rem padding): title (1.05rem; italic for the novel), italic sub (0.9rem soft), quiet link row. Ends with continuous-line spot (64px centered). No colophon on this page. All URLs in the JSX.

## Interactions & Behavior
- Links: accent color, no underline (except store links' border-bottom), 65% opacity on hover, 0.3s; focus-visible 1.5px accent outline, 3px offset.
- Nav links: soft ink → ink + accent underline (border-bottom) on hover/current, 0.4s.
- View entry: fade-up 0.9s. Scroll to top on navigation.
- Hour dial: pill (72% paper + 6px backdrop blur, hairline border), buttons 0.6rem/0.14em; active = accent bg + paper text. Labels: dawn, morning, midday, dusk, l'heure bleue, night.
- ::selection = accent at 22%.
- Mobile ≤640px (`css/mobile.css`): 17px body, tighter tracking, mei hidden, dial compresses, 56px entry spots, poem indent 3%, cover 150px.
- No trackers, no analytics, no cookie banners, no popups, no engagement mechanics. Ever.

## Copy & Tone Rules
Interface whispers: UI labels lowercase, lyrical ("the shorter breaths", "the hand behind the ink"). No emoji. No icons — words instead. Middle dots join meta fragments. Piece titles Title Case (poems lowercase where authored). Never salesy.

## Assets
- `assets/illustrations/*.svg` — 50 hand-drawn ink illustrations (user-supplied; ship as-is, never recolor; night = invert(0.88))
- `assets/enso.svg`, `assets/enso-ink.svg` — brand ensō marks (kept for future use)
- `assets/washi-noise.svg` — grain source (also inlined as data-URI in textures.css)
- Fonts via Google Fonts (`tokens/fonts.css`); self-host woff2 if you prefer — same families/weights.
- Book cover is **typographic** — there is no cover-art image.

## Files
- `ui_kits/site/index.html` — run this: full interactive prototype (desktop)
- `ui_kits/site/mobile.html` — phone-framed preview
- `ui_kits/site/*.ref.jsx` — per-screen reference implementations + **canonical content** (POEMS, PIECES, WORKS arrays). `.ref.jsx` = read-as-JSX reference copies; the live compiled versions ship inside `_ds_bundle.js`.
- `styles.css` + `tokens/` + `css/` — the complete styling system (import order matters: fonts, colors, typography, spacing, motion, base, textures, prose, mobile)
- `components/**/*.ref.jsx` — reference primitives (Enso, Mei, Washi, Sky, HourDial, Spot, TopBar, PathList, SectionHeading, PieceEntry, Poem, Epigraph, BookCover, StoreLinks, QuietField, Colophon). QuietField (email) and Mei (vertical inscription) exist in the kit but are not placed on any current screen.
- `readme.md` — brand foundations (design-system overview)
- `guidelines/illustration-catalog.md` — all 50 illustrations: meanings, placement map, usage rules
- `_ds_bundle.js` — compiled component bundle the prototype loads (reference only; do not ship)
