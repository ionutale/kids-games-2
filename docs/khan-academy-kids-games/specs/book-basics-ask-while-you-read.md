# Ask While You Read (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-ask-while-you-read.md`](../book-basics-ask-while-you-read.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); series wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233 ("Book Basics" video collection, named titles)
- **Spec status:** v1 — one of nine Book Basics specs; matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-019); no network after load
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: three video chapters replace levels, the five question-to-page rounds replace a level set, and the endcard replaces a win condition; no scoring, no fail state.

## 2. Overview and learning objective

A child presses Play and watches a 45.6 s original animated video (40.0 s of chapters) in which a warm
narrator reads an original picture book, *The Red Ball*, asking who, what, and where questions about each
page. The pages then become five question-to-page rounds (the video's three pages plus two new pages):
a page is shown, the voice asks one question ("Who is holding the ball?"), and the child taps the page
element that answers it. A correct tap
sparkles and is answered aloud ("Yes! Nia is holding the ball."); a wrong tap is named gently and the
question is asked again. The skill is **comprehension / question words** — treating questions as part of
reading — the concept implied by the title. Age band: **4–5 (Preschool–K)** inside the library's official
2–8 range. Expected session **2–3 minutes** (video 45.6 s + five rounds + celebration).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Ask While You Read" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; catalog lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish the video titles only — no per-video descriptions; the focus implied by the title is an inference, not an official description | official (about the source's limits) | Catalogued entry Notes |
| O4 | The app is officially for children ages 2–8 (Preschool–2nd Grade) | official | `khan-academy-kids-games.md` lines 96, 160–177 |
| D1 | The video topic (asking who/what/where while reading) and the three-chapter storyboard and script | designed | Inference from the title (O3); no official description exists |
| D2 | The interaction: five question-to-page rounds on five original pages | designed | Shared brief's per-entry concept for this slug |
| D3 | The original picture book *The Red Ball* and its characters (Nia, Luna the dog, Mango the cat, Pip the bird, Grandpa) | designed | Original content required; no Khan Academy media or characters |
| D4 | Player chrome (Play/Pause, Replay, HOME, reset logo, chapter dots), progress save/resume, idle hint, audio rules, no fail state | designed | Template v1 and the Book Basics shared brief |
| D5 | All art, video, voice, music, copy, and layout | designed | IP rule: all assets original (section 11) |

## 4. Player experience / core loop

A child presses the big Play on a title scene. After a 2 s lead-in a closed book pops in and opens:
"When you read, you can ask questions." Three question pictograms pop — who, what, where — and the
narrator turns to page 1 ("Who is holding the ball? Nia!"), then page 2 ("What is in the basket?
Apples!"), then page 3 ("Where did the ball roll? Under the bench!"). The pictograms fill, the spread
turns to a page with a big question mark, and round 1 begins: a page appears, a who-pictogram pops, and
the voice asks "Who is holding the ball?" The child taps Nia — sparkle, ding, "Yes! Nia is holding the
ball." Four rounds follow: what, where, what, who; a wrong tap jiggles, names the tapped element, and
re-asks. After round 5 confetti falls, the voice praises, and the endcard offers Replay or HOME; Play
later resumes at the saved phase and round.

**Core loop:** watch three chapters (pause/replay) → answer five question-to-page prompts by tapping the page element that answers → hear each tap affirmed or taught → celebrate → replay or go home.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload the scene and audio assets (section 11), then `title`: an original decorative scene (an open book with a face, a box, and a map-pin pictogram floating above it), a Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px (FR-015). No audio plays before the first gesture (FR-018). When Play is pressed, it shall unlock audio, stop `music_title`, run a 2000 ms lead-in (stage fade 300 ms), start `video` with the clock at 0 and chapter 1 at 2000 (FR-002), and save `{phase:"video", roundIndex:0, completed:false}`. |
| FR-002 | While `video` runs, one accumulated playing-time clock (`videoMs`, advanced per frame only while playing and the tab is visible; never wall-clock) shall drive this fixed timeline: lead-in 0–2000; chapter 1 2000–15,000; gap 15,000–16,200; chapter 2 16,200–30,200; gap 30,200–31,400; chapter 3 31,400–44,400; post-video gap 44,400–45,600. At each chapter end the clock shall auto-advance through the 1200 ms gap (chapter art fades out over 300 ms, 600 ms hold, next fades in over 300 ms; the chapter dot fills). After the post-video gap the player shall enter `activity` round 1 at 45,600 and speak its prompt at 46,000 (round +400 ms, FR-007) — no tap needed. Chapters total 40,000 ms; round 1 enters at `videoMs` 45,600. |
| FR-003 | Each chapter shall fire its section 8 visual changes and voice clips at the exact offsets listed (voice volume 0.7, one-shot; highlight appears in ≤120 ms). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a beat, chapter, or transition. |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`. Pause shall cancel the current voice line and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current voice beat's start (the voice beat with the greatest chapter-relative offset ≤ the frozen time; before the first voice beat, the first beat with a voice) and re-speak that line, so no line is skipped or repeated. Inside a chapter gap or the post-video gap, Resume continues the frozen segment with its remaining time and no voice. Play/Pause is throttled to one toggle per 300 ms; a double-tap toggles once. |
| FR-005 | A Replay target ≥64×64 CSS px shall restart the current chapter: cancel the voice and set `videoMs` to the chapter start (**2,000 / 16,200 / 31,400**); the chapter's beats then fire at their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay is throttled to one restart per 500 ms and does not change the save. |
| FR-006 | Chapter dots (3 dots, 12 px, 8 px gaps; current = accent fill over 100 ms, no motion) shall show the current chapter in `video`; they are not interactive and not focusable. |
| FR-007 | The activity shall run **5 fixed rounds** in section 8 order with no randomization. On each round entry the player shall show the round's page (fade 300 ms) and prompt pictogram (pop 200 ms), speak the round's prompt at round +400 ms (volume 1.0, one-shot), and save `{phase:"activity", roundIndex, completed:false}`. |
| FR-008 | When the round's correct element is tapped, the player shall show sparkle (≤6 particles) on the element, highlight the element (holds until the round advances), play `sfx_ding` (0.8, 300 ms throttle), and speak the round's confirmation line (0.7, one-shot); then, **600 ms** after the confirmation clip ends (or 2,600 ms after the judgment when speech is unavailable), start the next round (FR-007) or, after round 5, `celebrating` (FR-013). From the judgment until the next round begins (or `celebrating` starts), all element taps are ignored with no sound (the success lock). One correct tap is always enough; no score, streak, or bonus exists. |
| FR-009 | When a distractor element is tapped, the player shall jiggle the tapped element 300 ms, play `sfx_soft_tap` (0.5), and speak the element's teach line naming the tapped element and re-asking the round's question (0.7, one-shot, throttled to one per 1,500 ms — a wrong tap inside the throttle keeps its jiggle but speaks no new teach line); from the round's **second** wrong tap on, the correct element soft-pulses 400 ms. The prompt re-plays (1.0) 800 ms after the teach clip ends (or 1,200 ms after the jiggle when no voice); a correct judgment cancels any pending re-ask. The round stays open until its correct element is tapped; wrong taps never advance, subtract, lock, or end anything. |
| FR-010 | In `activity`, taps are judged at most once per **500 ms**; taps inside the throttle produce no feedback and no sound. A double-tap on a correct element yields exactly one judged tap, one sparkle, one `sfx_ding`, and one round advance; a double-tap on a distractor yields one teach cycle. |
| FR-011 | Input semantics: tap/click only — no drag gestures exist in this entry; the first pointer down wins and additional simultaneous pointers are ignored until release. Hit rects take a **12 px** expansion on all sides; on overlap the element whose center is nearest wins, exact ties resolve to the lowest element index (section 8); a tap >12 px from every element is an empty tap (no state change; idle timer resets). Empty taps include the page margins, the stage around the page, and non-element page art. |
| FR-012 | When no input has occurred for **12 s**: on `title` the Play target hint-pulses and `vo_hint` plays after the first gesture (visual-only before it); in `video` paused, the Play/Pause target pulses and `vo_hint` plays (while the video is playing no hint fires — the moving video is its own cue); in `activity` the current round's correct element pulses and `vo_hint_part` plays; on `endcard` the Replay target pulses and `vo_hint` plays. Each hint lasts 3 s, repeats every 12 s of continued idleness, and is cancelled by any input, including an empty-space tap. |
| FR-013 | After round 5's correct tap the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot), and save `{phase:"activity", roundIndex:4, completed:true}`. After 2500 ms the `endcard` shows the end panel with Replay ≥96×96 CSS px and HOME ≥64×64 CSS px; nothing auto-advances further. |
| FR-014 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves, and returns to `title`. On `title` and `loading` no HOME control is rendered and a HOME input is a no-op (title is home). |
| FR-015 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; releasing early resets the ring to 0 with no action; on completion it clears the save and in-memory progress and plays a ring flash (300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-016 | The entry shall have no fail state: wrong taps, empty taps, rapid or repeated taps, multi-touch, and idle time never deduct, lock, end, or lose progress, and no score, star, streak, or comparison is ever shown. |
| FR-017 | Persistence per section 10: save on title→Play (phase `video`), every activity round entry, completion, and HOME; `updatedAt` refreshes on every save. Play resumes at the saved phase and round (`phase:"activity"` → that `roundIndex`; `phase:"video"` → video chapter 1); when `completed` is true, Play starts at the video (chapter 1). |
| FR-018 | Audio: no audio before the first gesture; one voice clip at a time — any new voice clip (video line, prompt, confirmation, teach, hint, praise) cancels the previous utterance; sfx may overlap each other; optional `music_title` loops at 0.15 on `title` only and stops at Play; while a 0.7-volume teach voice plays, the melody bus ducks 0.5→0.4 within 120 ms and restores over 200 ms. |
| FR-019 | Degradation: no speech synthesis → the video clock, beats, and highlights run unchanged with no voice; activity prompts are carried by their question pictograms alone (96×96; 80×80 at 768–1023 px); a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. Missing visual asset → draw a stub shape, log a warning, keep playing. |
| FR-020 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the current line and enter `video` paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return the open round's prompt re-plays once (1.0). Idle time counts visible time only; throttled timers may delay hints or advances but never lose progress (A6). |
| FR-021 | Accessibility and text: every interactive element (logo, Play, Play/Pause, Replay, HOME, each page element, end-card Replay) carries an invisible accessible name (section 7). Visible text is content only: the example book's title "The Red Ball" printed on the closed cover in chapter 1 (beats 600–2000; ≥40 px at the 1280×720 stage); question pictograms, page art, and chrome are graphics. Every round is answerable from voice + pictogram alone. Focus indicator: 4 px outline, ≥3:1 contrast. |
| FR-022 | Unknown events and inputs (unlisted keys, extra pointers after the first, taps on non-element art) shall be ignored (no state change, no sound). Chapter order, round order, and content are fixed; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank warm-paper scene | initial; preload art and audio; audio locked |
| `title` | decorative open-book scene + floating question pictograms + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `video(chapter, playback)` | animated book stage + HOME, Play/Pause, Replay, 3 dots | chapter 1–3; playback ∈ {playing, paused}; 1200 ms gaps between chapters |
| `activity(roundIndex)` | page card + question pictogram + 3 elements + HOME | roundIndex 0–4; engine state `video`/`activity` is what the save records |
| `celebrating` | frozen round 5 page + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; stop `music_title`; save phase `video` |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` / Space | outside 300 ms throttle | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / R | outside 500 ms throttle | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter `video`; after the post-video gap → `activity(0)` | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line; freeze clock (FR-020) |
| `activity` | `CORRECT_TAP` | outside the 500 ms judge throttle and the success lock | `activity(roundIndex+1)`; after round 5 → `celebrating` | actions: FR-008; save roundIndex; round 5 saves `completed` (FR-013) |
| `activity` | `WRONG_TAP` | outside the 500 ms judge throttle and the success lock | `activity(same)` | actions: FR-009 |
| `title` / `video` paused / `activity` / `endcard` | `IDLE_12S` | visible, no input 12 s | same state | actions: FR-012 hint |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | actions: FR-020 |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: save already done at FR-013 entry |
| `endcard` | `REPLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; `completed` clears on the next save (FR-017) |
| `video` / `activity` / `celebrating` / `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — logo (reset) → Play; `video` — HOME → Play/Pause → Replay; `activity` — HOME → elements in index order (lowest index first, section 8); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play | tap the Play target | Tab to Play + Enter/Space |
| Pause / resume | tap the Play/Pause target | Space (no control focused), or Enter/Space on the focused target |
| Replay chapter | tap the Replay target | R, or Enter/Space on the focused target |
| Answer a round | tap the page element that answers | Tab to the element + Enter/Space |
| Replay the activity | tap Replay on the endcard | Enter/Space on the focused Replay |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** activity elements ≥96×96 CSS px at ≥1024 px wide and ≥80×80 at 768–1023 px (drawn zones are larger, section 8); end-card Replay ≥96×96; title Play ≥96×96; HOME, Play/Pause, Replay, and the logo ≥64×64 — all above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance and multi-touch:** 12 px expansion per FR-011; ties resolve to the nearest center, then the lowest element index; >12 px from every element is an empty tap (nothing changes; the idle timer resets); the first pointer down wins and extra simultaneous pointers are ignored until release. No drag gestures exist, so no drag alternative is required. Activity taps (FR-010) and Play/Pause/Replay (300/500 ms) are throttled.
- **Instructions without reading:** every prompt is voice + a 96×96 question pictogram (face = who, box = what, pin = where); chrome is pictogram + invisible name. Visible text is limited to FR-021 content.
- **Accessible names:** invisible names on every interactive element, e.g. "Play", "Pause", "Resume", "Replay chapter 2", "Home", "Reset saved progress (hold 3 seconds)", "Play again", and the round elements "Nia", "Luna the dog", "Pip the bird", "The apples", "The basket", "Mango the cat", "The tree", "The bench", "The pond", "The red ball", "The bone", "Nia's hat", "Grandpa".
- **Resize:** viewport resize or rotation mid-video or mid-round reflows per section 8, preserving state, progress, and the frozen `videoMs`.

## 8. Levels and content data

**Video storyboard (original, programmatic animation; all copy is original).** Stage 1280×720; the book
sits centered; beat offsets are chapter-relative and each voice clip has a cap so it never crosses the
next beat or the chapter end. Video clock = 0 at Play: chapter 1 (2,000–15,000, 13,000 ms) — you can ask
questions while you read; chapter 2 (16,200–30,200, 14,000 ms) — ask who, then ask what; chapter 3
(31,400–44,400, 13,000 ms) — ask where, then all three; 1,200 ms gaps between chapters, then the
post-video gap (44,400–45,600) leads to round 1.

| Ch | Beat at (ms) | Visual | Audio (key — volume — behavior, copy, cap) |
|---|---|---|---|
| 1 | 0 | stage fades in 300 ms; closed book pops in at 600 (pop 300 ms); cover shows "The Red Ball" | none |
| 1 | 2,000 | book opens to page 1 spread (slide 400 ms) | `sfx_soft_tap` — 0.5 — one-shot |
| 1 | 2,400 | page-1 spread holds | `vo_ch1_a` — 0.7 — one-shot: "When you read, you can ask questions." (≤2.8 s) |
| 1 | 6,800 | three question pictograms pop in above the spread, 700 ms apart (who, what, where; 64×64 px each) | `sfx_soft_tap` — 0.5 — one-shot per pictogram; `vo_ch1_b` at 7,200 — 0.7 — one-shot: "Ask who, what, and where." (≤2.4 s) |
| 1 | 10,400 | the three pictograms soft-pulse once | `vo_ch1_c` — 0.7 — one-shot: "Questions help you look closely." (≤2.4 s) |
| 2 | 0 | page-1 spread holds | none |
| 2 | 1,400 | who pictogram pops (200 ms); highlight settles on Nia at 1,600 (≤120 ms) and holds | `vo_ch2_a` at 1,600 — 0.7 — one-shot: "Let's ask who." (≤1.6 s) |
| 2 | 3,200 | Nia keeps the highlight; the red ball sits inside her zone | `vo_ch2_b` — 0.7 — one-shot: "Who is holding the ball? Nia!" (≤3.0 s) |
| 2 | 7,000 | page turn to page 2 (slide 400 ms) | `sfx_soft_tap` — 0.5 — one-shot |
| 2 | 8,800 | what pictogram pops (200 ms); highlight settles on the apples at 9,000 (≤120 ms) and holds | `vo_ch2_c` at 9,000 — 0.7 — one-shot: "Let's ask what." (≤1.6 s) |
| 2 | 10,600 | apples keep the highlight; the basket is around them | `vo_ch2_d` — 0.7 — one-shot: "What is in the basket? Apples!" (≤2.8 s) |
| 2 | 13,400 | who and what pictograms fill (accent fill over 200 ms) | `sfx_soft_tap` — 0.5 — one-shot |
| 3 | 0 | page turn to page 3 (slide 400 ms) | `sfx_soft_tap` at 200 — 0.5 — one-shot |
| 3 | 1,400 | where pictogram pops (200 ms); highlight settles on the bench, the ball beneath it, at 1,600 (≤120 ms) and holds | `vo_ch3_a` at 1,600 — 0.7 — one-shot: "Let's ask where." (≤1.6 s) |
| 3 | 3,200 | bench keeps the highlight | `vo_ch3_b` — 0.7 — one-shot: "Where did the ball roll? Under the bench!" (≤3.2 s) |
| 3 | 7,400 | the three pictograms fill left→right (accent fill over 200 ms each, 200 ms stagger) | `sfx_chime` — 0.8 — one-shot; `vo_ch3_c` at 7,600 — 0.7 — one-shot: "Who, what, where — you can ask on every page." (≤3.6 s) |
| 3 | 12,000 | the spread turns to `spread_blank` (a big question-mark; slide 400 ms) | none |

**Activity pages and elements.** Every page shows one story page as a card; the three elements are the
only tappable art; element ids are stable judgment keys; index order is left→right, then topmost.

| Page | Story page | Elements (index order) | Art guidance |
|---|---|---|---|
| `pg_yard` | 1 | 0 `el_luna_1` (dog) · 1 `el_nia_1` (child, holds the red ball) · 2 `el_pip_1` (bird) | sunny yard; Nia kneels center holding the red ball at chest height inside her zone; Luna sits at x 0.26; fence with Pip at x 0.78; flat rounded linework |
| `pg_snack` | 2 | 0 `el_apples_2` (three red apples) · 1 `el_basket_2` (woven basket) · 2 `el_mango_2` (cat) | rug and picnic; basket center with apples visible above the rim; Mango dozing at x 0.78; apples sit inside the basket's outline (nested zones, target rule below) |
| `pg_park` | 3 | 0 `el_tree_3` (tall tree) · 1 `el_bench_3` (park bench, ball beneath) · 2 `el_pond_3` (round pond) | park path; red ball under the bench at x 0.50; tree x 0.22; pond x 0.78; no printed words |
| `pg_dogball` | 4 | 0 `el_bone_4` (bone) · 1 `el_ball_4` (red ball, in Luna's mouth) · 2 `el_hat_4` (hat on a bench) | Luna trots at center with the ball in her mouth; bone lower-left x 0.22; Nia's hat on a bench at x 0.78; Luna's body is scene, not an element |
| `pg_porch` | 5 | 0 `el_nia_5` (child) · 1 `el_grandpa_5` (grandpa) · 2 `el_luna_5` (dog, asleep) | porch at dusk; Luna curled asleep on a mat at x 0.58; Nia x 0.26 and Grandpa x 0.40 sit on the step; red ball beside the mat (scene) |

**Rounds (fixed order; prompts ≤3.5 s; each round has exactly 3 elements).**

| # | Page | Prompt (`vo_q_n`, 1.0) | Correct (id) | Distractors (ids) | Prompt pictogram |
|---|---|---|---|---|---|
| 1 | `pg_yard` | "Who is holding the ball?" | `el_nia_1` | `el_luna_1`, `el_pip_1` | `pict_q_who` |
| 2 | `pg_snack` | "What is in the basket?" | `el_apples_2` | `el_basket_2`, `el_mango_2` | `pict_q_what` |
| 3 | `pg_park` | "Where did the ball roll?" | `el_bench_3` | `el_tree_3`, `el_pond_3` | `pict_q_where` |
| 4 | `pg_dogball` | "What is Luna carrying?" | `el_ball_4` | `el_bone_4`, `el_hat_4` | `pict_q_what` |
| 5 | `pg_porch` | "Who is sleeping?" | `el_luna_5` | `el_nia_5`, `el_grandpa_5` | `pict_q_who` |

| # | Teach line for a tapped distractor (`vo_try_n_{id}`, 0.7, one-shot, ≤3.5 s) |
|---|---|
| 1 | `el_luna_1` → "That's Luna the dog. Who is holding the ball?" · `el_pip_1` → "That's Pip the bird. Who is holding the ball?" |
| 2 | `el_basket_2` → "That's the basket. What is in the basket?" · `el_mango_2` → "That's Mango the cat. What is in the basket?" |
| 3 | `el_tree_3` → "That's the tree. Where did the ball roll?" · `el_pond_3` → "That's the pond. Where did the ball roll?" |
| 4 | `el_bone_4` → "That's a bone. What is Luna carrying?" · `el_hat_4` → "That's Nia's hat. What is Luna carrying?" |
| 5 | `el_nia_5` → "That's Nia. Who is sleeping?" · `el_grandpa_5` → "That's Grandpa. Who is sleeping?" |

- **Copy (`vo_yes_n`, `vo_hint`, `vo_hint_part`, `vo_praise`; all one-shot):** confirmations 0.7 —
  1 "Yes! Nia is holding the ball." · 2 "Yes! The apples are in the basket." · 3 "Yes! The ball rolled
  under the bench." · 4 "Yes! Luna is carrying the red ball." · 5 "Yes! Luna the dog is sleeping."
  (≤3.5 s each); hints 1.0 — `vo_hint` "Tap the pulsing button to keep going." / `vo_hint_part` "Tap
  the part of the page that answers the question." (≤2.8 s each); praise 1.0 — `vo_praise` "You asked
  questions and found the answers. Great reading!" (≤3.2 s).
- **Target rule:** each element is a drawn zone ≥180×180 px at ≥1024 px wide (≥150×150 at 768–1023 px),
  including the apples nested inside the basket, plus the 12 px expansion (FR-011); zones are separated
  by ≥32 px except round 2's nesting, where the apples' zone (index 0) is drawn concentric with the
  basket's zone (index 1) and the basket's zone is drawn ≥48 px larger in each dimension (e.g. apples
  ≥180×180 and basket ≥228×228 at ≥1024 px; apples ≥150×150 and basket ≥198×198 at 768–1023 px),
  leaving a ≥12 px exposed rim/handle band beyond the apples' 12 px expansion: a tap in the shared
  overlap is an exact center tie and resolves to the apples by the lowest index, and a tap in the
  exposed band judges the basket.
- **Worked example (round 2, one wrong tap then correct):** entry at 0 — page fades 300 ms, pictogram pops
  200 ms, `vo_q_2` at 400, save roundIndex 1. At 2,400 the basket rim is tapped: jiggle 300 ms,
  `sfx_soft_tap`, teach 0.7 from ≈2,400 to ≈4,800, prompt re-plays at 5,600. At 7,000 the apples are
  tapped: sparkle ≤6, `sfx_ding` 0.8, confirmation ends ≈9,400; round 3 entry at 10,000, save roundIndex 2.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; page card up to 560×700 px
  centered under the chrome, scaled down to fit the stage; elements ≥180×180 px; prompt pictogram
  96×96 centered 24 px under the chrome; video stage 1280×720 scaled to fit; chapter dots 12 px. At
  768–1023 px — chrome 88 px; card up to 480×600 px; elements ≥150×150; pictogram 80×80. Height
  ≥700 px; below that scale the field by 0.85 keeping every element ≥96 px and every control ≥64 px.
- **Progression rule:** fixed video 1→3, then fixed rounds 1→5; nothing locks, randomizes, or adapts, success is the only advance condition, and the video always plays before round 1 on a fresh or completed run.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video beat / chapter change (section 8) | beat's visual event; highlight appears ≤120 ms; chapter change = 300 ms fade out, 600 ms hold, 300 ms fade in, dot fill | beat's key — 0.7 or 0.5/0.8 sfx — one-shot; none on chapter change |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Correct element tap | sparkle ≤6 particles on the element; highlight holds | `sfx_ding` — 0.8 — one-shot (300 ms throttle); confirmation — 0.7 — one-shot |
| Wrong element tap | tapped element jiggles 300 ms; from the 2nd wrong in the round the correct element soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach — 0.7 — one-shot (1,500 ms throttle; duck) |
| Round prompt | page fades in 300 ms; pictogram pops 200 ms | `vo_q_n` — 1.0 — one-shot at round +400 ms |
| Round 5 correct | confetti ≤40 particles, 2500 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3 s | `vo_hint` / `vo_hint_part` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only |

**Effect definitions (no undefined effects):** *highlight* = 6 px dashed accent outline around the
element's zone plus 25% accent fill, appears in ≤120 ms, no motion, holds until the next beat or round
advance. *pop* = scale 0→1.08→1 over 300 ms (200 ms for question pictograms, FR-007). *soft pulse* =
scale 1→1.05→1 over 400 ms, one cycle. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3000 ms.
*jiggle* = rotate −4°→+4°→0 over 300 ms. *depress* = scale 1→0.95→1
over 80 ms. *sparkle* = ≤6 star particles, 4 px, radiating ≤48 px over 400 ms. *confetti* = ≤40 rect
particles falling ≤160 px over 2500 ms. *fade* = opacity 0→1 or 1→0 over 300 ms. *slide* (page turn) =
page content translate-x 24 px→0 with opacity 0→1 over 400 ms. *fill* (question pictogram) = accent fill
plus check mark over 200 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold.
*ring flash* = ring opacity 1→0 over 300 ms. *end panel* = centered paper panel (≤420×300 px, fill
`#FFFDF7`, 4 px `#3A2E24` border, 24 px radius) fading in over 300 ms. *duck* = melody bus 0.5→0.4 within
120 ms while a 0.7-volume teach voice plays, restore over 200 ms. *chapter dot fill* = dot switches to accent
over 100 ms, no motion.

**Voice copy (designed, fixed):** the section 8 tables and lists carry all video, prompt, confirmation,
teach, hint, and praise copy; voice timbre and TTS engine are build freedom. **Audio rules (v1):** no
audio before the first gesture (FR-018); one voice at a time — each new voice cancels the previous
utterance; sfx may overlap; `music_title` optional at 0.15 on `title` only. Degradation per FR-019;
background-tab behavior per FR-020 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key
  `spec.bookBasics.askWhileYouRead.v1`. **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** title→Play (phase `video`, roundIndex 0), every round entry (phase `activity`, that
  `roundIndex`), completion (FR-013, `completed:true`), and HOME; `updatedAt` refreshes on every save.
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round directly
  (the video is not replayed); `phase:"video"` opens chapter 1; `completed:true` starts the video (FR-017).
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-015).
- **Deliberately not stored:** `videoMs` and clock position, chapter position, wrong-tap counts, tap history, judgments, audio or language settings, sparkle/confetti counts, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech suspended (FR-020);
  storage blocked → run unsaved (FR-019).

## 11. Assets

All assets are **original**; nothing copied from Khan Academy, and no Khan Academy media or characters
appear. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | decorative title scene: open book with a face, a box, and a map-pin pictogram floating above it | 1280×720 SVG | static | SVG shapes |
| `book_closed` | image | closed book; cover carries the title "The Red Ball" as content | 640×480 SVG | static | SVG shapes + text |
| `page_1` … `page_5` | image | the five story pages per section 8 art guidance; no printed words | 560×700 SVG each | static | SVG shapes |
| `spread_blank` | image | open spread with one large question-mark glyph (chapter 3 close) | 1024×560 SVG | static | SVG shapes |
| `pict_q_who` / `pict_q_what` / `pict_q_where` | image | face; box; map pin | 96×96 SVG each (drawn 64×64 in the video pictogram row) | static; pop/fill/soft-pulse per section 8 | SVG paths |
| `pict_play` / `pict_pause` / `pict_replay` / `pict_home` | image | triangle; bars; circular restart arrow; house | 64×64 SVG each (Play and end-card Replay at 96×96) | static | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech is missing | SVG path |
| `ring` | image | 4 px accent progress ring for the reset hold | 96×96 SVG | during hold | SVG shape |
| `sparkle` / `confetti` | rendered | 4-point star particle; rect particle | runtime | one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_ding` / `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot (ding 300 ms throttle) | WebAudio blips/tones |
| `vo_ch1_*` / `vo_ch2_*` / `vo_ch3_*` | audio | 10 video lines with caps, section 8 | ≤3.6 s each | one-shot | TTS allowed |
| `vo_q_1..5` / `vo_yes_1..5` / `vo_try_*` / `vo_hint` / `vo_hint_part` / `vo_praise` | audio | activity, hint, and praise copy in section 8; `vo_try_*` has 2 variants per round (10 clips) | ≤3.5 s (prompts, confirmations, teach); ≤3.2 s (praise); ≤2.8 s (hints) | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, ball red `#D9382C`, leaf `#7FB069`, sky `#BFE3F0`, pages/chrome `#FFFDF7`, highlight `#FFD166`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); the only visible words, "The Red Ball", are ≥40 px on the closed cover.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, timeline and behavior unchanged (FR-003, R-005).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` / `Beat` | `Chapter`: `index: 1-3`, `startMs/endMs` (video clock), `beats: Beat[]`; `Beat`: `atMs` (chapter-relative), `visual`, `audioKey: string \| null`, `volume`, `behavior: "one-shot"` |
| `Page` / `Element` | `Page`: `key`, `storyPage: int 1-5`, `artKey`, `elements: Element[3]` (index order); `Element`: `id`, `role: "who" \| "what" \| "where"`, `zone: {x, y, w, h}` (card-relative), `label` (accessible name) |
| `Round` | `index: 0-4`; `pageKey: string`; `question: "who" \| "what" \| "where"`; `promptKey/promptCopy: string`; `promptPict: string`; `correct: ElementId`; `distractors: ElementId[]`; `confirmKey: string`; `tryKeys: { [ElementId]: string }` |
| `Save` (persisted) | `phase: "video" \| "activity"`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `wrongInRound: int`; `judgeLock: bool`; `successLock: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Beat`, `Page`, `Element`, and `Round` records are static; the timeline is computed from
`startMs`/`atMs`, never wall-clock. Round judgment reads only `Round.correct` and `Round.distractors`.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector page art, per-element hit rects, a highlight overlay, and a single clock driving the video timeline.
- **R-002** The player shall animate the section 9 effects: highlight, pop, soft/hint pulses, jiggle, depress, fade, slide, fill, sparkle, confetti, ring fill/flash, chapter dot fill, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test per FR-011 with 12 px expansion, nearest-center resolution, and single-pointer semantics; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all interactive elements — Space = Play/Pause, R = Replay, Escape = HOME — and expose an invisible accessible name on each (FR-021).
- **R-005** The player shall play one voice clip at a time with sfx overlap and the FR-018 ducking rule; a failed clip is skipped without blocking the timeline.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis or provided clips for all lines, prompts, teach lines, hints, and praise, with the FR-019 no-speech fallback.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-019), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during video animation, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing phase, round, `videoMs`, playback, or progress.
- **R-011** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss, no timeline desync (FR-020), and hints may fire late.
- **R-012** Each chapter shall be renderable at runtime from `Chapter`/`Beat` data; a pre-rendered file is acceptable only if it matches the same section 8 timings.
- **R-013** The player shall request no camera, microphone, or network access at runtime.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥96 px) and the logo (≥64 px), and no audio has played |
| AC-02 | `title` with no save or `completed:true` | Play is pressed | a 2000 ms lead-in runs, chapter 1 starts at 2000 ms, its first line plays at 4400 ms from Play, and the save records phase `video` |
| AC-03 | the video playing | the clock runs with no input | chapters change at 15,000/16,200/30,200/31,400/44,400 ms, the dot fills at each change, chapter 2's who line plays at 17,800 ms, and the round 1 prompt plays at 46,000 ms |
| AC-04 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops and animation freezes; Play replays that line from its start and no line is skipped |
| AC-05 | chapter 3 playing | Replay is pressed | chapter 3 restarts at 31,400 ms and its beats re-fire in order |
| AC-06 | round 1 (`pg_yard`) | Nia is tapped | a sparkle and `sfx_ding` play, "Yes! Nia is holding the ball." is spoken, and round 2 starts 600 ms after the clip ends with roundIndex 1 saved |
| AC-07 | round 1 (`pg_yard`) | Luna the dog is tapped | Luna jiggles 300 ms, `sfx_soft_tap` plays, "That's Luna the dog. Who is holding the ball?" is spoken, the prompt re-plays 800 ms later, and no round advance occurs; a second wrong tap in the round makes Nia soft-pulse 400 ms |
| AC-08 | round 3 (`pg_park`) | the bench is double-tapped within 500 ms | exactly one judged correct tap, one sparkle, one `sfx_ding`, and one round advance occur |
| AC-09 | round 1 | a first finger holds Luna and a second finger taps Nia before release | only Luna's teach cycle runs; Nia shows no feedback of any kind |
| AC-10 | any round | empty space >12 px from every element is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-11 | `title`, no gesture yet | 12 s pass | Play hint-pulses for 3 s with no sound; after any gesture the hint also plays `vo_hint` |
| AC-12 | round 4 open, 12 s without input | idleness continues | the ball element hint-pulses 3 s and `vo_hint_part` plays; any tap resets the timer and the hint repeats 12 s later |
| AC-13 | the video paused, 12 s without input | idleness continues | Play/Pause hint-pulses 3 s with `vo_hint`; while the video is playing no hint fires |
| AC-14 | a save `{phase:"activity", roundIndex:2}` | the page reloads and Play is pressed | round 3's page and prompt appear directly; the video is not replayed |
| AC-15 | a save with `completed:true` | the page reloads and Play is pressed | chapter 1 of the video starts |
| AC-16 | round 3 open | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload round 3's prompt plays |
| AC-17 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-18 | round 5 answered correctly | the celebration runs | confetti (≤40, 2500 ms), `sfx_chime`, and "You asked questions and found the answers. Great reading!" play; after 2500 ms the end panel shows Replay (≥96 px) and HOME |
| AC-19 | the end card showing | Replay is pressed | chapter 1 of the video starts with its 2000 ms lead-in, and `completed` clears on the next save |
| AC-20 | speech synthesis unavailable | Play is pressed and a round is played | no voice plays, the video beats and round pictograms still carry every step, correct taps still sparkle and advance, and the muted-speaker pictogram shows 5 s |
| AC-21 | storage blocked | the entry is played and HOME is pressed | all behavior works in memory; after reload Play starts the video |
| AC-22 | round 2 (`pg_snack`) | the basket rim is tapped, then the apples are tapped | the rim tap teaches "That's the basket…" and the apple tap is judged correct; the round never advances on the rim tap |
| AC-23 | the video playing or a round open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen (or the open round's prompt re-plays once) and no progress is lost |
| AC-24 | any state | Tab is pressed repeatedly | focus follows the section 6 tab order, Enter/Space activates each control, Escape returns HOME, and each focused control shows a 4 px focus outline (≥3:1 contrast) and exposes an accessible name |
| AC-25 | any state | many wrong taps, idle time, an unlisted key (e.g. Z), or a tap on non-element art occur | no score, star, or streak ever appears, no input deducts or ends play, and unknown inputs change nothing on screen or in audio |
| AC-26 | round 1 | the teach line is still playing when Nia is tapped | the teach clip stops immediately and only "Yes! Nia is holding the ball." is heard |
| AC-27 | a round open at 1024×768 | the viewport is resized to 800×1000 | phase, round, `videoMs`, and progress are unchanged and every element remains ≥80 px |
| AC-28 | the video playing | Play/Pause is double-tapped within 300 ms | exactly one toggle occurs (the voice stops and the clock freezes) and the second tap is ignored with no sound |
| AC-29 | chapter 2 playing mid-line | Replay is double-tapped within 500 ms | the voice stops and chapter 2 restarts exactly once at 16,200 ms, with the second tap ignored and no sound |
| AC-30 | round 3 (`pg_park`) open | the bench is tapped, then tapped again 700 ms later while the confirmation plays | the second tap is ignored with no sound; exactly one sparkle, one `sfx_ding`, and one round advance occur |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 45.6 s video plays its three chapters at the section 8 timings with pictograms, highlights, gaps, dots, Pause/Resume, and Replay.
3. The five rounds run in order on the five pages; correct taps advance, wrong taps teach and re-ask, and no score appears.
4. Phase and round survive a reload; Play resumes at the saved round (or the video when completed); the reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video topic and script, the five rounds, and the original book are designed inferences from the title; official sources publish no per-video description | designed (O3, D1–D3) |
| A2 | The book *The Red Ball*, its characters, pages, and all art, voice, and copy are original | designed (IP rule) |
| A3 | A runtime-rendered animated video is an acceptable realization; a pre-rendered file must match the section 8 timeline | designed (R-012) |
| A4 | TTS-generated clips or runtime TTS are acceptable | designed |
| A5 | Clip caps and beat offsets approximate child-paced narration | designed (section 8) |
| A6 | Browsers block autoplay until the first gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by FR-018 and FR-020 |
| A7 | A 12 px tap tolerance, ≥96 px elements, a 500 ms judge throttle, and the 4–5 (Preschool–K) targeting inside the official 2–8 range suit ages 2–8 | designed (sections 2, 7) |
| A8 | No unlocks, adaptive difficulty, persisted clock, or round skip | designed (FR-022, section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** chapter script, timings, and highlights; round order, pages, prompts, correct elements,
  distractors, and teach copy; hit tolerance and throttles; chrome set and keyboard map; target
  minimums; save key and shape; no fail state; asset provenance; acceptance criteria.
- **Free:** page composition within the section 8 guidance, easing curves, particle look, voice
  timbre/TTS engine, optional title music, decorative title-scene details.
- **Not in this spec:** library/Videos-tab browsing, the other eight Book Basics entries, profiles,
  navigation shell, parental controls, localization, analytics, scoring, streaks, or teacher tooling.
