# Happy and You Know It

## 1. Front matter

- **Entry type:** Interactive player — sing-along song
- **Catalogued entry:** [`happy-and-you-know-it.md`](../happy-and-you-know-it.md)
- **Official source:** [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids); repo wording "Happy and You Know It" in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) line 84, named-songs list line 217
- **Spec status:** v1 — sibling of `head-shoulders-knees-and-toes` and `baby-shark`; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load; no camera or microphone
- **Conditional sections:** all 16 included; none omitted. Player equivalents replace game-only blocks: one verse replaces a level, the song-end celebration replaces a win condition, completion replaces scoring.

## 2. Overview and learning objective

A child presses Play and an original rendition of the traditional song begins. As each action word is sung, its pictogram card highlights and the child taps the matching card: clap, stomp, shout hooray, then all three. Skills: **listening and action-word comprehension** plus **rhythm participation** and **sing-along participation** for pre-readers. Age band: **2–5 (preschool; catalogued as a Videos-tab song, and songs also appear in Logic+)**. Expected session: **2–5 minutes**; the song ends **75.7 s** after Play and the end card appears at **79.4 s**.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "If You're Happy and You Know It" is a sing-along song in the Khan Kids video library, named in the official Parent guide | official | `khan-academy-kids-games.md` line 84 and named-songs list line 217; catalogued entry |
| O2 | Songs also appear in the Logic+ tab, alongside matching and memory activities | official | Catalogued entry Notes |
| O3 | Availability can vary by app version and season | official | Catalogued entry Notes |
| O4 | The app serves ages 2–8 / preschool–2nd grade and content is browsed by learning level | official | `khan-academy-kids-games.md` lines 160–172 |
| O5 | The exact recording, arrangement, lyrics, and visuals of the Khan Kids rendition are not published in the surveyed official sources | official | Catalogued entry; no media published |
| D1 | The lyric text is the traditional public-domain text; the melody realization and rhythm are the spec's own arrangement written as data in section 8, transcribed from no recording | designed (content basis is public domain; not a Khan Academy source) | O5 publishes no song text or audio; the title is retained for catalog traceability |
| D2 | All recordings, art, voice, and animation are original; no Khan Academy or third-party audio/art is reproduced; the melody is synthesized from note data (pre-rendered original clips allowed, section 11) | designed | Buildability invention; avoids copying unpublished media |
| D3 | Tap-along: 4 action cards (clap, stomp, hooray, all-three), target-card highlight on each sung action word, acceptance/early/late/teach/neutral rules (section 5) | designed | The minimal designed interaction the interactive-player type promises; audio-first for non-readers |
| D4 | Four verses at 120/120/120/100 BPM with 2000 ms gaps, song end at 75700 ms; the finale slows to 100 BPM so the three-action cue fits | designed | Implements the traditional clap/stomp/hooray/finale sequence; numbers in section 8 |
| D5 | Chrome: Play/Pause, Replay, HOME, 4 verse dots; no quiz, no score, no fail state | designed | Player chrome promised by the entry type; never punishing (ages 2–5) |
| D6 | The finale ("do all three") targets one trio card; the three quick action calls inside the slot are unscored visual/audio cues | designed | Keeps one tap per occurrence for ages 2–5; a three-target slot would be too tight |
| D7 | Save/resume (`lastVerse`), hidden 3 s reset, idle hint, `vo_next` action call-outs, audio and degradation rules | designed | Template v1; session continuity without accounts |

## 4. Player experience / core loop

A child presses the big Play on the title. After a 2500 ms lead-in the song begins: a voice sings "If you're happy and you know it, clap your hands" and the clap card lights up; the child taps it and it bounces with a sparkle. Between verses a voice calls "Now stomp your feet!" and the next verse begins; then "shout hooray", then "do all three" — where the clap, stomp, and hooray words flash in quick succession inside the trio card's slot. At the end confetti pops, a voice says "You did all three! Hooray!", and the end card offers Replay or HOME. Nothing is ever lost — taps off the beat, wrong cards, and silence are all answered gently.

**Core loop:** hear an action word → see its card light up → tap the matching card → gentle affirmation → next line → next action verse → finale trio → song-end celebration.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload section 11 assets, then `title`: a decorative playground scene, one Play target ≥96×96 CSS px, a reset logo ≥64×64 CSS px (FR-011), and 4 verse dots (12 px each). No audio plays before the first user gesture (FR-016). |
| FR-002 | When Play is pressed, it shall unlock audio, run a 2500 ms lead-in, then start a verse at t=0: the resume verse (`lastVerse` unless `completed` is true, then verse 1). On the first Play after load only, `vo_intro` plays once during the lead-in (volume 1.0, one-shot). A run resumed at verse *v* uses verse *v*'s BPM with t=0 at that verse's start; target onset = 2500 + beat × beatMs(*v*) (section 8). |
| FR-003 | Each verse shall play one deterministic 32-beat timeline driven by a single clock: lines 1–4 in order at the section 8 grids; each target occurrence (lines 1, 2, 4) highlights its card within 100 ms after its onset and the highlight holds until the next target's onset (verse end for the last); the lyric strip shows the current line and highlights the word being sung for its beat span; 2000 ms after the verse's last beat the next verse starts at its BPM (after verse 4 the song ends), and `vo_next_{v+1}` plays at the gap start. Pause freezes the clock; Replay and resume restart the current verse at its start. |
| FR-004 | Tap judgment shall use the **target model**: the target at time *t* is the target occurrence with `onset ≤ t` whose `displayEnd` (next target occurrence's onset, or the verse end for the last) is after *t*. When *t* is before the first target of a verse or between verses, the target is none (subject to the FR-006 early rule). |
| FR-005 | When the target card is tapped at Δ = `t − onset`: Δ ≤ 1000 ms → **on-time affirmation** (card bounce, `sfx_ding`, sparkle ≤3 per occurrence, section 9); Δ > 1000 ms while displayed → **late nudge** (target card soft pulse + `sfx_soft_tap`). Neither changes a score, ends the song, or blocks play. An occurrence with no tap is silent: no feedback, no record, no penalty. |
| FR-006 | When a non-target card is tapped whose next occurrence's onset is ≤800 ms away, that shall be an **early get-ready** (card soft pulse + `sfx_soft_tap`, no voice, no affirmation). If several cards qualify, the earliest onset wins; exact onset ties resolve to the lowest card index (1 = clap, 2 = stomp, 3 = hooray, 4 = all three). |
| FR-007 | When any other card is tapped while a target is displayed, that shall be a **wrong-action gentle teach**: the tapped card jiggles 300 ms, the target card soft-pulses, `sfx_soft_tap` plays, and `vo_card_{id}` speaks the tapped card's action once (volume 0.7, one-shot, melody ducked to 0.4 while it plays). The teach voice is throttled to one per 1200 ms; taps inside the throttle keep the visual feedback but play no voice. |
| FR-008 | When a card is tapped with no target displayed and no early condition (lead-in, inter-verse gaps, `paused`, `celebrating`, `endcard`), the tap shall be **neutral**: card depress 80 ms + `sfx_tap`, no judgment, no voice. |
| FR-009 | Repeated taps shall be judged independently: double-tapping the target yields two affirmations (the second visual-only while the `sfx_ding` 300 ms throttle holds); a rapid run of wrong-card taps yields a jiggle per tap with at most one teach voice per 1200 ms; sparkles cap at 3 per occurrence. Nothing is ever scored, deducted, or locked. |
| FR-010 | A Play/Pause target ≥64×64 CSS px shall toggle playback. Pause cancels the voice and melody and freezes the clock, highlight, and target. Resume restarts the current verse at its start (target state resets with it). |
| FR-011 | A Replay target ≥64×64 CSS px (≥96×96 on the end card) shall cancel audio and restart verse 1 at t=0, saving `lastVerse = 1`. HOME (≥64×64 CSS px, 24 px top-left margin) is rendered in `player`, `celebrating`, and `endcard`; it cancels voices/timers, saves, and returns to `title`. On `title` (the home screen) and `loading`, no HOME control is rendered and a HOME input is a no-op. When the title logo is held 3 s, the player shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and plays a ring flash plus `sfx_soft_tap`; holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-012 | When the verse-4 timeline ends, the player shall wait 1200 ms, then enter `celebrating` for 2500 ms: confetti (≤40 particles), `sfx_chime` (0.8), and `vo_praise` (1.0), and a `completed: true` save. At 2500 ms it shall enter `endcard`: a paper panel with Replay and HOME and no score or numbers. Replay from `endcard` starts verse 1 and saves `lastVerse = 1`. |
| FR-013 | When no input has occurred for 12 s in `title`, `player` while `paused`, or `endcard`, the player shall pulse one deterministic target for 3 s — `title`: Play; `paused`: Play/Pause; `endcard`: Replay — and replay `vo_hint` (volume 1.0, one-shot; visual-only before the first user gesture). While `singing`, no hint fires (the song is the pacing). The hint repeats every 12 s of continued idleness; any input, including an empty-space tap, resets the timer. |
| FR-014 | No-reading rule: the only visible text is content — the lyric strip, the optional decorative title, and verse dots and pictograms (graphics, not text). Every instruction and feedback reaches a non-reader by voice + pictogram. Every interactive element (logo, Play, HOME, Play/Pause, Replay, each of the 4 cards) carries an invisible accessible name; this rule governs visible text only. The player shall not request camera or microphone access. |
| FR-015 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Card hit rects take a 12 px expansion on all sides; on overlap the nearest card center wins and exact ties resolve to the lowest card index (1 = clap … 4 = all three). A tap >12 px from every hit rect is an empty tap (no state change, idle timer resets). Taps never drag: no drag gestures exist. Throttles: Play/Pause 300 ms; Replay 300 ms; teach voice 1200 ms; `sfx_ding` 300 ms; home logo reset hold 3000 ms. Taps inside a throttle keep their visual feedback and drop only the throttled sound. |
| FR-016 | Audio: melody note events are synthesized from the section 8 data at bus volume 0.5; an optional beat click plays once per beat of the current verse at 0.2; all voice and sfx are one-shots (optional `music_title` loops at 0.15). Only one voice clip plays at a time — a new voice clip (lyric line, teach, `vo_next`, `vo_hint`, `vo_praise`, `vo_intro`) cancels the previous utterance. Melody and sfx may overlap. No audio plays before the first user gesture; the melody bus ducks to 0.4 within 120 ms while a teach voice plays and restores over 200 ms. |
| FR-017 | Degradation: no speech synthesis → lyric and action voices are skipped, the melody note events and all visual highlights run from the clock, and a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → the whole player runs silent with identical visuals and judgments, and the pictogram shows. Storage blocked → the player runs unsaved with full in-memory behavior. |
| FR-018 | Background tab: when the tab becomes hidden during `singing`, the player shall cancel voice/melody and enter `paused` with the clock and highlight frozen; on return it stays paused until Play (FR-010). Idle time counts visible time only; throttled timers may delay hints, never lose saved progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; preload; audio locked |
| `title` | playground scene + Play + reset logo + 4 verse dots | the player's home; audio unlocks on the first gesture |
| `player(verse, mode)` | stage + lyric strip + 4 action cards + chrome | verse 1–4; mode ∈ {singing, paused} |
| `celebrating` | frozen last frame + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `player(resumeVerse, singing)` | actions: lead-in 2500 ms; `vo_intro` on first play; save on verse start |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `player` | `PLAY_PAUSE` | — | `player(same, toggled)` | action: FR-010 |
| `player` | `REPLAY` | — | `player(1, singing)` | action: save `lastVerse = 1` |
| `player` | `CARD_TAP` | target displayed | `player(same)` | actions: FR-005/FR-007 |
| `player` | `CARD_TAP` | upcoming target ≤800 ms | `player(same)` | action: FR-006 early get-ready |
| `player` | `CARD_TAP` | no target, no early | `player(same)` | action: FR-008 neutral |
| `player` | `VERSE_END` | verse < 4 | `player(verse+1, singing)` | actions: 2000 ms gap; `vo_next_{v+1}` at gap start; save `lastVerse` |
| `player` | `SONG_END` | verse = 4, +1200 ms | `celebrating` | actions: FR-012; save `completed` |
| `player` | `HOME_PRESSED` | — | `title` | action: cancel voice/timers, save |
| `player` | `TAB_HIDDEN` | `singing` | `player(same, paused)` | action: cancel voice/melody, freeze (FR-018) |
| `player` | `IDLE_12S` | `paused` | `player` | action: FR-013 hint |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms | `endcard` | none |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel timer, save |
| `endcard` | `REPLAY_PRESSED` | — | `player(1, singing)` | action: save `lastVerse = 1` |
| `endcard` | `HOME_PRESSED` | — | `title` | action: save |
| `title` / `endcard` | `IDLE_12S` | no input 12 s | same state | action: FR-013 hint |

Events not listed for a state are ignored (no state change, no sound). **HOME everywhere:** `loading` and `title` render no HOME control and a HOME input is a no-op (title is home); in `player`, `celebrating`, and `endcard`, HOME cancels audio and timers, saves, and returns to `title`.

**Tab order (v1):** `title` — logo (reset) → Play; `player` — HOME → Play/Pause → Replay → cards 1–4 in reading order (clap, stomp, hooray, all three); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play / pause | tap Play/Pause | Space (when no control is focused) or Enter/Space on the focused target |
| Replay the song | tap Replay | Tab to Replay + Enter/Space |
| Tap an action card | tap a card | Tab to the card + Enter/Space |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** cards ≥128×128 CSS px at ≥1024 px wide and ≥104×104 at 768–1023 px (well above the 44 px minimum, because the audience is 2–5); Play/end-card Replay ≥96×96; chrome HOME, Play/Pause, Replay ≥64×64. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-015; overlaps resolve to the nearest card center, exact ties to the lowest card index; >12 px from every card is an empty tap (idle resets).
- **Multi-touch / gestures:** first pointer down wins; extra pointers ignored until release; no drag gestures exist, so no drag alternative is required; no camera or motion input. Actions are tapped, not performed physically (the pictograms model the action).
- **Instructions without reading:** the intro voice + `vo_next` + `vo_hint` carry meaning; chrome is pictogram + invisible name; FR-014 limits visible text to content.
- **Accessible names:** invisible names on every interactive element (FR-014/R-011) — "Play song", "Pause song", "Home", "Replay song", "Reset", "Action card: clap" … "Action card: all three".
- **Resize:** viewport resize or rotation mid-verse reflows per section 8, preserving verse, mode, clock, and highlight state.

## 8. Levels and content data

**Song structure (designed; public-domain song per D1).** Four verses of 32 beats each; every verse is four lines of 8 beats. Verses 1–3 run at 120 BPM; the finale runs at 100 BPM so the trio cue fits.

| Verse | Action | Target card | BPM | Beat (ms) | Start (ms, full run) | End (ms) | Duration (ms) | Gap after |
|---|---|---|---|---|---|---|---|---|
| 1 | clap | `card_clap` | 120 | 500 | 2500 | 18500 | 16000 | 2000 + `vo_next_2` |
| 2 | stomp | `card_stomp` | 120 | 500 | 20500 | 36500 | 16000 | 2000 + `vo_next_3` |
| 3 | hooray | `card_hooray` | 120 | 500 | 38500 | 54500 | 16000 | 2000 + `vo_next_4` |
| 4 | all three | `card_all` | 100 | 600 | 56500 | 75700 | 19200 | celebration at 76900; `endcard` 79400 |

**Base line grid (lines 1, 2, and 4 of every verse; 8 beats).** Tokens 1–7 are identical in all verses; tokens 8 onward are the verse's action slot (table below).

| # | Word | Beats | Note(s) |
|---|---|---|---|
| 1 | If | 0–0.5 | C4 0.5 |
| 2 | you're | 0.5–1 | D4 0.5 |
| 3 | happy | 1–2 | E4 1 |
| 4 | and | 2–2.5 | D4 0.5 |
| 5 | you | 2.5–3 | C4 0.5 |
| 6 | know | 3–3.5 | D4 0.5 |
| 7 | it | 3.5–4 | E4 0.5 |
| 8–12 | *action slot* | 4–8 | per verse |

**Line 3 grid ("and you really want to show it"; 8 beats, identical in every verse).**

| # | Word | Beats | Note(s) |
|---|---|---|---|
| 1 | If | 0–0.5 | C4 0.5 |
| 2 | you're | 0.5–1 | D4 0.5 |
| 3 | happy | 1–1.75 | E4 0.75 |
| 4 | and | 1.75–2.25 | D4 0.5 |
| 5 | you | 2.25–2.75 | C4 0.5 |
| 6 | know | 2.75–3.25 | D4 0.5 |
| 7 | it | 3.25–3.75 | E4 0.5 |
| 8 | and | 3.75–4.25 | D4 0.5 |
| 9 | you | 4.25–4.75 | C4 0.5 |
| 10 | really | 4.75–5.5 | D4 0.75 |
| 11 | want | 5.5–6 | E4 0.5 |
| 12 | to | 6–6.5 | F4 0.5 |
| 13 | show | 6.5–7.25 | G4 0.75 |
| 14 | it | 7.25–8 | E4 0.75 |

**Action slot per verse (tokens 8–12 of lines 1, 2, 4).** ● marks the target token; its duration defines the target's display span; the target's window is [onset, min(onset + 1000, displayEnd)].

| Verse | Tokens (beats — note) |
|---|---|
| 1 | **clap ● (4–5 — G4 1)** · your (5–5.5 — F4 0.5) · hands (5.5–6.5 — E4 1) · clap (6.5–7 — D4 0.5) · clap (7–8 — C4 1) |
| 2 | **stomp ● (4–5 — G4 1)** · your (5–5.5 — F4 0.5) · feet (5.5–6.5 — E4 1) · stomp (6.5–7 — D4 0.5) · stomp (7–8 — C4 1) |
| 3 | shout (4–4.5 — G4 0.5) · **hooray ● (4.5–5.5 — A4 1)** · rest (5.5–6.5) · hooray (6.5–7.5 — A4 1) · rest (7.5–8) |
| 4 | do (4–4.5 — G4 0.5) · all (4.5–5 — A4 0.5) · **three ● (5–6 — G4 1)** · clap (6.25–6.75 — D4 0.5) · stomp (6.75–7.25 — E4 0.5) · hooray (7.25–8 — C4 0.75) |

- **Full lyric (traditional, public domain; punctuation is display-only; parenthetical parts are sung or played).**
  1. If you're happy and you know it, clap your hands (clap clap) / *(repeat)* / If you're happy and you know it, and you really want to show it / If you're happy and you know it, clap your hands (clap clap)
  2. …stomp your feet (stomp stomp) / *(repeat)* / *(line 3 as above)* / …stomp your feet (stomp stomp)
  3. …shout hooray (hooray hooray) / *(repeat)* / *(line 3 as above)* / …shout hooray (hooray hooray)
  4. …do all three (clap, stomp, hooray) / *(repeat)* / *(line 3 as above)* / …do all three (clap, stomp, hooray)
- **Target derivation (FR-004):** per verse, build the ordered list of 3 target occurrences on the target card — line 1, line 2, line 4 — with `onsetMs` = verse start + `beat × beatMs` and `displayEndMs` = the next occurrence's onset (verse end for the third). In verse 4 the three quick calls (clap 6.25, stomp 6.75, hooray 7.25 beats) are unscored visual/audio cues on their cards inside the trio target's display span; they never create targets (D6).
- **Worked example, verse 1 line 1 (start 2500 ms, 500 ms/beat):** If 2500, you're 2750, happy 3000–3500, and 3500, you 3750, know 4000, it 4250, **clap 4500 (target)**, your 5000, hands 5250–5750, clap 5750, clap 6000; line 2 begins at 6500; target occurrences at 4500, 8500, and 16500; verse ends 18500.
- **Worked example, verse 4 line 1 (start 56500 ms, 600 ms/beat):** If 56500, you're 56800, happy 57100–57700, and 57700, you 58000, know 58300, it 58600, do 58900, all 59200, **three 59500 (target)**, clap 60250, stomp 60550, hooray 60850; target occurrences at 59500, 64300, and 73900; verse ends 75700. In a run resumed at verse *v*, onset = 2500 + beat × beatMs(*v*).
- **Cards and stage (designed):** 4 cards in reading order — clap (two hands), stomp (two feet), hooray (megaphone), all three (trio of the three icons). The stage shows an optional animated child figure whose hands clap, feet stomp, and mouth cheers in sync with the sung words (visual-only; the cards remain the targets).
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px, stage ≤800×420 px centered, lyric strip 44 px font in a ≤1000 px single-line panel, cards ≥128×128 with 16 px gaps in one row, verse dots 4 × 12 px with 8 px gaps. At 768–1023 px — chrome 88 px, stage ≤620×320, lyric font 34 px, cards ≥104×104 with 12 px gaps. Height ≥700 px; below that scale the stage by 0.85 keeping cards ≥88 px and controls ≥64 px; the card row never scrolls horizontally; the lyric wraps to ≤2 lines, reducing the font by 10% per step to a 28 px minimum.
- **Progression rule:** fixed verse order 1→4 per run, one pass; only the tempo and the action change; no randomization, unlocks, adaptive behavior, or gating. A run is complete when verse 4 ends.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Lyric line onset | lyric strip shows the line; per-word highlight per the section 8 grid | `vo_lyric_{v}_{l}` — 1.0 — one-shot; melody note events — 0.5 bus; optional beat click — 0.2 — one-shot |
| Target word onset | target card highlight ≤100 ms + card pop | melody note events continue; the lyric word highlight carries the word |
| On-time tap (FR-005) | card bounce 1→1.08→1 over 300 ms; sparkle (6 particles ≤40 px, 600 ms; ≤3 per occurrence) | `sfx_ding` — 0.8 — one-shot (throttle 300 ms) |
| Late tap (FR-005) | target card soft pulse 1→1.04→1 over 400 ms | `sfx_soft_tap` — 0.5 — one-shot |
| Early get-ready (FR-006) | upcoming card soft pulse 1→1.04→1 over 400 ms | `sfx_soft_tap` — 0.5 — one-shot |
| Wrong-action tap (FR-007) | tapped card jiggle ±4 px over 300 ms; target card soft pulse | `sfx_soft_tap` — 0.5; `vo_card_{id}` — 0.7 — one-shot (throttle 1200 ms; duck/restore) |
| Neutral tap (FR-008) | card depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Verse gap | current verse dot fills; upcoming target card soft pulse (get-ready) | `vo_next_{v+1}` — 1.0 — one-shot |
| Finale trio cues (verse 4) | clap/stomp/hooray cards pulse in sequence at beats 6.25/6.75/7.25 | the three action words are voiced inside `vo_lyric_4_1` (≤0.25 s each) |
| Song end (FR-012) | confetti ≤40 particles, 2500 ms; end panel | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint (FR-013) | deterministic target pulses 1→1.12→1, 500 ms per cycle, 3 s | `vo_hint` — 1.0 — one-shot |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis / no AudioContext | muted-speaker pictogram 5 s after first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop |

**Effect definitions (no undefined effects):** *card highlight* = 4 px accent `#F2803B` stroke around the target card, appears in ≤100 ms, holds until the next target onset, no motion. *card pop* = scale 1→1.05→1 over 200 ms. *card bounce* = scale 1→1.08→1 over 300 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = 6 square particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *fade* = opacity 0→1 or 1→0 over 200 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *duck* = melody bus 0.5→0.4 within 120 ms, restore over 200 ms. *dot fill* = the current verse's dot switches to accent `#F2803B` over 100 ms, no motion. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#2F3B2A` border, 24 px radius, fades in over 250 ms. *figure action* = the animated figure's hands clap, feet stomp, or mouth opens in place over the sung word's beat span, no travel.

**Voice copy (fixed; timbre/TTS engine are build freedom):** `vo_intro` = "Sing along! Tap the action you hear." (≤2 s) · `vo_next_2` = "Now stomp your feet!" · `vo_next_3` = "Now shout hooray!" · `vo_next_4` = "Now do all three!" (≤1.5 s each) · `vo_praise` = "You did all three! Hooray! Great job!" (≤3 s) · `vo_hint` = "Tap the action card. Tap play to keep singing." (≤3 s) · `vo_card_{id}` = the action spoken once ("clap", "stomp", "hooray", "all three"; ≤0.9 s each) · `vo_lyric_{v}_{l}` = the full line text sung or spoken (≤4 s each; 16 clips; the lyric highlight grid is authoritative and runs independently of clip length; a new line clip cancels the previous utterance).

**Audio rules (v1):** no audio before the first user gesture (FR-016/R-006); one voice clip at a time with a new clip cancelling the previous utterance; melody and sfx may overlap; degradation per FR-017; background-tab throttling and speech suspension handled by FR-018 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.happyYouKnowIt.v1`.
- **Shape:** `{ "lastVerse": 1-4, "completed": false, "updatedAt": "<ISO-8601>" }` — `lastVerse` is the verse most recently entered; `completed` is true after the song-end celebration.
- **Save points:** every verse entry (verses 1–4 start, including Play and Replay), song completion (celebration entry), and every HOME press; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play starts a 2500 ms lead-in then `lastVerse`; when `completed` is true, Play starts verse 1 and `completed` clears on the next verse-entry save. There are no levels or locks — the song is the only content, so Play always resumes at `lastVerse`.
- **Reset:** a deliberate hidden gesture — hold the title logo 3 s (filling ring) → clears the key and in-memory progress; the keyboard equivalent is holding Enter/Space 3 s on the focused logo (FR-015).
- **No shared kernel:** the save is one standalone key owned by this player; it shares no storage, state, or kernel with other entries.
- **Deliberately not stored:** mid-verse clock position, tap history, judgments, sparkle counts, play counts, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy or any third-party recording. The traditional song is public domain; this build's melody realization, art, and voices are new (D1, D2). Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) where the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `stage_bg` | image | soft meadow-gradient backdrop with faint confetti dots; palette below | 1280×720 SVG | static | SVG gradient |
| `card_clap` / `card_stomp` / `card_hooray` | image | rounded card + clear pictogram: two hands, two feet, megaphone | 128×128 SVG each | static; bounce/jiggle/pulse on feedback | SVG shapes |
| `card_all` | image | trio card: the three pictograms side by side | 128×128 SVG | static; target of verse 4 | SVG shapes |
| `figure` | rendered | optional simple front-facing child with three addressable action layers (`act_hands`, `act_feet`, `act_mouth`) | ≤320×360 SVG | action overlay per sung word | SVG shapes; may be omitted |
| `pict_home` / `pict_play` / `pict_pause` / `pict_replay` | image | house; triangle; bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_muted` / `ring` / `dots` | image | speaker with slash; 4 px accent progress ring; 4 verse dots | 48×48 / 96×96 / 12×12 ×4, SVG | muted 5 s after first Play | SVG shapes |
| `melody` | audio | note events per section 8 synthesized by WebAudio (triangle, 20 ms attack, 40 ms release) or pre-rendered original clips `song_inst_v1..v4` matching each BPM | event data / 4 clips ≤20 s | one-shot per verse | WebAudio synth (default) |
| `vo_lyric_{v}_{l}` | audio | the four line texts per verse, ×16 clips (copy in section 9) | ≤4 s each | one-shot; cancels previous voice | TTS allowed |
| `vo_card_{id}` / `vo_next_{2..4}` | audio | action names ×4; gap call-outs ×3 (copy in section 9) | ≤1.5 s each | one-shot | TTS allowed |
| `vo_intro` / `vo_hint` / `vo_praise` | audio | copy in section 9 | ≤2 / ≤3 / ≤3 s | one-shot | TTS allowed |
| `sfx_ding` / `sfx_tap` / `sfx_soft_tap` / `sfx_chime` | audio | bright ding 0.12 s; UI click 0.08 s; muted tap 0.10 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips/arpeggio |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 | may be omitted |

- **Palette tokens:** background `#EAF2E3`, ink `#2F3B2A`, accent `#F2803B`, highlight `#FFD166`, card `#FFFDF6`, success `#2A9D8F`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); lyric font per section 8.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → fall back to the section 8 clock with no voice (R-005, FR-017).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `VerseConfig` | `index: int 1..4`; `action: string`; `cardId: string`; `bpm: int`; `beatMs: int`; `startMs: int` (full-run); `endMs: int` |
| `WordEvent` | `index: int 0..N`; `line: int 1..4`; `word: string`; `beats: [number, number]`; `notes: {pitch: string, beats: number}[]`; `isTarget: bool` |
| `TargetEvent` (derived) | `verseIndex: int`; `cardId: string`; `occurrence: int 1..3`; `onsetMs: int`; `displayEndMs: int`; `windowEndMs: int` (= min(onset + 1000, displayEnd)) |
| `Save` (persisted) | `lastVerse: int 1-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, player, celebrating, endcard}`; `verse: int`; `mode: enum {singing, paused}`; `clockMs: int`; `target: TargetEvent \| null`; `sparkleCount: int`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

**Derivation:** each verse yields 3 `TargetEvent`s at beats 4, 12, 28 (verse 4: 5, 13, 29) with display ends at the next onset (verse end for the third). `WordEvent`s are built from the base line grid (lines 1, 2, 4) plus the verse's action slot, and the line 3 grid; adding a verse = one `VerseConfig` plus one action-slot row and its voice clips.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, a lyric text run with per-word highlights, and one clock driving word events, highlights, and verse advance.
- **R-002** The player shall animate the section 9 effects: card highlight, card pop/bounce, soft/hint pulses, jiggle, depress, figure action, sparkle, confetti, fade, dot fill, ring fill/flash, end panel.
- **R-003** When the user taps or clicks a target, the player shall hit-test per FR-015 and judge per FR-004–FR-009.
- **R-004** The player shall support keyboard focus and activation for every interactive element, with Escape = HOME.
- **R-005** The player shall synthesize melody note events (or play original pre-rendered clips matching the grid) and mix one-shot sfx and voice with the ducking rule (FR-016); a failed clip is skipped without blocking play.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis (or original clips) for lyric lines, action names, call-outs, hint, and praise, and shall fall back to melody + visuals when speech is unavailable (FR-017).
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-017), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during highlights, sparkles, and verse changes.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing verse, mode, clock, or highlight state.
- **R-011** The player shall expose an invisible accessible name on every interactive element.
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: auto-pause, no progress loss, hints may fire late (FR-018).
- **R-013** The song shall be renderable at runtime from the section 8 note data alone; pre-rendered original clips are acceptable only if they match each verse's BPM and word onsets.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play, the logo, and 4 verse dots, and no audio has played |
| AC-02 | `title` with `lastVerse: 3` (or no save) | Play is pressed | a 2500 ms lead-in runs, `vo_intro` plays on the first play only, and verse 3 (or verse 1) starts; verse entry is saved |
| AC-03 | verse 1 playing | the clock reaches 4500 ms | the clap card is highlighted, the lyric strip shows "If you're happy and you know it, clap your hands", `vo_lyric_1_1` speaks, and each next word lands at the section 8 times through 18500 ms |
| AC-04 | verse 3 playing in a full run from verse 1 | verse 3 ends | a 2000 ms gap with `vo_next_4` plays, then verse 4 runs at 100 BPM (19200 ms) with target onsets at 59500, 64300, and 73900 ms |
| AC-05 | verse 1, target clap at 4500 ms | the clap card is tapped at 4800 ms | the card bounces, a sparkle plays, and `sfx_ding` sounds |
| AC-06 | verse 1, target clap | the stomp card is tapped at 4800 ms | the stomp card jiggles, `vo_card_stomp` speaks with the melody ducked, and no affirmation appears |
| AC-07 | verse 2 playing (starts 20500 ms), before its first target at 22500 ms | the stomp card is tapped at 21800 ms | the stomp card soft-pulses with `sfx_soft_tap` as an early get-ready; no teach voice plays |
| AC-08 | verse 1, target clap at 4500 ms | the clap card is tapped at 6000 ms | the clap card soft-pulses with `sfx_soft_tap` (late nudge) |
| AC-09 | verse 1, target clap | the clap card is double-tapped within 200 ms | two bounces and sparkles occur, and `sfx_ding` sounds once (300 ms throttle) |
| AC-10 | verse 1, target clap | the stomp card is tapped five times in 1 s | each tap jiggles the card, but only one `vo_card_stomp` plays (1200 ms throttle) |
| AC-11 | the 2000 ms gap after verse 1 | a card is tapped at 18600 ms | the card depresses with `sfx_tap`; no judgment, voice, or affirmation occurs |
| AC-12 | any card state | empty space >12 px from every card is tapped | nothing changes on screen or in audio, and the idle timer resets |
| AC-13 | verse 2 singing | Play/Pause is pressed, then Play is pressed again | the melody/voice stop and the clock freezes; on Play, verse 2 restarts from its first beat |
| AC-14 | verse 3 playing | Replay is pressed | verse 1 starts at t=0 and `lastVerse = 1` is saved |
| AC-15 | verse 2 playing | HOME is pressed | `title` appears, audio stops, and the save is intact |
| AC-16 | verse 4 reaches 75700 ms | 1200 ms pass | confetti, `sfx_chime`, and `vo_praise` play; 2500 ms later the end card shows Replay and HOME with no score; `completed: true` is saved |
| AC-17 | an end card was reached | the page reloads and Play is pressed | verse 1 starts (not verse 4), and the next verse save clears `completed` |
| AC-18 | `title` | the logo is held 3 s | a ring is visible during the hold and the save is cleared; the focused-logo keyboard hold behaves the same; after reload Play starts verse 1 |
| AC-19 | `title`, `paused`, or `endcard` with no input for 12 s | idleness continues | `vo_hint` plays and the deterministic target (Play, Play/Pause, or Replay) pulses 3 s; any tap resets; the hint repeats 12 s later; no hint fires while `singing` |
| AC-20 | speech synthesis unavailable (or no AudioContext) | Play is pressed | no lyric or action voice plays, the visual timeline and highlights still run on the section 8 clock, the melody still sounds when only speech is missing, and the muted-speaker pictogram shows 5 s |
| AC-21 | storage blocked | a song is completed | the celebration and end card appear normally; after reload progress is gone but the player still works |
| AC-22 | a verse playing at 1024×768 | the viewport is resized to 800×1000 | verse, mode, clock, and highlight state are unchanged, every control is ≥64 px, and every card is ≥104 px |
| AC-23 | keyboard focus on any control | Tab is pressed repeatedly | focus visits targets in the section 6 tab order, Enter/Space activates, Escape returns HOME |
| AC-24 | verse 4, target trio at 59500 ms | the clock reaches 60250 ms | the clap, stomp, and hooray cards pulse in sequence at 60250/60550/60850 ms inside the trio target's display span, and the trio remains the only target |
| AC-25 | any card state | a card is held down without release | the card depresses once (80 ms) and releases without judgment; no drag behavior exists and no camera or microphone permission is requested |
| AC-26 | a screen reader is active | focus visits any interactive element | its invisible accessible name is announced ("Play song", "Action card: clap", …, "Reset") |
| AC-27 | a target is displayed | two cards are touched simultaneously and the first finger is held | only the first-touched card is judged; the second gets no feedback of any kind until release |
| AC-28 | verse 2 singing | the tab is hidden for 5 s, then shown again | the player is `paused` with the clock, highlight, and target frozen; Play restarts verse 2 from its first beat, and the save is intact |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. All four verses play end-to-end (1–3 at 120 BPM, 4 at 100 BPM) with card highlights, lyric highlights, and the section 8 onsets; the song ends at 75700 ms with the celebration and end card.
3. Tap judgments behave per FR-004–FR-009: on-time, late, early, wrong-action teach (with throttle), neutral, double-tap, and multi-touch.
4. `lastVerse` and `completed` survive a reload; the reset hold clears them; no-speech and blocked-storage runs still work.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The build is four verses (clap, stomp, hooray, finale); the "and you really want to show it" line-3 wording is chosen over the "then your face will surely show it" variant | designed — O5 publishes no song text; both variants are traditional, one must be fixed |
| A2 | Melody realization (C major, two line patterns) and rhythm are the spec's own arrangement; folk variants exist | designed (D1); the tune and text are public domain |
| A3 | Tap-along with 4 cards, and the exact windows (1000 ms on-time, 800 ms early boundary, 12 px tolerance) | designed for ages 2–5; wide and never punishing |
| A4 | The finale is one trio-card target per occurrence, with three unscored quick cues inside the slot | designed (D6); a three-target slot would be too tight for the audience |
| A5 | The finale runs at 100 BPM (a slight slowdown) so the trio cue and its window fit comfortably | designed (D4) |
| A6 | Synthesized melody + TTS voice clips are acceptable realizations of an "original rendition" | designed (D2); original recordings may replace TTS without changing timings (R-013) |
| A7 | Browsers block autoplay until the first gesture; background tabs may throttle timers and suspend speech | platform facts; handled by FR-016/FR-018 |
| A8 | The visible lyric strip is content, not an instruction path, and may be omitted without breaking play | designed (FR-014); the song is understood by ear |
| A9 | Verse dots and the animated figure are graphics, not text; the figure is optional | designed (FR-014) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the public-domain traditional lyric text and its line order, the section 8 grids and tempo map, the target/judgment rules and windows, the card set and mapping, control set and keyboard map, no fail state, target minimums, save key and shape, asset provenance, acceptance criteria.
- **Free:** exact card and stage composition within the palette, easing curves, sparkle/confetti particle specifics, voice timbre/TTS engine, optional title music, beat click, whether the lyric strip, decorative title, and animated figure are displayed.
- **Not in this spec:** other songs in the library, library/Videos/Logic+ browsing, quizzes, scores, profiles, navigation shell, parental controls, localization, analytics, camera or motion input.
