# Write specs: Logic+, home, offline

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete specs (template v1) for: Matching games, Memory games (both need one designed
representative game each, since Khan Academy names none), Character rooms and collections,
Offline library ("Kodi's Suitcase").

## Notes

- Character rooms and the offline library are feature-level; spec them as interactive players
  around their officially documented behavior.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Four specs written at template v1:

- `specs/matching-games.md` (392 lines) — 17 FRs, 16 Rs, 29 ACs; Logic+ representative face-up
  pair-matching game (designed: official sources name no individual matching game): 8 levels of
  fixed decks/slot orders across the Preschool–2nd Grade band, no fail state.
- `specs/memory-games.md` (443 lines) — 19 FRs, 16 Rs, 32 ACs; Logic+ representative face-down
  concentration game (designed): study phase, flip/mismatch flip-back, 8 levels, no fail; reuses
  the matching sibling's card conventions.
- `specs/character-rooms-and-collections.md` (356 lines) — 24 FRs, 14 Rs, 31 ACs; feature-level
  player: five original characters replace the Khan Academy cast (Tuck, Momo, Fern, Bo, Zuzu),
  each room has a toy interaction and a 6-item collection (30 items total), earned in-spec by
  completing play interactions (designed; cross-app earning is out of scope).
- `specs/offline-library-kodis-suitcase.md` (366 lines) — 26 FRs, 15 Rs, 29 ACs; feature-level
  player: an original guide and suitcase browsing 30 offline items across the documented types
  (alphabet tracing, books, sight-word spelling, numbers, math games), with per-band compact-fit
  layouts.

Verification: all four independently verified by fresh-context verifiers (matching 6 fixes,
memory 12, character rooms 12, offline 12 — including grid/layout overflows, guard errors, missing
AC coverage, and IP quote-checks). A cross-file pass then found three remaining items — memory's
prompt card overflowing its narrow top bar, character rooms' unmarked all-state music and
unspecified pointer activation, and the offline compact-layout trigger never firing at 1024×480 —
all fixed by the writers and passed by scoped re-reviews. Deferred minors: matching's unused theme
labels; memory's screen-reader token exposure (documented as intentional); character rooms' AC-31
ordering; offline's below-480 best-effort note.

No `[NEEDS CLARIFICATION]` items remain. 33 of 38 specs done; ticket 13 remains.
