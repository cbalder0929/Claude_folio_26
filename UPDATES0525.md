# Updates — 2026-05-25

## 1. Mobile back button on project-detail page

**File:** `project-detail.html`, `project-detail.css`

On the project detail page in mobile view, the entire navbar is hidden (`styles.css` line 1670), leaving no way to return to the main site. Added a back button in the top-left of the header that is visible on mobile and routes the user back to `index.html`.

- Reused the existing `.back-home-btn` element already in the navbar
- Overrode the mobile rule so the navbar remains rendered on mobile, but only the back button is shown (logo, controls, and nav links stay hidden)
- Pinned the navbar to the top-left of the viewport on mobile with a transparent background so it floats over the hero carousel

## 2. Move Prev / Next project buttons under the video

**File:** `project-detail.html`, `project-detail.css`

There are 2 buttons at the bottom of the project-detail page (`#prevProjectBtn` and `#nextProjectBtn` inside `.project-navigation`). They currently live at the bottom of `.project-content`, after the Tech Stack section, and on mobile they stack one on top of the other.

What to do:
- Move the `.project-navigation` block out of `.project-content` and place it inside `.carousel-container`, right after `.carousel-indicators`, so the prev/next buttons sit directly underneath the video/carousel
- Make the two buttons sit **side by side** at every viewport size (desktop and mobile) — remove the mobile rule that switches `.project-navigation` to `grid-template-columns: 1fr`
- Keep them **equally spaced**: `grid-template-columns: 1fr 1fr` with a consistent `gap`, and remove the `justify-self: start` / `justify-self: end` so each button fills its own column evenly
- Tighten padding/font sizes on mobile so two buttons fit comfortably across the screen width without overflowing
- Drop the top border / large `margin-top: 80px` from `.project-navigation` since the divider no longer makes sense in the new position — replace with a smaller top margin (e.g. `24px`) that visually pairs the buttons with the carousel

## 3. Auto-play carousel videos on load without going fullscreen

**File:** `project-detail.js` (video markup is built inside `setupCarouselMedia`, around lines 338–346)

The carousel videos are rendered with only the `controls` attribute, so they sit idle until the user presses play, and on mobile iOS the default playback behavior can kick the video into fullscreen.

What to do:
- Add the attributes needed for inline auto-play to each rendered `<video>` element:
  - `autoplay` — start playback as soon as the slide is in place
  - `muted` — required by every modern browser for `autoplay` to actually fire
  - `playsinline` and `webkit-playsinline` — keep playback inline on iOS Safari instead of jumping to the system fullscreen player
  - `loop` — keep the demo looping while the user reads the page (optional but matches the "showcase" feel)
  - Keep `controls` so the user can still pause / unmute manually
- Only the currently visible slide should be playing. In `goToSlide` (or wherever slide changes happen), pause every `<video>` in the carousel and then call `.play()` on the video inside the active slide so we don't have multiple videos playing at once across slides
- On initial load, after `carouselTrack.innerHTML = ...` is set in `setupCarouselMedia`, trigger `.play()` on the first slide's video (wrap in a `.catch(() => {})` since browsers may still reject auto-play in rare cases — failing silently is fine because `controls` is present)

## 4. Sync the landing and gallery rain/parallax animation

**File:** `script.js` (parallax block lines ~38–66), `styles.css` (`.gallery__bg`, `.gallery__droplets` — lines 887, 897 — both currently `display: none`; `.gallery-section` uses `background: url(...) fixed`)

The landing (`.hero`) has the live multi-layer parallax — `.hero__bg` and `.hero__droplets` translate with `window.scrollY` so the rain-on-glass droplets drift as the user scrolls. The gallery is supposed to share the same effect (the HTML already has `#galleryBg` and `#galleryDroplets`), but those layers are set to `display: none` in CSS and the section instead uses a static `background-attachment: fixed`. The result is the rain animation appears to "freeze" the moment the gallery enters the viewport, breaking the visual continuity with the landing.

What to do:
- In `styles.css`, remove the `display: none` from `.gallery__bg`, `.gallery__droplets`, and `.gallery__overlay` so the parallax layers actually render in the gallery section
- Drop the `background: url('imgs/rain_background.jpeg') ... fixed no-repeat` rule from `.gallery-section` — the parallax layers underneath will provide the background now, and leaving the fixed background on top will double up and look muddy
- In `script.js` `renderParallax()`, change the gallery branch so the droplet/bg transforms are continuous with the hero, not reset to zero at the section's top edge. Replace:
  ```js
  const galleryRelativeScroll = scrollY - galleryTop;
  galleryBg.style.transform       = `translateY(${galleryRelativeScroll * BG_SPEED}px)`;
  galleryDroplets.style.transform = `translateY(${galleryRelativeScroll * DROP_SPEED}px)`;
  ```
  with the same absolute-`scrollY` formula the hero uses:
  ```js
  galleryBg.style.transform       = `translateY(${scrollY * BG_SPEED}px)`;
  galleryDroplets.style.transform = `translateY(${scrollY * DROP_SPEED}px)`;
  ```
  This way the droplet position the user sees at the bottom of the hero is exactly where the gallery picks up — one continuous rain pane across both sections instead of a hard reset
- Verify the same `BG_SPEED` (0.25) and `DROP_SPEED` (0.55) constants drive both sections (they already do — just confirm no per-section override sneaks in)
- The `.hero__droplets` and `.gallery__droplets` masks/filters are already identical, so once the JS is synced the seam between sections should be invisible while scrolling

## 5. Remove the mobile bottom navigation bar

**File:** `index.html` (mobile nav block, lines 356–394), `styles.css` (`.mobile-bottom-nav` and `.mobile-nav-item*` rules — lines 1419, 1451, 1471, 1478, 1488–1581, 1769; plus light-mode overrides), `script.js` (mobile nav active-section tracking — lines 296–~315, plus `mobileNavHome` entries in the translations object at lines 190 and 225)

The site currently shows a floating glass "island" bottom nav on screens ≤ 768px (`<nav class="mobile-bottom-nav" id="mobileNav">`) with Projects / About / Gallery / Contact links and an IntersectionObserver that highlights the active section. The desktop `.navbar` is hidden on mobile (via `styles.css` line 1670, `.navbar { display: none; }`) so the bottom nav is the only navigation on mobile. The goal is to remove the mobile bottom nav entirely.

What to do:
- In `index.html`, delete the entire `<nav class="mobile-bottom-nav" id="mobileNav"> ... </nav>` block (lines 356–394) including its surrounding comment
- In `styles.css`, delete every rule scoped to `.mobile-bottom-nav` and `.mobile-nav-item*` — dark-mode rules (~1419–1530) and `body.light-mode` overrides (~1558–1590), plus the responsive override at ~1769
- Remove the footer bottom-padding bump that exists "so footer content isn't hidden behind the floating nav" (≤768px and ≤480px media queries — `footer { padding-bottom: 100px; }`) since there's no floating nav to clear anymore
- In `script.js`, delete the entire IIFE that wires up the mobile nav (the `(function () { const mobileNav = ... })();` block starting around line 296), and remove the `mobileNavHome` keys from both `translations.en` (~line 190) and `translations.es` (~line 225) since nothing references them anymore
- Now that the mobile bottom nav is gone, mobile users have no nav at all (the desktop navbar stays hidden via `.navbar { display: none }` at ≤768px). Decide whether to:
  - **(a)** also remove the `.navbar { display: none }` rule so the desktop top navbar shows on mobile too, **or**
  - **(b)** leave mobile with no navigation and rely on in-page scrolling only
  Flag the choice when implementing — don't silently pick one

## 6. Fix the dark/black overlay that appears in the gallery background while scrolling

**File:** `styles.css` (`.gallery-section` line 874, `.gallery__bg` line 884, `.gallery__droplets` line 893), `script.js` (gallery parallax branch lines 62–65)

**Diagnosis (why it happens):**
- `.gallery-section` has `background: var(--navy-mid)` (a dark navy fill) sitting underneath the parallax layers
- `.gallery__bg` and `.gallery__droplets` are absolutely positioned with `inset: -20% 0` — i.e., they only extend 20% of the section height above and below the section
- After fix 4, the gallery parallax JS uses **absolute** `scrollY`: `translateY(scrollY * BG_SPEED)` / `translateY(scrollY * DROP_SPEED)`
- By the time the user scrolls into the gallery, `scrollY` is in the thousands of pixels. Even with `BG_SPEED = 0.25`, the bg layer is translated downward by several hundred pixels — far more than the `-20%` buffer can absorb
- Because the layer slides down past its container, the **top portion of `.gallery-section` is no longer covered** by the rain image. The dark `var(--navy-mid)` background underneath shows through, reading as a "weird black overlay" at the top of the gallery as the user scrolls in and past it
- `.gallery-section` has `overflow: hidden`, so the over-translated layer is clipped on the bottom and the empty top exposes the dark fill

**What to do — pick one of these fixes:**
- **(a) Preferred — remove the dark fill from the section.** Drop `background: var(--navy-mid)` from `.gallery-section` (line 876). The parallax layers carry the image; the section itself doesn't need a fallback color since the layers extend behind everything. Whatever shows through during over-translation will be the page/`<html>` background, not a hard navy block — and once paired with a much larger inset (see (b)) it won't show through at all.
- **(b) Enlarge the parallax layer buffer so it can never slide out of frame.** Change `.gallery__bg` and `.gallery__droplets` from `inset: -20% 0` to something like `top: -100vh; bottom: -100vh; left: 0; right: 0;` (or use a JS-calculated inset based on `gallerySection.offsetTop * BG_SPEED`). The layer then has enough vertical slack to absorb the absolute-scroll translation without exposing edges.
- **(c) Alternative — switch the parallax layers to `position: fixed`.** Make `.gallery__bg` / `.gallery__droplets` fixed to the viewport and clip them to the gallery via a wrapping `clip-path` or by toggling visibility based on the section being in view. Translate them with the same absolute-`scrollY` formula. This eliminates the slide-out-of-frame problem entirely because the layer is always anchored to the viewport, not the section box.

Apply (a) + (b) together for the cleanest result: no dark fill to leak through, and a buffer big enough that nothing leaks anyway. After the fix, scrolling from the hero into and past the gallery should show one continuous rain-on-glass pane with no dark band intruding at the section edge.

## 7. Mobile spacing / layout audit & fix plan

**Method.** Static audit of `styles.css` against the breakpoints used in the file: ≤1024, ≤900, ≤768, ≤600, ≤480 — checking behavior at 320 / 375 / 390 / 430 / 768 logical px. No live browser run was possible from this environment; all findings come from reading the CSS, not visual inspection. Mark anything below that needs a real-device check as "verify in browser" before merging.

### Audit findings

The mobile ruleset that drives the issues lives in three blocks: `@media (max-width: 768px)` (line ~1517), `@media (max-width: 600px)` (line ~1703), and `@media (max-width: 480px)` (line ~1746). The card carousel rules at 768px (lines 1644–1699) are the densest source of bugs.

| # | Issue | Where | Affected viewports |
|---|---|---|---|
| A | Invalid `min()` value — silently degrades | `styles.css:1676` `.project-card > img, .project-card-media { width: min(80%); }` | all mobile (≤768) |
| B | Arrow button overlaps card content at 480 | `styles.css:1759-1762` `.project-card { padding: 20px 52px }` vs button at `left: 6px; width: 48px` → button right edge at 54px > 52px padding | 320–480 |
| C | `width: 100vw` causes horizontal page scroll on platforms with persistent scrollbar gutters | `styles.css:1649` `.projects-grid-wrapper { width: 100vw }` and `styles.css:1623` `.gallery-grid { margin: 0 -32px }` | all mobile (≤768) — verify in browser |
| D | Tight readable width inside cards | `styles.css:1669-1671` `.project-card { padding-left: 56px; padding-right: 56px }` with `flex-basis: 100vw` → 320px viewport leaves 208px text width | 320 |
| E | Excess vertical card height creates dead space below image | `styles.css:1667` `min-height: 80vh` on `.project-card` | all mobile, worst at 430+ |
| F | Hero title can clip / wrap awkwardly on 320 | `styles.css:1713-1716` `.hero__title { font-size: 2.4rem; line-height: 1.1 }` — 2.4rem ≈ 38px with no `max-width` guard | 320 |
| G | Inconsistent card horizontal padding between 768 and 480 (56 → 52) | `styles.css:1669-1670` vs `styles.css:1761` | 480 boundary |
| H | Touch target for back button on `project-detail.html` not yet styled for mobile (related to Fix 1, still pending) | `project-detail.css:13` `.back-home-btn { padding: 6px 14px 6px 10px }` ≈ 32px tall | all mobile |
| I | `.project-card > img` width fallback `width: min(80%, 220px)` from desktop is overridden on mobile by issue (A); image may render at intrinsic size | inherits from `styles.css:719-727` | all mobile |
| J | Gallery carousel snap-padding missing — first/last item snaps awkwardly | `styles.css:1617-1628` `.gallery-grid` has `padding-left/right: 32px` but no `scroll-padding` set, so snap-align: center pulls items off-center at the ends | all mobile (≤768) |

### Fix plan

Each entry: **Problem → Root cause → Selector → Best fix → Desktop-risk → Mobile-only via media query?**

#### P1 — broken UX

**Fix A (image sizing)**
- Problem: `width: min(80%)` is invalid (single-argument `min()`); browsers throw it out and fall back to the desktop rule `width: min(80%, 220px)` — meaning the mobile override doesn't do what the comment claims ("smaller image so card fits on screen")
- Root cause: typo / incomplete `min()` call
- Selector: `.project-card > img, .project-card-media` inside `@media (max-width: 768px)`
- Best fix: replace with a valid value. Probably the author meant `min(80%, 220px)` or just `80%`
- Desktop risk: none — rule is inside `@media (max-width: 768px)`
- Mobile-only: yes (already scoped)

Diff:
```diff
   .project-card > img,
   .project-card-media {
-    width: min(80%);
+    width: min(80%, 220px);
     margin-bottom: 14px;
   }
```

**Fix B (arrow button overlapping card text at ≤480)**
- Problem: arrow buttons (`width: 48px`, `left: 6px`) end at x=54, but `.project-card` padding-left at ≤480 is only 52 — the 2px gap inverts and text/title hides under the button shadow
- Root cause: 480 override (`padding: 20px 52px`) lowered the mobile-768 padding (56) below the button's right edge
- Selector: `.project-card` inside `@media (max-width: 480px)`
- Best fix: keep padding ≥ button width + offset + breathing room (≥ 58px). Easiest: change 480 rule to `padding: 20px 60px` (matches button right edge of 54 + 6px clearance)
- Desktop risk: none — scoped to ≤480
- Mobile-only: yes

Diff:
```diff
   .project-card {
-    /* Keep extra horizontal padding so arrow buttons don't cover text */
-    padding: 20px 52px;
+    /* Padding must clear arrow button: button-width(48) + button-left(6) + 6px breathing = 60 */
+    padding: 20px 60px;
   }
```

**Fix C (`100vw` horizontal overflow)**
- Problem: `width: 100vw` on `.projects-grid-wrapper` and `margin: 0 -32px` on `.gallery-grid` can exceed the document body width when a vertical scrollbar gutter is present, producing a horizontal scrollbar on the whole page
- Root cause: `100vw` includes the scrollbar gutter on platforms that reserve one; the section's `.section-inner { padding: 0 32px }` then collides
- Selector: `.projects-grid-wrapper` (768) and `.gallery-grid` (768)
- Best fix: add `overflow-x: clip` (preferred over `hidden` to preserve `position: sticky`) to `body` inside the 768 block, OR change `width: 100vw` to `width: 100%` and let the wrapper sit within `.section-inner`. The safer, lowest-risk fix is `overflow-x: clip` on `body` at ≤768
- Desktop risk: none if scoped to ≤768; on desktop the carousel already lives inside the wider `.projects-grid-wrapper { width: 125% }` which is bounded by the section
- Mobile-only: yes

Diff:
```diff
 @media (max-width: 768px) {
+
+  /* Prevent 100vw children (.projects-grid-wrapper, .gallery-grid bleed)
+     from creating a horizontal scrollbar when a vertical scrollbar gutter exists */
+  body {
+    overflow-x: clip;
+  }
+
   /* Hide desktop nav links on mobile — bottom nav takes over */
   .nav-links {
     display: none;
   }
```

#### P2 — spacing / inconsistency

**Fix D (cramped text width at 320)**
- Problem: 208px of readable width inside the card at 320 forces tight wrapping for `.card-title` and overview text
- Root cause: 56px symmetric padding eats 112px of a 320px viewport
- Selector: `.project-card` inside `@media (max-width: 768px)`
- Best fix: drop padding to 44px (just enough to clear the 48px arrow at `left: 6px` with 2px overlap acceptable for icon-only buttons, OR keep 56 and shrink arrow buttons to 40px at ≤375). Lower-risk: tighten only at the smallest viewport — add a `@media (max-width: 360px)` block bringing padding to 44px
- Desktop risk: none
- Mobile-only: yes

Diff:
```diff
+@media (max-width: 360px) {
+  .project-card {
+    padding-left: 44px;
+    padding-right: 44px;
+  }
+
+  .project-carousel-btn {
+    width: 40px;
+    height: 40px;
+  }
+
+  .project-carousel-btn span {
+    font-size: 1.8rem;
+  }
+}
```

**Fix E (cards too tall, dead space below image)**
- Problem: `min-height: 80vh` plus image at 80% width creates a large gap between media and text on tall phones
- Root cause: fixed-vh min-height + flex/grid distributing space to the empty row
- Selector: `.project-card` inside `@media (max-width: 768px)`
- Best fix: drop `min-height` to `auto` on mobile and let content size the card. The carousel still snaps per card; height variance is fine because each card is fully visible one at a time
- Desktop risk: none (scoped to ≤768)
- Mobile-only: yes

Diff:
```diff
   .project-card {
     flex-basis: 100vw;
     scroll-snap-align: start;
-    min-height: 80vh;
+    min-height: auto;
     /* Extra horizontal padding so content clears the overlaid arrow buttons */
     padding-left: 56px;
     padding-right: 56px;
   }
```

**Fix F (hero title wraps badly at 320)**
- Problem: `font-size: 2.4rem` with no width clamp on `.hero__title` at 320
- Root cause: missing max-width / no clamp
- Selector: `.hero__title` inside `@media (max-width: 600px)`
- Best fix: switch to `font-size: clamp(2rem, 8vw, 2.4rem)` so the title scales down to ~25px at 320 and up to 38px at 480+
- Desktop risk: none (scoped to ≤600)
- Mobile-only: yes

Diff:
```diff
   .hero__title {
-    font-size: 2.4rem;
+    font-size: clamp(2rem, 8vw, 2.4rem);
     line-height: 1.1;
   }
```

**Fix G (boundary inconsistency between 768 and 480 card padding)**
- Resolved by Fix B (both end up at 60 ≥ 56). Confirm 768 rule still uses 56 and 480 uses 60 — slight increase at smaller viewport is fine
- No further diff

#### P3 — polish

**Fix H (back button touch target on `project-detail.html`)**
- Problem: `.back-home-btn` is ~32px tall; below Apple HIG 44pt min
- Root cause: padding tuned for desktop nav
- Selector: `.back-home-btn` inside `project-detail.css` `@media (max-width: 768px)`
- Best fix: bump padding so total height ≥ 44px
- Desktop risk: none (scoped)
- Mobile-only: yes

Diff (in `project-detail.css`):
```diff
+@media (max-width: 768px) {
+  .back-home-btn {
+    padding: 10px 16px;
+    font-size: 0.9rem;
+  }
+}
```

**Fix I (image intrinsic-size leak)**
- Auto-resolved by Fix A — the corrected `min(80%, 220px)` clamps the image width
- No further diff

**Fix J (gallery carousel snap padding at section edges)**
- Problem: items use `scroll-snap-align: center` but the grid has no `scroll-padding`, so the first/last item can't center properly — they snap with awkward edge offset
- Root cause: missing `scroll-padding-inline`
- Selector: `.gallery-grid` inside `@media (max-width: 768px)`
- Best fix: add `scroll-padding-inline: 32px` matching the existing padding; or change items from `scroll-snap-align: center` to `scroll-snap-align: start` (then keep current padding)
- Desktop risk: none (scoped)
- Mobile-only: yes

Diff:
```diff
   .gallery-grid {
     display: flex;
     overflow-x: auto;
     scroll-snap-type: x mandatory;
+    scroll-padding-inline: 32px;
     gap: 16px;
     padding-bottom: 24px;
     margin: 0 -32px;
     padding-left: 32px;
     padding-right: 32px;
     scrollbar-width: none;
     -ms-overflow-style: none;
   }
```

### Implementation order

1. P1: A → B → C  (image rule typo, padding-vs-arrow collision, page-level horizontal overflow guard)
2. P2: D → E → F  (cramped 320 layout, dead vertical space, hero title scaling)
3. P3: H → J  (back-button hit area, gallery snap alignment)

### Items requiring real-device verification

The static audit can't confirm visual outcomes for issues C (scrollbar gutter behavior is browser-specific), E (whether removing `min-height: 80vh` collapses cards too short on projects with little content), and J (whether changing to `start` alignment looks better than fixing `center`). Open a real browser at each listed viewport before merging these.

## 8. Project card spacing on mobile — center, breathing room, fit iPhone Pro Max

**File:** `styles.css` (mobile project carousel block at lines ~1644–1699, inside `@media (max-width: 768px)`)

**What's wrong right now (observed on iPhone Pro Max-sized viewport ~430px):**
- The cards sit too high vertically — the carousel hugs the top of its section because `.projects-grid-wrapper { margin-top: 0; padding-top: 8px }` and `.projects-grid { padding: 16px 0 }` add almost no top breathing room
- Each card spans the full viewport edge-to-edge because `.project-card { flex-basis: 100vw }` combined with `.projects-grid-wrapper { width: 100vw; left: 50%; transform: translateX(-50%) }` makes the carousel track equal to the screen width and each slide equal to the screen width. There is **no horizontal margin between the card edge and the screen edge** — the glass border touches the bezel
- Because the card fills `100vw`, it isn't visually "centered" — it just *is* the screen, and the internal padding (56px each side) makes the content area feel cramped while the card itself feels bezel-flush
- On a 430px viewport the card looks like a full-bleed panel rather than a discrete card; the glass effect and rounded corners are largely wasted at the edges

**Goal:** make each card a discrete, centered "card" that sits inside the viewport with visible margin on the left, right, and top — so on iPhone Pro Max (430px wide) the card reads as a contained panel with breathing room around it, not as a wall-to-wall slab.

**What to do (all changes scoped to `@media (max-width: 768px)`):**

1. **Add top spacing so cards don't hug the section top.** Bump the wrapper's top padding from 8px to ~32px (and keep the bottom similar so the carousel sits balanced).

2. **Pull the card off the viewport edges.** Two options — pick one:
   - **(a) Preferred — shrink each card and let the carousel snap to centered cards.** Change `.project-card { flex-basis: 100vw }` to something like `flex-basis: calc(100vw - 48px)` (so the card is 24px narrower than the screen on each side). Then add equal `scroll-padding-inline: 24px` on `.projects-grid` and matching `padding-left/right: 24px` so the first and last cards still center when snapped. The arrow buttons stay at `left: 6px / right: 6px` (outside the card), which now visually float in the side gutters instead of overlapping the card.
   - **(b) Simpler but less clean — keep `flex-basis: 100vw` and add side margin to the card.** Replace `padding-left: 56px; padding-right: 56px` with smaller internal padding (e.g. `28px`) and add `margin-left: 24px; margin-right: 24px` on the card, but you have to recompute snap math — not recommended because flex + scroll-snap with per-item margins behaves inconsistently across browsers.

3. **Reduce the internal card padding now that the arrow buttons live in the gutters, not on top of the card.** Drop `.project-card { padding-left: 56px; padding-right: 56px }` to `padding-left: 24px; padding-right: 24px` so the content area gets back the width that the previous fix donated to the side gutters. The arrow buttons no longer overlap the card so the 56px overlap-buffer is no longer needed.

4. **Center the card vertically within its min-height** by switching the card's `grid-template-rows` alignment (or adding `align-content: center` on `.project-card`) so the title/media/text sit in the middle of the card rather than top-aligned. Combined with #1 this gives the carousel real vertical breathing room on iPhone Pro Max.

5. **Cap card height for iPhone Pro Max readability.** Pair this with Fix 7-E (`min-height: auto`) — once the card no longer needs `min-height: 80vh`, the card will size to its content and the top spacing from #1 actually shows.

**Diff (option 2a — recommended):**

```diff
 @media (max-width: 768px) {

   /* Projects: full-viewport single-card carousel */
   .projects-grid-wrapper {
     position: relative;
     left: 50%;
     transform: translateX(-50%);
     width: 100vw;
     margin-left: 0;
     margin-top: 0;
-    padding-top: 8px;
-    padding-bottom: 8px;
+    padding-top: 32px;
+    padding-bottom: 32px;
   }

   .projects-grid {
-    gap: 0;
+    gap: 16px;
     margin: 0;
-    padding: 16px 0;
-    scroll-padding-left: 0;
+    padding: 16px 24px;
+    scroll-padding-inline: 24px;
   }

-  /* One card per view — exactly viewport width */
+  /* One card per view — viewport width minus side gutters, so it reads as a centered card */
   .project-card {
-    flex-basis: 100vw;
+    flex-basis: calc(100vw - 48px);
     scroll-snap-align: start;
-    min-height: 80vh;
-    /* Extra horizontal padding so content clears the overlaid arrow buttons */
-    padding-left: 56px;
-    padding-right: 56px;
+    min-height: auto;
+    /* Arrows now live in the side gutters, not over the card — internal padding can relax */
+    padding-left: 24px;
+    padding-right: 24px;
+    align-content: center;
   }

   /* Smaller image so card fits on screen */
   .project-card > img,
   .project-card-media {
-    width: min(80%);
+    width: min(80%, 220px);
     margin-bottom: 14px;
   }

   /* Prominent arrow buttons overlaid at card edges */
   .project-carousel-btn {
     width: 48px;
     height: 48px;
     border-color: rgba(78, 179, 232, 0.55);
     background: rgba(8, 16, 28, 0.80);
   }

   .project-carousel-btn span {
     font-size: 2.2rem;
   }

   .project-carousel-btn--prev {
-    left: 6px;
+    left: 2px;
   }

   .project-carousel-btn--next {
-    right: 6px;
+    right: 2px;
   }

 }
```

**Also update the ≤480 override** so it doesn't fight the new padding scheme — change `padding: 20px 52px` to `padding: 20px 24px` (it now only needs to match the relaxed mobile padding, since the arrow buttons no longer sit over the card):

```diff
 @media (max-width: 480px) {
   /* … */
   .project-card {
-    /* Keep extra horizontal padding so arrow buttons don't cover text */
-    padding: 20px 52px;
+    padding: 20px 24px;
   }
   /* … */
 }
```

**Expected result on iPhone Pro Max (430px):**
- 24px gap visible on the left and right between the card edge and the screen edge
- 32px of breathing room above the carousel
- Card content sits vertically centered inside the card box
- Arrow buttons float in the side gutters at `left/right: 2px`, no longer touching the card
- Card reads as a contained, centered panel — not a full-bleed slab

**Risk:** Desktop is unaffected (entire block is scoped to ≤768). On smaller phones (320–375) the 24px gutters leave ~272–327px of card width; verify the existing `card-title` / `project-overview` text still wraps cleanly. If 320 looks tight, layer a `@media (max-width: 360px)` block that drops gutters to 12px and card padding to 16px.

## 9. Make the landing and gallery backgrounds exactly identical

**File:** `styles.css` — hero layers (`.hero__bg` line 233, `.hero__droplets` line 247, `.hero__glass-sheen` line 278) vs gallery layers (`.gallery__bg` line 883, `.gallery__droplets` line 895, `.gallery__overlay` line 920). Light-mode overrides at lines 1141–1147 (hero) and 1318–1327 (gallery).

**What's different right now (why the two sections don't look the same even though both use `rain_background.jpeg`):**

1. **Dark-mode filter on `.gallery__bg`** is `filter: brightness(0.55) saturate(0.75)` while `.hero__bg` is `filter: none`. The gallery base image is rendered ~45% darker and noticeably desaturated — that alone is the biggest visual mismatch
2. **Layer dimensions differ.** `.hero__bg` / `.hero__droplets` use `inset: -20% 0` (layer = 140% of section height). `.gallery__bg` / `.gallery__droplets` use `top: -100vh; bottom: -100vh; left: 0; right: 0` (layer = section height + 200vh). Because the rain image uses `background-size: cover`, a layer that's a different physical size renders the image at a different scale — the droplet pattern visually shrinks/grows between the two sections
3. **Light-mode overlay treatments diverge.** Hero overlays with `.hero__glass-sheen` (radial + linear cream gradient, soft vignette). Gallery overlays with `.gallery__overlay { background: rgba(220, 213, 198, 0.60) }` — a flat translucent cream wash with no gradient. In light mode the gallery looks like a hazy flat film while the hero has a true glass-sheen
4. `.hero__glass-sheen` is `z-index: 2` and `.gallery__overlay` is `z-index: 2` — that part matches. The droplet z-index also matches (`1` on both). Layer stacking is fine; the pixels rendered into each layer differ

**Goal.** Hero and gallery should render an indistinguishable background — same image, same scale, same color treatment, same overlay. A user scrolling from one section into the other should see a continuous pane (sync from Fix 4 + 6 already handles the scroll continuity; this fix removes the *appearance* differences).

**What to do (all changes scoped, no JS):**

1. **Match the filters.** Remove the darkening on `.gallery__bg` so it matches the hero's `filter: none`:
   ```diff
    .gallery__bg {
      position: absolute;
      top: -100vh;
      bottom: -100vh;
      left: 0;
      right: 0;
      background: url('imgs/rain_background.jpeg') center center / cover no-repeat;
      will-change: transform;
   -  filter: brightness(0.55) saturate(0.75);
   +  filter: none;
    }
   ```
   `.gallery__droplets` already has `filter: brightness(0.85) contrast(1.15) saturate(1.1)` — identical to `.hero__droplets`, no change needed there

2. **Match the layer dimensions.** The cleanest path is to enlarge the hero buffer to match the gallery (the gallery's bigger buffer is mandatory — see Fix 6 — but enlarging the hero is harmless because the hero's parent has `overflow: hidden` and the hero never accumulates much absolute-scroll translate):
   ```diff
    .hero__bg {
      position: absolute;
   -  inset: -20% 0;
   -  /* oversized so parallax doesn't show edges */
   +  top: -100vh;
   +  bottom: -100vh;
   +  left: 0;
   +  right: 0;
      background: url('imgs/rain_background.jpeg') center center / cover no-repeat;
      will-change: transform;
      filter: none;
      z-index: 0;
      pointer-events: none;
    }

    .hero__droplets {
      position: absolute;
   -  inset: -20% 0;
   +  top: -100vh;
   +  bottom: -100vh;
   +  left: 0;
   +  right: 0;
      background: url('imgs/rain_background.jpeg') center center / cover no-repeat;
      /* … */
    }
   ```
   After this, both sections' bg/droplet layers are sized off the viewport (`100vh`) rather than off their containers, so `cover` produces the same rain-pattern scale in both places

3. **Match the light-mode overlay.** Replace the flat cream wash on `.gallery__overlay` with the same gradient stack the hero uses. Either:
   - **(a) Preferred — rename `.gallery__overlay` to use the same `.hero__glass-sheen` rules** by adding a shared class (`.glass-sheen`) to both elements and styling that class once. Cleanest, no duplication.
   - **(b) Minimal — copy the hero light-mode overlay verbatim into the gallery override:**
   ```diff
    body.light-mode .gallery__overlay {
   -  background: rgba(220, 213, 198, 0.60);
   +  background:
   +    radial-gradient(ellipse 80% 80% at 50% 50%,
   +      transparent 50%,
   +      rgba(232, 224, 208, 0.45) 100%),
   +    linear-gradient(to right,
   +      rgba(232, 224, 208, 0.25) 0%,
   +      transparent 20%,
   +      transparent 80%,
   +      rgba(232, 224, 208, 0.25) 100%);
    }
   ```
   (Copy the full `.hero__glass-sheen` light-mode value — read its current state at `styles.css:1149` to grab any rules truncated above)

4. **Verify the light-mode bg filter already matches.** `.hero__bg` light-mode: `filter: brightness(0.80) saturate(0.85)`. `.gallery__bg` light-mode: `filter: brightness(0.80) saturate(0.85)`. Identical — no change needed

5. **Verify no per-section `.gallery-section` background.** Fix 6 removed `background: var(--navy-mid)` from `.gallery-section`. Confirm it's still gone — if a `background:` rule has crept back in, delete it again. The section must be transparent so the layers carry the look

**Expected result.** Scrolling from hero to gallery shows one continuous rain-on-glass pane: same scale, same brightness, same droplet detail, same overlay treatment in both light and dark modes. The transition between sections should be invisible.

**Risk.** Low. Enlarging the hero's parallax layer (`-100vh` on top/bottom) is invisible to the user because `.hero { overflow: hidden }` clips anything outside the section. Removing the gallery's darkening filter makes the gallery brighter — confirm the gallery item cards (`.gallery-item-title`, `.gallery-item-desc`) still have enough contrast against the now-brighter bg; if not, tweak the gallery item text color or add a subtle darken via the overlay rather than the bg layer.

## Codex Reference — Branch Merge Diagnostic (responsive-fix → main)

**Context.** Two divergent states exist:
- `origin/main` = desktop correct, mobile broken
- `responsive-fix` (current local, staged) = mobile correct, desktop broken

This section is a static diff analysis to guide merging the mobile fixes into the desktop-safe baseline without re-breaking either side. **No edits have been applied** — this is a reference document for the merge.

**Files changed vs `origin/main`** (per `git diff --stat`):
```
UPDATES0525.md      | 532 ++++++++++++++++++++++++++++++++++++++++++++++++++++
index.html          |  49 -----
project-detail.css  | 110 ++++++++---
project-detail.html |  41 ++--
project-detail.js   |  14 +-
script.js           |  65 +------
styles.css          | 239 +++++------------------
```

All desktop regressions live in `styles.css`. `script.js` + `index.html` changes are the Fix 5 mobile-nav removal (clean). `project-detail.*` is the detail-page work (doesn't touch the landing).

### Desktop regressions — global changes that broke desktop

These four rule changes in `styles.css` are made **outside any media query** and therefore alter desktop pixels:

**R1 — `.project-card` lost its drop shadow** (~line 682)
```diff
- box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(78, 179, 232, 0.08);
+ box-shadow: inset 0 1px 0 rgba(78, 179, 232, 0.08);
```
Cards lose their glass-float elevation. `var(--glass-shadow)` is what gives them lift over the hero bg.
**Verdict:** REVERT — this rule was not part of any documented mobile fix.

**R2 — `.project-card:hover` lost elevation + cyan glow** (~line 702–705)
```diff
- box-shadow:
-   0 20px 60px rgba(0, 0, 0, 0.55),
-   0 0 30px rgba(45, 143, 206, 0.12),
-   inset 0 1px 0 rgba(78, 179, 232, 0.12);
+ box-shadow: inset 0 1px 0 rgba(78, 179, 232, 0.12);
```
Hover state goes flat on desktop.
**Verdict:** REVERT.

**R3 — `.gallery-section` lost `background: var(--navy-mid)`** (~line 876)
```diff
.gallery-section {
  padding: 120px 0 80px;
- background: var(--navy-mid);
}
```
Intentional from Fix 6, but unscoped. If desktop also leaks the page bg through the parallax layers (the bug Fix 6 fixed for mobile), the Fix 6 mitigations (larger buffer) should hold. Otherwise restore the fill for desktop only:
```css
@media (min-width: 769px) {
  .gallery-section { background: var(--navy-mid); }
}
```
**Verdict:** VERIFY in browser at desktop widths; gate to desktop if needed.

**R4 — `.gallery__bg / __droplets / __overlay` activated globally** (~line 884–924)
```diff
.gallery__bg {
- inset: -20% 0;
+ top: -100vh; bottom: -100vh; left: 0; right: 0;
- display: none;
}
```
Intentional from Fixes 4 + 6, but unscoped. Confirm desktop look matches design. If desktop should stay "flat gallery" while only mobile gets the sync effect, wrap the `display:none` removal + new sizing inside `@media (max-width: 768px)` and re-add `display: none` outside it.
**Verdict:** VERIFY; gate to mobile if desktop should remain unchanged.

### Categorization of every change

| Bucket | Rule / change | Action |
|---|---|---|
| **Desktop-safe global** (keep) | none — every global change is a regression or unscoped fix | — |
| **Mobile-only, correctly scoped** (keep) | `body { overflow-x: clip }` @768; `.projects-grid-wrapper` padding @768; `.projects-grid` gap/padding/snap @768; `.project-card { flex-basis: calc(100vw - 48px); padding: 24px; align-content: center }` @768; `.project-card > img { width: min(80%, 220px) }` @768; `.project-carousel-btn--prev/next { left/right: 2px }` @768; `.hero__title` clamp @600; `.project-card { padding: 20px 24px }` @480; new `@media (max-width: 360px)` block; `.gallery-grid { scroll-padding-inline: 32px }` @768 | KEEP AS-IS |
| **Dead code, correctly removed** | `.mobile-bottom-nav`, `.mobile-nav-item*`, `@keyframes navDotPulse`, light-mode overrides; `<nav id="mobileNav">` in HTML; IIFE in `script.js`; `mobileNavHome` translations | KEEP REMOVED |
| **Mobile-scoped removals (Fix 5 question)** | Removed `.navbar { display: none }` @768 → desktop navbar now shows on mobile; removed `footer { padding-bottom: 100px }` @768 | KEEP REMOVED if Fix 5 option (a) was chosen; else restore `.navbar { display: none }` |
| **Revert** (desktop regressions not in any fix) | R1, R2 | REVERT |
| **Verify-then-decide** | R3, R4 | TEST DESKTOP; scope to mobile if broken |
| **Unrelated, possibly unintentional** | `index.html` removed `aboutP3` + `aboutP4` paragraphs (lines 261–271 in `origin/main`) | ASK USER — looks like a content edit unrelated to responsive work |

### Proposed breakpoint structure

```
GLOBAL (no media query)
├── .project-card               ← restore box-shadow: var(--glass-shadow), inset...
├── .project-card:hover         ← restore elevation + cyan glow
├── .gallery-section            ← decide on navy-mid fill (keep as default, opt-out on mobile)
└── .gallery__bg/__droplets/__overlay
                                ← if desktop should stay flat: keep display:none here
                                  and re-enable only inside @media (max-width: 768px)

@media (max-width: 1024px)      ← tablets — untouched
@media (max-width: 900px)       ← untouched
@media (max-width: 768px)       ← all mobile carousel/card overrides live here (current state correct)
   ├── body { overflow-x: clip }
   ├── .nav-links { display: none }
   ├── (optional) .gallery__bg { display: block; top/bottom: -100vh; ... }   ← if gating per above
   └── (all current mobile rules)

@media (max-width: 600px)       ← typography for phones
@media (max-width: 480px)       ← small phone padding
@media (max-width: 360px)       ← ultra-small phones (new block, correctly scoped)
```

### Merge sequence

1. **Restore R1 + R2 verbatim from `origin/main`** — paste the original `box-shadow` values back into the global `.project-card` and `.project-card:hover` rules. Zero-risk fix for desktop cards
2. **Spot-test desktop with R3 and R4 as-is** (gallery parallax active globally). If gallery looks right at desktop widths, leave it. If not, wrap the `display:none` removal and new layer sizing in `@media (max-width: 768px)` and restore `display:none` + `background: var(--navy-mid)` outside it
3. **Clarify the `aboutP3` / `aboutP4` deletion in `index.html`** — keep or restore based on intent (this was not part of any documented fix)
4. **Decide Fix 5 navbar option** — leave `.navbar { display: none }` removed if desktop top-bar should appear on mobile now that bottom nav is gone (option a), or restore the rule if mobile should have no navbar at all (option b)

**Risk profile:** Steps 1 and 4 are zero-risk reverts/decisions. Step 2 needs a 30-second desktop visual check. Step 3 is a content question, not a CSS one.
