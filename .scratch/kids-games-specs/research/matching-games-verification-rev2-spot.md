# matching-games — independent spot-verification (rev2, post-fix)

**Verifier:** fresh-context subagent (did not build the game, did not write the fixes; this pass tested
only the ACs assigned to it). **Date:** 2026-09-27.
**Artifact under test:** `games/matching-games/` — `index.html`, `styles.css`, `game.js`.
**Spec:** `docs/khan-academy-kids-games/specs/matching-games.md` (v1).
**Pre-fix verification (method/AC reference):** `matching-games-verification-report.md`.
**Fix round:** `matching-games-fix-report.md`.

## 1. Revision and hash confirmation

`shasum -a 256` on the working tree **matches the fix report's "After" column exactly**:

| File | sha256 (this pass) | Fix report "After" |
|---|---|---|
| `index.html` | `dce9a3834ab83cf09c64d1e608a4ce3f9e73c2ff812960ef144006d0d0da9ddf` | `dce9a383…9ddf` (unchanged) |
| `styles.css` | `138d103ba7a1977cce28e1c7fa55fecda3ef8e4bcc556e301e42d05f3b76edb8` | `138d103b…edb8` |
| `game.js` | `31e273e5976fe074ff6aed5c571cf595f966a079f213c645026b044af4edbe67` | `31e273e5…be67` |

## 2. Method

- Static server: `python3 -m http.server 8126 --bind 127.0.0.1` from the repo root →
  `http://127.0.0.1:8126/games/matching-games/`.
- Headless Chrome `153.0.8010.53` (`--headless=new --remote-debugging-port=9336
  --user-data-dir=<tmp>/profile --no-first-run --no-default-browser-check --disable-gpu
  --window-size=1024,768`), Node `v26.1.0`, hand-written CDP client (Node built-ins only).
- **Real input only**, through Chrome's input pipeline: `Input.dispatchMouseEvent`,
  `Input.dispatchTouchEvent` with `Emulation.setTouchEmulationEnabled` (both touch points in one
  `touchStart` for AC-13). No synthetic DOM event dispatch.
- Independent instrumentation injected from a pre-document script (browser APIs, not game internals):
  `speechSynthesis.speak/cancel`, `AudioContext.prototype.createOscillator` +
  `frequency.setValueAtTime/exponentialRampToValueAtTime` + `OscillatorNode.start`,
  `Element.prototype.animate` (target, keyframes, timing), and window
  `pointerdown/up/cancel` trace. The game's read-only `window.__pairUp` hook was used for state/style
  reads, never as the only evidence for a behaviour.
- Per page: `Runtime.consoleAPICalled`, `Runtime.exceptionThrown`, `Log.entryAdded` captured from
  before navigation; `Network.requestWillBeSent` and `performance.getEntriesByType('resource')`
  checked separately.
- Harness kept **outside the repo** in
  `/private/var/folders/j7/sjlw7b1579j821nvs72mph5h0000gn/T/opencode/mg-spot-ctR59z/`
  (`lib.mjs`, `run.mjs`, `extra.mjs`, `results.json`, `run5.log`, `extra.log` — re-runnable with
  `node run.mjs` / `node extra.mjs`).
- **Not re-tested** (already re-checked on this revision by the orchestrator): D-1/D-2/D-3, AC-12,
  AC-19, AC-21, console, resources on their pass; this report covers the remaining regression surface
  (AC-02/03/04/05/11/13/16/17) plus one independent hash/console/resource confirmation.

## 3. Result

**8/8 assigned ACs PASS, 0 FAIL, 0 not testable. No new defects found.**
Every test used real input; each test page was a fresh tab with an isolated init script set; saves
were seeded or cleared at document start so each AC ran in its specified precondition.

---

## 4. Per-AC results with raw evidence

### AC-02 — first Play — **PASS**

- Before any gesture (state `title`): `speakLog: []`, `audioLog: []`,
  `voiceState: {supported:true, unlocked:false, ctxState:null}` → no audio before the gesture.
- Real mouse click on Play → state `playing`, level 1; 6 cards; token order `fx fg lf fx fg lf`;
  pair ids `A B C A B C`.
- Rendered DOM card names (aria-labels): `Card 1 of 6, fox, not matched` … `Card 6 of 6, leaf, not
  matched` in exactly that order; rendered glyph markup slot 1 == slot 4 (fox pair) and slot 1 !=
  slot 2.
- Prompt card visible; 3 pips, all `matrix(0, 0, 0, 0, 0, 0)` (empty).
- Voice log: `[{cancel}, {text:"Find the pairs! Tap two cards that match.", volume:1, rate:0.92,
  pitch:1.08, lang:"en-US"}]`; after the click `voiceState {unlocked:true, ctxState:"running"}`.
- Board label `Card board, 6 cards, 3 pairs`.

### AC-03 — seeded level 5 — **PASS**

- Seeded `{highestUnlocked:5, levelsCompleted:4, updatedAt:"2026-09-01T00:00:00.000Z"}`; at title
  `getSave()` returned `highestUnlocked:5, storageOk:true`. Play → **level 5** (resume point).
- 10 cards, 5 pairs, 5 empty pips; board label `Card board, 10 cards, 5 pairs`.
- Slot order as rendered (slot/pair/token/variant):
  `1/A/sh/icon, 2/B/lf/icon, 3/C/mn/icon, 4/D/fx/shadow, 5/E/bz/shadow, 6/C/mn/icon,
  7/E/bz/shadow, 8/A/sh/icon, 9/D/fx/shadow, 10/B/lf/icon` = Table B `A B C D E C E A D B`.
- Slot labels 4/5 are `shadow of a fox` / `shadow of a bee`; rendered shadow `<g opacity="0.85">`
  contains only `#3E2C1E` (flat silhouette), per §8.

### AC-04 — select card 1, match with card 4 — **PASS**

- Card 1 tap: class `card selected`, computed lift `matrix(1, 0, 0, 1, 0, -6)`, ring opacity `0.9`,
  and `sfx_pick` = triangle `set 780 → ramp 540`; exactly one card selected.
- Card 4 tap: both cards `card matched`; `matchedSlots [1,4]`, `matchedCount 1`, selection cleared.
- White flash: WAAPI `DIV.flash-white[slot=1]` and `[slot=4]`, 450 ms, keyframe peak `opacity 0.25`;
  live computed samples reached `0.236092` on both.
- Check stamps: `svg.check[slot=1]` and `[slot=4]`, 200 ms, `scale(1.4) rotate(-10deg)` →
  `scale(1) rotate(0deg)`; final computed check opacity `1` on both.
- Dim: `.card-inner` computed opacity `0.7` both (match settle); pip row
  `["matrix(1, 0, 0, 1, 0, 0)", "matrix(0, 0, 0, 0, 0, 0)", "matrix(0, 0, 0, 0, 0, 0)"]`
  with pip-fill animation 150 ms `scale(0) → scale(1)` on pip 1.
- Audio: `vo_match` `"A pair!"` volume 1; `sfx_pop` sine `300 → 900`; `sfx_chime` at
  `1046.5 / 1318.5 / 1568` Hz.

### AC-05 — mismatch card 1 → card 2 — **PASS**

- Immediately after the card-2 tap: state `teaching`, `anchorSlot 1`, `selectedSlot 1`; card 2 class
  back to `card` (settled, unmatched); card 1 stays `card selected` with lift `-6` and ring `0.9`.
- Wiggle: `DIV.card-inner[slot=1]` and `[slot=2]`, 300 ms, keyframes `0° → −6° → +6°` twice.
- Coral flash: `DIV.flash-coral[slot=1]` and `[slot=2]`, 450 ms, peak `0.7`; live computed samples
  reached `0.699949` on both.
- Voice: `"Those don't match. Try again!"`, volume 0.8999999761581421 (float32 of 0.9); sfx
  `sfx_soft_buzz` sine `240 → 150`.
- Anchor ring pulse: `DIV.ring[slot=1]`, 300 ms, `scale(1) → 1.08 → 1`, logged inside the 600 ms
  window after the tap.
- Still `teaching` at ~1010 ms; back to `playing` at **1225 ms** after the tap; card 1 still selected
  (lift `-6`, ring `0.9`); `matchedCount 0`, all pips empty (no progress lost).

### AC-11 — idle 12 s hint — **PASS**

- Hint 1 (no selection): fired at **12 052 ms** of idleness; halos exactly `[1,4]` (first unmatched
  slot 1 and its partner 4); halo animations `DIV.halo.on[slot=1]` and `[slot=4]`, 1000 ms × 3
  iterations; live halo opacity `0.9` both; `vo_target` replayed at volume 0.8999999761581421; no new
  sfx (audio log still only the Play-press `sfx_tap`).
- Input resets the timer: empty tap at (700,40) hitting `HEADER.topbar` — deadline
  `7 932 ms → 11 907 ms`.
- With card 2 selected: next hint fired at **12 062 ms**; halos exactly `[5]` (partner only); card 2
  still selected; `matchedCount 0`, pips empty; `vo_target` replayed at 0.9.

### AC-13 — two simultaneous touches — **PASS**

- One real `touchStart` with two touch points (one per call) → pointer trace, both `type: touch`:
  `down id 2 @ (356,366)` then `down id 3 @ (512,366)`.
- Only the first pointer-down processed: `selectedSlot 1` (matches the first down's card); the second
  pointer's card untouched, state `playing`, no teaching and no voice change.
- While both were held: no `pointerup`; still exactly one selected.
- `touchEnd` delivered releases for both ids (2 `up` entries).
- A fresh touch on card 2 afterwards was processed (`teaching`, anchor 1) — picks resume after release.

### AC-16 — level 8 completion — **PASS**

- Seeded `{highestUnlocked:8, levelsCompleted:7}`; Play → level 8, 16 cards / 8 pairs; all 8 pairs
  matched with **16 real mouse taps** (pair pairing confirmed by order:
  `[1,12] [2,16] [3,9] [4,15] [5,10] [6,14] [7,11] [8,13]` = Table B order, 8/8 matched).
- On the last pair: state `celebrating`; save written at that moment:
  `{"highestUnlocked":8,"levelsCompleted":8,"updatedAt":"2026-09-27T20:36:49.062Z"}`; 40 confetti
  particles.
- Celebration ends → state `complete`; complete screen visible (title hidden); trophy
  `getBoundingClientRect` = 200 × 200 at (412, 222); 60 confetti particles; `vo_complete`
  `"You matched every single pair!"` volume 1; save refreshed
  `…"updatedAt":"2026-09-27T20:36:51.579Z"`; HOME + Replay (`Play again`) visible.

### AC-17 — HOME during celebration — **PASS**

- Level 1 completed with real taps; celebration save
  `{highestUnlocked:2, levelsCompleted:1, updatedAt:"2026-09-27T20:36:55.033Z"}`.
- HOME clicked ~250 ms into the celebration → state `title`; save **rewritten** with
  `updatedAt:"2026-09-27T20:36:55.343Z"` (refresh proves the HOME save), memory copy identical.
- At **2 802 ms** after the last match (past the 2.5 s auto-advance deadline) the game was still
  `title`, session level still 1 — the celebration timer was cancelled and level 2 never started.

---

## 5. Console and resources (independent confirmation)

- **Console:** all 8 test pages captured **zero** `console.*` error/warning entries, zero
  `Runtime.exceptionThrown`, zero error/warning `Log.entryAdded` (capture enabled before each
  navigation). The capture pipeline was validated on an extra page: a deliberate
  `console.error('__probe_error__')` / `console.warn('__probe_warn__')` were both recorded, so the
  "clean" result is not vacuous.
- **Resources** (two independent methods):
  - `performance.getEntriesByType('resource')` = `styles.css`, `game.js` only (checked on a
    level-1 page and on the level-8 page).
  - `Network.requestWillBeSent` over load + Play + a match: only `index.html`, `styles.css`,
    `game.js` (no favicon request — data-URI icon). R-008 unchanged.

## 6. Not testable / limitations

1. **Audible output** — headless Chrome has no audio sink. Speech text/volume and oscillator
   type/frequency/envelope were instrumented; timbre/TTS rendering was not heard.
2. **Physical multi-touch hardware** — AC-13 used Chrome's real touch input pipeline with touch
   emulation (two points in one `touchStart`), not a physical touchscreen; pointer ids are CDP ids.
3. **Other engines** — only Chrome 153.0.8010.53.
4. No AC item in this assignment was untestable; no whole-AC was skipped.

## 7. Notes

- AC-13's working-state check ("card 2 returns to unmatched") is asserted from class/state reads, not
  from sampling a settle animation, because the settle is a CSS transition on class removal; the
  class and lift/ring values are the observable surface.
- No spec ambiguity was newly exercised in this pass; the fix-report's noted limitations (real
  OS blur, hidden tab, non-Chrome engines) remain open but are outside this assignment.

**Bottom line: 8/8 assigned ACs PASS (AC-02, AC-03, AC-04, AC-05, AC-11, AC-13, AC-16, AC-17);
0 FAIL; 0 not testable; new defects: none. Hashes match the fix report "After" column; console clean;
offline resource list unchanged.**
