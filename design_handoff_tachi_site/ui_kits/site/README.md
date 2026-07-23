# UI kit — tachi.com

Interactive recreation of the living prototype (`uploads/brand_assets-1784742096929.html`), rebuilt from the design-system components.

- `index.html` — the whole site: arrival → writings / poems / book / about, plus the six-hour light dial. Click the paths, the top nav, or the ensō (returns home).
- `ArrivalScreen.jsx` — ensō draw-on, wordmark, whisper, epigraph, path list.
- `WritingsScreen.jsx` — index of pieces with hairline rules.
- `PoemsScreen.jsx` — poem index + full poem views.
- `BookScreen.jsx` — *Handles, Not Halos* cover object + store links.
- `AboutScreen.jsx` — prose, thread, colophon.

The sky, accent, and paper follow `body[data-hour]`; on load it is set from the visitor's clock (`hourOf`).
