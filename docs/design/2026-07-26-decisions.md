# Design decisions — 26 July 2026

One session, one subject: what the poems section becomes now that the site holds real work. Read this before the older specs; where it disagrees with the prototype in `ui_kits/`, this document and the specs beside it win.

**Decided today:** the poems index becomes two doors (7b) · the family page hangs its two newest as a wall on desktop only (6c) · counts are spoken as words · the wall is suppressed on phones. **Explored and not taken:** the three-preview index with unfold (6f), the full gallery wall (5r), the peek row, and the earlier 4g index.

## 0. What changed since the last handoff

The site now holds **23 poems and one essay**, in two authored families:

| family | slug | count | description (authored, fixed) |
| --- | --- | --- | --- |
| the short breaths | `/poems/breaths/` | nine | *small poems, read in a single breath* |
| the long tellings | `/poems/tellings/` | fourteen | *life stories, told in verse* |

Display order within a family is `order:` ascending from frontmatter — **not** date. Every poem carries `illustration` (index/emblem) and optionally `tailpiece`; both come from the 50-illustration set and invert at night.

The old flat index (all poems in one list) and the interim 4g index (three previews per family plus a "more" link) are both retired.

---

## 1. DECIDED — The poems index is two doors (7b)

**Spec:** `specs/poems-index-two-doors.md` · **Live reference:** `explorations/poems-7b-working.html`

The index presents two doors, one per family. Each door carries, in order: the family name (display serif 1.5rem, 1.7rem desktop), its italic description, a **whisper** of the five newest titles ending `and {word} others`, and a baseline row holding the **count as a word** in accent plus the three breathing dots. Hover slides the door 0.7rem right and turns name and dots accent. The whole door is one link and one tab stop.

Why it won: it ends the discoverability problem outright. Nothing is behind a scroll, nothing needs unfolding, and the size of each family is stated before the reader decides. The whole index sits above the fold at 390×720.

What it costs, accepted knowingly: no poem title sits at the top level any more. The whisper buys most of that back, and because it regenerates newest-first on every build, the front page still moves when you publish.

Two rules that only look like details:
- Titles print **verbatim** (so "Ogun, if it was you" keeps its capital) — a poem's title is authored text, not UI copy.
- Titles join with a **non-breaking space before the separator** (`title + "\u00a0· " + title`), so a ` · ` can never wrap to the start of a line and read as a bullet.

## 2. DECIDED — Counts are spoken as words

`nine`, `fourteen`, `and four others` — never numerals, per the site's copy rules. Rendered in `--size-meta` / `--track-meta` in **accent**, matching `.piece-meta`; never below the token scale. Production uses the repo's `numberToWords.ts`, so a tenth breath reads correctly without anyone editing a map.

## 3. DECIDED — The family page: two hung, the rest shelved (6c)

**Spec:** `specs/poems-index-families.md` §4, as amended here.

Behind each door: the family's **two newest poems hung as a wall** — illustration (54px), title, and a real couplet drawn from the poem — above a hairline rule; **everything older shelved as the hairline list**, each row carrying its frontmatter excerpt and its illustration (44px).

This is the compromise between the plain list and the full gallery: the wall reads as an emphasis on what is new, not as a system to be maintained, so the hairline vocabulary survives everywhere else.

## 4. DECIDED — The wall is desktop-only

Below 640px there is no wall. The two newest fall back into the hairline list as ordinary rows carrying their **frontmatter excerpt** (not the wall couplet), so the phone family page reads in one rhythm top to bottom. Reason: at 390px a two-column grid collapses into stacked full-width plates that push the rest of the family under the fold — the exact problem the redesign set out to fix.

## 5. Standing decisions this session confirmed

- **Illustrations stay assigned.** `continuous-line` belongs to the about page; family marks, if ever used, take unassigned illustrations (`wave-flow` and `liquid-blob` were the candidates). One mark, one meaning.
- **No new tokens.** Everything above is built from the existing scale, hairlines, ma, and the two animation rhythms already in the system (4.5s breathe, 3.8s drift).
- **Author's-note affordances unchanged** — `specs/skip-note-indicator.md` still governs "to the poem ↓" and the bridge.

---

## 6. Explored, not taken

Kept for provenance; all still viewable.

| idea | where | why not |
| --- | --- | --- |
| **6f** three previews per family + "unfold the other six ↓" in place | `explorations/poems-6c-6f.html` | genuinely good, and beaten by the doors: unfolding fourteen tellings makes a very long index, and the doors state the same counts without any interaction |
| **5r / 6b** full gallery wall for a whole family | `explorations/beauty-round2.html` | a grid of nine breaks the hairline language and sets unevenly with long titles; survives as the two-poem wall in 6c |
| **6e** fourth row clipped at 42% ink | `explorations/beauty-round2.html` | the site's only fade; the spoken count does the same work honestly |
| **6g** more-link naming withheld titles | `explorations/beauty-round2.html` | absorbed into 7b's whisper, which does it inside the door |
| **7a / 7c / 7d** other door treatments (plates, couplet-speaking, quiet fork) | `explorations/poems-two-doors.html` | 7c is the most beautiful and the tightest fit on a phone; 7b keeps the titles and the calm |
| **4g** three previews + more-link | `explorations/poems-index-4g.html` | the design the doors replace |

## 7. Still open — from the beauty exploration

`explorations/beauty-2026-07-26.html` raised six questions about the reading itself. Four are unanswered and worth a session:

- **E · Light** — an optional `hour:` in frontmatter, so a poem opens in its own light (the hospital poems in indigo, the island poem at dawn) and hands the hour back on exit. *Recommended first.*
- **5k · After the last line** — one quiet line beneath the tailpiece naming the next poem in the family. Twenty-three dead ends become a book.
- **5e · The telling, set** — first stanza at 1.5rem, the rest settling to 1.32rem/1.95, so a long praise-song opens its throat and then speaks.
- **5i · The turning epigraph** — the arrival page's fixed quotation becomes a rotating couplet from a real poem, attributed.

## 8. Files from today

- `specs/poems-index-two-doors.md` — the index, implementable as written
- `explorations/poems-7b-working.html` — chosen design, live: index (desktop + phone) → family page (desktop + phone)
- `explorations/poems-6c-6f.html` — the unfold index and the 6c family pages, live
- `explorations/poems-two-doors.html` — the four door treatments
- `explorations/beauty-round2.html` — the wall vs list comparison and the four "there is more" mechanics
- `explorations/beauty-2026-07-26.html` — the six-band beauty exploration
