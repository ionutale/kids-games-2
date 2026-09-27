# matching-games — independent verification report

**Verifier:** fresh-context subagent (did not build the game, did not read the build report/progress before its own pass).
**Artifact under test:** `games/matching-games/` at
- `index.html` — sha256 `dce9a3834ab83cf09c64d1e608a4ce3f9e73c2ff812960ef144006d0d0da9ddf`
- `styles.css` — sha256 `533ba11b9ad1ba81158a4ddd3a7aeff614256020e9803fb674a799db57b9d602`
- `game.js` — sha256 `78db8d4d15aa44fe7d7f9ca40ef6802bf9277c3365324a6cccef65ef87cd4ce7`

**Spec:** `docs/khan-academy-kids-games/specs/matching-games.md` (v1)
**Stack contract:** `docs/khan-academy-kids-games/stack-decision.md`
**Date:** 2026-09-27

---

## 1. Method summary

**Baseline environment**

- macOS (darwin), Chrome `153.0.8010.53` (`/Applications/Google Chrome.app`) launched as
  `--headless=new --remote-debugging-port=9333 --user-data-dir=<temp>/profile --no-first-run --no-default-browser-check --disable-gpu --window-size=1024,768`.
- Node `v26.1.0` drove the browser over the DevTools Protocol using a hand-written client on
  Node's built-in `WebSocket` (no npm dependencies). Page targets were created with
  `PUT /json/new`; every test opened its own tab with an isolated init-script set.
- Static server: `python3 -m http.server 8321 --bind 127.0.0.1` from the repo root →
  `http://127.0.0.1:8321/games/matching-games/`.
  **Deviation:** the method suggested port 8123, but 8123 was already occupied by an unrelated
  Docker service ("DWG/DXF Web Library"); 8321 was used instead. This changes no game behaviour.
- All harness scripts, Chrome profiles and screenshots were kept in
  `/private/var/folders/…/T/opencode/mg-verify.gAeLBX/` (outside the repo). Nothing was written
  inside the repo except this report.

**How the browser was driven**

- Real input only, through Chrome's own input pipeline: `Input.dispatchMouseEvent`,
  `Input.dispatchKeyEvent` (rawKeyDown/keyUp with proper `key`/`code`/VK), and
  `Input.dispatchTouchEvent` with `Emulation.setTouchEmulationEnabled`. No synthetic DOM event
  dispatch was used for behavioural claims.
- Viewports set with `Emulation.setDeviceMetricsOverride` (1024×768, 768×1024, 1366×768,
  400×700, 320×480).
- Independent instrumentation was injected before every document
  (`Page.addScriptToEvaluateOnNewDocument`), wrapping *browser* APIs: `Element.prototype.animate`,
  `window` pointer events, `SpeechSynthesis.prototype.speak/cancel`, `AudioContext` oscillator/gain
  creation and `AudioParam` scheduling + `OscillatorNode.start`, and `#app` `data-state` mutations.
  This is not the game's debug hook; it observes what the game asks the browser to do.
- The game's read-only hook `window.__pairUp` was used for extra instrumentation (state, session,
  save, layout, computed styles) but never as the sole evidence for a behaviour.
- Accessibility was checked with `Accessibility.getFullAXTree` (the browser data a screen reader
  consumes). Console errors/exceptions and `Network.requestWillBeSent` were recorded for every page.
- Screenshots were captured for the visual states (title, level 1, selected, teaching, matched,
  celebrating, complete, level 5/6/8 at several viewports, hold ring).

**Harness inventory (temp dir; all re-runnable):** `lib.mjs`, `instrument.js`,
`t01_core.mjs` (AC-01/02/04–10/12/14 + hit tolerance), `t02_progress.mjs` (AC-03/15/17/18/19),
`t03_resize.mjs` (AC-20/21/R-011), `t04_idle.mjs` (AC-11/28), `t05_complete.mjs`
(AC-16/26/27/29), `t06_edge.mjs` (AC-13/22/23/25), `t07_ax_stack.mjs` (AC-24, stack, R-014,
FR-007/010/013, R-003/004/013), `t08_pips_fps.mjs`, `t09_tables.mjs` (Tables A/B), `t10_boundary.mjs`,
`t11_c1_i1.mjs`, `t12_followups.mjs`, `t13_cardsizes.mjs`.

**What was not possible here:** no audio output device, no physical touch hardware, no
VoiceOver/TalkBack, no mid-range 2020 tablet, no second browser engine, and
`Emulation.setPageVisibilityOverride` is not implemented in Chrome 153 (real background-tab
throttling could not be reproduced directly). Details in §6.

---

## 2. Per-AC results

All 29 acceptance criteria pass. Evidence below is the actual sampled value from the run, with the
script that produced it. Unless stated otherwise the viewport is 1024×768.

| AC | Result | Evidence |
|---|---|---|
| AC-01 | **PASS** | `t01`: first load reaches `title` (`#titleScreen.hidden=false`, `#completeScreen.hidden=true`); logo rect 128×128, Play 96×96 (both ≥96); no audio/voice calls and `voiceState = {unlocked:false, ctxState:null}`. Screenshot `01-title.png`. |
| AC-02 | **PASS** | `t01`: after a real Play click — level 1, 6 cards in slot order `fx,fg,lf,fx,fg,lf`; prompt visible with 3 pips all `matrix(0,0,0,0,0,0)`; board label `"Card board, 6 cards, 3 pairs"`; `speechSynthesis.speak("Find the pairs! Tap two cards that match.", volume 1.0)`; pop-in animations 6 × duration 150 ms with delays `[0,50,100,150,200,250]` + prompt pop 150 ms; audio unlocked on the gesture (`ctxState="running"`). Before the gesture: 0 speak calls, 0 oscillator starts. |
| AC-03 | **PASS** | `t02` (seed `{highestUnlocked:5}`): Play starts level 5, 10 cards, 5 pips, slots `1:sh 2:lf 3:mn 4:fx:shadow 5:bz:shadow 6:mn 7:bz:shadow 8:sh 9:fx:shadow 10:lf` = Table B `A B C D E C E A D B`; HOME 64×64 at (24,24). |
| AC-04 | **PASS** | `t01`: card 1 tap → `.selected`, computed lift `matrix(1,0,0,1,0,-6)`, ring opacity 0.9, `sfx_pick` (osc freq 780). Card 4 tap → both `.matched`, white-flash peak sampled 0.236 (spec 0.25), check badges opacity 1 with 200 ms stamp anims, `card-inner` opacity 0.7 both, pip 1 `matrix(1,0,0,1,0,0)` and pips 2–3 `scale(0)`, `speak("A pair!", 1.0)`, `sfx_pop` (300→900) + `sfx_chime` (1046.5/1318.5/1568). |
| AC-05 | **PASS** | `t01` (fresh board): tap 1 then 2 → `state=teaching`, `anchorSlot=1`, `selectedSlot=1`; 2 wiggle anims (rotate ±6°, 300 ms), coral-flash peaks 0.622 on both, `sfx_soft_buzz` (240→150), `speak("Those don't match. Try again!", 0.9)`; anchor ring pulse observed at 600 ms (1 × 300 ms anim); 1.2 s later `state=playing` with card 1 still lifted/ringed; card 2 unmatched. |
| AC-06 | **PASS** | `t01`: card 3 tapped ~0.8 s into teaching → still `teaching`, `anchorSlot=1`, `selectedSlot=1`, second `vo_mismatch` (2 mismatch speaks total); state still `teaching` 1.05 s after the restart (the original 1.2 s window had closed), then `playing`. Voice log order `cancel → speak` for every utterance. |
| AC-07 | **PASS** | `t01`: during teaching, card 4 (anchor's partner) → `playing`, `matchedCount=1`, `matchedSlots=[1,4]`, `anchorSlot=null`, no new wiggle anims and no new mismatch voice; only `speak("A pair!")`. |
| AC-08 | **PASS** | `t01`: select card 2, re-tap 60 ms later → still selected (throttle); tap again 350 ms after the first → deselected (`selectedSlot=null`, ring gone, `sfx_soft_tap` gain 0.13 = 0.26×0.5). |
| AC-09 | **PASS** | `t01`: matched card tap → `.check` pulse anim duration 300 ms, `sfx_soft_tap` at gain 0.104 (=0.26×0.4), `matchedCount`/`matchedSlots`/pips/classes unchanged. (The processed tap does update `lastPickAt`, consistent with FR-010; see ambiguity A-7.) |
| AC-10 | **PASS** | `t01`: taps at (900,400) board background, (700,40) top bar, and the prompt-card centre → session, pips, audio-call count and speak-call count identical before/after; idle deadline moved from ~10.0 s back to ~11.9 s on each tap. |
| AC-11 | **PASS** | `t04`: first hint at 11 833 ms of idleness with halos exactly `[1,4]` (first unmatched slot + partner) and `speak(vo_target, 0.9)`; each halo = 1000 ms × 3 iterations anim; halos gone 3.4 s later; second hint at ~24 s (repeat); with card 2 selected the halo is `[5]` only; empty tap reset the deadline; the pair then matched normally (`matchedSlots=[2,5]`). |
| AC-12 | **PASS** | `t01`: from body focus, Tab → `homeBtn → card1 → card2 → card3` (row-major); Enter on card 3 selected it (`selectedSlot=3`); Tab → card 4, Space → treated as a tap (teaching anchor 3); focus outline computed `4px solid rgb(62,44,30)`. `t11`: title Tab order `logoBtn → playBtn`. |
| AC-13 | **PASS** | `t06`: one real `touchStart` with two touch points on cards 1 and 2 → two `pointerdown` (type touch) delivered; only the first processed (`selectedSlot=1`, card 2 untouched, no mismatch); after `touchEnd` a further touch deselects card 1 (picks resume). `t11`: palm-first variant — first contact on empty space, second on a card → card not selected; after release the same tap selects. |
| AC-14 | **PASS** | `t01`: tap card 3 200 ms after a match → ignored (still 2 matches, no selection, no teaching); tap again 735 ms after the match → selected. |
| AC-15 | **PASS** | `t02`: last pair of level 5 → `celebrating`, 40 confetti particles (spec ≤40), `speak("You found every pair!", 1.0)`, `localStorage["spec.matchingGames.v1"] = {highestUnlocked:6, levelsCompleted:5, updatedAt:<ISO round-trips>}` written at the moment of celebration; level 6 (12 cards) appeared ≈2.37 s after the match. |
| AC-16 | **PASS** | `t05`: level 8 solved → `complete`, complete screen visible, trophy 200×200, 60 particles (spec ≤60), `speak("You matched every single pair!", 1.0)`, save `{highestUnlocked:8, levelsCompleted:8}`; HOME and Replay visible; Replay 96×96 labelled "Play again". |
| AC-17 | **PASS** | `t02`: HOME pressed during level-1 celebration → `title` 32 ms later, save written `{highestUnlocked:2, levelsCompleted:1}`; still `title` 2.7 s later (auto-advance cancelled, level never advanced). |
| AC-18 | **PASS** | `t02`: HOME (save) → reload → Play resumes at level 6 with `selectedSlot=null`, `matchedCount=0`, `matchedSlots=[]`, 12 cards, `vo_target` replayed. Also verified at level 5 in the same run. |
| AC-19 | **PASS** | `t02`: mouse hold on the 128×128 logo — at 1.5 s ring visible with `stroke-dashoffset=169.661px` (of 339.3); at 3.0 s key deleted, in-memory save reset to `{1,0}`, checkmark opacity 1 (200/800/200 ms anim), `sfx_soft_tap` gain 0.182 (=0.26×0.7), hold log `[begin, complete]`; early release (focus still on logo) cancels (ring hidden, key intact). Keyboard: Tab to logo, hold Enter 3.2 s → identical (hold log, key deleted, checkmark). |
| AC-20 | **PASS** | `t03`: mid-level resize 1024×768 → 768×1024 with a matched pair `[1,8]` and card 2 selected → layout `{card:131.2, columns:5, rows:2, playW:720}` (grid columns computed `131.188px ×5`), min card 131.2 ≥64, matched/selected state identical; no scroll (`scrollHeight ≤ innerHeight`). Below 480 px (400×700) the level-5 grid becomes 2×5 (card 108) with state kept; 1366×768 returns to card 140, state kept. |
| AC-21 | **PASS** | `t03`/`t13`: at 320×480 level 8 → 4×4, card 66 px, all 16 cards fully inside the viewport, `scrollHeight=480`, every card's centre hit-tests to itself, and all 16 cards were selected by real taps (16/16); prompt 96×96, pip 8 px / gap 4 px (see defect D-3 for the 7.75 px nuance). Level 1 @320×480 = 2×3/card 112, level 5 = 2×5/card 64. |
| AC-22 | **PASS** | `t06`: (a) with `speechSynthesis`/`SpeechSynthesisUtterance` undefined → `supported=false`, AudioContext still running, full level 1 completed with visual-only feedback (opacity 0.7, check badges, pip fill, 6 oscillator starts, 40 confetti) → level 2. (b) with `AudioContext`/`webkitAudioContext` also undefined → `ctxState=null`, zero audio calls, level 1 completed to level 2, no console errors. |
| AC-23 | **PASS** | `t06`: with `Storage.prototype.setItem/getItem` throwing → `storageOk=false`; level 1 completed, level 2 started, in-memory save `{highestUnlocked:2, levelsCompleted:1}`, `localStorage.getItem` still throws `SecurityError`, zero console errors. |
| AC-24 | **PASS** (AX contract; real SR announcement not testable) | `t07`: `getFullAXTree` — title: button "Matching pairs board, hold three seconds to reset progress" + button "Play"; playing: group "Card board, 12 cards, 6 pairs" + 12 card buttons incl. "Card 5 of 12, mirrored fox, not matched", "Card 3 of 12, shadow of a leaf, not matched"; after selection "…, selected"; after a match "Card 5 of 12, mirrored fox, matched" / "Card 10 …"; complete: buttons "Home" and "Play again". `document.body.innerText` is empty on title/playing/complete (no visible words; the spec's words are optional). Actual screen-reader announcement rendering not testable here (§6). |
| AC-25 | **PASS** | `t06`: five mismatches in a row (tap 1, then 2 ×5 with teaching in between) → every round `teaching → playing` with anchor 1 still selected, `vo_mismatch` ×5, `matchedCount=0`, level 1, all pips unfilled, visible text empty, and the pair still matchable afterwards (`[1,4]`). |
| AC-26 | **PASS** | `t05`: level 6 slot 5 = `fx:pose` (label "Card 5 of 12, mirrored fox, not matched"), slot 8 = `ms:icon`, slot 10 = `fx:pose`; 5→8 → teaching anchor 5 + `vo_mismatch` + coral flash; 5→10 → match `[5,10]` + "A pair!". |
| AC-27 | **PASS** | `t05`: last pair's second card (13) tapped twice 40 ms apart → exactly 1 match log, 1 confetti log, 1 `vo_praise`, 1 `celebrating` state, 40 particles, `matchedCount=8`; audio-call count and speak-call count identical immediately after the first tap and after the second (237/237, 19/19); the celebration advanced once to `complete`. |
| AC-28 | **PASS** | `t04`: title, 12 s idle → Play pulse starts at 12 040 ms, anim duration 1000 ms × 3 iterations; zero speak calls and zero oscillator starts (silent); a second pulse at ~24 s (repeat). |
| AC-29 | **PASS** | `t05`: `complete`, 12 s idle → Replay pulse at 11 719 ms (1000 ms × 3) and `speak("You matched every single pair!", 0.9)`. |

**Supplementary spec checks (not ACs)**

| Check | Result | Evidence |
|---|---|---|
| Tables A/B — all 8 levels, exact pairs/variants/slot orders | **PASS** | `t09`: every level's `{slot,pairId,token,variant}` list equals the spec tables (levels 1–8), wide grids 3×2/3×2/4×2/4×2/5×2/4×3/4×3/4×4 and small grids 2×3/2×3/2×4/2×4/2×5/3×4/3×4/4×4 (small grids spot-checked 1/3/6 + 320×480). |
| Shadow variant = flat `#3E2C1E` @0.85, no interior detail | **PASS** | `t09`: every shadow `<g>` has `opacity="0.85"` and only `#3E2C1E` fills/strokes; same-token cross-level comparison shows exactly the detail children dropped (lf 3→1, ms 4→2, cl 3→3 [cloud has no detail], fg 8→3, sf 7→2, bz 6→3, fx 7→3). |
| Pose variant mirrored only for fx/bz/wl/sh | **PASS** | `t09`: every pose `<g>` has `transform="translate(256,0) scale(-1,1)"`; pose appears only on fx/bz/wl/sh across all tables. |
| Section 7 hit tolerance (12 px, nearest centre, tie→lower slot) | **PASS** | `t01`: exact gap midpoint (434 px, distances 78/78) → slot 1; 3 px left of card 2 → slot 2; `t10`: 11.5 px outside card 3's edge → slot 3; 12.5 px → empty tap (no anims, no sfx). |
| FR-001 keyboard unlocks audio | **PASS** | `t10`: Tab on title → `unlocked=true`, `ctxState` non-null, still zero speak calls. |
| FR-002 pop-in / FR-005 white flash / FR-006 ring pulse / FR-008 badge pulse | **PASS** | see AC-02/04/05/09. |
| FR-007 teaching taps | **PASS** | AC-06 (restart), AC-07 (partner), `t07` anchor tap → deselect + teaching cancelled. |
| FR-010 rapid Play double-tap | **PASS** | `t07`: exactly 1 level-start log, state `playing` level 1; the second press landed on the board and selected card 5 (see ambiguity A-1). |
| FR-010 palm-first | **PASS** | `t11`: first contact empty, second on card ignored; after all releases picks resume. |
| FR-013 HOME in teaching/celebration | **PASS** | `t07`: HOME during teaching → title, save written, still title 1.4 s later. |
| FR-017 one voice at a time | **PASS** | `t01`: every `speak` is immediately preceded by `cancel` in the instrumented `speechSynthesis` log. |
| R-003 Replay 500 ms throttle | **PASS** | `t07`: Replay pressed 143 ms after entering `complete` → still `complete`; press at >500 ms → `playing` level 1 with progress kept. |
| R-004 keyboard activation of every control | **PASS** | cards/Play/HOME/Replay via Enter/Space, logo hold via Enter (`t01`, `t07`, `t02`). |
| R-008 no network after load | **PASS** | `t07`: `Network.requestWillBeSent` over a full session lists only `index.html`, `styles.css`, `game.js`; `performance.getEntriesByType('resource')` = `styles.css`, `game.js` only (favicon is a data URI). |
| R-013 timer catch-up | **PASS (simulated)** | `t07`: after blocking the main thread 13 s (> the 12 s idle deadline), the expired idle timer fired on the next tick — halos `[1,4]` + `vo_target` 0.9. `Emulation.setPageVisibilityOverride` is unsupported in Chrome 153, so a real hidden tab was not reproduced (§6). |
| R-014 deterministic content | **PASS** | `t07`: two independent loads of level 6 produce byte-identical card/label arrays; no `Math.random` in `game.js`. |

---

## 3. Stack conformance

| Stack decision | Result | Observation |
|---|---|---|
| DOM + inline SVG; canvas only for ink (none expected here) | **CONFORMS** | 0 `<canvas>` elements; 0 `getContext`/canvas strings in source; all art is inline `<svg>`/`<symbol>`/`<use>` + CSS (e.g. 14 inline SVGs at level 1). |
| Web Audio + `speechSynthesis` for audio | **CONFORMS** | `AudioContext` created on the first gesture; sfx are oscillator/gain blips (instrumented `createOscillator`/`AudioParam`/`start`); voices use `speechSynthesis.speak` with `cancel()` first; no audio files, no network. |
| Vanilla ES modules, static files, no build step, no dependencies | **CONFORMS** | `<script type="module" src="game.js">`; served as `text/javascript`; no `import` statements, no package.json/node_modules, no bundler output; directory contains exactly `index.html`, `styles.css`, `game.js`. |
| Pointer Events + keyboard input | **CONFORMS** | `pointerdown/pointerup/pointercancel` on `window` (capture) + `keydown/keyup`; no `touchstart`/`mousedown` listeners; behaviour verified with real pointer/key/touch input. |
| Persistence — per-spec localStorage key exactly as named | **CONFORMS** | `SAVE_KEY = 'spec.matchingGames.v1'`; after play exactly one localStorage key exists with that name; shape `{highestUnlocked, levelsCompleted, updatedAt}` with ISO-8601 `updatedAt`; blocked-storage degradation verified. |
| One self-contained `games/matching-games/` directory, no cross-game imports | **CONFORMS** | Only 3 files; no `../`, `games/`, or other-game references in code (the only "games/" match is a source comment); all resources are same-directory. |
| No network requests after load | **CONFORMS** | See R-008 above; no `fetch`/XHR/WebSocket/sendBeacon/import() in source; favicon is a data URI. |
| Original assets only (no Khan Academy art/characters/names) | **CONFORMS** | 10 original primitive-drawn tokens (fox/frog/leaf/bee/snail/moon/owl/mushroom/starfish/cloud) + inline UI glyphs; `<title>Play</title>`; the string "khan" appears only in a source comment (`game.js:2`, provenance note), never on screen or in audio (visible text is empty on all screens). |
| Debug hook observation | **Observation** | `window.__pairUp` exists (read-only getters + event log). Not a stack violation; useful for verification; no behavioural side effects observed. |
| `music_loop` / `card_slot` asset choices | **Observation** | `music_loop` omitted (spec permits); `card_slot` visual rendered in CSS on `.card-face` rather than a 256×256 SVG (same visual; build freedom). |

---

## 4. Defects

### D-1 — Critical — the 3 s reset hold is not cancelled when focus leaves the logo (unintended mid-level save wipe)

**Repro A (real input, keyboard):**
1. Load the game with `localStorage["spec.matchingGames.v1"] = {"highestUnlocked":4,…}`.
2. On `title`, Tab to focus the logo, then hold Enter (`keyDown`).
3. Tab → focus moves to Play (ring is still visible: `holdRingVisible=true`).
4. Press Enter → level 4 starts (`state=playing`).
5. Wait past 3 s from step 2.

**Expected:** the reset hold should be cancelled when focus leaves the focused logo / the state leaves `title`; no reset should fire mid-level (FR-016, FR-013, §6 `title/RESET_HOLD`, §10 Reset).

**Observed:** the hold completes mid-level: hold log `[begin, complete]`, `localStorage` key **deleted**, in-memory save reset to `{highestUnlocked:1, levelsCompleted:0, updatedAt:null}`, checkmark animation opacity 1, `sfx_soft_tap` (gain 0.182) plays — while `state=playing, level=4`. Progress is silently destroyed with no confirmation prompt.

**Repro B (FR-016 release semantics):** on `title`, hold Enter on the logo 0.7 s, Tab to Play, release Enter. Expected: "Releasing early cancels the ring" (FR-016). Observed: ring still visible, no `cancel` in the hold log, and the hold completes 3 s after it began, clearing the key.

**Root cause (source):** `endLogoHold()` is only called from `onPointerRelease` and from `onKeyUp` when `document.activeElement === logoBtn` (`game.js:1057-1061`, `1090-1099`); nothing cancels the `'hold'` timer on focus change or state change, and `completeHold()` (`game.js:1101-1116`) runs regardless of the current state. The pointer variant is not reachable with one mouse, but the keyboard variant is fully reachable.

### D-2 — High — a missed pointer release leaves `activePointers` stuck; all card input is ignored until reload

**Repro (real input, touch emulation):**
1. Play level 1, touch down on card 1 (selected).
2. Open a second tab and activate it (a real focus change), then return.
3. Observe: no `pointercancel` and no `pointerup` delivered (instrumented listeners: `cancels: []`, `ups: []`).
4. Touch-tap card 2: ignored — `selectedSlot` stays 1, `state` stays `playing`; further taps are ignored too.

**Fault-injection confirmation:** removing the `pointerup`/`pointercancel` listeners after a real touch-down (simulating a release the browser never delivers) makes every subsequent touch (pointer ids 2, 3, 4) ignored; only the id that was never released could clear it.

**Expected:** FR-010 "A resting palm that lands first does not block play: picks resume as soon as all pointers are released"; R-002. A stale pointer set should be cleared on blur/visibilitychange/pointercancel.

**Observed:** `activePointers` is only mutated in `onPointerDown`/`onPointerRelease` (`game.js:1009-1032`); there is no `blur`/`visibilitychange` cleanup, so once a release is missed, first-pointer-wins rejects every later pointer until the page reloads. Severity depends on how often the browser drops the release (in this environment it did across a tab switch); the code has no fallback.

### D-3 — Low — prompt-card pips shrink to 7.75 px instead of the fixed ⌀8 px below 480 px with 8 pips

**Repro:** viewport 320×480 (or 400×700), saved level 8, Play; read `getComputedStyle(document.querySelector('.pip')).width`.
**Expected:** §8 layout numbers — "96×96 centered with ≤8 pips ⌀8 px at 4 px gaps".
**Observed:** `"7.75px"`. The 96 px prompt card has a 3 px border (border-box) → 90 px content box; 8 pips × 8 px + 7 × 4 px = 92 px > 90 px, so flex-shrink reduces each pip by 0.25 px. At ≥480 px (140 px card, 10 px pips) the row is 115 px < 134 px and renders exactly. No overflow or clipping; visually negligible, but it is a deviation from a fixed layout number. (Other §8 numbers reproduce exactly: card sizes 140/131.2/66/64/112, top bar 144/104, gaps 16/12/8, prompt 140/96.)

---

## 5. Spec ambiguities / gaps hit

- **A-1 — FR-010 "rapid Play double-tap": "the second is a no-op in `playing`".** The build classifies the second press in the new state, so it can select a card under the finger (observed: card 5 selected). R-016 ("every input event is a card tap, control press, or empty tap per §7") supports that reading; the spec does not settle it. Not counted as a defect.
- **A-2 — FR-011 title hint after the first gesture.** The spec says the title hint is silent and gives autoplay as the reason; after audio is unlocked it is unspecified whether the title hint may speak. The build keeps it silent forever (defensible).
- **A-3 — FR-016 focus semantics of the hold.** "Releasing early cancels the ring" is unconditional in the spec, but the build only cancels while the logo still has focus (see D-1). The spec does not state what should happen when focus moves mid-hold.
- **A-4 — level-8 celebration voice.** §9 gives `vo_praise` for "Level complete" and `vo_complete` for "Game complete"; the build plays `vo_praise` at every level's celebration (including 8) and `vo_complete` on the trophy screen, matching AC-15/AC-16 wording. Consistent.
- **A-5 — confetti wording.** "≤40 particles over 600 ms" read as all particles spawned at once with per-particle durations inside the window; observed exactly 40/60 particles.
- **A-6 — halo wording.** "pulsing 3 s at 1 Hz" implemented as a 1000 ms animation × 3 iterations (observed); consistent.
- **A-7 — matched-card tap and the pick throttle.** A matched-card tap is a "processed card tap" per FR-008/FR-010, and the build updates `lastPickAt` on it (so a following card tap within 250 ms is ignored). The spec doesn't say either way; behaviour is self-consistent.
- **A-8 — `card_slot`/`music_loop`.** `card_slot` is CSS rather than a 256×256 SVG; `music_loop` is omitted (both within build freedom/optional).

---

## 6. Not testable (with what was attempted)

1. **Real screen-reader announcement (AC-24).** No VoiceOver/TalkBack available in headless Chrome. Attempted: `Accessibility.getFullAXTree` (the browser accessibility API screen readers consume) and visible-text checks — both verified; the spoken output itself was not.
2. **Audible fidelity / TTS timbre.** No audio output device in headless. Attempted: instrumentation of `speechSynthesis.speak/cancel` (text, volume, ordering) and Web Audio node scheduling (oscillator type/frequency, gain envelopes). What is heard was not verified (spec: timbre is build freedom).
3. **Physical multi-touch hardware (AC-13).** Two simultaneous touch points were sent through Chrome's real touch input pipeline via CDP; a real touchscreen was not used.
4. **R-009 on a mid-range 2020 tablet.** Attempted: rAF frame counting in headless desktop — 60.26 fps idle and 60.08 fps during celebration confetti at 1024×768. Not the target device.
5. **Real background-tab throttling (R-013).** `Emulation.setPageVisibilityOverride` does not exist in Chrome 153 (method-not-found), and freezing the target blocks the CDP evaluation used to observe it. Attempted: a 13 s main-thread block (timers delayed, then a catch-up tick) — the expired idle timer fired on the next tick with halos `[1,4]` + `vo_target` 0.9; the `visibilitychange` handler exists in source. A real backgrounded tab was not reproduced.
6. **OS-level missed pointer delivery (D-2's trigger).** The stuck state was reproduced in this environment (tab switch with a touch held, no `pointercancel`/`pointerup` delivered) and by fault injection, but real-device event delivery may differ; the code has no fallback either way.
7. **Other engines/platforms.** Only Chrome 153 was available; Firefox/Safari and iOS/Android were not tested.
8. **Missing-visual-asset fallback.** Not applicable: all art is inline, so the stub path cannot occur at runtime (audio-degradation paths were tested, AC-22).

---

## 7. Reconciliation vs the builder report

The builder report was read only after the pass above (blindness rule respected).

**Claims I reproduced independently**

- All 29 ACs pass — reproduced with my own real-input harness and independent instrumentation (not the builder's hook as primary evidence).
- Exact Tables A/B content for **all eight levels** (the builder report says it verified 1,2,3,5,6,7,8 slot-by-slot and exercised level 4 via AC-03/20; I verified all eight plus both grid shapes).
- `card` sizes: level 8 @320×480 = 66 px, level 5 @320×480 = 64 px, level 1 @320×480 = 112 px — all reproduced exactly.
- Title tab order (logo → Play), palm-first touch, teaching→playing on a partner match (the bug the progress ledger says was fixed), no network after load, one localStorage key with the exact name and ISO `updatedAt`, empty console, ~60 fps headless (builder measured 61).
- The builder's not-tested list (audio fidelity, real screen reader, physical multi-touch, tablet fps, other engines) matches my own limits.

**Claims I could not reproduce**

- The parallel static review's minor **M-4 "pip fill 4 px wide"**: after a real match the fill measures `offsetWidth 10`, `getBoundingClientRect 10×10` against a 10×10 pip (`matrix(1,0,0,1,0,0)`). I could not reproduce a 4 px fill; it is not a defect as described (possibly a mid-`scale(0)` measurement). No other code-review minors were re-audited here beyond those in §4.

**Defects the builder report missed**

- **D-1 (Critical)** — reset hold survives focus change and wipes the save mid-level (real-input repro in §4). The build report's AC-19 covers the happy path only; nothing in it mentions this path. The progress ledger's static review independently flagged the same code path (C-1); my repro confirms it end-to-end.
- **D-2 (High)** — missed pointer release permanently blocks card input (real-input repro + fault injection). Matches the static review's I-1; confirmed behaviourally here.
- **D-3 (Low)** — 8-pip row shrinks to 7.75 px below 480 px (new; not in the builder report or the ledger's list).
- The build report's overall claim "all 29 acceptance criteria pass. No blockers." is accurate for the AC matrix, but D-1 is a destructive, easily reachable path outside the ACs, so the artifact is not defect-free.

**Discrepancies of note**

- Builder tested on Chrome 153.0.8010.52; this pass used 153.0.8010.53.
- Builder served on port 8123; that port was occupied by an unrelated service here, so 8321 was used.

---

## 8. Bottom line

- **29/29 ACs PASS**, 0 FAIL, 0 whole-AC NOT TESTABLE (AC-24's real screen-reader announcement is the one not-testable aspect; its AX-tree contract passed).
- **Stack conformance: full.** No violations found.
- **Defects:** D-1 Critical (unintended save wipe via the reset hold; FR-016/FR-013), D-2 High (stuck pointers block input; FR-010/R-002), D-3 Low (7.75 px pips below 480 px with 8 pips; §8).
- **Spec ambiguities:** rapid Play double-tap semantics, title-hint audio after the first gesture, hold-focus semantics (A-1/A-2/A-3 above).

---

## 9. Re-verification after fixes (2026-09-27, revision 2)

**Scope.** Independent re-verification of the fix round described in `matching-games-fix-report.md` (F-1/F-2/F-3/F-4). Same method as §1: real input through Chrome's own pipeline, independent browser-API instrumentation, headless Chrome 153.0.8010.53, static server `127.0.0.1:8321` from the repo root, harness in the temp dir `mg-verify.gAeLBX`. New scripts: `r2_d1.mjs`, `r2_d2.mjs`, `r2_d2b.mjs`, `r2_d2c.mjs`, `r2_d3.mjs`, `r2_console.mjs`, plus the full original suite re-run against the fixed code (`r2_t01…r2_t07`).

**Hashes verified against the fix report's "After" column**

| File | sha256 (current) | Verdict |
|---|---|---|
| `index.html` | `dce9a3834ab83cf09c64d1e608a4ce3f9e73c2ff812960ef144006d0d0da9ddf` | unchanged, matches "After" |
| `styles.css` | `138d103ba7a1977cce28e1c7fa55fecda3ef8e4bcc556e301e42d05f3b76edb8` | matches "After" |
| `game.js` | `31e273e5976fe074ff6aed5c571cf595f966a079f213c645026b044af4edbe67` | matches "After" |

Game directory still contains exactly the three files (no new assets).

### 9.1 D-1 (Critical) — FIXED

**Repro A (my report's exact repro), real input:** seed `{highestUnlocked:4,levelsCompleted:3}`; Tab → logo (`focus1=logoBtn`); keyDown Enter; at 1.0 s ring visible (`holdRingVisible=true`, `strokeDashoffset=228.077px`); Tab → Play (`focus2=playBtn`, ring still visible on `title`); Enter starts level 4; wait to 3.85 s from the hold start.

Observed: `state=playing, level=4`, hold log `[begin, cancel]` (no `complete`), `localStorage` key intact `{"highestUnlocked":4,"levelsCompleted":3,…}`, in-memory save `{4,3}`, checkmark opacity `0`, ring hidden, no `sfx_soft_tap` 0.182 gain ramp. A real tap then selected card 1 (`selectedSlot=1`) — play unaffected. **No mid-level reset, save intact.**

**Repro B (early release after focus moved):** hold Enter 0.7 s, Tab → Play, keyUp. Observed at +150 ms: hold log `[begin, cancel]`, ring hidden, key intact; at +2.75 s: no `complete`, state `title`, key intact. **FIXED.**

**Clean hold paths still reset exactly per AC-19:**
- Keyboard: Tab → logo, hold Enter; at 1.5 s ring visible `strokeDashoffset=169.661px` (of 339.3); at 3.0 s hold log `[begin, complete]`, key `null`, memory `{highestUnlocked:1,levelsCompleted:0}`, checkmark opacity `1`, `sfx_soft_tap` gain 0.182.
- Pointer: mouse hold on the 128×128 logo; at 1.5 s ring visible `strokeDashoffset=169.655px`; at 3.0 s key `null`, memory reset, checkmark opacity `1`, gain ramp 0.182.
- Early pointer release: hold 1.0 s then release → hold log `[begin, cancel]`, ring hidden, key intact; 2.6 s later no `complete`, key intact.
- Release outside the logo after a drag to (900,700) (pointer-capture path) → `[begin, cancel]`, no `complete`, key intact.

### 9.2 D-2 (High) — FIXED

**Real touch held across a real tab switch (no manual release).** Level 1; touch down on card 1 (`selectedSlot=1`); open a second page, activate it, then activate the game page back; **without releasing touch 40**, a new touch lands on card 2.

Observed: the next touch was processed — `state=teaching`, `anchorSlot=1` — and normal play continued (teaching ended with anchor 1 still selected; a touch on card 4 matched the pair `[1,4]`; a further touch selected card 2). Console clean.

Signal trace (separate run, `r2_d2b.mjs`): the real tab switch delivered **real `visibilitychange` events** — `document.hidden` was `true` while the other page was active and `false` on return; event log `[{t:731,hidden:true},{t:1448,hidden:false}]`; `blur=0, pointercancel=0, pointerup=0`. So the recovery came through the fix's **hidden → `recoverInput()`** path under a genuine hidden-tab transition, exactly the signal my original stuck repro lacked.

**`visibilitychange`-to-hidden path, no manual release (simulated, since `Emulation.setPageVisibilityOverride` is unsupported in Chrome 153):** touch on card 2 selected it; `document.hidden` shadowed to `true` and `visibilitychange` dispatched; touch 50 still down; next touch on card 3 → `state=teaching, anchorSlot=2`. Console clean.

**Blur path (real OS blur not producible in headless; dispatched `blur` after a real pointerdown):** next touch on card 2 → `state=teaching, anchorSlot=1`. Also, a dispatched blur cancels a pending logo hold (`ringVisible` true → false, hold log `[begin, cancel]`, key intact, no `complete` 2.6 s later).

**Residual, inherent limit (not a defect):** if a platform delivers no `blur`, no `visibilitychange` and no `pointercancel`, nothing can signal the stale pointer; the fix covers every signal the browser actually sends. My original stuck state was reproducible in the old code precisely because that code ignored the `visibilitychange` signal that the browser did send.

### 9.3 D-3 (Low) — FIXED

320×480, level 8 (8 pips): `getBoundingClientRect` widths `[8,8,8,8,8,8,8,8]`, computed widths `"8px"` ×8, heights 8. Pip-row union `[114,206]` (center 160) inside the prompt card `[112,208]` (center 160), Δ = 0; row box `[115,205]` centered; `scrollWidth/Height = 320/480`; grid 4×4, card 66 px. At 1024×768 pips remain 10 px (`[10×8]`, computed `"10px"`, union center 512 = card center). Screenshot `r2-level8-320x480.png`.

### 9.4 Regression pass (full original suite re-run on the fixed code)

| Suite | Result | Covers |
|---|---|---|
| `r2_t01_core` | 19/19 PASS | AC-01, AC-02, AC-04, AC-05, AC-06, AC-07, AC-08, AC-09, AC-10, AC-12, AC-14, FR-001/002/003/005/014/017, hit tolerance |
| `r2_t02_progress` | 13/13 PASS | AC-03, AC-15, AC-17, AC-18, AC-19, HOME/save rules, loading→title |
| `r2_t03_resize` | 5/5 PASS | AC-20, AC-21, small grid, R-011 |
| `r2_t04_idle` | 7/7 PASS | AC-11, AC-28, FR-011 repeat |
| `r2_t05_complete` | 5/5 PASS | AC-16, AC-26, AC-27, AC-29, Replay |
| `r2_t06_edge` | 5/5 PASS | AC-13, AC-22, AC-23, AC-25 |
| `r2_t07_ax_stack` | 19/19 PASS | AC-24, stack checks, R-003/004/008/013/014, FR-007/010/013 |
| **Total** | **73/73 PASS** | all 29 ACs re-verified on the fixed code |

Spot values: AC-04 match — both cards opacity `0.7`, check opacity `1`, pip 1 `matrix(1,0,0,1,0,0)`, `matchedCount 1`; AC-11 — hint at 11 788 ms halos `[1,4]` + `vo_target` 0.9, halo anims 1000 ms ×3, selected card → halo `[5]`; AC-12 — `tabSeq [homeBtn, card1, card2, card3]`, Enter selects 3, Space on card 4 starts teaching, focus outline `4px solid rgb(62,44,30)`; AC-13 — two simultaneous touch points, only the first processed; AC-16 — `complete`, trophy 200×200, 60 particles, save `{8,8}`; AC-17 — HOME during celebration → `title` in 29 ms, save `{2,1}`, still title 2.7 s later; AC-19 keyboard mid-hold `stroke-dashoffset=169.661px`, completion clears the key and shows the checkmark; AC-21 — 320×480 level 8 card 66 px, `pipSize "8px"`, all 16 cards hit-tested and tapped (16/16), no scroll.

**Console / stack / hygiene on the fixed code:** console errors and warnings empty across every re-run (`r2_t01`–`r2_t03` report `[]`; `r2_console.mjs` exercised hold, mismatch, match, empty tap, two resizes, keyboard focus/activation and Escape → `consoleErrors: []`). Resources still only `styles.css` + `game.js`; network requests only the page + those two files; `script type="module"`; exactly one localStorage key `spec.matchingGames.v1`; 0 canvases; `window.__pairUp` hook present; no cross-game imports; game directory still 3 files. Stack conformance unchanged.

### 9.5 New defects

**None found.** Harness notes: the `r2_t03` script still carries a stale explanatory note string mentioning the old 7.75 px value (the authoritative measurement in that run is `pipSize "8px"`, and `r2_d3.mjs` measured 8 px exactly); the earlier M-4 "pip fill 4 px" remains not reproducible as described (fill = pip size, 10×10 at ≥480 px).

### 9.6 Re-verification verdict

- **D-1 FIXED** (Repro A and Repro B pass; clean keyboard/pointer holds still reset; early and outside releases cancel).
- **D-2 FIXED** (real hidden-tab visibilitychange recovery, simulated hidden path, and blur path all recover; normal taps work).
- **D-3 FIXED** (exactly 8 px, centered, no scroll; 10 px unchanged at wide viewports).
- **No regressions**: 73/73 original checks pass on the fixed code, console clean, stack unchanged, hashes match the fix report.
