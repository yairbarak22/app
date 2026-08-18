"use client";

import { ageForYear, formatMoney, getScenario } from "@/lib/gameLogic";
import type { ShareData } from "@/lib/share";
import { useGameStore } from "@/lib/store";
import AdModal from "./AdModal";
import GameOverCard from "./GameOverCard";
import OutcomeView from "./OutcomeView";
import ScenarioView from "./ScenarioView";
import StatsBar from "./StatsBar";

function ChallengeBanner({ challenge }: { challenge: ShareData }) {
  const money = formatMoney(challenge.netWorth);
  return (
    <div className="rounded-lg border border-term-amber/50 bg-term-amber/10 p-3 text-sm">
      <p className="font-bold text-term-amber">⚔ CHALLENGE ISSUED</p>
      <p className="mt-1 text-slate-300">
        {challenge.kind === "burnout" ? (
          <>
            A <span className="text-slate-100">{challenge.title}</span> burned out at{" "}
            {challenge.age} with {money}. Survive longer. Earn more.
          </>
        ) : (
          <>
            A <span className="text-slate-100">{challenge.title}</span> retired at{" "}
            {challenge.age} with <span className="text-term-green">{money}</span>. Beat
            that run.
          </>
        )}
      </p>
    </div>
  );
}

export default function Game({ challenge }: { challenge?: ShareData | null }) {
  const phase = useGameStore((s) => s.phase);
  const stats = useGameStore((s) => s.stats);
  const currentScenarioId = useGameStore((s) => s.currentScenarioId);
  const pendingOutcome = useGameStore((s) => s.pendingOutcome);
  const activeRandomEvent = useGameStore((s) => s.activeRandomEvent);
  const log = useGameStore((s) => s.log);
  const ending = useGameStore((s) => s.ending);
  const lastRoll = useGameStore((s) => s.lastRoll);
  const unlocked = useGameStore((s) => s.unlocked);
  const pendingUnlocks = useGameStore((s) => s.pendingUnlocks);
  const adPlaying = useGameStore((s) => s.adPlaying);
  const adProgress = useGameStore((s) => s.adProgress);

  const startGame = useGameStore((s) => s.startGame);
  const pickChoice = useGameStore((s) => s.pickChoice);
  const continueToNextYear = useGameStore((s) => s.continueToNextYear);
  const skipAd = useGameStore((s) => s.skipAd);
  const restart = useGameStore((s) => s.restart);

  const scenario = getScenario(currentScenarioId);
  const finalAge = ageForYear(log.length > 0 ? log[log.length - 1].year : 1);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="flex items-baseline justify-between">
        <h1 className="text-sm font-bold text-term-green">
          tech-career-sim<span className="text-term-dim">@v0.1</span>
        </h1>
        <span className="text-xs text-term-dim">free · no login · 3 min</span>
      </header>

      {phase === "intro" && (
        <div className="flex flex-1 flex-col justify-center gap-5">
          {challenge && <ChallengeBanner challenge={challenge} />}
          <div className="anim-rise">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-100">
              From graduation
              <br />
              to <span className="text-term-green">the exit</span>.
            </h2>
            <p className="cursor-blink mt-3 leading-relaxed text-slate-300">
              One choice per year. Get rich. Don't melt down.
            </p>
          </div>
          <ul className="anim-rise-1 space-y-1.5 text-sm text-term-dim">
            <li>▸ 15 years, 200 scenarios, 🎲 real odds</li>
            <li>▸ Start: age 22, $30K in loans</li>
            <li>▸ Burnout hits 100% → game over</li>
            <li>▸ 🏆 22 achievements with prizes</li>
          </ul>
          <button
            onClick={startGame}
            className="press-scale anim-rise-2 rounded-xl border border-term-green/50 bg-term-green/10 p-4 text-sm font-bold text-term-green transition-colors hover:bg-term-green/20"
          >
            ▶ START CAREER
          </button>
        </div>
      )}

      {phase !== "intro" && phase !== "gameover" && (
        <>
          <StatsBar
            stats={stats}
            year={scenario.year}
            age={scenario.age}
            achievementCount={unlocked.length}
          />
          {phase === "scenario" && (
            <ScenarioView
              scenario={scenario}
              randomEvent={activeRandomEvent}
              onPick={pickChoice}
            />
          )}
          {phase === "outcome" && pendingOutcome && (
            <OutcomeView
              outcome={pendingOutcome}
              roll={lastRoll}
              unlocks={pendingUnlocks}
              onContinue={continueToNextYear}
            />
          )}
        </>
      )}

      {phase === "gameover" && ending && (
        <GameOverCard
          ending={ending}
          stats={stats}
          age={finalAge}
          log={log}
          unlocked={unlocked}
          onRestart={restart}
        />
      )}

      {adPlaying && <AdModal progress={adProgress} onSkip={skipAd} />}
    </div>
  );
}
