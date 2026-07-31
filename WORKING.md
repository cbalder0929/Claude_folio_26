# WORKING — Wire the new screenshots into projects 008 & 009

**For:** Claude Sonnet, executing in this repo (`charlesbalderas.com` portfolio).
**Goal:** Replace the placeholder media on **008 Bank Parser** and **009 Additive Synthesizer** with the five new screenshots, fix the placeholder challenge text that is currently live on the site, and do it without regressing page weight or breaking the carousel on mobile.

Plain HTML/CSS/JS static site. No build step, no frameworks, no bundler. Do not add any.

---

## The five new files (untracked, sitting in `imgs/`)

| File | Size | Dimensions | What it shows |
|------|------|-----------|---------------|
| `PtVHero.png` | 490 KB | 2295×1195 (~1.92:1) | Bank Parser main UI — Upload Files / CSV Preview / Generated CSVs, empty state |
| `PtvDemo.png` | 591 KB | 2248×1159 (~1.94:1) | Same UI **with a parsed CSV loaded** — 80-row preview table, date/debits/credits/category/item |
| `PtVPieGraph.png` | 445 KB | 2413×1182 (~2.04:1) | Reports page — Total Income / Spending / Net / Top Category tiles, two donut charts, account filters |
| `PtVBarGraph.png` | 340 KB | 2347×1173 (~2:1) | Reports page — "Monthly Income vs Spending" bar chart + "Top Merchants" table |
| `synthHero.png` | 107 KB | 1443×1164 (~1.24:1) | Synthesizer UI — MIDI note input, preset buttons, on-screen piano, tempo/timbre, Synthesize button |

None of these are in git yet (`git status` shows them untracked). They need `git add`.

---

## ⚠️ Phase 0 — Redact real financial data. Do this FIRST, before anything else.

**`PtVBarGraph.png`, `PtVPieGraph.png`, and `PtvDemo.png` contain Charles's real bank data.** This site is public. Specifically:

- `PtVBarGraph.png` — "Top Merchants" table shows `Online Banking transfer to SAV 3910`, `CHK 5840` (real account last-4s) and `COMCAST (CC) OF DES:PAYROLL ID:26012310586680 INDN:CHARLES BALDERAS CO` (real payroll/employer ID), plus real transfer amounts up to $10,500.
- `PtVPieGraph.png` — real totals: Total Income $61,302.03, Total Spending $44,035.31, Net $17,266.72.
- `PtvDemo.png` — real transactions (Amazon order refs, `LIME*PAYOFF MQUD 8885...`). Lower risk but still real.

**Do not publish these as-is.** Stop and ask the user which they want:

1. **Regenerate** the screenshots by running Bank Parser against synthetic/dummy statements (best result — clean numbers, no editing artifacts).
2. **Redact** the sensitive rows/values in the existing PNGs (blur or solid-block the Top Merchants table text and the payroll line; replace the dollar tiles with plausible fake figures).
3. **Drop** `PtVBarGraph.png` and use only the pie/donut view, which is less identifying once the tiles are redacted.

Do not proceed to Phase 2 with unredacted images. If the user explicitly says they're fine publishing the real numbers, note it once and continue — it's their call.

---

## Phase 1 — Get the images web-ready

Target from `SONNET_PERF_PLAN.md`: **no image over 300 KB.** Four of these five bust that.

**Tooling check first:** `ffmpeg`, `cwebp`, `magick`, and `python` are all **NOT installed** on this machine (verified). `node` **is** available at `C:\Program Files\nodejs\node.exe`. `node_modules/` no longer exists in this repo, and `convert-heic.js` is gone.

So:
- Try `npx --yes sharp-cli --input imgs/PtVHero.png --output imgs/ -f webp -q 80 resize 1600` (needs network; sharp-cli pulls a binary).
- If that fails or the user is offline, **stop and tell them** — offer `winget install Gyan.FFmpeg` and wait. Do not silently ship 590 KB PNGs.

Conversion targets — WebP, max width **1600px** (the carousel is never wider than ~900px on this site, so 1600 is already generous):

| Source | → | Target |
|--------|---|--------|
| `PtVHero.png` (490 KB) | → | `PtVHero.webp` < 150 KB |
| `PtvDemo.png` (591 KB) | → | `PtVDemo.webp` < 150 KB |
| `PtVPieGraph.png` (445 KB) | → | `PtVPieGraph.webp` < 150 KB |
| `PtVBarGraph.png` (340 KB) | → | `PtVBarGraph.webp` < 150 KB |
| `synthHero.png` (107 KB) | → | `synthHero.webp` < 60 KB |

**Fix the casing while you're here:** `PtvDemo.png` is lowercase-v, every other file is `PtV`. Normalize to `PtVDemo.webp`. This matters — GitHub Pages / Netlify serve from case-sensitive filesystems, so a `PtvDemo` vs `PtVDemo` mismatch is a 404 in production that you will never see locally on Windows.

Delete the source PNGs only after the WebPs are verified rendering in a browser. Don't `git add` both.

---

## Phase 2 — Fix the carousel crop before adding wide screenshots

This is the part that will look broken if you skip it.

`project-detail.css:128-133`:
```css
.carousel-slide img,
.carousel-slide video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

And the wrapper is `aspect-ratio: 16 / 9` on desktop (`:97-102`), **`4 / 5` under the first breakpoint (`:482-484`)**, and **`1 / 1.2` at the smallest (`:532-534`)**.

`object-fit: cover` on a ~2:1 screenshot inside a `4/5` portrait box crops away roughly the outer 60% — on a phone the Bank Parser UI would show a sliver of the middle column and nothing else. Unreadable.

Fix: give screenshot-type slides `object-fit: contain` so the whole UI stays visible and letterboxes against the slide's existing gradient background. Two acceptable approaches — pick one and apply consistently:

- **(preferred)** Add an optional `fit` field to the media item (`fit: 'contain'`), have `setupCarouselMedia()` in `project-detail.js:335-361` emit `class="fit-contain"` on the `<img>`, and add a `.carousel-slide img.fit-contain { object-fit: contain; }` rule. Logos and photos keep `cover`; UI screenshots opt into `contain`.
- Or switch `.carousel-slide img` to `contain` globally and check every existing project detail page for regressions (001–009 all have media today).

Verify at 1440px, ~800px, and ~390px widths.

---

## Phase 3 — Rewrite the 008 Bank Parser entry

`project-detail.js:146-160`. Current state: one real image (`PtVLogo.png`), one `{ type: 'placeholder', label: 'Placeholder' }`, and a challenges array containing literal filler — **`{ title: 'Challenge 1', description: 'Description of first challenge and how it was solved.' }` is rendering on the live site right now.** That's the highest-embarrassment item in this whole file.

Do:

1. **`mediaItems`** — drop the placeholder, keep the logo first (it's the card identity), then hero → demo → reports. Suggested order:
   ```js
   mediaItems: [
     { type: 'image', src: 'imgs/PtVLogo.png',      label: 'Bank Parser Logo' },
     { type: 'image', src: 'imgs/PtVHero.webp',     label: 'Drag and drop a statement PDF' },
     { type: 'image', src: 'imgs/PtVDemo.webp',     label: 'Parsed CSV preview' },
     { type: 'image', src: 'imgs/PtVPieGraph.webp', label: 'Reports — spending by category' },
     { type: 'image', src: 'imgs/PtVBarGraph.webp', label: 'Reports — monthly income vs spending' }
   ]
   ```
   (Adjust if Phase 0 dropped the bar graph.)

2. **`description`** — the current copy says nothing about the reports dashboard, but the screenshots are ~half reports. Add 2–3 sentences covering: date-range + per-account filtering (BoA Checking, BoA Credit, Discover, Amex, Other), income/spending/net summary tiles, spending-by-category and income-by-source donuts, monthly income-vs-spending bars, top-merchants table, and auto-categorization (Utilities, Restaurants, Subscriptions, Travel/Entertainment, Merchandise, Dining, Gasoline, Transit — all visible in `PtVPieGraph.png`). Also visible: multi-file combining into `combined_statements__4_.csv`, and a "Docs" link.

3. **`challenges`** — replace the filler with 2–3 real ones. Draft them in Charles's existing voice (first person, plain, concrete — match the tone of the current `description` field), and **mark the draft for his review rather than presenting it as fact.** Plausible seeds, but confirm before asserting any of it:
   - Every bank formats statements differently — normalizing wildly inconsistent PDF layouts into one date/description/amount schema via pdfplumber.
   - Categorizing transactions without calling a paid API (note: 009's sibling project FinBot.AI *does* use Claude for this; Bank Parser apparently doesn't — don't conflate the two).
   - "Top Category: Uncategorized" is visible in the screenshot — if that's a known open problem, it's an honest and good challenge to write about.

4. **`techStack`** — currently `['Python', 'FastAPI', 'pdfplumber', 'pandas', 'HTML', 'CSS', 'JavaScript']`. The reports page clearly uses a charting library. **Ask which one — do not guess and do not write "Chart.js" unless confirmed.**

---

## Phase 4 — Rewrite the 009 Additive Synthesizer entry

`project-detail.js:161-172`. Currently one bare placeholder and `challenges: []` (the challenges section hides itself when empty — see `project-detail.js:302-304`).

1. **`mediaItems`** — `[{ type: 'image', src: 'imgs/synthHero.webp', label: 'MIDI input, piano, and timbre picker' }]`. With a single item the carousel arrows auto-hide (`:384-386`), which is correct.
2. The existing `description` is already strong and matches the screenshot well. One small discrepancy to reconcile: the description lists presets as "Twinkle Twinkle, Ode to Joy, C Major scale" but the UI also shows **"Mary Had a Little Lamb"**. Add it.
3. The UI header says **"Monophonic** Additive Synthesizer" — worth reflecting, since monophonic is a real design constraint and a natural challenge entry.
4. **`challenges`** is empty. Draft 1–2 (again, flag for review): the note-to-frequency math (`MIDI 69 = A4 = 440 Hz`, visible in the UI copy), stacking harmonics for each timbre, avoiding clicks/pops at note boundaries, and encoding rests as negative numbers.

---

## Phase 5 — Cards, i18n, and commit

- **`index.html:154-172`** — cards 008 and 009. Both already have real images (`PtVLogo.png`, `Synth.webp`), real copy, and `loading="lazy"`. **You probably don't need to touch these.** If you do swap card 008's image to the hero screenshot, keep `loading="lazy"` and update the `alt`. Don't change one card's visual language without the other.
- **i18n: `CLAUDE.md` is stale on this point.** It says translations live in `script.js`. They actually live in the `translations` object in **`shared-ui.js`** (en ~line 37, es ~line 152). `card008Title/Desc` and `card009Title/Desc` already exist and are **fully translated in both languages** — no i18n work needed unless you change card copy. If you do change it, update both `en` and `es`.
- Detail-page body content (`projectsData`) is **English-only by design** — there is no Spanish variant of the project descriptions. Don't invent one.
- If `CLAUDE.md`'s i18n line gets corrected as part of this, that's a welcome drive-by fix.

**Commit:** `feat: add Bank Parser and Synthesizer screenshots to project detail pages`

---

## Verification

- [ ] No unredacted real account numbers, payroll IDs, or real dollar totals in any committed image
- [ ] Every `src` in `projectsData` for 008/009 resolves to a file that exists in `imgs/` — **check exact casing**
- [ ] No image over 300 KB; source PNGs removed once WebPs are verified
- [ ] `/project-detail.html?id=008` — 5 slides, arrows work, indicators match count, no placeholder text anywhere
- [ ] `/project-detail.html?id=009` — 1 slide, arrows hidden, challenges section renders (or stays hidden if left empty)
- [ ] Screenshots readable at 390px width, not center-cropped to mush
- [ ] Language toggle still works on both detail pages
- [ ] Prev/next nav between 007 → 008 → 009 → 010 intact
- [ ] New images `git add`-ed; nothing from `PhotosFolder/` or `node_modules/` re-tracked

## Guardrails

- No build system, no bundler, no CSS framework. Hand-written CSS variables only.
- Do not invent technical claims about how either project works. If the screenshots don't prove it and the existing description doesn't say it, **ask**.
- Keep the source PNGs on disk until the WebPs are confirmed rendering in a real browser.
- Ask before deleting any file.
