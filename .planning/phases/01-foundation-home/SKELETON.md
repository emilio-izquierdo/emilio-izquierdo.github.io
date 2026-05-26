# Walking Skeleton -- Personal Research Website

**Phase:** 1
**Generated:** 2026-05-25

## Capability Proven End-to-End

A visitor can open the live GitHub Pages URL and see a styled home page with the researcher's name, bio, email, and working navigation links to all five sections.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | None -- plain HTML/CSS/JS | Longevity, zero dependency rot, editable by anyone who knows HTML |
| Styling | Single `assets/css/style.css` with CSS custom properties | One file to edit, one file to cache; custom properties enable global changes at one edit point |
| CSS Reset | Josh Comeau 2025 reset (inlined in style.css) | Modern cross-browser baseline without IE-era cruft |
| Typography | System serif stack (Charter, Cambria) + system sans-serif for UI | Zero network requests, zero FOUT, GDPR-safe, academic aesthetic |
| Shared navigation | Fetch-inject pattern (`components/nav.html` + `assets/js/nav.js`) | Single source of truth for nav; avoids copy-paste maintenance trap across 5 pages |
| Active page indicator | `aria-current="page"` set by nav.js, styled via CSS attribute selector | Automatic after injection; no per-page markup needed |
| Deployment target | GitHub Pages branch deploy from root (`/`) on `main` | Free, zero-config, HTTPS automatic at `username.github.io` |
| Directory layout | Flat HTML files at root; `assets/{css,js}/` for shared files; `components/` for partials | Simplest structure for a 5-page site; root-relative paths work correctly |
| File naming | All lowercase, hyphens for spaces | Case-sensitive Linux filesystem on GitHub Pages; prevents 404s |

## Stack Touched in Phase 1

- [x] File structure (`assets/css/`, `assets/js/`, `components/`)
- [x] Styling -- CSS custom properties, reset, typography, layout, nav, responsive
- [x] Routing -- 5 HTML pages at root, all linked via shared nav
- [x] Shared component -- fetch-inject nav from `components/nav.html`
- [x] Deployment -- live at `username.github.io` via GitHub Pages

## Out of Scope (Deferred to Later Slices)

- Research page content (Phase 2)
- Projects page content (Phase 2)
- CV page with PDF download (Phase 2)
- Writing page with post structure (Phase 3)
- Headshot photo (v2 requirement)
- Favicon (v2 requirement)
- Open Graph meta tags (v2 requirement)
- Dark mode (out of scope entirely)
- Custom domain (out of scope entirely)

## Subsequent Slice Plan

Each later phase adds content on top of this skeleton without altering its architectural decisions:

- Phase 2: Research interests + past work, Projects list, CV page with PDF download
- Phase 3: Writing placeholder with post structure, mobile polish pass, final deployment verification
