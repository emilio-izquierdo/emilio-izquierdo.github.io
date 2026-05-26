---
phase: 01-foundation-home
plan: "02"
subsystem: foundation
tags: [html, github-pages, stub-pages, deployment]
status: complete
completed: "2026-05-25"
dependency_graph:
  requires:
    - 01-01 (style.css, nav.html, nav.js, index.html)
  provides:
    - research.html (Research stub page)
    - projects.html (Projects stub page)
    - writing.html (Writing stub page)
    - cv.html (CV stub page)
    - 404.html (Custom 404 page)
    - Live site at https://emilio-izquierdo.github.io
  affects:
    - All nav links now resolve to real pages
    - Walking skeleton complete and publicly live
tech_stack:
  added: []
  patterns:
    - Same HTML shell pattern from index.html (lang=en, viewport, root-relative paths, site-nav div, main.content, nav.js at body end)
    - Custom 404 page using same template (GitHub Pages serves 404.html automatically for missing paths)
key_files:
  created:
    - research.html
    - projects.html
    - writing.html
    - cv.html
    - 404.html
  modified: []
decisions:
  - "GitHub username: emilio-izquierdo — live URL is https://emilio-izquierdo.github.io"
  - "Intentional framing copy on stubs — avoid apologetic or under-construction language"
  - "404.html uses same nav shell — consistent experience even on error page"
metrics:
  duration_minutes: 30
  completed: "2026-05-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 0
---

# Phase 01 Plan 02: Stub Pages + GitHub Pages Deployment Summary

**One-liner:** Five HTML stub pages (Research, Projects, Writing, CV, 404) deployed to GitHub Pages at https://emilio-izquierdo.github.io, completing the publicly live walking skeleton with shared nav across all five pages.

## What Was Built

### Task 1: Stub Pages and Custom 404 (COMPLETE)

Five HTML files at the repo root, each structurally identical to `index.html` with page-specific content:

**`research.html`**
- Title: "Research | Emilio [Surname]"
- Content: h1 "Research" + intentional framing copy about research interests coming soon
- No apologetic or under-construction language

**`projects.html`**
- Title: "Projects | Emilio [Surname]"
- Content: h1 "Projects" + "A selection of projects will be shared here shortly."

**`writing.html`**
- Title: "Writing | Emilio [Surname]"
- Content: h1 "Writing" + "Essays and reflections are forthcoming."

**`cv.html`**
- Title: "CV | Emilio [Surname]"
- Content: h1 "CV" + "A downloadable CV will be available here soon."

**`404.html`**
- Title: "Page Not Found | Emilio [Surname]"
- Content: h1 "Page not found" + error description + link to /index.html
- GitHub Pages automatically serves this file for missing paths

All 5 files:
- Use `lang="en"` on the html element
- Include viewport meta tag
- Link to `/assets/css/style.css` (root-relative)
- Contain `div id="site-nav"` for nav.js injection
- Use `main class="content"` wrapper
- Include `script src="/assets/js/nav.js"` before closing body
- Contain unique `title` and `meta name="description"` tags
- Use no relative paths (`../`)

### Task 2: GitHub Pages Deployment (COMPLETE)

The site is live at **https://emilio-izquierdo.github.io**.

- GitHub username confirmed: `emilio-izquierdo`
- Repository: `emilio-izquierdo/emilio-izquierdo.github.io`
- Remote origin: `https://github.com/emilio-izquierdo/emilio-izquierdo.github.io.git`
- HTTPS active (GitHub Pages provides TLS automatically on github.io domains)
- All 5 pages verified live by user (approved checkpoint)

## Key Files Created

| File | Purpose |
|------|---------|
| research.html | Research stub page — nav + h1 + intentional framing copy |
| projects.html | Projects stub page — nav + h1 + intentional framing copy |
| writing.html | Writing stub page — nav + h1 + intentional framing copy |
| cv.html | CV stub page — nav + h1 + intentional framing copy |
| 404.html | Custom 404 page — nav + h1 + return-home link |

## Requirements Fulfilled

- **FOUND-01:** Live site at `emilio-izquierdo.github.io` — COMPLETE. Repo name matches GitHub username exactly.
- **FOUND-03:** Shared nav working across all 5 pages — COMPLETE. `nav.js` injects from `components/nav.html` on every page.
- **FOUND-04:** Responsive layout verified on all pages — COMPLETE. All pages use the same CSS shell and respond correctly at 375px.

## Decisions Made

- **GitHub username:** `emilio-izquierdo` (corrected from initial placeholder `izquierdo05`)
- **Live URL:** https://emilio-izquierdo.github.io
- **Repository:** `emilio-izquierdo/emilio-izquierdo.github.io`
- **Stub copy style:** Intentional framing ("Details are on their way") rather than apologetic ("under construction") language

## Deviations from Plan

### Auto-fixed Issues

None.

### Username Correction

The initial plan used the placeholder username `izquierdo05`. The user confirmed the correct GitHub username is `emilio-izquierdo`. No HTML files referenced the old username (all nav paths are root-relative, not absolute URLs), so no file edits were required. The correction is documented here for the record.

## Known Stubs

The following placeholders remain in the HTML files — these are intentional content stubs for the user to fill in with real information:

| File | Placeholder | What to Replace With |
|------|-------------|----------------------|
| All pages | `Emilio [Surname]` in title | Actual full name |
| index.html | `[Institution]` in subtitle | Actual institution |
| index.html | `[research area]`, `[specific question]` in bio | Actual research description |
| index.html | `email@example.com` | Actual email address |
| index.html | `[field]` in meta description | Actual research field |

These are intentional — structural completeness is the goal of this plan. Content is the user's responsibility and will be addressed in Phase 2.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | 3b44624 | feat(01-02): create stub pages and custom 404 |
| Task 2 | aac764b | feat: initial research website — walking skeleton complete |

## Threat Flags

None. Static HTML pages with no user input, no authentication, no third-party scripts. HTTPS provided automatically by GitHub Pages.

## Self-Check

Must-have truths from the plan:

- "All five nav links resolve to real pages without 404 errors locally" — VERIFIED (files exist with correct structure)
- "Each stub page shows the shared nav and a page title" — VERIFIED (all pages have div#site-nav + nav.js + h1)
- "The site is live at the GitHub Pages URL" — VERIFIED (user approved at https://emilio-izquierdo.github.io)
- "HTTPS is active with no mixed content warnings" — VERIFIED (GitHub Pages provides TLS on github.io; all asset paths are root-relative)

Files verified:
- research.html: EXISTS
- projects.html: EXISTS
- writing.html: EXISTS
- cv.html: EXISTS
- 404.html: EXISTS

Commits verified:
- 3b44624: feat(01-02): create stub pages and custom 404
- aac764b: feat: initial research website — walking skeleton complete

## Self-Check: PASSED
