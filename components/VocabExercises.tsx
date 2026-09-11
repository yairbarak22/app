"use client";
import { useState } from "react";
import type { VocabItem, ChunkItem, Grade } from "@/lib/types";
import { Button, Card, En, Feedback, Hint, Options, Pill, TextAnswer, useCountdown, useEnter, TimerRing } from "./ui";
import { grade as gradeAnswer } from "@/engine/grader";
import { Speak, SpeakLine, useAutoSpeak } from "./Speak";
import { fillBlank } from "@/lib/speech";

function TrapNote({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="rounded-xl bg-warn-soft border border-warn/25 p-3 text-sm">
      <span className="font-bold">שים לב: </span>
      {text}
    </div>
  );
}

export function WordCard({ word }: { word: VocabItem }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2 flex-wrap">
        <En big className="font-bold">{word.word}</En>
        <Speak text={word.word} label="השמע את המילה" />
        <Speak text={word.word} slow size="sm" />
        <Pill>{{ n: "שם עצם", v: "פועל", adj: "תואר", adv: "תואר פועל", phr: "ביטוי", prep: "מילת יחס", conj: "מילת קישור", other: "" }[word.pos]}</Pill>
      </div>
      <div className="text-xl font-semibold">{word.he}</div>
      <En className="text-muted text-base">{word.def}</En>
      <ul className="flex flex-col gap-1.5 border-r-2 border-line pr-3">
        {word.examples.map((e, i) => (
          <li key={i}>
            <SpeakLine text={e} className="text-base" />
          </li>
        ))}
      </ul>
      {word.collocations?.length ? (
        <div className="text-sm">
          <span className="text-muted">צירופים נפוצים: </span>
          <span className="en inline-block font-semibold">{word.collocations.join(" · ")}</span>
        </div>
      ) : null}
      <TrapNote text={word.trap} />
    </div>
  );
}

export function VocabMeet({ word, onDone }: { word: VocabItem; onDone: () => void }) {
  useAutoSpeak(word.word);
  useEnter(onDone);
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <Pill tone="brand">מילה חדשה</Pill>
      <WordCard word={word} />
      <Button onClick={onDone} autoFocus>
        הבנתי, ממשיכים
      </Button>
    </Card>
  );
}

export function VocabMcqEx({ word, options, answerIndex, onDone }: { word: VocabItem; options: string[]; answerIndex: number; onDone: (g: Grade) => void }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const done = chosen !== null;
  useEnter(done ? () => onDone(chosen === answerIndex ? 2 : 0) : null);
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="text-sm text-muted">מה הפירוש של המילה?</div>
      <div className="flex items-center gap-2">
        <En big className="font-bold">{word.word}</En>
        <Speak text={word.word} />
        <Speak text={word.word} slow size="sm" />
      </div>
      <Options options={options} chosen={chosen} answerIndex={answerIndex} onChoose={setChosen} ltr={false} />
      {done && (
        <>
          <Feedback ok={chosen === answerIndex}>
            <SpeakLine text={word.examples[0]} className="text-base" />
          </Feedback>
          <Button onClick={() => onDone(chosen === answerIndex ? 2 : 0)} autoFocus>
            הבא
          </Button>
        </>
      )}
    </Card>
  );
}

export function VocabClozeEx({ word, onDone, isTest }: { word: VocabItem; onDone: (g: Grade) => void; isTest?: boolean }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ ok: boolean; typo: boolean } | null>(null);
  const answer = word.clozeAnswer ?? word.word;
  const [hint, setHint] = useState(false);
  const submit = () => setResult(gradeAnswer(value, answer, word.accept, { mode: "grammar" }));
  useEnter(result ? () => onDone(result.ok ? (result.typo ? 1 : 2) : 0) : null);
  const full = fillBlank(word.cloze, answer);
  useAutoSpeak(full, !!result);
  const parts = word.cloze.split("___");
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted">השלם את המילה המתאימה</div>
        {isTest ? <Pill tone="warn">מבחן</Pill> : <Pill>{word.he}</Pill>}
      </div>
      <En big>
        {parts[0]}
        <span className="inline-block min-w-24 border-b-2 border-brand mx-1 text-center font-bold">{result ? answer : hint ? `${answer[0]}…` : " "}</span>
        {parts[1]}
      </En>
      <TextAnswer value={value} onChange={setValue} onSubmit={submit} disabled={!!result} />
      {!result && !hint && (
        <button type="button" onClick={() => setHint(true)} className="text-sm text-brand self-start hover:underline">
          רמז: האות הראשונה
        </button>
      )}
      {result && (
        <>
          <Feedback ok={result.ok} typo={result.typo}>
            <div className="flex flex-col gap-2">
              <SpeakLine text={full} className="text-base font-semibold" />
              <div>{word.he} — <span className="en inline-block">{word.def}</span></div>
              {word.trap && <div className="text-sm">{word.trap}</div>}
            </div>
          </Feedback>
          <Button onClick={() => onDone(result.ok ? (result.typo ? 1 : 2) : 0)} autoFocus>
            הבא
          </Button>
        </>
      )}
    </Card>
  );
}

export function VocabProduceEx({ word, onDone }: { word: VocabItem; onDone: (g: Grade) => void }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ ok: boolean; typo: boolean } | null>(null);
  const submit = () => setResult(gradeAnswer(value, word.word, word.accept, { mode: "vocab" }));
  useAutoSpeak(word.word, !!result);
  useEnter(result ? () => onDone(result.ok ? (result.typo ? 1 : 2) : 0) : null);
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="text-sm text-muted">איך אומרים את זה באנגלית?</div>
      <div className="text-2xl font-bold">{word.he}</div>
      <En className="text-muted text-base">{word.def}</En>
      <TextAnswer value={value} onChange={setValue} onSubmit={submit} disabled={!!result} />
      {result && (
        <>
          <Feedback ok={result.ok} typo={result.typo}>
            <div className="flex flex-col gap-2">
              <SpeakLine text={word.word} className="text-lg font-bold" />
              <SpeakLine text={word.examples[0]} className="text-base" />
            </div>
          </Feedback>
          <Button onClick={() => onDone(result.ok ? (result.typo ? 1 : 2) : 0)} autoFocus>
            הבא
          </Button>
        </>
      )}
    </Card>
  );
}

export function VocabCollocEx({ word, onDone }: { word: VocabItem; onDone: (g: Grade) => void }) {
  const c = word.colloc!;
  const [chosen, setChosen] = useState<number | null>(null);
  const answerIndex = c.options.indexOf(c.answer);
  const done = chosen !== null;
  const full = fillBlank(c.frame, c.answer);
  useAutoSpeak(full, done);
  useEnter(done ? () => onDone(chosen === answerIndex ? 2 : 0) : null);
  const parts = c.frame.split("___");
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="text-sm text-muted">איזו מילה מתאימה לצירוף?</div>
      <En big>
        {parts[0]}
        <span className="inline-block min-w-20 border-b-2 border-brand mx-1 text-center font-bold">{done ? c.answer : " "}</span>
        {parts[1]}
      </En>
      <Options options={c.options} chosen={chosen} answerIndex={answerIndex} onChoose={setChosen} />
      {done && (
        <>
          <Feedback ok={chosen === answerIndex}>
            <div className="flex flex-col gap-2">
              <SpeakLine text={full} className="text-base font-semibold" />
              <div>{c.whyHe ?? word.trap ?? ""}</div>
            </div>
          </Feedback>
          <Button onClick={() => onDone(chosen === answerIndex ? 2 : 0)} autoFocus>
            הבא
          </Button>
        </>
      )}
    </Card>
  );
}

export function VocabSpeakEx({ word, onDone }: { word: VocabItem; onDone: (g: Grade) => void }) {
  const [phase, setPhase] = useState<"speak" | "check">("speak");
  const left = useCountdown(25, phase === "speak", () => setPhase("check"));
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <Pill tone="brand">דיבור</Pill>
      <div className="text-sm text-muted">אמור בקול משפט משלך עם המילה:</div>
      <div className="flex items-center gap-3">
        <En big className="font-bold flex-1">{word.word}</En>
        <Speak text={word.word} />
        {phase === "speak" && <TimerRing left={left} total={25} />}
      </div>
      <div className="text-lg">{word.he}</div>
      {phase === "speak" ? (
        <Button variant="secondary" onClick={() => setPhase("check")}>
          אמרתי — הצג משפט לדוגמה
        </Button>
      ) : (
        <>
          <div className="rounded-xl bg-paper border border-line p-4 flex flex-col gap-2">
            <div className="text-sm text-muted">משפטים לדוגמה:</div>
            <SpeakLine text={word.examples[0]} className="text-base" />
            <SpeakLine text={word.examples[1]} className="text-base" />
          </div>
          <Hint>האם המשפט שאמרת היה נכון וטבעי?</Hint>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="secondary" onClick={() => onDone(0)}>
              לא הצלחתי
            </Button>
            <Button variant="secondary" onClick={() => onDone(1)}>
              בערך
            </Button>
            <Button onClick={() => onDone(2)}>שוטף ונכון</Button>
          </div>
        </>
      )}
    </Card>
  );
}

export function ChunkMeetEx({ chunk, onDone }: { chunk: ChunkItem; onDone: () => void }) {
  useAutoSpeak(chunk.text);
  useEnter(onDone);
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <Pill tone="brand">ביטוי חדש לדיבור</Pill>
      <div className="flex items-center gap-2">
        <En big className="font-bold flex-1">{chunk.text}</En>
        <Speak text={chunk.text} />
        <Speak text={chunk.text} slow size="sm" />
      </div>
      <div className="text-xl font-semibold">{chunk.he}</div>
      <Hint>{chunk.useHe}</Hint>
      <div className="rounded-xl bg-paper border border-line p-3">
        <SpeakLine text={chunk.example} className="text-base" />
      </div>
      <Hint>אמור את הביטוי בקול 3 פעמים, ואז משפט משלך איתו.</Hint>
      <Button onClick={onDone} autoFocus>
        אמרתי, ממשיכים
      </Button>
    </Card>
  );
}

export function ChunkProduceEx({ chunk, onDone }: { chunk: ChunkItem; onDone: (g: Grade) => void }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ ok: boolean; typo: boolean } | null>(null);
  const submit = () => setResult(gradeAnswer(value, chunk.text, [], { mode: "vocab" }));
  useAutoSpeak(chunk.text, !!result);
  useEnter(result ? () => onDone(result.ok ? (result.typo ? 1 : 2) : 0) : null);
  return (
    <Card className="anim-rise flex flex-col gap-4">
      <div className="text-sm text-muted">איך אומרים את הביטוי הזה באנגלית?</div>
      <div className="text-2xl font-bold">{chunk.he}</div>
      <Hint>{chunk.useHe}</Hint>
      <TextAnswer value={value} onChange={setValue} onSubmit={submit} disabled={!!result} />
      {result && (
        <>
          <Feedback ok={result.ok} typo={result.typo}>
            <div className="flex flex-col gap-2">
              <SpeakLine text={chunk.text} className="text-lg font-bold" />
              <SpeakLine text={chunk.example} className="text-base" />
            </div>
          </Feedback>
          <Button onClick={() => onDone(result.ok ? (result.typo ? 1 : 2) : 0)} autoFocus>
            הבא
          </Button>
        </>
      )}
    </Card>
  );
}
