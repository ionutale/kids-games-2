# Lock spec template v1

Type: grilling
Status: resolved
Blocked by: 03

## Question

Given the blind build's gap report, which template changes are required, and what exactly is
template v1? Resolve every ambiguity the blind build surfaced into either a template fix or an
explicit accepted risk. Declare v1 and record why each change was made.

## Notes

- HITL: `/grilling` + `/domain-modeling`.
- All spec-writing tickets are blocked on this decision.

## Answer

Resolved 2026-09-20 in two grilling rounds; all 27 blind-build gaps closed.

**Round 1 — 24 mechanical resolutions approved**, codified as template v1 rules:
- Numeric thresholds everywhere: viewport wrap (<96 px row slot; 4+3 / 4+4), mis-tap tolerance
  12 px nearest-cone-wins, re-tap voice volume 0.7 with no pop, confetti caps 40/level + 60
  completion, loading shown 2 frames.
- Transition-table completeness: tab order per state; any tap resets the idle timer; deterministic
  hint target (leftmost uncounted); Play resumes at `highestUnlocked`; save points at ALL_COUNTED /
  completion / HOME with `updatedAt` refreshed.
- Audio rules: none before first gesture (title sting dropped), voice clips interrupt prior
  utterance, graceful API degradation, background-tab throttling documented.
- Adopted unchanged: "Count" + pictogram title, reset clears save + memory, `nextCount` hidden,
  glyph-only Play, continuous celebration pulse, cone scaling, keyboard reset equivalent.

**Round 2 — three real decisions:**
1. HOME works in every state (celebrating included; cancels timer, saves first).
2. Invisible ARIA labels allowed and required; the no-text rule governs visible text only.
3. Reset hold shows a filling progress ring; shimmer + `sfx_soft_tap` on completion.

**Deliverables:**
- `docs/khan-academy-kids-games/spec-template.md` → **v1 locked**, 21 blind-build-derived rules.
- `docs/khan-academy-kids-games/specs/count-the-ice-cream-cones.md` → patched to v1: FR-013
  (reset ring), FR-014 (accessible names), tab-order note, celebrating+HOME transition, R-013,
  AC-13/14, audio rules, assumption A7.

Spec-writing tickets 05–13 are now unblocked.
