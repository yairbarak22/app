"use client";

import { formatMoney } from "@/lib/gameLogic";
import type { GameStats } from "@/lib/types";

function burnoutColor(burnout: number): string {
  if (burnout >= 75) return "bg-term-red";
  if (burnout >= 45) return "bg-term-amber";
  return "bg-term-green";
}

export default function StatsBar({
  stats,
  year,
  age,
  achievementCount,
}: {
  stats: GameStats;
  year: number;
  age: number;
  achievementCount: number;
}) {
  return (
    <div className="rounded-lg border border-term-border bg-term-panel p-3 text-sm">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-term-dim">
          YR {year} · AGE {age} · <span className="text-slate-200">{stats.title}</span>
        </span>
        <span className="flex shrink-0 items-baseline gap-2">
          {achievementCount > 0 && (
            <span className="text-xs text-term-dim">🏆{achievementCount}</span>
          )}
          <span
            className={`font-bold ${
              stats.netWorth < 0 ? "text-term-red" : "text-term-green"
            }`}
          >
            {formatMoney(stats.netWorth)}
          </span>
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="shrink-0 text-xs text-term-dim">BURNOUT</span>
        <div className="h-2 w-full overflow-hidden rounded-full bg-term-border">
          <div
            className={`h-full rounded-full transition-all duration-500 ${burnoutColor(stats.burnout)}`}
            style={{ width: `${stats.burnout}%` }}
          />
        </div>
        <span className="w-10 shrink-0 text-right text-xs text-term-dim">
          {stats.burnout}%
        </span>
      </div>
    </div>
  );
}
