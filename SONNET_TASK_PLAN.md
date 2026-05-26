# Sonnet Task Plan — Wire Up 6 Real Project Cards + Detail Pages

You are the lead developer. This document tells you exactly what to change, where to change it, and what voice to write in. **Only touch the 6 projects listed below.** Leave every other card and every other `projectsData` entry alone.

---

## 1. Voice & tone (read this first)

The user gave us `projects/context.md` as the voice guide. That file is how he describes his own projects — copy that *register* exactly. Concretely:

- **First person, casual, plain English.** Contractions are fine ("I got the idea", "it wasn't great").
- **Honest about wins *and* limits.** If something underperformed, say so (e.g. FinBot V1's API ran out → "scalability became limited").
- **Always name the "why".** Every project has an origin story — surface it.
- **Always name the "next step".** Almost every entry in `context.md` ends with what's next ("rebuild in Unity", "add user profiles", "deploy as an app"). Keep that pattern.
- **Mention the AI workflow honestly when it applies** — Copilot, Codex CLI, Claude CLI/Code, ChatGPT for art. Don't hide that AI was used; don't oversell it either.
- **Short. No filler. No buzzwords like "leveraged enterprise-grade scalable solutions".** The existing detail-page copy ("Comprehensive analytics platform designed to handle massive data ingestion…") is the OPPOSITE of his voice. Don't write like that.

When in doubt, pull a sentence directly from `projects/context.md` or from the matching project README (`projects/<name>.md`) and lightly trim it.

---

## 2. File → card mapping

These are the only 6 cards to update. Match by filename in `projects/`:

| projects/ file | Card # | Card title (in index.html) | Detail-page key (project-detail.js) |
|---|---|---|---|
| `galloshowdown.md` | 001 | `GalloShowdown` (keep) | `'001'` |
| `agendi.md` | 002 | `Agendi` (keep) | `'002'` |
| `wordle.md` | 005 | `Wordle` (keep) | `'005'` |
| `finbotV1.md` | 006 | `FinBotV1` → rename to **FinBot.AI** | `'006'` |
| `PtV.md` | 008 | `PtV` → rename to **Bank Parser** | `'008'` |
| `synth.md` | 009 | `Synthesizer` → rename to **Additive Synthesizer** | `'009'` |

> Note on renames: the README inside each project folder uses its real product name (FinBot.AI, Bank Parser, Additive Synthesizer). Use those names everywhere — card title, detail title, `<title>`, etc. PtV is a special case: `context.md` calls it "PTV" but the README (`projects/PtV.md`) reveals the actual shipped name is **Bank Parser**. Use Bank Parser, but in the description mention it was originally the PTV tool — that's the bridge between Carlos's story and the product.

**Do NOT touch** cards 003 (NextMove), 004 (Craft World), 007 (FinBotV2), 010–014. Leave their existing markup and their existing `projectsData` entries exactly as they are.

---

## 3. File 1 of 2 — `index.html` (project cards)

Update **only the 6 `<article class="project-card">` blocks** for cards 001, 002, 005, 006, 008, 009. For each card, change the `<h3 class="card-title">` (only where renamed above) and replace the `<p class="card-desc">` with the new copy below.

Keep `<p class="card-number">`, the `<img>` / `<div class="project-card-media">`, and the `<a href="project-detail.html?id=...">` lines exactly as they are. Don't reorder cards.

### Card 001 — GalloShowdown (around index.html:81–90)

Replace `<p class="card-desc">` content with:

> A C# and WPF rooster-fighting game where you raise a single gallo from a gift on your 10th birthday into a tournament champion. Six breeds, breeding, training, a shop, and Street Fighter–style 1v1 battles.

### Card 002 — Agendi (around index.html:92–99)

Replace `<p class="card-desc">` content with:

> A Canvas dashboard I built because I was tired of clicking through every class just to see my grades. One page, one list, sorted by what's due — plus live GPA, professor comments, and deadline alerts.

### Card 005 — Wordle (around index.html:122–131)

Replace `<p class="card-desc">` content with:

> A browser-based Wordle clone built in Programming 2 with plain HTML, CSS, and JavaScript. 500-word dictionary, color-coded hints, win/loss tracking, and a share grid — no frameworks, no backend.

### Card 006 — FinBot.AI (around index.html:133–142)

Rename card title from `FinBotV1` to `FinBot.AI`. Replace `<p class="card-desc">` content with:

> A web app that reads your bank statements and categorizes every transaction automatically. React + FastAPI, with a three-tier pipeline (rules → cache → Claude) so the AI only gets called for merchants it has never seen.

### Card 008 — Bank Parser (around index.html:155–164)

Rename card title from `PtV` to `Bank Parser`. Replace `<p class="card-desc">` content with:

> My pride and joy. A Python tool I started when I was prepping taxes by hand and knew there had to be a faster way. Drop in a bank statement PDF, get back a clean, downloadable CSV — runs entirely on your machine.

### Card 009 — Additive Synthesizer (around index.html:166–175)

Rename card title from `Synthesizer` to `Additive Synthesizer`. Replace `<p class="card-desc">` content with:

> A Python program that builds real audio from scratch by stacking sine waves. Type in MIDI notes, pick a timbre (sine, triangle, square, sawtooth), get back a `.wav` you can download — usable from the browser or the CLI.

---

## 4. File 2 of 2 — `project-detail.js` (detail page data)

Only edit entries `'001'`, `'002'`, `'005'`, `'006'`, `'008'`, `'009'` in the `projectsData` object. Leave `'003'`, `'004'`, `'007'`, `'010'`–`'014'` exactly as they are.

For each of the 6, replace `title`, `overview`, `description`, and `techStack`. **Do not touch `mediaItems`, `challenges`, or `nextProject`** — those reference existing video/image files and prev/next chaining the user has already set up.

### `'001'` — GalloShowdown (project-detail.js:10–38)

```javascript
'001': {
  title: 'GalloShowdown',
  number: '001',
  overview: 'A C# and WPF rooster-fighting game about a kid, a prize rooster, and a shot at the tournament.',
  description: 'GalloShowdown is a desktop game I built in C# and WPF on .NET 8. You play a young boy whose grandfather gifts him a rooster on his 10th birthday — and from there you train, feed, breed, and battle. Six breeds, each with their own stat profile (the Black is a tank, the Guero is a glass cannon), a Housing screen to manage your stable, and a Street Fighter–style 1v1 battle loop with light and heavy attacks. I leveraged AI hard on this one — Copilot, Codex, and Claude CLI handled most of the build and debug cycles, and ChatGPT generated the artwork. I originally got the idea because I thought it had never been done before; turned out it had, I tried the existing version, it wasn\'t great, and that gave me the confidence to build my own take. Next step is rebuilding it in Unity and shipping it as a mobile multiplayer game.',
  // mediaItems: leave existing
  // challenges: leave existing
  techStack: ['C#', '.NET 8', 'WPF', 'XAML', 'Claude CLI', 'Codex CLI'],
  nextProject: '002'
},
```

### `'002'` — Agendi (project-detail.js:39–56)

```javascript
'002': {
  title: 'Agendi',
  number: '002',
  overview: 'A Canvas dashboard I built because clicking through every class just to find my grade was wasting my time.',
  description: 'Agendi is a web app I built when I was first learning what ChatGPT could actually do with code. HTML, CSS, and JavaScript on the front, with a small Node server that uses your Canvas API token to pull your schoolwork into one page: current grades, most recent grades, due dates, teacher comments, GPA, all of it. Built specifically for canvas.colum.edu (Columbia College Chicago). It also runs a scheduler that quietly checks deadlines every 15 minutes and fires alerts at 24 hours out, 3 hours out, and overdue — so I stop missing assignments because I forgot to refresh Canvas. Next steps are user profiles, hardening it for safe public use, and then marketing, user testing, and actually growing it.',
  // mediaItems: leave existing
  // challenges: leave existing
  techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'PostgreSQL', 'Canvas API'],
  nextProject: '003'
},
```

### `'005'` — Wordle (project-detail.js:93–110)

```javascript
'005': {
  title: 'Wordle',
  number: '005',
  overview: 'A Wordle clone I built in Programming 2 — pure HTML, CSS, and JavaScript, no frameworks, no backend.',
  description: 'A browser-based clone of Wordle I built in my Programming 2 class. The goal was simple: stand up a real JavaScript project I could actually deploy and play. You get six guesses to land a random 5-letter word from a ~500-word dictionary, with the usual blue/yellow/gray hints and an on-screen keyboard that colors itself as you go. When the game ends you can copy a spoiler-free emoji grid to share, same as the original. Everything runs from a single `index.html` — no frameworks, no server, no dependencies beyond a Google Font. Next steps would be user profiles, leaderboards, a bigger word list, and additional game modes.',
  // mediaItems: leave existing
  // challenges: leave existing
  techStack: ['HTML', 'CSS', 'JavaScript'],
  nextProject: '006'
},
```

### `'006'` — FinBot.AI (project-detail.js:111–128)

```javascript
'006': {
  title: 'FinBot.AI',
  number: '006',
  overview: 'Drop in a bank statement, get back a categorized breakdown of where your money went.',
  description: 'FinBot.AI is a web app — React on the front, FastAPI on the back — that reads your bank or credit card statements and sorts every transaction into Food, Dining, Transport, Shopping, and so on. You drag in a PDF or CSV, a robot mascot animates while the backend works, and you get back summary cards, category tabs, and a flag on any unusually large charge. The interesting piece is the three-tier categorization pipeline: about 150 popular merchants are hardcoded for instant matches, anything Claude has categorized before is cached locally forever, and only genuinely new merchants get sent to the Claude API. After a couple of uses, almost everything is handled by tiers 1 and 2 — so the AI cost stays near zero. This was V1, and the honest takeaway was the dependency on the Claude API: once I ran out of calls, scalability hit a wall, and the categorization occasionally confused debits and credits. Those limits are exactly why V2 (running locally on Ollama) exists.',
  // mediaItems: leave existing
  // challenges: leave existing
  techStack: ['React', 'Vite', 'Tailwind CSS', 'Python', 'FastAPI', 'pdfplumber', 'pandas', 'Claude API'],
  nextProject: '007'
},
```

### `'008'` — Bank Parser (project-detail.js:146–160)

```javascript
'008': {
  title: 'Bank Parser',
  number: '008',
  overview: 'My pride and joy — turn a bank statement PDF into a clean CSV in seconds, entirely on your own machine.',
  description: 'Bank Parser is the Python tool I started when I was working as a tax prep assistant, manually categorizing transactions and knowing there had to be a faster way. So I dove head first into Python and built it. Drag a PDF onto a local web page (FastAPI + a vanilla JS frontend), the parser uses pdfplumber to read every line, pulls out date / description / amount, and gives you back a preview table and a downloadable CSV. You can also upload multiple statements at once and combine them into one file. No accounts, no cloud, nothing leaves your computer. I leveraged AI to get the prototype standing, then came back to refactor, fix the messy formatting quirks every bank has, and add features. Next steps: more debugging, smarter features, potentially deploying it as an app, real user testing, automating more of the workflow, and tightening security.',
  // mediaItems: leave existing
  // challenges: leave existing
  techStack: ['Python', 'FastAPI', 'pdfplumber', 'pandas', 'HTML', 'CSS', 'JavaScript'],
  nextProject: '009'
},
```

### `'009'` — Additive Synthesizer (project-detail.js:161–172)

```javascript
'009': {
  title: 'Additive Synthesizer',
  number: '009',
  overview: 'Turn a list of MIDI notes into a real `.wav` file — built from scratch, no DAW required.',
  description: 'I built this one to actually understand how computers make sound, instead of just clicking knobs in a DAW. You give it a list of MIDI notes (0–127, negatives are rests), a tempo in BPM, and an optional timbre — sine, triangle, square, or sawtooth — and it generates a real `.wav` file by stacking sine waves at integer multiples of each note\'s frequency. That\'s the "additive" in additive synthesis. All the math runs locally in Python via NumPy; there\'s a Flask web UI with an on-screen piano and presets (Twinkle Twinkle, Ode to Joy, C Major scale) and a CLI version that plays through your speakers directly. No paid APIs, no AI models, no external services — just math turning into sound.',
  // mediaItems: leave existing
  // challenges: leave existing
  techStack: ['Python', 'NumPy', 'Flask', 'soundfile', 'sounddevice', 'HTML', 'JavaScript'],
  nextProject: '010'
},
```

---

## 5. Sanity-check before declaring done

After editing both files:

1. Open `index.html` in a browser. The 6 cards above should show the new titles + descriptions; the other 8 should be untouched.
2. Click "View Project" on each of the 6 updated cards. The detail page should load with:
   - The correct `title` in the header
   - The new `overview` line
   - The new `description` paragraph
   - The new `techStack` chips
   - The existing carousel media (don't expect new videos — we didn't touch `mediaItems`)
3. Click "View Project" on card 003, 004, 007, 010 — confirm they still show their original placeholder copy. If any of those changed, you touched the wrong entries.

---

## 6. What NOT to do

- Don't rewrite cards 003, 004, 007, 010–014. They are not in `projects/`.
- Don't touch `mediaItems`, `challenges`, or `nextProject` on the 6 cards you ARE editing.
- Don't reorder cards in `index.html` or keys in `projectsData`.
- Don't add new fields to `projectsData` entries — the renderer in `project-detail.js` only reads the ones already there.
- Don't replace the voice with corporate-deck language. If a sentence sounds like it belongs in a Series-B pitch deck, rewrite it.
- Don't commit anything. Make the edits and stop — the user will review.
