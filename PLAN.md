# Tech Career Simulator — Build Plan

A fast, viral, text-based browser game that simulates a software engineer's career — from graduation day to the exit of your dreams. Maximize your **Net Worth**, keep your **Burnout** under 100%, and retire rich.

Target audience: US tech workers and tech-adjacent internet (Twitter/X, LinkedIn, Hacker News, r/cscareerquestions). Tone: dark tech-industry humor, real slang (TC, RSUs, LeetCode, FAANG, layoffs, PIP, on-call).

---

## 1. Product Vision

- **Player goal:** Maximize Net Worth and retire rich without hitting 100% Burnout.
- **Business goal:** A completely free viral engine that scales to millions of plays, monetized via seamless **Rewarded Ads** ("watch an ad to survive the layoff") and affiliate marketing for tech workers — never at the expense of UX.
- **References:** Legionnaire.xyz (minimalist text UI, fast decisions, viral share card), Unicorn Startup Simulator / Reigns (content, tone, decision loop).

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) + React 19 | Fast, SEO-friendly landing, easy Vercel deploy |
| Language | TypeScript (strict) | Type safety for player state & scenario graph |
| Styling | Tailwind CSS v4 | Clean, responsive, mobile-first terminal aesthetic |
| State | Zustand | Tiny, no boilerplate, perfect for a single game store |
| Monetization | Dedicated ad hooks (`showRewardedAd()`) | Mocked today, swap in a real ad network SDK later |

## 3. Core Gameplay Mechanics

### Metrics
1. **Net Worth** — starts at **-$30,000** (student loans). The score.
2. **Burnout** — 0–100%. Hit 100% → game over (breakdown, you leave the industry).
3. **Title** — progresses with your choices: `CS Grad → Junior SWE → SWE II → Senior → Staff / Founder → CTO → Exited Founder`.

### The Loop
- Turn-based; **1 turn = 1 career year** (starting at age 22).
- Each year presents a **Scenario** with 2–3 choices.
- Each choice mutates the metrics and selects the branch for next year (scenario graph via `next` pointers).
- **RNG events** roll between years (market crash slashing your RSUs, surprise layoff round, viral side project...).

### Rewarded-Ad Choices (monetization, mocked for now)
Some high-stakes choices are ad-gated ("Pull strings with leadership — watch a short video to dodge the layoff"). The mock `handleWatchAd()` simulates the ad SDK so the rewarded paths are fully testable today.

## 4. The Viral Engine

On retirement / exit / breakdown, render a styled **Scorecard**: retirement age, final net worth, final title, headline achievement — plus a prominent **Share** button that pre-fills a post for X and LinkedIn:

> "I retired at 31 with $5M in the Tech Career Simulator. Think you can beat me? → [link]"

## 5. Architecture

```
app/
  layout.tsx          # metadata, OG tags, font, dark shell
  page.tsx            # renders <Game/>
  globals.css         # Tailwind + terminal theme tokens
components/
  Game.tsx            # phase router: intro → playing → outcome → game over
  StatsBar.tsx        # net worth, burnout bar, title, year/age
  ScenarioView.tsx    # scenario text + choice buttons
  OutcomeView.tsx     # consequence text + continue
  AdModal.tsx         # mock rewarded-ad player
  GameOverCard.tsx    # scorecard + share buttons
lib/
  types.ts            # GameStats, Scenario, Choice, RandomEvent, ...
  gameLogic.ts        # THE CONTENT: scenario graph, RNG events, titles, helpers
  store.ts            # Zustand store: state machine + reducers
  ads.ts              # showRewardedAd() mock → future ad-network adapter
```

Design rules:
- `gameLogic.ts` is pure data + pure functions — no React. Writers can add content without touching UI.
- The store is the only mutation point; components are dumb renderers.
- The UI reads like a modern terminal / chat app: centered column, monospace, dark, green accent.

## 6. Milestones

- **M0 — Scaffold (done in this commit):** Next.js + TS + Tailwind + Zustand boilerplate, terminal UI shell.
- **M1 — Core loop (done in this commit):** scenario engine, metrics, outcome screens, burnout loss condition, mock rewarded-ad path, RNG event scaffold, scorecard + share.
- **M2 — Content, Years 1–3 (done in this commit):** first three career years with branching (Big Tech vs. startup paths) to validate the flow.
- **M3 — Full content:** years 4–15+, layoff winter (the PRD's Year 6 flagship scenario), founder path, IPO/acquisition endings, 10+ RNG events, achievements.
- **M4 — Viral polish:** OG image generation for the scorecard (`@vercel/og`), share-link stat seeding, leaderboard-style copy.
- **M5 — Monetization:** swap `ads.ts` mock for a real rewarded-ads SDK (e.g., AdSense H5 / Applovin), add affiliate placements (job boards, interview prep) as in-fiction items.
- **M6 — Launch:** analytics events (play, finish, share), deploy to Vercel, seed on X/HN/Reddit.

## 7. What's in this commit (M0–M2)

- Full playable demo of **Years 1–3** (graduation → first job → year-3 crossroads) across two branches (Big Tech / startup), including one **ad-gated rescue choice** to test the rewarded flow end-to-end.
- One RNG event ("Crypto winter wipes your side bets") wired to prove the engine.
- Game over on 100% burnout + demo-complete scorecard with working X/LinkedIn share.

Run it: `npm install && npm run dev` → http://localhost:3000
