# Technology Stack

**Project:** Personal Research Website (username.github.io)
**Researched:** 2026-05-25
**Overall confidence:** HIGH — GitHub Pages behavior is well-documented; CSS/font recommendations are stable and verified against current sources.

---

## Recommended Stack

### Hosting

| Technology | Purpose | Why |
|------------|---------|-----|
| GitHub Pages (branch deploy) | Static file hosting | Free, zero-config, serves static HTML directly from the repo root; no server to maintain |

**Deploy from root (`/`), not `/docs`.**

Reason: Publishing from repo root means every file in the repository is the site. No mental overhead of keeping a docs/ subfolder in sync. For a personal site where the entire repo IS the website, root publishing is the natural match. GitHub Pages supports both, but root is cleaner when there is no other code in the repo.

**Branch:** `main` (or `master`). GitHub Pages will deploy automatically on every push.

---

### CSS Reset

**Use Josh W. Comeau's modern CSS reset (inline, at top of `style.css`).**

Do not use normalize.css (last updated 2018, carries legacy IE fixes that add noise) and do not use a full reset like Eric Meyer's (too aggressive — nukes useful browser defaults). Do not npm-install anything.

The reset is 10 rules that address real 2025 cross-browser problems. Copy it directly into your `style.css`. Key rules:

```css
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

Source: https://www.joshwcomeau.com/css/custom-css-reset/ (updated March 2025)

---

### Typography and Fonts

**Recommendation: System font stack. No Google Fonts. No self-hosted web fonts.**

Rationale:

1. **Performance**: System fonts are already on the user's device. Zero network requests, zero FOUT (flash of unstyled text), zero layout shift. Researchers on institutional networks or slow connections get immediate text rendering.

2. **Privacy**: Google Fonts CDN transfers the user's IP address to Google servers. A Munich court ruled in 2022 that this violates GDPR. For a professional academic site, avoid this exposure entirely — system fonts eliminate the issue.

3. **Aesthetic**: The transitional serif stack (Charter, Cambria) is what academic readers see in PDFs and printed papers. It reads as serious and legible, not trendy.

**Body text (primary content): Transitional serif stack**

```css
font-family: Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;
```

Why this stack: Charter is on macOS and iOS. Cambria is on Windows. Sitka Text covers older Windows. The fallback chain means every major OS gets a high-quality transitional serif that renders well at body sizes (16px–18px). Georgia is acceptable as a last resort but Charter reads better on modern displays.

**Navigation, metadata, labels: System sans-serif stack**

```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

Why: Navigation items and section labels benefit from the visual contrast of sans-serif against serif body copy — a standard academic journal pattern. `system-ui` resolves to the native UI font on each OS (SF Pro on macOS/iOS, Segoe UI on Windows, Roboto on Android/Chrome OS).

**Type scale (suggested CSS custom properties):**

```css
:root {
  --font-body: Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;
  --font-ui: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  --text-xs:   0.75rem;   /* 12px — labels, metadata */
  --text-sm:   0.875rem;  /* 14px — secondary content */
  --text-base: 1rem;      /* 16px — body default */
  --text-lg:   1.125rem;  /* 18px — comfortable reading for long text */
  --text-xl:   1.25rem;   /* 20px — subheadings */
  --text-2xl:  1.5rem;    /* 24px — section headings */
  --text-3xl:  2rem;      /* 32px — page title / name */

  --line-height-tight:  1.2;
  --line-height-normal: 1.5;
  --line-height-loose:  1.7;  /* use for long-form body text */
}
```

---

### Color Palette

**Minimal light palette using CSS custom properties:**

```css
:root {
  --color-bg:        #fafafa;   /* off-white — warmer than pure #fff */
  --color-surface:   #ffffff;   /* card / content block backgrounds */
  --color-text:      #1a1a1a;   /* near-black — high contrast without pure black */
  --color-text-muted:#555555;   /* secondary text, metadata, dates */
  --color-border:    #e0e0e0;   /* dividers, section separators */
  --color-accent:    #1a56a0;   /* links — accessible blue, WCAG AA compliant */
  --color-accent-visited: #6b3fa0; /* visited links */
}
```

Rationale: Off-white background (#fafafa) reduces eye strain compared to pure white. Near-black text (#1a1a1a) provides near-identical contrast ratio to pure black without the harshness. The link blue is chosen to pass WCAG AA contrast (4.5:1) against white backgrounds.

---

### Layout

**Content width: `max-width: 65ch` to `max-width: 680px` on the main text column.**

Typography research (Robert Bringhurst, W3C accessibility guidelines) converges on 45–75 characters per line as optimal for reading. The `ch` unit is the width of "0" in the current font — `65ch` gives approximately 65 characters per line at normal body size, squarely in the optimal range.

```css
.content {
  max-width: 680px;   /* caps absolute width on large screens */
  width: 100%;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
```

Use `padding-inline` (logical property) for horizontal padding so it works with the auto margin centering without calc hacks.

---

### JavaScript

**Minimal. No library. No framework. No bundler.**

The only legitimate JavaScript need for this site is shared navigation. Two patterns work:

**Option A (recommended): Duplicate nav HTML across pages.**
For a 5-page site, manually copying a `<nav>` block into each HTML file is the correct approach. The nav is small (5 links). When it changes, you update 5 files — that is 30 seconds of work. This is the pattern used by the simplest academic sites that have survived for 20+ years without rotting.

**Option B (acceptable if nav grows): Native Web Components.**
A custom element for the nav requires no build step:

```js
// nav-component.js
class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <a href="/index.html">Home</a>
        <a href="/research.html">Research</a>
        <a href="/projects.html">Projects</a>
        <a href="/writing.html">Writing</a>
        <a href="/cv.html">CV</a>
      </nav>
    `;
  }
}
customElements.define('site-nav', SiteNav);
```

Then in each HTML file: `<site-nav></site-nav>` with `<script src="/nav-component.js">`. This is native browser API — no framework, no npm, no build step. Browser support is universal as of 2024.

**Start with Option A.** Only move to Option B if the nav requires changes frequently enough that editing 5 files becomes a burden.

No jQuery. No Alpine.js. No htmx. The site has no interactivity needs that require a library.

---

### GitHub Pages Configuration

**File: `.nojekyll` (required)**

Create an empty file named `.nojekyll` in the repository root. This tells GitHub Pages to skip Jekyll processing. Without it, GitHub Pages runs Jekyll on your repository, which silently ignores files and directories whose names begin with underscores (e.g., `_fonts/`, `_assets/`). With `.nojekyll`, the files are served as-is. Even if you don't use underscore directories now, add this file — it costs nothing and prevents a confusing future bug.

```bash
touch .nojekyll
```

**File: `_config.yml` — do not create one.**

A `_config.yml` file is Jekyll configuration. Since we are bypassing Jekyll entirely with `.nojekyll`, there is no need for `_config.yml`. Creating one causes GitHub Pages to attempt Jekyll processing, which contradicts the `.nojekyll` signal and can cause unpredictable behavior. Leave it out.

**CNAME — not needed.**

The project uses `username.github.io` (the default subdomain). CNAME files are only required when mapping a custom domain (e.g., `emilio.com`). Skip this entirely.

**GitHub repository settings:**
- Settings > Pages > Source: Deploy from branch
- Branch: `main` (or `master`), folder: `/ (root)`
- No GitHub Actions workflow needed — branch deploy is sufficient

---

## File and Directory Structure

```
/ (repo root)
├── index.html          # Home page
├── research.html       # Research section
├── projects.html       # Projects section
├── writing.html        # Writing section (placeholder structure)
├── cv.html             # CV section (link to PDF download)
├── style.css           # Single global stylesheet
├── .nojekyll           # Disables Jekyll processing — required
├── assets/
│   ├── cv.pdf          # The actual CV file
│   └── images/         # Profile photo and any other images
└── README.md           # Optional: repo description on GitHub
```

**Why this structure:**

- **Flat HTML files at root**: GitHub Pages serves them at `username.github.io/research.html`, `username.github.io/projects.html`, etc. Clean URLs without any path nesting. Alternately, you can do `research/index.html` to get `username.github.io/research/` — but for a simple 5-page site, flat is simpler.
- **Single `style.css`**: One stylesheet shared across all pages. Link it with an absolute path: `<link rel="stylesheet" href="/style.css">`. The leading `/` ensures it resolves correctly regardless of which page you're on.
- **`assets/` directory**: Keeps binary files (PDF, images) out of the root. GitHub Pages serves everything under `assets/` at `username.github.io/assets/cv.pdf`.
- **No `src/`, `dist/`, `_site/` directories**: These are build tool artifacts. This project has no build step, so these directories have no meaning.

---

## What NOT to Use and Why

| Tool / Approach | Why Not |
|----------------|---------|
| **Jekyll** | GitHub Pages runs Jekyll by default — we bypass it with `.nojekyll`. Jekyll requires Ruby, Gemfiles, `_config.yml`, and Liquid templates. Adding it converts "edit HTML directly" into "run a local server to preview." Defeats the constraint. |
| **Eleventy (11ty)** | Excellent static site generator, but requires Node.js, npm, a build step, and config files. When npm packages update, the build breaks. Maintenance burden contradicts the longevity goal. |
| **Astro** | Same problem as Eleventy, with higher complexity. Overkill for 5 pages. |
| **Hugo** | Go binary, YAML frontmatter, template syntax. Not editable by someone comfortable with HTML unless they also learn Hugo's conventions. |
| **React / Next.js** | Single-page app architecture for a document-like site is architectural mismatch. JS-heavy loading is hostile to the performance requirement. No build step means no React. |
| **Tailwind CSS** | Requires a build step (the JIT compiler). The CDN version exists but is 4x the file size and slower than a hand-written CSS file. For a minimal site, hand-written CSS is faster to write than learning Tailwind's utility class names. |
| **Bootstrap** | Adds ~200KB of CSS for features this site will not use. The visual signature is recognizable and generic — not appropriate for a site that should reflect individual academic identity. |
| **normalize.css (npm)** | Carries IE6–IE10 fixes that no longer apply. Last updated 2018. Copy the modern reset rules you need directly into `style.css` instead. |
| **Google Fonts (CDN)** | Privacy: transfers user IPs to Google (GDPR violation risk). Performance: external DNS lookup + TLS handshake + font file download before text renders. System fonts eliminate all of this. |
| **jQuery** | No interactivity needs on this site justify the inclusion. 87KB for DOM manipulation that vanilla JavaScript handles natively in 2025. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Hosting | GitHub Pages (branch deploy) | Netlify | GitHub Pages is already zero-config for `username.github.io`; Netlify adds account dependency without benefit for this use case |
| CSS reset | Josh Comeau reset (inline) | normalize.css | normalize is unmaintained since 2018; Comeau's reset is updated for 2025 CSS |
| Fonts | System serif (Charter/Cambria) | Self-hosted web font (e.g., Source Serif) | Self-hosting is correct IF you want a specific web font; system stack is faster and sufficient for academic aesthetics |
| Nav sharing | Duplicate HTML | Web Component | Duplication is simpler for 5 pages; component approach valid if complexity grows |
| Color tokens | CSS custom properties in `:root` | Inline values | Custom properties make global color changes a single-line edit; no downside |

---

## Sources

- GitHub Pages publishing source documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- `.nojekyll` explanation: https://github.blog/news-insights/bypassing-jekyll-on-github-pages/
- Josh W. Comeau CSS reset (updated March 2025): https://www.joshwcomeau.com/css/custom-css-reset/
- Modern font stacks by classification: https://modernfontstacks.com/
- System font stack CSS reference: https://css-tricks.com/snippets/css/system-font-stack/
- Google Fonts GDPR risk: https://usercentrics.com/knowledge-hub/google-fonts-gdpr-compliant/
- Optimal line length for readability: https://www.uxpin.com/studio/blog/optimal-line-length-for-readability/
- Plain Academic template (reference): https://github.com/mavroudisv/plain-academic
- Minimal Academic Website template (reference): https://github.com/timothygebhard/minimal-academic-website
- CSS custom properties (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- Web Components (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Web_components
