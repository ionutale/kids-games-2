# matching-games build (ticket 16) — progress ledger

Ticket: `.scratch/kids-games-specs/issues/16-build-matching-games.md`
Spec: `docs/khan-academy-kids-games/specs/matching-games.md` (392 lines, 17 FRs, 29 ACs)
Stack: `docs/khan-academy-kids-games/stack-decision.md`
Pattern: blind build (spec + stack doc only) → builder live-tests all ACs → independent verifier
live-tests → fix loop → record spec gaps.

## Status (2026-09-21)

- builder — DONE (29/29 ACs by its own live testing; one bug found and fixed during testing:
  matching during `teaching` now returns to `playing` per section 6)
- build report — written at `research/matching-games-build-report.md`
- independent verification — dispatched
- Note: builder's optional `music_loop` omitted (spec permits); `card_slot` rendered in CSS
  instead of an SVG file; audio fidelity, physical multi-touch, VoiceOver, and tablet fps not
  testable in the builder's environment (desktop 61 fps measured; R-009 on target hardware
  unverified).

## Verification (2026-09-27)

- independent verifier — dispatched (live-test all 29 ACs + stack conformance); static code review
  dispatched in parallel
- static code review — COMPLETE, verdict "with fixes"; spec traceability exact (Tables A/B and
  §7/§8/§9/§10 numbers checked line-by-line); report at `research/matching-games-code-review.md`
  - C-1 (Critical) — the 3 s reset hold is not cancelled when leaving `title`; a keyboard hold plus
    focus change can fire `completeHold()` mid-level and wipe the save. Confirmed real in source
    (game.js:1077-1116, 1057-1061, 784-814).
  - I-1 (Important) — a missed `pointerup`/`pointercancel` (window blur mid-press) leaves
    `activePointers` stuck; all pointer input is ignored until reload. Confirmed real in source
    (game.js:1009-1032).
  - minors: fix M-1 (hint-animation leak), M-2 (duplicate resetIdle), M-3 (hook `getLevel()` live
    refs), M-4 (pip fill 4 px wide), M-5 (focus-visible radius override), M-10 (dead code) in the
    fix round; defer M-6 (AT live region — spec-silent enhancement), M-7/M-8 (cross-browser checks
    — Chrome-only environment), M-9 (primitive-count reading — build freedom)
- independent verifier — COMPLETE: 29/29 ACs PASS, full stack conformance; defects D-1 (Critical,
  = static C-1), D-2 (High, = static I-1), D-3 (Low, new — 8 pips shrink to 7.75 px below 480 px);
  report at `research/matching-games-verification-report.md`; not testable: real SR announcement,
  audible fidelity, physical multi-touch, tablet fps, real background throttling, other engines
- adjudications: static M-4 dropped (verifier could not reproduce — fill measures exactly
  pip-sized); fix scope F-1/F-2/F-3 + M-1/M-2/M-3/M-5/M-10; M-6/M-7/M-8/M-9 deferred
- fix round 1/5 — COMPLETE: fixer report at `research/matching-games-fix-report.md`; F-1/F-2/F-3 +
  M-1/M-2/M-3/M-5/M-10 fixed; fixer's full suite 96/96 PASS twice; before/after hashes recorded
- scoped re-review — COMPLETE: all findings ADDRESSED (C-1, I-1, M-1, M-2, M-3, M-5, M-10); M-4
  adjudicated a false positive by the reviewer itself; new Low N-1 (the 4 px focus outline is square
  around rounded cards) — deferred, no fix: cosmetic, spec only requires the 4 px outline/contrast,
  and a CSS change now would invalidate the live re-verification in flight; addendum appended to
  `research/matching-games-code-review.md`
- re-verification — COMPLETE (original verifier): D-1 exact repros cancel mid-level, D-2 recovers
  across a real tab switch (real visibilitychange), D-3 pips exactly 8 px; full original suite
  re-run 73/73 (all 29 ACs), console clean, no new defects; report §9 added
- orchestrator revision-2 check (bounded, own CDP harness, real input) — ALL PASS: D-1a hold+Tab+
  start-level → save intact, state playing; D-1b clean 3.25 s hold → key cleared; D-1c early release
  → save intact; D-2 stuck touch + blur → next touch processed (teaching); D-3/AC-21 320×480 L8 →
  8 pips at exactly 8 px, cards 66 px, no scroll; AC-12 tab order logo→Play→Home→card 1, outline
  `4px rgb(62,44,30)`; console empty; resources only styles.css/game.js
- re-verification (2) — COMPLETE (fresh spot-verifier): 8/8 regression ACs (AC-02/03/04/05/11/13/
  16/17) pass, hashes match, no new defects; report `research/matching-games-verification-rev2-spot.md`
- orchestrator post-fix spot-check — PASSED (fixed revision): title Play 96×96, level 1 solved with
  real taps → save `{highestUnlocked:2, levelsCompleted:1}` → level 2 in Table B order; console
  empty; only styles.css + game.js fetched
- orchestrator hash check — files match the fix report's "After" column exactly (index unchanged);
  git state clean apart from the expected untracked files
- orchestrator spot-check — PASSED: real-input CDP run in isolated headless Chrome; title (Play
  96×96, logo 128×128, no cards in the DOM), level 1 solved with real taps → save
  `{highestUnlocked:2, levelsCompleted:1}` written at the last match, level 2 in Table B order;
  console empty; only styles.css + game.js fetched

## Finish checklist

- [x] game built at `games/matching-games/` (self-contained, no build step)
- [x] builder live-tested all ACs (report at `research/matching-games-build-report.md`)
- [x] independent verifier live-tested + stack conformance checked (rev 1: 29/29; rev 2: full
      re-run 73/73, all defects fixed, no regressions; fresh spot-verifier 8/8; orchestrator repro
      checks)
- [x] spec gaps recorded in the ticket answer
- [x] ticket 16 Answer updated + status resolved; map updated; commit
      "Add matching-games validation build and verification (ticket 16)"
