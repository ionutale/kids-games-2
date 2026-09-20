# Yoga and movement videos

## 1. Front matter

- **Entry type:** Interactive player — guided movement video collection (one follow-along routine)
- **Catalogued entry:** [`yoga-and-movement-videos.md`](../yoga-and-movement-videos.md)
- **Official source:** [Help Center — Find books and lessons in the Khan Kids Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library); repo wording "yoga and movement videos (1st, 2nd Grade)" in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) line 84 and "Motor and physical development — gross and fine motor development, safety, health, nutrition" at lines 110–111
- **Spec status:** v1 — first guided-movement interactive-player spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load; no camera, microphone, or pose detection is used
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: one pose replaces a level, the routine end replaces a win condition, the last completed pose replaces scoring; there is no scoring and no fail state.

## 2. Overview and learning objective

A child presses Play and follows one original guided routine: an animated demonstrator shows each
pose, a voice cues it, a 3 s "ready" count-in tunes the child in, and a draining ring with big
numerals plus a voice count of "4… 3… 2… 1" times each hold. The child can pause for breath, replay
a pose, step forward or back, or tap Done to stop early — no scoring, no camera, no pose detection.
Skills: **gross-motor coordination, balance, and body awareness**, with attention to breath and
self-pacing. Age band: **6–8 (1st–2nd Grade, per the official listing)**; expected session **2–4 minutes**.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | The Videos tab includes yoga and movement videos for 1st and 2nd Grade | official | `khan-academy-kids-games.md` line 84 |
| O2 | Motor and physical development is one of the seven officially covered learning topics, alongside health, safety, and nutrition | official | `khan-academy-kids-games.md` lines 110–111 |
| O3 | The app targets ages 2–8 and its Library can be filtered by learning level 1st–2nd Grade | official | `khan-academy-kids-games.md` lines 160–172 |
| O4 | Individual video titles are not published in official sources; no pose names or video content appear in the surveyed sources | official | Catalogued entry — Notes |
| D1 | One routine `move-along-1`: warm-up + 5 poses + cool-down, with child-friendly names, holds, and cue copy in section 8 | designed | O4 publishes no titles; a fixed 7-segment routine is buildable and appropriately short for 6–8 |
| D2 | The "video" is an original animated pictogram demonstrator (procedural keyframes; no camera, no real footage, no pose detection) | designed | Keeps the build feasible for a fresh-context LLM; visual feedback is observable without watching the child |
| D3 | Player chrome: Play/Pause, Replay pose, Previous/Next pose, Done, 3 s ready count-in, draining hold ring + voice counts; no scoring | designed | The minimal designed interaction the interactive-player type promises; never punishing |
| D4 | All pose names, cue copy, art, voice, and motion are original; nothing from Khan Academy or third parties appears (the separate "Mindfulness videos (Alo Yoga)" entry is not used) | designed | Required constraint: published media may not be copied; Alo Yoga is third-party |
| D5 | Home, HOME chrome, resume at the last completed pose, hidden 3 s reset, idle hint, audio rules | designed | Template v1; continuity without accounts; never punishing (ages 6–8) |

## 4. Player experience / core loop

A child presses the big Play. The demonstrator reaches up into "Reach Up High" while the voice says
"Reach Up High! Stand tall and reach up." The voice says "Ready?" and the screen counts 3… 2… 1; a
chime sounds and the hold begins. The ring drains as a big numeral counts down, and the voice counts
the last four seconds: "4… 3… 2… 1". A soft two-note chime ends the pose and the Star demo begins.
When the child tires during Butterfly, they tap Done; a gentle chime and "Great moving!" appear, and
later Play starts again at the last pose they finished.

**Core loop:** Play → demo → ready count-in → hold with visible + spoken countdown → rest → next pose (or pause, replay, skip, Done) → routine end or early Done → Move again or HOME.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload the 7 poses and audio (sections 8 and 11), then `home`: a decorative title, a decorative non-interactive 7-pictogram strip, one Play target ≥96×96 CSS px, and an inconspicuous reset mark ≥64×64 CSS px (FR-013). No audio plays before the first user gesture (R-006). |
| FR-002 | When Play is pressed, it shall unlock audio and open the resume pose (`lastDonePoseId`, section 10; warm-up when no save) at phase `demo`, playback `playing`, t=0. Each pose shall run one deterministic timeline on a single clock (ms, t=0 at pose open): **demo** [0, D] with D = clamp(`cueClipMs` + 700, 4000, 6000) and fallback `cueClipMs` = 2600 (D = 4000); **count-in** [D, D+3000]; **hold** [D+3000, D+3000+`holdMs`]; **rest** [`holdEnd`, `holdEnd`+2000]. Phases run in fixed order with no skip. Only one voice clip plays at a time; any new voice clip cancels the previous utterance. |
| FR-003 | In **demo**, the demonstrator shall ease from a neutral stand into the pose over the first 1200 ms, then hold the pose with a breathing motion (section 9); the pose name (content) shall fade in at t=0 and `vo_cue_{id}` shall speak the cue copy once at t=300 (volume 1.0, one-shot). |
| FR-004 | In **count-in**, the demonstrator holds the pose and a large numeral shall show the remaining whole seconds of the count-in (3 at D, 2 at D+1000, 1 at D+2000; `pict_ready` shown beside it). Voices: `vo_ready` at D, `vo_count_3` at D+600, `vo_count_2` at D+1400, `vo_count_1` at D+2200 (each 1.0, one-shot); `sfx_go` at D+3000 (0.6, one-shot) marks the hold start. |
| FR-005 | In **hold**, a ring shall drain linearly over `holdMs`, and a large numeral shall show the remaining whole seconds `clamp(ceil(remainingMs/1000), 1, holdMs/1000)` (it shows the full hold seconds at hold start). Voice counts: `vo_count_4` at `holdEnd`−4000, `vo_count_3` at −3000, `vo_count_2` at −2000, `vo_count_1` at −1000 (each 1.0, one-shot); when `holdMs` < 5000 the voice instead counts every whole remaining second. At `holdEnd`: `sfx_pose_done` (0.6, one-shot), a 300 ms ring pulse, and save (FR-017). |
| FR-006 | In **rest**, the demonstrator shall ease back to neutral over 800 ms, the pose name and ring shall fade out, and no voice or sfx plays. After the rest: the next pose opens at `demo` t=0 playing, or — after the cool-down — `celebrating` begins (FR-011). |
| FR-007 | A Play/Pause target ≥72×72 CSS px shall toggle playback with a 300 ms debounce (a second toggle within 300 ms is ignored). Pause cancels the voice and freezes the clock, ring, numeral, and figure motion. Resume continues from the frozen time in every phase; each voice cue scheduled at a time still ahead of the frozen time fires at its time, and cues already past are skipped (no phase restarts, so a paused hold resumes with its remaining seconds). |
| FR-008 | A Replay target ≥72×72 CSS px shall cancel the voice and restart the current pose at t=0 in `demo`, playing; it works from any phase. Replay is throttled to one restart per 500 ms. |
| FR-009 | Previous and Next targets (each ≥64×64 CSS px) shall move one pose in routine order (section 8), cancel the voice, open the new pose at `demo` t=0 playing, and each trigger `sfx_tap`. They share one 500 ms throttle. Previous on the warm-up and Next on the cool-down are no-ops (no visual and no audio change). Next/Previous do not mark poses complete and do not save. |
| FR-010 | A Done target ≥64×64 CSS px, rendered only in `moving`, shall end the session early: cancel the voice and timers, save (FR-017), and enter `complete` with `vo_done` (1.0, one-shot) and `sfx_chime` (0.5, one-shot), with no confetti. Done never marks the in-progress pose complete and never loses the last completed pose. |
| FR-011 | At the cool-down rest end the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot), and save `lastDonePoseId` = `warmup` (the next Play starts a fresh routine). 3000 ms after celebration entry it shall enter `complete`: an end card fading in over 250 ms with **Move again** ≥96×96 and HOME ≥64×64. Move again shall open the warm-up at `demo` t=0 playing. |
| FR-012 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `moving`, `celebrating`, and `complete`; it cancels any voice and timers, saves, and returns to `home`. On `home` and `loading` no HOME control is rendered and a HOME input is a no-op. |
| FR-013 | When the home reset mark is held for 3 s, the player shall fill a visible progress ring for exactly the hold duration; on completion it shall clear the storage key and in-memory progress and play a ring flash (300 ms) plus `sfx_soft_tap` (0.7, one-shot). Holding Enter/Space 3 s on the focused mark is the keyboard equivalent. |
| FR-014 | No-reading rule: visible text is limited to content — the current pose name (read aloud by the cue), the count-in/hold numerals, and the decorative home title (never needed to operate). Every instruction and label reaches a non-reader by voice + pictogram (`pict_ready`, `pict_muted`, control pictograms). Every interactive element (Play, reset mark, Play/Pause, Replay, Previous, Next, Done, HOME, Move again) carries an invisible accessible name (e.g., "Play routine", "Pause", "Replay pose", "Next pose", "Previous pose", "Done, end routine", "Home", "Move again", "Reset progress"); this rule governs visible text only. |
| FR-015 | The player shall have no fail state: mis-taps, empty-space taps, rapid or repeated taps, double-taps, Next on an end, and idle time never lose progress, never end the session, and never block play. The only exits are Done and HOME, and both preserve the last completed pose. |
| FR-016 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Hit rects take a 12 px expansion on all sides; on overlap the nearest center wins and exact ties resolve to the leftmost, then the topmost, control. A tap >12 px from every hit rect is an empty tap (no state change, no sound; idle timer resets). Throttles: Play/Pause 300 ms (FR-007), Replay 500 ms (FR-008), Next/Previous 500 ms shared (FR-009); taps inside a throttle are ignored with no sound and no state change. Double-tapping Play/Pause toggles exactly once; double-tapping Next advances exactly once; double-tapping Replay restarts once. No drags or gestures exist. |
| FR-017 | Persistence (section 10): save at every hold completion, at celebration entry (writes `lastDonePoseId` = `warmup`), and on HOME and Done; `updatedAt` refreshes on every save. Resume: Play opens `lastDonePoseId` at `demo` t=0. |
| FR-018 | Degradation: no speech synthesis → visual-only pacing — count-in numerals 3-2-1, the hold ring, and the hold numeral all still run, `sfx_go`/`sfx_pose_done` still play when an audio context exists, and a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. A missing figure asset → draw the neutral stub figure, log a warning, keep the timeline running. |
| FR-019 | Background tab: when the tab becomes hidden while `playing`, the player shall cancel the voice and enter `paused`, freezing the clock, ring, numeral, and figure. On return it stays paused until Play. The pose clock advances only from visible, unpaused elapsed time (single accumulator), so background-tab throttling cannot skip or shrink a hold; on becoming visible the remaining hold time equals its value at hide. Idle time counts visible time only; hints may fire late; progress is never lost. |
| FR-020 | When no input has occurred for 12,000 ms the player shall pulse one deterministic target for 3,000 ms: `home` — Play (visual only before the first gesture); `moving` while `paused` — Play/Pause, with `vo_hint` (1.0, one-shot); `moving` while `playing` — no hint (the movement is its own cue); `complete` — Move again, with `vo_hint`. The hint repeats every 12,000 ms of continued idleness; any input, including an empty-space tap, resets the timer. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | soft mat backdrop | initial state; preload; audio locked |
| `home` | title + decorative pose strip + Play + reset mark | the player's home; audio unlocks on the first gesture |
| `moving(poseId, phase, playback)` | stage with demonstrator, pose name, ring/numeral, chrome | poseId ∈ 7 routine poses; phase ∈ {demo, countin, hold, rest}; playback ∈ {playing, paused} |
| `celebrating` | last pose frozen + confetti | auto-exits after 3000 ms |
| `complete` | end card + Move again + HOME | terminal until Move again or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `home` | entry: arm audio; no sound before first gesture |
| `home` | `PLAY_PRESSED` | — | `moving(lastDonePoseId or warmup, demo, playing)` | entry: unlock audio; pose opens at t=0 |
| `home` | `RESET_HOLD` | hold 3 s on mark | `home` | action: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `home` | `IDLE_12S` | — | `home` | action: FR-020 hint |
| `moving` | `PLAY_PAUSE` | outside 300 ms debounce | `moving(same, same phase, toggled)` | action: FR-007 (freeze/resume clock) |
| `moving` | `REPLAY` | outside 500 ms throttle | `moving(same, demo, playing)` | action: FR-008 |
| `moving` | `NEXT` / ArrowRight | throttle clear; pose ≠ cool-down | `moving(next, demo, playing)` | action: FR-009; `sfx_tap` |
| `moving` | `PREV` / ArrowLeft | throttle clear; pose ≠ warm-up | `moving(previous, demo, playing)` | action: FR-009; `sfx_tap` |
| `moving` | `DONE` / D | — | `complete` | actions: FR-010; cancel voice/timers; save |
| `moving` | `PHASE_ADVANCE` | clock reaches phase end; fixed order demo→countin→hold→rest | `moving(same, next phase, playing)` | actions per FR-003–FR-006 |
| `moving` | `HOLD_END` | hold clock reaches `holdEnd` | `moving(same, rest, playing)` | actions: FR-005; save |
| `moving` | `REST_END` | pose ≠ cool-down | `moving(next, demo, playing)` | entry: next pose at t=0 |
| `moving` | `REST_END` | pose = cool-down | `celebrating` | actions: FR-011; save `warmup` |
| `moving` | `HOME_PRESSED` | — | `home` | action: cancel voice/timers; save |
| `moving` | `TAB_HIDDEN` | playback = playing | `moving(same, same phase, paused)` | action: cancel voice; freeze (FR-019) |
| `celebrating` | `CELEBRATION_DONE` | 3000 ms elapsed | `complete` | entry: end card fades in 250 ms |
| `celebrating` | `HOME_PRESSED` | — | `home` | action: cancel timers; save |
| `complete` | `MOVE_AGAIN` | — | `moving(warmup, demo, playing)` | entry: warm-up at t=0 |
| `complete` | `HOME_PRESSED` | — | `home` | action: save |
| any | `IDLE_12S` | visible tab, no input 12 s | same state | action: FR-020 hint |

Events not listed for a state are ignored (no state change, no sound); on `home` and `loading`, HOME
is a no-op; on `complete`, Done is not a target; Next on the cool-down and Previous on the warm-up are no-ops (FR-009).

**Tab order (v1):** `home` — reset mark → Play; `moving` — HOME → Previous → Play/Pause → Replay → Next → Done; `celebrating` — HOME only; `complete` — HOME → Move again; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Start routine from home | tap Play | Tab to Play + Enter/Space |
| Pause / resume | tap Play/Pause | Space (when no control is focused) or Enter/Space on the focused target |
| Replay the current pose | tap Replay | R |
| Next / previous pose | tap Next / Previous | ArrowRight / ArrowLeft |
| End the session early | tap Done | D |
| Move again at the end | tap Move again | Enter/Space on the focused target |
| HOME | tap HOME | Escape |
| Reset | hold the reset mark 3 s | hold Enter/Space 3 s on the focused mark |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and Move again ≥96×96 CSS px; Play/Pause, Replay, Previous, Next ≥72×72 at ≥1024 px wide; HOME, Done, reset mark ≥64×64; every target stays ≥64×64 at 768–1023 px and ≥48×48 at every supported size — all above the 44 px platform minimum, larger for ages 6–8. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px per FR-016; overlaps resolve by nearest control center, exact ties to the leftmost then topmost; a tap >12 px from every target is an empty tap (nothing changes; idle resets).
- **Multi-touch / gestures:** FR-016 single-pointer semantics; no drag or swipe gestures exist, so no drag alternative is required; every action has a keyboard path.
- **Instructions without reading:** all chrome is pictogram + voice; pose names and countdown numerals are content and are read aloud; `pict_ready` marks the count-in (FR-014).
- **Accessible names:** invisible names on every interactive element (FR-014/R-011), e.g. "Play routine", "Pause", "Replay pose", "Next pose", "Previous pose", "Done, end routine", "Home", "Move again", "Reset progress".
- **Resize:** viewport resize or rotation mid-pose reflows per section 8, preserving pose, phase, remaining hold time, and playback.

## 8. Routine and content data

**Media scope (designed):** one routine, `move-along-1` = **1 warm-up + 5 poses + 1 cool-down**,
built from the same procedural template plus per-pose data (`Pose`, section 12). Adding a pose or
routine is a data record; the collection shape (section 12) supports more without code changes.

| # | id | Pose (child-friendly) | Kind | Hold (s / ms) | Description (body) | Cue copy (fixed, read aloud) | Illustration guidance (`fig_{id}`) |
|---|---|---|---|---|---|---|---|
| 1 | `warmup` | Reach Up High | warm-up | 12 / 12000 | Stand tall, feet hip-width, reach both arms overhead, sway gently side to side | "Reach Up High! Stand tall and reach up. Sway side to side." | standing figure, both arms overhead, slight side lean, smiling |
| 2 | `star` | Star | pose | 10 / 10000 | Feet wide, arms straight out to the sides at shoulder height, stand tall | "Star! Feet wide, arms out. Shine like a star." | figure standing wide, arms straight out, legs apart, head up |
| 3 | `butterfly` | Butterfly | pose | 12 / 12000 | Sit, soles of the feet together, knees out, flutter the knees up and down | "Butterfly! Sit, feet together. Flap your knees." | seated figure, soles touching, knees out, hands on feet |
| 4 | `tree` | Tree | pose | 8 / 8000 | Stand on one foot, the other foot resting on the standing ankle, hands together; Replay to try the other foot | "Tree! Stand on one foot. Hands together. Grow tall." | figure balanced on one leg, other knee bent, foot at ankle, hands together |
| 5 | `frog` | Frog | pose | 8 / 8000 | Squat with knees wide, hands on the floor in front, look forward | "Frog! Squat down. Hands on the floor. Ribbit!" | wide-squat figure, knees out, hands between the feet, looking forward |
| 6 | `moon` | Moon | pose | 8 / 8000 | Stand tall, arms overhead, lean to one side like a crescent; Next pass or Replay for the other side | "Moon! Arms up high. Lean to the side." | standing figure, arms overhead, gentle side bend |
| 7 | `turtle` | Sleepy Turtle | cool-down | 15 / 15000 | Sit comfortably, fold gently forward, arms relaxed, breathe slowly | "Sleepy Turtle! Sit and fold forward. Breathe slowly." | seated figure folded forward, arms resting, calm and still |

- **Timeline rules (numbers):** `cueClipMs` per pose is measured when the cue clip loads, fallback **2600 ms**; demo length D = clamp(`cueClipMs` + 700, 4000, 6000) → D = 4000 with the fallback; count-in exactly 3000 ms; rest exactly 2000 ms; every pose runs demo → count-in → hold → rest; no randomization.
- **Worked example (`star`, FR-002–FR-005):** measured `cueClipMs` = 3400 → D = 4100; cue voice at 300 ms; demo 0–4100; count-in 4100–7100 (`vo_ready` 4100, "3" 4700, "2" 5500, "1" 6300, `sfx_go` 7100); hold 7100–17100 with counts at 13100 / 14100 / 15100 / 16100 and `sfx_pose_done` at 17100; rest 17100–19100; butterfly demo at 19100. Fallback clip (D = 4000): count-in 4000–7000, hold 7000–17000, counts at 13000 / 14000 / 15000 / 16000.
- **Routine totals:** holds 12+10+12+8+8+8+15 = **73 s**; with fallback demos the seven segments run 7×(4000+3000) + 73,000 + 7×2000 = **136,000 ms** (≈2 min 16 s) plus a 3000 ms celebration — inside the expected 2–4 minute session.
- **Progression rule:** fixed order 1→7; Next/Previous move manually and stop at the ends; no locks, gates, scores, or adaptive difficulty; a pose counts complete only when its hold reaches `holdEnd`, recorded only as `lastDonePoseId` (section 10) — no per-pose history, no stars, no badges.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome 96 px; stage 4:3 centered max 1024×768; figure ≥320 px tall; ring 200 px diameter with ≥96 px numeral; pose name ≥48 px; controls ≥72 px with 24 px gaps. At 768–1023 px — chrome 88 px; figure ≥240 px tall; ring 160 px; numeral ≥72 px; pose name ≥40 px; controls ≥64 px with 16 px gaps. Height ≥700 px; below that scale the stage by 0.85 keeping every target ≥48 px; pose names fit ≤3 lines and shrink 10% per step to a 32 px minimum.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Pose demo start | figure eases into the pose over 1200 ms; pose name fades in 200 ms | `vo_cue_{id}` — 1.0 — one-shot at t=300 |
| Count-in beat | numeral 3/2/1 + `pict_ready` | `vo_ready`, `vo_count_3`, `vo_count_2`, `vo_count_1` — 1.0 each — one-shot at D, D+600, D+1400, D+2200 |
| Hold start | ring full; numeral = hold seconds | `sfx_go` — 0.6 — one-shot at D+3000 |
| Hold countdown | ring drains; numeral decreases each second | `vo_count_4/3/2/1` — 1.0 each — one-shot at holdEnd−4000/3000/2000/1000 |
| Hold complete | ring pulse 300 ms (scale 1→1.08→1) | `sfx_pose_done` — 0.6 — one-shot |
| Rest | figure eases to neutral over 800 ms; name and ring fade out 200 ms | none |
| Play/Pause, Replay, Previous, Next, HOME | depress 80 ms | `sfx_tap` — 0.7 — one-shot |
| Routine complete | confetti ≤40 particles 2500 ms; end card 250 ms after 3000 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Early Done | end card fades in 250 ms; no confetti | `sfx_chime` — 0.5 — one-shot; `vo_done` — 1.0 — one-shot |
| Idle hint (FR-020) | deterministic target pulses 3 s | `vo_hint` — 1.0 — one-shot (visual-only on `home` before the first gesture; never while `playing`) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play | none |
| Optional background music | none | `music_loop` — 0.2 — loop |

**Effect definitions (no undefined effects):** *ease into pose* = keyframed interpolation from the neutral figure to the pose figure over 1200 ms, ease-in-out. *breathing* = figure scale 1→1.02→1 over 3000 ms while a pose is held (demo after the 1200 ms ease-in, count-in, and hold). *ring drain* = 8 px accent stroke draining clockwise to 0 over exactly `holdMs`. *ring pulse* = scale 1→1.08→1 over 300 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s reset hold. *ring flash* = ring opacity 1→0 over 300 ms. *fade in/out* = opacity 0↔1 over 200 ms. *pulse* = target scale 1→1.12→1 over 500 ms per cycle, for 3 s. *depress* = control scale 1→0.95→1 over 80 ms. *end card* = centered panel ≤360×280 px, fill `#FFFDF7`, 4 px `#2E3A46` border, 24 px radius, opacity 0→1 with translate-y 24→0 over 250 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *muted pictogram* = 48×48 speaker-with-slash shown for 5000 ms after the first Play when speech synthesis is missing.

**Voice copy (designed, fixed):** pose cues per section 8 (each begins with the pose name); `vo_ready` = "Ready?"; `vo_count_n` = the spoken number *n*; `vo_hint` = "Press play to move. Press pause when you need a rest."; `vo_praise` = "You moved through the whole routine! Great moving!"; `vo_done` = "Great moving! You can move again any time." Voice timbre and TTS engine are build freedom; copy is fixed.

**Audio rules (v1):** no audio before the first user gesture (R-006); one voice clip at a time — a new voice clip cancels the previous utterance (FR-002); sfx may overlap each other and the voice, and `music_loop` may play under both; degradation per FR-018 (no speech → visual-only counts, no AudioContext → silent, storage blocked → run unsaved); background-tab timers may be throttled and speech suspended, handled by FR-019 (A5).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.yogaMovement.v1`.
- **Shape:** `{ "lastDonePoseId": "warmup" | "star" | "butterfly" | "tree" | "frog" | "moon" | "turtle", "updatedAt": "<ISO-8601>" }` — `lastDonePoseId` is the most recently **completed** pose (its hold reached `holdEnd`), or `warmup` when the routine was completed or nothing has been saved yet.
- **Save points:** every hold completion (writes that pose id), celebration entry (writes `warmup`), HOME, and Done; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play opens `lastDonePoseId` at `demo` t=0 and plays it; with no save or after a reset it opens `warmup`. There are no locks — every pose is reachable at any time with Next/Previous, and resumes always restart at a pose, never mid-hold.
- **Reset:** hold the reset mark 3 s (filling ring) → clears the key and in-memory progress; the keyboard equivalent is holding Enter/Space 3 s on the focused mark (FR-013).
- **Deliberately not stored:** hold progress or remaining time, phase, playback or pause state, per-pose completion history, stars/badges, audio settings, pose preferences, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy or any third party, and no Khan
Academy or Alo Yoga characters, art, audio, or names appear. Programmatic stubs are acceptable
(SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_mat` | image | soft room/mat backdrop, rounded shapes; palette below | 1280×720 SVG | static | SVG gradient + shapes |
| `fig_neutral` | image/rendered | original round-headed pictogram figure standing neutral (head circle, body capsule, rounded-stroke limbs) | 480×480 SVG | static | joint-angle stick figure |
| `fig_{poseId}` | image/rendered | the 7 pose figures per the section 8 illustration guidance | 480×480 SVG each | static frame; eased and breathing per section 9 | joint-angle stick figure |
| `ring_hold` / `ring_reset` | rendered | draining 8 px hold ring; 4 px reset ring | 200 px / 96 px, SVG stroke | drains over `holdMs` / fills over 3 s | SVG circle |
| `pict_play` / `pict_pause` / `pict_replay` / `pict_prev` / `pict_next` / `pict_done` / `pict_home` / `pict_restart` | image | triangle, bars, circular restart arrow, chevrons, checkmark, house, restart arrows | 64×64 SVG each (Play and Move again drawn at 96×96) | static | SVG paths |
| `pict_ready` / `pict_muted` | image | flag-ready glyph; speaker with slash | 64×64 / 48×48 SVG | static; muted shown 5 s after first Play when speech is missing | SVG paths |
| `sfx_tap` / `sfx_go` / `sfx_pose_done` / `sfx_chime` / `sfx_soft_tap` | audio | UI click 0.08 s; soft rising chime 0.5 s; two-note marimba 0.4 s; bright 3-note chime 0.8 s; muted tap 0.10 s | ogg/mp3 | one-shot | WebAudio blips |
| `vo_cue_{poseId}` | audio | section 8 cue copy, ×7 | ≤4 s each | one-shot | TTS allowed |
| `vo_ready` / `vo_count_1` / `vo_count_2` / `vo_count_3` / `vo_count_4` | audio | "Ready?"; spoken numbers, reused by count-in and hold | ≤1 s each | one-shot | TTS allowed |
| `vo_hint` / `vo_praise` / `vo_done` | audio | copy in section 9 | ≤3 s each | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.2 | may be omitted |

- **Palette tokens:** background `#EAF6F1`, mat `#BFE3D4`, ink `#2E3A46`, accent `#F2994A`, ring `#5B8DEF`, chrome `#FFFDF7`, confetti `#F2C94C`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); sizes per section 8.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → visual-only pacing (FR-018, R-007).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Pose` | `id: enum {warmup, star, butterfly, tree, frog, moon, turtle}`; `name: string`; `kind: enum {warmup, pose, cooldown}`; `holdMs: int 8000–15000`; `cueCopy: string`; `figKey: string`; `cueClipMs: int` (measured; fallback 2600); `alt: string` (invisible pose description for assistive tech) |
| `Routine` | `id: "move-along-1"`; `poses: Pose[7]` (fixed order); `countInMs: 3000`; `restMs: 2000` |
| `PoseTimeline` (computed) | `D: int`; `demo: [0, D]`; `countin: [D, D+3000]`; `hold: [D+3000, D+3000+holdMs]`; `rest: [holdEnd, holdEnd+2000]`; `phaseAt(tMs): enum` |
| `Save` (persisted) | `lastDonePoseId: string` (one of the 7 ids; defaults to `warmup`); `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, home, moving, celebrating, complete}`; `poseId: string`; `phase: enum {demo, countin, hold, rest}`; `playback: enum {playing, paused}`; `poseClockMs: int` (advances only while visible and playing); `focusIndex: int`; `idleTimer: id`; `utterance: object` |

The 7 `Pose` records are static data; adding a pose = one record plus its `fig_{id}` and
`vo_cue_{id}` assets. `alt` values are the section 8 descriptions; they are invisible accessible
text, not displayed.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, an animated pictogram figure with keyframed pose transitions, and a single timeline clock driving phase changes.
- **R-002** The player shall animate the section 9 effects: ease into pose, breathing, ring drain, ring pulse/fill/flash, fades, pulse, depress, end card, confetti.
- **R-003** When the user taps or clicks, the player shall hit-test per FR-016 with 12 px tolerance and single-pointer semantics; targets shall be ≥44 CSS px (most ≥64 px).
- **R-004** The player shall support keyboard focus and activation for every control: Space = play/pause, R = replay, ArrowLeft/ArrowRight = previous/next, D = Done, Escape = HOME.
- **R-005** The player shall play concurrent one-shot clips (sfx + voice, voice at 1.0) and may loop one music track at ≤0.2; a new voice clip cancels the previous utterance, so voice clips never overlap.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed (on-screen counts carry the pacing alone).
- **R-007** The player shall voice cues, ready/count, hint, praise, and Done via speech synthesis or recorded clips, and shall fall back to visual-only pacing with the on-screen numerals and ring when neither is available.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-018), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during ring drain, figure breathing, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing pose, phase, remaining hold time, or playback.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-014).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause-on-hide, a visible-time pose clock, no hold desync, no progress loss (FR-019).
- **R-013** The player shall not use a camera, microphone, pose detection, or any network communication after load.
- **R-014** The player shall render visible text only as content: the current pose name, the countdown numerals, and the decorative home title; operation shall never depend on reading.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `home` shows Play, the reset mark, and the decorative pose strip, and no audio has played |
| AC-02 | home with no save | Play is pressed | the warm-up opens at `demo` and its cue is spoken 300 ms in (with speech available) |
| AC-03 | warm-up demo with the fallback cue clip (D=4000) | the demo ends | the count-in runs 4000–7000 showing 3, 2, 1 with "Ready?", the counts at 4600/5400/6200, and `sfx_go` at 7000; the hold starts at 7000 with numeral 12 and a full ring |
| AC-04 | warm-up hold running (7000–19000) | the hold runs | "4, 3, 2, 1" are heard at 15000/16000/17000/18000; at 19000 `sfx_pose_done` and the ring pulse play; a 2000 ms rest follows and the Star demo begins at 21000 |
| AC-05 | a hold paused with 6 s remaining | Play is pressed | the hold continues from the same remaining seconds and ends 6 s later; no hold restarts |
| AC-06 | the count-in paused at D+1000 | Play is pressed | the count-in continues; the "3" cue already past is skipped and "2" and "1" fire at their times; the hold still begins at D+3000 |
| AC-07 | a pose playing | Play/Pause is double-tapped within 300 ms | exactly one toggle occurs (paused with the ring and numeral frozen); one more tap after the window toggles exactly once back to playing |
| AC-08 | the Star demo playing | Next is double-tapped within 500 ms | the voice stops and exactly one advance occurs: the Butterfly demo plays from t=0 |
| AC-09 | the warm-up (or the cool-down) showing | Previous (or Next) is pressed at the end of the routine | nothing changes on screen or in audio |
| AC-10 | the Butterfly hold running | Replay is pressed | Butterfly restarts at `demo` t=0 and plays, with its cue at 300 ms |
| AC-11 | the warm-up completed and the Star hold running | Done is pressed | `complete` shows with `vo_done` and a soft chime, no confetti; after reload Play opens the warm-up |
| AC-12 | all 7 holds completed | the cool-down rest ends | confetti, `sfx_chime`, and "You moved through the whole routine!" play; `complete` appears 3000 ms later; Move again restarts the warm-up demo; after reload Play opens the warm-up |
| AC-13 | `moving` paused and no input for 12 s | idleness continues | Play/Pause pulses 3 s and `vo_hint` plays; any tap resets and the hint repeats 12 s later |
| AC-14 | `moving` playing and no input for 12 s | idleness continues | no hint and no voice fire; the pose timeline continues |
| AC-15 | any state | a tap >12 px from every target is made | nothing changes on screen or in audio and no hint fires within 12 s of that tap |
| AC-16 | holds completed through Butterfly, then the page reloads | Play is pressed | the Butterfly demo plays from t=0 |
| AC-17 | the reset mark | it is held 3 s | a ring is visible during the hold and the save is cleared; the focused-mark keyboard hold behaves the same; after reload Play opens the warm-up |
| AC-18 | holds completed through Butterfly and the Tree hold running | HOME is pressed, then the page reloads and Play is pressed | `home` appears and the voice stops; Play opens the Butterfly demo |
| AC-19 | speech synthesis unavailable | Play is pressed | no voice plays; count-in numerals, the draining ring, and hold numerals still run; `sfx_go`/`sfx_pose_done` and the muted-speaker pictogram (5 s) behave per FR-018 |
| AC-20 | a hold running with 7 s remaining | the tab is hidden, then shown | the pose is paused with 7 s remaining on the ring and numeral; Play continues and the hold ends 7 s later (no skip) |
| AC-21 | a hold running at 1024×768 | the viewport is resized to 800×1000 | pose, phase, remaining hold, and playback are unchanged and every control is ≥64 px |
| AC-22 | `moving` with keyboard focus | Tab is pressed repeatedly, then Space, R, ArrowRight, ArrowLeft, D, Escape are used | focus visits HOME → Previous → Play/Pause → Replay → Next → Done; each key performs its section 7 action |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. All 7 poses run demo → count-in → hold → rest with the section 8 numbers and voice cues.
3. Play/Pause (including resume mid-hold), Replay, Previous/Next (with end no-ops), Done, HOME, Move again, and the 3 s reset hold all behave as specified.
4. `lastDonePoseId` resumes after a reload; reset clears it; no-speech and background-tab runs still pace the holds correctly with no desync.
5. No visible text beyond pose names and numerals; every control has an invisible accessible name.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The 7-pose routine, its names, holds, and cue copy are original; official sources publish no video titles or pose content (O4) | designed |
| A2 | A procedurally animated pictogram demonstrator is an acceptable realization of "yoga and movement videos"; no camera or pose detection is implied or required | designed — keeps the entry buildable and private |
| A3 | Hold durations 8–15 s, a 3 s ready count-in, and a 2 s rest suit ages 6–8 | designed (section 8) |
| A4 | Cue clip durations are measured, with a 2600 ms fallback and the D formula approximating natural pacing | designed (FR-002) |
| A5 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by R-006 and FR-019 |
| A6 | Bilateral poses (Tree, Moon) are practiced one side per pass; Replay and Next offer the other side on the next pass | designed — avoids per-side hold complexity while keeping the movement |
| A7 | 12 px mis-tap tolerance and ≥64 px targets are sufficient for ages 6–8 | designed platform rule (section 7) |
| A8 | Progress stores only the last completed pose; no per-pose history, scores, or badges | designed (section 10) |
| A9 | TTS-generated voice clips and runtime TTS are acceptable; English only | designed |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the 7-pose routine, names, hold times, cue copy, phase timeline and formulas, control
  set and keyboard map, no fail state, target minimums, save key and shape, original-assets rule,
  acceptance criteria.
- **Free:** exact figure composition within the illustration guidance, easing curves, voice timbre
  and TTS engine, optional music, decorative title and pose-strip styling, confetti particle look.
- **Not in this spec:** library/Videos-tab browsing or video selection beyond this routine, the
  separate Alo Yoga mindfulness entry, profiles, navigation shell, parental controls, localization,
  analytics, scoring, badges, streaks, camera or pose detection, per-side pose tracking.
