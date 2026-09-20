# Book Cover (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-book-cover.md`](../book-basics-book-cover.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); repo wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233 ("Book Basics" video collection, named titles)
- **Spec status:** v1 — first Book Basics spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-019); no network after load
- **Conditional sections:** all 16 included. Game-only blocks are replaced by player equivalents: three video chapters replace levels, five name-the-part rounds replace a scoring loop, a wordless celebration and end card replace a win condition.

## 2. Overview and learning objective

A child presses Play on the title, watches a 42.4 s original animated video in three short chapters
about what a book cover is and what a cover shows, then answers five name-the-part rounds on a cover: the
title, the picture, the author's name, the picture again (front and back showing), and the back cover. A
warm voice names each part; a correct tap earns a
sparkle and a spoken confirmation, a wrong tap is answered by naming the part that was tapped and
re-asking. The skill is **book-cover print awareness** — knowing a cover has a title, an author, a
picture, and a back, and hearing each named. Age band: **2–8 across the library**; this entry targets
**Preschool (2–5 pre-reader)**. Expected session: **1.5–2.5 minutes** (42.4 s video + 5 rounds).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Book Cover" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; catalog lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish the video titles only — no per-video descriptions exist; the focus implied by the title is an inference, not an official description | official (about the source's limits) | Catalogued entry Notes |
| O4 | The app is officially for children ages 2–8 (Preschool–2nd Grade) | official | `khan-academy-kids-games.md` lines 96, 160–177 |
| O5 | No Book Basics title art, audio, or content appears in any surveyed source | official | Catalogued entry |
| D1 | The video topic — what a cover is, and that it shows a title, an author's name, a picture, and a back cover — and the three-chapter storyboard and script | designed | Inference from the title (O3); no official description exists |
| D2 | The interaction: five name-the-part rounds on an original cover | designed | Shared brief's per-entry concept for this slug |
| D3 | The original book "The Sunflower Seed" by "Ada Moreno" | designed | Original content required; no Khan Academy media or characters |
| D4 | Player chrome (Play/Pause, Replay, HOME, reset logo, chapter dots), progress save/resume, idle hint, audio rules, no fail state | designed | Template v1 and the Book Basics shared brief |
| D5 | All art, video, voice, music, copy, and layout | designed | IP rule: all assets original (section 11) |

## 4. Player experience / core loop

A child presses Play on the title. The stage fades into a closed book — "This is a book." — and a soft
outline hugs the front: "The part on the front is the cover." The title lights up as the voice says
"The title is the name of the book", then the author's name, then the picture; the book flips and the
back cover is outlined: "The back cover can show a picture or words, too." Round 1 begins with a
prompt pictogram and a voice: "Tap the title." The child taps — sparkle, a ding, "Yes! That's the
title — the name of the book." Four rounds follow the same way; wrong taps are named gently and the
prompt repeats. After round 5 confetti pops, the voice says "You know every part of a book cover!",
and the end card offers Replay or HOME.

**Core loop:** watch three teaching chapters → answer five tap-the-named-part prompts → hear each tap
affirmed or taught → celebrate → replay or go home.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading` (prepare scenes, film art, and audio per section 11), then `title`: a decorative scene with the original book's front-cover art (illustration, title text, author line as content), a Play target ≥96×96 CSS px, and a reset logo ≥64×64 CSS px (FR-015). No audio plays before the first gesture (FR-018). When Play is pressed, it shall unlock audio and then either start fresh or resume: with no save or a `completed:true` save it shall stop `music_title`, run a **2000 ms lead-in**, start `video` chapter 1 at `videoMs = 2000` (FR-002), and save `{phase:"video", roundIndex:0, completed:false}`; with a saved `phase:"activity"` (FR-017) it shall open that `roundIndex` directly (no video, no lead-in). |
| FR-002 | The video shall run one accumulated playing-time clock (`videoMs`, advanced per frame only while `playing` and the tab is visible; never wall-clock), on this fixed timeline: lead-in **0–2000**; chapter 1 **2000–16000**; gap **16000–17200**; chapter 2 **17200–29200**; gap **29200–30400**; chapter 3 **30400–42400**; post-video gap **42400–43600**. At each chapter end the clock auto-advances through the **1200 ms** gap (chapter art fades out 200 ms, holds, next chapter fades in 200 ms; chapter dot fills). After chapter 3's gap the player shall enter `activity` round 1 at **43600** and speak its prompt (FR-007) — no tap needed. |
| FR-003 | Each chapter shall play its lines at the exact section 8 offsets: one voice clip per line (volume 1.0, one-shot) with its scripted highlight moving to the named part at the line's start (highlight appears in ≤100 ms). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a line, chapter, or transition. |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`. Pause shall cancel the current line and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current line's start (the line with the greatest offset ≤ the frozen clock; before line 1, line 1) and re-speak that line from its start, so no line is skipped or left half-heard. Inside a chapter gap or the post-video gap, Resume continues the frozen segment with its remaining time and no voice. Pause/Resume is throttled to one toggle per 300 ms; a double-tap toggles once. |
| FR-005 | A Replay target ≥64×64 CSS px shall restart the current chapter from its first line: cancel the voice, set `videoMs` to the chapter start (**2000 / 17200 / 30400**), and play line 1 immediately; later lines and the auto-advance keep their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay does not change the save. Replay is throttled to one restart per 300 ms; a double-tap restarts once. |
| FR-006 | Chapter dots (3 dots, 12 px, 8 px gaps; current = accent fill over 100 ms, no motion) shall show the current chapter in `video`; they are not interactive and not focusable. |
| FR-007 | The activity shall run **5 fixed rounds** in section 8 order with no randomization. On each round entry the player shall show the round's scene and prompt pictogram (pop 200 ms), speak the round's prompt (volume 1.0, one-shot), and save `{phase:"activity", roundIndex, completed:false}`. |
| FR-008 | When the round's correct part is tapped, the player shall show sparkle (≤6 particles) on the part, play `sfx_ding` (0.8, 300 ms throttle), and speak the round's confirmation line (1.0, one-shot); then, **600 ms** after the confirmation clip ends (or 1200 ms after the sparkle when speech is unavailable), start the next round (FR-007) or, after round 5, `celebrating` (FR-013). One correct tap is always enough; no score, streak, or bonus exists. |
| FR-009 | When a distractor part is tapped, the player shall jiggle the tapped part 300 ms, play `sfx_soft_tap` (0.5), and speak that part's teach line naming the tapped part (0.7, one-shot, throttled to one per 1200 ms — taps inside the teach-voice throttle keep their visual feedback but play no voice); from the round's **second** wrong tap on, the correct part soft-pulses 400 ms. The prompt re-plays (1.0) 800 ms after the teach clip ends (or after the jiggle when no voice). The round stays open until its correct part is tapped; wrong taps never advance, subtract, lock, or end anything. |
| FR-010 | In `activity`, part taps are judged at most once per **500 ms**; taps inside that 500 ms window produce no feedback and no sound. A double-tap on a correct part yields exactly one judged tap, one sparkle, and one `sfx_ding`; a double-tap on a distractor yields one teach cycle. |
| FR-011 | Input semantics: tap/click only — no drag gestures exist in this entry; the first pointer down wins and additional simultaneous pointers are ignored until release. Hit rects take a **12 px** expansion on all sides; on overlap the part whose center is nearest wins, exact ties resolve to the lowest part index (section 8); a tap >12 px from every target is an empty tap (no state change; idle timer resets). Empty taps include the front-cover panel background (scene `pair`) and the stage around the book. |
| FR-012 | When no input has occurred for **12 s**: on `title` the Play target hint-pulses and `vo_hint` plays after the first gesture (visual-only before it); in `video` paused the Play/Pause target pulses and `vo_hint` plays (while the video is playing no hint fires — the moving video is its own cue); in `activity` the current round's correct part pulses and `vo_hint_part` plays; on `endcard` the Replay target pulses and `vo_hint` plays. Each hint lasts 3 s, repeats every 12 s of continued idleness, and is cancelled by any input, including an empty-space tap. |
| FR-013 | After round 5's correct tap the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot), and save `{phase:"activity", roundIndex:4, completed:true}`. After 2500 ms the `endcard` shows the end panel with Replay ≥96×96 CSS px and HOME ≥64×64; nothing auto-advances further. |
| FR-014 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves, and returns to `title`. On `title` and `loading` no HOME control is rendered and a HOME input is a no-op (title is home). |
| FR-015 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; releasing early resets the ring to 0 with no action; on completion it clears the save and in-memory progress and plays a ring flash plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-016 | The entry shall have no fail state: wrong taps, empty taps, rapid or repeated taps, multi-touch, and idle time never deduct, lock, end, or lose progress, and no score, star, streak, or comparison is ever shown. |
| FR-017 | Persistence per section 10: save on title→Play when starting fresh (phase `video`, `completed:false`), every activity round entry, completion, and HOME; `updatedAt` refreshes on every save. Play resumes at the saved phase and round (`phase:"activity"` → that `roundIndex`; `phase:"video"` → video chapter 1); when `completed` is true, Play starts at the video (chapter 1). The completion save (FR-013) is the only save that writes `completed:true`; the next save after it writes `completed:false`. |
| FR-018 | Audio: no audio before the first gesture; one voice clip at a time — any new voice clip (video line, prompt, confirmation, teach, hint, praise) cancels the previous utterance; sfx may overlap each other; optional `music_title` loops at 0.15 on `title` only and stops at Play; while a teach voice plays, the music bus ducks 0.5→0.4 within 120 ms and restores over 200 ms. |
| FR-019 | Degradation: no speech synthesis → the video clock, highlights, and transitions run unchanged with no voice; activity prompts are carried by their 96×96 pictograms alone; all other behavior is identical; a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. |
| FR-020 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the current line and enter `video` paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return the open round's prompt re-plays once (1.0). Idle time counts visible time only; throttled timers may delay hints but never lose progress (A7). |
| FR-021 | Accessibility and text: every interactive element (logo, Play, Play/Pause, Replay, HOME, each part, end-card Replay) carries an invisible accessible name (section 7). Visible text is content only: the cover title "The Sunflower Seed" and author line "by Ada Moreno" on the book art; chapter dots, prompt pictograms, and chrome are graphics. Every round is answerable from voice + pictogram alone. |
| FR-022 | Unknown events and inputs shall be ignored (no state change, no sound). Chapter order, round order, and content are fixed; there is no randomization, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial; prepare scenes, video art, audio; audio locked |
| `title` | decorative scene + cover art + Play + reset logo | the player's home; audio unlocks on first gesture |
| `video(chapter, playback)` | animated stage + book + HOME, Play/Pause, Replay, 3 dots | chapter 1–3; playback ∈ {playing, paused} |
| `activity(roundIndex)` | round scene + prompt pictogram + parts + HOME | roundIndex 0–4; engine state `video`/`activity` is what the save records |
| `celebrating` | frozen round 5 scene + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | no save or `completed:true` | `video(1, playing)` | actions: lead-in 2000 ms; stop `music_title`; save `{phase:"video", roundIndex:0, completed:false}` |
| `title` | `PLAY_PRESSED` | save `{phase:"activity", roundIndex:n}` | `activity(n)` | actions: show round *n* and speak its prompt (FR-007); no lead-in |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` / Space | throttle clear | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / key on target | throttle clear | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter `video`, or `activity(0)` after chapter 3's gap | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line; freeze clock (FR-020) |
| `video` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `activity` | `CORRECT_TAP` | throttle clear | `activity(roundIndex+1)`; after round 5 → `celebrating` | actions: FR-008; save roundIndex; round 5 saves `completed` (FR-013) |
| `activity` | `WRONG_TAP` | throttle clear | `activity(same)` | actions: FR-009 |
| `title` / `video` (paused) / `activity` / `endcard` | `IDLE_12S` | visible, no input 12 s | same state | actions: FR-012 hint; no hint while `video` plays |
| `activity` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: save already done at FR-013 entry |
| `celebrating` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel timer; save |
| `endcard` | `REPLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; `completed` clears on the next save (FR-017) |
| `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: save |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — logo (reset) → Play; `video` — HOME → Play/Pause → Replay; `activity` — HOME → parts in index order (scene `front`: picture → title → author; scene `pair` adds back cover last); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play | tap the Play target | Tab to Play + Enter/Space |
| Pause / resume | tap the Play/Pause target | Space, or Enter/Space on the focused target |
| Replay chapter | tap the Replay target | Tab to Replay + Enter/Space |
| Answer a round | tap the named part | Tab to the part + Enter/Space |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and end-card Replay ≥96×96 CSS px; HOME, Play/Pause, Replay, and the logo ≥64×64; activity parts ≥96×96 at ≥1024 px wide and ≥80×80 at 768–1023 px — all above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-011; ties resolve to the nearest center, then the lowest part index; >12 px from every target is an empty tap (nothing changes; the idle timer resets).
- **Multi-touch / gestures:** first pointer down wins; extra simultaneous pointers are ignored until release. No drag gestures exist, so no drag alternative is required. Part taps (FR-010) and Play/Pause/Replay (300 ms) are throttled.
- **Instructions without reading:** every prompt is voice + a 96×96 pictogram (tag = title, frame = picture, pencil = author, bent panel = back cover); chrome is pictogram + invisible name. Visible text is limited to FR-021 content.
- **Accessible names:** invisible names on every interactive element, e.g. "Play", "Pause", "Resume", "Replay chapter 2", "Home", "Reset saved progress (hold 3 seconds)", "Title: The Sunflower Seed", "Picture", "Author: Ada Moreno", "Back cover", "Play again".
- **Resize:** viewport resize or rotation mid-video or mid-round reflows per section 8, preserving state, progress, and the frozen `videoMs`.

## 8. Content and data

**Video storyboard (original, programmatic animation; all copy is original).** Stage 1280×720; the
book sits centered; line offsets are chapter-relative; each clip has a cap so it never crosses the
next line or the chapter end; absolute tick = chapter start + offset.

| Ch | Span (ms) | Dur | On-screen content and highlight | Voice lines (offset → key: copy, cap) | Art guidance |
|---|---|---|---|---|---|
| 1 | 2000–16000 | 14.0 s | closed book, front facing viewer, 200 ms fade-in; 4 px accent outline hugs the front-cover edge from line 2 and holds | 0 → `vo_v1_1`: "This is a book." (≤1.8 s); 4200 → `vo_v1_2`: "The part on the front is the cover." (≤3.2 s); 9200 → `vo_v1_3`: "The cover is the first thing you see." (≤3.4 s) | flat rounded book, cream paper, rust-red cover, soft shadow; no characters |
| 2 | 17200–29200 | 12.0 s | same cover; title and author lines already printed; outline moves to the title at line 1 and to the author line at line 3 | 0 → `vo_v2_1`: "A cover shows the title." (≤2.6 s); 4000 → `vo_v2_2`: "The title is the name of the book." (≤3.2 s); 8000 → `vo_v2_3`: "The author's name is who wrote the book." (≤3.6 s) | title "The Sunflower Seed" 56 px ink on a cream band; author "by Ada Moreno" 32 px below; both are content |
| 3 | 30400–42400 | 12.0 s | outline moves to the picture area at line 1; 500 ms book flip at line 3 start; outline hugs the back cover to the end | 0 → `vo_v3_1`: "The cover shows a picture." (≤2.8 s); 3800 → `vo_v3_2`: "The picture shows what the book is about." (≤3.5 s); 8000 → `vo_v3_3`: "The back cover can show a picture or words, too." (≤3.8 s) | picture: seed in soil, sprout, tall sunflower, corner sun; back cover: sun glyph + two gray rounded bars (no words) |

**Activity scenes and parts.** Part ids are the hit targets and the save-independent judgment keys.

| Scene | Shows | Parts (index order) | Art guidance |
|---|---|---|---|
| `front` | the front cover centered | 0 `part_picture`, 1 `part_title`, 2 `part_author` | picture area ≥480×360 with the chapter-3 illustration; title and author as content; parts separated ≥32 px; no highlight on entry |
| `pair` | front cover (left) + back cover (right), 24 px spine gutter | 0 `part_picture`, 1 `part_title`, 2 `part_author`, 3 `part_back` | front and back panels sized per the layout breakpoints below; back cover = cream panel, sun glyph top-center, two gray bars; no highlight on entry |

**Rounds (fixed order; prompts ≤3.5 s; confirmation and teach copy below).**

| # | Scene | Prompt (key: copy, volume 1.0) | Correct | Distractors | Illustration guidance |
|---|---|---|---|---|---|
| 1 | `front` | `vo_a_p1`: "Tap the title." | `part_title` | picture, author | all three parts fully visible; prompt pictogram = tag (`pict_prompt_title`) |
| 2 | `front` | `vo_a_p2`: "Tap the picture." | `part_picture` | title, author | same layout; pictogram = frame (`pict_prompt_picture`) |
| 3 | `front` | `vo_a_p3`: "Tap the author's name." | `part_author` | picture, title | same layout; pictogram = pencil (`pict_prompt_author`) |
| 4 | `pair` | `vo_a_p4`: "Now the back is showing. Tap the picture." | `part_picture` | title, author, back | both panels visible; the picture exists only on the front cover; pictogram = frame |
| 5 | `pair` | `vo_a_p5`: "Tap the back cover." | `part_back` | picture, title, author | both panels visible; pictogram = bent panel (`pict_prompt_back`) |

| Round | Confirmation (`vo_a_ok{n}`, 1.0, one-shot, ≤3.5 s) |
|---|---|
| 1 | "Yes! That's the title — the name of the book." |
| 2 | "Yes! That's the picture." |
| 3 | "Yes! That's the author's name." |
| 4 | "Yes! That's the picture on the front cover." |
| 5 | "Yes! That's the back cover!" |

| Part | Teach line (`vo_teach_{part}`, 0.7, one-shot, ≤2.2 s — names the tapped part) |
|---|---|
| `part_picture` | "This is the picture." |
| `part_title` | "This is the title." |
| `part_author` | "This is the author's name." |
| `part_back` | "This is the back cover." |

Hint copy: `vo_hint` "Tap the blinking button to keep going." and `vo_hint_part` "Tap the part you hear." (1.0, one-shot, ≤2.8 s). Final praise `vo_praise`: "You know every part of a book cover!" (1.0, ≤3.2 s).

- **Worked example (round 3, one wrong tap then correct):** round entry at 0 — scene `front`, prompt pictogram pop 200 ms, `vo_a_p3` plays, save roundIndex 2. At 1800 `part_picture` is tapped: jiggle 300 ms, `sfx_soft_tap`; teach at 0.7 from ≈1800 to ≈3600; prompt re-plays at 4400. At 6000 `part_author` is tapped: sparkle ≤6, `sfx_ding` 0.8, confirmation starts and ends ≈8800; round 4 entry at 9400 (600 ms later), save roundIndex 3.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; `front` cover 720×560 centered; picture area ≥480×360; title 56 px type, author 32 px; each part hit ≥96×96; prompt pictogram 96×96 centered 24 px under the chrome. At 768–1023 px — chrome 88 px; cover 560×440; picture ≥360×280; title 40 px; author 24 px; each part hit ≥80×80; pictogram 80×80. `pair` panels ≥480×400 each at ≥1024 px (≥360×300 at 768–1023 px) with the 24 px gutter. Height ≥700 px; below that scale the field by 0.85 keeping every target ≥80 px.
- **Progression rule:** fixed video 1→3, then fixed rounds 1→5; nothing locks, randomizes, or adapts; success is the only advance condition, and the video always plays before round 1 on a fresh or completed run.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video line starts | highlight moves in ≤100 ms; animation continues | `vo_v{chapter}_{line}` — 1.0 — one-shot |
| Chapter change | 200 ms fade out/in around the 1200 ms gap; dot fill | none |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Correct part tap | sparkle ≤6 particles on the part | `sfx_ding` — 0.8 — one-shot (300 ms throttle); confirmation — 1.0 — one-shot |
| Wrong part tap | tapped part jiggles 300 ms; from the 2nd wrong in the round the correct part soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach — 0.7 — one-shot (1200 ms throttle; duck) |
| Round 5 correct | confetti ≤40 particles, 2500 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3 s | `vo_hint` / `vo_hint_part` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only |

**Effect definitions (no undefined effects):** *highlight* = 4 px accent stroke around the named part, appears in ≤100 ms, holds until the next line. *pop* = scale 1→1.05→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = ≤6 square particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *fade* = opacity 0→1 or 1→0 over 200 ms. *flip* = book rotate-y 0→180° over 500 ms, no other motion. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold; *ring flash* = ring opacity 1→0 over 300 ms. *duck* = music bus 0.5→0.4 within 120 ms while a teach voice plays, restore over 200 ms. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fades in over 250 ms. *chapter dot fill* = dot switches to accent over 100 ms, no motion.

**Audio rules (v1):** no audio before the first gesture (FR-018); one voice at a time, each new voice cancels the previous utterance; sfx may overlap; `music_title` optional at 0.15 on `title` only. Degradation per FR-019; background-tab behavior per FR-020 (A7).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.bookBasics.bookCover.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** title→Play (phase `video`, roundIndex 0, `completed:false`), every activity round entry (phase `activity`, that roundIndex, `completed:false`), completion (FR-013, `completed:true`), and HOME; `updatedAt` refreshes on every save. The completion save is the only save that writes `completed:true` (FR-017).
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round directly (video is not replayed); `phase:"video"` opens chapter 1. When `completed` is true, Play starts at the video (chapter 1), and that Play save clears `completed` (FR-001, FR-017).
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-015).
- **Deliberately not stored:** `videoMs` and clock position, chapter position, wrong-tap counts, tap history, judgments, language or audio settings, sparkle/confetti counts, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-020. Storage blocked → run unsaved (FR-019).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy media or characters appear. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `scene_title` | image | decorative shelf scene behind the book cover art | 1280×720 SVG | static | SVG shapes |
| `ill_cover_front` / `ill_cover_back` | image | cover art per section 8; front carries the title and author content, back carries the sun glyph and bars | 720×560 SVG each | static | SVG shapes |
| `film_ch1..3` | animated | the three chapters per section 8 (book, highlights, flip) | runtime 1280×720 | one timeline at a time | runtime SVG animation (expected); a pre-rendered file is acceptable only if it matches the section 8 timeline |
| `pict_home` / `pict_play` / `pict_pause` / `pict_replay` | image | house; triangle; bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_prompt_title` / `pict_prompt_picture` / `pict_prompt_author` / `pict_prompt_back` | image | tag; framed picture; pencil; bent panel | 96×96 SVG each (80×80 at 768–1023 px) | static; pop on round entry | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech is missing | SVG path |
| `ring` | image | 4 px accent progress ring for the reset hold | 96×96 SVG | during hold | SVG shape |
| `sparkle` / `confetti` | rendered | square particle; rect particle | runtime | one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_ding` / `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips/arpeggio |
| `vo_v{1-3}_{1-3}` | audio | 9 chapter lines with caps, section 8 | ≤3.8 s each | one-shot | TTS allowed |
| `vo_a_p{1-5}` / `vo_a_ok{1-5}` | audio | 5 prompts and 5 confirmations, section 8 | ≤3.5 s each | one-shot | TTS allowed |
| `vo_teach_{picture,title,author,back}` | audio | 4 teach lines, section 8 | ≤2.2 s each | one-shot | TTS allowed |
| `vo_hint` / `vo_hint_part` / `vo_praise` | audio | copy in section 8 | ≤2.8 s / ≤2.8 s / ≤3.2 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, gold `#F2B33D`, leaf `#7FB069`, sky `#BFE3F0`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); cover title 56 px / author 32 px per section 8; no other visible words.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, timeline and behavior unchanged (R-005, FR-019).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: int 1-3`; `startMs/endMs: int`; `artKey: string`; `lines: Line[]` |
| `Line` | `offsetMs: int`; `voiceKey: string`; `copy: string`; `highlight: PartId \| "cover" \| null` (`null` = hold the current highlight) |
| `Round` | `index: int 0-4`; `scene: enum {front, pair}`; `promptKey/promptCopy: string`; `promptPict: string`; `correct: PartId`; `distractors: PartId[]`; `confirmKey: string` |
| `PartId` | `enum {part_picture, part_title, part_author, part_back}` (index order 0–3) |
| `Save` (persisted) | `phase: enum {video, activity}`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `wrongInRound: int`; `judgeLock: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Line`, `Round`, and `PartId` records are static; the timeline is computed from `startMs`/`offsetMs` and never from wall-clock time. Round judgment reads only `Round.correct` and `Round.distractors`.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, text runs as content, per-part hit rects, and a highlight overlay on the video stage.
- **R-002** The player shall animate the section 9 effects: highlight, pop, soft/hint pulses, jiggle, depress, fade, flip, sparkle, confetti, ring fill/flash, chapter dot fill, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test per FR-011; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all interactive elements, with Escape = HOME.
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
| AC-02 | `title` with no save or `completed:true` | Play is pressed | a 2000 ms lead-in runs, chapter 1 line 1 plays at 2000 ms, and the save records phase `video` |
| AC-03 | the video playing | the clock runs with no input | chapters change at 16000/17200/29200/30400/42400 ms, and the round 1 prompt plays at 43600 ms |
| AC-04 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops and animation freezes; Play replays that line from its start and no line is skipped |
| AC-05 | chapter 3 playing | Replay is pressed | chapter 3 restarts at 30400 ms with its first line |
| AC-06 | round 1 (`front`) | the title is tapped | a sparkle and `sfx_ding` play, "Yes! That's the title — the name of the book." is spoken, and round 2 starts 600 ms after the clip ends with roundIndex 1 saved |
| AC-07 | rounds 1–5 answered correctly | round 5 is answered | confetti, `sfx_chime`, and "You know every part of a book cover!" play; after 2500 ms the end card shows Replay (≥96 px) and HOME |
| AC-08 | round 1 (`front`) | the author line is tapped | the author part jiggles, `sfx_soft_tap` plays, "This is the author's name." is spoken, and the prompt re-plays; no advance or score change |
| AC-09 | round 2 with one wrong tap already recorded | a second wrong part is tapped | the correct part (picture) soft-pulses 400 ms while the teach line and prompt re-play |
| AC-10 | round 1 (`front`) | the title is double-tapped within 500 ms | exactly one judged correct tap, one sparkle, one `sfx_ding`, and one round advance occur |
| AC-11 | round 2 (`front`) | a first finger holds the picture and a second finger taps the title before release | only the picture reacts; the title shows no feedback of any kind |
| AC-12 | any round | empty space >12 px from every part is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-13 | a round open, 12 s without input | idleness continues | the correct part hint-pulses for 3 s and `vo_hint_part` plays; any tap resets the timer and the hint repeats 12 s later |
| AC-14 | `title`, `video` paused, or `endcard`, 12 s without input | idleness continues | Play, Play/Pause, or Replay respectively hint-pulses for 3 s and `vo_hint` plays after the first gesture (visual-only before it) |
| AC-15 | a save `{phase:"activity", roundIndex:2}` | the page reloads and Play is pressed | round 3's scene and prompt appear directly; the video is not replayed |
| AC-16 | a save with `completed:true` | the page reloads and Play is pressed | chapter 1 of the video starts |
| AC-17 | round 2 open | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload round 2's prompt plays |
| AC-18 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-19 | the end card showing | Replay is pressed | chapter 1 of the video starts with its 2000 ms lead-in, and `completed` clears on the next save |
| AC-20 | speech synthesis unavailable | Play is pressed and a round is played | no voice plays, the video highlights and round pictograms still carry every step, correct taps still sparkle and advance, and the muted-speaker pictogram shows 5 s |
| AC-21 | storage blocked | the entry is played and HOME is pressed | all behavior works in memory; after reload Play starts the video |
| AC-22 | the video playing or a round open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen (or the open round's prompt re-plays once) and no progress is lost |
| AC-23 | any state | Tab is pressed repeatedly | focus follows the section 6 tab order, Enter/Space activates each control, and Escape returns HOME |
| AC-24 | a round open at 1024×768 | the viewport is resized to 800×1000 | phase, round, `videoMs`, and progress are unchanged and every part remains ≥80 px |
| AC-25 | chapter 2 playing | a chapter line begins | its voice plays and the highlight moves to the named part (title at line 1, author at line 3) within 100 ms, and the second chapter dot is accent-filled while the other two are not |
| AC-26 | any round with its prompt still playing | the correct part is tapped | the prompt stops and the confirmation is the only voice heard (no two voices overlap) |
| AC-27 | any state | an unbound key (e.g. `A`) is pressed or an unknown event fires | nothing changes on screen or in audio and play continues normally |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 42.4 s video plays its three chapters at the section 8 timings with highlights, gaps, dots, Pause/Resume, and Replay.
3. The five rounds run in order on the two scenes; correct taps advance, wrong taps teach and re-ask, and no score appears.
4. Phase and round survive a reload; Play resumes at the saved round (or the video when completed); the reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video topic and script, the five rounds, and the original book are designed inferences from the title; official sources publish no per-video description | designed (O3, D1–D3) |
| A2 | The book "The Sunflower Seed", both cover scenes, and all art, voice, and copy are original | designed (IP rule) |
| A3 | A runtime-rendered animated video is an acceptable realization; a pre-rendered file must match the section 8 timeline | designed (R-013) |
| A4 | TTS-generated clips or runtime TTS are acceptable | designed |
| A5 | Clip caps and line offsets approximate child-paced narration | designed (section 8) |
| A6 | Browsers block autoplay until the first user gesture | platform fact; handled by FR-018 |
| A7 | Background-tab timers may be throttled and speech may be suspended | known platform behavior; handled by FR-020 |
| A8 | A 12 px tap tolerance, ≥96 px parts, and a 500 ms activity tap throttle suit ages 2–5 | designed (section 7) |
| A9 | Age band 2–5 is a targeting choice inside the app's official 2–8 range | designed |
| A10 | No unlocks, adaptive difficulty, persisted clock, or round skip | designed (FR-022, section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** chapter script, timings, and highlights; round order, scenes, prompts, correct parts, and teach copy; hit tolerance and throttles; chrome set and keyboard map; target minimums; save key and shape; no fail state; asset provenance; acceptance criteria.
- **Free:** exact composition of the book and stage within the guidance, easing curves, sparkle/confetti particle look, voice timbre/TTS engine, optional title music, decorative title-scene details.
- **Not in this spec:** library or Videos-tab browsing, the other eight Book Basics entries, profiles, navigation shell, parental controls, localization, analytics, scoring, streaks, or teacher tooling.
