"use client";

import { useEffect, useMemo, useRef } from "react";
import { fireConfetti, pickWinQuip } from "@/lib/confetti";
import { formatMoney } from "@/lib/gameLogic";
import type { RollResult } from "@/lib/store";
import type { Achievement, Outcome } from "@/lib/types";

/** How hard to celebrate this outcome. */
function celebrationLevel(
  outcome: Outcome,
  roll: RollResult | null,
  unlocks: Achievement[],
): "jackpot" | "win" | null {
  const gain = outcome.effect.netWorth ?? 0;
  if (roll?.won || gain >= 150_000) return "jackpot";
  if (unlocks.length > 0 || gain >= 50_000) return "win";
  return null;
}

export default function OutcomeView({
  outcome,
  roll,
  unlocks,
  onContinue,
}: {
  outcome: Outcome;
  roll: RollResult | null;
  unlocks: Achievement[];
  onContinue: () => void;
}) {
  const { netWorth = 0, burnout = 0 } = outcome.effect;
  const celebration = celebrationLevel(outcome, roll, unlocks);
  const quip = useMemo(
    () => (celebration ? pickWinQuip() : null),
    // one quip per outcome screen
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [outcome],
  );

  const fired = useRef(false);
  useEffect(() => {
    if (celebration && !fired.current) {
      fired.current = true;
      fireConfetti(celebration);
    }
  }, [celebration]);

  return (
    <div className="flex flex-col gap-4">
      {roll && (
        <div
          className={`anim-pop rounded-xl border p-3 text-sm ${
            roll.won
              ? "border-term-green/60 bg-term-green/10"
              : "border-term-purple/50 bg-term-purple/10"
          }`}
        >
          <p className={`font-bold ${roll.won ? "text-term-green" : "text-term-purple"}`}>
            {roll.won
              ? `🎲 JACKPOT — the ${Math.round(roll.chance * 100)}% hit!`
              : `🎲 The dice landed on the ${Math.round(roll.chance * 100)}% outcome`}
          </p>
          <p className="mt-0.5 text-slate-300">{roll.label}</p>
        </div>
      )}

      {celebration && quip && (
        <p className="anim-rise-1 text-sm font-bold text-term-amber">✨ {quip}</p>
      )}

      <p className="anim-rise-1 leading-relaxed text-slate-300">{outcome.text}</p>

      <div className="anim-rise-2 flex flex-wrap gap-2 text-xs">
        {netWorth !== 0 && (
          <span
            className={`rounded-md border px-2 py-1 font-bold tabular-nums ${
              netWorth > 0
                ? "border-term-green/40 bg-term-green/5 text-term-green"
                : "border-term-red/40 bg-term-red/5 text-term-red"
            }`}
          >
            {netWorth > 0 ? "+" : ""}
            {formatMoney(netWorth)}
          </span>
        )}
        {burnout !== 0 && (
          <span
            className={`rounded-md border px-2 py-1 font-bold tabular-nums ${
              burnout > 0
                ? "border-term-red/40 bg-term-red/5 text-term-red"
                : "border-term-green/40 bg-term-green/5 text-term-green"
            }`}
          >
            {burnout > 0 ? "+" : ""}
            {burnout}% burnout
          </span>
        )}
        {outcome.effect.title && (
          <span className="rounded-md border border-term-border px-2 py-1 text-term-dim">
            → {outcome.effect.title}
          </span>
        )}
      </div>

      {unlocks.map((achievement, i) => (
        <div
          key={achievement.id}
          className={`anim-rise-${Math.min(i + 2, 3)} rounded-xl border border-term-amber/50 bg-term-amber/10 p-3 text-sm`}
        >
          <p className="font-bold text-term-amber">
            {achievement.icon} Achievement: {achievement.name}
          </p>
          <p className="mt-0.5 text-slate-300">{achievement.description}</p>
          {achievement.reward && (
            <p className="mt-1 text-xs font-bold text-term-green">
              Prize:
              {achievement.reward.netWorth
                ? ` +${formatMoney(achievement.reward.netWorth)}`
                : ""}
              {achievement.reward.burnout
                ? ` ${achievement.reward.burnout > 0 ? "+" : ""}${achievement.reward.burnout}% burnout`
                : ""}
            </p>
          )}
        </div>
      ))}

      <button
        onClick={onContinue}
        className="press-scale anim-rise-3 rounded-xl border border-term-green/50 bg-term-green/10 p-3 text-sm font-bold text-term-green transition-colors hover:bg-term-green/20"
      >
        {outcome.next ? "NEXT YEAR →" : "SEE YOUR FINAL CARD →"}
      </button>
    </div>
  );
}
