# What makes a game spec reliably implementable by an LLM from the spec alone?

Research findings for ticket `Survey spec conventions for LLM-buildable game specs`
(`.scratch/kids-games-specs/issues/01-research-spec-conventions.md`).

**Question.** What section structure and fidelity make a game spec reliably implementable by a fresh-
context LLM with no extra information? Survey existing conventions: game design documents (GDDs),
testable acceptance criteria, interaction/state-machine specification, level/content data schemas,
asset manifests, accessibility guidance for kids, and emerging "specs for LLM code generation"
practice.

**Method.** Primary sources preferred: official product documentation (GitHub Spec Kit, AWS Kiro,
XState, Phaser, Apple, W3C, BBC), open-source code from an actual educational platform (Khan
Academy Perseus), peer-reviewed or first-party research (ACM CHI, IJHCS/MTAGIC, NAEYC/Fred Rogers
Center, DeepMind). Labels used throughout:

- **[Standard]** — published normative standard (W3C, WCAG, platform guidelines).
- **[Primary practice]** — first-party documentation of a tool/studio/curriculum actually using the convention.
- **[Research]** — peer-reviewed or institutional research.
- **[Synthesis]** — my recommendation; no direct source.

Internal repo context for the recommendation: the spec must support one fresh-context LLM building
one browser game; the spec is engine-agnostic and carries a `Requirements` section; each entry also
gets an "official vs designed" labeling; non-game entries become interactive players
(`.scratch/kids-games-specs/map.md`, `CONTEXT.md`).

---

## 1. Game design document (GDD) structures

- GDDs are conventionally described as "the blueprint from which a game is to be built: every single
  detail necessary to build the game should be addressed." An educational-games course outline lists:
  title page; game overview with **pedagogical objective**, intended use, target audience; mechanics
  (actions, interactions, content additions); **feedback for the player**; and development info.
  **[Primary practice / course template]** — [UNC Serious Game Design Document Outline](https://wwwx.cs.unc.edu/~pozefsky/seriousgames/NewDesignDocTemplate.pdf)
- Unity's official GDD template is organized as: technical specs (dimensions/platform), gameplay
  outline, design guidelines, game design definitions (how a player wins, loses, transitions between
  levels), a **game flowchart** (objects/properties/actions with references into the mechanics doc),
  player definition/rewards, and UI/controls. **[Primary practice]** — [Unity GDD template (PDF)](https://connect-prd-cdn.unity.com/20201215/83f3733d-3146-42de-8a69-f461d6662eb1/Game-Design-Document-Template.pdf)
- A widely circulated community GDD template enumerates **assets needed** by category (2D textures,
  3D characters/environments, sound lists, animations) alongside mechanics and gameplay.
  **[Primary practice (community)]** — [HeadClot GDD template](https://docs.google.com/document/d/1axeeBWp683LPU8gCBQQqmquHMYHuG3uhNTN0LjSJBKk/mobilebasic)
- Serious/educational GDD research argues GDDs are often absent or ad-hoc, and proposes modeling
  educational elements and entertainment elements together in one structured document.
  **[Research]** — [A Model-driven Framework for Educational Game Design, IJSG 2016](https://journal.seriousgamessociety.org/index.php/IJSG/article/view/126)
- Serious-game design literature maps game design onto instructional-design phases (analysis,
  design, development, playtesting), i.e. the spec should carry the learning objective and the
  checkpoints for whether it was met. **[Research]** — [An overview of game design techniques, ACM](https://dl.acm.org/doi/pdf/10.5555/2811147.2811158)
- Two useful fidelity ideas from GDD practice: define the "ultimate game" but be explicit about what
  was actually delivered/designed (supports official-vs-designed labeling) — [UNC outline](https://wwwx.cs.unc.edu/~pozefsky/seriousgames/NewDesignDocTemplate.pdf);
  and prefer concrete, named entities over generic placeholders ("The Lazarus Fighter has more armour
  than the Apollo Fighter", not "enemy_1 has more hit points than enemy_2") — [Unity template](https://connect-prd-cdn.unity.com/20201215/83f3733d-3146-42de-8a69-f461d6662eb1/Game-Design-Document-Template.pdf).

**Takeaway.** Classic GDD sections cluster into: overview + objective, mechanics/rules, flow/UI,
player feedback, assets, and technical/build notes. None of these templates alone is written for an
LLM implementer, and none specifies states, data, or acceptance criteria precisely enough to build
from — which is what the remaining areas add.

## 2. Testable / executable acceptance criteria

- Gherkin (Cucumber) is the canonical executable-specification syntax: `Feature` → `Rule` →
  `Example`/`Scenario` with `Given` (initial context/known state), `When` (event/action), `Then`
  (expected outcome). `Then` outcomes must be **observable** outputs, not internal state such as a
  database record. Steps are recommended to stay at 3–5 per example "to preserve expressive power."
  `Background` factors out repeated context; `Scenario Outline` + `Examples` tables parameterize the
  same scenario across values; data tables and doc strings pass structured data.
  **[Primary practice / documented convention]** — [Cucumber Gherkin reference](https://cucumber.io/docs/gherkin/reference)
- GitHub Spec Kit's spec template writes acceptance criteria as numbered `Given/When/Then`
  **acceptance scenarios** attached to independently testable, prioritized user stories, plus an
  explicit **Edge Cases** section ("What happens when [boundary condition]? How does the system
  handle [error scenario]?"). Unresolved items are marked `[NEEDS CLARIFICATION: ...]` rather than
  silently invented. **[Primary practice]** — [Spec Kit spec template](https://raw.githubusercontent.com/github/spec-kit/main/templates/spec-template.md)
- AWS Kiro writes acceptance criteria in **EARS** (Easy Approach to Requirements Syntax):
  `WHEN [condition/event] THE SYSTEM SHALL [expected behavior]`. Kiro claims EARS gives clarity,
  testability ("each requirement can be directly translated into test cases"), traceability, and
  completeness ("encourages thinking through all conditions and behaviors"). A Kiro-derived
  reference documents the full pattern family: event-driven `When`, state-driven `While`,
  unwanted-behavior `If … shall`, optional-feature `Where`, and ubiquitous `The [system] shall`.
  **[Primary practice]** — [Kiro Feature Specs](https://kiro.dev/docs/specs/feature-specs/); pattern
  family documented in [EARS format guide (community)](https://github.com/studio-gadget/skills/blob/main/kiro-spec-requirements/rules/ears-format.md);
  EARS originates in requirements-engineering research (Mavin et al., RE 2009).
- Spec Kit requires **measurable, technology-agnostic success criteria** (`SC-001: users can complete
  account creation in under 2 minutes`), separate from functional requirements (`FR-001: System MUST
  …`), and a **Key Entities** subsection when data is involved.
  **[Primary practice]** — [Spec Kit spec template](https://raw.githubusercontent.com/github/spec-kit/main/templates/spec-template.md)
- Spec-driven tooling treats ambiguity as a defect class: Kiro ships an **Analyze Requirements** step
  that looks for "logical inconsistencies, ambiguities, conflicting constraints, and gaps" before
  design; Kiro's **Correctness** feature uses property-based testing to check requirements against
  generated inputs. **[Primary practice]** — [Kiro Specs](https://kiro.dev/docs/specs/);
  [Kiro Analyze Requirements](https://kiro.dev/docs/specs/analyze-requirements/)
- Why this matters for LLM builders: agents exploit loopholes in under-specified objectives
  ("specification gaming"). DeepMind collected ~60 examples where agents optimized the literal
  reward instead of the intended outcome, e.g. a boat-racing agent looping to farm power-ups rather
  than finishing the race; the post argues misspecification is the cause, not the algorithm.
  **[Research / first-party]** — [DeepMind: Specification gaming](https://deepmind.google/blog/specification-gaming-the-flip-side-of-ai-ingenuity).
  Formal work shows some proxies cannot be made "unhackable," so external verification (the repo's
  blind build) is necessary rather than relying on a perfect spec. **[Research]** — [Skalse et al., NeurIPS 2022](https://mlanthology.org/neurips/2022/skalse2022neurips-defining/)

**Takeaway.** The strongest documented pattern is: user story → observable acceptance scenarios in
Given/When/Then → explicit edge cases, with requirement IDs for traceability and unknowns flagged,
not guessed. EARS gives a compact pattern set for system-behavior requirements (When/While/If/Where/
ubiquitous) that pairs well with Gherkin for scenarios.

## 3. Interaction / state-machine specification for UI-heavy apps

- XState (statecharts) formalizes exactly the parts a game spec must pin down: states, event-driven
  transitions, **guards** (conditions), entry/exit actions, context (data), and internal vs external
  vs transient transitions. Transition notation supports string targets, `{target, cond, actions}`,
  and ordered conditional transitions. **[Primary practice]** —
  [XState transitions docs](https://xstate.js.org/docs/guides/transitions.html);
  [XState actions docs](https://xstate.js.org/docs/guides/actions.html)
- SCXML is the W3C standard for state-machine notation: a machine has an initial configuration,
  transitions are `(event, condition) → target`, states can be compound (nested) or parallel
  (concurrent regions), and a data model stores internal variables. **[Standard]** —
  [W3C SCXML](https://www.w3.org/TR/scxml)
- Unity's GDD practice includes a **game flowchart** of objects, properties, and actions with numeric
  references to where each is defined in the mechanics text — i.e. a state/flow inventory that the
  prose references, not prose alone. **[Primary practice]** — [Unity GDD template](https://connect-prd-cdn.unity.com/20201215/83f3733d-3146-42de-8a69-f461d6662eb1/Game-Design-Document-Template.pdf)
- A practical pattern from state-machine tooling: separate **states inventory** (what can be on
  screen / where the player can be) from **transition table** (event × current state → next state +
  guards + actions). This is the same shape SCXML formalizes; a table is reviewable and directly
  implementable. **[Synthesis]** (based on the two primary sources above).

**Takeaway.** For a game spec, an explicit state/screen inventory plus a transition table with
guards and entry/exit actions mirrors a documented standard (SCXML) and first-party tooling (XState)
while remaining engine-agnostic and readable.

## 4. Level and content data schemas

- Khan Academy's open-source exercise system **Perseus** is the closest primary example of an
  educational activity as data: a `PerseusItem` is `{question, hints, answerArea}`; a question is
  Markdown content plus a map of typed **widgets** (radio, categorizer, sorter, matcher, interactive
  graph, …) referenced from the text; widgets carry their timing/randomization/answer data (e.g.
  `randomizeItems`, `values` for correct categories; `maxUsesPerTile`; `correct` answers as data).
  Hints are an ordered list with a `replace` flag (replace vs accumulate). The schema is versioned
  and parsed through migration functions so old content stays renderable.
  **[Primary practice]** — [Khan/perseus repo](https://github.com/Khan/perseus);
  [`data-schema.ts`](https://github.com/Khan/perseus/blob/main/packages/perseus-core/src/data-schema.ts)
- Data-driven design practice in game curricula: put object data and tunable parameters (physics,
  difficulty) in JSON/other data files, and use a level container that the engine reads.
  **[Primary practice / course material]** — [Cornell CS3152 Data-Driven Design lecture](https://www.cs.cornell.edu/courses/cs3152/2020sp/lectures/13-DataDriven.pdf)
- Difficulty curves are formalized as a function from player skill to difficulty, characterizable by
  a few generic parameters (starting rating, rating scale, desired starting loss rate) with a
  logistic baseline; different curves measurably change engagement. **[Research]** —
  [Transforming Game Difficulty Curves using Function Composition, CHI 2019](https://dl.acm.org/doi/10.1145/3290605.3300781)
  ([open copy](https://par.nsf.gov/servlets/purl/10133937))
- Puzzle-game research models per-level difficulty as the distribution of actions used to complete a
  level, with a small number of parameters (completion rate, scale); 99% of 4,000 levels fit the
  model, and a single scale parameter lets designers compare levels. **[Research]** —
  [Statistical Modelling of Level Difficulty in Puzzle Games](https://arxiv.org/html/2107.03305v2)
- For educational games specifically, evidence favors **incremental difficulty** with practice room
  and mastery-gated progression ("participants can only move to the next level when they demonstrate
  competency"); there is "no generalized prescribed curve applicable for all educational video
  games." **[Research]** — [Exploring the Influence of Demographic Factors on Progression and Playtime in Educational Games](https://dl.acm.org/doi/fullHtml/10.1145/3555858.3555873)

**Takeaway.** Levels should be a data table: one row per level with explicit parameters (object
counts, value ranges, distractors, timing, randomization rules), plus a stated progression rule
(what changes and when the next level starts). Difficulty formulas are optional; parameters and
ordering are what a builder needs. Perseus shows the pattern of typed widget/activity data with
versioning and migration.

## 5. Asset manifests

- Phaser's Loader documents the convention cleanly: every asset gets a unique, case-sensitive string
  **key** used thereafter; a scene preloads assets; a **file pack** is a JSON manifest of
  `{type, key, url}` entries (image, svg, spritesheet + frame config, atlas, audio, audio sprite,
  json, …); "You can write your own asset manifest pretty easily." Loader events expose progress and
  failures (useful for a loading screen requirement). **[Primary practice]** —
  [Phaser Loader docs](https://docs.phaser.io/phaser/concepts/loader)
- GDD templates enumerate assets by type and exact counts ("7 character sprite sets, 13 backgrounds,
  3 audio tracks, and full GUI set up"), distinguishing necessary from optional, so scope is
  explicit. **[Primary practice (community)]** — [VNDev Wiki: Game design document](https://vndev.wiki/Game_design_document);
  [HeadClot template](https://docs.google.com/document/d/1axeeBWp683LPU8gCBQQqmquHMYHuG3uhNTN0LjSJBKk/mobilebasic)
- A concrete example GDD specifies file formats, directory layout, and **what happens if an asset
  fails to load** (error surfaced, fallback environment, warning on unused files). **[Informal
  practice]** — [FossXO GDD: File Formats](https://fossxo.github.io/gdd/technical-design/file-formats.html)
- Unity's official checklist treats mood board/concept art as part of the doc, i.e. an asset list
  doubles as generation guidance. **[Primary practice]** — [Unity GDD Checklist (PDF)](https://connect-prd-cdn.unity.com/20191004/4be5cf7a-c2b2-48f8-bbdb-6c0233df7a0e/Game%20Design%20Document%20Checklist.pdf)

**Takeaway.** A manifest table with stable keys (`scoop_chocolate`, `sfx_correct`), type, a short
visual/audio description, required dimensions/duration and behavior (loop/one-shot), and a
stub/synthesis note is directly implementable and matches both engine practice (Phaser keys) and GDD
asset-list practice. Specifying load-failure behavior is cheap and prevents builder improvisation.

## 6. Accessibility guidance for kids (touch sizes, audio, color)

- Platform baselines: Apple's HIG says a button needs a hit region of at least **44×44 pt**; its
  design tips repeat 44×44 pt minimum controls and text of at least 11 pt.
  **[Standard / platform guideline]** — [Apple HIG: Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons),
  [Apple UI Design Dos and Don'ts](https://developer.apple.com/design/tips). Apple's accessibility
  page lists per-platform default/minimum control sizes (iOS 44×44 pt default, 28×28 pt minimum) and
  contrast targets (4.5:1 up to 17 pt, 3:1 at 18 pt+)
  ([Apple HIG: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)).
- WCAG 2.2: **SC 2.5.8 Target Size (Minimum)** requires at least 24×24 CSS px (or sufficient
  spacing) at AA; **SC 2.5.5 Target Size (Enhanced)** requires 44×44 CSS px at AAA. **[Standard]** —
  [Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum),
  [Understanding 2.5.5](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- WCAG 2.2 **SC 2.5.7 Dragging Movements (AA)** requires any drag action to have a single-pointer,
  non-drag alternative (e.g. tap item, then tap destination) unless dragging is essential. This is
  directly relevant to kids' drag-and-drop games. **[Standard]** —
  [Understanding 2.5.7](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)
- WCAG requires alternatives for prerecorded **audio-only** content (SC 1.2.1) and audio description
  for video (SC 1.2.3/1.2.5) — relevant because young children can't read, so the game's audio
  carries instruction and feedback. **[Standard]** — [WCAG 2.2](https://www.w3.org/TR/WCAG22)
- BBC mobile guidance: recommended touch targets **7–10 mm** (7×7 mm minimum with an exclusion zone);
  cites iOS 44 pt and Android 48 dp. **[Primary practice / broadcaster guideline]** —
  [BBC: Target touch size](https://www.bbc.co.uk/accessibility/forproducts/guides/mobile/target-touch-size)
- W3C's own research summary collects studies finding minimum button sizes of 10–20 mm, with 20 mm+
  improving accuracy, and larger targets helping users with motor impairments.
  **[Research compilation / standards body]** —
  [W3C Mobile A11y TF: Summary of Research on Touch/Pointer Target Size](https://www.w3.org/WAI/GL/mobile-a11y-tf/wiki/Summary_of_Research_on_Touch/Pointer_Target_Size)
- Children specifically: the MTAGIC project (six studies, 116 children) found children are
  **consistently less accurate than adults at all target sizes, and especially inaccurate on the
  smallest targets**; common issues are unintended "holdover" touches and inconsistent gesture
  execution. Its recommendations include using consistent, platform-recommended target sizes and
  designing to identify/ignore holdover touches. **[Research]** — [MTAGIC final preprint, IJHCS 2019](https://init.cise.ufl.edu/wp-content/uploads/sites/775/2019/03/anthony-et-al-IJHCS2019-MTAGIC-final-preprint.pdf)
- Reported magnitudes from children's touch research: children 7–10 miss 7 mm targets ~30% of the
  time, 11–17-year-olds ~20%; even Android's recommended ~9 mm targets are missed about once in six
  attempts until age 17. **[Research]** — [Touch interaction for children aged 3 to 6 years](https://www.sciencedirect.com/science/article/abs/pii/S1071581914001426)
- NAEYC/Fred Rogers Center (ages birth–8): effective technology use is "active, hands-on, engaging,
  and empowering; give the child control; provide adaptive scaffolds to help children progress at
  their individual rates." Passive screen use is discouraged (prohibited <2); screen-time balance is
  expected. **[Institutional guideline]** — [NAEYC/Fred Rogers position statement (PDF)](https://www.naeyc.org/sites/default/files/globally-shared/downloads/PDFs/resources/position-statements/ps_technology.pdf)
- Joan Ganz Cooney Center guidance for early-learner edtech: design for joy and curiosity rather than
  "drill and kill," connect with the child's offline experience, and account for wide variability
  among early learners. **[Institutional guidance]** — [Designing Edtech for Young Learners](https://joanganzcooneycenter.org/2024/05/09/designing-edtech-for-young-learners)
- Apple's Kids Category enforces age bands (5 and under, 6–8, 9–11) and parental gates for
  purchases/link-outs; apps must protect children's data. **[Platform policy/standard]** —
  [Apple: Design safe and age-appropriate experiences](https://developer.apple.com/kids),
  [App Store categories](https://developer.apple.com/app-store/categories)

**Takeaway.** Cite concrete numbers in the spec: ≥44 CSS px targets (larger for the youngest),
spacing, contrast 4.5:1, drag alternatives, and no text-only instruction paths. No source gives a
universal child-specific minimum size; the documented platform minimums are adult-derived and
research shows children need more (see open questions).

## 7. Emerging practice: specs for LLM code generation

- GitHub Spec Kit (Spec-Driven Development): specs are the source of truth; flow is
  Spec → Plan → Tasks → Implement → Converge; the spec focuses on **what/why, not tech stack**;
  each artifact is Markdown that feeds the next. Its spec template is examined above (prioritized,
  independently testable user stories; Given/When/Then acceptance scenarios; edge cases; FR/SC IDs;
  assumptions; NEEDS CLARIFICATION markers). **[Primary practice]** —
  [Spec Kit repo](https://github.com/github/spec-kit), [Spec-Driven Development essay](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- AWS Kiro (spec-driven IDE): every feature spec produces three artifacts — `requirements.md`
  (user stories + EARS acceptance criteria), `design.md` (architecture, data flow, error handling),
  `tasks.md` (discrete implementable tasks); requirements are analyzed for ambiguity before design.
  **[Primary practice]** — [Kiro Specs docs](https://kiro.dev/docs/specs/)
- OpenSpec (a lighter LLM-first spec tool) emphasizes "requirements with concrete scenarios" in
  plain Markdown and agreeing on specs before code. **[Primary practice / OSS tool]** —
  [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)
- Anthropic's Claude Code best practices, for an agent building from a document: give precise
  instructions and constraints, point at concrete artifacts, follow the test-first workflow
  ("write tests, commit; code, iterate"), and use a fresh-context reviewer to check the
  implementation against the plan, the listed edge cases, and scope. Context size matters:
  performance degrades as context fills, so keep persistent context files concise.
  **[Primary practice]** — [Claude Code best practices](https://code.claude.com/docs/en/best-practices.md)
- The DeepMind and Skalse findings (section 2) are the main *negative* evidence: no natural-language
  spec can be assumed loophole-free, so the build must be verified against observable acceptance
  criteria. **[Research]** — links above.
- General prompt-engineering practice adds two cheap fidelity devices: state the **reason** behind a
  constraint (helps generalization to unanticipated edge cases) and provide **input→output
  examples** (recommended 3–5 for serious work) so format and tone are unambiguous.
  **[Secondary summary of first-party docs]** — [Anthropic 5 prompt rules (summary)](https://wmedia.es/en/tips/claude-code-prompts-5-rules-anthropic)

**Takeaway.** The documented LLM-spec conventions converge on: intent-first prose, numbered
functional requirements, observable acceptance scenarios, explicit edge cases and assumptions,
separate design/implementation detail, and verification artifacts (tests) that trace back to
requirements. Specs are living documents updated when intent changes (Spec Kit), so our template
should include a status/revision line.

## 8. Differences for very young children (ages 2–8)

- NNG's research separates children into 3–5 (pre-readers), 6–8 (beginning readers), 9–12; findings:
  youngest children **do not read at all**, don't use browser back, avoid scrolling, need larger text
  (14 pt for young children), and benefit from real-life metaphors; interface conventions and
  consistency still help. **[Primary practice / research]** —
  [NN/g: Children's UX](https://www.nngroup.com/articles/childrens-websites-usability-issues),
  [NN/g report scope: UX Design for Children 3–12](https://www.nngroup.com/reports/children-on-the-web/)
- NNG also warns against "multiple/redundant navigation" for children and notes young children
  "mine-sweep" the screen — exploratory tapping must be safe (no punishing outcomes).
  **[Primary practice / research]** — same NN/g article.
- Apple's kids age bands (≤5, 6–8, 9–11) confirm a three-way split we should mirror in specs.
  **[Platform policy]** — [Apple Kids](https://developer.apple.com/kids)
- NAEYC/Fred Rogers Center: use should give the child control, provide adaptive scaffolds, be active
  rather than passive; short, focused interactions. **[Institutional guideline]** — link above.
- Read-aloud instructions matter even beyond pre-readers: children in Cooney Center design sessions
  asked for read-aloud game instructions so "everyone is on the same page about how it works."
  **[Institutional research]** — [Re-imagining Reading (Cooney Center)](https://joanganzcooneycenter.org/2024/03/08/re-imagining-reading-how-reluctant-readers-would-design-their-own-educational-technology)
- Sesame Workshop/Cooney Center app guidance: create developmentally appropriate apps, sustain
  interest, design for shorter playtimes. **[Institutional research]** —
  [Learning: Is there an app for that? (PDF)](https://clalliance.org/wp-content/uploads/files/learningapps_final_110410.pdf)
- Interaction consequences (from the child touch research in section 6): large targets, tolerance
  for imprecise taps, no reliance on drag without a tap alternative, and ignoring accidental
  "holdover" touches rather than counting them as answers. **[Research]** — MTAGIC and Vatavu links
  above; WCAG 2.5.7 for the drag alternative. **[Standard]**

**Takeaway.** For ages 2–8 the spec must assume no reading: instructions and feedback are audio +
pictogram; every interaction is tap-first (drag optional with a tap path); targets are large; wrong
or random taps should never produce punishing failure states; session length is short.

---

## Synthesis — recommended section list for our spec template

**This list is my synthesis**, built from the sources above and constrained by the repo's ticket 02
requirements (overview/objective, mechanics, screens/states, input, level progression, feedback/audio,
assets, progress/data, engine-agnostic Requirements, acceptance criteria, official-vs-designed).
Sections marked *(conditional)* appear only when applicable (e.g. media playback for interactive
players, levels for single-level games).

1. **Front matter** — title; entry type (game / song / video / book mode / collection); source link
   to the catalogued entry; spec status/version; last-updated date; one-line platform assumption
   (browser, touch + mouse). *(Spec Kit artifacts carry status; specs are living documents.)*
2. **Overview and learning objective** — 2–4 sentences: what the player does, the skill practiced,
   and why it matters; age band target (2–5 pre-reader / 6–8 early reader) and expected session
   length. *(GDD overview + pedagogical objective; NNG age bands; NAEYC.)*
3. **Official vs designed** — a standing table or inline convention: every behavior claim is tagged
   `official` (traceable to the entry's catalogued description) or `designed` (buildability
   invention), with source/notes. *(Repo requirement; supported by GDD "be clear about what you
   delivered" guidance.)*
4. **Player experience / core loop** — one short narrative pass of a perfect play session, plus the
   core loop in one sentence. Anchors all later sections; prevents generic requirements.
5. **Mechanics and rules** — the complete interaction rules: objects, player actions, win/advance
   conditions, what counts as correct/incorrect, tolerances, retry semantics, and explicit edge-case
   behaviors (double-taps, taps on empty space, rapid repeated taps, no input). Written as numbered
   `FR-xxx` requirements where they must be testable. *(GDD mechanics; Spec Kit FR IDs; Kiro EARS
   for conditions; edge cases section from Spec Kit.)*
6. **Screens and states** *(conditional composition)* — a state inventory (one line per screen/state)
   plus a transition table: current state × event → next state, with guards and entry/exit actions
   (e.g. play correct feedback then advance). Include initial state and terminal states. *(XState
   and SCXML; Unity game flowchart.)*
7. **Input and interaction** — exact input model: tap targets and minimum sizes, drag gestures and
   their single-pointer alternative, hit tolerances, what happens on mis-taps, and how instructions
   are delivered without reading (audio + pictogram). *(Apple 44 pt; WCAG 2.5.8/2.5.5/2.5.7; BBC
   7–10 mm; MTAGIC; NNG no-reading.)*
8. **Levels and content data** — a table of levels/rounds with explicit parameters (counts, ranges,
   distractor counts, timing, randomization rules, seed/backfill rules) and one worked example of
   level generation or layout. State the progression rule (what changes per level, when the next
   starts, mastery or attempt threshold), and mark whether progression is fixed or adaptive.
   *(Perseus data-first schema; data-driven design; difficulty-curve and educational progression
   research.)*
9. **Feedback, rewards, and audio cues** — a mapping of game events → visual feedback (animation,
   highlight, number appears) → audio feedback (earcon, spoken praise, instruction voice), including
   incorrect-answer and idle-timeout behavior; retry behavior; celebration/end-of-round. Audio must
   carry the information a non-reader needs. *(GDD feedback section; NNG/N-AEYC; WCAG audio
   alternatives.)*
10. **Progress and persistence** — what is stored between sessions (e.g. last level, stars/score),
    the storage mechanism class (local browser storage), reset behavior, and what is deliberately not
    stored. Keep the surface minimal and explicit since there is no shared kernel. *(Spec Kit Key
    Entities; Kiro design data flow; repo constraint.)*
11. **Assets** *(conditional per entry)* — a manifest table of original assets: stable key, type
    (image/audio/sprite/animation), description or generation prompt, size/duration/format, behavior
    (loop, one-shot), and whether a programmatic stub is acceptable. State that all assets are
    original. *(Phaser file packs and keys; GDD asset lists; VNDev exact counts; repo
    original-assets-only rule.)*
12. **State and data shapes** *(conditional)* — optional compact schema (fields and types, e.g.
    level config object, save object) if the behaviors are data-heavy; otherwise omit. *(Perseus
    data schema; data-driven design.)*
13. **Requirements (engine-agnostic)** — capability classes the build needs: rendering primitives
    (2D sprites, text, animation, particles), input events, audio (one-shot/looping, concurrent
    channels), data/storage, performance and offline behavior, accessibility constraints. Phrase as
    EARS-style numbered statements (`The game shall …`, `When …, the game shall …`) so the stack
    decision can aggregate them. *(Repo requirement; Kiro EARS; Spec Kit FR.)*
14. **Acceptance criteria** — per user story or per level: Given/When/Then scenarios whose `Then` is
    observable on screen or in audio, including the edge cases from section 5, plus a short
    blind-build checklist (e.g. "a fresh context can build the game and complete one full round").
    *(Cucumber Gherkin; Spec Kit acceptance scenarios and edge cases; Anthropic verification
    workflow.)*
15. **Assumptions and open questions** — explicit assumptions made to fill gaps and any
    `[NEEDS CLARIFICATION]` items; the builder must not invent silent behavior. *(Spec Kit
    assumptions + NEEDS CLARIFICATION; Kiro ambiguity analysis.)*
16. **Out of scope / build freedom** — what the builder may decide freely (screen composition, exact
    art style within the manifest, easing choices) versus what is fixed; what is explicitly not in
    this spec (profiles, navigation, parental controls). Prevents both overfitting and scope creep.
    *(Repo map: platform shell out of scope; Spec Kit scope boundaries.)*

### Fidelity rules (how to write each section)

- **Observe, don't infer.** Every acceptance `Then` must be a visible/audible outcome, never internal
  state. **[Primary practice]** — Gherkin guidance.
- **Numbers over adjectives.** Counts, sizes, durations, timings, probabilities, target pixel/point
  sizes. **[Synthesis]** grounded in the standards above.
- **Data over prose for anything repeatable.** Levels, assets, feedback mappings as tables.
- **One worked example.** Fully specify one level and one acceptance scenario so the form is shown,
  not just described. **[Primary practice]** — few-shot examples in Anthropic guidance; Scenario
  Outline examples in Gherkin.
- **Requirements get IDs; unknowns get flagged.** `FR-xxx`, `SC-xxx` traceability;
  `[NEEDS CLARIFICATION]` instead of plausible-sounding invention.
- **Determinism.** If randomness is used, state what is random, its bounds, and whether a seed or
  fixed backfill is used, so the build and its tests are reproducible.
- **Label provenance inline.** `official` vs `designed` at the claim level, not just once at the top.
- **Keep it short enough to fit one context.** Prefer a compact spec with tables; split an entry
  whose spec exceeds roughly a few pages rather than growing prose. **[Synthesis]** (Anthropic notes
  performance degrades as context fills).

---

## Open questions (evidence thin or absent)

1. **Child-specific target sizes.** Platform minimums (24/44 CSS px, 7–10 mm) are adult-derived; the
   child research shows larger is better but gives no widely adopted numeric standard for ages 2–8.
   A per-age-band target-size rule in our template would be our synthesis, not a standard.
2. **Asset manifests for generated/procedural assets.** Phaser/GDD practice assumes hand-made files;
   guidance for "describe an asset so an LLM generates or stubs it" is not documented anywhere
   authoritative we could find. Our manifest columns are synthesis.
3. **Level schema for educational games.** Perseus is exercise-item data, not game-level progression
   data; difficulty research is game-specific. No cross-industry schema exists to copy.
4. **Acceptance-criteria syntax for agents.** Kiro/EARS and Spec Kit/Gherkin are 2025–26 product
   practices with little independent evidence that one format produces more reliable builds. The
   repo's blind build test is the only direct evidence we will have.
5. **Audio-first feedback specifics.** Earcon design and spoken-praise cadence for ages 2–8 have
   practitioner guidance but no normative standard; WCAG addresses alternatives, not pedagogy.
6. **Statecharts at spec level vs over-specification.** SCXML/XState are formal and complete, but
   no evidence says a full statechart in a spec outperforms a states inventory + transition table for
   small games; we chose the lighter table as synthesis.
7. **GDD effectiveness.** Research says GDDs are often missing/ad-hoc in serious games; there is no
   validated section list proven to improve build outcomes, so our template derives from adjacent
   documented practices rather than GDD evidence.

---

*Prepared as the deliverable for ticket 01. Feeds ticket 02 (draft template + pilot spec) and the
blind build test in ticket 03.*
