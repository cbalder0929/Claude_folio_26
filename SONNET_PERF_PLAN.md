# SONNET PERFORMANCE PLAN — Make the Portfolio Lighter & Faster

**For:** Claude Sonnet, executing in this repo (`charlesbalderas.com` portfolio).
**Goal:** Drastically reduce page weight and improve runtime smoothness without changing the look & feel in any way a visitor would notice. This is a plain HTML/CSS/JS static site — no build step.

---

## Why this plan exists

A size audit found the repo is **~250 MB**, almost all of it assets and committed junk, while the actual code is tiny. The single biggest wins are deleting files that should never be deployed and compressing oversized media. A secondary win is trimming expensive CSS effects (shadows, blurs).

**Current weight (measured):**
- `imgs/` = **157 MB** (dominated by raw videos — one is **71 MB**)
- `PhotosFolder/` = **89 MB** (raw HEIC/PNG/MP4 source files, **not referenced by the site at all**)
- `node_modules/` = **7 MB** (only used by the `convert-heic.js` utility — should never be committed)

**Success metrics (verify at the end):**
- [ ] `imgs/` reduced from 157 MB to **under 15 MB**
- [ ] `PhotosFolder/` and `node_modules/` no longer tracked by git
- [ ] No video file over **5 MB**; no image over **300 KB**
- [ ] Zero broken asset references
- [ ] Hero (`rain_background.jpeg`) preload under **300 KB**
- [ ] Site looks visually identical to before

> ⚠️ **Work in order. Phases 1–2 are zero-risk deletions/fixes. Do those first, commit, then move on.** Do NOT touch the videos' compression until you've confirmed `ffmpeg` is available.

---

## Phase 1 — Delete files that should never be deployed (highest ROI, zero risk)

### 1a. Add a `.gitignore`
Create `.gitignore` at the repo root:

```
node_modules/
PhotosFolder/
*.log
.DS_Store
Thumbs.db
```

### 1b. Stop tracking the junk (keep `node_modules` on disk for the convert utility)
```powershell
git rm -r --cached node_modules
git rm -r --cached PhotosFolder
```
> `PhotosFolder/` holds the raw HEIC/PNG/MP4 originals used to *generate* gallery images. It is never served. It can stay on disk as a personal archive, but it must not be in git or deployed.

### 1c. Remove stale planning/docs that bloat the repo
These are finished, superseded planning docs. Confirm with the user before deleting, then remove:
- `SONNET_FIX_PLAN.md`
- `SONNET_FIX_PLAN_2.md`
- `SONNET_TASK_PLAN.md`
- `UPDATES0525.md` (42 KB)
- `PROJECT_DETAILS_GUIDE.md` (content now lives in `CLAUDE.md`)

> Keep `README.md` and `CLAUDE.md`. Keep `SONNET_PERF_PLAN.md` (this file) until the work is done.

**Commit checkpoint:** `chore: stop tracking node_modules/PhotosFolder, add gitignore, remove stale docs`

---

## Phase 2 — Fix broken asset references (zero risk)

`project-detail.js` references two video files that **do not exist** in `imgs/`:
- `imgs/ChessVid.mp4` (project 003 / NextMove)
- `imgs/craftworldvid.mp4` (project 004 / Craft World)

For each, do ONE of:
- **(preferred)** Replace the `{ type: 'video', src: '...' }` entry with a `{ type: 'placeholder', label: '...' }` entry so nothing breaks, **or**
- If the real video exists elsewhere, add it to `imgs/` (compressed per Phase 3).

**Commit checkpoint:** `fix: replace broken video refs with placeholders`

---

## Phase 3 — Compress oversized media (biggest weight win)

> Requires `ffmpeg` for video and a PNG/WebP tool for images. **First check:** run `ffmpeg -version`. If it's missing, STOP and tell the user to install it (`winget install Gyan.FFmpeg`) — do not skip the videos silently.

### 3a. Videos — re-encode to web-friendly H.264 MP4
Target: 1080p max, ~1.5 Mbps, faststart (streams before fully downloaded). For each referenced video below, encode to a new file, verify it plays, then replace the original.

| File | Current | Target |
|------|---------|--------|
| `GalloShowdownVid.mp4` | **71 MB** | < 5 MB |
| `GalloShowdownVid - Trim.mp4` | 28 MB | < 3 MB |
| `wordlevid.mp4` | 29 MB | < 3 MB |
| `AgendiRecording.mp4` | 21 MB | < 3 MB |

> Note: BOTH `GalloShowdownVid.mp4` and `GalloShowdownVid - Trim.mp4` are referenced in `project-detail.js` (project 001). Confirm with the user whether both are needed — the 71 MB full version is likely redundant with the trim. If only one is needed, drop the other and remove its entry.

Encoding command (run per file; rename spaces-in-filename carefully):
```powershell
ffmpeg -i "imgs/INPUT.mp4" -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart -an "imgs/INPUT.web.mp4"
```
- `-an` drops the audio track (these are silent UI demos — confirm before applying).
- `-crf 28` is a good size/quality balance; lower = bigger/better, raise to 30–32 if still too large.
- After verifying the `.web.mp4` plays in the browser, replace the original and update the filename in `project-detail.js` if you renamed it.

### 3b. Images — resize + convert to WebP, keep PNG fallback only if needed
Large raster assets to shrink:

| File | Current | Action |
|------|---------|--------|
| `LogoPerron.png` | 1.7 MB | resize to displayed size, → WebP |
| `rain_background.jpeg` | 1.7 MB | this is the **preloaded hero bg** — recompress to < 300 KB |
| `CheesLogo.png` | 1.6 MB | → WebP |
| `FinBotV2.png` | 1.0 MB | → WebP |
| `wordleW.png` | 939 KB | → WebP |
| `AgendiLogo.png` | 791 KB | → WebP |
| `Synth.png` | 766 KB | → WebP |
| `mainLogo.png` | 585 KB | favicon + nav logo — resize to ~128px, → WebP/optimized PNG |

WebP conversion (if `cwebp` available, or reuse the existing `sharp`/`heic-convert` deps in `node_modules`):
```powershell
ffmpeg -i "imgs/INPUT.png" -vf "scale='min(800,iw)':-2" "imgs/INPUT.webp"
```
- Logos rarely need to be wider than ~600–800px on this site. Check the actual rendered size in `styles.css`/`project-detail.css` before picking a width.
- Update `<img src>` references in `index.html` and `project-detail.js` to the new `.webp` paths. WebP is supported by all modern browsers; no fallback needed for a personal portfolio.
- Re-compress `rain_background.jpeg` in place (don't change its name — it's preloaded in `index.html` line ~12): `ffmpeg -i imgs/rain_background.jpeg -q:v 5 imgs/rain_background.opt.jpeg` then verify and swap.

**Commit checkpoint:** `perf: compress videos and images (157MB -> <15MB)`

---

## Phase 4 — Trim expensive visual effects (the "shadows" request)

The CSS uses heavy GPU effects that hurt scroll/paint performance, especially combined with the parallax hero. Reduce them **without flattening the design** — the goal is to keep depth where it reads, remove it where it's invisible.

Audit found in `styles.css`: **14 `box-shadow`, 10 `backdrop-filter`, 9 `blur()`, 24 `filter:`, 8 `animation`, 5 `@keyframes`.**

### 4a. Remove the most costly thing first: animated `backdrop-filter`
`styles.css` ~line 68 transitions `backdrop-filter` on the navbar:
```css
transition: background 0.5s var(--ease-glass), backdrop-filter 0.5s;
```
Animating `backdrop-filter` forces a full re-blur every frame on scroll. **Remove `backdrop-filter` from the transition** (keep the background transition). The blur can still be static.

### 4b. Reduce `backdrop-filter: blur()` radius and count
There are ~6 `backdrop-filter: blur(8–18px)` rules. For each:
- Lower large radii (`blur(18px)` → `blur(10px)`, `blur(16px)` → `blur(10px)`). Blur cost scales with radius.
- If an element sits on an opaque/near-opaque background, the blur is invisible — delete that `backdrop-filter` entirely.

### 4c. Simplify `box-shadow`
- Replace any multi-layer or large-spread shadows with a single, tight shadow (e.g. `0 2px 8px rgba(0,0,0,.15)`).
- Remove `box-shadow` from elements that animate/transform on hover where it's barely visible.
- **Per the user's request, prefer removing decorative shadows outright** where the layout still reads clearly (cards already have borders/contrast).

### 4d. Drop unused animations / keyframes
- Search for each `@keyframes` name; if it isn't referenced by an `animation:` rule, delete it.
- Replace `transition: all ...` (if any) with explicit properties (`transform`, `opacity`) so the browser doesn't watch every property.

> After each change, reload and eyeball the page. Do NOT remove the parallax (it already uses `requestAnimationFrame` correctly) — just the redundant filters/shadows.

**Commit checkpoint:** `perf: reduce backdrop-filter blur, shadows, and unused animations`

---

## Phase 5 — Smarter media loading

1. **Don't autoplay heavy video.** `project-detail.html` (~line 346) has `<video controls autoplay muted playsinline loop>`. Autoplaying a multi-MB file on page load is a perf hit. Remove `autoplay` and add `preload="none"` so the video only loads when the user clicks play.
2. **Confirm all `<img>` use `loading="lazy"`.** Most cards already do; the few that don't (e.g. card 007 FinBotV2, card 009 Synth in `index.html`) should get `loading="lazy"` added.
3. **Add `width`/`height` (or aspect-ratio)** to images that lack them to prevent layout shift.

**Commit checkpoint:** `perf: lazy-load media, stop autoplaying video`

---

## Final Verification

Run and confirm:
```powershell
# sizes
du -sh imgs PhotosFolder node_modules
# no broken refs: every imgs/ path in code must exist on disk
# (cross-check referenced filenames against `ls imgs/`)
git status   # PhotosFolder/ and node_modules/ should be ignored
```

Checklist:
- [ ] `imgs/` < 15 MB
- [ ] No video > 5 MB, no image > 300 KB
- [ ] `node_modules/` & `PhotosFolder/` untracked
- [ ] No broken asset references (003 & 004 fixed)
- [ ] Navbar no longer transitions `backdrop-filter`
- [ ] Page looks visually identical; parallax still smooth
- [ ] Detail-page video no longer autoplays

## Guardrails
- **No frameworks, no bundler, no CSS framework.** Keep it plain HTML/CSS/JS.
- **Confirm before any deletion** of source media or docs.
- **Keep originals** of any video/image you compress until the compressed version is verified in-browser.
- Commit after each phase so anything can be rolled back.
