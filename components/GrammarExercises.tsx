"use client";
import { useMemo, useState } from "react";
import type { GrammarItem, GrammarTopic, InterferenceTrap } from "@/lib/types";
import { Button, Card, En, Feedback, Hint, Options, Pill, TextAnswer, useEnter, useNumberKeys } from "./ui";
import { grade as gradeAnswer, gradeOrder } from "@/engine/grader";
import { rng, shuffle } from "@/engine/rng";
import { SpeakLine, useAutoSpeak } from "./Speak";
import { sentenceFromGapPrompt } from "@/lib/speech";

export function GrammarLesson({ topic, onDone }: { topic: GrammarTopic; onDone: () => void }) {
  useEnter(onDone);
  const l = topic.lesson;
  return (
    <Card className="anim-rise flex flex-col gap-5">
      <div className="flex items-center gap-2 flex-wrap">
        <Pill tone="brand">שיעור חדש</Pill>
        <h2 className="text-xl font-bold">{topic.titleHe}</h2>
      </div>
      <div className="flex flex-col gap-2 leading-relaxed">
        {l.explanationHe.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div>
        <h3 className="font-bold mb-2">המבנה</h3>
        <div className="rounded-xl border border-line overflow-hidden">
          {l.form.map((f, i) => (
            <div key={i} className={`flex gap-3 px-3 py-2 text-sm ${i % 2 ? "bg-paper" : "bg-card"}`}>
              <div className="w-40 shrink-0 font-semibold text-muted">{f.label}</div>
              <SpeakLine text={f.example} className="flex-1" slow={false} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2">דוגמאות</h3>
        <ul className="flex flex-col gap-2">
          {l.examples.map((e, i) => (
            <li key={i} className="rounded-xl bg-paper border border-line px-3 py-2">
              <SpeakLine text={e.en} className="text-base font-medium" />
              <div className="text-sm text-muted">{e.he}</div>
            </li>
          ))}
        </ul>
      </div>

      {l.contrastHe.length > 0 && (
        <div className="rounded-xl bg-brand-soft border border-brand/20 p-4">
          <h3 className="font-bold mb-2">עברית מול אנגלית</h3>
          <ul className="flex flex-col gap-1.5 text-sm leading-relaxed">
            {l.contrastHe.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-bold mb-2">טעויות נפוצות</h3>
        <ul className="flex flex-col gap-2">
          {l.commonErrors.map((e, i) => (
            <li key={i} className="rounded-xl border border-line p-3">
              <En className="text-base text-bad line-through decoration-bad/50">{e.wrong}</En>
              <SpeakLine text={e.right} className="text-base text-ok font-semibold" />
              <div className="text-sm text-muted mt-1">{e.whyHe}</div>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={onDone} autoFocus>
        מתחילים לתרגל
      </Button>
    </Card>
  );
}

const TYPE_LABEL: Record<GrammarItem["type"], string> = {
  gap: "השלם את החסר",
  mcq: "בחר את התשובה הנכונה",
  fix: "יש שגיאה אחת — כתוב את המשפט הנכון",
  transform: "כתוב מחדש עם המילה הנתונה, בלי לשנות את המשמעות",
  order: "סדר את המילים למשפט",
  translate: "תרגם לאנגלית",
};

/** True for item types where a lucky guess is plausible (affects the mastery model). */
export function isGuessable(item: GrammarItem): boolean {
  return item.type === "mcq";
}

export function GrammarItemEx({
  item, topicTitle, seed, onDone, badge,
}: {
  item: GrammarItem; topicTitle: string; seed: number; onDone: (correct: boolean) => void; badge?: { text: string; tone: "brand" | "warn" };
}) {
  const [value, setValue] = useState("");
  const [chosen, setChosen] = useState<number | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<{ ok: boolean; typo: boolean } | null>(null);

  const scrambled = useMemo(() => (item.type === "order" ? shuffle(item.words, rng(seed)) : []), [item, seed]);
  const remaining = useMemo(() => {
    if (item.type !== "order") return [];
    const left = [...scrambled];
    for (const w of picked) {
      const i = left.indexOf(w);
      if (i >= 0) left.splice(i, 1);
    }
    return left;
  }, [item.type, scrambled, picked]);

  useNumberKeys(item.type === "order" ? remaining.length : 0, item.type === "order" && !result ? (i) => setPicked((p) => [...p, remaining[i]]) : null);

  const finish = (ok: boolean, typo = false) => setResult({ ok, typo });
  const submitTyped = () => {
    if (item.type === "gap" || item.type === "fix" || item.type === "transform" || item.type === "translate") {
      const r = gradeAnswer(value, item.answer, item.accept, { mode: "grammar" });
      finish(r.ok, r.typo);
    }
  };
  const correctText =
    item.type === "mcq" ? item.options[item.answerIndex].text : item.type === "order" ? item.answer : item.answer;
  const explain = item.type === "mcq" && chosen !== null && chosen !== item.answerIndex && item.options[chosen].whyHe ? item.options[chosen].whyHe! : item.explainHe;

  // What the learner should hear: the whole sentence, not the bare answer word.
  const fullSentence =
    item.type === "gap"
      ? sentenceFromGapPrompt(item.prompt, item.answer)
      : item.type === "mcq"
        ? sentenceFromGapPrompt(item.prompt, item.options[item.answerIndex].text)
        : correctText;
  useAutoSpeak(fullSentence, !!result);
  useEnter(result ? () => onDone(result.ok) : null);

  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="text-sm text-muted">{TYPE_LABEL[item.type]}</div>
        <Pill tone={badge?.tone ?? "neutral"}>{badge?.text ?? topicTitle}</Pill>
      </div>

      {item.type === "gap" && (
        <>
          <En big>{item.prompt}</En>
          {item.hint && <Hint>{item.hint}</Hint>}
          <TextAnswer value={value} onChange={setValue} onSubmit={submitTyped} disabled={!!result} placeholder="…" />
        </>
      )}

      {item.type === "mcq" && (
        <>
          <En big>{item.prompt}</En>
          <Options
            options={item.options.map((o) => o.text)}
            chosen={chosen}
            answerIndex={item.answerIndex}
            onChoose={(i) => {
              setChosen(i);
              finish(i === item.answerIndex);
            }}
          />
        </>
      )}

      {item.type === "fix" && (
        <>
          <En big className="text-bad">{item.prompt}</En>
          <TextAnswer value={value} onChange={setValue} onSubmit={submitTyped} disabled={!!result} placeholder="Write the correct sentence" />
        </>
      )}

      {item.type === "transform" && (
        <>
          <En big>{item.prompt}</En>
          <div className="text-sm">
            <span className="text-muted">השתמש במילה: </span>
            <span className="en inline-block font-bold">{item.keyword}</span>
          </div>
          <TextAnswer value={value} onChange={setValue} onSubmit={submitTyped} disabled={!!result} />
        </>
      )}

      {item.type === "translate" && (
        <>
          <div className="text-2xl font-semibold leading-relaxed">{item.he}</div>
          <TextAnswer value={value} onChange={setValue} onSubmit={submitTyped} disabled={!!result} />
        </>
      )}

      {item.type === "order" && (
        <>
          <div className="min-h-14 rounded-xl border border-line bg-paper p-3">
            <En className="text-lg">{picked.join(" ") || <span className="text-muted">לחץ על המילים לפי הסדר</span>}</En>
          </div>
          <div className="flex flex-wrap gap-2" dir="ltr">
            {remaining.map((w, i) => (
              <button
                key={`${w}-${i}`}
                type="button"
                disabled={!!result}
                onClick={() => setPicked((p) => [...p, w])}
                className="en rounded-lg border border-line bg-card px-3 py-1.5 hover:bg-paper disabled:opacity-50"
              >
                {w}
              </button>
            ))}
          </div>
          {!result && (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setPicked((p) => p.slice(0, -1))} disabled={!picked.length}>
                בטל מילה
              </Button>
              <Button onClick={() => finish(gradeOrder(picked, item.answer, item.accept))} disabled={remaining.length > 0}>
                בדוק
              </Button>
            </div>
          )}
        </>
      )}

      {result && (
        <>
          <Feedback ok={result.ok} typo={result.typo}>
            <div className="flex flex-col gap-2">
              <SpeakLine text={fullSentence} className="text-base font-bold" />
              <div>{explain}</div>
            </div>
          </Feedback>
          <Button onClick={() => onDone(result.ok)} autoFocus>
            הבא
          </Button>
        </>
      )}
    </Card>
  );
}

export function TrapItemEx({ trap, item, seed, onDone }: { trap: InterferenceTrap; item: GrammarItem; seed: number; onDone: (correct: boolean) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl bg-warn-soft border border-warn/25 p-3 text-sm">
        <span className="font-bold">מלכודת מהעברית: </span>
        {trap.titleHe} — {trap.explainHe}
      </div>
      <GrammarItemEx item={item} topicTitle={trap.titleHe} seed={seed} onDone={onDone} badge={{ text: "תיקון טעות אישית", tone: "warn" }} />
    </div>
  );
}
