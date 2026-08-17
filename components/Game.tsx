"use client";

import { ageForYear, getScenario } from "@/lib/gameLogic";
import { useGameStore } from "@/lib/store";
import AdModal from "./AdModal";
import GameOverCard from "./GameOverCard";
import OutcomeView from "./OutcomeView";
import ScenarioView from "./ScenarioView";
import StatsBar from "./StatsBar";

export default function Game() {
  const phase = useGameStore((s) => s.phase);
  const stats = useGameStore((s) => s.stats);
  const currentScenarioId = useGameStore((s) => s.currentScenarioId);
  const pendingOutcome = useGameStore((s) => s.pendingOutcome);
  const activeRandomEvent = useGameStore((s) => s.activeRandomEvent);
  const log = useGameStore((s) => s.log);
  const ending = useGameStore((s) => s.ending);
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
        <span className="text-xs text-term-dim">free · no login · 2 min</span>
      </header>

      {phase === "intro" && (
        <div className="flex flex-1 flex-col justify-center gap-5">
          <div>
            <h2 className="text-2xl font-black leading-tight text-slate-100">
              From graduation
              <br />
              to <span className="text-term-green">the exit</span>.
            </h2>
            <p className="cursor-blink mt-3 leading-relaxed text-slate-300">
              One choice per year. Maximize your net worth. Keep burnout under
              100%. Retire rich — or melt down trying.
            </p>
          </div>
          <ul className="space-y-1 text-sm text-term-dim">
            <li>▸ Start: age 22, $30K in student loans</li>
            <li>▸ Burnout hits 100% → you're done</li>
            <li>▸ Layoffs, crashes, and promos await</li>
          </ul>
          <button
            onClick={startGame}
            className="rounded-lg border border-term-green/50 bg-term-green/10 p-4 text-sm font-bold text-term-green transition-colors hover:bg-term-green/20"
          >
            ▶ START CAREER
          </button>
        </div>
      )}

      {phase !== "intro" && phase !== "gameover" && (
        <>
          <StatsBar stats={stats} year={scenario.year} age={scenario.age} />
          {phase === "scenario" && (
            <ScenarioView
              scenario={scenario}
              randomEvent={activeRandomEvent}
              onPick={pickChoice}
            />
          )}
          {phase === "outcome" && pendingOutcome && (
            <OutcomeView outcome={pendingOutcome} onContinue={continueToNextYear} />
          )}
        </>
      )}

      {phase === "gameover" && ending && (
        <GameOverCard
          ending={ending}
          stats={stats}
          age={finalAge}
          log={log}
          onRestart={restart}
        />
      )}

      {adPlaying && <AdModal progress={adProgress} onSkip={skipAd} />}
    </div>
  );
}
