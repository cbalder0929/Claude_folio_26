# Sonnet Task Plan — Fix Light Mode + Language Toggle

You are Sonnet. The user (Charles) has identified three concrete problems with the navbar control panel and i18n. Work through them **in the order listed**. Do not skip ahead — Task 1 is gating because the buttons need to be visible and usable before wiring up their behavior.

---

## Project context (read this first)

- This is a static portfolio site. Entry points: `index.html` and `project-detail.html`.
- Shared CSS: `styles.css`. Detail-only CSS: `project-detail.css`.
- Shared JS: `script.js` (loaded by `index.html`). Detail-only JS: `project-detail.js`.
- The "logo hover panel" is a vertical stack of two buttons (`Light Mode`, `Español`) that appears when you hover the navbar logo on the **left** side of the page.

Relevant existing code:
- Markup (both pages): `<div class="logo-controls">` inside `<div class="nav-logo-wrapper">` (index.html:33-44, project-detail.html:36-46).
- Panel CSS: `styles.css:156-169` (`.logo-controls`) and `styles.css:182-219` (`.ctrl-btn`).
- Light mode JS: `script.js:160-178`.
- Language JS + dictionary: `script.js:184-285`.

---

## Task 1 — Fix the alignment of the control buttons (BLOCKER)

### The bug

`.logo-controls` is `position: absolute; right: 0;` relative to `.nav-logo-wrapper`. The wrapper sits flush-left in the navbar (the logo is on the LEFT side of the page). Each `.ctrl-btn` is ~140px wide (uppercase text + icon + padding), but the logo image is only 64px. With `right: 0`, the buttons' right edge aligns with the logo's right edge, so the buttons extend **leftward off the viewport** — especially on mobile where the navbar padding is only 24px. They are unusable.

### The fix

In `styles.css` around line 156, change the panel anchor so the buttons extend **rightward into open navbar space** instead of leftward off-screen.

Specifically:
- Change `right: 0;` to `left: 0;` on `.logo-controls`.
- Keep `top: calc(100% + 2px);` (still drops below the logo).
- Keep `flex-direction: column` and `gap: 8px` (vertical stack).
- The `translateX(-3px)` hover transform on `.ctrl-btn:hover` (styles.css:206) currently slides buttons LEFT on hover — since the panel now opens to the right, change this to `translateX(3px)` so the hover motion stays consistent with the panel's growth direction.

### Verify Task 1 before moving on

1. Open `index.html` in a browser at desktop width.
2. Hover the logo (top-left). The two buttons should appear stacked vertically, fully inside the viewport, with their **left** edges aligned to the logo's left edge.
3. Resize to ~375px wide (mobile). The buttons must still be fully visible — no horizontal clipping, no horizontal scrollbar.
4. Hover each button — it should slide slightly **right**, not left.
5. Repeat on `project-detail.html?id=001`.

**Do not start Task 2 until the user confirms the buttons look right.** If you broke the desktop layout while fixing mobile, revisit before proceeding.

---

## Task 2 — Make light mode work on `project-detail.html`

### The bug

`project-detail.js` has **zero** light-mode logic. The `#lightModeBtn` button exists in the detail page markup (project-detail.html:37-40) but nothing is wired up, so clicking it does nothing. Light mode only works on `index.html` because `script.js` (which contains the listener) is not loaded by the detail page.

### Plan

Do **not** copy `script.js` wholesale into the detail page — it contains parallax + carousel logic that doesn't apply. Instead, factor out a tiny shared module.

**Step 2a — Extract a shared helper.**

Create `shared-ui.js` at the project root. Move only these two concerns into it:
1. Light mode toggle (currently `script.js:160-178`).
2. Language toggle + `translations` dictionary + `applyLanguage()` + `langBtn` listener (currently `script.js:184-285`).

Guard every `getElementById` lookup with a null check — both pages share button IDs, but the dictionary keys used on each page differ, so the script must not crash if an element is absent.

Persist user choice across pages with `localStorage`:
- Key `portfolio.lightMode` → `'true'` | `'false'`.
- Key `portfolio.lang` → `'en'` | `'es'`.

On every page load, read these and apply the stored state before the page paints (so there's no flash of the wrong theme).

**Step 2b — Load it from both pages.**

In `index.html`, add `<script src="shared-ui.js"></script>` **before** `<script src="script.js"></script>` and remove the duplicated logic from `script.js` (the light-mode block and the language block).

In `project-detail.html`, add `<script src="shared-ui.js"></script>` before `<script src="project-detail.js"></script>`.

**Step 2c — Verify the detail page reuses the existing light-mode CSS.**

Search `styles.css` for `body.light-mode` — this rule already exists and applies broadly. Check `project-detail.css` for any selectors that override colors without a `body.light-mode` variant. Add light-mode overrides for any detail-page-specific selectors (carousel arrows, project meta panels, body background of the detail page, etc.) so the detail page actually changes appearance, not just the navbar.

### Verify Task 2 before moving on

1. From `index.html`, toggle on light mode, then click "View Project" on any card.
2. The detail page must load already in light mode (no flash of dark).
3. The `#lightModeBtn` on the detail page must show 🌙 + "Dark Mode" (matching the current state), and clicking it must toggle back to dark.
4. Toggle dark mode on detail page, navigate back via the back arrow. Index page must come back up in dark mode.

---

## Task 3 — Fix translation coverage

### The bug

Many text nodes have no `data-i18n` attribute, so the language toggle leaves them untranslated. The `translations` dictionary in `script.js:184-253` also has gaps where the English/Spanish key pair doesn't actually exist for content shown on the page.

### Plan

**Step 3a — Audit untranslated elements on `index.html`.**

These elements are visible but lack `data-i18n`. Add the attribute and a matching entry in both `en` and `es` translation maps:

- Each `.card-title` (10 project titles — note "GalloShowdown", "Agendi", "NextMove", "Craft World", "Wordle", "FinBot.AI", "FinBotV2", "Bank Parser", "Additive Synthesizer", "CODE102 Portfolio", "Roulette", "Odds Of You", "Image Analyzer", "Doodle.AI"). Use keys like `card001Title` through `card014Title`. Most product names stay the same in Spanish — only translate where it makes sense (e.g., "Craft World" → "Mundo Artesanal" only if Charles wants it; otherwise keep proper nouns identical in both languages).
- Each `.card-desc` (14 project descriptions). Keys `card001Desc` through `card014Desc`.
- Each `.btn-view-project` text "View Project" → `viewProject` → "Ver Proyecto".
- Each `.gallery-item-title` and `.gallery-item-desc` (6 items). Keys `gallery1Title`..`gallery6Title`, `gallery1Desc`..`gallery6Desc`.
- Footer: `.footer-kicker` ("Contact"), `.footer-title` ("Let's connect"), every `.footer-contact-label` ("Phone", "Email", "LinkedIn", "GitHub"). Keys `footerContactKicker`, `footerConnect`, `footerLabelPhone`, etc.

**Step 3b — Audit `project-detail.html`.**

Open the page and scan every visible string. At minimum:
- Back button label.
- Any section headings injected by `project-detail.js` (read the JS — if strings are hard-coded in JS, they need an i18n-aware version. The pragmatic fix is to keep two parallel string tables in `project-detail.js` keyed by `currentLang` from `shared-ui.js`).

Add `data-i18n` attributes for everything in the static HTML, and a `currentLang`-aware rendering path for anything injected by JS.

**Step 3c — Extend the `translations` dictionary.**

Move the `translations` object into `shared-ui.js` (from Task 2). Add every new key from steps 3a and 3b. Keep keys alphabetical within each language block so future additions are easy to spot.

**Step 3d — Confirm `applyLanguage()` re-runs after dynamic content injects.**

`project-detail.js` builds carousel slides and other DOM nodes after page load. After it finishes injecting, it must call `applyLanguage(currentLang)` (exposed from `shared-ui.js`) so any newly-inserted `data-i18n` elements get translated.

### Verify Task 3

1. Load `index.html`, toggle to Español. Every visible string in nav, hero, projects, about, gallery, and footer must switch to Spanish. No English text should remain (other than intentional proper nouns).
2. Click into a project. Detail page should already be in Spanish.
3. Toggle back to English on the detail page. Every string switches back.
4. Reload — language persists.

---

## Out of scope

- Don't redesign the buttons. Don't change icons, colors, or sizes beyond what Task 1 requires.
- Don't refactor `script.js` beyond removing the two blocks that move into `shared-ui.js`.
- Don't add a third language or a language picker UI — keep it a binary EN↔ES toggle.
- Don't add a build step. This stays vanilla HTML/CSS/JS.

## Definition of done

All three Verify checklists pass. No console errors on either page in either language in either theme. No layout regressions on desktop (≥1280px), tablet (~900px), or mobile (~375px).
