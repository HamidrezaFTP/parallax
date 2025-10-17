# Parallax — static demo

Quick start

1. Open `index.html` in your browser for a fast preview.
2. For a local server (recommended for iframes), from the repository root run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

What this repo contains

- `index.html` — page markup, sections and `.layer` elements with `data-speed` attributes.
- `css/style.css` — global styles; `.parallax-section` is full-viewport and `body` has a large height to allow scrolling.
- `js/script.js` — parallax logic (IntersectionObserver + rAF). See the file for the named `scrollHandler` implementation.

Developer checklist

- Preserve `.parallax-section` as a direct child and keep `.layer` elements sized to fill the section.
- To change motion, tweak `data-speed` attributes or `handleParallax()` in `js/script.js`.
- Avoid adding non-throttled scroll handlers; use requestAnimationFrame.
