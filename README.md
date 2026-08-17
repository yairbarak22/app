# Tech Career Simulator

> From graduation to the exit. One choice per year. Maximize your net worth, keep burnout under 100%, retire rich — or melt down trying.

A free, fast, text-based browser game about surviving a career in tech. Dark industry humor included: TC, RSUs, LeetCode, layoffs, on-call, and the memo with the word "journey" in it.

**Status:** Full game + viral engine — **139 scenarios** across 15 career years and three macro-paths (Big Tech / startup employee / founder). Every year is a *scenario pool* (39 hubs + 100 alternate variants) and each run deals a different hand, so no two careers play the same. Includes the Year 6 **Tech Winter** layoff event on every path, 7 rewarded-ad mock choices, 7 RNG events, net-worth-tiered endings, and a complete share loop: run-seeded share links, personalized Open Graph cards (`/api/og`), and a challenge banner for invited friends. See [PLAN.md](./PLAN.md) for the build plan and roadmap.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Zustand

## Project layout

- `lib/gameLogic.ts` — the pure engine: scenario pools, RNG events, endings, helpers.
- `lib/scenarios/year01.ts` … `year15.ts` — all game content, one file per career year.
- `lib/store.ts` — Zustand store; the game state machine.
- `lib/ads.ts` — rewarded-ads adapter (mocked; swap for a real SDK later).
- `lib/share.ts` — share-link param encoding/decoding (the viral engine's plumbing).
- `app/api/og/route.tsx` — dynamic 1200×630 Open Graph card; personalized per shared run.
- `components/` — terminal-style UI (stats bar, scenario, outcome, ad modal, scorecard, challenge banner).

## Adding content

Content is organized into **pools**: each career-year story beat has a *hub* scenario plus alternate *variants* tagged with `slot: "<hubId>"`. Any `next` pointer targeting a hub id picks a random member of that pool at play time.

- **New variant** (most common): add a `Scenario` to the right `lib/scenarios/yearNN.ts` with `slot` set to an existing hub id, and point its choices' `next` at next-year hub ids. It's instantly in rotation.
- **New hub/branch**: add a scenario without `slot` and point an existing choice's `next` at it.
- A choice outcome with no `next` ends the run (`ending: "retired"` by default). Set `requiresAd: true` + `adFallback` to make a choice a rewarded-ad path.
