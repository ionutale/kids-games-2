# Sight Words videos

## 1. Front matter

- **Entry type:** Interactive player — video series
- **Catalogued entry:** [`sight-words-videos.md`](../sight-words-videos.md)
- **Official source:** [Help Center — Find books and lessons in the Khan Kids Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library) and [Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids); repo wording "Sight Words videos (Kindergarten, 1st Grade)" and offline "sight-word spelling" in [`khan-academy-kids-games.md`](../../khan-academy-kids-games.md) lines 84–86
- **Spec status:** v1 — first video-series spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by player equivalents: one word video replaces a level, the end card replaces a win condition, watched flags replace scoring.

## 2. Overview and learning objective

A child picks a word from a grid of 12 and watches a short original animation: the word is shown big,
spoken, then spelled letter-by-letter with each letter highlighting as it is named, then used in a
short original sentence with the word outlined, then shown and spoken once more. The skill is
**sight-word recognition** — reading high-frequency words automatically, in letter order and in
context (Dolch pre-primer set). Age band: **5–7 (Kindergarten–1st Grade, per the official listing)**.
One video runs **6.5–9.7 s**; an expected sitting of 3–8 videos is **1–3 minutes**.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Sight Words videos live in the Videos tab and are listed for Kindergarten and 1st Grade | official | `khan-academy-kids-games.md` line 84 |
| O2 | Related offline content includes sight-word spelling practice | official | Parent guide / line 86 ("sight-word spelling") |
| O3 | The app targets ages 2–8; the Videos tab is browsed by learning level | official | `khan-academy-kids-games.md` lines 160–177 |
| O4 | Individual video titles are not published; no official word list or video art for these videos appears in the surveyed sources | official | Catalogued entry note |
| D1 | 12-word set from the public-domain Dolch Pre-Primer list (first 12 in standard order); 4×3 picker | designed | O4 publishes no list; a fixed, published list is defensible and auditable (section 8, A1) |
| D2 | Per-word animation template: word → spelled letters → sentence → repeat → end card, with exact timings | designed | Makes "sight-word videos" buildable and observable; spelling echoes O2 |
| D3 | Player chrome: Play/Pause, Replay, prev/next word, word picker grid, tap-the-word replay; no quiz, no score | designed | The minimal designed interaction the interactive-player type promises |
| D4 | All word sentences, sounds, art, and voices are original; no characters, no Khan Academy art, audio, or character names in the build | designed | Buildability invention; avoids copying unpublished media |
| D5 | Home, HOME chrome, watched flags, resume, hidden reset, idle hint, audio rules, no fail state | designed | Template v1; continuity without accounts; never punishing (ages 5–7) |

## 4. Player experience / core loop

A child opens the series, sees 12 word cards and one big Play. They tap "can": the card fills the
stage, a voice says "can", the letters **c**, **a**, **n** each light up as the voice spells them,
the sentence "I can jump!" appears with "can" outlined while it is read, then the word is said once
more and the end card offers Replay or Next. Tapping the word card during playback says the word
alone. The child taps Next to "come"; a star appears on the "can" card back home.

**Core loop:** pick a word → hear it, see it spelled, see it in a sentence → replay or go to the next
word → watched words earn a star.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the series loads, it shall show `loading`, preload the 12 word videos (section 8) and audio (section 11), and then `home`: a decorative title, one Play target ≥96×96 CSS px, a 4×3 picker grid of 12 word cards (each watched card carrying the ≥16×16 `pict_star` pip of FR-012), and a reset logo ≥64×64 CSS px (FR-014). No audio plays before the first user gesture (R-006). |
| FR-002 | When a word video starts, it shall run one deterministic timeline driven by a single clock, with these phases and times (ms, t=0 at word start; L = Unicode letter count; W = measured `clipWordMs`, fallback `500 + 120×L`; C = measured `clipSentenceMs`, fallback by FR-005): **meet** 0→`T1` = 400 + W + 300, word spoken at 400; **spell** `S` = T1→`T2` = S + 700×L, letter *k* (0-based) highlighted from S + 700k to S + 700(k+1); **gap** 300; **sentence** `T3` = T2 + 300→`T4` = T3 + C; **gap** 500; **repeat** `R` = T4 + 500→`T5` = R + W, word spoken at R; **gap** 800; **end card** at `T6` = T5 + 800 (FR-007). Only one voice clip plays at a time; any new voice clip cancels the previous utterance. Pausing freezes the clock; Replay sets t=0; phases run in fixed order with no skip. |
| FR-003 | In **meet**, the word card (word text at the section 8 font) shall be visible from t=0 and `vo_word_{id}` shall speak the word once at t=400 (volume 1.0, one-shot). The card stays centered through the spell phase. |
| FR-004 | In **spell**, all L letters shall be shown in reading order and exactly one letter at a time shall carry the letter highlight for its 700 ms window; `vo_spell_{id}` shall speak each letter's name at its window start (volume 1.0, one-shot). At T2 the highlight clears and all letters remain visible. |
| FR-005 | In **sentence**, the word card shall move to the top of the stage and the full sentence shall appear at T3 below it, each token highlighting while spoken: token *k* runs from its `timings.sentenceTokens` `[k][0]` to `[k][1]`, or from boundary event *k* to event *k*+1 (sentence end for the last token; offsets inside punctuation/whitespace map forward, past the last token map to the last token), else from fallback windows `clamp(200 + 90×Ltoken, 350, 1600)` ms per token with a 60 ms gap between consecutive tokens, token 1 starting at T3. The target word shall carry the target outline for the whole phase. `vo_sentence_{id}` plays once (volume 1.0, one-shot). |
| FR-006 | In **repeat**, the sentence shall fade out and the word card return to center; `vo_word_{id}` shall speak the word once more at R (volume 1.0, one-shot). |
| FR-007 | At T6 the end card shall slide in over a dimmed word card with Replay ≥96×96 and Next ≥64×64 pictograms; the timeline stops. Entry actions: mark the word watched in memory and save (section 10). When this entry puts `watchedIds` at all 12 for the first time in the current save, the end card shall also show a 12-star row, `sfx_chime` (0.8), and `vo_series` (1.0). |
| FR-008 | A Play/Pause target ≥64×64 CSS px shall toggle playback. Pause cancels the voice, freezes the clock, and freezes highlights. Resume restarts the phase containing the frozen time from its start (clock set to that phase's start, its voice re-spoken); if the frozen time is in an inter-phase gap, the following phase restarts. On the end card, Play/Pause is a no-op. |
| FR-009 | A Replay target ≥64×64 CSS px shall cancel the voice and restart the current word at t=0 (`meet`, playing). Replay is available throughout `player` and on the end card. |
| FR-010 | Prev/Next targets ≥64×64 CSS px shall switch to the adjacent word in list order, wrapping (Next on word 12 → word 1; Prev on word 1 → word 12), cancel the voice, start the new word at t=0 playing, save `lastWordId`, and play `sfx_tap`. Switches are throttled to one per 500 ms (FR-017). |
| FR-011 | When the word card is tapped during any phase except the end card, the player shall pause the clock, cancel the voice, speak the word alone once via `vo_word_{id}` (volume 1.0, one-shot), then — 300 ms after that clip ends — resume by restarting the current phase from its start (FR-008 rule); if it was `paused`, it stays paused after the word replay with the clock and highlight frozen. On the end card the word card is not a target. |
| FR-012 | A Words pictogram ≥64×64 CSS px shall open `picker`: a 4×3 grid of the 12 word cards (one ≥16×16 `pict_star` pip in the top-right corner per watched card). Entry pauses the clock and cancels the voice. Tapping a card (including the current word) shall start that word at t=0 playing, save `lastWordId`, and close the overlay. A Back pictogram ≥64×64 shall close it and return to the same word, phase, and `paused` state, with no voice. HOME (FR-013) returns to `home`. |
| FR-013 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `player` and `picker`; it cancels any voice or timer, saves, and returns to `home`. On `home` and `loading` no HOME control is rendered and a HOME input is a no-op (home is home). |
| FR-014 | When the home logo is held for 3 s, the player shall fill a visible progress ring for the hold duration; on completion it shall clear the save and in-memory progress and play a ring flash plus `sfx_soft_tap`. Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-015 | When no input has occurred for 12 s in `home`, `player`, or `picker`, the player shall pulse one deterministic target for 3 s: `home` — the first unwatched card in list order (if all watched, Play); `player` before the end card — Play/Pause; `player` end card — Replay; `picker` — the current word's card. `vo_hint` plays with each hint (after the first gesture; visual-only before it). The hint repeats every 12 s of continued idleness; any input, including an empty-space tap, resets the timer. |
| FR-016 | No-reading rule: the only visible text is content — the 12 words, their letters, and the sentence text (plus an optional decorative series title). Every instruction and label reaches a non-reader by voice + pictogram. Every interactive element (logo, Play, HOME, prev, Play/Pause, Replay, Next, Words, Back, each grid card on `home` and in `picker`, the word card) carries an invisible accessible name (e.g. "Play", "Word: can, watched", "Say the word: can"); this rule governs visible text only. |
| FR-017 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Hit rects take a 12 px expansion on all sides; on overlap the nearest center wins, exact ties resolve to the lowest list index (leftmost in the 4×3 grid); a tap >12 px from every hit rect is an empty tap (no state change, idle timer resets). Throttles: Play/Pause 300 ms, word switches (next/prev/picker card) 500 ms; taps inside a throttle are ignored with no sound. Double-tapping Play/Pause toggles once; double-tapping Next switches once; double-tapping a picker card starts the word once. No drags; taps on the stage outside controls and the word card are empty taps. |
| FR-018 | Degradation: no speech synthesis → visual-only — the timeline still runs using fallback W/C and all highlights advance, and a muted-speaker pictogram (48×48) shows for 5 s after the first Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. |
| FR-019 | Background tab: when the tab becomes hidden during `player`, the player shall cancel the voice and enter `paused` with the clock and highlights frozen; on return it stays paused until Play (FR-008). Idle time counts visible time only; throttled timers may delay hints, never lose watched flags (A6). |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; preload; audio locked |
| `home` | decorative title + Play + 4×3 picker grid + reset logo | the series home; audio unlocks on first gesture |
| `player(wordId, phase, playback)` | stage (word card / sentence) + chrome; end card in phase `endcard` | phase ∈ {meet, spell, sentence, repeat, endcard}; playback ∈ {playing, paused} |
| `picker(wordId, returnPhase)` | dimmed paused stage + 4×3 card grid + Back | overlay over `player`; selecting starts a word |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `home` | entry: arm audio; no sound before first gesture |
| `home` | `PLAY_PRESSED` | — | `player(lastWordId or "a", meet, playing)` | entry: unlock audio; word spoken at 400 ms |
| `home` | `WORD_CARD_TAP(i)` | — | `player(word_i, meet, playing)` | action: save `lastWordId` |
| `home` | `RESET_HOLD` | hold 3 s on logo | `home` | action: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `player` | `PLAY_PAUSE` | phase ≠ endcard | `player(same, same phase, toggled)` | action: FR-008 |
| `player` | `NEXT` / ArrowRight | throttle clear | `player(next word, meet, playing)` | actions: FR-010; save |
| `player` | `PREV` / ArrowLeft | throttle clear | `player(prev word, meet, playing)` | actions: FR-010; save |
| `player` | `REPLAY` | — | `player(same, meet, playing)` | action: FR-009 |
| `player` | `WORD_CARD_TAP` | phase ≠ endcard | `player(same)` | action: FR-011 (no state change) |
| `player` | `PHASE_ADVANCE` | fixed order meet→spell→sentence→repeat | `player(same, next phase, playing)` | actions per FR-003–FR-006 |
| `player` | `VIDEO_END` | clock reaches T6 | `player(same, endcard, —)` | actions: FR-007; save |
| `player` | `PICKER_OPEN` | — | `picker(same, phase)` | action: pause clock, cancel voice |
| `player` | `HOME_PRESSED` | — | `home` | action: cancel voice/timers, save |
| `player` | `TAB_HIDDEN` | `playing` | `player(same, same phase, paused)` | action: cancel voice, freeze (FR-019) |
| `picker` | `WORD_CARD_TAP(i)` | — | `player(word_i, meet, playing)` | action: save `lastWordId`; close overlay |
| `picker` | `PICKER_CLOSE` | — | `player(same, returnPhase, paused)` | none (voice not resumed) |
| `picker` | `HOME_PRESSED` | — | `home` | action: save |
| any | `IDLE_12S` | visible tab, no input 12 s | same state | action: FR-015 hint |

Events not listed for a state are ignored (no state change, no sound); on the end card Play/Pause is
a no-op (FR-008).

**Tab order (v1):** `home` — logo (reset) → Play → cards 1–12 in list order; `player` — HOME → prev →
Play/Pause → Replay → Next → Words → word card; `picker` — HOME → Back → cards 1–12 (Arrow keys move
grid focus in reading order); `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play / pause | tap the Play/Pause target | Space (when no control is focused) or Enter/Space on the focused target |
| Replay a word video | tap Replay | Tab to Replay + Enter/Space |
| Next / previous word | tap the arrow targets | ArrowRight / ArrowLeft, or Tab + Enter/Space |
| Pick a word | tap a picker card | Tab to the card + Enter/Space |
| Open / close the picker | tap Words / Back | Tab + Enter/Space |
| Hear the word alone | tap the word card | Tab to the word card + Enter/Space |
| HOME | tap HOME | Escape |
| Reset | hold the home logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** controls ≥64×64 CSS px (Play and end-card Replay ≥96×96); word card tap rect ≥400×200 during meet/spell/repeat and ≥400×160 during the sentence phase; picker cards ≥72×72 at ≥1024 px wide, ≥64×64 at 768–1023 px — all above the 44 px minimum. Focus indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 12 px per FR-017; ties resolve to the lowest list index; >12 px from every target is an empty tap (idle resets).
- **Multi-touch / gestures:** FR-017 single-pointer semantics; no drag gestures exist, so no drag alternative is required.
- **Instructions without reading:** all chrome is pictogram + invisible name; `vo_hint` carries meaning; FR-016 limits visible text to content.
- **Accessible names:** invisible names on every interactive element (FR-016/R-011), including "Word: funny, not watched" for picker cards and "Say the word: funny" for the word card.
- **Resize:** viewport resize or rotation mid-video reflows per section 8, preserving word, phase, clock, playback, and watched flags.

## 8. Content and word data

**Word list (designed):** Dolch Pre-Primer (Dolch, 1936 — public domain), first **12 words** in the
list's standard published order. Built set: **a, and, away, big, blue, can, come, down, find, for,
funny, go**. Each word gets one original 16:9 video via the shared template; the other 28 pre-primer
words are out of this build (A1). All sentences are original.

| # | Word | L | Original sentence | Tokens | W (ms) | C (ms) | End card at T6 (ms) |
|---|---|---|---|---|---|---|---|
| 1 | a | 1 | I see a cat. | 4 | 800 | 1900 | 6500 |
| 2 | and | 3 | Mom and I run. | 4 | 900 | 2050 | 8250 |
| 3 | away | 4 | The ball rolls away. | 4 | 950 | 2400 | 9400 |
| 4 | big | 3 | A big red bus! | 4 | 900 | 2050 | 8250 |
| 5 | blue | 4 | The sky is blue. | 4 | 950 | 2050 | 9050 |
| 6 | can | 3 | I can jump! | 3 | 900 | 1500 | 7700 |
| 7 | come | 4 | Come and play! | 3 | 950 | 1800 | 8800 |
| 8 | down | 4 | The cat sits down. | 4 | 950 | 2250 | 9250 |
| 9 | find | 4 | I find my hat. | 4 | 950 | 2050 | 9050 |
| 10 | for | 3 | This gift is for you. | 5 | 900 | 2700 | 8900 |
| 11 | funny | 5 | A funny clown! | 3 | 1000 | 1850 | 9650 |
| 12 | go | 2 | We go up! | 3 | 850 | 1350 | 6750 |

- **Worked example ("can", FR-002):** W=900, C=1500 → meet 0–1600 (word at 400), spell 1600–3700 (c 1600–2300, a 2300–3000, n 3000–3700), sentence 4000–5500, repeat 6000–6900 (word at 6000), end card at **7700 ms**; with no clips W = 500 + 120×3 = 860 ms and C = 350 + 470 + 560 + 120 = 1500 ms.
- **Tokenization:** split on whitespace; punctuation stays attached ("jump!" is one token); token counts above are tokens.
- **Word video media:** each word is one animation from the shared storyboard template, runtime-rendered (SVG/DOM/canvas; default, blind-buildable) or a pre-rendered file (1280×720, ≤10 s); both must satisfy the FR-002 timeline. Art is abstract shapes, the word, letters, and sentence only — no characters.
- **Progression rule:** fixed list order 1→12; Next/Prev wrap; no locks, gates, timers, scores, or adaptive behavior. A word is marked watched only when its end card is reached; the end card rests until the child chooses (A2).
- **Layout breakpoints (numbers):** at ≥1024 px wide — stage 16:9 ≤960 px tall centered, chrome bar 96 px, word font 120 px (96 px during the sentence phase), sentence font 48 px in a ≤900 px panel, line-height 1.5, controls ≥64 px with 24 px gaps, home cards ≥72×72 with 16 px gaps. At 768–1023 px — word font 96 px, sentence font 40 px in a ≤min(640 px, 66vw) panel, home cards ≥64×64 with 12 px gaps, chrome 88 px. Height ≥700 px; below that scale the stage by 0.85 keeping all targets ≥64 px. Sentences wrap to ≤2 lines; if needed, reduce the font by 10% per step to a 32 px minimum.

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Word spoken (meet, repeat, word-card tap) | word card pulse 1→1.06→1 over 300 ms | `vo_word_{id}` — 1.0 — one-shot |
| Letter spelled | letter highlight appears ≤100 ms for its 700 ms window | `vo_spell_{id}` — 1.0 — one-shot (letter names in order) |
| Sentence read | token highlight moves; target outline on the target word | `vo_sentence_{id}` — 1.0 — one-shot |
| Word start (Play, home card, picker card, next/prev) | stage fades 200 ms | `sfx_card` — 0.7 — one-shot on a new word; `sfx_tap` — 0.7 — one-shot on next/prev |
| Play/Pause, HOME, Replay, Words, Back | depress 80 ms | `sfx_tap` — 0.7 — one-shot |
| End card | panel slides in | `sfx_card` — 0.7 — one-shot |
| All 12 words watched (FR-007) | 12-star row appears | `sfx_chime` — 0.8 — one-shot; `vo_series` — 1.0 — one-shot |
| Idle hint (FR-015) | deterministic target pulses 3 s | `vo_hint` — 1.0 — one-shot (visual-only before first gesture) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| No speech synthesis | muted-speaker pictogram 5 s after first Play | none |
| Optional background music | none | `music_loop` — 0.2 — loop |

**Effect definitions (no undefined effects):** *fade* = opacity 1→0 or 0→1 over 200 ms. *dim* = word card opacity 1→0.35 over 200 ms. *letter highlight* = 8 px-radius rounded rect behind the letter, fill `#8ECAE6`, appears ≤100 ms, no motion. *token highlight* = 8 px-radius rect behind the token, fill `#FFE08A`, 6 px horizontal / 4 px vertical padding. *target outline* = 4 px rounded stroke `#F2994A` around the target word for the whole sentence phase. *word card pulse* = scale 1→1.06→1 over 300 ms. *depress* = control scales 1→0.95→1 over 80 ms. *panel slide* = end card opacity 0→1 and translate-y 24 px→0 over 200 ms.
*star row* = 12 `pict_star` 32 px icons fade in left-to-right, 200 ms stagger. *star pip* = 16×16 `pict_star`, 4 px from the card's top-right corner, no animation. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s hold. *ring flash* = ring opacity 1→0 over 300 ms. *pulse* = target scales 1→1.12→1 over 500 ms for 3 s.

`vo_hint`: "Tap a word to watch it. Tap the arrows to change the word." `vo_series`: "You watched every word! Great reading!" Spelling copy is the letter names in order; sentence copy is the word table's sentence. Voice timbre and TTS engine are build freedom; copy is fixed.

**Audio rules (v1):** no audio before the first user gesture (R-006); only one voice clip at a time (FR-002); sfx may overlap each other and the voice, and `music_loop` may play under both. Degradation per FR-018: no speech synthesis → visual-only, no AudioContext → silent, storage blocked → run unsaved; background-tab timers may be throttled and speech suspended, handled by FR-019 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.sightWords.v1`.
- **Shape:** `{ "lastWordId": "can", "watchedIds": ["a","can"], "updatedAt": "<ISO-8601>" }` —
  `lastWordId` is one of the 12 word ids; `watchedIds` lists each watched word id at most once, in
  first-watched order.
- **Save points:** end-card entry (sets `lastWordId` and adds the watch), every word start or switch
  (home card, picker card, next/prev), and HOME; `updatedAt` refreshes on every save (v1).
- **Restore:** on load, `home` Play starts `lastWordId`; with no save it starts word 1 (`a`); there are no locks — the picker always offers all 12 words (FR-012).
- **Reset:** hold the home logo 3 s (filling ring) → clears the key and in-memory progress; the
  keyboard equivalent is holding Enter/Space 3 s on the focused logo (FR-014).
- **Deliberately not stored:** clock position, phase, pause state, watch counts beyond the flag,
  audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy, and no Khan Academy characters, art,
audio, or names appear. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the
row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `stage_bg` | image | soft sky-gradient backdrop with faint dots; palette below | 1280×720 SVG | static | SVG gradient |
| `word_card` | rendered | rounded paper panel holding the word and letters | 640×280, runtime | static | drawn from palette |
| `pict_home` / `pict_prev` / `pict_play` / `pict_pause` / `pict_replay` / `pict_next` | image | house; chevrons; triangle/bars; circular restart arrow | 64×64 SVG each (end-card Replay 96×96) | static | SVG paths |
| `pict_words` / `pict_back` / `pict_muted` | image | 4×3 grid glyph; back arrow; speaker with slash | 64×64 / 64×64 / 48×48 SVG | static; muted shown 5 s after first Play when speech is missing | SVG paths |
| `pict_star` / `ring` | image | 5-point gold star; 4 px accent progress ring | 32×32 / 96×96 SVG | star row at series complete; ring during reset hold | SVG shapes |
| `sfx_tap` / `sfx_card` / `sfx_soft_tap` | audio | UI click 0.08 s; card whoosh 0.12 s; muted tap 0.10 s | ogg/mp3 | one-shot | WebAudio blips |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `vo_hint` | audio | copy in section 9 | ≤3 s | one-shot | TTS allowed |
| `vo_word_{id}` | audio | the word spoken clearly, ×12 | ≤1.2 s each | one-shot | TTS allowed |
| `vo_spell_{id}` | audio | letter names in order, one every 700 ms, ×12 | ≤3.5 s each (700 ms × L) | one-shot | TTS allowed |
| `vo_sentence_{id}` | audio | the original sentence at early-reader pace, ×12 | ≤3 s each | one-shot | TTS allowed; clips may carry word timestamps |
| `vo_series` | audio | "You watched every word! Great reading!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.2 | may be omitted |

- **Palette tokens:** background `#E8F1FA`, ink `#2B3A4A`, accent `#F2994A`, letter highlight
  `#8ECAE6`, token highlight `#FFE08A`, star `#F2C94C`, chrome `#FFFDF7`. **Typography:** system
  rounded stack (`ui-rounded`, fallback `system-ui`); font sizes per section 8.
- **Load failure:** missing visual asset → draw a stub shape, log a warning, keep playing; missing audio → fall back to the FR-002/FR-005 durations with no voice (R-005, R-007, FR-018).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `WordVideo` | `id: string` (the word); `word: string`; `letters: string[]`; `sentence: string`; `sentenceTokens: string[]`; `clipWordMs: int`; `clipSentenceMs: int`; `timings?: { sentenceTokens?: number[][] }` (optional token [startMs, endMs] pairs within `vo_sentence_{id}`, authoritative for FR-005 when present) |
| `Timeline` (computed) | `L: int`; `W: int`; `C: int`; `meet: [0, T1]`; `spell: [S, T2]`; `sentence: [T3, T4]`; `repeat: [R, T5]`; `endCardAt: T6`; `phaseAt(tMs): enum` |
| `Save` (persisted) | `lastWordId: string`; `watchedIds: string[]`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, home, player, picker}`; `wordId: string`; `phase: enum {meet, spell, sentence, repeat, endcard}`; `playback: enum {playing, paused}`; `clockMs: int`; `focusIndex: int`; `idleTimer: id`; `utterance: object` |

**Token derivation:** `sentenceTokens = sentence.split(/[\u0020\u000A]+/)`; `startChar[i]` = token *i*'s character offset; boundary events map by `startChar` per FR-005. The 12 `WordVideo` records are static data; adding a word = one record plus its three voice clips — `vo_word_{id}`, `vo_spell_{id}`, `vo_sentence_{id}` (A1).

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector or raster scenes with large text runs and one timeline clock driving phase changes.
- **R-002** The player shall animate the section 9 effects: fades, dim, letter/token highlights, target outline, pulses, panel slide, star row/pip, ring fill/flash, depress.
- **R-003** When the user taps or clicks a target, the player shall hit-test per FR-017.
- **R-004** The player shall support keyboard focus and activation for every interactive element, with Escape = HOME and arrows = word switching (grid navigation inside `picker`).
- **R-005** The player shall play concurrent one-shot clips (sfx + voice, voice at 1.0) and may loop one music track at ≤0.2; a failed clip is skipped without blocking play.
- **R-006** When the browser blocks audio before a user gesture, the player shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The player shall use speech synthesis (or the provided clips) for word, letters, and sentence, support word-boundary events for token highlighting, and fall back to the FR-002/FR-005 durations when clips, timestamps, or boundary events are unavailable.
- **R-008** The player shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-018), and run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during letter highlighting and word switches.
- **R-010** The player shall scale from 768×1024 to 1366×768 without losing word, phase, clock, or watched flags.
- **R-011** The player shall expose an invisible accessible name on every interactive element.
- **R-012** While the tab is backgrounded, the player shall tolerate throttled timers: pause with no progress loss, hints may fire late (FR-019).
- **R-013** The word video shall be renderable at runtime from `WordVideo` + `Timeline` data; a pre-rendered file is acceptable only if it matches the same timeline contract.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | `home` shows Play, 12 word cards, and the logo, and no audio has played |
| AC-02 | home with `lastWordId: "can"` (or no save) | Play is pressed | `can` (or word `a`) starts and is spoken at 400 ms; a card's star appears only after its end card |
| AC-03 | word `can` playing | the timeline runs to 7700 ms | in order: "can" spoken at 400; c, a, n highlight 1600–2300–3000–3700 ms; the sentence appears at 4000 ms with the target outlined; "can" is spoken again at 6000 ms; the end card appears at 7700 ms |
| AC-04 | a word playing | the word card is tapped during the spell phase | the voice stops, the word alone is spoken, then the spell phase restarts from letter 1 |
| AC-05 | a word playing | Play/Pause is double-tapped within 300 ms, then Next is double-tapped rapidly | exactly one toggle and one word switch occur; the second tap of each pair is ignored |
| AC-06 | word 1 (or word 12) playing | Prev (or Next) is pressed | word 12 (or word 1) starts at t=0 and is saved as `lastWordId` |
| AC-07 | a word playing | the Words pictogram is tapped mid-video, then a different card | the timeline pauses on open; the chosen word starts at t=0 playing and is saved; Back instead returns to the same word and phase, paused |
| AC-08 | any state except the end card | empty stage space >12 px from every target is tapped | nothing changes on screen or in audio and the idle timer resets |
| AC-09 | `home`, `player`, or `picker` with no input for 12 s | idleness continues | `vo_hint` plays and the deterministic target (first unwatched card, Play/Pause, Replay, or the current card) pulses 3 s; any tap resets; the hint repeats 12 s later |
| AC-10 | a word's end card | Replay is pressed | the word restarts at t=0 and the word is spoken at 400 ms |
| AC-11 | an end card reached | the page reloads and Play is pressed | the same word starts again, and its card shows a star |
| AC-12 | all 12 words watched | the twelfth end card appears | the 12-star row, `sfx_chime`, and "You watched every word!" appear; replaying a word afterward shows a plain end card |
| AC-13 | `home` | the logo is held 3 s | a ring is visible during the hold and the save is cleared; the focused-logo keyboard hold behaves the same; after reload Play starts word `a` with no stars |
| AC-14 | a word playing | HOME is pressed | `home` appears, the voice stops, and the save is intact |
| AC-15 | a word playing | the tab is hidden, then shown | the word is paused on the same frame; Play restarts the phase it was in from that phase's start |
| AC-16 | speech synthesis unavailable | a word is started | no voice plays, the timeline and all highlights still run, and the muted-speaker pictogram shows for 5 s |
| AC-17 | storage blocked | a word is watched to the end | the end card and star appear normally; after reload progress is gone but the player still works |
| AC-18 | a video playing at 1024×768 | the viewport is resized to 800×1000 | word, phase, playback, and watched flags are unchanged and every control is ≥64 px |
| AC-19 | keyboard focus on any control | Tab is pressed repeatedly | focus visits targets in the section 6 tab order, Enter/Space activates, Escape returns HOME |
| AC-20 | a word paused | the word card is tapped | the word alone is spoken and the player remains paused with the clock and highlights unchanged |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. All 12 word videos play end-to-end with word, spelling highlights, sentence highlighting, repeat, and end card at the section 8 times.
3. Play/Pause, Replay, next/prev (with wrap), picker, word-card tap, and HOME all behave as specified.
4. Watched flags and `lastWordId` survive a reload; the reset hold clears them; no-speech and blocked-storage runs still work.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | Word list is the first 12 Dolch Pre-Primer words in standard order; the other 28 are out of this build | designed — official sources publish no list (O4); list is public domain |
| A2 | The end card rests instead of auto-advancing to the next word | designed — gives a child/parent a stopping point; avoids background timers |
| A3 | Runtime-rendered animation is an acceptable form of "video" | designed — keeps the build feasible for a fresh-context LLM; pre-rendered files allowed (sections 8 and 13) |
| A4 | Clip durations and fallback formulas approximate natural early-reader pacing | designed (FR-002/FR-005, section 8) |
| A5 | TTS-generated voice clips and runtime TTS are acceptable | designed |
| A6 | Background-tab timers may be throttled and speech synthesis may be suspended | known platform behavior; handled by FR-019 |
| A7 | A 12 px tap tolerance and 44+ px targets are sufficient for ages 5–7 | designed platform rule (section 7) |
| A8 | No locks, adaptive difficulty, or persisted playback position in the series | designed (sections 8 and 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the 12 words, their sentences and order, the per-word timeline and fallback formulas, control set and keyboard map, no fail state, target minimums, save key and shape, asset provenance, acceptance criteria.
- **Free:** exact stage composition within the palette and layout numbers, easing curves, voice timbre/TTS engine, optional music, whether the decorative title exists, the abstract shapes used.
- **Not in this spec:** library/Videos-tab browsing, video selection beyond this series, offline "Kodi's Suitcase" content, profiles, navigation shell, parental controls, localization, analytics, quizzes, scoring.
