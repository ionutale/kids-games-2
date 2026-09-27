# matching-games — static code review

**Artifact:** `games/matching-games/` (untracked working tree: `index.html` 7,305 B, `styles.css` 6,438 B, `game.js` 45,258 B / 1,206 lines)
**Spec (binding):** `docs/khan-academy-kids-games/specs/matching-games.md` (17 FRs, 29 ACs, Tables A/B, sections 6–12)
**Stack contract:** `docs/khan-academy-kids-games/stack-decision.md`
**Review type:** static only — source, robustness, a11y (static parts), spec traceability. A separate live verifier owns behavioural testing.
**Reviewer:** subagent code review, read-only (only this file was written).

---

## Strengths

- **Tables A and B are reproduced exactly, slot by slot.** `LEVELS` (game.js:154-172) matches Table A pairs/variants and Table B slot orders for all 8 levels, including the `pose`-only-for-asymmetric-tokens rule (fx/bz/wl/sh) and both wide/narrow grids. I checked every order string character by character against the spec (e.g. L5 `ABCDECEADB`, L6 `ABCDEFCAFEDB`, L8 `ABCDEFGHCEGAHFDB`) and every pair letter appears exactly twice. `buildLevel` (game.js:424-433) turns them into slots 1..N with no runtime randomness — R-014 holds.
- **Section 8 layout math is faithful and reproduces the spec's own examples.** `computeLayout` (game.js:208-234): top bar 144/104, `playW = min(960, W−48)` / `W−32`, `playH = H − topBar − 24`, gap 16/12/8, `card = max(64, min(140, min((playW−(C−1)gap)/C, (playH−(R−1)gap)/R)))`, prompt 140/96, pips 10/8 at 5/4. At 320×480 this yields level 8 = 66 px and level 5 = 64 px (I recomputed both) — exactly the spec's numbers.
- **Timers are wall-clock deadlines with a visibility drain** (game.js:241-263), which is the right shape for R-013; expired timers fire exactly once and the idle hint re-arms. Timer callbacks are individually try/caught.
- **Degradation paths are genuinely implemented, not stubbed:** storage probe + write fallback (game.js:368-398), `AudioContext` guard (game.js:278-293), `speechSynthesis` feature check (game.js:273), silent `blip` guard (game.js:311), per-effect try/catch. R-007/R-010/FR-017 are satisfied at the source level.
- **State machine transitions map 1:1 onto section 6**, including the awkward ones: teaching re-target (FR-007, game.js:972-984), teaching → match returning explicitly to `playing` before matching (game.js:977-981), matched-card FR-008 pulse (game.js:964-970), celebrating→next-level/complete split (game.js:909-912), Replay ≥500 ms guard (game.js:1004-1005).
- **Input arbitration is sound:** 12 px inflation + nearest-centre with lower-slot tie-break (game.js:942-954), first-pointer-wins with "after all pointers released" semantics (game.js:1013-1015), buttons matched before the board so control taps never fall through (R-016, game.js:1017-1022), AT `click` (`detail === 0`) handled separately from real pointer input (game.js:1063-1072).
- **Focus management is deliberate**: focus target is resolved before subtrees are hidden (game.js:691-706), tab order follows the spec in every state (game.js:714-722), and cards are removed from the tab order while the board is frozen.
- **Accessible names are built exactly per section 7** (`cardAccessibleName`, game.js:481-490): slot, token, variant ("shadow of a frog", "mirrored fox"), state ("selected"/"matched"/"not matched"), plus the board group label (game.js:502).
- **No network, no dependencies, no build step, original assets only.** Only relative `styles.css`/`game.js`; the sole `http` string is the SVG namespace inside a data-URI favicon. No `fetch`/`import`/CDN/font requests; key is `spec.matchingGames.v1` (R-008, stack §1/§5/§7).

---

## Issues

### Critical (Must Fix)

**C-1 — The 3 s reset hold is never cancelled when the game leaves `title`, and key-up cancellation is coupled to focus. `startLevel`/`showTitle` can therefore let a partially-completed hold fire `completeHold()` and wipe the save (silent progress loss).**
`game.js:1077-1088` (hold timer), `game.js:1101-1116` (`completeHold` → `clearProgress()`), `game.js:793-814` (`startLevel`), `game.js:784-791` (`showTitle`), `game.js:1057-1061` (`onKeyUp`).

- What is wrong:
  - `beginLogoHold()` schedules `s.holdTimer = after(T_HOLD, completeHold, 'hold')` (game.js:1087). Nothing else ever cancels the `'hold'` tag — `cancelTag('hold')` does not exist anywhere in the file, and neither `startLevel` nor `showTitle`/`goHome` call `endLogoHold()`. `completeHold()` itself does not check that the game is still on `title` (game.js:1101).
  - `onKeyUp` only cancels the hold when `document.activeElement === logoBtn` (game.js:1059). If focus moves while Enter/Space is still held, the keyup is ignored and the timer keeps running.
- Reachable sequences (all with ordinary inputs):
  1. On `title`, Tab to the logo, hold Enter ~1 s, press Tab (focus moves to Play), release Enter → 3 s after the press `completeHold()` fires: the save key is deleted, the in-memory progress resets, `sfx_soft_tap` plays.
  2. Hold Enter/Space on the logo, press Tab then Enter (starts a level) or click Play, release the key → the reset fires **mid-level**; the child's unlocked levels are gone and the next Play starts at level 1.
- Why it matters: this is the one write path in the game that destroys user progress, and the spec guards it with "hold ≥3 s on logo" / "Releasing early cancels the ring" (FR-016, section 6 `RESET_HOLD`, section 10). The guard is enforced only by pointer history/focus, not by the hold itself. A curious child pressing keys can silently lose the resume point; the checkmark and sound even confirm the reset.
- How to fix (defence in depth):
  1. Cancel the hold whenever the game leaves `title`: call `endLogoHold()` at the top of `startLevel()` and in `showTitle()`, and/or guard `completeHold()` with `if (!logoHold.active || s.state !== 'title') return;`.
  2. Make `onKeyUp` cancel on any Enter/Space keyup while `logoHold.active`, independent of `document.activeElement` (record which input source started the hold, e.g. `logoHold.source = 'key' | 'pointer'` — that field already exists unused at game.js:1075).
  3. Add `window.addEventListener('blur', …)` → clear `activePointers`, `endLogoHold()` (also fixes I-1).

### Important (Should Fix)

**I-1 — A lost `pointerup`/`pointercancel` permanently disables all input (stale id in `activePointers`).**
`game.js:462`, `game.js:1013-1015`, `game.js:1029-1032`.

- What is wrong: `activePointers` is only mutated by `pointerdown` (add) and `pointerup`/`pointercancel` (delete). There is no `blur`/`visibilitychange` recovery and no `setPointerCapture` on the logo. If a release is never delivered — pointer down while the OS window loses focus (Alt-Tab, notification, window manager grab) and released elsewhere, or a stylus/ABI edge — the id stays in the set; then `activePointers.size === 0` is never true again and every subsequent pointer-down hits `if (!first) return;` (game.js:1015). Cards, HOME, Play, Replay: all taps are ignored until the page reloads. A stuck hold from the same cause is covered by C-1.
- Why it matters: R-002's first-pointer-wins is implemented, but a single missed release converts it into "game stops responding", with no on-screen recovery. Kids in shared/touch environments hit window-focus changes often.
- How to fix: on `window` `blur` (and `document.hidden` via `visibilitychange`) do `activePointers.clear(); endLogoHold();`. Consider `logoBtn.setPointerCapture(e.pointerId)` when a hold starts so the release is guaranteed to be delivered, and a defensive `lostpointercapture` handler.

*(No other Important-severity issues found: storage/audio/speech failure paths, listener lifecycle, resize mid-state, keyboard activation and the debug hook were all checked and are sound; see Minor for small notes.)*

### Minor (Nice to Have)

**M-1 — `hintAnims` grows without bound while the user idles on `title`/`complete`.**
`game.js:613-618` (`clearHints`), `game.js:771-778` (`pulseControl`), `game.js:620-633` (`haloSlot`).
Each hint pushes animation objects that are only spliced on a state change; a hint fires every 12 s forever (AC-28/AC-29 explicitly test repeat hints). Idling on the title for an hour leaves ~300 dead `Animation` objects retained. Harmless in practice but trivially fixable: drop finished entries (e.g. `anim.finished.then(() => anims.delete(anim))`) or cap the array.

**M-2 — `idleFired` schedules its replacement timer twice.** `game.js:738` and `game.js:756`.
`resetIdle()` is called at function entry and again at the end; the second call cancels the first, so behaviour is correct — but it is confusing and easy to break later (e.g. if the state branches early-return). Keep one call (the top one is dead for every path).

**M-3 — `getLevel()` breaks the hook's "read-only" contract by handing out live references.**
`game.js:1150-1160`; `getLevel: () => ({ … pairs: cfg.pairs, cards: cfg.cards … })`.
`cfg.pairs`/`cfg.cards` are the game's live arrays; a verifier or future test doing `__pairUp.getLevel().cards.pop()` would mutate a level mid-play (`hintTargets`, `partnerOf`, labels). Return `structuredClone`/`map` copies like `getSession`/`getSave` do. (Everything else on the hook, including `clearLog`, only touches debug state — I found no behavioural effect in the hook.)

**M-4 — The pip fill is 4 px wider than the pip.**
`styles.css:142-148` (`.pip .fill { inset: -2px }`).
Spec §9 defines "pip fill ⌀10 circle scale 0→1" (⌀8 narrow). The ring is a 10 px/8 px border-box element, so the filled dot is ⌀14/⌀12 and overlaps the ring stroke. Use `inset: 0` (or make the ring an outline/box-shadow) to match the effect definition.

**M-5 — `:focus-visible` overrides every element's corner radius to 14 px.**
`styles.css:92-96`.
The rule sets `border-radius: 14px` on the focused element, so a focused card (radius `0.12 × card`, e.g. 16.8 px at card = 140) visibly changes shape on focus, and the 128 px logo button loses its 22 px radius. Move the radius rule into `.icon-btn:focus-visible`/`.logo-btn:focus-visible` or delete it — the outline itself is correct (4 px ink, high contrast).

**M-6 — Screen-reader users get no announcement when a card's state changes.**
`game.js:492-497` updates `aria-label`, but with no live region or `aria-pressed`/`aria-selected`, a child who selects or matches a card hears nothing until they re-navigate. The spec only requires the *names* to carry slot/token/state (they do, and AC-24's static part passes), so this is an enhancement: a polite live region announcing the board label (or the matched count) would make the game self-voicing for AT users.

**M-7 — Keyboard and AT activation can, on some browsers, press twice.**
`game.js:1034-1063`.
`onKeyDown` calls `e.preventDefault()` and presses; `onClick` separately handles `detail === 0`. In Chrome/Firefox/Safari `preventDefault()` on Enter/Space keydown suppresses the synthetic click, so this is a non-issue there — but if a browser or AT still emits the detail-0 click after the key press, Play would restart the just-started level and Replay would restart level 1. Cheap hardening: record `lastActivationAt` per control and ignore a detail-0 click within ~350 ms of a keyboard press. Low confidence; verify on Safari before deciding.

**M-8 — WAAPI SVG-stroke animation for the hold ring is only proven on Chrome.**
`game.js:1082-1085` animates `strokeDashoffset`; `styles.css:278-289` provides the fallback values. Chromium handles this; Safari/Firefox support animating SVG CSS properties, but the build report states only Chrome was available. If a platform ignores the keyframe, the timer still completes and the save still clears with no visible ring — a silent failure of FR-016's visible feedback. Worth a one-minute manual check in Firefox and Safari.

**M-9 — Token drawings exceed the §8 "3–6 primitives" guidance when detail elements are counted.**
`game.js:56-151`. Counting all SVG elements per drawing: fox 7, frog 8, owl 8, starfish 7 (shape + interior detail), while leaf/moon/cloud are 3 and the rest ≤6. Counting only the identity shapes, every drawing is 1–5 and complies. The reading is ambiguous and composition is "build freedom", so treat as a nit — but a future spec polish could say "identity shape ≤6 primitives".

**M-10 — Dead/vestigial code.** `game.js:1075` (`logoHold.source` never written or read); `game.js:1115` (`holdRingFill.style.strokeDashoffset = ''` resets a style that is never set to a value — the WAAPI fill and the class removal already do the work); `game.js:46`/`styles.css:12` (`PALETTE.blue` / `--blue` and `--success` unused); `game.js:1105` (`endLogoHold()` called from `onKeyUp` with a `false` argument the function does not accept).

---

## Declined to judge

Behaviours I considered and deliberately set aside, with the reason:

1. **`music_loop` omitted** — spec §11 marks it optional ("may be omitted"); all sfx and voices are implemented.
2. **`prefers-reduced-motion` not implemented** — neither the spec nor the stack mentions it; the build report discloses it.
3. **Pinch-zoom / `touch-action` policy** — stack/spec only require tap input; `touch-action: manipulation` (styles.css:48) is a reasonable choice.
4. **Non-primary mouse buttons ignored and not counted as idle-resetting input** — spec defines primary pointer/click input (game.js:1010); secondary buttons are undefined territory.
5. **Sound timbre, TTS engine/voice/locale, waveform shapes and the extra per-blip amplitude** — explicit build freedom ("Timbre, language, and TTS engine are build freedom"; stub policy allows WebAudio blips).
6. **Confetti particle specifics (sizes, drift, per-particle durations shorter than the nominal window, deterministic seeded PRNG despite "no runtime randomness")** — particle specifics are build freedom and the PRNG is not level content; caps 40/600 and 60/900 are respected (game.js:646-668, 901, 920).
7. **Focus target chosen after a state change (HOME or first control)** — not specced; build report documents it, and it makes the specced tab orders usable (game.js:691-706).
8. **Card decoration (check badge bottom-right at 40 %, token colour assignment, 3 px ink borders)** — composition within the layout numbers is build freedom; the spec's palette is respected.
9. **Control rectangles are not inflated by the 12 px tolerance** — §7's tolerance clause is about card rectangles; controls are ≥64 px, and not inflating them avoids accidental HOME presses (game.js:1017-1024).
10. **`<title>Play</title>` and the data-URI favicon** — the provenance rule covers on-screen text and audio; the document title is not on-screen and the favicon is original inline art with no request.
11. **"Missing visual → draw a stub shape, log a warning"** — vacuous here: every visual asset is inline SVG/CSS, so there is no load-failure path to exercise (build report §6 states the same).
12. **A `say()` queued via `requestAnimationFrame` while the tab is hidden never speaks** — R-013 covers timers/progress, and all feedback has a visual channel (R-010); not a spec obligation.
13. **No announcement of dynamic card state to AT** — the spec requires only that the invisible names *carry* the state (FR-015/§7); the enhancement is M-6.
14. **`loading` lasts two animation frames** — all assets are inline, so "preload assets" has nothing to await; the blank-state requirement (SC-01) is met for those frames.
15. **Right-click/context menu suppression, drag suppression, user-select suppression** — defensive choices the spec does not require but does not forbid.
16. **Whether the title idle hint may speak after the first gesture** — spec says "no audio" for the title hint; the build keeps it silent forever, which is the safe reading (build report ambiguity 7).
17. **`vo_praise` for the level-8 celebration vs `vo_complete`** — spec §9's table/AC-15/AC-16 are consistent with what the code does (game.js:907, 922).
18. **Browser/device matrix beyond Chromium (Firefox, Safari, iOS/Android, real screen readers)** — the live verifier and build report were Chrome-only; I flag the one static risk I could see as M-8 rather than judging platforms I cannot run.
19. **Exact rendered pixel sampling of transitions (easing curves, mid-animation values)** — runtime behaviour, owned by the live verifier; I checked the source numbers only.
20. **Level-4 verification by the build report via "the AC-03/AC-20 path"** — I closed that gap statically: level 4's Table A pairs and `ABCDBADC` order are correct.

---

## Reconciliation with the build report

(`.scratch/kids-games-specs/research/matching-games-build-report.md`)

**Confirmed in source:**
- File list, sizes, inline-only assets, no build step/dependencies/network — confirmed (the only network-shaped string is the SVG namespace in the data-URI favicon).
- "Debug hook is read-only, no behavioural effect" — substantially true; caveats in M-3 (`getLevel()` live references) and the `log()` ring buffer running in normal play (bounded at 400, negligible).
- Ambiguity resolutions 3 (card_slot via CSS), 5 (explicit return to `playing` before matching in teaching), 6 (focus resolved before hiding, game.js:691-706), 10 (shadow re-fills strokes and drops detail; pose mirrors about the 256 artboard centre — `tokenSvg`, game.js:471-479), 11 (audio unlocks on first pointer/key anywhere), 12 (rAF + sequence guard in `say`), 13 (wall-clock scheduler + visibility drain), 14 (storage probe and in-memory fallback) — all present exactly as described.
- "Section 8 card-size numbers reproduce exactly (level 8 @320×480 = 66 px, level 5 = 64 px)" — I recomputed both: correct.
- Missing `music_loop` is by choice, and spec-legal.

**Builder claims I could not confirm (and what I found instead):**
- "All 29 acceptance criteria pass. No blockers." I cannot confirm behaviourally (by design), and statically every AC has a plausible implementation path — **except** that the ACs never exercise the C-1/I-1 input paths: AC-19 tests a pointer hold and a keyboard hold *without* a focus change, and AC-13 tests simultaneous touches but never a missed release. Those two defects live outside the report's test matrix, which is why "all ACs pass" is compatible with both.
- "Every edge case in FR-010 behaves as specified" — true for the enumerated bullets, but the spec's "releasing early cancels the ring" (FR-016) is violated on the keyboard variant (C-1). The report's FR-010 extras list does not mention key-hold/focus interactions.
- The level-4 slot data is asserted as verified "by the AC-03/AC-20 path" (i.e. indirectly); I verified it directly — it is correct.

**Things the build report missed (all in this review):** C-1 (uncancelled reset hold / data loss), I-1 (stale pointer lockup), M-1…M-10. It also does not flag the token-primitive count reading or the pip-fill size.

**Report claims that are weaker than stated:** "read-only `window.__pairUp`" should say "read-only apart from `clearLog`", and note that `getLevel()` returns live references (M-3).

---

## Recommendations

1. **Fix C-1 first** (cancel the hold when leaving `title`; focus-independent keyup; `blur` handler). This is the only path in the codebase that destroys progress; it deserves a regression check in the live suite: keyboard-hold → Tab → release, then assert the save survives.
2. **Add the `blur`/`hidden` recovery from I-1** in the same change — it is three lines and removes the only total-input-loss state.
3. **Make the debug hook honestly read-only** (M-3) before other games adopt the pattern: deep-copy `getLevel()`, and document `clearLog` as the sole write.
4. **Small visual polish pass:** pip fill `inset: 0` (M-4), scope the focus radius (M-5), trim dead code (M-10), drop the duplicate `resetIdle()` (M-2).
5. **Cross-browser spot check** of the hold ring (M-8) and the keyboard/AT double-press path (M-7) on Firefox and Safari; neither is provably broken, both are cheap to verify and cheap to harden.
6. **Accessibility follow-up (optional, spec-silent):** a polite live region for match/select feedback (M-6) would make the "screen-reader users can play the matching game" intent (Assumption A8) fully real.

---

## Assessment

**Ready to merge? With fixes.**

Statistically the build is unusually faithful: all 17 FRs and 29 ACs have a matching implementation path, Tables A/B and every section 7/8/9/10 number I checked are exact, and the degradation/offline/stack contract is met without dependencies or network. The blocker is one input-lifecycle defect (C-1) whose failure mode is silent loss of the save and whose spec guard ("releasing early cancels the ring") is violated on the keyboard path — plus one smaller input-recovery gap (I-1). Both are small, local fixes; everything else is polish.

---

# Addendum — scoped re-review after fixes (2026-09-27)

**Scope:** the fixed working tree `games/matching-games/`, reviewed directly (untracked, no diff range). I verified the sha256 values match the fix report's "after" column exactly — `game.js` `31e273e5…be67`, `styles.css` `138d103b…edb8`, `index.html` `dce9a383…9ddf` (unchanged) — then inspected every changed region plus the surrounding code. `node --check game.js` passes. Findings here are limited to the fix changes; the untouched tables, layout math, state machine, save/audio paths and asset code are byte-identical to what I reviewed above.

## Per-finding verdicts

| # | Verdict | Where |
|---|---|---|
| C-1 | **ADDRESSED** | game.js:795, 805, 1082, 1124-1126, 1033 |
| I-1 | **ADDRESSED** | game.js:263-266, 1051-1054, 1152 |
| M-1 | **ADDRESSED** | game.js:634-639, 784-787 |
| M-2 | **ADDRESSED** | game.js:744-745 |
| M-3 | **ADDRESSED** | game.js:1185-1191 |
| M-5 | **ADDRESSED** | styles.css:90-93 |
| M-10 | **ADDRESSED** | game.js:1098, 1134-1140; styles.css:4-18 |
| M-4 | **ADJUDICATED** — false positive; my reading was wrong | styles.css:140-146 |

**C-1 — ADDRESSED.** `showTitle()` (game.js:795) and `startLevel()` (game.js:805) both call `endLogoHold()` as their first statement, and every transition out of `title` passes through one of them (`pressControl(playBtn)` → `startLevel`; `goHome()` → `showTitle()`; there is no other path), so a live hold can no longer survive leaving the screen. `completeHold()` now guards at game.js:1124-1126: `if (!logoHold.active || s.state !== 'title') { endLogoHold(); return; }` — a stray timer can no longer reach `clearProgress()`, and the guard's cancel path also removes the ring class and cancels the WAAPI fill. `onKeyUp()` (game.js:1079-1084) cancels on any Enter/Space release while `logoHold.active`, with no `document.activeElement` check; the stray `false` argument is gone. `setPointerCapture` (game.js:1031-1034, try/caught) guarantees the release for the pointer hold, and the window capture-phase `pointerup`/`pointercancel` path (game.js:1146-1148 → 1044-1047) still ends the hold. Ordering is clean: `endLogoHold()` no-ops when inactive (game.js:1113-1114), so the new first-line calls cost nothing on a normal Play/HOME press, and boot cannot hit a TDZ (the `logoHold` const at game.js:1098 is initialised during module evaluation; `showTitle` runs from a later rAF). Remaining inherent behaviour, not new: the timer can fire up to ~25 ms after 3.000 s due to the 25 ms scheduler, and a keyup racing the deadline resolves to whichever runs first.

**I-1 — ADDRESSED.** `recoverInput()` (game.js:1051-1054) clears `activePointers` and cancels the hold; it is wired to `window` `blur` (game.js:1152) and to `visibilitychange` when hidden (game.js:263-266), with the visible branch still calling `timerTick()` so R-013's expired-timer drain is preserved. The `blur` listener is deliberately non-capturing, so only the window's own blur triggers it — element blurs (focus moving between controls on a normal tap) cannot spuriously clear pointer state. After recovery the next pointerdown is again the "first" (game.js:1025-1027). Trade-off reviewed and accepted: if a pointer is still physically down when the window is interrupted, clearing the set means a later second pointer can be processed as first; that can only happen after a window-level interruption and is strictly better than the previous lock-up.

**M-1 — ADDRESSED.** `haloSlot()` (game.js:634-639) and `pulseControl()` (game.js:784-787) splice their animation out of `hintAnims` when `anim.finished` resolves, with `.catch(() => {})` for the `clearHints()` cancel path, which already empties the array (game.js:618). The list can no longer grow across repeat hints.

**M-2 — ADDRESSED.** `idleFired()` now has exactly one `resetIdle()` (game.js:744-745); the trailing call is gone. Since `timerTick` deletes the fired timer before invoking the callback, the entry call schedules exactly one successor.

**M-3 — ADDRESSED.** `getLevel()` (game.js:1185-1191) returns `pairs`/`cards` as per-element copies and `grid`/`smallGrid` as array copies; `def` is no longer exposed. Key shape is unchanged, so existing live-verifier reads keep working. (Remaining hook nit, unchanged from the main report: `clearLog()` is still the one hook method that writes, which the fix report's own wording acknowledges.)

**M-5 — ADDRESSED.** `border-radius: 14px` is gone from `:focus-visible` (styles.css:90-93); the 4 px ink outline with 3 px offset is retained, and card faces still carry `calc(var(--card) * 0.12)`. See N-1 for the one cosmetic consequence.

**M-10 — ADDRESSED.** `logoHold.source` removed (game.js:1098 is now `{ active, anim }`); the `holdReset` timer removed from `completeHold()`; `PALETTE.blue` removed from `PALETTE` (game.js:45-49) with all 11 referenced keys still defined (checked by grep — no dangling `PALETTE.*`); `--blue`/`--success` removed from `:root` (styles.css:4-18); the stray `false` argument to `endLogoHold()` removed. No references to any removed symbol remain.

**M-4 — ADJUDICATED (false positive; my error).** I treated `inset: -2px` as extending from the 10 px border box. Absolutey-positioned children resolve against the positioned ancestor's **padding box**, which for `.pip` is 6 px (⌀8) / 8 px (⌀10) because the 2 px ring is a border on a `border-box` element; `-2px` on each side therefore produces a fill of exactly ⌀8 / ⌀10 — flush with the ring's outer edge and matching §9's "pip fill ⌀10 circle". The verifier's live measurement was right and my reading was wrong; recorded as adjudicated, no further action.

## New findings in the fix code

**N-1 (Low, cosmetic, not a spec violation) — the focus outline is now square around a rounded card.** `styles.css:90-93` (M-5). Removing the shared `border-radius: 14px` also removed the only rounding the outline had; `.card` itself has no border-radius (the visible face at styles.css:187-194 does), so a focused card shows a 4 px square outline whose corners stick out past the rounded face. The spec's requirement — "4 px outline, ≥3:1 contrast against the board" — is still met, and the fixer verified the outline and the absence of the old radius morph. If polish is wanted: add `border-radius: calc(var(--card) * 0.12)` to `.card` so the outline follows the face; this is safe because nothing clips with `overflow: hidden` and the ring/flash/halo children already carry their own radius.

**Checked, not a defect:** `.pip { flex: 0 0 var(--pip) }` (`styles.css:134`) pins the border-box diameter at 8/10 px, which restores §8's ⌀8 number and stops the F-3 shrink to 7.75 px. The 8-pip row is 92 px and centred; it therefore overflows the card's 90 px padding box by 1 px per side and paints over the faint innermost 1 px of the card's 3 px border. The fixer's live rects (`[114,206]` inside the card `[112,208]`, centres aligned to 0.000004 px) confirm this is invisible in practice, and it is the intended trade in favour of the specced pip size.

Also re-checked while inspecting the changed paths: the `completeHold` guard cannot block a legitimate reset (a legitimate hold has `active && state === 'title'` by construction — `beginLogoHold` requires `title`); the `visibilitychange` handler can reference the hoisted `recoverInput` declaration safely; pointer capture does not disturb the window capture-phase release handler, first-pointer-wins, or the `click`-with-`detail === 0` path (the logo is ignored there by design); and the Table A/B data, token art, state machine and save/audio code are untouched.

## Remaining concerns

- M-6 (live-region announcements for AT), M-7 (keyboard/AT double-press hardening), M-8 (hold-ring WAAPI on Firefox/Safari), M-9 (primitive-count guidance) — still open; the fix report explicitly defers them.
- `s.holdTimer` can retain a stale id after the `completeHold` guard's early return (game.js:1126). Harmless: `cancelTimer` is idempotent and `beginLogoHold` overwrites the field.
- Real OS-level blur / genuinely hidden tabs and non-Chromium engines remain untestable in this environment; the fix report's dispatched-event simulations are the strongest available evidence, and the code path they exercise is the same one I inspected.
- M-4 is closed as adjudicated (above); no further action.

## Updated assessment

**Ready to merge? Yes** (static verdict, scoped to my findings). C-1 and I-1 are fully addressed in the fixed source, every Minor finding I raised in that set is addressed, and I found no new functional defect in the changed code — the only new item is the cosmetic N-1 focus-outline shape. The fix report's 96/96 live suite (twice) plus its AC regression re-checks are consistent with what I can verify statically; final sign-off still belongs to the live verifier.
