# Domain Pitfalls: Personal Academic Website

**Domain:** Personal academic website (plain HTML/CSS/JS, GitHub Pages, PI reviewer audience)
**Researched:** 2026-05-25
**Overall confidence:** HIGH — pitfalls confirmed across multiple authoritative sources, GitHub official docs, and practitioner community discussions

---

## Critical Pitfalls

Mistakes that cause rewrites, destroy professional credibility, or make the site technically broken.

---

### Pitfall 1: Repository Name Mismatch Breaks the Root URL

**What goes wrong:** The GitHub Pages user site only publishes at `username.github.io` when the repository is named exactly `username.github.io`. Any variation — wrong capitalization, typo, mismatched username — causes the site to be served at a nested path like `username.github.io/username.github.io/` instead of the root, making all absolute paths and shared links wrong.

**Why it happens:** GitHub's user page feature is a special case that requires the exact repo name. Developers miss this during setup and only notice after deploying.

**Consequences:** Every link shared externally is wrong. Navigation using root-relative paths (`/research.html`) breaks entirely. The mismatch cannot be fixed by editing HTML — the repo must be renamed or recreated.

**Prevention:**
- Before creating the repo, confirm your exact GitHub username (check profile URL).
- Name the repository exactly `[username].github.io` with no deviations.
- Verify the live URL immediately after enabling Pages.

**Detection:** Site loads at a path instead of the bare domain. Shared links 404. Navigation links go to wrong pages.

**Phase:** Phase 1 (initial setup). Cannot be fixed after content is built without breaking all shared links.

---

### Pitfall 2: Case-Sensitive Filenames Cause 404s That Only Appear on GitHub Pages

**What goes wrong:** GitHub Pages runs on Linux, which is case-sensitive. A file named `Research.html` linked as `research.html` works fine on macOS during local development but 404s on the live site. This applies to HTML files, CSS, images, PDFs, and any linked asset.

**Why it happens:** macOS and Windows filesystems are case-insensitive. Everything works locally, so the problem is invisible until after deployment.

**Consequences:** Pages load locally but 404 in production. PIs following a link from your application land on an error page. PDF CV download breaks if the filename case does not match exactly.

**Prevention:**
- Adopt a strict naming convention from day one: all lowercase, hyphens instead of spaces (`research.html`, `cv-2026.pdf`, `assets/style.css`).
- Apply this to every file and directory in the repo.
- Always link using exactly the same case as the filename.

**Detection:** Local site works; live site returns 404 for specific pages or assets. Check filename case against href/src values.

**Phase:** Phase 1 (naming convention established at file creation). Retroactively renaming files requires updating all links — exponentially harder on a multi-page site.

---

### Pitfall 3: Jekyll Silently Swallows Files and Folders Starting With Underscores

**What goes wrong:** GitHub Pages runs Jekyll by default even on plain HTML sites. Jekyll treats any file or directory beginning with an underscore (e.g., `_assets/`, `_styles/`) as a Jekyll special directory and excludes it from the published output. Those files simply do not appear on the live site — no error, no warning.

**Why it happens:** Developers use underscore prefixes for organizational purposes or copy folder structures from other projects, not knowing GitHub Pages strips them.

**Consequences:** CSS, images, or JS that are in underscore-named folders disappear on the live site. Pages render unstyled. The issue is completely invisible locally.

**Prevention:**
- Add a `.nojekyll` file to the repository root. This tells GitHub Pages to skip Jekyll processing entirely and serve all files as-is.
- This file must be: lowercase (`.nojekyll`), committed to git (not gitignored), and at the root of the publishing branch.
- Avoid underscore-prefixed directories regardless — use `assets/`, `styles/`, `fonts/` instead.

**Detection:** Assets missing on live site but present locally. Source tab in browser shows 404 for CSS/JS. Check whether affected folders begin with `_`.

**Phase:** Phase 1 (add `.nojekyll` before any content is deployed). One-time fix but easy to miss entirely.

---

### Pitfall 4: Broken PDF CV Link — The Most Visible Mistake for PIs

**What goes wrong:** The CV PDF is not committed to git before pushing, is committed with mismatched filename case, or is updated on disk but not re-staged. The download link on the website returns 404.

**Why it happens:** Binary files like PDFs require explicit `git add`. Developers add text files, commit, push, and forget the PDF. Or they update the PDF locally without re-staging it.

**Consequences:** A PI clicks "Download CV" and gets a 404. This is the highest-stakes broken link on the site. It directly damages the application. The site otherwise looks fine.

**Prevention:**
- After adding or updating a PDF, always verify it appears in `git status` and explicitly `git add` it.
- Use a predictable, stable filename (`cv.pdf`) rather than dated variants so the href never needs updating.
- Test the live download link from an incognito browser after every CV update.
- Check the live link before submitting any job application.

**Detection:** `git status` shows the PDF as untracked or modified-but-unstaged. Live download link returns 404. Check in an incognito window to rule out browser caching.

**Phase:** Phase 1 (get it right on first deploy), Phase 3 and beyond (every time CV is updated).

---

### Pitfall 5: Copy-Pasted Navigation on Every Page — The Maintenance Trap

**What goes wrong:** In a plain HTML site with no build tool, the shared navigation is duplicated in every HTML file. When a nav link needs to change (adding a page, renaming a section, adding an active state), every file must be edited individually. Files fall out of sync. One page has stale nav while others are updated.

**Why it happens:** It is the natural first approach for plain HTML: copy-paste the nav block across pages. The problem is invisible until the first nav change is needed.

**Consequences:** Navigation inconsistency looks unprofessional (different pages have different nav states). Errors are introduced when some pages are missed. Maintenance burden grows with every page added.

**Prevention:**
- Use JavaScript to inject the nav from a single source file (`nav.js` or `fetch('nav.html')`). One edit updates all pages.
- Alternatively, keep the nav minimal and identical across all pages — simple enough that copy-paste updates are low-risk for a five-page site.
- At minimum, document exactly which files contain the nav block so none are missed during updates.
- Build the pattern correctly from page one rather than retrofitting it after five pages exist.

**Detection:** Nav differs between pages. A new link exists on some pages but not others. Updating nav takes multiple file edits.

**Phase:** Phase 1 (architecture decision before building all five pages). Retrofitting after the fact requires touching every page.

---

## Moderate Pitfalls

Mistakes that create a bad impression or cause friction without necessarily breaking the site.

---

### Pitfall 6: No Name on the Page — The SEO and Findability Failure

**What goes wrong:** The researcher's full name appears only in the domain or page title, but not in the visible body text of the page. Google does not index it prominently. When a PI searches for the person by name, the site does not rank well or does not appear.

**Why it happens:** Self-promotion feels uncomfortable to researchers. The name appears in the browser tab so developers assume it is "on the page." The academic discomfort with stating one's own name leads to under-repetition in body content.

**Consequences:** The site is invisible in name searches. PIs who want to find you after a conversation cannot. A key purpose of the site — being found — is defeated.

**Prevention:**
- Include the full name in the `<h1>` on every page (or at minimum the home page).
- Include it in `<title>` tags on every page: `Research | Firstname Lastname`.
- Use it naturally once or twice in the bio paragraph.
- Write a meaningful `<meta name="description">` that includes the full name.
- Verify by doing a `site:username.github.io Firstname Lastname` search after launch.

**Detection:** Do a Google search for your name. If the site does not appear in the first few results, name visibility is the likely problem.

**Phase:** Phase 1 (structure HTML correctly). Easy fix but easy to miss entirely.

---

### Pitfall 7: No `<meta>` Tags — Invisible to Search and Broken Link Previews

**What goes wrong:** Pages lack `<title>` tags, `<meta name="description">` tags, and Open Graph tags. When the URL is shared (e.g., pasted into email or a Slack), it previews as blank or shows a raw URL. In search results, Google autogenerates an unhelpful snippet.

**Why it happens:** Plain HTML development focuses on visible content. Meta tags are invisible in the browser and easy to skip.

**Consequences:** Link previews in email or messages look unpolished. Search result snippets are not controlled. The overall impression of professionalism is lowered.

**Prevention:**
- Every page needs `<title>Page Name | Full Name</title>`.
- Every page needs `<meta name="description" content="...">` with a one-sentence description including the researcher's name and focus.
- The home page should have Open Graph tags (`og:title`, `og:description`, `og:url`) at minimum.
- This is a one-time addition per page during initial build.

**Detection:** Paste the URL into a Slack message or LinkedIn post and observe the link preview. Check the browser tab for the title.

**Phase:** Phase 1 (add to HTML template before duplicating across pages).

---

### Pitfall 8: Sparse Content That Reads as Neglect, Not Intentional Minimalism

**What goes wrong:** The site is published with placeholder text, half-finished sections, or one-sentence bios. PIs who visit get a negative impression — not "minimal aesthetic" but "this person didn't bother."

**Why it happens:** The site is built before content is written. "I'll fill it in later" does not happen. Early-career researchers undervalue the content because they think they have little to show — but even a short, well-written paragraph projects more credibility than an empty section.

**Consequences:** Sparse content makes a site feel abandoned. Multiple sources indicate PIs form a negative impression from incomplete pages — it reads as laziness or disengagement. For a job-market site, this directly undermines the application.

**Prevention:**
- Write content before building. Do not publish until every visible section has real, considered text.
- Research section with nothing published: describe research interests and methodological approaches — this is forward-looking and does not require a publication list.
- Projects section empty: two or three sentences about what you have worked on is enough; it does not need to be elaborate.
- Writing section placeholder: clearly label it as "forthcoming" or "in progress" — intentional is fine, empty is not.
- Do not have a section on the site unless it has content worth reading.

**Detection:** Any section that a PI could visit and find less than one substantive paragraph.

**Phase:** Phase 1 content preparation (write before you build). Phase 2 content review before launch.

---

### Pitfall 9: Bio Written for Academics, Not for PI Reviewers

**What goes wrong:** The bio is written in academic register — passive voice, technical jargon, abstract framing, dense sentences — as if it is an abstract or grant summary. PIs can read it but it does not communicate a clear, human picture of who the researcher is and what they bring.

**Why it happens:** Researchers default to academic writing conventions. The shift to web writing — shorter sentences, active voice, plain language — requires deliberate effort.

**Consequences:** The bio fails at its core job: letting a PI understand within 30 seconds who this person is, what they work on, and why they are an interesting candidate. Dense or abstract writing signals poor communication skills.

**Prevention:**
- Write the bio for someone who has never read your work and has 20 seconds.
- One or two sentences on research area. One sentence on background or approach. One sentence on what you are looking for.
- Use active voice. Replace "investigations were conducted" with "I study."
- Read it aloud. If it sounds like a grant abstract, rewrite it.
- Ask a non-researcher to read it. If they cannot explain it back, it is too jargon-heavy.

**Detection:** Someone outside your field reads the bio and cannot summarize what you do.

**Phase:** Phase 1 (content writing). Not a technical fix — requires rewriting.

---

### Pitfall 10: Photo Problems — Missing, Unprofessional, or Oversized

**What goes wrong:** Three distinct failure modes: (a) no photo at all, making the site feel impersonal; (b) an unprofessional photo (casual, low-resolution, heavily filtered, or an old photo that no longer matches the person); (c) a large uncompressed image file that slows page load on institutional networks.

**Why it happens:** Researchers do not have professional headshots. They either skip the photo entirely or use whatever is handy.

**Consequences:** No photo reduces the human connection the site creates. An unprofessional photo actively undermines credibility. A 4MB JPEG slows the home page noticeably on slow academic networks.

**Prevention:**
- A clear, well-lit photo is strongly preferred. It does not need to be a professional headshot — a clean, forward-facing photo with a neutral background works.
- Compress images before committing: target under 200KB for a headshot. Use tools like Squoosh or macOS Preview export at reduced quality.
- Avoid: heavy filters, obvious phone selfies, group photos with others cropped out, photos clearly taken at social events.
- Update the photo if appearance has changed substantially.

**Detection:** Page load time > 2 seconds on a fast connection suggests large uncompressed images.

**Phase:** Phase 1. Image optimization must happen before committing, not after.

---

### Pitfall 11: Outdated Information Left in Place — Signals Neglect

**What goes wrong:** The site is published and then not updated. Position listed is from the previous institution. CV PDF is months out of date. Research section describes work that has since been published or abandoned. Email address listed belongs to a former institution.

**Why it happens:** The site is built during a busy period. Updates are deferred. "I'll update it when I have time" becomes never.

**Consequences:** A PI who notices outdated information interprets it as a signal about how the researcher manages their work — attention to detail, professional presentation, follow-through.

**Prevention:**
- Keep the design low-maintenance by design: less content that changes frequently (no blog, no event listings, no news).
- Use a stable email address (personal, not institutional) so contact info does not expire.
- Make CV updating the habit, not an exceptional event. When you update your CV PDF, deploy immediately.
- The Writing and Projects sections should only be updated when there is something to add — do not create a section that requires frequent maintenance if you won't maintain it.

**Detection:** Check every external link and date-stamped item after any professional transition (new position, new affiliation, publication accepted).

**Phase:** Ongoing. Phase 2 should establish an update habit and minimize maintenance-heavy section types.

---

## Minor Pitfalls

Mistakes that introduce friction but are easy to fix.

---

### Pitfall 12: Viewport Meta Tag Missing — Site Looks Broken on Mobile

**What goes wrong:** The `<meta name="viewport" content="width=device-width, initial-scale=1">` tag is missing. On mobile devices, the browser renders the page at desktop width and shrinks it, making text tiny and the layout unusable.

**Prevention:**
- Include the viewport meta tag in the `<head>` of every HTML page.
- Test the site on a mobile screen (or using browser DevTools responsive mode) before publishing.

**Phase:** Phase 1 (add to HTML template).

---

### Pitfall 13: Relative Path Problems When Site Is in a Subdirectory

**What goes wrong:** If the repository is named `research-website` instead of `username.github.io`, the site is served at `username.github.io/research-website/`. Root-relative paths like `/assets/style.css` break because they resolve to the domain root, not the subdirectory.

**Why it happens:** Developers use root-relative paths assuming deployment at the root domain, but the repo is named incorrectly (see Pitfall 1) or a project repo is used instead of the user repo.

**Prevention:**
- Use the `username.github.io` repo for the site (avoids subdirectory issue entirely).
- If using a project repo, use relative paths (`../assets/style.css`) or configure a base path.
- Never mix root-relative and relative paths in the same project.

**Phase:** Phase 1 (path strategy established at setup).

---

### Pitfall 14: Inconsistent Navigation Across Pages — Signals Sloppiness

**What goes wrong:** The navigation structure, active page state, or link labels differ between pages due to copy-paste inconsistency. One page labels it "Writing" while another says "Blog." One page highlights the active nav item while others do not.

**Prevention:**
- Choose final nav labels before building any page and do not change them casually.
- Use a consistent method to mark the active page (CSS class or JS-based active state on all pages).
- Do a full nav audit before launch: open every page and visually verify nav is identical.

**Phase:** Phase 1. Easy to get right at build time, tedious to audit and fix after.

---

### Pitfall 15: No Custom 404 Page — Default GitHub 404 Looks Abandoned

**What goes wrong:** Any broken link or mistyped URL shows GitHub's default 404 page, which breaks the user entirely out of the site context and offers no way back.

**Prevention:**
- Create a `404.html` file in the repository root. GitHub Pages automatically serves it for any 404.
- The page should have the site's navigation and a simple message: "Page not found. Return home."
- This is a five-minute task that handles all future broken link scenarios gracefully.

**Phase:** Phase 1 (one file, created once).

---

### Pitfall 16: Browser Caching Masks Live Problems After Deployment

**What goes wrong:** A change is pushed and verified locally, but the live site still shows the old version. Developer concludes the deployment worked correctly. The issue is CDN or browser caching.

**Prevention:**
- Always verify live changes in an incognito/private browser window.
- For CSS changes that appear stubborn, add a cache-busting query string to the CSS link (`style.css?v=2`) when debugging.
- CDN propagation for GitHub Pages can take 5-15 minutes after a push.

**Detection:** Change is in the repo (visible on GitHub) but not on the live site. Incognito window shows different content than regular browser.

**Phase:** Ongoing. Relevant every time content is deployed.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Initial repo setup | Wrong repo name (Pitfall 1) | Verify GitHub username, name repo exactly right |
| First deploy | Jekyll swallows files (Pitfall 3) | Add `.nojekyll` before first push |
| File creation | Case sensitivity 404s (Pitfall 2) | All-lowercase filenames from day one |
| Nav structure | Copy-paste maintenance trap (Pitfall 5) | Decide on JS-injected or documented copy-paste nav before building all 5 pages |
| Content writing | Sparse sections / abstract bio (Pitfalls 8, 9) | Write content before building pages |
| CV page | Broken PDF download (Pitfall 4) | Test live link before sharing any application |
| Home page | No name in body text (Pitfall 6) | Include full name in `<h1>` and bio |
| HTML template | Missing meta tags (Pitfall 7) | Add title/description meta to template before duplicating |
| HTML template | Missing viewport tag (Pitfall 12) | Add to `<head>` in template file |
| Photo/assets | Uncompressed large images (Pitfall 10) | Compress all images under 200KB before committing |
| Launch | Default 404 page (Pitfall 15) | Create `404.html` before publishing |
| Post-launch | Stale information (Pitfall 11) | Update CV and affiliations after every professional transition |

---

## Highest-Priority Pitfalls for This Project

Given that this is a job-market site targeting PI reviewers, ranked by damage potential:

1. **Broken CV download link (Pitfall 4)** — Single highest-stakes technical failure
2. **Wrong repository name (Pitfall 1)** — Breaks the site before it exists
3. **Sparse or placeholder content (Pitfall 8)** — Directly undermines the job-market purpose
4. **Abstract bio (Pitfall 9)** — Fails at the "10-second read" goal stated in PROJECT.md
5. **No name on page (Pitfall 6)** — Makes the site unfindable by search

---

## Sources

- [Pitfalls of Personal Academic Websites You Want to Avoid — The Academic Designer](https://theacademicdesigner.com/2019/pitfalls-of-personal-academic-websites/)
- [A Common Mistake Academics Make With Their Personal Websites — The Academic Designer](https://theacademicdesigner.com/2022/personal-website-mistake/)
- [Personal Academic Webpages: How-To's and Tips — Townsend Center for the Humanities, UC Berkeley](https://townsendcenter.berkeley.edu/blog/personal-academic-webpages-how-tos-and-tips-better-site)
- [Troubleshooting 404 Errors for GitHub Pages Sites — GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)
- [Common Mistakes to Avoid When Hosting on GitHub Pages](https://free-git-hosting.github.io/10-common-mistakes-to-avoid-when-hosting-on-github-pages/)
- [How to Use Underscores with GitHub Pages — Ian Wootten](https://www.ianwootten.co.uk/2022/11/08/how-to-use-underscores-with-github-pages/)
- [About GitHub Pages and Jekyll — GitHub Docs (files starting with underscore)](https://help.github.com/en/articles/files-that-start-with-an-underscore-are-missing)
- [Building an Academic Website — Rob Williams](https://jayrobwilliams.com/posts/2020/06/academic-website/)
- [Postdocs and early-career researchers: be more than a name on a website — Nature Jobs Blog](http://blogs.nature.com/naturejobs/2017/01/27/postdocs-and-early-career-researchers-be-more-than-a-name-on-a-website/)
- [Sharing Headers and Footers Across Multi-Page Websites — Daniel Kahn, Medium](https://medium.com/@dtkahn/sharing-headers-and-footers-across-multi-page-websites-4396f9034669)
- [GitHub Community: Repository naming and username.github.io](https://github.com/orgs/community/discussions/22036)
