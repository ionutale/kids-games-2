# matching-games — blind build report

**Game:** `games/matching-games/` ("Pair up")
**Spec:** `docs/khan-academy-kids-games/specs/matching-games.md` (v1, 2026-09-20)
**Stack contract:** `docs/khan-academy-kids-games/stack-decision.md`
**Built:** 2026-09-21, blind from the two documents above (no other game or spec history was read).
**Status:** all 29 acceptance criteria pass. No blockers.

---

## 1. Files created

| File | Bytes | Contents |
|---|---|---|
| `games/matching-games/index.html` | 7,305 | Document shell, inline `bg_room` SVG, `<symbol>` defs for `home` / `play` / `replay` / `check` / `logo` / `prompt_card` / `trophy`, screens (title, play field, complete), inline data-URI favicon |
| `games/matching-games/styles.css` | 6,438 | Palette tokens, the section‑8 layout variables, card/ring/flash/halo/check/pip/confetti visuals, focus ring, safe-area-free fixed viewport |
| `games/matching-games/game.js` | 45,258 | All game logic: token art (10 tokens × icon/shadow/pose), Tables A/B data, wall-clock timer scheduler, Web Audio sfx, `speechSynthesis` voices, save/restore, state machine, pointer/keyboard input, effects, idle hints, confetti, debug hook |
| `games/matching-games/assets/` | — | **not created** — every asset key in section 11 is implemented inline (SVG in the document, or CSS for the card face); no external requests of any kind |

No build step, no dependencies, no network after load. Everything is original art generated from primitive shapes; the catalogued Khan Academy title appears nowhere on screen, in audio, or in the document title (`<title>Play</title>`).

Serve/test command used: `python3 -m http.server 8123` from the repo root, page `http://localhost:8123/games/matching-games/`.

---

## 2. How the acceptance criteria were exercised

* **Real browser:** Chrome 153.0.8010.52, `--headless=new`, isolated profile, `Emulation.setDeviceMetricsOverride` at the AC's viewport, driven over the DevTools Protocol. Input was dispatched as **real browser input** (`Input.dispatchMouseEvent`, `Input.dispatchKeyEvent`, `Input.dispatchTouchEvent`) — i.e. it goes through Chrome's own pointer/keyboard/touch pipeline, not synthetic DOM events. Assistive-technology activation was the one exception and is marked below.
* **Instrumentation:** the build exposes a read-only `window.__pairUp` hook (state, session, save, layout numbers, per-card computed styles/rects, pip transforms, audio/voice/state/hint/confetti event log, idle-timer deadlines, voice-API state). It records what the game *asks* the audio layer to do; it does not change behaviour.
* **Timing samples** were taken by evaluating computed styles 0–160 ms after a real tap, so the spec's effect numbers are checked mid-animation, not just at rest.

---

## 3. Per-AC results

| AC | Result | Evidence / note |
|---|---|---|
| AC-01 | **PASS** | First load reaches `title`; logo 128×128 and Play 96×96 (both ≥96); no console messages. |
| AC-02 | **PASS** | Play → level 1, 6 cards in slot order `fox, frog, leaf, fox, frog, leaf`; prompt card with 3 unfilled pips (fill `scale(0)`); `vo_target` @1.0 with the exact copy "Find the pairs! Tap two cards that match.". Before the gesture: `audio.unlocked=false`, `ctxState=null`, zero sfx/voice log entries (audio is only created inside the first pointer/key handler). |
| AC-03 | **PASS** | Save `{highestUnlocked:5}` → Play starts level 5: 10 cards, 5 pairs `snail, leaf, moon, fox-shadow, bee-shadow` in Table B order `A B C D E C E A D B`; 5 pips; board label "Card board, 10 cards, 5 pairs". |
| AC-04 | **PASS** | Tap card 1: lift sampled at −4.45 px mid-transition → −6 px, ring opacity 0.50 → 0.90, `sfx_pick`@0.6. Tap card 4: white flash on both cards (0.222 of the 0.25 peak at ~150 ms), check stamps (scale 1.379 @ −10° → 1 over 200 ms), both dim to 0.70, pip 1 fills (`scale(1)`), `vo_match` @1.0. |
| AC-05 | **PASS** | Tap 1 then 2: both cards wiggle (rotation sampled at 4.6°/−0.2° across two cycles), coral flash 0.70 on both, `vo_mismatch` @0.9, card 2 back to unmatched, card 1 still selected; 1.2 s later `playing` with card 1 still lifted at −6 px and ring 0.9. Anchor ring pulse sampled at 720 ms/810 ms (scale 1.026 → 1.065) — one 300 ms pulse starting ~600 ms after the tap. |
| AC-06 | **PASS** | Card 3 tapped 0.5 s into teaching: teaching restarts for (fox, leaf), anchor unchanged (1), second `vo_mismatch` @0.9, card 3 coral-flashing; exit to `playing` 1.2 s after the *restart*. Voice recorder shim shows `cancel → speak` for every utterance (one voice at a time), and a live `speechSynthesis.speaking === true` with no queueing. |
| AC-07 | **PASS** | Card 4 (anchor's partner) tapped during teaching: pair matches immediately, state returns to `playing`, `matchedCount` 1, coral flash 0 on the anchor (no further teaching feedback), `vo_match` only. |
| AC-08 | **PASS** | Two taps < 250 ms apart: stays selected, exactly one `sfx_pick`. A third tap after 250 ms deselects (lift → 0, ring → 0, `sfx_soft_tap`@0.5, name back to "not matched"). |
| AC-09 | **PASS** | Matched card tapped: check badge pulses to 1.08 for 300 ms, `sfx_soft_tap`@0.4, `matchedCount`/pips/card classes unchanged, state unchanged. |
| AC-10 | **PASS** | Taps on the board background, top bar and prompt card: no class/pip/selection changes, zero sfx/voice events, idle deadline moved back to ~12 s each time. |
| AC-11 | **PASS** | 12 s idle, nothing selected: halos exactly on slots `[1, 10]` (lowest unmatched slot + its partner) for 3 s, `vo_target` replayed @0.9; hint repeats every 12 s. With card 1 selected: halo on `[10]` only. Empty tap resets the timer; tapping the partner *during* the halo matched the pair (hint never blocks input). |
| AC-12 | **PASS** | Title: Tab → logo → Play. Playing: Tab → HOME → card 1 … card 6 in slot order, then Shift+Tab walks back. Enter on a focused card behaves exactly like a tap (select → `sfx_pick`, label "selected"). Focus outline computed to `4px rgb(62,44,30)` (ink on the mint board). Enter on Play moves focus to HOME, so the specced tab order is reachable. |
| AC-13 | **PASS** | One `touchStart` with two touch points on cards 1 and 2 → only card 1 processed (selected, one `sfx_pick`), card 2 untouched, no mismatch. Resting-palm variant: first contact on empty space, second touch on a card → ignored; after all pointers release, the same touch selects the card. |
| AC-14 | **PASS** | Card tapped 120 ms after a match: ignored (no selection, no mismatch, no new voice); a tap 600 ms later selects normally. |
| AC-15 | **PASS** | Level 1 last pair: confetti logged `40/600` (particles visible in the screenshot), `vo_praise` @1.0 + `sfx_chime` @0.8, save written `{highestUnlocked:2, levelsCompleted:1, updatedAt}`; 2.5 s later level 2 appears with its Table B order. |
| AC-16 | **PASS** | Level 8 solved: celebration (`40/600`, `vo_praise`), then `complete` with the 200×200 trophy, confetti `60/900`, `vo_complete` @1.0, save `{highestUnlocked:8, levelsCompleted:8}`; HOME and Replay are the only focusables. |
| AC-17 | **PASS** | HOME pressed during the celebration: title appears, save written, confetti cleared; still `title` 3 s later (the 2.5 s auto-advance was cancelled). |
| AC-18 | **PASS** | Reload + Play: resumes at the highest unlocked level (checked at 2, 5 and 8), no card selected, no pair matched, slot order re-laid out. |
| AC-19 | **PASS** | Hold 1.5 s → ring visible, `stroke-dashoffset` 171.55 px of 339.3 (linear 3 s fill); release → ring hidden, offset restored, save intact. Hold 3.05 s → save key deleted, in-memory progress cleared (Play then starts level 1), checkmark 200 ms in / 800 ms hold / 200 ms out, `sfx_soft_tap`@0.7. Keyboard: Tab to the logo, Enter held 3.1 s → identical (hold log `begin → complete`, save cleared). |
| AC-20 | **PASS** | Mid-level 1024×768 → 768×1024: layout reflowed per section 8 (`playW` 960→720, grid recomputed, cards stay ≥64), matched slots `[5,10]` and the selected card 3 preserved. Also checked 400×720 (below the 480 breakpoint): grid swaps to the narrow layout (3×4), selection and matched pairs preserved, no scrolling; returning to 1024×768 restores the wide layout with state intact. |
| AC-21 | **PASS** | At 320×480, level 8: 4×4 grid, `card = 66 px` (≥64), `scrollWidth/Height == viewport`, every card tappable (slot 1 selected/deselected by real taps). Level 1 at 320×480: 2×3, card 112 px, no scroll. |
| AC-22 | **PASS** | With `speechSynthesis`, `SpeechSynthesisUtterance` and `AudioContext` all deleted before load: level 6 played to completion and level 7 started with visual feedback only (`ctxState=null`, `supported=false`, zero audio output); confetti, pips, flashes, check badges all present. |
| AC-23 | **PASS** | With `window.localStorage` throwing a SecurityError: `storageOk=false`, level 1 completed, next level started, save kept in memory only (`{highestUnlocked:2, levelsCompleted:1}`), no console errors. |
| AC-24 | **PASS** | Chrome accessibility tree: `title` = button "Matching pairs board, hold three seconds to reset progress" + button "Play"; `playing` = group "Card board, 16 cards, 8 pairs" + card buttons "Card 1 of 16, cloud, not matched", "Card 3 of 16, shadow of a leaf, not matched", …; `complete` = button "Home" + button "Play again". Visible text is empty on every screen (no "Play"/"Replay" words are rendered — glyph-only buttons). AT-style activation (`click`, `detail===0`) selects and matches cards. |
| AC-25 | **PASS** | Five mismatches in a row: `vo_mismatch` ×5, no score text anywhere on screen, `matchedCount` 0, level unchanged, `playing` state, all cards present and tappable; a later match of every pair still completed the level (3 pips, celebration). |
| AC-26 | **PASS** | Level 6: tap card 5 (mirrored fox) → tap card 8 (mushroom): gentle mismatch teach (coral 0.51 sampled, `vo_mismatch`, anchor keeps its ring); tap card 10 (the other mirrored fox) → the pair matches, labels "Card 5 of 12, mirrored fox, matched" / "Card 10 of 12, mirrored fox, matched". |
| AC-27 | **PASS** | Last pair double-tapped: first tap → one match + one celebration (log length 29, `vo_praise` ×1, `vo_match` ×3, confetti `40/600`); the second tap added **nothing** (log length still 29, still `celebrating`, still 3 matches). |
| AC-28 | **PASS** | Title idle 12 s: Play pulses at 1 Hz for 3 s (scale 1.001 → 1.062 → 1.001, then back to 1) with **zero** audio attempts, `unlocked=false`, `ctxState=null`; the hint recurs every 12 s. |
| AC-29 | **PASS** | Complete idle 12 s: Replay pulses for 3 s (scale sampled 1.08) and `vo_complete` replays @0.9 (first playback @1.0 on entry). |

### Additional checks beyond the AC table

* **R-008 (no network after load):** `performance.getEntriesByType('resource')` lists exactly `styles.css` and `game.js`; the favicon is an inline data URI, so there is no `favicon.ico` request. Console was completely empty for the whole session on the final code.
* **R-009:** 61 fps measured with `requestAnimationFrame` over 1.5 s at 1024×768 while board, hint and confetti animations ran (desktop machine — see "not tested").
* **Effect numbers sampled:** card pop-in with the 50 ms stagger (cards 5/16 still at `scale(0)` 120 ms after level start while cards 1–2 were already settling), lift/settle 150 ms, white flash 150 in/300 out, coral flash 150 in/300 out, check stamp 1.4/−10° → 1 over 200 ms, pip fill 150 ms, match settle to 0.70 over 300 ms, ring 6 px gold at 0.9, halo 1→1.15 at 1 Hz for 3 pulses, confetti caps 40/600 and 60/900, ring fill linear over 3 s, depress 80 ms.
* **FR-010 extras:** rapid Play double-tap starts exactly one level (the second press is a normal tap in the new state, never a restart); HOME during teaching cancels the 1.2 s timer and saves; repeated empty taps only reset the idle timer; resize mid-level keeps level, matched pairs and selection.

---

## 4. Spec ambiguities resolved (blind-build questions)

1. **Visible text.** Section 14 allows the optional words "Play"/"Replay". I chose glyph-only buttons with invisible accessible names, which keeps on-screen text at zero words.
2. **`music_loop`.** Section 11 marks it optional ("may be omitted") and the spec defines no volume control or mute affordance, so it is omitted rather than shipping an un-mutable loop. All sfx and voices are implemented.
3. **`card_slot`.** The asset manifest calls it a 256×256 SVG; the same "cream rounded square, 3 px ink border at 0.18 opacity, soft shadow" is produced by CSS on `.card-face` (cheaper DOM for 16 cards). Every other asset key is inline SVG.
4. **Level-8 celebration voice.** Section 9 lists `vo_praise` for "Level complete" and `vo_complete` for "Game complete"; I play `vo_praise` in the celebration for every level and `vo_complete` on the trophy screen (matching AC-15/AC-16 wording).
5. **Teaching → playing on a match.** Section 6 requires `teaching + CARD_TAP(anchor's partner) → playing(level, none, matched+1)`; the state is explicitly returned to `playing` (this was a real bug found in testing and fixed).
6. **Focus after a state change** is not specced. When the focused element disappears (e.g. Play is hidden as the level starts) focus moves to the new state's first control (HOME), which is what makes the specced tab order usable from the keyboard. Hiding a subtree blurs synchronously, so the move is resolved *before* the DOM is hidden.
7. **Idle hint in `title`** stays silent forever (the spec row says "no audio"; the parenthetical reason is autoplay, but silence is the safe reading).
8. **"Confetti ≤40 particles over 600 ms"** read as: all particles spawned at once with per-particle durations inside a 600 ms window (900 ms for game complete), then removed.
9. **Check badge placement** (bottom-right, 40 % of the card) and the token colouring are decoration within the palette; shapes carry identity as specced.
10. **Pose mirroring** is applied to the whole token group about the 256×256 artboard centre (`translate(256,0) scale(-1,1)`); for shadow variants every shape primitive (fills *and* shape strokes) is re-filled `#3E2C1E` and the detail group is dropped, giving one flat silhouette at 0.85 opacity with no interior detail.
11. **Audio unlock** happens on the first pointer/key input anywhere (FR-001 wording), not only on Play.
12. **Voice `cancel()` + `speak()`** in the same tick can drop the new utterance in some browsers, so the utterance is queued via `requestAnimationFrame` with a sequence guard, still cancelling the previous one immediately.
13. **Background throttling** is handled with a single 25 ms scheduler over wall-clock deadlines plus a `visibilitychange` drain, so an expired timer fires exactly once on restore and the idle hint re-arms.
14. **Storage availability** is probed with a write+remove at load; any throw degrades to the in-memory save (and a mid-run failure keeps the memory copy).

---

## 5. Spec defects / friction found

* **None blocking.** Two soft spots worth noting for a future spec revision:
  * The level-8 completion voice is ambiguous (see ambiguity 4); a spec table row for "level 8 celebration" would remove the guesswork.
  * FR-011's title-hint rule mixes the autoplay reason with a behaviour ("with no audio"); after the first gesture it is unspecified whether the title hint may speak.
* All content tables were verified against the code: Table B slot orders for levels 1, 2, 3, 5, 6, 7 and 8 were compared slot-by-slot with the implemented data (level 4 shares the level-3 shape and was exercised by the AC-03/AC-20 path); all matched exactly. The section 8 card-size numbers reproduce exactly (`level 8 @320×480 = 66 px`, `level 5 @320×480 = 64 px`).

---

## 6. What was not tested (honest limits)

* **Audio fidelity.** Headless Chrome has no audio device: I verified *what* the game asks for (sfx key + volume per event, `vo_*` copy at the specced volume, `cancel`-then-`speak` ordering, one utterance at a time) and that the AudioContext is created/resumed after a gesture — but not how the blips/chimes actually sound, nor the TTS timbre (spec: build freedom).
* **Real hardware multi-touch and real screen-reader output.** Multi-touch was exercised through Chrome's touch pipeline with two simultaneous touch points; the accessibility tree was read from Chrome rather than from VoiceOver/TalkBack, and AT activation was simulated with `click` events (`detail === 0`).
* **R-009 on target hardware.** 61 fps was measured on this desktop under headless Chrome, not on a mid-range 2020 tablet.
* **Missing-asset fallback.** All art is generated inline, so the "missing visual → draw a stub" path cannot occur at runtime; the *audio* failure paths (no `speechSynthesis`, no `AudioContext`) were tested by removing those APIs.
* **Other engines/platforms** (Firefox/Safari, iOS/Android) — only Chrome was available.
* **`prefers-reduced-motion`** — not specced, not implemented.
* The optional music loop is absent by design (ambiguity 2).

---

## 7. Test-harness notes

The test driver (`cdp.mjs` + `send.mjs`, kept outside the repo in the session temp dir) attached to an isolated headless Chrome over the DevTools Protocol and spoke newline-delimited JSON ops (`goto`, `resize`, `eval`, `click`/`tapSlot`, `mouseDown/Up`, `touchSlots`, `key`, `tab`, `solve`, `shot`, `axTree`, `addInitScript`). Two "bad json" lines seen in intermediate runs were typos inside my own op files (a stray quote in a `sleep` line) — they dropped test pauses, never game behaviour; the final harness run was clean. `solve` is a real-input auto-player: it reads the level's unmatched pairs from the page and dispatches real taps, so every level completion in this report went through the actual game loop (select → match → pip → celebration → advance) with real throttles.
