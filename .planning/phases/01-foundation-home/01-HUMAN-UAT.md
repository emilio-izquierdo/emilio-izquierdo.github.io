---
status: partial
phase: 01-foundation-home
source: [01-VERIFICATION.md]
started: 2026-05-26T02:30:00Z
updated: 2026-05-26T02:30:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Home page above-the-fold on live site
expected: "Emilio Izquierdo" in h1, "Lab Manager / Research Specialist — Recent graduate, Case Western Reserve University" in subtitle, real bio paragraph, and email emilioizq27@gmail.com — all visible without scrolling on a standard desktop viewport (1280px) at https://emilio-izquierdo.github.io
result: [pending]

### 2. HTTPS and no mixed content on live site
expected: Padlock icon in address bar. No mixed content warnings in DevTools Console. All three assets (/assets/css/style.css, /assets/js/nav.js, /components/nav.html) load over HTTPS.
result: [pending]

### 3. Mobile rendering at 375px on live site
expected: No horizontal scrollbar, readable text, nav links stack vertically above the name/bio at 375px viewport width in Chrome DevTools device toolbar.
result: [pending]

### 4. Active nav indicator on all five pages
expected: On each live page, the corresponding nav link shows the active underline style. Specifically: "Home" underlined on / or /index.html; "Research" on /research.html; "Projects" on /projects.html; "Writing" on /writing.html; "CV" on /cv.html.
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
