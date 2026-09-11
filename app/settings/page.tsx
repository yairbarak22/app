"use client";
import { useRef, useState } from "react";
import { useAppState, useHydrated, getState } from "@/lib/store";
import { Card, Button, Hint } from "@/components/ui";
import * as A from "@/lib/actions";
import { CONTENT } from "@/content";
import { SpeechSettings } from "@/components/SpeechSettings";

export default function SettingsPage() {
  const state = useAppState();
  const hydrated = useHydrated();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!hydrated) return <div className="text-muted">טוען…</div>;

  const download = () => {
    const blob = new Blob([A.exportJson(getState())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `english-trainer-${A.todayDate()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      <Card className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">הגדרות תרגול</h1>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">זמן יומי: {state.settings.minutes} דקות</span>
          <input
            type="range"
            min={10}
            max={90}
            step={5}
            value={state.settings.minutes}
            onChange={(e) => A.setSettings({ minutes: Number(e.target.value) })}
            className="accent-brand"
          />
          <Hint>התוכנית היומית נבנית לפי הזמן הזה. אפשר לבחור זמן קצר יותר גם ביום ספציפי, מהמסך הראשי.</Hint>
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-semibold">מילים חדשות ביום: {state.settings.newWordsPerDay}</span>
          <input
            type="range"
            min={0}
            max={25}
            step={1}
            value={state.settings.newWordsPerDay}
            onChange={(e) => A.setSettings({ newWordsPerDay: Number(e.target.value) })}
            className="accent-brand"
          />
          <Hint>
            זו תקרה, לא מכסה. אם נערמות חזרות או שאחוז הזכירה יורד, המערכת מורידה את הקצב לבד; אם הזכירה גבוהה והמצבור
            קטן, היא מעלה אותו.
          </Hint>
        </label>
      </Card>

      <SpeechSettings />

      <Card className="flex flex-col gap-3">
        <h2 className="font-bold">גיבוי הנתונים</h2>
        <Hint>
          כל ההתקדמות נשמרת בדפדפן הזה בלבד ({Object.keys(state.vocab).length} מילים, {state.history.length} ימים). ניקוי
          נתוני אתר ימחק אותה. שמור קובץ גיבוי מדי פעם.
        </Hint>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={download}>
            ייצא קובץ גיבוי
          </Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>
            ייבא גיבוי
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const ok = A.importJson(await f.text());
              setMsg(ok ? "הגיבוי יובא בהצלחה." : "הקובץ לא תקין.");
              e.target.value = "";
            }}
          />
        </div>
        {msg && <div className="text-sm font-semibold">{msg}</div>}
      </Card>

      <Card className="flex flex-col gap-3">
        <h2 className="font-bold">מה יש בלומדה</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{CONTENT.vocab.length}</div>
            <div className="text-xs text-muted">מילים</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{CONTENT.topics.length}</div>
            <div className="text-xs text-muted">נושאי דקדוק</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{CONTENT.chunks.length}</div>
            <div className="text-xs text-muted">ביטויי דיבור</div>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <div className="text-xl font-bold tabular-nums">{CONTENT.oral.length}</div>
            <div className="text-xs text-muted">משפטי תרגום</div>
          </div>
        </div>
      </Card>

      <Card className="flex flex-col gap-3">
        <h2 className="font-bold text-bad">אזור מסוכן</h2>
        <Hint>איפוס מוחק את כל ההתקדמות: מילים, דקדוק, היסטוריה ורצף. אין דרך חזרה בלי קובץ גיבוי.</Hint>
        {confirmReset ? (
          <div className="flex gap-2">
            <Button
              variant="danger"
              onClick={() => {
                A.resetAll();
                setConfirmReset(false);
                setMsg("הכול אופס.");
              }}
            >
              כן, מחק הכול
            </Button>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              ביטול
            </Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setConfirmReset(true)}>
            אפס את כל ההתקדמות
          </Button>
        )}
      </Card>
    </div>
  );
}
