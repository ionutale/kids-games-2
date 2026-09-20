# Reading Accuracy (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-reading-accuracy.md`](../book-basics-reading-accuracy.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); series wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233 ("Book Basics" video collection, named titles)
- **Spec status:** v1 — one of nine Book Basics specs; matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-019); no network after load
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: three video chapters replace levels, the five match-the-word / order rounds replace a level set, and the endcard replaces a win condition; no scoring, no fail state.

## 2. Overview and learning objective

A child presses Play and watches a 47.4 s original animated video (43.0 s of chapters) about reading the
words printed on a page, then answers five rounds: four **match-the-word** rounds — the voice says a word,
the child taps the matching printed word among 2–3 word cards — and one **left-to-right order** round on
the sentence "The cat naps." A correct tap sparkles and is read back ("Yes! That says sun."); a wrong tap
is read aloud gently and the prompt repeats, which is itself the lesson. The skill is **word recognition /
print-to-speech matching and left-to-right directionality** — reading accuracy at the word level, the
concept implied by the title. Age band: **4–5 (Preschool–K)** inside the library's official 2–8 range;
expected session **2–3 minutes**. The no-reading tension is deliberate: the printed words are the lesson,
so they are content; every instruction and all feedback reach the child as voice + pictogram, and no
instruction is ever carried by text alone.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Reading Accuracy" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; catalog lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish the video titles only — no per-video descriptions; the focus implied by the title is an inference, and no Book Basics art, audio, or content appears in any surveyed source | official (about the source's limits) | Catalogued entry Notes |
| O4 | The entry is a video in the Library's Videos section; the app is officially for children ages 2–8 (Preschool–2nd Grade) | official | Catalogued entry lines 3–4; `khan-academy-kids-games.md` lines 96, 160–177 |
| D1 | The video topic (reading printed words left to right; hearing and finding a word) and the three-chapter storyboard and script | designed | Inference from the title (O3); no official description exists |
| D2 | The interaction: five rounds — four match-the-word rounds and one left-to-right order round on a 3-word sentence | designed | Shared brief's per-entry concept for this slug |
| D3 | The word set (sun, cat, bus, hat), the sentence "The cat naps.", its picture cues, and all art, voice, and copy | designed | Original content required; no Khan Academy media or characters |
| D4 | Each printed word taught in the video is re-shown as a printed card in the rounds; wrong taps read the tapped word aloud, so every round is completable by cycling and listening | designed | Makes the lesson solvable by a pre-reader without pictures in the match rounds |
| D5 | Player chrome (Play/Pause, Replay, HOME, reset logo, chapter dots), progress save/resume, idle hint, audio rules, no fail state | designed | Template v1 and the Book Basics shared brief |
| D6 | All art, video, voice, music, copy, and layout | designed | IP rule: all assets original (section 11) |

## 4. Player experience / core loop

A child presses the big Play on a title scene. After a 2 s lead-in a page fades in with three printed
word cards — "The cat naps." — and a track dot walks under them, left to right: "We read words from left
to right, one word at a time." The narrator shows sun, cat, and bus cards, each beside its picture, then
hat joins and the four cards light up in a read-together line. Round 1 follows: two word cards appear, a
listen pictogram pops, and "Tap the word sun." The child taps `sun` — sparkle, ding, "Yes! That says
sun." — and four rounds follow (cat, bus, hat) with a wrong-tap teach line that reads the tapped word and
re-asks. The last round is the sentence again: three cards, a track dot on the first word, "Let's read the
sentence. Tap each word from left to right." After the third word, confetti falls, the voice praises, and
the endcard offers Replay or HOME; Play later resumes at the saved phase and round.

**Core loop:** watch three teaching chapters → answer five word rounds (tap the word the voice says; read a
3-word sentence left to right) → hear each tap affirmed or taught → celebrate → replay or go home.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload the scene and audio assets (section 11), then `title`: an original decorative scene (an open book with three floating word cards and a sun picture cue), a Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px (FR-015). No audio plays before the first gesture (FR-018). When Play is pressed, it shall unlock audio and then start fresh or resume: with no save, a `completed:true` save, or a saved `phase:"video"` (FR-017) it shall stop `music_title`, run a 2000 ms lead-in (stage fade 300 ms), start `video` at `videoMs = 0` with chapter 1 at 2000 (FR-002), and save `{phase:"video", roundIndex:0, completed:false}`; with a saved `phase:"activity"`, `completed:false` it shall open that `roundIndex` directly (no lead-in, no video replay; FR-007). |
| FR-002 | While `video` runs, one accumulated playing-time clock (`videoMs`, advanced per frame only while playing and the tab is visible; never wall-clock) shall drive this fixed timeline: lead-in 0–2000; chapter 1 2000–16,000; gap 16,000–17,200; chapter 2 17,200–32,200; gap 32,200–33,400; chapter 3 33,400–47,400; post-video gap 47,400–48,600. At each chapter end the clock shall auto-advance through the 1200 ms gap (chapter art fades out over 300 ms, 600 ms hold, next fades in over 300 ms; the chapter dot fills). After the post-video gap the player shall enter `activity` round 1 at 48,600 and speak its prompt at 49,000 (round +400 ms, FR-007) — no tap needed. Chapters total 43,000 ms; the video segment is 47,400 ms at chapter 3 end. |
| FR-003 | Each chapter shall fire its section 8 beats at the exact chapter-relative offsets: one voice clip per voice beat (volume 0.7, one-shot) with its scripted visual change at the same offset (an underline or highlight appears in ≤100 ms; a track step starts in ≤100 ms). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a beat, chapter, or transition. |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`. Pause shall cancel the current voice line and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current voice beat's start (the voice beat with the greatest chapter-relative offset ≤ the frozen time; before the first voice beat, the first beat with a voice) and re-speak that line, so no line is skipped or left half-heard. Inside a chapter gap or the post-video gap, Resume continues the frozen segment with its remaining time and no voice. Play/Pause is throttled to one toggle per 300 ms; a double-tap toggles once. |
| FR-005 | A Replay target ≥64×64 CSS px shall restart the current chapter: cancel the voice and set `videoMs` to the chapter start (**2000 / 17,200 / 33,400**); the chapter's beats then fire at their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay is throttled to one restart per 500 ms and does not change the save. |
| FR-006 | Chapter dots (3 dots, 12 px, 8 px gaps; current = accent fill over 100 ms, no motion) shall show the current chapter in `video`; they are not interactive and not focusable. |
| FR-007 | The activity shall run **5 fixed rounds** in section 8 order with no randomization. On each round entry the player shall show the round's page and word cards (fade 300 ms), pop the round's prompt pictogram (200 ms), speak the round's prompt at round +400 ms (volume 1.0, one-shot), and save `{phase:"activity", roundIndex, completed:false}`. |
| FR-008 | When the round's correct card is tapped, the player shall judge it correct: sparkle (≤6 particles) on the card, underline the word (holds until the round advances), play `sfx_ding` (0.8, 300 ms throttle), and speak the round's confirmation line (0.7, one-shot); then, **600 ms** after the confirmation clip ends (or 2,600 ms after the judgment when speech is unavailable), start the next round (FR-007) or, after round 5, `celebrating` (FR-013). In round 5 a correct tap is a *step*: steps 1–2 underline the tapped word, move the track dot to the next card, speak the step word (1.0, one-shot), and stay in the round; the third step behaves as a correct tap. One correct tap (or one three-step read) is always enough; no score, streak, or bonus exists. From a correct tap in rounds 1–4 (or the third step in round 5) until the next round begins or `celebrating` starts, all card taps are ignored with no sound (the success lock); round-5 steps 1–2 stay tappable. |
| FR-009 | When a distractor card is tapped, the player shall jiggle the tapped card 300 ms, play `sfx_soft_tap` (0.5), and speak that card's teach line, which reads the tapped word aloud and re-asks (0.7, one-shot, throttled to one per 1200 ms — a wrong tap inside the throttle keeps its jiggle but speaks no new teach line). From the round's **second** wrong tap on, the correct card soft-pulses 400 ms. In round 5, tapping a card that is not the expected next word (including an already-read card) is a wrong tap with its section 8 teach line. The prompt re-plays (1.0) 800 ms after the teach clip ends (or 1200 ms after the jiggle when no voice). The round stays open until it is read correctly; wrong taps never advance, subtract, lock, or end anything. |
| FR-010 | In `activity`, card taps are judged at most once per **500 ms**; taps inside the throttle or the success lock (FR-008) produce no feedback and no sound. A double-tap on a correct card yields exactly one judged tap, one sparkle, one `sfx_ding`, and one advance; a double-tap on a distractor yields one teach cycle. |
| FR-011 | Input semantics: tap/click only — no drag gestures exist in this entry; the first pointer down wins and additional simultaneous pointers are ignored until release. Hit rects take a **12 px** expansion on all sides; on overlap the card whose center is nearest wins, exact ties resolve to the lowest card index (section 8, left→right); a tap >12 px from every card is an empty tap (no state change; idle timer resets). Empty taps include the page backdrop and the stage around the cards. |
| FR-012 | When no input has occurred for **12 s**: on `title` the Play target hint-pulses and `vo_hint` plays after the first gesture (visual-only before it); in `video` paused, the Play/Pause target pulses and `vo_hint` plays (while the video plays, no hint fires — the moving video is its own cue); in `activity` the correct or expected-next card pulses and `vo_hint_word` plays; on `endcard` the Replay target pulses and `vo_hint` plays. Each hint lasts 3 s, repeats every 12 s of continued idleness, and is cancelled by any input, including an empty-space tap. |
| FR-013 | After round 5's third step resolves (its confirmation ends + 600 ms, FR-008) the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot), and save `{phase:"activity", roundIndex:4, completed:true}`. After 2500 ms the `endcard` shows the end panel with Replay ≥96×96 CSS px and HOME ≥64×64 CSS px; nothing auto-advances further. |
| FR-014 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves, and returns to `title`. On `title` and `loading` no HOME control is rendered and a HOME input is a no-op (title is home). |
| FR-015 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; releasing early resets the ring to 0 with no action; on completion it clears the save and in-memory progress and plays a ring flash (300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-016 | The entry shall have no fail state: wrong taps, empty taps, rapid or repeated taps, multi-touch, and idle time never deduct, block play, end, or lose progress, and no score, star, streak, or comparison is ever shown. |
| FR-017 | Persistence per section 10: save on title→Play (phase `video`), every activity round entry, completion, and HOME; `updatedAt` refreshes on every save. Only completion (FR-013) writes `completed:true`; FR-001's fresh start and FR-007's round entries write `completed:false`; the HOME save preserves the current values. Play resumes at the saved phase and round (`phase:"activity"` → that `roundIndex`; `phase:"video"` → video chapter 1); when `completed` is true, Play starts at the video (chapter 1). |
| FR-018 | Audio: no audio before the first gesture; one voice clip at a time — any new voice clip (video line, prompt, step word, confirmation, teach, hint, praise) cancels the previous utterance; sfx may overlap each other; optional `music_title` loops at 0.15 on `title` only and stops at Play; while a 0.7-volume voice plays, the melody bus ducks 0.5→0.4 within 120 ms and restores over 200 ms. |
| FR-019 | Degradation: no speech synthesis → the video clock, beats, and underlines run unchanged with no voice; activity prompts become visual-only — the prompt pictogram slot shows the round's target picture cue (`pict_cue_{word}`) and every card in a match round shows its own 48×48 picture cue above its word, so match rounds are playable by picture pairing; round 5 shows `pict_prompt_order` with the expected-next card soft-pulsing while unread. A muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. Missing visual asset → draw a stub shape, log a warning, keep playing. |
| FR-020 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the current line and enter `video` paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return an unanswered round's prompt re-plays once (1.0) and an answered round's pending advance fires. Idle time counts visible time only; throttled timers may delay hints or advances but never lose progress (A6). |
| FR-021 | Accessibility and text: every interactive element (logo, Play, Play/Pause, Replay, HOME, every word card, end-card Replay) carries an invisible accessible name (section 7). Visible text is content only: the printed words taught and tested — `sun`, `cat`, `bus`, `hat`, `The`, `naps` — and the sentence "The cat naps." (≥72 px at ≥1024 px wide); a word card's accessible name names its printed word (section 7, e.g. "Word: sun"), which is the element's content, not a hint. Pictograms, the track dot, chapter dots, and chrome are graphics. Every round is answerable from voice + pictogram alone; focus indicator 4 px outline, ≥3:1 contrast. |
| FR-022 | Unknown events and inputs (unlisted keys, extra pointers after the first, taps on non-card art) shall be ignored (no state change, no sound). Chapter order, round order, card order, and content are fixed; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank warm-paper scene | initial; preload art and audio; audio locked |
| `title` | decorative open-book scene + floating word cards + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `video(chapter, playback)` | animated page stage + HOME, Play/Pause, Replay, 3 dots | chapter 1–3; playback ∈ {playing, paused}; 1200 ms gaps between chapters |
| `activity(roundIndex, stepIndex)` | page backdrop + 2–3 word cards + prompt pictogram + HOME | roundIndex 0–4; stepIndex 0–2 is used by round 5 (match rounds keep stepIndex 0); the save records roundIndex only |
| `celebrating` | frozen round 5 sentence + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | no save, `completed:true`, or save phase `video` | `video(1, playing)` | actions: 2000 ms lead-in; stop `music_title`; save `{phase:"video", roundIndex:0, completed:false}` |
| `title` | `PLAY_PRESSED` | save `{phase:"activity", completed:false}` | `activity(roundIndex, 0)` | actions: open that round and speak its prompt (FR-007); no lead-in |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` / Space | outside 300 ms throttle | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / R | outside 500 ms throttle | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter `video`; after the post-video gap → `activity(0)` | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line; freeze clock (FR-020) |
| `activity` | `STEP_TAP` | round 5, expected card, outside 500 ms throttle | `activity(4, stepIndex+1)`; step 3 → `celebrating` | actions: FR-008 step rules; step 3 saves `completed` (FR-013) |
| `activity` | `CORRECT_TAP` | round 1–4, outside 500 ms throttle and the success lock (FR-008) | `activity(roundIndex+1)`; after round 4 → `activity(4, 0)` | actions: FR-008; save roundIndex |
| `activity` | `WRONG_TAP` | outside 500 ms throttle and the success lock (FR-008) | `activity(same)` | actions: FR-009 |
| `title` / `video` (paused) / `activity` / `endcard` | `IDLE_12S` | visible, no input 12 s | same state | actions: FR-012 hint; no hint while `video` plays |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | actions: FR-020 |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: save already done at FR-013 entry |
| `endcard` | `REPLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; `completed` stays set until a fresh start or round entry writes `false` (FR-017) |
| `video` / `activity` / `celebrating` / `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — logo (reset) → Play; `video` — HOME → Play/Pause → Replay; `activity` — HOME → cards in index order (left→right, section 8; round 5 reads `The` → `cat` → `naps`); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play | tap the Play target | Tab to Play + Enter/Space |
| Pause / resume | tap the Play/Pause target | Space (no control focused), or Enter/Space on the focused target |
| Replay chapter | tap the Replay target | R, or Enter/Space on the focused target |
| Answer a round | tap the card the voice names (round 5: tap the cards left to right) | Tab to the card + Enter/Space |
| Replay the activity | tap Replay on the endcard | Enter/Space on the focused Replay |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas and tolerance:** word cards ≥240×160 CSS px at ≥1024 px wide and ≥200×132 px at 768–1023 px (each card is one target, well above the ≥96/≥80 minimum); end-card Replay ≥96×96; Play on title ≥96×96; HOME, Play/Pause, Replay, reset logo ≥64×64 — all above the 44 px platform minimum. Focus indicator: 4 px outline, ≥3:1 contrast. Mis-taps use the 12 px rule (FR-011): nearest center wins, exact ties to the lowest card index (left→right); >12 px from every card is an empty tap (nothing changes; idle resets).
- **Multi-touch, throttles, resize:** first pointer down wins; extra simultaneous pointers are ignored until release; no drag gesture exists, so no drag alternative is required. Card taps are judged at most once per 500 ms (FR-010); Play/Pause 300 ms and Replay 500 ms. Viewport resize or rotation mid-video or mid-round reflows per section 8, preserving phase, chapter time, round, step, and progress.
- **Instructions without reading:** every round's prompt is voice + a 96×96 pictogram (a listen pictogram for rounds 1–4, a left-to-right arrow for round 5); feedback is voice; the page backdrop, cards, track dot, and chapter dots carry the rest. The printed words are content, never instructions (FR-021, A4).
- **Accessible names:** invisible names on every interactive element: "Play", "Pause", "Resume", "Replay chapter 2", "Home", "Reset saved progress (hold 3 seconds)", "Word: sun", "Word: cat", "Word: bus", "Word: hat", "Word: The", "Word: naps", "Play again".

## 8. Levels and content data

**Video chapters (designed; `videoMs` counts from Play and includes the 2000 ms lead-in; wall clock = Play + `videoMs`).** Chapter durations sum to 43,000 ms; + 2 × 1200 ms gaps = 45,400 ms at chapter 3 end; + 2000 ms lead-in = 47,400 ms video segment. After the final 1200 ms gap, round 1 enters at 48,600 and its prompt plays at 49,000.

| Ch | Focus | `videoMs` span (ms) | Duration (ms) |
|---|---|---|---|
| 1 | A page; words are printed; read left to right | 2000–16,000 | 14,000 |
| — | gap | 16,000–17,200 | 1,200 |
| 2 | sun, cat, bus: each word beside its picture | 17,200–32,200 | 15,000 |
| — | gap | 32,200–33,400 | 1,200 |
| 3 | hat joins; read-together line; hand-off | 33,400–47,400 | 14,000 |

| Ch | Beat at (ms, chapter-relative) | Visual | Audio (key — volume — behavior) |
|---|---|---|---|
| 1 | 0 | page fades in 300 ms; three word cards (`The`, `cat`, `naps`) pop in at 600/900/1200 ms (pop 200 ms), left→right | `vo_v1_1` — 0.7 — one-shot: "This is a page. Words are printed on it." (≤3.6 s) |
| 1 | 4,400 | track dot appears under card 1 and steps right at 4,400 → 5,600 → 6,800 ms; each word underlines as the dot arrives (≤100 ms) | `vo_v1_2` — 0.7 — one-shot: "We read words from left to right, one word at a time." (≤4.0 s) |
| 1 | 9,600 | dot returns to card 1 and steps again at 9,600 → 10,800 → 12,000 ms, then holds on card 3 | `vo_v1_3` — 0.7 — one-shot: "Point to each word as you say it." (≤3.2 s) |
| 2 | 0 | pair `sun` card + `pict_cue_sun` pop in centered at 200 ms (pop 200 ms, cue 96×96 beside the card); the word underlines at 200 ms as the pair pops in | `vo_v2_1` — 0.7 — one-shot: "Listen. This word says sun." (≤3.2 s) |
| 2 | 4,200 | the `sun` pair fades out and the `cat` + `pict_cue_cat` pair fades in (300 ms each); underline draws | `vo_v2_2` — 0.7 — one-shot: "This word says cat." (≤2.6 s) |
| 2 | 7,800 | the `cat` pair fades out and the `bus` + `pict_cue_bus` pair fades in (300 ms each); underline draws | `vo_v2_3` — 0.7 — one-shot: "This word says bus." (≤2.6 s) |
| 2 | 11,200 | the three word+picture pairs move into a row over 300 ms; each pops once at 11,200/11,900/12,600 ms | `vo_v2_4` — 0.7 — one-shot: "Each word looks different. Look at each one." (≤3.4 s) |
| 3 | 0 | `hat` card + `pict_cue_hat` pop in centered; word underlines | `vo_v3_1` — 0.7 — one-shot: "Here is a new word. It says hat." (≤3.2 s) |
| 3 | 4,000 | four cards (`sun`, `cat`, `bus`, `hat`) in a row; the track dot steps 4,000 → 4,700 → 5,400 → 6,100 ms; each word underlines as it is read | `vo_v3_2` — 0.7 — one-shot: "Read with me: sun… cat… bus… hat." (≤4.4 s) |
| 3 | 9,400 | the cards fade out to a blank page (300 ms); `pict_prompt_listen` pops center (200 ms) | `vo_v3_3` — 0.7 — one-shot: "Now find the words you hear. Then read the sentence with me." (≤4.2 s) |

**Word cards (designed; one card = one printed word; card art keys are static and reused across rounds).**

| Card id | Printed text | Typography | Picture cue | Taught in |
|---|---|---|---|---|
| `word_sun` | "sun" | ≥72 px rounded lowercase, ink on card | `pict_cue_sun` (sun with rays) | ch 2 |
| `word_cat` | "cat" | ≥72 px rounded lowercase | `pict_cue_cat` (sitting cat) | ch 2 |
| `word_bus` | "bus" | ≥72 px rounded lowercase | `pict_cue_bus` (side-view bus) | ch 2 |
| `word_hat` | "hat" | ≥72 px rounded lowercase | `pict_cue_hat` (straw hat) | ch 3 |
| `word_the` | "The" | ≥72 px rounded, capital T, sentence-start | none | ch 1 |
| `word_naps` | "naps" | ≥72 px rounded lowercase | none | ch 1 |

**Activity rounds (designed, fixed order; cards listed left→right = index order; prompt ≤4.4 s).**

| # | Kind | Prompt (key: copy, volume 1.0) | Cards (index order) | Correct | Illustration guidance (page backdrop + cards) |
|---|---|---|---|---|---|
| 1 | match | `vo_a_p1`: "Tap the word sun." | 0 `cat`, 1 `sun` | index 1 | two cards in identical style centered on the page backdrop, 48 px gap; no cue pictures in speech mode; prompt pictogram = listen (`pict_prompt_listen`) |
| 2 | match | `vo_a_p2`: "Now find the word cat." | 0 `sun`, 1 `cat`, 2 `bus` | index 1 | three cards in a row, 48 px gaps; identical style; pictogram = listen |
| 3 | match | `vo_a_p3`: "Tap the word bus." | 0 `bus`, 1 `hat` | index 0 | two cards; the pair differs in every letter; identical style; pictogram = listen |
| 4 | match | `vo_a_p4`: "Find the word hat." | 0 `cat`, 1 `hat`, 2 `bus` | index 1 | three cards; `cat` differs from `hat` only in the first letter, so both are typeset carefully; pictogram = listen |
| 5 | order | `vo_a_p5`: "Let's read the sentence. Tap each word from left to right." | 0 `The`, 1 `cat`, 2 `naps` | taps in order 0 → 1 → 2 | three cards in a row forming "The cat naps."; 24 px track dot under card 0 on entry (soft pulse, 400 ms) while the round is open; pictogram = left-to-right arrow (`pict_prompt_order`) |

**Feedback copy (designed, fixed).** Confirmations `vo_a_ok{n}` (0.7, one-shot): 1 "Yes! That says sun." ·
2 "Yes! That says cat." · 3 "Yes! That says bus." · 4 "Yes! That says hat. You read it!" · 5 "Yes! You
read the whole sentence: 'The cat naps.'" Round-5 steps speak the tapped word: `vo_step_the` "The." and
`vo_step_cat` "Cat." (1.0, one-shot, ≤0.7 s each); the third step has no step clip.

| Round | Tapped card → teach line (0.7, one-shot, ≤3.6 s) |
|---|---|
| 1 | `cat` → `vo_teach_r1_cat`: "That word says cat. Find the word sun." |
| 2 | `sun` → `vo_teach_r2_sun`: "That word says sun. Find the word cat."; `bus` → `vo_teach_r2_bus`: "That word says bus. Find the word cat." |
| 3 | `hat` → `vo_teach_r3_hat`: "That word says hat. Find the word bus." |
| 4 | `cat` → `vo_teach_r4_cat`: "That word says cat. Find the word hat."; `bus` → `vo_teach_r4_bus`: "That word says bus. Find the word hat." |
| 5 | unread but not expected: `cat` → `vo_teach_r5_cat`: "That word says cat. We read from left to right. Find the next word."; `naps` → `vo_teach_r5_naps`: "That word says naps. We read from left to right. Find the next word."; already read → `vo_teach_r5_read`: "You already read that word. Find the next word." |

Hint copy: `vo_hint` "Tap the blinking button to keep going." and `vo_hint_word` "Tap the word you hear." (1.0, one-shot, ≤2.4 s each); final praise `vo_praise`: "You read every word! Great reading!" (1.0, one-shot, ≤3.2 s).

- **Worked example (round 3, one wrong tap then correct):** round entry at 0 — scene fades 300 ms,
  `pict_prompt_listen` pops, `vo_a_p3` plays at 400; save roundIndex 2. At 1800 the `hat` card is tapped:
  jiggle 300 ms, `sfx_soft_tap`, teach `vo_teach_r3_hat` from 1800 to ≈4200; prompt re-plays at 5000. At
  6600 the `bus` card is tapped: sparkle ≤6, `sfx_ding` 0.8, confirmation `vo_a_ok3` from 6600 to ≈9200;
  round 4 entry at 9800 (600 ms later), save roundIndex 3.
- **Progression rule:** fixed video 1→3, then fixed rounds 1→5; rounds advance only on a correct tap (or
  the round-5 read of all three words); no randomization, no progression locks, no gating timers, no scores. Wrong taps and
  idle never advance or reset a round; the FR-008 success lock only waits out the confirmation.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px, page backdrop 4:3 ≤1024×768 centered, word cards 240×160 px with 48 px gaps, word type ≥72 px, prompt pictogram 96×96 centered 24 px under the chrome, track dot 24 px; in the no-speech fallback cards grow to 240×200 px (cue 48×48 above the word). At 768–1023 px — chrome 88 px, cards 200×132 px (200×164 px in the fallback) with 40 px gaps, word type ≥56 px, pictogram 80×80, track dot 20 px. Height ≥700 px; below that scale the field by 0.85 keeping every card ≥80 px and every control ≥64 px.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video beat (section 8) | beat's visual event (pop, underline, track step) | beat's key — 0.7 — one-shot |
| Chapter change | 300 ms fade out, 600 ms hold, 300 ms fade in; chapter dot fill | none |
| Correct tap (rounds 1–4, round 5 step 3) | sparkle ≤6 particles; word underline holds | `sfx_ding` — 0.8 — one-shot (300 ms throttle); confirmation — 0.7 — one-shot |
| Round 5 steps 1–2 | tapped word underlines; track dot steps to the next card | `vo_step_the` / `vo_step_cat` — 1.0 — one-shot (≤0.7 s) |
| Wrong tap | tapped card jiggles 300 ms; from the 2nd wrong in the round the correct card soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach — 0.7 — one-shot (1200 ms throttle; duck) |
| Round prompt | card row fades in 300 ms; prompt pictogram pops 200 ms | `vo_a_p{n}` — 1.0 — one-shot at round +400 ms |
| Chrome press (Play/Pause, Replay, HOME) | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Round 5 complete | confetti ≤40 particles, 2500 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3 s | `vo_hint` / `vo_hint_word` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after Play; prompt slot shows the target's picture cue; cards show cues | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only |

**Effect definitions (no undefined effects):** *highlight (underline)* = 6 px accent underline under the word; in `activity` it is drawn left→right under the tapped card over 300 ms and holds until the round advances or (round 5) until the word is read; the video's beat underlines draw fully within ≤100 ms (FR-003). *pop* = scale 0→1.08→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = ≤6 star particles ≤40 px radiating ≤80 px over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *fade* = opacity 0→1 or 1→0 over 300 ms. *track step* = 24 px accent dot slides from one card's bottom center to the next over 400 ms. *chapter dot fill* = dot switches to accent over 100 ms, no motion. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold; *ring flash* = ring opacity 1→0 over 300 ms. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fades in over 300 ms.

**Audio rules (v1):** no audio before the first gesture (FR-018); one voice at a time, each new voice
cancels the previous utterance; sfx may overlap; `music_title` optional at 0.15 on `title` only; ducking
per FR-018. Degradation per FR-019; background-tab behavior per FR-020 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key
  `spec.bookBasics.readingAccuracy.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** title→Play (phase `video`, roundIndex 0); every activity round entry (phase
  `activity`, that roundIndex); completion (FR-013, roundIndex 4, `completed:true`); HOME from any state.
  `updatedAt` refreshes on every save.
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round directly
  (video is not replayed); `phase:"video"` opens chapter 1. When `completed` is true, Play starts at the
  video (chapter 1), per FR-017.
- **Reset:** hold the title logo 3 s (ring fill) → clears the key and in-memory progress; the keyboard
  equivalent is holding Enter/Space 3 s on the focused logo (FR-015).
- **Deliberately not stored:** `videoMs`/clock position, chapter position, round-5 step, tap history,
  judgments, card order, audio settings, language, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended;
  handled by FR-020. Storage blocked → run unsaved (FR-019).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy character, art,
voice, or audio appears. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the
row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | warm-paper title scene: open book with three floating word cards and a sun cue | 1024×768 SVG | static | SVG shapes |
| `ill_page_sentence` / `ill_page_blank` | image | page backdrop with the three sentence cards (ch 1, round 5) / blank page (ch 2–3, rounds 1–4) | 1280×720 SVG each | static | SVG shapes |
| `film_ch1..3` | animated | the three chapters per section 8 (page, card pairs, read-together, track dot) | runtime 1280×720 | one timeline at a time | runtime SVG animation (expected); a pre-rendered file is acceptable only if it matches the section 8 timeline |
| `card_word_{sun,cat,bus,hat,the,naps}` | image | one printed word per card, ink on `#FFFDF6`, 4 px ink border, 24 px radius | 240×160 SVG (200×132 at 768–1023 px) | static; underline overlay drawn at runtime | SVG text + shapes |
| `pict_cue_{sun,cat,bus,hat}` | image | original picture cues: sun with rays; sitting cat; side-view bus; straw hat | 96×96 SVG (48×48 in the fallback) | static; pop in the video | SVG shapes |
| `pict_prompt_listen` / `pict_prompt_order` | image | ear with sound arcs; left-to-right arrow over a dot | 96×96 SVG each (80×80 at 768–1023 px) | static; pop on round entry | SVG paths |
| `pict_play` / `pict_pause` / `pict_replay` / `pict_home` | image | triangle; bars; circular restart arrow; house | 64×64 SVG (Play and endcard Replay drawn at 96×96) | static | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech is missing | SVG path |
| `dot_track` / `ring` / `sparkle` / `confetti` | rendered | 24 px accent track dot with a 4 px trail; 4 px accent reset ring; 4-point star particle; rect particle | runtime (ring logo-sized) | track step; ring fill/flash during the reset hold; sparkle ≤6 / confetti ≤40 one-shot | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` | audio | UI click 0.08 s; muted tap 0.10 s | ogg/mp3 | one-shot | WebAudio blips |
| `sfx_ding` / `sfx_chime` | audio | bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot (ding 300 ms throttle) | WebAudio tones/arpeggio |
| `vo_v1_1..3`, `vo_v2_1..4`, `vo_v3_1..3` | audio | 10 chapter lines, copy in section 8 | ≤3.6 s each | one-shot | TTS allowed |
| `vo_a_p1..5`, `vo_a_ok1..5`, `vo_step_the`, `vo_step_cat` | audio | 5 prompts, 5 confirmations, 2 step words | ≤4.4 s each | one-shot | TTS allowed |
| `vo_teach_r{1,2,3,4,5}_*` | audio | 9 teach lines (1 + 2 + 1 + 2 + 3), copy in section 8 | ≤3.6 s each | one-shot | TTS allowed |
| `vo_hint` / `vo_hint_word` / `vo_praise` | audio | copy in section 8 | ≤2.4 s / ≤2.4 s / ≤3.2 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, gold `#F2B33D`, leaf `#7FB069`,
  sky `#BFE3F0`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback
  `system-ui`); printed words ≥72 px (≥56 px at 768–1023 px); no other visible words.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio
  → skip that clip, timeline and behavior unchanged (R-005, FR-019).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: 1-3`; `startMs/endMs: int` (`videoMs`); `beats: Beat[]` |
| `Beat` | `atMs: int` (chapter-relative); `visual: string`; `audioKey: string \| null`; `volume: number`; `behavior: "one-shot"` |
| `WordCard` | `id: enum {word_sun, word_cat, word_bus, word_hat, word_the, word_naps}`; `text: string`; `cardKey: string`; `cueKey: string \| null` |
| `Round` | `index: 0-4`; `kind: enum {match, order}`; `promptKey/promptCopy: string`; `promptPict: string`; `cards: WordCardId[]` (index order left→right); `correctIndex: int \| null` (match rounds); `order: int[] \| null` (round 5: [0,1,2]); `teachKeys: map<int, string>` |
| `Save` (persisted) | `phase: enum {video, activity}`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `stepIndex: int`; `wrongInRound: int`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Beat`, `WordCard`, and `Round` records are static; the timeline is computed from `startMs`
and `atMs`, never from wall-clock time. Round judgment reads only `Round.correctIndex` / `Round.order`
and `Round.teachKeys`.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, printed word cards as content text, per-card hit rects, and an underline/track-dot overlay on the page stage.
- **R-002** The player shall animate the section 9 effects: underline highlight, pop, soft/hint pulses, jiggle, depress, fade, track step, chapter dot fill, sparkle, confetti, ring fill/flash, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test per FR-011; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all interactive elements, with Space = play/pause when no control is focused, R = Replay, and Escape = HOME.
- **R-005** The player shall play one voice clip at a time with sfx overlap and the FR-018 ducking rule; a failed clip is skipped without blocking the timeline.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed (the FR-019 no-speech path carries the rounds).
- **R-007** The player shall voice all lines, prompts, step words, teach lines, hints, and praise via recorded audio or speech synthesis, with the FR-019 no-speech fallback.
- **R-008** The player shall persist and restore the section 10 save object in browser local storage, tolerate blocked storage (FR-019), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during video animation, track steps, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing phase, round, step, `videoMs`, playback, or progress.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-021).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss and no timeline desync (FR-020); hints may fire late.
- **R-013** Each chapter shall be renderable at runtime from `Chapter` data; a pre-rendered file is acceptable only if it matches the same section 8 timings.
- **R-014** The player shall request no camera, microphone, or network access at runtime.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥96 px) and the logo (≥64 px), and no audio has played |
| AC-02 | `title` with no save, a `completed:true` save, or a saved `phase:"video"` | Play is pressed | a 2000 ms lead-in runs, chapter 1 beat 1 plays at 2000 ms with its visual, and the save records phase `video` |
| AC-03 | the video playing | the clock runs with no input | chapters change at 16,000/17,200/32,200/33,400/47,400 ms, each chapter dot fills, and the round 1 prompt plays at 49,000 ms |
| AC-04 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops and animation freezes; Play replays that line from its start and no line is skipped |
| AC-05 | chapter 3 playing | Replay is pressed | chapter 3 restarts at 33,400 ms with its first line |
| AC-06 | round 1 (`cat`, `sun`) | `sun` is tapped | a sparkle and `sfx_ding` play, "Yes! That says sun." is spoken with no overlapping voice, and round 2 starts 600 ms after the clip ends with roundIndex 1 saved; a further card tap from the judgment until round 2 begins is ignored with no sound |
| AC-07 | round 1 open | `cat` is tapped | the `cat` card jiggles, `sfx_soft_tap` plays, "That word says cat. Find the word sun." is spoken, the prompt re-plays, and no score, star, or streak appears |
| AC-08 | round 3 with one wrong tap already recorded | a second wrong tap (`hat`) is made more than 1200 ms after the first (outside the teach throttle) | the `bus` card soft-pulses 400 ms while the teach line and prompt re-play |
| AC-09 | round 2 open | `cat` is double-tapped within 500 ms | exactly one judged correct tap, one sparkle, one `sfx_ding`, and one round advance occur |
| AC-10 | round 4 open | two fingers land together, one on `cat` and one on `hat` | only the first pointer's card is judged; the second shows no feedback of any kind |
| AC-11 | any round | empty space >12 px from every card is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-12 | round 2 open, 12 s without input | idleness continues | the `cat` card hint-pulses for 3 s and `vo_hint_word` plays; any tap resets the timer and the hint repeats 12 s later |
| AC-13 | `title`, `video` paused, or `endcard`, 12 s without input | idleness continues | Play, Play/Pause, or Replay respectively hint-pulses for 3 s and `vo_hint` plays after the first gesture (visual-only before it) |
| AC-14 | round 5 on entry | `naps` is tapped first, then `The`, `cat`, `naps` in order | the first tap jiggles with "That word says naps. We read from left to right. Find the next word."; then each word underlines in order, the track dot steps, steps 1–2 speak "The." and "Cat.", and step 3 sparkles and speaks the full-sentence confirmation |
| AC-15 | round 5 with `The` and `cat` read | `cat` is tapped again | the card jiggles, "You already read that word. Find the next word." plays, and the read progress is unchanged |
| AC-16 | rounds 1–4 answered correctly | round 5's third step is made | confetti, `sfx_chime`, and "You read every word! Great reading!" play; after 2500 ms the end card shows Replay (≥96 px) and HOME, and a later HOME then Play from `title` starts the video rather than round 5 |
| AC-17 | a save `{phase:"activity", roundIndex:2}`, and a save with `completed:true` | the page reloads and Play is pressed | the activity save opens round 3's cards and prompt directly (no video replay); the completed save starts chapter 1 |
| AC-18 | round 2 open | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload round 2's prompt plays |
| AC-19 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-20 | the end card showing | Replay is pressed | chapter 1 of the video starts with its 2000 ms lead-in, and when the video ends the rounds begin again at round 1 (no round is skipped) |
| AC-21 | speech synthesis unavailable | Play is pressed and a match round is played | no voice plays; the video's beats and underlines still fire on the section 8 timings; the prompt slot shows the target's picture cue, cards show their cue + word pairs, correct taps still sparkle and advance, the muted pictogram shows 5 s, and in round 5 the expected-next card soft-pulses |
| AC-22 | storage blocked | the entry is played and HOME is pressed | all behavior works in memory; after reload Play starts the video |
| AC-23 | the video playing or a round open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen, or the open round resumes — an unanswered round's prompt re-plays once and an answered round's pending advance fires — and no progress is lost |
| AC-24 | any state | Tab is pressed repeatedly, then Enter/Space and Escape are used | focus follows the section 6 tab order (word cards left→right), every focused control exposes its accessible name (section 7), Enter/Space activates each control, Escape returns HOME, and unlisted keys do nothing |
| AC-25 | a round open at 1024×768 | the viewport is resized to 800×1000 | phase, round, step, and progress are unchanged and every card remains ≥80 px and every control ≥64 px |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 47.4 s video plays its three chapters at the section 8 timings with underlines, track dot, gaps, dots, Pause/Resume, and Replay.
3. The five rounds run in order on the section 8 tables; match rounds advance on the correct tap, round 5 advances on the left-to-right read; wrong taps teach and re-ask, and no score appears.
4. Phase and round survive a reload; Play resumes at the saved round (or the video when completed); the reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video topic (reading printed words left to right) and the five rounds are designed inferences from the title; official sources publish no per-video description | designed (O3, D1–D2) |
| A2 | The words sun/cat/bus/hat, the sentence "The cat naps.", the picture cues, and all art, voice, and copy are original | designed (D3, IP rule) |
| A3 | A runtime-rendered animated video is an acceptable realization (a pre-rendered file must match the section 8 timeline), and TTS clips or runtime TTS are acceptable | designed (R-013) |
| A4 | The only visible words are the taught words and the example sentence; every instruction remains voice + pictogram, and a card's accessible name names its own printed word | designed (FR-021; no-reading rule for instructions) |
| A5 | Word matching is learned through the video plus wrong-tap reading; from the second wrong tap the correct card soft-pulses, so any round can be completed without reading instruction text | designed (D4, FR-009) |
| A6 | Background-tab timers may be throttled and speech may be suspended | known platform behavior; handled by FR-020 |
| A7 | A 12 px tap tolerance, ≥240 px cards, and a 500 ms activity tap throttle suit ages 4–5 | designed (sections 7–8) |
| A8 | Age band 4–5 is a targeting choice inside the app's official 2–8 range; no unlocks, adaptive difficulty, persisted clock, or round skip; the video always precedes round 1 | designed (O4, FR-017, FR-022, section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the three-chapter timeline and beat timings; the word set, sentence, card order, prompts, correct cards, and teach copy; round and step rules; progression and feedback rules; chrome set and keyboard map; hit-target minimums; no fail state; save key and shape; asset provenance; acceptance criteria.
- **Free:** exact composition of the page, cards, cues, and title scene within the section 8 guidance; easing curves; sparkle/confetti particle look; voice timbre and TTS engine; optional title music; decorative title-scene details; the no-speech cue pairing is fixed only in outcome, not in drawing detail.
- **Not in this spec:** library/Videos-tab browsing, the other eight Book Basics entries, profiles, navigation shell, parental controls, localization, analytics, scoring, or teacher tooling.
