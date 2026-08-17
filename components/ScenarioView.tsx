"use client";

import { formatMoney } from "@/lib/gameLogic";
import type { Choice, GambleOutcome, RandomEvent, Scenario } from "@/lib/types";

/** Compact stat preview for a gamble outcome's odds row. */
function oddsEffect(outcome: GambleOutcome): string {
  const parts: string[] = [];
  const nw = outcome.effect.netWorth ?? 0;
  const bo = outcome.effect.burnout ?? 0;
  if (nw !== 0) parts.push(`${nw > 0 ? "+" : ""}${formatMoney(nw)}`);
  if (bo !== 0) parts.push(`${bo > 0 ? "+" : ""}${bo}% burnout`);
  return parts.join(", ");
}

export default function ScenarioView({
  scenario,
  randomEvent,
  onPick,
}: {
  scenario: Scenario;
  randomEvent: RandomEvent | null;
  onPick: (choice: Choice) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {randomEvent && (
        <div className="rounded-lg border border-term-amber/40 bg-term-amber/10 p-3 text-sm">
          <p className="font-bold text-term-amber">{randomEvent.headline}</p>
          <p className="mt-1 text-slate-300">{randomEvent.text}</p>
        </div>
      )}

      <div>
        <p className="text-xs text-term-green">
          ~/career/year-{scenario.year} $ cat event.txt
        </p>
        <h2 className="mt-2 text-lg font-bold text-slate-100">
          {scenario.headline}
        </h2>
        <p className="mt-2 leading-relaxed text-slate-300">{scenario.text}</p>
      </div>

      <div className="flex flex-col gap-2">
        {scenario.choices.map((choice, i) => (
          <button
            key={choice.id}
            onClick={() => onPick(choice)}
            className={`rounded-lg border p-3 text-left text-sm transition-colors ${
              choice.requiresAd
                ? "border-term-amber/50 bg-term-amber/5 hover:bg-term-amber/15"
                : choice.gamble
                  ? "border-term-purple/50 bg-term-purple/5 hover:bg-term-purple/15"
                  : "border-term-border bg-term-panel hover:border-term-green/50 hover:bg-term-green/5"
            }`}
          >
            <span className="mr-2 text-term-green">[{String.fromCharCode(65 + i)}]</span>
            {choice.gamble && <span className="mr-1">🎲</span>}
            <span className="text-slate-200">{choice.label}</span>
            {choice.gamble && (
              <span className="mt-2 block space-y-0.5 border-t border-term-purple/20 pt-2">
                {choice.gamble.map((outcome) => (
                  <span key={outcome.label} className="block text-xs text-term-dim">
                    <span className="inline-block w-9 font-bold text-term-purple">
                      {Math.round(outcome.chance * 100)}%
                    </span>
                    {outcome.label}
                    {oddsEffect(outcome) && (
                      <span className="text-slate-400"> ({oddsEffect(outcome)})</span>
                    )}
                  </span>
                ))}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
