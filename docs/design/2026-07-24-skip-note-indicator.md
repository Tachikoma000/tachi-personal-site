# Spec — Skip-Note Indicator ("to the poem")

Design brief + implementation spec for the author's-note skip affordance on tachi.com. Replaces the floating "the poem" pill (which obstructed text on mobile). 2026-07-24.

## 1. Purpose

Long author's notes can read like the end of the page; readers may never discover the poem below. The indicator gives them a quiet, always-reachable path to the poem without breaking the page's calm. It must never obstruct text, on any viewport.

## 2. Design rationale

- **Inline, not floating.** Both affordances live in the document flow. Anything fixed to the viewport edge of a one-column site will eventually sit on text (the failure of the pill). In-flow elements cannot obstruct.
- **Two placements, one purpose.** A reader decides to skip either immediately (at the note's head) or partway through (in which case they are scrolling and will meet the bridge at the note's end). Between them, every scroll position has a nearby exit. A third, persistent indicator was considered and rejected as too loud.
- **Motion whispers.** Animations are slow (3.6–4.5s cycles), low-amplitude, and disabled under `prefers-reduced-motion`.

## 3. The two elements

### 3a. Head skip — label row
The note's label row becomes a flex row: label left, skip control right.

- Text: `to the poem ↓` (essays: `to the essay ↓`). Lowercase, no punctuation besides the arrow (U+2193).
- A `<button>`, not a link (in-page action, no URL change). If the engineer prefers deep-linkable anchors, an `<a href="#poem-start">` with the same classes is acceptable.
- **Breathing ink (2a):** the whole control cycles soft-ink → accent → soft-ink over 4.5s (color + underline color only; nothing moves or resizes).
- **Drifting arrow (2b):** the ↓ alone dips 3px and returns, 3.8s cycle, ease-in-out. Text never moves.
- On narrow screens the row wraps; the control drops below the label, right-aligned, still in flow.

### 3b. Bridge — note's end
Centered column after the note's sign-off, before the closing hairline of the note block.

- Label: `the poem` (essays: `the essay`), lowercase, letterspaced.
- Below it a vertical hairline stem, 1px × 26px, in the hairline color.
- A drop of accent (40% of stem height) falls through the stem top→bottom over 3.6s, then rests ~40% of the cycle before repeating. Overflow hidden — the drop is only visible inside the stem.
- Whole unit is one button; hover turns the label accent.

## 4. Behavior

- Click → smooth scroll to the poem wrapper (`#poem-start`), offset −24px so the first line doesn't touch the viewport top.
- `prefers-reduced-motion: reduce` → scroll jumps instantly AND all three animations are disabled (static soft-ink control, static stem).
- Hover (both): color transitions to accent over 0.4s. The head skip's underline follows.
- Focus: 1.5px accent outline, 3px offset (keyboard accessible; both are real buttons).
- No state is persisted; the indicator appears on every visit, on every piece that has a note.

## 5. Markup

```html
<!-- head of note -->
<div class="note-head">
  <span class="note-label">a note from the author, before the poem</span>
  <button class="skip-note" onclick="skipNote()">to the poem <span class="arr">&#8595;</span></button>
</div>

<!-- ... note paragraphs, sign-off ... -->

<!-- end of note, inside the note block -->
<button class="note-bridge" onclick="skipNote()">
  <span>the poem</span>
  <span class="stem"></span>
</button>

<!-- the poem -->
<div id="poem-start"> ... </div>
```

## 6. CSS

```css
.note-head{display:flex;justify-content:space-between;align-items:baseline;gap:1rem;flex-wrap:wrap;margin-bottom:1.4rem}

.skip-note{appearance:none;border:none;background:none;cursor:pointer;
  font-family:var(--font-utility);font-weight:300;font-size:var(--size-hint);
  letter-spacing:var(--track-meta);text-transform:lowercase;color:var(--ink-soft);
  padding:0 0 .2rem;border-bottom:1px solid var(--hairline);
  transition:color .4s,border-color .4s;white-space:nowrap;flex:none;
  animation:skipBreathe 4.5s ease-in-out infinite}
.skip-note .arr{display:inline-block;animation:skipDrift 3.8s ease-in-out infinite}
.skip-note:hover{color:var(--accent);border-bottom-color:var(--accent)}
.skip-note:focus-visible{outline:1.5px solid var(--accent);outline-offset:3px}
@keyframes skipBreathe{0%,100%{color:var(--ink-soft);border-bottom-color:var(--hairline)}50%{color:var(--accent);border-bottom-color:var(--accent)}}
@keyframes skipDrift{0%,55%,100%{transform:translateY(0)}70%{transform:translateY(3px)}85%{transform:translateY(0)}}

.note-bridge{display:flex;flex-direction:column;align-items:center;gap:.5rem;margin:1.9rem auto 0;
  appearance:none;border:none;background:none;cursor:pointer;
  font-family:var(--font-utility);font-weight:300;font-size:var(--size-hint);
  letter-spacing:var(--track-poemtitle);text-transform:lowercase;color:var(--ink-soft);
  transition:color .4s}
.note-bridge:hover{color:var(--accent)}
.note-bridge:focus-visible{outline:1.5px solid var(--accent);outline-offset:3px}
.note-bridge .stem{width:1px;height:26px;background:var(--hairline);position:relative;overflow:hidden}
.note-bridge .stem::after{content:"";position:absolute;left:0;top:-40%;width:100%;height:40%;
  background:var(--accent);animation:stemRain 3.6s ease-in-out infinite}
@keyframes stemRain{0%{top:-40%}60%,100%{top:110%}}

@media (prefers-reduced-motion:reduce){
  .skip-note,.skip-note .arr,.note-bridge .stem::after{animation:none}
}
```

## 7. JS

```js
function skipNote(){
  const el = document.getElementById('poem-start');
  if (!el) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 24,
    behavior: reduced ? 'auto' : 'smooth'
  });
}
```

## 8. Tokens used

All colors/type come from existing custom properties (they shift with the hour automatically):
`--font-utility`, `--size-hint` (0.66rem), `--track-meta` (0.2em), `--track-poemtitle` (0.3em), `--ink-soft`, `--accent`, `--hairline`.
No new tokens are introduced. The animations inherit the hour's accent, so the indicator warms at dawn, cools at midday, silvers at night.

## 9. Acceptance checklist

- [ ] Nothing overlaps text at 320px width (indicator wraps below the label, right-aligned)
- [ ] Head skip breathes (4.5s) and arrow nods (3.8s); bridge drop falls (3.6s)
- [ ] Reduced motion: no animation, instant scroll
- [ ] Click from head and bridge both land the poem's first line ~24px below viewport top
- [ ] Both controls keyboard-focusable with visible accent outline
- [ ] Colors follow the active `data-hour` palette without extra code
- [ ] Applies to essays identically with "the essay" wording

## 10. Reference implementations

- Live prototype: `ui_kits/site/index.html` → any poem or The Knock (view on desktop + the phone frame in `ui_kits/site/mobile.html`)
- Animation explorations (chosen: 2a + 2b + 2e): `explorations/skip-note.html`
- Prototype source: `ui_kits/site/PoemsScreen.jsx`, `ui_kits/site/WritingsScreen.jsx`, `css/prose.css` (classes `.skip-note`, `.note-bridge`)
