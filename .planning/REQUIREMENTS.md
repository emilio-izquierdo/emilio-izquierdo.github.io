# Requirements: Personal Research Website

**Defined:** 2026-05-25
**Core Value:** A PI can land on this site, immediately understand who this researcher is and what they work on, and find their CV in under 10 seconds.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Repository is named `username.github.io` for correct GitHub Pages URL resolution
- [x] **FOUND-02**: `.nojekyll` file exists at repo root to prevent Jekyll processing of assets
- [x] **FOUND-03**: Shared navigation is present and working across all five pages
- [x] **FOUND-04**: Layout is mobile-responsive and readable on phones and tablets

### Home

- [x] **HOME-01**: Visitor sees name, professional role/title, and bio paragraph immediately on landing
- [x] **HOME-02**: Email address is visible and clickable (mailto link, not a contact form)
- [x] **HOME-03**: Navigation links to all five sections are present and functional

### Research

- [ ] **RSRCH-01**: Research interests section contains a narrative paragraph (not a keyword list)
- [ ] **RSRCH-02**: Past work section lists papers and/or projects with brief descriptions

### Projects

- [ ] **PROJ-01**: Projects listed with title, description, and links to GitHub repos or demos

### CV

- [ ] **CV-01**: PDF download link for CV is present and works (downloads the actual file)
- [ ] **CV-02**: Last-updated date is shown on the CV page so PIs know the PDF is current

### Writing

- [ ] **WRIT-01**: Writing section has intentional placeholder copy — not an empty page, framed as active intent
- [ ] **WRIT-02**: Writing section HTML structure supports adding individual posts/essays later without restructuring the page

## v2 Requirements

### Research

- **RSRCH-03**: Google Scholar or ORCID profile link (when publications exist to link to)

### Writing

- **WRIT-03**: Individual post pages with full content
- **WRIT-04**: RSS feed for writing

### Home

- **HOME-04**: Headshot photo (deferred — add when a good professional photo is available)

### Site-wide

- **SITE-01**: Favicon
- **SITE-02**: Open Graph meta tags for link previews

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form | Adds complexity; visible email is preferred by academics and simpler to maintain |
| HTML CV page | PDF-only is simpler to maintain one source of truth |
| Dark mode | Scope reduction; light-only is standard for academic sites |
| CMS or data-file system | Direct HTML editing is intentional; avoid unnecessary abstraction |
| JavaScript-heavy interactions | Site is a document, not an app |
| Custom domain | username.github.io is sufficient; add later if needed |
| Social media embeds | Anti-feature for job-market audience; distraction |
| Comments / discussion | No content yet; premature |
| "Under construction" labels | Anti-feature — placeholder copy must be intentional, not apologetic |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| HOME-01 | Phase 1 | Complete |
| HOME-02 | Phase 1 | Complete |
| HOME-03 | Phase 1 | Complete |
| RSRCH-01 | Phase 2 | Pending |
| RSRCH-02 | Phase 2 | Pending |
| PROJ-01 | Phase 2 | Pending |
| CV-01 | Phase 2 | Pending |
| CV-02 | Phase 2 | Pending |
| WRIT-01 | Phase 3 | Pending |
| WRIT-02 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-25*
*Last updated: 2026-05-25 after roadmap creation — all 14 v1 requirements mapped*
