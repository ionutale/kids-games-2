# Write specs: Letters and word videos

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete specs (template v1) for: Letter tracing, Ollo's alphabet videos, Sight Words
videos.

## Notes

- Letter tracing is a full activity; the two video entries become interactive players.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Three specs written at template v1 (one writer per spec, each independently
verified by a fresh-context verifier):

- `specs/letter-tracing.md` (283 lines) — 20 FRs, 15 Rs, 20 ACs; guided tracing modeled on
  `trace-the-number-six` (64 px corridor, anchors, 3 guide-fading passes), uppercase A–Z then
  lowercase a–z over 52 levels; per-letter stroke data shape with letter A worked example; no
  presenter character (Ollo not reproduced).
- `specs/ollos-alphabet-videos.md` (320 lines) — 19 FRs, 12 Rs, 21 ACs; interactive player over 52
  procedural letter clips (26 × upper/lower) from one 12 s storyboard template; original presenter
  "Pip"; player chrome (play/pause, replay, prev/next, case toggle, gallery); save
  `spec.alphabetVideos.v1`.
- `specs/sight-words-videos.md` (298 lines) — 19 FRs, 13 Rs, 20 ACs; interactive player over 12
  designed sight-word videos (Dolch Pre-Primer, first 12) with spelled-out word, original sentence,
  and closed-form phase timing; no quizzes or scoring.

Verification: all 16 sections in each; verifiers quote-checked official claims against the catalog
and entry files, fixed over-claims and undefined effects, re-derived tracing tolerances, letter-clip
timings, and word-video phase formulas by hand, added missing AC coverage, and confirmed no Khan
Academy characters or content are reproduced. No `[NEEDS CLARIFICATION]` items remain. 13 of 38
specs done; tickets 09–13 remain.
