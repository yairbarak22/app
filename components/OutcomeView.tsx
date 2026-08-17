"use client";

import { formatMoney } from "@/lib/gameLogic";
import type { Outcome } from "@/lib/types";

export default function OutcomeView({
  outcome,
  onContinue,
}: {
  outcome: Outcome;
  onContinue: () => void;
}) {
  const { netWorth = 0, burnout = 0 } = outcome.effect;

  return (
    <div className="flex flex-col gap-4">
      <p className="leading-relaxed text-slate-300">{outcome.text}</p>

      <div className="flex flex-wrap gap-2 text-xs">
        {netWorth !== 0 && (
          <span
            className={`rounded border px-2 py-1 ${
              netWorth > 0
                ? "border-term-green/40 text-term-green"
                : "border-term-red/40 text-term-red"
            }`}
          >
            {netWorth > 0 ? "+" : ""}
            {formatMoney(netWorth)} net worth
          </span>
        )}
        {burnout !== 0 && (
          <span
            className={`rounded border px-2 py-1 ${
              burnout > 0
                ? "border-term-red/40 text-term-red"
                : "border-term-green/40 text-term-green"
            }`}
          >
            {burnout > 0 ? "+" : ""}
            {burnout}% burnout
          </span>
        )}
        {outcome.effect.title && (
          <span className="rounded border border-term-border px-2 py-1 text-term-dim">
            → {outcome.effect.title}
          </span>
        )}
      </div>

      <button
        onClick={onContinue}
        className="rounded-lg border border-term-green/50 bg-term-green/10 p-3 text-sm font-bold text-term-green transition-colors hover:bg-term-green/20"
      >
        {outcome.next ? "NEXT YEAR →" : "SEE YOUR FINAL CARD →"}
      </button>
    </div>
  );
}
