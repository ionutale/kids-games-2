# Read To Me

## 1. Front matter

- **Entry type:** Interactive player — book mode (read-aloud reader)
- **Catalogued entry:** [`read-to-me.md`](../read-to-me.md)
- **Official source:** [Khan Academy Kids — Early reading & ELA](https://www.khanacademy.org/kids/ela) ("Read-to-me audio with word highlighting"); [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids); [App Store listing](https://apps.apple.com/us/app/khan-academy-kids/id1378467217)
- **Spec status:** v1 — first interactive-reader spec; matches template v1; not yet blind-built; last updated 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; speech synthesis available (degradation in section 9); no network after load
- **Conditional sections:** 6, 11, and 12 are included; none omitted. Game-only blocks are replaced by reader equivalents: pages replace levels, narration end replaces win condition, completion replaces scoring.

## 2. Overview and learning objective

A child opens a book on the cover screen and presses Play. The reader narrates the page aloud while
the word being spoken is highlighted, so the child can follow along; the page auto-advances at the
end and the book is celebrated when the last page finishes. The child can pause, tap any word to
hear it again, turn pages, and switch between English and Spanish. Skills practiced: **listening
comprehension and print awareness** (words are units, read left→right, top→bottom). Age band:
**2–8 across the library** (entry: Preschool–2nd Grade); the pilot book targets **Preschool–K
(4–5)**. Expected session: **2–4 minutes** — one book per sitting.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Read To Me is the read-aloud mode for books in the Khan Kids Library | official | Catalogued entry description |
| O2 | The app reads the book aloud in English or Spanish | official | `khan-academy-kids-games.md` line 222 |
| O3 | Read-to-me audio includes word highlighting | official | Early reading & ELA page (line 125): "Read-to-me audio with word highlighting" |
| O4 | The book library spans Preschool–2nd Grade | official | Catalogued entry |
| D1 | Pilot book "The Red Ball": 8 original pages, exact text in section 8 | designed | Official sources publish no book text; original content is required and avoids copying |
| D2 | Highlight timing from clip word timestamps or speech word-boundary events, with a per-word fallback formula | designed | Makes O3 buildable without publisher timings; numbers in FR-002/FR-003 |
| D3 | Play/Pause, tap-word replay, page-turn zones/swipe/keys, auto-advance, end celebration + Replay | designed | The minimal designed interaction the interactive-player type promises; every control has a pictogram and a keyboard path |
| D4 | English/Spanish toggle with an original translation | designed | Implements O2; translation rule and text in section 8 |
| D5 | Cover, HOME chrome, progress save/resume, hidden reset, idle hint, audio rules, no fail state | designed | Template v1; session continuity without accounts; never punishing (ages 2–8) |
| D6 | All art, voice, music, and layout | designed | Buildability invention; all assets original |

## 4. Player experience / core loop

A child presses the big Play on the cover. A warm voice reads page 1 — a yellow highlight moves along
each word as it is spoken. The child taps "ball" to hear it again, giggles, and taps the next arrow.
Page 4 turns; the dog appears. At the end confetti pops, the voice says "You read the whole book!",
and Replay and HOME appear. Pressing HOME returns to the cover; Play later opens the
page they last reached.

**Core loop:** open a page → hear it narrated with per-word highlighting → tap words / pause / turn
the page → celebrate at the end → replay or return to the cover.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the reader loads, it shall show a cover screen: cover illustration, title text, a Play target ≥96×96 CSS px, an EN/ES toggle ≥64×64 CSS px, and a logo that hides the reset gesture ≥64×64 CSS px (FR-014); no audio plays before the first user gesture (R-006). When Play is pressed, it shall unlock audio and open the resume page (FR-017), then narrate it after a 400 ms lead-in (word 1 starts at 400 ms). |
| FR-002 | While a page is narrating, the reader shall highlight exactly the word token being spoken, using this source priority: (1) word timestamps — token *k* highlights from `timings[lang][k][0]` to `timings[lang][k][1]` (section 12); (2) boundary events — the highlight for token *k* begins within **120 ms** of the event for *k* and ends at the event for *k+1* (page end for the last token), and boundary character offsets map to the token containing them, with offsets inside punctuation or whitespace mapping forward (an offset past the last token maps to the last token); (3) fallback pacing — the highlight begins at the token's computed start (FR-003). Tokens = page text split on whitespace (U+0020/U+000A), punctuation kept attached. Only one token is highlighted at a time. |
| FR-003 | When timestamps and boundary events are unavailable, or no boundary event has arrived for 2 consecutive tokens, the reader shall pace the page (or the remainder) from the fallback timer: token window = `clamp(200 + 90 × L, 350, 1600)` ms, where L = count of Unicode letters in the token (punctuation excluded; L = 0 → 350 ms); each next token starts 60 ms after the previous window ends; from page start, word 1's window starts at 400 ms, and a mid-page switch starts the current token's window at the switch moment (offset 0); once the fallback starts it holds for the rest of the page, ignoring later boundary events; page audio ends 400 ms after the last window ends. |
| FR-004 | When a page's narration ends (fallback: 400 ms after the last token window, FR-003; timestamps or boundary mode: the end of the last token's clip or event), the reader shall wait 1200 ms, then auto-advance to the next page (pages 1–8); after page 8 the celebration shall start instead. |
| FR-005 | Page turning shall be available as left/right tap zones (15% of viewport width, minimum 64 px, full height below the chrome bar; chevron pictograms), horizontal swipe on the illustration (≥40 px travel, ≤600 ms, \|dx\| ≥ 1.5 × \|dy\|), and ArrowLeft/ArrowRight. A turn cancels the current utterance immediately, narrates the new page after a 400 ms lead-in when `playing` (no highlight when `paused`), and saves `lastPage`. Prev on page 1 is a no-op (no visual or audio change); Next on page 8 cancels narration, saves `completed`, and starts the celebration. |
| FR-006 | A Play/Pause target ≥64×64 CSS px shall toggle playback. Pause cancels the utterance and freezes the highlight on the word visible at that moment; Play re-speaks the page starting at that word's first character (word 1 when none is highlighted). When narration has ended and the 1200 ms advance is pending, Play/Pause cancels the advance and replays the page from word 1. |
| FR-007 | When a word is tapped, the reader shall cancel the current utterance, highlight the tapped word, and speak that word alone from its start (volume 1.0, one-shot). When the replay ends: if `playing`, narration continues from that word to page end per FR-002/FR-003; if `paused`, the highlight stays on that word. Repeated taps restart the word (FR-009). |
| FR-008 | The EN/ES toggle (≥64×64 CSS px) shall apply immediately: cancel the utterance, swap page text and word targets, and, when `playing`, restart the page from word 1 in the new language; when `paused`, remain paused with no highlight. On the cover it swaps the title only. Default is English; language is not persisted (section 10). |
| FR-009 | Only one speech utterance shall play at a time; any new voice clip (narration, single-word replay, hint, praise) cancels the previous one immediately. Sound effects may overlap each other and the utterance. |
| FR-010 | The reader shall have no fail state: mis-taps, empty taps, rapid or repeated taps, wrong page turns, and idle time never lose progress, never end a book, and never block play. |
| FR-011 | When no input has occurred for 12 s in `cover`, `reading`, or `complete`, the reader shall show one deterministic hint target for 3 s: on `cover`, pulse Play; on `complete`, pulse Replay; in `reading`, pulse the Play/Pause target when `paused`, bounce the next chevron when the page-advance timer is pending, and pulse the highlighted word otherwise. In `reading` the hint also replays `vo_hint`; on `cover` and `complete`, and before the first user gesture, the hint is visual only (R-006). The hint repeats every 12 s of continued idleness. Any input, including an empty-space tap, resets the timer. |
| FR-012 | At book end the reader shall play confetti (≤40 particles, 2500 ms), `sfx_chime`, and `vo_praise` ("You read the whole book!"), then show the complete screen 3000 ms later with Replay ≥96×96 CSS px and HOME. Replay shall open page 1, reset `completed`, and start narration. |
| FR-013 | HOME (≥64×64 CSS px, 24 px top-left margin) shall be rendered in `reading`, `celebrating`, and `complete`; it cancels any utterance or timer, saves, and returns to the cover. On `cover` (the reader's home) and `loading`, no HOME control is rendered and a HOME input is a no-op. |
| FR-014 | When the cover logo is held for 3 s, the reader shall fill a visible progress ring for the hold duration; on completion it shall clear the save and in-memory progress and play a ring flash plus `sfx_soft_tap`. Holding Enter/Space 3 s on the focused logo is the keyboard equivalent. |
| FR-015 | No-reading rule: the book's text is content and is read aloud; visible text is limited to the book text, the cover title, and the EN/ES labels (page dots and pictograms are graphics, not text). All player instructions and feedback reach non-readers by voice + pictogram. Every interactive element (logo, Play, HOME, Play/Pause, chevrons, each word, language toggle, Replay) carries an invisible accessible name; this rule governs visible text only. |
| FR-016 | Input semantics: first pointer down wins; additional simultaneous pointers are ignored until release. Double-tapping a word starts two sequential word replays (each restarts the word). Page turns are throttled to one per 500 ms; turns inside the throttle are ignored with no sound. Tap hit rects: each word expanded 14 px on all sides, clamped at the midpoint to neighboring words; on overlap the nearest word center wins; exact ties resolve leftmost, then topmost. Taps >14 px from every word inside the text panel are empty taps (FR-010). Word hit rects take precedence over the page-turn zones: a tap inside a word hit rect never turns the page. |
| FR-017 | Persistence: save on every completed page turn, on book completion, and on HOME (section 10). Resume: Play opens `lastPage` unless `completed` is true, in which case it opens page 1 and `completed` clears on the next save. |
| FR-018 | Degradation: no speech synthesis → visual-only — the page "plays" from the fallback timer (FR-003), the highlight advances, all controls work, and a muted-speaker pictogram (48×48) shows for 5 s after Play. No AudioContext → all audio silent, behavior otherwise identical. Storage blocked → run unsaved with full in-memory behavior. |
| FR-019 | Background tab: when the tab becomes hidden during playback, the reader shall cancel the utterance and enter `paused` with the highlight frozen on the current word; on return it stays paused until Play. Idle time counts only visible time. Throttled timers may delay hints, never lose progress (A6). |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank with soft background | initial state; preload book, illustrations, voice clips; audio locked |
| `cover` | cover art + title + Play + EN/ES toggle + reset logo | the reader's home; audio unlocks on the first gesture |
| `reading(page, playback)` | illustration + text panel + chrome | page 1–8; playback ∈ {playing, paused} |
| `celebrating` | frozen last page + confetti | auto-exits after 3000 ms |
| `complete` | end card + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `cover` | entry: arm audio; no sound before first gesture |
| `cover` | `PLAY_PRESSED` | — | `reading(resumePage, playing)` | entry: unlock audio; narrate after 400 ms lead-in |
| `cover` | `LANG_TOGGLED` | — | `cover` | action: swap title language; `sfx_tap` |
| `cover` | `RESET_HOLD` | hold 3 s on logo | `cover` | action: ring fill; clear save + memory; ring flash + `sfx_soft_tap` |
| `reading` | `WORD_TAP` / `PLAY_PAUSE` / `LANG_TOGGLED` / `IDLE_12S` | — | `reading(same page, same or toggled playback)` | actions: FR-006/007/008/011; `sfx_tap` as applicable |
| `reading` | `NEXT` / swipe left / ArrowRight | — | `page < 8`: `reading(page+1, same playback)`; `page = 8`: `celebrating` | actions: FR-005/FR-012; save `lastPage` (or `completed` on page 8) |
| `reading` | `PREV` / swipe right / ArrowLeft | `page > 1` | `reading(page−1, same playback)` | actions: FR-005; save `lastPage` |
| `reading` | `PREV` | `page = 1` | `reading` | none (FR-005) |
| `reading` | `AUTO_ADVANCE` | — | `page < 8`: `reading(page+1, playing)`; `page = 8`: `celebrating` | actions: FR-004; save `lastPage` / `completed` |
| `reading` | `TAB_HIDDEN` | `playing` | `reading(same page, paused)` | action: cancel utterance, freeze highlight (FR-019) |
| `reading` | `HOME_PRESSED` | — | `cover` | action: cancel utterance/timers, save |
| `celebrating` | `CELEBRATION_DONE` | — | `complete` | action: save |
| `celebrating` | `HOME_PRESSED` | — | `cover` | action: cancel timer, save |
| `complete` | `REPLAY_PRESSED` | — | `reading(1, playing)` | actions: reset `completed`, save `lastPage` = 1, narrate |
| `complete` | `HOME_PRESSED` | — | `cover` | action: save |

Events not listed for a state are ignored (no state change, no sound).

**Tab order (v1):** `cover` — logo (reset) → Play → EN/ES toggle; `reading` — HOME → prev chevron →
Play/Pause → words in reading order (left→right, top→bottom of the text panel) → next chevron → EN/ES
toggle; `celebrating` — HOME only; `complete` — HOME → Replay; `loading` — no focusables.

## 7. Input and interaction

| Action | Pointer / touch | Keyboard |
|---|---|---|
| Play / pause | tap the Play/Pause target | Space (when no control is focused) or Enter/Space on the focused target |
| Next page | tap the right zone; swipe left on the illustration | ArrowRight |
| Previous page | tap the left zone; swipe right on the illustration | ArrowLeft |
| Replay a word | tap the word | Tab to the word + Enter/Space |
| Switch language | tap the EN/ES toggle | Enter/Space on the focused toggle |
| HOME | tap HOME | Escape |
| Reset | hold the cover logo 3 s | hold Enter/Space 3 s on the focused logo |
| Activate a focused control | tap/click it | Enter/Space |

- **Hit areas:** Play/Replay ≥96×96 CSS px; words ≥56×56 at ≥1024 px wide and ≥48×48 at 768–1023 px;
  HOME, Play/Pause, chevrons, and the toggle ≥64×64 — all above the 44 px platform minimum. Focus
  indicator: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** 14 px per FR-016; taps in the gap between two words resolve by nearest word
  center, exact center-ties to the leftmost (then topmost); >14 px from every word = empty tap
  (nothing changes; the idle timer resets).
- **Multi-touch / gestures:** FR-016 single-pointer semantics; the swipe (FR-005) always has tap and
  keyboard alternatives, so no pointer-only path exists.
- **Instructions without reading:** every control is voice-cued and pictogram-labelled; no visible
  text beyond FR-015 (the book text is always spoken while narrating).
- **Accessible names:** invisible names on every interactive element (FR-015/R-013): "Play",
  "Pause", "Home", "Next page", "Previous page", "Read word: ball", "Language: Spanish".
- **Resize:** viewport resize or rotation mid-page reflows per section 8, preserving page, highlight,
  playback, and progress.

## 8. Books and content data

**Pilot book:** id `red-ball`, title "The Red Ball" (EN) / "La pelota roja" (ES), grade `Preschool`,
page count **8**, total **34 tokens EN / 34 tokens ES**. Illustration guidance is original art
direction; all assets are original (section 11).

| Page | English text (content) | Spanish text (designed translation) | Illustration guidance (`ill_n`) | Words EN/ES |
|---|---|---|---|---|
| 1 | Look! A red ball. | ¡Mira! Una pelota roja. | red ball on green grass, sunny sky | 4/4 |
| 2 | The ball can roll. | La pelota puede rodar. | ball at the top of a small hill | 4/4 |
| 3 | Roll, red ball, roll! | ¡Rueda, pelota roja, rueda! | ball rolling, motion lines behind it | 4/4 |
| 4 | The ball goes to the dog. | La pelota va hacia el perro. | ball rolling toward a brown dog | 6/6 |
| 5 | The dog can run. | El perro puede correr. | dog running after the ball | 4/4 |
| 6 | Run, dog, run! | ¡Corre, perro, corre! | dog leaping, ears up, motion lines | 3/3 |
| 7 | The dog has the ball. | El perro tiene la pelota. | dog holding the ball in its mouth | 5/5 |
| 8 | Good dog! Good ball! | ¡Buen perro! ¡Buena pelota! | dog lying beside the ball, both smiling | 4/4 |

- **Book data shape (more books addable):** section 12. Adding a book = one `Book` record; no per-book
  code beyond optional illustration assets. This spec builds the pilot book only.
- **Translation rule (designed):** translations are original, written for this spec (never copied
  from any published translation); they keep each page's meaning and simple vocabulary; per-page word
  count may differ from English by at most 2 (here: 0).
- **Tokenization:** split on whitespace; punctuation stays attached ("Look!" and "dog." are one token
  each). Word counts above are token counts.
- **Layout breakpoints (numbers):** at ≥1024 px wide — chrome bar 96 px, illustration 96 px to 60%
  height, text panel 62%–100% height and ≤900 px wide centered, word font 44 px, line-height 1.6,
  word hit ≥56 px, max 6 words per line, word gap 16 px. At 768–1023 px — chrome 88 px, text panel
  ≤`min(640 px, 66vw)`, word font 36 px, word hit ≥48 px. Height ≥700 px; below that scale the field
  by 0.85, keeping controls ≥48 px. Longer pages wrap to extra lines in reading order.
- **Progression rule:** fixed pages 1→8, gated by narration end or an explicit turn; no
  randomization, no unlocks, no timers or scoring; `completed` is the only book-level state.
- **Worked example (fallback timing, page 4, EN):** tokens L = 3, 4, 4, 2, 3, 3 → windows 470, 560,
  560, 380, 470, 470 ms; starts at 400, 930, 1550, 2170, 2610, 3140 ms; page audio ends at 4010 ms;
  auto-advance at 5210 ms. With boundary events present, each window instead cuts at the next event
  (within 120 ms).

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Narration / word tapped | highlight moves to the spoken token / sits on the tapped token | `vo_page_{bookId}_{page}_{lang}` — 1.0 — one-shot (TTS live or pre-recorded clip); a word tap replays that token alone — 1.0 — one-shot |
| Page turned | slide 250 ms | `sfx_page` — 0.7 — one-shot |
| Play/Pause or HOME | depress 80 ms | `sfx_tap` — 0.7 — one-shot |
| Language toggle | text cross-fade 200 ms | `sfx_tap` — 0.7 — one-shot |
| Book end | confetti (≤40) 2500 ms + end card | `sfx_chime` — 0.8 — one-shot; `vo_praise` — 1.0 — one-shot |
| Idle hint | deterministic target bounces/pulses 3 s | `vo_hint` — 1.0 — one-shot (plays in `reading`; visual-only on `cover`/`complete` and before the first gesture, R-006) |
| Reset hold completed | ring fill during hold; ring flash 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background music | none | `music_loop` — 0.2 — loop |

**Effect definitions (no undefined effects):** *highlight* = 8 px-radius rect behind the token, fill
`#FFE08A`, padding 6 px horizontal / 4 px vertical, appears in ≤120 ms, no motion. *slide* = content
opacity 0→1 and translate 24 px→0 over 250 ms. *cross-fade* = text opacity 1→0→1 over 200 ms.
*bounce* = chevron translates 12 px toward its page and back, 500 ms per cycle, 3 cycles over 3 s.
*pulse* = target scales 1→1.12→1 over 500 ms, for 3 s. *confetti* = ≤40 rect particles moving
≤120 px outward over 2500 ms. *ring fill* = 4 px accent stroke fills clockwise over exactly the 3 s
hold. *ring flash* = ring opacity 1→0 over 300 ms. *depress* = control scales 1→0.95→1 over 80 ms. *end card* = centered paper panel (≤360×280 px, fill `#FFFDF7`, 4 px `#3A2E24` border, 24 px radius) holding the Replay control (pictogram, no words), fading in over 250 ms when `complete` is entered.

`vo_hint` (active language): EN "Tap a word to hear it again. Tap the arrow to turn the page." / ES
"Toca una palabra para oírla otra vez. Toca la flecha para pasar la página." `vo_praise` (active
language): EN "You read the whole book!" / ES "¡Leíste todo el libro!" Voice timbre and TTS engine
are build freedom; copy and language behavior are fixed.

**Audio rules (v1):** no audio before the first user gesture (R-006); each new voice clip cancels
the previous utterance (FR-009); degradation per FR-018 — no speech synthesis → visual-only with
fallback-timer pacing, no AudioContext → silent, storage blocked → run unsaved; background-tab
timers may be throttled and speech may be suspended, handled by FR-019 (A6).

## 10. Progress and persistence

- **Storage class and key:** browser local storage, no network, no accounts; key `spec.readToMe.v1`.
- **Shape:** `{ "bookId": "red-ball", "lastPage": 1-8, "completed": false, "updatedAt": "<ISO-8601>" }`
- **Save points:** every completed page turn, book completion (celebration entry), and HOME;
  `updatedAt` refreshes on every save (v1).
- **Restore:** on load, Play resumes at `lastPage`; when `completed` is true, Play opens page 1 and
  `completed` clears on the next save (FR-017).
- **Reset:** hold the cover logo 3 s (filling ring) → clears the key and in-memory progress; the
  keyboard equivalent is holding Enter/Space 3 s on the focused logo (FR-014).
- **Deliberately not stored:** language choice, highlight position, word/tap data, timings, audio
  settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable (SVG / WebAudio / speechSynthesis) when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `cover_red_ball` | image | title frame: red ball and brown dog on grass; title rendered separately | 1024×768 SVG | static | SVG shapes + text |
| `ill_1..ill_8` | image | per-page scenes per section 8; flat, rounded linework | 1024×600 SVG each | static | SVG shapes |
| `pict_home` / `pict_play` / `pict_pause` / `pict_prev` / `pict_next` / `pict_replay` | image | house, triangle/bars, chevrons, circular restart arrow | 64×64 SVG each (Replay drawn at 96×96) | static | SVG paths |
| `pict_muted` | image | speaker with slash | 48×48 SVG | shown 5 s after Play when speech synthesis is missing | SVG path |
| `dots` / `highlight` | rendered | 8 page dots (8 px idle, 12 px active, accent fill); token highlight per section 9 | runtime | static / follows narration | none needed |
| `sfx_page` / `sfx_tap` / `sfx_soft_tap` | audio | paper swish 0.2 s; UI click 0.08 s; muted tap 0.10 s | ogg/mp3 | one-shot | WebAudio blips |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `vo_hint` / `vo_praise` | audio | copy in section 9, active language | ≤3 s / ≤2.5 s | one-shot | TTS allowed |
| `vo_page_*` | audio | page narration, EN and ES | ≤8 s each | one-shot | TTS at runtime allowed; clips may carry word timestamps |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.2 | may be omitted |

- **Palette tokens:** paper `#FFF8EC`, ink `#3A2E24`, accent `#E4572E`, grass `#7FB069`, highlight
  `#FFE08A`, chrome `#FFFDF7`. **Typography:** system rounded stack (`ui-rounded`, fallback
  `system-ui`); word font per section 8; title ≥64 px on the cover; no other visible words.
- **Load failure:** missing visual asset → draw stub shape, log a warning, keep reading; missing
  audio → continue silently with fallback pacing (R-011, FR-018).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `Book` | `id: string`; `title: {en: string, es: string}`; `grade: enum {Preschool, K, 1, 2}`; `pageCount: int`; `pages: Page[]` |
| `Page` | `index: int 1..pageCount`; `text: {en: string, es: string}`; `illKey: string`; `alt: {en: string, es: string}`; `timings?: {en?: number[][], es?: number[][]}` (optional word [startMs, endMs] pairs, authoritative when present) |
| `Save` (persisted) | `bookId: string`; `lastPage: int 1-8`; `completed: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, cover, reading, celebrating, complete}`; `page: int`; `playback: enum {playing, paused}`; `lang: enum {en, es}`; `tokens: string[]`; `tokenIndex: int`; `advanceTimer: id`; `idleTimer: id`; `utterance: object` |

**Token derivation:** `tokens = text[lang].split(/[\u0020\u000A]+/)`; `startChar[i]` = character offset of token
*i* in `text[lang]`; boundary events map by `startChar` per FR-002. `alt` values are the page's
illustration guidance (section 8) in the page language; they are invisible accessible text, not displayed.

## 13. Requirements (engine-agnostic)

- **R-001** The reader shall render vector or raster illustrations and text runs with per-token hit rects and a highlight overlay.
- **R-002** The reader shall animate the section 9 effects: slide, cross-fade, bounce, pulse, depress, confetti, ring fill/flash, end card fade-in.
- **R-003** The reader shall handle tap, double-tap, and swipe pointer input and hit-test per FR-016.
- **R-004** The reader shall support keyboard focus and activation for all interactive elements, with Escape = HOME and arrows = page turns.
- **R-005** The reader shall play concurrent one-shot audio (narration + sfx, narration at 1.0) and may loop one music track at ≤0.2; a new voice clip cancels the previous utterance before it starts, so voice clips never overlap.
- **R-006** When the browser blocks audio before a user gesture, the reader shall defer all audio until the first pointer or key input and shall never require sound to proceed.
- **R-007** The reader shall use speech synthesis with word-boundary events, map character offsets to tokens (FR-002), speak from any token to page end, support single-token replay (TTS of the token or a clipped segment using timestamps or FR-003 windows), and fall back to FR-003 pacing when boundary events or timestamps are unavailable.
- **R-008** The reader shall persist and restore one small JSON save object in browser local storage, tolerate blocked storage (FR-018), and run offline with no network requests after initial load.
- **R-009** The reader shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet during highlight motion and page turns.
- **R-010** When a voice clip or audio asset fails, the reader shall continue with visual-only fallback pacing.
- **R-011** The reader shall scale from 768×1024 to 1366×768 without losing page, highlight, or playback state.
- **R-012** The reader shall expose an invisible accessible name on every interactive element.
- **R-013** While the tab is backgrounded, the reader shall tolerate throttled timers: pause-at-word (FR-019), no progress loss, idle hints may fire late.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the cover shows Play and the EN/ES toggle, and no audio has played |
| AC-02 | the cover | Play is pressed | page 1 opens; 400 ms later word 1 is spoken and highlighted |
| AC-03 | page 1 narrating with boundary events | narration runs | exactly one word is highlighted at a time, and each highlight starts within 120 ms of its spoken word |
| AC-04 | boundary events unavailable | page 4 plays | the highlight advances on the fallback windows (a 4-letter word holds 560 ms) and the page advances at 5210 ms from word 1's start — 1200 ms after the page's fallback pacing ends |
| AC-05 | narration mid-page | a word is tapped | only that word is spoken and highlighted; when playing, narration continues from that word to page end |
| AC-06 | a word | it is double-tapped | the word is heard from its start twice in a row and nothing else changes |
| AC-07 | page 1 playing | the next zone is tapped mid-narration (or swipe left / ArrowRight) | the page 1 voice stops, page 2 appears and narrates after the 400 ms lead-in, and `lastPage` is saved |
| AC-08 | page 8 | Next is pressed | confetti, `sfx_chime`, and "You read the whole book!" play; the complete screen appears 3000 ms later |
| AC-09 | narration playing | Play/Pause is pressed | the voice stops and the current word stays highlighted; Play restarts narration from that word |
| AC-10 | page 1 | Prev is tapped (or swipe right) | nothing changes on screen or in audio |
| AC-11 | any page | empty space >14 px from every word is tapped | nothing changes on screen or in audio |
| AC-12 | any page | the next zone is double-tapped rapidly | only one page turn occurs |
| AC-13 | a page is showing and 12 s pass without input | idleness continues | the hint voice plays and the deterministic target (Play/Pause, next chevron, or highlighted word) pulses or bounces for 3 s; any tap resets and the hint repeats 12 s later |
| AC-14 | an English page playing | the toggle is pressed | Spanish text appears and narration restarts from word 1 in Spanish; toggling back restores English text and narration |
| AC-15 | page 3 reached | HOME is pressed, the page reloads, Play is pressed | page 3 opens and narrates |
| AC-16 | the book completed | the page reloads and Play is pressed | page 1 opens |
| AC-17 | the cover | the logo is held 3 s | a ring is visible during the hold and the save is cleared; the focused-logo keyboard hold behaves the same |
| AC-18 | narration playing | the tab is hidden and then shown | the page is paused on the same word; Play continues from it with no progress lost |
| AC-19 | speech synthesis unavailable | Play is pressed | no voice plays, the highlight still advances on the fallback timer, word taps highlight their word, and the muted-speaker pictogram shows 5 s |
| AC-20 | a page playing at 1024×768 | the viewport is resized to 800×1000 | page, highlight, playback, and progress are unchanged and every control is ≥48 px |
| AC-21 | the book-end celebration is playing or the complete screen is showing | HOME is pressed | the cover appears; after a reload, Play opens page 1 |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. The pilot book reads pages 1–8 end-to-end with per-word highlighting, auto-advance, and the book-end celebration.
3. Word tap, pause/resume, page turns (zones + swipe + keys), and EN/ES toggle all behave as specified.
4. Progress resumes at `lastPage` after a reload; the reset hold clears it.
5. Runs offline at both tested viewport sizes; with speech synthesis disabled the page still paces visually.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The pilot book "The Red Ball" and all book content here are original; official sources publish no book text | designed — required to avoid reproducing unpublished Khan Academy books |
| A2 | Spanish text is an original translation written for this spec | designed (rule in section 8) |
| A3 | TTS-generated voice clips and runtime TTS are acceptable | designed |
| A4 | Fallback timing numbers (200/90/350/1600/60/400 ms) approximate natural early-reader pacing | designed (FR-003) |
| A5 | Browsers block autoplay until the first gesture | platform fact; handled by R-006 |
| A6 | Background-tab timers may be throttled and speech synthesis may be suspended | known platform behavior; handled by FR-019 |
| A7 | A 120 ms highlight lag is imperceptible enough for word tracking | designed tolerance (FR-002) |
| A8 | This spec builds one book; the shape supports more without code changes | designed (section 12) |
| A9 | No unlocks, adaptive difficulty, or persisted language choice in the reader | designed (sections 8 and 10) |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved as above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** pilot book text and page order, word-highlight sync rules and fallback formula, control
  set and keyboard map, no fail state, hit-target minimums, save key and shape, translation rule,
  asset provenance, acceptance criteria.
- **Free:** exact illustration composition within the guidance, easing curves, confetti particle
  look, voice timbre/TTS engine, optional music, cover typography within the palette.
- **Not in this spec:** library browsing, book selection, Read by Myself mode, profiles, navigation
  shell, parental controls, localization beyond EN/ES, analytics, teacher tooling.
