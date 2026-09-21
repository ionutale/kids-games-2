# Choose rendering engine, audio approach, and stack

Type: grilling
Status: resolved
Blocked by: 14

## Question

Given the platform requirements digest, choose: rendering approach (e.g., DOM/CSS vs canvas vs
game engine), audio approach, input handling, data/persistence, and how progress and leveling are
represented across games. Record the decision, the alternatives considered, and the trade-offs.

## Notes

- HITL: `/grilling`. The digest is the evidence base; do not choose before it exists.
- Also settle whether the fog items (conformance pass, cross-game leveling/progress unification)
  graduate into new tickets.

## Answer

Resolved 2026-09-21 via three grilling rounds (HITL) on the digest evidence
(`research/platform-requirements-digest.md`). Decision recorded at
`docs/khan-academy-kids-games/stack-decision.md`:

- **Rendering:** DOM + inline SVG + CSS/WAAPI; a canvas layer only for freehand ink (drawing,
  storytelling, tracing) — native focus/ARIA for the 38/38 accessibility baseline.
- **Audio:** Web Audio API (sfx, capped music, runtime melody, ducking, numeric mix) +
  `speechSynthesis` voices with word-boundary sync where specced and the fallback pacing; clip
  files optional.
- **Language/build:** vanilla ES modules, static files, no build step, no dependencies.
- **Input:** Pointer Events (+ coalesced events for ink) + Keyboard; per-spec arbitration.
- **Persistence:** per-spec versioned localStorage JSON as specced; IndexedDB only for
  storytelling audio blobs.
- **Progress:** per-spec models only; no cross-game state.
- **Packaging:** one self-contained `games/<slug>/` directory per game; no cross-game imports.
- **Scope:** per-game runtime only; the app shell stays out of scope.

Fog items: the **conformance pass** is folded into the stack doc as a spec↔stack mapping (no new
ticket, no spec amendments — nothing conflicts); **cross-game leveling/progress unification** is
resolved as per-spec keys only, revisit only if a shell is ever planned.

**The wayfinder's destination is reached:** all 38 documented entries have validated specs, the
pilot was built from its spec by a fresh-context agent, and the engine/stack decision is recorded.
