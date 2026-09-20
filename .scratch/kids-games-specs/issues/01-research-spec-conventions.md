# Survey spec conventions for LLM-buildable game specs

Type: research
Status: resolved
Blocked by: —

## Question

What section structure and fidelity make a game spec reliably implementable by an LLM from the
spec alone (no extra context)? Survey existing conventions: game design documents, testable
acceptance criteria, interaction state machines, level/content data schemas, asset manifests,
accessibility notes, and any emerging "spec for code generation" practice. Deliver a recommended
section list for our spec template, with sources; distinguish primary practice from opinion.

## Notes

- Findings file: `.scratch/kids-games-specs/research/llm-buildable-spec-conventions.md` (not a git
  repo, so no research branch).
- Feeds the prototype ticket `Draft the spec template and write the pilot spec`.

## Answer

Recommended template sections (findings:
[research/llm-buildable-spec-conventions.md](../research/llm-buildable-spec-conventions.md)):

1. Front matter + overview and learning objective (type, source link, status, skill, age band,
   session length).
2. Official vs designed provenance, claim-level, applied throughout.
3. Mechanics and rules as numbered `FR-xxx` requirements with edge cases; screens/states as a
   state inventory plus a state × event transition table with guards/actions.
4. Input and interaction (tap targets ≥44 CSS px, drag alternatives, no-reading audio+icon
   instructions) and a feedback/audio cue map.
5. Levels/content as parameter tables with progression rules and determinism; minimal progress
   storage schema with reset behavior.
6. Assets manifest with stable keys, type, generation guidance, size/duration, loop/one-shot, and
   a stub policy.
7. Engine-agnostic `Requirements` (EARS-style "When… the game shall…") feeding the stack decision.
8. Acceptance criteria as observable Given/When/Then scenarios plus a blind-build checklist.
9. Assumptions/open questions (`[NEEDS CLARIFICATION]`, never silent invention) and an
   out-of-scope/build-freedom section.

Caveats: no child-specific numeric touch-size standard; asset-manifest and educational
level-schema guidance is synthesis, not standard; the blind build (ticket 03) is the real test of
the format.
