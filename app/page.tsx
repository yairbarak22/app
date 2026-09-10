"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAppState, useHydrated } from "@/lib/store";
import { Button, Card, Pill, ProgressBar, Hint } from "@/components/ui";
import * as A from "@/lib/actions";
import { CONTENT } from "@/content";
import { buildSession, sessionMinutes } from "@/engine/planner";
import { dayIndex, weekday } from "@/engine/days";
import { dueVocabCount, retention7 } from "@/engine/level";
import { isDue } from "@/engine/srs";

const DAY_NAMES = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

function streakOf(days: number[], today: number): number {
  const set = new Set(days);
  let n = 0;
  let d = set.has(today) ? today : today - 1;
  while (set.has(d)) {
    n++;
    d--;
  }
  return n;
}

function TodayInner() {
  const state = useAppState();
  const hydrated = useHydrated();
  const router = useRouter();
  const params = useSearchParams();
  const justFinished = params.get("done") === "1";
  const [day, setDay] = useState(0);

  useEffect(() => setDay(dayIndex()), []);
  useEffect(() => {
    if (hydrated && !state.placementDone) router.replace("/placement/");
  }, [hydrated, state.placementDone, router]);

  if (!hydrated || !day) return <div className="text-muted">טוען…</div>;
  if (!state.placementDone) return null;

  const active = state.session && !state.session.finished && state.session.day === day ? state.session : null;
  const staleSession = state.session && !state.session.finished && state.session.day !== day ? state.session : null;
  const todayLog = state.history.find((h) => h.day === day);
  const preview = active ?? buildSession(state, CONTENT, day, state.settings.minutes);
  const streak = streakOf(state.history.filter((h) => h.completed).map((h) => h.day), day);
  const due = dueVocabCount(state, day);
  const dueChunks = Object.values(state.chunks).filter((c) => c.reps > 0 && isDue(c, day)).length;
  const ret = retention7(state);
  const learned = Object.keys(state.vocab).length;
  const isTestDay = weekday(day) === 6;

  const start = (minutes?: number) => {
    A.startSession(minutes);
    router.push("/session/");
  };

  return (
    <div className="flex flex-col gap-5">
      {justFinished && todayLog && (
        <Card className="anim-rise bg-ok-soft border-ok/30 flex flex-col gap-2">
          <h2 className="text-lg font-bold">סיימת את התרגול של היום 🎉</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-2xl font-bold tabular-nums">{todayLog.minutes}</div>
              <div className="text-xs text-muted">דקות</div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums">{todayLog.newWords}</div>
              <div className="text-xs text-muted">מילים חדשות</div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums">
                {todayLog.reviews ? Math.round((todayLog.reviewsCorrect / todayLog.reviews) * 100) : 0}%
              </div>
              <div className="text-xs text-muted">דיוק בחזרות</div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums">
                {todayLog.grammarItems ? Math.round((todayLog.grammarCorrect / todayLog.grammarItems) * 100) : 0}%
              </div>
              <div className="text-xs text-muted">דיוק בדקדוק</div>
            </div>
          </div>
          {todayLog.weeklyTest && (
            <div className="text-sm">
              מבחן שבועי: <b>{todayLog.weeklyTest.score}</b> מתוך {todayLog.weeklyTest.total}
            </div>
          )}
          <Link href="/progress/" className="text-brand text-sm font-semibold hover:underline">
            לצפייה בהתקדמות →
          </Link>
        </Card>
      )}

      <Card className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">יום {DAY_NAMES[weekday(day)]}</h1>
            <Hint>
              {isTestDay ? "היום שבת — יום חזרה ומבחן שבועי." : `${preview.blocks.length} שלבים · כ־${sessionMinutes(preview)} דקות`}
            </Hint>
          </div>
          <div className="flex gap-2">
            <Pill tone={streak > 0 ? "ok" : "neutral"}>🔥 רצף {streak}</Pill>
            <Pill tone="brand">רמה {state.band}</Pill>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{due + dueChunks}</div>
            <div className="text-xs text-muted">לחזרה היום</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{learned}</div>
            <div className="text-xs text-muted">מילים בלמידה</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{ret === null ? "—" : `${Math.round(ret * 100)}%`}</div>
            <div className="text-xs text-muted">זכירה (7 ימים)</div>
          </div>
        </div>

        <ol className="flex flex-col gap-1.5">
          {preview.blocks.map((b, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2">
              <span className="w-6 h-6 shrink-0 grid place-items-center rounded-full bg-brand-soft text-brand text-xs font-bold">{i + 1}</span>
              <span className="flex-1 text-sm font-medium">{b.titleHe}</span>
              <span className="text-xs text-muted tabular-nums">{b.minutes} דק׳</span>
            </li>
          ))}
        </ol>

        {active ? (
          <div className="flex flex-col gap-2">
            <ProgressBar
              value={active.blocks.reduce((a, b) => a + b.done, 0)}
              max={active.blocks.reduce((a, b) => a + b.queue.length, 0)}
            />
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => router.push("/session/")}>
                המשך מהמקום שבו הפסקת
              </Button>
              <Button variant="ghost" onClick={() => A.abandonSession()}>
                בטל
              </Button>
            </div>
          </div>
        ) : todayLog?.completed ? (
          <div className="flex flex-col gap-2">
            <Hint>סיימת היום. אפשר לעשות סיבוב נוסף — החזרות שכבר עשית לא יחזרו.</Hint>
            <Button variant="secondary" onClick={() => start()}>
              סיבוב נוסף
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button onClick={() => start()}>התחל תרגול · {state.settings.minutes} דקות</Button>
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => start(30)}>
                יש לי רק 30 דק׳
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => start(15)}>
                רק 15 דק׳
              </Button>
            </div>
          </div>
        )}

        {staleSession && (
          <Hint>
            יש סשן פתוח מיום קודם.{" "}
            <button className="text-brand hover:underline" onClick={() => A.abandonSession()}>
              מחק אותו
            </button>{" "}
            כדי להתחיל מחדש.
          </Hint>
        )}
      </Card>

      <Card className="flex flex-col gap-2">
        <h2 className="font-bold">איך מתרגלים נכון</h2>
        <ul className="text-sm text-muted flex flex-col gap-1.5 leading-relaxed">
          <li>• בשלבי הדיבור <b>מדברים בקול רם</b>, גם אם אף אחד לא שומע. מחשבה בראש לא בונה שטף.</li>
          <li>• טעות היא מידע, לא כישלון — הסבר קצר מופיע אחרי כל תשובה, קרא אותו.</li>
          <li>• עדיף 60 דקות ביום בכל יום מאשר 3 שעות פעם בשבוע. החזרות מתוזמנות לפי מרווחים.</li>
        </ul>
      </Card>
    </div>
  );
}

export default function TodayPage() {
  return (
    <Suspense fallback={<div className="text-muted">טוען…</div>}>
      <TodayInner />
    </Suspense>
  );
}
