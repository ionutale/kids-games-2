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
- [Write specs: Letters and word videos](issues/08-specs-letters-and-word-videos.md) —
  `letter-tracing.md` (283), `ollos-alphabet-videos.md` (320), `sight-words-videos.md` (298)
  written at v1 and independently verified (tracing tolerances and clip/phase timings re-derived;
  original presenter only, no Ollo); 13 of 38 specs done.
- [Write specs: Songs and movement](issues/09-specs-songs-and-movement.md) —
  `head-shoulders-knees-and-toes.md` (308), `happy-and-you-know-it.md` (325), `baby-shark.md`
  (318), `yoga-and-movement-videos.md` (299), `mindfulness-videos-alo-yoga.md` (322) written at v1;
  four independently verified, Happy written by the orchestrator after subagent failures and
  hand-verified (faulty early-tap AC caught); 18 of 38 specs done.
- [Write specs: Book Basics series](issues/10-specs-book-basics.md) — nine specs written at v1
  from a shared brief (`research/book-basics-shared-brief.md`): `book-basics-book-cover.md` (327),
  `book-basics-parts-of-a-book.md` (374), `book-basics-how-to-read-a-book.md` (397),
  `book-basics-ask-while-you-read.md` (380), `book-basics-identifying-characters.md` (405),
  `book-basics-reading-accuracy.md` (366), `book-basics-illustrations.md` (339),
  `book-basics-fiction-and-nonfiction.md` (350), `book-basics-story-structure.md` (320); each
  independently verified (resume-branch, success-lock, and timing defects fixed); 27 of 38 specs
  done.
- [Write specs: Create tools](issues/11-specs-create-tools.md) — `drawing-and-coloring.md` (401)
  and `storytelling-and-voice-recording.md` (420) written at v1; sandbox tools sharing canvas,
  sticker, gallery, and export conventions (storytelling adds voice recording; audio in IndexedDB,
  marked designed); each independently verified and the cross-spec consistency re-reviewed;
  29 of 38 specs done.
- [Write specs: Logic+, home, offline](issues/12-specs-logic-home-offline.md) —
  `matching-games.md` (392), `memory-games.md` (443), `character-rooms-and-collections.md` (356),
  `offline-library-kodis-suitcase.md` (366) written at v1 (representative Logic+ games designed;
  feature-level players with an original cast replacing the Khan Academy characters); each
  independently verified, cross-file items fixed and re-reviewed; 33 of 38 specs done.
- [Write specs: Seasonal collections](issues/13-specs-seasonal-collections.md) —
  `camp-khan-kids.md` (368), `earth-day-collection.md` (342), `halloween-collection.md` (406),
  `winter-and-holiday-collections.md` (355) written at v1 from a shared brief
  (`research/seasonal-collections-shared-brief.md`); each independently verified, two cross-file
  rulings applied and re-reviewed; **all 38 documented entries now have specs**; tickets 14
  (requirements digest) and 15 (engine/stack decision) remain.
- [Extract platform requirements digest from all specs](issues/14-requirements-digest.md) —
  535 Requirements entries from all 38 specs clustered into rendering/input/audio/data/
  progression/performance/accessibility with a common-core vs one-off summary
  (`research/platform-requirements-digest.md`); independently verified and corrected (14 defects);
  ticket 15 (engine/stack decision) is unblocked.
- [Choose rendering engine, audio approach, and stack](issues/15-engine-and-stack-decision.md) —
  three grilling rounds on the digest settled: DOM + SVG (canvas only for freehand ink), Web Audio
  + `speechSynthesis`, vanilla ES modules with no build step, Pointer Events + keyboard, per-spec
  localStorage keys, one self-contained `games/<slug>/` per game, runtime-only scope; recorded at
  `docs/khan-academy-kids-games/stack-decision.md`; conformance pass folded into the doc,
  cross-game progress parked; **the wayfinder's destination is reached** (38 specs + pilot +
  stack decision).

## Not yet specified

- **Coverage beyond the 38 documented entries** — the app's other thousands of activities are
  undocumented; extending scope is a future effort.
- **The platform/app shell** — navigation, profiles, parental controls, and offline packaging stay
  out of scope; the stack decision covers the per-game runtime only.

Resolved during the stack decision: the **conformance pass** is folded into
`docs/khan-academy-kids-games/stack-decision.md` as a spec↔stack mapping (no ticket, no spec
amendments), and **cross-game leveling/progress unification** is settled as per-spec keys only
(revisit only if a shell is ever planned).

## Out of scope

- **Building all 38 games** — this effort builds only the pilot; the destination is specs plus the
  engine decision.
- **The platform/app shell** — navigation UI, profiles, parental controls, offline packaging.
- **Reproducing Khan Academy characters, art, audio, or names** — original assets only.
