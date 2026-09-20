# Story Structure (Book Basics)

## 1. Front matter

- **Entry type:** Interactive player — short video + comprehension interaction (Book Basics series)
- **Catalogued entry:** [`book-basics-story-structure.md`](../book-basics-story-structure.md)
- **Official source:** [App Store listing — version history (v8.1.3)](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); series wording in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 229–233 ("Book Basics" video collection, named titles)
- **Spec status:** v1 — Book Basics spec; matches template v1 and the Book Basics shared brief; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in FR-019); no network after load
- **Conditional sections:** all 16 included. Player equivalents: three video chapters replace levels; five order-three rounds (each step is one tap that fills an ordered slot) replace a scoring loop; a wordless celebration and end card replace a win condition; no scoring, no fail state.

## 2. Overview and learning objective

A child presses Play and watches a 42.4 s original animated video in three chapters about story
structure — every story has a beginning, a middle, and an end — told through an original bird story.
Then five rounds follow: three wordless story-picture cards are shown, and the child taps them in
story order, one at a time, into slots numbered 1–2–3 (four original mini-stories, plus the video's
bird story as the round-1 warm-up). The skill is **narrative sequencing (beginning–middle–end)**, the
comprehension concept implied by the title. Age band: **2–8 across the library**; this entry targets
**Preschool–K (4–5)**, where story sequencing is a kindergarten comprehension skill. Expected
session: **2–3 minutes**.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Story Structure" is one of the nine Book Basics videos named in the app's official version history (v8.1.3) | official | Catalogued entry; `khan-academy-kids-games.md` lines 229–233 |
| O2 | The Book Basics series covers foundational book and reading concepts | official | Catalogued entry description |
| O3 | Official sources publish the video titles only — no per-video descriptions; the focus implied by the title is an inference, not an official description | official (about the source's limits) | Catalogued entry Notes |
| O4 | The app is officially for children ages 2–8 (Preschool–2nd Grade) | official | `khan-academy-kids-games.md` lines 160–163 |
| O5 | Official sources publish the video titles only — no per-video descriptions; nothing beyond the titles documents this video's content | official (about the source's limits) | Catalogued entry; O3 |
| D1 | The video topic — beginning, middle, end — plus the three-chapter storyboard, script, and bird example story | designed | Inference from the title (O3); no official description exists |
| D2 | The interaction: five order-three rounds (tap 3 story-picture cards in order) over 4 mini-stories; round 1 reuses the video's bird story as a warm-up, rounds 2–5 are the brief's four mini-stories | designed | Shared brief's per-entry concept; reconciles its 5 rounds with its 4 mini-stories |
| D3 | All stories, art, voice, music, and copy are original; no Khan Academy media or characters | designed | IP rule (section 11) |
| D4 | Player chrome, states, progress save/resume, idle hint, audio rules, no fail state | designed | Template v1 and the Book Basics shared brief |
| D5 | Age targeting 4–5 inside the official 2–8 range | designed | Comprehension-stage choice (section 2) |

## 4. Player experience / core loop

A child presses the big Play on a title scene showing three wordless story panels. After a 2 s lead-in
the panels appear one by one: the voice explains that every story has a beginning, a middle, and an
end, using an original bird story — first a bird finds a twig, next it builds its nest, last it rests
in the warm nest. The three panels become the first round's cards — the round scene fades in and the cards pop in (FR-007); a slot strip
numbered 1–2–3 appears, and the voice asks "What happens first?" The child taps a card — it sparkles,
slides into slot 1 with a ding, and the voice confirms. Two more taps finish the bird story, and four
new mini-stories follow. A wrong card jiggles gently and the voice names it and re-asks. After the
fifth story confetti falls, the voice praises, and an end card offers Replay or HOME. HOME returns to
the title; Play later resumes at the saved round.

**Core loop:** Play → watch 3 chapters (pause/replay chapter) → 5 order-three rounds (tap cards into
slots 1–2–3, hear each tap affirmed or taught) → celebrate → replay the activity or go HOME.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show `loading`, prepare the scene art and audio (section 11), then `title`: a decorative scene with a wordless three-panel story strip, a Play target ≥96×96 CSS px, and an inconspicuous reset logo ≥64×64 CSS px top-right (FR-015). No audio plays before the first gesture (FR-018). When Play is pressed, it shall unlock audio, stop `music_title`, run a **2000 ms** lead-in, start `video` chapter 1 at `videoMs = 2000` (FR-002), and save `{phase:"video", roundIndex:0, completed:false}`. |
| FR-002 | The video shall run one accumulated playing-time clock (`videoMs`, advanced per frame only while `playing` and the tab is visible; never wall-clock), on this fixed timeline: lead-in **0–2000**; chapter 1 **2000–16000**; gap **16000–17200**; chapter 2 **17200–30200**; gap **30200–31400**; chapter 3 **31400–44400**; post-video gap **44400–45600**. At each chapter end the clock auto-advances through the **1200 ms** gap (chapter art fades out 200 ms, holds, next fades in 200 ms; the current chapter dot fills). After the post-video gap the player shall enter `activity` round 1 at **45600** and speak its step-1 prompt (FR-007) 400 ms later at **46000** — no tap needed. |
| FR-003 | Each chapter shall play its lines at the exact section 8 offsets: one voice clip per line (volume 0.7, one-shot) with its scripted highlight moving to the named panel at the line's start (highlight appears in ≤100 ms). Voice timing never gates the clock: a late, missing, or cancelled clip never shifts a line, chapter, or transition. |
| FR-004 | A Play/Pause target ≥64×64 CSS px shall toggle playback in `video`. Pause shall cancel the current line and freeze `videoMs` and all animation; Resume shall set `videoMs` back to the current line's start (the line with the greatest chapter-relative offset ≤ the frozen clock − the chapter start; before line 1, line 1) and re-speak that line, so no line is skipped or repeated. Inside a chapter gap or the post-video gap, Resume continues the frozen segment with its remaining time and no voice. Pause/Resume is throttled to one toggle per 300 ms; a double-tap toggles once. |
| FR-005 | A Replay target ≥64×64 CSS px shall restart the current chapter from its first line: cancel the voice, set `videoMs` to the chapter start (**2000 / 17200 / 31400**), and play line 1 immediately; later lines keep their section 8 offsets. During a gap, Replay restarts the chapter just ended (the post-video gap restarts chapter 3). Replay does not change the save and is throttled to one restart per 500 ms. |
| FR-006 | Chapter dots (3 dots, 12 px, 8 px gaps; current = accent fill over 100 ms, no motion) shall show the current chapter in `video`; they are not interactive and not focusable. |
| FR-007 | The activity shall run **5 fixed rounds** in section 8 order with no randomization. Each round shows an ordered slot strip (slots 1–3 with numeral chips) and the round's 3 cards in their fixed section 8 arrangement (left→center→right position indices 0–2). On round entry the player shall fade the scene in over 200 ms, pop the cards in (200 ms, left→right), speak the round's step-1 prompt (volume 1.0, one-shot) at round +400 ms, and save `{phase:"activity", roundIndex, completed:false}`. |
| FR-008 | When the card that is next in story order is tapped, the player shall judge it correct: sparkle (≤6 particles) on the card, play `sfx_ding` (0.8, 300 ms throttle), slide the card into the next empty slot over 300 ms, fill that slot's numeral chip (slot fill), and speak the step's confirmation line (1.0, one-shot), starting as the card reaches its slot. After steps 1 and 2 the next step's prompt (`vo_next` / `vo_last`) plays **600 ms** after the confirmation clip ends (or 900 ms after the card reaches its slot when speech is unavailable). After step 3 the round is complete: the filled strip soft-pulses 400 ms and the next round starts **600 ms** after the step-3 confirmation clip ends (or 1200 ms after the card reaches its slot without speech), or round 5 enters `celebrating` (FR-013). One correct tap per step is always enough; no score, streak, or bonus exists. |
| FR-009 | When a card that is not next in story order is tapped, the player shall jiggle it 300 ms, play `sfx_soft_tap` (0.5), and speak that card's teach line naming its position (beginning/middle/end) and content, then repeat the current step's question (0.7, one-shot, throttled to one per 1200 ms — taps inside the throttle keep their visual feedback, play no voice, and schedule no extra prompt re-play). The step prompt re-plays (1.0) 800 ms after the teach clip ends (or 500 ms after the jiggle when no voice). From the round's **second** judged wrong tap on (FR-010), the step's correct card soft-pulses 400 ms after each judged wrong tap. Wrong taps never advance, subtract, lock, or end anything. |
| FR-010 | In `activity`, card taps are judged at most once per **500 ms**; taps inside the throttle produce no feedback and no sound. A double-tap on a card yields exactly one judged tap, one sparkle, one slide, and one confirmation. Placed cards and slots are inert: taps on them are empty taps (FR-011). At step 3 exactly one card is unplaced, so its tap is always judged correct by elimination; no wrong tap is possible in step 3. |
| FR-011 | Input semantics: tap/click only — no drag gestures exist (the card-to-slot move is a scripted 300 ms animation, never a user drag); the first pointer down wins and additional simultaneous pointers are ignored until release. Hit rects take a **12 px** expansion on all sides; on overlap the card whose center is nearest wins, exact ties resolve to the lowest position index (0 = left, 1 = center, 2 = right); a tap >12 px from every unplaced card is an empty tap (no state change; idle timer resets). Empty taps include the stage background, filled slots, and cards already placed. |
| FR-012 | When no input has occurred for **12 s**: on `title` the Play target hint-pulses and `vo_hint` plays after the first gesture (visual-only before it); in `video` paused the Play/Pause target hint-pulses and `vo_hint` plays; in `video` playing no hint fires (the moving video is its own cue); in `activity` the current step's correct card hint-pulses and the step's prompt clip re-plays (1.0); on `endcard` the Replay target hint-pulses and `vo_hint` plays. Each hint lasts 3 s, repeats every 12 s of continued idleness, and is cancelled by any input, including an empty-space tap. |
| FR-013 | After round 5's step-3 correct tap the player shall enter `celebrating`: confetti (≤40 particles, 2500 ms), `sfx_chime` (0.8, one-shot), `vo_praise` (1.0, one-shot), and save `{phase:"activity", roundIndex:4, completed:true}`. After 2500 ms the `endcard` shows the end panel with Replay ≥96×96 CSS px and HOME ≥64×64; nothing auto-advances further. |
| FR-014 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `video`, `activity`, `celebrating`, and `endcard`; it cancels any voice and timer, saves, and returns to `title`. On `title` and `loading` no HOME control is rendered and a HOME input is a no-op (title is home). |
| FR-015 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold duration (releasing early resets it to 0 with no action); on completion it clears the save and in-memory progress and plays a ring flash (300 ms) plus `sfx_soft_tap` (0.5, one-shot). Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-016 | The entry shall have no fail state: wrong taps, empty taps, rapid or repeated taps, multi-touch, and idle time never deduct, lock, end, or lose progress, and no score, star, streak, or comparison is ever shown. |
| FR-017 | Persistence per section 10: save on title→Play (phase `video`, roundIndex 0), every activity round entry, completion (FR-013), and HOME; `updatedAt` refreshes on every save. Play resumes at the saved phase and round — `phase:"activity"` opens that `roundIndex` **at step 1** (step and placed cards are never stored; cards return to their fixed arrangement); `phase:"video"` opens chapter 1. When `completed` is true, Play starts at the video (chapter 1) and immediately writes `{phase:"video", roundIndex:0, completed:false}`. |
| FR-018 | Audio: no audio before the first gesture; one voice clip at a time — any new voice clip (video line, prompt, confirmation, teach, hint, praise) cancels the previous utterance; sfx may overlap each other; optional `music_title` loops at 0.15 on `title` only and stops at Play; while a teach voice plays, the music bus ducks 0.5→0.4 within 120 ms and restores over 200 ms. |
| FR-019 | Degradation: no speech synthesis → the video clock, highlights, and transitions run unchanged with no voice; activity steps are carried visually by the slot strip — the next empty slot's numeral chip grows to 128×128 px (drawn over the slot frame where it exceeds it) and soft-pulses while its step is unanswered; a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. Missing visual asset → draw a stub shape, log a warning, keep playing. |
| FR-020 | Background tab: when the tab becomes hidden while `video` is playing, the player shall cancel the current line and enter `video` paused with `videoMs` frozen; on return it stays paused until Play (FR-004). Hidden in `activity` cancels the current voice and pauses the idle timer; on return an unanswered step re-plays its prompt once (1.0) after 400 ms and any pending step/round advance fires. Idle time counts visible time only; throttled timers may delay hints or advances but never lose progress (A8). |
| FR-021 | Accessibility and text: every interactive element (logo, Play, Play/Pause, Replay, HOME, each unplaced card, end-card Replay) carries an invisible accessible name (section 7). Visible text is content only: the slot numeral chips 1–2–3 (36 px) and the video's numeral chips; all instructions reach non-readers by voice + pictogram. Focus indicator: 4 px outline, ≥3:1 contrast. Tab order per state (section 6). |
| FR-022 | Unknown events and inputs shall be ignored (no state change, no sound). Chapter order, round order, card arrangements, and content are fixed data; there is no randomization, shuffle, unlock, adaptive difficulty, or timer that gates progress. |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank warm-paper scene | initial; prepare scenes, video art, audio; audio locked |
| `title` | decorative three-panel strip + Play + reset logo top-right | the player's home; audio unlocks on first gesture |
| `video(chapter, playback)` | animated stage + 3 panels + HOME, Play/Pause, Replay, 3 dots | chapter 1–3; playback ∈ {playing, paused}; 1200 ms gaps between chapters |
| `activity(roundIndex, step)` | slot strip (1–3) + 3 cards + HOME | roundIndex 0–4; step ∈ {1,2,3}; save records phase/roundIndex only |
| `celebrating` | frozen round 5 scene + confetti | auto-exits after 2500 ms |
| `endcard` | end panel + Replay + HOME | terminal until Replay or HOME |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: arm audio; no sound before first gesture |
| `title` | `PLAY_PRESSED` | — | `video(1, playing)` | actions: lead-in 2000 ms; stop `music_title`; save phase `video` |
| `title` | `RESET_HOLD` | hold 3 s on logo | `title` | actions: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `video` | `PLAY_PAUSE` / Space | 300 ms throttle clear | `video(same chapter, toggled)` | actions: FR-004; `sfx_tap` 0.5 |
| `video` | `REPLAY` / R / key on target | 500 ms throttle clear | `video(same chapter, playing)` | actions: FR-005; `sfx_tap` 0.5 |
| `video` | `CHAPTER_END` / auto-advance | clock reaches a boundary | next chapter `video`, or `activity(0, 1)` after the post-video gap | actions: FR-002; on activity entry save phase `activity`, roundIndex 0 |
| `video` | `TAB_HIDDEN` | `playing` | `video(same chapter, paused)` | actions: cancel line; freeze clock (FR-020) |
| `video` / `activity` / `celebrating` / `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: cancel voice/timers; save |
| `activity` | `CARD_TAP(idx)` | no judgment in last 500 ms; unplaced card next in story order; step 1–2 | `activity(same, step+1)` | actions: FR-008 |
| `activity` | `CARD_TAP(idx)` | no judgment in last 500 ms; unplaced card not next; step 1–2 | `activity(same, step)` | actions: FR-009 |
| `activity` | `CARD_TAP(idx)` | no judgment in last 500 ms; the last unplaced card; step 3 | `activity(roundIndex+1, 1)`; after round 5 → `celebrating` | actions: FR-008; on round entry save roundIndex; round 5 saves `completed` (FR-013) |
| `activity` | `TAB_HIDDEN` | — | `activity(same)` | actions: cancel voice; pause idle (FR-020) |
| `activity` | `IDLE_12S` | visible, no input 12 s | `activity(same)` | actions: FR-012 hint |
| `celebrating` | `CELEBRATION_DONE` | 2500 ms elapsed | `endcard` | actions: show end panel |
| `endcard` | `REPLAY_PRESSED` | — | `video(1, playing)` | actions: 2000 ms lead-in; `completed` clears on the next save (FR-017) |
| `endcard` | `HOME_PRESSED` / Escape | — | `title` | actions: save |
| any visible state | `IDLE_12S` | 12 s no input | same state | actions: FR-012 hint |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `title` — logo (reset) → Play; `video` — HOME → Play/Pause → Replay; `activity` — HOME → unplaced cards in initial position-index order (0-left → 1-center → 2-right; placed cards leave the tab order; when a focused card is placed, focus moves to the next unplaced card in index order, lowest first, or to HOME when none remain); `celebrating` — HOME only; `endcard` — HOME → Replay; `loading` — no focusables. Slots and chapter dots are not focusable.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play | tap the Play target | Tab to Play + Enter/Space |
| Pause / resume | tap the Play/Pause target | Space (no control focused), or Enter/Space on the focused target |
| Replay chapter | tap the Replay target | R, or Enter/Space on the focused target |
| Answer a step | tap an unplaced card | Tab to the card + Enter/Space |
| Replay the activity | tap Replay on the end card | Enter/Space on the focused Replay |
| HOME | tap HOME | Escape |
| Reset | hold the title logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play and end-card Replay ≥96×96 CSS px; HOME, Play/Pause, Replay, and the logo ≥64×64; cards are 240×180 px at ≥1024 px wide (≥96×96) and 200×150 px at 768–1023 px (≥80×80) — all above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px expansion per FR-011; nearest center wins, exact ties to the lowest position index; >12 px from every unplaced card is an empty tap (nothing changes; idle resets).
- **Multi-touch / gestures:** first pointer down wins; extra simultaneous pointers are ignored until release. No drag gestures exist, so no drag alternative is required. Card judgments are throttled at 500 ms (FR-010); Play/Pause at 300 ms; Replay at 500 ms; teach voices at 1200 ms (FR-009).
- **Instructions without reading:** every step is voice + the slot strip (numerals are content); the current step's next empty slot is visually the target; chrome is pictogram + invisible name.
- **Accessible names:** invisible names on every interactive element, e.g. "Play", "Pause", "Resume", "Replay chapter 2", "Home", "Reset saved progress (hold 3 seconds)", "Play again", and per card, e.g. "Story card: a bird finds a twig", "Story card: the boat sails through big waves".
- **Resize:** viewport resize or rotation mid-video or mid-round reflows per section 8, preserving state, progress, `videoMs`, step, placed cards, and playback.

## 8. Levels and content data

**Video storyboard (original, programmatic animation; all copy is original).** Chapters sum to 14.0 + 13.0 + 13.0 = 40.0 s; + the two 1200 ms inter-chapter gaps = **42.4 s** of video (`videoMs` 2000–44400); + the 2000 ms lead-in and the 1200 ms post-video gap, round 1 enters at 45600 and its prompt plays at 46000. Stage 1280×720; three panels of 320×240 px with 40 px gaps, centered. Line offsets are chapter-relative; each clip has a cap so it never crosses the next line or the chapter end; absolute tick = chapter start + offset.

| Ch | Span (ms) | Dur | On-screen content and highlight | Voice lines (offset → key: copy, cap) | Art guidance |
|---|---|---|---|---|---|
| 1 | 2000–16000 | 14.0 s | stage fades in 200 ms; three empty panel frames pop in left→right at 300/600/900 ms; from line 2 a 4 px accent outline hugs panel 1; bird-with-twig art fades into panel 1 at line 3 | 0 → `vo_v1_1`: "Every story has a beginning, a middle, and an end." (≤4.0 s); 4800 → `vo_v1_2`: "The beginning tells how the story starts." (≤3.2 s); 9200 → `vo_v1_3`: "First, a bird finds a twig." (≤2.8 s) | flat vector, cream stage; small round orange-breasted bird; twig = two brown strokes; morning sun |
| 2 | 17200–30200 | 13.0 s | outline moves to panel 2 at line 1; nest-building art fades into panel 2 at line 2 with two twig shapes sliding in at 5000/5600 (300 ms each); panels 1–2 soft-pulse together at line 3 | 0 → `vo_v2_1`: "The middle tells what happens next." (≤3.0 s); 3800 → `vo_v2_2`: "Next, the bird builds its nest, twig by twig." (≤3.8 s); 8200 → `vo_v2_3`: "The middle is where something new happens." (≤3.4 s) | nest = woven brown ovals, half built; same stage and bird |
| 3 | 31400–44400 | 13.0 s | outline moves to panel 3 at line 1; resting-bird art fades into panel 3 at line 2; numeral chips 1→2→3 fill above the panels at line 3 (200 ms stagger; `sfx_chime` 0.8, one-shot at 7600); the three panels pop in sequence at line 4 | 0 → `vo_v3_1`: "The end tells how the story finishes." (≤3.2 s); 3800 → `vo_v3_2`: "Last, the bird rests in its warm nest." (≤3.4 s); 7600 → `vo_v3_3`: "Beginning, middle, end — the whole story." (≤3.2 s); 11000 → `vo_v3_4`: "Now put the story in order!" (≤1.8 s) | panels 1–3 complete; numeral chips 48×48, ink numerals; optional dusk tint |

**Stories and rounds (fixed order, fixed arrangements; the tap order is derived, never shuffled).** Round 1 reuses the video's three panels as its cards. Each card is wordless art plus an invisible accessible name; its quoted phrase is the copy fragment its confirmation and teach lines use. Step-1 prompt cap ≤4.2 s; `vo_next` = "What happens next?" and `vo_last` = "What happens last?" (shared, ≤1.6 s each, 1.0, one-shot).

| # | Story (id) | Cards, left → center → right (B/M/E art → phrase) | Correct tap order | Step-1 prompt (1.0) |
|---|---|---|---|---|
| 1 | Bird (`bird`, warm-up) | L B: bird on a branch, twig in beak → "a bird finds a twig" <br> C M: bird weaving twigs, nest half built → "the bird builds its nest" <br> R E: bird snug in the finished nest, eyes closed → "the bird rests in its warm nest" | left → center → right | `vo_p1`: "Let's put the bird story in order. What happens first?" |
| 2 | Boat (`boat`) | L M: boat tilted on a big blue wave, white spray → "the boat sails through big waves" <br> C E: boat pulled up on a sandy island shore beside a palm → "the boat reaches the island" <br> R B: red-sail boat tied to a wooden dock, calm water → "the boat waits at the dock" | right → left → center | `vo_p2`: "Now the boat story. What happens first?" |
| 3 | Kite (`kite`) | L E: kite resting on the grass, child kneeling beside it → "the kite comes back down" <br> C B: child in a green field holding a red diamond kite, string slack → "a child holds the kite" <br> R M: kite high in the sky beside two clouds, string taut → "the kite flies up high" | center → right → left | `vo_p3`: "Now the kite story. What happens first?" |
| 4 | Rain (`rain`) | L M: steady rain making a wide puddle on the street → "the rain makes a big puddle" <br> C B: gray cloud with the first drops over a street → "a cloud fills with rain" <br> R E: sun and a rainbow arc over the shiny puddle → "the sun comes out with a rainbow" | center → left → right | `vo_p4`: "Now the rain story. What happens first?" |
| 5 | Ant (`ant`) | L E: three ants sharing the crumb at the mound door → "the ant shares it with its friends" <br> C M: ant pushing the crumb toward a dirt mound → "the ant pushes the crumb home" <br> R B: small ant beside a big bread crumb on a path → "an ant finds a crumb" | right → center → left | `vo_p5`: "Last one — the ant story. What happens first?" |

**Confirmations (1.0, one-shot; steps 1–2 cap ≤3.0 s, step 3 cap ≤5.0 s) and teach lines (0.7, one-shot, cap ≤4.6 s).** Only the middle and end cards can ever be wrong (the beginning card is correct at step 1 and is placed before step 2), and step 3 has one unplaced card, so each round has exactly 3 teach clips: `vo_t_{story}_m1` (middle tapped at step 1), `vo_t_{story}_e1` (end at step 1), `vo_t_{story}_e2` (end at step 2).

| # | Confirmations — `vo_ok_{story}_b`: "Yes — first, {phrase}." · `vo_ok_{story}_m`: "Yes — next, {phrase}." · `vo_ok_{story}_e`: "Yes — last, {phrase}. That's the whole story!" | Teach lines — "That's the {position} — {phrase}. {step question}" (`vo_t_{story}_m1` / `_e1` / `_e2`) |
|---|---|---|
| 1 | "Yes — first, a bird finds a twig." · "Yes — next, the bird builds its nest." · "Yes — last, the bird rests in its warm nest. That's the whole story!" | m1 "That's the middle — the bird builds its nest. What happens first?" · e1 "That's the end — the bird rests in its warm nest. What happens first?" · e2 "That's the end — the bird rests in its warm nest. What happens next?" |
| 2 | "Yes — first, the boat waits at the dock." · "Yes — next, the boat sails through big waves." · "Yes — last, the boat reaches the island. That's the whole story!" | m1 "That's the middle — the boat sails through big waves. What happens first?" · e1 "That's the end — the boat reaches the island. What happens first?" · e2 "That's the end — the boat reaches the island. What happens next?" |
| 3 | "Yes — first, a child holds the kite." · "Yes — next, the kite flies up high." · "Yes — last, the kite comes back down. That's the whole story!" | m1 "That's the middle — the kite flies up high. What happens first?" · e1 "That's the end — the kite comes back down. What happens first?" · e2 "That's the end — the kite comes back down. What happens next?" |
| 4 | "Yes — first, a cloud fills with rain." · "Yes — next, the rain makes a big puddle." · "Yes — last, the sun comes out with a rainbow. That's the whole story!" | m1 "That's the middle — the rain makes a big puddle. What happens first?" · e1 "That's the end — the sun comes out with a rainbow. What happens first?" · e2 "That's the end — the sun comes out with a rainbow. What happens next?" |
| 5 | "Yes — first, an ant finds a crumb." · "Yes — next, the ant pushes the crumb home." · "Yes — last, the ant shares it with its friends. That's the whole story!" | m1 "That's the middle — the ant pushes the crumb home. What happens first?" · e1 "That's the end — the ant shares it with its friends. What happens first?" · e2 "That's the end — the ant shares it with its friends. What happens next?" |

- **Hint copy:** `vo_hint` = "Tap the blinking button to keep going." (1.0, one-shot, ≤3.0 s); activity hints re-play the current step's prompt clip. **Praise** `vo_praise` = "You know beginning, middle, and end — hooray!" (1.0, one-shot, ≤3.4 s).
- **Worked example (round 3, kite, arrangement E · B · M):** round entry at t = 0 — scene fades 200 ms, cards pop in, `vo_p3` at t = 400 (save roundIndex 2). At 3200 the center card (beginning) is tapped: sparkle ≤6, `sfx_ding`, 300 ms slide into slot 1, slot 1 fills, `vo_ok_kite_b` (ends ≈6400). At 7000 `vo_next` plays (600 ms after the clip). At 8400 the right card (middle) is tapped: slide to slot 2, `vo_ok_kite_m` (ends ≈11600), `vo_last` at 12200. At 13000 the left card (end) is tapped: slide to slot 3, `vo_ok_kite_e` (ends ≈17600); round 4 starts at 18200 with save roundIndex 3. Wrong-tap variant: at 6000 the left card (end) is tapped at step 1 — jiggle 300 ms, `sfx_soft_tap`, `vo_t_kite_e1` ≈6000–9600, `vo_p3` re-plays at 10400.
- **Brief reconciliation (designed):** the shared brief fixes 5 rounds and 4 mini-stories for this slug; round 1 reuses the video's bird story as the scaffold warm-up, and rounds 2–5 are the four mini-stories (boat, kite, rain, ant). All 5 rounds use the identical order-three mechanic.
- **Progression rule:** fixed video 1→3 with 1200 ms gaps, then fixed rounds 1→5, each with steps 1→3; nothing locks, randomizes, or adapts; success is the only advance condition, and the video always plays before round 1 on a fresh or completed run.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px; slot strip: 3 slots of 176×132 px with 24 px gaps, centered, top edge 120 px below the chrome; slot numerals 36 px; card row: 3 cards of 240×180 px with 32 px gaps, centered, 48 px above the stage bottom; card hit rects ≥96×96. At 768–1023 px — chrome 88 px; slots 144×108 with 16 px gaps; numerals 28 px; cards 200×150 with 24 px gaps; card rects ≥80×80. Height ≥700 px; below that scale the field by 0.85 keeping every target and control ≥64 px. Stage is a 4:3 area ≤1024×768, centered.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Video line starts | highlight moves in ≤100 ms; animation continues | `vo_v{chapter}_{line}` — 0.7 — one-shot |
| Chapter change | 200 ms fade out/in around the 1200 ms gap; dot fill | none |
| Play/Pause, Replay, HOME | depress 80 ms | `sfx_tap` — 0.5 — one-shot |
| Step correct | sparkle ≤6 on the card; 300 ms slide into the next slot; numeral chip fills | `sfx_ding` — 0.8 — one-shot (300 ms throttle); confirmation — 1.0 — one-shot |
| Round complete (step 3) | filled strip soft-pulses 400 ms | confirmation — 1.0 — one-shot |
| Step prompt (2 and 3) | next empty slot's numeral chip pops 200 ms | `vo_next` / `vo_last` — 1.0 — one-shot |
| Wrong card | jiggle 300 ms; from the round's 2nd wrong tap the correct card soft-pulses 400 ms | `sfx_soft_tap` — 0.5 — one-shot; teach — 0.7 — one-shot (1200 ms throttle; duck) |
| Activity complete (round 5) | confetti ≤40 particles, 2500 ms | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target hint-pulses 3 s | `vo_hint` / step prompt re-play — 1.0 — one-shot (visual-only before the first gesture on `title`) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.5 — one-shot |
| No speech synthesis | muted-speaker pictogram 48×48 for 5 s after first Play; next slot numeral grows to 128×128 and soft-pulses | none |
| Optional title music | none | `music_title` — 0.15 — loop on `title` only |

**Effect definitions (no undefined effects):** *highlight* = 4 px accent stroke around the named panel or card, appears in ≤100 ms, holds until the next line. *pop* = scale 1→1.05→1 over 200 ms. *soft pulse* = scale 1→1.04→1 over 400 ms. *hint pulse* = scale 1→1.12→1 over 500 ms per cycle for 3 s. *jiggle* = translate-x 0→−4→+4→0 px over 300 ms. *depress* = scale 1→0.95→1 over 80 ms. *slide* = card translates from its row position to the target slot center (distance per the section 8 layout) and scales to slot size over 300 ms, ease-out; the vacated row spot shows a 2 px dashed outline at 40% opacity. *slot fill* = the slot's numeral chip switches to accent fill over 100 ms, no motion. *fade* = opacity 0→1 or 1→0 over 200 ms. *sparkle* = ≤6 square particles ≤40 px flying ≤80 px outward over 600 ms. *confetti* = ≤40 rect particles moving ≤120 px outward over 2500 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold; *ring flash* = ring opacity 1→0 over 300 ms. *duck* = music bus 0.5→0.4 within 120 ms while a teach voice plays, restore over 200 ms. *end panel* = centered card ≤360×280 px, fill `#FFFDF6`, 4 px `#3A2E24` border, 24 px radius, fades in over 250 ms. *chapter dot fill* = dot switches to accent over 100 ms, no motion.

**Audio rules (v1):** no audio before the first gesture (FR-018); one voice at a time, each new voice cancels the previous utterance; sfx may overlap; `music_title` optional at 0.15 on `title` only. Voice classes per the shared brief: video lines and teach lines 0.7; prompts, confirmations, hints, and praise 1.0. Degradation per FR-019; background-tab behavior per FR-020 (A8).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.bookBasics.storyStructure.v1`.
- **Shape:** `{ "phase": "video" | "activity", "roundIndex": 0-4, "completed": false, "updatedAt": "<ISO-8601>" }`.
- **Save points:** title→Play (phase `video`, roundIndex 0), every activity round entry (phase `activity`, that roundIndex), completion (FR-013, `completed:true`), and HOME; `updatedAt` refreshes on every save.
- **Restore:** Play resumes at the saved phase and round — `phase:"activity"` opens that round at step 1 with all three cards back in their fixed arrangement; `phase:"video"` opens chapter 1. When `completed` is true, Play starts at the video (chapter 1), per FR-017.
- **Reset:** hold the title logo 3 s (filling ring) → clears the key and in-memory progress; keyboard equivalent: hold Enter/Space 3 s on the focused logo (FR-015).
- **Deliberately not stored:** step index, placed cards, wrong-tap counts, `videoMs` and clock position, chapter position, tap history, judgments, language or audio settings, sparkle/confetti counts, anything identifying.
- **Known platform behavior:** background-tab timers may be throttled and speech may be suspended (handled by FR-020); storage blocked → run unsaved (FR-019).

## 11. Assets

All assets are **original**; nothing is copied from Khan Academy, and no Khan Academy media or characters appear (the bird, child, boat, kite, rain, and ant are original drawings). Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `scene_title` | image | decorative title scene: the three-panel story strip fanned on a warm-paper shelf | 1280×720 SVG | static | SVG shapes |
| `panel_frame` | image | empty rounded panel frame with 2 px ink outline | 320×240 SVG | static | SVG shape |
| `card_{story}_{b\|m\|e}` | image | the 15 story cards per section 8 | 240×180 SVG each (200×150 at 768–1023 px) | pop in; slide to slot | SVG shapes |
| `film_ch1..3` | animated | the three chapters per section 8 (panels, highlights, numeral chips) | runtime 1280×720 | one timeline at a time | runtime SVG animation (expected); a pre-rendered file is acceptable only if it matches the section 8 timeline |
| `slot_frame` | image | rounded slot with a 48×48 numeral chip (1/2/3) | 176×132 SVG (144×108) | chip fills on placement | SVG shapes + numerals |
| `pict_home` / `pict_play` / `pict_pause` / `pict_replay` | image | house; triangle; bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after first Play when speech is missing | SVG path |
| `ring` | image | 4 px accent progress ring around the reset logo | logo-sized SVG | during hold; ring flash | SVG shape |
| `sparkle` / `confetti` | rendered | 4-point star particle; rect particle | runtime | one-shot (≤6 / ≤40) | SVG shapes |
| `sfx_tap` / `sfx_soft_tap` / `sfx_ding` / `sfx_chime` | audio | UI click 0.08 s; muted tap 0.10 s; bright ding 0.3 s; 3-note chime 0.8 s | ogg/mp3 | one-shot | WebAudio blips/arpeggio |
| `vo_v{1-3}_{1-4}` | audio | 10 video lines with caps, section 8 | ≤4.0 s each | one-shot | TTS allowed |
| `vo_p1..p5`, `vo_next`, `vo_last` | audio | 5 round prompts and 2 step questions, section 8 | ≤4.2 s / ≤1.6 s | one-shot | TTS allowed |
| `vo_ok_{story}_{b\|m\|e}` / `vo_t_{story}_{m1\|e1\|e2}` | audio | 15 confirmations and 15 teach lines, section 8 | ≤5.0 s / ≤4.6 s | one-shot | TTS allowed |
| `vo_hint` / `vo_praise` | audio | copy in section 8 | ≤3.0 s / ≤3.4 s | one-shot | TTS allowed |
| `music_title` | audio | gentle marimba loop (optional) | 30 s | loop at 0.15 on `title` only | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, gold `#F2B33D`, leaf `#7FB069`, sky `#BFE3F0`, sea `#4A7FB5`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); the only visible text is the numerals 1–2–3 (36 px at ≥1024 px wide, 28 px at 768–1023 px, inside a 48×48 numeral chip; the chip grows to 128×128 px in visual-only mode).
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → skip that clip; timeline and behavior unchanged (FR-019, R-005).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Chapter` | `index: int 1-3`; `startMs/endMs: int`; `artKey: string`; `lines: Line[]` |
| `Line` | `offsetMs: int`; `voiceKey: string`; `copy: string`; `highlight: PanelId \| null` |
| `Story` | `id: enum {bird, boat, kite, rain, ant}`; `cards: {b, m, e: Card}` |
| `Card` | `id: string` (`{story}` + `_b` / `_m` / `_e`); `position: enum {beginning, middle, end}`; `artKey: string`; `phrase: string`; `accessibleName: string` |
| `Round` | `index: int 0-4`; `storyId: StoryId`; `arrangement: CardId[3]` (left/center/right); `tapOrder: CardId[3]`; `promptKey/promptCopy: string`; `nextKey/lastKey: string`; `okKeys: {b, m, e: string}`; `teachKeys: {m1, e1, e2: string}` |
| `Save` (persisted) | `phase: enum {video, activity}`; `roundIndex: int 0-4`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, title, video, activity, celebrating, endcard}`; `chapter: int 1-3`; `videoMs: int`; `playback: enum {playing, paused}`; `roundIndex: int`; `step: int 1-3`; `placed: CardId[]` (≤3); `wrongInRound: int`; `judgeLock: bool`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

`Chapter`, `Line`, `Story`, `Card`, and `Round` records are static; the timeline is computed from `startMs`/`offsetMs` and never from wall-clock time. Round judgment reads only `Round.tapOrder` and `Round.arrangement`; adding a story = one `Story` + one `Round` + its clips, no new code.

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector scenes, the slot strip with numerals, per-card hit rects, and a highlight overlay on the video stage, all driven by one clock.
- **R-002** The player shall animate the section 9 effects: highlight, pop, soft/hint pulses, jiggle, depress, slide, slot fill, fade, sparkle, confetti, ring fill/flash, chapter dot fill, and end panel.
- **R-003** The player shall handle tap, click, double-tap, and multi-touch pointer input and hit-test per FR-011; no drag gestures are required.
- **R-004** The player shall support keyboard focus and activation for all interactive elements, with Space = Play/Pause when nothing is focused, R = Replay, and Escape = HOME.
- **R-005** The player shall play one voice clip at a time with sfx overlap and the FR-018 ducking rule; a failed clip is skipped without blocking the timeline.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis or provided clips for all lines, prompts, teach lines, hints, and praise, with the FR-019 no-speech fallback.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-019), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during video animation, card slides, sparkles, and confetti.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing phase, round, step, placed cards, `videoMs`, playback, or progress, keeping every target above its minimum.
- **R-011** The player shall expose an invisible accessible name on every interactive element (FR-021).
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss, no timeline desync (FR-020), and hints may fire late.
- **R-013** Each chapter shall be renderable at runtime from `Chapter` data; a pre-rendered file is acceptable only if it matches the same section 8 timings.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `title` shows Play (≥96 px) and the logo (≥64 px), and no audio has played |
| AC-02 | `title` with no save or `completed:true` | Play is pressed | a 2000 ms lead-in runs, chapter 1 line 1 plays at 2000 ms, and the save records phase `video` |
| AC-03 | the video playing | the clock runs with no input | chapters change at 16000/17200/30200/31400/44400 ms with the chapter dot following, the round 1 scene enters at 45600 ms, and `vo_p1` plays at 46000 ms |
| AC-04 | chapter 2 mid-line | Pause is pressed, then Play | the voice stops and animation freezes; Play replays that line from its start and no line is skipped |
| AC-05 | chapter 3 playing | Replay is pressed | chapter 3 restarts at 31400 ms with its first line |
| AC-06 | speech synthesis unavailable | the video plays | chapters still change at the AC-03 times and every highlight still fires; no voice plays |
| AC-07 | round 1 (bird, arrangement B · M · E) | the left card (beginning) is tapped | a sparkle and `sfx_ding` play, the card slides into slot 1, the slot numeral fills, and "Yes — first, a bird finds a twig." is spoken |
| AC-08 | round 1, step 1 judged | the center and then the right card are tapped | "What happens next?" plays 600 ms after the step-1 clip ends; steps 2–3 play their confirmations; at step 3 the only unplaced card is judged correct; round 2 starts 600 ms after the step-3 clip ends with roundIndex 1 saved |
| AC-09 | round 2 (boat, M · E · B) at step 1 | the center card (end) is tapped | it jiggles, `sfx_soft_tap` plays, "That's the end — the boat reaches the island. What happens first?" is spoken, `vo_p2` re-plays 800 ms after the clip, and no card is placed |
| AC-10 | round 2 with one judged wrong tap recorded and its teach clip finished | a second judged wrong tap is made | the step's correct card soft-pulses 400 ms after the tap, the teach line plays, the prompt re-plays 800 ms after that clip, and no card is placed |
| AC-11 | any step | a correct card is double-tapped within 500 ms | exactly one judged tap, one sparkle, one slide, and one confirmation occur |
| AC-12 | round 3 at step 1 | a first finger holds one card and a second finger taps another before release | only the first pointer's card is judged; the second shows no feedback of any kind |
| AC-13 | any step | empty space >12 px from every unplaced card is tapped (including a placed card and a filled slot) | nothing changes on screen or in audio and the idle timer resets |
| AC-14 | a step open, 12 s without input | idleness continues | the step's correct card hint-pulses for 3 s and the step's prompt clip re-plays; any tap resets the timer and the hint repeats 12 s later |
| AC-15 | `title` (before any gesture), `video` paused, or `endcard`, 12 s without input | idleness continues | Play, Play/Pause, or Replay respectively hint-pulses for 3 s; `vo_hint` plays after the first gesture (visual-only before it); no hint fires while the video is playing |
| AC-16 | round 5 answered through step 2 | the last unplaced card is tapped | confetti, `sfx_chime`, and "You know beginning, middle, and end — hooray!" play; the completed save is written; after 2500 ms the end card shows Replay (≥96 px) and HOME |
| AC-17 | a save `{phase:"activity", roundIndex:2}` | the page reloads and Play is pressed | round 3's scene, slot strip, and fixed card arrangement appear with `vo_p3` — the round starts at step 1 and the video is not replayed |
| AC-18 | a save with `completed:true` | the page reloads and Play is pressed | chapter 1 of the video starts (no round opens) |
| AC-19 | round 2 mid-step | HOME is pressed, the page reloads, Play is pressed | `title` appeared at HOME; after reload round 2 opens at step 1 with all three cards back in place |
| AC-20 | `title` | the logo is held 3 s | the ring fills visibly during the hold and the save is cleared; the focused-logo keyboard hold behaves the same, and after reload Play starts the video |
| AC-21 | the end card showing | Replay is pressed | chapter 1 starts with its 2000 ms lead-in, and `completed` clears on the next save |
| AC-22 | speech synthesis unavailable | a full round is played | no voice plays; the next empty slot's numeral grows to 128×128 and soft-pulses at each step; correct taps still slide, fill, and advance; the muted-speaker pictogram shows 5 s after Play |
| AC-23 | storage blocked | a full session is played | every state behaves normally in memory; after reload the session starts fresh |
| AC-24 | the video playing, or a step open | the tab is hidden, then shown | the video returns paused on the same line with `videoMs` frozen (or the open step's prompt re-plays once) and no progress is lost |
| AC-25 | any state | Tab is pressed repeatedly | focus follows the section 6 tab order, every focused control exposes an invisible accessible name, Enter/Space activates each control, and Escape returns HOME |
| AC-26 | a round open at 1024×768 | the viewport is resized to 800×1000 | phase, round, step, placed cards, and progress are unchanged and every card remains ≥80 px |
| AC-27 | the video playing | Play/Pause is double-tapped within 300 ms | exactly one toggle occurs — the voice stops and the video freezes — and the second tap is ignored with no sound |
| AC-28 | chapter 2 playing | Replay is double-tapped within 500 ms | chapter 2 restarts exactly once from its first line and the second tap is ignored with no sound |
| AC-29 | any state | wrong, empty, rapid, repeated, or multi-touch taps, or a key with no mapping, are made | no score, star, streak, or comparison ever appears, no progress is deducted, locked, ended, or lost, and unlisted events change nothing and play no sound |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The 42.4 s video plays its three chapters at the section 8 timings with highlights, gaps, dots, Pause/Resume, and chapter Replay.
3. The five rounds run in order: cards slide into slots 1–2–3, correct taps advance the step, wrong taps teach and re-ask, step 3 is always correct, and no score appears.
4. Phase and round survive a reload; Play resumes at the saved round (or the video when completed); the reset hold clears the save.
5. No-speech and blocked-storage runs behave as specified, and no network, camera, or microphone is used.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The video topic (beginning/middle/end), the bird example story, and all scripts and cards are designed inferences from the title; official sources publish no per-video description | designed (O3, D1) |
| A2 | Five order-three rounds over four mini-stories, with round 1 reusing the video's bird story as a warm-up, satisfies the brief's "5 rounds / 4 mini-stories" shape | designed (D2, section 8) |
| A3 | All art, voice, music, and copy are original; no Khan Academy character or media appears | designed (IP rule) |
| A4 | A runtime-rendered animated video is an acceptable realization; a pre-rendered file must match the section 8 timeline | designed (R-013) |
| A5 | TTS-generated clips or runtime TTS are acceptable | designed |
| A6 | Clip caps and line offsets approximate child-paced narration | designed (section 8) |
| A7 | Browsers block autoplay until the first user gesture | platform fact; handled by FR-018 |
| A8 | Background-tab timers may be throttled and speech may be suspended | known platform behavior; handled by FR-020 |
| A9 | A 12 px tap tolerance, ≥96 px cards, and a 500 ms judgment throttle suit ages 4–5 | designed (section 7) |
| A10 | No unlocks, adaptive difficulty, shuffling, persisted step, or round skip | designed (FR-016, FR-022, section 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** chapter script, timings, and highlights; round order, stories, card arrangements, prompts, confirmations, and teach copy; step and round advance rules; hit tolerance and throttles; chrome set and keyboard map; target minimums; save key and shape; no fail state; asset provenance; acceptance criteria.
- **Free:** exact composition of the panels, cards, and stage within the section 8 guidance, easing curves, sparkle/confetti particle look, voice timbre/TTS engine, optional title music, decorative title-scene details.
- **Not in this spec:** library or Videos-tab browsing, the other eight Book Basics entries, profiles, navigation shell, parental controls, localization, analytics, scoring, streaks, or teacher tooling.
