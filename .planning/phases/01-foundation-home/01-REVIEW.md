---
phase: 01-foundation-home
reviewed: 2026-05-25T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - assets/css/style.css
  - components/nav.html
  - assets/js/nav.js
  - index.html
  - research.html
  - projects.html
  - writing.html
  - cv.html
  - 404.html
  - .nojekyll
findings:
  critical: 3
  warning: 3
  info: 4
  total: 10
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-25
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

All ten files for the foundation phase were reviewed. The HTML skeleton, CSS design system, and JS nav-injection pattern are structurally sound and follow the project constraints (plain HTML/CSS/JS, no frameworks, no build step). However, three blockers prevent this from being a shippable site: the nav active-state logic fails silently for the home page on GitHub Pages, a rejected fetch has no error handler, and placeholder template tokens remain in titles/meta/body across every page. Three quality warnings and four informational items round out the findings.

---

## Critical Issues

### CR-01: Active page detection broken for home page on GitHub Pages

**File:** `assets/js/nav.js:13`

**Issue:** `link.href === window.location.href` compares fully-resolved absolute URLs. The nav link for Home uses `href="/index.html"`, which the browser resolves to `https://username.github.io/index.html`. But when a visitor lands on the GitHub Pages root, `window.location.href` is `https://username.github.io/` (no `index.html`). The two strings are never equal, so `aria-current="page"` is never set on the Home link and the active-underline style never appears on the home page. The other four pages (`/research.html`, `/projects.html`, `/writing.html`, `/cv.html`) are unaffected because their resolved hrefs do match.

**Fix:**
```js
links.forEach(function (link) {
  var linkPath = new URL(link.href).pathname;
  var currentPath = window.location.pathname;

  // Treat "/" and "/index.html" as equivalent
  var normalise = function (p) {
    return p === '/' ? '/index.html' : p;
  };

  if (normalise(linkPath) === normalise(currentPath)) {
    link.setAttribute('aria-current', 'page');
  }
});
```

---

### CR-02: Unhandled fetch rejection in nav.js silently breaks navigation

**File:** `assets/js/nav.js:5-17`

**Issue:** The `fetch('/components/nav.html')` promise chain has no `.catch()` handler. If the request fails for any reason — network error, wrong deployment path, 404 — the rejection is silently swallowed in all browsers that log unhandled promise rejections. More importantly, the `#site-nav` placeholder remains empty, leaving visitors with no navigation on every page of the site. There is no fallback. This is a complete navigation failure on every page when the fetch misses.

**Fix:**
```js
fetch('/components/nav.html')
  .then(function (res) {
    if (!res.ok) {
      throw new Error('Nav fetch failed: ' + res.status);
    }
    return res.text();
  })
  .then(function (html) {
    placeholder.innerHTML = html;
    // ... active-link logic ...
  })
  .catch(function () {
    // Degrade to inline nav so the site remains navigable
    placeholder.innerHTML =
      '<nav class="site-nav" aria-label="Main navigation">' +
      '<a href="/index.html" class="nav-name">Emilio</a>' +
      '<ul>' +
      '<li><a href="/index.html">Home</a></li>' +
      '<li><a href="/research.html">Research</a></li>' +
      '<li><a href="/projects.html">Projects</a></li>' +
      '<li><a href="/writing.html">Writing</a></li>' +
      '<li><a href="/cv.html">CV</a></li>' +
      '</ul></nav>';
  });
```

Alternatively, duplicate the nav HTML statically in each page (the approach the CLAUDE.md stack notes already endorses for simplicity) and remove the JS fetch pattern entirely.

---

### CR-03: Placeholder template tokens ship in titles, meta descriptions, and body copy

**Files:** `index.html:6-7,15-21,24`, `research.html:6-7`, `projects.html:6-7`, `writing.html:6-7`, `cv.html:6-7`, `404.html:6-7`

**Issue:** Every page contains unfilled template tokens such as `[Surname]`, `[Institution]`, `[field]`, `[research area]`, `[specific question or phenomenon]`, `[method or approach]`, and `email@example.com`. These tokens appear in:
- `<title>` tags (shown in browser tabs, search engine results)
- `<meta name="description">` (shown in search snippets)
- Visible body copy on `index.html`
- The mailto link on `index.html`

Publishing to GitHub Pages with these tokens live means a PI visiting the site sees `[Surname]` in the browser tab and bracketed placeholders throughout the bio. This directly undermines the "core value" goal of the project.

**Fix:** Fill in all `[...]` tokens with real content before the site goes live. At minimum, `index.html` requires: name, institution, field, research area, and a real email address. Each page title and meta description must also be updated to reflect real identifying information.

---

## Warnings

### WR-01: fetch() call in nav.js does not verify HTTP status before using response body

**File:** `assets/js/nav.js:5-6`

**Issue:** `res.text()` is called unconditionally regardless of `res.ok`. If GitHub Pages serves a 404 for `/components/nav.html` (e.g., wrong path or missing file), `fetch` resolves (not rejects) with a non-OK response. The code then calls `.innerHTML` on whatever the 404 error page HTML contains — likely a GitHub 404 page — injecting it into the nav placeholder. This is also covered by the fix in CR-02, but the missing `res.ok` check is worth calling out independently as a pattern error.

**Fix:** Add `if (!res.ok) throw new Error(res.status)` before `return res.text()` (shown in CR-02 fix).

---

### WR-02: nav.js uses innerHTML with network-fetched content

**File:** `assets/js/nav.js:8`

**Issue:** `placeholder.innerHTML = html` assigns HTML fetched from the server directly into the DOM. While the fetch is same-origin (`/components/nav.html`) which prevents attacker-controlled input in normal operation, this pattern is a latent XSS vector: if the deployment pipeline is ever compromised, or if a path-traversal bug causes a different file to be served, unsanitised HTML executes script in the user's browser. It also breaks if `nav.html` is served with unexpected encoding.

For a static site with no user input this is low-probability, but the pattern should be noted. The architectural alternative (duplicate nav HTML statically in each page — already endorsed in CLAUDE.md) eliminates this class of risk entirely.

**Fix (preferred):** Remove `nav.js` and the `#site-nav` placeholder. Paste the `<nav>` block from `components/nav.html` directly into each HTML file. Five pages, eleven lines each — a one-time copy that eliminates the fetch, the innerHTML, and the active-state bug simultaneously.

---

### WR-03: CSS rule `.home-links { list-style: none; }` targets the wrong element

**File:** `assets/css/style.css:193-196`

**Issue:** `.home-links` in the HTML is a `<nav>` element (see `index.html:28`). `list-style` is only meaningful on `<ul>`, `<ol>`, or `<li>` elements; applying it to a `<nav>` has no effect. The intent was clearly to reset the bullet on the inner `<ul>`, which is separately (and correctly) handled by `.home-links ul { list-style: none; ... }` at line 198. The rule at line 195 is dead and misleading.

```css
/* Current — dead rule */
.home-links {
  margin-top: calc(var(--spacing-base) * 2);
  list-style: none;   /* <-- has no effect on <nav> */
}
```

**Fix:** Remove `list-style: none` from `.home-links` — the margin rule on lines 193-196 should stay, just remove the list-style property from it.

---

## Info

### IN-01: body rule block is split across three separate declarations

**File:** `assets/css/style.css:51-54, 80-86, 113-115`

**Issue:** Properties for `body` are spread across three separate rule blocks — the reset block (lines 51-54), the base typography block (lines 80-86), and the layout block (lines 113-115). While the browser merges these correctly, it makes it harder to audit the complete set of body styles in one place and creates the appearance that `min-height: 100vh` is distinct from the typography declarations.

**Fix:** Consolidate all `body` declarations into the single base typography block (section 3), or at minimum add a comment linking the blocks. The reset block intentionally separates `line-height: 1.5` — that can stay as it mirrors the Comeau reset source — but the section 4 `min-height` belongs logically alongside `background-color` and `color`.

---

### IN-02: .nojekyll is an empty file — correct, but worth documenting

**File:** `.nojekyll`

**Issue:** The file exists and is correctly empty (0 bytes). GitHub Pages only requires its presence, not any content. This is correct. However, because the project has no README and no comments, a future maintainer might wonder whether the file is accidentally empty or intentionally so. Consider adding a one-line comment in `CLAUDE.md` explaining the file's purpose, since `.nojekyll` cannot contain comments itself.

**Fix:** Add a note to `CLAUDE.md` (already references this file): "`.nojekyll` — intentionally empty file that tells GitHub Pages to skip Jekyll processing."

---

### IN-03: Hardcoded gap values in nav and home-links are not using design tokens

**File:** `assets/css/style.css:142, 202`

**Issue:** Both `.site-nav ul { gap: 1.5rem; }` (line 142) and `.home-links ul { gap: 1.5rem; }` (line 202) hard-code `1.5rem` instead of `var(--spacing-base)`. The design token `--spacing-base: 1.5rem` exists for exactly this purpose. If the base spacing changes, these two values will silently diverge.

**Fix:**
```css
.site-nav ul {
  gap: var(--spacing-base);
}

.home-links ul {
  gap: var(--spacing-base);
}
```

---

### IN-04: nav.html uses `/index.html` links — inconsistent with GitHub Pages canonical URL

**File:** `components/nav.html:2,4`

**Issue:** The name link and the Home list item both point to `/index.html`. GitHub Pages canonically serves the home page at `/` (no filename). Linking explicitly to `/index.html` works but produces a URL with `index.html` in the address bar after clicking, while direct visitors see `/`. This inconsistency makes the active-state comparison in `nav.js` harder (it contributes directly to CR-01) and may produce duplicate-URL signals in search engine indexing.

**Fix:** Change both nav links from `/index.html` to `/`:
```html
<a href="/" class="nav-name">Emilio</a>
<ul>
  <li><a href="/">Home</a></li>
  ...
```
And update `index.html`'s home-links section similarly. The normalisation logic in the CR-01 fix also addresses this, but changing the href to `/` is the cleaner root fix.

---

_Reviewed: 2026-05-25_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
