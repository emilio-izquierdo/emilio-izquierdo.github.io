---
phase: 01-foundation-home
plan: "01"
subsystem: foundation
tags: [html, css, navigation, github-pages, static-site]
dependency_graph:
  requires: []
  provides:
    - style.css (shared site stylesheet)
    - nav.html (shared navigation partial)
    - nav.js (fetch-inject navigation loader)
    - index.html (home page)
    - .nojekyll (Jekyll bypass)
  affects:
    - All subsequent pages inherit style.css, nav.html, nav.js
tech_stack:
  added: []
  patterns:
    - Josh Comeau 2025 CSS reset inline in style.css
    - CSS custom properties design tokens at :root
    - Fetch-inject navigation pattern (nav.js fetches components/nav.html at runtime)
    - aria-current="page" for active nav state detection
    - Root-relative asset paths (/assets/css/style.css, /assets/js/nav.js)
    - Flat HTML files at repo root (no subdirectory convention)
key_files:
  created:
    - .nojekyll
    - assets/css/style.css
    - components/nav.html
    - assets/js/nav.js
    - index.html
  modified: []
decisions:
  - "Flat HTML files at root (not subdirectories) — simpler for 5 pages, no path complexity added"
  - "Fetch-inject nav pattern over duplicated HTML — avoids maintenance trap when nav changes"
  - "System serif font stack (Charter/Cambria) — zero network requests, GDPR-safe, academic aesthetic"
  - "CSS custom properties for all design tokens — single-edit global changes"
metrics:
  duration_minutes: 1
  completed: "2026-05-25"
  tasks_completed: 2
  files_created: 5
  files_modified: 0
---

# Phase 01 Plan 01: Foundation Infrastructure and Home Page Summary

**One-liner:** CSS design token system, shared fetch-inject navigation, and home page HTML shell using system serif fonts and Josh Comeau 2025 reset.

## What Was Built

### Task 1: Shared Infrastructure Files

Four files establishing the shared foundation for all site pages:

**`.nojekyll`** — Empty file at repo root. Required to prevent GitHub Pages from running Jekyll processing, which would silently exclude assets in some configurations.

**`assets/css/style.css`** (238 lines) — Complete site stylesheet with 8 labeled sections:

1. DESIGN TOKENS: 22 CSS custom properties covering colors (7), fonts (2), type scale (7), line heights (3), and layout (3). Color values chosen for WCAG AA compliance on light backgrounds.
2. RESET: Josh Comeau 2025 CSS reset (8 rules) — modern cross-browser baseline without IE-era cruft.
3. BASE TYPOGRAPHY: body/heading/link styles using design token variables.
4. LAYOUT: `.content` wrapper with `max-width: var(--max-width)` (680px) and `margin-inline: auto` for centered, readable content columns.
5. NAVIGATION: `.site-nav` flex layout with `a[aria-current="page"]` selector for active state styling.
6. HOME PAGE: `.home-hero`, `.subtitle`, `.bio`, `.contact`, `.home-links` classes for home page content.
7. RESPONSIVE: Single `@media (max-width: 600px)` breakpoint — nav stacks vertically, home links stack vertically, page title shrinks to 1.75rem.
8. UTILITIES: Placeholder section for future utility classes.

**`components/nav.html`** — Raw navigation markup with no html/head/body wrapper. Contains `<nav class="site-nav" aria-label="Main navigation">` with 5 links (Home, Research, Projects, Writing, CV) using root-relative paths.

**`assets/js/nav.js`** — 18-line IIFE that fetches `/components/nav.html`, injects into `#site-nav` div, then loops through nav links to set `aria-current="page"` on the link matching `window.location.href`. Uses `function` syntax for maximum browser compatibility.

### Task 2: Home Page

**`index.html`** — Complete HTML5 home page shell:
- `lang="en"` on html element
- Viewport meta tag for mobile rendering
- Root-relative stylesheet and script links
- `div id="site-nav"` placeholder for nav injection
- `main.content` with `section.home-hero` containing h1 (name), p.subtitle (role/institution), p.bio (4-sentence first-person active-voice placeholder), p.contact (mailto link)
- `nav.home-links` with 4 links to remaining sections
- `script src="/assets/js/nav.js"` at body end (no defer needed — DOM exists when script runs)

## Deviations from Plan

None - plan executed exactly as written.

## Requirements Fulfilled

| Req ID | Description | Status |
|--------|-------------|--------|
| FOUND-02 | `.nojekyll` at repo root | Done |
| FOUND-03 | Shared nav infrastructure (nav.html + nav.js) | Done |
| FOUND-04 | Responsive layout (viewport meta + 600px breakpoint) | Done |
| HOME-01 | Name/role/bio on home page | Done (placeholder content for user to fill) |
| HOME-02 | Email mailto link | Done |
| HOME-03 | Nav links to all 5 sections | Done |

## Commits

| Task | Commit | Message |
|------|--------|---------|
| Task 1 | 527b53d | feat(01-01): create shared infrastructure files |
| Task 2 | 8851409 | feat(01-01): create index.html home page |

## Known Stubs

The following placeholder values in `index.html` and `components/nav.html` require user replacement before the site is content-complete:

| File | Placeholder | What to Replace With |
|------|-------------|----------------------|
| index.html | `Emilio [Surname]` in title and h1 | Actual full name |
| index.html | `[Institution]` in subtitle | Actual institution name |
| index.html | Bio paragraph brackets | Real bio text |
| index.html | `email@example.com` | Real email address |
| components/nav.html | `Emilio` in nav-name anchor | Actual first name or preferred display name |

These stubs are intentional — the plan's goal is structural completeness, not content completeness. HOME-01 content readiness is a user responsibility noted in the research document (Assumption A2).

## Threat Flags

None. This plan introduces only static HTML/CSS/JS with no user input, no authentication, no third-party scripts, and no sensitive data. The threat model in the plan covers the applicable surface (T-01-01 through T-01-03) and all dispositions are "accept" for a read-only static site.

## Self-Check: PASSED

Files verified:
- .nojekyll: EXISTS (0 bytes)
- assets/css/style.css: EXISTS (238 lines)
- components/nav.html: EXISTS (10 lines)
- assets/js/nav.js: EXISTS (18 lines)
- index.html: EXISTS (40 lines)

Commits verified:
- 527b53d: feat(01-01): create shared infrastructure files
- 8851409: feat(01-01): create index.html home page
