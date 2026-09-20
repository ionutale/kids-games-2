# Memory games (Logic+) — one representative designed game

## 1. Front matter

- **Entry type:** Activity type (game) — official sources name no individual memory game, so this
  spec designs one representative **face-down memory (concentration) game** (D1/D2)
- **Catalogued entry:** [`memory-games.md`](../memory-games.md)
- **Official sources:** [Help Center — Find books and lessons in the Khan Kids Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library),
  [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids)
  (both via the catalogued entry; Logic+ row `khan-academy-kids-games.md` line 90; tabs line 27)
- **Spec status:** v1 — follows template v1; sibling of [`specs/matching-games.md`](matching-games.md);
  not yet blind-built
- **Last updated / platform:** 2026-09-20. Browser; touch, mouse, and keyboard; sound on; no network
  after load
- **Provenance constraint:** the catalogued title is retained for traceability only and appears
  nowhere on screen or in audio. The designed game uses only original tokens, art, and audio; its
  spec-internal working name is "Remember the pairs". Nothing from Khan Academy is reproduced
  (D1, D3).
- **Family relation to `matching-games.md`:** this spec reuses the sibling's original token set
  (10 icons), variant vocabulary (`icon`/`shadow`/`pose`), card geometry and grid formulas,
  effect vocabulary, match/celebration feedback numbers, and save-key shape; every extension is a
  marked D-row (D3, D5–D8, D12).
- **Conditional sections:** 6, 11, and 12 are included; none omitted.

## 2. Overview and learning objective

A child opens a board of face-down cards. At the start of each level every card is briefly revealed
(500 ms per card, up to 8 s), then flips face-down; the child taps cards to turn them over and uses
memory to find the pairs. A matched pair locks face-up with a check badge and fills a pip on the
prompt card; a mismatch wiggles, flashes coral, is spoken as "They don't match. Keep looking!", and
after 1.2 s the two cards flip back down. The skill practiced is **working memory** — holding a
briefly seen layout in mind while turning cards one at a time — the Logic+ tab's focus, memory, and
flexible thinking made concrete (O2). Content grows from 3 identical pairs (6 cards, Preschool) to
8 mixed identical/shadow/mirrored pairs (16 cards, 2nd Grade).

Age band: **ages 2–8**; the level content spans the Logic+ tab's Preschool–2nd Grade learning-level
filter (O3, D4). Expected session: **3–6 minutes** (one or two levels in a short sitting; a full
eight-level run typically 6–10 minutes).

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Memory games" is an activity type listed among the Logic+ tab's activities, alongside matching games and activities that help kids follow directions | official | Library article, via catalogued entry — Description |
| O2 | Logic+ focuses on focus, memory, and flexible thinking | official | Library article / Parent guide, via catalogued entry and `khan-academy-kids-games.md` line 90 |
| O3 | The Logic+ tab can be filtered by learning level, Preschool–2nd Grade | official | Catalogued entry — Levels; Help Center: Find books and lessons |
| O4 | Official sources name no individual memory game, and publish no memory-game mechanic, count, or level content | official | Catalogued entry — Notes ("no per-game file because no titles are published") |
| D1 | This spec designs one representative memory game, marked designed throughout; the catalogued entry name is traceability-only and appears nowhere on screen or in audio | designed | Official sources name no game; the entry cannot be built otherwise; no Khan Academy content may be reproduced |
| D2 | The representative game is **face-down** memory/concentration (cards reveal briefly, then hide; pairs are found from memory), deliberately the complement of the sibling's face-up pair-matching game | designed | Official text lists memory games separately from matching games; face-up play is the sibling entry's surface (`matching-games.md`) |
| D3 | Reused family system: the 10 original tokens (`fx fg lf bz sh mn wl ms sf cl`), variants `icon`/`shadow`/`pose` (pose only for `fx bz wl sh`), card sizes, grid formulas, effect vocabulary, match/celebration feedback numbers, and save-key shape from `matching-games.md` | designed | One family of specs; original assets only; a child who has played either game recognizes the other |
| D4 | 8 fixed levels; 3–8 pairs; 6–16 cards; bands Preschool → 2nd Grade | designed | Progression across the official filter band; no official counts exist |
| D5 | Study phase: at every level start all cards are face-up for `studyMs = 500 × N` ms (3000–8000 ms), then flip down, staggered 40 ms in slot order | designed | "Cards reveal briefly, then hide" needs an exact reveal length; 500 ms per card gives a scan without stalling |
| D6 | Flip animation: 300 ms horizontal flip (scaleX 1→0 over 150 ms, face swap at 0, scaleX 0→1 over 150 ms) | designed | The defining motion of a face-down game; not present in the sibling |
| D7 | Mismatch: both cards stay revealed for 1200 ms after the second flip lands (gentle teach), then both flip back down together; the sibling's anchor-stays-selected convention is deliberately not used | designed | A face-up board can leave the first card selected; a face-down board must return to a clean state, and a fixed hold keeps the comparison visible |
| D8 | Matched pairs stay face-up, locked, dimmed to 0.70 with check badges; match feedback reuses the sibling's white flash, check stamp, match settle, and pip fill | designed | Matched pairs must read as done; the sibling's numbers keep the family consistent |
| D9 | No timer, no score, no fail state; completion-gated progression; deterministic idle peek | designed | Template v1 fidelity rules; ages 2–8 |
| D10 | Local save `spec.memoryGames.v1`, resume at highest unlocked level, 3 s logo-hold reset | designed | Session continuity without accounts; template v1 |
| D11 | Audio rules, degradation, tab order, invisible accessible names, multi-touch, throttles, viewport rules, layout numbers | designed | Template v1 buildability rules |
| D12 | Accessible names always expose a card's token and variant, even face down | designed | Accessibility accommodation: AT users cannot scan the study phase, so the name carries the card's identity at all times; the game stays fully playable for AT users, with the memory demand removed by design |

## 4. Player experience / core loop

A child presses Play. Six cards pop face-up in a 3×2 grid: fox, frog, leaf, fox, frog, leaf. A card
at the top shows a face-down-card pictogram and three empty pips, and a voice says "Look carefully!
Then find the pairs." After 3 s the cards flip face-down in a wave, and the voice says "Now find the
pairs from memory!" The child taps slot 2: it flips face-up to a frog. They tap slot 5: it flips up
to a frog — both flash white, a green check stamps onto each, the cards dim to 0.70, a pip fills,
and the voice says "A pair!" Later they tap the fox and then the leaf: both cards wiggle and flash
coral, the voice says "They don't match. Keep looking!", the two cards hold face-up for 1.2 s, then
flip back down — nothing lost. Eight levels later, sixteen cards fill a 4×4 board with shadows and
mirrored poses; on the last pair, confetti falls, a trophy appears, and the voice says "You found
every single pair from memory!"

**Core loop:** study the face-up board → cards flip down → flip two cards → match (both lock, pip
fills) or mismatch (gentle teach, both flip back) → repeat until every pair is matched →
celebration → next, larger board.

## 5. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with a card-board logo (≥96×96 CSS px) and one Play target (≥96×96 CSS px). No audio shall play before the first user gesture; the first pointer or key input unlocks audio.
- **FR-002** When Play is pressed, the game shall start `studying(level = highestUnlocked, matched = 0)`: the prompt card pops in (150 ms) showing a face-down-card pictogram and `P` empty pips, and the level's `N` cards pop in face-up (150 ms each, staggered 50 ms in slot order) with the deck and slot order fixed by section 8; `vo_target` plays ("Look carefully! Then find the pairs.").
- **FR-003** While `studying`, the game shall hold the face-up board for `studyMs` measured from level start (Table C; the 50 ms pop-in stagger runs inside it). A card tap shall pulse that card (300 ms) and play `sfx_soft_tap` (0.4) without flipping it and without changing the study timer; taps on mid-flip cards are ignored; an empty tap shall only reset the idle timer. When `studyMs` elapses, the game shall flip every card face-down, staggered 40 ms in slot order (300 ms per flip, FR-010), play `vo_begin` ("Now find the pairs from memory!"), and enter `playing` with no card up when the last flip lands.
- **FR-004** When a **face-down unmatched** card is tapped, no unmatched card is up, and the flip throttle is free (FR-010), the game shall flip it face-up (300 ms, section 9), fade in a 6 px gold ring (150 ms), and play `sfx_flip`. Only one unmatched card may be up at a time; the next card tap is resolved as that pair's second pick (FR-006/FR-007).
- **FR-005** When the **up** card is tapped ≥250 ms after its flip-up landed (i.e. ≥550 ms after the flip-up tap), the game shall flip it face-down (300 ms), fade out the ring, and play `sfx_soft_tap` (0.5). Earlier re-taps are ignored (FR-010).
- **FR-006** When a second **face-down unmatched** card is tapped whose pair partner is the up card (same `pairId`), the game shall: cancel the idle timer, flip the second card up (300 ms), and when that flip lands white-flash both cards (150 ms in / 300 ms out), stamp a green check badge on each (200 ms), settle both to 0.70 opacity, keep both face-up and lock them as `matched`, fill one pip on the prompt card (150 ms), play `sfx_pop` + `sfx_chime` + `vo_match` ("A pair!"), ignore card and empty taps for 800 ms from the second tap (the match flourish), and then enter `playing` with no unmatched card up. When that pair is the level's last unmatched pair, the game shall enter `celebrating` and save instead of returning to `playing`.
- **FR-007** When a second **face-down unmatched** card is tapped that is not the up card's partner, the game shall: cancel the idle timer, flip the second card up (300 ms), and when that flip lands wiggle both cards (300 ms), coral-flash both (150 ms in / 300 ms out), play `sfx_soft_buzz` + `vo_mismatch` ("They don't match. Keep looking!"), hold both cards face-up for 1200 ms after the second flip landed, then flip both face-down together (300 ms) and enter `playing` with no card up 1800 ms after the second tap. No progress is lost, no score changes, and no card is ever locked out.
- **FR-008** When a **matched** card is tapped, the game shall pulse that card's check badge (300 ms) and play `sfx_soft_tap` (0.4); nothing else changes, and matched cards can never be flipped or selected.
- **FR-009** When empty space is tapped — the board background, the top bar, or the prompt card — no visual or audio state shall change; the tap only resets the idle timer. The prompt card is not interactive.
- **FR-010** Throttles and edge cases:
  - **Flip throttle:** after any card flip starts, card taps are ignored for 350 ms (flip 300 ms + 50 ms). A rapid double-tap on a face-down card therefore flips it once; the deliberate re-tap to flip down is processed only per FR-005.
  - **Match lockout:** card and empty taps are ignored for 800 ms after the matching second tap (FR-006); empty taps still reset the idle timer.
  - **Mismatch lockout:** card and empty taps are ignored for 1800 ms after the mismatching second tap (FR-007); empty taps still reset the idle timer.
  - **Study and peek taps:** a card tap during `studying` or `peeking` only pulses the card (FR-003, FR-011); a mid-flip card ignores the tap.
  - Rapid double-tap on the last pair's second card → the first tap enters `matching`; the second is ignored.
  - Two simultaneous touches → first-pointer-wins: only the first pointer-down after all pointers are released is processed; other pointers are ignored until release, so simultaneous ties cannot occur. If the platform reports two pointer-down events with identical timestamps, the first delivered in DOM order wins.
  - Repeated empty-space taps → FR-009 each time; the idle timer resets each time.
  - Viewport resize/rotation mid-level → reflow per section 8; level, matched pairs, and any up card are preserved; a resize does not cancel a running flip.
  - Rapid Play double-tap on `title` → only the first press starts a level; the second is a no-op in `studying`.
  - A resting palm that lands first does not block play: picks resume as soon as all pointers are released.
- **FR-011** When no input (pointer down, click, or key down anywhere) has occurred for 12 s while `playing`, the game shall run a `peek` hint: every face-down unmatched card flips face-up (300 ms each, staggered 40 ms in slot order; a card already up stays up and takes no flip), holds face-up for 2000 ms after the last flip lands, then every unmatched card — including one already up — flips face-down (300 ms each, staggered 40 ms in slot order); one peek lasts `2600 + 80 × (m − 1)` ms, 40 ms less when a pick was already up (`m` = unmatched cards at peek start; `peekMs` in Table C is the full-board value, `m = N`), and `vo_hint` plays ("Look again!"). The peek is deterministic (every unmatched card, slot order) and repeats every 12 s of continued idleness; any input, including an empty tap, resets the timer and loses no progress. At `PEEK_DONE`, every unmatched card is face-down and no card is up. On `title`, the hint pulses Play three times at 1 Hz over 3 s with no audio (no audio before the first gesture); on `complete`, it pulses Replay three times at 1 Hz over 3 s and replays `vo_complete` (0.9).
- **FR-012** The game shall have no fail state, no score, and no countdown: mismatches, hiding an up card, matched-card taps, peeks, random taps, and idle time never remove progress, never end a level, never lock out a card, and never limit the number of attempts.
- **FR-013** When HOME is pressed in any state except `loading`, the game shall cancel any running timer (study, study flip-down, match flourish 800 ms, mismatch 1800 ms, peek, celebration 2.5 s, idle 12 s), save, and show `title`. On `title` no HOME control is rendered and a HOME input is a no-op (title is home). In `loading` nothing is interactive.
- **FR-014** All instructions and feedback shall be understandable without reading: voice plus pictograms (face-down-card pictogram, pips, the flip motion, gold ring, white flash, coral flash, check badges, confetti, trophy). Visible text is limited to the optional words "Play" and "Replay"; FR-015's invisible accessible names govern assistive technology only.
- **FR-015** Every interactive element (logo/reset, Play, HOME, each card, Replay) shall carry an invisible accessible name (section 7).
- **FR-016** When the title logo is held for 3 s, the game shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and shows a checkmark pictogram (200 ms in, 800 ms hold, 200 ms out) with `sfx_soft_tap` (0.7). Releasing early cancels the ring. Holding Enter/Space for 3 s on the focused logo behaves identically.
- **FR-017** Audio: only one voice clip shall play at a time — any new voice clip (`vo_target`, `vo_begin`, `vo_match`, `vo_mismatch`, `vo_hint`, `vo_praise`, `vo_complete`, hint replays) cancels the previous immediately; sound effects may overlap each other and the voice. No audio plays before the first user gesture. Degradation: no speech synthesis → visual-only feedback (flips, ring, flashes, check badges, pips, peek, confetti carry play); no AudioContext → silent; storage blocked → run unsaved.
- **FR-018** When the viewport resizes or rotates mid-level, the game shall reflow per section 8 and preserve the level, the matched pairs, and any up card; cards stay ≥64 px down to 320×480 with no scrolling.
- **FR-019** The game shall save `{ highestUnlocked, levelsCompleted, updatedAt }` under `spec.memoryGames.v1` on entering `celebrating`, entering `complete`, and any HOME press; `updatedAt` refreshes on every save; Play resumes at the highest unlocked level with a fresh study phase and nothing revealed (section 10).

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with soft background | initial state; preload assets; audio locked |
| SC-02 | `title` | board logo + Play target | audio unlocks on the first gesture |
| SC-03 | `studying(level, matched)` | prompt card + all cards face-up + HOME | `studyMs` then the flip-down wave; cards pulse on tap |
| SC-04 | `playing(level, up, matched)` | prompt card + face-down board + HOME | main state; `up` = 0 or 1 unmatched face-up card |
| SC-05 | `matching(level, up, matched)` | SC-04 + white flash / check stamps on the pair | 800 ms; taps ignored |
| SC-06 | `mismatch(level, up, matched)` | SC-04 + wiggle/coral flash on the two cards | 1800 ms; taps ignored |
| SC-07 | `peeking(level, up, matched)` | SC-04 + every unmatched card face-up | idle hint; full-board `peekMs` (Table C), shorter mid-level (FR-011); cards pulse on tap |
| SC-08 | `celebrating(level)` | frozen board + confetti + praise | auto-exits after 2.5 s |
| SC-09 | `complete` | trophy + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: show logo + Play |
| `title` | `PLAY_PRESSED` | not transitioning | `studying(highestUnlocked, 0)` | action: unlock audio; FR-002 |
| `title` | `RESET_HOLD` | hold ≥3 s on logo | `title` | action: ring fills during hold; clear save + memory; checkmark + `sfx_soft_tap` |
| `title` | `IDLE_12S` | — | `title` | action: Play pulses 3 s; silent |
| `title` | `HOME_PRESSED` | — | `title` | no-op (title is home; no HOME control rendered) |
| `studying` | `STUDY_DONE` | study total elapsed (Table C) | `playing(level, 0, matched)` | exit: all cards face-down; flip wave started at `studyMs`, staggered 40 ms; `vo_begin` at `studyMs` |
| `studying` | `CARD_TAP(s)` | `s` not mid-flip | `studying` | action: pulse `s` 300 ms + `sfx_soft_tap` 0.4; idle reset |
| `studying` | `CARD_TAP(s)` | `s` mid-flip | `studying` | ignored |
| `studying` | `EMPTY_TAP` | — | `studying` | action: reset idle timer only |
| `studying` | `HOME_PRESSED` | — | `title` | action: cancel study timers; save |
| `playing` | `CARD_TAP(s)` | `s` down, unmatched, up = 0, throttle free | `playing(level, s, matched)` | action: FR-004 |
| `playing` | `CARD_TAP(s)` | `s` = up, ≥550 ms after its flip-up tap | `playing(level, 0, matched)` | action: FR-005 |
| `playing` | `CARD_TAP(s)` | `s` down, unmatched, up = 1, partner = up | `matching(level, up, matched+1)` | actions: FR-006; second flip 300 ms then match feedback |
| `playing` | `CARD_TAP(s)` | `s` down, unmatched, up = 1, partner ≠ up | `mismatch(level, up, matched)` | actions: FR-007 |
| `playing` | `CARD_TAP(s)` | `s` matched | `playing` | action: FR-008 |
| `playing` | `EMPTY_TAP` | — | `playing` | action: reset idle timer only |
| `playing` | `IDLE_12S` | no input 12 s | `peeking(level, up, matched)` | actions: FR-011 peek + `vo_hint` |
| `playing` | `HOME_PRESSED` | — | `title` | action: cancel timers; save |
| `matching` | `MATCH_DONE` | 800 ms elapsed, not last pair | `playing(level, 0, matched)` | action: release lockout |
| `matching` | `MATCH_DONE` | 800 ms elapsed, last pair | `celebrating(level)` | action: save |
| `matching` | `CARD_TAP` / `EMPTY_TAP` | — | `matching` | ignored; empty tap resets idle timer |
| `matching` | `HOME_PRESSED` | — | `title` | action: cancel 800 ms; save |
| `mismatch` | `MISMATCH_DONE` | 1800 ms elapsed | `playing(level, 0, matched)` | action: both cards face-down (started at 1500 ms) |
| `mismatch` | `CARD_TAP` / `EMPTY_TAP` | — | `mismatch` | ignored; empty tap resets idle timer |
| `mismatch` | `HOME_PRESSED` | — | `title` | action: cancel 1800 ms; save |
| `peeking` | `PEEK_DONE` | peek total elapsed (FR-011; full-board `peekMs`, Table C) | `playing(level, 0, matched)` | action: all cards face-down |
| `peeking` | `CARD_TAP(s)` | `s` not mid-flip | `peeking` | action: pulse `s` 300 ms + `sfx_soft_tap` 0.4; idle reset |
| `peeking` | `CARD_TAP(s)` | `s` mid-flip | `peeking` | ignored |
| `peeking` | `EMPTY_TAP` | — | `peeking` | action: reset idle timer only |
| `peeking` | `HOME_PRESSED` | — | `title` | action: cancel peek + flip timers; save |
| `celebrating` | `CELEBRATION_DONE` | level < 8 | `studying(level+1, 0)` | action: layout next level; FR-002 |
| `celebrating` | `CELEBRATION_DONE` | level = 8 | `complete` | actions: `vo_complete`; save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel 2.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | ≥500 ms since entering `complete` | `studying(1, 0)` | action: fresh run; progress kept; FR-002 |
| `complete` | `IDLE_12S` | no input 12 s | `complete` | actions: Replay pulses 3 s; `vo_complete` 0.9 |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

All `CARD_TAP` transitions in `playing` are gated by the 350 ms flip throttle and FR-005's 550 ms re-tap guard; the guards column states only the state-specific conditions.

**Tab order (v1):** `title` — logo → Play; `studying` / `playing` / `matching` / `mismatch` / `peeking` — HOME → cards in slot order 1→N (left→right, top→bottom); `celebrating` — HOME; `complete` — HOME → Replay; `loading` — none.

**HOME everywhere (v1):** HOME returns to `title` in every state except `loading`, cancelling the study, flip, match, mismatch, peek, celebration, and idle timers and saving first; it is inert in `loading` and on `title` (no control rendered).

## 7. Input and interaction

- **Primary input:** single pointer tap/click on a card, HOME, Play, Replay, or the logo.
- **Hit areas:** each card is a square of `card` px per section 8, never below **64×64 CSS px** (above the 44 px platform baseline because children are less accurate); Play/logo ≥96×96; HOME/Replay ≥64×64, HOME top-left with a 24 px margin. The prompt card is not interactive. The hit rectangle is the grid cell inflated by 12 px in every state — face-up, face-down, and mid-flip; the flip's scaleX never changes it.
- **Mis-tap tolerance:** a tap inside a card's rectangle inflated by **12 px** on every side counts as that card. Where inflated hit areas overlap (grid gaps are 8–16 px), the card whose center is nearest to the tap wins; an exact tie goes to the card with the lower slot number. A tap more than 12 px from every card and control is an empty tap (FR-009). A tap inside a control rectangle never falls through to the board.
- **First-pointer-wins:** only the first pointer-down after all pointers are released is processed; additional simultaneous pointers are ignored until release.
- **Throttles:** flip 350 ms from any flip start; re-tap-down 250 ms after a flip-up lands; match lockout 800 ms; mismatch lockout 1800 ms; Replay 500 ms; reset hold 3 s continuous (release cancels and restarts from zero).
- **Drag:** none used; no drag alternative needed.
- **Keyboard equivalent for every action:** Tab moves focus in the order above; Enter/Space activates the focused element (card = tap/flip, Play/Replay/HOME = press). Hold Enter/Space 3 s on the focused logo = reset hold (FR-016). Focus indicator: 4 px outline, ≥3:1 contrast against the board.
- **Instructions without reading:** spoken `vo_target` / `vo_begin` / `vo_hint` + face-down-card pictogram + pips + gold ring + white/coral flashes + check badges + peek; no text-only path.
- **Accessible names (invisible):** logo = "Memory pairs board, hold three seconds to reset progress"; Play = "Play"; HOME = "Home"; Replay = "Play again"; card = slot, token, variant, and face state, e.g. "Card 1 of 6, fox, face down", "Card 5 of 12, shadow of a frog, face up", "Card 11 of 16, mirrored bee, matched" (the token is exposed even face down — D12); the board carries one group label, e.g. "Memory board, 12 cards, 6 pairs, 2 of 6 pairs matched", and during `studying` "Study time: 12 cards, 6 pairs".
- **Multi-touch:** per FR-010 (first-pointer-wins).

## 8. Levels and content data

Token vocabulary (shared with `matching-games.md`; 10 original icons, each drawing 3–6 primitives; the glyph is the shape that identifies a token, and colors may repeat across tokens). Lexicon: `fx` fox · `fg` frog · `lf` leaf · `bz` bee · `sh` snail · `mn` moon · `wl` owl · `ms` mushroom · `sf` starfish · `cl` cloud.
Variants: `icon` = the drawing as-is; `shadow` = the same drawing as a single flat `#3E2C1E` silhouette at 0.85 opacity with no interior detail; `pose` = the drawing mirrored horizontally about the card center (allowed only for the asymmetric tokens `fx`, `bz`, `wl`, `sh`). Both cards of a pair share the same token and variant.

**Table A — levels, bands, and pair sets**

| Level | Band (filter) | Pairs P | Cards N | Pair set (A, B, … in pair-letter order: token + variant) |
|---|---|---|---|---|
| 1 | Preschool | 3 | 6 | A fox `icon` · B frog `icon` · C leaf `icon` |
| 2 | Preschool | 3 | 6 | A bee `icon` · B snail `icon` · C moon `icon` |
| 3 | Kindergarten | 4 | 8 | A owl `icon` · B mushroom `icon` · C frog `shadow` · D leaf `shadow` |
| 4 | Kindergarten | 4 | 8 | A starfish `icon` · B cloud `icon` · C moon `shadow` · D snail `shadow` |
| 5 | Kindergarten | 5 | 10 | A fox `icon` · B bee `icon` · C owl `shadow` · D mushroom `shadow` · E cloud `shadow` |
| 6 | 1st Grade | 6 | 12 | A leaf `icon` · B moon `icon` · C starfish `shadow` · D frog `shadow` · E fox `pose` · F bee `pose` |
| 7 | 1st Grade | 6 | 12 | A mushroom `icon` · B cloud `icon` · C snail `shadow` · D starfish `shadow` · E owl `pose` · F bee `pose` |
| 8 | 2nd Grade | 8 | 16 | A frog `icon` · B leaf `icon` · C cloud `shadow` · D moon `shadow` · E mushroom `shadow` · F bee `shadow` · G owl `pose` · H snail `pose` |

Every level's tokens are distinct, so exactly one card matches each card; each token appears in exactly two slots.

**Table B — boards and slot orders** (same grids and order strings as `matching-games.md`; each pair letter appears exactly twice)

| Level | Cards N | Grid at viewport width ≥480 px | Grid at width <480 px | Slot order (slot 1 → N, filled row-major; pair letters from Table A) |
|---|---|---|---|---|
| 1 | 6 | 3×2 | 2×3 | `A B C A B C` |
| 2 | 6 | 3×2 | 2×3 | `A B C B C A` |
| 3 | 8 | 4×2 | 2×4 | `A B C D C D A B` |
| 4 | 8 | 4×2 | 2×4 | `A B C D B A D C` |
| 5 | 10 | 5×2 | 2×5 | `A B C D E C E A D B` |
| 6 | 12 | 4×3 | 3×4 | `A B C D E F C A F E D B` |
| 7 | 12 | 4×3 | 3×4 | `A B C D E F B D F A C E` |
| 8 | 16 | 4×4 | 4×4 | `A B C D E F G H C E G A H F D B` |

**Table C — study and peek timings** (`studyMs = 500 × N`; the studying total includes the staggered flip-down wave `40 × (N − 1) + 300`; `peekMs = 2600 + 80 × (N − 1)` is the full-board value `m = N` — a mid-level peek is shorter per FR-011)

| Level | N | `studyMs` | `studying` total (level start → `playing`) | `peekMs` (full board) |
|---|---|---|---|---|
| 1 | 6 | 3000 | 3500 | 3000 |
| 2 | 6 | 3000 | 3500 | 3000 |
| 3 | 8 | 4000 | 4580 | 3160 |
| 4 | 8 | 4000 | 4580 | 3160 |
| 5 | 10 | 5000 | 5660 | 3320 |
| 6 | 12 | 6000 | 6740 | 3480 |
| 7 | 12 | 6000 | 6740 | 3480 |
| 8 | 16 | 8000 | 8900 | 3800 |

- **Layout numbers** (`W` × `H` = viewport; `C` × `R` = the active grid): top bar 144 px at `W` ≥480, else 104 px; HOME 64×64 at a 24 px margin; at `W` ≥480 the prompt card is 140×140 centered with its pip row of ≤8 pips ⌀10 px at 5 px gaps, else it is 96×96 centered with ≤8 pips ⌀8 px at 4 px gaps so it fits the 104 px bar. `playW` = min(960, `W` − 48) at `W` ≥480, else `W` − 32; `playH` = `H` − topBar − 24. `gap` = 16 px at `W` ≥768, 12 px at 480–767, 8 px below 480. `card` = clamp(min((`playW` − (`C`−1)×`gap`)/`C`, (`playH` − (`R`−1)×`gap`)/`R`), 64, 140); the table's grids keep `card` ≥64 px down to 320×480 (level 8 = 66 px, level 5 = 64 px). Card corner radius = 0.12×`card`; glyph or card-back motif = 0.62×`card` centered (minimum 36 px); grids are centered in the play field. No scrolling is required at ≥320×480.
- **Randomization:** none. Decks, variants, grids, and slot orders are fixed by Tables A and B; every run of a level is identical. The only clocks are the study, peek, and idle timers.
- **Worked example (level 3):** board 4×2, 8 cards; slot order `A B C D C D A B` gives slots 1 owl, 2 mushroom, 3 frog-shadow, 4 leaf-shadow, 5 frog-shadow, 6 leaf-shadow, 7 owl, 8 mushroom. All eight cards pop in face-up (staggered 50 ms) and the voice says "Look carefully! Then find the pairs."; the prompt card shows 4 empty pips. After 4000 ms the cards flip face-down staggered 40 ms and `vo_begin` plays. The child taps slot 2 (mushroom): it flips face-up with a gold ring. They tap slot 8 (the other mushroom): it flips up, then both flash white, check badges stamp, both dim to 0.70 and stay face-up, pip 1 of 4 fills, "A pair!" plays. The child taps slot 1 (owl): up. They tap slot 4 (leaf shadow): up, then both wiggle and flash coral, "They don't match. Keep looking!" plays; both stay face-up for 1.2 s and flip back down; the board is playable again. After four pairs, confetti falls, "You remembered every pair!" plays, progress saves, and 2.5 s later level 4's study phase appears with 8 cards.
- **Progression rule:** fixed, completion-gated (match every pair in the level). The next level starts 2.5 s after the last pair's match; level 8 leads to `complete`. No timer, no score, no adaptive difficulty, no per-level repetition requirement.

## 9. Feedback, rewards, and audio cues

Effect definitions (reused by the FRs; no undefined effects): **pop** scale 0→1 over 150 ms;
**pulse** scale 1→1.08→1 over 300 ms (the study/peek acknowledge); **flip** scaleX 1→0 over 150 ms,
the face swaps at 0, scaleX 0→1 over 150 ms (300 ms total; used for every face change);
**wiggle** rotate 0→−6°→+6°→0 twice over 300 ms; **white flash** `#FFFFFF` overlay at 0.25 opacity,
in 150 ms / out 300 ms; **gold ring** 6 px `#F2B84B` stroke at 0.9 opacity around the up card, fading in and out over 150 ms;
**coral flash** 4 px `#E2735C` stroke at 0.7 opacity, in 150 ms / out 300 ms; **check stamp** scale
1.4→1 with rotate −10°→0° over 200 ms; **pip fill** circle (⌀10 px at `W` ≥480, else ⌀8 px per section 8) scale 0→1 over 150 ms; **card
pop-in** scale 0→1 over 150 ms, staggered 50 ms in slot order; **match settle** opacity 1→0.70 over
300 ms; **confetti** ≤40 particles over 600 ms (completion: ≤60 over 900 ms) in teal, gold, and
coral; **ring fill** SVG stroke-dashoffset 0→100% linear over 3 s; **depress** scale 0.95 over
80 ms. The sibling's select lift, deselect settle, and idle halo are deliberately unused: a face-down
card is identified by its flip, not a selection lift.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Level start (study) | prompt card pops in 150 ms; all cards pop in face-up, staggered 50 ms | `vo_target` — 1.0 — one-shot |
| Study end | all cards flip face-down, staggered 40 ms | `vo_begin` — 0.9 — one-shot |
| Card tapped in `studying` / `peeking` | acknowledge pulse 300 ms (mid-flip cards ignore) | `sfx_soft_tap` — 0.4 — one-shot |
| Card flipped up | flip 300 ms + gold ring 150 ms | `sfx_flip` — 0.6 — one-shot |
| Up card flipped down | flip 300 ms + ring fades | `sfx_soft_tap` — 0.5 — one-shot |
| Pair matched | white flash both, check stamps, match settle, pip fill; both stay face-up | `sfx_pop` — 0.7; `sfx_chime` — 0.8; `vo_match` — 1.0 — one-shots |
| Mismatch | wiggle both 300 ms + coral flash; both hold face-up 1200 ms, then flip down together | `sfx_soft_buzz` — 0.5; `vo_mismatch` — 0.9 — one-shots |
| Matched card tapped | check badge pulses 300 ms | `sfx_soft_tap` — 0.4 — one-shot |
| Empty tap | none | none |
| Idle 12 s (`playing`) | peek: unmatched cards flip up staggered 40 ms, hold 2000 ms, flip down staggered 40 ms | `vo_hint` — 0.9 — one-shot |
| Idle 12 s (`title`) | Play pulses 3 s | none (no audio before the first gesture) |
| Idle 12 s (`complete`) | Replay pulses 3 s | `vo_complete` — 0.9 — one-shot |
| Level complete | confetti ≤40/600 ms; matched check badges pulse | `sfx_chime` — 0.8; `vo_praise` — 1.0 — one-shots |
| Game complete (level 8) | trophy + confetti ≤60/900 ms | `sfx_chime` — 0.8; `vo_complete` — 1.0 — one-shots |
| HOME / Play / Replay pressed | depress 80 ms | `sfx_tap` — 0.6 — one-shot |
| Reset hold completed | ring fills during the hold; checkmark 200 ms in / 800 ms hold / 200 ms out | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background | — | `music_loop` — 0.15 — loop |

Voice copy: `vo_target`: "Look carefully! Then find the pairs." `vo_begin`: "Now find the pairs from
memory!" `vo_match`: "A pair!" `vo_mismatch`: "They don't match. Keep looking!" `vo_hint`: "Look
again!" `vo_praise`: "You remembered every pair!" `vo_complete`: "You found every single pair from
memory!" No negative wording and no token names (a remembered layout, not a named-object task).
Timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (unlocked on Play, R-006); each new
voice clip cancels the previous utterance (FR-017); degradation — no speech synthesis → the flips,
gold ring, coral flash, check badges, pips, peek, and confetti carry play (R-010); no audio context →
silent; storage blocked (throws/private mode) → run unsaved in memory. Background-tab timers may
fire late; on `visibilitychange` to visible the game runs any expired timer (R-013) and never loses
progress.

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.memoryGames.v1`
- **Shape:** `{ "highestUnlocked": 1-8, "levelsCompleted": 0-8, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `celebrating` (last pair matched), entering `complete`, and any HOME press. `updatedAt` refreshes on every save (v1).
- **Unlock rule:** finishing level *n* saves `highestUnlocked = min(8, n + 1)` and `levelsCompleted = max(levelsCompleted, n)`; saved values never decrease.
- **Restore:** on load, Play resumes at `highestUnlocked` (level 1 on first run) as a fresh level: no card revealed or matched, the level's fixed slot order re-laid out, and the study phase replayed. In-progress picks and matches are never restored.
- **Reset:** hold the title logo 3 s → clear the key and in-memory progress and show the checkmark (FR-016); keyboard equivalent on the focused logo (Enter/Space held 3 s). No confirmation prompt (non-readers).
- **Deliberately not stored:** mismatch counts, peek counts, which cards were ever revealed, per-level statistics, timings, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_room` | image | soft mint play backdrop, radial gradient, subtle dots | 1024×768 SVG | static | SVG gradient + circles |
| `card_slot` | image | cream rounded square, 3 px ink border at 0.18 opacity, soft shadow | 256×256 SVG, scales | static | SVG rounded rect |
| `card_back` | image | cream rounded square with a centered teal rounded diamond and three ⌀8 cream dots; identical on every card | 256×256 SVG, scales | static | SVG rect + path + circles |
| `prompt_card` | image | cream card with a face-down-card pictogram (rounded square + diamond + three dots) and a pip row | 140×140 SVG (96×96 below 480 px), scales | pop / pulse | SVG rect + pips |
| `check` | image | green rounded check | 40×40 SVG | check stamp | SVG path |
| `trophy` | image | gold trophy on a base | 200×200 SVG | static | SVG shapes |
| `tok_fx` | image | fox head: triangular head, two pointed ears, pale muzzle | 256×256 SVG | static | SVG polygon + circles |
| `tok_fg` | image | frog: round body, two eye bumps, wide smile | 256×256 SVG | static | SVG circles + arc |
| `tok_lf` | image | leaf: pointed oval with center vein | 256×256 SVG | static | SVG path |
| `tok_bz` | image | bee: oval body, two teardrop wings, two antennae | 256×256 SVG | static | SVG ellipses + lines |
| `tok_sh` | image | snail: spiral shell on a rounded foot | 256×256 SVG | static | SVG spiral + rounded rect |
| `tok_mn` | image | moon: crescent with two soft craters | 256×256 SVG | static | SVG path + circles |
| `tok_wl` | image | owl: round body, two ear tufts, two eye discs | 256×256 SVG | static | SVG circles + triangles |
| `tok_ms` | image | mushroom: dome cap with two dots on a short stem | 256×256 SVG | static | SVG path + rect |
| `tok_sf` | image | starfish: five rounded arms | 256×256 SVG | static | SVG path |
| `tok_cl` | image | cloud: three overlapping circles | 256×256 SVG | static | SVG circles |
| `tok_<code>_shadow` | rendered | silhouette variant of a token: single `#3E2C1E` fill at 0.85 opacity, interior detail removed | from token path | static | fill the SVG path |
| `tok_<code>_pose` | rendered | mirror variant: the token scaled −1 on x about the card center; only `fx`, `bz`, `wl`, `sh` | from token path | static | SVG transform |
| `sfx_flip` | audio | soft paper swish | 0.15 s, ogg/mp3 | one-shot | WebAudio noise blip |
| `sfx_pop` | audio | bubble pop | 0.15 s | one-shot | WebAudio blip |
| `sfx_soft_tap` | audio | muted tap | 0.10 s | one-shot | WebAudio blip |
| `sfx_soft_buzz` | audio | soft low boop (never a harsh buzzer) | 0.2 s | one-shot | WebAudio sine drop |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `vo_target` | audio | "Look carefully! Then find the pairs." | ≤3 s | one-shot | TTS allowed |
| `vo_begin` | audio | "Now find the pairs from memory!" | ≤2.5 s | one-shot | TTS allowed |
| `vo_match` | audio | "A pair!" | ≤1 s | one-shot | TTS allowed |
| `vo_mismatch` | audio | "They don't match. Keep looking!" | ≤2 s | one-shot | TTS allowed |
| `vo_hint` | audio | "Look again!" | ≤1.5 s | one-shot | TTS allowed |
| `vo_praise` | audio | "You remembered every pair!" | ≤2.5 s | one-shot | TTS allowed |
| `vo_complete` | audio | "You found every single pair from memory!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop, 0.15 | may be omitted |

- **Palette tokens:** background `#EAF6F1`, ink `#3E2C1E`, cream card `#FFF8EC`, teal `#6FA8A0`, gold `#F2B84B`, coral `#E8804C` / `#E2735C`, blue `#6C9BD2`, green `#7BC47F`, deep green `#5FA463`, violet `#8E7CC3`, brick `#C96B58`, sand `#E8B45C`, sky `#A9C9E8`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); visible text limited to the optional words "Play" and "Replay"; every meaning is carried by glyph, motion, and voice.
- **Load failure:** missing visual → draw a stub shape, log a warning, keep playing; missing audio → continue silently (R-010).

## 12. State and data shapes

| Name | Field | Type | Notes |
|---|---|---|---|
| `LevelConfig` | `level` | 1–8 | index into Tables A–C |
| | `pairs` | `{ pairId: 'A'–'H'; token: 'fx'\|'fg'\|'lf'\|'bz'\|'sh'\|'mn'\|'wl'\|'ms'\|'sf'\|'cl'; variant: 'icon'\|'shadow'\|'pose' }[]` | one entry per pair, Table A order |
| | `cards` | `{ slot: 1–16; pairId: 'A'–'H'; token: string; variant: string }[]` | fixed slot order, Table B |
| | `columns`, `rows` | number, number | active grid (viewport-dependent) |
| | `studyMs`, `peekMs` | number, number | Table C; `peekMs` is the full-board value, recomputed per peek from `m` (FR-011) |
| `SaveState` | `highestUnlocked` | 1–8 | resume point for Play |
| | `levelsCompleted` | 0–8 | max level completed |
| | `updatedAt` | string | ISO-8601, refreshed each save |
| `SessionState` (memory) | `state` | `loading \| title \| studying \| playing \| matching \| mismatch \| peeking \| celebrating \| complete` | section 6 |
| | `level`, `matchedCount`, `matchedSlots` | number, number, number[] | current level; pairs matched; locked slots |
| | `upSlot` | number? | the single up unmatched card; null when none |
| | `lastFlipAt`, `matchAt`, `mismatchAt` | number | timestamps for the 350 ms flip throttle, 800 ms match lockout, 1800 ms mismatch lockout |
| | `idleTimer`, `studyTimer`, `flipTimers`, `matchTimer`, `mismatchTimer`, `peekTimer`, `celebrationTimer`, `hintLoop` | timer ids | cleared on HOME and transitions |

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites, rounded cards, a horizontally mirrored variant of a glyph, a single-fill silhouette variant of a glyph, and a horizontal flip animation (scaleX) that swaps a card's face at the midpoint.
- **R-002** The game shall hit-test pointer input against card rectangles inflated by 12 px per side with the section 7 nearest-center tie rule, and shall implement first-pointer-wins (only the first pointer-down after all pointers are released is processed).
- **R-003** The game shall enforce the section 7 throttles: 350 ms flip, 250 ms re-tap guard after a flip-up lands, 800 ms match lockout, 1800 ms mismatch lockout, 500 ms Replay, and a 3 s continuous logo hold.
- **R-004** The game shall support keyboard focus and activation for every interactive target, including the 3 s hold reset.
- **R-005** The game shall play concurrent one-shot audio clips (sfx + voice, one voice at a time) and may loop one music track at volume 0.15.
- **R-006** When the browser blocks audio before a user gesture, the game shall defer audio until the first interaction (Play) and shall not require sound to proceed.
- **R-007** The game shall persist and restore one small JSON save object in browser local storage, and shall run unsaved in memory when storage is unavailable.
- **R-008** The game shall run offline with no network requests after initial load.
- **R-009** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet, including the study phase and the idle peek with up to 16 cards face-up.
- **R-010** When a voice clip or audio API fails, the game shall continue with visual feedback only.
- **R-011** The game shall scale from 768×1024 to 1366×768 viewports without losing state; no scrolling is required down to 320×480.
- **R-012** The game shall expose an invisible accessible name on every interactive element (section 7 names), including face-down cards.
- **R-013** When the tab is backgrounded and timers are throttled, the game shall run any expired timer once visibility is restored and shall not lose progress.
- **R-014** The game shall generate all level content deterministically from Tables A–C with no runtime randomness.
- **R-015** Only one voice clip shall play at a time; any new voice clip cancels the previous immediately.
- **R-016** The game shall treat all input events as either card taps, control presses, or empty taps per section 7; a tap inside a control rectangle never falls through to the board.

## 14. Acceptance criteria

| AC | Covers | Given | When | Then |
|---|---|---|---|---|
| AC-01 | FR-001 | a first load | assets finish | the title screen shows a card-board logo and a Play target |
| AC-02 | FR-002 | a first load | Play is pressed | the level 1 study phase shows 6 cards face-up in the Table B order fox, frog, leaf, fox, frog, leaf; a prompt card with 3 empty pips; and "Look carefully! Then find the pairs." (no audio may play before this gesture) |
| AC-03 | FR-002, FR-019 | saved progress at level 5 | Play is pressed | the level 5 study phase shows 10 face-up cards and 5 pairs (fox, bee, owl shadow, mushroom shadow, cloud shadow) in the Table B slot order; Play resumes at the highest unlocked level |
| AC-04 | FR-003 | any level in study | the study timer elapses | all cards flip face-down in a 40 ms-staggered wave and "Now find the pairs from memory!" plays, then the board accepts taps |
| AC-05 | FR-003 | a card in study | it is tapped | the card pulses for 300 ms with a soft tap sound, does not flip, and the flip-down wave still starts on schedule |
| AC-06 | FR-004 | the playing state, no card up | a face-down card is tapped | it flips face-up within 300 ms with a gold ring and `sfx_flip` plays |
| AC-07 | FR-005, FR-010 | a face-up pick | it is tapped ≥550 ms after its flip-up tap | it flips face-down with `sfx_soft_tap`; a re-tap inside 550 ms flips nothing |
| AC-08 | FR-006 | level 1 | card 1 (fox) is tapped, then card 4 (fox) | card 4 flips up, both cards flash white, check badges stamp, both dim to 0.70 and stay face-up, pip 1 of 3 fills, and "A pair!" plays |
| AC-09 | FR-007 | level 1 | card 1 (fox) is tapped, then card 2 (frog) | the frog flips up, both cards wiggle and flash coral, "They don't match. Keep looking!" plays, both are still face-up 1.4 s after the tap, both are face-down by 1.8 s, and the board is playable |
| AC-10 | FR-008 | a matched pair | one of its cards is tapped | the check badge pulses 300 ms with a soft tap sound, and the matched count, pips, and card faces do not change |
| AC-11 | FR-009 | any level | empty space (board background, top bar, or prompt card) is tapped | nothing on screen changes, no sound plays, and the idle timer resets |
| AC-12 | FR-010 | the playing state | a face-down card is double-tapped inside 350 ms | exactly one flip and one `sfx_flip` occur |
| AC-13 | FR-010 | two simultaneous touches on two cards | they land together | only the first pointer-down is processed (first-pointer-wins) and the second pointer is ignored until release |
| AC-14 | FR-010 | a match lockout (800 ms) or mismatch lockout (1800 ms) | a card is tapped | the tap is ignored: no flip, no sound, no pick |
| AC-15 | FR-011 | 12 s with no input while playing | idleness continues | every unmatched card flips face-up (40 ms stagger), holds 2000 ms, flips back down, and `vo_hint` plays; any input resets the timer and no progress is lost |
| AC-16 | FR-011 | the title screen | 12 s pass with no input | Play pulses for 3 s and no sound plays |
| AC-17 | FR-011 | the `complete` screen | 12 s pass with no input | Replay pulses for 3 s and `vo_complete` replays |
| AC-18 | FR-012 | level 1 | five mismatches land in a row | no score, loss, or level change occurs and every card, including every pair, remains tappable and solvable |
| AC-19 | FR-006 | any level below 8 | the last unmatched pair is matched | confetti falls, "You remembered every pair!" plays, progress saves, and 2.5 s later the next level's study phase appears |
| AC-20 | FR-006 | level 8 completion | the celebration ends | the trophy screen appears with confetti (≤60 particles), "You found every single pair from memory!" plays, and progress is saved |
| AC-21 | FR-013 | the celebration is playing | HOME is pressed | the 2.5 s timer is cancelled, the save is written, and the title screen appears |
| AC-22 | FR-019 | a saved game | the page reloads and Play is pressed | the study phase of the highest unlocked level plays with no card revealed or matched |
| AC-23 | FR-016 | the title screen | the logo is held 3 s | a progress ring is visible during the hold and the save is cleared on completion; the keyboard equivalent (Enter/Space held 3 s) behaves the same |
| AC-24 | FR-018 | a mid-level resize from 1024×768 to 768×1024 | the viewport changes | the grid reflows per section 8, cards stay ≥64 px, and the level, matched pairs, and up card are unchanged |
| AC-25 | FR-018 | a 320×480 viewport | level 8 plays | the 16 cards lay out 4×4 with cards ≥64 px, no scrolling is needed, and every card is tappable |
| AC-26 | FR-017 | speech synthesis is unavailable | any level plays | flips, the gold ring, flashes, check badges, pips, the peek, and confetti still communicate all feedback and the game remains completable; with no audio context the game is silent but fully playable |
| AC-27 | FR-017, FR-019 | storage is blocked (private mode) | a level is completed | the game continues to the next level without error and the save is kept in memory only |
| AC-28 | FR-014, FR-015 | a screen reader is active | the title, study, playing, and complete screens are navigated | every interactive element announces an invisible name (e.g., "Card 3 of 8, shadow of a frog, face down"), and visible text stays limited to "Play"/"Replay" |
| AC-29 | section 7 | keyboard focus | Tab reaches a card and Enter is pressed | the card flips exactly as a tap, the tab order is HOME → cards row-major, and Enter held 3 s on the focused logo resets |
| AC-30 | FR-010 | the last pair's second card | it is double-tapped rapidly | exactly one match and one celebration occur and the second tap changes nothing on screen or in audio |
| AC-31 | FR-010 | the title screen | Play is double-tapped rapidly | exactly one level starts and the second press changes nothing on screen or in audio |
| AC-32 | FR-011, FR-010 | a peek is playing | a card is tapped | the card only pulses for 300 ms with a soft tap sound (it does not flip in response) and the peek keeps its schedule |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked, and one full level completes end-to-end: study phase, flip-down wave, flip up, mismatch hold with flip-back, match, pip fill, celebration, auto-advance.
2. Levels 1–8 run with the exact Table A/B/C values (pairs, variants, grids, slot orders, timings); progress survives a reload and resets via the 3 s hold.
3. No fail state exists; every edge case in FR-010 behaves as specified, including first-pointer-wins and both lockouts.
4. Runs offline in a browser at 1024×768, 768×1024, and 320×480 with no scrolling and cards ≥64 px.
5. The face-down mechanic is implemented, not the sibling's face-up matching game: cards start face-up only for the study phase and the idle peek, and mismatched cards always flip back down.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 8 levels; 3–8 pairs; 6–16 cards; band mapping Preschool–2nd Grade | designed — official sources state no counts, titles, or levels |
| A2 | Token set, variant vocabulary, and pose restriction shared with `matching-games.md` | designed — one family of original assets; no Khan Academy content |
| A3 | Fixed decks, slot orders, and no runtime randomness | designed — repeat runs build mastery, and fixed values keep the build verifiable |
| A4 | Study length `studyMs = 500 × N` ms | designed — long enough to scan a 16-card board, short enough that a level does not stall |
| A5 | Mismatch hold: 1200 ms revealed after the second flip, then both flip back down | designed — long enough for a child to compare the two cards, short enough to retry quickly |
| A6 | Matched pairs stay face-up at 0.70 opacity with check badges | designed — a clear "done" state; reuses the sibling's match-settle number |
| A7 | Idle peek reveals every unmatched card, deterministically | designed — non-punishing and needs no reading; a board-wide reveal is the memory-specific hint |
| A8 | Accessible names expose the token and variant even face down | designed — AT users cannot see the study phase |
| A9 | Mismatch voice is generic ("They don't match") rather than naming tokens | designed — the task is remembering a layout, not naming objects |
| A10 | TTS-generated voice clips are acceptable for the build | designed |
| A11 | Browsers block autoplay until the first gesture | platform fact — handled by R-006 |
| A12 | Background-tab timers may be throttled; study end, peeks, and auto-advance fire late | known platform behavior — handled by R-013 |
| A13 | Storage may be unavailable (private mode); the game runs unsaved | platform fact — handled by R-007 |
| A14 | `speechSynthesis` voices may load asynchronously; the first clip may be delayed | platform fact — visual feedback is independent |

`[NEEDS CLARIFICATION]`: none — all unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** Table A/B/C content (pairs, variants, bands, cards, grids, slot orders, study and peek timings), token vocabulary and variant rules, the face-down mechanic and study phase, flip semantics and the 300 ms flip, select/match/mismatch semantics including the 1200 ms hold and flip-back, no fail state, throttles and first-pointer-wins, 12 px tolerance and tie rule, card minimums, save key and shape, original-asset rule, acceptance criteria.
- **Free:** exact composition within the layout numbers, card-back decoration within palette tokens (as long as it is identical on every card), easing curves, particle specifics, voice timbre/TTS engine, optional music, whether Play/Replay show words or glyphs.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, scoring or adaptive difficulty, teacher tooling, other memory variants, face-up matching play (sibling `matching-games.md`), app-level level filtering UI, any cross-game progression.
- **Conditional sections:** 6 (screens and states), 11 (assets), and 12 (state and data shapes) are included; none omitted.
