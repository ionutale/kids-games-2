# Seasonal collections (ticket 13) — progress ledger

Ticket: `.scratch/kids-games-specs/issues/13-specs-seasonal-collections.md`
Pattern: shared brief first (four same-shape collection browsers), then one writer per spec in
parallel, then one fresh-context verifier per spec.

## Status (2026-09-20) — all four written and verified

| Spec | Lines | FRs | Rs | ACs |
|---|---|---|---|---|
| camp-khan-kids | 368 | 26 | 15 | 30 |
| earth-day-collection | 342 | 28 | 15 | 32 |
| halloween-collection | 406 | 25 | 15 | 29 |
| winter-and-holiday-collections | 355 | 26 | 14 | 29 |

Shared brief: `seasonal-collections-shared-brief.md` (200 lines; corrected once by ruling).

## Verification

- camp-khan-kids — verified (FIXED: 7 items)
- earth-day-collection — verified (FIXED: 9 items)
- halloween-collection — verified (FIXED: 7 items)
- winter-and-holiday-collections — verified (FIXED: 14 items)

### Rulings

1. The brief's "saved-shelf pulse (300 ms)" conflicted with the closed effects list. **Ruling:**
   the cue is the defined `soft pulse` (1→1.04→1, 400 ms). Cost if wrong: a cosmetic cue timing
   differs from the original brief intent.
2. Resume-cue timing diverged (camp/halloween 1200 ms; winter 1500; earth-day 4200). **Ruling:**
   canonical = begins when the 1200 ms reveal completes. Cost if wrong: a cosmetic cue lands
   0.3–3 s earlier than two writers intended. Winter also gained the completion-panel dismissal
   on Replay that the other three define.

Cross-file fix round + scoped re-review: **PASS** (both files).

## Deferred minors

- camp: replay during the confetti (before 6500 ms) not spelled out; 320–767 preview geometry has
  no dedicated AC.
- earth-day: inherited "home 288" content-stack figure not derivable from its own placement;
  strip star pop unobservable in `preview` (matches Halloween's formulation).
- halloween: FR-005 omits the grid's 200 ms tile fade stated in section 9 (family-wide split);
  layout y-positions implicit.
- winter: ≥1024 prev/next placement qualitative; below-480 best-effort note inherited.

## Coverage check

- Entry files: 38; spec files: 38; one-to-one (`comm` check) — all documented entries specified.
  (Earlier "X of 38" counts excluded the pilot.)

## Finish checklist

- [x] brief written
- [x] all 4 specs complete (16 sections, no `[NEEDS CLARIFICATION]`)
- [x] all 4 independently verified + cross-file re-review
- [x] ticket 13 Answer updated + status resolved
- [x] map.md Decisions updated (all 38 entries specified; tickets 14–15 remain)
- [x] commit: see git log (committed with this file)
