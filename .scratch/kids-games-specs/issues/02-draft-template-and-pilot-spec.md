# Draft the spec template and write the pilot spec

Type: prototype
Status: resolved
Blocked by: 01

## Question

What should a game spec contain so that a fresh-context LLM can build the game from it — and does
that structure hold up when applied to a real entry?

Deliverable: the draft spec template plus a complete pilot spec for **Count and tap the ice cream
cones**, covering at least: overview and learning objective, mechanics, screens/states, input,
level progression, feedback and audio cues, original assets list, progress/data behavior,
engine-agnostic `Requirements`, acceptance criteria, and official-vs-designed labeling.

## Notes

- Consume the findings from `Survey spec conventions for LLM-buildable game specs`.
- Spec file location: `docs/khan-academy-kids-games/specs/count-the-ice-cream-cones.md`; template
  file location: `docs/khan-academy-kids-games/spec-template.md` (proposals — adjust on review).
- HITL: the human reviews the template and pilot spec before the blind build.

## Answer

Delivered and approved (2026-09-20):

- `docs/khan-academy-kids-games/spec-template.md` — v0 draft, 16 sections plus fidelity rules,
  implementing the research findings (FR-xxx rules, state × event table, level parameter table,
  feedback/audio map, assets manifest with stub policy, EARS-style requirements, Given/When/Then
  acceptance criteria, assumptions, build freedom).
- `docs/khan-academy-kids-games/specs/count-the-ice-cream-cones.md` — completed pilot spec,
  254 lines: 12 functional requirements, state table, 8 deterministic levels (counts 1–8, tap-order
  numbering), 12 engine-agnostic requirements, 14-row asset manifest (original assets; WebAudio/TTS
  stubs allowed), 12 acceptance criteria, blind-build checklist.
- Key designed choices approved: tap-order counting, re-tap replays without penalty, no fail state,
  12 s idle hint, localStorage save `spec.iceCream.v1`.

Blind build (ticket 03) may proceed: fresh context, spec alone, report gaps; do not patch the spec
mid-test.
