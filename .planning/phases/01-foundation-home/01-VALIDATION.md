---
phase: 1
slug: foundation-home
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-25
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser verification + `python3 -m http.server` for local |
| **Config file** | none — static HTML site, no test framework |
| **Quick run command** | `open http://localhost:8000` (after `python3 -m http.server`) |
| **Full suite command** | Manual checklist: nav links, HTTPS, mobile responsive, live URL |
| **Estimated runtime** | ~2 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Reload local server, verify the changed file renders correctly
- **After every plan wave:** Full manual checklist against live GitHub Pages URL
- **Before `/gsd-verify-work`:** Full suite must pass at live URL (not just localhost)
- **Max feedback latency:** <5 minutes per wave

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| nojekyll | 01 | 1 | FOUND-02 | — | No Jekyll processing | manual | `ls .nojekyll` | ✅ / ❌ | ⬜ pending |
| style.css | 01 | 1 | FOUND-04 | — | Responsive layout renders | manual | `open localhost:8000` | ✅ / ❌ | ⬜ pending |
| nav | 01 | 1 | FOUND-03 | — | All 5 nav links resolve | manual | Check all href targets | ✅ / ❌ | ⬜ pending |
| index.html | 01 | 2 | HOME-01–03 | — | Name, bio, email visible | manual | `open localhost:8000` | ✅ / ❌ | ⬜ pending |
| stub pages | 01 | 2 | FOUND-03 | — | Nav works on all pages | manual | Click all nav links | ✅ / ❌ | ⬜ pending |
| deploy | 01 | 3 | FOUND-01 | — | Live URL loads correctly | manual | `open https://[user].github.io` | ✅ / ❌ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No test framework needed. This is a static HTML/CSS/JS site with no build step.

Existing verification: manual browser checks via `python3 -m http.server` (available at Python 3.12.2).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Site loads at `[username].github.io` | FOUND-01 | GitHub Pages deploy — no automated CI configured | Push to main, wait ~60s, open URL in private browsing window |
| HTTPS is active | FOUND-01 | GitHub Pages setting | Confirm URL shows `https://` and browser shows lock icon |
| No 404s on nav links | FOUND-03 | Must check live URL, not localhost | Click all 5 nav links from every page on the live site |
| Mobile readable | FOUND-04 | Requires real device or DevTools | Open in Chrome DevTools mobile view (375px width) — no horizontal scroll, text readable |
| Name/bio/email visible without scroll | HOME-01, HOME-02 | Above-the-fold visual check | Load index page on desktop and mobile, verify content visible before scrolling |
| Email mailto works | HOME-02 | Requires real click | Click email link, verify it opens mail client with address populated |

---

## Validation Sign-Off

- [ ] All tasks have manual verify steps documented
- [ ] Wave 0 not applicable (no test framework for static HTML)
- [ ] Live URL verification planned for final wave
- [ ] Mobile check included in deployment verification
- [ ] `nyquist_compliant: true` set in frontmatter when all checks pass

**Approval:** pending
