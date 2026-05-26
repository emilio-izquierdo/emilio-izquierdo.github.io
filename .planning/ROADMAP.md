# Roadmap: Personal Research Website

## Overview

Three phases build a minimal static personal website from working infrastructure to a fully launch-ready academic presence. Phase 1 establishes the repo, shared styles, and a live home page — something shareable from day one. Phase 2 completes the content-heavy pages (Research, Projects, CV) that PIs actually evaluate. Phase 3 adds the Writing placeholder and final polish that makes the site feel complete, not sparse.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation + Home** - Repo configured correctly, shared nav live, home page published and shareable
- [ ] **Phase 2: Research + Projects + CV** - All PI-evaluated content pages complete and live
- [ ] **Phase 3: Writing + Polish** - Writing placeholder in place, mobile and deployment verified, launch-ready

## Phase Details

### Phase 1: Foundation + Home

**Goal**: As a PI reviewing applications, I want to visit a live personal website that shows the researcher's name, bio, and email with navigation to all sections, so that I can quickly understand who this researcher is and how to reach them.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, HOME-01, HOME-02, HOME-03
**Success Criteria** (what must be TRUE):

  1. Visiting `emilio-izquierdo.github.io` loads the home page with the researcher's name, bio, and email visible without scrolling
  2. All five section links in the shared navigation are present and functional on every page
  3. The site is served over HTTPS with no 404 errors on any nav link
  4. The page renders correctly and is readable on a phone screen (no horizontal scroll, no clipped text)

**Plans:** 3/3 plans complete
Plans:
**Wave 1**

- [x] 01-01-PLAN.md — Shared infrastructure (CSS, nav, nav.js) + home page

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 01-02-PLAN.md — Stub pages (research, projects, writing, cv, 404) + GitHub Pages deployment

**UI hint**: yes

### Phase 2: Research + Projects + CV

**Goal**: Every page a PI clicks to evaluate the researcher is complete — research interests, past work, non-academic projects, and a working CV download.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: RSRCH-01, RSRCH-02, PROJ-01, CV-01, CV-02
**Success Criteria** (what must be TRUE):

  1. Research page shows two distinct sections: a narrative Interests paragraph and a Work section listing past projects or papers with descriptions
  2. Projects page lists at least one non-academic project with title, description, and a working link
  3. CV page has a prominent download link that delivers the actual PDF file (verified from incognito/private browsing)
  4. CV page shows a last-updated date so a PI can confirm the document is current

**Plans**: TBD
**UI hint**: yes

### Phase 3: Writing + Polish

**Goal**: The site is complete and launch-ready — Writing section exists as an intentional placeholder, the site is fully mobile-responsive, and all deployment details are verified.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: WRIT-01, WRIT-02
**Success Criteria** (what must be TRUE):

  1. Writing page contains intentional framing copy (not a blank page, not "under construction" language)
  2. Writing page HTML structure allows adding a new post entry by inserting one `<li>` block without changing any other part of the page
  3. Site passes a full navigation check: every link on every page resolves correctly at the live GitHub Pages URL

**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Home | 3/3 | Complete   | 2026-05-26 |
| 2. Research + Projects + CV | 0/? | Not started | - |
| 3. Writing + Polish | 0/? | Not started | - |
