# Letter tracing

## 1. Front matter

- **Title:** Letter tracing (catalog name, kept for traceability only; the activity is untitled on screen)
- **Entry type:** Letters activity — full game-like guided letter-formation activity
- **Catalogued entry:** [`letter-tracing.md`](../letter-tracing.md) — Ollo's ABC tab, Tracing section
- **Official sources:** [Get ready for school](https://khankids.zendesk.com/hc/en-us/articles/360013113232-Get-ready-for-school-with-Khan-Academy-Kids), [Find books and lessons in the Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library), [App Store listing](https://apps.apple.com/us/app/khan-academy-kids/id1378467217)
- **Spec status:** v1 — follows template v1; pending blind-build test
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch (pointer), mouse, and keyboard; sound on; no network after load
- **Conditional sections:** 6 (screens and states), 11 (assets), and 12 (state and data shapes) included; none omitted
- **IP constraint:** all assets, glyph outlines, and voices are original; Ollo and every Khan Academy character are not reproduced. The activity has no presenter character by design — its guides are the pulsing start dot, direction arrows, and ticks

## 2. Overview and learning objective

A child traces big letter shapes with a finger or pointer: a pulsing green start dot and a direction arrow show where to begin and which way to go, orange ink follows the finger, and each finished stroke snaps solid with a chime. Completing a letter plays its name and its sound. The skill is **letter formation plus letter-name and letter-sound recognition**, matching the officially described Letters content ("lowercase letters, uppercase letters, letter sounds") for ages 3–5. Age band: **3–5 (pre-reader)**. Expected session: **3–9 minutes** (one to three letters per sitting); the full uppercase A–Z then lowercase a–z run spans many sessions and resumes automatically.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Letter tracing is letter-formation practice inside Ollo's ABC tab, Tracing section | official | Catalogued entry; Help Center "Get ready for school" |
| O2 | The Letters tab covers every letter: lowercase letters, uppercase letters, letter sounds, vowel sounds, CVC words, ages 3–5 | official | Library article |
| O3 | The Letters area is tied to phonics and letter sounds (Ollo's domain) | official | Help Center; App Store listing (Ollo = phonics/letter sounds) |
| O4 | The exact exercise flow (stroke guidance, rewards) is not described officially | official (absence) | Catalogued entry note |
| D1 | 52 levels: uppercase A–Z (1–26) then lowercase a–z (27–52), each gated by completing 3 passes | designed | Every letter is covered per O2, but no order is given; uppercase first because straight-line and arc forms are simpler for ages 3–5 |
| D2 | Three guide-fading passes: Trace (50%) → Fade (25%) → On your own (0%) | designed | Repetition plus fading makes formation observable |
| D3 | Stroke corridor, waypoints, start dot, demo, tolerances, double-tap rule | designed | No official stroke data exists; needed for buildability |
| D4 | Letter name + letter sound audio at letter start and completion | designed | Grounded in O2/O3's letter-sounds coverage; the exact pairing is invented |
| D5 | Non-punishing redirection (dim, glow, arrow, redirect voice); no timers, score, or fail state | designed | Never punishing for ages 2–8 (template rule) |
| D6 | Local save; letters unlock in order; resume at the current letter; 3 s hold resets | designed | Session continuity without accounts |
| D7 | Layout, ruled guide lines, palette, praise rotation, keyboard checkpoint stepping | designed | Buildability invention |
| D8 | No presenter character; original assets only | designed | IP constraint; the catalog's Ollo association is catalog metadata, not reproduced |

## 4. Player experience / core loop

A child presses Play. A ruled writing box appears with a ghost uppercase A, a pulsing green dot at its top, and a demo dot that travels the letter's strokes one at a time while a voice says "A" then "A says /a/." The child touches the dot and drags down the left leg; orange ink follows and soft ticks mark progress. At the last waypoint the stroke snaps solid with a chime, and the next stroke's start dot pulses at the top. Three strokes later, confetti falls, the voice cheers "You did it!" — then "A" and "A says /a/" — and the finished A stamp fills on the case strip. 2.5 s later uppercase B appears. Over three passes the ghost fades 50% → 25% → nothing. After uppercase Z a case celebration rolls into lowercase a; a later session resumes exactly where the child left off.

**Core loop:** pulsing start dot → drag along the path within the corridor → stroke locks with a chime → guide fades over three passes → celebration + letter name and sound → next letter.

## 5. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with one Play target (≥112×112 CSS px), a letter-A tile emblem (176×176) that doubles as the reset control (FR-018), and a 52-stamp progress strip (two rows of 26 stamps, 22×22 px each) showing completed, locked, and current letters.
- **FR-002** When Play is pressed, the game shall start `tracing(letter = highest unlocked, pass 1, stroke 0, furthest 0)`, lay out the ruled box and letter, and run the stroke demo (§9); the first voice clips — letter name then letter sound — play only after this first user gesture.
- **FR-003** While tracing, the game shall show the ruled writing box (guide lines at box y = 10 cap, 50 x-height, 90 baseline, 100 descender; 2 px at 18% opacity), the ghost letter (40 px round-capped stroke at pass opacity), the current anchor (26 px start dot pulsing every 1.2 s, or the continue-point after a lift), 3 pass dots (top center), direction arrows per pass (§8), and HOME (≥72×72).
- **FR-004** When a pointer goes down within 110 px of the current start dot, the stroke shall restart at checkpoint 0; within 110 px of the furthest reached checkpoint it shall resume there; elsewhere the pointer-down is an empty tap — no ink, no stray line, nothing changes. On a tie (within 110 px of both anchors) the continue-point (further ahead) wins.
- **FR-005** While the pointer is within 64 CSS px of the current stroke's polyline, ink shall follow it and checkpoints within 64 px shall mark reached in path order; only the current stroke's checkpoints count; the furthest reached checkpoint never regresses.
- **FR-006** When the furthest checkpoint is the stroke's last, the stroke shall lock (snap-fill 200 ms, sparkle ≤20 particles, `sfx_chime_short`) even while the pointer is down; the next stroke begins on a new pointer-down at its start dot.
- **FR-007** When all strokes of a pass lock, the pass shall advance (ghost fades per §8); on entering pass 3 "Now trace it on your own!" plays; after pass 3 the game enters celebration.
- **FR-008** When celebration ends (2.5 s), the next letter shall start automatically; after uppercase Z a case-complete screen shows for 3.5 s before lowercase a; after lowercase z the completion screen appears.
- **FR-009** The game shall have no fail state, no score, and no game timer: off-path motion, idling, mis-taps, and restarts never remove reached checkpoints, end a pass, or block progress.
- **FR-010** When the pointer stays >64 px from the current stroke for ≥600 ms, the ink shall dim to 25%, the next segment glows (70% opacity, +4 px width, 1.5 s), and a back-arrow shows at the furthest checkpoint; after 2.0 s continuously off-path "Follow the arrow." plays at most once per 8 s; no progress is lost.
- **FR-011** When the pointer lifts, leaves the canvas, or is cancelled mid-stroke, the stroke shall keep its furthest checkpoint; resume follows FR-004; a pointer-down that is not within 110 px of either anchor is an empty tap per FR-004.
- **FR-012** Backwards motion along the path is allowed and never reduces progress; when the pointer moves ≥120 px backwards (arc length) for ≥500 ms, the forward cue shows at the furthest checkpoint (no audio penalty).
- **FR-013** Multi-touch: the earliest touch-down owns the trace; other simultaneous contacts are ignored (no ink, no audio, no progress) until the owner lifts, after which the earliest still-down contact may take over; on a timestamp tie the leftmost contact wins.
- **FR-014** Edge cases: a double-tap on the start dot restarts the stroke (a second restart within 400 ms is a no-op); rapid empty-space taps are no-ops that each reset the idle timer; tapping locked ink changes nothing; resize/rotation reflows but preserves letter, pass, stroke, and furthest checkpoint.
- **FR-015** When no pointer or key input occurs for 15 s during tracing, the hint shall replay from the current anchor (start dot when furthest = 0, else the furthest checkpoint) with "Start at the green dot and follow the arrow.", repeating every 15 s; any pointer or key event resets the timer.
- **FR-016** Keyboard tracing: the anchor is a focus target; Enter/Space or ArrowRight advances one checkpoint in path order (ink grows to the next checkpoint over 300 ms, `sfx_tick` every 4th checkpoint); ArrowLeft flashes the previous reached checkpoint for 200 ms as a review cue without erasing ink or reducing `furthest`; holding Enter/Space ≥500 ms auto-traces the remaining stroke in 600 ms with FR-006 feedback (accessibility affordance, not the intended learning path).
- **FR-017** Instructions and feedback shall need no reading: audio plus pictograms (dot, arrows, ticks, pass dots, stamps); visible text is limited to letter glyphs, and every interactive element carries an invisible accessible name (the no-text rule governs visible text only).
- **FR-018** When the title emblem is held 3 s, a visible progress ring fills for the hold; completion clears the save and in-memory progress, pulses the emblem 1.1× for 400 ms, and plays `sfx_soft_tap`; holding Enter/Space on the focused emblem behaves identically.
- **FR-019** HOME shall work in every state, cancelling the celebration (2.5 s), case-complete (3.5 s), demo (1.6 s per stroke), idle (15 s), and reset-hold timers, saving first, and returning to the title.
- **FR-020** When a letter's pass 3 completes, the game shall fill that letter's stamp with a 1.1× pulse (400 ms) and speak the rotating praise clip, then the letter name, then the letter sound.

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with paper background | initial; preload assets; no interactive elements |
| SC-02 | `title` | letter-A emblem + Play + 52-stamp progress strip | audio unlocks on the first gesture here |
| SC-03 | `tracing(letter, pass, stroke, furthest)` | ruled box + ghost + guides + HOME | main state; pass 1–3, stroke 0–3, furthest checkpoint |
| SC-04 | `celebrating(letter)` | frozen letter + confetti + filled pass dots + case stamp strip (new stamp pulses) | auto-exits after 2.5 s |
| SC-05 | `caseComplete("upper")` | 26 filled uppercase stamps + case banner | auto-exits after 3.5 s |
| SC-06 | `complete` | trophy + 52 stamps + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | silent start (R-005) |
| `title` | `PLAY_PRESSED` | — | `tracing(current, 1, 0, 0)` | layout letter; demo with name + sound |
| `title` | `RESET_HOLD` | hold 3 s on emblem | `title` | fill ring; clear save + memory; pulse + `sfx_soft_tap` |
| `tracing` | `ANCHOR_DOWN` | within 110 px of anchor | `tracing` | FR-004 restart/resume; `sfx_soft_tap` |
| `tracing` | `CHECKPOINT_REACHED` | within 64 px, in path order | `tracing` | FR-005; `sfx_tick` every 4th checkpoint |
| `tracing` | `STROKE_LOCKED` | strokes remain | `tracing(letter, pass, stroke+1, 0)` | FR-006; next anchor pulses |
| `tracing` | `STROKE_LOCKED` | no strokes remain, pass < 3 | `tracing(letter, pass+1, 0, 0)` | FR-007; guide fades; `vo_fade` entering pass 3 |
| `tracing` | `STROKE_LOCKED` | no strokes remain, pass = 3 | `celebrating(letter)` | FR-008/FR-020; save |
| `tracing` | `OFF_PATH` | ≥600 ms outside corridor | `tracing` | FR-010 dim + glow + arrow |
| `tracing` | `IDLE_15S` | no input 15 s | `tracing` | FR-015 hint |
| `tracing` | `HOME_PRESSED` | — | `title` | cancel timers; save |
| `celebrating` | `CELEBRATION_DONE` | letter < 26 | `tracing(letter+1, 1, 0, 0)` | layout next uppercase letter; demo with name + sound |
| `celebrating` | `CELEBRATION_DONE` | letter = 26 | `caseComplete("upper")` | FR-008; case banner |
| `celebrating` | `CELEBRATION_DONE` | 26 < letter < 52 | `tracing(letter+1, 1, 0, 0)` | layout next lowercase letter; demo with name + sound |
| `celebrating` | `CELEBRATION_DONE` | letter = 52 | `complete` | save |
| `celebrating` | `HOME_PRESSED` | — | `title` | cancel 2.5 s timer; save |
| `caseComplete` | `CASE_DONE` | — | `tracing(27, 1, 0, 0)` | lowercase a demo with name + sound |
| `caseComplete` | `HOME_PRESSED` | — | `title` | cancel 3.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | — | `tracing(1, 1, 0, 0)` | fresh run; progress kept |
| `complete` | `HOME_PRESSED` | — | `title` | save |

**Tab order per state (v1):** `loading` none; `title` emblem → Play; `tracing` HOME → anchor (one focus target: the current stroke anchor, stepped per FR-016); `celebrating` HOME; `caseComplete` HOME; `complete` HOME → Replay.

**HOME everywhere (v1):** HOME cancels all running timers (demo 1.6 s per stroke, celebration 2.5 s, case-complete 3.5 s, idle 15 s, reset hold), saves, and returns to `title`; in `loading` no controls exist yet. Any tap or key press resets the idle timer, including empty-space taps (FR-015).

## 7. Input and interaction

- **Primary input:** single-pointer drag along the stroke path (touch, mouse, or pen).
- **Targets:** Play/Replay ≥112×112 CSS px; HOME ≥72×72 at top-left with a 24 px margin; anchor activation radius 110 px (26 px visual dot); title emblem 176×176 — all above the 44 px platform minimum, sized up for ages 3–5.
- **Tolerance (numeric):** on-path while within **64 CSS px** of the current stroke polyline; checkpoints mark reached within **64 px**; a pointer-down >110 px from both anchors is an empty tap. Tie rule: within 110 px of both anchors, the continue-point (further ahead) wins. Double-tap restart cool-down: 400 ms.
- **Stray strokes:** ink renders only while the pointer is within the 64 px corridor; dragging across empty space draws nothing and leaves no line.
- **Drag alternative:** keyboard per FR-016 (Tab to the anchor; Enter/Space/ArrowRight step checkpoint by checkpoint; hold Enter/Space to auto-trace).
- **Multi-touch:** FR-013 (earliest contact owns; others ignored; leftmost on a timestamp tie).
- **Instructions without reading:** spoken voice plus pictograms (pulsing dot, arrows, ticks, pass dots); accessible names are invisible and add no visible text.
- **Accessible names (invisible):** Play "Play"; HOME "Home"; emblem "Reset progress, hold three seconds"; anchor "Trace letter A, stroke 1, start dot" or "Continue letter A, stroke 1 at checkpoint 2"; Replay "Play again"; progress strip "Progress: 3 of 52 letters traced".
- **Focus indicator:** 4 px outline, contrast ≥3:1. **Viewport:** design spaces 1024×768 (landscape) and 768×1024 (portrait), letterboxed; landscape ≥900 px wide, portrait <900 px; no scrolling down to 320×480.

## 8. Levels and content data

| Pass | Name | Ghost opacity | Ghost style | Demo on entry | Direction arrows | Idle hint |
|---|---|---|---|---|---|---|
| 1 | Trace | 50% | solid 40 px | all strokes, 1.6 s each | first, middle, last waypoint of each stroke (first and last when ≤2 waypoints) | stroke demo replay |
| 2 | Fade | 25% | solid 40 px | all strokes, 1.6 s each | first and last waypoint | stroke demo replay |
| 3 | On your own | 0% | none | all strokes, 1.6 s each | none (start dot only) | stroke demo replay with a 25% hint ghost during the replay |

Waypoints are normalized (x right, y down, 0–100) inside the letter box; adjacent waypoints join as straight segments with 40 px round caps/joins (authored letters may add intermediate curve points). **Waypoints are the checkpoints**; `start = waypoints[0]`. Only the current stroke's anchor and checkpoints are active.

| Levels | Case | Letters | Passes per letter | Strokes per letter | Gate to next letter |
|---|---|---|---|---|---|
| 1–26 | uppercase | A–Z in order | 3 | 1–4 (§12, authored) | complete pass 3 |
| 27–52 | lowercase | a–z in order | 3 | 1–4 (§12, authored) | complete pass 3 |

- **Authored content:** the 52 `LetterPath` records (glyph, case, clip keys, stroke paths) are authored content specified in section 12; a blind builder writes them as plain data following those rules, using the letter A worked example below as the shape reference.
- **Layout mapping:** landscape 1024×768 — letter box 360×460 at top-left (332,150); `x_px = 332 + 3.6·x`, `y_px = 150 + 4.6·y`; portrait 768×1024 — letter box 320×420 at (224,300); `x_px = 224 + 3.2·x`, `y_px = 300 + 4.2·y`; letterbox-scale the matching design space to the viewport.
- **Worked example — level 1 (uppercase A, pass 1):** stroke 1 left diagonal `(50,10) (28,40) (10,90)` → screen `(512,196) (432.8,334) (368,564)`; stroke 2 right diagonal `(50,10) (72,40) (90,90)` → `(512,196) (591.2,334) (656,564)`; stroke 3 crossbar `(24,66) (50,66) (76,66)` → `(418.4,453.6) (512,453.6) (605.6,453.6)`. On entry the demo dot travels stroke 1 in 1.6 s, then stroke 2, then stroke 3, then the start dot pulses at `(512,196)`. The child touches within 110 px of `(512,196)`; ink follows while within 64 px of the leg; reaching `(368,564)` locks stroke 1 (200 ms snap, chime). Stroke 2's start dot pulses at `(512,196)`; then stroke 3. Three passes later: confetti, praise, "A", "A says /a/", the A stamp fills, and uppercase B appears after 2.5 s. Progress saves `completed: ["A"]`, `current: "B"`.
- **Progression:** fixed and deterministic, completion-gated by pass 3; no timer, no score, no adaptive difficulty, no randomness anywhere. Praise clip index = `((letterIndex - 1) mod 4) + 1`.

## 9. Feedback, rewards, and audio cues

Effect definitions (reused by the FRs; no undefined effects): **pulse** = ring 1.0→1.25→1.0 over 1.2 s, repeats; **demo** = 24 px dot with a 60% opacity tail travels one stroke from its start to its end in 1.6 s (on entry each stroke in sequence; the idle hint runs from the current anchor to the stroke end; any pointer-down or key press cancels the remaining demo); **ink** = 32 px round-capped polyline from checkpoint 0 to the pointer; **snap-fill** = locked stroke redraws at full opacity over 200 ms; **sparkle** = ≤20 32 px stars, 400 ms; **confetti** = ≤40 24×24 px rectangles falling 1.5 s (case complete ≤60 over 2 s); **dim** = active ink to 25% opacity; **segment glow** = next segment (furthest→next waypoint) at 70% opacity, +4 px width, for 1.5 s; **back-arrow** = 64 px arrow at the furthest checkpoint, shown while the pointer is off-path and cleared when the pointer returns within 64 px (or when the stroke locks); **forward cue** = 64 px direction arrow at the furthest checkpoint pointing along the path, shown 1.5 s; **hint ghost** = in pass 3 only, the path traveled by a hint demo shows at 25% opacity during the 1.6 s replay, then fades over 300 ms; **ring fill** = 6 px circle stroke sweeps 0→360° over the 3 s hold; **stamp fill** = 22 px stamp fills with a 1.1× pulse, 400 ms; **depress** = button scale 1→0.95→1 over 80 ms.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Letter start | ruled box + ghost; demo travels all strokes | `vo_name_X` then `vo_sound_X` — 0.9 — one-shot each |
| Anchor touched | dot contracts 0.85× for 120 ms; ink begins | `sfx_soft_tap` — 0.4 — one-shot |
| Checkpoint reached | ink extends; waypoint flashes 200 ms | `sfx_tick` — 0.25 — one-shot every 4th |
| Stroke locked | snap-fill 200 ms; sparkle ≤20 | `sfx_chime_short` — 0.6 — one-shot |
| Off-path ≥600 ms | ink dims to 25%; segment glow 1.5 s; back-arrow | `sfx_boop` — 0.3 — one-shot; after 2.0 s `vo_redirect` — 0.9 — one-shot (≤1 per 8 s) |
| Backwards ≥120 px / ≥500 ms | forward cue at furthest checkpoint | none |
| Pass complete | guide fades to next pass; pass dot fills | `sfx_chime_short` — 0.6 — one-shot; `vo_fade` — 0.9 — one-shot entering pass 3 |
| Letter complete | stamp fills + 1.1× pulse; ≤40 confetti | `sfx_chime` — 0.7; `vo_praise_(((letterIndex - 1) mod 4) + 1)`, `vo_name_X`, `vo_sound_X` — 0.9 each — one-shot each |
| Case complete (Z) | 26 uppercase stamps filled; case banner | `sfx_chime` — 0.7; `vo_case_upper` — 0.9 — one-shot each |
| All complete (z) | trophy + 52 stamps; ≤60 confetti | `sfx_chime` — 0.7; `vo_complete` — 0.9 — one-shot each |
| Idle 15 s | hint demo replays from the current anchor | `vo_instruction` — 0.9 — one-shot |
| HOME / Play / Replay | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Optional background | — | `music_loop` — 0.15 — loop |

Copy: `vo_name_A..Z` = "A"…"Z"; `vo_sound_A..Z` = "A says /a/."; `vo_praise_1..4` = "You did it!", "Great tracing!", "Wonderful!", "Nice work!"; `vo_instruction` = "Start at the green dot and follow the arrow."; `vo_redirect` = "Follow the arrow."; `vo_fade` = "Now trace it on your own!"; `vo_case_upper` = "You finished uppercase letters!"; `vo_complete` = "You traced every letter!" No negative wording. Timbre, language, and TTS engine are build freedom within this copy.

**Audio rules (v1):** no audio before the first user gesture (R-005); a new voice clip cancels the previous utterance (name and sound are queued sequentially); missing APIs degrade gracefully — no speech synthesis → visual-only cues (start dot, arrows, demo, dim/glow), no AudioContext → silent, storage blocked → run unsaved. Background-tab timer throttling may delay demos, idle hints, celebration/case exits, and the reset ring, never losing progress.

## 10. Progress and persistence

- **Storage class:** browser local storage; no network, no accounts.
- **Key and shape:** `spec.letterTracing.v1` = `{ "completed": ["A","B"], "current": "C", "updatedAt": "<ISO-8601>" }`.
  - `completed`: unique letter glyphs (`A`–`Z`, `a`–`z`), 0–52 entries — per-letter completion.
  - `current`: highest unlocked glyph, default `"A"`; Play resumes here.
  - `updatedAt`: ISO-8601, refreshed on every save.
- **Save points:** pass 3 completion of a letter (entering `celebrating`), case completion, and HOME pressed; `updatedAt` refreshes on every save.
- **Restore:** Play resumes at `current`, pass 1; mid-letter pass/stroke/furthest state is deliberately not persisted.
- **Reset:** hold the title emblem 3 s (ring fills) or hold Enter/Space on it → clears the key and in-memory progress; the next load uses the first-run defaults (`current: "A"`, `completed: []`).
- **Deliberately not stored:** per-stroke progress, furthest checkpoints, pass number, timings, audio settings, anything identifying. One key only; no shared kernel.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy; no character art. Letter glyph outlines are data (section 12), not image assets. Programmatic stubs are acceptable where the row says so. Audio volumes are numeric (v1).

| Key | Type | Description / generation guidance | Size / format | Behavior | Volume | Stub policy |
|---|---|---|---|---|---|---|
| `bg_paper` | image | soft paper backdrop, subtle grid dots | 1024×768 SVG | static | — | SVG gradient + dots |
| `ruled_guide` | image | 4 ruled guide lines (cap, x-height, baseline, descender) | 400×500 SVG, scales | static | — | SVG lines |
| `dot_start` | image | green start dot, ring + core `#3FBF6F` | 96×96 SVG | static | — | SVG circles |
| `arrow_dir` | image | rounded direction arrow, ink-colored | 64×64 SVG | static | — | SVG path |
| `sparkle` | image | 4-point star particle | 32×32 SVG | one-shot ≤20 | — | SVG star |
| `trophy` | image | simple cup, rounded linework | 160×160 SVG | static | — | SVG path |
| `stamp_frame` | image | 22×22 rounded stamp frame, locked/current/filled states | 22×22 SVG | static | — | SVG rect |
| `sfx_soft_tap`, `sfx_tick`, `sfx_chime_short`, `sfx_chime`, `sfx_boop`, `sfx_tap` | audio | muted blip 0.10 s; soft tick 0.05 s; two-note chime 0.40 s; three-note chime 0.80 s; low boop 0.12 s; UI click 0.08 s | 0.05–0.80 s each | one-shot | 0.4, 0.25, 0.6, 0.7, 0.3, 0.5 | WebAudio blips/arpeggios |
| `vo_name_A..Z` | audio | spoken letter names (26 clips, shared by both cases); copy in section 9 | ≤1 s each | one-shot | 0.9 | TTS allowed |
| `vo_sound_A..Z` | audio | spoken letter sounds (26 clips, shared by both cases); copy in section 9 | ≤1.5 s each | one-shot | 0.9 | TTS allowed |
| `vo_praise_1..4` | audio | rotating praise; copy in section 9 | ≤2 s each | one-shot | 0.9 | TTS allowed |
| `vo_instruction`, `vo_redirect`, `vo_fade`, `vo_case_upper`, `vo_complete` | audio | spoken prompts; copy in section 9 | ≤3 s each | one-shot | 0.9 | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop | 0.15 | may be omitted |

- **Palette:** background `#EAF3FB`, ink `#2B4A6F`, trace accent `#FF8A3D`, success `#5FBF6F`, guide `#A8C4DD`, paper lines `#A8C4DD`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); visible text is limited to letter glyphs; letters are stroked paths, not glyph text.
- **Load failure:** missing visual asset → draw a stub shape and keep playing; missing audio → continue silently (R-010).

## 12. State and data shapes

```
LetterPath = { glyph: "A".."Z" | "a".."z", letterCase: "upper" | "lower",
               nameClip: "vo_name_A".."vo_name_Z", soundClip: "vo_sound_A".."vo_sound_Z",
               strokes: Stroke[] }        // 52 records, authored content
Stroke     = { waypoints: [x: 0-100, y: 0-100][], start: [x, y] }
             // start = waypoints[0]; waypoints ARE the checkpoints
Runtime    = { letterIndex: 1-52, pass: 1-3, strokeIndex: 0-3, furthest: 0..n, locked: boolean[] }
SaveObject = { completed: string[], current: string, updatedAt: "<ISO-8601>" }
```

- **Per-letter stroke data is authored content.** Write all 52 `LetterPath` records as plain JSON (`letters-data`): A–Z then a–z order; 1–4 strokes per letter (uppercase typically 2–4, lowercase 1–3); 2–8 waypoints per stroke; coordinates inside the letter box (x 4–96; y 6–96 for uppercase, ascenders to 6 and descenders to 100 for lowercase); consecutive waypoint gaps 10–55 units; waypoint order = stroke order; horizontals drawn left→right; descenders (g, j, p, q, y) reach y = 100. Uppercase A is the worked example in section 8; follow its shape. Lowercase letters reuse the uppercase `nameClip`/`soundClip` for the same alphabet letter.
- **Validation (build-time assertion):** every letter has 1–4 strokes; every stroke 2–8 waypoints; all points in range; no duplicate consecutive points; `start` equals the first waypoint. A letter that fails validation fails the build, not runtime.
- **Determinism:** letter order, pass order, and praise rotation derive from `letterIndex` only; no runtime randomness anywhere.

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector paths with round caps/joins, smooth segments, ruled guide lines, and large letter outlines.
- **R-002** The game shall track a single pointer through move events (coalesced events where available) and ignore extra simultaneous contacts (FR-013).
- **R-003** The game shall support keyboard focus and activation for every interactive target, including the 3 s hold reset and FR-016 checkpoint stepping.
- **R-004** The game shall play concurrent one-shot audio clips and may loop one music track at volume 0.15.
- **R-005** When the browser blocks audio before a user gesture, the game shall defer audio until the first interaction (Play) and shall not require sound to proceed.
- **R-006** The game shall persist and restore one small JSON save object in browser local storage, and shall run unsaved in memory when storage is unavailable.
- **R-007** The game shall run offline with no network requests after initial load.
- **R-008** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-009** The game shall provide hit targets ≥64 CSS px (Play/Replay ≥112, HOME ≥72) with focus indicators ≥4 px and ≥3:1 contrast.
- **R-010** When speech synthesis or audio fails, the game shall continue with visual cues only.
- **R-011** The game shall scale from 768×1024 to 1366×768 without losing state; no scrolling down to 320×480.
- **R-012** The game shall expose an invisible accessible name on every interactive element.
- **R-013** The game shall produce identical layouts, paths, and sequences on every run (no randomness).
- **R-014** All rendered and spoken assets shall be original; no Khan Academy character or asset shall be reproduced.
- **R-015** When the tab is backgrounded and timers are throttled, the game shall run any expired timer once visibility is restored and shall not lose progress.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the title shows Play, the letter-A emblem, and a 52-stamp strip, with no audio before the first gesture; when Play is pressed, uppercase A pass 1 appears with a pulsing start dot and "A" then "A says /a/" plays |
| AC-02 | uppercase A pass 1 | the start dot is touched and dragged along stroke 1 to its last waypoint | ink follows within the 64 px corridor and the stroke snaps solid within 200 ms with a chime and sparkle |
| AC-03 | checkpoints 1–2 of a stroke reached | the pointer lifts, then a new pointer goes down within 110 px of checkpoint 2 (the continue-point) and drags on to checkpoint 3 | tracing resumes at checkpoint 2 with 1–2 preserved, and checkpoint 3 then marks reached |
| AC-04 | an active stroke | the pointer stays >64 px away for ≥600 ms | the ink dims to 25%, the next segment glows for 1.5 s, a back-arrow shows at the furthest checkpoint, and no progress is lost; after 2.0 s off-path "Follow the arrow." plays at most once per 8 s |
| AC-05 | any tracing screen | the pointer drags >110 px from both anchors across empty space | no ink and no persistent stray line appears, and the tap resets the 15 s idle timer |
| AC-06 | an active stroke at checkpoint 0 | the start dot is double-tapped | the stroke restarts at checkpoint 0; a second restart within 400 ms plays no extra sound and furthest stays 0 |
| AC-07 | an active stroke | the pointer moves ≥120 px backwards for ≥500 ms | the forward cue appears at the furthest checkpoint and reached checkpoints remain |
| AC-08 | two simultaneous contacts | they land together | only the earliest touch-down draws ink and the other changes nothing (leftmost on a timestamp tie) |
| AC-09 | uppercase A pass 1 completed | the pass advances | the ghost is 25% in pass 2 and absent (0%) in pass 3, and "Now trace it on your own!" plays entering pass 3 |
| AC-10 | uppercase A pass 3 completed | celebration plays | ≤40 confetti particles fall, a chime, rotating praise, "A", and "A says /a/" play, the A stamp fills, and B appears after 2.5 s; after a reload, Play starts at B |
| AC-11 | uppercase Z pass 3 completed | celebration ends | the case-complete screen shows 26 filled uppercase stamps and lowercase a starts after 3.5 s |
| AC-12 | lowercase z pass 3 completed | celebration ends | the completion screen shows the trophy, 52 stamps, and Replay |
| AC-13 | saved progress (completed A–C, current D) | the page reloads and Play is pressed | uppercase D pass 1 starts |
| AC-14 | 15 s with no pointer or key input | idleness continues | the hint demo replays from the current anchor and "Start at the green dot and follow the arrow." plays; any pointer or key event resets the timer |
| AC-15 | keyboard focus on the anchor | Enter/Space is pressed repeatedly | each press advances one checkpoint with ink growth and ticks; holding Enter/Space ≥500 ms auto-traces the remaining stroke with the same snap, sparkle, and chime as a drag |
| AC-16 | celebration is playing | HOME is pressed | the 2.5 s timer is cancelled, progress is saved, and the title screen appears |
| AC-17 | the title screen | the emblem is held 3 s | a ring fills during the hold, the save is cleared on completion, and the strip shows only A current; the Enter/Space hold behaves identically |
| AC-18 | speech synthesis is unavailable (or no audio context) | any letter is traced | all feedback is still visible (dot, arrows, glow, confetti) and the activity remains completable; with no audio context it is silent but fully playable |
| AC-19 | storage is blocked (private mode) | a letter is completed | the next letter starts with no error message, and HOME followed by Play still resumes at that letter for the session |
| AC-20 | a screen reader is active | title, tracing, and complete screens are navigated | every interactive element announces an invisible name (e.g. "Trace letter A, stroke 1, start dot") and visible text stays limited to letter glyphs |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked, and one letter traces end-to-end: ink follows, checkpoints mark, all strokes lock, celebration plays, next letter appears.
2. All 52 letters exist as valid authored data in the section 12 shape; the case-complete and final complete screens appear; progress survives a reload and resets via the 3 s hold.
3. No fail state exists; every edge case in FR-014 behaves as specified.
4. Runs offline in a browser at 1024×768 and 768×1024 down to 320×480 without scrolling.
5. No Khan Academy character or asset appears; visible text is letter glyphs only.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Sequence = uppercase A–Z then lowercase a–z, 52 levels, 3 passes each | designed — official sources say every letter is covered but give no order; uppercase first because its forms are simpler for ages 3–5 |
| A2 | Per-letter stroke paths and waypoints (A worked example in §8, rules in §12) | designed — no official stroke data exists |
| A3 | The 64 px corridor and 110 px anchor radii suit ages 3–5 | assumption — wider than the number-six activity's 56 px by design; may widen, never narrow, without a spec revision |
| A4 | TTS-generated voice clips are acceptable | designed |
| A5 | Browsers block autoplay until the first gesture | platform fact — handled by R-005 |
| A6 | Background-tab timers may be throttled; demos, hints, and exits fire late, never losing progress | known platform behavior — handled by R-015 |
| A7 | iOS Safari may require a gesture to start speech synthesis; Play provides it | known platform behavior |
| A8 | Keyboard checkpoint stepping is an accessibility accommodation, not the intended learning modality | designed (§7) |
| A9 | No presenter character; original assets only; the catalog title is not shown on screen | designed — IP constraint |
| A10 | Letter-sound copy uses simple phoneme text ("A says /a/.") | designed — TTS voices vary |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** letter sequence and case order, 3-pass fade values, corridor and anchor tolerances, stroke-lock and edge-case semantics, stroke data shape and validation rules, save key and shape, reset gesture, asset provenance (original only, no Khan characters), acceptance criteria.
- **Free:** easing curves, particle specifics, curve smoothing between waypoints, voice timbre/TTS engine, optional music, exact emblem and stamp decoration within palette tokens, the case-complete banner composition (glyphs and stamps only, no words).
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, handwriting-quality scoring, letter-name/sound quizzes beyond the tracing reward, free-draw mode, and a letter picker (progression is linear).
