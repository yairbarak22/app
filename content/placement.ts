import type { PlacementItem } from "@/lib/types";

/** 30-item placement: 14 vocabulary (by band) + 16 grammar (by topic). Multiple choice, ~5 minutes. */
export const PLACEMENT: PlacementItem[] = [
  // ---- vocabulary: choose the Hebrew meaning
  { id: "p-v1", kind: "vocab", band: 1, prompt: "borrow", options: ["להשאיל למישהו", "לשאול ממישהו", "לקנות", "לשלם"], answerIndex: 1 },
  { id: "p-v2", kind: "vocab", band: 1, prompt: "arrive", options: ["לעזוב", "להגיע", "לחכות", "לרוץ"], answerIndex: 1 },
  { id: "p-v3", kind: "vocab", band: 1, prompt: "cheap", options: ["יקר", "זול", "חדש", "שבור"], answerIndex: 1 },
  { id: "p-v4", kind: "vocab", band: 2, prompt: "deadline", options: ["קו ישר", "מועד אחרון", "תור", "הפסקה"], answerIndex: 1 },
  { id: "p-v5", kind: "vocab", band: 2, prompt: "reliable", options: ["מהיר", "אמין", "יקר", "עייף"], answerIndex: 1 },
  { id: "p-v6", kind: "vocab", band: 2, prompt: "afford", options: ["להרשות לעצמך", "להציע", "להסכים", "להימנע"], answerIndex: 0 },
  { id: "p-v7", kind: "vocab", band: 2, prompt: "postpone", options: ["לבטל", "לדחות", "לאשר", "להתחיל"], answerIndex: 1 },
  { id: "p-v8", kind: "vocab", band: 3, prompt: "drawback", options: ["חיסרון", "יתרון", "נסיגה", "תוצאה"], answerIndex: 0 },
  { id: "p-v9", kind: "vocab", band: 3, prompt: "put up with", options: ["להעלות", "לסבול משהו", "לבנות", "להתחבר"], answerIndex: 1 },
  { id: "p-v10", kind: "vocab", band: 3, prompt: "overwhelmed", options: ["מוצף, לא עומד בעומס", "מרוצה", "משועמם", "מופתע"], answerIndex: 0 },
  { id: "p-v11", kind: "vocab", band: 3, prompt: "run out of", options: ["לברוח", "להיגמר", "לרוץ החוצה", "להתאמן"], answerIndex: 1 },
  { id: "p-v12", kind: "vocab", band: 4, prompt: "reluctant", options: ["נלהב", "לא מרוצה", "מהסס, לא רוצה", "נחוש"], answerIndex: 2 },
  { id: "p-v13", kind: "vocab", band: 4, prompt: "come across", options: ["להיתקל ב-", "לחצות", "להבין", "להצליח"], answerIndex: 0 },
  { id: "p-v14", kind: "vocab", band: 4, prompt: "thorough", options: ["דרך", "יסודי", "מהיר", "קשה"], answerIndex: 1 },

  // ---- grammar: choose the correct option
  { id: "p-g1", kind: "grammar", topic: "g-present-simple-continuous", prompt: "Sorry, I can't talk now, I ___ dinner.", options: ["cook", "am cooking", "cooking", "cooks"], answerIndex: 1 },
  { id: "p-g2", kind: "grammar", topic: "g-past-simple", prompt: "We ___ to the beach last weekend.", options: ["go", "have gone", "went", "were go"], answerIndex: 2 },
  { id: "p-g3", kind: "grammar", topic: "g-present-perfect-vs-past", prompt: "I ___ my keys. I can't open the door.", options: ["lost", "have lost", "am losing", "was losing"], answerIndex: 1 },
  { id: "p-g4", kind: "grammar", topic: "g-for-since", prompt: "She has lived in Haifa ___ 2015.", options: ["for", "since", "from", "ago"], answerIndex: 1 },
  { id: "p-g5", kind: "grammar", topic: "g-past-perfect", prompt: "When I arrived, the meeting ___ already ___.", options: ["has / started", "was / started", "had / started", "did / start"], answerIndex: 2 },
  { id: "p-g6", kind: "grammar", topic: "g-future-forms", prompt: "Look at those clouds! It ___ rain.", options: ["will", "is going to", "goes to", "shall"], answerIndex: 1 },
  { id: "p-g7", kind: "grammar", topic: "g-modals-obligation", prompt: "You ___ pay, it's free.", options: ["mustn't", "don't have to", "shouldn't", "can't"], answerIndex: 1 },
  { id: "p-g8", kind: "grammar", topic: "g-conditional-0-1", prompt: "If it ___ tomorrow, we'll stay home.", options: ["will rain", "rains", "rained", "would rain"], answerIndex: 1 },
  { id: "p-g9", kind: "grammar", topic: "g-conditional-2", prompt: "If I ___ more time, I would learn to cook.", options: ["have", "will have", "had", "would have"], answerIndex: 2 },
  { id: "p-g10", kind: "grammar", topic: "g-passive-present-past", prompt: "This building ___ in 1920.", options: ["built", "was built", "is build", "has built"], answerIndex: 1 },
  { id: "p-g11", kind: "grammar", topic: "g-reported-statements", prompt: "He said that he ___ tired.", options: ["is", "was", "be", "has"], answerIndex: 1 },
  { id: "p-g12", kind: "grammar", topic: "g-question-formation", prompt: "___ live?", options: ["Where you", "Where do you", "Where are you", "Where you do"], answerIndex: 1 },
  { id: "p-g13", kind: "grammar", topic: "g-indirect-questions", prompt: "Do you know where ___?", options: ["is the station", "the station is", "does the station", "is station"], answerIndex: 1 },
  { id: "p-g14", kind: "grammar", topic: "g-articles-a-an-the", prompt: "My brother is ___ engineer.", options: ["a", "an", "the", "-"], answerIndex: 1 },
  { id: "p-g15", kind: "grammar", topic: "g-countable-uncountable", prompt: "Can you give me some ___?", options: ["advices", "advice", "an advice", "advise"], answerIndex: 1 },
  { id: "p-g16", kind: "grammar", topic: "g-gerund-infinitive", prompt: "I enjoy ___ to music while I work.", options: ["to listen", "listen", "listening", "listened"], answerIndex: 2 },
];
