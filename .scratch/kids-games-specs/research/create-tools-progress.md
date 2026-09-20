# Create tools (ticket 11) — progress ledger

Ticket: `.scratch/kids-games-specs/issues/11-specs-create-tools.md`
Pattern: one writer per spec, independent verifier per spec (tickets 05–10 pattern). The two specs
share the drawing canvas / stickers / gallery / export, so the storytelling writer ran after the
drawing spec existed and reused its conventions.

## Status (2026-09-20) — both written

| Spec | Lines | FRs | Rs | ACs |
|---|---|---|---|---|
| drawing-and-coloring | 401 | 31 | 16 | 29 |
| storytelling-and-voice-recording | 420 | 36 | 16 | 39 |

## Verification

- drawing-and-coloring — verified (FIXED: 12 items — impossible picker/gallery grids at small
  viewports, punishing re-tap page reload, target-size contradictions, undefined effects, missing
  AC coverage).
- storytelling-and-voice-recording — verified (FIXED: 15 items — undo/canvas tab stops, mic
  re-entry hazard, toast/AC fixes).
- Cross-spec consistency pass found 5 remaining items in storytelling: gallery grid, HOME in tab
  orders, one-way `un-draw`, unmarked swatch-voice divergence, clip budget vs worst-case gallery.
  Writer fix round: all 5 fixed (budget 52 clips / 14 MB). Scoped re-review: **PASS** on all 5,
  no new breakage.
- Deferred minors: `un-draw` leaves an erased stroke's return implicit (AC-07 relies on it);
  A2's "exactly the sibling's sets and behaviors" predates the marked D2 swatch-voice deviation.

## Finish checklist

- [x] both specs complete (16 sections, no `[NEEDS CLARIFICATION]`)
- [x] both independently verified + cross-spec consistency re-reviewed
- [x] ticket 11 Answer updated + status resolved
- [x] map.md Decisions updated (29 of 38)
- [x] commit: see git log (committed with this file)
