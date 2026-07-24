# Brief — Poems index: making both families discoverable

Design brief for tachi.ink/poems. Companion to the skip-note spec (2026-07-24). This one is a problem statement, not a solution — the solution is yours. 2026-07-24.

## 1. The problem

The poems index now holds two families under quiet accent labels: **the long tellings** (five narrative praise-songs) and **the short breaths** (eight lyrics, and growing faster). The tellings lead. Each telling entry is tall — title, italic dedication, a two-to-four-line excerpt, meta, spot illustration — so the breaths are buried:

- **390×844 (phone):** "the short breaths" label sits at ~1,635px — **1.9 full viewports deep**. The first screen shows the page heading and two telling titles. Nothing above the fold suggests a second family exists.
- **~545×1292 (small desktop window):** label at ~1,407px — just past one viewport.
- Page total today: ~3,500px on phone, and the buried family is the one that will grow (short lyrics arrive more often than praise-songs).

The group labels are correct as *labels* — 0.66rem, tracked, lowercase, accent — but invisible as *navigation*. A visitor who doesn't scroll never learns the sips exist below the feast.

**The goal:** within the first viewport, on any device, a visitor perceives that poems come in two families and can reach either in one action — without the page becoming louder.

## 2. What must hold (the language)

- Quiet, gallery-like. Lowercase lyrical labels. Words over icons (the sole amendment so far: the hour mark, in hand-drawn ink-stroke language — that door is open but narrow).
- Hairlines only; no radii except pills; no shadows. One 640px column.
- Motion slow and subtle; `prefers-reduced-motion` honored everywhere.
- The family names are authored and fixed: **"the long tellings"**, **"the short breaths"**.
- Counts, if shown, are words, not numerals ("five praise-songs", not "5").
- No engagement mechanics, ever.

## 3. Patterns already in the room (free to reuse, remix, or ignore)

- **Path rows** (arrival): full-width hairline rows, serif name left, utility hint right, hover slide. The site's strongest "choose a door" gesture.
- **Quiet accent group labels** (about page, current poems index): correct labels, weak wayfinding.
- **Skip-note head control** ("to the poem ↓"): a small utility control that jumps with smooth scroll (instant under reduced motion, −24px landing offset). Its conventions are established and implemented.
- **The bridge** (label + stem with falling accent drop): a between-sections marker with gentle motion.
- **Whisper lines** ("writings · poems · musings · beauty"): middle-dot joined fragments, wide tracking.
- **The hour mark**: precedent for tiny ink-stroke SVGs when words genuinely can't fit.

## 4. Directions worth sketching (starters, not prescriptions)

1. **Family doors at the top.** Two path-rows (arrival's pattern) directly under the section note — "the long tellings / five praise-songs" and "the short breaths / eight lyrics" — anchoring down the page (or opening sub-pages). Strong, familiar gesture; costs ~150px of calm at the top.
2. **Breaths lead.** Reorder: the light, numerous family first; the monumental tellings below (they may *suit* depth — a feast you descend to). Zero new UI. Question: do the tellings then inherit the same discoverability problem, and is that acceptable because they're five-and-slow-growing?
3. **Condensed telling entries.** On the index only, tellings render compact (title + dedication + meta, no excerpt) so all five fit in ~one viewport and the breaths surface at ~1.0 viewports. Trades away the excerpt's invitation.
4. **A whisper switch.** One line under the section note — "the long tellings · the short breaths" — each fragment a quiet anchor (skip-note styling family). Nearly free vertically; is a two-word line enough of a door?
5. **Two rooms.** /poems/ becomes a small fork page (two path rows, nothing else); each family gets its own page with its own note. Deepest structure, purest pages; adds a click before any poem.
6. **Something we haven't thought of.** The stair on hydra was hidden and still found — but it had the road's help. Be the road.

## 5. Behavior requirements (whatever the shape)

- Any jump/anchor reuses the established scroll convention: smooth, instant under reduced motion, −24px landing.
- Keyboard reachable; focus-visible = 1.5px accent outline, 3px offset.
- Colors and type from existing tokens only; everything follows `body[data-hour]` automatically.
- Must not degrade when the breaths reach twenty and the tellings reach eight.
- Discovery must work without JavaScript (anchors are fine; enhancement on top is fine).

## 6. Acceptance checklist

- [ ] At 390×844: both family names perceivable in the first viewport; each reachable in one action
- [ ] At desktop (≥1280×800): same
- [ ] The page's quiet is preserved — no new colors, no numerals, no icon vocabulary beyond the ink-stroke precedent
- [ ] Scales to 20+ breaths / 8+ tellings without redesign
- [ ] Keyboard + reduced-motion + hour-palette compliant
- [ ] Family names render verbatim: "the long tellings", "the short breaths"

## 7. References

- Live page: https://tachi.ink/poems/ (measurements above taken 2026-07-24)
- Current implementation: `src/pages/poems/index.astro`, classes `.poem-family`, `.poem-family-label` in `src/styles/prose.css`; entry pattern `.piece` in the same file
- Established conventions: `docs/design/2026-07-24-skip-note-indicator.md` (scroll behavior, control styling)
- Content model: poems carry `family: telling | breath` frontmatter; `order` sorts within a family (gaps of ten)
- Design system source: `design_handoff_tachi_site/` (tokens, prose classes, illustration catalog)
