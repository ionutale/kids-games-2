# Read by Myself

## 1. Front matter

- **Entry type:** Interactive player — book mode (independent reading); game-only blocks (levels, win
  conditions, scoring) are replaced by reader equivalents: a page sequence, page-turn progress, a finish screen.
- **Catalogued entry:** [`read-by-myself.md`](../read-by-myself.md)
- **Official sources:** [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids) ("Read To Me" / "Read by Myself" book modes); [App Store listing](https://apps.apple.com/us/app/khan-academy-kids/id1378467217); catalog §3 book-library wording — fiction/nonfiction, early readers, decodable texts, longer stories ([khanacademy.org/kids/ela](https://www.khanacademy.org/kids/ela)); catalog §5 book types ([Find books and lessons](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library)).
- **Spec status:** v1 — follows template v1; not yet blind-built | **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; no network after load
- **Conditional sections:** 6, 11, and 12 included; **no section omitted** (all 16 present).

## 2. Overview and learning objective

The child reads an original early-reader book alone, one page at a time. Nothing reads to them; if a
word blocks them, they tap that one word and hear it. Skill: **independent reading / decoding
practice**. Official span: Preschool–2nd Grade (decodable texts, early readers, longer stories);
primary band **6–8 (early reader)**. Expected session: **3–8 minutes** per book.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | Children read library books **on their own**, as an alternative to the Read To Me read-aloud mode | official | Catalogued entry; Parent guide / App Store mode names |
| O2 | Therefore **no automatic narration** on page open; read-aloud belongs to the other mode | official (entailed) | Mode is defined against the read-aloud alternative; catalog §3 lists "Read-to-me audio with word highlighting" as Read To Me's feature |
| O3 | Library includes fiction and non-fiction, early readers, decodable texts, longer stories | official | Catalog §3 ([khanacademy.org/kids/ela](https://www.khanacademy.org/kids/ela)) |
| O4 | Book types include character stories, social-emotional books, early readers, non-fiction animal books, alphabet books; library spans Preschool–2nd Grade | official | Catalog §5; catalogued entry |
| D1 | Reader chrome: page card, HOME, pips, always-visible word-help pictogram | designed | Official sources describe modes, not UI |
| D2 | Page turn by tap zones + swipe ≥64 px + keyboard | designed | Every reader needs a way forward; no pointer-only path |
| D3 | Tapping a word speaks **that single word only** — never a sentence or page — and help is optional | designed | Preserves O1/O2 independence: help unblocks decoding without becoming read-aloud; the child still does the reading |
| D4 | Idle hint: gentle pulse on the first untapped word, visual only | designed | Non-punishing, deterministic, quiet — never interrupts reading with narration |
| D5 | Page pips and a finish screen with Read again + HOME; no quiz, score, or gamification | designed | Reader equivalents for progress and completion; this is a reading mode, not a game |
| D6 | Save/resume at the page last read; 3 s hidden reset | designed | Session continuity without accounts; template v1 rule |
| D7 | Sample book `bug_log` ("A Bug on a Log") is original text and art | designed | Official books are unpublished; no Khan Academy characters, art, audio, or names used |
| D8 | All audio: one instruction clip per book open, single-word clips, page/finish sfx | designed | Official sources do not describe this mode's audio |

## 4. Player experience / core loop

A child taps Play on the cover. Page 1 fades in — a red bug on grass, "A bug." below — and a voice
says once, "You read the book by yourself! Tap any word to hear it." The child reads, turns the page
when ready, and on page 6 stalls on "sits": one tap outlines it and speaks just "sits". The last
turn opens the finish screen — "You read the whole book!" — with Read again.

**Core loop:** open book → read a page independently → (optional) tap one word for its sound → turn
the page → finish screen → read again.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, it shall show a title screen: cover art, logo, and one Play target (≥96×96 CSS px). |
| FR-002 | When Play is pressed, the player shall open `lastBookId` at the resume point — the `finished` screen if `finished` is true, else `lastPage`; first run: page 1 of `bug_log`. Opening to a reading page shall speak `vo_instruction` once (first user gesture: audio may start; the book text itself is never narrated) and pulse the word-help pictogram 3×; opening to `finished` plays no instruction. |
| FR-003 | While reading, the player shall render the page card — illustration in the upper band (card y 8%–58%), text below in the lower 40% (section 8 numbers) — plus HOME, the word-help pictogram, and one progress pip per page with the current pip highlighted. **Opening or turning to a page shall never play speech**; only `sfx_page` plays on turn completion (O2). |
| FR-004 | When a **word** is tapped or keyboard-activated, the player shall outline that word with the pill highlight (300 ms) and speak that single word at volume 1.0 via a `vo_word` clip; no page turn, no progress change, no storage write. Activated again while speaking, the clip restarts (new voice clip cancels the prior utterance). |
| FR-005 | When the forward zone is tapped, a left swipe ≥64 px completes inside the page card, the focused forward control is activated, or ArrowRight is pressed with the page card or a zone focused, the player shall enter `turning(page → page+1)` for 300 ms; from the last page the same action shall open `finished`. The mirrored actions (back zone, right swipe, focused back control, ArrowLeft) shall turn back one page; on page 1 the back action is a no-op. |
| FR-006 | Swipe and tap rule: a pointer sequence moving <8 px is a tap; 8–63 px, or any drag that is not horizontal-major, is ignored (no state change); `\|dx\| ≥ 64` px with `\|dx\| > \|dy\|` turns in the drag direction. During `turning`, all pointer and page-key events are ignored except HOME. |
| FR-007 | Tap precedence: (1) inside a word hit rect → word tap (FR-004); (2) otherwise inside a chrome control (HOME, word-help pictogram) → that control's action (FR-011; section 7); (3) otherwise inside a page-turn zone → turn (FR-005); (4) otherwise empty — no visual or audio change, and the idle timer resets (FR-009). |
| FR-008 | Edge cases: rapid double-tap on a zone → one turn, the second tap lands in `turning` and is ignored. Rapid word taps → each restart audible from the beginning. Two simultaneous touches → sequential in touch-down order; ties resolve left→right, then top→bottom. Empty-margin tap (text block between words, or gutter outside the card) → FR-007(4). Resize/rotation mid-page → reflow per section 8; page, pips, save unchanged; word hit rects realign to rendered glyph boxes. A one-page book → forward opens `finished`. |
| FR-009 | When no input has occurred for 12 s while reading, the player shall pulse the **first word in reading order (topmost line, left→right) not yet word-tapped since the page opened** — 3 pulses over 3 s, visual only, no audio. If every word has been word-tapped, it shall pulse the word-help pictogram instead. Repeats every 12 s; any input, including an empty tap, resets the timer and the pulse. |
| FR-010 | When the last page's forward turn completes, the player shall enter `finished`: cover with cover glow (1.2 s), Read again (≥96×96), HOME; `sfx_chime` + `vo_finish` once; save `{ lastPage: pageCount, finished: true }`. Read again shall restart at page 1, save `{ lastPage: 1, finished: false }`, and speak `vo_instruction` again. |
| FR-011 | When HOME is pressed in any state, the player shall cancel running timers (turning 300 ms, idle 12 s), save, and show `title`; HOME is inert in `loading`. |
| FR-012 | The player shall have no fail state: no quiz, score, stars, streak, countdown, or lock. Word taps, mis-taps, empty taps, and idle time never change the page, remove progress, or block finishing. |
| FR-013 | When the title logo is held for 3 s, the player shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and shows a ring flash (300 ms) plus `sfx_soft_tap`. Holding Enter/Space 3 s on the focused logo behaves identically. |
| FR-014 | Every interactive element (logo/reset, Play, HOME, word-help pictogram, back zone, forward zone, each word, Read again) shall carry an invisible accessible name (section 7); FR-015's text limit governs visible text only. |
| FR-015 | All player instructions, hints, and feedback shall be understandable without reading — audio plus pictogram. Visible text is limited to the book's own text (page text and cover title — content, meant to be read), optional words "Play" / "Read again", and numerals a builder adds; player chrome carries no sentences. No-reading nuance: the book text **is** the content and is deliberately readable; everything the player says to the child is audio + pictogram. |

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank paper background | preload assets; audio locked |
| SC-02 | `title` | cover + logo + Play | audio unlocks on first gesture; title is home |
| SC-03 | `reading(bookId, page, tappedWords)` | page card + text + pips + HOME + pictogram | main state; `tappedWords` = help taps this page (memory only) |
| SC-04 | `turning(bookId, fromPage, toPage)` | old card sliding out, new sliding in | ≤300 ms; only HOME responds |
| SC-05 | `finished(bookId)` | cover + Read again + HOME | terminal until Read again |

| State | Event (guard) | Next | Entry/exit actions |
|---|---|---|---|
| `loading` | `ASSETS_READY` | `title` | show cover + Play; audio still locked |
| `title` | `PLAY_PRESSED` | `reading(lastBookId, lastPage)` or `finished(lastBookId)` when `finished` | unlock audio; FR-002 |
| `title` | `RESET_HOLD` (3 s on logo) | `title` | ring fills during hold; clear save + memory; ring flash + `sfx_soft_tap` |
| `reading` | `WORD_TAP(w)` | `reading` | FR-004 |
| `reading` | `NEXT` (`page < pageCount`) | `turning(page → page+1)` | save `lastPage = page` |
| `reading` | `NEXT` (`page = pageCount`) | `finished` | FR-010; save |
| `reading` | `BACK` (`page > 1`; page 1 no-op) | `turning(page → page−1)` | save `lastPage = page` |
| `reading` | `EMPTY_TAP` | `reading` | reset idle timer |
| `reading` | `IDLE_12S` (no input 12 s) | `reading` | FR-009; repeats every 12 s |
| `reading` | `HOME_PRESSED` | `title` | cancel timers; save |
| `turning` | `PAGE_TURNED` (300 ms) | `reading(toPage)` | render; `sfx_page`; update pips; save `lastPage = toPage` |
| `turning` | `HOME_PRESSED` | `title` | cancel 300 ms timer; save `lastPage = fromPage` |
| `finished` | `REPLAY_PRESSED` | `reading(page 1)` | FR-010 restart; save; `vo_instruction` |
| `finished` | `HOME_PRESSED` | `title` | save |

**Tab order (v1):** `title` — logo → Play; `reading` — HOME → word-help pictogram → words in reading order (topmost line, left→right) → back zone (pages ≥2) → forward zone; `turning` — HOME only; `finished` — HOME → Read again; `loading` — none. HOME per FR-011 (inert in `loading`, no-op on `title`).

## 7. Input and interaction

- **Hit areas:** Play / Read again ≥ **96×96 CSS px**; HOME and word-help pictogram ≥ **64×64**;
  page-turn zones = full page-height strips at the card edges, width `max(72, 0.18 × pageWidth)` px at
  viewports ≥480 px wide, `max(56, 0.14 × pageWidth)` below; word hit rect = rendered glyph box
  expanded vertically to ≥ **48 px**, horizontally 6 px per side, then symmetrically widened to
  ≥ **44 px** if narrower (e.g. "A"). For `ageBand` `preschool`, grow one step: word rect height
  ≥ **56 px**, chrome ≥ **72×72**, Play / Read again ≥ **112×112**.
- **Mis-tap tolerance:** a tap within **8 px** outside a word hit rect counts as that word; when
  expanded rects/halos overlap, the **nearest word center** wins; an exact tie resolves leftmost,
  then topmost. Word rects win over page-turn zones; a tap matching neither is FR-007(4).
- **Keyboard equivalent for every action:** Tab follows the section 6 order; Enter/Space activates
  the focused element (word = speak, zone = turn, controls = press, pictogram = replay instruction);
  Escape = HOME; ArrowRight/ArrowLeft turn pages while the page card or a zone has focus (arrows never
  move between words — Tab does). Focus indicator: 4 px outline, ≥3:1 contrast.
- **Multi-touch:** per FR-008; swipe has the zone/arrow alternatives, so no pointer-only path exists.
- **Instructions without reading:** `vo_instruction` once per book open (FR-002) + always-visible
  word-help pictogram that replays it + pictogram pulse on page open (FR-002); no text-only path.
- **Accessible names (invisible):** logo = "Read by Myself, hold three seconds to reset progress";
  Play = "Read"; HOME = "Home"; pictogram = "Tap a word to hear it — replay instructions"; back/forward
  zones = "Previous page" / "Next page"; each word = "Word: *word*"; Read again = "Read again"; pips
  container (not interactive) = "Page *p* of *N*"; cover = "Book cover: *title*".

## 8. Levels and content data

**Built book.** `bug_log` — "A Bug on a Log", early reader (decodable CVC), Kindergarten, 10 pages,
42 word tokens, longest page 6 tokens. Page text is exact; tokens split on spaces with punctuation
attached and stripped when spoken.

| Page | Exact page text | Tokens | Illustration guidance | Art key |
|---|---|---|---|---|
| 1 | `A bug.` | 2 | red bug on green grass, wide sky | `art_bug_log_01` |
| 2 | `The bug is red.` | 4 | close-up of the red shell | `art_bug_log_02` |
| 3 | `The bug digs.` | 3 | digging a hole in brown soil | `art_bug_log_03` |
| 4 | `The bug digs in mud.` | 5 | splashing mud puddle | `art_bug_log_04` |
| 5 | `A log is by the mud.` | 6 | fallen log beside the puddle, ferns | `art_bug_log_05` |
| 6 | `The bug sits on the log.` | 6 | bug resting atop the log, side view | `art_bug_log_06` |
| 7 | `The sun is hot.` | 4 | bright sun, warm light | `art_bug_log_07` |
| 8 | `The bug hops off.` | 4 | bug hopping off, small motion arcs | `art_bug_log_08` |
| 9 | `The bug digs a bed.` | 5 | digging a hollow under leaves | `art_bug_log_09` |
| 10 | `Good night, bug!` | 3 | moon rising, bug asleep | `art_bug_log_10` |

- **Worked example (page 6):** `The bug sits on the log.` tokenizes as `The · bug · sits · on · the · log.`; tapping `log.` outlines it and speaks "log" only — no sentence audio; double-tapping `sits` restarts its clip.
- **Token rules:** ≤ **8 tokens** per page; sentences ≤ **6 words**; spoken text = token minus trailing punctuation; tokens never reorder; text never changes at runtime.
- **Progression:** fixed pages 1→10, one page per turn, forward or back; no gating, timer, or adaptive difficulty; the last page's forward turn is the only completion condition.
- **Adding books:** one `BookConfig` entry (section 12) + page table + art keys; types `early_reader`, `decodable`, `fiction`, `non_fiction`, `alphabet`, `social_emotional`, `character_story`, `longer_story`; `pageCount` **1–24**; data-only change. New text must be original, follow the token rules, and use no Khan Academy characters or names.
- **Pips:** **12×12 px** per page, **8 px** gap, current pip **16×16** (scale 1.33), earlier pips 60% opacity; if `pageCount > 12`, pips shrink to **8×8** with **4 px** gap; non-interactive.
- **Layout numbers** (`vw`, `vh` = viewport px; no scrolling down to 320×480): `pw = min(vw − 48, (vh − 168) × 0.75, 720)`, `ph = pw × 4/3`; illustration = card y 8%–58% of `ph`; text block centered at 78% of `ph`, max width `pw − 2 × max(24, 0.06 × pw)`, line-height 1.5, max **3 lines** (reduce font **1 px** per step, floor **22 px**); font `fs = clamp(pw × 0.062, 22, 40)` px. HOME top-left / pictogram top-right, **64×64**, **24 px** margin (**12 px** below 480 px width); pips centered at `vh − 32`.
- **Randomization:** none — page order, layout, pacing, and audio are deterministic.

## 9. Feedback, rewards, and audio cues

Effect definitions: **fade in** = opacity 0→1 over 200 ms; **pill highlight** = 4 px accent rounded outline, opacity 0→1 in 100 ms, hold 100 ms, out 100 ms (300 ms); **word pulse** = same outline, opacity 0→0.6→0 over 1 s ×3; **page slide** = outgoing card out and incoming card in, one `pw` each, 300 ms ease-out; **pictogram pulse** = scale 1→1.15→1 at 1 Hz ×3; **cover glow** = 8 px warm outline fading over 1.2 s; **ring fill** = stroke-dashoffset 0→100% linear over 3 s; **ring flash** = ring opacity 1→0 over 300 ms; **depress** = scale 1→0.95→1 over 80 ms.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Book opened (Play) | page fades in 200 ms; pictogram pulses 3× | `vo_instruction` — 1.0 — one-shot |
| Page turn completes | slide 300 ms; pips update | `sfx_page` — 0.5 — one-shot; **no speech** (O2) |
| Word tapped / re-tapped | pill highlight (re-tap: highlight again) | `vo_word` — 1.0 — one-shot, single word; clip restarts, previous utterance cancelled |
| Empty tap | none | none |
| Idle 12 s (FR-009) | word pulse (or pictogram pulse) 3 s | none — quiet reading mode |
| Book finished (last page) | cover glow 1.2 s; Read again shown | `sfx_chime` — 0.8 — one-shot; `vo_finish` — 1.0 — one-shot |
| Read again / HOME pressed | fade in / depress 80 ms | `sfx_tap` — 0.6 — one-shot |
| Reset hold completed | ring fills during hold; ring flash 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| Background music | none | **omitted** — no loop clip; the reading mode stays quiet |

`vo_instruction`: "You read the book by yourself! Tap any word to hear it." (≤4 s). `vo_finish`: "You
read the whole book! Great reading!" (≤3 s). `vo_word` = one tapped token's spoken form (≤1 s). Voice
timbre, language, and TTS engine are build freedom; no negative wording.

**Audio rules (v1):** no audio before the first gesture — the first sound is `vo_instruction` after Play (R-005); every clip is one-shot (none loops), and each new voice clip cancels the previous utterance. Degradation: no speech synthesis → word help is a visual-only pill flash (400 ms) and the instruction is skipped; no AudioContext → silent but usable; storage blocked → run unsaved in memory. Background-tab throttling: the 12 s idle hint is the only timer that fires without input; it may fire late, nothing is narrated on it, and no progress depends on it (R-013).

## 10. Progress and persistence

- **Storage class:** browser local storage; no network, no accounts.
- **Key:** `spec.readByMyself.v1`
- **Shape:** `{ "lastBookId": "bug_log" | null, "books": { "bug_log": { "lastPage": 1-10, "finished": false } }, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `turning` (page being left), `PAGE_TURNED` (new page), entering `finished`
  (`finished: true, lastPage: pageCount`), Read again (`lastPage: 1, finished: false`), any HOME
  press, reset-hold completion. `updatedAt` refreshes on every save.
- **Restore:** Play opens `lastBookId` at `lastPage`, or the `finished` screen when `finished` is
  true; first run: page 1 of `bug_log`.
- **Reset:** hold the title logo 3 s (ring feedback) → clears the key and in-memory progress and shows
  the ring flash + `sfx_soft_tap`; keyboard equivalent: hold Enter/Space 3 s on the focused logo.
- **Deliberately not stored:** per-word taps, pages read besides the current one, reading timings,
  audio settings, streaks/statistics, anything identifying. Word-help taps are memory-only per page.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable when
the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `cover_bug_log` | image | red bug on a log, no baked-in lettering (title is book content) | 480×640 SVG | static | SVG shapes + gradient |
| `art_bug_log_01..10` | image | one illustration per section 8 page; flat shapes, thick outlines | 640×360 SVG each | static | SVG shapes + gradient |
| `logo` | image | small book-with-bug mark for title/reset | 96×96 SVG | static | SVG path |
| `pict_play` / `pict_home` / `pict_reread` | image | play triangle / house / circular-arrow pictograms | 96×96, 64×64, 96×96 SVG | static | SVG paths |
| `pict_word_help` | image | speech bubble with pointing hand and "a" glyph, high contrast | 64×64 SVG | static; pulses per FR-002/FR-009 | SVG path + text "a" |
| `sfx_page` | audio | soft paper slide/whoosh (never harsh) | 0.25 s, ogg/mp3 | one-shot | WebAudio filtered noise |
| `sfx_tap` / `sfx_soft_tap` | audio | UI click / muted tap | 0.08 s / 0.10 s | one-shot | WebAudio blips |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `vo_instruction` | audio | "You read the book by yourself! Tap any word to hear it." | ≤4 s | one-shot | TTS allowed |
| `vo_word` | audio | one tapped token's spoken form, generated per token | ≤1 s each | one-shot | TTS allowed |
| `vo_finish` | audio | "You read the whole book! Great reading!" | ≤3 s | one-shot | TTS allowed |

- **Palette tokens:** background `#F5EFE0`, paper `#FFFDF7`, ink `#3B2F2A`, accent `#5B8C6E`,
  warm `#E9B44C`, bug red `#D9534F`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); page text per section 8
  (22–40 px); visible chrome text limited to optional "Play" and "Read again".
- **Load failure:** missing visual → stub shape + warning, keep reading; missing audio → silent (R-010).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `BookConfig` | `id: string`; `title: string`; `coverKey: string`; `type: early_reader \| decodable \| fiction \| non_fiction \| alphabet \| social_emotional \| character_story \| longer_story`; `ageBand: preschool \| k \| 1 \| 2`; `pageCount: 1-24`; `pages: PageConfig[]` |
| `PageConfig` | `page: 1-pageCount`; `text: string` (≤8 tokens, sentences ≤6 words); `artKey: string` |
| `WordToken` (derived at layout, not stored) | `index: int`; `text: string`; `spoken: string` (token minus trailing punctuation); `rect: {x,y,w,h} px` (min 44×48; recomputed after reflow) |
| `Save` (persisted) | `lastBookId: string \| null`; `books: Record<bookId, { lastPage: int; finished: bool }>`; `updatedAt: string` (ISO-8601, refreshed each save) |
| `Runtime` (memory) | `state: loading \| title \| reading \| turning \| finished`; `bookId: string`; `page: int`; `tappedWords: int[]`; `idleTimer: id`; `turnTimer: id` |

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector or raster illustrations and wrapped text blocks per the section 8 typography and layout numbers.
- **R-002** The player shall hit-test pointer input against word rects, page-turn zones, and chrome controls with the section 7 tolerance, precedence, and tie rule.
- **R-003** The player shall support keyboard focus and activation for every target, including the 3 s hold reset and word-by-word reading-order focus.
- **R-004** The player shall play single one-shot clips (sfx + one voice at a time); no looping audio is required.
- **R-005** When the browser blocks audio before a user gesture, the player shall defer audio until Play and shall never require sound to proceed.
- **R-006** The player shall persist and restore one small JSON save object in local storage, and shall run unsaved in memory when storage is unavailable.
- **R-007** The player shall run offline with no network requests after initial load.
- **R-008** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet, including the 300 ms page slide.
- **R-009** The player shall provide hit targets ≥44 CSS px (word rects ≥44×48, chrome ≥64, primary ≥96; one step larger for `preschool` per section 7) with visible focus indicators.
- **R-010** When a voice clip or audio API fails, the player shall continue with visual feedback only, including a visual-only word flash without speech synthesis.
- **R-011** The player shall scale from 768×1024 to 1366×768 without losing state, with no scrolling down to 320×480.
- **R-012** The player shall expose an invisible accessible name on every interactive element and a group label on the pips.
- **R-013** When the tab is backgrounded and timers are throttled, the player shall run any expired idle timer on restore and shall lose no progress.
- **R-014** The player shall generate all page content deterministically from the section 8 data with no runtime randomness.
- **R-015** After any reflow, the player shall recompute word hit rects from the rendered glyph boxes so the section 7 targets and tolerances still hold.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the title screen shows the cover, logo, and a Play target |
| AC-02 | the title screen | Play is pressed | page 1 of `bug_log` appears and "You read the book by yourself! Tap any word to hear it." plays once (audio may only start after this gesture, per R-005) |
| AC-03 | page 1 is open | the page settles | the illustration, text `A bug.`, and pip 1 of 10 are visible, and no speech is audible after the instruction (no automatic narration, O2) |
| AC-04 | page 6 | `sits` is tapped | that token is outlined and only the word "sits" is spoken — no sentence or page audio |
| AC-05 | a word clip is playing | the same word is tapped again | the clip restarts from the beginning, one voice at a time, and nothing else changes |
| AC-06 | page 2 | the forward zone is tapped | the page slides left over 300 ms, pip 3 highlights, `sfx_page` plays, and no speech plays |
| AC-07 | page 2 | the forward zone is double-tapped rapidly | exactly one page turn occurs; the second tap during `turning` produces no feedback |
| AC-08 | page 1 | the back zone is tapped | nothing on screen changes and no sound plays |
| AC-09 | page 3 | a left swipe of 40 px happens, then one of ≥64 px | the 40 px swipe changes nothing; the ≥64 px swipe turns to page 4 |
| AC-10 | any page | empty margin (outside every word rect and zone) is tapped, including ten random taps | nothing changes visually or audibly, no page change or progress loss occurs, and the idle timer resets |
| AC-11 | two simultaneous touches on one word and the forward zone | they land together | they process sequentially in touch-down order (left→right then top→bottom on ties) with no stuck state |
| AC-12 | page 5 with untapped words | 12 s pass with no input | the first untapped word in reading order pulses 3 times, no audio plays, and any tap resets the hint |
| AC-13 | keyboard focus | Tab reaches the word `bug` and Enter is pressed; then the forward zone is focused and Enter is pressed | the word is spoken exactly as a tap would, then the page turns |
| AC-14 | page 10 | the forward zone is tapped | the finish screen shows the cover with a glow, "You read the whole book! Great reading!" plays once, and progress saves `finished: true` |
| AC-15 | the finish screen | Read again is pressed | the player returns to page 1, the instruction replays, and the save reads `lastPage: 1, finished: false` |
| AC-16 | saved progress on page 4 | the page reloads and Play is pressed | page 4 opens; with `finished: true` saved instead, the finish screen opens |
| AC-17 | a page turn is in progress | HOME is pressed | the 300 ms timer is cancelled, the save is written, and the title screen appears |
| AC-18 | the title screen | the logo is held 3 s | a progress ring is visible during the hold, the save is cleared on completion, and the keyboard equivalent behaves identically |
| AC-19 | speech synthesis is unavailable | a word is tapped | the pill highlight appears as a visual-only flash and the player remains fully usable |
| AC-20 | storage is blocked (private mode) | pages are read and the book is finished | reading continues without error and the save is kept in memory only |
| AC-21 | a screen reader is active | the title, reading, and finish screens are navigated | every interactive element announces an invisible name (e.g. "Word: bug", "Next page") and the pips announce "Page p of N" |
| AC-22 | a mid-page resize from 1024×768 to 768×1024 | the viewport changes | the page reflows per section 8, the page number and pips are unchanged, and every word still has a ≥44×48 px hit rect |
| AC-23 | a one-page book | the forward zone is tapped | the finish screen opens (there is no page 2) |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone; one full book reads end-to-end — turns by tap, swipe, and keyboard; one-word help; finish + Read again.
2. No automatic narration on page open; the only speech is the instruction, single tapped words, and the finish line.
3. Progress survives a reload at the page last read; the 3 s hold resets it; every FR-008 edge case behaves as specified.
4. Runs offline in a browser at 1024×768 and 768×1024, and down to 320×480 without scrolling.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The reader chrome (zones, pips, pictograms, finish screen) is entirely designed | assumption — official sources describe the mode, not its UI |
| A2 | Single-word help preserves independent reading; sentences are never spoken | designed — D3 rationale |
| A3 | The built book `bug_log` is original, decodable, Kindergarten-level text and art | designed — official books are unpublished and must not be reproduced |
| A4 | One book is built; `BookConfig` plus token rules cover adding any official category later | designed — keeps the spec one-context-sized |
| A5 | No quiz, score, stars, streak, or gamification | designed — this entry is a reading mode, not a game |
| A6 | Instruction/finish copy, voice timbre, and language beyond the stated meanings | build freedom within section 9 |
| A7 | TTS-generated voice clips are acceptable for the build | designed |
| A8 | Browsers block autoplay until the first gesture; background tabs throttle timers; storage may be blocked (private mode) | platform facts — handled by R-005, R-013, R-006 |
| A9 | `speechSynthesis` voices may load asynchronously; the first word clip may be delayed | platform fact — visual feedback is independent |
| A10 | Resume after finishing opens the finish screen rather than page 10 | designed — avoids re-triggering completion; Read again resets to page 1 |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** the built book's exact page text and page count, token rules, no automatic narration,
  single-word-only help, no quizzes/scores, page-turn interactions and tolerances, pips and finish
  screen behavior, no-fail rule, hit-target minimums, save key and shape, original-asset rule,
  acceptance criteria.
- **Free:** illustration composition and style within the palette tokens, easing curves, pictogram
  design, pip styling, voice timbre/TTS engine, whether Play and Read again show words or glyphs,
  optional extra original books added later via `BookConfig`.
- **Not in this spec:** Read To Me features (read-aloud narration, synchronized word highlighting,
  Spanish read-aloud) — this is the alternate self-read mode; also profiles, navigation shell,
  bookshelf/library browsing beyond the one-book title screen, parental controls, localization,
  analytics, adaptive levels, teacher tooling.
