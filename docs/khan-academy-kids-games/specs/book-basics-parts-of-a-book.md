# Parts of a Book (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-parts-of-a-book.md`](../book-basics-parts-of-a-book.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); series wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233
- **Spec status:** v1 — one of nine Book Basics specs; matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: three video chapters replace levels, the five name-the-part rounds replace a level set, the endcard replaces a win condition; no scoring, no fail state.

## 2. Overview and learning objective

A child presses Play and watches a 56.4 s original animated video in three chapters about the physical
parts of a book, then answers five name-the-part rounds on staged book scenes: tap the front cover, the
spine, the pages, the back cover, and the title page. The skill is **print awareness / book-parts
vocabulary**, the concept implied by the title. Age band: **2–5 pre-reader** (with 6–8 as early readers
along for the vocabulary); expected session **1.5–2.5 minutes** (video 58.4 s + 5 rounds + endcard).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Parts of a Book" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; `khan-academy-kids-games.md` lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish video titles only — no per-video descriptions; the focus implied by the title is an inference, not an official description | official | Catalogued entry, lines 11–19 |
| O4 | The entry is a video in the Library's Videos section; the app targets ages 2–8 | official | Catalogued entry lines 3–4; `khan-academy-kids-games.md` lines 96, 160–177 |
| D1 | The five parts taught are front cover, spine, pages, back cover, title page | designed | O3 publishes no content; a five-part set is the minimal, auditable focus implied by the title |
| D2 | Three-chapter video, 56,400 ms video clock, exact beat timings and voice copy (section 8) | designed | Makes the video buildable and observable; original animation, no real footage |
| D3 | Five name-the-part rounds with fixed prompts, three targets each (one correct, two distractors), teach-on-wrong feedback (section 8) | designed | The comprehension interaction promised by the interactive-player type; wrong taps teach, never punish |
| D4 | The example book "My Book", all art, voice, and music are original; no Khan Academy media or characters | designed | Required: no official media may be reproduced |
| D5 | Title/video/activity/celebrating/endcard states, chrome, idle hint, hidden reset, save/resume, audio rules, no fail state | designed | Template v1 and the shared brief; continuity without accounts; never punishing (ages 2–8) |

## 4. Player experience / core loop

A child presses the big Play on a title scene. After a 2 s lead-in a closed book pops in: the voice
explains that a book has parts, turns it to show the spine and the back, opens it to the pages and the
title page, and names all five. The video hands over to round 1: "Find the front cover." The child taps
the cover — a sparkle, a ding, "Yes! The front cover." — and round 2 follows. A wrong tap gets a gentle
jiggle and "That's the spine. Find the front cover." After round 5 confetti falls, the voice praises,
and an endcard offers Replay and HOME. HOME returns to the title; Play later resumes at the saved phase
and round.

**Core loop:** Play → watch 3 chapters (pause/replay chapter) → 5 name-the-part rounds with voice
prompts → celebrate → replay the activity or go HOME.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload the scene art and audio (section 11), then `title`: an original decorative scene (open book with floating shapes), a Play target ≥96×96 CSS px, and an inconspicuous reset logo ≥64×64 CSS px top-right (FR-012). No audio shall play before the first user gesture; the first pointer or key input unlocks audio (R-006). When Play is pressed, the player shall unlock audio, run a 2000 ms lead-in (stage fade 300 ms), start chapter 1 at video clock 0, and save `phase: "video"`. |
| FR-002 | While a video chapter plays, the player shall drive the deterministic timeline of section 8 from one clock: chapters 1–3 last 16,000 / 20,000 / 18,000 ms with 1200 ms gaps between them (video clock 0–56,400). Chapter changes and beat actions (voice, highlight, badge pops) shall fire at the section 8 times. Pausing freezes the clock; Resuming restarts the current chapter's current voice line from its start (the line with the greatest chapter-relative offset ≤ the frozen clock; before the first line, line 1) and re-speaks it, so no line is skipped or repeated; inside a gap, Resume continues the frozen segment with its remaining time and no voice; at chapter end the player shall auto-advance after the gap; after chapter 3 ends it shall start `activity` round 1 after a final 1200 ms gap (scene at video clock 57,600, prompt at 58,000). |
| FR-003 | Replay (chapter) ≥64×64 CSS px shall cancel the current voice, and restart the current chapter from its chapter-relative 0 (`playing`); during an inter-chapter gap it restarts the chapter that just ended. Replay is throttled to one restart per 500 ms (FR-007); repeats inside the window are ignored with no sound. |
| FR-004 | When `activity` begins, it shall run the five fixed rounds of section 8 in order (1 front cover → 2 spine → 3 pages → 4 back cover → 5 title page). Each round: scene fades in over 300 ms; `vo_prompt_n` (copy in section 8, volume 1.0, one-shot) plays at round +400 ms; the round is tappable immediately; entering a round shall save `phase: "activity"` with that `roundIndex` (0–4). The five-badge row (32×32 px badges, 12 px gaps, top-center) shows progress; badge *n* fills accent when round *n* is passed, and a restored round draws every already-passed badge filled. |
| FR-005 | When the correct target of a round is tapped, the player shall judge it correct: sparkle (≤6 particles) at the target center (400 ms), highlight the target (holds until the round ends), play `sfx_ding` (0.8, one-shot, 300 ms throttle) and `vo_yes_n` (0.7, one-shot), and fill badge *n*. The next round shall begin 600 ms after `vo_yes_n` ends; when speech is unavailable, 2600 ms after the judgment. After round 5, `celebrating` shall begin 600 ms after `vo_yes_5` ends (2600 ms after the judgment when speech is unavailable; FR-010). From the judgment until that round begins or `celebrating` starts, all target taps are ignored with no sound (the success lock). |
| FR-006 | When a distractor is tapped, the player shall judge it wrong: jiggle the tapped target (300 ms), play `sfx_soft_tap` (0.5, one-shot) and `vo_try_n` (0.7, one-shot; copy in section 8 — it names the tapped part and repeats the prompt). No progress is lost, there is no fail state, and retries are unlimited. Taps from a wrong-tap judgment until that teach clip ends + 600 ms (2600 ms after the judgment when speech is unavailable) are ignored with no sound and no judgment (the teach window). |
| FR-007 | Input semantics: tap/click only (no drag). Each target's hit rect is expanded 12 px on all sides; taps inside overlapping rects resolve to the nearest target center; exact ties resolve to the lowest target index (the round row's left→right target listing, section 8). First pointer down wins; additional simultaneous pointers are ignored until release. A tap >12 px from every rect is an empty tap: no state change, no sound, idle timer resets. Double-tapping a target yields at most one judgment per 600 ms window; the success lock (FR-005) and teach window (FR-006) take precedence. Chrome throttles: Play/Pause 300 ms, Replay 500 ms, and a chrome tap inside its throttle window is ignored with no sound. |
| FR-008 | Play/Pause (≥64×64 CSS px) shall toggle playback in `video`; pause cancels the voice and freezes the clock and all motion; Play resumes by restarting the frozen voice line from its start and re-speaking it (FR-002). When the clock reaches the end of chapter 3, Play/Pause is a no-op. |
| FR-009 | When no input has occurred for 12,000 ms: in `title`, hint-pulse Play for 3000 ms (`vo_hint_title` only after the first gesture); in `video` paused, hint-pulse Play/Pause for 3000 ms + `vo_hint_video`; in `video` playing, no hint (the moving video is its own cue); in `activity` with the round unanswered, hint-pulse the correct target for 3000 ms + replay `vo_prompt_n` (1.0); in `endcard`, hint-pulse Replay for 3000 ms + `vo_hint_end`. Hints repeat every 12,000 ms of continued idleness; any input, including an empty-space tap, resets the timer. |
| FR-010 | After round 5's judgment (FR-005), `celebrating` shall run: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot) and `vo_praise` (1.0, one-shot, ≤2800 ms) at its start. `endcard` shall appear 3000 ms after celebration start: a centered paper end panel (≤420×300 px, fade 300 ms) with Replay ≥96×96 CSS px and HOME ≥64×64 CSS px, plus the five filled badges. Replay shall restart `activity` round 1, clear `completed` on that round's save, and save. |
| FR-011 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice or timer, saves, and returns to `title`. On `title` (the player's home) and `loading`, no HOME control is rendered and a HOME input is a no-op. |
| FR-012 | When the title logo is held for 3 s, the player shall fill a visible ring for the hold duration (ring fill); releasing early resets the ring to 0 with no action. On completion it shall clear the storage key and in-memory progress, then play a ring flash (300 ms) and `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-013 | Persistence: save on Play from `title`, on each round entry, on completion (`completed: true` with `phase: "activity"`, `roundIndex: 4`), and on HOME (section 10); `updatedAt` refreshes on every save. Resume: Play opens the saved phase and round; when `completed` is true, Play starts at chapter 1 and clears `completed` in that save (video reads always restart at chapter 1). |
| FR-014 | Degradation: no speech synthesis → all voice clips are silent and activity prompts are visual-only: the round's part badge is drawn at 128×128 px and soft-pulses while the round is unanswered, and a muted-speaker pictogram (48×48) shows for 5 s after Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. Missing visual asset → draw a stub shape, log a warning, keep playing. |
| FR-015 | No-reading rule: the only visible text is the content word "My Book" printed on the example book's front cover and title page (section 8); everything else visible is art, pictograms, or badges. All instructions and feedback reach non-readers by voice + pictogram. Every interactive element (reset logo, Play, HOME, Play/Pause, Replay, each activity target) carries an invisible accessible name. Focus indicator: 4 px outline, ≥3:1 contrast. |
| FR-016 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the voice and enter paused with the clock frozen; on return it stays paused until Play. When hidden during `activity`, the current voice is cancelled; on return, an unanswered round replays `vo_prompt_n` after 400 ms and an answered round's pending advance fires. Idle time counts visible time only; throttled timers may delay hints or advances, never lose progress. |
| FR-017 | Resize or rotation shall reflow per the section 8 breakpoints while preserving state, chapter time, `roundIndex`, badges, and playback; no interaction targets below the stated minimums. |
| FR-018 | The player shall have no fail state: mis-taps, wrong taps, empty taps, rapid/repeated taps, double-taps, multi-touch, idle time, missing speech, and blocked storage never lose progress, never end a session, and never block play. |
| FR-019 | Only one voice clip shall play at a time; any new voice clip (video line, prompt, teach, praise, hint) cancels the previous utterance immediately. Sound effects may overlap each other and the voice. Optional `music_title` plays at 0.15 as a loop on `title` and `endcard` only, starting after the first gesture; if music is playing, the melody bus ducks 0.5→0.4 for 120 ms when a 0.7-volume teach voice starts. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank warm-paper scene | initial state; preload art and audio; audio locked |
| `title` | decorative open-book scene + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `video(chapter, playback)` | animated book stage + chrome; chapter 1–3 | playback ∈ {playing, paused}; gaps between chapters |
| `activity(round)` | staged book scene + 3 targets + badge row + chrome | round 0–4; each round has exactly 3 targets |
| `celebrating` | frozen scene + confetti | auto-exits after 3000 ms |
| `endcard` | end panel + Replay + HOME + 5 filled badges | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `video(1, playing)` | entry: unlock audio, 2000 ms lead-in, video clock 0; save `phase: "video"` |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | action: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` | outside 300 ms throttle | `video(same, toggled)`; no-op at chapter 3 end | action: FR-008 |
| `video` | `REPLAY` | outside 500 ms throttle | `video(same chapter, playing)` | action: FR-003 |
| `video` | `CHAPTER_END` | gap elapsed | `video(next, playing)`; after chapter 3 → `activity(0)` | action: FR-002; on activity entry save `phase: "activity"`, `roundIndex: 0` |
| `video` | `TAB_HIDDEN` | playing | `video(same, paused)` | action: cancel voice, freeze (FR-016) |
| `video` / `activity` / `celebrating` / `endcard` | `HOME_PRESSED` | — | `title` | action: cancel voice/timers, save |
| `activity` | `TARGET_TAP(idx)` | outside the success lock (FR-005) and the teach window (FR-006) | same or next round | actions: FR-005/FR-006; on next round save `roundIndex` |
| `activity` | `ROUND_5_CORRECT` | — | `celebrating` | action: FR-010; save `completed: true` |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | action: FR-016 |
| `celebrating` | `CELEBRATION_DONE` | 3000 ms elapsed | `endcard` | action: show end panel |
| `endcard` | `REPLAY_PRESSED` | — | `activity(0)` | action: save (clears `completed`) |
| any visible state | `IDLE_12S` | 12,000 ms no input | same state | action: FR-009 hint |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — reset logo → Play; `video` — HOME → Play/Pause → Replay; `activity` —
HOME → target 1 → target 2 → target 3 (lowest index first, section 8 table order); `celebrating` —
HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play from title | tap Play | Tab to Play + Enter/Space |
| Play / pause video | tap Play/Pause | Space (no control focused) or Enter/Space on the focused target |
| Replay chapter | tap Replay | R or Enter/Space on focused Replay |
| Answer a round | tap one of the 3 targets | Tab to the target + Enter/Space |
| Replay the activity | tap Replay on the endcard | Enter/Space on focused Replay |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** activity targets ≥96×96 CSS px at ≥1024 px wide and ≥80×80 at 768–1023 px; endcard
  Replay ≥96×96; Play on title ≥96×96; HOME, Play/Pause, Replay, reset logo ≥64×64 — all above the
  44 px platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px per FR-007; nearest center wins, exact ties to the lowest target index
  (the round row's target listing, section 8); >12 px from every rect = empty tap (nothing changes; idle resets).
- **Multi-touch / gestures:** FR-007 single-pointer semantics; no drag gesture exists, so no drag
  alternative is required.
- **Instructions without reading:** every control is voice-cued and pictogram-labelled; the round badge
  row and the scene itself carry the meaning; visible text is limited to "My Book" (FR-015).
- **Accessible names:** invisible names on every interactive element (FR-015/R-011): "Play",
  "Reset progress", "Home", "Pause"/"Play", "Replay chapter", "Front cover", "Spine", "Pages",
  "Back cover", "Title page", "Replay".
- **Resize:** viewport resize mid-video or mid-round reflows per section 8, preserving chapter,
  chapter time, playback, round, badges, and progress.

## 8. Levels and content data

**Video chapters (designed; video clock 0 = chapter 1 start; wall clock = Play + 2000 ms + video clock).**
Chapter durations sum to 54,000 ms; + 2 × 1200 ms gaps = 56,400 ms video clock; + 2000 ms lead-in =
58,400 ms wall clock from Play. After a final 1200 ms gap, round 1 scene enters at video 57,600 and its
prompt plays at video 58,000 (wall 60,000).

| Ch | Focus | Video clock (ms) | Duration (ms) |
|---|---|---|---|
| 1 | This is a book; it has parts | 0–16,000 | 16,000 |
| — | gap | 16,000–17,200 | 1,200 |
| 2 | Outside: front cover, spine, back cover | 17,200–37,200 | 20,000 |
| — | gap | 37,200–38,400 | 1,200 |
| 3 | Inside: pages, title page; recap | 38,400–56,400 | 18,000 |

| Ch | Beat at (ms, chapter-relative) | Visual | Audio (key — volume — behavior) |
|---|---|---|---|
| 1 | 0 | stage holds (faded in during the lead-in, FR-001) | none |
| 1 | 600 | closed book pops in, center, 56% stage (pop 300 ms) | none |
| 1 | 2,400 | front-cover pose holds; soft pulse ×2 | `vo_ch1_a` — 0.7 — one-shot: "This is a book. It has many parts." |
| 1 | 7,000 | crossfade front→tilt→back (1200 ms each) | `vo_ch1_b` — 0.7 — one-shot: "Let's look outside the book, then inside." |
| 1 | 10,800 | five part badges pop in, 700 ms apart (badge = cover rect, spine strip, page stack, back rect, title page) | `sfx_soft_tap` — 0.5 — one-shot per badge; `vo_ch1_c` at 11,000 — 0.7 — one-shot: "Front cover. Spine. Pages. Back cover. Title page." |
| 2 | 200 | front-cover pose holds | `vo_ch2_a` — 0.7 — one-shot: "These are the outside parts." |
| 2 | 1,800 | front cover highlighted (hold 5,400 ms) | `vo_ch2_b` at 2,000 — 0.7 — one-shot: "The front cover is the outside of the book. It shows the title and a picture." |
| 2 | 7,200 | crossfade to spine pose; spine highlighted | `vo_ch2_c` at 7,400 — 0.7 — one-shot: "The spine holds the book together. You see it on a shelf." |
| 2 | 12,600 | crossfade to back pose; back cover highlighted | `vo_ch2_d` at 12,800 — 0.7 — one-shot: "The back cover is the outside of the back of the book." |
| 2 | 19,000 | three outside outlines soft-pulse once | `sfx_soft_tap` — 0.5 — one-shot |
| 3 | 0 | book opens to a spread (fade 300 ms) | `sfx_soft_tap` at 200 — 0.5 — one-shot |
| 3 | 2,400 | pages highlighted; one page turns at 4,000 (slide 400 ms) | `vo_ch3_a` — 0.7 — one-shot: "The pages are inside. You turn the pages to read." |
| 3 | 9,200 | title-page spread; title page (right, with "My Book" and a picture) highlighted | `vo_ch3_b` at 9,400 — 0.7 — one-shot: "The title page has the book's name. It comes before the story." |
| 3 | 15,600 | five badges fill left→right (200 ms stagger) | `sfx_chime` — 0.8 — one-shot; `vo_ch3_c` at 16,000 — 0.7 — one-shot: "Now you find the five parts!" |

**Activity rounds (designed, fixed order; each round has exactly 3 targets).**

| # | Prompt (`vo_prompt_n`, 1.0) | Correct target | Distractors | Illustration guidance (`ill_r{n}`) |
|---|---|---|---|---|
| 1 | "Find the front cover." | Front cover | Spine, Pages | closed book tilted 10° left on a stand; front cover toward viewer, sun picture + "My Book"; spine strip at left; page-edge block at right |
| 2 | "Find the spine." | Spine | Front cover, Pages | book standing upright, spine out; front-cover sliver at left; page stack visible on top |
| 3 | "Find the pages." | Pages | Front cover, Back cover | closed book tilted 20°, pages fanned open toward the viewer at the bottom; front cover left, back cover right |
| 4 | "Find the back cover." | Back cover | Spine, Pages | closed book turned around on the stand; back cover toward viewer with a leaf picture; spine strip at right; page-edge block at left |
| 5 | "Find the title page." | Title page | Pages, Front cover | open book: right page shows a boat picture + "My Book"; left page shows a star picture (story pages); outside of the front cover visible at lower-left |

| # | First distractor → `vo_try_n_a` (0.7, one-shot) | Second distractor → `vo_try_n_b` (0.7, one-shot) |
|---|---|---|
| 1 | Spine → "That's the spine. Find the front cover." | Pages → "Those are the pages. Find the front cover." |
| 2 | Front cover → "That's the front cover. Find the spine." | Pages → "Those are the pages. Find the spine." |
| 3 | Front cover → "That's the front cover. Find the pages." | Back cover → "That's the back cover. Find the pages." |
| 4 | Spine → "That's the spine. Find the back cover." | Pages → "Those are the pages. Find the back cover." |
| 5 | Pages → "Those are the story pages. Find the title page." | Front cover → "That's the front cover. Find the title page." |

- **Correct feedback copy (`vo_yes_n`, 0.7, one-shot):** 1 "Yes! The front cover. It shows the title and
  a picture." · 2 "Yes! The spine. It holds the book together." · 3 "Yes! The pages. You turn the pages
  to read." · 4 "Yes! The back cover. It is the outside of the back." · 5 "Yes! The title page. It has
  the book's name."
- **Progression rule:** fixed rounds 1→5; rounds advance only on a correct tap; no randomization, no
  locks, no timers, no scores. Wrong taps and idle never advance or reset a round.
- **Target rule:** each target is a static part zone with a hit rect ≥96×96 px at ≥1024 px wide (≥80×80
  at 768–1023 px) plus the 12 px expansion (FR-007); target index order is the round row's left→right
  target listing — the correct target first, then its distractors in the listed order — used for
  tie-breaks and tab order. The three rects never overlap by more than the 12 px expansion;
  the correct target's zone is never smaller than a distractor's zone within a round.
- **Worked example (round 1):** 1024 px stage, targets laid out at x = 120/400/780 at y = 360; front
  cover 360×300, spine 120×300, pages 140×300; tapping 8 px inside the spine distractor's expanded rect
  judges "Spine" (wrong); tapping the empty area between spine and cover (>12 px from each) changes
  nothing.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px, stage 4:3 ≤1024×768 centered,
  scene ≥60% stage height, badge row 5 × 32 px with 12 px gaps, end panel ≤420×300 px. At 768–1023 px —
  chrome 88 px, badge row 5 × 28 px with 10 px gaps, targets ≥80×80 px. Height ≥700 px; below that scale
  the field by 0.85 keeping every target and control ≥64 px.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video beat (section 8) | beat's visual event | beat's key, volume, one-shot label (section 8) |
| Correct round answer | sparkle ≤6 particles at target (400 ms); highlight persists; badge fills | `sfx_ding` — 0.8 — one-shot (300 ms throttle); `vo_yes_n` — 0.7 — one-shot |
| Wrong round answer | tapped target jiggles 300 ms | `sfx_soft_tap` — 0.5 — one-shot; `vo_try_n` — 0.7 — one-shot |
| Round prompt | round scene fades in; correct-round badge soft-pulses while unanswered | `vo_prompt_n` — 1.0 — one-shot at round +400 ms |
| Chrome press (Play/Pause, Replay, HOME) | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Activity complete | confetti ≤40 particles (2500 ms); end panel at 3000 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot (≤2800 ms): "You found every part! Great reading!" |
| Idle hint (FR-009) | deterministic target hint-pulses 3 s | `vo_hint_title` / `vo_hint_video` / `vo_hint_end` — 1.0 — one-shot; activity replay uses `vo_prompt_n` — 1.0 |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after Play; round badge is drawn at 128×128 and soft-pulses | none |
| Optional title music | none | `music_title` — 0.15 — loop (`title`/`endcard` after first gesture; melody ducks 0.5→0.4 for 120 ms at teach-voice start) |

**Effect definitions (no undefined effects):** *highlight* = 6 px dashed accent outline around the part
zone plus 25% accent fill, appears ≤120 ms, no motion. *pop* = scale 0→1.08→1 over 300 ms. *soft pulse*
= scale 1→1.05→1 over 600 ms per cycle (chapter 1: ×2; chapter 2: once). *hint pulse* = scale 1→1.12→1 over 500 ms repeated for 3000 ms.
*jiggle* = rotate −4°→+4°→0 over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = ≤6 star
particles, 4 px, radiating ≤48 px over 400 ms. *confetti* = ≤40 rect particles falling ≤160 px over
2500 ms. *fade* = opacity 0→1 or 1→0 over 300 ms. *slide* (page turn) = page content translate-x 24
px→0 with opacity 0→1 over 400 ms. *crossfade* = the outgoing pose fades 1→0 while the incoming pose
fades 0→1, both over 400 ms (1,200 ms per pose in chapter 1's front→tilt→back tour). *ring fill* = 4 px accent stroke fills clockwise over exactly the
3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *end panel* = centered paper panel (≤420×300 px,
fill `#FFFDF7`, 4 px `#3A2E24` border, 24 px radius) fading in over 300 ms. *badge* = 32×32 px (28 px at
768–1023) rounded square pictogram of a part; *filled* = the badge fills with accent over 200 ms and shows a check mark.

**Voice copy (designed, fixed):** video lines and activity copy are the section 8 tables. `vo_hint_title`
= "Tap play to start the video." `vo_hint_video` = "Tap play to keep watching." `vo_hint_end` = "Tap
replay to play again." `vo_praise` = "You found every part! Great reading!" Voice timbre and TTS engine
are build freedom.

**Audio rules (v1):** no audio before the first user gesture (FR-001/R-006); one voice clip at a time
(FR-019); degradation per FR-014 — no speech → visual-only, no AudioContext → silent, storage blocked →
run unsaved; background-tab timers may be throttled and speech suspended, handled by FR-016 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key
  `spec.bookBasics.partsOfABook.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** Play from `title` (phase `video`); each round entry (phase `activity`, that
  `roundIndex`); completion (phase `activity`, `roundIndex: 4`, `completed: true`); HOME from any state.
  `updatedAt` refreshes on every save (v1).
- **Restore:** Play resumes at the saved phase and round — `video` restarts at chapter 1 (clock position
  is never stored), `activity` opens the saved `roundIndex` with its prompt. When `completed` is true,
  Play starts at chapter 1 and clears `completed` in that save (FR-013).
- **Reset:** hold the title logo 3 s (ring fill) → clears the key and in-memory progress; the keyboard
  equivalent is holding Enter/Space 3 s on the focused logo (FR-012).
- **Deliberately not stored:** video clock, chapter position, tap history, judgments, badges beyond the
  save shape, audio settings, language, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy; no Khan Academy character, art, voice, or
audio is reproduced. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row
says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | warm-paper title scene: open book with floating shapes | 1024×768 SVG | static | SVG shapes |
| `book_pose_{front,tilt,spine,back,open,fan,title}` | image | the example book in 7 original poses per section 8 illustration guidance; flat, rounded linework; "My Book" only where stated | 1024×600 SVG each | static; pose changes use crossfade/slide | SVG shapes + text |
| `badge_{cover,spine,pages,back,title}` | image | five part pictograms (rounded rect, vertical strip, page stack, rounded rect with leaf, open page) | 32×32 SVG (128×128 when visual-only) | pop, fill; pulse when prompting | SVG paths |
| `pict_play` / `pict_pause` / `pict_replay` / `pict_home` | image | triangle / bars / circular restart arrow / house | 64×64 SVG (Play and endcard Replay drawn at 96×96) | static | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after Play when speech is missing | SVG path |
| `ring` | rendered | 4 px accent progress ring around the reset logo | logo-sized | ring fill during hold; ring flash | none needed |
| `sfx_tap` / `sfx_soft_tap` | audio | UI click 0.08 s; muted tap 0.10 s | ogg/mp3 | one-shot | WebAudio blips |
| `sfx_ding` / `sfx_chime` | audio | bright single ding; 3-note chime | 0.3 s / 0.8 s | one-shot (ding 300 ms throttle) | WebAudio tones/arpeggio |
| `vo_ch1_*` / `vo_ch2_*` / `vo_ch3_*` | audio | 10 video lines, copy in section 8; caps keep each line clear of the next line and the chapter end (`vo_ch1_b` ≤4.0 s, `vo_ch2_a` ≤1.8 s, `vo_ch3_c` ≤2.0 s; all others ≤4.5 s) | per-line caps | one-shot | TTS allowed |
| `vo_prompt_1..5`, `vo_yes_1..5`, `vo_try_*`, `vo_praise`, `vo_hint_*` | audio | activity and hint copy in sections 8–9; `vo_try` has 2 variants per round (10 clips) | ≤3.5 s for prompts/confirmations/teach; ≤2.8 s for praise and hints | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title`/`endcard` | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, cover blue `#4A7FB5`, sun
  `#F2C94C`, pages `#FFFDF7`, highlight `#FFD166`. **Typography:** system rounded stack (`ui-rounded`,
  fallback `system-ui`); the only visible word, "My Book", is ≥48 px on the cover/title page.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio
  → continue silently with the fixed timings of FR-005/FR-014 (R-007).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: 1-3`; `startMs: int` (video clock); `durationMs: int`; `beats: Beat[]` |
| `Beat` | `atMs: int` (chapter-relative); `visual: string`; `audioKey: string`; `volume: number`; `behavior: "one-shot"` |
| `Round` | `index: 0-4`; `partId: enum {cover, spine, pages, back, title}`; `promptKey: string`; `yesKey: string`; `targets: Target[3]`; `illKey: string` |
| `Target` | `partId: enum`; `correct: bool`; `zone: {x, y, w, h}` (stage-relative); `tryKey: string` (wrong answers name the tapped part) |
| `Save` (persisted) | `phase: "video" \| "activity"`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int`; `videoTimeMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `judged: bool`; `badges: bool[5]`; `timers: id[]`; `utterance: object` |

Chapter/round records are static data: adding a round = one `Round` + its prompt/yes/try clips, no new
code; this spec builds the five rounds listed in section 8.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render vector scenes with per-part hit rects, a highlight overlay, and a single clock driving the video timeline.
- **R-002** The player shall animate the section 9 effects: highlight, pop, soft pulse, hint pulse, jiggle, depress, sparkle, confetti, fade, crossfade, slide, ring fill/flash, end panel.
- **R-003** When a pointer taps or clicks, the player shall hit-test per FR-007 with 12 px expansion, nearest-center resolution, and single-pointer semantics.
- **R-004** The player shall support keyboard focus and activation for every interactive element, Space = Play/Pause, R = Replay, Escape = HOME.
- **R-005** The player shall play concurrent one-shot audio (sfx at the section 9 volumes; voices at 0.7/1.0) and may loop one music track at ≤0.15; a new voice clip cancels the previous utterance.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall voice clips via recorded audio or speech synthesis, and fall back to the FR-005/FR-014 visual-only timings when synthesis or a clip is unavailable.
- **R-008** The player shall persist and restore the section 10 save object in browser local storage, tolerate blocked storage (FR-014), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during video motion and feedback effects.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing chapter time, playback, round, badges, or progress.
- **R-011** The player shall expose an invisible accessible name on every interactive element.
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause-on-hide in `video`, voice cancellation in `activity`, no progress loss, hints may fire late (FR-016).

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play and the reset logo, and no audio has played |
| AC-02 | `title` | Play is pressed | 2000 ms later chapter 1 starts; its first voice line plays at wall 4,400 ms (video 2,400) and the first badge appears at wall 12,800 ms |
| AC-03 | chapter 1 playing from Play | the timeline runs | chapter 2 begins at wall 19,200 ms, chapter 3 at wall 40,400 ms, and the video ends at wall 58,400 ms; no chapter skips |
| AC-04 | the video playing | the chapter-3 recap ends | after a 1200 ms gap the round 1 scene appears and "Find the front cover." plays 400 ms later (wall ≈60,000 ms) |
| AC-05 | round 1 unanswered | the front cover is tapped | sparkle, `sfx_ding`, and "Yes! The front cover…" play; badge 1 fills; round 2 starts 600 ms after the clip ends |
| AC-06 | round 1 unanswered | the spine is tapped | the spine jiggles, `sfx_soft_tap` plays, "That's the spine. Find the front cover." plays, badge 1 stays empty, and the round still accepts retries |
| AC-07 | round 1 answered correctly | the front cover is tapped again before round 2 begins | no second judgment and no sound occur, and exactly one round advance happens |
| AC-08 | the video playing | Play/Pause is double-tapped within 300 ms | exactly one toggle occurs (the voice stops and the clock freezes); a later single tap restarts the current line from its start and playback continues |
| AC-09 | round 2 unanswered | two fingers land simultaneously, one on the spine and one on the front-cover distractor | only the first pointer's target is judged; the second is ignored until release |
| AC-10 | any round | a tap >12 px from every target is made | nothing changes on screen or in audio and the idle timer resets |
| AC-11 | `title`, no gesture yet | 12,000 ms pass | Play hint-pulses for 3 s with no sound; after any gesture the hint also plays `vo_hint_title` |
| AC-12 | round 3 unanswered, 12,000 ms no input | idleness continues | the pages target hint-pulses 3 s and "Find the pages." replays; any tap resets and the hint repeats 12 s later |
| AC-13 | the video paused, 12,000 ms no input | idleness continues | Play/Pause hint-pulses 3 s with `vo_hint_video`; while the video is playing no hint ever fires |
| AC-14 | rounds 1–2 passed | HOME is pressed, the page reloads, Play is pressed | round 3 opens with its prompt and badges 1–2 filled |
| AC-15 | round 5 passed and the endcard was seen | the page reloads and Play is pressed | chapter 1 starts again (completion cleared) |
| AC-16 | `title` | the logo is held 3 s | a ring is visible during the hold and the save clears; the focused-logo keyboard hold behaves the same; after reload Play starts chapter 1 with an empty badge row |
| AC-17 | round 5 unanswered | the title page is tapped | "Yes! The title page…" plays, then confetti, `sfx_chime`, and "You found every part! Great reading!" play 600 ms later; the end panel with Replay and HOME appears 3000 ms after confetti starts |
| AC-18 | the endcard | Replay is pressed | round 1 opens with empty badges and its prompt; HOME instead returns to `title` with the save intact |
| AC-19 | speech synthesis unavailable | Play is pressed and a round is answered correctly | no voice plays; the video beats still fire at their times; round prompts show the 128×128 badge pulse; the correct tap advances the round 2600 ms after the judgment; the muted pictogram shows 5 s |
| AC-20 | storage blocked | a full session is played | every state behaves normally; after reload the session starts fresh |
| AC-21 | the video playing, or a round open | the tab is hidden, then shown | the video stays paused with its clock frozen (or the open round's prompt replays once 400 ms after return); a later Play restarts the frozen line, and no progress is lost |
| AC-22 | any round at 1024×768 | the viewport is resized to 800×1000 | round, badges, and progress are unchanged; every target is ≥80 px and every control ≥64 px |
| AC-23 | any state | Tab is pressed repeatedly, then Enter/Space and Escape are used | focus visits targets in the section 6 tab order, every focused control exposes its accessible name, Enter/Space activates, and Escape always returns to `title` |
| AC-24 | chapter 2 playing mid-line | Replay is double-tapped within 500 ms | the voice stops and chapter 2 restarts exactly once from its first line — the second tap is ignored with no sound — and playback continues to chapter 3 without skipping |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. Chapters 1–3 play end-to-end at the section 8 times with their voice lines and badges, and auto-advance to round 1.
3. All 5 rounds work: correct taps advance after the confirmation clip, wrong taps teach and retry, and round 5 reaches confetti and the endcard.
4. Play/Pause, chapter Replay, HOME, idle hints, and the 3 s reset hold behave as specified, including the throttles and no-fail rule.
5. Progress resumes at the saved phase/round; a `completed` save restarts at chapter 1; runs offline; with speech disabled the session still works visually.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The five parts (front cover, spine, pages, back cover, title page) are an original inference from the title; official sources publish no video content | designed — O3 forbids claiming more (D1) |
| A2 | The example book "My Book" and all scenes, poses, badges, voices, and music are original | designed — no official media may be reproduced (D4) |
| A3 | Video is programmatic animation (SVG/DOM/canvas) at runtime; a pre-rendered file is acceptable if it honors the same timeline contract | designed — keeps the build feasible for a fresh-context LLM |
| A4 | Round advance waits 600 ms after the confirmation clip (2600 ms fallback without speech) rather than a fixed timer, so feedback is never cut off | designed (FR-005) |
| A5 | 12 px tolerance, 96/80 px targets, and voice+pictogram prompts suit ages 2–8 | designed platform rule (sections 7–8) |
| A6 | Browsers block autoplay until a gesture; background-tab timers may be throttled and speech may be suspended | platform facts; handled by R-006 and FR-016 |
| A7 | One visible content word ("My Book") is allowed because the title page must show a title; everything else is voice + pictogram | designed (FR-015) |
| A8 | The activity always runs after the video, and a completed save restarts at the video rather than the activity | designed (sections 6 and 10) |
| A9 | No unlocks, adaptive difficulty, scoring, or persisted clock position | designed (sections 8 and 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the five-part scope and round order, the 3-chapter timeline and beat timings, chapter and
  round voice copy, target/distractor sets per round, progression and feedback rules, chrome set and
  keyboard map, hit-target minimums, no fail state, save key and shape, asset provenance, acceptance
  criteria.
- **Free:** exact book illustration composition within the section 8 guidance, pose-transition easing,
  sparkle/confetti particle look, voice timbre and TTS engine, optional title music, badge drawing
  details, decorative title-scene composition.
- **Not in this spec:** library/Videos-tab browsing, the other eight Book Basics entries, book
  selection, profiles, navigation shell, parental controls, localization, analytics, scoring, badges
  beyond the five progress badges.
