"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/gameLogic";
import type { Ending, GameStats, LogEntry } from "@/lib/types";

const GAME_URL = "https://techcareersim.com"; // TODO: real domain at launch

function buildShareText(age: number, stats: GameStats, ending: Ending): string {
  if (ending.kind === "burnout") {
    return `I burned out at age ${age} with ${formatMoney(stats.netWorth)} as a "${stats.title}" in the Tech Career Simulator. The pager won. Think you can survive? → ${GAME_URL}`;
  }
  return `I made it to age ${age} with ${formatMoney(stats.netWorth)} as a "${stats.title}" in the Tech Career Simulator. Think you can beat me? → ${GAME_URL}`;
}

export default function GameOverCard({
  ending,
  stats,
  age,
  log,
  onRestart,
}: {
  ending: Ending;
  stats: GameStats;
  age: number;
  log: LogEntry[];
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const shareText = buildShareText(age, stats, ending);

  const shareToX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank",
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(GAME_URL)}`,
      "_blank",
    );
  };

  const copyShareText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (e.g. non-secure context) — no-op
    }
  };

  const isBurnout = ending.kind === "burnout";

  return (
    <div className="flex flex-col gap-4">
      {/* Scorecard — designed to be screenshot-friendly */}
      <div
        className={`rounded-xl border-2 p-5 ${
          isBurnout
            ? "border-term-red/60 bg-term-red/5"
            : "border-term-green/60 bg-term-green/5"
        }`}
      >
        <p className="text-xs uppercase tracking-widest text-term-dim">
          Tech Career Simulator · Player Card
        </p>
        <h2
          className={`mt-2 text-2xl font-black ${
            isBurnout ? "text-term-red" : "text-term-green"
          }`}
        >
          {ending.headline}
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-term-dim">FINAL AGE</p>
            <p className="text-lg font-bold text-slate-100">{age}</p>
          </div>
          <div>
            <p className="text-xs text-term-dim">NET WORTH</p>
            <p
              className={`text-lg font-bold ${
                stats.netWorth < 0 ? "text-term-red" : "text-term-green"
              }`}
            >
              {formatMoney(stats.netWorth)}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-term-dim">FINAL TITLE</p>
            <p className="text-lg font-bold text-slate-100">{stats.title}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-term-dim">ACHIEVEMENT</p>
            <p className="text-slate-300">{ending.achievement}</p>
          </div>
        </div>

        {log.length > 0 && (
          <div className="mt-4 border-t border-term-border pt-3">
            <p className="text-xs text-term-dim">CAREER LOG</p>
            <ul className="mt-1 space-y-0.5 text-xs text-slate-400">
              {log.map((entry, i) => (
                <li key={i} className="truncate">
                  <span className="text-term-green">Y{entry.year}</span>{" "}
                  {entry.isRandomEvent ? "⚡ " : ""}
                  {entry.headline}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm font-bold">
        <button
          onClick={shareToX}
          className="rounded-lg border border-term-border bg-term-panel p-3 transition-colors hover:border-term-green/50"
        >
          Share on 𝕏
        </button>
        <button
          onClick={shareToLinkedIn}
          className="rounded-lg border border-term-border bg-term-panel p-3 transition-colors hover:border-term-green/50"
        >
          Share on LinkedIn
        </button>
        <button
          onClick={copyShareText}
          className="col-span-2 rounded-lg border border-term-border bg-term-panel p-3 text-term-dim transition-colors hover:border-term-green/50"
        >
          {copied ? "Copied ✓" : "Copy brag text"}
        </button>
      </div>

      <button
        onClick={onRestart}
        className="rounded-lg border border-term-green/50 bg-term-green/10 p-3 text-sm font-bold text-term-green transition-colors hover:bg-term-green/20"
      >
        ↻ RUN IT BACK
      </button>
    </div>
  );
}
