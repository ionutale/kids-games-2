# Identifying Characters (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension activity (find-the-character)
- **Catalogued entry:** [`book-basics-identifying-characters.md`](../book-basics-identifying-characters.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); series wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233
- **Spec status:** v1 — matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-021, documented in section 9); no network after load
- **Conditional sections:** all 16 included; 6, 11, and 12 are the template's conditional ones and are included. Game-only blocks are replaced by player equivalents: three video chapters replace levels, five find-the-character rounds replace a scoring loop, and a wordless celebration plus end card replace a win condition.

## 2. Overview and learning objective

A child presses Play and watches a **51.6 s** original animated video (2,000 ms lead-in + 46,000 ms of
chapters + three 1,200 ms gaps) in three chapters: what a character is, how a name or a look helps you
find one, and how one picture can hold more than one character. The video hands over to **5
find-the-character rounds**: each scene shows 2–3 characters plus a prop, a voice names one character,
and the child taps that character. The skill is **story comprehension — mapping a character's name to
the figure in the picture, and telling characters apart from props**. Age band: **2–8 across the
library**; this entry targets **Preschool–K (4–5)**. Expected session: **2–3 minutes** (51.6 s video
from Play + 5 rounds; any chapter can be replayed and the activity can be replayed from the end card).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Identifying Characters" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; `khan-academy-kids-games.md` lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description; shared Book Basics brief |
| O3 | Official sources publish the video titles only — no per-video descriptions, runtime, or content; the focus implied by the title is an inference, not an official description | official (about the source's limits) | Catalogued entry Notes |
| O4 | The entry is a video in the Library's Videos section; the app targets ages 2–8 (Preschool–2nd Grade) | official | Catalogued entry lines 3–4; `khan-academy-kids-games.md` audience statements |
| D1 | The video subject — characters are the people and animals in a story, found by name, look, or action — and the 3-chapter storyboard | designed | Title-only inference (O3); makes the video buildable |
| D2 | The find-the-character activity: 5 rounds, 2–3 characters + props per scene, tap the character named by the voice | designed | Shared brief's per-entry concept for this slug |
| D3 | Cast (Mia, Bo, Nia, Pico, Tilly, Gus), scenes, prompts, praise, teach lines, name tags, all copy | designed | Original content required; no Khan Academy character, art, voice, or audio is reproduced |
| D4 | Video chrome (Play/Pause, Replay, 3 chapter dots), 2000 ms lead-in, 1200 ms gaps, auto-advance | designed | The minimal playback control the interactive-player type promises |
| D5 | Idle hints, hidden reset, local progress, audio rules, degradation, multi-touch rules, no fail state | designed | Template v1 and the shared brief conventions; never punishing (ages 2–8) |
| D6 | All art, animation, voice, music, and layout; programmatic animation only (no real footage) | designed | Buildability invention; every asset is original |

## 4. Player experience / core loop

A child presses the big Play on a title card. The storybook stage fades in: Mia walks on and waves,
Pico the puppy trots in, and a warm voice explains that characters are the people and animals who live
in a story. Chapter 2 shows how Bo's green cap and Tilly's purr help you pick them out of a picture.
Chapter 3 shows a scene with three characters and hands over: "Now it is your turn to find a
character." A park scene appears, the voice asks "Tap the character named Mia," and the child taps
Mia — a ring, a sparkle, a ding, "Yes! That's Mia. Mia is a character in the story." Four rounds
follow; the fifth ends in confetti and an end card with Replay and HOME.

**Core loop:** watch a chapter (pause or replay freely) → hear one character named in a scene → tap
the named character → gentle feedback (praise or teach) → next round → celebration → Replay or HOME.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (blank warm-paper scene), preload the section 11 assets, then `title`: a decorative storybook scene (an open book with the six original cast members peeking), a Play target ≥96×96 CSS px, and an inconspicuous reset logo ≥64×64 CSS px (FR-017). No audio shall play before the first user gesture; the first pointer or key input unlocks audio (R-006). When Play is pressed, it shall unlock audio, run a **2000 ms lead-in** (stage fade 300 ms), start chapter 1 at video clock **2000**, and save `{phase:"video", roundIndex:0, completed:false}`. |
| FR-002 | The player shall drive one accumulated `videoMs` clock from Play (advanced per frame only while `playing` and the tab is visible; never wall-clock), on this fixed timeline: lead-in **0–2000**; chapter 1 **2000–18000** (16,000 ms); gap **18000–19200**; chapter 2 **19200–37200** (18,000 ms); gap **37200–38400**; chapter 3 **38400–50400** (12,000 ms); post-video gap **50400–51600**. At each chapter end the clock auto-advances through the **1200 ms** gap (chapter art fades out 200 ms, holds, next chapter fades in 200 ms; chapter dot fills). After chapter 3's gap the player shall enter `activity` round 1 at **51600** and speak its prompt at **52200** (entry + 600 ms, FR-006) — no tap needed. Chapters total 46,000 ms; Play to round 1 totals 51,600 ms. |
| FR-003 | Each chapter shall play its lines at the exact section 8 offsets, one voice clip per line (volume 1.0, one-shot), with its scripted highlight ring or name-tag pop moving to the named element at the line's start (appears in ≤100 ms). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a line, chapter, or transition (R-005). |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`; Pause shall cancel the current line and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current line's start (the line with the greatest offset ≤ the frozen clock; before line 1, line 1) and re-speak that line, so no line is skipped or repeated. Inside a gap, Resume continues the frozen segment with its remaining time and no voice. Pause/Resume is throttled to one toggle per **300 ms**; a double-tap toggles once. Each chrome press plays `sfx_tap` (0.5). |
| FR-005 | A Replay target ≥64×64 CSS px shall cancel the voice and restart the current chapter from its first line: set `videoMs` to **2000 / 19200 / 38400** and play line 1 immediately; later lines and the auto-advance keep their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay is throttled to one restart per **500 ms**; repeats inside the window are ignored with no sound. Replay does not change the save. |
| FR-006 | `activity` shall run 5 fixed rounds in section 8 order with no randomization. When round *r* (0–4) is entered, the player shall show the round scene (section 8): characters render ≥160×200 CSS px and props ≥96×96 CSS px at ≥1024 px wide; the scene fades in over 300 ms; at **entry + 600 ms** the round's prompt voice plays (1.0, one-shot) and a 96×96 ear pictogram ear-pulses until the clip ends; entering a round saves `{phase:"activity", roundIndex:r, completed:false}`. Every character and prop is tappable. |
| FR-007 | When the round's correct character is tapped, the player shall, in order: draw the highlight ring on it, play sparkle (≤6 particles, 400 ms) at its center, play `sfx_ding` (0.8, one-shot, 300 ms throttle), and play the round's praise voice (1.0, one-shot); then advance — rounds 1–4 → next round scene, round 5 → `celebrating` (FR-015) — **600 ms after the praise clip ends** (with no speech: 2600 ms after the judgment). From the judgment until that advance all taps are ignored (the success lock). One correct tap is always enough; no score, streak, or bonus exists. |
| FR-008 | When a wrong character or a prop is tapped, the player shall teach and never punish: jiggle the tapped item (400 ms), play `sfx_soft_tap` (0.5, one-shot), play the teach voice (0.7, one-shot; the section 8 line names the tapped item and repeats the prompt), then replay the round prompt (1.0) starting **600 ms after the teach clip ends** (with no speech: the ear pictogram ear-pulses for 3000 ms starting 600 ms after the jiggle). Wrong taps share a **1200 ms throttle**: repeats inside the window are ignored with no sound and no judgment. From the round's second wrong tap on, each wrong tap also soft-pulses the correct item (400 ms). The round stays open until its correct character is tapped; wrong taps never advance, subtract, lock, or end anything. |
| FR-009 | A tap >12 px from every item's expanded hit rect is an empty tap: nothing changes on screen or in audio, and the idle timer resets (FR-012). Empty space includes the scene background and non-tappable scenery (bench, flowers, blanket). |
| FR-010 | Input semantics: tap/click only — no drag gestures exist in this entry; the first pointer down wins and additional simultaneous pointers are ignored until release. Taps during the success lock (FR-007) or the teach window (FR-008) are ignored with no sound, so a double-tap yields exactly one judged event per window. |
| FR-011 | Hit testing: each item's hit rect is its rendered illustration bounds expanded **12 px** on all four sides; a tap inside one or more expanded rects selects the item whose center is nearest; exact center-ties resolve to the **lowest index** (items are indexed by the section 8 read order: topmost band first, then left→right); a tap inside no expanded rect is an empty tap (FR-009). |
| FR-012 | When no input has occurred for **12,000 ms**: on `title` the Play target hint-pulses 3000 ms (visual-only before the first gesture; `vo_hint` at 1.0 after one); in `video` paused the Play/Pause target hint-pulses 3000 ms plus `vo_hint` (a playing video never hints — its motion is the cue); in `activity` the round's correct item hint-pulses 3000 ms plus `vo_hint_find` (1.0); on `endcard` Replay hint-pulses 3000 ms plus `vo_hint`. Hints repeat every 12,000 ms of continued idleness and are cancelled by any input, including an empty-space tap. |
| FR-013 | When the tab becomes hidden while `video` is playing, the player shall cancel the current line and enter paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return, an unanswered round replays its prompt once (1.0) 600 ms after return. Idle time counts visible time only; throttled timers may delay hints or advances but never lose progress (A8). |
| FR-014 | Only one voice clip shall play at a time; any new voice clip (video line, prompt, praise, teach, hint) cancels the previous utterance immediately. Sound effects may overlap each other and the voice. |
| FR-015 | When round 5 is answered correctly, the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), and `vo_praise` (1.0, one-shot) at its start, and save `{phase:"activity", roundIndex:4, completed:true}`. The `endcard` shall appear 2500 ms later: a centered end panel with Replay ≥96×96 CSS px and HOME ≥64×64 CSS px; nothing auto-advances further. |
| FR-016 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves, and returns to `title`. On `title` (the player's home) and `loading`, no HOME control is rendered and a HOME input is a no-op. |
| FR-017 | When the `title` logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; a release before 3 s resets the ring to 0 with no action. On completion it shall clear the storage key and in-memory progress, then play a ring flash (300 ms) and `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-018 | End-card Replay shall enter `activity` round 1 fresh, save `{phase:"activity", roundIndex:0, completed:false}`, and play the round-1 prompt normally (600 ms after the scene fades in); the video is not replayed from the end card. |
| FR-019 | The player shall have no fail state: mis-taps, random taps, double-taps, simultaneous touches, empty taps, idle time, missing speech, and blocked storage never lose progress, never end a round, never end play, and never block progress. Rounds advance only on the correct character's tap; there is no score, star, streak, or comparison. |
| FR-020 | Audio rules: no audio before the first user gesture (R-006); volumes per section 9; optional `music_title` loops at 0.15 on `title` only and stops at Play; while a teach voice plays, the melody bus ducks 0.5→0.4 within 120 ms and restores over 200 ms when the voice ends. |
| FR-021 | Degradation: no speech synthesis → all voices are silent; the video's highlights and name tags and the activity's ear pictogram carry every step (each prompt shows the ear pulse for 3000 ms), all section 9 rhythms hold, and a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. Missing visual asset → draw a stub shape, log a warning, keep playing. |
| FR-022 | Persistence: save on Play from `title` (phase `video`, roundIndex 0, clearing `completed` in that save), on each round entry, on completion (FR-015), and on HOME; `updatedAt` refreshes on every save. On load, Play resumes at the saved phase and round — `phase:"activity"` opens that `roundIndex` directly (the video is not replayed); `phase:"video"` opens chapter 1; when `completed` is true, Play starts at the video (chapter 1) and that save clears `completed`. The video clock is never persisted. |
| FR-023 | No-reading rule: the only visible words are the video name tags — the character names being taught (`Mia`, `Pico`, `Bo`, `Tilly`, `Gus`, `Nia`); the activity shows no visible text at all. Instructions and feedback reach non-readers by voice + pictogram. Every interactive element (reset logo, Play, Play/Pause, Replay, HOME, each activity item) carries an invisible accessible name (section 7); this rule governs visible text only. |
| FR-024 | Viewport resize or rotation mid-video or mid-round shall reflow per section 8 and preserve chapter, `videoMs`, playback, round, and progress; every target stays ≥80×80 CSS px and every control ≥64×64 CSS px. |
| FR-025 | Chapter dots (3 dots, 12 px, 8 px gaps; current = accent fill over 100 ms, no motion) shall show the current chapter in `video`; they are not interactive and not focusable. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank warm-paper scene | initial; preload art and audio; audio locked |
| `title` | decorative storybook scene + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `video(chapter, playback)` | animated storybook stage + chrome; chapter 1–3 | playback ∈ {playing, paused}; 1200 ms gaps between chapters |
| `activity(roundIndex)` | round scene with 3–4 tappable items + ear pictogram + HOME | roundIndex 0–4; items per section 8 |
| `celebrating` | frozen round-5 scene + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; stop `music_title`; save phase `video`, roundIndex 0 |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` / Space | 300 ms throttle clear | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / key on target | 500 ms throttle clear | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter, or `activity(0)` after chapter 3's gap | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line; freeze clock (FR-013) |
| `video` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `activity` | `ITEM_TAP(idx)` | no judgment in FR-007/FR-008 windows | `activity(same)` or next round; round 5 → `celebrating` | actions: FR-007/FR-008; save on next round entry |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | actions: cancel voice; pause idle; re-ask on return (FR-013) |
| `activity` | `IDLE_12S` | visible, no input 12 s | `activity(same)` | actions: FR-012 hint |
| `activity` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: show end panel (FR-015) |
| `celebrating` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel timer; save |
| `endcard` | `REPLAY_PRESSED` | — | `activity(0)` | actions: FR-018; save |
| `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: save |
| any visible state | `IDLE_12S` | 12,000 ms no input | same state | actions: FR-012 hint |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — logo (reset) → Play; `video` — HOME → Play/Pause → Replay; `activity` —
HOME → items in index order (section 8 read order, left→right within a band); `celebrating` — HOME
only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play from title | tap Play | Tab to Play + Enter/Space |
| Play / pause video | tap Play/Pause | Space (no control focused) or Enter/Space on the focused target |
| Replay chapter | tap Replay | R or Enter/Space on the focused Replay |
| Answer a round | tap a character or prop | Tab to the item + Enter/Space |
| Replay the activity | tap Replay on the end card | Enter/Space on the focused Replay |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and end-card Replay ≥96×96 CSS px; HOME, Play/Pause, Replay, and the reset logo
  ≥64×64; activity items ≥96×96 at ≥1024 px wide and ≥80×80 at 768–1023 px — all above the 44 px
  platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-011; nearest center wins, exact ties resolve to the
  lowest item index; >12 px from every rect is an empty tap (nothing changes; the idle timer resets).
- **Multi-touch / gestures:** first pointer down wins; extra simultaneous pointers are ignored until
  release. No drag gestures exist, so no drag alternative is required. Judgments are separated by the
  FR-007 success lock and the FR-008 teach window.
- **Instructions without reading:** every prompt is voice + a 96×96 ear pictogram; the scene itself is
  the question. Chrome is pictogram + invisible name. Visible words are limited to FR-023 tags.
- **Accessible names (invisible):** "Play", "Reset saved progress (hold 3 seconds)", "Home", "Pause",
  "Resume", "Replay chapter 2", "Mia, a character", "Bo, a character", "Nia, a character", "Pico, a
  puppy", "Tilly, a cat", "Gus, a frog", "Ball", "Stack of books", "Watering can", "Ball of yarn",
  "Picnic basket", "Replay".
- **Resize:** viewport resize or rotation mid-video or mid-round reflows per section 8, preserving
  chapter, `videoMs`, playback, round, item order, and progress.

## 8. Content and data

**Video storyboard (original, programmatic animation; all copy is original).** Stage 1280×720; line
offsets are chapter-relative; each clip has a cap so it never crosses the next line or the chapter end
(caps are shortened by speech length, never stretched); absolute tick = chapter start + offset.

| Ch | Span (ms) | Dur | On-screen content and highlight | Voice lines (offset → key: copy, cap) | Art guidance |
|---|---|---|---|---|---|
| 1 | 2000–18000 | 16.0 s | storybook page opens (fade 400 ms) at 0; Mia walk-in from the left at 1600, waves at 2400 (two 300 ms waves); Pico trots in from the right at 5600 (walk-in + one bounce at 6200); at line 3 rings wrap Mia and Pico and name tags pop | 0 → `vo_v1_1`: "Every story has characters." (≤2.8 s); 3800 → `vo_v1_2`: "Characters are the people and animals in a story." (≤3.8 s); 8600 → `vo_v1_3`: "Mia is a character. So is Pico the puppy." (≤3.6 s); 12800 → `vo_v1_4`: "Can you find Mia and Pico?" (≤3.0 s) | flat rounded linework; Mia = red scarf, dark curls, yellow boots; Pico = brown-and-white puppy with an orange collar; name tags are the only visible words |
| 2 | 19200–37200 | 18.0 s | cross-fade to a park spread (fade 300 ms) at 0; an empty name-tag frame pops beside Bo at 3600 and fades at 4600; at line 3 a 4 px accent underline sweeps under the picture (left→right, 800 ms); at line 4 Bo's cap soft-pulses and his tag "Bo" pops; at line 5 Tilly's tail sways (rotate −6°→6° over 600 ms ×2) and her tag "Tilly" pops | 0 → `vo_v2_1`: "How do you find a character in a picture?" (≤3.0 s); 3600 → `vo_v2_2`: "Listen for the character's name." (≤2.6 s); 7000 → `vo_v2_3`: "Then look for who the name fits." (≤2.8 s); 10600 → `vo_v2_4`: "Bo is the one in the green cap." (≤3.0 s); 14400 → `vo_v2_5`: "Tilly is the cat who purrs." (≤3.0 s) | Bo = green cap, denim overalls, reading on a bench; Tilly = gray striped cat, pink bow; Mia walks with a kite on the left; flowers and a path are scenery |
| 3 | 38400–50400 | 12.0 s | fade to a picnic spread (300 ms) at 0 with Mia, Nia, and Gus; at line 2 a 4 px accent ring soft-pulses once around Gus (400 ms) and his tag "Gus" pops; at line 3 the book cover closes halfway (page turn 400 ms) and the stage fades 300 ms while the ear pictogram pops at 11600 | 0 → `vo_v3_1`: "A picture can have more than one character." (≤3.6 s); 4200 → `vo_v3_2`: "Find the one the story is talking about." (≤3.6 s); 8200 → `vo_v3_3`: "Now it is your turn to find a character." (≤3.4 s) | Nia = braids with yellow ribbons, purple jumper; Gus = round green frog; picnic blanket, basket, and kite are scenery; the three sway gently (translate-y 0→4→0 over 2000 ms, loop) |

**Activity scenes and items.** Item ids are the hit targets and the judgment keys; index order is the
read order — items whose centers differ by <120 px in y are one band, bands run top→bottom, and items
within a band run left→right (FR-011 tie rule uses this index).

| Scene | Shows | Items (index order, center x/y on the 1024×768 stage) | Art guidance |
|---|---|---|---|
| `scene_park` | park with a bench and a tree | 0 `mia` (620/340), 1 `pico` (200/520), 2 `ball` (900/540) | Mia sits on the bench waving; Pico mid-trot at the left; a red-and-gold ball at the lower right; grass and sky scenery |
| `scene_nook` | reading nook with a rug and a shelf | 0 `bo` (360/380), 1 `tilly` (820/420), 2 `books` (260/580) | Bo reads on the rug; Tilly curled on a cushion at the right; a stack of three books at the lower left; no visible words on the book spines |
| `scene_garden` | garden bed with flowers | 0 `nia` (300/360), 1 `can` (260/580), 2 `pico` (820/560) | Nia stands top-left holding a flower; Pico digs at the lower right; a blue watering can at the lower left; pansies as scenery |
| `scene_yard` | back yard with a wooden box | 0 `bo` (300/400), 1 `tilly` (820/360), 2 `yarn` (560/600) | Bo stands at the left with a kite string; Tilly sits on the box at the right; a pink ball of yarn with a trailing thread front-center; fence scenery |
| `scene_picnic` | picnic blanket under a tree | 0 `nia` (240/380), 1 `gus` (560/420), 2 `mia` (880/400), 3 `basket` (620/620) | three characters sit on the blanket; the wicker basket sits front-center below them; a kite in the sky as scenery |

**Rounds (fixed order; prompt copy below; the voice names exactly one character per round).**

| # | Scene | Prompt (`vo_prompt_n` — 1.0, one-shot, ≤2.8 s) | Correct | Distractors | Illustration guidance |
|---|---|---|---|---|---|
| 1 | `scene_park` | `vo_prompt_1`: "Tap the character named Mia." | `mia` | `pico`, `ball` | all three items fully visible, ≥32 px apart; the ball is clearly an object (no face, no limbs) |
| 2 | `scene_nook` | `vo_prompt_2`: "Find Bo." | `bo` | `tilly`, `books` | Bo and Tilly both sit; the book stack has no face |
| 3 | `scene_garden` | `vo_prompt_3`: "Find Pico." | `pico` | `nia`, `can` | Nia and the can are separated by ≥200 px; Pico is the only item with a wagging tail pose |
| 4 | `scene_yard` | `vo_prompt_4`: "Find Tilly." | `tilly` | `bo`, `yarn` | Bo's kite string leads off-frame; the yarn renders at the 96×96 px prop minimum (≥120×120 hit rect after expansion) |
| 5 | `scene_picnic` | `vo_prompt_5`: "Find Gus." | `gus` | `nia`, `mia`, `basket` | three characters and one prop; Gus is the only animal item; characters sit ≥200 px apart |

| # | Tapped item → teach key — copy (0.7, one-shot, ≤3.0 s) | Second tapped item → teach key — copy |
|---|---|---|
| 1 | `pico` → `vo_try_1_pico` — "That's Pico, the puppy. Find Mia." | `ball` → `vo_try_1_ball` — "That's a ball. Find Mia." |
| 2 | `tilly` → `vo_try_2_tilly` — "That's Tilly, the cat. Find Bo." | `books` → `vo_try_2_books` — "Those are books. Find Bo." |
| 3 | `nia` → `vo_try_3_nia` — "That's Nia. Find Pico." | `can` → `vo_try_3_can` — "That's a watering can. Find Pico." |
| 4 | `bo` → `vo_try_4_bo` — "That's Bo. Find Tilly." | `yarn` → `vo_try_4_yarn` — "That's a ball of yarn. Find Tilly." |
| 5 | `nia` → `vo_try_5_nia` — "That's Nia. Find Gus." | `mia` → `vo_try_5_mia` — "That's Mia. Find Gus."; `basket` → `vo_try_5_basket` — "That's the picnic basket. Find Gus." |

- **Correct feedback copy (`vo_yes_n`, 1.0, one-shot):** 1 "Yes! That's Mia. Mia is a character in the
  story." (≤4.0 s) · 2 "Yes! That's Bo. He is a character in the story." (≤4.0 s) · 3 "Yes! That's
  Pico. Pico is a character, even though he is a puppy." (≤4.0 s) · 4 "Yes! That's Tilly. Animals can
  be characters, too." (≤4.0 s) · 5 "Yes! That's Gus. You can find the characters in this story!"
  (≤3.5 s).
- **Hints and praise (all 1.0, one-shot):** `vo_hint` = "Tap the blinking button to keep going."
  (≤2.8 s) · `vo_hint_find` = "Tap the character you hear." (≤2.8 s) · `vo_praise` = "You found every
  character! You can find them in any story." (≤3.5 s).
- **Worked example (round 3, one wrong tap then correct):** round entry at 0 — `scene_garden` fades in
  300 ms, `vo_prompt_3` plays at 600; at 2400 the watering can (index 1) is tapped: jiggle 400 ms +
  `sfx_soft_tap`, teach `vo_try_3_can` (0.7) runs ≈2400–5400, prompt re-plays at 6000; this is the
  first wrong tap, so no soft pulse fires. At 7200 `pico` is tapped: highlight ring, sparkle ≤6,
  `sfx_ding`, `vo_yes_3` runs 7200–≤11200; round 4's scene enters at 11800 (600 ms after the clip
  ends), saving `roundIndex` 3.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; activity stage 4:3 ≤1024×768 centered;
  characters ≥160×200 px; props ≥96×96; ear pictogram 96×96 centered 24 px under the chrome; end panel
  ≤420×300. At 768–1023 px — chrome 88 px; characters ≥140×175; props ≥80×80; pictogram 80×80; items
  hit ≥80×80. Height ≥700 px; below that scale the field by 0.85 keeping every target ≥80 px and every
  control ≥64 px.
- **Progression rule:** fixed video 1→3, then fixed rounds 1→5; only a correct tap advances a round;
  nothing locks, randomizes, or adapts; a fresh run or a `completed` run always plays the video before
  round 1. **Determinism:** scene order, item order, indices, and copy are fixed by this section; no
  random element exists.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video line starts | highlight ring or name-tag pop in ≤100 ms; animation continues | `vo_v{chapter}_{line}` — 1.0 — one-shot |
| Chapter change | 200 ms fade out/in around the 1200 ms gap; dot fill | none |
| Chrome press (Play/Pause, Replay, HOME) | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Round entry | scene fade in 300 ms; ear pulse from the prompt's start | `vo_prompt_n` — 1.0 — one-shot at entry + 600 ms |
| Correct character tap | highlight ring; sparkle ≤6 particles at its center | `sfx_ding` — 0.8 — one-shot (300 ms throttle); `vo_yes_n` — 1.0 — one-shot |
| Wrong tap (character or prop) | tapped item jiggles 400 ms; from the 2nd wrong tap on, the correct item soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach line `vo_try_*` — 0.7 — one-shot (1200 ms throttle; duck) |
| Prompt re-ask after a wrong tap | ear pulse 3000 ms when speech is unavailable | `vo_prompt_n` — 1.0 — one-shot 600 ms after the teach clip |
| Round 5 correct, then celebration | confetti ≤40 particles, 2500 ms; end panel at 2500 ms | `vo_yes_5` — 1.0 — one-shot; then `sfx_chime` — 0.8 — one-shot and `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3000 ms | `vo_hint` / `vo_hint_find` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after the first Play; ear pulse carries prompts | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only |

**Effect definitions (no undefined effects):** *highlight ring* = 4 px accent `#E4572E` stroke around the item's bounds plus a 25% accent wash, appears ≤100 ms, holds until the round advances. *pop* = scale 0→1.08→1 over 300 ms. *bounce* = translate-y 0→−12→0 px over 350 ms. *walk-in* = translate-x 80→0 px over 600 ms, no rotation. *soft pulse* = scale 1→1.05→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3000 ms. *jiggle* = rotate −4°→+4°→0 over 400 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = ≤6 star particles, 4 px, radiating ≤48 px over 400 ms. *confetti* = ≤40 rect particles falling ≤160 px over 2500 ms. *fade* = opacity 0→1 or 1→0 over 300 ms (200 ms for chapter-art fades per FR-002). *page turn* = spread cross-fade left→right over 400 ms with a 24 px content slide, no rotation. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *end panel* = centered card ≤420×300 px, fill `#FFFDF7`, 4 px `#3A2E24` border, 24 px radius, fades in over 300 ms. *ear pulse* = ear pictogram scale 1→1.12→1 over 500 ms per cycle for the prompt clip's duration (or 3000 ms when re-asking or when speech is unavailable). *dot fill* = chapter dot switches to accent over 100 ms, no motion. *name tag* = rounded pill ≤160×48 px, fill `#FFFDF7`, 4 px ink border, 32 px ink text (a character's name), pops in and holds until the chapter ends.

**Audio rules (v1):** no audio before the first gesture (FR-001/FR-020); one voice at a time, each new voice cancels the previous utterance (FR-014); sfx may overlap; `music_title` optional at 0.15 on `title` only; degradation per FR-021; background-tab behavior per FR-013 (A8); a failed clip is skipped without blocking the timeline.

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key
  `spec.bookBasics.identifyingCharacters.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** title→Play (phase `video`, roundIndex 0, `completed` cleared); every activity round
  entry (phase `activity`, that `roundIndex`); completion (FR-015, `completed:true`); HOME from any
  state. `updatedAt` refreshes on every save.
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round directly
  (the video is not replayed); `phase:"video"` opens chapter 1. When `completed` is true, Play starts
  at the video (chapter 1), per FR-022.
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard
  equivalent: hold Enter/Space 3 s on the focused logo (FR-017).
- **Deliberately not stored:** `videoMs` and clock position, chapter position, item order, wrong-tap
  counts, tap history, judgments, language or audio settings, sparkle/confetti counts, anything
  identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended;
  handled by FR-013. Storage blocked → run unsaved (FR-021).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy media or
characters appear. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row
says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | warm-paper storybook title scene: open book with the six cast members peeking | 1024×768 SVG | static | SVG shapes |
| `char_{mia,bo,nia,pico,tilly,gus}` | image | six cast sheets per section 8 art guidance (idle + action pose each; Gus the frog, Tilly the cat, Pico the puppy) | 512×640 SVG each | posed, popped, pulsed, walked in | SVG shapes |
| `film_ch1..3` | animated | the three chapters per section 8 (spreads, walk-ins, tags, rings, page turn) | runtime 1280×720 | one timeline at a time | runtime SVG animation; a pre-rendered file is acceptable only if it matches the section 8 timeline |
| `scene_{park,nook,garden,yard,picnic}` | image | the five round scenes with their items at the section 8 positions | 1024×768 SVG each | static; fades in | SVG shapes |
| `pict_play` / `pict_pause` / `pict_replay` / `pict_home` | image | triangle / bars / circular restart arrow / house | 64×64 SVG (end-card Replay 96×96) | static | SVG paths |
| `pict_ear` | image | listening ear with a small character outline | 96×96 SVG (80×80 at 768–1023 px) | ear-pulses during prompts | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech is missing | SVG path |
| `tag_frame` | image | rounded name-tag pill for video character names (name text rendered as content on top) | ≤160×48 SVG | pop; holds until chapter end | SVG shape |
| `ring` | rendered | 4 px accent progress ring around the reset logo; also the highlight ring | logo-sized | ring fill/flash; highlight holds | none needed |
| `sparkle` / `confetti` | rendered | 4 px star particle; rect particle | runtime | one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_ding` / `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips/arpeggio |
| `vo_v1_1..4` / `vo_v2_1..5` / `vo_v3_1..3` | audio | 12 narration lines with caps, section 8 | ≤3.8 s each | one-shot | TTS allowed |
| `vo_prompt_1..5` / `vo_yes_1..5` | audio | 5 prompts and 5 praise lines, section 8 | ≤2.8 s / ≤4.0 s | one-shot | TTS allowed |
| `vo_try_*` | audio | 11 teach lines (2–3 per round), section 8 | ≤3.0 s each | one-shot (1200 ms throttle) | TTS allowed |
| `vo_hint` / `vo_hint_find` / `vo_praise` | audio | copy in section 8 | ≤2.8 s / ≤2.8 s / ≤3.5 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, gold `#F2B33D`, leaf `#7FB069`,
  sky `#BFE3F0`, denim `#4A7FB5`, cat gray `#9AA0A6`, chrome `#FFFDF7`. **Typography:** system rounded
  stack (`ui-rounded`, fallback `system-ui`); name tags 32 px ink on a 48 px pill; no other visible
  words.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing
  audio → skip that clip, timeline and behavior unchanged (FR-021, R-007).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: int 1-3`; `startMs/endMs: int` (videoMs); `artKey: string`; `lines: Line[]` |
| `Line` | `offsetMs: int`; `voiceKey: string`; `copy: string`; `highlight: ItemId[]`; `tag: string \| null` |
| `Round` | `index: int 0-4`; `sceneKey: string`; `promptKey/promptCopy: string`; `correctItemId: ItemId`; `items: Item[3-4]`; `yesKey: string` |
| `Item` | `id: ItemId`; `kind: enum {character, prop}`; `label: string` (invisible accessible name); `center: {x, y}`; `w/h: int`; `tryKey: string \| null` (wrong-tap teach line naming this item) |
| `ItemId` | `enum {mia, bo, nia, pico, tilly, gus, ball, books, can, yarn, basket}` |
| `Save` (persisted) | `phase: "video" \| "activity"`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `wrongInRound: int`; `judgeLock: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Line`, `Round`, and `Item` records are static; the timeline is computed from `startMs` and
`offsetMs` and never from wall-clock time. Round judgment reads only `Round.correctItemId` and the
`Item.tryKey` of the tapped distractor.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes with per-item hit rects, a highlight-ring overlay,
  and name tags as text content on the video stage.
- **R-002** The player shall animate the section 9 effects: highlight ring, pop, bounce, walk-in, soft
  pulse, hint pulse, jiggle, depress, sparkle, confetti, fade, page turn, ring fill/flash, end panel,
  ear pulse, dot fill, name tag.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test
  per FR-010/FR-011; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for every interactive element, with
  Space = Play/Pause, R = Replay chapter, Escape = HOME.
- **R-005** The player shall play one voice clip at a time with sfx overlap and the FR-020 ducking
  rule; a failed clip is skipped without blocking the timeline.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until
  the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice all lines, prompts, teach lines, hints, and praise via speech
  synthesis or provided clips, with the FR-021 fallback.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage,
  tolerate blocked storage (FR-021), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during
  video animation, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing phase, round, `videoMs`,
  playback, or progress.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-023).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no
  progress loss and no timeline desync (FR-013); hints may fire late.
- **R-013** Each chapter shall be renderable at runtime from `Chapter` data; a pre-rendered file is
  acceptable only if it matches the same section 8 timings.
- **R-014** The player shall request no camera, microphone, or network access at runtime.
- **R-015** The player shall keep every session completable: no score, no fail state, no timer that
  gates progress (FR-019).

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥96 px) and the reset logo (≥64 px), and no audio has played |
| AC-02 | `title` with no save or `completed:true` | Play is pressed | a 2000 ms lead-in runs, chapter 1 line 1 ("Every story has characters.") plays at videoMs 2000, and the save records phase `video` with `completed` cleared |
| AC-03 | the video playing | the clock runs with no input | chapter changes fire at 18000/19200/37200/38400/50400 ms, each chapter dot fills at the change, each chapter's first line and its ring/tag appear at the section 8 offset (±100 ms), the round 1 scene fades in at 51600 ms, and its prompt plays at 52200 ms; every visible word on the stage is a character-name tag |
| AC-04 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops immediately and animation freezes; Play replays that line from its start and no line is skipped |
| AC-05 | chapter 3 playing | Replay is pressed | chapter 3 restarts at 38400 ms with its first line |
| AC-06 | round 1 (`scene_park`) | Mia is tapped | the highlight ring, a sparkle, `sfx_ding`, and "Yes! That's Mia…" play; round 2's scene enters 600 ms after the clip ends and `roundIndex` 1 is saved |
| AC-07 | round 1 | Pico is tapped | Pico jiggles 400 ms, `sfx_soft_tap` plays, "That's Pico, the puppy. Find Mia." plays, the prompt re-plays 600 ms after the teach line ends, and the round does not advance |
| AC-08 | round 2 (`scene_nook`) | the book stack is tapped | the books jiggle, `sfx_soft_tap` plays, "Those are books. Find Bo." plays, and no progress is lost |
| AC-09 | round 2 with one wrong tap already recorded | a second wrong item is tapped | the correct item (Bo) soft-pulses 400 ms alongside the teach line and prompt re-ask |
| AC-10 | round 3 (`scene_garden`) | Pico is double-tapped within 600 ms | exactly one judged correct tap, one sparkle, one `sfx_ding`, and one round advance occur |
| AC-11 | round 4 (`scene_yard`) | a first finger holds Bo and a second finger taps the yarn before release | only Bo reacts (teach line for Bo); the yarn shows no feedback of any kind |
| AC-12 | round 1 | a tap lands 10 px outside Mia's rendered bounds (inside her 12 px expansion) | Mia is judged correct (ring, sparkle, praise), while the identical tap 14 px outside every item is an empty tap (AC-13) |
| AC-13 | any round | empty space >12 px from every item is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-14 | a round open, 12 s without input | idleness continues | the correct item hint-pulses for 3 s and `vo_hint_find` plays; any tap resets the timer and the hint repeats 12 s later |
| AC-15 | `title`, no gesture yet | 12,000 ms pass | Play hint-pulses for 3 s with no sound; after any gesture the hint also plays `vo_hint` |
| AC-16 | the video paused, 12,000 ms no input | idleness continues | Play/Pause hint-pulses 3 s with `vo_hint`; while the video is playing no hint ever fires |
| AC-17 | a save `{phase:"activity", roundIndex:2}` | the page reloads and Play is pressed | round 3's scene and prompt appear directly; the video is not replayed |
| AC-18 | a save with `completed:true` | the page reloads and Play is pressed | chapter 1 of the video starts and that save clears `completed` |
| AC-19 | round 2 open | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload round 2's prompt plays |
| AC-20 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-21 | rounds 1–5 answered correctly | round 5 is answered | sparkle, `sfx_ding`, and "Yes! That's Gus…" play; 600 ms after the clip ends confetti (≤40, 2500 ms), `sfx_chime`, and "You found every character!…" play, and 2500 ms after the confetti starts the end panel with Replay (≥96 px) and HOME (≥64 px) appears |
| AC-22 | the end card showing | Replay is pressed | round 1's scene and prompt start fresh and the save records `{roundIndex:0, completed:false}` |
| AC-23 | speech synthesis unavailable | Play is pressed and a round is played | no voice plays, the video highlights/tags and the 3000 ms ear pulse carry every step, correct taps still advance, and the muted-speaker pictogram shows 5 s |
| AC-24 | storage blocked | the entry is played and HOME is pressed | all behavior works in memory; after reload Play starts the video |
| AC-25 | the video playing or a round open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen (or the open round's prompt re-plays once) and no progress is lost |
| AC-26 | any state | Tab is pressed repeatedly, then Enter/Space and Escape are used | focus follows the section 6 tab order, Enter/Space activates each control, and Escape returns HOME |
| AC-27 | a round open at 1024×768 | the viewport is resized to 800×1000 | phase, round, item order, and progress are unchanged and every item remains ≥80 px and every control ≥64 px |
| AC-28 | a voice cue is playing (video line, prompt, praise, teach, or hint) | a new voice cue starts | the previous utterance stops immediately and only the new voice is heard; sound effects may still overlap |
| AC-29 | any activity round | the round is open | no visible words appear in the round scene or on the chrome; instructions arrive by voice plus the ear pictogram |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 51.6 s video plays its three chapters at the section 8 timings with rings, tags, gaps, dots,
   Pause/Resume, and Replay.
3. The five rounds run in order on the five scenes; correct taps advance, wrong taps teach and re-ask,
   and no score appears.
4. Phase and round survive a reload; Play resumes at the saved round (or the video when completed); the
   reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified; no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video subject and script, the five rounds, and the six-name cast are designed inferences from the title; official sources publish no per-video description | designed (O3, D1–D3) |
| A2 | All scenes, characters, poses, voice, and copy are original; no Khan Academy media or characters | designed (D6) |
| A3 | A runtime-rendered animated video is an acceptable realization; a pre-rendered file must match the section 8 timeline | designed (R-013) |
| A4 | TTS-generated clips or runtime TTS are acceptable | designed |
| A5 | Clip caps and line offsets approximate child-paced narration; a late or missed clip never shifts the timeline | designed (FR-003) |
| A6 | Browsers block autoplay until the first user gesture | platform fact; handled by FR-001/FR-020 |
| A7 | Character-name tags are the only visible words (they teach the names); the activity has no visible text | designed (FR-023) |
| A8 | Background-tab timers may be throttled and speech may be suspended | known platform behavior; handled by FR-013 |
| A9 | A 12 px tap tolerance, ≥96 px items, and the 300/500/1200 ms throttles suit ages 4–5 | designed (sections 7–8) |
| A10 | No unlocks, adaptive difficulty, persisted clock, or round skip; a `completed` run restarts the video | designed (FR-019, FR-022, section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** chapter script, timings, and highlights; round order, scenes, items, prompts, correct
  characters, and teach copy; hit tolerance and throttles; chrome set and keyboard map; target
  minimums; save key and shape; no fail state; asset provenance; acceptance criteria.
- **Free:** exact scene composition within the section 8 guidance, easing curves, particle look, voice
  timbre/TTS engine, optional title music, decorative title-scene details, character line weights
  within the palette.
- **Not in this spec:** library or Videos-tab browsing, the other eight Book Basics entries, profiles,
  navigation shell, parental controls, localization, analytics, scoring, streaks, or teacher tooling.
