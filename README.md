# Tech Career Simulator

> From graduation to the exit. One choice per year. Maximize your net worth, keep burnout under 100%, retire rich — or melt down trying.

A free, fast, text-based browser game about surviving a career in tech. Dark industry humor included: TC, RSUs, LeetCode, layoffs, on-call, and the memo with the word "journey" in it.

**Status:** Playable demo — Years 1–3 (Big Tech and startup branches), rewarded-ad mock, RNG events, shareable scorecard. See [PLAN.md](./PLAN.md) for the full build plan and roadmap.

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Zustand

## Project layout

- `lib/gameLogic.ts` — all game content (scenario graph, RNG events) + pure helpers. Add new years here.
- `lib/store.ts` — Zustand store; the game state machine.
- `lib/ads.ts` — rewarded-ads adapter (mocked; swap for a real SDK later).
- `components/` — terminal-style UI (stats bar, scenario, outcome, ad modal, scorecard).

## Adding content

Append a `Scenario` to `SCENARIOS` in `lib/gameLogic.ts` and point an existing choice's `outcome.next` at its id. A choice with no `next` ends the run. Set `requiresAd: true` + `adFallback` on a choice to make it a rewarded-ad path.
