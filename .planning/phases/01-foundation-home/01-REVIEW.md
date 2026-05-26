---
phase: 01-foundation-home
reviewed: 2026-05-25T22:30:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - assets/css/style.css
  - assets/js/nav.js
  - components/nav.html
  - index.html
  - research.html
  - projects.html
  - writing.html
  - cv.html
  - 404.html
  - .nojekyll
findings:
  critical: 2
  warning: 4
  info: 4
  total: 10
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-25T22:30:00Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

All ten files were reviewed. The HTML skeleton, CSS design system, and JS nav-injection pattern are structurally sound and follow the project constraints (plain HTML/CSS/JS, no frameworks, no build step). The GitHub Pages repo is confirmed as `emilio-izquierdo.github.io` (serves from `/`), so all absolute-path references (`/assets/css/style.css`, `/components/nav.html`, etc.) are correct. Real content has been filled into `index.html` — no template placeholder tokens remain.

Two critical issues remain. The more serious is that when JavaScript is disabled or the `fetch` call fails, every page except the home page loses all navigation with no fallback — the `#site-nav` div stays empty and the `.catch()` only logs to console. The second critical issue is that `placeholder.innerHTML` assigns raw HTML fetched over the network, which is a latent XSS vector. Four warnings cover a dead CSS rule, hardcoded spacing values that bypass design tokens, a split `body` rule block, and a `res.ok` check inconsistency. Four info items cover the `<header>` landmark gap, the `/index.html` vs `/` inconsistency in the nav component, `text-wrap` browser coverage, and the missing `<noscript>` element.

---

## Critical Issues

### CR-01: No navigation fallback when fetch fails or JavaScript is disabled

**File:** `assets/js/nav.js:22-24`

**Issue:** The `.catch()` handler only calls `console.error` and returns, leaving `#site-nav` empty. Every inner page (`research.html`, `projects.html`, `writing.html`, `cv.html`, `404.html`) has no other navigation element. When a user visits any of these pages and the fetch fails — due to a network error, a browser extension blocking fetch, a misconfigured deployment, or JavaScript being disabled — they see the page content but have no way to navigate anywhere. The only partial fallback is the `<nav class="home-links">` on `index.html`, which only works from the home page.

This is a complete navigation failure on all interior pages under realistic failure conditions. A PI arriving directly at `research.html` (e.g., from a LinkedIn link) with JS disabled would see the research page with no navigation to the CV.

**Fix (preferred — eliminates the problem entirely):** Remove `nav.js` and the `#site-nav` placeholder. Paste the `<nav>` block from `components/nav.html` directly into each HTML file and add `aria-current="page"` to the current page's link statically. Five pages, eleven lines each — no fetch, no innerHTML, no failure modes.

**Fix (minimal — if the fetch pattern must be kept):** Add a hardcoded fallback nav in the catch:
```js
.catch(function (err) {
  console.error('Site navigation failed to load:', err);
  placeholder.innerHTML =
    '<nav class="site-nav" aria-label="Main navigation">' +
    '<a href="/" class="nav-name">Emilio</a>' +
    '<ul>' +
    '<li><a href="/">Home</a></li>' +
    '<li><a href="/research.html">Research</a></li>' +
    '<li><a href="/projects.html">Projects</a></li>' +
    '<li><a href="/writing.html">Writing</a></li>' +
    '<li><a href="/cv.html">CV</a></li>' +
    '</ul></nav>';
});
```

---

### CR-02: `innerHTML` assigned from network-fetched content is a latent XSS vector

**File:** `assets/js/nav.js:11`

**Issue:** `placeholder.innerHTML = html` inserts raw HTML returned by `fetch('/components/nav.html')` directly into the DOM without any sanitization. Because the fetch is same-origin, an attacker cannot normally control this content — however, this is a latent vulnerability. If the static file host is compromised (e.g., a malicious push to the GitHub repo, a supply-chain attack on GitHub Pages), the injected HTML executes script in every visitor's browser on every page load. Additionally, browsers may execute `<script>` tags found inside innerHTML in some contexts, and event handler attributes (`onclick`, etc.) will be active.

The architectural alternative (duplicate the nav statically in each file) eliminates this class of risk entirely with no tradeoffs for a 5-page site.

**Fix (preferred):** Replace the fetch/innerHTML approach with static HTML duplication (see CR-01 preferred fix).

**Fix (minimal — if the fetch pattern must be kept):** Use `DOMParser` and insert nodes rather than assigning innerHTML directly:
```js
.then(function (html) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, 'text/html');
  var nav = doc.querySelector('nav');
  if (nav) {
    placeholder.appendChild(nav);
    // ... active-link logic using placeholder.querySelectorAll('a') ...
  }
});
```
`DOMParser` does not execute scripts in the parsed fragment, limiting the injection surface.

---

## Warnings

### WR-01: Dead CSS rule — `list-style: none` on a `<nav>` element

**File:** `assets/css/style.css:195`

**Issue:** `.home-links` in `index.html` is a `<nav>` element (line 25). The rule:
```css
.home-links {
  margin-top: calc(var(--spacing-base) * 2);
  list-style: none;   /* dead — has no effect on <nav> */
}
```
`list-style` is only meaningful on `<ul>`, `<ol>`, or `<li>` elements. The correct reset for the inner list is the separate rule at line 198 (`.home-links ul { list-style: none; }`), which already handles this. The dead `list-style` declaration on `.home-links` does nothing and misleads anyone reading the stylesheet.

**Fix:** Remove the `list-style: none` line from the `.home-links` block. The `margin-top` on that same rule is correct and should stay.

---

### WR-02: Hardcoded `1.5rem` gap values bypass the `--spacing-base` design token

**File:** `assets/css/style.css:142, 201`

**Issue:** Both `.site-nav ul` (line 142) and `.home-links ul` (line 201) hard-code `gap: 1.5rem` rather than `gap: var(--spacing-base)`. The design token `--spacing-base: 1.5rem` exists at line 35 precisely to make global spacing changes a single-line edit. As written, if `--spacing-base` is changed (e.g., to `1.25rem` for tighter spacing), these two gaps will silently diverge.

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

### WR-03: `body` styles split across three separate rule blocks

**File:** `assets/css/style.css:51-54, 80-86, 113-115`

**Issue:** The complete set of `body` properties is declared in three separate blocks:
- Lines 51–54 (reset section): `line-height: 1.5`, `-webkit-font-smoothing: antialiased`
- Lines 80–86 (typography section): `font-family`, `font-size`, `line-height: var(--leading-loose)`, `color`, `background-color`
- Lines 113–115 (layout section): `min-height: 100vh`

Note that `line-height` is set twice on `body` — `1.5` in the reset block and `var(--leading-loose)` (which evaluates to `1.7`) in the typography block. The cascade resolves this correctly (typography block wins), but the dual declaration invites confusion about which value is actually applied.

**Fix:** Consolidate `min-height: 100vh` into the typography section's `body` block (section 3), where it logically belongs alongside `background-color`. The reset block's `line-height: 1.5` can stay as a reset baseline per the Comeau reset convention, but add a comment noting it is intentionally overridden below.

---

### WR-04: `res.ok` is checked in `nav.js`, but this is a change from the previous version — verify the check is complete

**File:** `assets/js/nav.js:7`

**Issue:** The current code correctly checks `if (!res.ok) throw new Error(...)` before calling `res.text()`. This is the right pattern. However, the error is then caught by the `.catch()` at line 22, which only `console.error`s — it does not render a fallback nav. So the `res.ok` guard and the lack of a fallback in `.catch()` together mean: a non-2xx response (e.g., GitHub Pages 404 for `components/nav.html`) is correctly detected, correctly thrown, and then silently discarded, leaving the nav empty. This is the same outcome as CR-01 — flagged here to make clear that fixing CR-01's catch block resolves this path too.

**Fix:** See CR-01 fix. The `res.ok` check is correct and should be kept; the `.catch()` handler needs the fallback nav rendering.

---

## Info

### IN-01: No `<header>` landmark wraps the navigation

**File:** `components/nav.html:1`

**Issue:** The injected `<nav>` is placed inside a `<div id="site-nav">` with no `<header>` landmark wrapping it. Screen readers and accessibility tools use landmark regions to help users jump between sections. A `<header>` element at the page level is the conventional landmark container for site-wide navigation. Without it, the navigation exists only as a `<nav>` landmark (which is fine), but the page-level header region is absent, which means assistive technology users cannot use "jump to header" shortcuts.

**Fix:** In `components/nav.html`, wrap the nav in a `<header>`:
```html
<header>
  <nav class="site-nav" aria-label="Main navigation">
    ...
  </nav>
</header>
```
Update `style.css` if needed — the `header` element would not need additional styles given the existing `.site-nav` rules.

---

### IN-02: `components/nav.html` links to `/index.html` instead of `/`

**File:** `components/nav.html:2, 4`

**Issue:** The name link (`<a href="/index.html" class="nav-name">`) and the Home list item (`<a href="/index.html">Home</a>`) both point to `/index.html`. GitHub Pages canonically serves the root as `/`. Linking to `/index.html` works, but clicking "Home" from within the site navigates to a URL ending in `/index.html` rather than `/`, creating a URL inconsistency between a first-time visit and a nav click. The `nav.js` active-state logic correctly handles this by normalizing `/` to `/index.html` for comparison purposes, but the root cause is the explicit `/index.html` hrefs in the nav component.

**Fix:** Change both home links in `components/nav.html` to `/`:
```html
<a href="/" class="nav-name">Emilio</a>
<ul>
  <li><a href="/">Home</a></li>
  ...
```
The `nav.js` normalization (line 14) can then be simplified or removed.

---

### IN-03: `text-wrap: pretty` and `text-wrap: balance` have limited browser support

**File:** `assets/css/style.css:70, 74`

**Issue:** `text-wrap: pretty` (Chrome 117+, Firefox 124+, Safari 18+) and `text-wrap: balance` (Chrome 114+, Firefox 121+, Safari 17.5+) are relatively recent CSS properties. Both degrade gracefully — unsupported browsers use normal line-wrapping, so the text is readable, just not optimally wrapped. For a site targeting PIs at academic institutions, which may use older browser profiles or corporate-managed machines, this is worth noting. No content is broken; this is a cosmetic fallback risk.

**Fix:** No action required — the degradation is acceptable. Document this as a known browser-compatibility trade-off if desired.

---

### IN-04: No `<noscript>` fallback for the navigation

**File:** All HTML pages (`index.html`, `research.html`, `projects.html`, `writing.html`, `cv.html`, `404.html`)

**Issue:** All pages rely on `nav.js` to inject navigation. There is no `<noscript>` element on any page providing a static nav fallback. Users with JavaScript disabled (common in some corporate, government, or high-security academic environments) see no navigation on any page except `index.html` (which has the secondary `<nav class="home-links">`). The preferred fix in CR-01 (static nav duplication) resolves this more completely, but if the fetch pattern is retained, a `<noscript>` nav should be added.

**Fix (if fetch pattern is kept):** Add a `<noscript>` block immediately after `<div id="site-nav">` on each page:
```html
<div id="site-nav"></div>
<noscript>
  <nav class="site-nav" aria-label="Main navigation">
    <a href="/" class="nav-name">Emilio</a>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/research.html">Research</a></li>
      <li><a href="/projects.html">Projects</a></li>
      <li><a href="/writing.html">Writing</a></li>
      <li><a href="/cv.html">CV</a></li>
    </ul>
  </nav>
</noscript>
```

---

_Reviewed: 2026-05-25T22:30:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
