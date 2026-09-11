"use client";
import { useEffect, useMemo, useState } from "react";
import { useAppState, useHydrated } from "@/lib/store";
import { CONTENT } from "@/content";
import { Card, Pill, En, Hint, Button } from "@/components/ui";
import { Speak, SpeakLine } from "@/components/Speak";
import * as A from "@/lib/actions";
import { dayIndex } from "@/engine/days";

const STAGE_LABELS = ["נפגשנו", "מזהה", "משלים", "מייצר", "צירופים", "מדבר"];

export default function LibraryPage() {
  const state = useAppState();
  const hydrated = useHydrated();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "learning" | "new" | "known">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [day, setDay] = useState(0);
  useEffect(() => setDay(dayIndex()), []);

  const known = useMemo(() => new Set(state.known), [state.known]);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return CONTENT.vocab
      .filter((w) => {
        if (needle && !w.word.toLowerCase().includes(needle) && !w.he.includes(needle) && !w.def.toLowerCase().includes(needle)) return false;
        if (filter === "learning") return !!state.vocab[w.id];
        if (filter === "new") return !state.vocab[w.id] && !known.has(w.id);
        if (filter === "known") return known.has(w.id);
        return true;
      })
      .slice(0, 300);
  }, [q, filter, state.vocab, known]);

  if (!hydrated) return <div className="text-muted">טוען…</div>;

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">מילון אישי</h1>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="חפש מילה באנגלית או בעברית…"
          className="rounded-xl border border-line bg-card px-4 py-2.5 outline-none focus:border-brand"
        />
        <div className="flex gap-2 flex-wrap">
          {(
            [
              ["all", `הכול (${CONTENT.vocab.length})`],
              ["learning", `בלמידה (${Object.keys(state.vocab).length})`],
              ["new", "טרם נלמדו"],
              ["known", `סומנו כמוכרות (${state.known.length})`],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${filter === k ? "bg-brand text-white font-semibold" : "bg-paper text-muted hover:bg-line"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-2">
        {list.map((w) => {
          const card = state.vocab[w.id];
          const isOpen = open === w.id;
          return (
            <div key={w.id} className="bg-card border border-line rounded-2xl overflow-hidden">
              <button type="button" onClick={() => setOpen(isOpen ? null : w.id)} className="w-full flex items-center gap-2 px-4 py-3 text-start hover:bg-paper">
                <En className="text-base font-semibold flex-1">{w.word}</En>
                <Speak text={w.word} size="sm" />
                <span className="text-sm text-muted flex-1 text-end">{w.he}</span>
                {known.has(w.id) ? (
                  <Pill tone="neutral">מוכרת</Pill>
                ) : card ? (
                  <Pill tone={card.due <= day ? "warn" : "ok"}>{STAGE_LABELS[card.stage] ?? "בלמידה"}</Pill>
                ) : (
                  <Pill>רמה {w.band}</Pill>
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 flex flex-col gap-3 border-t border-line pt-3">
                  <En className="text-base text-muted">{w.def}</En>
                  <div className="flex flex-col gap-1">
                    {w.examples.map((e, i) => (
                      <SpeakLine key={i} text={e} className="text-base" />
                    ))}
                  </div>
                  {w.collocations?.length ? (
                    <div className="text-sm">
                      <span className="text-muted">צירופים: </span>
                      <span className="en inline-block font-semibold">{w.collocations.join(" · ")}</span>
                    </div>
                  ) : null}
                  {w.trap && <div className="rounded-xl bg-warn-soft border border-warn/25 p-3 text-sm">{w.trap}</div>}
                  {card && (
                    <Hint>
                      חזרות: {card.reps} · שכחות: {card.lapses} · מרווח נוכחי: {card.interval} ימים
                    </Hint>
                  )}
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => A.markKnown(w.id, !known.has(w.id))}>
                      {known.has(w.id) ? "החזר ללמידה" : "אני כבר יודע את זו"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {list.length === 0 && <Hint>לא נמצאו מילים.</Hint>}
        {list.length === 300 && <Hint>מוצגות 300 התוצאות הראשונות — צמצם את החיפוש.</Hint>}
      </div>
    </div>
  );
}
