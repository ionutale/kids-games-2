# Logic+, home, offline (ticket 12) — progress ledger

Ticket: `.scratch/kids-games-specs/issues/12-specs-logic-home-offline.md`
Pattern: one writer per spec, independent verifier per spec (tickets 05–11 pattern). Matching and
memory games are both Logic+ card games, so the memory writer ran after the matching spec existed
and reused its card conventions.

## Status (2026-09-20) — all four written and verified

| Spec | Lines | FRs | Rs | ACs |
|---|---|---|---|---|
| matching-games | 392 | 17 | 16 | 29 |
| memory-games | 443 | 19 | 16 | 32 |
| character-rooms-and-collections | 356 | 24 | 14 | 31 |
| offline-library-kodis-suitcase | 366 | 26 | 15 | 29 |

## Verification

- matching-games — verified (FIXED: 6 items — stale audio cross-ref, idle-hint contradictions,
  narrow prompt card, missing ACs).
- memory-games — verified (FIXED: 12 items — study/peek timing guards, undefined effects,
  mislabelled ACs, missing edge-case ACs).
- character-rooms-and-collections — verified (FIXED: 12 items — over-claim, portrait tiers,
  undefined effects, missing ACs).
- offline-library-kodis-suitcase — verified (FIXED: 12 items — Tuck species alignment, glyph
  collisions, save shape, undefined effects, AC mappings).
- Cross-file fix round: memory prompt card narrow fit (mirrored matching's wording); character
  rooms music aligned to family title-only + explicit pointer activation; offline per-band
  compact-fit thresholds (720/472/384). Scoped re-reviews: **PASS** on all three, no new breakage.

## Deferred minors

- matching: §3 D3 theme labels unused by any table/asset; FR-011 halo continuation after input.
- memory: D12 screen-reader token exposure (documented intentional); idle peek force-flips a
  picked-up card; FR-010 resting-palm bullet has no dedicated AC.
- character rooms: AC-31 inserted out of numeric order; R-005 omits the optional music line.
- offline: below-480 best-effort sentence; §7 hit-area line doesn't mention compact sizes
  (implicitly resolved via FR-005/AC-29).

## Finish checklist

- [x] all 4 specs complete (16 sections, no `[NEEDS CLARIFICATION]`)
- [x] all 4 independently verified + cross-file re-reviews
- [x] ticket 12 Answer updated + status resolved
- [x] map.md Decisions updated (33 of 38)
- [x] commit: see git log (committed with this file)
