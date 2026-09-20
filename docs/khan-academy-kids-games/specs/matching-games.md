# Matching games (Logic+) — one representative designed game

## 1. Front matter

- **Entry type:** Activity type (game) — official sources name no individual matching game, so this
  spec designs one representative **face-up pair-matching game** (D1/D2)
- **Catalogued entry:** [`matching-games.md`](../matching-games.md)
- **Official sources:** [Help Center — Find books and lessons in the Khan Kids Library](https://khankids.zendesk.com/hc/en-us/articles/4403657703821-Find-books-and-lessons-in-the-Khan-Kids-Library),
  [Help Center — Parent guide](https://khankids.zendesk.com/hc/en-us/articles/360006764812-Parent-and-Home-Account-Users-Getting-Started-and-creating-an-account-with-Khan-Academy-Kids) (both via the catalogued entry)
- **Spec status:** v1 — follows template v1; the designed game has not been blind-built yet
- **Last updated / platform:** 2026-09-20. Browser; touch, mouse, and keyboard; sound on; no network
  after load
- **Provenance constraint:** the catalogued title is retained for traceability only and appears
  nowhere on screen or in audio. The designed game uses only original tokens, art, and audio; its
  spec-internal working name is "Pair up". Nothing from Khan Academy is reproduced (D1, D3).
- **Conditional sections:** 6, 11, and 12 are included; none omitted.

## 2. Overview and learning objective

A child opens a board of face-up cards and taps two cards that belong together. A matched pair locks
with a check badge and fills a pip on the prompt card; a mismatched pick wiggles, flashes coral, and
is spoken as "Those don't match. Try again!" while the first card stays selected, so the child can
simply try another partner. The skill practiced is **visual matching** — scanning a field, holding
a first choice in mind, and comparing it with each new card — the Logic+ tab's focus, memory, and
flexible thinking made concrete (O2). Pair content grows from 3 identical pairs (6 cards,
Preschool) to 8 mixed identical/shadow/mirrored pairs (16 cards, 2nd Grade).

Age band: **ages 2–8**; the level content spans the Logic+ tab's Preschool–2nd Grade learning-level
filter (O3, D4). Expected session: **2–5 minutes** (all eight levels) or one or two levels in a
short sitting.

## 3. Official vs designed

| # | Claim | Provenance | Source / rationale |
|---|---|---|---|
| O1 | "Matching games" is an activity type listed among the Logic+ tab's activities, alongside memory games and activities that help kids follow directions | official | Library article, via catalogued entry — Description |
| O2 | Logic+ focuses on focus, memory, and flexible thinking | official | Library article / Parent guide, via catalogued entry and `khan-academy-kids-games.md` line 90 |
| O3 | The Logic+ tab can be filtered by learning level, Preschool–2nd Grade | official | Catalogued entry — Levels; Help Center: Find books and lessons |
| O4 | Official sources name no individual matching game, and publish no matching-game mechanic, count, or level content | official | Catalogued entry — Notes ("no per-game file because no titles are published") |
| D1 | This spec designs one representative matching game, marked designed throughout; the catalogued entry name is traceability-only and appears nowhere on screen or in audio | designed | Official sources name no game; the entry cannot be built otherwise; no Khan Academy content may be reproduced |
| D2 | The representative game is **face-up** pair matching (tap two cards that match), deliberately not a face-down memory/concentration game | designed | Official text lists matching games separately from memory games; face-down play is the sibling entry's surface (`memory-games.md`) |
| D3 | Original token set: 10 primitive-drawable icons (fox, frog, leaf, bee, snail, moon, owl, mushroom, starfish, cloud); themes (meadow, garden, pond, forest) are spec-internal labels only | designed | Original assets only; shapes are the identity, colors may repeat across tokens |
| D4 | 8 fixed levels; 3–8 pairs; 6–16 cards; bands Preschool → 2nd Grade | designed | Progression across the official filter band; no official counts exist |
| D5 | Pair-variant progression: `icon` (identical) → `shadow` (silhouette of the same icon) → `pose` (the icon mirrored horizontally) | designed | Grows flexible thinking beyond identical matching; a shadow is still the same thing |
| D6 | Match feedback (white flash, check stamp, dim to 0.70, pip fill) and mismatch feedback (wiggle + coral flash + spoken gentle teach, anchor stays selected, no penalty) | designed | Never punishing; keeps the first choice so re-trying is one tap |
| D7 | No timer, no score, no fail state; completion-gated progression; deterministic idle hints | designed | Template v1 fidelity rules; ages 2–8 |
| D8 | Local save `spec.matchingGames.v1`, resume at highest unlocked level, 3 s logo-hold reset | designed | Session continuity without accounts; template v1 |
| D9 | Audio rules, degradation, tab order, invisible accessible names, multi-touch, throttles, viewport rules, layout numbers | designed | Template v1 buildability rules |

## 4. Player experience / core loop

A child presses Play. Six cards pop onto the board in a 3×2 grid: fox, frog, leaf, fox, frog, leaf.
A card at the top shows a pair pictogram and three empty pips, and a voice says "Find the pairs!
Tap two cards that match." The child taps the first fox; it lifts with a gold ring. They tap the
frog: both cards wiggle and flash coral, the voice says "Those don't match. Try again!", the frog
settles back — the fox stays lifted. They tap the second fox: both flash white, a green check
stamps onto each, the cards settle to 0.70 opacity, a pip fills, and the voice says "A pair!"
Seven levels later, sixteen cards fill a 4×4 board with shadows and mirrored poses; on the last
pair, confetti falls, a trophy appears, and the voice says "You matched every single pair!"

**Core loop:** scan the face-up board → pick a card (gold ring) → pick a second → match (both
lock, pip fills) or mismatch (gentle teach, first card stays selected) → repeat until every pair is
matched → celebration → next, larger board.

## 5. Mechanics and rules

- **FR-001** When the game loads, it shall show a title screen with a card-board logo (≥96×96 CSS px) and one Play target (≥96×96 CSS px). No audio shall play before the first user gesture; the first pointer or key input unlocks audio.
- **FR-002** When Play is pressed, the game shall start `playing(level = highestUnlocked, selected = none, matched = 0)`: the prompt card pops in (150 ms) showing a pair pictogram and `P` empty pips, the level's cards pop in (150 ms each, staggered 50 ms in slot order) with the deck and slot order fixed by section 8, and `vo_target` plays ("Find the pairs! Tap two cards that match.").
- **FR-003** When an **unmatched** card is tapped, no other card is selected, and the pick throttle is free (FR-010), the game shall select it: lift the card 6 px over 150 ms, fade in a 6 px gold ring (150 ms), and play `sfx_pick`. Only one card is selected at a time.
- **FR-004** When the **selected** card is tapped again more than 250 ms after it was selected, the game shall deselect it: the ring fades out and the card settles over 150 ms, with `sfx_soft_tap`. The re-tap inside 250 ms is ignored (FR-010).
- **FR-005** When a second **unmatched** card is tapped whose pair partner is the selected card (same `pairId`), the game shall: cancel the idle timer, white-flash both cards (150 ms in / 300 ms out), stamp a green check badge on each (200 ms), settle both to 0.70 opacity and lock them as `matched`, fill one pip on the prompt card (150 ms), play `sfx_pop` + `sfx_chime` + `vo_match` ("A pair!"), clear the selection, and ignore card taps for 500 ms (the match flourish). When that pair is the level's last unmatched pair, the game shall additionally enter `celebrating` and save.
- **FR-006** When a second **unmatched** card is tapped that is not the selected card's partner, the game shall enter `teaching(anchor, card)`: wiggle both cards (300 ms), coral-flash both (150 ms in / 300 ms out), immediately return the second card to `unmatched`, keep the anchor selected with its ring, play `sfx_soft_buzz` + `vo_mismatch` ("Those don't match. Try again!"), pulse the anchor's gold ring once (300 ms) at 600 ms after the tap, and exit to `playing` 1.2 s after the tap with the anchor still selected. No progress is lost and no card is ever locked out.
- **FR-007** When a card is tapped while `teaching`, the tap shall be processed against the anchor: the anchor's partner → FR-005 immediately (cancelling the teaching timers); a different unmatched card → FR-006 again for the new pair (anchor unchanged, teaching restarts); the anchor itself → FR-004 (deselect, teaching cancelled).
- **FR-008** When a **matched** card is tapped, the game shall pulse that card's check badge (300 ms) and play `sfx_soft_tap` (0.4); nothing else changes, and matched cards can never be selected.
- **FR-009** When empty space is tapped — the board background, the top bar, or the prompt card — no visual or audio state shall change; the tap only resets the idle timer.
- **FR-010** Throttles and edge cases:
  - **Pick throttle:** after any processed card tap, further card taps are ignored for 250 ms. This makes a rapid double-tap on an unmatched card select it once (the second tap falls inside the throttle); a deliberate tap after 250 ms toggles the selection off (FR-004).
  - **Match flourish lockout:** card taps are ignored for 500 ms after a match (FR-005).
  - Rapid double-tap on the last pair's second card → the first tap enters `celebrating`; the second is ignored.
  - Two simultaneous touches → first-pointer-wins: only the first pointer-down after all pointers are released is processed; other pointers are ignored until release, so simultaneous ties cannot occur. If the platform reports two pointer-down events with identical timestamps, the first delivered in DOM order wins.
  - Repeated empty-space taps → FR-009 each time; the idle timer resets each time.
  - Viewport resize/rotation mid-level → reflow per section 8; level, matched pairs, and the selected card are preserved.
  - Rapid Play double-tap on `title` → only the first press starts a level; the second is a no-op in `playing`.
  - A resting palm that lands first does not block play: picks resume as soon as all pointers are released.
- **FR-011** When no input (pointer down, click, or key down anywhere) has occurred for 12 s, the game shall show an idle hint; any input, including an empty tap, resets the timer. In `playing` and `teaching` the hint replays `vo_target` (0.9) and its target is deterministic: with no card selected, halo the two cards of the first unmatched pair in slot order (the lowest-numbered unmatched slot and its partner); with a card selected, halo only its partner. Each halo is a 6 px gold ring pulsing 3 s at 1 Hz; the hint repeats every 12 s of continued idleness and never blocks input. On `title`, the hint pulses Play at 1 Hz for 3 s with no audio (no audio before the first gesture); on `complete`, it pulses Replay at 1 Hz for 3 s and replays `vo_complete` (0.9).
- **FR-012** The game shall have no fail state, no score, and no countdown: mismatches, random taps, matched-card taps, and idle time never remove progress, never end a level, and never lock out a card.
- **FR-013** When HOME is pressed in any state except `loading`, the game shall cancel any running timer (teaching 1.2 s, celebration 2.5 s, match flourish 0.5 s, idle 12 s), save, and show `title`. On `title` no HOME control is rendered and a HOME input is a no-op (title is home). In `loading` nothing is interactive.
- **FR-014** All instructions and feedback shall be understandable without reading: voice plus pictograms (pair pictogram, pips, gold ring, coral flash, check badges, halo, trophy). Visible text is limited to the optional words "Play" and "Replay"; FR-015's invisible accessible names govern assistive technology only.
- **FR-015** Every interactive element (logo/reset, Play, HOME, each card, Replay) shall carry an invisible accessible name (section 7).
- **FR-016** When the title logo is held for 3 s, the game shall fill a visible progress ring for the hold; on completion it clears the save and in-memory progress and shows a checkmark pictogram (200 ms in, 800 ms hold, 200 ms out) with `sfx_soft_tap`. Releasing early cancels the ring. Holding Enter/Space for 3 s on the focused logo behaves identically.
- **FR-017** Audio: only one voice clip shall play at a time — any new voice clip (`vo_target`, `vo_match`, `vo_mismatch`, `vo_praise`, `vo_complete`, hint replays) cancels the previous immediately; sound effects may overlap each other and the voice. No audio plays before the first user gesture. Degradation: no speech synthesis → visual-only feedback; no AudioContext → silent; storage blocked → run unsaved.

## 6. Screens and states

| ID | State | Screen | Notes |
|---|---|---|---|
| SC-01 | `loading` | blank with soft background | initial state; preload assets; audio locked |
| SC-02 | `title` | board logo + Play target | audio unlocks on the first gesture |
| SC-03 | `playing(level, selected?, matched)` | prompt card + card board + HOME | main state; cards interactive |
| SC-04 | `teaching(level, anchor, card, matched)` | SC-03 + wiggle/coral flash on both cards | ≤1.2 s; cards stay interactive |
| SC-05 | `celebrating(level)` | frozen board + confetti + praise | auto-exits after 2.5 s |
| SC-06 | `complete` | trophy + Replay + HOME | terminal until Replay |

| Current state | Event | Guard | Next state | Entry/exit actions |
|---|---|---|---|---|
| `loading` | `ASSETS_READY` | — | `title` | entry: show logo + Play |
| `title` | `PLAY_PRESSED` | not transitioning | `playing(highestUnlocked, none, 0)` | action: unlock audio; FR-002 |
| `title` | `RESET_HOLD` | hold ≥3 s on logo | `title` | action: ring fills during hold; clear save + memory; checkmark + `sfx_soft_tap` |
| `title` | `IDLE_12S` | no input 12 s | `title` | action: Play pulses 3 s at 1 Hz; silent |
| `title` | `HOME_PRESSED` | — | `title` | no-op (title is home; no HOME control rendered) |
| `playing` | `CARD_TAP(s)` | `s` unmatched, none selected, throttle free | `playing(level, s, matched)` | action: FR-003 |
| `playing` | `CARD_TAP(s)` | `s` = selected, ≥250 ms after selection | `playing(level, none, matched)` | action: FR-004 |
| `playing` | `CARD_TAP(s)` | `s` unmatched, partner = selected | `playing(level, none, matched+1)` | actions: FR-005; last pair → `celebrating` + save |
| `playing` | `CARD_TAP(s)` | `s` unmatched, partner ≠ selected | `teaching(level, anchor, s, matched)` | actions: FR-006 |
| `playing` | `CARD_TAP(s)` | `s` matched | `playing` | action: FR-008 |
| `playing` | `EMPTY_TAP` | — | `playing` | action: reset idle timer only |
| `playing` | `IDLE_12S` | no input 12 s | `playing` | actions: FR-011 hint |
| `playing` | `HOME_PRESSED` | — | `title` | action: save |
| `teaching` | `TEACHING_DONE` | 1.2 s elapsed | `playing(level, anchor, matched)` | action: fade coral flash; anchor still selected |
| `teaching` | `CARD_TAP(s)` | `s` = anchor's partner | `playing(level, none, matched+1)` | actions: cancel teaching timers; FR-005; last pair → `celebrating` + save |
| `teaching` | `CARD_TAP(s)` | `s` unmatched, ≠ partner | `teaching(level, anchor, s, matched)` | actions: FR-006; restart 1.2 s |
| `teaching` | `CARD_TAP(s)` | `s` = anchor | `playing(level, none, matched)` | action: FR-004; cancel teaching |
| `teaching` | `CARD_TAP(s)` | `s` matched | `teaching` | action: FR-008 |
| `teaching` | `EMPTY_TAP` | — | `teaching` | action: reset idle timer only |
| `teaching` | `IDLE_12S` | no input 12 s | `teaching` | actions: FR-011 hint |
| `teaching` | `HOME_PRESSED` | — | `title` | action: cancel 1.2 s timer; save |
| `celebrating` | `CELEBRATION_DONE` | level < 8 | `playing(level+1, none, 0)` | action: layout next level; FR-002 |
| `celebrating` | `CELEBRATION_DONE` | level = 8 | `complete` | actions: `vo_complete`; save |
| `celebrating` | `HOME_PRESSED` | — | `title` | action: cancel 2.5 s timer; save |
| `complete` | `REPLAY_PRESSED` | ≥500 ms since entering `complete` | `playing(1, none, 0)` | action: fresh run; progress kept; FR-002 |
| `complete` | `IDLE_12S` | no input 12 s | `complete` | actions: Replay pulses 3 s at 1 Hz; `vo_complete` (0.9) |
| `complete` | `HOME_PRESSED` | — | `title` | action: save |

All `CARD_TAP` transitions are gated by the 250 ms pick throttle and the 500 ms match flourish (FR-010); the guards column states only the state-specific conditions.

**Tab order (v1):** `title` — logo → Play; `playing` / `teaching` — HOME → cards in slot order 1→N (left→right, top→bottom); `celebrating` — HOME; `complete` — HOME → Replay; `loading` — none.

**HOME everywhere (v1):** HOME returns to `title` in every state except `loading`, cancelling the teaching, celebration, flourish, and idle timers and saving first; it is inert in `loading` and on `title` (no control rendered).

## 7. Input and interaction

- **Primary input:** single pointer tap/click on a card, HOME, Play, Replay, or the logo.
- **Hit areas:** each card is a square of `card` px per section 8, never below **64×64 CSS px** (above the 44 px platform baseline because children are less accurate); Play/logo ≥96×96; HOME/Replay ≥64×64, HOME top-left with a 24 px margin. The prompt card is not interactive.
- **Mis-tap tolerance:** a tap inside a card's rectangle inflated by **12 px** on every side counts as that card. Where inflated hit areas overlap (grid gaps are 8–16 px), the card whose center is nearest to the tap wins; an exact tie goes to the card with the lower slot number. A tap more than 12 px from every card and control is an empty tap (FR-009).
- **First-pointer-wins:** only the first pointer-down after all pointers are released is processed; additional simultaneous pointers are ignored until release.
- **Throttles:** pick 250 ms; match flourish 500 ms; Replay 500 ms; Play double-tap made a no-op by the state transition; reset hold 3 s continuous (release cancels and restarts from zero).
- **Drag:** none used; no drag alternative needed.
- **Keyboard equivalent for every action:** Tab moves focus in the order above; Enter/Space activates the focused element (card = tap, Play/Replay/HOME = press). Hold Enter/Space 3 s on the focused logo = reset hold (FR-016). Focus indicator: 4 px outline, ≥3:1 contrast against the board.
- **Instructions without reading:** spoken `vo_target` + pair pictogram + pips + gold ring + coral flash + check badges; no text-only path.
- **Accessible names (invisible):** logo = "Matching pairs board, hold three seconds to reset progress"; Play = "Play"; HOME = "Home"; Replay = "Play again"; card = slot, token, and state, e.g. "Card 1 of 6, fox, not matched", "Card 3 of 8, shadow of a frog, selected", "Card 5 of 12, mirrored fox, matched", "Card 11 of 16, mirrored bee, matched"; the board carries one group label, e.g. "Card board, 6 cards, 3 pairs". Variants are named (shadow, mirrored) so screen-reader users can play the matching game.

## 8. Levels and content data

Token vocabulary (10 original icons; each drawing is 3–6 primitives; the glyph is the shape that
identifies a token, and colors may repeat across tokens). Lexicon: `fx` fox · `fg` frog · `lf` leaf
· `bz` bee · `sh` snail · `mn` moon · `wl` owl · `ms` mushroom · `sf` starfish · `cl` cloud.
Variants: `icon` = the drawing as-is; `shadow` = the same drawing as a single flat `#3E2C1E`
silhouette at 0.85 opacity with no interior detail; `pose` = the drawing mirrored horizontally
about the card center (allowed only for the asymmetric tokens `fx`, `bz`, `wl`, `sh`).

**Table A — levels, bands, and pair sets**

| Level | Band (filter) | Pairs P | Cards N | Pair set (A, B, … in pair-letter order: token + variant) |
|---|---|---|---|---|
| 1 | Preschool | 3 | 6 | A fox `icon` · B frog `icon` · C leaf `icon` |
| 2 | Preschool | 3 | 6 | A bee `icon` · B snail `icon` · C moon `icon` |
| 3 | Kindergarten | 4 | 8 | A fox `icon` · B bee `icon` · C owl `icon` · D starfish `icon` |
| 4 | Kindergarten | 4 | 8 | A owl `icon` · B mushroom `icon` · C frog `shadow` · D cloud `shadow` |
| 5 | Kindergarten | 5 | 10 | A snail `icon` · B leaf `icon` · C moon `icon` · D fox `shadow` · E bee `shadow` |
| 6 | 1st Grade | 6 | 12 | A mushroom `icon` · B moon `icon` · C leaf `shadow` · D cloud `shadow` · E fox `pose` · F snail `pose` |
| 7 | 1st Grade | 6 | 12 | A frog `shadow` · B starfish `shadow` · C mushroom `shadow` · D bee `pose` · E owl `pose` · F snail `pose` |
| 8 | 2nd Grade | 8 | 16 | A cloud `icon` · B moon `icon` · C leaf `shadow` · D starfish `shadow` · E mushroom `shadow` · F fox `pose` · G bee `pose` · H owl `pose` |

Every level's tokens are distinct, so exactly one card matches each card. Both cards of a pair share
the same token and variant.

**Table B — boards and slot orders**

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

- **Layout numbers** (`W` × `H` = viewport; `C` × `R` = the active grid): top bar 144 px at `W` ≥480, else 104 px; HOME 64×64 at a 24 px margin; at `W` ≥480 the prompt card is 140×140 centered with its pip row of ≤8 pips ⌀10 px at 5 px gaps, else it is 96×96 centered with ≤8 pips ⌀8 px at 4 px gaps so it fits the 104 px bar. `playW` = min(960, `W` − 48) at `W` ≥480, else `W` − 32; `playH` = `H` − topBar − 24. `gap` = 16 px at `W` ≥768, 12 px at 480–767, 8 px below 480. `card` = clamp(min((`playW` − (`C`−1)×`gap`)/`C`, (`playH` − (`R`−1)×`gap`)/`R`), 64, 140); the table's grids keep `card` ≥64 px down to 320×480 (level 8 = 66 px, level 5 = 64 px). Card corner radius = 0.12×`card`; glyph = 0.62×`card` centered (minimum 36 px); grids are centered in the play field. No scrolling is required at ≥320×480.
- **Worked example (level 6):** board 4×3, 12 cards; slot order `A B C D E F C A F E D B` gives slots 1 mushroom, 2 moon, 3 leaf-shadow, 4 cloud-shadow, 5 mirrored fox, 6 mirrored snail, 7 leaf-shadow, 8 mushroom, 9 mirrored snail, 10 mirrored fox, 11 cloud-shadow, 12 moon. The child taps slot 3 (leaf shadow): it lifts with a gold ring. They tap slot 2 (moon): both wiggle and flash coral, "Those don't match. Try again!" plays, slot 2 settles back, slot 3 stays selected; 1.2 s later the board is ready with slot 3 still selected. They tap slot 7 (the other leaf shadow): both flash white, check badges stamp, cards dim to 0.70, pip 1 of 6 fills, "A pair!" plays. After five more pairs, confetti falls, "You found every pair!" plays, progress saves, and 2.5 s later level 7 appears with 12 cards including shadows and mirrored poses.
- **Randomization:** none. Decks, variants, grids, and slot orders are fixed by Tables A and B; every run of a level is identical. The only clock is the idle timer.
- **Progression rule:** fixed, completion-gated (match every pair in the level). The next level starts 2.5 s after the last pair's match; level 8 leads to `complete`. No timer, no score, no adaptive difficulty, no per-level repetition requirement.

## 9. Feedback, rewards, and audio cues

Effect definitions (reused by the FRs; no undefined effects): **pop** scale 0→1 over 150 ms;
**pulse** scale 1→1.08→1 over 300 ms; **lift** translateY 0→−6 px over 150 ms then hold;
**settle** translateY −6→0 over 150 ms; **wiggle** rotate 0→−6°→+6°→0 twice over 300 ms;
**white flash** `#FFFFFF` overlay at 0.25 opacity, in 150 ms / out 300 ms; **gold ring** 6 px
`#F2B84B` stroke at 0.9 opacity around a card; **coral flash** 4 px `#E2735C` stroke at 0.7
opacity, in 150 ms / out 300 ms; **halo** 6 px gold ring scaling 1→1.15 at 1 Hz for 3 pulses;
**check stamp** scale 1.4→1 with rotate −10°→0° over 200 ms; **pip fill** ⌀10 circle scale 0→1 over
150 ms; **card pop-in** scale 0→1 over 150 ms, staggered 50 ms in slot order; **match settle**
opacity 1→0.70 over 300 ms; **confetti** ≤40 particles over 600 ms (completion: ≤60 over 900 ms)
in teal, gold, and coral; **ring fill** SVG stroke-dashoffset 0→100% linear over 3 s; **depress**
scale 0.95 over 80 ms.

| Event | Visual | Audio (key — volume — behavior) |
|---|---|---|
| Level start | prompt card pops in; cards pop in staggered 50 ms | `vo_target` — 1.0 — one-shot |
| Card selected | lift 6 px + gold ring | `sfx_pick` — 0.6 — one-shot |
| Card deselected | settle + ring fades | `sfx_soft_tap` — 0.5 — one-shot |
| Pair matched | white flash both cards, check stamps, match settle, pip fill | `sfx_pop` — 0.7; `sfx_chime` — 0.8; `vo_match` — 1.0 — one-shots |
| Mismatch | wiggle both + coral flash both; anchor ring pulse at 600 ms | `sfx_soft_buzz` — 0.5; `vo_mismatch` — 0.9 — one-shots |
| Matched card tapped | check badge pulses 300 ms | `sfx_soft_tap` — 0.4 — one-shot |
| Empty tap | none | none |
| Idle 12 s | halo target(s) 3 s in `playing` / `teaching`; on `title` Play pulses 3 s; on `complete` Replay pulses 3 s | `vo_target` — 0.9 — one-shot (play states); `vo_complete` — 0.9 — one-shot on `complete`; `title` hint is silent (no audio before the first gesture) |
| Level complete | confetti ≤40/600 ms; all check badges pulse | `sfx_chime` — 0.8; `vo_praise` — 1.0 — one-shots |
| Game complete (level 8) | trophy + confetti ≤60/900 ms | `sfx_chime` — 0.8; `vo_complete` — 1.0 — one-shots |
| HOME / Play / Replay pressed | depress 80 ms | `sfx_tap` — 0.6 — one-shot |
| Reset hold completed | ring fills during the hold; checkmark 200 ms in / 800 ms hold / 200 ms out | `sfx_soft_tap` — 0.7 — one-shot |
| Optional background | — | `music_loop` — 0.15 — loop |

Voice copy: `vo_target`: "Find the pairs! Tap two cards that match." `vo_match`: "A pair!"
`vo_mismatch`: "Those don't match. Try again!" `vo_praise`: "You found every pair!" `vo_complete`:
"You matched every single pair!" No negative wording and no token names (shadow and mirrored cards
make spoken naming ambiguous). Timbre, language, and TTS engine are build freedom.

**Audio rules (v1):** no audio before the first user gesture (unlocked on Play, R-006); each new
voice clip cancels the previous utterance (FR-017); degradation — no speech synthesis → the gold
ring, coral flash, check badges, pips, halos, and confetti carry play (R-010); no audio context →
silent; storage blocked (throws/private mode) → run unsaved in memory. Background-tab timers may
fire late; on `visibilitychange` to visible the game runs any expired timer (R-013) and never loses
progress.

## 10. Progress and persistence

- **Storage class:** browser local storage. No network, no accounts.
- **Key:** `spec.matchingGames.v1`
- **Shape:** `{ "highestUnlocked": 1-8, "levelsCompleted": 0-8, "updatedAt": "<ISO-8601>" }`
- **Save points:** entering `celebrating` (last pair matched), entering `complete`, and any HOME press. `updatedAt` refreshes on every save (v1).
- **Unlock rule:** finishing level *n* saves `highestUnlocked = min(8, n + 1)` and `levelsCompleted = max(levelsCompleted, n)`; saved values never decrease.
- **Restore:** on load, Play resumes at `highestUnlocked` (level 1 on first run) as a fresh level: no card selected, no pair matched, the level's fixed slot order re-laid out. In-progress selections are never restored.
- **Reset:** hold the title logo 3 s → clear the key and in-memory progress and show the checkmark (FR-016); keyboard equivalent on the focused logo (Enter/Space held 3 s). No confirmation prompt (non-readers).
- **Deliberately not stored:** mismatch counts, per-level statistics, timings, audio settings, anything identifying.

## 11. Assets

All assets are **original**; nothing copied from Khan Academy. Programmatic stubs are acceptable when the row says so.

| Key | Type | Description / generation guidance | Size / format | Behavior | Stub policy |
|---|---|---|---|---|---|
| `bg_room` | image | soft mint play backdrop, radial gradient, subtle dots | 1024×768 SVG | static | SVG gradient + circles |
| `card_slot` | image | cream rounded square, 3 px ink border at 0.18 opacity, soft shadow | 256×256 SVG, scales | static | SVG rounded rect |
| `prompt_card` | image | cream card with pair pictogram (two overlapping card rects + check) and a pip row | 140×140 SVG (96×96 below 480 px), scales | pop / pulse | SVG rect + pips |
| `hint_halo` | image | gold rounded ring | 256×256 SVG, scales | halo pulse | SVG rounded rect stroke |
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
| `sfx_pick` | audio | soft wooden tick | 0.10 s, ogg/mp3 | one-shot | WebAudio blip |
| `sfx_pop` | audio | bubble pop | 0.15 s | one-shot | WebAudio blip |
| `sfx_soft_tap` | audio | muted tap | 0.10 s | one-shot | WebAudio blip |
| `sfx_soft_buzz` | audio | soft low boop (never a harsh buzzer) | 0.2 s | one-shot | WebAudio sine drop |
| `sfx_chime` | audio | bright 3-note chime | 0.8 s | one-shot | WebAudio arpeggio |
| `sfx_tap` | audio | UI click | 0.08 s | one-shot | WebAudio blip |
| `vo_target` | audio | "Find the pairs! Tap two cards that match." | ≤3 s | one-shot | TTS allowed |
| `vo_match` | audio | "A pair!" | ≤1 s | one-shot | TTS allowed |
| `vo_mismatch` | audio | "Those don't match. Try again!" | ≤2 s | one-shot | TTS allowed |
| `vo_praise` | audio | "You found every pair!" | ≤2.5 s | one-shot | TTS allowed |
| `vo_complete` | audio | "You matched every single pair!" | ≤3 s | one-shot | TTS allowed |
| `music_loop` | audio | gentle marimba loop (optional) | 30 s | loop, 0.15 | may be omitted |

- **Palette tokens:** background `#EAF6F1`, ink `#3E2C1E`, cream card `#FFF8EC`, teal `#6FA8A0`, gold `#F2B84B`, coral `#E8804C` / `#E2735C`, blue `#6C9BD2`, green `#7BC47F`, deep green `#5FA463`, violet `#8E7CC3`, brick `#C96B58`, sand `#E8B45C`, sky `#A9C9E8`, success `#7BC47F`.
- **Typography:** system rounded stack (`ui-rounded`, fallback `system-ui`); visible text limited to the optional words "Play" and "Replay"; every meaning is carried by glyph, motion, and voice.
- **Load failure:** missing visual → draw a stub shape, log a warning, keep playing; missing audio → continue silently (R-010).

## 12. State and data shapes

| Name | Field | Type | Notes |
|---|---|---|---|
| `LevelConfig` | `level` | 1–8 | index into Tables A/B |
| | `pairs` | `{ pairId: 'A'–'H'; token: 'fx'\|'fg'\|'lf'\|'bz'\|'sh'\|'mn'\|'wl'\|'ms'\|'sf'\|'cl'; variant: 'icon'\|'shadow'\|'pose' }[]` | one entry per pair, Table A order |
| | `cards` | `{ slot: 1–16; pairId: 'A'–'H'; token: string; variant: string }[]` | fixed slot order, Table B |
| | `columns`, `rows` | number, number | active grid (viewport-dependent) |
| `SaveState` | `highestUnlocked` | 1–8 | resume point for Play |
| | `levelsCompleted` | 0–8 | max level completed |
| | `updatedAt` | string | ISO-8601, refreshed each save |
| `SessionState` (memory) | `state` | `loading \| title \| playing \| teaching \| celebrating \| complete` | section 6 |
| | `level`, `matchedCount`, `matchedSlots` | number, number, number[] | current level; pairs matched; locked slots |
| | `selectedSlot`, `anchorSlot` | number?, number? | selected card; anchor during `teaching` |
| | `lastPickAt` | number | timestamp for the 250 ms pick throttle and 500 ms match flourish |
| | `idleTimer`, `teachingTimer`, `celebrationTimer`, `hintLoop` | timer ids | cleared on HOME and transitions |

## 13. Requirements (engine-agnostic)

- **R-001** The game shall render 2D vector or raster sprites, rounded square cards, a horizontally mirrored variant of a glyph, and a single-fill silhouette variant of a glyph.
- **R-002** The game shall hit-test pointer input against card rectangles inflated by 12 px per side with the section 7 nearest-center tie rule, and shall implement first-pointer-wins (only the first pointer-down after all pointers are released is processed).
- **R-003** The game shall enforce the section 7 throttles: 250 ms pick, 500 ms match flourish, 500 ms Replay, and a 3 s continuous logo hold.
- **R-004** The game shall support keyboard focus and activation for every interactive target, including the 3 s hold reset.
- **R-005** The game shall play concurrent one-shot audio clips (sfx + voice, one voice at a time) and may loop one music track at volume 0.15.
- **R-006** When the browser blocks audio before a user gesture, the game shall defer audio until the first interaction (Play) and shall not require sound to proceed.
- **R-007** The game shall persist and restore one small JSON save object in browser local storage, and shall run unsaved in memory when storage is unavailable.
- **R-008** The game shall run offline with no network requests after initial load.
- **R-009** The game shall sustain ≥30 fps (target 60) at 1024×768 on a mid-range 2020 tablet.
- **R-010** When a voice clip or audio API fails, the game shall continue with visual feedback only.
- **R-011** The game shall scale from 768×1024 to 1366×768 viewports without losing state; no scrolling is required down to 320×480.
- **R-012** The game shall expose an invisible accessible name on every interactive element (section 7 names).
- **R-013** When the tab is backgrounded and timers are throttled, the game shall run any expired timer once visibility is restored and shall not lose progress.
- **R-014** The game shall generate all level content deterministically from Tables A and B with no runtime randomness.
- **R-015** Only one voice clip shall play at a time; any new voice clip cancels the previous immediately.
- **R-016** The game shall treat all input events as either card taps, control presses, or empty taps per section 7; a tap inside a control rectangle never falls through to the board.

## 14. Acceptance criteria

| AC | Given | When | Then |
|---|---|---|---|
| AC-01 | a first load | assets finish | the title screen shows a card-board logo and a Play target |
| AC-02 | a first load | Play is pressed | level 1 starts with 6 cards in slot order fox, frog, leaf, fox, frog, leaf; a prompt card with 3 empty pips; and "Find the pairs! Tap two cards that match." (no audio may play before this gesture) |
| AC-03 | saved progress at level 5 | Play is pressed | level 5 starts with 10 cards and 5 pairs (snail, leaf, moon, fox shadow, bee shadow) in the Table B slot order; Play resumes at the highest unlocked level |
| AC-04 | level 1 | card 1 (fox) is tapped | it lifts with a gold ring and `sfx_pick` plays; when card 4 (fox) is tapped, both cards flash white, check badges stamp, they dim to 0.70 opacity, pip 1 of 3 fills, and "A pair!" plays |
| AC-05 | level 1 | card 1 (fox) is tapped, then card 2 (frog) | both cards wiggle and flash coral, "Those don't match. Try again!" plays, card 2 returns to unmatched, card 1 stays selected, and 1.2 s later the board is playable with card 1 still selected |
| AC-06 | level 1 in teaching | card 3 (leaf) is tapped 0.5 s after the mismatch | teaching restarts for pair (fox, leaf) and only one voice clip is audible at a time |
| AC-07 | level 1 in teaching | card 4 (fox, the anchor's partner) is tapped | the pair matches immediately and no further teaching feedback appears |
| AC-08 | level 1 | card 1 is tapped twice within 250 ms | it stays selected (the second tap is ignored); tapping it again after 250 ms deselects it |
| AC-09 | a matched pair | one of its cards is tapped | the check badge pulses 300 ms with a soft tap sound, and the matched count, pips, and card states do not change |
| AC-10 | any level | empty space (board background or top bar) is tapped | nothing on screen changes, no sound plays, and the idle timer resets |
| AC-11 | 12 s with no input and no card selected | idleness continues | the two cards of the first unmatched pair in slot order halo for 3 s and `vo_target` replays; with a card selected only its partner halos; any input resets the timer and no progress is lost |
| AC-12 | keyboard focus | Tab reaches a card and Enter is pressed | the card behaves exactly as a tap, and the tab order is HOME → cards row-major |
| AC-13 | two simultaneous touches on two cards | they land together | only the first pointer-down is processed (first-pointer-wins) and the second pointer is ignored until release |
| AC-14 | a match flourish is playing | a card is tapped within 500 ms of the match | the tap is ignored and no selection or mismatch occurs |
| AC-15 | the last unmatched pair of a level below 8 | it is matched | confetti falls, "You found every pair!" plays, progress saves, and 2.5 s later the next level appears |
| AC-16 | level 8 completion | celebration ends | the trophy screen appears and progress is saved |
| AC-17 | the celebration is playing | HOME is pressed | the 2.5 s timer is cancelled, the save is written, and the title screen appears |
| AC-18 | a saved game | the page reloads and Play is pressed | play resumes at the highest unlocked level with no card selected and no pair matched |
| AC-19 | the title screen | the logo is held 3 s | a progress ring is visible during the hold and the save is cleared on completion; the keyboard equivalent (Enter/Space held 3 s) behaves the same |
| AC-20 | a mid-level resize from 1024×768 to 768×1024 | the viewport changes | the grid reflows per section 8, cards stay ≥64 px, and matched pairs and the selected card are unchanged |
| AC-21 | a 320×480 viewport | level 8 plays | the 16 cards lay out 4×4 with cards ≥64 px, no scrolling is needed, and every card is tappable |
| AC-22 | speech synthesis is unavailable | any level plays | rings, flashes, check badges, pips, halos, and confetti still communicate all feedback and the game remains completable; with no audio context the game is silent but fully playable |
| AC-23 | storage is blocked (private mode) | a level is completed | the game continues to the next level without error and the save is kept in memory only |
| AC-24 | a screen reader is active | the title, playing, and complete screens are navigated | every interactive element announces an invisible name (e.g., "Card 3 of 8, shadow of a frog, selected"), and visible text stays limited to "Play"/"Replay" |
| AC-25 | level 1 | five mismatches land in a row | no score, loss, or level change occurs, and every card (including every pair) remains tappable |
| AC-26 | level 6 | card 5 (mirrored fox) is tapped, then card 8 (mushroom) | a mismatch teaches gently; when card 10 (the other mirrored fox) is tapped, the pair matches |
| AC-27 | the last pair's second card | it is double-tapped rapidly | exactly one match and one celebration occur, and the second tap changes nothing on screen or in audio |
| AC-28 | the title screen | 12 s pass with no input | Play pulses for 3 s and no sound plays |
| AC-29 | the `complete` screen | 12 s pass with no input | Replay pulses for 3 s and `vo_complete` replays |

**Blind-build checklist** (for the fresh-context build):

1. Built from this spec alone, with no questions asked, and one full level completes end-to-end: layout, select, mismatch teach, match, pip fill, celebration, auto-advance.
2. Levels 1–8 run with the exact Table A/B values (pairs, variants, grids, slot orders); progress survives a reload and resets via the 3 s hold.
3. No fail state exists; every edge case in FR-010 behaves as specified, including first-pointer-wins and both throttles.
4. Runs offline in a browser at 1024×768, 768×1024, and 320×480 with no scrolling and cards ≥64 px.
5. The face-up mechanic is implemented, not a face-down memory game.

## 15. Assumptions and open questions

| # | Item | Status |
|---|---|---|
| A1 | 8 levels; 3–8 pairs; 6–16 cards; band mapping Preschool–2nd Grade | designed — official sources state no counts, titles, or levels |
| A2 | Pair-variant vocabulary `icon` / `shadow` / `pose` (mirror); pose restricted to asymmetric tokens | designed |
| A3 | Fixed decks and slot orders with no runtime randomness | designed — face-up matching does not depend on memorizing positions, and determinism keeps the build verifiable |
| A4 | Token set of 10 original primitive-drawable icons; colors may repeat across tokens because shape carries identity | designed — original assets only |
| A5 | The representative game is face-up; face-down memory/concentration is the sibling entry's surface | designed — matches the official separation of matching games and memory games |
| A6 | Prompt-card pips are the only completion gauge; no visible numerals anywhere | designed — pre-reader rule |
| A7 | Mismatch voice is generic ("Those don't match") rather than naming tokens | designed — shadow and mirrored cards make naming ambiguous |
| A8 | Accessible names expose token and variant so screen-reader users can play | designed |
| A9 | TTS-generated voice clips are acceptable for the build | designed |
| A10 | Browsers block autoplay until the first gesture | platform fact — handled by R-006 |
| A11 | Background-tab timers may be throttled; hints and auto-advance fire late | known platform behavior — handled by R-013 |
| A12 | Storage may be unavailable (private mode); the game runs unsaved | platform fact — handled by R-007 |
| A13 | `speechSynthesis` voices may load asynchronously; the first clip may be delayed | platform fact — visual feedback is independent |

`[NEEDS CLARIFICATION]`: none — all unknowns are resolved above or left to build freedom.

## 16. Out of scope / build freedom

- **Fixed:** Table A/B content (pairs, variants, bands, cards, grids, slot orders), token vocabulary and variant rules, select/match/mismatch/teaching semantics, no fail state, throttles and first-pointer-wins, 12 px tolerance and tie rule, card minimums, save key and shape, original-asset rule, acceptance criteria.
- **Free:** exact composition within the layout numbers, card decoration within palette tokens, easing curves, particle specifics, voice timbre/TTS engine, optional music, whether Play/Replay show words or glyphs.
- **Not in this spec:** profiles, navigation shell, parental controls, localization, analytics, scoring or adaptive difficulty, teacher tooling, other matching variants, face-down memory play (sibling `memory-games.md`), app-level level filtering UI.
- **Conditional sections:** 6 (screens and states), 11 (assets), and 12 (state and data shapes) are included; none omitted.
