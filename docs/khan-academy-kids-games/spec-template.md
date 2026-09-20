# Game spec template (v1 — locked)

The fixed structure every game spec follows. A spec that follows this template should let a
fresh-context LLM build a working, playable browser game from the spec alone, then verify it
against the spec's own acceptance criteria.

Status: **v1 — locked** (2026-09-20) after the pilot's blind build test (wayfinder tickets 03 and
04). The pilot spec [`specs/count-the-ice-cream-cones.md`](specs/count-the-ice-cream-cones.md) was
patched to match. Derived from the research findings in
`.scratch/kids-games-specs/research/llm-buildable-spec-conventions.md`; rules marked _(blind build)_
were added in v1 to close gaps the test surfaced.

## How to use this template

- Replace every instruction block with real content; delete instructions that do not apply and
  mark conditional sections that were omitted.
- Write numbers over adjectives: counts, sizes, durations, CSS pixel values.
- Use tables for anything repeatable (levels, assets, feedback, states).
- Give requirements IDs (`FR-xxx`, `SC-xxx`); keep them traceable into acceptance criteria.
- Never invent silently: unknown behavior is marked `[NEEDS CLARIFICATION: …]` or listed under
  Assumptions.
- Label every behavior claim `official` or `designed` (section 3).
- Keep the finished spec compact — tables over prose, one worked example per repeatable shape.

## 1. Front matter

> Title; entry type (game / activity / interactive player: song, video, book mode, collection);
> link to the catalogued entry file and its official source; spec status and version; last-updated
> date; one-line platform assumption.

## 2. Overview and learning objective

> 2–4 sentences: what the player does, the skill practiced, why it matters. Age band (2–5
> pre-reader / 6–8 early reader, per Apple/NN-g bands) and expected session length.

## 3. Official vs designed

> A table of behavior claims: which are `official` (traceable to the catalogued entry's official
> source) and which are `designed` (invented to make the entry buildable). One row per claim or
> claim cluster, with the source link for official rows and a one-line rationale for designed
> rows.

## 4. Player experience / core loop

> One short narrative pass through a perfect play session, plus the core loop in one sentence.
> This anchors every later section.

## 5. Mechanics and rules

> Complete interaction rules as numbered `FR-xxx` requirements: objects, player actions, win and
> advance conditions, what counts as correct, tolerances, retry semantics. Include explicit edge
> cases: double-taps, taps on empty space, rapid repeated taps, simultaneous touches, no input.
> For any `When/While/If` condition, prefer the EARS phrasing (`When …, the game shall …`).

## 6. Screens and states (conditional: omit for trivial single-state entries)

> A state inventory (one line per screen/state, including initial and terminal states) followed by
> a transition table: current state × event → next state, with guards and entry/exit actions.
> List the **tab order** for every state _(blind build)_. Define what HOME does in every state; the
> default is that HOME works everywhere, cancels any running timer, saves, and returns to the title
> _(blind build)_. Keep it a reviewable table, not a formal statechart.

## 7. Input and interaction

> Exact input model: pointer/touch targets and minimum sizes (≥44 CSS px baseline; larger for the
> youngest), drag gestures and their single-pointer tap alternative, **numeric** hit tolerance and
> mis-tap behavior (state the tolerance in px and the tie rule) _(blind build)_, simultaneous-touch
> handling, keyboard access and tab order, and how instructions reach a non-reader (audio +
> pictogram). Every interactive element carries an invisible accessible name; the no-reading rule
> governs visible text only _(blind build)_.

## 8. Levels and content data

> A level/round table with explicit parameters (counts, ranges, distractor counts, timing,
> randomization rules, seeds/backfill) and one worked example of level generation or layout.
> State the progression rule: what changes per level, when the next starts, what gates it, and
> whether progression is fixed or adaptive. Layout breakpoints and wrapping rules are **numbers in
> px**, never undefined adjectives like "narrow" _(blind build)_.

## 9. Feedback, rewards, and audio cues

> Event → visual feedback → audio feedback mapping, including incorrect answers, idle timeout,
> end-of-round celebration, and retry behavior. Audio must carry everything a non-reader needs.
> Give every audio cue a numeric volume and a one-shot/loop label — no unquantified "softer"
> _(blind build)_. State the interruption rule (a new voice clip cancels the previous utterance)
> _(blind build)_. No audio may play before the first user gesture _(blind build)_. State the
> degradation behavior for unavailable APIs: no speech synthesis → visual-only; no audio context →
> silent; storage blocked → run unsaved _(blind build)_. Background-tab timer throttling is
> documented as known behavior rather than left implicit _(blind build)_.

## 10. Progress and persistence

> What is stored between sessions, the storage class (e.g. browser local storage), the exact
> stored shape, the exact save points, whether timestamps refresh on every save _(blind build)_,
> reset behavior, and what is deliberately not stored. State that Play resumes at the highest
> unlocked level _(blind build)_. Reset is a deliberate hidden gesture with visible progress
> feedback during the hold (e.g. a filling ring) plus a keyboard equivalent _(blind build)_. No
> shared kernel: keep the surface minimal.

## 11. Assets (conditional per entry)

> A manifest table of original assets: stable key, type, description or generation guidance,
> size/format/duration, behavior (loop/one-shot), and whether a programmatic stub is acceptable.
> State that all assets are original. Include palette/typography tokens when visual identity
> matters.

## 12. State and data shapes (conditional: only when data-heavy)

> Compact schema of the level config object and save object: field names and types.

## 13. Requirements (engine-agnostic)

> EARS-style numbered statements covering: rendering primitives, input events, audio, data and
> storage, performance, offline behavior, accessibility constraints. These feed the aggregated
> platform requirements digest that the stack decision reads.

## 14. Acceptance criteria

> Given/When/Then scenarios whose `Then` is observable on screen or in audio (never internal
> state), covering the happy path plus every edge case from section 5, the resume behavior (Play
> starts at the highest unlocked level), and the reset flow _(blind build)_. End with a short
> blind-build checklist (e.g. "a fresh context can build from this spec and complete one full
> round without asking questions").

## 15. Assumptions and open questions

> Assumptions made to fill gaps, each attributed; `[NEEDS CLARIFICATION: …]` items the builder
> must not invent around.

## 16. Out of scope / build freedom

> What the builder may decide freely (composition, easing, art within tokens) versus what is
> fixed; what is explicitly not in this spec (profiles, navigation shell, parental controls,
> localization, analytics).

---

## Fidelity rules

- **Observe, don't infer.** Acceptance `Then` clauses name visible/audible outcomes only.
- **Numbers over adjectives.** Counts, sizes, durations, timings, target pixel sizes.
- **Data over prose** for anything repeatable: levels, assets, feedback mappings as tables.
- **One worked example** per repeatable shape, so the form is shown, not just described.
- **IDs + flags.** `FR-xxx`/`SC-xxx` traces requirements to acceptance criteria;
  `[NEEDS CLARIFICATION]` replaces plausible-sounding invention.
- **Determinism.** State what is random, its bounds, and any seed/backfill rule.
- **Provenance inline.** `official` vs `designed` at the claim level, not once at the top.
- **Fit one context.** Prefer compact tables; split an entry whose spec exceeds a few pages.
- **No reading required.** For ages 2–8, instructions and feedback are audio + pictogram; text is
  content (e.g. numerals), never the only path to understanding. Visible text only — invisible
  accessible names are required on interactive elements _(blind build)_.
- **Never punishing.** Mis-taps, random taps, and idle time never lose progress or end play.
  Idle timers reset on any input, including taps on empty space _(blind build)_.
- **Numeric thresholds only.** Any breakpoint, tolerance, volume, cap, or duration is a number;
  undefined adjectives are defects _(blind build)_.
- **No undefined effects.** A named effect (e.g. a "shimmer") must be defined in the spec before
  it can appear in a state action _(blind build)_.
- **Deterministic hints.** Idle hints target a deterministic object (e.g. leftmost uncounted)
  _(blind build)_.
- **Known limitations are named.** Platform behaviors that affect play (e.g. background-tab timer
  throttling) are documented, not left implicit _(blind build)_.
