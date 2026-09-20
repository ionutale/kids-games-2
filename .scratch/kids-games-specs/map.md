# Map — Buildable game specs for Khan Academy Kids' documented entries

## Destination

A validated spec system: one LLM-buildable game spec per documented entry (all 38), plus the
pilot game actually built from its spec by a fresh-context agent, plus the engine/stack decision
informed by the specs' requirements.

## Notes

- **Tracker:** local markdown; map and child tickets under `.scratch/kids-games-specs/`.
  Frontier = open, unblocked, unclaimed tickets, lowest number first.
- **Settled while charting (grilling rounds 1–2):**
  - All 38 documented entries get specs.
  - Non-game entries (songs, videos, book modes, collections) become **interactive players**:
    media plus a minimal designed interaction; invented engagement is always marked as designed.
  - **Original assets and characters only** — nothing is copied from Khan Academy.
  - The stack is deliberately deferred: first the specs must describe how the games behave.
  - Buildability is proven by a **blind build test**, not by review alone.
  - No shared kernel/OS-style contracts.
- **Specs are engine-agnostic by design.** Every spec carries a `Requirements` section (rendering
  primitives, input, audio, data/progress behavior). The stack decision (ticket
  `Choose rendering engine, audio approach, and stack`) reads the aggregated requirements digest —
  it is downstream of the specs, not a prerequisite.
- **Pilot default:** Count and tap the ice cream cones (simplest real game — override here if you
  prefer another).
- **Provisional pilot platform:** browser-based, no build step. Provisional only; the final stack
  comes from the stack decision and does not retro-bind this pilot (see fog: conformance pass).
- **Spec location:** `docs/khan-academy-kids-games/specs/<entry-slug>.md` (proposal — change here
  if you prefer).
- **Vocabulary:** repo-root `CONTEXT.md`.
- **Official vs designed:** every spec must mark which behavior is officially documented (from the
  38 entry files in `docs/khan-academy-kids-games/`) and which is designed-in for buildability.
- **Skills per ticket:** `/research` for ticket 01; `/prototype` for ticket 02; `/grilling` +
  `/domain-modeling` for tickets 02, 04, and the stack decision.

## Decisions so far

- [Survey spec conventions for LLM-buildable game specs](issues/01-research-spec-conventions.md)
  — template should use numbered functional requirements, state × event transition tables,
  parameterized level tables, an assets manifest with stub policy, EARS-style engine-agnostic
  requirements, and Given/When/Then acceptance criteria; findings at
  [research/llm-buildable-spec-conventions.md](research/llm-buildable-spec-conventions.md).
  Caveats: touch-size and asset-manifest guidance is synthesis; blind build is the real test.
- [Draft the spec template and write the pilot spec](issues/02-draft-template-and-pilot-spec.md)
  — template v0 (`docs/khan-academy-kids-games/spec-template.md`) and the pilot spec
  (`specs/count-the-ice-cream-cones.md`) delivered, human-approved; blind build next.
- [Blind-build the pilot from its spec](issues/03-blind-build-pilot.md) — pilot built at
  `games/count-the-ice-cream-cones/`; all 12 acceptance criteria pass (live-tested by the builder,
  spot-checked independently); 27 spec gaps recorded for the template lock.
- [Lock spec template v1](issues/04-lock-template-v1.md) — all 27 gaps closed over two grilling
  rounds; template locked at v1 (21 blind-build rules) and the pilot spec patched to match
  (FR-013/014, tab order, HOME-in-celebration, R-013, AC-13/14). Spec-writing tickets unblocked.
- [Write specs: Math batch A](issues/05-specs-math-a.md) — `how-many-marbles.md` (294),
  `toy-chest-with-five-socks.md` (278), `trace-the-number-six.md` (247) written at v1 and verified;
  3 of 38 specs done (pilot + these three).
- [Write specs: Math batch B](issues/06-specs-math-b.md) — `jar-with-more-fruit.md` (280),
  `smoothie-addition.md` (278), `tap-the-triangles.md` (314), `fill-in-the-pattern.md` (303)
  written at v1, each independently verified (official quotes blog-checked, defects fixed);
  7 of 38 specs done.
- [Write specs: Books and reading modes](issues/07-specs-books-and-reading-modes.md) —
  `neat-as-nine.md` (326), `read-to-me.md` (324), `read-by-myself.md` (300) written at v1 as the
  first interactive-player specs (original sample books, highlight-sync and fallback pacing
  pinned), each independently verified; 10 of 38 specs done.

## Not yet specified

- **Conformance pass** — binding the finished specs to the chosen engine/stack; needed only if the
  stack decision picks conventions the specs don't already capture.
- **Cross-game leveling and progress unification** — per-game behavior is described in the specs,
  but whether a single cross-game path/mastery model is wanted depends on the stack decision.
- **Coverage beyond the 38 documented entries** — the app's other thousands of activities are
  undocumented; extending scope is a future effort.

## Out of scope

- **Building all 38 games** — this effort builds only the pilot; the destination is specs plus the
  engine decision.
- **The platform/app shell** — navigation UI, profiles, parental controls, offline packaging.
- **Reproducing Khan Academy characters, art, audio, or names** — original assets only.
