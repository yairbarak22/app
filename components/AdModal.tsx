"use client";

export default function AdModal({
  progress,
  onSkip,
}: {
  progress: number;
  onSkip: () => void;
}) {
  const pct = Math.round(progress * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-sm rounded-lg border border-term-border bg-term-panel p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-term-dim">
          Sponsored · Rewarded Ad (mock)
        </p>
        <div className="my-6 flex h-32 items-center justify-center rounded border border-dashed border-term-border">
          <p className="animate-pulse text-sm text-term-dim">
            ▶ Your ad network SDK renders here
          </p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-term-border">
          <div
            className="h-full bg-term-amber transition-all duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-term-dim">
          Reward unlocks at 100% — {pct}%
        </p>
        <button
          onClick={onSkip}
          className="mt-4 text-xs text-term-dim underline hover:text-term-red"
        >
          Skip ad (forfeit reward)
        </button>
      </div>
    </div>
  );
}
