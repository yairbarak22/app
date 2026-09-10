"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Button({
  children, onClick, variant = "primary", disabled, className = "", type = "button", autoFocus,
}: {
  children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger"; disabled?: boolean; className?: string; type?: "button" | "submit"; autoFocus?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold transition active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  const styles = {
    primary: "bg-brand text-white hover:brightness-110",
    secondary: "bg-card border border-line text-ink hover:bg-paper",
    ghost: "text-muted hover:bg-paper",
    danger: "bg-bad text-white hover:brightness-110",
  }[variant];
  return (
    <button type={type} onClick={onClick} disabled={disabled} autoFocus={autoFocus} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`bg-card border border-line rounded-2xl p-5 shadow-sm ${className}`}>{children}</section>;
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "ok" | "bad" | "warn" | "brand" }) {
  const t = {
    neutral: "bg-paper text-muted",
    ok: "bg-ok-soft text-ok",
    bad: "bg-bad-soft text-bad",
    warn: "bg-warn-soft text-warn",
    brand: "bg-brand-soft text-brand",
  }[tone];
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${t}`}>{children}</span>;
}

export function ProgressBar({ value, max, className = "" }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className={`h-2 rounded-full bg-line overflow-hidden ${className}`} role="progressbar" aria-valuenow={pct}>
      <div className="h-full bg-brand transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** English text block, always LTR. */
export function En({ children, className = "", big }: { children: ReactNode; className?: string; big?: boolean }) {
  return <div className={`en ${big ? "text-2xl leading-relaxed" : "text-lg leading-relaxed"} ${className}`}>{children}</div>;
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted leading-relaxed">{children}</p>;
}

/** Countdown timer. Calls onDone once when reaching zero. */
export function useCountdown(seconds: number, running: boolean, onDone?: () => void) {
  const [left, setLeft] = useState(seconds);
  const doneRef = useRef(false);
  useEffect(() => {
    setLeft(seconds);
    doneRef.current = false;
  }, [seconds]);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          clearInterval(id);
          if (!doneRef.current) {
            doneRef.current = true;
            onDone?.();
          }
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, seconds]);
  return left;
}

export function TimerRing({ left, total }: { left: number; total: number }) {
  const pct = total > 0 ? left / total : 0;
  const r = 26;
  const c = 2 * Math.PI * r;
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");
  return (
    <div className="relative w-16 h-16">
      <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#e3e8f0" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={left <= 5 ? "#d63b3b" : "#2456d6"} strokeWidth="5" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums">
        {mm}:{ss}
      </div>
    </div>
  );
}

/** Three-point self-rating scale. */
export function Scale({ label, value, onChange, labels }: { label: string; value: number | null; onChange: (v: number) => void; labels: [string, string, string] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-sm font-semibold">{label}</div>
      <div className="grid grid-cols-3 gap-2">
        {labels.map((l, i) => {
          const v = i + 1;
          const active = value === v;
          return (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              className={`rounded-xl border px-2 py-2 text-sm transition ${active ? "border-brand bg-brand-soft text-brand font-semibold" : "border-line bg-card hover:bg-paper"}`}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Feedback({ ok, typo, children }: { ok: boolean | null; typo?: boolean; children?: ReactNode }) {
  if (ok === null) return null;
  const tone = ok ? (typo ? "bg-warn-soft border-warn/30" : "bg-ok-soft border-ok/30") : "bg-bad-soft border-bad/30";
  return (
    <div className={`anim-rise rounded-xl border p-4 ${tone}`}>
      <div className="font-bold mb-1">{ok ? (typo ? "נכון (עם שגיאת כתיב קטנה)" : "נכון!") : "לא בדיוק"}</div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/** Keyboard shortcut: Enter continues when a "continue" button is shown. */
export function useEnter(handler: (() => void) | null) {
  useEffect(() => {
    if (!handler) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [handler]);
}

/** Number keys 1-4 select an option. */
export function useNumberKeys(count: number, handler: ((i: number) => void) | null) {
  useEffect(() => {
    if (!handler) return;
    const fn = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= count && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) handler(n - 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [count, handler]);
}

export function Options({ options, chosen, answerIndex, onChoose, ltr = true }: { options: string[]; chosen: number | null; answerIndex: number; onChoose: (i: number) => void; ltr?: boolean }) {
  useNumberKeys(options.length, chosen === null ? onChoose : null);
  return (
    <div className="grid gap-2">
      {options.map((o, i) => {
        let cls = "border-line bg-card hover:bg-paper";
        if (chosen !== null) {
          if (i === answerIndex) cls = "border-ok bg-ok-soft";
          else if (i === chosen) cls = "border-bad bg-bad-soft";
          else cls = "border-line bg-card opacity-60";
        }
        return (
          <button
            key={i}
            type="button"
            disabled={chosen !== null}
            onClick={() => onChoose(i)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-start transition ${cls}`}
          >
            <span className="keycap">{i + 1}</span>
            <span className={ltr ? "en flex-1" : "flex-1"}>{o}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TextAnswer({
  value, onChange, onSubmit, disabled, placeholder = "Type your answer…", autoFocus = true,
}: { value: string; onChange: (v: string) => void; onSubmit: () => void; disabled?: boolean; placeholder?: string; autoFocus?: boolean }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!disabled && value.trim()) onSubmit();
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        dir="ltr"
        autoFocus={autoFocus}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="en flex-1 rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-brand disabled:bg-paper"
      />
      <Button type="submit" disabled={disabled || !value.trim()}>
        בדוק
      </Button>
    </form>
  );
}
