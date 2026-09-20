# How to Read a Book (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-how-to-read-a-book.md`](../book-basics-how-to-read-a-book.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); series wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233
- **Spec status:** v1 — Book Basics spec; matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-019); no network after load
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: three video chapters replace levels, the five sequence rounds replace a level set, the endcard replaces a win condition; no scoring, no fail state.

## 2. Overview and learning objective

A child presses Play and watches a 43.6 s original animated video in three chapters about how to read a
book — open it, look at the words, turn the page, close it when the story is done — then answers five
sequence rounds that follow one reading of the example book: "What do you do first?" through "What do
you do last?" Each round offers 2 or 3 original action pictures, and the child taps the one that comes
next. The skill is **book handling and the reading routine** (open → look → turn → close) — the concept
implied by the title. Age band: **2–8 across the library**; this entry targets **Preschool–K (4–5
pre-reader)**. Expected session: **1.5–2.5 minutes** (43.6 s video + 5 rounds + celebration).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "How to Read a Book" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; `khan-academy-kids-games.md` lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish the video titles only — no per-video descriptions; the focus implied by the title is an inference, not an official description | official (about the source's limits) | Catalogued entry Notes |
| O4 | The app is officially for children ages 2–8 (Preschool–2nd Grade) | official | `khan-academy-kids-games.md` lines 96, 160–177 |
| O5 | The entry is a video in the Library's Videos section, and no Book Basics title art, audio, or content appears in any surveyed source | official | Catalogued entry lines 3–4 and Notes |
| D1 | The video focus — four reading steps (open the book, look at the words, turn the page, close it when the story is done) — and the three-chapter storyboard and script | designed | Inference from the title (O3); the entry file's catalogue subject line ("book handling") is repo metadata, not an official description |
| D2 | The interaction: five sequence rounds over the four steps, 2–3 action pictures each | designed | Shared brief's per-entry concept for this slug |
| D3 | The example picture book "The Red Ball" and its two wordless spreads; word-bars stand in for its story words | designed | Original content required; no Khan Academy media or characters |
| D4 | Player chrome (Play/Pause, chapter Replay, HOME, reset logo, chapter dots), progress save/resume, idle hints, audio rules, no fail state | designed | Template v1 and the Book Basics shared brief |
| D5 | All art, video, voice, music, copy, and layout; Preschool–K (4–5) targeting inside the official 2–8 band | designed | IP rule: all assets original (section 11); age band per section 2 |

## 4. Player experience / core loop

A child presses the big Play on a title scene. After a 2 s lead-in a closed book fades in — "This is a
book. You can read it." — the cover swings open and the voice says what to do first: "First, open the
book." The first page appears, its words light up — "Now look at the words." — a page turns — and when
the story is done the cover swings shut: "When the story is done, close the book." A recap names the
steps in order: "Open, look, turn, close." Round 1 begins: "What do you do first?" Two action pictures
appear; the child taps the book being opened — sparkle, a ding, "Yes! First, you open the book." Round 2
follows, then 3, 4, and 5, each asking what comes next in one continuous reading. A wrong tap gets a
gentle jiggle and "That's turning the page.", then the question again. After round 5 confetti falls, the
voice praises "You know how to read a book!", and an end card offers Replay and HOME. HOME returns to
the title; Play later resumes at the saved phase and round.

**Core loop:** Play → watch 3 teaching chapters (pause/replay a chapter) → answer 5 sequence rounds by
tapping the action picture that comes next → hear each tap affirmed or taught → celebrate → replay or go
home.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (prepare scenes, film art, and audio per section 11), then `title`: a decorative tabletop scene with the closed example book, a Play target ≥96×96 CSS px, and an inconspicuous reset logo ≥64×64 CSS px top-right (FR-015). No audio shall play before the first user gesture (FR-018). When Play is pressed, it shall unlock audio and then start fresh or resume: with no save, a `completed:true` save, or a saved `phase:"video"` (FR-017) it shall stop `music_title`, run a **2000 ms lead-in**, start `video` chapter 1 at `videoMs = 2000` (FR-002), and save `{phase:"video", roundIndex:0, completed:false}`; with a saved `phase:"activity"`, `completed:false` it shall open that `roundIndex` directly (no video, no lead-in). |
| FR-002 | The video shall run one accumulated playing-time clock (`videoMs`, advanced per frame only while `playing` and the tab is visible; never wall-clock), on this fixed timeline: lead-in **0–2000**; chapter 1 **2000–16000**; gap **16000–17200**; chapter 2 **17200–29200**; gap **29200–30400**; chapter 3 **30400–42400**; post-video gap **42400–43600**. At each chapter end the clock auto-advances through the **1200 ms** gap (chapter art fades out 200 ms, holds, next chapter fades in 200 ms; chapter dot fills). After chapter 3's gap the player shall enter `activity` round 1 at **43600** and speak its prompt `vo_p1` (FR-007) — no tap needed. |
| FR-003 | Each chapter shall play its lines at the exact section 8 offsets: one voice clip per line (volume 1.0, one-shot) with its scripted highlight, cover swing, page turn, or sfx firing at the line's start (highlight appears in ≤100 ms). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a line, chapter, or transition. |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`. Pause shall cancel the current line and sfx and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current line's start (the line with the greatest absolute start — chapter start + its section 8 offset — ≤ the frozen `videoMs`; before line 1, line 1) and re-speak and re-fire that line, so no line is skipped or repeated. Inside a chapter gap or the post-video gap, Resume continues the frozen segment with its remaining time and no voice. Pause/Resume is throttled to one toggle per 300 ms; a double-tap toggles once. |
| FR-005 | A Replay target ≥64×64 CSS px shall restart the current chapter from its first line: cancel the voice, set `videoMs` to the chapter start (**2000 / 17200 / 30400**), and play line 1 with its sfx and highlight immediately; later lines keep their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay is throttled to one restart per 500 ms and does not change the save. |
| FR-006 | Chapter dots (3 dots, 12 px, 8 px gaps, top-center; current = accent fill over 100 ms, no motion) shall show the current chapter in `video`; they are not interactive and not focusable. |
| FR-007 | The activity shall run **5 fixed rounds** in section 8 order with no randomization. On each round entry the player shall show the round's cards with the *card in* animation, pop the round's prompt pictogram (200 ms), speak the round's prompt (volume 1.0, one-shot), and save `{phase:"activity", roundIndex, completed:false}`. The cards are tappable immediately; the prompt never gates input. Correct-card position per round is fixed by section 8. |
| FR-008 | When the round's correct card is tapped, the player shall show sparkle (≤6 particles) on the card, play `sfx_ding` (0.8, 300 ms throttle), and speak the round's confirmation line (1.0, one-shot); then, **600 ms** after the confirmation clip ends (or 1200 ms after the sparkle when speech is unavailable), start the next round (FR-007) or, after round 5, `celebrating` (FR-013). One correct tap is always enough; no score, streak, or bonus exists. From the correct judgment until the next round begins (or `celebrating` starts), all card taps are ignored with no feedback and no sound (the success lock). |
| FR-009 | When a distractor card is tapped, the player shall jiggle the tapped card 300 ms, play `sfx_soft_tap` (0.5), and speak that action's teach line naming the tapped action (0.7, one-shot, throttled to one per 1200 ms — taps inside the throttle keep their visual feedback but play no voice); from the round's **second** wrong tap on, the correct card soft-pulses 400 ms. The round's prompt re-plays (1.0) 800 ms after the teach clip ends (or after the jiggle when no voice); a scheduled re-play is cancelled if the correct card is tapped first. The round stays open until its correct card is tapped; wrong taps never advance, subtract, lock, or end anything. |
| FR-010 | In `activity`, card taps are judged at most once per **500 ms**; taps inside the throttle produce no feedback and no sound. A double-tap on the correct card yields exactly one judged tap, one sparkle, and one `sfx_ding`; a double-tap on a distractor yields one teach cycle. The success lock (FR-008) takes precedence: after a correct tap, no further card tap is judged until the next round begins or `celebrating` starts. |
| FR-011 | Input semantics: tap/click only — no drag gestures exist in this entry; the first pointer down wins and additional simultaneous pointers are ignored until release. Hit rects take a **12 px** expansion on all sides; on overlap the card whose center is nearest wins, exact ties resolve to the lowest card index (section 8); a tap >12 px from every card is an empty tap (no state change; idle timer resets). Empty taps include the stage background, the prompt pictogram, and the chrome besides its controls. |
| FR-012 | When no input has occurred for **12 s**: on `title` the Play target hint-pulses and `vo_hint` plays (visual-only before the first gesture); in `video` paused, the Play/Pause target pulses and `vo_hint` plays (while the video is playing no hint fires — the moving video is its own cue); in `activity` the current round's correct card pulses and `vo_hint_round` plays; on `endcard` the Replay target pulses and `vo_hint` plays. Each hint lasts 3 s, repeats every 12 s of continued idleness, and is cancelled by any input, including an empty-space tap. |
| FR-013 | After round 5's correct tap the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot), and save `{phase:"activity", roundIndex:4, completed:true}`. After 2500 ms the `endcard` shows the end panel with Replay ≥96×96 CSS px and HOME ≥64×64; nothing auto-advances further. |
| FR-014 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves, and returns to `title`. On `title` and `loading` no HOME control is rendered and a HOME input is a no-op (title is home). |
| FR-015 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; on completion it clears the save and in-memory progress and plays a ring flash plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-016 | The entry shall have no fail state: wrong taps, empty taps, rapid or repeated taps, multi-touch, and idle time never deduct, lock, end, or lose progress, and no score, star, streak, or comparison is ever shown. |
| FR-017 | Persistence per section 10: save when Play starts the video (phase `video`, `roundIndex:0`, `completed:false`), every activity round entry, completion, and HOME; `updatedAt` refreshes on every save. Play resumes at the saved phase and round (`phase:"activity"` → that `roundIndex`; `phase:"video"` → video chapter 1); when `completed` is true, Play starts at the video (chapter 1). |
| FR-018 | Audio: no audio before the first gesture; one voice clip at a time — any new voice clip (video line, prompt, confirmation, teach, hint, praise) cancels the previous utterance; sfx may overlap each other; optional `music_title` loops at 0.15 on `title` only and stops at Play; while a teach voice plays, the music bus ducks 0.5→0.4 within 120 ms and restores over 200 ms. |
| FR-019 | Degradation: no speech synthesis → the video clock, highlights, sfx, and transitions run unchanged with no voice; each round's prompt is carried by its 96×96 position pictogram (numeral 1 / right arrow / end flag) and its correct card soft-pulses 400 ms every 3000 ms while the round is unanswered; a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. Missing visual asset → draw a stub shape, log a warning, keep playing. |
| FR-020 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the current line and sfx and enter `video` paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return the open round's prompt re-plays once (1.0). Idle time counts visible time only; throttled timers may delay hints but never lose progress (A6). |
| FR-021 | Accessibility and text: every interactive element (reset logo, Play, Play/Pause, Replay, HOME, each action card, end-card Replay) carries an invisible accessible name (section 7). Visible text is content only: the only rendered glyph is the numeral "1" in the round-1 prompt pictogram; the book's own words are unreadable word-bars (section 8), so no reading is required anywhere. Every round is answerable from voice + pictogram alone, and from pictogram + correct-card pulse alone when speech is unavailable (FR-019). Focus indicator: 4 px outline, ≥3:1 contrast. |
| FR-022 | Unknown events and inputs shall be ignored (no state change, no sound). Chapter order, round order, card sets, and content are fixed; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank warm-paper scene | initial state; prepare film art and audio; audio locked |
| `title` | decorative tabletop scene + closed-book art + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `video(chapter, playback)` | animated book stage + HOME, Play/Pause, Replay, 3 dots | chapter 1–3; playback ∈ {playing, paused}; gaps between chapters |
| `activity(roundIndex)` | round scene + prompt pictogram + 2 or 3 action cards + HOME | roundIndex 0–4; fixed card sets (section 8) |
| `celebrating` | frozen round 5 scene + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | no save, `completed:true`, or saved `phase:"video"` | `video(1, playing)` | actions: lead-in 2000 ms; stop `music_title`; save `{phase:"video", roundIndex:0, completed:false}` |
| `title` | `PLAY_PRESSED` | saved `phase:"activity"`, `completed:false` | `activity(roundIndex)` | action: open the saved round directly (no lead-in, no video; FR-007 round-entry save) |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` / Space | throttle clear | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / R | throttle clear | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter `video`, or `activity(0)` after chapter 3's gap | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line + sfx; freeze clock (FR-020) |
| `activity` | `CORRECT_TAP` | throttle clear, not success-locked (FR-008) | `activity(roundIndex+1)`; after round 5 → `celebrating` | actions: FR-008; save roundIndex; round 5 saves `completed` (FR-013) |
| `activity` | `WRONG_TAP` | throttle clear, not success-locked (FR-008) | `activity(same)` | actions: FR-009 |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | actions: FR-020 |
| `video` / `activity` / `celebrating` / `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: save already done at FR-013 entry |
| `endcard` | `REPLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; `completed` clears on the next save (FR-017) |
| `title` / `video` (paused) / `activity` / `endcard` | `IDLE_12S` | 12 s no input, tab visible | same state | actions: FR-012 hint; no hint while `video` plays |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — reset logo → Play; `video` — HOME → Play/Pause → Replay; `activity` —
HOME → cards in index order (2 or 3 cards, lowest index first, section 8 order); `celebrating` — HOME
only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play from title | tap the Play target | Tab to Play + Enter/Space |
| Play / pause video | tap the Play/Pause target | Space (no control focused) or Enter/Space on the focused target |
| Replay chapter | tap the Replay target | R, or Enter/Space on the focused target |
| Answer a round | tap one of the 2–3 action cards | Tab to the card + Enter/Space |
| Replay from the endcard | tap Replay on the endcard | Enter/Space on focused Replay |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and end-card Replay ≥96×96 CSS px; HOME, Play/Pause, Replay, and the reset logo
  ≥64×64; action cards ≥96×96 at ≥1024 px wide and ≥80×80 at 768–1023 px (cards themselves are larger,
  section 8) — all above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-011; ties resolve to the nearest card center, then the
  lowest index; >12 px from every card is an empty tap (nothing changes; the idle timer resets).
- **Multi-touch / gestures:** first pointer down wins; extra simultaneous pointers are ignored until
  release. No drag gesture exists, so no drag alternative is required. Card taps (FR-010) and
  Play/Pause (300 ms) and Replay (500 ms) are throttled.
- **Instructions without reading:** every prompt is voice + a 96×96 pictogram (`pict_first` = numeral 1,
  `pict_next` = right arrow, `pict_last` = end flag); the action cards themselves carry the choices;
  chrome is pictogram + invisible name. Visible text is limited to the numeral 1 in `pict_first`
  (FR-021).
- **Accessible names:** invisible names on every interactive element, e.g. "Play", "Reset saved progress
  (hold 3 seconds)", "Home", "Pause", "Resume", "Replay chapter 2", "Open the book", "Look at the
  words", "Turn the page", "Close the book", "Play again".
- **Resize:** viewport resize or rotation mid-video or mid-round reflows per section 8, preserving state,
  progress, and the frozen `videoMs`.

## 8. Levels and content data

**Designed sequence (the four steps).** The video teaches four steps in fixed order — 1 `act_open`: open
the book; 2 `act_look`: look at the words on the page; 3 `act_turn`: turn the page; 4 `act_close`: close
the book when the story is done. The five rounds walk one continuous reading of the example book and
ask the steps in order: R1 first (open), R2 next (look), R3 next (turn), R4 after the turn (look again —
the same step repeats on every page), R5 last (close). The "look" step is asked twice because it repeats
on every page; the four steps themselves are fixed.

**Video chapters (designed; video clock: lead-in 0–2000, chapter offsets are chapter-relative; absolute
tick = chapter start + offset; wall clock = Play + video clock).** Chapter 1 (open the book) 2000–16000,
chapter 2 (look at the words; turn the page) 17200–29200, chapter 3 (close; the four steps) 30400–42400,
with 1200 ms gaps at 16000–17200 and 29200–30400 and the post-video gap 42400–43600, after which round 1
enters and its prompt plays at 43600.

| Ch | Span (ms) | Dur | On-screen content and highlight | Voice lines (offset → key: copy, cap) | Art guidance |
|---|---|---|---|---|---|
| 1 | 2000–16000 | 14.0 s | closed book centered (200 ms fade-in); the front cover swings open 500 ms at line 2's start with `sfx_soft_tap` (0.5); at line 3 the opened first page fades in over 400 ms and a 4 px accent outline hugs its word-bars | 0 → `vo_v1_1`: "This is a book. You can read it." (≤2.8 s); 4600 → `vo_v1_2`: "First, open the book." (≤2.2 s); 9800 → `vo_v1_3`: "Open the cover and start at the first page." (≤3.4 s) | flat rounded book, cream paper, teal cover, soft shadow; no characters; the cover carries no visible words |
| 2 | 17200–29200 | 12.0 s | open book, page 1 toward viewer; 4 px accent outline hugs the word-bars from line 1; a finger glyph points at the first word-bar at line 2; at line 3 the page turns 400 ms with `sfx_soft_tap` (0.5), revealing page 2, and the outline moves to the page edge | 0 → `vo_v2_1`: "Now look at the words." (≤2.0 s); 3600 → `vo_v2_2`: "The words are on the page, next to the picture." (≤3.0 s); 7600 → `vo_v2_3`: "When you finish the page, turn one page." (≤3.0 s) | page 1: red ball on grass + two 60×12 px word-bars; page 2: the ball under a tree + two word-bars; bars are unreadable stand-ins, never text |
| 3 | 30400–42400 | 12.0 s | page 2 holds; outline hugs its word-bars at line 1; at line 2 the cover swings shut 500 ms with `sfx_soft_tap` (0.5) and the book bounces 450 ms, outline hugging the closed cover; at line 3 four 48×48 step badges light left→right, 200 ms apart, with `sfx_chime` (0.8) | 0 → `vo_v3_1`: "Turn the page and look at the new words." (≤3.0 s); 4000 → `vo_v3_2`: "When the story is done, close the book." (≤2.8 s); 8200 → `vo_v3_3`: "Open, look, turn, close. You can read a book!" (≤3.4 s) | the badges are the four action cards reduced to 48×48 pictograms; closed book matches chapter 1's art |

**Activity rounds (designed, fixed order; cards listed in index order for tie-breaks and tab order).**

| # | Prompt (`vo_p{n}`, 1.0, ≤3.5 s) | Cards (index order 0→n) | Correct | Distractors | Pictogram | Layout |
|---|---|---|---|---|---|---|
| 1 | "What do you do first?" | 0 `act_open`, 1 `act_turn` | `act_open` | `act_turn` | `pict_first` | 2 cards, 300×250, 48 px gap; correct left |
| 2 | "The book is open. What do you do next?" | 0 `act_close`, 1 `act_look`, 2 `act_turn` | `act_look` | `act_close`, `act_turn` | `pict_next` | 3 cards, 260×220, 40 px gaps; correct center |
| 3 | "You looked at all the words. What do you do next?" | 0 `act_open`, 1 `act_close`, 2 `act_turn` | `act_turn` | `act_open`, `act_close` | `pict_next` | 3 cards, 260×220; correct right |
| 4 | "You turned the page. Now what do you do?" | 0 `act_look`, 1 `act_close`, 2 `act_open` | `act_look` | `act_close`, `act_open` | `pict_next` | 3 cards, 260×220; correct left |
| 5 | "You read to the end of the story. What do you do last?" | 0 `act_look`, 1 `act_close` | `act_close` | `act_look` | `pict_last` | 2 cards, 300×250; correct right |

**Correct feedback copy (`vo_ok{n}`, 1.0, one-shot, ≤3.5 s):** 1 "Yes! First, you open the book." ·
2 "Yes! You look at the words." · 3 "Yes! You turn the page." · 4 "Yes! You look at the words on the
new page." · 5 "Yes! When the story is done, you close the book."

**Teach copy (`vo_teach_{open,look,turn,close}`, 0.7, one-shot, ≤2.2 s; FR-009 re-plays the round's
prompt 800 ms after a teach clip):** `act_open` "That's opening the book." (distractor in rounds 3, 4) ·
`act_look` "That's looking at the words." (round 5) · `act_turn` "That's turning the page." (rounds 1,
2) · `act_close` "That's closing the book." (rounds 2, 3, 4).

Hint copy: `vo_hint` "Tap the blinking button to keep going." and `vo_hint_round` "Tap the blinking
picture." (1.0, one-shot, ≤2.8 s). Final praise `vo_praise`: "You know how to read a book! Great
reading!" (1.0, one-shot, ≤3.6 s).

- **Worked example (round 3, one wrong tap then correct):** round entry at 0 — cards *card in* over
  300 ms, `pict_next` pops 200 ms, `vo_p3` plays (≈2.6 s), save `roundIndex: 2`. At 1500
  `act_close` (index 1) is tapped: jiggle 300 ms, `sfx_soft_tap` 0.5; `vo_teach_close` (0.7, ≈1.8 s)
  runs ≈1500–3300; `vo_p3` re-plays at 4100. At 6800 `act_turn` (index 2) is tapped: sparkle ≤6, `sfx_ding`
  0.8, `vo_ok3` (1.0, ≈2.4 s) runs ≈6800–9200; round 4 entry at 9800 (600 ms after the clip ends), save
  `roundIndex: 3`.
- **Worked layout (round 2, 1024 px stage):** chrome 96 px; `pict_next` 96×96 at (464, 120); cards
  260×220 centered at y = 461 px (60% of the 768 px stage) with 40 px gaps at x = 102, 402, 702; tapping 8 px outside `act_look`'s
  rect still judges it (12 px expansion); a tap in the 40 px gap is judged by the nearest card center (an exact tie at the midpoint goes to the lower card index, FR-011); a tap on the backdrop >12 px from every card changes nothing.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; stage 4:3 ≤1024×768 centered;
  prompt pictogram 96×96 centered 24 px under the chrome; 2-card rounds 300×250 with 48 px gaps;
  3-card rounds 260×220 with 40 px gaps; card row centered at 60% stage height; every card hit ≥96×96.
  At 768–1023 px — chrome 88 px; pictogram 80×80; 2-card rounds 240×200 with 32 px gaps; 3-card rounds
  210×180 with 32 px gaps; every card hit ≥80×80. Height ≥700 px; below that scale the field by 0.85
  keeping every card ≥80 px and every chrome control ≥64 px.
- **Progression rule:** fixed video 1→3, then fixed rounds 1→5; nothing locks, randomizes, or adapts;
  success is the only advance condition, and the video always plays before round 1 on a fresh or
  completed run. Wrong taps and idle never advance or reset a round.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video line starts | highlight, cover swing, page turn, or badge per section 8 | `vo_v{chapter}_{line}` — 1.0 — one-shot; section 8 sfx |
| Chapter change | 200 ms fade out/in around the 1200 ms gap; dot fill | none |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Correct card tap | sparkle ≤6 particles on the card | `sfx_ding` — 0.8 — one-shot (300 ms throttle); confirmation — 1.0 — one-shot |
| Wrong card tap | tapped card jiggles 300 ms; from the 2nd wrong in the round the correct card soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach — 0.7 — one-shot (1200 ms throttle; duck) |
| Round 5 correct | confetti ≤40 particles, 2500 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3 s | `vo_hint` / `vo_hint_round` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play; correct card soft-pulses 400 ms every 3000 ms | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only |

**Effect definitions (no undefined effects):** *highlight* = 4 px accent stroke around the named item
(cover edge, word-bars, page edge, closed cover), appears in ≤100 ms, holds until the next line. *pop*
= scale 1→1.05→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale
1→1.12→1 over 500 ms per cycle for 3 s. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* =
scale 1→0.95→1 over 80 ms. *bounce* = translate-y 0→−10→0→−5→0 px over 450 ms. *cover swing* = the
front cover rotates about the spine edge 0→−105° (open) or −105°→0° (close) over 500 ms, no overshoot.
*page turn* = the page rotates about its left edge 0→150° over 400 ms, revealing page 2; page 2 content
fades in over 100 ms at 300 ms. *card in* = the round's cards fade opacity 0→1 and translate-y 12→0 over
300 ms, staggered 80 ms left→right. *badge light* = one 48×48 step badge goes opacity 0.35→1 over
200 ms, no motion, one badge at a time. *sparkle* = 6 square particles ≤40 px flying ≤80 px outward over
600 ms, ≤6 per occurrence. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *fade* =
opacity 0→1 or 1→0 over 200 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s
hold; *ring flash* = ring opacity 1→0 over 300 ms. *end panel* = centered card ≤360×280 px, fill
`#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fades in over 250 ms. *chapter dot fill* = dot switches
to accent over 100 ms, no motion.

**Audio rules (v1):** no audio before the first gesture (FR-018); one voice at a time, each new voice
cancels the previous utterance; sfx may overlap; `music_title` optional at 0.15 on `title` only.
Degradation per FR-019; background-tab behavior per FR-020 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key
  `spec.bookBasics.howToReadABook.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** Play that starts the video (phase `video`, `roundIndex:0`, `completed:false`), every activity round entry (phase
  `activity`, that roundIndex), completion (FR-013, `completed:true`), and HOME; `updatedAt` refreshes
  on every save.
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round directly
  (video is not replayed); `phase:"video"` opens chapter 1. When `completed` is true, Play starts at the
  video (chapter 1), per FR-017.
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard
  equivalent: hold Enter/Space 3 s on the focused logo (FR-015).
- **Deliberately not stored:** `videoMs` and clock position, chapter position, wrong-tap counts, tap
  history, judgments, card order, language or audio settings, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended;
  handled by FR-020. Storage blocked → run unsaved (FR-019).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy media or
characters appear. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row
says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `scene_title` | image | decorative tabletop scene behind the closed-book art | 1280×720 SVG | static | SVG shapes |
| `ill_book_{closed,open_p1,open_p2}` | image | the example book in three states per section 8; page art = red ball on grass (p1), ball under a tree (p2), two 60×12 px unreadable word-bars each; no lettering anywhere | 720×560 SVG each | static; cover changes use cover swing, pages use page turn | SVG shapes |
| `film_ch1..3` | animated | the three chapters per section 8 (cover swing, page fade-in, highlights, page turn, close + bounce, recap badges) | runtime 1280×720 | one timeline at a time | runtime SVG animation (expected); a pre-rendered file is acceptable only if it matches the section 8 timeline |
| `act_open` / `act_look` / `act_turn` / `act_close` | image | the four action cards: hands raising an open cover; a pointing finger on the first word-bar of an open page; a hand lifting a page mid-turn; hands lowering the cover; same book palette as the film; no faces | 300×250 SVG (260×220 in 3-card rounds; 240×200 / 210×180 at 768–1023 px) | static; card in on round entry | SVG shapes |
| `pict_first` / `pict_next` / `pict_last` | image | numeral 1 in a rounded badge; right arrow; end flag | 96×96 SVG each (80×80 at 768–1023 px) | static; pop on round entry | SVG paths + the numeral 1 |
| `pict_home` / `pict_play` / `pict_pause` / `pict_replay` | image | house; triangle; bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech is missing | SVG path |
| `ring` | image | 4 px accent progress ring around the reset logo | logo-sized SVG | during hold | SVG shape |
| `sparkle` / `confetti` | rendered | 4-point star particle; rect particle | runtime | one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_ding` / `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips/arpeggio |
| `vo_v{1-3}_{1-3}` | audio | 9 chapter lines with caps, section 8 | ≤3.4 s each | one-shot | TTS allowed |
| `vo_p{1-5}` / `vo_ok{1-5}` | audio | 5 prompts and 5 confirmations, section 8 | ≤3.5 s each | one-shot | TTS allowed |
| `vo_teach_{open,look,turn,close}` | audio | 4 teach lines, section 8 | ≤2.2 s each | one-shot | TTS allowed |
| `vo_hint` / `vo_hint_round` / `vo_praise` | audio | copy in section 8 | ≤2.8 s / ≤2.8 s / ≤3.6 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, teal `#3E8E7E`, grass `#7FB069`,
  sun `#F2C94C`, bar `#C9BFAF`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`,
  fallback `system-ui`); the only rendered glyph is the numeral "1" in `pict_first` at 56 px (44 px at
  768–1023 px); the word-bars are shapes, not text.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio
  → skip that clip, timeline and behavior unchanged (R-007, FR-019).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: int 1-3`; `startMs/endMs: int`; `artKey: string`; `lines: Line[]` |
| `Line` | `offsetMs: int`; `voiceKey: string`; `copy: string`; `highlight: ItemId \| null`; `sfxKey: string \| null` |
| `Round` | `index: int 0-4`; `promptKey/promptCopy: string`; `promptPict: string`; `cards: Card[]` (index order 0–2); `correct: CardId`; `okKey: string` |
| `Card` | `cardId: CardId`; `correct: bool`; `zone: {x, y, w, h}` (stage-relative) |
| `CardId` | `enum {act_open, act_look, act_turn, act_close}` (index order 0–3) |
| `ItemId` | `enum {cover, words_p1, words_p2, page_edge, closed_cover}` (video highlight targets) |
| `Save` (persisted) | `phase: enum {video, activity}`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `wrongInRound: int`; `judgeLock: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Line`, `Round`, and `Card` records are static; the timeline is computed from
`startMs`/`offsetMs` and never from wall-clock time. Round judgment reads only `Round.correct` and its
`cards`; no randomization exists.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, the film's cover/page motion, per-card hit rects, and a highlight overlay on the video stage.
- **R-002** The player shall animate the section 9 effects: highlight, pop, soft/hint pulses, jiggle, depress, bounce, cover swing, page turn, card in, badge light, sparkle, confetti, fade, ring fill/flash, chapter dot fill, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test per FR-011; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all interactive elements, Space = Play/Pause, R = Replay, Escape = HOME.
- **R-005** The player shall play one voice clip at a time with sfx overlap and the FR-018 ducking rule; a failed clip is skipped without blocking the timeline.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis or provided clips for all lines, prompts, teach lines, hints, and praise, with the FR-019 no-speech fallback.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-019), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during video animation, page turns, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing phase, round, `videoMs`, playback, or progress.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-021).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss, no timeline desync (FR-020), and hints may fire late.
- **R-013** Each chapter shall be renderable at runtime from `Chapter` data; a pre-rendered file is acceptable only if it matches the same section 8 timings.
- **R-014** The player shall request no camera, microphone, or network access at runtime.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥96 px) and the logo (≥64 px), and no audio has played |
| AC-02 | `title` with no save or `completed:true` | Play is pressed | a 2000 ms lead-in runs, chapter 1 line 1 plays at 2000 ms, and the save records phase `video` |
| AC-03 | the video playing | the clock runs with no input | chapters change at 16000/17200/29200/30400/42400 ms, and the round 1 prompt plays at 43600 ms |
| AC-04 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops and animation freezes; Play replays that line from its start and no line is skipped |
| AC-05 | chapter 3 playing | Replay is pressed | chapter 3 restarts at 30400 ms with its first line |
| AC-06 | round 1 | `act_open` is tapped | a sparkle and `sfx_ding` play, "Yes! First, you open the book." is spoken, and round 2 starts 600 ms after the clip ends with roundIndex 1 saved |
| AC-07 | round 1 | `act_turn` is tapped | that card jiggles, `sfx_soft_tap` plays, "That's turning the page." is spoken, and the prompt re-plays; no advance or score change |
| AC-08 | round 2 with one wrong tap already recorded | a second wrong card is tapped | the correct card (`act_look`) soft-pulses 400 ms while the teach line and prompt re-play |
| AC-09 | round 2 | the correct card is double-tapped within 500 ms | exactly one judged correct tap, one sparkle, one `sfx_ding`, and one round advance occur |
| AC-10 | round 3 | a first finger holds `act_open` and a second finger taps `act_close` before release | only the first card reacts; the second shows no feedback of any kind |
| AC-11 | any round | empty space >12 px from every card is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-12 | a round open, 12 s without input | idleness continues | the correct card hint-pulses for 3 s and `vo_hint_round` plays; any tap resets the timer and the hint repeats 12 s later |
| AC-13 | `title`, `video` paused, or `endcard`, 12 s without input | idleness continues | Play, Play/Pause, or Replay respectively hint-pulses for 3 s and `vo_hint` plays after the first gesture (visual-only before it) |
| AC-14 | rounds 1–5 answered correctly | round 5 is answered | confetti, `sfx_chime`, and "You know how to read a book! Great reading!" play; after 2500 ms the end card shows Replay (≥96 px) and HOME |
| AC-15 | a save `{phase:"activity", roundIndex:2}` | the page reloads and Play is pressed | round 3's cards and prompt appear directly; the video is not replayed |
| AC-16 | a save with `completed:true` | the page reloads and Play is pressed | chapter 1 of the video starts |
| AC-17 | round 4 open | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload round 4's prompt plays |
| AC-18 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-19 | the end card showing | Replay is pressed | chapter 1 of the video starts with its 2000 ms lead-in, and `completed` clears on the next save |
| AC-20 | speech synthesis unavailable | Play is pressed and a round is played | no voice plays, the position pictogram and the pulsing correct card still carry the round, correct taps still sparkle and advance, and the muted-speaker pictogram shows 5 s |
| AC-21 | storage blocked | the entry is played and HOME is pressed | all behavior works in memory; after reload Play starts the video |
| AC-22 | the video playing or a round open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen (or the open round's prompt re-plays once) and no progress is lost |
| AC-23 | any state | Tab is pressed repeatedly | focus follows the section 6 tab order, every focused control exposes its accessible name (FR-021), Enter/Space activates each control, and Escape returns HOME |
| AC-24 | a round open at 1024×768 | the viewport is resized to 800×1000 | phase, round, `videoMs`, and progress are unchanged and every card remains ≥80 px and every control ≥64 px |
| AC-25 | the video playing | the clock crosses each chapter start | the three top-center dots fill in turn (dot 1 in chapter 1, dot 2 in chapter 2, dot 3 in chapter 3); the dots are not focusable |
| AC-26 | a voice clip is playing (video line, prompt, confirmation, teach, or hint) | another voice clip starts | the previous utterance stops immediately and only the new voice is heard; sfx may still overlap |
| AC-27 | the video playing mid-line | Play/Pause is double-tapped within 300 ms | exactly one toggle occurs (the voice stops and the clock freezes); a later single tap replays the current line from its start |
| AC-28 | chapter 2 playing mid-line | Replay is double-tapped within 500 ms | chapter 2 restarts exactly once from its first line (17200 ms); the second tap is ignored with no sound, and later lines keep their section 8 offsets |
| AC-29 | a round answered correctly, confirmation playing | another card is tapped before the next round starts | no second judgment, sparkle, sfx, or voice occurs; exactly one round advance happens 600 ms after the confirmation ends |
| AC-30 | any state | an unmapped key (e.g. `Q`) is pressed | nothing changes on screen or in audio |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 43.6 s video plays its three chapters at the section 8 timings with cover swing, page turn, highlights, gaps, dots, Pause/Resume, and Replay.
3. The five rounds run in order with their fixed card sets; correct taps advance, wrong taps teach and re-ask, and no score appears.
4. Phase and round survive a reload; Play resumes at the saved round (or the video when completed); the reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video focus (four reading steps), the three-chapter script, and the five rounds are designed inferences from the title; official sources publish no per-video description | designed (O3, D1–D2) |
| A2 | The example book "The Red Ball", all scenes, cards, voices, copy, and music are original; word-bars stand in for story words so the entry stays wordless | designed (IP rule, D3) |
| A3 | A runtime-rendered animated video is an acceptable realization; a pre-rendered file must match the section 8 timeline | designed (R-013) |
| A4 | TTS-generated clips or runtime TTS are acceptable | designed |
| A5 | The five rounds ask the "look" step twice (R2 and R4) so rounds 1–4 read as one continuous reading; the four taught steps are open/look/turn/close | designed (section 8) |
| A6 | Browsers block autoplay until the first user gesture; background-tab timers may be throttled and speech may be suspended | platform fact; handled by FR-018 and FR-020 |
| A7 | A 12 px tap tolerance, ≥96 px cards, and a 500 ms activity tap throttle suit ages 4–5 | designed (section 7) |
| A8 | Age band Preschool–K (4–5) is a targeting choice inside the app's official 2–8 range | designed |
| A9 | No unlocks, adaptive difficulty, persisted clock, or round skip | designed (FR-022, section 10) |
| A10 | The visible numeral "1" on the round-1 pictogram is content (a quantity glyph), not an instruction to read | designed (FR-021) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the four-step scope, the 3-chapter timeline and line offsets, chapter and round voice copy,
  card sets and correct positions per round, progression and feedback rules, chrome set and keyboard
  map, hit-target minimums, no fail state, save key and shape, asset provenance, acceptance criteria.
- **Free:** exact book and page composition within the section 8 guidance, easing curves, sparkle and
  confetti particle look, voice timbre/TTS engine, optional title music, decorative title-scene details,
  the hand/finger glyph style on the action cards.
- **Not in this spec:** library or Videos-tab browsing, the other eight Book Basics entries, profiles,
  navigation shell, parental controls, localization, analytics, scoring, streaks, or teacher tooling.
