# Fiction and Nonfiction (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-fiction-and-nonfiction.md`](../book-basics-fiction-and-nonfiction.md) (official title "Fiction & Nonfiction")
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); series wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233
- **Spec status:** v1 — matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Player substitutions: three video chapters replace levels (section 8 is "Content and data"), the five two-bin sort rounds replace a level set, the endcard replaces a win condition; no scoring, no fail state.

## 2. Overview and learning objective

A child presses Play and watches a 44.4 s original animated video in three chapters about the
difference between story books (fiction) and fact books (nonfiction), then plays five two-bin sorting
rounds with six original book covers: tap a book to pick it up, then tap the "Story" or "Facts" bin.
A warm voice asks about each cover ("This book shows a kite with a smile. Story or facts?"); a
correct sort glides the book into its bin with a sparkle and a spoken confirmation, and a wrong sort
is answered by a teach line that explains the clue and re-asks. The skill is **text-type awareness** —
telling make-believe from true, the concept implied by the title. Age band: **2–8 across the
library**; this entry targets **Preschool–K (4–5 pre-reader)**. Expected session **1.5–2.5 minutes**
(44.4 s video + 2.0 s lead-in + 5 rounds + endcard).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Fiction & Nonfiction" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; `khan-academy-kids-games.md` lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish video titles only — no per-video descriptions; the focus implied by the title is an inference, not an official description | official (about the source's limits) | Catalogued entry lines 11–19 |
| O4 | The entry is a video in the Library's Videos section; the app targets ages 2–8 / preschool–2nd grade | official | Catalogued entry lines 3–4; `khan-academy-kids-games.md` lines 96, 160–177 |
| O5 | No Book Basics title art, audio, or content appears in any surveyed source | official | Catalogued entry Notes |
| D1 | The video topic — stories are make-believe, facts are true, and a cover's clues show which — and the three-chapter storyboard and script | designed | Inference from the title (O3); official sources publish no video content |
| D2 | The interaction: five two-bin sort rounds over six original book covers (tap a book, then tap Story or Facts) | designed | Shared brief's per-entry concept for this slug |
| D3 | The six original books ("The Star Kite", "Birds of the Meadow", "The Runaway Sock", "How Rain Falls", "The Sleepy Dragon", "Big Machines") and the Story/Facts bin glyphs | designed | Original content required; no Khan Academy media or characters |
| D4 | Player chrome (Play/Pause, Replay, HOME, reset logo, chapter and round dots), progress save/resume, idle hint, audio rules, no fail state | designed | Template v1 and the Book Basics shared brief |
| D5 | All art, video, voice, music, copy, and layout | designed | IP rule: all assets original (section 11) |

## 4. Player experience / core loop

A child presses Play. After a 2 s lead-in a shelf shows two books — "There are all kinds of books."
One tells a story, the other gives facts; each gets its glyph. The video opens a story book: a kite
with a smile — "Kites cannot smile. That is make-believe, so this book is a story." Then a fact book:
real birds with labels that name their parts — "Story or facts? Now you try!" The two bins slide in
and round 1 begins with two books. The child taps the smiling kite, hears "Story or facts?", taps
Story — the book glides into the bin, a sparkle and a ding, "Yes! A smiling kite is make-believe.
That's a story!" — then sorts the birds. Four rounds follow, one book each; a wrong bin gets a gentle
jiggle, a teach line, and a re-ask. After round 5 confetti pops, a voice praises, and the endcard
offers Replay and HOME.

**Core loop:** watch three teaching chapters (pause/replay chapter) → sort six books into Story or
Facts across five rounds → hear each sort affirmed or taught → celebrate → replay the activity or go
HOME.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, preload the scene art and audio (section 11), then `title`: an original decorative scene (a shelf with the two generic book covers and their glyphs floating), a Play target ≥96×96 CSS px, and an inconspicuous reset logo ≥64×64 CSS px (FR-017). No audio plays before the first user gesture (FR-019). When Play is pressed, the player shall unlock audio and then start fresh or resume: with no save, a `completed:true` save, or a saved phase `video` it shall stop `music_title`, run a **2000 ms lead-in** (stage fade 300 ms), start chapter 1 at video clock 0, and save `{phase:"video", roundIndex:0, completed:false}`; with a saved phase `activity`, `completed:false` it shall open that `roundIndex` directly (no lead-in, no video; FR-007). |
| FR-002 | The video shall run one accumulated playing-time clock (`videoMs`, advanced per frame only while `playing` and the tab is visible; never wall-clock), with video clock 0 = chapter 1 start; wall clock from Play = `videoMs` + 2000. Fixed timeline: chapter 1 **0–16,000**; gap **16,000–17,200**; chapter 2 **17,200–31,200**; gap **31,200–32,400**; chapter 3 **32,400–44,400**; post-video gap **44,400–45,600**. At each chapter end the clock auto-advances through the 1,200 ms gap (chapter art fades out 300 ms, holds, next chapter fades in 300 ms; chapter dot fills) — no tap needed. After the post-video gap the player shall enter `activity` round 1: scene at video **45,600** (wall 47,600), prompt at video **46,000** (wall 48,000). |
| FR-003 | Each chapter shall play its voice lines at the exact section 8 offsets: one voice clip per line (volume 1.0, one-shot). Each beat's scripted visual event fires at its own section 8 beat time (highlights appear in ≤100 ms of their beat). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a line, chapter, or transition. |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`. Pause shall cancel the current line and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current line's start (the line with the greatest offset ≤ the frozen clock; before line 1, line 1) and re-speak that line, so no line is skipped or repeated. Inside a chapter gap or the post-video gap, Resume continues the frozen segment with its remaining time and no voice. Pause/Resume is throttled to one toggle per 300 ms; a double-tap toggles once. |
| FR-005 | A Replay target ≥64×64 CSS px shall restart the current chapter from its first line: cancel the voice, set `videoMs` to the chapter start (**0 / 17,200 / 32,400**), and play line 1 immediately; later lines keep their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay is throttled to one restart per 500 ms and does not change the save. |
| FR-006 | Progress dots shall show position and are not interactive and not focusable: in `video`, 3 chapter dots (16 px, 8 px gaps; current = accent fill over 100 ms, no motion); in `activity` and on the `endcard`, 5 round dots (16 px, 8 px gaps). Round dot *n* fills accent over 100 ms, no motion, at round *n*'s last correct sort, and on a round entry every dot before the entry round shows filled (derived from the save; dots are never stored). |
| FR-007 | The activity shall run **5 fixed rounds** in section 8 order with no randomization: round 1 shows two items (`it_kite`, `it_birds`, left→right); rounds 2–5 show one item each. On each round entry the player shall show the round scene (fade 300 ms; the round is tappable immediately), pop the prompt pictogram (200 ms), speak the round's prompt (volume 1.0, one-shot) 400 ms after the scene, and save `{phase:"activity", roundIndex, completed:false}`. The prompt is skipped if any other voice has already started in that round. |
| FR-008 | Selection: when an item is tapped, it becomes the selected item — a select ring appears in ≤100 ms, `sfx_tap` plays (0.5, one-shot), and its question plays on its first selection in the round (1.0, one-shot; copy in section 8). Tapping the selected item again deselects it (ring removed, any playing question cancelled, `sfx_tap`); tapping another item moves the selection (the previous ring is removed, the new item's question plays). Selection is exclusive; it never sorts anything. |
| FR-009 | When a bin is tapped with no item selected, it is not a guess: the bin jiggles 300 ms, `sfx_soft_tap` plays (0.5, one-shot), and `vo_first` — "Tap a book first." (0.7, one-shot, ≤2.0 s) — speaks, throttled to one clip per 1,200 ms; a tap inside the throttle keeps its jiggle but plays no voice. No judgment occurs and the round stays open. |
| FR-010 | When the correct bin is tapped with an item selected, the item shall pop (200 ms) and sort-glide into that bin (300 ms), the bin shall flash (300 ms), a sparkle (≤6 particles) shall play at the bin center, and `sfx_ding` (0.8, 300 ms throttle) and the item's confirmation (1.0, one-shot; copy in section 8) shall play. A round is complete when all its items are sorted; **600 ms** after the round's last confirmation clip ends or is cancelled (1,200 ms after the sparkle when speech is unavailable) the next round starts (FR-007) or, after round 5, `celebrating` (FR-015). In round 1 the first item's sort instead schedules `vo_r1_mid` — "Now sort the other book." (1.0, one-shot, ≤2.2 s) — 600 ms after that confirmation ends, and the round stays open; `vo_r1_mid` is cancelled if the child selects the other item first. One correct sort is always enough; no score, streak, or bonus exists. |
| FR-011 | When the wrong bin is tapped with an item selected, the bin shall jiggle 300 ms, `sfx_soft_tap` shall play (0.5), and the item's teach line shall speak (0.7, one-shot; copy in section 8); the item stays selected and the item's question re-plays (1.0) **800 ms** after the teach clip ends or is cancelled (or after the jiggle when speech is unavailable); from the round's **second** wrong sort on, the correct bin soft-pulses 400 ms at the teach start. A scheduled re-ask is cancelled if the item is sorted, deselected, or replaced first. Wrong sorts never advance, subtract, lock, or end anything; retries are unlimited. |
| FR-012 | Input semantics: tap/click only — no drag gestures exist in this entry; the first pointer down wins and additional simultaneous pointers are ignored until release. Hit rects take a **12 px** expansion on all sides; on overlap the target whose center is nearest wins, exact ties resolve to the lowest target index (items left→right = 0–1, then `bin_story` = 2, `bin_facts` = 3, section 8); a tap >12 px from every target is an empty tap (no state change; idle timer resets). Empty taps include the shelf band and the stage around the bins. |
| FR-013 | In `activity`, each target (item or bin) accepts at most one judged tap per **500 ms**; taps inside a target's throttle produce no feedback and no sound. A double-tap on an item yields exactly one selection; a double-tap on a bin yields exactly one judgment (one sort or one teach cycle). Selection and bin judgment are separate: a bin tap 200 ms after an item selection is judged normally. |
| FR-014 | When no input has occurred for **12 s**: on `title` the Play target hint-pulses and `vo_hint` plays after the first gesture (visual-only before it); in `video` paused the Play/Pause target pulses and `vo_hint` plays (in `video` playing no hint fires — the moving video is its own cue); in `activity` with no item selected the round's next unsorted item (lowest index) hint-pulses and `vo_hint_pick` plays, and with an item selected the correct bin hint-pulses and `vo_hint_bin` plays; on `endcard` the Replay target pulses and `vo_hint` plays. Each hint lasts 3,000 ms, repeats every 12,000 ms of continued idleness, and is cancelled by any input, including an empty-space tap. |
| FR-015 | After round 5's last correct sort — 600 ms after its confirmation clip ends or is cancelled (1,200 ms after the sparkle when speech is unavailable; FR-010) — the player shall enter `celebrating`: confetti (≤40 particles, 2,500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot; copy in section 9), and save `{phase:"activity", roundIndex:4, completed:true}`. After 2,500 ms the `endcard` shall show the end panel with Replay ≥96×96 CSS px, HOME ≥64×64, and the five filled round dots; nothing auto-advances further. Replay restarts `activity` round 1 with empty dots and empty selection; `completed` clears on that round entry's save. |
| FR-016 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves (FR-018), and returns to `title`. On `title` (the player's home) and `loading` no HOME control is rendered and a HOME input is a no-op. |
| FR-017 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold duration (ring fill); releasing early resets the ring to 0 with no action. On completion it clears the storage key and in-memory progress and plays a ring flash (300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-018 | Persistence per section 10: save when title→Play starts the video (phase `video`, roundIndex 0), every activity round entry, completion (FR-015), and HOME; `updatedAt` refreshes on every save. Play resumes at the saved phase and round (`phase:"activity"` → that `roundIndex`; `phase:"video"` → chapter 1); when `completed` is true, Play starts at the video (chapter 1). |
| FR-019 | Audio: no audio before the first gesture; one voice clip at a time — any new voice clip (video line, item question, prompt, confirmation, teach, hint, praise) cancels the previous utterance; sfx may overlap each other; optional `music_title` loops at 0.15 on `title` and `endcard` only and stops when Play is pressed; while music plays, the melody bus ducks 0.5→0.4 within 120 ms when a 0.7-volume voice starts and restores over 200 ms. |
| FR-020 | Degradation: no speech synthesis → the video clock, highlights, and transitions run unchanged with no voice; activity rounds are carried by the item covers, the select ring, the two labeled glyph-marked bins, and the prompt pictogram; the correct-bin idle hint pulse still fires; sort advance uses the 1,200 ms fallback (FR-010); a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. |
| FR-021 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the current line and enter `video` paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return, a selected item's question re-plays once (or, with no selection, the round's prompt re-plays once) 400 ms later. Idle time counts visible time only; throttled timers may delay hints or advances but never lose progress (A7). |
| FR-022 | Accessibility and text: every interactive element (Play, reset logo, Play/Pause, Replay, HOME, each item, both bins, end-card Replay) carries an invisible accessible name (section 7). Visible text is content only: the bin labels "Story" and "Facts", the six book titles on their covers, and the video book titles; chrome is pictogram + invisible name. Every round is answerable from voice + pictogram + cover art alone. |
| FR-023 | Unknown events and inputs shall be ignored (no state change, no sound). Chapter order, round order, item order, and content are fixed; there is no randomization, unlock, adaptive difficulty, or timer that gates progress; no score, star, streak, or comparison is ever shown. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank warm-paper stage | initial; preload art and audio; audio locked |
| `title` | decorative shelf scene + the two book covers + Play + reset logo | the player's home; audio unlocks on the first gesture |
| `video(chapter, playback)` | animated stage + book + HOME, Play/Pause, Replay, 3 chapter dots | chapter 1–3; playback ∈ {playing, paused}; 1200 ms gaps |
| `activity(roundIndex)` | round scene + items + Story/Facts bins + prompt pictogram + round dots + HOME | roundIndex 0–4; round 1 has 2 items, rounds 2–5 one |
| `celebrating` | frozen round 5 scene + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME + 5 filled dots | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | no save, `completed:true`, or saved phase `video` | `video(1, playing)` | actions: 2000 ms lead-in; stop `music_title`; save `{phase:"video", roundIndex:0, completed:false}` |
| `title` | `PLAY_PRESSED` | saved phase `activity`, `completed:false` | `activity(roundIndex)` | actions: open the saved round directly (no lead-in, no video; FR-007 round-entry save) |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` / Space | 300 ms throttle clear | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / key on target | 500 ms throttle clear | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter `video`, or `activity(0)` after the post-video gap | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line; freeze clock (FR-021) |
| `activity` | `ITEM_TAP(id)` | item throttle clear | `activity(same)` | actions: FR-008 (select, deselect, or move selection) |
| `activity` | `BIN_TAP(bin)` | bin throttle clear, no selection | `activity(same)` | actions: FR-009 |
| `activity` | `BIN_TAP(correct)` | bin throttle clear, selection active | same round, or next round after the round's last item; after round 5 → `celebrating` | actions: FR-010; save `roundIndex` at the next round's entry; round 5 saves `completed` (FR-015) |
| `activity` | `BIN_TAP(wrong)` | bin throttle clear, selection active | `activity(same)` | actions: FR-011 |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | actions: cancel voice; pause idle (FR-021) |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: show end panel |
| `endcard` | `REPLAY_PRESSED` | — | `activity(0)` | actions: save (clears `completed` at round 1's entry) |
| `video` / `activity` / `celebrating` / `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| any visible state | `IDLE_12S` | 12,000 ms no input | same state | actions: FR-014 hint where FR-014 defines one |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — reset logo → Play; `video` — HOME → Play/Pause → Replay; `activity` —
HOME → items in index order (round 1: `it_kite` → `it_birds`; rounds 2–5: the single item) → Story bin
→ Facts bin; `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play from title | tap Play | Tab to Play + Enter/Space |
| Play / pause video | tap Play/Pause | Space (no control focused) or Enter/Space on the focused target |
| Replay chapter | tap Replay | R, or Enter/Space on the focused Replay |
| Pick up a book | tap the item | Tab to the item + Enter/Space |
| Put it back | tap the selected item again | Enter/Space on the focused selected item |
| Sort into a bin | tap Story or Facts | Enter/Space on the focused bin |
| Replay the activity | tap Replay on the endcard | Enter/Space on the focused Replay |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and end-card Replay ≥96×96 CSS px; HOME, Play/Pause, Replay, and the reset logo ≥64×64; activity items ≥200×260 at ≥1024 px wide (≥160×208 at 768–1023 px) and bins ≥320×200 (≥260×160) — all well above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px per FR-012; nearest center wins, exact ties to the lowest target index (items left→right 0–1, then Story 2, Facts 3); >12 px from every rect = empty tap (nothing changes; idle resets).
- **Multi-touch / gestures:** first pointer down wins; extra simultaneous pointers are ignored until release. No drag gestures exist, so no drag alternative is required. Item and bin taps share the per-target 500 ms throttle; Play/Pause 300 ms; Replay 500 ms.
- **Instructions without reading:** every round is voice + pictogram: the sort pictogram (`pict_prompt_sort`, a book cover with an arrow into two bins), the item's cover art as the clue, and the two bins carrying both label words and their glyphs (story = book + moon and star; facts = book + magnifying glass), which the video introduces. Visible text is limited to FR-022 content.
- **Accessible names:** invisible names on every interactive element, e.g. "Play", "Pause", "Replay chapter 2", "Home", "Reset saved progress (hold 3 seconds)", "Pick up The Star Kite", "Put back The Star Kite", "Story bin", "Facts bin", "The Star Kite, picked up", "Replay the sorting game".
- **Resize:** viewport resize or rotation mid-video or mid-round reflows per section 8, preserving state, progress, `videoMs`, selection, and sorted items.

## 8. Content and data

**Video storyboard (original, programmatic animation; all copy is original).** Video clock 0 =
chapter 1 start; wall clock from Play = video clock + 2,000 ms. Chapters last 16,000 + 14,000 +
12,000 ms; with 2 × 1,200 ms gaps the video clock runs 0–44,400, so video ends at wall 46,400. After
a final 1,200 ms gap, round 1's scene enters at video 45,600 and its prompt plays at video 46,000
(wall 48,000). Chapter art fades out 300 ms, holds, and fades in 300 ms; line offsets are
chapter-relative; each clip has a cap so it never crosses the next line or the chapter end; absolute
tick = chapter start + offset. Stage 1280×720; the book sits centered.

| Ch | Span (ms) | On-screen content and highlights (chapter-relative times) | Voice lines (offset → key: copy, cap) | Art guidance |
|---|---|---|---|---|
| 1 | 0–16,000 (16.0 s) | stage fades in 300 ms; two books pop at 600 (100 ms apart, pop 200 ms); both soft-pulse at 2,600; story highlight + story glyph (`pict_bin_story`) at 5,800; sparkle ≤6 at 9,000; facts highlight + facts glyph (`pict_bin_facts`) at 12,800 | 2,800 → `vo_v1_1`: "There are all kinds of books." (≤2.6 s); 6,200 → `vo_v1_2`: "Some books tell a story." (≤2.4 s); 9,200 → `vo_v1_3`: "A story is make-believe. It did not really happen." (≤3.8 s); 13,200 → `vo_v1_4`: "Other books give you facts. Facts are true." (≤2.6 s) | shelf band center; `bk_story_gen` (rust-red cover + story glyph) left, `bk_facts_gen` (teal cover + facts glyph) right; flat, rounded linework; no characters |
| 2 | 17,200–31,200 (14.0 s) | crossfade 300 ms to the story book at 0; cover opens at 3,200 (open 500 ms); sparkle ≤6 at 3,600; highlight around the kite's smiling face + zoom 1→1.1 at 7,000; book closes at 11,000 (500 ms); story glyph pops beside the cover at 11,000 | 200 → `vo_v2_1`: "Let's look inside a story book." (≤2.6 s); 3,400 → `vo_v2_2`: "This story is called 'The Star Kite.'" (≤3.0 s); 7,200 → `vo_v2_3`: "Look — the kite has a smile! Kites cannot smile." (≤3.6 s); 11,200 → `vo_v2_4`: "That is make-believe, so this book is a story." (≤2.6 s) | `ill_kite_spread`: cover with title "The Star Kite" (content); open page = smiling kite over a dark hill, stars, crescent moon |
| 3 | 32,400–44,400 (12.0 s) | crossfade 300 ms to the fact book at 0; cover opens at 2,400 (500 ms); three pointer lines draw at 6,000 (300 ms each, 200 ms stagger) to beak, wing, tail; gray label bars fade in 200 ms; `bin_story` + `bin_facts` slide up at 9,400 (300 ms) | 200 → `vo_v3_1`: "Now a fact book." (≤2.0 s); 2,600 → `vo_v3_2`: "This book is called 'Birds of the Meadow.'" (≤3.0 s); 6,200 → `vo_v3_3`: "It shows real birds, and labels name their parts." (≤3.4 s); `sfx_soft_tap` 0.5 at 9,400; 9,700 → `vo_v3_4`: "Story or facts? Now you try!" (≤2.2 s) | `ill_birds_spread`: cover with title "Birds of the Meadow" (content); spread = three realistic birds on a branch (no faces) + one bird diagram; bins carry the words "Story"/"Facts" with their glyphs, 320×200 each |

**Activity rounds (designed, fixed order; round 1 has 2 items, rounds 2–5 have 1).**

| # | Round prompt (1.0, one-shot, at round +400 ms) | Items (index order, left→right) | Prompt pictogram |
|---|---|---|---|
| 1 | `vo_prompt_r1`: "Let's sort two books. Tap a book, then tap Story or Facts." (≤4.0 s) | `it_kite`, `it_birds` | `pict_prompt_sort` |
| 2 | `vo_prompt_sort` (reused in rounds 2–5): "Tap the book, then tap Story or Facts." (≤3.0 s) | `it_sock` | `pict_prompt_sort` |
| 3 | `vo_prompt_sort` | `it_rain` | `pict_prompt_sort` |
| 4 | `vo_prompt_sort` | `it_dragon` | `pict_prompt_sort` |
| 5 | `vo_prompt_sort` | `it_machines` | `pict_prompt_sort` |

**Items (6; cover titles are visible content; the question plays on first selection and as the re-ask after a wrong sort).**

| Item id | Title | Kind | Cover art guidance (`ill_{item}`) | Question (`vo_q_*`, 1.0, ≤3.8 s) |
|---|---|---|---|---|
| `it_kite` | "The Star Kite" | story | night sky; diamond kite with a smiling face over a dark hill; stars and a crescent moon; no other text | "This book shows a kite with a smile. Story or facts?" |
| `it_birds` | "Birds of the Meadow" | facts | day meadow; three realistic birds (no faces) on a branch; thin pointer lines to beak, wing, tail with gray label bars | "This book shows real birds with labels. Story or facts?" |
| `it_sock` | "The Runaway Sock" | story | striped sock with two eyes and small feet mid-run on a path; motion lines; sunny sky | "This book is called 'The Runaway Sock.' The sock has eyes and feet! Story or facts?" |
| `it_rain` | "How Rain Falls" | facts | gray cloud over a green hill; raindrops; sun; curved arrows showing water up and rain down; gray label bars | "This book shows how rain falls, with arrows and labels. Story or facts?" |
| `it_dragon` | "The Sleepy Dragon" | story | round green dragon curled asleep on a hill, closed eyes, Zzz marks, night sky | "This book shows a big dragon, fast asleep on a hill. Story or facts?" |
| `it_machines` | "Big Machines" | facts | yellow digger with a raised arm and a big wheel on a building site; pointer lines + gray label bars; no faces | "This book shows a big yellow digger at work. Story or facts?" |

| Item | Confirmation (`vo_ok_*`, 1.0, ≤3.6 s) | Teach when the wrong bin is tapped (`vo_try_*`, 0.7, ≤3.4 s) |
|---|---|---|
| `it_kite` | "Yes! A smiling kite is make-believe. That's a story!" | "A kite with a smile is make-believe. That one is a story." |
| `it_birds` | "Yes! Real birds, real labels — that's facts!" | "Real birds are true things. That one is facts." |
| `it_sock` | "Yes! Real socks can't run. That's a story!" | "Real socks can't run. That one is make-believe — a story." |
| `it_rain` | "Yes! Rain is real, and the arrows show how it works. Facts!" | "Rain is real. That one tells true things — facts." |
| `it_dragon` | "Yes! There are no real dragons. That's a story!" | "There are no real dragons. That one is make-believe — a story." |
| `it_machines` | "Yes! A digger is real, and true things are facts!" | "A digger is a real machine. That one is facts." |

- **Worked example (round 1, one wrong sort, then the pair):** stage 1024×768; item 0 (`it_kite`) rect x = 288–488, y = 280–540; item 1 (`it_birds`) x = 536–736, y = 280–540; `bin_story` x = 160–480, y = 560–760; `bin_facts` x = 544–864, y = 560–760. At 0 the scene fades in and the pictogram pops; `vo_prompt_r1` plays at 400. At 2,000 the child taps (400, 300) — inside item 0 — the ring appears in ≤100 ms, `sfx_tap` plays, and `vo_q_kite` starts. At 6,000 the child taps `bin_facts` (700, 660): jiggle 300 ms, `sfx_soft_tap`, `vo_try_kite` (6,000–9,400), then `vo_q_kite` re-plays at 10,200. At 11,600 the child taps `bin_story` (320, 660): pop, sort glide, bin flash, sparkle ≤6, `sfx_ding`, `vo_ok_kite`; 600 ms after it ends `vo_r1_mid` plays and the round stays open for `it_birds`, whose sort completes the round. A tap at (512, 520) — >12 px from every target — is an empty tap: nothing changes, idle resets.
- **Progression rule:** fixed video 1→3, then fixed rounds 1→5; a round advances only when all its items are sorted; no randomization, no locks, no timers, no scores; wrong sorts and idle never advance or reset a round. Item order is fixed (left→right as listed).
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; stage 1024×768 centered; round dots 5 × 16 px with 8 px gaps at y = 104; prompt pictogram 96×96 centered at y = 144–240; items ≥200×260 at y = 280 with a ≥48 px gap (round 1: x = 288 and 536; single-item rounds: centered x = 412); bins 320×200 at y = 560 with a 64 px gap (Story x = 160, Facts x = 544); each item and bin hit rect ≥96×96. At 768–1023 px — chrome 88 px; dots 5 × 14 px with 6 px gaps; pictogram 80×80; items ≥160×208 with a ≥32 px gap; bins 260×160 with a 32 px gap; every hit rect ≥80×80. Height ≥700 px; below that scale the field by 0.85 keeping every target ≥80 px and every control ≥64 px.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video beat (section 8) | the beat's visual event | the beat's key — 1.0 — one-shot (sfx at stated volumes) |
| Chapter change | 300 ms fades around the 1,200 ms gap; dot fill | none |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Item selected | select ring in ≤100 ms; a move removes the old ring | `sfx_tap` — 0.5 — one-shot; question — 1.0 — one-shot |
| Item deselected | ring removed | `sfx_tap` — 0.5 — one-shot |
| Bin tapped, no item selected | bin jiggles 300 ms | `sfx_soft_tap` — 0.5 — one-shot; `vo_first` — 0.7 — one-shot (1,200 ms throttle) |
| Correct sort | pop 200 ms, sort glide 300 ms, bin flash 300 ms, sparkle ≤6 | `sfx_ding` — 0.8 — one-shot (300 ms throttle); confirmation — 1.0 — one-shot |
| Round 1 first item sorted | as above | `vo_r1_mid` — 1.0 — one-shot 600 ms after the confirmation ends |
| Wrong sort | bin jiggles 300 ms; from the 2nd wrong in the round the correct bin soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach — 0.7 — one-shot; question re-plays — 1.0 — one-shot 800 ms after the teach |
| Round 5 completion (last confirmation ends + 600 ms; FR-010) | confetti ≤40 particles, 2,500 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3 s | `vo_hint` / `vo_hint_pick` / `vo_hint_bin` — 1.0 — one-shot (visual-only before the first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play | none |
| Optional title/endcard music | none | `music_title` — 0.15 — loop on `title` and `endcard` only |

**Effect definitions (no undefined effects):** *highlight* = 4 px accent stroke around the named element, appears in ≤100 ms, holds until the next beat. *select ring* = 4 px accent stroke around the selected item, appears in ≤100 ms, holds until deselection or the sort begins. *pop* = scale 1→1.05→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3,000 ms. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *sparkle* = ≤6 square particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2,500 ms. *fade* = opacity 0→1 or 1→0 over 300 ms (scene or panel); item covers fade on and off over 200 ms. *crossfade* = the outgoing scene fades 1→0 while the incoming one fades 0→1, both over 300 ms. *sort glide* = the item translates from its shelf position to the bin center over 300 ms (ease-out) while scaling 1→0.5 and fading 1→0 over the last 200 ms; it rests in the bin at 0.5 scale. *bin flash* = the bin fill flashes accent at 25% opacity for 300 ms. *open* = the cover rotates around its left edge 0→−160° over 500 ms while the first page fades in over 200 ms; *close* reverses that rotation over the same 500 ms. *slide* = a bin translates up 160 px into place over 300 ms, ease-out. *line draw* = a pointer line grows from its label bar to the named part over 300 ms, 200 ms stagger between lines. *zoom* = scale 1→1.1 over 400 ms, then hold. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold; *ring flash* = ring opacity 1→0 over 300 ms. *dot fill* = a chapter or round dot switches to accent over 100 ms, no motion. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fades in over 250 ms. *duck* = melody bus 0.5→0.4 within 120 ms while a 0.7-volume voice plays, restore over 200 ms.

**Voice copy (designed, fixed):** the section 8 tables carry video, round, item, and teach copy. `vo_first` = "Tap a book first." · `vo_hint` = "Tap the blinking button to keep going." · `vo_hint_pick` = "Tap the blinking book first." · `vo_hint_bin` = "Now tap Story or Facts." · `vo_praise` = "You sorted story books and fact books!" (all 1.0 except `vo_first` at 0.7; one-shot; ≤2.8 s each, praise ≤3.4 s). Voice timbre and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (FR-001/FR-019); one voice clip at a time (FR-019); degradation per FR-020; background-tab timers may be throttled and speech suspended, handled by FR-021 (A7).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.bookBasics.fictionAndNonfiction.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** title→Play when the video starts (phase `video`, roundIndex 0); every activity round entry (phase `activity`, that `roundIndex`); completion (FR-015: phase `activity`, roundIndex 4, `completed:true`); HOME from any state. `updatedAt` refreshes on every save.
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round directly with empty selection and empty sorted state (the video is not replayed); `phase:"video"` opens chapter 1 (clock position is never stored). When `completed` is true, Play starts at the video (chapter 1).
- **Reset:** hold the title logo 3 s (ring fill) → clears the key and in-memory progress; the keyboard equivalent is holding Enter/Space 3 s on the focused logo (FR-017).
- **Deliberately not stored:** `videoMs` and clock position, chapter position, selected item, sorted items, wrong-sort counts, tap history, judgments, round dots, audio or language settings, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended; handled by FR-021. Storage blocked → run unsaved (FR-020).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy media or
characters appear. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row
says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_title` | image | decorative shelf scene behind the two book covers and their floating glyphs | 1280×720 SVG | static | SVG shapes |
| `bg_activity` | image | warm-paper stage with a wooden shelf band | 1024×768 SVG | static | SVG shapes |
| `bk_story_gen` / `bk_facts_gen` | image | chapter 1's generic books: rust-red cover with the story glyph; teal cover with the facts glyph | 360×480 SVG each | pop, soft pulse, highlight, sparkle | SVG shapes |
| `ill_kite_spread` | image | chapter 2 per section 8: story-book cover with title "The Star Kite" (content) and the open page with the smiling kite | 1280×720 SVG | cover; open/close | SVG shapes + text |
| `ill_birds_spread` | image | chapter 3 per section 8: fact-book cover "Birds of the Meadow" (content) and the open spread with real birds, pointer lines, and label bars | 1280×720 SVG | cover; open; line draw | SVG shapes + text |
| `ill_it_kite` / `ill_it_birds` / `ill_it_sock` / `ill_it_rain` / `ill_it_dragon` / `ill_it_machines` | image | the six item covers per section 8; each carries its title (content) | 200×260 SVG each (≥160×208 at 768–1023 px) | static; select ring, pop, sort glide | SVG shapes + text |
| `bin_story` / `bin_facts` | image | bin panels: the label word "Story"/"Facts" (content) plus its glyph; rounded paper fill with a 4 px ink border | 320×200 SVG (260×160 at 768–1023 px) | static; flash; jiggle; soft/hint pulse | SVG shapes + text |
| `pict_bin_story` / `pict_bin_facts` | image | story glyph: an open book with a crescent moon and star; facts glyph: an open book with a magnifying glass | 96×96 SVG each | pop in the video; static on the bins | SVG paths |
| `pict_prompt_sort` | image | prompt pictogram: a book cover with an arrow into two small bins | 96×96 SVG (80×80 at 768–1023 px) | pop on round entry | SVG paths |
| `pict_play` / `pict_pause` / `pict_replay` / `pict_home` / `pict_muted` | image | triangle; bars; circular restart arrow; house; speaker with slash | 64×64 SVG (Play and end-card Replay at 96×96; muted 48×48) | static; depress | SVG paths |
| `ring` / `sparkle` / `confetti` | rendered | 4 px accent progress ring; 4-point star particle; rect particle | logo-sized / runtime | ring fill + flash; one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_ding` / `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot (ding 300 ms throttle) | WebAudio blips/arpeggio |
| `vo_v{1-3}_{1-4}` | audio | 12 chapter lines with caps, section 8 | ≤3.8 s each | one-shot | TTS allowed |
| `vo_prompt_r1` / `vo_prompt_sort` / `vo_r1_mid` / `vo_q_*` (6) / `vo_ok_*` (6) / `vo_try_*` (6) | audio | round prompts, item questions, confirmations, teach lines, section 8 | ≤4.0 s each | one-shot | TTS allowed |
| `vo_first` / `vo_hint` / `vo_hint_pick` / `vo_hint_bin` / `vo_praise` | audio | copy in sections 8–9 | ≤2.8 s each (praise ≤3.4 s) | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title`/`endcard` after the first gesture | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, story indigo `#3B4C9A`, facts teal `#2E8B8B`, gold `#F2B33D`, sky `#BFE3F0`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); bin labels 40 px (32 px at 768–1023 px); item-cover titles 32 px (26 px at 768–1023 px); video book titles 48 px; no other visible words.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip, timeline and behavior unchanged (R-007, FR-020).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: 1-3`; `startMs/endMs: int` (video clock); `artKey: string`; `beats: Beat[]` |
| `Beat` | `atMs: int` (chapter-relative); `visual: string`; `voiceKey: string`; `copy: string`; `capMs: int`; `volume: number` |
| `Book` | `bookId: enum {it_kite, it_birds, it_sock, it_rain, it_dragon, it_machines}`; `title: string` (visible content); `kind: enum {story, facts}`; `coverKey: string`; `questionKey/questionCopy: string`; `okKey: string`; `tryKey: string` |
| `Round` | `index: 0-4`; `bookIds: string[]` (1–2, left→right); `promptKey/promptCopy: string`; `promptPict: string` |
| `BinId` | `enum {bin_story, bin_facts}` (index order 2–3, after the items) |
| `Save` (persisted) | `phase: enum {video, activity}`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `sortedIds: string[]`; `selectedItem: string \| null`; `wrongInRound: int`; `judgeAt: map<targetId, ms>`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Beat`, `Book`, `Round`, and `BinId` records are static; the timeline is computed from `startMs`/`atMs`, never from wall-clock time. Round judgment reads only `Book.kind` and the tapped `BinId`; adding a round = one `Round` + one `Book` record with its clips, no new code. This spec builds the five rounds of section 8.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, text runs as content, per-item and per-bin hit rects, a select-ring overlay, and a sort-glide transform from shelf to bin coordinates.
- **R-002** The player shall animate the section 9 effects: highlight, select ring, pop, soft/hint pulses, jiggle, depress, fade, crossfade, sort glide, bin flash, open/close, slide, line draw, zoom, sparkle, confetti, ring fill/flash, dot fill, end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test per FR-012; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all interactive elements, with Space = Play/Pause, R = Replay, and Escape = HOME.
- **R-005** The player shall play one voice clip at a time with sfx overlap and the FR-019 ducking rule; a failed clip is skipped without blocking the timeline or a round's advance schedule.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and never require sound to proceed.
- **R-007** The player shall use speech synthesis or provided clips for all lines, prompts, questions, teach lines, hints, and praise, with the FR-020 no-speech fallback.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-020), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during video animation, sort glides, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing phase, round, `videoMs`, playback, selection, sorted items, or progress.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-022).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss and no timeline desync (FR-021); hints may fire late.
- **R-013** Each chapter shall be renderable at runtime from `Chapter`/`Beat` data; a pre-rendered file is acceptable only if it matches the same section 8 timings.
- **R-014** The player shall request no camera, microphone, or network access at runtime.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥96 px) and the logo (≥64 px), and no audio has played |
| AC-02 | `title`, with no save or `completed:true` | Play is pressed | a 2,000 ms lead-in runs; chapter 1 line 1 plays at wall 4,800 ms and chapter 2 starts at wall 19,200 ms; the save records phase `video` |
| AC-03 | the video playing, no input | the clock runs | chapters change at video 16,000/17,200/31,200/32,400/44,400 with the chapter dot filling each time, round 1's scene appears at video 45,600, and its prompt plays at video 46,000 (wall 47,600/48,000) |
| AC-04 | round 1 open | `it_kite` is tapped | the select ring appears within 100 ms, `sfx_tap` plays, and "This book shows a kite with a smile. Story or facts?" is spoken |
| AC-05 | round 1, `it_kite` selected | the Story bin is tapped | the book pops and glides into the bin, the bin flashes, a sparkle and `sfx_ding` play, and "Yes! A smiling kite is make-believe. That's a story!" is spoken; the round stays open and "Now sort the other book." plays 600 ms after the clip ends |
| AC-06 | round 1, `it_kite` selected | the Facts bin is tapped | the bin jiggles, `sfx_soft_tap` plays, "A kite with a smile is make-believe. That one is a story." is spoken, the question re-plays 800 ms later, the item stays selected, and nothing advances or is lost |
| AC-07 | round 1, both books sorted correctly | the last confirmation ends | round 2 starts 600 ms later with its scene and prompt, and `roundIndex 1` is saved |
| AC-08 | round 5 open, one wrong sort already recorded | a second wrong bin is tapped | the correct bin soft-pulses 400 ms while the teach line and re-ask play; no advance and no loss |
| AC-09 | round 2, no selection | a bin is tapped | the bin jiggles, `sfx_soft_tap` and "Tap a book first." play, and no judgment occurs; a second bin tap within 1,200 ms keeps the jiggle but plays no voice |
| AC-10 | round 1, no selection | `it_kite` is double-tapped within 500 ms, then tapped again after the window | exactly one selection occurs for the double-tap; the later tap deselects it (ring removed, question cancelled, `sfx_tap`), and a following bin tap plays "Tap a book first." |
| AC-11 | round 1, `it_kite` selected | `it_birds` is tapped | only `it_birds` shows the ring; its question plays and the kite's ring is gone |
| AC-12 | any round | a tap >12 px from every item and bin is made | nothing changes on screen or in audio and the idle timer resets |
| AC-13 | round 3 open, no selection, 12,000 ms without input | idleness continues | `it_rain` hint-pulses for 3 s with "Tap the blinking book first."; any tap resets the timer and the hint repeats 12 s later |
| AC-14 | round 3, `it_rain` selected, 12,000 ms without input | idleness continues | the Facts bin hint-pulses 3 s with "Now tap Story or Facts." |
| AC-15 | `title`, `video` paused, or `endcard`, 12,000 ms without input | idleness continues | Play, Play/Pause, or Replay respectively hint-pulses 3 s and `vo_hint` plays after the first gesture (visual-only before it); while the video plays no hint fires |
| AC-16 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops and animation freezes; Play replays that line from its start and no line is skipped |
| AC-17 | chapter 3 playing | Replay is pressed | chapter 3 restarts at video 32,400 with its first line |
| AC-18 | the video playing | a second finger lands while the first is held | only the first pointer's target reacts; the second is ignored until release |
| AC-19 | a save `{phase:"activity", roundIndex:2}` | the page reloads and Play is pressed | round 3's scene and prompt appear directly with an empty selection, empty sorted state, and round dots 1–2 filled; the video is not replayed |
| AC-20 | a save with `completed:true` | the page reloads and Play is pressed | chapter 1 of the video starts |
| AC-21 | round 2 open | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload Play opens round 2 with its prompt |
| AC-22 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-23 | rounds 1–5 answered | round 5's last sort lands and its confirmation ends | 600 ms later confetti, `sfx_chime`, and "You sorted story books and fact books!" play; 2,500 ms after the confetti starts the endcard shows Replay (≥96 px), HOME, and five filled dots, with no score or star anywhere |
| AC-24 | the endcard | Replay is pressed | round 1 opens with empty dots and its prompt |
| AC-25 | speech synthesis unavailable | Play is pressed and a full round is played | no voice plays; video beats still fire at their times; the round works from the covers, select ring, and labeled glyph bins; a correct sort advances 1,200 ms after the sparkle; the muted pictogram shows 5 s |
| AC-26 | storage blocked | the entry is played and HOME is pressed | all behavior works in memory; after reload Play starts the video |
| AC-27 | the video playing or a round open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen, or the open round's voice re-plays once (the selected item's question, or the round prompt when nothing is selected), and no progress is lost |
| AC-28 | any state | Tab is pressed repeatedly, then Enter/Space and Escape are used | focus follows the section 6 tab order with an accessible name on each stop (activity: HOME → items → Story → Facts), Enter/Space activates, and Escape returns HOME |
| AC-29 | round 1 at 1024×768 | the viewport is resized to 800×1000 | phase, round, selection, sorted items, and progress are unchanged and every item and bin target remains ≥80 px |
| AC-30 | `title` after a first gesture with music enabled, or any round where a teach or question is speaking | another voice clip starts | the previous utterance stops immediately so only the newest clip is heard, and `music_title` is audible only on `title`/`endcard` |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 44.4 s video plays its three chapters at the section 8 timings with highlights, gaps, dots, Pause/Resume, and Replay, then hands over to round 1 at video 45,600/46,000.
3. All 5 rounds work: pick up an item, sort it into Story or Facts; correct sorts glide and advance, wrong sorts teach and re-ask, the no-selection case says "Tap a book first.", and no score appears.
4. Phase and round survive a reload (selection and sorted items do not); a `completed` save restarts the video; the reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video topic (stories are make-believe, facts are true) and the sort activity are designed inferences from the title; official sources publish no per-video description | designed (O3, D1–D3) |
| A2 | The six books, both bins, and all art, voice, copy, and music are original | designed (IP rule) |
| A3 | The bin labels "Story"/"Facts" are visible content words (like the siblings' title pages); all instructions remain voice + pictogram | designed (FR-022) |
| A4 | Round 1 carries two items so six books fit five rounds and both bins are used before the single-item rounds | designed (D2, section 8) |
| A5 | A runtime-rendered animated video is acceptable; a pre-rendered file must match the section 8 timeline | designed (R-013) |
| A6 | TTS-generated clips or runtime TTS are acceptable; clip caps approximate child-paced narration | designed (section 8) |
| A7 | Browsers block autoplay until a gesture; background-tab timers may be throttled and speech suspended | platform facts; handled by FR-019 and FR-021 |
| A8 | A 12 px tolerance, ≥96 px item/bin zones, and a 500 ms per-target throttle suit ages 4–5 inside the app's 2–8 range | designed (section 7) |
| A9 | The re-ask after a wrong sort re-plays the item question (the clue), not the round prompt | designed (FR-011) |
| A10 | No unlocks, adaptive difficulty, scoring, persisted selection, or persisted sorted state | designed (FR-023, section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** chapter script, timings, and beats; round order, items, prompts, questions, confirmations, and teach copy; the two-bin mechanic and its rules; hit tolerance and throttles; chrome set and keyboard map; target minimums; save key and shape; no fail state; asset provenance; acceptance criteria.
- **Free:** exact composition of the stage, books, and bins within the guidance; easing curves; particle look for sparkles and confetti; voice timbre and TTS engine; optional title/endcard music; decorative title-scene details; glyph drawing details.
- **Not in this spec:** library or Videos-tab browsing, the other eight Book Basics entries, book selection, reading levels, profiles, navigation shell, parental controls, localization, analytics, scoring, streaks, or teacher tooling.
