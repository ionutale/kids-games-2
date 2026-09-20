# Baby Shark

## 1. Front matter

- **Entry type:** Interactive player — sing-along song
- **Catalogued entry:** [`baby-shark.md`](../baby-shark.md)
- **Official source:** [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids), [Find books and lessons](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library), [App Store listing](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); repo wording "Baby Shark by Super Simple Songs" in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) line 84, named-songs list line 217, partner content line 267
- **Spec status:** v1 — second sing-along spec (after `head-shoulders-knees-and-toes`); matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load; no camera or microphone
- **Conditional sections:** all 16 included; none omitted. Player equivalents replace game-only blocks: one song section replaces a level, the song-end celebration replaces a win condition, completion replaces scoring. The title "Baby Shark" is retained for catalog traceability only.

## 2. Overview and learning objective

A child presses Play and an original rendition of the traditional public-domain camp song begins. As each family shark's call is sung, that shark's card highlights and the child taps the matching card; during the "doo doo doo" refrain a hand-motion pictogram cues an optional follow-along gesture (fin, chomp, swim). One pass through eight sections (family, all sharks, run away, safe at last) at 150→200→120 BPM. Skills: **listening and receptive vocabulary for family roles** plus **rhythm participation** and **sing-along participation** for pre-readers. Age band: **2–5 (preschool; catalogued as a Videos-tab song)**. Expected session: **3–6 minutes**; one play-through is **117 s** from Play to end card.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Baby Shark" is a sing-along video in the Khan Kids Videos library, named in official sources | official | `khan-academy-kids-games.md` line 84 and line 217; catalogued entry |
| O2 | The video is sourced from Super Simple Songs, an officially listed content partner that provides music and sing-along videos | official | Catalogued entry Description; `khan-academy-kids-games.md` line 267; App Store listing |
| O3 | The app serves ages 2–8 and songs are browsed in the Videos tab | official | `khan-academy-kids-games.md` lines 84 and 160–172; sibling song spec |
| O4 | The exact recording, arrangement, lyrics, character art, and video of the Khan Kids rendition are not published in the surveyed official sources | official | Catalogued entry; no media published in the sources |
| D1 | The build is the traditional camp song (public-domain family-role verses and "doo doo doo" hook); its melody, arrangement, tempo map, and lyric timing are an original composition written as data in section 8, transcribed from no commercial recording | designed (content basis is public domain; not a Khan Academy or partner source) | O4 publishes no song text or audio; Pinkfong and Super Simple recordings are copyrighted and are not reproduced |
| D2 | All recordings, art, voice, and animation are original; shark designs are intentionally distinct from Pinkfong/Super Simple characters (angular geometric shapes, matte deep-sea palette, single dot eyes — no pink-and-glossy baby-face style); the partner name appears in provenance only | designed (IP rule) | Buildability invention; avoids copying unpublished or third-party media |
| D3 | Tap-along: 6 family cards, target-card highlight on each sung call, acceptance/early/late/teach/neutral rules (section 5) | designed | The minimal designed interaction the interactive-player type promises; audio-first for non-readers |
| D4 | 8 sections with a 150→200→120 BPM tempo map, 102400 ms of song, song end at 113300 ms | designed | Implements the traditional family sequence and chase; numbers in section 8 |
| D5 | Chrome: Play/Pause, Replay, HOME, 8 section dots; no quiz, no score, no fail state | designed | Player chrome promised by the entry type; never punishing (ages 2–5) |
| D6 | Gesture pictograms (fin, chomp, swim) during the doo refrain, unscored, no camera or microphone use | designed | Movement participation for ages 2–5 without motion tracking |
| D7 | Save/resume (`lastSection`), hidden 3 s reset, idle hint, audio and degradation rules | designed | Template v1; session continuity without accounts |

## 4. Player experience / core loop

A child presses the big Play on the title. After a 2500 ms lead-in the song begins: a voice sings "Baby shark" and the small teal baby card lights up; the child taps it and it bounces with a sparkle, while the lyric strip shows the line and the doo words bob along. "Mama shark" comes next, and so on through the family; during each doo run a hand pictogram flaps, chomps, or paddles. At "Run away" the tempo jumps, at "Safe at last" it settles, confetti pops, a voice says "You swam with the whole shark family!", and the end card offers Replay or HOME. Nothing is ever lost — taps off the beat, wrong cards, and silence are all answered gently.

**Core loop:** hear a shark's call → see its card light up → tap the matching card → gentle affirmation → doo refrain with a gesture cue → next shark → faster chase → song-end celebration.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload section 11 assets, then `title`: a decorative ocean scene, one Play target ≥96×96 CSS px, a reset logo ≥64×64 CSS px (FR-011), and 8 section dots (12 px each). No audio plays before the first user gesture (FR-016). |
| FR-002 | When Play is pressed, it shall unlock audio, run a 2500 ms lead-in, then start a section at t=0: the resume section (`lastSection` unless `completed` is true, then section 1). On the first Play after load only, `vo_intro` plays once during the lead-in (volume 1.0, one-shot). A run resumed at section *s* uses section *s*'s BPM with t=0 at that section's start; word onset = 2500 + beat × beatMs(*s*) (section 8). |
| FR-003 | Each section shall play one deterministic 32-beat timeline driven by a single clock: lines 1–4 in order at the section 8 grid; each call occurrence (beats 0, 8, 16, 24) highlights its target card within 100 ms after onset and the highlight holds until the next call's onset (section end for the 4th); the lyric strip shows the current line and highlights the word being sung for its beat span; a gesture pictogram (≥96×96) shows during each doo run (beats 2–8 of lines 1–3), alternating two frames every 500 ms; 1200 ms after the section's last beat the next section starts at its BPM (after section 8 the song ends). Pause freezes the clock; Replay and resume restart the current section at its start. |
| FR-004 | Tap judgment shall use the **target model**: the target at time *t* is the call occurrence with `onset ≤ t` whose `displayEnd` (next call occurrence's onset, or the section end for the 4th) is after *t*. When *t* is before the first call of a section or between sections, the target is none (subject to the FR-006 early rule). |
| FR-005 | When the target card is tapped at Δ = `t − onset`: Δ ≤ 1000 ms → **on-time affirmation** (card bounce, `sfx_ding`, sparkle ≤3 per occurrence, section 9); Δ > 1000 ms while displayed → **late nudge** (target card soft pulse + `sfx_soft_tap`). Neither changes a score, ends the song, or blocks play. An occurrence with no tap is silent: no feedback, no record, no penalty. |
| FR-006 | When a non-target card is tapped whose next occurrence's onset is ≤800 ms away, that shall be an **early get-ready** (card soft pulse + `sfx_soft_tap`, no voice, no affirmation), and this rule takes precedence over the neutral and teach rules when its condition holds. If several cards qualify, the earliest onset wins; exact onset ties resolve to the lowest card index (1 = baby … 6 = all sharks). |
| FR-007 | When any other card is tapped while a target is displayed, that shall be a **wrong-shark gentle teach**: the tapped card jiggles 300 ms, the target card soft-pulses, `sfx_soft_tap` plays, and the tapped card's call clip speaks once (volume 0.7, one-shot, melody ducked to 0.4 while it plays). The teach voice is throttled to one per 1200 ms; taps inside the throttle keep the visual feedback but play no voice. |
| FR-008 | When a card is tapped with no target displayed and no early condition (lead-in, inter-section gaps, `paused`, `celebrating`, `endcard`), the tap shall be **neutral**: card depress 80 ms + `sfx_tap`, no judgment, no voice. |
| FR-009 | Repeated taps shall be judged independently: double-tapping the target yields two affirmations (the second visual-only while the `sfx_ding` 300 ms throttle holds); a rapid run of wrong-card taps yields a jiggle per tap with at most one teach voice per 1200 ms; sparkles cap at 3 per occurrence. Nothing is ever scored, deducted, or locked. |
| FR-010 | A Play/Pause target ≥64×64 CSS px shall toggle playback. Pause cancels the voice and melody and freezes the clock, highlight, and target. Resume restarts the current section at its start (target state resets with it). |
| FR-011 | A Replay target ≥64×64 CSS px (≥96×96 on the end card) shall cancel audio and restart section 1 at t=0, saving `lastSection = 1`. HOME (≥64×64 CSS px, 24 px top-left margin) is rendered in `player`, `celebrating`, and `endcard`; it cancels voices/timers, saves, and returns to `title`. On `title` (the home screen) and `loading`, no HOME control is rendered and a HOME input is a no-op. When the title logo is held 3 s, the player shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and plays a ring flash plus `sfx_soft_tap`; holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-012 | When the section-8 timeline ends, the player shall wait 1200 ms, then enter `celebrating` for 2500 ms: confetti (≤40 particles), `sfx_chime` (0.8), `vo_praise` (1.0), and a `completed: true` save. At 2500 ms it shall enter `endcard`: a paper panel with Replay and HOME and no score or numbers. Replay from `endcard` starts section 1 and saves `lastSection = 1`. |
| FR-013 | When no input has occurred for 12 s in `title`, `player` while `paused`, or `endcard`, the player shall pulse one deterministic target for 3 s — `title`: Play; `paused`: Play/Pause; `endcard`: Replay — and replay `vo_hint` (volume 1.0, one-shot; visual-only before the first user gesture). While `singing`, no hint fires (the song is the pacing). The hint repeats every 12 s of continued idleness; any input, including an empty-space tap, resets the timer. |
| FR-014 | No-reading rule: the only visible text is content — the lyric strip, the optional decorative title, and section dots and pictograms (graphics, not text). Every instruction and feedback reaches a non-reader by voice + pictogram. Every interactive element (logo, Play, HOME, Play/Pause, Replay, each of the 6 cards) carries an invisible accessible name; this rule governs visible text only. The player shall not request camera or microphone access; gestures are unscored visual cues. |
| FR-015 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Card hit rects take a 12 px expansion on all sides; on overlap the nearest card center wins and exact ties resolve to the lowest card index (1 = baby … 6 = all sharks). A tap >12 px from every hit rect is an empty tap (no state change, idle timer resets). Taps never drag: no drag gestures exist. Throttles: Play/Pause 300 ms; Replay 300 ms; teach voice 1200 ms; `sfx_ding` 300 ms; home logo reset hold 3000 ms. Taps inside a throttle keep their visual feedback and drop only the throttled sound. |
| FR-016 | Audio: melody note events (call notes and doo notes) are synthesized from the section 8 data at bus volume 0.5; an optional beat click plays once per beat of the current section at 0.2; all voice and sfx are one-shots (optional `music_title` loops at 0.15). Only one voice clip plays at a time — a new voice clip (call, teach, `vo_hint`, `vo_praise`, `vo_intro`) cancels the previous utterance. Melody and sfx may overlap. No audio plays before the first user gesture; the melody bus ducks to 0.4 within 120 ms while a teach voice plays and restores over 200 ms. |
| FR-017 | Degradation: no speech synthesis → call clips are skipped, the melody note events and all visual highlights run from the clock, and a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → the whole player runs silent with identical visuals and judgments, and the pictogram shows. Storage blocked → the player runs unsaved with full in-memory behavior. |
| FR-018 | Background tab: when the tab becomes hidden during `singing`, the player shall cancel voice/melody and enter `paused` with the clock and highlight frozen; on return it stays paused until Play (FR-010). Idle time counts visible time only; throttled timers may delay hints, never lose saved progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; preload; audio locked |
| `title` | ocean scene + Play + reset logo + 8 section dots | the player's home; audio unlocks on the first gesture |
| `player(section, mode)` | shark scene + lyric strip + gesture pictogram + 6 cards + chrome | section 1–8; mode ∈ {singing, paused} |
| `celebrating` | frozen last frame + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `player(resumeSection, singing)` | actions: lead-in 2500 ms; `vo_intro` on first play; save on section start |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `player` | `PLAY_PAUSE` | — | `player(same, toggled)` | action: FR-010 |
| `player` | `REPLAY` | — | `player(1, singing)` | action: save `lastSection = 1` |
| `player` | `CARD_TAP` | target displayed | `player(same)` | actions: FR-005/FR-007 |
| `player` | `CARD_TAP` | upcoming call ≤800 ms | `player(same)` | action: FR-006 early get-ready |
| `player` | `CARD_TAP` | no target, no early | `player(same)` | action: FR-008 neutral |
| `player` | `SECTION_END` | section < 8 | `player(section+1, singing)` | actions: 1200 ms gap; `sfx_splash`; upcoming card soft pulse; save `lastSection` |
| `player` | `SONG_END` | section = 8, +1200 ms | `celebrating` | actions: FR-012; save `completed` |
| `player` | `HOME_PRESSED` | — | `title` | action: cancel voice/timers, save |
| `player` | `TAB_HIDDEN` | `singing` | `player(same, paused)` | action: cancel voice/melody, freeze (FR-018) |
| `player` | `IDLE_12S` | `paused` | `player` | action: FR-013 hint |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms | `endcard` | none |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel timer, save |
| `endcard` | `REPLAY_PRESSED` | — | `player(1, singing)` | action: save `lastSection = 1` |
| `endcard` | `HOME_PRESSED` | — | `title` | action: save |
| `title` / `endcard` | `IDLE_12S` | no input 12 s | same state | action: FR-013 hint |

Events not listed for a state are ignored (no state change, no sound). **HOME everywhere:** `loading` and `title` render no HOME control and a HOME input is a no-op (title is home); in `player`, `celebrating`, and `endcard`, HOME cancels audio and timers, saves, and returns to `title`.

**Tab order (v1):** `title` — logo (reset) → Play; `player` — HOME → Play/Pause → Replay → cards 1–6 in reading order (baby, mama, papa, grandma, grandpa, all sharks); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play / pause | tap Play/Pause | Space (when no control is focused) or Enter/Space on the focused target |
| Replay the song | tap Replay | Tab to Replay + Enter/Space |
| Tap a shark card | tap a card | Tab to the card + Enter/Space |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** cards ≥128×128 CSS px at ≥1024 px wide and ≥104×104 at 768–1023 px (well above the 44 px minimum, because the audience is 2–5); Play/end-card Replay ≥96×96; chrome HOME, Play/Pause, Replay ≥64×64; gesture pictogram ≥96×96 but non-interactive (no hit rect). Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-015; overlaps resolve to the nearest card center, exact ties to the lowest card index; >12 px from every card is an empty tap (idle resets).
- **Multi-touch / gestures:** first pointer down wins; extra pointers ignored until release; no drag gestures exist, so no drag alternative is required; no camera or motion input.
- **Instructions without reading:** the intro voice + `vo_hint` carry meaning; chrome is pictogram + invisible name; FR-014 limits visible text to content.
- **Accessible names:** invisible names on every interactive element (FR-014/R-011) — "Play song", "Pause song", "Home", "Replay song", "Reset", "Shark card: Baby" … "Shark card: All sharks". The gesture pictogram is decorative (no accessible name required; `aria-hidden`).
- **Resize:** viewport resize or rotation mid-section reflows per section 8, preserving section, mode, clock, and highlight state.

## 8. Levels and content data

**Song structure (designed; public-domain song per D1).** Eight sections of 32 beats each; every section is four lines: lines 1–3 are "call + 6 doos", line 4 repeats the call and rests. Sections 1–6 run at 150 BPM, the chase at 200 BPM, the close at 120 BPM. Notes are scientific pitch (C4 = middle C, 261.63 Hz); note durations and beat spans are in beats.

| # | Role | Call text | Target card | Gesture | BPM | Beat (ms) | Start (ms, full run) | End (ms) | Duration (ms) | Gap after |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | baby | Baby shark | card_baby | fin | 150 | 400 | 2500 | 15300 | 12800 | 1200 |
| 2 | mama | Mama shark | card_mama | fin | 150 | 400 | 16500 | 29300 | 12800 | 1200 |
| 3 | papa | Papa shark | card_papa | chomp | 150 | 400 | 30500 | 43300 | 12800 | 1200 |
| 4 | grandma | Grandma shark | card_grandma | chomp | 150 | 400 | 44500 | 57300 | 12800 | 1200 |
| 5 | grandpa | Grandpa shark | card_grandpa | swim | 150 | 400 | 58500 | 71300 | 12800 | 1200 |
| 6 | all | All sharks | card_all | swim | 150 | 400 | 72500 | 85300 | 12800 | 1200 |
| 7 | run away | Run away | card_all | swim (fast) | 200 | 300 | 86500 | 96100 | 9600 | 1200 |
| 8 | safe | Safe at last | card_all | fin (calm) | 120 | 500 | 97300 | 113300 | 16000 | celebration at 114500; `endcard` 117000 |

**Call-phrase timing table (per section; beats relative to the call's onset; every occurrence uses the same pattern).**

| # | Call text | Word grid (beats — note(s)) |
|---|---|---|
| 1 | Baby shark | Baby 0–1 (G4 0.5 · A4 0.5) · shark 1–2 (G4 1) |
| 2 | Mama shark | Mama 0–1 (F4 0.5 · G4 0.5) · shark 1–2 (F4 1) |
| 3 | Papa shark | Papa 0–1 (E4 0.5 · F4 0.5) · shark 1–2 (E4 1) |
| 4 | Grandma shark | Grandma 0–1 (D4 0.5 · E4 0.5) · shark 1–2 (D4 1) |
| 5 | Grandpa shark | Grandpa 0–1 (C4 0.5 · D4 0.5) · shark 1–2 (C4 1) |
| 6 | All sharks | All 0–1 (G4 1) · sharks 1–2 (E4 1) |
| 7 | Run away | Run 0–1 (A4 1) · away 1–2 (A4 0.5 · G4 0.5) |
| 8 | Safe at last | Safe 0–0.5 (E4 0.5) · at 0.5–1 (F4 0.5) · last 1–2 (E4 1) |

**Doo grid (identical in every section and in lines 1–3 of each section; beats relative to the doo run's start at line beat 2).**

| Doo # | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| Beat span | 2–3 | 3–4 | 4–5 | 5–6 | 6–7 | 7–8 |
| Note | E4 | E4 | D4 | D4 | C4 | D4 |

**Line and target template (per 32-beat section).**

| Line | Beats | Content | Target occurrence |
|---|---|---|---|
| 1 | 0–8 | call at 0–2, doos at 2–8 | onset beat 0; displayEnd beat 8 |
| 2 | 8–16 | call at 8–10, doos at 10–16 | onset beat 8; displayEnd beat 16 |
| 3 | 16–24 | call at 16–18, doos at 18–24 | onset beat 16; displayEnd beat 24 |
| 4 | 24–32 | call at 24–26, rest 26–32 | onset beat 24; displayEnd beat 32 |

- **Full lyric (designed arrangement; punctuation is display-only).** Lines 1–3 of each section are identical; line 4 is the call alone.
  1. Baby shark, doo doo doo doo doo doo / Baby shark, doo doo doo doo doo doo / Baby shark, doo doo doo doo doo doo / Baby shark!
  2. Mama shark, doo doo doo doo doo doo / Mama shark, doo doo doo doo doo doo / Mama shark, doo doo doo doo doo doo / Mama shark!
  3. Papa shark, doo doo doo doo doo doo / Papa shark, doo doo doo doo doo doo / Papa shark, doo doo doo doo doo doo / Papa shark!
  4. Grandma shark, doo doo doo doo doo doo / Grandma shark, doo doo doo doo doo doo / Grandma shark, doo doo doo doo doo doo / Grandma shark!
  5. Grandpa shark, doo doo doo doo doo doo / Grandpa shark, doo doo doo doo doo doo / Grandpa shark, doo doo doo doo doo doo / Grandpa shark!
  6. All sharks, doo doo doo doo doo doo / All sharks, doo doo doo doo doo doo / All sharks, doo doo doo doo doo doo / All sharks!
  7. Run away, doo doo doo doo doo doo / Run away, doo doo doo doo doo doo / Run away, doo doo doo doo doo doo / Run away!
  8. Safe at last, doo doo doo doo doo doo / Safe at last, doo doo doo doo doo doo / Safe at last, doo doo doo doo doo doo / Safe at last!
- **Worked example, section 1 line 1 (start 2500 ms, 400 ms/beat):** Baby 2500 (G4 0.5 · A4 0.5), shark 2900 (G4 1), doos 3300, 3700, 4100, 4500, 4900, 5300 (E4 E4 D4 D4 C4 D4); line 2's call at 5700; line 4's call at 12100; section ends 15300.
- **Worked example, section 8 line 1 (start 97300 ms, 500 ms/beat):** Safe 97300, at 97550, last 97800, doos 98300, 98800, 99300, 99800, 100300, 100800; line 2's call at 101300; section ends 113300. In a run resumed at section *s*, onset = 2500 + beat × beatMs(*s*).
- **Target derivation (FR-004):** per section, build the ordered list of 4 call occurrences on the target card (`cardId`, `onset`, `displayEnd` = next occurrence's onset, 4th = section end); the target is the most recent one. Each occurrence's window is [onset, min(onset + 1000, displayEnd)]; taps after onset + 1000 while still displayed are late nudges.
- **Cards (designed):** 6 cards in reading order — baby (small, #6CC5B0), mama (medium, #4C6FBF), papa (large, #3F7CAC), grandma (medium-small, #8E7CC3), grandpa (large, #6B8E5A), all sharks (three silhouettes, #1F3A44). Sections 1–5 target the matching family card; sections 6–8 target the all-sharks card (the family swims together). Art is angular geometric sharks with single dot eyes.
- **Randomization:** none; fixed order, fixed tempo map, no unlocks, no adaptive behavior, no gating. A run is complete when section 8 ends.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px, stage ≤900×480 px centered, lyric strip 44 px font in a ≤1000 px single-line panel, 6 cards ≥128×128 with 16 px gaps in one row, section dots 8 × 12 px with 8 px gaps, gesture pictogram ≥112×112 in the stage corner. At 768–1023 px — chrome 88 px, stage ≤700×380, lyric font 34 px, cards ≥104×104 with 12 px gaps, gesture pictogram ≥96×96. Height ≥700 px; below that scale the stage by 0.85 keeping cards ≥88 px and controls ≥64 px; the card row never scrolls horizontally; the lyric wraps to ≤2 lines, reducing the font by 10% per step to a 28 px minimum.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Call onset | target card highlight ≤100 ms + card pop; lyric call words highlight | `vo_call_{section}` — 1.0 — one-shot; melody call notes — 0.5 bus |
| Doo onset | lyric doo word bobs 200 ms; gesture pictogram loops 500 ms | melody doo notes — 0.5 bus; optional `vo_doo` layer — 0.3 — one-shot |
| On-time tap (FR-005) | card bounce 1→1.08→1 over 300 ms; sparkle (6 particles ≤40 px, 600 ms; ≤3 per occurrence) | `sfx_ding` — 0.8 — one-shot (throttle 300 ms) |
| Late tap (FR-005) | target card soft pulse 1→1.04→1 over 400 ms | `sfx_soft_tap` — 0.5 — one-shot |
| Early get-ready (FR-006) | upcoming card soft pulse 1→1.04→1 over 400 ms | `sfx_soft_tap` — 0.5 — one-shot |
| Wrong-shark tap (FR-007) | tapped card jiggle ±4 px over 300 ms; target card soft pulse | `sfx_soft_tap` — 0.5; tapped card's `vo_call` — 0.7 — one-shot (throttle 1200 ms; duck/restore) |
| Neutral tap (FR-008) | card depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Section gap | current dot fills; upcoming target card soft pulse (get-ready) | `sfx_splash` — 0.5 — one-shot |
| Song end (FR-012) | confetti ≤40 particles, 2500 ms; end panel | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint (FR-013) | deterministic target pulses 1→1.12→1, 500 ms per cycle, 3 s | `vo_hint` — 1.0 — one-shot |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis / no AudioContext | muted-speaker pictogram 5 s after first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop |

**Effect definitions (no undefined effects):** *card highlight* = 4 px accent `#F2803B` stroke around the target card, appears in ≤100 ms, holds until the next call onset, no motion. *card pop* = scale 1→1.05→1 over 200 ms. *card bounce* = scale 1→1.08→1 over 300 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *doo bob* = the doo word in the lyric strip translates y 0→−4→0 px over 200 ms. *gesture loop* = the pictogram alternates frame A/frame B every 500 ms while visible. *sparkle* = 6 square particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *fade* = opacity 0→1 or 1→0 over 200 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *duck* = melody bus 0.5→0.4 within 120 ms, restore over 200 ms. *dot fill* = the current section's dot switches to accent `#F2803B` over 100 ms, no motion. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#1F3A44` border, 24 px radius, fades in over 250 ms. *splash* = 12 circle particles ≤20 px flying ≤60 px over 400 ms.

**Voice copy (fixed; timbre/TTS engine are build freedom):** `vo_intro` = "Sing and tap your shark family!" (≤2 s) · `vo_call_1..8` = the section call phrases "Baby shark", "Mama shark", "Papa shark", "Grandma shark", "Grandpa shark", "All sharks", "Run away", "Safe at last" (≤1.2 s each; each is also the teach voice for its card: baby→1, mama→2, papa→3, grandma→4, grandpa→5, all sharks→6) · `vo_praise` = "You swam with the whole shark family! Great job!" (≤3 s) · `vo_hint` = "Tap the shark you hear. Tap play to keep singing." (≤3 s). Optional `vo_doo` may voice the doo hook (≤0.5 s, reused per note).

**Audio rules (v1):** no audio before the first user gesture (FR-016/R-006); one voice clip at a time with a new clip cancelling the previous utterance; melody and sfx may overlap; degradation per FR-017; background-tab throttling and speech suspension handled by FR-018 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.babyShark.v1`.
- **Shape:** `{ "lastSection": 1-8, "completed": false, "updatedAt": "<ISO-8601>" }` — `lastSection` is the section most recently entered; `completed` is true after the song-end celebration.
- **Save points:** every section entry (sections 1–8 start, including Play and Replay), song completion (celebration entry), and every HOME press; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play starts a 2500 ms lead-in then `lastSection`; when `completed` is true, Play starts section 1 and `completed` clears on the next section-entry save. There are no levels or locks — the song is the only content, so Play always resumes at `lastSection`.
- **Reset:** a deliberate hidden gesture — hold the title logo 3 s (filling ring) → clears the key and in-memory progress; the keyboard equivalent is holding Enter/Space 3 s on the focused logo (FR-015).
- **No shared kernel:** the save is one standalone key owned by this player; it shares no storage, state, or kernel with other entries.
- **Deliberately not stored:** mid-section clock position, tap history, judgments, sparkle counts, play counts, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy, Super Simple Songs, Pinkfong, or any third-party recording. The traditional song is public domain; this build's melody realization, art, and voices are new (D1, D2). Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) where the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `stage_bg` | image | soft ocean-gradient backdrop with faint bubbles and light rays; palette below | 1280×720 SVG | static | SVG gradient |
| `shark_{id}` | rendered | one angular geometric shark per card, ×6 (`baby`, `mama`, `papa`, `grandma`, `grandpa`, `all` as three silhouettes); single dot eye, triangle fins, matte fills per section 8; used on the card and enlarged in the stage scene | 128×128 card / ≤360×240 scene, SVG | static; highlighted on call | SVG shapes |
| `card_bg` | image | rounded card backing with the 6-card row layout | 128×128 SVG each | highlight stroke per call | SVG shapes |
| `pict_home` / `pict_play` / `pict_pause` / `pict_replay` | image | house; triangle; bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `gesture_fin_a` / `gesture_fin_b` / `gesture_chomp_a` / `gesture_chomp_b` / `gesture_swim_a` / `gesture_swim_b` | image | two-frame hand cues: open/close hand (fin), chomp, paddle arms (swim) | 112×112 SVG each | loop 500 ms during doo runs | SVG paths |
| `pict_muted` / `ring` / `dots` | image | speaker with slash; 4 px accent progress ring; 8 section dots | 48×48 / 96×96 / 12×12 ×8, SVG | muted 5 s after first Play | SVG shapes |
| `melody` | audio | note events per section 8 synthesized by WebAudio (triangle, 20 ms attack, 40 ms release) or pre-rendered original clips matching each BPM | event data / 3 clips (150/200/120 BPM) ≤17 s | one-shot per section | WebAudio synth (default) |
| `vo_call_{1..8}` | audio | call phrases and teach voices (copy in section 9), ×8 | ≤1.2 s each | one-shot | TTS allowed |
| `vo_intro` / `vo_hint` / `vo_praise` | audio | copy in section 9 | ≤2 / ≤3 / ≤3 s | one-shot | TTS allowed |
| `vo_doo` | audio | optional sung "doo" layer | ≤0.5 s | one-shot per doo note (optional) | may be omitted |
| `sfx_ding` / `sfx_tap` / `sfx_soft_tap` / `sfx_chime` / `sfx_splash` | audio | bright ding 0.12 s; UI click 0.08 s; muted tap 0.10 s; 3-note chime 0.8 s; water splash 0.25 s | ogg/mp3 | one-shot | WebAudio blips/sweep |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 | may be omitted |

- **Palette tokens:** background `#E6F0F2`, water `#BFE3EA`, ink `#1F3A44`, accent `#F2803B`, highlight `#FFD166`, card `#FFFDF6`, success `#2A9D8F`, chrome `#FFFDF7`; shark fills per section 8. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); lyric font per section 8.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → fall back to the section 8 clock with no voice (R-005, FR-017).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `SectionConfig` | `index: int 1..8`; `role: string`; `cardId: string`; `callPatternId: int 1..8`; `gesture: enum {fin, chomp, swim}`; `bpm: int`; `beatMs: int`; `startMs: int` (full-run); `endMs: int` |
| `CallWordEvent` | `sectionIndex: int`; `line: int 1..4`; `word: string`; `beats: [number, number]`; `notes: {pitch: string, beats: number}[]`; `isDoo: bool` |
| `CallEvent` (derived) | `sectionIndex: int`; `cardId: string`; `occurrence: int 1..4`; `onsetMs: int`; `displayEndMs: int`; `windowEndMs: int` (= min(onset + 1000, displayEnd)) |
| `Save` (persisted) | `lastSection: int 1-8`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, player, celebrating, endcard}`; `section: int`; `mode: enum {singing, paused}`; `clockMs: int`; `target: CallEvent \| null`; `sparkleCount: int`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

**Derivation:** each section yields 4 `CallEvent`s at beats 0, 8, 16, 24 with displayEnd beats 8, 16, 24, 32; the target card is the section's `cardId`. `CallWordEvent`s are built from the section's call pattern (lines 1–4 at line offsets 0, 8, 16, 24) plus the doo grid (lines 1–3 only, at line offset +2). Adding a section = one `SectionConfig` plus its call pattern row and one voice clip.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, a lyric text run with per-word highlights, and one clock driving call events, highlights, and section advance.
- **R-002** The player shall animate the section 9 effects: card highlight, card pop/bounce, soft/hint pulses, jiggle, depress, doo bob, gesture loop, splash, sparkle, confetti, fade, dot fill, ring fill/flash, end panel.
- **R-003** When the user taps or clicks a target, the player shall hit-test per FR-015 and judge per FR-004–FR-009.
- **R-004** The player shall support keyboard focus and activation for every interactive element, with Escape = HOME.
- **R-005** The player shall synthesize melody note events (or play original pre-rendered clips matching the grid) and mix one-shot sfx and voice with the ducking rule (FR-016); a failed clip is skipped without blocking play.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis (or original clips) for calls, teach voices, hint, and praise, and shall fall back to melody + visuals when speech is unavailable (FR-017).
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-017), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during highlights, sparkles, and section changes.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing section, mode, clock, or highlight state.
- **R-011** The player shall expose an invisible accessible name on every interactive element.
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: auto-pause, no progress loss, hints may fire late (FR-018).
- **R-013** The song shall be renderable at runtime from the section 8 note data alone; pre-rendered original clips are acceptable only if they match each section's BPM and word onsets.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play, the logo, and 8 section dots, and no audio has played |
| AC-02 | `title` with `lastSection: 4` (or no save) | Play is pressed | a 2500 ms lead-in runs, `vo_intro` plays on the first play only, and section 4 (or section 1) starts; section entry is saved |
| AC-03 | section 1 playing | the clock reaches 2500 ms | the baby card is highlighted and the lyric strip shows "Baby shark, doo doo doo doo doo doo", `vo_call_1` speaks, and the call and doo notes sound at the section 8 times through 15300 ms |
| AC-04 | section 6 playing | section 6 ends | a 1200 ms gap with `sfx_splash` plays, then section 7 runs at 200 BPM (9600 ms) and section 8 at 120 BPM (16000 ms); the song ends at 113300 ms |
| AC-05 | section 1, target Baby at 2500 ms | the baby card is tapped at 3000 ms | the card bounces, a sparkle plays, and `sfx_ding` sounds |
| AC-06 | section 1, target Baby | the mama card is tapped at 3000 ms | the mama card jiggles, `vo_call_2` speaks with the melody ducked, and no affirmation appears |
| AC-07 | the 1200 ms gap after section 1 (15300–16500 ms) | the mama card is tapped at 16000 ms | the mama card soft-pulses with `sfx_soft_tap` as an early get-ready; no teach voice plays |
| AC-08 | section 1, target Baby at 2500 ms | the baby card is tapped at 3800 ms | the baby card soft-pulses with `sfx_soft_tap` (late nudge) |
| AC-09 | section 1, target Baby | the baby card is double-tapped within 200 ms | two bounces and sparkles occur, and `sfx_ding` sounds once (300 ms throttle) |
| AC-10 | section 1, target Baby | the mama card is tapped five times in 1 s | each tap jiggles the card, but only one `vo_call_2` plays (1200 ms throttle) |
| AC-11 | the 1200 ms gap after section 1 | a card is tapped at 15400 ms | the card depresses with `sfx_tap`; no judgment, voice, or affirmation occurs |
| AC-12 | any card state | empty space >12 px from every card is tapped | nothing changes on screen or in audio, and the idle timer resets |
| AC-13 | section 3 singing | Play/Pause is pressed, then Play is pressed again | the melody/voice stop and the clock freezes; on Play, section 3 restarts from its first beat |
| AC-14 | section 2 playing | Replay is pressed | section 1 starts at t=0 and `lastSection = 1` is saved |
| AC-15 | section 5 playing | HOME is pressed | `title` appears, audio stops, and the save is intact |
| AC-16 | section 8 reaches 113300 ms | 1200 ms pass | confetti, `sfx_chime`, and `vo_praise` play; 2500 ms later the end card shows Replay and HOME with no score; `completed: true` is saved |
| AC-17 | an end card was reached | the page reloads and Play is pressed | section 1 starts (not section 8), and the next section save clears `completed` |
| AC-18 | `title` | the logo is held 3 s | a ring is visible during the hold and the save is cleared; the focused-logo keyboard hold behaves the same; after reload Play starts section 1 |
| AC-19 | `title`, `paused`, or `endcard` with no input for 12 s | idleness continues | `vo_hint` plays and the deterministic target (Play, Play/Pause, or Replay) pulses 3 s; any tap resets; the hint repeats 12 s later; no hint fires while `singing` |
| AC-20 | speech synthesis unavailable (or no AudioContext) | Play is pressed | no call voice plays, the visual timeline and highlights still run on the section 8 clock, the melody still sounds when only speech is missing, and the muted-speaker pictogram shows 5 s |
| AC-21 | storage blocked | a song is completed | the celebration and end card appear normally; after reload progress is gone but the player still works |
| AC-22 | a section playing at 1024×768 | the viewport is resized to 800×1000 | section, mode, clock, and highlight state are unchanged, every control is ≥64 px, and every card is ≥104 px |
| AC-23 | keyboard focus on any control | Tab is pressed repeatedly | focus visits targets in the section 6 tab order, Enter/Space activates, Escape returns HOME |
| AC-24 | section 1 playing | the doo run begins at 3300 ms | the fin pictogram alternates frames every 500 ms until the next call at 5700 ms, and no camera or microphone permission is requested |
| AC-25 | section 1, target Baby at 2500 ms | a first finger presses and holds the baby card at 3000 ms and a second finger taps the mama card at 3100 ms before the first is released | only the baby card reacts (bounce, sparkle, `sfx_ding`); the mama card shows no feedback of any kind (no press, pulse, or sound) |
| AC-26 | section 2 singing | the tab is hidden and shown again after 5 s | playback is paused with the melody/voice stopped and the clock, highlight, and target frozen; pressing Play/Pause restarts section 2 from its first beat and the save is intact |
| AC-27 | title, player, and endcard states | a screen reader reads each interactive element | each announces its invisible section 7 name ("Play song", "Pause song", "Home", "Replay song", "Reset", "Shark card: Baby" … "Shark card: All sharks"), and no visible text is an instruction |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. All eight sections play end-to-end (1–6 at 150 BPM, 7 at 200 BPM, 8 at 120 BPM) with card highlights, lyric highlights, and the section 8 onsets; the song ends at 113300 ms with the celebration and end card.
3. Tap judgments behave per FR-004–FR-009: on-time, late, early, wrong-shark teach (with throttle), neutral, double-tap, and multi-touch.
4. `lastSection` and `completed` survive a reload; the reset hold clears them; no-speech and blocked-storage runs still work.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The build is the traditional camp version (family roles, doo hook, chase, safe ending); commercial-recordings' embellishments and characters are out of scope | designed — O4 publishes no feature list; keeps the build IP-safe |
| A2 | The melody (call patterns and doo hook in section 8) is an original composition, not a transcription of any recording | designed (D1); the traditional camp song text is public domain |
| A3 | Tap-along with 6 cards, and the exact windows (1000 ms on-time, 800 ms early boundary, 12 px tolerance) | designed for ages 2–5; wide and never punishing |
| A4 | Sections 6–8 reuse the all-sharks card because the family swims together | designed — keeps the card set at 6 for the youngest players |
| A5 | Synthesized melody + TTS call clips are acceptable realizations of an "original rendition" | designed (D2); original recordings may replace TTS without changing timings (R-013) |
| A6 | Browsers block autoplay until the first gesture; background tabs may throttle timers and suspend speech | platform facts; handled by FR-016/FR-018 |
| A7 | The visible lyric strip is content, not an instruction path, and may be omitted without breaking play | designed (FR-014); text is not required to understand the song |
| A8 | Gesture pictograms are decorative, unscored, and aria-hidden; no camera or microphone is used | designed (D6, FR-014) |
| A9 | Section dots and shark art are graphics, not text | designed (FR-014) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the public-domain traditional lyric sequence and line order, the section 8 note grid and tempo map, the target/judgment rules and windows, the card set and mapping, control set and keyboard map, no fail state, target minimums, save key and shape, asset provenance (original, no partner content), acceptance criteria.
- **Free:** exact shark shapes and stage composition within the palette and distinctness rule, easing curves, sparkle/confetti/splash particle specifics, voice timbre/TTS engine, optional title music, beat click, and `vo_doo`, whether the lyric strip and decorative title are displayed.
- **Not in this spec:** other songs in the library, the Super Simple Songs recording or any partner media, library/Videos/Logic+ browsing, quizzes, scores, profiles, navigation shell, parental controls, localization, analytics, camera or motion input.
