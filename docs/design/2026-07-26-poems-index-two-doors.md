# Spec — Poems index: two doors (design 7b)

Supersedes `poems-index-families.md` for the **index page only**; the family pages and their contents are unchanged from that spec. Companion to `skip-note-indicator.md`. Reference render: `explorations/poems-7b-working.html` (index → family page, desktop and phone, live). 2026-07-26.

## 1. Why this replaces the three-preview index

The index no longer previews poems. It presents two doors, one per family. Each door states what the family is, whispers a few of the poems inside, ends that whisper with the number withheld, and carries the total on its baseline. This solves discoverability outright: nothing is hidden behind a scroll, no unfold, no more-link, no counting for the reader to do. The whole index ends above the fold at 390×720.

What it gives up: poem titles no longer sit at the top level. The whispered titles inside each door buy most of that back, provided they are generated newest-first (below).

## 2. Structure

```
Poems                      ← section heading, unchanged
praise-songs & lyrics      ← note, unchanged

──────────────────────────────  hairline
the short breaths                       ← family name, display serif 1.5rem
small poems, read in a single breath    ← description, italic 0.95rem
her hands · the shop you almost walked past
board meeting · salt · on waiting · and four others   ← the whisper
nine                                ●●●  ← count (accent) + dots
──────────────────────────────  hairline
the long tellings
life stories, told in verse
this, that, and the other thing. · japa
love in human form · ogun, if it was you
the year the factory stopped · and nine others
fourteen                            ●●●
──────────────────────────────  hairline
```

Each door is one `<a>` to `/poems/breaths/` or `/poems/tellings/`. Hover slides it 0.7rem right (arrival-path gesture), turns the family name and the dots accent.

## 3. The whisper

- Titles are the family's poems in display order (newest first), joined by ` · `, taken until the line budget is reached: **five titles on the breaths door, five on the tellings door**, then `and {remaining} others`.
- Count words, never numerals — `and four others`, not `and 4 others`. Use `numberToWords.ts`.
- Exactly one poem remaining reads `and one other`. Zero remaining: omit the clause entirely.
- Titles are rendered in the utility face (0.62rem, 0.14em tracking, line-height 2.1, `--ink-soft`) so they read as a murmur inside the door, not as a list of links. They are **not** individually clickable — the whole door is the target.
- The whisper regenerates on build, so the front page moves whenever you publish.

## 4. The count and the dots

Unchanged from `poems-index-families.md` §2: three 4.5px dots, descending opacity, breathing on a 4.5s stagger, accent on hover, `aria-hidden`. The count is one word in `--size-meta` / `--track-meta` / `--accent`, sitting on the same baseline row as the dots (`justify-content: space-between`).

## 5. What is removed

Delete from the index: the three preview rows per family, the `family-more` link, and (if built) the unfold mechanism. `.poem-row` styles remain in use on the family pages.

## 6. Family pages

Exactly as specified in `poems-index-families.md` §4, with one addition already agreed: **the wall is desktop-only.** Below 640px the two hung poems return to hairline rows carrying their frontmatter excerpt, so the phone family page is one rhythm from top to bottom.

## 7. CSS

```css
.door{display:block;text-decoration:none;border-top:1px solid var(--hairline);padding:1.9rem .2rem 2rem;transition:padding-left .45s ease}
.door:last-of-type{border-bottom:1px solid var(--hairline)}
.door:hover{padding-left:.7rem}
.door:hover .fname{color:var(--accent)}
.door .fname{font-family:var(--font-display);font-size:1.5rem;color:var(--ink);line-height:1.25;transition:color .4s}
.door .fdesc{font-style:italic;color:var(--ink-soft);font-size:.95rem;margin-top:.35rem;line-height:1.55}
.door .inside{font-family:var(--font-utility);font-weight:300;font-size:.62rem;letter-spacing:.14em;line-height:2.1;color:var(--ink-soft);margin-top:.95rem}
.door .base{display:flex;justify-content:space-between;align-items:center;margin-top:1rem}
.door .count{font-family:var(--font-utility);font-weight:300;font-size:var(--size-meta);letter-spacing:var(--track-meta);color:var(--accent)}
/* .dots — unchanged, see poems-index-families.md §2 */
.door:hover .dots i{background:var(--accent);animation:none;opacity:.9}

@media (max-width:639px){
  .family-page .wall{display:contents} /* or omit the wall server-side; rows carry the excerpt */
}
```

## 8. Acceptance checklist

- [ ] 390×720: heading, note, and both doors complete, above the fold, nothing clipped
- [ ] Whisper lists newest-first, five titles, then `and {word} others`; regenerates on publish
- [ ] Count and dots share one baseline; count is `--size-meta` in accent; no size below the token scale
- [ ] Whole door is one link and one tab stop; dots are `aria-hidden`; hover slides 0.7rem
- [ ] Family pages unchanged; wall suppressed under 640px with excerpts in its place
- [ ] Dots still under `prefers-reduced-motion`
- [ ] Works without JS
