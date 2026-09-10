"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CONTENT } from "@/content";
import { Button, Card, En, Options, Pill, ProgressBar, Hint } from "@/components/ui";
import * as A from "@/lib/actions";
import { useHydrated } from "@/lib/store";

export default function PlacementPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const items = CONTENT.placement;
  const [i, setI] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [chosen, setChosen] = useState<number | null>(null);

  if (!hydrated) return <div className="text-muted">טוען…</div>;

  if (i < 0) {
    return (
      <Card className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">מבחן מיון קצר</h1>
        <p className="leading-relaxed">
          {items.length} שאלות אמריקאיות, בערך 5 דקות. אין ציון ואין נכשל — המטרה היא לכוון את התוכן לרמה שלך: מאיזה
          אוצר מילים להתחיל, ואילו נושאי דקדוק כבר אין טעם ללמד מאפס.
        </p>
        <Hint>אם אינך בטוח בתשובה, נחש — זה בסדר גמור, וגם זה מידע.</Hint>
        <Button onClick={() => setI(0)}>מתחילים</Button>
        <button
          type="button"
          className="text-sm text-muted hover:underline"
          onClick={() => {
            A.skipPlacement();
            router.replace("/");
          }}
        >
          דלג — תתחיל אותי מההתחלה
        </button>
      </Card>
    );
  }

  const item = items[i];
  const isLast = i + 1 >= items.length;

  const next = () => {
    const a = { ...answers, [item.id]: chosen ?? -1 };
    setAnswers(a);
    setChosen(null);
    if (isLast) {
      A.applyPlacement(a, items);
      router.replace("/");
    } else setI(i + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Pill tone="brand">{item.kind === "vocab" ? "אוצר מילים" : "דקדוק"}</Pill>
        <span className="text-sm text-muted tabular-nums">
          {i + 1} / {items.length}
        </span>
      </div>
      <ProgressBar value={i} max={items.length} />
      <Card className="anim-rise flex flex-col gap-4">
        {item.kind === "vocab" ? (
          <>
            <div className="text-sm text-muted">מה הפירוש?</div>
            <En big className="font-bold">{item.prompt}</En>
          </>
        ) : (
          <>
            <div className="text-sm text-muted">בחר את ההשלמה הנכונה</div>
            <En big>{item.prompt}</En>
          </>
        )}
        <Options
          options={item.options}
          chosen={null}
          answerIndex={-1}
          onChoose={(n) => {
            setChosen(n);
            const a = { ...answers, [item.id]: n };
            setAnswers(a);
            if (isLast) {
              A.applyPlacement(a, items);
              router.replace("/");
            } else setI(i + 1);
          }}
          ltr={item.kind === "grammar"}
        />
        <button type="button" onClick={next} className="text-sm text-muted hover:underline self-start">
          אני לא יודע — דלג
        </button>
      </Card>
    </div>
  );
}
