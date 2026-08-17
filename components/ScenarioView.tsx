"use client";

import type { Choice, RandomEvent, Scenario } from "@/lib/types";

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
                : "border-term-border bg-term-panel hover:border-term-green/50 hover:bg-term-green/5"
            }`}
          >
            <span className="mr-2 text-term-green">[{String.fromCharCode(65 + i)}]</span>
            <span className="text-slate-200">{choice.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
