# Write specs: Seasonal collections

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete specs (template v1) for: Camp Khan Kids, Earth Day collection, Halloween
collection, Winter and holiday collections.

## Notes

- All four become collection-browser interactive players over their officially documented
  contents.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Four specs written at template v1 from a shared brief
(`research/seasonal-collections-shared-brief.md`; the collection-browser shape, shared numbers,
save shape, and per-entry item plans pinned once for the family), each independently verified by a
fresh-context verifier:

- `specs/camp-khan-kids.md` (368 lines) — 26 FRs, 15 Rs, 30 ACs; 4 weekly-theme shelves × 4 items
  (3 in-app activities + 1 screen-free), 16 items; original camp name and frame ("Khan" nowhere on
  screen or in audio).
- `specs/earth-day-collection.md` (342 lines) — 28 FRs, 15 Rs, 32 ACs; 3 stations (videos,
  coloring, books) × 4 items, 12 items; the printable-coloring feature is realized as on-screen
  samples (no file affordance; marked designed, browser scope).
- `specs/halloween-collection.md` (406 lines) — 25 FRs, 15 Rs, 29 ACs; 5 shelves × 4 items, 20
  items spanning books, videos, songs, lessons, coloring, matching, and scene-creation previews
  (samples only; never another spec's game).
- `specs/winter-and-holiday-collections.md` (355 lines) — 26 FRs, 14 Rs, 29 ACs; 6 shelves × 4
  items, 24 items covering Winter, Kindness Month, Valentine's, National Reading Month, plus
  Recommended Reads and winter-sports shelves.

Verification: all four independently verified (7 / 9 / 7 / 14 defects fixed per spec — layout
overflows, effect-list violations, save-point and transition-table contradictions, IP wording).
Two cross-file rulings were applied and passed by a scoped re-review: the saved-shelf resume cue
is the defined `soft pulse` (400 ms) beginning when the 1200 ms reveal completes; the completion
panel dismisses on Replay/card tap (winter aligned to the other three). Deferred minors: camp's
replay-during-confetti edge; earth-day's inherited content-stack figure; halloween's implicit grid
fade; winter's qualitative prev/next placement.

No `[NEEDS CLARIFICATION]` items remain. **All 38 documented entries now have specs** (the running
"X of 38" counts had excluded the pilot; 37 + pilot = 38). The wayfinder's remaining tickets are
14 (requirements digest) and 15 (engine/stack decision).
