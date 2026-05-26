# Sonnet Task Plan #2 — Hero Background, Light Mode Cohesion, Footer Redesign

You are Sonnet. Opus has done the diagnosis. Your job is implementation. Three tasks, **in order**. Each has a Verify checklist — don't move on until it passes.

---

## Shared context

- Both pages share `styles.css`. `project-detail.html` additionally loads `project-detail.css`.
- Global color tokens live at `styles.css:4-29` — use them (`var(--navy)`, `var(--navy-mid)`, `var(--cream)`, `var(--blue-light)`, `var(--blue-bright)`) instead of hex literals wherever possible.
- Light mode is toggled by adding `body.light-mode` (set by `shared-ui.js`). All light-mode overrides go in `body.light-mode <selector>` form. The existing light-mode block in `styles.css` starts around line 1100 and runs through ~1378 — group new overrides there for discoverability.
- The rain background image is `imgs/rain_background.jpeg`. It already exists.

---

## Task 1 — Make the rain background visible on the top half of `project-detail.html`

### Diagnosis (don't re-do this work)

- `project-detail.css:6-8` sets `body { background: url('imgs/rain_background.jpeg') ... fixed }`. This works in principle, but:
  - The carousel wrapper inside `.project-hero` is 16:9 and full width with a semi-opaque `var(--glass-bg)` fill — it dominates the top of the page, leaving only a narrow 120px strip above it where the body bg could be seen.
  - `.project-content` (styles at `project-detail.css:195-198`) is `background: var(--navy)` — fully opaque — so the moment you scroll past the carousel, no rain is visible.
- The user wants the rain to read as the **top-half hero atmosphere**, then gracefully fade into the navy content section below.

### The fix

Build a dedicated hero background layer instead of relying on `body { background: fixed }`. The body image can stay or be removed — the new layer takes over the visual job.

**Step 1a — Markup.** In `project-detail.html`, inside `<section class="project-hero">` (currently around lines 61-105), add a sibling element **as the first child** of the section:

```html
<section class="project-hero">
  <div class="project-hero__bg" aria-hidden="true"></div>
  <!-- existing .carousel-container ... -->
</section>
```

**Step 1b — CSS.** In `project-detail.css`, replace the current `.project-hero` block (lines 50-55) and add `.project-hero__bg`:

```css
.project-hero {
  width: 100%;
  padding: 120px 0 60px;
  background: transparent;
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.project-hero__bg {
  position: absolute;
  inset: 0;
  background: url('imgs/rain_background.jpeg') center center / cover no-repeat;
  filter: brightness(0.65) saturate(0.9);
  z-index: 0;
  /* Fade out into the navy content section below */
  -webkit-mask-image: linear-gradient(to bottom,
      rgba(0, 0, 0, 1.00) 0%,
      rgba(0, 0, 0, 1.00) 55%,
      rgba(0, 0, 0, 0.55) 85%,
      rgba(0, 0, 0, 0.00) 100%);
          mask-image: linear-gradient(to bottom,
      rgba(0, 0, 0, 1.00) 0%,
      rgba(0, 0, 0, 1.00) 55%,
      rgba(0, 0, 0, 0.55) 85%,
      rgba(0, 0, 0, 0.00) 100%);
}

.project-hero > .carousel-container,
.project-hero > .project-navigation {
  position: relative;
  z-index: 1;
}
```

Then **remove or transparent-ize** the existing `body { background: url(...) fixed }` rule at `project-detail.css:6-8`. Replace with:

```css
body {
  background: var(--navy);
}
```

This stops the body bg image from leaking through anywhere else on the page (which currently happens behind transparent edges) and centralizes the atmosphere in the hero layer.

**Step 1c — Light mode.** Add a light-mode rule so the rain reads against a lighter base:

```css
body.light-mode .project-hero__bg {
  filter: brightness(1.05) saturate(0.7) contrast(0.92);
}

body.light-mode body {
  background: #efe7d5;
}
```

### Verify Task 1

1. Load `project-detail.html?id=001`. The rain background must be clearly visible behind and around the carousel area, with no hard horizontal seam where it ends.
2. Scroll down — the rain fades smoothly into the navy `.project-content` background. No visible step or band.
3. Toggle light mode — the rain remains visible but reads correctly against the lighter palette (no harsh dark wash).
4. No horizontal scrollbar appears at any breakpoint.

---

## Task 2 — Light mode cohesion (gallery section + audit)

### Diagnosis (don't re-do this work)

- `.gallery-section { background: var(--navy-mid); }` at `styles.css:879` has **no light-mode override**. The text colors inside it (`.gallery-item-title`, `.gallery-item-desc`) already have light-mode rules at `styles.css:1331-1337`, which is why text appears to switch but the background stays dark — the bug the user described.
- `.gallery__bg` / `.gallery__droplets` are `display: none` on desktop (`styles.css:894, 917`) so light-mode filter overrides on them have no effect at desktop widths.

### The fix

**Step 2a — Override the gallery section background in light mode.** Add to the light-mode block in `styles.css` (around line 1318):

```css
body.light-mode .gallery-section {
  background: #e8dfcc;
  border-top-color: rgba(15, 31, 53, 0.12);
  border-bottom-color: rgba(15, 31, 53, 0.12);
}

body.light-mode .gallery-section .section-label {
  color: #1a5a8a;
}

body.light-mode .gallery-section .section-title {
  color: #0f1f35;
}
```

**Step 2b — Full light-mode audit pass.** For each of these selectors, **read** the current rule, then add a `body.light-mode` override if the rule sets a dark color, dark background, dark border, or a filter/shadow that assumes a dark surface. Do not skip any:

- `.about-strip` (and its `.section-title`, paragraph text) — confirm it reads cleanly. Add overrides if it inherits dark-only colors.
- `.section-title` (global) — at least where it appears against light sections.
- `.section-label` (global)
- `.project-card` background, border, title color, description color, `.btn-view-project` color and border, `.card-number` color
- `.project-carousel-btn` background/border/icon color
- `.project-detail-main` wrapper if it has a dark background
- `.carousel-arrow` icon stroke color
- `.tech-tag` (or whatever class is used in `.tech-stack-items`)
- `.nav-project-btn` background, border, label color
- `.project-hero` (already covered in Task 1 — skip)
- `.project-content` (already overridden at `project-detail.css:639` — confirm visually, adjust if needed)

For each one, the rule should keep the existing dark-mode value untouched and just add an override. Use these light-mode anchor colors to stay consistent with the existing footer override:

| token              | dark value              | light value              |
| ------------------ | ----------------------- | ------------------------ |
| section surface    | `var(--navy-mid)`       | `#e8dfcc`                |
| card surface       | `var(--glass-bg)` (dark)| `rgba(255, 255, 255, 0.7)` |
| primary text       | `var(--cream)`          | `#0f1f35`                |
| secondary text     | `var(--text-secondary)` | `rgba(15, 31, 53, 0.62)` |
| accent             | `var(--blue-light)`     | `#1a5a8a`                |
| border / divider   | `var(--glass-border)`   | `rgba(15, 31, 53, 0.14)` |

**Step 2c — Smoke test for stragglers.** Open both pages in light mode, scroll from top to bottom, and screenshot every section. Any area where the text contrast is wrong (e.g. cream text on cream bg) or where a panel reads dark while the rest of the page reads light is a bug — fix it before declaring done.

### Verify Task 2

1. Light mode on `index.html`: navbar, hero, project carousel, about strip, gallery, footer — every section reads cohesively light. No section retains the dark navy background.
2. Light mode on `project-detail.html`: hero, carousel, project header, description, tech stack, project navigation, footer — every section reads cohesively light.
3. Text contrast on every section passes a quick squint test (titles dark, body legible).
4. Toggle back to dark — nothing in dark mode looks broken or changed.

---

## Task 3 — Footer redesign (layout + light-mode color + link icons)

### Current state (don't re-do this analysis)

- Markup: `index.html:324-350` and `project-detail.html` (should mirror it — confirm). Single `.footer-contact-panel` card with phone, email, LinkedIn, GitHub.
- Dark mode footer is described as fine — **do not change dark-mode appearance**. Only refine light mode and add icons that work in both.
- Current light-mode footer bg is `#d8d0c0` at `styles.css:1340` — the user described it as not great.

### Design direction

- **Layout:** Move from a single centered card to a two-column layout on desktop (left: title + kicker + supporting line; right: contact list). On mobile, stack to single column. This gives the title room to breathe and the contact list more presence.
- **Light mode palette:** swap muddy tan for a warm cream + deep navy ink combo. Use these:
  - Footer bg: `#f1ead6` (cream) with a subtle inner gradient to `#e8dfcc`
  - Title ink: `#0f1f35`
  - Kicker: `#1a5a8a`
  - Contact item bg: `rgba(255, 255, 255, 0.65)` with `1px solid rgba(15, 31, 53, 0.12)`
  - Contact item hover: `background: rgba(45, 143, 206, 0.10); border-color: #2d8fce;`
  - Contact label: `#1a5a8a`
  - Contact value: `#0f1f35`
- **Icons:** add an inline SVG inside each `.footer-contact-item`, before the label/value, in a small icon slot. Use [Feather](https://feathericons.com)-style stroked SVGs sized 22×22 with `stroke="currentColor"` so they inherit the link color in both modes. **Don't use a font icon library or external file — paste the SVG paths directly into the HTML.** Suggested icons:
  - Phone → `phone` (curved handset)
  - Email → `mail` (envelope)
  - LinkedIn → `linkedin` (LinkedIn logo)
  - GitHub → `github` (Octocat outline)

### Implementation

**Step 3a — Markup.** Update the footer in `index.html` (and mirror in `project-detail.html`) so each `.footer-contact-item` has three children: icon, label, value.

```html
<a href="tel:4042475627" class="footer-contact-item">
  <span class="footer-contact-icon" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
    </svg>
  </span>
  <span class="footer-contact-label">Phone</span>
  <span class="footer-contact-value">404 247 5627</span>
</a>
```

Repeat with the appropriate SVG path for email, LinkedIn, and GitHub. Look up the Feather paths for `mail`, `linkedin`, `github` — they are short and well-known. Don't hand-roll new icons.

**Step 3b — Layout CSS.** In `styles.css`, replace the existing `.footer-inner` / `.footer-contact-panel` rules (lines 1007-1026) with a two-column desktop layout:

```css
.footer-inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}

.footer-contact-panel {
  display: contents;
}

.footer-contact-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer-contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

Wrap the kicker + title in a new `<div class="footer-contact-intro">…</div>` block. The `display: contents` on the existing panel lets the two children participate in the grid directly while keeping the markup grouped.

**Step 3c — Contact item CSS with icon slot.**

```css
.footer-contact-item {
  display: grid;
  grid-template-columns: 32px auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-primary);
  text-decoration: none;
  transition: border-color 0.25s, background 0.25s, transform 0.25s;
}

.footer-contact-item:hover {
  border-color: var(--blue-light);
  background: rgba(78, 179, 232, 0.08);
  transform: translateY(-2px);
}

.footer-contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--blue-light);
}

.footer-contact-value {
  text-align: right;
}
```

**Step 3d — Light mode block.** Replace the existing `body.light-mode footer` block at `styles.css:1340` with:

```css
body.light-mode footer {
  background:
    linear-gradient(180deg, #f1ead6 0%, #e8dfcc 100%);
  border-top: 1px solid rgba(15, 31, 53, 0.12);
}

body.light-mode .footer-kicker {
  color: #1a5a8a;
}

body.light-mode .footer-title {
  color: #0f1f35;
}

body.light-mode .footer-contact-item {
  background: rgba(255, 255, 255, 0.65);
  border-color: rgba(15, 31, 53, 0.12);
  color: #0f1f35;
}

body.light-mode .footer-contact-item:hover {
  background: rgba(45, 143, 206, 0.10);
  border-color: #2d8fce;
}

body.light-mode .footer-contact-icon {
  color: #1a5a8a;
}

body.light-mode .footer-contact-label {
  color: #1a5a8a;
}

body.light-mode .footer-contact-value {
  color: #0f1f35;
}

body.light-mode .footer-bottom {
  border-top-color: rgba(15, 31, 53, 0.12);
}

body.light-mode .footer-bottom p {
  color: rgba(15, 31, 53, 0.55);
}
```

**Step 3e — Mobile.** In the `@media (max-width: 768px)` block (around `styles.css:1518`), add:

```css
.footer-inner {
  grid-template-columns: 1fr;
  gap: 32px;
}
```

And shrink the contact item padding slightly if needed. Confirm icons remain visible and aligned.

### Verify Task 3

1. Dark mode footer: layout is now two columns on desktop (intro left, contact list right), each contact item shows an icon in front of its label. Colors unchanged from before.
2. Light mode footer: cream gradient background, clean dark navy ink, contact items as white-tinted cards with blue accent on hover. No muddy tan.
3. Each contact item shows the correct icon (phone, mail, linkedin, github).
4. Mobile (≤768px): footer stacks to one column; icons and text still legible.
5. Mirror the same markup changes into `project-detail.html`'s footer if it has one — both pages must look identical.

---

## Out of scope

- Don't redesign the navbar.
- Don't change the hero CTA buttons.
- Don't change typography choices or font sizes outside the footer.
- Don't introduce a third color theme. Don't add a build step or framework.
- Don't add a contact form. Don't add social links beyond the existing four.

## Definition of done

All three Verify checklists pass on desktop (≥1280px) and mobile (~375px), in both dark and light mode, on both `index.html` and `project-detail.html`. No new console errors. No horizontal scrollbar at any breakpoint.
