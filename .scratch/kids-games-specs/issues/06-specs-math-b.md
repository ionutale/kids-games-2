# Write specs: Math batch B

Type: task
Status: resolved
Blocked by: 04

## Question

Write complete game specs (template v1) for: Tap the jar with more fruit, Make smoothies by
adding, Tap the triangles, Fill in the pattern.

## Notes

- Sources of official behavior: `docs/khan-academy-kids-games/*.md` and
  `docs/khan-academy-kids-games.md`; designed extensions must be marked as designed.
- Output: `docs/khan-academy-kids-games/specs/<entry-slug>.md`.

## Answer

Resolved 2026-09-20. Four specs written at template v1 (one writer per spec, then each independently
verified by a fresh-context verifier against the template's checklist):

- `specs/jar-with-more-fruit.md` (280 lines) — 14 FRs, 14 Rs, 20 ACs; two jars of oranges, three
  designed modes scaffolding count → compare → compare numerals; max count 9 over ten rounds.
- `specs/smoothie-addition.md` (278 lines) — 17 FRs, 15 Rs, 19 ACs; drag (or tap-to-place) fruit
  into a blender; original generic bear helper; 8 recipe levels, sums 2–6.
- `specs/tap-the-triangles.md` (314 lines) — 14 FRs, 14 Rs, 23 ACs; find 1–3 triangles among
  distractors in a toy chest; rotation counts at 30° steps; 8 levels.
- `specs/fill-in-the-pattern.md` (303 lines) — 15 FRs, 14 Rs, 22 ACs; pattern rows with one blank
  and an option tray; deterministic generation rules; 8 levels across AB/AAB/ABB/ABC patterns.

Verification: all 16 sections present in each; official claims quote-checked against the live blog
(two fabricated quotes found and fixed); verifiers fixed missing AC coverage, undefined effects,
effect-duration conflicts, and level-table inconsistencies; no `[NEEDS CLARIFICATION]` items remain.
7 of 38 specs done (pilot + Math batch A + these four); spec-writing tickets 07–13 remain.
