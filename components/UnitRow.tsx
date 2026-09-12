"use client";
import Link from "next/link";
import type { Unit, UnitStatus } from "@/engine/curriculum";
import { Pill, ProgressBar } from "./ui";

function Ring({ percent, state }: { percent: number; state: UnitStatus["state"] }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const color = state === "done" ? "#1f9d55" : state === "started" ? "#2456d6" : "#e3e8f0";
  return (
    <div className="relative w-11 h-11 shrink-0">
      <svg viewBox="0 0 40 40" className="w-11 h-11 -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#e3e8f0" strokeWidth="4" />
        <circle cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={c} strokeDashoffset={c * (1 - percent / 100)} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-[0.7rem] font-bold tabular-nums">
        {state === "done" ? "✓" : `${percent}%`}
      </div>
    </div>
  );
}

/** One line in the table of contents: what the unit teaches and how much of it is done. */
export function UnitRow({
  unit, status, highlight, href,
}: {
  unit: Unit; status: UnitStatus; highlight?: boolean; href?: string;
}) {
  const body = (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
        highlight ? "border-brand bg-brand-soft/40" : "border-line bg-card hover:bg-paper"
      }`}
    >
      <Ring percent={status.percent} state={status.state} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-muted tabular-nums">יחידה {unit.number}</span>
          {unit.kind === "review" && <Pill tone="warn">חזרה</Pill>}
          {status.state === "done" && <Pill tone="ok">הושלמה</Pill>}
          {status.state === "started" && <Pill tone="brand">בתהליך</Pill>}
        </div>
        <div className="font-semibold truncate">{unit.titleHe}</div>
        <div className="text-xs text-muted truncate">{unit.subtitleHe}</div>
        <div className="mt-1.5 flex items-center gap-2">
          <ProgressBar value={status.done} max={status.total} className="flex-1" />
          <span className="text-xs text-muted tabular-nums shrink-0">
            {status.done}/{status.total}
          </span>
        </div>
      </div>
      <div className="text-xs text-muted shrink-0 tabular-nums">{unit.minutes}׳</div>
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}
