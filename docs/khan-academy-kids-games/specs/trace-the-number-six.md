# Trace the number six

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`trace-the-number-six.md`](../trace-the-number-six.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games)
- **Spec status:** v1 — follows template v1; pending blind-build test
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch (pointer), mouse, and keyboard; sound on

## 1. Overview and learning objective

The player traces big numerals with a finger or pointer: a pulsing green start dot and a direction arrow show where to begin and which way to go, ink follows the finger, and each finished stroke snaps solid with a chime. The skill is **numeral formation and number recognition**, matching the official rationale ("Tracing numerals helps kids memorize their shape"). Age band: **4–6 (Kindergarten per the official blog)**. Expected session: **4–8 minutes** for all nine numerals, or one to two numerals per sitting.

## 2. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | The activity is tracing the numeral six | official | Blog heading "Trace the number six" |
| O2 | Purpose is memorizing numeral shape | official | Blog: "Tracing numerals helps kids memorize their shape" |
| O3 | Positioned for Kindergarten math | official | Blog post "Free Kindergarten Math Games" |
| O4 | Subject is number recognition and numeral writing | official | Catalogued entry, sourced from the same blog listing |
| D1 | Numerals 1–9 in order; six is level 6 and the title emblem | designed | One numeral gives no progression; "their shape" generalizes, and six keeps the entry's identity |
| D2 | Three guide-fading tries per numeral (Follow → Fade → Solo) | designed | Repetition plus fading makes memorization observable |
| D3 | Stroke paths, start dot, arrows, demo dot, tolerances | designed | No official stroke data exists; needed for buildability |
| D4 | Non-punishing redirection; no timers, score, or fail state | designed | Never punishing for ages 2–8 (template rule) |
| D5 | Local save; levels unlock in order | designed | Session continuity without accounts |
| D6 | Layout, palette, audio, praise copy, keyboard auto-trace | designed | Buildability invention |

## 3. Player experience / core loop

A child presses Play. A big outlined numeral appears; its green start dot pulses and a demo dot travels the path once while a voice says "Trace the number six." The child drags a finger along the outline; orange ink follows and soft ticks mark progress. At the last checkpoint the stroke snaps solid with a chime. Over three tries the guide fades (40% → 22% → dashed 10%). Confetti and a chime celebrate: "You traced the number six!" Then numeral seven appears; a later session resumes where the child left off.

**Core loop:** anchor dot → drag along the path → stroke locks with a chime → guide fades over 3 tries → celebration → next numeral.

## 4. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with one Play target (≥96 CSS px); the numeral-six emblem doubles as the reset control (FR-016).
- **FR-002** When Play is pressed, the game shall start at the highest unlocked level, pass 1, and speak the numeral's name (first load: level 1, numeral 1).
- **FR-003** While tracing, the game shall show the ghost numeral (36 px round-capped stroke through the path data, opacity per pass, section 7), the current anchor (22 px start dot pulsing every 1.2 s, or the continue-point after a lift), 3 pass dots (top center), pass arrows, and HOME (≥64×64).
- **FR-004** A pointer-down within 96 px of the current start dot restarts that stroke at checkpoint 0; within 96 px of the furthest reached checkpoint it resumes there; elsewhere begins nothing (empty tap).
- **FR-005** While the pointer is within 56 CSS px of the stroke polyline, ink follows it and checkpoints within 56 px mark reached in path order; the furthest reached checkpoint never regresses.
- **FR-006** When the furthest checkpoint is the stroke's last, the stroke locks (snap-fill 200 ms, sparkle ≤20 particles, `sfx_chime_short`) even while the pointer is down; the next stroke begins on a new pointer-down at its start dot.
- **FR-007** When all strokes of a pass lock, the pass advances (guide fades per section 7), and "Now try it yourself!" plays entering pass 3; after pass 3 the game enters celebration.
- **FR-008** When celebration ends (2.5 s), the next level starts automatically; after level 9 the completion screen appears instead.
- **FR-009** The game shall have no fail state, no score, and no game timer: off-path motion, idling, mis-taps, and restarts never remove reached checkpoints, end a pass, or block progress.
- **FR-010** When the pointer stays >56 px from the stroke for ≥600 ms, the ink dims and a back-arrow shows at the furthest checkpoint; after 2.0 s continuously off-path "Follow the arrow." plays at most once per 8 s; no progress is lost.
- **FR-011** When the pointer lifts, leaves the canvas, or is cancelled mid-stroke, the stroke keeps its furthest checkpoint; resume follows FR-004; pointer-down on a wrong anchor shows the hint arrow and changes nothing.
- **FR-012** Backwards motion along the path is allowed and never reduces progress; when the pointer moves ≥120 px backwards (arc length) for ≥500 ms, the forward cue shows at the furthest checkpoint (no audio penalty).
- **FR-013** Multi-touch: the earliest touch-down owns the trace; other simultaneous contacts are ignored (no ink, no audio, no progress) until the owner lifts, after which the earliest still-down contact may take over; on a timestamp tie the leftmost contact wins.
- **FR-014** Edge cases: a double-tap on the start dot restarts the stroke (a second restart within 400 ms is a no-op); rapid empty-space taps follow FR-004 each time; tapping locked ink changes nothing; resize/rotation reflows but preserves level, pass, stroke, and furthest checkpoint.
- **FR-015** When no pointer input occurs for 15 s during tracing, the demo replays from the current anchor (start dot at furthest 0, else the furthest checkpoint) with "Start at the green dot and follow the arrow.", repeating every 15 s; any pointer event resets the timer. (v1)
- **FR-016** When the title emblem is held 3 s, a visible progress ring fills for the hold; completion clears the save and in-memory progress, pulses the emblem 1.1× for 400 ms, and plays `sfx_soft_tap`; holding Enter/Space on the focused emblem behaves identically. (v1)
- **FR-017** HOME shall work in every state, cancelling the 2.5 s celebration timer and any idle timer, saving first, and returning to the title. (v1)
- **FR-018** Instructions and feedback shall need no reading: audio plus pictograms (dot, arrows, ticks, pass dots); visible text is limited to numerals, and every interactive element carries an invisible accessible name — the no-text rule governs visible text only. (v1)

## 5. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with paper background | initial; preload assets; no interactive elements |
| `title` | numeral-six emblem + Play target | audio unlocks on the first gesture here |
| `tracing(level, pass, strokeIndex, furthest)` | ghost numeral + guides + HOME | main state; pass 1–3, stroke 0–1, furthest checkpoint |
| `celebrating(level)` | frozen numeral + confetti + filled pass dots | auto-exits after 2.5 s |
| `complete` | trophy + nine numeral stamps + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | silent start (R-005) |
| `title` | `PLAY_PRESSED` | — | `tracing(highestUnlocked, 1, 0, 0)` | entry: speak numeral name; layout level |
| `title` | `RESET_HOLD` | hold 3 s on emblem | `title` | fill ring; clear save + memory; pulse + `sfx_soft_tap` |
| `tracing` | `ANCHOR_DOWN` | within 96 px of anchor | `tracing` | FR-004 restart/resume; `sfx_soft_tap` |
| `tracing` | `CHECKPOINT_REACHED` | within 56 px, in order | `tracing` | FR-005; `sfx_tick` every 4th checkpoint |
| `tracing` | `STROKE_LOCKED` | strokes or passes remain | `tracing` | FR-006; then FR-007 fade |
| `tracing` | `OFF_PATH` | ≥600 ms outside corridor | `tracing` | FR-010 dim + cue |
| `tracing` | `IDLE_15S` | no pointer input 15 s | `tracing` | FR-015 hint |
| `tracing` | `PASS_COMPLETE` | pass < 3 | `tracing(pass+1, 0, 0)` | guide fade; `vo_fade` entering pass 3 |
| `tracing` | `PASS_COMPLETE` | pass = 3 | `celebrating(level)` | FR-008 confetti + `vo_praise_N`; save |
| `tracing` | `HOME_PRESSED` | — | `title` | cancel idle timer; save |
| `celebrating` | `CELEBRATION_DONE` | level < 9 | `tracing(level+1, 1, 0, 0)` | layout next level; speak numeral |
| `celebrating` | `CELEBRATION_DONE` | level = 9 | `complete` | save |
| `celebrating` | `HOME_PRESSED` | — | `title` | cancel 2.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | — | `tracing(1, 1, 0, 0)` | fresh run; progress kept |
| `complete` | `HOME_PRESSED` | — | `title` | save |

**Tab order per state (v1):** `loading` none; `title` emblem → Play; `tracing` HOME → start/continue anchor (one focus target for the current stroke; Enter/Space auto-traces it in 600 ms with FR-006 feedback); `celebrating` HOME; `complete` HOME → Replay.

## 6. Input and interaction

- **Primary input:** single-pointer drag along the stroke path (touch, mouse, or pen).
- **Targets:** Play ≥96×96 CSS px; HOME ≥64×64 at top-left with a 24 px margin; anchor activation radius 96 px (22 px visual core) — all above the 44 px platform minimum.
- **Tolerance (numeric):** on-path while within **56 CSS px** of the stroke polyline; checkpoints mark reached within **56 px**. Mis-tap: a pointer-down >96 px from both anchors begins nothing; a point within 96 px of both prefers the continue-point (further ahead) over restart.
- **Drag alternative:** keyboard users Tab to the anchor and press Enter/Space to auto-trace the current stroke in 600 ms with identical feedback (accessibility affordance, not the learning path).
- **Multi-touch:** FR-013 (earliest contact owns; others ignored; leftmost on a timestamp tie).
- **Instructions without reading:** spoken voice plus pictograms (pulsing dot, arrows, ticking ink); accessible names are invisible and add no visible text.
- **Accessible names (invisible):** Play "Play"; HOME "Home"; emblem "Reset progress, hold three seconds"; anchor "Trace the number six, stroke 1, start dot" or "Continue stroke 1 at checkpoint 7".
- **Focus indicator:** 4 px outline, contrast ≥3:1. **Viewport:** design space 1024×768 letterboxed; landscape ≥900 px wide, portrait <900 px.

## 7. Levels and content data

| Pass | Ghost opacity | Demo on entry | Direction arrows | Idle hint |
|---|---|---|---|---|
| 1 Follow | 40% | yes, once (2.5 s) | at first, middle, last waypoint | demo replay |
| 2 Fade | 22% | no | at first and last waypoint | demo replay |
| 3 Solo | 10% dashed | no | none (start dot only) | ghost raises to 40% + demo |

Waypoints are normalized (x right, y down, 0–100) inside the numeral box, joined by smooth round-capped curves; **waypoints are the checkpoints**. Every numeral takes 3 passes; completion always advances to the next level.

| Level | Numeral | Strokes | Waypoints (checkpoints) per stroke |
|---|---|---|---|
| 1 | 1 | 1 | (32,26) (50,8) (50,55) (50,100) |
| 2 | 2 | 1 | (16,26) (36,8) (64,8) (80,28) (58,52) (36,74) (18,100) (82,100) |
| 3 | 3 | 1 | (20,22) (44,8) (68,16) (72,34) (52,46) (74,56) (78,76) (56,94) (28,88) |
| 4 | 4 | 2 | stroke 1: (58,8) (16,64) (86,64); stroke 2: (68,12) (68,100) |
| 5 | 5 | 2 | stroke 1: (80,10) (30,10) (26,46); stroke 2: (26,46) (50,38) (74,48) (82,66) (70,88) (44,96) (22,88) |
| 6 | 6 | 1 | (68,8) (46,18) (30,40) (28,62) (36,80) (50,92) (66,88) (73,72) (65,58) (49,53) (38,60) (36,74) |
| 7 | 7 | 1 | (16,10) (84,10) (58,54) (34,100) |
| 8 | 8 | 2 | stroke 1: (50,8) (70,16) (74,32) (58,44) (40,42) (28,28) (36,12) (50,8); stroke 2: (50,46) (72,54) (74,70) (58,84) (40,86) (28,72) (36,54) (50,46) |
| 9 | 9 | 1 | (68,14) (52,6) (38,14) (34,28) (42,40) (58,42) (68,30) (70,100) |

- **Layout mapping:** landscape 1024×768 — numeral box 340×460 at top-left (342,150), `x_px = 342 + 3.4·x`, `y_px = 150 + 4.6·y`; portrait 768×1024 — box 300×420 at (234,300), `x_px = 234 + 3.0·x`, `y_px = 300 + 4.2·y`; letterbox-scale the design space to the viewport.
- **Worked example — level 6 pass 1 (numeral six):** checkpoints in landscape screen px are 1 (573,187), 2 (498,233), 3 (444,334), 4 (437,435), 5 (464,518), 6 (512,573), 7 (566,555), 8 (590,481), 9 (563,417), 10 (509,394), 11 (471,426), 12 (464,490); the demo dot travels 1→12 in 2.5 s. The child touches within 96 px of 1; ink follows while within 56 px of the curve. If they lift after 7, the stroke keeps 1–7; a touch within 96 px of 8 resumes. Reaching 12 locks the stroke. Three passes later: confetti, "You traced the number six!", then level 7 after 2.5 s.
- **Progression:** fixed and deterministic, completion-gated by pass 3. No timer, no score, no adaptive difficulty, no randomness anywhere.

## 8. Feedback, rewards, and audio cues

| Event | Visual | Audio |
|---|---|---|
| Level start | ghost numeral appears; start dot pulses | `vo_number_N` at 0.9 |
| Anchor touched | dot contracts 0.85× for 120 ms; ink begins | `sfx_soft_tap` at 0.4 |
| Checkpoint reached | ink extends; checkpoint flashes 200 ms | `sfx_tick` at 0.25 every 4th checkpoint |
| Stroke locked | snap-fill 200 ms; sparkle ≤20 particles | `sfx_chime_short` at 0.6 |
| Off-path ≥600 ms | ink dims to 25% opacity; back-arrow at furthest checkpoint | `sfx_boop` at 0.3; after 2.0 s `vo_redirect` at 0.9 (≤1 per 8 s) |
| Backwards ≥120 px / ≥500 ms | forward cue at furthest checkpoint | none |
| Pass complete | guide fades to next pass; ≤24 confetti particles | `sfx_chime_short` at 0.6; `vo_fade` entering pass 3 |
| Level complete | pass dots full; ≤40 confetti particles | `sfx_chime` at 0.7 + `vo_praise_N` at 0.9 |
| Game complete | trophy + numeral stamps 1–9 + one confetti burst | `sfx_chime` at 0.7 + `vo_complete` at 0.9 |
| Idle 15 s | demo replays from current anchor | `vo_instruction` at 0.9 |
| HOME / Play / Replay | button depresses 80 ms | `sfx_tap` at 0.5 |

Copy: `vo_praise_N` "You traced the number *N*!"; `vo_number_N` "one"…"nine"; `vo_instruction` "Start at the green dot and follow the arrow."; `vo_redirect` "Follow the arrow."; `vo_fade` "Now try it yourself!"; `vo_complete` "You traced numbers one to nine!" Timbre, language, and TTS engine are build freedom within this copy.

Effects (v1): *pulse* = ring 1.0→1.25→1.0 over 1.2 s, repeats; *demo* = 24 px dot with 60% tail travels start→end in 2.5 s; *ink* = 28 px round-capped polyline from checkpoint 0 to the pointer; *snap-fill* = locked stroke redraws at full opacity over 200 ms; *sparkle* = ≤20 32 px stars, 400 ms; *confetti* = ≤40 24×24 px rectangles falling 1.5 s; *ring fill* = 6 px circle stroke sweeps 0→360° over the 3 s hold.

Audio rules (v1): no audio before the first user gesture (R-005); a new voice clip cancels the previous utterance; missing APIs degrade gracefully — no speech synthesis → visual-only cues (arrow + demo), no AudioContext → silent, storage blocked → run unsaved. Background-tab timer throttling may delay idle hints and the 2.5 s celebration exit, never losing progress.

## 9. Progress and persistence

- **Storage class:** browser local storage; no network, no accounts.
- **Key and shape:** `spec.traceSix.v1` = `{ "highestUnlocked": 1-9, "completedLevels": 0-9, "updatedAt": "<ISO-8601>" }`.
- **Save points:** level completion and HOME pressed; `updatedAt` refreshes on every save.
- **Restore:** Play resumes at `highestUnlocked`, pass 1; mid-level pass/stroke state is deliberately not persisted.
- **Reset:** hold the title emblem 3 s (ring fills) or hold Enter/Space on it → clears the key and in-memory progress.
- **Deliberately not stored:** per-checkpoint progress, timings, audio settings, anything identifying. One key only; no shared kernel.

## 10. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable where the row says so. Audio volumes are numeric (v1).

| Key | Type | Description / generation guidance | Size / format | Behavior | Volume | Stub policy |
|---|---|---|---|---|---|---|
| `bg_paper` | image | soft paper backdrop, subtle grid dots | 1024×768 SVG | static | — | SVG gradient + dots |
| `dot_start` | image | green start dot, ring + core `#3FBF6F` | 88×88 SVG | static | — | SVG circles |
| `arrow_dir` | image | rounded direction arrow, ink-colored | 64×64 SVG | static | — | SVG path |
| `sparkle` | image | 4-point star particle | 32×32 SVG | one-shot ≤20 | — | SVG star |
| `trophy` | image | simple cup, rounded linework | 160×160 SVG | static | — | SVG path |
| `sfx_soft_tap`, `sfx_tick`, `sfx_chime_short`, `sfx_chime`, `sfx_boop`, `sfx_tap` | audio | muted blip 0.10 s; soft tick 0.05 s; two-note chime 0.40 s; three-note chime 0.80 s; low boop 0.12 s; UI click 0.08 s | 0.05–0.80 s each | one-shot | 0.4, 0.25, 0.6, 0.7, 0.3, 0.5 | WebAudio blips/arpeggios |
| `vo_instruction`, `vo_redirect`, `vo_fade`, `vo_complete` | audio | spoken prompts; copy in section 8 | ≤3 s each | one-shot | 0.9 | TTS allowed |
| `vo_number_1..9`, `vo_praise_1..9` | audio | spoken numerals; spoken praise; copy in section 8 | ≤1–2 s | one-shot | 0.9 | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop | 0.15 | may be omitted |

- **Palette:** background `#EAF3FB`, ink `#2B4A6F`, trace accent `#FF8A3D`, success `#5FBF6F`, guide `#A8C4DD`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); UI numerals ≥40 px; the traced numeral is a stroked path, not glyph text.
- **Load failure:** missing visual asset → draw stub shape and keep playing; missing audio → continue silently (R-010).

## 11. State and data shapes

```
NumeralPath = { numeral: "1".."9", strokes: Stroke[] }
Stroke      = { waypoints: [x: 0-100, y: 0-100][], start: [x, y], checkpoints: [x, y][] }
            // waypoints ARE the checkpoints; start = waypoints[0]
Runtime     = { level: 1-9, pass: 1-3, strokeIndex: 0-1, furthest: 0..n, locked: boolean[] }
SaveObject  = { highestUnlocked: 1-9, completedLevels: 0-9, updatedAt: "<ISO-8601>" }
```

## 12. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector paths with round caps/joins, smooth curves through waypoints, and large numerals.
- **R-002** The game shall track a single pointer through move events (coalesced events where available) and ignore extra simultaneous contacts (FR-013).
- **R-003** The game shall support keyboard focus and activation for every interactive target.
- **R-004** The game shall play concurrent one-shot audio clips and may loop one music track at volume 0.15.
- **R-005** When the browser blocks audio before a user gesture, the game shall defer audio until the first interaction (Play) and shall not require sound to proceed.
- **R-006** The game shall persist and restore one small JSON save object in browser local storage.
- **R-007** The game shall run offline with no network requests after initial load.
- **R-008** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-009** The game shall provide hit targets ≥64 CSS px and focus indicators ≥4 px with ≥3:1 contrast.
- **R-010** When speech synthesis or audio fails, the game shall continue with visual cues only.
- **R-011** The game shall scale from 768×1024 to 1366×768 without losing state.
- **R-012** The game shall expose an invisible accessible name on every interactive element.
- **R-013** The game shall produce identical layouts, paths, and sequences on every run (no randomness).

## 13. Acceptance criteria

- **AC-01** Given a first load, When assets finish, Then the title shows a Play target and the six emblem with no audio before the first gesture; When Play is pressed, Then level 1 (numeral 1, pass 1) appears with a pulsing start dot and "one" is spoken.
- **AC-02** Given level 1 pass 1, When the start dot is touched and dragged to the last checkpoint, Then the stroke snaps solid within 200 ms with a chime and a sparkle.
- **AC-03** Given checkpoints 1–7 reached, When the pointer lifts and a new pointer goes down within 96 px of checkpoint 8, Then tracing resumes at 8 with 1–7 preserved.
- **AC-04** Given an active stroke, When the pointer stays >56 px away for ≥600 ms, Then the ink dims and a back-arrow shows at the furthest checkpoint, with no progress lost.
- **AC-05** Given an active stroke, When the pointer moves ≥120 px backwards for ≥500 ms, Then the forward cue appears and reached checkpoints remain.
- **AC-06** Given two simultaneous contacts, When they land together, Then only the earliest touch-down draws ink and the other changes nothing (leftmost on a timestamp tie).
- **AC-07** Given level 1 pass 1 completed, When the pass advances, Then the ghost is dimmer (22%), and on entering pass 3 it is dashed (10%) with "Now try it yourself!" spoken.
- **AC-08** Given level 1 pass 3 completed, When celebration ends, Then level 2 appears after 2.5 s and progress is saved.
- **AC-09** Given level 6 (numeral six), When all strokes lock, Then "You traced the number six!" plays with confetti ≤40 particles.
- **AC-10** Given level 9 completion, When celebration ends, Then the completion screen appears with the trophy and nine numeral stamps.
- **AC-11** Given saved progress (e.g. `highestUnlocked` 6), When the page reloads and Play is pressed, Then level 6 pass 1 starts.
- **AC-12** Given 15 s with no pointer input during tracing, When idleness continues, Then the demo replays from the current anchor and "Start at the green dot and follow the arrow." is spoken.
- **AC-13** Given keyboard focus on the anchor, When Enter/Space is pressed, Then the stroke completes with the same snap, sparkle, and chime as a drag.
- **AC-14** Given celebration is playing, When HOME is pressed, Then the 2.5 s timer is cancelled, progress is saved, and the title screen appears.
- **AC-15** Given the title screen, When the emblem is held 3 s, Then a ring fills during the hold and the save is cleared on completion; the Enter/Space hold behaves identically.
- **AC-16** Given traced numerals, When the screen is inspected, Then the only visible text is numerals and every interactive element has an invisible accessible name.

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One numeral traces end-to-end: ink follows, checkpoints mark, strokes snap, celebration plays, next numeral appears.
3. All nine numerals run; each pass fades the guide; progress survives a reload.
4. No fail state exists; every edge case in FR-014 behaves as specified.
5. Runs offline in a browser at 768×1024 and 1366×768 without losing state.

## 14. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Numerals 1–9, one per level, six at level 6 | designed — entry names six; sequence invented for progression (D1) |
| A2 | Stroke waypoints (section 7) | designed — no official stroke data exists |
| A3 | 56 px corridor and 96 px anchor radii suit ages 2–8 | assumption — generous by design; may widen, never narrow, without a spec revision |
| A4 | TTS-generated voice clips are acceptable for the pilot | designed |
| A5 | Browsers block autoplay until the first gesture | platform fact; handled by R-005 |
| A6 | Background-tab timers may be throttled; idle hints and celebration exits fire late, never losing progress | known platform behavior (v1) |
| A7 | iOS Safari may require a gesture to start speech synthesis; Play provides it | known platform behavior (v1) |
| A8 | Keyboard auto-trace is an accessibility accommodation, not the intended learning modality | designed (section 6) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 15. Out of scope / build freedom

- **Fixed:** numeral sequence and waypoints, checkpoint counts, pass fading, tolerances and radii, no fail state, hit-target minimums, save key and shape, asset provenance, acceptance criteria.
- **Free:** easing curves, particle specifics, curve smoothing through waypoints, voice timbre/TTS engine, optional music, whether Play shows a glyph or the word, backdrop detail.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, handwriting quality scoring, letter tracing (separate entry), free-draw mode.
