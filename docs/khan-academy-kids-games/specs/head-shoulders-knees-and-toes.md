# Head, Shoulders, Knees, and Toes

## 1. Front matter

- **Entry type:** Interactive player — sing-along song
- **Catalogued entry:** [`head-shoulders-knees-and-toes.md`](../head-shoulders-knees-and-toes.md)
- **Official source:** [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids); repo wording "songs (e.g., Head, Shoulders, Knees, and Toes; …)" in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) line 84, named-songs list line 217
- **Spec status:** v1 — first sing-along spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load
- **Conditional sections:** all 16 included; none omitted. Player equivalents replace game-only blocks: one verse pass replaces a level, the song-end celebration replaces a win condition, completion replaces scoring.

## 2. Overview and learning objective

A child presses Play and an original rendition of the traditional song begins. As each body-part word is sung, the matching part lights up on a simple animated figure and the child taps that part's card in a grid of eight. One pass through the song is followed by a faster pass — four passes total at 100→200 BPM. Skills: **body-part vocabulary** (listening and auditory word recognition, pointing) and **sing-along participation** for pre-readers. Age band: **2–5 (preschool; the library title is a Videos-tab song, and songs also appear in Logic+)**. Expected session: **1–4 minutes**; one play-through is ~69 s.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Head, Shoulders, Knees, and Toes" is a sing-along song in the Khan Kids video library, named in the official Parent guide | official | `khan-academy-kids-games.md` line 217; catalogued entry |
| O2 | Songs also appear in the Logic+ tab, alongside matching and memory activities | official | Catalogued entry Notes |
| O3 | Availability can vary by app version and season | official | Catalogued entry Notes |
| O4 | The app serves ages 2–8 / preschool–2nd grade and content is browsed by learning level | official | `khan-academy-kids-games.md` lines 160–172 |
| O5 | Individual song recordings, notes, and visuals are not published in the surveyed official sources | official | Catalogued entry Description/Notes |
| D1 | The lyrics are the traditional public-domain text (documented since at least 1912) and the melody is the commonly used public-domain tune (often identified as "There Is a Tavern in the Town"); the spec's canonical realization is fixed as data in section 8 | designed (content basis is public domain; not a Khan Academy source) | O5 publishes no song text or audio; the title is retained for catalog traceability |
| D2 | All recordings, art, voice, and animation are original; no Khan Academy or third-party audio/art is reproduced; melody is synthesized from note data (pre-rendered original clips allowed, section 11) | designed | Buildability invention; avoids copying unpublished media |
| D3 | Tap-along: 8 body-part pictogram cards, figure-part highlight on each sung word, acceptance/nudge/teach/neutral rules (section 5) | designed | The minimal designed interaction the interactive-player type promises; audio-first for non-readers |
| D4 | Four passes at 100/120/150/200 BPM with 2000 ms gaps, song end at 65600 ms | designed | Implements the traditional faster-and-faster ending; numbers in section 8 |
| D5 | Chrome: Play/Pause, Replay, HOME, 4 verse dots; no quiz, no score, no fail state | designed | Player chrome promised by the entry type; never punishing (ages 2–5) |
| D6 | Save/resume (`lastVerse`), hidden 3 s reset, idle hint, audio and degradation rules | designed | Template v1; session continuity without accounts |

## 4. Player experience / core loop

A child presses the big Play on the title. After a 2000 ms lead-in the song begins: a voice sings "Head" and the head on the figure lights up; the child taps the head card and it bounces with a sparkle. "Shoulders" lights up, and so on through the song. Between passes the voice calls "Faster!" and the next pass is quicker; the last pass flies by. At the end confetti pops, a voice says "You sang with your whole body!", and the end card offers Replay or HOME. Nothing is ever lost — taps off the beat, wrong cards, and silence are all answered gently.

**Core loop:** hear a body-part word → see its part light up → tap the matching card → gentle affirmation → next word → faster pass → song-end celebration.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload section 11 assets, then `title`: a decorative body-figure scene, one Play target ≥96×96 CSS px, a reset logo ≥64×64 CSS px (FR-011), and 4 verse dots (12 px each). No audio plays before the first user gesture (FR-016). |
| FR-002 | When Play is pressed, it shall unlock audio, run a 2000 ms lead-in, then start a verse: the resume verse (`lastVerse` unless `completed` is true, then verse 1). On the first Play after load only, `vo_intro` plays once during the lead-in (volume 1.0, one-shot). A run resumed at verse *v* uses verse *v*'s BPM; word onset = 2000 + beat × beatMs(*v*) (section 8). |
| FR-003 | Each verse shall play one deterministic 32-beat timeline driven by a single clock: lines 1–4 in order at the section 8 note grid; each body-part word's figure highlight appears within 100 ms after its onset and holds until the next part word's onset (or the verse end for the last word); the lyric strip shows the current line and highlights the word being sung for its beat span; 2000 ms after the verse's last beat the next verse starts at its BPM (after verse 4 the song ends). Pause freezes the clock; Replay and resume restart the current verse at its start. |
| FR-004 | Tap judgment shall use the **target model**: the target at time *t* is the body-part occurrence with `onset ≤ t` whose `displayEnd` (next part occurrence's onset, or the verse end for the last one) is after *t*. When *t* is before the first word of a verse or between verses, the target is none. |
| FR-005 | When the target card is tapped at Δ = `t − onset`: Δ ≤ 1000 ms → **on-time affirmation** (card bounce, `sfx_ding`, sparkle ≤3 per occurrence, section 9); Δ > 1000 ms → **late nudge** (target card soft pulse + `sfx_soft_tap`). Neither changes a score, ends the song, or blocks play. An occurrence with no tap is silent: no feedback, no record, no penalty. |
| FR-006 | When a non-target card is tapped while its next occurrence's onset is ≤500 ms away, that shall be an **early get-ready** (card pulse + `sfx_soft_tap`, no voice, no affirmation), and this rule takes precedence over the neutral and teach rules when its condition holds. If several qualify, the earliest onset wins; exact onset ties resolve to the lowest card index. |
| FR-007 | When any other card is tapped while a target is displayed, that shall be a **wrong-part gentle teach**: the tapped card jiggles 300 ms, the target card pulses, `sfx_soft_tap` plays, and `vo_part_{id}` speaks the tapped part's name once (volume 0.7, one-shot, melody ducked to 0.4 while it plays). The teach voice is throttled to one per 1200 ms; taps inside the throttle keep the visual feedback but play no voice. |
| FR-008 | When a card is tapped with no target displayed and no early condition (lead-in, inter-verse gaps, `paused`, `celebrating`, `endcard`), the tap shall be **neutral**: card depress 80 ms + `sfx_tap`, no judgment, no voice. |
| FR-009 | Repeated taps shall be judged independently: double-tapping the target yields two affirmations (the second visual-only while the `sfx_ding` 300 ms throttle holds); a rapid run of wrong-card taps yields a jiggle per tap with at most one teach voice per 1200 ms; sparkles cap at 3 per occurrence. Nothing is ever scored, deducted, or locked. |
| FR-010 | A Play/Pause target ≥64×64 CSS px shall toggle playback. Pause cancels the voice and melody and freezes the clock, highlight, and target. Resume restarts the current verse at its start (target state resets with it). |
| FR-011 | A Replay target ≥64×64 CSS px (≥96×96 on the end card) shall cancel audio and restart verse 1 at t=0, saving `lastVerse = 1`. HOME (≥64×64 CSS px, 24 px top-left margin) is rendered in `player`, `celebrating`, and `endcard`; it cancels voices/timers, saves, and returns to `title`. On `title` (the home screen) and `loading`, no HOME control is rendered and a HOME input is a no-op. When the title logo is held 3 s, the player shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and plays a ring flash plus `sfx_soft_tap`; holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-012 | When the verse-4 timeline ends, the player shall wait 1200 ms, then enter `celebrating` for 2500 ms: confetti (≤40 particles), `sfx_chime` (0.8), `vo_praise` (1.0), and a `completed: true` save. At 2500 ms it shall enter `endcard`: a paper panel with Replay and HOME and no score or numbers. Replay from `endcard` starts verse 1 and saves `lastVerse = 1`. |
| FR-013 | When no input has occurred for 12 s in `title`, `player` while `paused`, or `endcard`, the player shall pulse one deterministic target for 3 s — `title`: Play; `paused`: Play/Pause; `endcard`: Replay — and replay `vo_hint` (volume 1.0, one-shot; visual-only before the first user gesture). While `singing`, no hint fires (the song is the pacing). The hint repeats every 12 s of continued idleness; any input, including an empty-space tap, resets the timer. |
| FR-014 | No-reading rule: the only visible text is content — the lyric strip, the optional decorative title, and verse dots and pictograms (graphics, not text). Every instruction and feedback reaches a non-reader by voice + pictogram. Every interactive element (logo, Play, HOME, Play/Pause, Replay, each of the 8 cards) carries an invisible accessible name; this rule governs visible text only. |
| FR-015 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Card hit rects take a 12 px expansion on all sides; on overlap the nearest card center wins and exact ties resolve to the lowest card index (1 = head … 8 = nose). A tap >12 px from every hit rect is an empty tap (no state change, idle timer resets). Taps never drag: no drag gestures exist. Throttles: Play/Pause 300 ms; Replay 300 ms; home logo reset hold 3000 ms; teach voice 1200 ms; `sfx_ding` 300 ms. Taps inside a throttle keep their visual feedback and drop only the throttled sound. |
| FR-016 | Audio: melody note events are synthesized from the section 8 data at bus volume 0.5; an optional beat click plays once per beat of the current verse at 0.2; all voice and sfx are one-shots (optional `music_title` loops at 0.15). Only one voice clip plays at a time — a new voice clip (word, `vo_part`, `vo_faster`, `vo_hint`, `vo_praise`, `vo_intro`) cancels the previous utterance. Melody and sfx may overlap. No audio plays before the first user gesture; the melody bus ducks to 0.4 within 120 ms while a `vo_part` clip plays and restores over 200 ms. |
| FR-017 | Degradation: no speech synthesis → voice clips (words, teach names, hint, praise) are skipped, the melody/beat and all visual highlights run from the clock, and a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → the whole player runs silent with identical visuals and judgments, and the pictogram shows. Storage blocked → the player runs unsaved with full in-memory behavior. |
| FR-018 | Background tab: when the tab becomes hidden during `singing`, the player shall cancel voice/melody and enter `paused` with the clock and highlight frozen; on return it stays paused until Play (FR-010). Idle time counts visible time only; throttled timers may delay hints, never lose saved progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; preload; audio locked |
| `title` | figure scene + Play + reset logo + 4 verse dots | the player's home; audio unlocks on the first gesture |
| `player(verse, mode)` | figure + lyric strip + 8 cards + chrome | verse 1–4; mode ∈ {singing, paused} |
| `celebrating` | frozen last frame + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `player(resumeVerse, singing)` | actions: lead-in 2000 ms; `vo_intro` on first play; save on verse start |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `player` | `PLAY_PAUSE` | — | `player(same, toggled)` | action: FR-010 |
| `player` | `REPLAY` | — | `player(1, singing)` | action: save `lastVerse = 1` |
| `player` | `CARD_TAP` | target displayed | `player(same)` | actions: FR-005/FR-007 |
| `player` | `CARD_TAP` | upcoming occurrence ≤500 ms | `player(same)` | action: FR-006 early get-ready |
| `player` | `CARD_TAP` | no target, no early | `player(same)` | action: FR-008 |
| `player` | `VERSE_END` | verse < 4 | `player(verse+1, singing)` | actions: 2000 ms gap; `vo_faster` at gap start; save `lastVerse` |
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

**Tab order (v1):** `title` — logo (reset) → Play; `player` — HOME → Play/Pause → Replay → cards 1–8 in reading order (head, shoulders, knees, toes, eyes, ears, mouth, nose); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play / pause | tap Play/Pause | Space (when no control is focused) or Enter/Space on the focused target |
| Replay the song | tap Replay | Tab to Replay + Enter/Space |
| Tap a body part | tap a card | Tab to the card + Enter/Space |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** cards ≥112×112 CSS px at ≥1024 px wide and ≥96×96 at 768–1023 px (well above the 44 px minimum, because the audience is 2–5); Play/end-card Replay ≥96×96; chrome HOME, Play/Pause, Replay ≥64×64. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-015; overlaps resolve to the nearest card center, exact ties to the lowest card index; >12 px from every card is an empty tap (idle resets).
- **Multi-touch / gestures:** first pointer down wins; extra pointers ignored until release; no drag gestures exist, so no drag alternative is required.
- **Instructions without reading:** the intro voice + `vo_hint` carry meaning; chrome is pictogram + invisible name; FR-014 limits visible text to content.
- **Accessible names:** invisible names on every interactive element (FR-014/R-011) — "Play song", "Pause song", "Home", "Replay song", "Body part: head" … "Body part: nose", "Reset" on the logo.
- **Resize:** viewport resize or rotation mid-verse reflows per section 8, preserving verse, mode, clock, and highlight state.

## 8. Levels and content data

**Song structure (designed; public-domain song per D1).** One verse = 4 lyric lines × 8 beats = 32 beats, repeated 4 times, each pass faster:

| Verse | BPM | Beat (ms) | Start (ms, from Play) | End (ms) | Duration (ms) | Gap after |
|---|---|---|---|---|---|---|
| 1 | 100 | 600 | 2000 | 21200 | 19200 | 2000 + `vo_faster` |
| 2 | 120 | 500 | 23200 | 39200 | 16000 | 2000 + `vo_faster` |
| 3 | 150 | 400 | 41200 | 54000 | 12800 | 2000 + `vo_faster` |
| 4 | 200 | 300 | 56000 | 65600 | 9600 | celebration at 66800; `endcard` 69300 |

**Melody and lyric timing table.** Notes are scientific pitch (C4 = middle C, 261.63 Hz); `d=` is duration in beats; a word's onset is its first note's start; ● marks a body-part target, — a lyric-only word. Lines 1, 2, and 4 use melody A (lines 1 and 2 identical, line 4 = line 1); line 3 uses melody B. Rest of 0.5 beat after lines 1, 2, 4 and of 1 beat after line 3. The four ms columns are absolute in a run that starts at verse 1; in a run resumed at verse *v*, onset = 2000 + beat × beatMs(*v*).

| # | Line | Word | Part | Note(s) | Onset beat–end | V1 ms | V2 ms | V3 ms | V4 ms |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | Head | ● | G4 d=1 | 0–1 | 2000 | 23200 | 41200 | 56000 |
| 2 | 1 | shoulders | ● | A4 d=0.5 · G4 d=0.5 | 1–2 | 2600 | 23700 | 41600 | 56300 |
| 3 | 1 | knees | ● | F#4 d=1 | 2–3 | 3200 | 24200 | 42000 | 56600 |
| 4 | 1 | and | — | G4 d=0.5 | 3–3.5 | 3800 | 24700 | 42400 | 56900 |
| 5 | 1 | toes | ● | E4 d=1 | 3.5–4.5 | 4100 | 24950 | 42600 | 57050 |
| 6 | 1 | knees | ● | G4 d=1 | 4.5–5.5 | 4700 | 25450 | 43000 | 57350 |
| 7 | 1 | and | — | G4 d=0.5 | 5.5–6 | 5300 | 25950 | 43400 | 57650 |
| 8 | 1 | toes | ● | G4 d=1.5 | 6–7.5 | 5600 | 26200 | 43600 | 57800 |
| 9 | 2 | Head | ● | G4 d=1 | 8–9 | 6800 | 27200 | 44400 | 58400 |
| 10 | 2 | shoulders | ● | A4 d=0.5 · G4 d=0.5 | 9–10 | 7400 | 27700 | 44800 | 58700 |
| 11 | 2 | knees | ● | F#4 d=1 | 10–11 | 8000 | 28200 | 45200 | 59000 |
| 12 | 2 | and | — | G4 d=0.5 | 11–11.5 | 8600 | 28700 | 45600 | 59300 |
| 13 | 2 | toes | ● | E4 d=1 | 11.5–12.5 | 8900 | 28950 | 45800 | 59450 |
| 14 | 2 | knees | ● | G4 d=1 | 12.5–13.5 | 9500 | 29450 | 46200 | 59750 |
| 15 | 2 | and | — | G4 d=0.5 | 13.5–14 | 10100 | 29950 | 46600 | 60050 |
| 16 | 2 | toes | ● | G4 d=1.5 | 14–15.5 | 10400 | 30200 | 46800 | 60200 |
| 17 | 3 | And | — | E4 d=1 | 16–17 | 11600 | 31200 | 47600 | 60800 |
| 18 | 3 | eyes | ● | D4 d=1 | 17–18 | 12200 | 31700 | 48000 | 61100 |
| 19 | 3 | and | — | C4 d=0.5 | 18–18.5 | 12800 | 32200 | 48400 | 61400 |
| 20 | 3 | ears | ● | E4 d=1 | 18.5–19.5 | 13100 | 32450 | 48600 | 61550 |
| 21 | 3 | and | — | G4 d=0.5 | 19.5–20 | 13700 | 32950 | 49000 | 61850 |
| 22 | 3 | mouth | ● | C5 d=0.5 | 20–20.5 | 14000 | 33200 | 49200 | 62000 |
| 23 | 3 | and | — | B4 d=0.5 | 20.5–21 | 14300 | 33450 | 49400 | 62150 |
| 24 | 3 | nose | ● | A4 d=2 | 21–23 | 14600 | 33700 | 49600 | 62300 |
| 25 | 4 | Head | ● | G4 d=1 | 24–25 | 16400 | 35200 | 50800 | 63200 |
| 26 | 4 | shoulders | ● | A4 d=0.5 · G4 d=0.5 | 25–26 | 17000 | 35700 | 51200 | 63500 |
| 27 | 4 | knees | ● | F#4 d=1 | 26–27 | 17600 | 36200 | 51600 | 63800 |
| 28 | 4 | and | — | G4 d=0.5 | 27–27.5 | 18200 | 36700 | 52000 | 64100 |
| 29 | 4 | toes | ● | E4 d=1 | 27.5–28.5 | 18500 | 36950 | 52200 | 64250 |
| 30 | 4 | knees | ● | G4 d=1 | 28.5–29.5 | 19100 | 37450 | 52600 | 64550 |
| 31 | 4 | and | — | G4 d=0.5 | 29.5–30 | 19700 | 37950 | 53000 | 64850 |
| 32 | 4 | toes | ● | G4 d=1.5 | 30–31.5 | 20000 | 38200 | 53200 | 65000 |

- **Lyrics (content, public domain):** "Head, shoulders, knees and toes, knees and toes" (lines 1, 2, 4) and "And eyes and ears and mouth and nose" (line 3); punctuation is display-only; multi-note words consume their listed notes in order, each holding its `d=` beats.
- **Worked example:** verse 1 line 1 plays Head G4 2000–2600, shoulders A4 2600–2900 + G4 2900–3200, knees F#4 3200–3800, and G4 3800–4100, toes E4 4100–4700, knees G4 4700–5300, and G4 5300–5600, toes G4 5600–6500; line 2 begins at 6800. Targets in that line: Head 2000, shoulders 2600, knees 3200, toes 4100, knees 4700, toes 5600 (display until 6800). In a run resumed at verse 2, that line's knees (line 2, beat 10) sounds at 7000 ms.
- **Target derivation (FR-004):** per verse, build the ordered list of 22 part-word occurrences (`partId`, `onset`, `displayEnd` = next occurrence's onset, last = verse end); the target is the most recent one. Each occurrence's window is [onset, min(onset + 1000, displayEnd)]; taps after onset + 1000 while still displayed are late nudges.
- **Cards and figure (designed):** 8 cards in reading order — row 1: head, shoulders, knees, toes; row 2: eyes, ears, mouth, nose. The figure has 8 independently highlightable parts (both shoulders, both knees, both eyes, both ears count as one part each).
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px, figure ≤360×420 px centered, lyric strip 40 px font in a ≤1000 px single-line panel, cards ≥112×112 with 16 px gaps, verse dots 4 × 12 px with 8 px gaps. At 768–1023 px — chrome 88 px, figure ≤260×300, lyric font 30 px, cards ≥96×96 with 12 px gaps. Height ≥700 px; below that scale the stage by 0.85 keeping cards ≥88 px and controls ≥64 px; the grid never scrolls horizontally.
- **Progression rule:** fixed verse order 1→4 per run; the only change per verse is tempo; no randomization, unlocks, adaptive behavior, or gating. A run is complete when verse 4 ends.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Body-part word onset | figure part highlight ≤100 ms; lyric word highlight | `vo_word_{id}` — 1.0 — one-shot; melody note events — 0.5 bus; optional beat click — 0.2 — one-shot |
| On-time tap (FR-005) | card bounce 1→1.08→1 over 300 ms; sparkle (6 particles ≤40 px, 600 ms; ≤3 per occurrence) | `sfx_ding` — 0.8 — one-shot (throttle 300 ms) |
| Late tap (FR-005) | target card soft pulse 1→1.04→1 over 400 ms | `sfx_soft_tap` — 0.5 — one-shot |
| Early get-ready (FR-006) | upcoming card pulse 1→1.04→1 over 400 ms; figure unchanged | `sfx_soft_tap` — 0.5 — one-shot |
| Wrong-part tap (FR-007) | tapped card jiggle ±4 px over 300 ms; target card pulse | `sfx_soft_tap` — 0.5; `vo_part_{id}` — 0.7 — one-shot (throttle 1200 ms; duck/restore) |
| Neutral tap (FR-008) | card depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Verse gap | verse dot fills; lyric line fade 200 ms | `vo_faster` — 1.0 — one-shot |
| Song end (FR-012) | confetti ≤40 particles, 2500 ms; end panel | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint (FR-013) | deterministic target pulses 1→1.12→1, 500 ms per cycle, 3 s | `vo_hint` — 1.0 — one-shot |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis / no AudioContext | muted-speaker pictogram 5 s after first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop |

**Effect definitions (no undefined effects):** *figure highlight* = 4 px accent stroke plus 60% `#FFD166` fill over the part's silhouette, appears in ≤100 ms, no motion. *card bounce* = scale 1→1.08→1 over 300 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = 6 square particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *fade* = opacity 0→1 or 1→0 over 200 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *duck* = melody bus 0.5→0.4 within 120 ms, restore over 200 ms. *dot fill* = the current verse's dot switches to accent `#F2803B` over 100 ms, no motion. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#2F3B2A` border, 24 px radius, fades in over 250 ms.

**Voice copy (fixed; timbre/TTS engine are build freedom):** `vo_intro` = "Sing along! Tap the body part you hear." (≤2 s) · `vo_faster` = "Faster!" (≤0.8 s) · `vo_praise` = "You sang with your whole body! Great job!" (≤3 s) · `vo_hint` = "Tap the part you hear. Tap play to keep singing." (≤3 s) · `vo_part_{id}` = the part name spoken once ("head", "shoulders", …, ≤0.9 s) · `vo_word_{id}` = the lyric word (`head, shoulders, knees, toes, and, eyes, ears, mouth, nose`), ≤0.9 s each.

**Audio rules (v1):** no audio before the first user gesture (FR-016/R-006); one voice clip at a time with a new clip cancelling the previous utterance; melody and sfx may overlap; degradation per FR-017; background-tab throttling and speech suspension handled by FR-018 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.headShoulders.v1`.
- **Shape:** `{ "lastVerse": 1-4, "completed": false, "updatedAt": "<ISO-8601>" }` — `lastVerse` is the verse most recently entered; `completed` is true after the song-end celebration.
- **Save points:** every verse entry (verse 1–4 start, including Play and Replay), song completion (celebration entry), and every HOME press; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play starts a 2000 ms lead-in then `lastVerse`; when `completed` is true, Play starts verse 1 and `completed` clears on the next verse-entry save. There are no levels or locks — the song is the only content, so Play always resumes at `lastVerse`.
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; the keyboard equivalent is holding Enter/Space 3 s on the focused logo (FR-015).
- **No shared kernel:** the save is one standalone key owned by this player; it shares no storage, state, or kernel with other entries.
- **Deliberately not stored:** mid-verse clock position, tap history, judgments, sparkle counts, play counts, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy or any third-party recording. The song is public domain; this build's melody realization, art, and voices are new (D2). Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) where the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `stage_bg` | image | soft mint-gradient backdrop with faint dots; palette below | 1280×720 SVG | static | SVG gradient |
| `figure` | rendered | simple front-facing child figure with 8 addressable part layers (`part_head`, `part_shoulders`, `part_knees`, `part_toes`, `part_eyes`, `part_ears`, `part_mouth`, `part_nose`) | 360×420 SVG | highlight overlay per word | SVG shapes |
| `card_{id}` | image | one pictogram per part, ×8: rounded card + clear part drawing | 112×112 SVG each | static; bounce/jiggle/pulse on feedback | SVG shapes |
| `pict_home` / `pict_play` / `pict_pause` / `pict_replay` | image | house; triangle; bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_muted` / `ring` / `dots` | image | speaker with slash; 4 px accent progress ring; 4 verse dots | 48×48 / 96×96 / 12×12 ×4, SVG | muted 5 s after first Play | SVG shapes |
| `melody` | audio | note events per section 8 synthesized by WebAudio (triangle, 20 ms attack, 40 ms release) or pre-rendered original clips `song_inst_v1..v4` matching each BPM | event data / 4 clips ≤20 s | one-shot per verse | WebAudio synth (default) |
| `vo_word_{id}` / `vo_part_{id}` | audio | lyric words ×9; part names ×8 | ≤0.9 s each | one-shot | TTS allowed |
| `vo_intro` / `vo_faster` / `vo_hint` / `vo_praise` | audio | copy in section 9 | ≤2 / ≤0.8 / ≤3 / ≤3 s | one-shot | TTS allowed |
| `sfx_ding` / `sfx_tap` / `sfx_soft_tap` / `sfx_chime` | audio | bright ding 0.12 s; UI click 0.08 s; muted tap 0.10 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips/arpeggio |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 | may be omitted |

- **Palette tokens:** background `#EAF2E3`, ink `#2F3B2A`, accent `#F2803B`, highlight `#FFD166`, card `#FFFDF6`, success `#2A9D8F`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); lyric font per section 8.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → fall back to the section 8 clock with no voice (R-005, FR-017).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `VerseConfig` | `index: int 1..4`; `bpm: int`; `beatMs: int`; `startMs: int` (full-run); `endMs: int` |
| `WordEvent` | `index: int 0..31`; `line: int 1..4`; `word: string`; `partId: string \| null`; `beatStart: number`; `beatEnd: number`; `syllables: string[]`; `notes: {pitch: string, beats: number}[]` |
| `PartEvent` (derived) | `partId: string`; `wordIndex: int`; `onsetMs: int`; `displayEndMs: int`; `windowEndMs: int` (= min(onset + 1000, displayEnd)) |
| `Save` (persisted) | `lastVerse: int 1-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, player, celebrating, endcard}`; `verse: int`; `mode: enum {singing, paused}`; `clockMs: int`; `target: PartEvent \| null`; `sparkleCount: int`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

**Derivation:** `PartEvent`s are built from `WordEvent`s where `partId ≠ null`, per verse, in onset order; `syllables` splits multi-note words (only `shoulders`: ["shoul","ders"]); `notes` are consumed in order, each holding its listed `beats` (section 8). Adding a verse = one `VerseConfig` + the same 32 `WordEvent`s at a new BPM.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, a lyric text run with per-word highlights, and one clock driving word events, highlights, and verse advance.
- **R-002** The player shall animate the section 9 effects: figure highlight, bounce, soft/hint pulses, jiggle, depress, sparkle, confetti, fade, dot fill, ring fill/flash, end panel.
- **R-003** When the user taps or clicks a target, the player shall hit-test per FR-015 and judge per FR-004–FR-008.
- **R-004** The player shall support keyboard focus and activation for every interactive element, with Escape = HOME.
- **R-005** The player shall synthesize melody note events (or play original pre-rendered clips matching the grid) and mix one-shot sfx and voice with the ducking rule (FR-016); a failed clip is skipped without blocking play.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis (or original clips) for lyric words, part names, hint, and praise, and shall fall back to melody + visuals when speech is unavailable (FR-017).
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
| AC-02 | `title` with `lastVerse: 3` (or no save) | Play is pressed | a 2000 ms lead-in runs, `vo_intro` plays on the first play only, and verse 3 (or verse 1) starts; verse entry is saved |
| AC-03 | verse 1 playing | the clock reaches 2000 ms | Head is highlighted on the figure and in the lyric strip, `vo_word_head` speaks, the G4 note sounds, and each next word lands at the section 8 times through 20000 ms |
| AC-04 | verse 1 playing | verse 1 ends | a 2000 ms gap with `vo_faster` plays, then verse 2 starts at 120 BPM; verses 3 and 4 follow at 150 and 200 BPM; the song ends at 65600 ms |
| AC-05 | verse 1, target Head at 2000 ms | the head card is tapped at 2300 ms | the card bounces, a sparkle plays, and `sfx_ding` sounds |
| AC-06 | verse 1, target Head | the shoulders card is tapped at 2300 ms | the shoulders card pulses, `sfx_soft_tap` plays, no voice sounds, and no affirmation appears |
| AC-07 | verse 1, target Head | the nose card is tapped at 2200 ms | the nose card jiggles, the head card pulses, and `vo_part_nose` speaks with the melody ducked |
| AC-08 | verse 1, target Head | the nose card is tapped five times in 1 s | each tap jiggles the card, but only one `vo_part_nose` plays (1200 ms throttle) |
| AC-09 | verse 1, target Head | the head card is double-tapped within 200 ms | two bounces and sparkles occur, and `sfx_ding` sounds once (300 ms throttle) |
| AC-10 | the 2000 ms gap after verse 1 (21200–23200 ms) | a card is tapped at 22000 ms | the card depresses with `sfx_tap`; no judgment, voice, or affirmation occurs |
| AC-11 | any card state | empty space >12 px from every card is tapped | nothing changes on screen or in audio, and the idle timer resets |
| AC-12 | verse 3 singing | Play/Pause is pressed, then Play is pressed again | the melody/voice stop and the clock freezes; on Play, verse 3 restarts from its first beat |
| AC-13 | verse 4 playing | Replay is pressed | verse 1 starts at t=0 and `lastVerse = 1` is saved |
| AC-14 | verse 2 playing | HOME is pressed | `title` appears, audio stops, and the save is intact |
| AC-15 | verse 4 reaches 65600 ms | 1200 ms pass | confetti, `sfx_chime`, and `vo_praise` play; 2500 ms later the end card shows Replay and HOME with no score; `completed: true` is saved |
| AC-16 | an end card was reached | the page reloads and Play is pressed | verse 1 starts (not verse 4), and the next verse save clears `completed` |
| AC-17 | `title` | the logo is held 3 s | a ring is visible during the hold and the save is cleared; the focused-logo keyboard hold behaves the same; after reload Play starts verse 1 |
| AC-18 | `title`, `paused`, or `endcard` with no input for 12 s | idleness continues | `vo_hint` plays and the deterministic target (Play, Play/Pause, or Replay) pulses 3 s; any tap resets; the hint repeats 12 s later; no hint fires while `singing` |
| AC-19 | speech synthesis unavailable (or no AudioContext) | Play is pressed | no voice plays; the section 8 timeline and all highlights still run, the melody still sounds when only speech is missing, and the muted-speaker pictogram shows 5 s |
| AC-20 | storage blocked | a song is completed | the celebration and end card appear normally; after reload progress is gone but the player still works |
| AC-21 | a verse playing at 1024×768 | the viewport is resized to 800×1000 | verse, mode, clock, and highlight state are unchanged, every control is ≥64 px, and every card is ≥96 px |
| AC-22 | keyboard focus on any control | Tab is pressed repeatedly | focus visits targets in the section 6 tab order, Enter/Space activates, Escape returns HOME |
| AC-23 | verse 1, target toes at 10400 ms (line 2's last target) | the toes card is tapped at 11500 ms | the toes card soft-pulses with `sfx_soft_tap` (late nudge); no affirmation, sparkle, or voice appears |
| AC-24 | verse 1, target Head at 2000 ms | a first finger presses and holds the head card at 2300 ms and a second finger taps the shoulders card at 2400 ms before the first is released | only the head card reacts (bounce, sparkle, `sfx_ding`); the shoulders card shows no feedback of any kind (no press, pulse, or sound) |
| AC-25 | verse 2 singing | the tab is hidden and shown again after 5 s | playback is paused with the melody/voice stopped and the clock, highlight, and target frozen; pressing Play/Pause restarts verse 2 from its first beat and the save is intact |
| AC-26 | title, player, and endcard states | a screen reader reads each interactive element | each announces its invisible section 7 name ("Play song", "Pause song", "Home", "Replay song", "Reset", "Body part: head" … "Body part: nose"), and no visible text is an instruction |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. All four verses play end-to-end at 100/120/150/200 BPM with figure highlights, lyric highlights, and the section 8 onsets; the song ends at 65600 ms with the celebration and end card.
3. Tap judgments behave per FR-004–FR-009: on-time, late, early, wrong-part teach (with throttle), neutral, double-tap, and multi-touch.
4. `lastVerse` and `completed` survive a reload; the reset hold clears them; no-speech and blocked-storage runs still work.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The build is one song with the four standard passes; the omission-game variants are out of this build | designed — O5 publishes no feature list; keeps scope to the classic sing-along |
| A2 | Melody realization (G major, lines A-A-B-A) and rhythm are the spec's canonical version; folk variants exist | designed (D1); the tune is public domain |
| A3 | Tap-along with 8 cards, and the exact windows (1000 ms on-time, 500 ms early, 1000 ms late boundary, 12 px tolerance) | designed for ages 2–5; wide and never punishing |
| A4 | Resumed runs restart a verse rather than resuming mid-verse | designed — deterministic pause/resume (FR-010) |
| A5 | Synthesized melody + TTS voice clips are acceptable realizations of an "original rendition" | designed (D2); recordings may replace TTS without changing timings (R-013) |
| A6 | Browsers block autoplay until the first gesture; background tabs may throttle timers and suspend speech | platform facts; handled by FR-016/FR-018 |
| A7 | The visible lyric strip is content, not an instruction path, and may be omitted without breaking play | designed (FR-014); text is not required to understand the song |
| A8 | Verse dots and figure art are graphics, not text | designed (FR-014) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the public-domain lyric text and its line order, the section 8 note grid, per-verse BPMs and timings, the target/judgment rules, control set and keyboard map, no fail state, target minimums, save key and shape, asset provenance, acceptance criteria.
- **Free:** exact figure and card composition within the palette, easing curves, sparkle/confetti particle specifics, voice timbre/TTS engine, optional title music and beat click, whether the lyric strip and decorative title are displayed.
- **Not in this spec:** other songs in the library, library/Videos/Logic+ browsing, quizzes, scores, profiles, navigation shell, parental controls, localization, analytics.
