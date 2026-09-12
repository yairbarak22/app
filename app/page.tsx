"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppState, useHydrated } from "@/lib/store";
import { Button, Card, Pill, ProgressBar, Hint } from "@/components/ui";
import * as A from "@/lib/actions";
import { CONTENT } from "@/content";
import { CURRICULUM, unitById } from "@/lib/curriculum";
import { unitStatus, nextUnit } from "@/engine/curriculum";
import { dayIndex, weekday } from "@/engine/days";
import { dueVocabCount, retention7 } from "@/engine/level";
import { isDue } from "@/engine/srs";
import { UnitRow } from "@/components/UnitRow";

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
  const finishedUnitId = params.get("unit");
  const [day, setDay] = useState(0);

  useEffect(() => setDay(dayIndex()), []);
  useEffect(() => {
    if (hydrated && !state.placementDone) router.replace("/placement/");
  }, [hydrated, state.placementDone, router]);

  if (!hydrated || !day) return <div className="text-muted">טוען…</div>;
  if (!state.placementDone) return null;

  const active = state.session && !state.session.finished ? state.session : null;
  const activeUnit = unitById(active?.unitId);
  const current = nextUnit(CURRICULUM, state.units);
  const currentStatus = unitStatus(current, state.units[current.id]?.done);
  const finishedUnit = unitById(finishedUnitId);
  const finishedStatus = finishedUnit ? unitStatus(finishedUnit, state.units[finishedUnit.id]?.done) : null;
  const todayLog = state.history.find((h) => h.day === day);

  const doneUnits = CURRICULUM.filter((u) => unitStatus(u, state.units[u.id]?.done).state === "done").length;
  const doneExercises = CURRICULUM.reduce((a, u) => a + unitStatus(u, state.units[u.id]?.done).done, 0);
  const totalExercises = CURRICULUM.reduce((a, u) => a + u.total, 0);
  const streak = streakOf(state.history.filter((h) => h.completed).map((h) => h.day), day);
  const due = dueVocabCount(state, day) + Object.values(state.chunks).filter((c) => c.reps > 0 && isDue(c, day)).length;
  const ret = retention7(state);
  const isTestDay = weekday(day) === 6;

  return (
    <div className="flex flex-col gap-5">
      {justFinished && (
        <Card className="anim-rise bg-ok-soft border-ok/30 flex flex-col gap-3">
          <h2 className="text-lg font-bold">
            {finishedStatus?.state === "done" ? `סיימת את יחידה ${finishedUnit!.number} 🎉` : "כל הכבוד, התקדמת"}
          </h2>
          {finishedUnit && finishedStatus && (
            <>
              <div className="font-semibold">{finishedUnit.titleHe}</div>
              <ProgressBar value={finishedStatus.done} max={finishedStatus.total} />
              <div className="text-sm text-muted">
                {finishedStatus.done} מתוך {finishedStatus.total} תרגילים ביחידה
              </div>
            </>
          )}
          {todayLog && (
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
          )}
          {todayLog?.weeklyTest && (
            <div className="text-sm">
              מבחן שבועי: <b>{todayLog.weeklyTest.score}</b> מתוך {todayLog.weeklyTest.total}
            </div>
          )}
        </Card>
      )}

      <Card className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">יום {DAY_NAMES[weekday(day)]}</h1>
            <Hint>
              {doneUnits} מתוך {CURRICULUM.length} יחידות הושלמו · {doneExercises} מתוך {totalExercises} תרגילים
            </Hint>
          </div>
          <div className="flex gap-2">
            <Pill tone={streak > 0 ? "ok" : "neutral"}>🔥 רצף {streak}</Pill>
            <Pill tone="brand">רמה {state.band}</Pill>
          </div>
        </div>
        <ProgressBar value={doneExercises} max={totalExercises} />

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{due}</div>
            <div className="text-xs text-muted">לחזרה היום</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{Object.keys(state.vocab).length}</div>
            <div className="text-xs text-muted">מילים בלמידה</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{ret === null ? "—" : `${Math.round(ret * 100)}%`}</div>
            <div className="text-xs text-muted">זכירה (7 ימים)</div>
          </div>
        </div>
      </Card>

      {active && activeUnit ? (
        <Card className="flex flex-col gap-3 border-brand/40">
          <Pill tone="brand">יש לך סשן פתוח</Pill>
          <div className="font-bold text-lg">
            יחידה {activeUnit.number} · {activeUnit.titleHe}
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => router.push("/session/")}>
              המשך מהמקום שבו הפסקת
            </Button>
            <Button variant="ghost" onClick={() => A.abandonSession()}>
              בטל
            </Button>
          </div>
        </Card>
      ) : active ? (
        <Card className="flex flex-col gap-3 border-brand/40">
          <Pill tone="brand">חזרה פתוחה</Pill>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => router.push("/session/")}>
              המשך בחזרה
            </Button>
            <Button variant="ghost" onClick={() => A.abandonSession()}>
              בטל
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold">היחידה הבאה שלך</h2>
            <Link href="/units/" className="text-sm text-brand font-semibold hover:underline">
              תוכן העניינים ←
            </Link>
          </div>
          <UnitRow unit={current} status={currentStatus} highlight />
          <Button
            onClick={() => {
              A.startUnit(current.id);
              router.push("/session/");
            }}
          >
            {currentStatus.state === "started" ? `המשך יחידה ${current.number}` : `התחל יחידה ${current.number}`}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              A.startReview();
              router.push("/session/");
            }}
          >
            {isTestDay ? "מבחן שבועי וחזרה" : `חזרה בלבד${due ? ` · ${due} כרטיסים` : ""}`}
          </Button>
          <Hint>
            החזרה היומית עצמאית מהיחידות: היא מביאה בדיוק את המילים והנושאים שהגיע זמנם, ולא מקדמת את אחוז היחידה.
          </Hint>
        </Card>
      )}

      <Card className="flex flex-col gap-2">
        <h2 className="font-bold">איך מתרגלים נכון</h2>
        <ul className="text-sm text-muted flex flex-col gap-1.5 leading-relaxed">
          <li>• בשלבי הדיבור <b>מדברים בקול רם</b>, גם אם אף אחד לא שומע. מחשבה בראש לא בונה שטף.</li>
          <li>• ליד כל משפט באנגלית יש כפתור השמעה, ולידו כפתור <b>0.7×</b> להאטה. שמע קודם, ואז חזור אחריו בקול.</li>
          <li>• יחידה אחת ליום עדיפה על שלוש ברצף. מה שנלמד חוזר אליך בחזרה היומית בדיוק כשהוא מתחיל להישכח.</li>
          <li>• אפשר לקפוץ לכל יחידה מ{" "}
            <Link href="/units/" className="text-brand hover:underline">
              תוכן העניינים
            </Link>
            , ולחזור אחורה לכל יחידה שכבר עשית.
          </li>
        </ul>
      </Card>
      <div className="text-center text-xs text-muted">{CONTENT.vocab.length} מילים · {CONTENT.topics.length} נושאי דקדוק</div>
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
