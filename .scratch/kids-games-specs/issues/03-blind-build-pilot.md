# Blind-build the pilot from its spec

Type: task
Status: resolved
Blocked by: 02

## Question

Can a fresh-context agent produce a working game from the pilot spec alone? Dispatch a subagent
that receives **only** the pilot spec (no conversation, no extra context) and must produce a
playable build that passes the spec's acceptance criteria without asking questions.

Deliverable: the build artifact, a pass/fail against each acceptance criterion, and a list of
every ambiguity, gap, or guess the builder had to make.

## Notes

- AFK; the human reviews the report.
- The gap list drives the template lock; do not patch the spec mid-test.

## Answer

Resolved 2026-09-20. Build artifact (linked, not pasted): `games/count-the-ice-cream-cones/` —
index.html, styles.css, game.js (860 lines; static, no dependencies).

**Result:** builder (fresh context, spec alone) reports all 12 acceptance criteria pass, tested
live in Chrome via DevTools MCP (full evidence matrix in the session record). Independent
spot-check by the resolving session: title + Play render; Play starts level 1 (1 cone); completing
it writes `spec.iceCream.v1 = {highestUnlocked:2, levelsCompleted:1}` and shows level 2; tapping
the right cone first stamps badge "1" on it (tap-order numbering); console clean.

**Gap report (27 items driven by the blind build) — input for `Lock spec template v1`:**

1. Title wording: FR-012 allows one word; guessed visible "Count" + pictogram logo.
2. "Narrow viewport" undefined; defined as row slot <96 px, wrap 4+3 / 4+4.
3. Title sting conflicts with the autoplay rule (A5/R-006) → omitted.
4. `music_loop` optional → omitted.
5. HOME during `celebrating`/`complete` missing from the transition table → works everywhere.
6. Tab order on title/complete unspecified → logo→Play, HOME→Replay.
7. Reset scope: clearing the save also resets in-memory progress (guessed).
8. "Confirmation shimmer" undefined → logo only, `sfx_soft_tap`, no spoken confirmation.
9. Empty tap vs idle timer: any tap resets the 12 s timer and dismisses the hint.
10. Hint target cone: deterministic leftmost uncounted.
11. Re-tap "softer" unquantified → volume 0.7, no pop sfx.
12. `sfx_soft_tap` had no event row in §8 → used for reset confirmation.
13. Simultaneous touches: batched to next rAF, sorted by (timestamp, x).
14. Confetti caps: 40 per level / 60 full-screen (spec stated ≤40 for levels only).
15. `nextCount` not displayed beyond badges (FR-012 text limit).
16. Play wording: glyph only (word optional per §10).
17. Save timing: at ALL_COUNTED, completion entry, and HOME; `updatedAt` refreshed each save.
18. Loading screen: two frames, no artificial delay.
19. Background-tab timer throttling: hints fire late, never lost.
20. Celebration badge pulse = continuous for the whole 2.5 s.
21. Cone geometry: 120×188 composite, shrinks to 111×169 at level 8; numerals stay 96 px.
22. aria-labels exist for AT but are invisible (FR-012 visual limit respected).
23. Voice clips cancel the previous utterance.
24. Missing APIs degrade gracefully (no TTS → visual only; no AudioContext → silent; storage
    blocked → runs unsaved).
25. Keyboard 3 s hold on the logo also resets.
26. AC-02 clarified: Play starts at `highestUnlocked`, not always level 1.
27. Mis-tap tolerance: cone rect expanded 12 px, nearest cone wins.

**Not verified:** audible output (headless), R-009 on a real tablet, physical multi-touch.
No spec patching occurred during the test. Caveat: the first builder dispatch returned empty and
the session was resumed; the resume completed the build and report.
