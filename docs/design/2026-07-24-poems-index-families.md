# Spec — Poems index: two families (design 4g)

Companion to `skip-note-indicator.md`; answers the 2026-07-24 discoverability brief. Reference render: `explorations/poems-index-4g.html` (phone + desktop frames, animations live). 2026-07-24.

## 1. The shape

One page, both families perceivable in the first viewport on any device. Structure, top to bottom:

1. Section heading `Poems` + note `praise-songs & lyrics`
2. **Family block: the short breaths** (the fast-growing family leads)
3. **Family block: the long tellings**

Each family block:
- **Family header** — one link, flex row: left, the family name in display serif (~1.35rem phone / 1.5rem desktop) with an italic one-line description beneath; far right, **three ink dots**. The whole header navigates to the family page.
- **Three newest poems** as compact hairline rows.
- **More-link**, right-aligned: `five more breaths →` / `two more tellings →`.

### Copy (authored, fixed)
- `the short breaths` — *small poems, read in a single breath*
- `the long tellings` — *life stories, told in verse*
- More-links spell counts as words and recompute from content: `{count-minus-three} more breaths →`. If a family ever has ≤3 poems, omit its more-link (the dots remain).

### Poem rows
- Breath row: title (display serif, ~1.15rem) + year meta beneath; poem's **own spot illustration** right, 44px (phone) / 52px (desktop).
- Telling row: same + italic dedication line between title and meta.
- Rows are full links; hover slides the row 0.6rem right (arrival-path gesture). Hairline top rule per row; last row also gets a bottom rule.
- The illustration is the same asset the poem page uses (frontmatter `illustration`), so index and poem always match. Night mode: `filter: invert(0.88)` per the Spot convention.

## 2. The three dots

An ellipsis in ink — "and more…" without words. On the family header's far right, baseline-aligned.

- Three 4.5px circles, gap 0.34rem, `border-radius: 999px`, color `--ink-soft` at descending opacity (0.55 / 0.40 / 0.25).
- **Breathing:** each dot cycles opacity 0.25→0.8 over 4.5s (the skip-note rhythm), delays 0s / 0.35s / 0.7s — a slow ripple outward.
- Hover (whole header): dots turn `--accent` at 0.9 opacity; family name turns accent too.
- Decorative only (`aria-hidden`); the header link carries the label, e.g. `aria-label="the short breaths — all eight"`.

## 3. More-link animation

Identical vocabulary to the skip-note head control, horizontal:
- Breathing ink: color + underline cycle soft-ink→accent over 4.5s.
- The `→` (in its own span) drifts 3px right and back, 3.8s.
- Hover: accent immediately. Focus: 1.5px accent outline, 3px offset.

## 4. Family pages

`/poems/breaths/` and `/poems/tellings/` — each a full index of its family: same heading pattern (family name as title, description as note), full entries (tellings keep their excerpts here), newest first. Back link `← poems` in the skip-note utility style. The index's header, dots, and more-link all point at the family page — three doors, one room.

## 5. CSS (lift verbatim)

```css
.family-head{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;text-decoration:none;margin-bottom:.4rem}
.family-head .fname{font-family:var(--font-display);font-size:1.35rem;font-weight:400;color:var(--ink)}
.family-head .fdesc{font-style:italic;color:var(--ink-soft);font-size:.88rem;margin-top:.15rem}
.family-head:hover .fname{color:var(--accent)}
.fdots{display:flex;gap:.34rem;align-items:center;flex:none;padding:.4rem 0}
.fdots i{width:4.5px;height:4.5px;border-radius:999px;background:var(--ink-soft);animation:dotBreathe 4.5s ease-in-out infinite;transition:background .4s,opacity .4s}
.fdots i:nth-child(2){animation-delay:.35s}
.fdots i:nth-child(3){animation-delay:.7s}
.family-head:hover .fdots i{background:var(--accent);opacity:.9;animation:none}
@keyframes dotBreathe{0%,100%{opacity:.25}50%{opacity:.8}}

.poem-row{padding:.9rem .1rem;border-top:1px solid var(--hairline);display:flex;justify-content:space-between;align-items:center;gap:1rem;text-decoration:none;color:var(--ink);transition:padding-left .45s ease}
.poem-row:last-of-type{border-bottom:1px solid var(--hairline)}
.poem-row:hover{padding-left:.6rem;opacity:1}
.poem-row img{width:44px;height:44px;object-fit:contain;flex:none}
@media (min-width:640px){.poem-row img{width:52px;height:52px}}

.family-more{display:flex;justify-content:flex-end;margin:.8rem 0 2.6rem}
.family-more a{font-family:var(--font-utility);font-weight:300;font-size:var(--size-hint);letter-spacing:var(--track-meta);text-transform:lowercase;color:var(--ink-soft);text-decoration:none;padding-bottom:.2rem;border-bottom:1px solid var(--hairline);animation:skipBreathe 4.5s ease-in-out infinite}
.family-more a:hover{color:var(--accent);border-bottom-color:var(--accent)}
.family-more .arr{display:inline-block;animation:moreDrift 3.8s ease-in-out infinite}
@keyframes moreDrift{0%,55%,100%{transform:translateX(0)}70%{transform:translateX(3px)}85%{transform:translateX(0)}}

@media (prefers-reduced-motion:reduce){.fdots i,.family-more a,.family-more .arr{animation:none}}
```
(`skipBreathe` already exists from the skip-note spec.)

## 6. Acceptance checklist

- [ ] 390×844: both family names + descriptions + first more-link inside the first viewport
- [ ] Rows show each poem's own illustration (matches the poem page's spot; inverts at night)
- [ ] Counts as words, recomputed from content; more-link omitted at ≤3 poems
- [ ] Header, dots, and more-link all reach the family page; keyboard focus visible on header and more-link
- [ ] Dots ripple (4.5s, staggered), more-arrow drifts (3.8s); all still under reduced motion
- [ ] Scales to twenty breaths / eight tellings with no layout change (index always shows three)
- [ ] Works without JS (plain anchors)
