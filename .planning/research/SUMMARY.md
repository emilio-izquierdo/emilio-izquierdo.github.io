# Project Research Summary

**Project:** Personal Research Website (username.github.io)
**Domain:** Personal academic website — static HTML/CSS/JS, GitHub Pages, PI reviewer audience
**Researched:** 2026-05-25
**Confidence:** HIGH

## Executive Summary

This is a five-page personal academic website for a researcher on the job market targeting lab manager and research specialist roles. The site's primary audience is PIs reviewing applications, who need to land on the site, identify the researcher's focus and credibility, and locate the CV in under 10 seconds. The expert consensus is unambiguous: build it with plain HTML, CSS, and no JavaScript framework. Flat static files at the repo root, deployed via GitHub Pages branch publish, with a single shared stylesheet and a fetch-injected shared navigation partial. No build step, no framework, no npm — the site should be editable by anyone comfortable with HTML and survive for years without dependency rot.

The feature priority is equally clear: a substantive bio with headshot, a prominent CV download link, research interests written in plain language (not keyword lists), and past projects with concrete outcomes. These six elements are what PIs actually evaluate. The Writing section should exist as a structurally correct placeholder — framed as intentionally under development, never as "coming soon" or abandoned. The biggest differentiator over generic academic templates is not visual sophistication but specificity: concrete project descriptions, a narrative framing of research interests, and the visible distinction between current interests and past work.

The most dangerous risks are non-technical: a bio written in academic jargon that fails the 10-second read test, sparse content that reads as neglect rather than minimalism, and a broken CV download link. On the technical side, the critical failure modes are setup errors — wrong repository name, missing `.nojekyll` file, case-sensitive filename mismatches — that must be addressed in the first phase before any content is built. All five critical pitfalls are preventable with upfront discipline; none require complex solutions.

---

## Key Findings

### Recommended Stack

The right stack for this project is the simplest possible: plain HTML files at the repository root, a single `style.css`, a `components/nav.html` partial fetched and injected by a 15-line `assets/js/nav.js` loader, and GitHub Pages branch deploy from `main`. No frameworks, no build tools, no npm. CSS uses custom properties (design tokens) for all colors, spacing, and type scales — this makes global visual changes a single-line edit. Typography uses system font stacks: transitional serif (Charter/Cambria) for body text, system-ui for navigation and UI labels. The system stack eliminates Google Fonts' privacy and performance costs while producing the academic serif aesthetic researchers expect.

**Core technologies:**
- GitHub Pages (branch deploy from root): hosting — zero-config, free, serves static files directly; no Jekyll
- Plain HTML: pages — directly editable, no build step, survives indefinitely
- Single `style.css` with CSS custom properties: styling — one file to edit, one file to cache, design tokens enable global changes
- Fetch-injected `nav.html` partial: shared navigation — single source of truth, no framework, no JS string templates
- System serif font stack (Charter/Cambria): typography — academic aesthetic, zero network requests, GDPR-safe
- `.nojekyll` file: GitHub Pages config — disables Jekyll, prevents silent file exclusion

### Expected Features

The feature research is grounded in PI hiring behavior and reviewed against multiple academic website guides and job market resources. The must-have list is short and each item is load-bearing.

**Must have (table stakes):**
- Name prominent in header and body text (h1) on every page — orientation and search findability
- Professional bio (2-4 sentences, active voice, plain language) — first thing PIs read; fails at jargon
- Professional headshot — PIs form impressions in seconds; missing signals evasion or incompleteness
- Email contact visible without clicking — PIs should never hunt for contact info
- CV download link (PDF, stable filename) — primary hiring document; broken link directly damages application
- Research interests in plain sentences — must communicate intellectual focus, not list keywords
- Past projects with concrete descriptions — role, what was done, what came out
- Consistent navigation across all pages — structural coherence; inconsistency destroys trust

**Should have (differentiators):**
- Research interests framed as a narrative paragraph, not a keyword list — signals intellectual maturity
- Clear visual/structural distinction between Research Interests and Research Work — professional self-awareness PIs notice
- Writing section with intentional placeholder framing — signals active engagement without false "under construction" signals
- Concrete outcomes in project descriptions ("EEG preprocessing for N=80 study, three accepted abstracts") — evidence beats claims
- Clean minimal aesthetic with generous whitespace — absence of visual noise is the differentiator

**Defer (v2+):**
- Blog functionality with RSS, pagination, or dynamic features — not until Writing has 5+ posts
- Analytics
- Search
- Social media integration
- Dark mode

### Architecture Approach

The architecture is a flat-file static site with a fetch-inject pattern for shared navigation. Five HTML files at the repository root; a `components/nav.html` partial containing raw nav markup (no html/head/body tags); a `assets/js/nav.js` loader that fetches and injects the nav into a `#site-nav` div on each page; a single `assets/css/style.css`; and an `assets/files/cv.pdf`. The CSS is structured in a logical section order: custom properties first, then reset, then typography, then layout, then navigation, then page-specific sections. This structure means visual changes are made at the top; page-specific overrides are scoped at the bottom.

The fetch-inject pattern is the architecture's one notable tradeoff: it requires a local HTTP server for development (VS Code Live Server or `python3 -m http.server`) because `file://` protocol blocks cross-origin fetch. This is a minor friction developers must know about upfront.

**Major components:**
1. `components/nav.html` + `assets/js/nav.js` — shared navigation, single source of truth for all 5 pages
2. `assets/css/style.css` — all visual styling, CSS custom properties as design tokens
3. `index.html` — home page shell (template for all other pages)
4. `research.html` — two-section layout: Interests (forward-looking) + Work (past projects)
5. `projects.html` — non-academic projects, distinct from research
6. `writing.html` — placeholder with list structure ready for future posts
7. `cv.html` + `assets/files/cv.pdf` — download page for the actual CV document

### Critical Pitfalls

Research identified 16 pitfalls across critical, moderate, and minor severity. The top 5, ranked by damage potential for this specific job-market use case:

1. **Broken CV download link** — PDF not committed to git, or committed with filename case mismatch. Test the live link from incognito before every job application. Use stable filename `cv.pdf`, never dated variants.
2. **Wrong repository name** — GitHub Pages only serves at `username.github.io` if the repo is named exactly that. Verify GitHub username before repo creation. Cannot be fixed after content is built without breaking all shared links.
3. **Missing `.nojekyll` file** — GitHub Pages runs Jekyll by default and silently excludes files in underscore-named directories. Add `.nojekyll` at repo root before first push. Costs nothing; prevents invisible asset loss.
4. **Sparse content read as neglect** — PIs form a negative impression from empty or placeholder sections. Write bio, research interests, and project descriptions before building pages, not after.
5. **Bio in academic register** — passive voice, jargon, abstract framing fails the 10-second read. Write for someone who has never read the work and has 20 seconds. Read it aloud. If it sounds like a grant abstract, rewrite it.

Additionally: case-sensitive filenames cause 404s only on GitHub Pages (macOS development hides the problem); missing viewport meta tag breaks mobile; missing `<title>` and meta description tags degrade search findability and link previews.

---

## Implications for Roadmap

The research strongly suggests a three-phase build order based on dependency analysis and pitfall timing. Setup decisions and infrastructure must come before content to avoid rework; content quality must be validated before deployment.

### Phase 1: Foundation and Infrastructure

**Rationale:** All five critical pitfalls are setup or architecture decisions that must be made before content is built. Repository naming, `.nojekyll`, lowercase filename conventions, the HTML page shell template, and the shared nav pattern — these must be correct from the start. Retrofitting any of them after content exists requires touching every file.

**Delivers:**
- GitHub repository named correctly (`[username].github.io`)
- `.nojekyll` at root
- All-lowercase file naming convention established
- `assets/css/style.css` with CSS custom properties, reset, base typography, layout
- `components/nav.html` with final nav labels
- `assets/js/nav.js` fetch-inject loader
- `index.html` as the confirmed page shell template (head, body structure, script include)
- `404.html` with site nav
- Viewport meta tag and title/meta description in template

**Addresses:** Table-stakes features: consistent navigation, working links, fast load
**Avoids:** Pitfalls 1 (wrong repo name), 2 (case sensitivity), 3 (Jekyll), 5 (copy-paste nav trap), 7 (missing meta tags), 12 (missing viewport), 13 (path problems), 15 (no 404 page)

**Research flag:** No deeper research needed. Patterns are well-documented and unambiguous.

---

### Phase 2: Core Content Pages

**Rationale:** With infrastructure confirmed and the page shell template validated, remaining pages are content work — copy the shell, write the content. This phase produces the primary pages PIs evaluate. Content should be written before pages are built; the pitfall research is explicit that publishing empty or placeholder pages creates a negative impression.

**Delivers:**
- `index.html`: name in h1, bio paragraph (active voice, plain language), headshot, email visible, link to CV
- `research.html`: two-section layout — Interests (forward-looking narrative) + Work (past projects with concrete outcomes)
- `cv.html`: prominent PDF download link; `assets/files/cv.pdf` committed to git
- `projects.html`: non-academic projects with descriptions

**Addresses:** All six must-have table-stakes features. Differentiator features: narrative research interests, Research/Work distinction, concrete project outcomes.
**Avoids:** Pitfalls 4 (broken CV), 6 (no name on page), 8 (sparse content), 9 (abstract bio), 10 (photo problems)

**Research flag:** No deeper research needed for structure. Content quality (bio voice, project specificity) is a content task, not a technical one.

---

### Phase 3: Writing Placeholder and Polish

**Rationale:** The Writing section requires a distinct approach — a graceful placeholder that signals intention without "under construction" language, and HTML structure that supports a post list without requiring a rebuild when real content arrives. Polish (aria-current active states, mobile responsiveness, image optimization, meta description per page) should come last to avoid over-engineering before the site shape is confirmed.

**Delivers:**
- `writing.html`: framing paragraph + empty post list structure ready for future entries
- `aria-current="page"` active nav state styling in CSS
- Mobile responsiveness pass (single breakpoint)
- Image optimization (headshot under 200KB)
- Per-page `<title>` and `<meta name="description">` tags
- Favicon
- GitHub Pages deployment verified over HTTPS; all fetch paths confirmed

**Addresses:** Writing placeholder strategy, site completeness, findability.
**Avoids:** Pitfalls 11 (outdated info), 16 (caching verification), 10 (large images)

**Research flag:** No deeper research needed. Writing placeholder strategy is well-specified in FEATURES.md.

---

### Phase Ordering Rationale

- Infrastructure before content because setup errors (repo name, `.nojekyll`, filename case) cannot be fixed after content is built without rework
- CV page in Phase 2 because it is the single highest-stakes page and should be tested live early
- Writing and polish in Phase 3 because the Writing placeholder pattern is a known solution requiring no research, and polish decisions (breakpoints, spacing) are best made when real content is in place
- No phase needs deeper research — the domain is thoroughly documented, the stack is minimal and stable, and all patterns are well-established for plain HTML static sites

### Research Flags

Phases with standard patterns (no research-phase needed):
- **Phase 1:** GitHub Pages configuration and HTML/CSS fundamentals — official documentation is comprehensive
- **Phase 2:** Content writing is a content task; HTML structure is standard
- **Phase 3:** CSS responsiveness and GitHub Pages deployment — well-documented, no ambiguity

No phases identified as needing `/gsd-plan-phase --research-phase`. The entire domain is unusually well-documented for its simplicity. The only "research" needed during execution is content-quality review — specifically, having the bio reviewed by a non-researcher to confirm the plain-language test passes.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | GitHub Pages behavior verified against official docs; CSS and font recommendations from current authoritative sources (MDN, Josh Comeau's 2025 reset) |
| Features | MEDIUM-HIGH | Multiple sources including Berkeley Townsend Center, Elsevier Connect, and hiring committee perspectives; some sources are dated (2013) but structural advice holds |
| Architecture | HIGH | Fetch-inject pattern verified against MDN Fetch API spec; GitHub Pages file structure from official documentation; pattern well-established in practitioner community |
| Pitfalls | HIGH | Case-sensitivity, `.nojekyll`, and repo naming pitfalls confirmed in GitHub official docs; content pitfalls confirmed across multiple independent academic website guides |

**Overall confidence:** HIGH

### Gaps to Address

- **Photo availability:** Research confirms a professional headshot is required, but the actual photo asset must exist before Phase 2 can complete. If no suitable photo exists, this is a content blocker — not a technical one.
- **CV PDF readiness:** The CV must be a current, well-formatted PDF before Phase 2 deploys. The technical structure is trivial; the content must exist.
- **Bio content quality:** Research identifies abstract bio language as the fourth-highest-damage pitfall, but content quality cannot be validated during planning — it requires human review after writing. Flag this for explicit review before launch.
- **GitHub username confirmation:** Repo must be named exactly `[username].github.io`. Must be confirmed before Phase 1 begins. Not a research gap, but a prerequisite that must be validated at project start.

---

## Sources

### Primary (HIGH confidence)
- GitHub Pages publishing source documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- `.nojekyll` explanation: https://github.blog/news-insights/bypassing-jekyll-on-github-pages/
- GitHub Pages 404 troubleshooting: https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites
- MDN Fetch API (file:// limitation): https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- Josh W. Comeau CSS reset (March 2025): https://www.joshwcomeau.com/css/custom-css-reset/
- MDN Web Components: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
- MDN GitHub Pages overview: https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/Using_GitHub_pages

### Secondary (MEDIUM confidence)
- Berkeley Townsend Center: Personal Academic Webpages How-To's and Tips — feature expectations for PI audience
- Elsevier Connect: Creating a Simple and Effective Academic Personal Website — feature priorities
- The Academic Designer (multiple articles, 2019–2025) — pitfalls and differentiator features
- PMC: What PIs Want When Hiring a Clinical Research Coordinator — PI hiring behavior
- Modern font stacks (modernfontstacks.com) — system font stack recommendations
- plain-academic GitHub template — real-world architecture reference
- GitHub Pages directory and file usage (tomcam.github.io) — file structure conventions

### Tertiary (LOW confidence)
- Inside Higher Ed (2013): What Academic Job-Seekers Need on Their Websites — structural advice still holds but dated
- Leiter Reports (2012): Maintaining a Personal Web Page While on the Job Market — philosophy-specific, old; principles applicable

---
*Research completed: 2026-05-25*
*Ready for roadmap: yes*
