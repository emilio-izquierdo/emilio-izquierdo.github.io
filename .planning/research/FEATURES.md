# Feature Landscape

**Domain:** Personal academic/researcher website for job market (lab manager / research specialist roles)
**Audience:** PIs reviewing applications — primary. Academic peers — secondary. General professional — third.
**Researched:** 2026-05-25
**Confidence:** MEDIUM-HIGH (multiple sources: Berkeley Townsend Center, Elsevier Connect, The Academic Designer, job market guides, hiring committee perspectives)

---

## Table Stakes

Features PIs expect to see. Missing any of these makes the site look unprofessional or incomplete, and signals a candidate who doesn't take their public presence seriously.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Name prominent on every page | Orientation — PI needs to know whose site this is at a glance | Low | In header, not just the browser tab |
| Professional bio / "About" | First thing PIs read. Sets framing for all other content on the site | Low | 2-4 sentences. Current position/focus, trajectory, what you're looking for. Not a resume recitation. |
| Professional headshot | PIs form impressions in seconds. No photo signals either evasion or an incomplete site | Low | High quality, neutral background, approachable expression. Consistent with LinkedIn. |
| Contact info or email | PIs who want to follow up should never have to hunt | Low | Email address. Direct. Not a contact form. |
| CV download (PDF) | The primary hiring document. If it's hard to find, the site fails its core job | Low | Prominent link. Opens/downloads reliably. Not behind a login or on Google Drive. |
| Research interests clearly stated | PIs want to immediately know what you work on and whether it aligns with their lab | Low | Not a list of keywords — a sentence or two that communicates intellectual focus |
| Past research / projects listed | Demonstrates actual work done, not just claimed interests | Medium | Project title, brief description, role, outcomes (paper, dataset, tool, finding) |
| Consistent navigation across all pages | Structural coherence. If navigation breaks, PI loses trust in the site | Low | Same header/nav on every page. No dead links. |
| Working links | Broken links to papers, CVs, or pages signal abandonment or carelessness | Low | Every outbound link tested. CV link in particular must always resolve. |
| Fast load, no broken images | PIs may be on institutional/slow networks. A page that hangs or shows broken images is a red flag | Low | No large unoptimized images. No JS-heavy widgets. |

---

## Differentiators

Features that make a researcher's site stand out positively from the generic template site. Not expected, but noticed and valued by PIs who look carefully.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Research interests framed as a narrative, not a keyword list | Shows intellectual maturity and self-awareness. Most sites list "machine learning, neuroscience, fMRI" — a few sentences about what connects your interests is far more memorable | Low | One paragraph. Why these questions matter. What you want to understand. |
| Clear Research/Projects distinction | Shows the candidate understands the difference between academic lab work and other work — exactly the professional self-awareness PIs want in a lab manager | Low | This site already plans this split. Make the distinction legible in the UI, not just the URL. |
| Project entries with concrete outcomes | "Analyzed X dataset" is generic. "Preprocessed EEG data for N=80 study, resulting in three accepted abstracts" is specific. PIs scan for evidence, not claims | Medium | For each project: what you did, what came out, your role. Even one sentence of specifics beats a paragraph of vague description. |
| Separation of current interests from past work | Signals forward-looking orientation. PIs hiring for research staff want to know where someone wants to go, not just where they've been | Low | The planned "Interests" vs "Work" split in Research section. Execute it clearly. |
| Writing section that signals intellectual engagement | Even a placeholder that says "I write occasionally about X and Y — posts coming" tells a PI the candidate reads and thinks beyond their immediate experiments | Low | See Writing Placeholder Strategy below |
| Clean, intentional aesthetic | Most academic sites are visually cluttered or use generic templates. A site that looks deliberately minimal signals taste and attention to detail | Low | White/off-white, one font family, generous whitespace. The absence of visual noise is the signal. |
| Site feels maintained, not abandoned | An outdated site (2022 projects listed as "current", a section that says "coming soon" from 3 years ago) is a red flag. A site that looks current and cared for signals professional responsibility | Low | Even if content is sparse, dates and framing should feel current. Remove anything that reads as stale. |

---

## Anti-Features

Features to explicitly NOT build. These are common mistakes researchers make that harm rather than help their application.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Contact form | Adds friction, breaks without server, signals insecurity about giving email. PIs do not use contact forms to recruit | Plain email address. `name@email.com`. |
| Social media widgets / embedding Twitter/X feed | Distracts from the core content. Embeds are slow, break frequently, and insert social network UI into a professional document | Link to profiles in footer or contact section — plain text link only |
| Dark mode / dark background | Not standard for academic sites. Harder to read dense biographical text. Creates visual contrast that draws attention to design rather than content | Light background, dark text. Standard. |
| Hobby/personal interest section | PIs are reviewing applications, not getting to know you as a person. Including hiking photos or personal blog posts dilutes professional signal. Multiple sources cite this as a mistake | If personality needs to come through, let it come through in the writing section tone and bio voice — not a "Life Outside the Lab" section |
| "Under construction" explicit labels | Looks like an unfinished site. Signals a candidate who ships incomplete work | Use graceful placeholders that don't call attention to emptiness (see Writing Placeholder Strategy) |
| Comprehensive publications list with no context | A list of DOI links with no description requires PI to do work to understand what you did. Generic list is less useful than 3 entries with actual descriptions | Annotate each publication/project with 1-2 sentences about your contribution and why it matters |
| Reproducing the full CV in HTML | Double the maintenance burden, visual clutter, and the HTML version will inevitably fall out of sync with the PDF. PIs will look at PDF anyway | PDF download only. One source of truth. This project already has this right. |
| Excessive linking to every external profile | Google Scholar, ORCID, ResearchGate, Academia.edu, LinkedIn all at once creates visual noise and splits attention | Pick 1-2 most relevant external links. For a job-market site targeting PIs: Google Scholar (if publications exist) and LinkedIn. |
| Generic "Welcome to my website" home text | Wastes the most valuable real estate on the site. PIs see this and immediately look for the CV link | First sentence of bio should be substantive: who you are, what you work on, where you're headed |
| Countdown timers or "coming soon" pages | Appropriate for product launches. Unprofessional on an academic site | See Writing Placeholder Strategy |
| Embedding PDFs inline | Unreliable across browsers and devices. Creates layout issues | Link to PDF for download. Let the browser or PDF reader handle it. |

---

## Writing Section Placeholder Strategy

This is the specific challenge the project faces: a Writing section that needs to exist structurally but has no content yet. The wrong approaches are common and costly.

**The problem:**
- An empty page with "No posts yet" looks abandoned
- "Coming soon" looks like an unfinished site
- A countdown or "under construction" banner is unprofessional
- Simply hiding the section entirely removes it from the nav and creates confusion if the URL is shared

**What the research shows:**
- PIs notice sites that look unmaintained or incomplete
- The best approach for sparse content is framing that makes the absence intentional rather than accidental
- "Works in progress" is an accepted academic framing for content not yet ready — apply this logic to writing

**Recommended approach (LOW complexity, HIGH professional return):**

The Writing page should open with 2-4 sentences that:
1. State the types of writing you plan to share (field notes, methodology reflections, short essays)
2. Make clear this is a section you're actively building
3. Optionally: link to one external piece of writing (even a blog comment, tweet thread saved as a post, or a piece from another context) to show the section is not empty

Example framing (not final copy, illustrative):
> "I write about research methods, data analysis, and occasionally the experience of doing science. This section is new — I'll add pieces here as they're ready. In the meantime, here's a recent [thread / note / post] on [topic]."

This approach:
- Does not use "under construction" language
- Signals intentionality rather than incompleteness
- Gives PIs something to read if they land on the page
- Requires no structural rebuild when real posts are added

**HTML structure implication:** The Writing page should render as a list of entries, each with a title, date, and short description. An empty list with a framing paragraph above it is clean and extensible. The first "entry" can be the framing paragraph itself or a link to external writing.

---

## Feature Dependencies

```
CV download → CV must exist as a current PDF
Project entries → Research section (projects live under Research/Work)
Writing placeholder → Writing section HTML structure (list of entries)
Headshot → Home page bio (they appear together)
Research interests narrative → Research section "Interests" subsection
Contact info → Home page AND optionally footer (every page)
```

The navigation structure depends on all five sections being reachable from every page. If any section is missing, the nav breaks.

---

## MVP Feature Priority

For a PI reviewing a lab manager / research specialist application, here is the priority order:

**Must ship:**
1. Name + bio + headshot (Home)
2. CV PDF download link (CV section, also linked from Home)
3. Research interests stated in plain language (Research/Interests)
4. Past projects with concrete descriptions (Research/Work or Projects)
5. Email contact visible without clicking
6. Consistent navigation

**Ship with graceful placeholder:**
7. Writing section — framed empty state, ready for content

**Can be minimal on v1:**
8. Projects section — even 1-2 non-academic projects with descriptions is sufficient
9. External profile links — Google Scholar if publications exist, LinkedIn

**Defer entirely:**
- Blog functionality (dynamic, RSS, pagination) — not needed until Writing section has 5+ posts
- Social media integration
- Analytics
- Search

---

## Sources

- Berkeley Townsend Center: [Personal Academic Webpages: How-To's and Tips](https://townsendcenter.berkeley.edu/blog/personal-academic-webpages-how-tos-and-tips-better-site) — HIGH confidence
- Elsevier Connect: [Creating a Simple and Effective Academic Personal Website](https://www.elsevier.com/connect/creating-a-simple-and-effective-academic-personal-website) — MEDIUM confidence
- The Academic Designer: [How To Make A Personal Academic Website](https://theacademicdesigner.com/2023/how-to-make-an-academic-website/) — MEDIUM confidence
- The Academic Designer: [10 Highlights to Include on Your Personal Academic Website](https://theacademicdesigner.com/2020/10-personal-academic-website-ideas/) — MEDIUM confidence
- The Academic Designer: [35 Page Ideas for Your Academic Personal Website](https://theacademicdesigner.com/2025/35-page-ideas-for-your-academic-personal-website/) — MEDIUM confidence
- Job market website guide: [Create a Simple and Free Job Market Website](https://hollina.github.io/make-a-job-market-website.html) — MEDIUM confidence (economics-field slant, but principles transfer)
- Inside Higher Ed: [What Academic Job-Seekers Need on Their Websites](https://www.insidehighered.com/advice/2013/11/11/essay-what-academic-job-seekers-need-their-websites) — MEDIUM confidence (2013, but structural advice still holds)
- Leiter Reports / Philosophy Blog: [Maintaining a Personal Web Page While on the Job Market](https://leiterreports.typepad.com/blog/2012/05/maintaining-a-personal-web-page-while-on-the-job-market.html) — LOW confidence (old, philosophy-specific)
- PMC hiring research: [What PIs Want When Hiring a Clinical Research Coordinator](https://pmc.ncbi.nlm.nih.gov/articles/PMC11112423/) — MEDIUM confidence (clinical context, but PI hiring behavior generalizes)
- Rice University Graduate Studies: [How to Make Your Own Academic Website](https://graduate.rice.edu/news/current-news/how-make-your-own-academic-website) — MEDIUM confidence
