"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppState, useHydrated } from "@/lib/store";
import { CURRICULUM, CHAPTERS } from "@/lib/curriculum";
import { unitStatus, nextUnit, type Unit } from "@/engine/curriculum";
import { Card, Pill, ProgressBar, Button, Hint, En } from "@/components/ui";
import { UnitRow } from "@/components/UnitRow";
import { CONTENT } from "@/content";
import * as A from "@/lib/actions";
import { Speak } from "@/components/Speak";

type Filter = "all" | "todo" | "started" | "done";

export default function UnitsPage() {
  const state = useAppState();
  const hydrated = useHydrated();
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);

  const statuses = useMemo(
    () => Object.fromEntries(CURRICULUM.map((u) => [u.id, unitStatus(u, state.units[u.id]?.done)])),
    [state.units],
  );
  const next = useMemo(() => nextUnit(CURRICULUM, state.units), [state.units]);

  if (!hydrated) return <div className="text-muted">טוען…</div>;

  const doneUnits = CURRICULUM.filter((u) => statuses[u.id].state === "done").length;
  const doneEx = CURRICULUM.reduce((a, u) => a + statuses[u.id].done, 0);
  const totalEx = CURRICULUM.reduce((a, u) => a + u.total, 0);
  const show = (u: Unit) => {
    const st = statuses[u.id].state;
    return filter === "all" || (filter === "todo" && st === "new") || (filter === "started" && st === "started") || (filter === "done" && st === "done");
  };

  const start = (u: Unit, restart = false) => {
    A.startUnit(u.id, { restart });
    router.push("/session/");
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">תוכן העניינים</h1>
        <Hint>
          {CURRICULUM.length} יחידות לפי סדר לימוד. אפשר לקפוץ לכל יחידה, גם קדימה, וגם לחזור לכל יחידה שכבר עשית.
        </Hint>
        <ProgressBar value={doneEx} max={totalEx} />
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{doneUnits}</div>
            <div className="text-xs text-muted">יחידות שהושלמו</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{Math.round((doneEx / totalEx) * 100)}%</div>
            <div className="text-xs text-muted">מהקורס</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{next.number}</div>
            <div className="text-xs text-muted">היחידה הבאה</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(
            [
              ["all", "הכול"],
              ["todo", "טרם התחלתי"],
              ["started", "בתהליך"],
              ["done", "הושלמו"],
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

      {CURRICULUM.filter(show).length === 0 && (
        <Card className="text-center flex flex-col gap-2">
          <div className="font-semibold">אין כאן יחידות</div>
          <Hint>
            {filter === "done"
              ? "עוד לא השלמת אף יחידה. יחידה נחשבת מושלמת כשעברת את כל התרגילים שבה."
              : filter === "started"
                ? "אין יחידה פתוחה באמצע. התחל יחידה חדשה מהמסך הראשי או מהרשימה כאן."
                : "סיימת הכול. אפשר לחזור על יחידות קודמות מהרשימה."}
          </Hint>
          <div>
            <Button variant="secondary" onClick={() => setFilter("all")}>
              הצג את כל היחידות
            </Button>
          </div>
        </Card>
      )}

      {CHAPTERS.map((chapter, ci) => {
        const units = chapter.units.filter(show);
        if (!units.length) return null;
        const chDone = chapter.units.reduce((a, u) => a + statuses[u.id].done, 0);
        const chTotal = chapter.units.reduce((a, u) => a + u.total, 0);
        return (
          <section key={`${chapter.strand}-${ci}`} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1">
              <h2 className="font-bold">{chapter.titleHe}</h2>
              <Pill>{Math.round((chDone / chTotal) * 100)}%</Pill>
              <span className="text-xs text-muted">
                יחידות {chapter.units[0].number}–{chapter.units[chapter.units.length - 1].number}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {units.map((u) => {
                const st = statuses[u.id];
                const isOpen = open === u.id;
                const topic = u.topicId ? CONTENT.topicById.get(u.topicId) : null;
                return (
                  <div key={u.id} className="flex flex-col gap-2">
                    <button type="button" onClick={() => setOpen(isOpen ? null : u.id)} className="text-start">
                      <UnitRow unit={u} status={st} highlight={u.id === next.id} />
                    </button>
                    {isOpen && (
                      <Card className="anim-rise flex flex-col gap-3">
                        {topic && (
                          <div>
                            <div className="text-sm font-bold mb-1">מה לומדים כאן</div>
                            <div className="text-sm text-muted leading-relaxed">{topic.lesson.explanationHe[0]}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-bold mb-1">מילים ביחידה</div>
                          <div className="flex flex-wrap gap-1.5">
                            {u.wordIds.map((id) => {
                              const w = CONTENT.vocabById.get(id);
                              if (!w) return null;
                              const learned = !!state.vocab[id];
                              return (
                                <span
                                  key={id}
                                  className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-sm ${learned ? "border-ok/40 bg-ok-soft" : "border-line bg-paper"}`}
                                >
                                  <En className="inline text-sm font-semibold">{w.word}</En>
                                  <span className="text-muted text-xs">{w.he}</span>
                                  <Speak text={w.word} size="sm" />
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm text-muted">
                          {u.sections.map((s) => (
                            <div key={s.id} className="flex justify-between">
                              <span>{s.titleHe}</span>
                              <span className="tabular-nums">
                                {s.exercises.length} תרגילים · {s.minutes}׳
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button onClick={() => start(u)}>
                            {st.state === "new" ? "התחל יחידה" : st.state === "started" ? "המשך יחידה" : "חזור על מה שנשאר"}
                          </Button>
                          {st.state !== "new" && (
                            <Button variant="secondary" onClick={() => start(u, true)}>
                              התחל מחדש מההתחלה
                            </Button>
                          )}
                        </div>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
