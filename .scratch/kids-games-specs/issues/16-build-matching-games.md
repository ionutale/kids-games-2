# Build matching-games from its spec (post-wayfinder validation build)

Type: task
Status: resolved
Blocked by: —

## Question

Build `docs/khan-academy-kids-games/specs/matching-games.md` into a playable game under the stack
decision (`docs/khan-academy-kids-games/stack-decision.md`), blind: the builder works from the spec
and the stack doc alone, then an independent verifier live-tests the spec's acceptance criteria.

## Notes

- Output: `games/matching-games/` (self-contained per the packaging decision).
- Same discipline as the pilot blind build (ticket 03): the builder live-tests its own ACs; an
  independent spot-check follows; spec gaps are recorded.

## Answer

Resolved 2026-09-27. Build artifact (linked, not pasted): `games/matching-games/` — index.html,
styles.css, game.js (self-contained static game per the stack decision; no build step, no
dependencies; final revision sha256 styles.css `138d103b…edb8`, game.js `31e273e5…be67`).

**Result:** blind build by a fresh-context agent from the spec + stack doc alone reports 29/29 ACs
passing (build report §3). An independent verifier (fresh context, own harness, real input through
Chrome's input pipeline) reproduced **29/29 ACs and full stack conformance**, and found three
defects outside the AC matrix: D-1 Critical (the 3 s reset hold could fire mid-level and silently
wipe the save), D-2 High (a missed pointer release left all input dead until reload), D-3 Low (the
8-pip row shrank to 7.75 px below 480 px). A parallel static review independently found the same
Critical/High paths plus minors; both top findings were confirmed real in source before fixing.
All defects and the reviewer-recommended polish (M-1, M-2, M-3, M-5, M-10) were fixed in one round
(fix report) and re-verified on the fixed revision: the verifier's full original suite re-run
**73/73 (all 29 ACs)** with D-1/D-2/D-3 fixed and no regressions, a fresh spot-verifier's 8/8
regression ACs (AC-02/03/04/05/11/13/16/17), and the orchestrator's defect-repro checks
(D-1/D-2/D-3 + AC-12/19/21) — all pass, no new defects; the scoped source re-review verdicts every
finding addressed.

**Spec gaps / ambiguities recorded (no spec amendment; inputs for a future revision):**

1. Visible UI words: §14 allows "Play"/"Replay"; the build uses glyph-only controls with invisible
   accessible names.
2. `music_loop` (optional) omitted — no mute affordance is specced.
3. `card_slot` rendered in CSS instead of a 256×256 SVG (same visual; build freedom).
4. Level-8 celebration voice ambiguous (§9 rows for level complete vs game complete) — the build
   plays `vo_praise` at every celebration and `vo_complete` on the trophy; a level-8 row would
   remove the guesswork. [builder soft spot]
5. FR-011 title-hint rule mixes the autoplay reason with behaviour; after the first gesture the
   spec is silent — the build keeps the title hint silent forever. [builder soft spot]
6. Focus after a state change is unspecced — the build moves focus to the new state's first
   control (this is what makes the specced tab orders usable).
7. Hold-focus semantics (FR-016): "releasing early cancels the ring" is unconditional in the spec
   but focus changes mid-hold are unspecified; the fixed build cancels whenever the game leaves
   `title` and on any Enter/Space release while a hold is active.
8. Confetti "≤40 particles over 600 ms" read as all particles spawned at once with per-particle
   durations inside the window (60/900 for game complete).
9. Halo "3 s at 1 Hz" implemented as a 1000 ms animation × 3 iterations.
10. FR-010 rapid Play double-tap: the second press is classified in the new state (it can select a
    card under the finger) — the spec does not settle it.
11. A matched-card tap is a processed tap and updates the pick throttle — spec silent.
12. Pose mirroring and shadow flattening implementation details (about the 256 artboard centre;
    fills and strokes re-filled, interior detail dropped) — build freedom.
13. Audio unlocks on the first pointer/key input anywhere, not only on Play (FR-001 wording).
14. `speechSynthesis` cancel+speak in the same tick can drop the utterance in some browsers — the
    build queues via rAF with a sequence guard.
15. Background-tab throttling: wall-clock deadline scheduler + `visibilitychange` drain (R-013
    shape); expired timers fire exactly once on restore.
16. Storage availability probed by write+remove; any throw degrades to an in-memory run (R-007).
17. Check-badge placement and token colouring are decoration within the palette; shapes carry
    identity (build freedom).

**Not verified (same honest limits as the build):** audible output / TTS timbre (no audio device —
API calls instrumented instead), real screen-reader output (AX tree verified instead), physical
multi-touch hardware (Chrome's touch pipeline used), R-009 on a mid-range 2020 tablet (60 fps
measured on desktop headless), real background-tab throttling (`setPageVisibilityOverride`
unsupported; main-thread block simulated; the rev-2 pass did exercise a real tab switch for D-2),
other browser engines (Chrome 153 only). Deferred cosmetic: N-1 (the focus outline is square around
rounded cards — the spec only requires the 4 px outline and contrast).

Reports: `research/matching-games-build-report.md`,
`research/matching-games-verification-report.md` (revision-2 results in §9),
`research/matching-games-verification-rev2-spot.md`,
`research/matching-games-code-review.md` (addendum), `research/matching-games-fix-report.md`.
