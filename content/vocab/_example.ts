// Reference example of the vocabulary format. Not imported by the app.
import type { VocabItem } from "@/lib/types";

export const EXAMPLE: VocabItem[] = [
  {
    id: "v-ex-deadline",
    word: "deadline",
    pos: "n",
    he: "מועד אחרון, דדליין",
    def: "the time or day by which something must be finished",
    examples: ["The deadline for the report is Friday.", "We missed the deadline because the client changed the plan."],
    cloze: "I can't come tonight, I have a ___ tomorrow morning.",
    collocations: ["meet a deadline", "miss a deadline", "tight deadline"],
    band: 2,
    tags: ["work"],
    trap: "אומרים meet a deadline (לעמוד בדדליין), לא 'stand in a deadline'.",
    colloc: { frame: "We have to ___ the deadline or we lose the client.", answer: "meet", options: ["meet", "stand", "make"], whyHe: "עומדים בדדליין = meet a deadline." },
  },
  {
    id: "v-ex-decide",
    word: "decide",
    pos: "v",
    he: "להחליט",
    def: "to choose what you will do after thinking about it",
    examples: ["We decided to stay home.", "I can't decide which one to buy."],
    cloze: "After a long talk, they ___ to sell the car.",
    clozeAnswer: "decided",
    collocations: ["decide to do", "decide on something"],
    band: 1,
    tags: ["opinions"],
    trap: "decide to + פועל (decide to go), לא decide go.",
  },
];
