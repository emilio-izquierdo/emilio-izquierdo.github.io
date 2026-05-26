# Personal Research Website

## What This Is

A minimal static personal website hosted on GitHub Pages (username.github.io) for a researcher currently on the job market for lab manager and research specialist roles. Five sections — Home, Research, Projects, Writing, CV — built with plain HTML/CSS/JS and no frameworks. The site needs to work for PIs reviewing applications today, and grow into a full academic presence over time.

## Core Value

A PI can land on this site, immediately understand who this researcher is and what they work on, and find their CV in under 10 seconds.

## Requirements

### Validated

- [x] Five-page structure: Home, Research, Projects, Writing, CV — Validated in Phase 1 (foundation-home)
- [x] Home page: name, bio paragraph, email, and navigation links — Validated in Phase 1 (foundation-home)
- [x] Shared navigation across all pages — Validated in Phase 1 (foundation-home)
- [x] No build tools, no frameworks — edit HTML directly — Validated in Phase 1 (foundation-home)
- [x] Deployed to GitHub Pages as static files — Validated in Phase 1 (foundation-home)

### Active

- [ ] Five-page site: Home, Research, Projects, Writing, CV
- [ ] Home page: name, bio paragraph, and navigation links to all sections
- [ ] Research section: current interests/direction + past projects/papers, separated
- [ ] Projects section: non-academic work (side projects, personal work, tools)
- [ ] Writing section: placeholder structure that supports blog posts + essays later
- [ ] CV section: PDF download link (no HTML reproduction)
- [ ] Minimal light aesthetic: white/off-white, generous whitespace, text-forward
- [ ] Shared navigation across all pages, consistent header
- [ ] No build tools, no frameworks — edit HTML directly to update

### Out of Scope

- Dark mode — keep it simple, light only for now
- CMS or data-file system — direct HTML editing is the intent
- HTML CV — PDF only
- Custom domain — username.github.io is fine
- JavaScript-heavy interactions — this is a document, not an app
- Comments or contact form — not needed for this use case

## Context

- Audience priority: PIs reviewing lab manager/research specialist applications first, academic peers second, general professional audience third
- Content is sparse now but structure and quality should look intentional from day one
- Writing section: placeholder initially, but HTML structure should support mixed notes + longer essays eventually without requiring a rebuild
- Research section split: "Interests" (forward-looking, what they want to work on) and "Work" (past projects, papers, outputs)
- Projects = non-academic work, distinct from Research which is lab/academic
- Deployed to GitHub Pages; no build step, static files only

## Constraints

- **Tech**: Plain HTML/CSS/JS only — no React, no Jekyll, no Eleventy, no build pipeline
- **Hosting**: GitHub Pages — must work as static files with no server
- **Maintenance**: Editable by someone comfortable with HTML directly
- **Performance**: Fast load, minimal assets — researchers on slow connections or institutional networks

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No frameworks | Longevity, simplicity, no dependency rot | — Pending |
| PDF-only CV | Simpler to maintain one source of truth | — Pending |
| Separate Research/Projects | Academic vs. everything else is a meaningful distinction for this audience | — Pending |
| Light aesthetic | Standard for academic sites, easier to read dense text | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-26 — Phase 1 (foundation-home) complete*
