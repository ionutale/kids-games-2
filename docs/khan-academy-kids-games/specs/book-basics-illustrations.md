# Illustrations (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-illustrations.md`](../book-basics-illustrations.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); repo wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233 ("Book Basics" video collection, named titles)
- **Spec status:** v1 — one of nine Book Basics specs; matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-019); no network after load
- **Conditional sections:** all 16 included. Game-only blocks are replaced by player equivalents: three video chapters replace levels, five match-the-picture rounds replace a scoring loop, a wordless celebration and end card replace a win condition.

## 2. Overview and learning objective

A child presses Play on the title, watches a 44.8 s original animated video in three chapters about how
pictures show what words say, then answers five match-the-picture rounds: a voice speaks a sentence
("Show me: 'The cat sleeps on the mat.'") and the child taps one of 2–3 pictures that shows it. A
correct tap earns a sparkle and a spoken confirmation; a wrong tap is answered by naming what the
tapped picture shows and re-asking. The skill is **picture–text comprehension** — hearing a sentence
and finding the picture that shows it, the concept implied by the title. Age band: **2–8 across the
library**; this entry targets **Preschool–K (4–5 pre-reader)**. Expected session: **2–2.5 minutes**
(44.8 s video + 5 rounds + endcard).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Illustrations" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; catalog lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish the video titles only — no per-video descriptions exist; the focus implied by the title is an inference, not an official description | official (about the source's limits) | Catalogued entry Notes |
| O4 | The app is officially for children ages 2–8 (Preschool–2nd Grade) | official | `khan-academy-kids-games.md` lines 96, 160–177 |
| D1 | The video topic — that pictures show what words say — and the three-chapter storyboard, page sentences, and script | designed | Inference from the title (O3); no official description exists |
| D2 | The interaction: five match-the-picture rounds (voice sentence → 2–3 picture options) | designed | Shared brief's per-entry concept for this slug |
| D3 | The original picture set (sun, moon, cat, girl, boy, dog, boat, duck) and page sentences | designed | Original content required; no Khan Academy media or characters |
| D4 | Player chrome (Play/Pause, Replay, HOME, reset logo, chapter/round dots), progress save/resume, idle hint, audio rules, no fail state | designed | Template v1 and the Book Basics shared brief |
| D5 | All art, video, voice, music, copy, and layout | designed | IP rule: all assets original (section 11) |
| D6 | No Book Basics title art, audio, or content is reproduced in this spec; no Khan Academy media or characters appear | designed | O3 (official sources publish titles only) and the IP rule (D5, section 11) |

## 4. Player experience / core loop

A child presses Play on the title. After a 2 s lead-in a picture-book spread fades in — "This is a page
from a picture book." The printed sentence "The sun is up." lights up: "The words tell the story."
Then the picture of the sun over the hill: "The picture shows what the words say." Chapter 2 matches
words to a cat picture; chapter 3 shows a sentence, two pictures, and picks the right one: "This one!
Now you listen and find the picture." Round 1 begins with a speech-bubble pictogram and a voice:
"Show me: 'The sun is up.'" The child taps the sun — sparkle, a bounce, a ding, "Yes! The sun is up."
Four rounds follow the same way; wrong taps get a jiggle and "That picture shows the moon." and the
prompt re-plays. After round 5 confetti pops, the voice says "You matched every picture! You are a
picture detective!", and the end card offers Replay or HOME.

**Core loop:** watch three teaching chapters → answer five match-the-picture prompts → hear each tap
affirmed or taught → celebrate → replay the video or go home.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, prepare the section 11 art and audio, then `title`: a decorative scene with the original sun-over-hill picture in a frame beside an open picture book, a Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px (FR-015). No audio plays before the first gesture (FR-018). When Play is pressed, it shall unlock audio and stop `music_title`, then: if the save has `phase:"activity"` and `completed:false`, open `activity` at the saved `roundIndex` with no lead-in and no video (FR-007, FR-017); otherwise run a **2000 ms lead-in**, start `video` chapter 1 at `videoMs = 2000` (FR-002), and save `{phase:"video", roundIndex:0, completed:false}`. |
| FR-002 | The video shall run one accumulated playing-time clock (`videoMs`, advanced per frame only while `playing` and the tab is visible; never wall-clock), on this fixed timeline: lead-in **0–2000**; chapter 1 **2000–16000**; gap **16000–17200**; chapter 2 **17200–29600**; gap **29600–30800**; chapter 3 **30800–44800**; post-video gap **44800–46000**. At each chapter end the clock auto-advances through the **1200 ms** gap (chapter art fades out 200 ms, holds, next chapter fades in 200 ms; chapter dot fills). After chapter 3's gap the player shall enter `activity` round 1 at **46000** and speak its prompt (FR-007) — no tap needed. |
| FR-003 | Each chapter shall play its lines at the exact section 8 offsets: one voice clip per line (volume 0.7, one-shot) with its scripted highlight moving at the line's start (highlight appears in ≤100 ms). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a line, chapter, or transition. |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`. Pause shall cancel the current line and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current line's start (the line with the greatest offset ≤ the frozen clock; before line 1, line 1) and re-speak that line, so no line is skipped or repeated. Inside a chapter gap or the post-video gap, Resume continues the frozen segment with its remaining no-voice time. Pause/Resume is throttled to one toggle per 300 ms; a double-tap toggles once. |
| FR-005 | A Replay target ≥64×64 CSS px shall restart the current chapter from its first line: cancel the voice, set `videoMs` to the chapter start (**2000 / 17200 / 30800**), and play line 1 immediately; later lines and the auto-advance keep their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay is throttled to one restart per 500 ms and does not change the save. |
| FR-006 | Chapter dots (3 dots, 12 px, 8 px gaps; current = accent fill over 100 ms, no motion) shall show the current chapter in `video`, bottom-center 24 px above the stage edge; they are not interactive and not focusable. |
| FR-007 | The activity shall run **5 fixed rounds** in section 8 order with no randomization. On each round entry the player shall show the round's picture cards (scene per section 8; cards pop 200 ms, staggered 60 ms) and the prompt pictogram `pict_prompt` (pop 200 ms), speak the round's prompt (volume 1.0, one-shot), and save `{phase:"activity", roundIndex, completed:false}`. |
| FR-008 | When a round's correct picture is tapped, the player shall show sparkle (≤6 particles) on the card and a bounce (400 ms), fill the round's progress dot, play `sfx_ding` (0.8, 300 ms throttle), and speak the round's confirmation line (1.0, one-shot); then, **600 ms** after the confirmation clip ends (or 1200 ms after the sparkle when speech is unavailable), start the next round (FR-007) or, after round 5, `celebrating` (FR-013). One correct tap is always enough; no score, streak, or bonus exists. |
| FR-009 | When a distractor picture is tapped, the player shall jiggle the tapped card 300 ms, play `sfx_soft_tap` (0.5), and speak that picture's teach line naming what the tapped picture shows (0.7, one-shot, throttled to one per 1200 ms — taps inside the throttle keep their visual feedback but play no voice); from the round's **second** wrong tap on, the correct card soft-pulses 400 ms. The prompt re-plays (1.0) 800 ms after the teach clip ends (or after the jiggle when no voice). The round stays open until its correct picture is tapped; wrong taps never advance, subtract, lock, or end anything. |
| FR-010 | In `activity`, picture taps are judged at most once per **500 ms**; taps inside the throttle produce no feedback and no sound. A double-tap on a correct picture yields exactly one judged tap, one sparkle, and one `sfx_ding`; a double-tap on a distractor yields one teach cycle. |
| FR-011 | Input semantics: tap/click only — no drag gestures exist in this entry; the first pointer down wins and additional simultaneous pointers are ignored until release. Hit rects take a **12 px** expansion on all sides; on overlap the card whose center is nearest wins, exact ties resolve to the lowest option index (section 8, left→right); a tap >12 px from every target is an empty tap (no state change; idle timer resets). Empty taps include the stage background and the space between cards. |
| FR-012 | When no input has occurred for **12 s**: on `title` the Play target hint-pulses and `vo_hint` plays after the first gesture (visual-only before it); in `video` paused the Play/Pause target pulses and `vo_hint` plays (while `playing`, no hint fires); in `activity` the current round's correct picture pulses and `vo_hint_part` plays; on `endcard` the Replay target pulses and `vo_hint` plays. Each hint lasts 3 s, repeats every 12 s of continued idleness, and is cancelled by any input, including an empty-space tap. |
| FR-013 | After round 5's correct tap the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot), and save `{phase:"activity", roundIndex:4, completed:true}`. After 2500 ms the `endcard` shows the end panel with Replay ≥96×96 CSS px and HOME ≥64×64; Replay starts `video` chapter 1 with the 2000 ms lead-in and saves `{phase:"video", roundIndex:0, completed:false}`. Nothing else auto-advances. |
| FR-014 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves, and returns to `title`. On `title` and `loading` no HOME control is rendered and a HOME input is a no-op (title is home). |
| FR-015 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; on completion it clears the save and in-memory progress and plays a ring flash plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-016 | The entry shall have no fail state: wrong taps, empty taps, rapid or repeated taps, multi-touch, and idle time never deduct, lock, end, or lose progress, and no score, star, streak, or comparison is ever shown. |
| FR-017 | Persistence per section 10: save when Play starts the video (phase `video`), on every activity round entry including a resume into a saved round (phase `activity`), on completion, on endcard Replay, and on HOME; `updatedAt` refreshes on every save. Play resumes at the saved phase and round (`phase:"activity"` with `completed:false` → that `roundIndex`; `phase:"video"` → video chapter 1); when `completed` is true, Play starts at the video (chapter 1). |
| FR-018 | Audio: no audio before the first gesture; one voice clip at a time — any new voice clip (video line, prompt, confirmation, teach, hint, praise) cancels the previous utterance; sfx may overlap each other; optional `music_title` loops at 0.15 on `title` and `endcard` only and stops at Play; while a 0.7-volume voice plays, the music bus ducks 0.5→0.4 within 120 ms and restores over 200 ms. |
| FR-019 | Degradation: no speech synthesis → the video clock, highlights, transitions, and printed sentences run unchanged with no voice; each activity round enters visual-only mode: from round entry +**3000 ms** the correct picture soft-pulses in a 1200 ms cycle and a tap on it advances with sparkle, bounce, and `sfx_ding` only (teach lines become voice-less jiggles; the prompt pictogram still pops); a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. Missing visual asset → draw a stub shape, log a warning, keep playing. |
| FR-020 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the current line and enter `video` paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return the open round's prompt re-plays once (1.0). Idle time counts visible time only; throttled timers may delay hints but never lose progress (A6). |
| FR-021 | Accessibility and text: every interactive element (logo, Play, Play/Pause, Replay, HOME, each picture card, end-card Replay) carries an invisible accessible name (section 7). Visible text is content only: the three printed sentences in the video ("The sun is up.", "The cat sleeps on the mat.", "A girl kicks the red ball."); the activity shows no text at all — its options are pictures. Every round is answerable from voice + pictogram alone. |
| FR-022 | Unknown events and inputs shall be ignored (no state change, no sound). Chapter order, round order, option order, and content are fixed; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial; prepare scenes, video art, audio; audio locked |
| `title` | decorative scene + framed picture + Play + reset logo | the player's home; audio unlocks on first gesture |
| `video(chapter, playback)` | animated page-spread stage + HOME, Play/Pause, Replay, 3 dots | chapter 1–3; playback ∈ {playing, paused} |
| `activity(roundIndex)` | round scene + prompt pictogram + 2 or 3 picture cards + 5 dots + HOME | roundIndex 0–4; engine state `video`/`activity` is what the save records |
| `celebrating` | frozen round 5 scene + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | save phase `activity` and `completed:false` | `activity(saved roundIndex)` | actions: unlock audio; stop `music_title`; open that round and speak its prompt; save that round entry (FR-007, FR-017) |
| `title` | `PLAY_PRESSED` | otherwise (no save, phase `video`, or `completed:true`) | `video(1, playing)` | actions: lead-in 2000 ms; stop `music_title`; save phase `video` |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `title` | `IDLE_12S` | visible, no input 12 s | `title` | actions: FR-012 hint (visual-only before the first gesture) |
| `video` | `PLAY_PAUSE` / Space | throttle clear | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / R | throttle clear | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter `video`, or `activity(0)` after chapter 3's gap | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line; freeze clock (FR-020) |
| `video` | `IDLE_12S` | paused, visible, no input 12 s | `video(same chapter)` | actions: FR-012 hint |
| `video` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `activity` | `CORRECT_TAP` | throttle clear | `activity(roundIndex+1)`; after round 5 → `celebrating` | actions: FR-008; save roundIndex; round 5 saves `completed` (FR-013) |
| `activity` | `WRONG_TAP` | throttle clear | `activity(same)` | actions: FR-009 |
| `activity` | `IDLE_12S` | visible, no input 12 s | `activity(same)` | actions: FR-012 hint |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | actions: cancel voice; pause idle timer (FR-020); on return re-play the open round's prompt once |
| `activity` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: show end panel |
| `celebrating` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel timer; save |
| `endcard` | `REPLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; save `{phase:"video", roundIndex:0, completed:false}` |
| `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: save |
| `endcard` | `IDLE_12S` | visible, no input 12 s | `endcard` | actions: FR-012 hint |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — logo (reset) → Play; `video` — HOME → Play/Pause → Replay; `activity` — HOME → picture cards in option-index order (left→right; 2 cards in rounds 1–2, 3 in rounds 3–5); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play | tap the Play target | Tab to Play + Enter/Space |
| Pause / resume | tap the Play/Pause target | Space, or Enter/Space on the focused target |
| Replay chapter | tap the Replay target | R, or Enter/Space on the focused target |
| Answer a round | tap one of the picture cards | Tab to the card + Enter/Space |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and end-card Replay ≥96×96 CSS px; HOME, Play/Pause, Replay, and the logo ≥64×64; activity picture cards well above the floor — 440×420 (`two`) and 288×336 (`three`) at ≥1024 px wide, ≥360×320 and ≥224×264 at 768–1023 px — all above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-011; ties resolve to the nearest card center, then the lowest option index; >12 px from every rect is an empty tap (nothing changes; the idle timer resets).
- **Multi-touch / gestures:** first pointer down wins; extra simultaneous pointers are ignored until release. No drag gestures exist, so no drag alternative is required. Picture taps (FR-010) and Play/Pause (300 ms) / Replay (500 ms) are throttled.
- **Instructions without reading:** every prompt is voice + `pict_prompt` (96×96 speech bubble with a picture frame; 80×80 at 768–1023 px); chrome is pictogram + invisible name. Visible text is limited to FR-021 content.
- **Accessible names:** invisible names on every interactive element, e.g. "Play", "Pause", "Resume", "Replay chapter 2", "Home", "Reset saved progress (hold 3 seconds)", "Picture: the moon is up", "Picture: the sun is up", "Picture: the cat sleeps on the mat", "Picture: the cat plays with yarn", "Picture: the girl kicks the red ball", "Picture: the girl holds the red ball", "Picture: the boy kicks a blue ball", "Picture: the dog digs in the dirt", "Picture: the dog sleeps in a basket", "Picture: the dog eats from a bowl", "Picture: the boat sails on the water", "Picture: the boat is on the sand", "Picture: a duck swims on the water", "Play again".
- **Resize:** viewport resize or rotation mid-video or mid-round reflows per section 8, preserving state, progress, and the frozen `videoMs`.

## 8. Levels and content data

**Video storyboard (designed; original programmatic animation; all copy is original).** Stage 1280×720; an open
picture book sits centered; line offsets are chapter-relative; each clip has a cap so it never crosses
the next line or the chapter end; absolute tick = chapter start + offset.

| Ch | Span (ms) | Dur | On-screen content and highlight | Voice lines (offset → key: copy, cap) | Art guidance |
|---|---|---|---|---|---|
| 1 | 2000–16000 | 14.0 s | two-page spread fades in 200 ms; the left page prints "The sun is up."; the highlight (4 px accent stroke) hugs the printed sentence from line 2 and the picture frame from line 3 | 0 → `vo_v1_1`: "This is a page from a picture book." (≤2.8 s); 4000 → `vo_v1_2`: "The words tell the story." (≤2.4 s); 8000 → `vo_v1_3`: "The picture shows what the words say." (≤4.4 s) | flat rounded book, cream pages, ink sentence 40 px, sun-over-hill picture (same art as `pic_sun`); no characters |
| 2 | 17200–29600 | 12.4 s | same spread; the left page prints "The cat sleeps on the mat."; the cat picture pops in on the right page at line 2 (200 ms) and soft-pulses ×2 at line 3 | 0 → `vo_v2_1`: "Now let's match the words and the picture." (≤3.2 s); 3800 → `vo_v2_2`: "The words say: 'The cat sleeps on the mat.'" (≤3.8 s); 8400 → `vo_v2_3`: "The picture shows a cat sleeping on a mat." (≤3.6 s) | left page sentence; right page `pic_cat_sleep` at 60% page width; highlight per line (spread → words → picture) |
| 3 | 30800–44800 | 14.0 s | left page prints "A girl kicks the red ball."; two picture cards (`pic_girl_kick`, `pic_cat_sleep`) fade in on the right page at line 2 with a 60 ms stagger; at 9000 the correct card sparkles (≤6) and gets the highlight (4 px accent stroke) while the cat card dims to 60% opacity; the highlight holds to chapter end | 0 → `vo_v3_1`: "Now you look. The words say: 'A girl kicks the red ball.'" (≤4.6 s); 5400 → `vo_v3_2`: "Which picture shows it?" (≤2.2 s); 9200 → `vo_v3_3`: "This one! Now you listen and find the picture." (≤4.2 s) | left page sentence; right page two 300×300 cards, correct on the left; no other marks |

**Activity scenes and picture options (designed).** Option indices are the hit-target and judgment keys, left→right in the table.

| Scene | Shows | Options (index order) | Art guidance |
|---|---|---|---|
| `two` | 2 picture cards in one row | round 1: 0 `pic_moon`, 1 `pic_sun`; round 2: 0 `pic_cat_sleep`, 1 `pic_cat_play` | cards 440×420 at ≥1024 px; 4 px ink border, 24 px radius, cream fill; ≥48 px gap; no labels, no text |
| `three` | 3 picture cards in one row | round 3: 0 `pic_girl_hold`, 1 `pic_girl_kick`, 2 `pic_boy_kick`; round 4: 0 `pic_dog_dig`, 1 `pic_dog_sleep`, 2 `pic_dog_eat`; round 5: 0 `pic_boat_sand`, 1 `pic_duck_swim`, 2 `pic_boat_sail` | cards 288×336 at ≥1024 px; same card chrome; ≥40 px gaps; no labels, no text |

**Rounds (designed, fixed order; prompts ≤3.6 s; the correct index has no position pattern).**

| # | Scene | Prompt (`vo_a_p{n}`, volume 1.0) | Correct (index) | Distractors | Illustration guidance |
|---|---|---|---|---|---|
| 1 | `two` | "Show me: 'The sun is up.'" | `pic_sun` (1) | `pic_moon` (0) | moon + 6 stars over a dark blue hill vs a round yellow sun with 8 rays over a green hill |
| 2 | `two` | "Show me: 'The cat sleeps on the mat.'" | `pic_cat_sleep` (0) | `pic_cat_play` (1) | orange cat curled asleep on a red mat, eyes closed vs the same cat sitting up batting a yellow yarn ball, eyes open |
| 3 | `three` | "Show me: 'The girl kicks the red ball.'" | `pic_girl_kick` (1) | `pic_girl_hold` (0), `pic_boy_kick` (2) | girl (round head, pigtail, green dress) with one leg extended, red ball at her foot, 3 motion arcs vs the same girl hugging the red ball, standing vs a boy (blue shirt) with one leg extended, blue ball at his foot |
| 4 | `three` | "Show me: 'The dog digs in the dirt.'" | `pic_dog_dig` (0) | `pic_dog_sleep` (1), `pic_dog_eat` (2) | brown dog, front paws in dirt, 5 dirt specks flying, tail up vs the same dog curled asleep in a wicker basket vs the same dog head-down at a red bowl |
| 5 | `three` | "Show me: 'The boat sails on the water.'" | `pic_boat_sail` (2) | `pic_boat_sand` (0), `pic_duck_swim` (1) | white sailboat with a red sail on blue water, 3 wave arcs vs the same boat resting on tan sand, no water vs a yellow duck on blue water, 3 wave arcs, no boat |

| Round | Confirmation (`vo_a_ok{n}`, 1.0, one-shot) | Cap |
|---|---|---|
| 1 | "Yes! The sun is up." | ≤2.2 s |
| 2 | "Yes! The cat sleeps on the mat." | ≤3.0 s |
| 3 | "Yes! The girl kicks the red ball." | ≤3.2 s |
| 4 | "Yes! The dog digs in the dirt." | ≤3.0 s |
| 5 | "Yes! The boat sails on the water." | ≤3.4 s |

| Picture | Teach line (`vo_teach_{picture}`, 0.7, one-shot) | Cap |
|---|---|---|
| `pic_moon` | "That picture shows the moon." | ≤2.6 s |
| `pic_cat_play` | "That picture shows a cat playing with yarn." | ≤3.0 s |
| `pic_girl_hold` | "That picture shows the girl holding the ball." | ≤3.2 s |
| `pic_boy_kick` | "That picture shows a boy kicking a blue ball." | ≤3.4 s |
| `pic_dog_sleep` | "That picture shows the dog sleeping." | ≤2.8 s |
| `pic_dog_eat` | "That picture shows the dog eating." | ≤2.6 s |
| `pic_boat_sand` | "That picture shows the boat on the sand." | ≤3.0 s |
| `pic_duck_swim` | "That picture shows a duck on the water." | ≤3.2 s |

Hint copy: `vo_hint` = "Tap the blinking button to keep going." and `vo_hint_part` = "Tap the picture you hear." (1.0, one-shot, ≤2.8 s). Praise `vo_praise` = "You matched every picture! You are a picture detective!" (1.0, ≤4.0 s).

- **Worked example (round 3, one wrong tap then correct):** round entry at 0 — `three` scene fades in 200 ms, cards pop 200 ms staggered 60 ms, `pict_prompt` pops 200 ms, `vo_a_p3` plays, save roundIndex 2. At 1800 `pic_girl_hold` is tapped: jiggle 300 ms, `sfx_soft_tap`; teach at 0.7 from ≈1800 to ≈5000; prompt re-plays at 5800. At 7000 `pic_girl_kick` is tapped: sparkle ≤6, bounce 400 ms, `sfx_ding` 0.8, confirmation starts and ends ≈10,200; round 4 entry at 10,800 (600 ms later), save roundIndex 3.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; round dots 5 × 12 px with 8 px gaps, top-center 8 px under the chrome; prompt pictogram 96×96 centered 24 px under the dots; `two` cards 440×420 with a 48 px gap; `three` cards 288×336 with 40 px gaps; video stage 1280×720 scaled to fit width, centered. At 768–1023 px — chrome 88 px; dots 12 px with 8 px gaps; pictogram 80×80; `two` cards ≥360×320 with a 32 px gap; `three` cards ≥224×264 with 28 px gaps. Height ≥700 px; below that scale the field by 0.85 keeping every card ≥80 px and every control ≥64 px.
- **Target rule:** each picture card is a static hit zone ≥96×96 px at ≥1024 px wide (≥80×80 at 768–1023 px) plus the 12 px expansion (FR-011); option-index order is the table's left→right order for tie-breaks and tab order; card rects never overlap by more than the 12 px expansion.
- **Progression rule:** fixed video 1→3, then fixed rounds 1→5; nothing locks, randomizes, or adapts; success is the only advance condition, and the video always plays before round 1 on a fresh or completed run.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video line starts | highlight moves in ≤100 ms; animation continues | `vo_v{chapter}_{line}` — 0.7 — one-shot |
| Chapter change | 200 ms fade out/in around the 1200 ms gap; chapter dot fill | none |
| Round entry | cards pop 200 ms (60 ms stagger); `pict_prompt` pops 200 ms | `vo_a_p{n}` — 1.0 — one-shot |
| Correct picture tap | sparkle ≤6 on the card; bounce 400 ms; round's dot fills | `sfx_ding` — 0.8 — one-shot (300 ms throttle); `vo_a_ok{n}` — 1.0 — one-shot |
| Wrong picture tap | tapped card jiggles 300 ms; from the 2nd wrong in the round the correct card soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach — 0.7 — one-shot (1200 ms throttle; duck) |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Round 5 correct | confetti ≤40 particles, 2500 ms; end panel at 2500 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3 s | `vo_hint` / `vo_hint_part` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play; correct card enters its 1200 ms soft-pulse cycle at round +3000 ms | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title`/`endcard` only |

**Effect definitions (no undefined effects):** *highlight* = 4 px dashed accent stroke around the named zone (sentence line, picture frame, or picture card), appears in ≤100 ms, holds until the next highlight change. *pop* = scale 0.92→1.04→1 over 200 ms. *bounce* = scale 1→1.06→0.98→1 over 400 ms, no translation. *soft pulse* = scale 1→1.04→1 over 400 ms (the FR-019 visual-only prompt repeats it every 1200 ms). *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3000 ms. *jiggle* = rotate −3°→+3°→0 over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = ≤6 four-point star particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *fade* = opacity 0→1 or 1→0 over 200 ms. *dim* = opacity 1→0.6 over 200 ms. *dot fill* = a 12 px dot switches from 30% ink to accent over 100 ms, no motion. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold; *ring flash* = ring opacity 1→0 over 300 ms. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fades in over 250 ms. *duck* = music bus 0.5→0.4 within 120 ms while a 0.7-volume voice plays, restore over 200 ms.

**Audio rules (v1):** no audio before the first gesture (FR-018); one voice at a time, each new voice cancels the previous utterance; sfx may overlap; `music_title` optional at 0.15 on `title`/`endcard` only. Degradation per FR-019; background-tab behavior per FR-020 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.bookBasics.illustrations.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** Play when it starts the video (phase `video`, roundIndex 0); every activity round entry, including a resume into a saved round (phase `activity`, that roundIndex); completion (FR-013, `completed:true`); endcard Replay (phase `video`, roundIndex 0, `completed:false`); and HOME; `updatedAt` refreshes on every save.
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round directly (video is not replayed); `phase:"video"` opens chapter 1. When `completed` is true, Play starts at the video (chapter 1), per FR-017.
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-015).
- **Deliberately not stored:** `videoMs` and clock position, chapter position, wrong-tap counts, tap history, judgments, language or audio settings, sparkle/confetti counts, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-020. Storage blocked → run unsaved (FR-019).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy media or characters appear. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `scene_title` | image | framed sun-over-hill picture beside an open picture book | 1280×720 SVG | static | SVG shapes |
| `ill_page_ch1..3` | image | the three chapter page spreads per section 8 (printed sentences + pictures) | 1280×720 SVG each | static per chapter; highlight overlay | SVG shapes + text |
| `pic_{sun,moon,cat_sleep,cat_play,girl_kick,girl_hold,boy_kick,dog_dig,dog_sleep,dog_eat,boat_sail,boat_sand,duck_swim}` | image | 13 original picture cards per section 8 illustration guidance | ≥520×500 SVG each | static; pop, jiggle, bounce, pulses on events | SVG shapes |
| `pict_home` / `pict_play` / `pict_pause` / `pict_replay` | image | house; triangle; bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_prompt` | image | speech bubble with a small picture frame inside | 96×96 SVG (80×80 at 768–1023 px) | static; pop on round entry | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech is missing | SVG path |
| `ring` | image | 4 px accent progress ring for the reset hold | 96×96 SVG | during hold | SVG shape |
| `sparkle` / `confetti` | rendered | four-point star particle; rect particle | runtime | one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` | audio | UI click 0.08 s; muted tap 0.10 s | ogg/mp3 | one-shot | WebAudio blips |
| `sfx_ding` / `sfx_chime` | audio | bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot (ding 300 ms throttle) | WebAudio tones/arpeggio |
| `vo_v{1-3}_{1-3}` | audio | 9 chapter lines with caps, section 8 | ≤4.6 s each | one-shot | TTS allowed |
| `vo_a_p{1-5}` / `vo_a_ok{1-5}` | audio | 5 prompts and 5 confirmations, section 8 | ≤3.6 s each | one-shot | TTS allowed |
| `vo_teach_{8 picture keys}` | audio | 8 teach lines, section 8 | ≤3.4 s each | one-shot (1200 ms throttle) | TTS allowed |
| `vo_hint` / `vo_hint_part` / `vo_praise` | audio | copy in section 8 | ≤2.8 s / ≤2.8 s / ≤4.0 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title`/`endcard` only | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, gold `#F2B33D`, leaf `#7FB069`, sky `#BFE3F0`, water `#4A7FB5`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); the printed video sentences are 40 px (32 px at 768–1023); no other visible words.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → the clip is skipped, its timings are unchanged, and the FR-019 no-voice fallback applies where relevant (R-005).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: int 1-3`; `startMs/endMs: int`; `artKey: string`; `lines: Line[]` |
| `Line` | `offsetMs: int`; `voiceKey: string`; `copy: string`; `highlight: enum {spread, words, picture, correct} \| null` |
| `Round` | `index: int 0-4`; `scene: enum {two, three}`; `promptKey/promptCopy: string`; `promptPict: string`; `options: PicId[2-3]` (index order, left→right); `correct: PicId`; `confirmKey: string` |
| `PicId` | `enum {pic_sun, pic_moon, pic_cat_sleep, pic_cat_play, pic_girl_kick, pic_girl_hold, pic_boy_kick, pic_dog_dig, pic_dog_sleep, pic_dog_eat, pic_boat_sail, pic_boat_sand, pic_duck_swim}` |
| `Save` (persisted) | `phase: enum {video, activity}`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `wrongInRound: int`; `judgeLock: bool`; `roundDots: bool[5]`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Line`, `Round`, and `PicId` records are static; the timeline is computed from `startMs`/`offsetMs` and never from wall-clock time. Round judgment reads only `Round.correct` and `Round.options`; adding a round = one `Round` record plus its prompt, confirmation, and teach clips, no new code. The spec builds the five rounds in section 8.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, printed sentence content, per-card hit rects, and a highlight overlay on the video stage.
- **R-002** The player shall animate the section 9 effects: highlight, pop, bounce, soft/hint pulses, jiggle, depress, fade, dim, dot fill, sparkle, confetti, ring fill/flash, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test per FR-011; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all interactive elements, Space = Play/Pause, R = Replay, Escape = HOME.
- **R-005** The player shall play one voice clip at a time with sfx overlap and the FR-018 ducking rule; a failed clip is skipped without blocking the timeline.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis or provided clips for all lines, prompts, teach lines, hints, and praise, with the FR-019 no-speech fallback.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-019), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during video animation, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing phase, round, `videoMs`, playback, or progress.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-021).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss, no timeline desync (FR-020), and hints may fire late.
- **R-013** Each chapter shall be renderable at runtime from `Chapter` data; a pre-rendered file is acceptable only if it matches the same section 8 timings.
- **R-014** The player shall request no camera, microphone, or network access at runtime.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥96 px) and the logo (≥64 px), and no audio has played |
| AC-02 | `title` with no save or `completed:true` | Play is pressed | a 2000 ms lead-in runs, chapter 1 line 1 plays at 2000 ms as the only voice, and the save records phase `video` |
| AC-03 | the video playing | the clock runs with no input | chapter 1's highlight moves to the printed words at 6000 and to the picture at 10000; chapters change at 16000/17200/29600/30800/44800 ms with the chapter dot filling, and the round 1 prompt plays at 46000 ms |
| AC-04 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops and animation freezes; Play replays that line from its start and no line is skipped |
| AC-05 | chapter 3 playing | Replay is pressed | chapter 3 restarts at 30800 ms with its first line |
| AC-06 | round 1 (`two`) | the sun picture is tapped | a sparkle, a bounce, and `sfx_ding` play, "Yes! The sun is up." is spoken, round 1's dot fills, and round 2 starts 600 ms after the clip ends with roundIndex 1 saved |
| AC-07 | rounds 1–5 answered correctly | round 5 is answered | confetti, `sfx_chime`, and "You matched every picture! You are a picture detective!" play; after 2500 ms the end card shows Replay (≥96 px) and HOME |
| AC-08 | round 1 (`two`) | the moon picture is tapped | the moon card jiggles, `sfx_soft_tap` plays, "That picture shows the moon." is spoken, and the prompt re-plays 800 ms after the teach clip; the round stays open, no advance happens, and no score, star, or streak appears |
| AC-09 | round 2 with one wrong tap already recorded and the first teach cycle finished | `pic_cat_play` is tapped again | the correct card (`pic_cat_sleep`) soft-pulses 400 ms, the cat-playing-with-yarn teach line plays, and the prompt re-plays 800 ms after the teach clip |
| AC-10 | round 2 (`two`) | the correct card is double-tapped within 500 ms | exactly one judged correct tap, one sparkle, one `sfx_ding`, and one round advance occur |
| AC-11 | round 3 (`three`) | a first finger holds one card and a second finger taps another before release | only the first card reacts; the other shows no feedback of any kind |
| AC-12 | any round | empty space >12 px from every card is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-13 | a round open, 12 s without input | idleness continues | the correct card hint-pulses for 3 s and `vo_hint_part` plays; any tap resets the timer and the hint repeats 12 s later |
| AC-14 | `title`, `video` paused, or `endcard`, 12 s without input | idleness continues | Play, Play/Pause, or Replay respectively hint-pulses for 3 s and `vo_hint` plays after the first gesture (visual-only before it) |
| AC-15 | a save `{phase:"activity", roundIndex:2}` | the page reloads and Play is pressed | round 3's `three` scene and prompt appear directly; the video is not replayed |
| AC-16 | a save with `completed:true` | the page reloads and Play is pressed | chapter 1 of the video starts |
| AC-17 | round 2 open | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload round 2's prompt plays |
| AC-18 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-19 | the end card showing | Replay is pressed | chapter 1 of the video starts with its 2000 ms lead-in, and the save records `{phase:"video", roundIndex:0, completed:false}` |
| AC-20 | speech synthesis unavailable | Play is pressed and a round is played | no voice plays; the video highlights still move at their times; from 3000 ms into the round the correct picture soft-pulses in a 1200 ms cycle and a tap on it advances with sparkle, bounce, and `sfx_ding`; the muted-speaker pictogram shows 5 s |
| AC-21 | storage blocked | the entry is played and HOME is pressed | all behavior works in memory; after reload Play starts the video |
| AC-22 | the video playing or a round open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen (or the open round's prompt re-plays once) and no progress is lost |
| AC-23 | any state | Tab is pressed repeatedly | focus follows the section 6 tab order, each focused control exposes its accessible name, Enter/Space activates each control, and Escape returns HOME |
| AC-24 | a round open at 1024×768 | the viewport is resized to 800×1000 | phase, round, `videoMs`, and progress are unchanged and every card remains ≥80 px and every control ≥64 px |
| AC-25 | `video` playing | Play/Pause is double-tapped within 300 ms | exactly one toggle occurs: the voice stops and the clock freezes once; the second tap is ignored with no sound |
| AC-26 | `video` playing mid-chapter | Replay is double-tapped within 500 ms | the chapter restarts exactly once from its first line; the second tap is ignored with no sound, and no line is skipped |
| AC-27 | any state | an unmapped key is pressed | nothing changes on screen or in audio |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 44.8 s video plays its three chapters at the section 8 timings with printed sentences, highlights, gaps, dots, Pause/Resume, and Replay.
3. The five rounds run in order on the `two` and `three` scenes (2 then 3 options); correct taps advance, wrong taps teach and re-ask, and no score appears.
4. Phase and round survive a reload; Play resumes at the saved round (or the video when completed); the reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video topic, page sentences, picture set, and rounds are designed inferences from the title; official sources publish no per-video description | designed (O3, D1–D3) |
| A2 | All scenes, picture cards, voices, music, and copy are original; no Khan Academy media or characters appear | designed (IP rule) |
| A3 | A runtime-rendered animated video is an acceptable realization; a pre-rendered file must match the section 8 timeline | designed (R-013) |
| A4 | TTS-generated clips or runtime TTS are acceptable | designed |
| A5 | Clip caps and line offsets approximate child-paced narration | designed (section 8) |
| A6 | Background-tab timers may be throttled and speech may be suspended | known platform behavior; handled by FR-020 |
| A7 | A 12 px tap tolerance, ≥96 px cards, and a 500 ms activity tap throttle suit ages 4–5 | designed (section 7) |
| A8 | The no-speech fallback turns each round into "tap the glowing picture" because a spoken sentence cannot be replaced visually for a pre-reader | designed (FR-019); keeps play possible without voice |
| A9 | Age band Preschool–K (4–5) is a targeting choice inside the app's official 2–8 range | designed |
| A10 | No unlocks, adaptive difficulty, persisted clock position, or round skip | designed (FR-022, section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** chapter script, timings, and highlights; round order, scenes, sentences, picture options, correct answers, and teach copy; hit tolerance and throttles; chrome set and keyboard map; target minimums; save key and shape; no fail state; asset provenance; acceptance criteria.
- **Free:** exact composition of the book, cards, and stage within the guidance, easing curves, sparkle/confetti particle look, voice timbre/TTS engine, optional title music, decorative title-scene details.
- **Not in this spec:** library or Videos-tab browsing, the other eight Book Basics entries, profiles, navigation shell, parental controls, localization, analytics, scoring, streaks, or teacher tooling.
