# Neat as Nine

## 1. Front matter

- **Entry type:** Interactive player — interactive book (Books library)
- **Catalogued entry:** [`neat-as-nine.md`](../neat-as-nine.md)
- **Official source:** [Khan Academy Help Center — Get ready for school with Khan Academy Kids](https://khankids.zendesk.com/hc/en-us/articles/360013113232-Get-ready-for-school-with-Khan-Academy-Kids) — "an interactive, number-themed book where children move stickers and count out loud."
- **Spec status:** v1 — follows template v1; not yet blind-built
- **Last updated:** 2026-09-20
- **Platform assumption:** browser; touch, mouse, and keyboard; sound on; no network after load
- **Conditional sections:** 11 (assets) and 12 (state shapes) included; none omitted.

## 2. Overview and learning objective

An original six-page counting book featuring nine red apples. On each page the child moves that page's
apple stickers from a tray into the picture; a sticker's **first** placement speaks the running count
and grows the numeral in a counting frame, and the page's rhyme is read aloud as displayed. The skill
is **counting to nine and cardinality** — the last number spoken is how many. Age band: **2–5
(pre-reader; designed)**; the Books library officially covers Preschool–2nd Grade. Expected session **3–5
minutes** for one read-through, longer with replay.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Neat as Nine" is an interactive, number-themed book and a named title in official materials | official | Help Center line; catalogued entry |
| O2 | Children move stickers and count out loud | official | Help Center line |
| O3 | The Books library covers Preschool–2nd Grade | official | Help Center: Find books and lessons |
| D1 | Cover + 6 story pages, the rhymes, apples, garden art | designed | The original book text is not published; all copy here was written for this spec; no KA characters, art, audio, or names |
| D2 | 9 apple stickers, counted 1–9 across the whole book | designed | Makes "count out loud" observable and reaches the number nine |
| D3 | Drag-to-slot plus single-pointer tap alternative | designed | Buildability; children are measurably less accurate than adults |
| D4 | Counting frame: numeral + 3×3 pip grid | designed | Cardinality visible without reading |
| D5 | Page gate, page chrome, resume, reset, feedback, audio, palette, no fail state, deterministic idle hint | designed | Session continuity; never punishing; audio-first for non-readers; buildability invention |

## 4. Player experience / core loop

A child presses Read; page 1 slides in and a voice reads its rhyme. The child drags an apple sticker
into an empty outline: it snaps in, "one" is spoken, the numeral grows to 1, and pip 1 fills. Page by
page the count climbs to nine, celebrated on page 6 with "Nine! Neat as nine!" and a full 3×3 frame.

**Core loop:** open page → hear the rhyme → move stickers → count aloud + numeral grows → page chime →
turn → … → nine celebrated.

## 5. Mechanics and rules

| ID | Requirement |
|---|---|
| FR-001 | When the player loads, the interactive book shall show a cover with the title "Neat as Nine" (book content, displayed), one Read target (book pictogram, ≥96×96 CSS px), and one logo/reset target (≥96×96). No audio shall play before the first user gesture (R-006). |
| FR-002 | When Read is pressed, the player shall unlock audio and open the highest unlocked page *p* (page 1 on first load), backfilling pages 1…*p*−1 and setting the count per section 8. It shall speak `vo_instruction` (first Read after each page load only), then `vo_page_p` 300 ms later; later Reads speak `vo_page_p` alone. |
| FR-003 | Each page's displayed and spoken content shall match the exact text, slot count, and illustration guidance in section 8. |
| FR-004 | When a tray sticker is dragged and dropped with pointer-up within **24 px** of a free slot, the player shall snap it into that slot and commit the placement. If more than one free slot qualifies, the nearest center wins; exact ties resolve to the leftmost slot, then the topmost. |
| FR-005 | When a tray sticker is tapped (pointer-down and pointer-up within **12 px** on the same sticker), the player shall place it into the leftmost-then-topmost unfilled slot as the single-pointer alternative to dragging. |
| FR-006 | When a sticker is placed for the first time, the player shall increment the count by 1, speak the new count (`vo_number_N`), pop and grow the numeral, and fill the next pip in the 3×3 frame (left→right, top→bottom). A sticker's later placements never increment the count and never speak a number. |
| FR-007 | Moving a counted sticker out and back shall not double-count: a placed sticker dropped with pointer-up inside the tray strip (bottom 140 px at ≥1024 px wide, 120 px at 768–1023; section 8) moves to the leftmost free tray position; any later placement of that same sticker fills a free slot with `sfx_drop` only, leaving count, numeral, and pips unchanged. The count never decreases during a run. |
| FR-008 | When a drop qualifies for no free slot and is not inside the tray strip, the sticker shall return to its origin (its slot, or its tray position) over 200 ms with `sfx_soft_tap`; the count does not change and nothing is lost — mis-taps are never punishing. |
| FR-009 | When a placed sticker is tapped, it shall not move and the count shall not change (80 ms wiggle + `sfx_soft_tap`). Removal happens by drag to the tray (FR-007) or by Enter/Space on the focused placed sticker. |
| FR-010 | When empty space (illustration or background outside every target) is tapped, no state shall change and no sound shall play; the idle timer resets (FR-014). |
| FR-011 | When every sticker on the current page has been placed at least once, the player shall enter page-complete: `sfx_chime` plays, the right chevron glows for 1.2 s, page *p*+1 is unlocked (if *p*<6), and progress is saved. The page shall not auto-advance; the child turns it. On page 6, the FR-013 celebration replaces page-complete. |
| FR-012 | Page turning shall be available via left/right chevrons (≥96×96), 80 px edge tap zones, swipe ≥48 px, and ArrowLeft/ArrowRight. Back is allowed whenever *p*>1. Forward from *p* is allowed when *p*<6 and either *p*<`highestPageUnlocked` or the current page is complete; otherwise forward input is ignored with `sfx_soft_tap`. |
| FR-013 | When the ninth sticker is placed (count reaches 9), the player shall celebrate on page 6: numeral pops to 9, the 3×3 frame flashes, ≤40 confetti particles play, `sfx_chime` + `vo_complete` speak, and 2.5 s later the completion screen appears and progress is saved. |
| FR-014 | When no input has occurred for **12 s**, the player shall replay `vo_instruction` and pulse a halo 3 times at 1 Hz around the deterministic target: the **leftmost sticker still in the tray**; if the tray is empty, the right chevron; on cover, Read; on complete, Replay. It repeats every 12 s of continued idleness. Any tap, including empty space, resets the timer. On `cover` before the first gesture the hint is visual-only (R-006). |
| FR-015 | When HOME is pressed, the player shall save first and return to the cover. HOME is rendered on `page`, `completing` (cancelling the 2.5 s timer), and `complete`; it is not rendered on `cover` (the cover is home) or on `loading` (nothing is interactive yet). |
| FR-016 | Read-again: a speaker pictogram (≥64×64, top-right) shall replay `vo_page_p` for the current page. It is not rendered on cover. |
| FR-017 | When the cover logo is held for 3 s, the player shall fill a visible progress ring for the hold, then clear the save and in-memory progress with a ring flash + `sfx_soft_tap`; holding Enter/Space for 3 s on the focused logo behaves identically. |
| FR-018 | No-reading rule (book nuance): the book text and title are the content and may be displayed and read aloud; every player instruction and feedback shall remain voice + pictogram, never text-only. Visible non-book text is limited to the title, the section 8 rhymes, numerals, and the optional control words "Read" and "Replay" (each always paired with its pictogram). |
| FR-019 | Every interactive element (logo/reset, Read, HOME, chevrons, read-again, each sticker, Replay) shall carry an invisible accessible name; FR-018's text limit governs visible text only. |
| FR-020 | Edge cases (all states): rapid double-tap on one tray sticker → the first placement commits at pointer-up and counts once; the second tap lands during the ≤200 ms snap, when that sticker has no hit area, so it is ignored. Rapid taps on more than one tray sticker → one count each, sequential in touch-down order. Two simultaneous touches → only the first pointer is tracked; later touches are ignored until pointer-up. During a page transition (250 ms) input is ignored. Resize/rotation reflows per section 8 preserving count, pips, and placements. Taps during `completing` other than HOME are ignored. A backgrounded tab keeps runtime state; idle hints may fire late (A4). |

## 6. Screens and states

| State | Screen | Notes |
|---|---|---|
| `loading` | blank pastel background | initial state; preload assets; audio locked |
| `cover` | title + Read + logo/reset | audio unlocks on first gesture here |
| `page(p, count, placements, complete)` | illustration + slot area + sticker tray + counting frame + chrome | main state, p = 1…6 |
| `completing` | frozen page 6 + confetti + full 3×3 frame | auto-exits after 2.5 s |
| `complete` | trophy + large "9" + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `cover` | entry: arm audio; no sound before first gesture |
| `cover` | `READ_PRESSED` | — | `page(highestPageUnlocked)` | entry: unlock audio, backfill, speak `vo_instruction` (first time) + `vo_page_p` |
| `cover` | `RESET_HOLD` | hold 3 s on logo | `cover` | entry: fill ring; action: clear save + runtime, ring flash + `sfx_soft_tap` |
| `cover` | `IDLE_12S` | no input 12 s | `cover` | actions: FR-014 halo on Read; `vo_instruction` only after the first gesture (R-006) |
| `page` | `PLACE(sticker)` | first / later placement | `page` | first: FR-006 snap, numeral, pip, `sfx_drop`, `vo_number_N`; later: snap + `sfx_drop` only |
| `page` | `STICKER_TAP(placed)` / `EMPTY_TAP` | — | `page` | FR-009 / FR-010 |
| `page` | `PAGE_COMPLETE` | p<6 and all page stickers placed once | `page` | actions: FR-011; save, unlock p+1 |
| `page` | `TURN_FORWARD` | p<6 and unlock rule (FR-012) | `page(p+1)` | entry: slide 250 ms, speak `vo_page_{p+1}` |
| `page` | `TURN_BACK` | p>1 | `page(p−1)` | entry: slide 250 ms, speak `vo_page_{p−1}` |
| `page` | `IDLE_12S` | no input 12 s | `page` | actions: FR-014 halo + `vo_instruction` |
| `page` | `HOME_PRESSED` | — | `cover` | action: save |
| `page(6)` | `NINTH_PLACED` | count = 9 | `completing` | actions: FR-013; save |
| `completing` | `CELEBRATION_DONE` | 2.5 s elapsed | `complete` | action: show trophy screen |
| `completing` | `HOME_PRESSED` | — | `cover` | action: cancel timer, save |
| `complete` | `REPLAY_PRESSED` | — | `page(1)` | entry: fresh run, count 0, stickers in trays; progress kept |
| `complete` | `HOME_PRESSED` | — | `cover` | action: save |
| `complete` | `IDLE_12S` | no input 12 s | `complete` | actions: FR-014 halo on Replay + `vo_instruction` |

**Tab order (per state):** cover — logo/reset → Read. page — HOME → read-again → turn-left (if p>1) →
turn-right (if p<6) → tray stickers → placed stickers (slot order). completing — HOME. complete —
HOME → Replay.

## 7. Input and interaction

- **Primary input:** single pointer tap / click or drag inside a sticker's hit area.
- **Hit areas:** stickers ≥ **72×72 CSS px** at ≥1024 px wide, ≥ **64×64** at 768–1023 px (above the
  44 px platform minimum; children are less accurate); slots ≥80×80; Read/Replay ≥96×96; HOME ≥64×64
  at a 24 px top-left margin; chevrons ≥96×96 (≥80×80 at 768–1023).
- **Drag:** pointer-down acquires a sticker after an **8 px** move; it follows the pointer exactly
  (lift per section 9); pointer-up resolves per FR-004/FR-007/FR-008. Once a drag is acquired, pointer-up
  resolves as a drop even if the movement stayed inside FR-005's 12 px tap tolerance; FR-005 applies only
  when no drag was acquired. One sticker in hand at a time; **tap alternative:** FR-005.
- **Keyboard:** Tab moves focus per section 6; Enter/Space activates. On a tray sticker it places
  (FR-005); on a placed sticker it returns it to the tray (leftmost free position), count unchanged;
  ArrowLeft/ArrowRight turn pages. Focus: 4 px outline, ≥3:1 contrast.
- **Mis-tap tolerance:** taps within **12 px** of a sticker's edge count as that sticker; nearest
  center wins, exact ties leftmost then topmost. Drops within **24 px** of a free slot snap per FR-004.
- **Multi-touch:** first pointer only; later simultaneous touches ignored until pointer-up (FR-020).
- **Edge zones / swipe:** the outer **80 px** of viewport width (y=120 px to viewportHeight − tray height
  per section 8: 140 px at ≥1024 px wide, 120 px at 768–1023; excluding the top chrome band and the tray)
  and a horizontal drag ≥**48 px** on the background turn the page.
- **Instructions without reading:** every instruction and feedback is voice + pictogram (FR-018); the
  book text is displayed and read aloud as content.
- **Accessible names (invisible, examples):** "Home", "Read the book", "Read this page again", "Previous
  page", "Next page", "Apple sticker 2 of 2 in the tray", "Reset saved progress"; all interactive elements get one (FR-019).

## 8. Levels and content data

**Media:** one original counting book — cover + 6 story pages, 9 apple stickers total. All text below
is original to this spec (designed, D1).

| Page | Slots (stickers) | Exact text (displayed and spoken) | Illustration guidance (original flat vector) | Count after page |
|---|---|---|---|---|
| cover | 0 | "Neat as Nine" (title; displayed, not spoken) | quilted garden-green background; one red apple with leaf; title in rounded lettering | — |
| 1 | 2 | "One red apple, round and sweet. / Two red apples — a tidy treat!" | low garden wall and grass; two dashed apple outlines (slots) on the grass; two apple stickers in the tray | 2 |
| 2 | 2 | "Three red apples, warm and bright. / Four red apples — a sunny sight." | same wall; a round smiling sun; two slots | 4 |
| 3 | 2 | "Five red apples by the garden wall. / Six red apples — count them all!" | wooden garden gate; two slots | 6 |
| 4 | 1 | "Seven red apples, in the cool green shade. / One more sticker, neatly laid." | tree-shade patch and striped blanket; one slot | 7 |
| 5 | 1 | "Eight red apples, standing straight and fine. / Place one more — we're almost at nine!" | fence posts in a neat row; one slot | 8 |
| 6 | 1 | "Nine red apples — neat as nine! / Count them all — they're yours and mine!" | blanket with a faded 3×3 apple grid (8 ghosts, 1 empty slot highlighted); one slot | 9 |

- **Total stickers:** 2+2+2+1+1+1 = **9**; tray contents equal the page's slot count, ordered left→right then top→bottom.
- **Slot layout (numbers):** at ≥1024 px, slots are 96×96 px in a 3-column grid, 24 px gaps, centered,
  area top y=340 px; tray strip 140 px high with 96×96 stickers and 24 px gaps. At 768–1023 px: slots
  80×80, gaps 16 px, area top y=300 px, tray 120 px. Height <700 px: scale the field by 0.85, keeping
  hit areas ≥64 px.
- **Counting frame (numbers):** top-center; numeral font **64 + 4 × count** px (64→100) at ≥1024, **56
  + 4 × count** (56→92) at 768–1023; 3×3 pip grid with 24×24 pips and 8 px gaps (20×20 at 768–1023).
- **Worked example (resume at page 3):** pages 1–2 are backfilled (4 stickers in their slots), count
  reads 4, pips 1–4 filled, page 3 holds 2 tray stickers. Drag sticker A to slot 1 → count 5, voice
  "five". Tap sticker B → slot 2 → count 6, voice "six", chime, chevron glows, and
  `highestPageUnlocked` saves as 4. Drag the slot-1 apple to the tray and back → no new number, count
  stays 6. Turn to page 4: count 6, one sticker to place.
- **Backfill:** on Read at page *p*, pages 1…*p*−1 render all stickers in their slots with empty trays,
  the count is their total (0, 2, 4, 6, 7, 8 for p = 1…6), and pips 1…count fill without pop.
- **Randomization:** none; page order, text, slot positions, and tray order are deterministic.
- **Progression rule:** fixed, completion-gated per page; forward turning additionally gated by
  `highestPageUnlocked` (FR-012).

## 9. Feedback, rewards, and audio cues

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Sticker picked up | lift: scale 1.1, 12 px shadow, follows pointer | `sfx_pickup` — 0.6 — one-shot, 0.08 s |
| First placement | snap ≤200 ms; settle 1.15→1 in 150 ms; numeral pop 1→1.3→1 in 200 ms and grows (section 8); pip fills in 150 ms | `sfx_drop` — 0.8 — one-shot, 0.12 s; `vo_number_N` — 1.0 — one-shot, ≤1 s |
| Re-placement of a counted sticker | snap only; no numeral or pip change | `sfx_drop` — 0.8 — one-shot only |
| Invalid drop (FR-008) / placed sticker tapped | return-to-origin 200 ms / wiggle ±3° for 80 ms | `sfx_soft_tap` — 0.7 — one-shot, 0.10 s |
| Empty tap | none | none |
| Page complete | right chevron glow 1.2 s; placed stickers bounce 100 ms | `sfx_chime` — 0.8 — one-shot, 0.8 s |
| Book complete | numeral 9 pop; frame flash 300 ms; ≤40 confetti particles, 600 ms | `sfx_chime` — 0.8 — one-shot; `vo_complete` — 1.0 — one-shot, ≤3 s |
| Page turn | slide 250 ms in the turn direction | `sfx_page` — 0.7 — one-shot, 0.15 s |
| Page narration | page text visible | `vo_page_p` — 1.0 — one-shot, ≤5 s |
| Idle hint (FR-014) | halo: 6 px accent ring, scale 1.0→1.15, 3 pulses at 1 Hz | `vo_instruction` — 1.0 — one-shot |
| HOME / Read / Replay / read-again | depress 80 ms | `sfx_tap` — 0.7 — one-shot, 0.08 s |
| Reset hold completed | ring fills over the hold; ring flash 1→0 in 300 ms | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background music | none | `music_loop` — 0.25 — loop; may be omitted |

**Effect definitions:** *lift* = scale 1.1, 12 px soft shadow while dragging. *Snap*/*return* =
translate to slot center / origin over ≤200 ms. *Pop* = scale 1→1.3→1 over 200 ms. *Numeral growth* =
font per section 8, clamped to 100 px (92 at 768–1023). *Pip fill* = 0→1.15→1 over 150 ms. *Ring fill* = progress ring stroke drawn 0→100% linearly over the
3 s hold. *Chevron glow* = 8 px accent outline fading over 1.2 s. *Halo* = 6 px accent ring, 3 pulses
as above. *Ring flash* = opacity 1→0 over 300 ms. *Page slide* = out/in translate over 250 ms. *Bounce* = y −8 px and
back over 100 ms. *Wiggle* = rotate ±3° over 80 ms. *Frame flash* = 3×3 outline opacity 1→0 over
300 ms. *Confetti burst* = ≤40 star particles, ≤80 px outward, 600 ms. *Depress* = 1→0.95→1 over 80 ms.

Copy: `vo_instruction` = "Move the stickers into the picture and count out loud." `vo_complete` =
"Nine! Neat as nine!" `vo_page_1..6` = the exact section 8 text, read as two lines. Voice, timbre,
TTS engine, and language are build freedom (must speak these words).

**Audio rules (v1):** no audio before the first user gesture (R-006); each new voice clip cancels the
previous; missing APIs degrade gracefully — no speech synthesis → visual only, no AudioContext →
silent, storage blocked → run unsaved. Background-tab throttling may delay idle hints, never loses
progress (A4).

## 10. Progress and persistence

- **Storage class:** browser local storage; no network, no accounts.
- **Key:** `spec.neatNine.v1`; **shape:** `{ "highestPageUnlocked": 1-6, "bookCompleted": false|true,
  "updatedAt": "<ISO-8601>" }`
- **Save points:** page completion (unlock + save), the ninth sticker (book completion), and HOME;
  `updatedAt` refreshes on every save.
- **Restore:** Read opens `highestPageUnlocked` with the deterministic backfill (section 8); on a
  completed book it still opens page 6, while Replay restarts at page 1.
- **Reset:** hold the cover logo 3 s (filling ring) → clears the key and in-memory progress; keyboard
  equivalent: hold Enter/Space 3 s on the focused logo.
- **Deliberately not stored:** sticker positions, placements, timings, audio settings, page text,
  anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. SVG / WebAudio / speechSynthesis stubs
are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_pastel` | image | soft green paper backdrop `#EAF6E4`, faint speckles | 1024×768 SVG | static | SVG gradient + dots |
| `cover_art` | image | quilted green cover, one red apple, title lettering | 1024×768 SVG | static | SVG shapes + text |
| `page_1..6` | image | the six garden scenes from section 8, no text | 1024×768 SVG each | static | SVG shapes |
| `apple_sticker` | image | red apple `#D64545`, green leaf `#7BC47F`, 2 px ink outline `#33502F` | 96×96 SVG (80×80 at 768–1023) | lift/snap animation | SVG circle + path |
| `slot_outline` | image | dashed apple silhouette, 3 px ink dashes | 96×96 SVG | static | SVG stroke |
| `pict_home` | image | house pictogram, ink on cream | 64×64 SVG | static | SVG path |
| `pict_book` | image | open-book pictogram for Read | 96×96 SVG | depress | SVG path |
| `pict_speaker` | image | speaker pictogram for read-again | 64×64 SVG | static | SVG path |
| `pict_chevron` | image | left/right chevrons | 96×96 SVG | depress | SVG path |
| `pict_replay` | image | circular-arrow replay pictogram, ink on cream | 96×96 SVG | depress | SVG path |
| `trophy` | image | simple cup with "9" | 200×200 SVG | static | SVG path |
| `sfx_pickup` | audio | soft pop | 0.08 s, ogg/mp3 | one-shot | WebAudio blip |
| `sfx_drop` | audio | wooden click | 0.12 s | one-shot | WebAudio blip |
| `sfx_page` | audio | paper whoosh | 0.15 s | one-shot | WebAudio noise |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `sfx_soft_tap` | audio | muted tap | 0.10 s | one-shot | WebAudio blip |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `vo_instruction` | audio | "Move the stickers into the picture and count out loud." | ≤3 s | one-shot | TTS allowed |
| `vo_number_1..9` | audio | spoken numbers one–nine | ≤1 s each | one-shot | TTS allowed |
| `vo_page_1..6` | audio | the section 8 rhymes | ≤5 s each | one-shot | TTS allowed |
| `vo_complete` | audio | "Nine! Neat as nine!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop at 0.25 | may be omitted |

- **Palette / typography:** background `#EAF6E4`, ink `#33502F`, apple `#D64545`, leaf `#7BC47F`,
  accent `#F2A65A`, sun `#FFD966`, paper `#FFF8EC`; rounded stack (`ui-rounded`); book text ≥40 px,
  title ≥72 px, numerals per section 8; "Read" may be glyph-only.
- **Load failure:** missing visual asset → stub shape + warning, keep playing; missing audio → silent
  (R-011).

## 12. State and data shapes

| Shape | Fields |
|---|---|
| `BookPage` | `page: int 1-6`; `slotCount: int`; `text: string` (section 8); `slots: {x:int, y:int}[]`; `trayPositions: {x:int, y:int}[]` |
| `Save` (persisted) | `highestPageUnlocked: int 1-6`; `bookCompleted: bool`; `updatedAt: string` (ISO-8601) |
| `Runtime` (not persisted) | `state: enum {loading, cover, page, completing, complete}`; `page: int`; `count: int 0-9`; `placements: {stickerId:int, slotIndex:int|null, counted:bool}[]`; `hintTimer: id`; `celebrateTimer: id`; `transitionLock: bool` |

## 13. Requirements (engine-agnostic)

- **R-001** The player shall render 2D vector or raster sprites, large numerals, and page text.
- **R-002** The player shall animate drag/drop translate and scale, page slides, and a particle burst.
- **R-003** The player shall hit-test pointer events for taps, clicks, and drags with an 8 px threshold.
- **R-004** The player shall support keyboard focus and activation for all interactive targets.
- **R-005** The player shall play concurrent one-shot audio clips and may loop one music track at ≤0.25.
- **R-006** When the browser blocks audio before a gesture, the player shall defer audio until the first interaction (Read) without requiring sound.
- **R-007** The player shall persist and restore one small JSON save object in browser local storage.
- **R-008** The player shall run offline with no network requests after initial load.
- **R-009** The player shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-010** The player shall provide hit targets ≥64 CSS px and 4 px focus indicators at ≥3:1 contrast.
- **R-011** When a voice clip fails to play, the player shall continue with visual feedback only.
- **R-012** The player shall scale from 768×1024 to 1366×768 viewports without losing state.
- **R-013** The player shall expose an invisible accessible name on every interactive element.
- **R-014** While backgrounded, the player shall tolerate throttled timers and resume intact.
- **R-015** The player shall display and read the book text as content while instructions remain voice + pictogram.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the cover shows the title "Neat as Nine" and a Read target |
| AC-02 | the cover | Read is pressed | page 1 opens with the instruction voice, then its rhyme read aloud (audio starts only after this gesture, per R-006) |
| AC-03 | page 1 | a tray sticker is tapped | it lands in the leftmost unfilled slot, the numeral reads "1", "one" is spoken, and pip 1 fills |
| AC-04 | page 1 | a sticker is dragged to within 24 px of a free slot | it snaps into that slot and counts |
| AC-05 | page 1 | a sticker is dropped away from any free slot and outside the tray | it returns to its origin within 200 ms and the numeral does not change |
| AC-06 | a counted sticker | it is dragged to the tray and placed again | the count and numeral stay the same and no number is spoken |
| AC-07 | a tray sticker | it is double-tapped rapidly | the count increases exactly once |
| AC-08 | a placed sticker | it is tapped | it does not move and the count does not change |
| AC-09 | empty space | it is tapped | nothing on screen changes and no sound plays |
| AC-10 | the last sticker on page 2 | it is placed | a chime plays, the right chevron glows, progress is saved, and turning forward shows page 3; turning back shows page 2 with its stickers in place |
| AC-11 | the page state | ArrowRight is pressed | the next page turns exactly as a swipe or chevron tap would |
| AC-12 | saved progress at page 3 | the page reloads and Read is pressed | page 3 opens with pages 1–2 backfilled, the numeral reading "4", and pips 1–4 filled |
| AC-13 | 12 s without input | idleness continues | the instruction voice replays and a halo pulses on the leftmost tray sticker; any tap, including empty space, resets the timer |
| AC-14 | page 6 with count 8 | the ninth sticker is placed | the frame fills, confetti plays, "Nine! Neat as nine!" is spoken, and 2.5 s later the completion screen appears and progress is saved |
| AC-15 | any of `page`, `completing`, or `complete` | HOME is pressed | progress is saved, any running timer is cancelled, and the cover appears |
| AC-16 | the cover | the logo is held for 3 s | a progress ring is visible during the hold and the save is cleared when it completes; the keyboard equivalent behaves the same |
| AC-17 | a page whose stickers are not all placed | forward turn is attempted | the page does not turn and a soft tap sound plays; back turning still works |
| AC-18 | no speech synthesis, no AudioContext, or blocked storage | the book is read | play continues visual-only, silent, or unsaved respectively, and no error blocks progress |
| AC-19 | two tray stickers | they are touched simultaneously | only the first touch is tracked, the second is ignored until pointer-up, and the count increases by exactly one for that gesture |
| AC-20 | a mid-page viewport resize (e.g. 1024×768 → 800×1000) | the layout reflows | count, pips, and placements are unchanged and every remaining sticker still has a ≥64 px hit target |
| AC-21 | any open page | it is shown, then the speaker pictogram is pressed | the displayed text, slot count, and tray count match section 8 and the rhyme is read aloud again, with no other state change |
| AC-22 | any state | the screen is reviewed with assistive technology and scanned for visible text | every interactive element exposes an invisible accessible name, and visible non-book text is limited to the title, the section 8 rhymes, numerals, and the optional control words "Read" and "Replay" |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked.
2. Cover, all six pages, and the completion screen exist with the exact section 8 text and 9 stickers.
3. Counting increments only on a sticker's first placement, survives page turns, and reaches nine.
4. Tap, drag, keyboard, swipe, idle hint, HOME, resume, and reset all behave as specified.
5. Runs offline in a browser at both tested viewport sizes.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | The original book's text, art, and audio are unpublished; all content here is original (D1); the official title is kept for catalog traceability | designed — avoids reproducing KA material |
| A2 | Cover + 6 story pages and 9 stickers are chosen to fit the number theme and a short sitting | designed (section 8) |
| A3 | TTS-generated voice clips are acceptable | designed |
| A4 | Browsers block autoplay until the first gesture; background-tab timers may be throttled, so idle hints fire late but never lost | platform facts; handled by R-006/R-014 |
| A5 | Resume backfills earlier pages; on a completed book, Read opens page 6 and Replay restarts at page 1 | designed — keeps the save minimal (section 10) |
| A6 | An interactive book has no levels; the page is the progression unit | designed adaptation of the template's level table |

`[NEEDS CLARIFICATION]`: none — all other unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** page count, exact text and slot counts, count-aloud and no-double-count rules, drag and
  snap tolerances, page-turn rules, counting-frame numbers, no fail state, hit-target minimums, save
  key and shape, asset provenance, acceptance criteria.
- **Free:** composition within the illustration guidance, easing, particles, voice/TTS engine, optional music, Read glyph-vs-word.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics,
  scoring beyond completion, teacher tooling.
