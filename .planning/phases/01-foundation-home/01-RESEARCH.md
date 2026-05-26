# Phase 1: Foundation + Home — Research

**Researched:** 2026-05-25
**Domain:** Static HTML/CSS site skeleton — GitHub Pages configuration, CSS design tokens, shared navigation, and home page HTML structure
**Confidence:** HIGH — domain is plain HTML/CSS/GitHub Pages; patterns are official-docs-verified and unambiguous for this scope

---

## Summary

Phase 1 is a Walking Skeleton: the thinnest possible end-to-end slice that results in a live, shareable URL. By the end of this phase, visiting `[username].github.io` in a browser returns a styled home page with the researcher's name, bio, email, and working navigation to all five sections. Nothing else — no content pages, no photos, no CV — just the skeleton that proves the deployment chain works and establishes every shared file (CSS, nav, HTML shell) that later phases copy from.

The stack is already decided: plain HTML/CSS/JS, no frameworks, GitHub Pages branch deploy from root. Phase 1's job is to get the critical setup decisions right before any content is written — because repository name, `.nojekyll`, URL path conventions, and file-naming discipline cannot be retrofitted after five pages of content exist. One open structural question from prior research (flat HTML files vs. subdirectory convention) is resolved below in favor of flat files at root. This matches the STACK.md recommendation and eliminates path complexity at this phase.

Security scope is minimal: this phase produces only static HTML/CSS/JS with no user input, no authentication, and no data persistence. The only applicable security concern is the integrity of external resources — this site has none (no CDN, no Google Fonts, no third-party scripts). ASVS V5 input validation and V6 cryptography are not applicable; the site is a read-only document.

**Primary recommendation:** Build the infrastructure files first (`.nojekyll`, `style.css`, `components/nav.html`, `assets/js/nav.js`), then the page shell (`index.html`) using those shared files, confirm the full stack works locally with `python3 -m http.server`, then push to GitHub and verify the live URL before declaring the phase complete.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Repository is named `username.github.io` for correct GitHub Pages URL resolution | Confirmed: GitHub Pages user site requires exact repo name match. See Pitfall 1 in PITFALLS.md. Cannot be fixed post-deploy without breaking all links. |
| FOUND-02 | `.nojekyll` file exists at repo root to prevent Jekyll processing of assets | Confirmed: GitHub Pages runs Jekyll by default. `.nojekyll` at root disables it. Must be committed before any push or assets may be silently excluded. |
| FOUND-03 | Shared navigation is present and working across all five pages | Research recommends fetch-inject pattern (single `components/nav.html` source, 15-line `assets/js/nav.js` loader). Phase 1 builds the nav infrastructure; stub pages for Research/Projects/Writing/CV deliver the five-link nav requirement. |
| FOUND-04 | Layout is mobile-responsive and readable on phones and tablets | Requires `<meta name="viewport">` in every page `<head>`, and CSS `max-width` + `padding-inline` on the content wrapper. Single-breakpoint media query for nav stacking is sufficient. |
| HOME-01 | Visitor sees name, professional role/title, and bio paragraph immediately on landing | Name in `<h1>`, role/title in a subtitle element, bio in `<p>` — all above the fold. Content must be real, not placeholder. |
| HOME-02 | Email address is visible and clickable (mailto link, not a contact form) | Plain `<a href="mailto:email@example.com">` link in the home page body. No JavaScript required. |
| HOME-03 | Navigation links to all five sections are present and functional on every page | The `components/nav.html` partial lists all five links. The `nav.js` loader injects it into every page. Stub pages for Research/Projects/Writing/CV satisfy the "functional" requirement by existing and loading without error. |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page delivery | CDN / Static (GitHub Pages) | — | GitHub Pages serves static files directly from the repo root over HTTPS; no server logic |
| Shared navigation | Browser / Client (JS fetch + inject) | HTML partial (`components/nav.html`) | `nav.js` fetches the nav partial at runtime; the partial is the single source of truth |
| Visual styling | CDN / Static (style.css) | — | Single stylesheet served as a static file; no server-side rendering |
| Home page content | CDN / Static (index.html) | — | Static HTML file; content is hard-coded, not dynamic |
| Mobile responsiveness | Browser / Client | CSS (style.css) | Viewport meta tag + CSS media queries handle all responsive behavior client-side |
| Active page indicator | Browser / Client (nav.js) | CSS (aria-current styling) | JS sets `aria-current="page"` post-injection; CSS styles the attribute |

---

## Standard Stack

### Core

No npm packages. No build tools. The stack is files.

| File / Technology | Version | Purpose | Why Standard |
|-------------------|---------|---------|--------------|
| HTML5 | — | Page structure | Native browser; no dependency; survives indefinitely |
| CSS3 with custom properties | — | All styling via single `style.css` | CSS custom properties (`:root` variables) enable global changes at one edit point [CITED: developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties] |
| Vanilla JS (ES6) | — | `nav.js` fetch-inject loader (~15 lines) | Native Fetch API; no library; universal browser support [CITED: developer.mozilla.org/en-US/docs/Web/API/Fetch_API] |
| GitHub Pages (branch deploy) | — | Static file hosting from repo root | Zero-config user site at `username.github.io`; HTTPS automatic [CITED: docs.github.com/en/pages] |
| Josh Comeau CSS reset (2025) | March 2025 | Modern cross-browser baseline | Addresses real 2025 problems; avoids IE-era cruft of normalize.css [CITED: joshwcomeau.com/css/custom-css-reset/] |

### Supporting

| Technology | Purpose | When to Use |
|------------|---------|-------------|
| `python3 -m http.server` | Local development server | Required for testing fetch-inject nav locally; `file://` protocol blocks cross-origin fetch |
| VS Code Live Server extension | Alternative local server | Same purpose as above — either works; choose based on editor |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Fetch-inject nav | Duplicated nav HTML in each file | Duplication is simpler for 5 pages but creates maintenance trap at first nav change; fetch-inject is correct architecture for this scope |
| Fetch-inject nav | Web Components (Custom Elements) | Web Components bury nav markup inside JS string; harder to read/edit; fetch-inject keeps nav as plain HTML |
| Flat HTML files at root | Subdirectory convention (`research/index.html`) | Subdirectories give cleaner URLs (`/research/` vs `/research.html`) but add path complexity with no benefit at 5 pages; flat files are the STACK.md recommendation |
| System font stack | Self-hosted web font | Self-hosting is correct if a specific web font is required; system fonts eliminate GDPR risk and all network requests |

**Installation:** None. No npm. No pip. No package manager.

---

## Package Legitimacy Audit

Not applicable. This phase installs zero external packages. The stack is plain files with no npm, pip, or other package manager dependencies.

---

## Architecture Patterns

### System Architecture Diagram

```
Browser (visitor)
    │
    ├─► GET username.github.io/
    │       GitHub Pages CDN returns index.html
    │           │
    │           ├─► GET /assets/css/style.css  (browser parses link tag)
    │           │       GitHub Pages returns style.css
    │           │       Cached after first visit
    │           │
    │           └─► GET /assets/js/nav.js  (browser executes script tag)
    │                   nav.js runs:
    │                       └─► fetch('/components/nav.html')
    │                               GitHub Pages returns nav.html partial
    │                               nav.js injects HTML into #site-nav div
    │                               nav.js sets aria-current="page" on matching link
    │
    └─► GET username.github.io/research.html  (stub page — same flow)
    └─► GET username.github.io/projects.html  (stub page — same flow)
    └─► GET username.github.io/writing.html   (stub page — same flow)
    └─► GET username.github.io/cv.html        (stub page — same flow)

All resources: static files on GitHub Pages CDN.
No server logic. No database. No API. No build step.
```

### Recommended Project Structure

```
/ (repo root — this IS the site)
├── index.html              # Home page (full content)
├── research.html           # Stub: "Research — coming soon" with nav
├── projects.html           # Stub: "Projects — coming soon" with nav
├── writing.html            # Stub: "Writing — coming soon" with nav
├── cv.html                 # Stub: "CV — coming soon" with nav
├── 404.html                # Custom 404 with nav
├── .nojekyll               # Empty file — disables Jekyll (REQUIRED)
│
├── assets/
│   ├── css/
│   │   └── style.css       # Single stylesheet for entire site
│   └── js/
│       └── nav.js          # Fetch-inject nav loader
│
└── components/
    └── nav.html            # Nav markup only — no html/head/body tags
```

**Decision: flat HTML files at root.** This resolves the open question from STACK.md. Reasons:
1. STACK.md recommends flat files as "simpler" for a 5-page site
2. Root-relative paths (`/assets/css/style.css`) work identically whether pages are at root or in subdirectories, so the path strategy does not change
3. Subdirectory convention (`/research/`) offers cleaner URLs but costs a directory per page and one extra redirect hop
4. At five pages, the maintenance difference is zero; the simplicity difference favors flat

### Pattern 1: HTML Page Shell

Every page (including stubs) uses this exact shell. Build it once in `index.html`, copy for stubs.

```html
<!-- Source: ARCHITECTURE.md, verified against MDN HTML structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Researcher Name</title>
  <meta name="description" content="One-sentence description including researcher name.">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <div id="site-nav"></div>

  <main class="content">
    <!-- page-specific content here -->
  </main>

  <script src="/assets/js/nav.js"></script>
</body>
</html>
```

Key decisions baked into this shell:
- `lang="en"` on `<html>` — required for accessibility screen readers [CITED: developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang]
- Viewport meta — required for mobile rendering (prevents FOUND-04 failure)
- Root-relative paths (`/assets/...`) — work correctly because repo is named `username.github.io` and served from root
- `<script>` at end of body — nav.js runs after DOM is parsed; the `#site-nav` div exists when the script executes
- No `defer` or `async` needed — script is at end of body already

### Pattern 2: Shared Navigation Partial

`components/nav.html` — raw markup only, no html/head/body:

```html
<!-- Source: ARCHITECTURE.md -->
<nav class="site-nav" aria-label="Main navigation">
  <a href="/index.html" class="nav-name">Researcher Name</a>
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/research.html">Research</a></li>
    <li><a href="/projects.html">Projects</a></li>
    <li><a href="/writing.html">Writing</a></li>
    <li><a href="/cv.html">CV</a></li>
  </ul>
</nav>
```

Note: `aria-label="Main navigation"` is added here for accessibility — improves screen reader landmark navigation without requiring ARIA roles on the container.

### Pattern 3: Nav Fetch-Inject Loader

`assets/js/nav.js`:

```javascript
// Source: ARCHITECTURE.md
(function () {
  var placeholder = document.getElementById('site-nav');
  if (!placeholder) return;

  fetch('/components/nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      placeholder.innerHTML = html;

      // Mark current page link as active
      var links = placeholder.querySelectorAll('a');
      links.forEach(function (link) {
        if (link.href === window.location.href) {
          link.setAttribute('aria-current', 'page');
        }
      });
    });
}());
```

**Local development requirement:** This script uses `fetch()`, which browsers block on `file://` protocol. Developers MUST use a local HTTP server to test nav locally:
```bash
# From repo root:
python3 -m http.server 8000
# Then open http://localhost:8000 in browser
```

### Pattern 4: CSS File Structure

`assets/css/style.css` section order:

```css
/* Source: ARCHITECTURE.md + STACK.md */

/* ============================================
   1. DESIGN TOKENS (custom properties)
   ============================================ */
:root {
  /* Colors */
  --color-bg:           #fafafa;
  --color-surface:      #ffffff;
  --color-text:         #1a1a1a;
  --color-text-muted:   #555555;
  --color-border:       #e0e0e0;
  --color-accent:       #1a56a0;   /* WCAG AA compliant on white */
  --color-accent-visited: #6b3fa0;

  /* Fonts */
  --font-body: Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;
  --font-ui:   system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  /* Type scale */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  2rem;

  /* Line heights */
  --leading-tight:  1.2;
  --leading-normal: 1.5;
  --leading-loose:  1.7;

  /* Layout */
  --max-width:      680px;
  --padding-inline: 1.5rem;
  --spacing-base:   1.5rem;
}

/* ============================================
   2. RESET (Josh Comeau 2025)
   ============================================ */
/* ... reset rules ... */

/* ============================================
   3. BASE TYPOGRAPHY
   ============================================ */
/* body, p, h1-h6, a, etc. */

/* ============================================
   4. LAYOUT
   ============================================ */
/* body structure, .content wrapper */

/* ============================================
   5. NAVIGATION
   ============================================ */
/* .site-nav, .nav-name, ul, li, a, aria-current */

/* ============================================
   6. HOME PAGE
   ============================================ */
/* .hero, name, bio, email */

/* ============================================
   7. RESPONSIVE
   ============================================ */
/* @media (max-width: 600px) */

/* ============================================
   8. UTILITIES
   ============================================ */
```

### Pattern 5: Home Page Content Structure

`index.html` main content — this is the only page with real content in Phase 1:

```html
<!-- Source: HOME-01, HOME-02, HOME-03 requirements -->
<main class="content">
  <section class="home-hero">
    <h1>Researcher Full Name</h1>
    <p class="subtitle">Role/Title — Institution or Affiliation</p>
    <p class="bio">
      [2-4 sentence bio in active voice. Written for a PI who has 20 seconds.
      First sentence: research area. Second: approach or background.
      Third: what you are looking for.]
    </p>
    <p class="contact">
      <a href="mailto:email@example.com">email@example.com</a>
    </p>
  </section>

  <nav class="home-links" aria-label="Site sections">
    <ul>
      <li><a href="/research.html">Research</a></li>
      <li><a href="/projects.html">Projects</a></li>
      <li><a href="/writing.html">Writing</a></li>
      <li><a href="/cv.html">CV</a></li>
    </ul>
  </nav>
</main>
```

Note: The section link list (`home-links`) satisfies HOME-03 independently of the shared nav. The shared nav in the header also satisfies HOME-03. Both together create redundant paths to all sections — this is correct for a document-like page where a PI should be able to navigate from anywhere.

### Anti-Patterns to Avoid

- **Relative paths in asset hrefs:** `href="../assets/css/style.css"` breaks when served from root. Use root-relative: `href="/assets/css/style.css"`. [VERIFIED via PITFALLS.md Pitfall 13]
- **Opening HTML files via file:// during development:** Nav injection silently fails. Always use `python3 -m http.server` or a local server.
- **Creating `_config.yml`:** Signals Jekyll to run, which contradicts `.nojekyll`. Leave it out. [CITED: STACK.md]
- **Using `_assets/` or any underscore prefix:** Jekyll silently excludes these even without `_config.yml` in some edge cases. Use `assets/` (no leading underscore). [CITED: PITFALLS.md Pitfall 3]
- **Named variation in filenames:** `Research.html` vs `research.html` — Linux (GitHub Pages) is case-sensitive. All files must be lowercase. [CITED: PITFALLS.md Pitfall 2]
- **Committing `style.css?v=2` cache-bust strings to HTML:** Only use this in the browser URL bar for debugging, never in committed HTML. Version query strings belong in a cache-busting strategy, not hardcoded.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS baseline normalization | Custom browser quirk fixes | Josh Comeau 2025 reset (copy into style.css) | Addresses real cross-browser problems; maintained; 10 rules vs. researching dozens of quirks |
| Font selection | Custom web font with @font-face | System font stack (Charter/Cambria) | Zero network requests, zero FOUT, GDPR-safe, academic aesthetic [CITED: STACK.md] |
| Active nav state | Per-page hard-coded CSS class | `aria-current="page"` set by nav.js | nav.js sets it automatically after injection; CSS targets `[aria-current="page"]`; no per-page markup |
| WCAG-compliant link colors | Eyeball a color | Use `#1a56a0` from design tokens | Already verified WCAG AA compliant against white backgrounds [CITED: STACK.md] |

**Key insight:** The entire "don't hand-roll" category for this phase is the reset and the font choice. Everything else is HTML structure that IS the hand-written work.

---

## Common Pitfalls

### Pitfall 1: Wrong Repository Name Breaks Everything

**What goes wrong:** GitHub Pages user sites only deploy at `username.github.io` when the repo name matches exactly. A repo named `research-website` or with the wrong username deploys at `username.github.io/research-website/`, making all root-relative paths (`/assets/css/style.css`) resolve incorrectly.

**Why it happens:** Easy to create a repo without verifying the exact GitHub username first.

**How to avoid:** Before creating the repo, open `github.com/[your-username]` and confirm the exact username including capitalization. Repo name must be all lowercase matching the lowercase username.

**Warning signs:** Site loads at a nested URL instead of the bare domain. Navigation links produce 404s.

**Source:** [CITED: PITFALLS.md Pitfall 1, GitHub Docs]

---

### Pitfall 2: Missing `.nojekyll` — Assets Silently Vanish

**What goes wrong:** GitHub Pages runs Jekyll by default. Without `.nojekyll`, files in directories starting with underscores are excluded from the published output. More critically: even without underscore directories, Jekyll can interfere with asset serving.

**Why it happens:** `.nojekyll` is easy to forget — it is an empty, hidden file with no visible effect locally.

**How to avoid:** Create `.nojekyll` as the very first file committed to the repo root. It must be committed (not just created) and must be exactly lowercase `.nojekyll`.

**Warning signs:** Assets load locally, 404 on live site. Source tab in DevTools shows 404 for CSS or JS.

**Source:** [CITED: PITFALLS.md Pitfall 3, GitHub Blog]

---

### Pitfall 3: Nav Fetch Silently Fails Locally

**What goes wrong:** Developer opens `index.html` directly in the browser (`file://` protocol). The nav script's `fetch('/components/nav.html')` call is blocked by the browser's same-origin policy on `file://`. Nav does not appear. Developer thinks nav is broken and wastes time debugging JS.

**Why it happens:** The fetch-inject pattern requires HTTP(S). File protocol does not support it.

**How to avoid:** Always test via `python3 -m http.server 8000` from the repo root. Document this in a project note or README.

**Warning signs:** Nav disappears or console shows a CORS/network error when opening HTML file directly.

**Source:** [CITED: ARCHITECTURE.md, MDN Fetch API]

---

### Pitfall 4: Case-Sensitive Filenames — Works on Mac, 404s on GitHub Pages

**What goes wrong:** macOS filesystem is case-insensitive. `Style.css` and `style.css` are the same file locally. On GitHub Pages (Linux), they are different — a link to `/assets/css/style.css` will 404 if the file is `Style.css`.

**How to avoid:** Establish the all-lowercase naming rule before creating any file. File naming convention: all lowercase, hyphens for spaces. No exceptions.

**Warning signs:** Local site works; specific pages or assets 404 on live site.

**Source:** [CITED: PITFALLS.md Pitfall 2]

---

### Pitfall 5: Bio Written in Academic Register

**What goes wrong:** The home page bio passes the technical HOME-01 requirement (name + bio present) but fails the actual purpose. Passive voice, jargon, and abstract framing make the page useless for a PI trying to quickly assess the researcher.

**How to avoid:** Write the bio before building the page. Test it by reading aloud — if it sounds like a grant abstract, rewrite it. Have a non-researcher read it and summarize what the researcher does. If they cannot, rewrite.

**Warning signs:** Bio contains phrases like "investigations were conducted," "research interests include," or "the candidate has experience with."

**Source:** [CITED: PITFALLS.md Pitfall 9]

---

## Code Examples

### Complete `.nojekyll` File

```
(empty file — zero bytes, filename is the entire content)
```

```bash
# Create it:
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll to disable Jekyll processing"
```

### Josh Comeau 2025 CSS Reset (copy verbatim into style.css)

```css
/* Source: https://www.joshwcomeau.com/css/custom-css-reset/ (March 2025) */

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}

h1, h2, h3 {
  text-wrap: balance;
}
```

### Content Wrapper (applies max-width + centering to all pages)

```css
/* Source: STACK.md layout section */
.content {
  max-width: var(--max-width);   /* 680px */
  width: 100%;
  margin-inline: auto;
  padding-inline: var(--padding-inline);  /* 1.5rem */
}
```

### Active Nav State CSS

```css
/* Source: ARCHITECTURE.md */
.site-nav a[aria-current="page"] {
  font-weight: 600;
  border-bottom: 2px solid currentColor;
}
```

### Mobile Responsive Nav Stacking

```css
/* Source: FOUND-04 requirement; single breakpoint is sufficient for this layout */
@media (max-width: 600px) {
  .site-nav ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
```

### GitHub Pages Settings (manual step — not a code file)

```
Repository Settings > Pages:
  Source: Deploy from a branch
  Branch: main (or master)
  Folder: / (root)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| normalize.css | Josh Comeau's modern reset | ~2022-2025 | Normalize carries IE6-IE10 fixes; Comeau's reset targets real modern problems |
| `font-family: Georgia, serif` | System transitional serif stack (Charter/Cambria) | ~2022 with system font stack popularization | Charter on macOS, Cambria on Windows gives better rendering than Georgia at body sizes |
| Inline styles for quick prototyping | CSS custom properties at `:root` | 2019+ (broad browser support) | Custom properties make global changes a one-line edit; no downside for any browser in use today |
| `<head>` script tags | `<body>` end script tags (no `defer` needed) | Standard modern practice | Script at body end means DOM exists when script runs; simpler than `defer` attribute |

**Deprecated / outdated:**
- `normalize.css`: Last updated 2018; carries IE6–IE10 legacy. Do not install via npm. Copy modern reset rules directly instead.
- `_config.yml` for GitHub Pages: Only needed for Jekyll. This project bypasses Jekyll with `.nojekyll`. Creating `_config.yml` reintroduces Jekyll processing. Never create it.
- Google Fonts CDN: GDPR risk (IP transfer to Google), FOUT risk, network dependency. System fonts eliminate all three issues.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | GitHub username is known and the exact name `[username].github.io` repo does not yet exist | FOUND-01 requirement | If repo name is taken or username differs from expectation, must rename and re-verify all live URLs |
| A2 | Researcher has a bio, name, role/title, and email address ready to write into `index.html` | HOME-01, HOME-02 | Without content, the home page is a skeleton with placeholder text — Phase 1 success criteria require real content visible above the fold |
| A3 | Researcher has a `main` or `master` branch (default branch name) — no exotic branch naming | GitHub Pages config | If default branch is named differently, Pages source must be set to the correct branch name |

**If this table is empty:** All claims in this research were verified or cited — no user confirmation needed.

The most important assumption is A2 — the researcher must have written bio content before Phase 1 can close, because HOME-01 requires the name, role, and bio to be visible (not placeholder text) at the live URL.

---

## Open Questions

1. **Exact GitHub username**
   - What we know: Repo must be named `[username].github.io` exactly
   - What's unclear: The exact GitHub username has not been confirmed in planning documents; STATE.md flags this as a Phase 1 prereq
   - Recommendation: Confirm before creating the repo — check `github.com/[username]` in a browser

2. **Researcher's name, role, email, and bio content**
   - What we know: HOME-01 and HOME-02 require these to be live at the URL, not placeholder
   - What's unclear: Whether the researcher has written this content yet
   - Recommendation: Write bio content before the HTML page — content first, structure second

3. **Nav pattern final confirmation: fetch-inject vs. duplicated HTML**
   - What we know: ARCHITECTURE.md recommends fetch-inject; STACK.md recommends duplication as simpler for 5 pages; both documents are in tension
   - What's unclear: Which pattern the researcher prefers maintaining
   - Recommendation: Fetch-inject is the recommended choice for this RESEARCH.md because it avoids the copy-paste maintenance trap (PITFALLS.md Pitfall 5). However, the planner should note that both approaches are valid — if the researcher prefers to avoid JavaScript entirely, duplication is a legitimate choice.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `git` | All file commits, GitHub Pages deploy | Confirmed available (repo is a git repo per context) | — | — |
| `python3 -m http.server` | Local development server for fetch-inject nav testing | Confirmed available | Python 3.12.2 | VS Code Live Server extension |
| GitHub account with Pages enabled | FOUND-01, hosting | Assumed (project premise) | — | None — required |
| GitHub repository named `[username].github.io` | FOUND-01 | Not yet created (first phase) | — | None — must be created |
| Node.js | Not required | Available (v24.13.1) | — | N/A — not used |

**Missing dependencies with no fallback:**
- GitHub repository correctly named `[username].github.io` — must be created as Phase 1 first step

**Missing dependencies with fallback:**
- `python3 -m http.server` — if unavailable, VS Code Live Server or any static file server works

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — manual browser verification (plain HTML/CSS/JS site has no test framework) |
| Config file | None |
| Quick run command | Open `http://localhost:8000` in browser after `python3 -m http.server 8000` |
| Full suite command | Manual checklist: verify all 5 nav links, mobile layout, HTTPS on live URL |

Plain HTML/CSS/JS sites have no automated test framework applicable. Validation is browser-based manual testing plus deployment verification. `nyquist_validation: true` applies here as a checklist, not automated runner.

### Phase Requirements to Verification Map

| Req ID | Behavior | Test Type | Verification Method | Automatable |
|--------|----------|-----------|---------------------|-------------|
| FOUND-01 | Repo named `[username].github.io` | smoke | Visit `[username].github.io` in browser — page loads (not 404) | No — requires live GitHub Pages |
| FOUND-02 | `.nojekyll` exists at repo root | smoke | `ls -la .nojekyll` — file exists; check GitHub Pages source tab — CSS/JS loads without 404 | Partial (file check is automated; live behavior is manual) |
| FOUND-03 | Shared nav present on all 5 pages | manual | Open each of 5 pages in browser — nav renders with all 5 links | No — visual browser check |
| FOUND-04 | Mobile responsive layout | manual | Browser DevTools — toggle device toolbar, iPhone SE width — no horizontal scroll, text readable | No — visual check |
| HOME-01 | Name + role + bio visible without scroll | manual | Open live URL — name in `<h1>`, role/title, bio paragraph all visible above fold | No — visual check |
| HOME-02 | Email visible as mailto link | manual | Click email link on live home page — mail client opens with correct address | No — functional click test |
| HOME-03 | Nav links to all 5 sections present | manual | Click each nav link on home page — each stub page loads without 404 | No — click-through test |

### Wave 0 Gaps

No existing test infrastructure. All verification is manual browser testing at deployment. No Wave 0 setup required (no test files to create). The "test suite" for this phase is the success criteria checklist in ROADMAP.md:

- [ ] `[username].github.io` loads home page without 404
- [ ] All 5 nav links present and functional on every page (including stubs)
- [ ] HTTPS confirmed (browser padlock, no mixed content warnings)
- [ ] Mobile rendering verified (DevTools responsive mode, no horizontal scroll)
- [ ] Name, role, bio, email visible above fold on home page
- [ ] Email mailto link opens mail client

---

## Security Domain

### Applicable ASVS Categories (ASVS Level 1)

| ASVS Category | Applies | Rationale |
|---------------|---------|-----------|
| V2 Authentication | No | No user login, no authentication of any kind |
| V3 Session Management | No | No sessions — read-only static site |
| V4 Access Control | No | All content is public; no access control |
| V5 Input Validation | No | No user input — static HTML only; the email `mailto:` link is client-side, no form submission |
| V6 Cryptography | No | No cryptographic operations |
| V7 Error Handling | Partial | Custom `404.html` prevents default GitHub 404 page — low risk, addressed by including a custom 404 |
| V8 Data Protection | No | No PII collected or stored — email address is displayed, not collected |
| V9 Communications | Partial | HTTPS is provided automatically by GitHub Pages — no configuration required; confirm after deploy |
| V14 Configuration | Partial | `.nojekyll` prevents Jekyll from processing files; no server-side configuration exposure |

**Security summary for this phase:** The attack surface is effectively zero. The site is a read-only document. The one configuration action that matters for security is ensuring the repo is public (correct for GitHub Pages user sites) and that no sensitive files (API keys, `.env` files) are ever committed to the repo.

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Sensitive file in repo (e.g., `.env`, API keys) | Information Disclosure | Do not commit any secrets; `.gitignore` is not enough — never create credential files in this repo |
| Outdated contact email visible to scrapers | Privacy | Acceptable for academic sites — email is intentionally public for PI contact |
| Clickjacking (site embedded in iframe) | Tampering | Low risk for read-only site; GitHub Pages does not add X-Frame-Options headers automatically, but academic personal sites are not meaningful clickjacking targets |

---

## Sources

### Primary (HIGH confidence)

- GitHub Pages publishing source docs — https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site — repo naming, branch deploy configuration
- `.nojekyll` explanation — https://github.blog/news-insights/bypassing-jekyll-on-github-pages/ — why and how .nojekyll disables Jekyll
- GitHub Pages 404 troubleshooting — https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites — case sensitivity, path resolution
- MDN Fetch API — https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch — file:// limitation for fetch-inject pattern
- Josh W. Comeau CSS reset (March 2025) — https://www.joshwcomeau.com/css/custom-css-reset/ — modern reset rules
- MDN CSS Custom Properties — https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties — design token pattern
- MDN Web Components — https://developer.mozilla.org/en-US/docs/Web/API/Web_components — why Web Components are overkill vs. fetch-inject

### Secondary (MEDIUM confidence)

- .planning/research/STACK.md — project-specific stack research; synthesizes all primary sources above
- .planning/research/ARCHITECTURE.md — project-specific architecture patterns; fetch-inject implementation, CSS section order
- .planning/research/PITFALLS.md — 16 documented pitfalls for this domain; verified against multiple authoritative sources

### Tertiary (LOW confidence)

- None — all claims are either PRIMARY or synthesized from project research documents that cite authoritative sources.

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | Plain HTML/CSS/JS stack verified against official docs; no npm dependencies to verify |
| Architecture | HIGH | Fetch-inject pattern verified against MDN Fetch API; GitHub Pages file structure from official docs; pattern confirmed in ARCHITECTURE.md |
| Pitfalls | HIGH | All critical pitfalls confirmed in GitHub official docs and cross-referenced against project PITFALLS.md |
| Security | HIGH | ASVS L1 categories evaluated; attack surface is effectively zero for a read-only static site |

**Research date:** 2026-05-25
**Valid until:** Stable — GitHub Pages behavior, HTML/CSS fundamentals, and the system font stack are not fast-moving. Re-validate only if GitHub changes Pages publishing behavior or a significant browser compatibility event occurs.
