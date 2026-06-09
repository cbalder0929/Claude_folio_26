# Spacing Revisions — Implementation Instructions (for Sonnet)

> Self-contained handoff. Execute the two tasks below exactly. All changes are isolated in a
> **new** `revisions.css` file plus **one** added `<link>` in `index.html`. **Do not edit
> `styles.css`.** No build step, no framework — this is a plain static HTML/CSS/JS site.

## Goal

1. **Project cards:** make three logos a little bigger — Roulette (`imgs/rouletteLogo.png`),
   Odds Of You / shark (`imgs/shark.png`), and Doodle.AI (`imgs/doodleAI.png`). All card
   images share one rule (`.project-card > img`, `styles.css:733`) sized `min(80%, 220px)`
   with `object-fit: contain`, so these read small. Enlarge only those three (~17%).
2. **Gallery section:** reduce the large empty vertical space (from
   `.gallery-section > .section-inner` padding `120px/80px` at `styles.css:940` and
   `.gallery-header` margin `56px` at `styles.css:947`), and make the gallery cards 25%
   larger on desktop so the carousel fills its column.

---

## Task 1 — Create `revisions.css`

Create a new file at the project root: `revisions.css` with **exactly** this content:

```css
/* ============================================================
   REVISIONS — spacing fixes (overrides styles.css)
   Loaded after styles.css; rules here win on equal specificity.
   ============================================================ */

/* 1. Enlarge three project-card logos that read small in the shared square.
   src$= (ends-with) is robust to path changes. Specificity (0,2,1) beats the
   base .project-card>img rule, and this file loads later. */
.project-card > img[src$="rouletteLogo.png"],
.project-card > img[src$="shark.png"],
.project-card > img[src$="doodleAI.png"] {
  width: min(94%, 258px);   /* ~17% larger than the 80%/220px default */
}

/* 2. Reduce the gallery section's empty vertical space. */
.gallery-section > .section-inner {
  padding-top: 64px;        /* was 120px */
  padding-bottom: 56px;     /* was 80px  */
}
.gallery-header {
  margin-bottom: 32px;      /* was 56px */
}

/* 3. Make gallery cards 25% larger on desktop (3-up view).
   Scoped to >=901px so it does NOT clobber the tablet (<=900px, 2-up at
   styles.css:1619) and mobile (<=768px, 85% at styles.css:1717) rules,
   which source order would otherwise override and cause overflow. */
@media (min-width: 901px) {
  .gallery-item {
    flex: 0 0 calc((100% - 40px) / 3 * 1.25);
  }
}
```

---

## Task 2 — Link `revisions.css` in `index.html`

In `index.html`, find this line (currently **line 21**):

```html
  <link rel="stylesheet" href="styles.css" />
```

Add the new stylesheet link **immediately after** it, so the result reads:

```html
  <link rel="stylesheet" href="styles.css" />
  <link rel="stylesheet" href="revisions.css" />
```

`revisions.css` MUST load after `styles.css` — the overrides depend on source order.

---

## Constraints

- **Do not modify `styles.css`.** Only create `revisions.css` and add the one `<link>` line.
- No build system, no bundler, no CSS framework (per `CLAUDE.md`).
- No color changes — light/dark mode behavior is untouched.

## Why these values (for reference, do not change without reason)

- Logos: `min(94%, 258px)` is ~17% up from `min(80%, 220px)`. Enlarging the square enlarges
  the `contain`-fitted logo proportionally. Dial range: `min(90%, 240px)` (subtler) →
  `min(100%, 280px)` (bolder).
- Gallery padding: trims ~56px top + ~24px bottom + ~24px header ≈ 104px of dead space while
  keeping the section breathing.
- Cards `* 1.25`: each desktop card becomes 25% wider (~41.6% of the track), so ~2.3 larger
  cards show per view. Scroll/snap behavior unchanged; tablet/mobile untouched.

## Verification

1. Open `index.html` in a browser (static site — open the file directly or serve it).
2. **Project cards:** scroll the projects carousel to Roulette (011), Odds Of You (012),
   Doodle.AI (014). Those three logos are visibly larger; other cards (e.g. 008 Bank Parser,
   013 Image Analyzer) are unchanged.
3. **Gallery:** scroll to the Gallery section. Top/bottom whitespace is tighter and cards are
   noticeably larger, filling the section width.
4. **Responsive:** narrow the window below 900px (2-up) and below 768px (~1 card). No overflow
   or broken layout.
5. Toggle light/dark mode — nothing regressed.
