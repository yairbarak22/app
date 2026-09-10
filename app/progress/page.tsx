"use client";
import { useEffect, useState } from "react";
import { useAppState, useHydrated } from "@/lib/store";
import { Card, Pill, ProgressBar, Hint, En } from "@/components/ui";
import { CONTENT } from "@/content";
import { dayIndex } from "@/engine/days";
import { isMastered, isLearned, recentAccuracy } from "@/engine/mastery";
import { isDue, isLeech } from "@/engine/srs";

const STAGE_LABELS = ["נפגשנו", "מזהה", "משלים במשפט", "מייצר", "צירופים", "מדבר"];
const STRAND_HE: Record<string, string> = {
  tenses: "זמנים",
  modals: "פעלים מודאליים",
  conditionals: "משפטי תנאי",
  "passive-reported": "סביל ודיבור עקיף",
  questions: "שאלות",
  "articles-nouns": "תוויות ושמות עצם",
  prepositions: "מילות יחס",
  "verb-patterns": "תבניות פועל",
  clauses: "פסוקיות וקישור",
  "word-order": "סדר מילים",
};

function Sparkline({ values, max = 3 }: { values: number[]; max?: number }) {
  if (values.length < 2) return <Hint>עוד אין מספיק נתונים לגרף — צריך לפחות יומיים.</Hint>;
  const w = 100;
  const h = 32;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - (Math.min(v, max) / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none" role="img" aria-label="מגמה">
      <polyline points={pts} fill="none" stroke="#2456d6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function ProgressPage() {
  const state = useAppState();
  const hydrated = useHydrated();
  const [day, setDay] = useState(0);
  useEffect(() => setDay(dayIndex()), []);
  if (!hydrated || !day) return <div className="text-muted">טוען…</div>;

  const cards = Object.entries(state.vocab);
  const byStage = [0, 1, 2, 3, 4, 5].map((s) => cards.filter(([, c]) => c.stage === s).length);
  const leeches = cards.filter(([, c]) => isLeech(c));
  const dueNow = cards.filter(([, c]) => c.reps > 0 && isDue(c, day)).length;

  const strands = Array.from(new Set(CONTENT.topics.map((t) => t.strand)));
  const last14 = state.history.slice(-14);
  const fluencySeries = last14.filter((h) => h.fluency).map((h) => h.fluency!.fluency);
  const accuracySeries = last14.filter((h) => h.fluency).map((h) => h.fluency!.accuracy);
  const tests = state.history.filter((h) => h.weeklyTest).slice(-8);
  const totalReviews = state.history.reduce((a, h) => a + h.reviews, 0);
  const totalCorrect = state.history.reduce((a, h) => a + h.reviewsCorrect, 0);
  const totalMinutes = state.history.reduce((a, h) => a + h.minutes, 0);
  const masteredCount = CONTENT.topics.filter((t) => state.topics[t.id] && isMastered(state.topics[t.id])).length;

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">סיכום כללי</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="rounded-xl bg-paper p-3">
            <div className="text-2xl font-bold tabular-nums">{state.history.filter((h) => h.completed).length}</div>
            <div className="text-xs text-muted">ימי תרגול</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-2xl font-bold tabular-nums">{Math.round(totalMinutes / 60)}</div>
            <div className="text-xs text-muted">שעות</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-2xl font-bold tabular-nums">{cards.length}</div>
            <div className="text-xs text-muted">מילים בלמידה</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-2xl font-bold tabular-nums">{totalReviews ? Math.round((totalCorrect / totalReviews) * 100) : 0}%</div>
            <div className="text-xs text-muted">דיוק כולל</div>
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">אוצר מילים לפי שלב</h2>
          <Pill tone={dueNow > 100 ? "warn" : "neutral"}>{dueNow} לחזרה</Pill>
        </div>
        <div className="flex flex-col gap-2">
          {byStage.map((n, s) => (
            <div key={s} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm">{STAGE_LABELS[s]}</span>
              <ProgressBar value={n} max={Math.max(1, ...byStage)} className="flex-1" />
              <span className="w-10 text-end text-sm tabular-nums text-muted">{n}</span>
            </div>
          ))}
        </div>
        <Hint>
          מתוך {CONTENT.vocab.length} מילים בבנק. {state.known.length > 0 && `${state.known.length} סימנת כמוכרות. `}
          {leeches.length > 0 && `${leeches.length} מילים עקשניות חוזרות אליך בתדירות גבוהה.`}
        </Hint>
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">מפת הדקדוק</h2>
          <Pill tone="brand">
            {masteredCount} / {CONTENT.topics.length} נשלטו
          </Pill>
        </div>
        {strands.map((s) => {
          const topics = CONTENT.topics.filter((t) => t.strand === s);
          return (
            <div key={s} className="flex flex-col gap-1.5">
              <div className="text-sm font-semibold text-muted">{STRAND_HE[s] ?? s}</div>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t) => {
                  const ts = state.topics[t.id];
                  const acc = ts ? recentAccuracy(ts) : null;
                  const tone = !ts || ts.attempts === 0 ? "bg-line text-muted" : isMastered(ts) ? "bg-ok text-white" : isLearned(ts) ? "bg-ok-soft text-ok" : ts.p >= 0.5 ? "bg-warn-soft text-warn" : "bg-bad-soft text-bad";
                  return (
                    <span
                      key={t.id}
                      title={ts ? `${Math.round(ts.p * 100)}% · ${ts.attempts} תרגילים${acc !== null ? ` · דיוק אחרון ${Math.round(acc * 100)}%` : ""}` : "עוד לא תורגל"}
                      className={`rounded-lg px-2 py-1 text-xs font-medium ${tone}`}
                    >
                      {t.titleHe}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
        <Hint>אפור = טרם תורגל · אדום/כתום = בבנייה · ירוק בהיר = נלמד · ירוק מלא = נשלט (נשאר בחזרות מרווחות)</Hint>
      </Card>

      <Card className="flex flex-col gap-3">
        <h2 className="font-bold">שטף דיבור (דירוג עצמי)</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted mb-1">שטף</div>
            <Sparkline values={fluencySeries} />
          </div>
          <div>
            <div className="text-sm text-muted mb-1">דיוק</div>
            <Sparkline values={accuracySeries} />
          </div>
        </div>
      </Card>

      {tests.length > 0 && (
        <Card className="flex flex-col gap-3">
          <h2 className="font-bold">מבחנים שבועיים</h2>
          <div className="flex flex-col gap-2">
            {tests.map((t) => (
              <div key={t.day} className="flex items-center gap-3">
                <span className="w-24 text-sm text-muted tabular-nums">{t.date}</span>
                <ProgressBar value={t.weeklyTest!.score} max={t.weeklyTest!.total} className="flex-1" />
                <span className="w-14 text-end text-sm tabular-nums">
                  {t.weeklyTest!.score}/{t.weeklyTest!.total}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {leeches.length > 0 && (
        <Card className="flex flex-col gap-2">
          <h2 className="font-bold">המילים העקשניות שלך</h2>
          <Hint>אלה מילים שנשכחו שוב ושוב. שווה להמציא לכל אחת משפט אישי שקשור אליך.</Hint>
          <div className="flex flex-wrap gap-2">
            {leeches.slice(0, 20).map(([id]) => {
              const w = CONTENT.vocabById.get(id);
              return w ? (
                <span key={id} className="rounded-lg border border-warn/30 bg-warn-soft px-2 py-1 text-sm">
                  <En className="inline text-sm font-semibold">{w.word}</En> <span className="text-muted">{w.he}</span>
                </span>
              ) : null;
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
