# Architecture Patterns

**Domain:** Personal academic research website (plain HTML/CSS/JS, GitHub Pages)
**Researched:** 2026-05-25
**Confidence:** HIGH — patterns are well-established, low ambiguity for this scope

---

## Recommended Architecture

A flat-file static site with a single CSS stylesheet, five HTML pages at the root, and a minimal JavaScript include pattern for shared navigation. No build tool, no template engine, no framework.

### Directory Structure

```
research-website/
├── index.html              # Home
├── research.html           # Research interests + past work
├── projects.html           # Non-academic projects
├── writing.html            # Writing placeholder + future posts
├── cv.html                 # CV page with PDF download link
│
├── assets/
│   ├── css/
│   │   └── style.css       # Single stylesheet for the entire site
│   ├── js/
│   │   └── nav.js          # Navigation inject script (see below)
│   └── files/
│       └── cv.pdf          # The actual CV PDF
│
├── components/
│   └── nav.html            # Shared navigation markup (no html/head/body tags)
│
└── README.md
```

**Rationale for this layout:**

- HTML files at root: GitHub Pages serves `index.html` from root automatically; other pages at `yourname.github.io/research.html` etc. are clean and predictable.
- `assets/` subdirectory: Keeps the root uncluttered; standard convention that GitHub Pages docs recommend.
- `components/` at root level: Separate from `assets/` because it is not a browser-served asset — it is a source partial. Keeping it distinct avoids confusion.
- Single `style.css`: Five-page academic site has no complexity that warrants splitting CSS. One file to edit, one file to cache.

---

## Shared Navigation Pattern

**Decision: Fetch-inject with a `nav.html` partial and one small JS file.**

This is the concrete approach chosen over the alternatives below.

### How It Works

`components/nav.html` contains only the nav markup — no `<html>`, `<head>`, or `<body>` tags:

```html
<nav class="site-nav">
  <a href="/index.html" class="nav-name">Emilio Surname</a>
  <ul>
    <li><a href="/index.html">Home</a></li>
    <li><a href="/research.html">Research</a></li>
    <li><a href="/projects.html">Projects</a></li>
    <li><a href="/writing.html">Writing</a></li>
    <li><a href="/cv.html">CV</a></li>
  </ul>
</nav>
```

`assets/js/nav.js` fetches and injects it:

```javascript
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

Each HTML page gets this shell:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Research — Your Name</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <div id="site-nav"></div>   <!-- nav injected here -->

  <main>
    <!-- page-specific content here -->
  </main>

  <script src="/assets/js/nav.js"></script>
</body>
</html>
```

### Why This Approach (Not The Alternatives)

| Approach | Verdict | Reason |
|----------|---------|--------|
| **Fetch-inject partial** (chosen) | Use | Single source of truth for nav; editable as plain HTML; works on GitHub Pages; no framework |
| Duplicated nav in every file | Avoid | Five pages is the floor, not the ceiling — updating nav in 5+ places is error-prone |
| Web Components (Custom Elements) | Overkill | Requires writing a JS class file; nav markup is buried in JS string; harder to read/edit for non-JS people |
| Server-Side Includes (SSI) | Unavailable | GitHub Pages does not support SSI — static files only |
| `<object>` or `<iframe>` embed | Avoid | Styling bleeds, accessibility problems, outdated pattern |

**The fetch-inject pattern trades one constraint (nav in JS) for a cleaner one: nav lives in a plain HTML file, the JS is a 15-line loader you never need to touch again.**

### Active-Page Indicator

The `nav.js` script sets `aria-current="page"` on the matching link after injection. CSS can style this without JavaScript knowledge:

```css
.site-nav a[aria-current="page"] {
  font-weight: 600;
  border-bottom: 2px solid currentColor;
}
```

### File Protocol Limitation

The fetch approach does NOT work when opening HTML files directly from disk (`file://` protocol) because browsers block cross-origin fetch from `file://`. This is not a problem for GitHub Pages (served over HTTPS) or a local dev server. Developers must run a local server (`python3 -m http.server` or VS Code Live Server) to test navigation locally.

---

## CSS Architecture

**Decision: Single `style.css` file with a logical section order.**

For a five-page academic site, modular CSS (multiple files) adds complexity without benefit. One file is easier to read, easier to edit, and caches as one request.

### Stylesheet Section Order

```css
/* 1. Custom properties (design tokens) */
:root {
  --color-bg: #fafaf8;
  --color-text: #1a1a1a;
  --color-muted: #666;
  --color-accent: #0057b8;
  --font-body: Georgia, 'Times New Roman', serif;
  --font-ui: system-ui, -apple-system, sans-serif;
  --max-width: 680px;
  --spacing-base: 1.5rem;
}

/* 2. Reset / base */
/* 3. Typography */
/* 4. Layout (body, main, page wrapper) */
/* 5. Navigation */
/* 6. Page-specific sections (home, research, writing, etc.) */
/* 7. Utilities */
```

CSS custom properties at the top mean visual changes (color, spacing, typeface) require editing one block, not hunting through the file.

---

## Component Boundaries

| Component | File(s) | Responsibility | Shared Across |
|-----------|---------|----------------|---------------|
| Navigation | `components/nav.html`, `assets/js/nav.js` | Site-wide nav bar | All 5 pages |
| Stylesheet | `assets/css/style.css` | All visual styling | All 5 pages |
| Home | `index.html` | Name, bio, nav links | — |
| Research | `research.html` | Interests section + Work section | — |
| Projects | `projects.html` | Non-academic projects list | — |
| Writing | `writing.html` | Placeholder + future post list | — |
| CV | `cv.html` | Download link for `cv.pdf` | — |
| CV PDF | `assets/files/cv.pdf` | Actual document | Linked from `cv.html` |

---

## Data Flow

```
Browser requests page (e.g., research.html)
  └─> GitHub Pages returns static HTML file
        └─> Browser parses HTML, loads style.css (cached after first visit)
              └─> Browser executes nav.js (deferred, after body)
                    └─> nav.js fetches /components/nav.html
                          └─> Injects nav HTML into #site-nav div
                                └─> Sets aria-current on current page link
```

No server logic. No database. No API. Every resource is a static file.

---

## Suggested Build Order

This order minimizes rework and surfaces decisions early.

### Phase 1 — Shell and Shared Infrastructure

Build first because everything else depends on it.

1. `assets/css/style.css` — establish design tokens, base typography, layout
2. `components/nav.html` — write nav markup once
3. `assets/js/nav.js` — write the fetch-inject loader
4. `index.html` — home page as the template for the shell structure all other pages will copy

**Checkpoint:** Open index.html with a local server. Nav should appear, style should load, no console errors.

### Phase 2 — Remaining Pages

Copy the shell from `index.html` and fill in page-specific content.

5. `cv.html` + `assets/files/cv.pdf`
6. `research.html` — two-section layout (Interests / Work)
7. `projects.html`
8. `writing.html` — placeholder with structural markup that supports a list of posts later

**Dependency:** Pages depend on `style.css` and `nav.js` being stable. Do not add new nav links or change nav markup until the shell is confirmed.

### Phase 3 — Polish

9. `aria-current` styling in CSS
10. Meta tags, `<title>` per page, `<meta name="description">`
11. Favicon
12. Mobile responsiveness pass (single breakpoint is usually enough)
13. Deploy to GitHub Pages, verify all fetch paths resolve correctly over HTTPS

---

## Scalability Considerations

| Concern | At 5 pages (now) | At 10-20 pages (later) |
|---------|------------------|------------------------|
| Navigation updates | Edit `components/nav.html` once | Same — single file, no change |
| Adding a new page | Copy any existing `.html`, change title + content | Same |
| CSS growth | Single file gets long | Add a second file `writing.css` or `research.css` imported at top of `style.css` with `@import` |
| Writing section grows | `writing.html` lists items manually | If posts exceed ~10, consider moving to a subfolder: `writing/post-title.html` |

The architecture scales to ~20 pages without needing a build tool. Beyond that, a static site generator (Eleventy or Hugo) becomes worth the learning cost — but that's a future decision, not a constraint now.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Inline styles or per-page `<style>` blocks

**Why bad:** Changes must be repeated everywhere. Breaks the single-source design intent.
**Instead:** All styles in `style.css`. Use CSS classes.

### Anti-Pattern 2: Absolute file-system paths in `href`

**Why bad:** `href="C:/Users/.../index.html"` or `href="../index.html"` breaks on GitHub Pages.
**Instead:** Use root-relative paths: `href="/index.html"`, `href="/assets/css/style.css"`. GitHub Pages serves from site root.

### Anti-Pattern 3: JavaScript-dependent navigation with no fallback

**Why bad:** If `nav.js` fails (network error, adblocker, slow connection), the nav disappears.
**Mitigation:** Keep nav.js small and fast. For a 5-page academic site, the risk is low — the audience (PIs) are on institutional networks with JS enabled. A hard fallback would require duplicating nav in HTML, which defeats the purpose.

### Anti-Pattern 4: Separate CSS files per page from the start

**Why bad:** Adds complexity before it is earned. With 5 pages, one stylesheet is sufficient and simpler to maintain.
**Instead:** Use `.page-research`, `.page-writing` body classes if page-specific scoping is needed within a single file.

---

## Sources

- [freeCodeCamp — Reusable HTML Components](https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/) — Web Components and fetch-inject patterns (MEDIUM confidence — community article, pattern well-established)
- [GitHub Pages directory and file usage](https://tomcam.github.io/least-github-pages/github-pages-directory-file-usage.html) — GitHub Pages file structure conventions (HIGH confidence — GitHub ecosystem docs)
- [MDN — GitHub Pages overview](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/Using_GitHub_pages) — Static file hosting behavior (HIGH confidence — official MDN)
- [w3tutorials — Shared Header/Footer via Fetch](https://www.w3tutorials.net/blog/make-header-and-footer-files-to-be-included-in-multiple-html-pages/) — Concrete fetch-inject implementation (MEDIUM confidence — tutorial, pattern verified against MDN Fetch API)
- [plain-academic template](https://github.com/mavroudisv/plain-academic) — Real-world academic site architecture reference (MEDIUM confidence — community project)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — Fetch API browser behavior and file:// limitation (HIGH confidence — official spec)
- [DEV Community — SEO and Web Components 2023](https://dev.to/stuffbreaker/seo-and-web-components-2023-edition-3l6i) — Why Web Components are overkill for this use case (MEDIUM confidence — community article)
