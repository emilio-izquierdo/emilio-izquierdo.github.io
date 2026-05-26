<!-- GSD:project-start source:PROJECT.md -->
## Project

**Personal Research Website**

A minimal static personal website hosted on GitHub Pages (username.github.io) for a researcher currently on the job market for lab manager and research specialist roles. Five sections — Home, Research, Projects, Writing, CV — built with plain HTML/CSS/JS and no frameworks. The site needs to work for PIs reviewing applications today, and grow into a full academic presence over time.

**Core Value:** A PI can land on this site, immediately understand who this researcher is and what they work on, and find their CV in under 10 seconds.

### Constraints

- **Tech**: Plain HTML/CSS/JS only — no React, no Jekyll, no Eleventy, no build pipeline
- **Hosting**: GitHub Pages — must work as static files with no server
- **Maintenance**: Editable by someone comfortable with HTML directly
- **Performance**: Fast load, minimal assets — researchers on slow connections or institutional networks
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Hosting
| Technology | Purpose | Why |
|------------|---------|-----|
| GitHub Pages (branch deploy) | Static file hosting | Free, zero-config, serves static HTML directly from the repo root; no server to maintain |
### CSS Reset
* {
### Typography and Fonts
### Color Palette
### Layout
### JavaScript
### GitHub Pages Configuration
- Settings > Pages > Source: Deploy from branch
- Branch: `main` (or `master`), folder: `/ (root)`
- No GitHub Actions workflow needed — branch deploy is sufficient
## File and Directory Structure
- **Flat HTML files at root**: GitHub Pages serves them at `username.github.io/research.html`, `username.github.io/projects.html`, etc. Clean URLs without any path nesting. Alternately, you can do `research/index.html` to get `username.github.io/research/` — but for a simple 5-page site, flat is simpler.
- **Single `style.css`**: One stylesheet shared across all pages. Link it with an absolute path: `<link rel="stylesheet" href="/style.css">`. The leading `/` ensures it resolves correctly regardless of which page you're on.
- **`assets/` directory**: Keeps binary files (PDF, images) out of the root. GitHub Pages serves everything under `assets/` at `username.github.io/assets/cv.pdf`.
- **No `src/`, `dist/`, `_site/` directories**: These are build tool artifacts. This project has no build step, so these directories have no meaning.
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
## Alternatives Considered
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Hosting | GitHub Pages (branch deploy) | Netlify | GitHub Pages is already zero-config for `username.github.io`; Netlify adds account dependency without benefit for this use case |
| CSS reset | Josh Comeau reset (inline) | normalize.css | normalize is unmaintained since 2018; Comeau's reset is updated for 2025 CSS |
| Fonts | System serif (Charter/Cambria) | Self-hosted web font (e.g., Source Serif) | Self-hosting is correct IF you want a specific web font; system stack is faster and sufficient for academic aesthetics |
| Nav sharing | Duplicate HTML | Web Component | Duplication is simpler for 5 pages; component approach valid if complexity grows |
| Color tokens | CSS custom properties in `:root` | Inline values | Custom properties make global color changes a single-line edit; no downside |
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
