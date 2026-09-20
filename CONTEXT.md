# Context

Glossary for this repo. Terms only — no implementation detail.

## Glossary

- **Entry** — one officially documented Khan Academy Kids item: a game, activity, song, video,
  book mode, or collection, as catalogued under `docs/khan-academy-kids-games/`.
- **Game spec** — an engine-agnostic, LLM-ingestible document specifying the buildable interactive
  form of one entry: mechanics, states, levels, feedback, assets, progress behavior, requirements,
  and acceptance criteria.
- **Spec template** — the fixed section structure every game spec follows.
- **Interactive player** — the buildable form given to entries that are not games (songs, videos,
  books, collections): media plus a minimal designed interaction.
- **Designed vs official** — every spec distinguishes behavior proven by official Khan Academy
  sources from behavior invented to make the entry buildable.
- **Blind build test** — building the pilot game from its spec alone, in a fresh context, with no
  extra information; failures revise the template.
- **Pilot** — the first entry taken through spec and blind build to validate the template:
  Count and tap the ice cream cones.
