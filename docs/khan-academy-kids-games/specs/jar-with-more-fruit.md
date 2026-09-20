# Tap the jar with more fruit

## 1. Front matter

- **Entry type:** Math activity (game)
- **Catalogued entry:** [`jar-with-more-fruit.md`](../jar-with-more-fruit.md)
- **Official source:** [Khan Academy Blog — Free Kindergarten Math Games](https://blog.khanacademy.org/free-kindergarten-math-games) — blog heading "Tap the jar with more fruit"; catalogued entry description: "Children practice comparing numbers by counting the oranges in each jar and choosing the jar with more. Numerals are shown to support numeral recognition, scaffolding up to comparisons with numerals."
- **Spec status:** v1 — follows template v1; not yet blind-built · **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; no network after load
- **Section coverage:** conditional sections 6, 11, and 12 are included (multi-state, asset-bearing, data-bearing); none omitted.

## 2. Overview and learning objective

Two identical glass jars sit side by side, each holding a different number of oranges. The player counts each jar — or, in later rounds, reads the numeral tag on each jar — and taps the jar that holds more. The skill is **comparing quantities and numbers** ("more than"), the number-sense step after one-to-one counting. Age band: **4–6 (Kindergarten per the official blog)**; pre-reader rules apply; session **3–6 minutes** (ten rounds).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Children count the oranges in each jar | official | Entry description: "counting the oranges in each jar" |
| O2 | Children compare the numbers | official | Entry description: "practice comparing numbers" |
| O3 | Children choose/tap the jar with more | official | Blog heading "Tap the jar with more fruit"; entry description: "choosing the jar with more" |
| O4 | Numerals are shown to support numeral recognition | official | Entry description: "Numerals are shown to support numeral recognition" |
| O5 | Scaffolding up to comparisons with numerals | official | Entry description: "scaffolding up to comparisons with numerals" |
| O6 | Positioned for Kindergarten math | official | Catalogued entry; blog is "Free Kindergarten Math Games" |
| D1 | Two identical jars side by side, left/right positions fixed | designed | Pairwise comparison is the canonical "more" task; jar count is not stated officially; identical jars keep quantity the only cue |
| D2 | Ten rounds in three modes — fruit only, fruit + numeral tag, numerals only | designed | Operationalizes O5 into a fixed, buildable progression |
| D3 | Oranges on a 3×3 grid inside each jar, rows bottom→top, filled bottom row left→right | designed | Deterministic, jar-physical arrangement; max 9 fruit |
| D4 | Wrong tap = nudge + count-along of that jar + count badge + "That jar has *N*. Try again!" | designed | Never punishing; the reveal teaches numeral↔quantity without losing progress |
| D5 | Correct tap = glow, orange cheer, confetti, spoken comparison, auto-advance after 2.5 s | designed | Buildability invention |
| D6 | Idle hint at 12 s = count-along hint, always left jar first | designed | Never punishing; deterministic object per template v1 |
| D7 | No fail state, no score, no countdown | designed | Research: never punishing |
| D8 | Progress saved locally; Play resumes at the highest unlocked round; 3 s hold resets | designed | Session continuity without accounts; template v1 |
| D9 | All art, colors, audio, animations, and copy | designed | Buildability invention |

## 4. Player experience / core loop

A child presses Play. Round 1 shows a jar with 1 orange on the left and a jar with 2 on the right; a voice says "Count the oranges and tap the jar with more." The child taps the right jar: it glows gold, both oranges hop, confetti falls, and the voice cheers "Yes! Two is more than one!" 2.5 s later round 2 appears (3 vs 1). By round 8 the jars are lidded with numeral tags and the voice asks, "Tap the jar with the bigger number."
**Core loop:** hear the instruction → count or read both jars → tap the jar with more → count-along teaching on a wrong tap or celebration on a correct one → next round.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the game loads, it shall show a title screen with a jar logo (≥96×96 CSS px) and one Play target (≥96×96 CSS px). |
| FR-002 | When Play is pressed, the game shall start at the highest unlocked round: `playing(round = highestUnlocked)` with the left/right counts from section 8, the round's mode applied (fruit only → no numerals; fruit + numeral → one numeral tag per jar; numerals only → lidded jars with numeral tags only), and both jars side by side. Every round's counts differ by ≥1, so "more" is always strict. |
| FR-003 | When a round starts, the game shall settle the jars in (200 ms each, staggered 80 ms left→right), speak the mode's instruction, and show the tap-hand pictogram for 2 s. |
| FR-004 | When the jar holding **more** is tapped, the game shall, in order: cancel the idle timer, glow that jar gold (200 ms), bounce it (250 ms), cheer its oranges (hop, staggered 40 ms), burst confetti (≤40 particles, 600 ms), play `sfx_pop` + `sfx_chime` + `vo_praise_<round>`, save progress, and enter `celebrating`; 2.5 s later the next round starts, or `complete` after round 10. Tap-down decides; the round cannot be failed. |
| FR-005 | When the jar holding **fewer** is tapped, the game shall enter `teaching(round, jar)`: nudge the jar (300 ms), count its oranges in fill order (section 8) — each orange scales 1→1.25→1 over 250 ms, 300 ms apart, with `sfx_orange` and the spoken number at 0.9 — pop a count badge above it (visible 1.5 s), and play `sfx_soft_buzz` + `vo_wrong_count_N` ("That jar has *N*. Try again!") after the count-along. `teaching` ends 600 ms after the wrong-tap voice clip (`vo_wrong_count_N` or `vo_wrong_numeral_N`) finishes but no earlier than 2.5 s after the tap; a correct tap during `teaching` enters `celebrating` immediately (FR-004). In numerals-only mode the count-along is omitted: nudge, pulse the tapped tag (300 ms), pop a count badge above it (visible 1.5 s), `sfx_soft_buzz` + `vo_wrong_numeral_N` ("That's *N*. Try again!"). Both jars stay tappable throughout, including the jar just tapped. |
| FR-006 | When empty space is tapped, no visual or audio state shall change; the tap only resets the idle timer. |
| FR-007 | While `celebrating` or `complete`, jar taps shall be ignored; only HOME (all states) and Replay (`complete`) respond. |
| FR-008 | The game shall have no fail state, no score, and no countdown: wrong taps, empty taps, rapid taps, and idle time never remove progress, never change the round, and never lock a jar. |
| FR-009 | When no tap has occurred for 12 s, the game shall run a deterministic hint: in fruit modes, count-along the **left** jar's oranges then the **right** jar's (per-orange effect of FR-005, `vo_count_1..9` at 0.9), then replay `vo_instruction_count`; in numerals-only mode, pulse a 6 px halo (3 pulses at 1 Hz) on the left tag then the right tag, then replay `vo_instruction_numeral`. The hint repeats 12 s after it ends while idleness continues; any tap, including an empty-space tap, cancels a running hint and resets the timer. |
| FR-010 | When HOME is pressed, the game shall cancel all running timers (celebrating 2.5 s, teaching, idle 12 s), save, and show `title`. In `loading` no HOME control is rendered; a HOME press there is a no-op. |
| FR-011 | Edge cases (all states): rapid double-tap on the **correct** jar → the first tap enters `celebrating`, the second is ignored (FR-007), one save written. Rapid double-tap on the **wrong** jar → `teaching` restarts from the second tap: count-along restarts, badge visible 1.5 s from the second tap, new voice clip cancels the old (one voice at a time). Two simultaneous touches on both jars → sequential processing in touch-down order; exact same time resolves left jar first; if the wrong touch lands first and the correct second, the correct tap enters `celebrating` immediately. Repeated empty taps → FR-006 each time. Rapid Play double-tap on `title` → only the first press starts a round. Resize/rotation mid-round → reflow per section 8; round, mode, and state preserved. Tab backgrounded mid-round → state persists; timers may fire late (A8); no progress lost. No input at all → FR-009 after 12 s. |
| FR-012 | All instructions and feedback shall be understandable without reading: voice plus pictogram and numerals. Visible text is limited to numerals (the content), decorative unit icons, and the optional words "Play" and "Replay". |
| FR-013 | When the title jar logo is held for 3 s, the game shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and plays a ring flash (300 ms) plus `sfx_tap`. Holding Enter/Space for 3 s on the focused logo behaves identically. |
| FR-014 | Every interactive element (logo/reset, Play, HOME, both jars, Replay) shall carry an invisible accessible name; FR-012's text limit governs visible text only. |

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with soft background | initial state; preload assets; audio locked |
| SC-02 | `title` | jar logo + Play target | audio unlocks on first user gesture here |
| SC-03 | `playing(round)` | jar scene + HOME | main state; jars interactive |
| SC-04 | `teaching(round, jar)` | SC-03 + badge/nudge on the tapped jar | ends ≥2.5 s after the tap; jars stay interactive |
| SC-05 | `celebrating(round)` | frozen scene + confetti + praise | auto-exits after 2.5 s |
| SC-06 | `complete` | trophy + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | not transitioning | `playing(highestUnlocked)` | entry: unlock audio; FR-002/003 |
| `title` | `RESET_HOLD` | hold ≥3 s on logo | `title` | entry: fill progress ring; action: clear save + memory; ring flash + `sfx_tap` |
| `playing` | `JAR_TAP(jar)` | `jar` holds more | `celebrating(round)` | actions: FR-004; save |
| `playing` | `JAR_TAP(jar)` | `jar` holds fewer | `teaching(round, jar)` | actions: FR-005 |
| `playing` | `EMPTY_TAP` | — | `playing` | action: reset idle timer only |
| `playing` | `IDLE_12S` | no tap 12 s | `playing` | actions: FR-009 hint |
| `playing` | `HOME_PRESSED` | — | `title` | action: cancel timers; save |
| `teaching` | `JAR_TAP(jar)` | `jar` holds more | `celebrating(round)` | action: cancel teaching timer; FR-004; save |
| `teaching` | `JAR_TAP(jar)` | `jar` holds fewer | `teaching(round, jar)` | actions: FR-005; restart |
| `teaching` | `TEACHING_DONE` | wrong-tap voice done (FR-005), ≥2.5 s | `playing(round)` | action: fade badge |
| `teaching` | `IDLE_12S` | no tap 12 s | `teaching` | actions: FR-009 hint |
| `teaching` | `HOME_PRESSED` | — | `title` | action: cancel teaching timer; save |
| `celebrating` | `CELEBRATION_DONE` | round < 10 | `playing(round+1)` | action: layout next round; FR-003 |
| `celebrating` | `CELEBRATION_DONE` | round = 10 | `complete` | actions: `vo_complete`; save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel 2.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | — | `playing(1)` | action: fresh run; progress kept; FR-003 |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

**Tab order (v1):** `title` — logo → Play; `playing`/`teaching` — HOME → left jar → right jar; `celebrating` — HOME; `complete` — HOME → Replay; `loading` — none.
**HOME everywhere (v1):** HOME returns to `title` in every state except `loading` (inert), cancelling celebrating, teaching, and idle timers and saving first.

## 7. Input and interaction

- **Primary input:** single pointer tap/click inside a jar's hit area.
- **Hit areas:** a jar's hit area is its bounding box plus the 12 px tolerance — ≥280×360 CSS px at viewports ≥1024 px wide, ≥220×300 at 768–1023 px, ≥124×160 at 320–767 px (above the 44 px platform minimum because children are measurably less accurate; no scrolling is needed). Play/logo ≥96×96; HOME and Replay ≥64×64; HOME top-left with a 24 px margin.
- **Mis-tap tolerance:** taps within **12 px** of a jar's bounding box count as that jar. Where the two 12 px halos overlap (jars are 24–64 px apart), the nearer jar center wins; exact ties resolve to the **left** jar (first in reading order).
- **Drag:** none used; no drag alternative needed.
- **Keyboard:** Tab moves focus in the section 6 order; Enter/Space activates. Focus indicator: 4 px outline, ≥3:1 contrast against the background.
- **Multi-touch:** handled per FR-011 (sequential, touch-down order, same-time ties left jar first).
- **Instructions without reading:** spoken instruction + tap-hand pictogram + numeral tags; no text-only path.
- **Accessible names:** invisible names, e.g. Play = "Play"; logo = "Fruit jars, hold three seconds to reset progress"; left jar = "Left jar, showing 3 oranges" (numerals-only: "Left jar, numeral 5"); right jar likewise; HOME = "Home"; Replay = "Play again".

## 8. Levels and content data

**Orange arrangement (fruit modes):** a 3×3 grid centered inside the jar, rows numbered from the bottom (row 1 = bottom row), fill order = row 1 left→right, then row 2, then row 3; count *N* fills the first *N* cells. Worked example — 5 oranges: bottom row full (3), middle row left two (2), top row empty. Both jars use the same rule, so quantity is the only visual difference.

| Round | Mode | Left jar | Right jar | Jar with more | Gap | Progression |
|---|---|---|---|---|---|---|
| 1 | fruit only | 1 | 2 | right | 1 | correct tap → round 2 |
| 2 | fruit only | 3 | 1 | left | 2 | correct tap → round 3 |
| 3 | fruit only | 2 | 4 | right | 2 | correct tap → round 4 |
| 4 | fruit + numerals | 3 | 1 | left | 2 | correct tap → round 5 |
| 5 | fruit + numerals | 5 | 3 | left | 2 | correct tap → round 6 |
| 6 | fruit + numerals | 2 | 6 | right | 4 | correct tap → round 7 |
| 7 | fruit + numerals | 7 | 5 | left | 2 | correct tap → round 8 |
| 8 | numerals only | 4 | 8 | right | 4 | correct tap → round 9 |
| 9 | numerals only | 9 | 7 | left | 2 | correct tap → round 10 |
| 10 | numerals only | 6 | 9 | right | 3 | correct tap → `complete` screen |

- **Worked example (round 6, 2 vs 6):** the voice says "Count the oranges and tap the jar with more." The child taps the left jar (2 oranges, wrong): it nudges, "one" and "two" play as its oranges scale up in fill order, a "2" badge shows for 1.5 s, then "That jar has two. Try again!" The child taps the right jar: it glows, its six oranges hop, confetti falls, "Yes! Six is more than two!" plays, progress is saved, and 2.5 s later round 7 appears (7 vs 5).
- **Mode definition:** fruit only = no numerals anywhere; fruit + numeral = one numeral tag (cream tag, ink numeral) below each jar; numerals only = identical lidded jars, no oranges, tag centered on each jar. Tag numerals are content, never instruction.
- **Randomization:** none. Round order, counts, more-side, modes, and orange placement are fixed; a rerun of a round is identical. No seed or backfill needed.
- **Progression rule:** fixed and completion-gated (tap the more jar once). No timer, no score, no adaptive difficulty; the next round starts 2.5 s after the correct tap.
- **Layout numbers:** at width ≥1024 px, jar 280×360 px, jarGap 64 px, tag 140×140 px, numeral ≥96 px. At 768–1023 px, jar 220×300, jarGap 40, tag 112×112, numeral ≥72. Below 768 px, jarWidth = min(220, (viewportWidth − 48 − 24) / 2), jarHeight = round(jarWidth × 1.29), jarGap 24, tag 96×96, numeral ≥60; no scrolling down to 320×480. Jars rest on a shelf line at 62% of the play-field height. Orange diameter = clamp((jarWidth − 40 − 2×cellGap) / 3, 18, 64) px, cellGap = 12 px at ≥1024, 8 px at 768–1023, 6 px below.

## 9. Feedback, rewards, and audio cues

Effect definitions (reused by the FRs): **glow** = 8 px gold `#F2B84B` outline fading out over 200 ms; **bounce** = translateY 0→−16→0 over 250 ms; **hop** = scale 1→1.2→1 over 200 ms; **nudge** = translateX 0→−6→+6→0 twice over 300 ms; **pop** = scale 0→1 over 150 ms; **pulse** = scale 1→1.08→1 over 300 ms; **fade** = opacity 1→0 over 150 ms; **halo** = 6 px accent `#6FA8DC` ring, scale 1.0→1.15 at 1 Hz for 3 pulses; **confetti** = ≤40 particles falling 600 ms in gold, orange, and leaf-green; **ring fill** = SVG stroke-dashoffset 0→100% linear over 3 s; **ring flash** = progress-ring opacity 1→0 over 300 ms; **settle in** = scale 0.9→1 with opacity 0→1 over 200 ms; **depress** = button scale 1→0.95→1 over 80 ms; **count-along** = orange scale 1→1.25→1 over 250 ms every 300 ms in fill order.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Round start | jars settle in, staggered 80 ms; tap-hand 2 s | `vo_instruction_count` or `vo_instruction_numeral` — 1.0 — one-shot |
| Correct jar tapped | glow, jar bounce, orange hop, confetti | `sfx_pop` — 0.7 — one-shot; `sfx_chime` — 0.8 — one-shot; `vo_praise_<round>` — 1.0 — one-shot |
| Wrong jar tapped (fruit modes) | nudge, count-along, count badge 1.5 s | `sfx_orange` — 0.5 — one-shot per orange; `vo_count_1..9` — 0.9 — one-shot each; `sfx_soft_buzz` — 0.5 — one-shot; `vo_wrong_count_N` — 0.9 — one-shot |
| Wrong jar tapped (numerals only) | nudge, tag pulse 300 ms, count badge 1.5 s | `sfx_soft_buzz` — 0.5 — one-shot; `vo_wrong_numeral_N` — 0.9 — one-shot |
| Empty tap | none | none |
| Idle hint (FR-009) | count-along left then right, or halo left then right tag | `sfx_orange` — 0.5; `vo_count_1..9` — 0.9; instruction — 0.9 — one-shots |
| Game complete (round 10) | trophy + full-scene confetti | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot |
| HOME / Play / Replay pressed | depress 80 ms | `sfx_tap` — 0.6 — one-shot |
| Reset hold completed | progress ring fills over the hold; ring flash 300 ms | `sfx_tap` — 0.6 — one-shot |
| Optional background music | none | `music_loop` — 0.15 — loop (may be omitted) |

Copy: `vo_instruction_count` = "Count the oranges and tap the jar with more."; `vo_instruction_numeral` = "Tap the jar with the bigger number."; `vo_wrong_count_N` = "That jar has *N*. Try again!"; `vo_wrong_numeral_N` = "That's *N*. Try again!" (no negative wording); `vo_praise_<round>` = "Yes! *A* is more than *B*!" using the round's two counts; `vo_complete` = "You found the jar with more every time!" Timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (unlocked on Play, R-006); each new voice clip cancels the previous utterance; degradation — no speech synthesis → visual only (numerals, badges, count-along carry play, R-011); no audio context → silent; storage blocked (throws / private mode) → run unsaved in memory. Background-tab timers may fire late; on `visibilitychange` to visible the game runs any expired timer (R-014) and never loses progress.

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.moreFruit.v1`
- **Shape:** `{ "highestUnlocked": 1-10, "roundsCompleted": 0-10, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `celebrating` (round complete), entering `complete`, any HOME press.
- **Field updates:** completing round *r* saves `roundsCompleted = max(roundsCompleted, r)` and `highestUnlocked = min(10, max(highestUnlocked, r + 1))`.
- **Timestamps:** `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play resumes at `highestUnlocked` (round 1 on first load).
- **Reset:** hold the title logo 3 s (ring feedback) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo.
- **Deliberately not stored:** per-tap data, wrong-tap counts, timings, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_shelf` | image | soft kitchen-shelf backdrop, warm gradient, faint dots; palette below | 1024×768 SVG | static | SVG gradient + circles |
| `jar_glass` | image | clear glass jar, 3×3 orange grid etched faintly; both jars identical | 280×360 SVG, scales | static | SVG rounded rect + grid guides |
| `jar_lid` | image | metal lid on the same glass jar body | 280×64 SVG, scales | static (numerals-only mode) | SVG rounded rect |
| `orange` | image | generic orange: orange circle, small leaf, one segment highlight | 64×64 SVG, scales | static / hop / count-along | SVG circle + path |
| `numeral_tag` | image | cream paper tag with string loop; numeral rendered at runtime | 140×140 SVG, scales | static / pulse / halo | SVG rect + loop |
| `pict_tap_hand` | image | white tapping-hand pictogram | 64×64 SVG | shown 2 s at round start, then hidden | SVG path |
| `badge` | rendered | numeral in a rounded rect, cream fill, 2 px ink border | runtime text | pop; visible 1.5 s | none needed |
| `halo` | image | 6 px accent ring | 96×96 SVG, scales | 3 pulses per hint target | SVG circle stroke |
| `trophy` | image | simple gold cup | 200×200 SVG | static | SVG path |
| `sfx_pop` | audio | bubble pop | 0.15 s, ogg/mp3 | one-shot | WebAudio blip |
| `sfx_orange` | audio | soft marimba pluck | 0.12 s | one-shot | WebAudio blip |
| `sfx_soft_buzz` | audio | soft low boop (never a harsh buzzer) | 0.2 s | one-shot | WebAudio sine drop |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `vo_instruction_count` | audio | "Count the oranges and tap the jar with more." | ≤3 s | one-shot | TTS allowed |
| `vo_instruction_numeral` | audio | "Tap the jar with the bigger number." | ≤2.5 s | one-shot | TTS allowed |
| `vo_count_1..9` | audio | spoken numbers one–nine | ≤1 s each | one-shot | TTS allowed |
| `vo_wrong_count_1..9` | audio | "That jar has *N*. Try again!" | ≤2 s each | one-shot | TTS allowed |
| `vo_wrong_numeral_1..9` | audio | "That's *N*. Try again!" | ≤1.5 s each | one-shot | TTS allowed |
| `vo_praise_1..10` | audio | "Yes! *A* is more than *B*!" per round table | ≤2.5 s each | one-shot | TTS allowed |
| `vo_complete` | audio | "You found the jar with more every time!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 | may be omitted |

- **Palette tokens:** background `#FDF6EC`, glass `#DCEBF2`, shelf `#C89B6B`, ink `#3E2C1E`, orange `#F79B4A`, leaf `#7BC47F`, accent `#6FA8DC`, gold `#F2B84B`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); tag numerals ≥96 px at 1024×768, ≥72 px at 768–1023, ≥60 px below; the word "Play" optional.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → continue silently (R-011).

## 12. State and data shapes

| Name | Field | Type | Notes |
|---|---|---|---|
| `LevelConfig` | `round` / `mode` | `1–10` / `fruit \| fruit+numeral \| numeral` | section 8 table; mode controls tag and lid visibility |
| | `leftCount`, `rightCount`, `moreSide` | `1–9`, `left \| right` | counts always differ by ≥1; `moreSide` is strictly defined by them |
| | `orangeSlots` | `{ x: int, y: int }[9]` | precomputed fill order inside a jar |
| `SaveState` (persisted) | `highestUnlocked` / `roundsCompleted` | `1–10` / `0–10` | resume point for Play; max round completed |
| | `updatedAt` | string | ISO-8601, refreshed each save |
| `SessionState` (memory) | `state` | `loading \| title \| playing \| teaching \| celebrating \| complete` | section 6 |
| | `round`, `teachingJar` | number, `left \| right \| null` | current round; jar during teaching |
| | `idleTimer`, `teachingTimer`, `celebrationTimer` | timer ids | cleared on HOME and transitions |

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites and large text numerals.
- **R-002** The game shall animate slides, scale pops, pulses, bounces, a nudge wobble, a count-along scale sequence, and a ≤40-particle burst.
- **R-003** When the player taps or clicks a target, the game shall hit-test a pointer event against jar bounding boxes with a 12 px edge tolerance.
- **R-004** The game shall support keyboard focus and activation for all interactive targets.
- **R-005** The game shall play concurrent one-shot audio clips (sfx + voice) and may loop one music track at ≤0.15 volume.
- **R-006** When the browser blocks audio before a user gesture, the game shall defer all audio until the first interaction (Play) and shall not require sound to proceed.
- **R-007** The game shall persist and restore one small JSON save object in browser local storage, and shall run unsaved when storage is unavailable.
- **R-008** The game shall run offline with no network requests after initial load.
- **R-009** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-010** The game shall provide hit targets ≥64 CSS px and visible focus indicators.
- **R-011** When a voice clip or audio API fails, the game shall continue with visual feedback only.
- **R-012** The game shall scale from 768×1024 to 1366×768 viewports without losing state; no scrolling down to 320×480.
- **R-013** The game shall expose an invisible accessible name on every interactive element.
- **R-014** When the tab is backgrounded and timers are throttled, the game shall run any expired timer once visibility is restored and shall not lose progress.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the title screen shows a jar logo and a Play target |
| AC-02 | a first load | Play is pressed | round 1 starts with 1 orange left and 2 right, the voice says "Count the oranges and tap the jar with more.", and no audio played before this gesture |
| AC-03 | saved progress at round 6 | Play is pressed | round 6 starts with 2 oranges left and 6 right, each with its numeral tag |
| AC-04 | round 1 | the left jar (1 orange) is tapped | it nudges, "one" plays as the orange scales up, a "1" badge shows for 1.5 s, "That jar has one. Try again!" plays, and the round remains playable |
| AC-05 | round 6 | the wrong jar is tapped, then the correct jar | the celebration plays with "Yes! Six is more than two!", progress is saved, and 2.5 s later round 7 shows 7 vs 5 |
| AC-06 | the more jar | it is double-tapped rapidly | the celebration starts once and the second tap produces no additional visual or audio feedback |
| AC-07 | the fewer jar | it is tapped twice within 1 s | the count-along restarts, the badge is visible 1.5 s from the second tap, and only one voice clip is audible at a time |
| AC-08 | both jars | simultaneous touches land, wrong jar first | teaching starts for the wrong jar and the correct touch immediately starts the celebration |
| AC-09 | any round | empty space is tapped | nothing on screen changes and no sound plays |
| AC-10 | round 8 | it starts | both jars are lidded, tags read "4" and "8", the voice says "Tap the jar with the bigger number.", and tapping the right jar advances toward round 9 |
| AC-11 | 12 s with no tap | idleness continues | the left jar's oranges then the right jar's are counted aloud, the instruction replays, and no progress is lost; any tap resets the timer |
| AC-12 | keyboard focus | Tab reaches a jar and Enter is pressed | it behaves exactly as a tap |
| AC-13 | the celebration is playing | HOME is pressed | the 2.5 s timer is cancelled, the save is written, and the title screen appears |
| AC-14 | round 10 completion | celebration ends | the trophy screen appears and progress is saved |
| AC-15 | a saved game | the page reloads and Play is pressed | play resumes at the highest unlocked round with the correct counts and mode |
| AC-16 | the title screen | the logo is held 3 s | a progress ring is visible during the hold and the save is cleared on completion; the keyboard equivalent behaves the same |
| AC-17 | a mid-round resize (e.g. 1024×768 → 800×900) | the layout reflows | both jars stay side by side with ≥220×300 px hit areas and the same round's counts and mode remain on screen |
| AC-18 | five wrong taps in a row on round 1 | each lands | no score, loss, or round change occurs and both jars remain tappable |
| AC-19 | speech synthesis is unavailable | any round plays | all feedback is still visible on screen (counts, badges, numerals) and the game remains completable |
| AC-20 | any interactive element (Play, logo/reset, HOME, each jar, Replay) | it is inspected with assistive technology | an invisible accessible name is exposed (e.g. left jar = "Left jar, showing 3 oranges") |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. One full round completes end-to-end: instruction, wrong-tap count-along, correct-tap celebration, auto-advance.
3. All ten rounds match the table values, including the numerals-only mode; progress survives a reload and resets via the 3 s hold.
4. No fail state exists; every edge case in FR-011 behaves as specified.
5. Runs offline in a browser at 1024×768, 768×1024, and 320×480.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Two jars per round, side by side | designed — pairwise comparison is the canonical "more" task; the official source states no jar count |
| A2 | Maximum count 9; ten rounds | designed — fits the 3×3 arrangement and a 3–6 minute session |
| A3 | Three modes (fruit → fruit + numerals → numerals only) are the designed reading of "scaffolding up to comparisons with numerals" | designed interpretation of O5 |
| A4 | Counts within a round never tie (gap ≥1) | designed — "more" must be strict and unambiguous |
| A5 | Orange arrangement and jar styling are fixed; both jars look identical | designed (section 8) — quantity is the only cue |
| A6 | TTS-generated voice clips are acceptable for the build | designed |
| A7 | Browsers block autoplay until the first gesture | platform fact — handled by R-006 |
| A8 | Background-tab timers may be throttled; hints and auto-advance fire late | known platform behavior — handled by R-014 |
| A9 | Storage may be unavailable (private mode); the game runs unsaved | platform fact — handled by R-007 |
| A10 | `speechSynthesis` voices may load asynchronously; the first clip may be delayed | platform fact — visual feedback is independent |
| A11 | The in-app activity name may differ from the blog heading | catalogued entry note |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** round table values, modes, correct/wrong feedback semantics, count-along order, no fail state, hit-target minimums, save key and shape, original-asset rule, acceptance criteria.
- **Free:** exact composition within the layout numbers, easing curves, particle specifics, voice timbre/TTS engine, optional music, whether Play/Replay show words or glyphs, jar/tag decoration within the palette tokens.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, scoring or adaptive difficulty, teacher tooling.
