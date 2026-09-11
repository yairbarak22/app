"use client";
import { useState } from "react";
import { useAppState } from "@/lib/store";
import { Card, Button, Hint, Pill } from "./ui";
import { Speak, useVoices, useSpeaker } from "./Speak";
import * as A from "@/lib/actions";
import { speechSupported } from "@/lib/speech";

const SAMPLE = "I've been living here for about three years, and to be honest, I still get lost sometimes.";

export function SpeechSettings() {
  const { speech } = useAppState().settings;
  const voices = useVoices();
  const { supported } = useSpeaker();
  const [tested, setTested] = useState(false);
  const ready = typeof window !== "undefined" && speechSupported();

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold">השמעת משפטים</h2>
        {ready ? <Pill tone="ok">נתמך בדפדפן הזה</Pill> : <Pill tone="warn">לא נתמך כאן</Pill>}
      </div>

      {!ready ? (
        <Hint>
          הדפדפן הזה לא חושף מנוע הקראה. נסה Chrome, Edge או Safari מעודכנים; באנדרואיד ובאייפון זה עובד מהקופסה.
        </Hint>
      ) : (
        <>
          <label className="flex items-center justify-between gap-3 cursor-pointer">
            <span className="font-semibold">כפתורי השמעה ליד כל משפט באנגלית</span>
            <input
              type="checkbox"
              checked={speech.enabled}
              onChange={(e) => A.setSpeech({ enabled: e.target.checked })}
              className="w-5 h-5 accent-brand"
            />
          </label>

          <label className="flex items-center justify-between gap-3 cursor-pointer">
            <span className="font-semibold">השמע אוטומטית תשובות לדוגמה</span>
            <input
              type="checkbox"
              checked={speech.autoplay}
              disabled={!speech.enabled}
              onChange={(e) => A.setSpeech({ autoplay: e.target.checked })}
              className="w-5 h-5 accent-brand disabled:opacity-40"
            />
          </label>
          <Hint>כשזה דולק, המשפט הנכון מושמע מעצמו ברגע שהוא נחשף — בלי ללחוץ.</Hint>

          <label className="flex flex-col gap-2">
            <span className="font-semibold">מהירות דיבור: {speech.rate.toFixed(2)}×</span>
            <input
              type="range"
              min={0.6}
              max={1.2}
              step={0.05}
              value={speech.rate}
              disabled={!speech.enabled}
              onChange={(e) => A.setSpeech({ rate: Number(e.target.value) })}
              className="accent-brand"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-semibold">מהירות הכפתור האיטי: {speech.slowRate.toFixed(2)}×</span>
            <input
              type="range"
              min={0.5}
              max={0.9}
              step={0.05}
              value={speech.slowRate}
              disabled={!speech.enabled}
              onChange={(e) => A.setSpeech({ slowRate: Number(e.target.value) })}
              className="accent-brand"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-semibold">קול</span>
            <select
              value={speech.voiceURI ?? ""}
              disabled={!speech.enabled || voices.length === 0}
              onChange={(e) => A.setSpeech({ voiceURI: e.target.value || undefined })}
              className="rounded-xl border border-line bg-card px-3 py-2.5 outline-none focus:border-brand"
            >
              <option value="">הכי טוב שיש במכשיר (ברירת מחדל)</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} · {v.lang}
                </option>
              ))}
            </select>
            {voices.length === 0 && <Hint>המכשיר עוד לא דיווח על קולות. לחץ על ההשמעה למטה, וזה בדרך כלל מעיר אותם.</Hint>}
          </label>

          <div className="rounded-xl bg-paper border border-line p-3 flex flex-col gap-2">
            <div className="text-sm text-muted">משפט בדיקה:</div>
            <div className="flex items-start gap-2">
              <div className="en flex-1 text-base">{SAMPLE}</div>
              <span className="flex shrink-0" onClick={() => setTested(true)}>
                <Speak text={SAMPLE} />
                <Speak text={SAMPLE} slow size="sm" />
              </span>
            </div>
            {tested && <Hint>לא שמעת כלום? בדוק שהמכשיר לא במצב שקט, ושהקול שנבחר הוא קול אנגלי.</Hint>}
          </div>

          {!supported && <Hint>ההשמעה כבויה בדפדפן הזה.</Hint>}
          <div>
            <Button
              variant="secondary"
              onClick={() => A.setSpeech({ enabled: true, autoplay: true, rate: 0.95, slowRate: 0.7, voiceURI: undefined })}
            >
              אפס להגדרות ברירת המחדל
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
