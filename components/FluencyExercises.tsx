"use client";
import { useMemo, useState } from "react";
import type { OralTranslation, SpeakingPrompt, QASet, RetellStory, ReadAloudScript, ChunkItem, InterferenceTrap } from "@/lib/types";
import { Button, Card, En, Hint, Pill, Scale, TimerRing, useCountdown, useEnter } from "./ui";
import { scanText, type ScanResult } from "@/engine/errorScan";

type Rating = { fluency: number; accuracy: number; coverage: number };

function SelfRating({ onDone, coverageLabel = "השתמשתי במילים ובביטויים שביקשו" }: { onDone: (r: Rating) => void; coverageLabel?: string }) {
  const [fluency, setFluency] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [coverage, setCoverage] = useState<number | null>(null);
  const ready = fluency !== null && accuracy !== null && coverage !== null;
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm font-bold text-muted">דירוג עצמי מהיר</div>
      <Scale label="שטף — כמה עצירות והיסוסים היו?" value={fluency} onChange={setFluency} labels={["נתקעתי הרבה", "כמה עצירות", "זרם רצוף"]} />
      <Scale label="דיוק — כמה שגיאות שמתי לב אליהן?" value={accuracy} onChange={setAccuracy} labels={["הרבה", "מעט", "כמעט אפס"]} />
      <Scale label={coverageLabel} value={coverage} onChange={setCoverage} labels={["כמעט לא", "חלקית", "בהחלט"]} />
      <Button disabled={!ready} onClick={() => ready && onDone({ fluency: fluency!, accuracy: accuracy!, coverage: coverage! })}>
        המשך
      </Button>
    </div>
  );
}

export function OralTranslateEx({ item, onDone }: { item: OralTranslation; onDone: (mark: 0 | 1 | 2) => void }) {
  const [revealed, setRevealed] = useState(false);
  const left = useCountdown(5, !revealed, () => setRevealed(true));
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted">אמור בקול באנגלית — מהר!</div>
        {!revealed && <TimerRing left={left} total={5} />}
      </div>
      <div className="text-2xl font-semibold leading-relaxed">{item.he}</div>
      {!revealed ? (
        <Button variant="secondary" onClick={() => setRevealed(true)}>
          אמרתי — גלה תשובה
        </Button>
      ) : (
        <>
          <div className="rounded-xl bg-ok-soft border border-ok/25 p-4 flex flex-col gap-1">
            <En className="text-lg font-bold">{item.en}</En>
            {item.alt?.map((a, i) => (
              <En key={i} className="text-base text-muted">{a}</En>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="secondary" onClick={() => onDone(0)}>
              לא ידעתי
            </Button>
            <Button variant="secondary" onClick={() => onDone(1)}>
              כמעט
            </Button>
            <Button onClick={() => onDone(2)}>בדיוק ככה</Button>
          </div>
        </>
      )}
    </Card>
  );
}

const ROUNDS = [
  { secs: 120, label: "סבב 1 — 2:00", hintHe: "ספר הכול, בלי לחץ. מותר לחשוב תוך כדי." },
  { secs: 90, label: "סבב 2 — 1:30", hintHe: "אותו סיפור, אותו תוכן — רק מהר ורציף יותר." },
  { secs: 60, label: "סבב 3 — 1:00", hintHe: "עכשיו הכי חלק. זה הסבב שבונה שטף." },
];

export function MonologueEx({ prompt, chunks, onDone }: { prompt: SpeakingPrompt; chunks: ChunkItem[]; onDone: (r: Rating) => void }) {
  const [round, setRound] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"rounds" | "model" | "rate">("rounds");
  const cur = ROUNDS[Math.min(round, 2)];
  const left = useCountdown(cur.secs, running, () => {
    setRunning(false);
    if (round >= 2) setPhase("model");
    else setRound((r) => r + 1);
  });
  const chunkTexts = prompt.chunks;
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Pill tone="brand">4/3/2 — דיבור חוזר</Pill>
        <span className="text-sm text-muted">{prompt.topicHe}</span>
      </div>
      <En big>{prompt.prompt}</En>

      {phase === "rounds" && (
        <>
          <div className="rounded-xl bg-paper border border-line p-4 flex flex-col gap-3">
            <div>
              <div className="text-sm text-muted mb-1">מילים לשלב בדיבור:</div>
              <div className="flex flex-wrap gap-2">
                {prompt.keywords.map((k) => (
                  <span key={k} className="en rounded-lg bg-card border border-line px-2 py-1 text-sm">{k}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted mb-1">ביטויים שחובה להשתמש בהם:</div>
              <div className="flex flex-wrap gap-2">
                {chunkTexts.map((c) => {
                  const info = chunks.find((x) => x.text === c);
                  return (
                    <span key={c} className="rounded-lg bg-brand-soft border border-brand/20 px-2 py-1 text-sm">
                      <span className="en inline-block font-semibold">{c}</span>
                      {info && <span className="text-muted"> — {info.he}</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-bold">{cur.label}</div>
              <Hint>{cur.hintHe}</Hint>
            </div>
            <TimerRing left={running ? left : cur.secs} total={cur.secs} />
          </div>
          <div className="flex gap-2">
            {!running ? (
              <Button onClick={() => setRunning(true)} className="flex-1">
                התחל לדבר
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setRunning(false);
                  if (round >= 2) setPhase("model");
                  else setRound((r) => r + 1);
                }}
              >
                סיימתי מוקדם
              </Button>
            )}
          </div>
          <div className="flex gap-1">
            {ROUNDS.map((r, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-ok" : i === round ? "bg-brand" : "bg-line"}`} />
            ))}
          </div>
        </>
      )}

      {phase === "model" && (
        <>
          <div className="rounded-xl bg-paper border border-line p-4">
            <div className="text-sm text-muted mb-2">תשובה לדוגמה — קרא אותה בקול פעם אחת:</div>
            <En className="text-base leading-relaxed">{prompt.model}</En>
          </div>
          <Button onClick={() => setPhase("rate")}>קראתי — לדירוג</Button>
        </>
      )}

      {phase === "rate" && <SelfRating onDone={onDone} coverageLabel="השתמשתי במילים ובביטויים שביקשו" />}
    </Card>
  );
}

export function QuickfireEx({ set, onDone }: { set: QASet; onDone: (r: Rating) => void }) {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState<"q" | "rate">("q");
  const q = set.questions[i];
  const left = useCountdown(8, phase === "q" && !revealed, () => setRevealed(true));
  const next = () => {
    if (i + 1 >= set.questions.length) setPhase("rate");
    else {
      setI(i + 1);
      setRevealed(false);
    }
  };
  useEnter(revealed && phase === "q" ? next : null);
  if (phase === "rate") {
    return (
      <Card className="anim-rise flex flex-col gap-4">
        <Pill tone="brand">שאלות מהירות — {set.title}</Pill>
        <SelfRating onDone={onDone} coverageLabel="עניתי במשפט שלם, לא במילה אחת" />
      </Card>
    );
  }
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Pill tone="brand">שאלות מהירות — {set.title}</Pill>
        <span className="text-sm text-muted">
          {i + 1} / {set.questions.length}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <En big className="flex-1">{q.q}</En>
        {!revealed && <TimerRing left={left} total={8} />}
      </div>
      <Hint>ענה בקול במשפט שלם, מיד.</Hint>
      {!revealed ? (
        <Button variant="secondary" onClick={() => setRevealed(true)}>
          עניתי
        </Button>
      ) : (
        <>
          <div className="rounded-xl bg-ok-soft border border-ok/25 p-4">
            <div className="text-sm text-muted mb-1">תשובה טבעית לדוגמה:</div>
            <En className="text-base">{q.model}</En>
          </div>
          <Button onClick={next} autoFocus>
            {i + 1 >= set.questions.length ? "לדירוג" : "השאלה הבאה"}
          </Button>
        </>
      )}
    </Card>
  );
}

export function RetellEx({ story, onDone }: { story: RetellStory; onDone: (r: Rating) => void }) {
  const [phase, setPhase] = useState<"read" | "speak" | "check" | "rate">("read");
  const [checked, setChecked] = useState<boolean[]>(() => story.points.map(() => false));
  const readLeft = useCountdown(60, phase === "read", () => setPhase("speak"));
  const speakLeft = useCountdown(60, phase === "speak", () => setPhase("check"));
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Pill tone="brand">קרא וספר מחדש</Pill>
        <span className="text-sm text-muted">{story.title}</span>
      </div>

      {phase === "read" && (
        <>
          <div className="flex justify-between items-start gap-4">
            <Hint>קרא את הסיפור פעם אחת בקול, בקצב נורמלי. אחר כך הוא ייעלם.</Hint>
            <TimerRing left={readLeft} total={60} />
          </div>
          <En className="text-base leading-relaxed">{story.text}</En>
          <Button onClick={() => setPhase("speak")}>קראתי — הסתר וספר מחדש</Button>
        </>
      )}

      {phase === "speak" && (
        <>
          <div className="flex justify-between items-start gap-4">
            <Hint>ספר את הסיפור מחדש בקול, במילים שלך, בזמן עבר. היעזר רק במילות המפתח.</Hint>
            <TimerRing left={speakLeft} total={60} />
          </div>
          <div className="flex flex-wrap gap-2">
            {story.keywords.map((k) => (
              <span key={k} className="en rounded-lg bg-brand-soft border border-brand/20 px-3 py-1.5 font-semibold">{k}</span>
            ))}
          </div>
          <Button variant="secondary" onClick={() => setPhase("check")}>
            סיימתי
          </Button>
        </>
      )}

      {phase === "check" && (
        <>
          <div className="text-sm font-bold">מה מתוך זה אמרת?</div>
          <div className="flex flex-col gap-2">
            {story.points.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                className={`flex items-start gap-3 rounded-xl border p-3 text-start transition ${checked[i] ? "border-ok bg-ok-soft" : "border-line bg-card"}`}
              >
                <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-md border grid place-items-center text-xs ${checked[i] ? "bg-ok border-ok text-white" : "border-line"}`}>
                  {checked[i] ? "✓" : ""}
                </span>
                <En className="text-base flex-1">{p}</En>
              </button>
            ))}
          </div>
          <details className="rounded-xl border border-line p-3">
            <summary className="cursor-pointer text-sm font-semibold">הצג את הסיפור המקורי</summary>
            <En className="text-base leading-relaxed mt-2">{story.text}</En>
          </details>
          <Button onClick={() => setPhase("rate")}>המשך לדירוג</Button>
        </>
      )}

      {phase === "rate" && <SelfRating onDone={onDone} coverageLabel="כיסיתי את עיקרי הסיפור" />}
    </Card>
  );
}

/** Renders a script marked with " | " pause bars and *stressed* words. */
function ScriptText({ text }: { text: string }) {
  const chunks = text.split("|").map((c) => c.trim()).filter(Boolean);
  return (
    <En className="text-lg leading-loose">
      {chunks.map((c, i) => (
        <span key={i}>
          {c.split(/(\*[^*]+\*)/).map((part, j) =>
            part.startsWith("*") && part.endsWith("*") ? (
              <strong key={j} className="font-bold text-brand">{part.slice(1, -1)}</strong>
            ) : (
              <span key={j}>{part}</span>
            ),
          )}
          {i < chunks.length - 1 && <span className="text-line px-1.5 select-none">|</span>}
        </span>
      ))}
    </En>
  );
}

export function ReadAloudEx({ script, onDone }: { script: ReadAloudScript; onDone: (r: Rating) => void }) {
  const [phase, setPhase] = useState<"read" | "rate">("read");
  const [start, setStart] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const target = Math.round((script.words / 140) * 60);
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Pill tone="brand">קריאה בקול</Pill>
        <span className="text-sm text-muted">{script.title}</span>
      </div>
      {phase === "read" ? (
        <>
          <Hint>
            עצור קצרות בכל <span className="text-line font-bold">|</span> והדגש את המילים <strong className="text-brand">המודגשות</strong>. יעד: כ־{target} שניות
            ({script.words} מילים, כ־140 מילים לדקה).
          </Hint>
          <div className="rounded-xl bg-paper border border-line p-4">
            <ScriptText text={script.text} />
          </div>
          {start === null ? (
            <Button onClick={() => setStart(Date.now())}>התחל לקרוא</Button>
          ) : (
            <Button
              onClick={() => {
                const secs = Math.max(1, (Date.now() - start) / 1000);
                setWpm(Math.round((script.words / secs) * 60));
                setPhase("rate");
              }}
            >
              סיימתי לקרוא
            </Button>
          )}
        </>
      ) : (
        <>
          {wpm !== null && (
            <div className="rounded-xl border border-line p-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted">הקצב שלך</div>
                <div className="text-2xl font-bold tabular-nums">{wpm} מילים לדקה</div>
              </div>
              <Pill tone={wpm >= 120 && wpm <= 165 ? "ok" : wpm < 120 ? "warn" : "warn"}>
                {wpm < 120 ? "קצת לאט" : wpm > 165 ? "מהר מדי — שים לב לעצירות" : "בול בטווח"}
              </Pill>
            </div>
          )}
          <SelfRating onDone={onDone} coverageLabel="עצרתי בכל | והדגשתי נכון" />
        </>
      )}
    </Card>
  );
}

export function SpeakWriteEx({
  prompt, traps, onDone,
}: {
  prompt: SpeakingPrompt; traps: InterferenceTrap[]; onDone: (r: Rating, trapIds: string[]) => void;
}) {
  const [phase, setPhase] = useState<"speak" | "write" | "feedback" | "rate">("speak");
  const [text, setText] = useState("");
  const left = useCountdown(60, phase === "speak", () => setPhase("write"));
  const scan: ScanResult | null = useMemo(
    () => (phase === "feedback" || phase === "rate" ? scanText(text, traps, [...prompt.chunks, ...prompt.keywords]) : null),
    [phase, text, traps, prompt],
  );
  const trapIds = useMemo(() => Array.from(new Set((scan?.issues ?? []).map((i) => i.trapId).filter((x): x is string => !!x))), [scan]);

  return (
    <Card className="anim-rise flex flex-col gap-4">
      <Pill tone="brand">דבר, כתוב, ובדוק את עצמך</Pill>
      <En big>{prompt.prompt}</En>

      {phase === "speak" && (
        <>
          <div className="flex items-center justify-between gap-4">
            <Hint>דבר בקול 60 שניות. אל תכתוב עדיין — רק דבר.</Hint>
            <TimerRing left={left} total={60} />
          </div>
          <Button variant="secondary" onClick={() => setPhase("write")}>
            סיימתי לדבר
          </Button>
        </>
      )}

      {phase === "write" && (
        <>
          <Hint>עכשיו כתוב 2–4 משפטים ממה שאמרת, כמו שאמרת. אל תתקן ואל תשפר — זה הבסיס לבדיקה.</Hint>
          <textarea
            dir="ltr"
            autoFocus
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="en rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-brand leading-relaxed"
            placeholder="Write what you said…"
          />
          <Button disabled={text.trim().split(/\s+/).length < 8} onClick={() => setPhase("feedback")}>
            בדוק אותי
          </Button>
        </>
      )}

      {(phase === "feedback" || phase === "rate") && scan && (
        <>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-line p-3">
              <div className="text-2xl font-bold tabular-nums">{scan.words}</div>
              <div className="text-xs text-muted">מילים</div>
            </div>
            <div className="rounded-xl border border-line p-3">
              <div className="text-2xl font-bold tabular-nums">{scan.sentences}</div>
              <div className="text-xs text-muted">משפטים</div>
            </div>
            <div className="rounded-xl border border-line p-3">
              <div className={`text-2xl font-bold tabular-nums ${scan.issues.length ? "text-warn" : "text-ok"}`}>{scan.issues.length}</div>
              <div className="text-xs text-muted">דגלים</div>
            </div>
          </div>

          {scan.issues.length === 0 ? (
            <div className="rounded-xl bg-ok-soft border border-ok/25 p-4 text-sm">
              הסורק לא מצא מלכודות מוכרות. זה לא אומר שאין שגיאות בכלל, אבל הדפוסים הקלאסיים מהעברית לא הופיעו כאן.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {scan.issues.map((iss, i) => (
                <div key={i} className="rounded-xl bg-warn-soft border border-warn/25 p-3">
                  <div className="font-bold text-sm">{iss.titleHe}</div>
                  <En className="text-base my-1">…{iss.match}…</En>
                  <div className="text-sm">{iss.explainHe}</div>
                  {iss.right && (
                    <div className="text-sm mt-1">
                      <span className="text-muted">כך אומרים: </span>
                      <span className="en inline-block font-semibold">{iss.right}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-line p-3 text-sm flex flex-col gap-1">
            <div className="font-bold">שימוש בביטויים ובמילים שביקשנו</div>
            {scan.usedTargets.length > 0 && (
              <div>
                <span className="text-ok font-semibold">השתמשת: </span>
                <span className="en inline-block">{scan.usedTargets.join(" · ")}</span>
              </div>
            )}
            {scan.missedTargets.length > 0 && (
              <div>
                <span className="text-muted">לא הופיעו: </span>
                <span className="en inline-block">{scan.missedTargets.join(" · ")}</span>
              </div>
            )}
          </div>

          <details className="rounded-xl border border-line p-3">
            <summary className="cursor-pointer text-sm font-semibold">השווה לתשובה לדוגמה</summary>
            <En className="text-base leading-relaxed mt-2">{prompt.model}</En>
          </details>

          {phase === "feedback" ? (
            <Button onClick={() => setPhase("rate")}>המשך לדירוג</Button>
          ) : (
            <SelfRating onDone={(r) => onDone(r, trapIds)} coverageLabel="השתמשתי בביטויים ובמילים שביקשו" />
          )}
        </>
      )}
    </Card>
  );
}

export function DailyRatingEx({ onDone }: { onDone: (r: Rating) => void }) {
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <Pill tone="brand">סיכום היום</Pill>
      <Hint>דירוג כללי של הסשן — זה מה שמצייר את גרף השטף שלך לאורך זמן.</Hint>
      <SelfRating onDone={onDone} coverageLabel="הרגשתי שאני מצליח להביע את מה שרציתי" />
    </Card>
  );
}
