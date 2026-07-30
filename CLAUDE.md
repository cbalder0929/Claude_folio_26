# CLAUDE.md — charlesbalderas.com Portfolio

## Project Overview

Personal portfolio site for Charles Balderas. No framework, no build step — plain HTML/CSS/JS served statically.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main page: navbar, hero/projects carousel, about, gallery, footer/contact |
| `project-detail.html` | Single template for all project detail pages (driven by `?id=NNN`) |
| `script.js` | Parallax, project carousel, i18n, light/dark mode |
| `project-detail.js` | All project data + detail page carousel + prev/next nav |
| `shared-ui.js` | Shared navbar, theme toggle, language toggle |
| `styles.css` | Design tokens (CSS vars) and all main-page styles |
| `project-detail.css` | Detail-page-specific styles |

## Design System

CSS variables are defined at the top of `styles.css`. Key tokens:
- `--navy`, `--blue-bright`, `--blue-light` — primary palette
- `--cream` — light mode surface
- Fonts: Cormorant Garamond (display), Syne (UI), DM Mono (code/numbers)

Dark mode is toggled via a class on `<body>`. Light mode button is in the nav logo hover panel.

## i18n

Translations live in the `translations` object inside `shared-ui.js`. HTML elements use `data-i18n="keyName"` attributes. Always add both `en` and `es` entries when adding new copy. Project detail page body content (`projectsData` in `project-detail.js`) is English-only by design — there is no Spanish variant.

## Project Data

All project content lives in `projectsData` inside `project-detail.js`. Each entry has:

```js
'001': {
  title, number, overview, description,   // text
  mediaItems: [{ type, src, label }],     // 'image' | 'video' | 'placeholder'
  challenges: [{ title, description }],
  techStack: ['...'],
  nextProject: '002'                      // null for last project
}
```

Projects 007–014 are partially or fully placeholder — fill them in as projects are completed.

## Common Tasks

**Add/update a project:** Edit the matching entry in `project-detail.js`. Drop media in `imgs/`. Update the card in `index.html` and the i18n strings in `script.js`.

**Add a new gallery photo:** Convert HEIC → JPEG with `node convert-heic.js`, drop into `imgs/`, add a `.gallery-item` block in `index.html`.

**Change carousel behavior:** Carousel logic (both main and detail) is in `script.js` / `project-detail.js` respectively.

## Do Not

- Do not add a build system or bundler unless the project explicitly moves to one.
- Do not introduce a CSS framework (Tailwind, Bootstrap, etc.) — the design uses hand-written CSS variables.
- Do not modify `node_modules/` — it only exists for the `convert-heic.js` utility.
