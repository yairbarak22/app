import type { InterferenceTrap, ErrorType } from "@/lib/types";

export interface ScanIssue {
  type: ErrorType;
  trapId?: string;
  match: string;
  titleHe: string;
  explainHe: string;
  right?: string;
}

export interface ScanResult {
  words: number;
  sentences: number;
  issues: ScanIssue[];
  usedTargets: string[];
  missedTargets: string[];
}

const BASE_VERBS = "go|come|see|eat|meet|buy|get|make|take|have|do|say|tell|give|work|play|talk|think|know|want|like|need|live|feel|find|leave|start|finish|try|call|write|read|run|sit|speak|drive|forget|sleep|wake|drink|cook|pay|send|bring|walk|watch|visit|stay|study|learn|help|move|open|close|lose|win|wear|put|keep|hear|understand|change|decide|happen|become";
const PAST_MARKERS = "yesterday|last (?:week|year|month|night|summer|winter|time)|\\d+ (?:years?|months?|weeks?|days?|hours?|minutes?) ago|when i was (?:a )?(?:child|kid|young|little)|in \\d{4}";

const HEURISTICS: { type: ErrorType; re: RegExp; titleHe: string; explainHe: string; skipIfPrev?: RegExp }[] = [
  {
    type: "agreement",
    re: new RegExp(`\\b(he|she|it|my (?:mother|father|brother|sister|boss|friend|wife|husband|son|daughter|dog|cat))\\s+(${BASE_VERBS})\\b(?!\\s+to\\b)`, "i"),
    titleHe: "חסר -s בגוף שלישי",
    explainHe: "בהווה פשוט, אחרי he / she / it הפועל מקבל -s: she works, he goes, it takes.",
    skipIfPrev: /\b(can|could|will|would|should|must|might|may|did|does|do|to|let|make|made|help|helped|saw|heard|watched|didn't|doesn't|don't|won't|wouldn't|couldn't|shouldn't)\s*$/i,
  },
  {
    type: "tense",
    re: new RegExp(`\\b(?:${PAST_MARKERS})\\b[^.!?]*\\b(?:i|we|they|you|he|she|it)\\s+(?:${BASE_VERBS})s?\\b`, "i"),
    titleHe: "סמן זמן עבר עם פועל בהווה",
    explainHe: "יש במשפט סמן של עבר (yesterday / last week / ago) ולכן הפועל צריך להיות בעבר פשוט: I went, we saw, she took.",
    skipIfPrev: /$^/,
  },
  {
    type: "tense",
    re: new RegExp(`\\b(?:i|we|they|you|he|she|it)\\s+(?:${BASE_VERBS})s?\\b[^.!?]*\\b(?:${PAST_MARKERS})\\b`, "i"),
    titleHe: "סמן זמן עבר עם פועל בהווה",
    explainHe: "יש במשפט סמן של עבר (yesterday / last week / ago) ולכן הפועל צריך להיות בעבר פשוט: I went, we saw, she took.",
  },
  {
    type: "article",
    re: /\b(?:i am|i'm|he is|he's|she is|she's|you are|you're|we are|they are)\s+(?:(?:very|really|quite|pretty)\s+)?(?:good|great|bad|nice|new|young|old|busy|hard|happy|serious|big|small)\s+(?:person|man|woman|student|teacher|worker|engineer|developer|doctor|friend|guy|girl|boy|driver|cook|manager)\b/i,
    titleHe: "חסרה תווית a לפני שם עצם יחיד",
    explainHe: "שם עצם ספיר ביחיד צריך תווית: I'm a good person, she's a great teacher.",
  },
  {
    type: "word-order",
    re: /\b(?:always|never|usually|often|sometimes|rarely|seldom)\s+(?:i|we|they|you|he|she|it)\s+(?!\bam\b|\bis\b|\bare\b)\w+/i,
    titleHe: "מיקום תואר תדירות",
    explainHe: "תוארי תדירות (always, never, usually) באים אחרי הנושא ולפני הפועל: I always go, she never eats — לא Always I go.",
    skipIfPrev: /[.!?]\s*$|^$/,
  },
  {
    type: "modal",
    re: /\b(?:can|could|will|would|should|must|might|may)\s+to\s+\w+/i,
    titleHe: "מודאל + to",
    explainHe: "אחרי can / must / should / will וכו' בא פועל בסיסי בלי to: I can go, you must stay.",
  },
  {
    type: "verb-form",
    re: /\b(?:did|didn't|does|doesn't|don't|do)\s+(?:you|i|we|they|he|she|it)?\s*(?:went|saw|ate|took|made|came|got|had|said|told|gave|bought|found|left|felt|knew|thought|wrote|read|spoke|drove|forgot|slept|drank|paid|sent|brought|ran|sat|lost|won|wore|put|kept|heard|met|became|goes|takes|makes|comes|gets|has|says|tells|gives|buys|finds|leaves|feels|knows|thinks|writes|speaks|drives|forgets|sleeps|drinks|pays|sends|brings|runs|sits|loses|wins|wears|puts|keeps|hears|meets|becomes|wants|likes|needs|lives|works|plays|talks|does)\b/i,
    titleHe: "פועל עזר + פועל לא בסיסי",
    explainHe: "אחרי did / does / don't / didn't הפועל חוזר לצורת הבסיס: Did you go? She doesn't like. I didn't see.",
  },
];

export function scanText(text: string, traps: InterferenceTrap[], targets: string[] = []): ScanResult {
  const clean = text.replace(/\s+/g, " ").trim();
  const words = clean ? clean.split(" ").filter((w) => /[a-z]/i.test(w)).length : 0;
  const sentences = clean ? clean.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0;
  const issues: ScanIssue[] = [];
  const seenSpans = new Set<string>();

  for (const t of traps) {
    let re: RegExp;
    try { re = new RegExp(t.pattern, "gi"); } catch { continue; }
    let m: RegExpExecArray | null;
    while ((m = re.exec(clean)) && issues.length < 12) {
      const key = `${m.index}:${m[0].length}`;
      if (seenSpans.has(key)) break;
      seenSpans.add(key);
      issues.push({ type: "interference", trapId: t.id, match: m[0], titleHe: t.titleHe, explainHe: t.explainHe, right: t.right });
      if (m[0].length === 0) re.lastIndex++;
    }
  }
  for (const h of HEURISTICS) {
    const m = h.re.exec(clean);
    if (!m) continue;
    if (h.skipIfPrev) {
      const before = clean.slice(0, m.index);
      if (h.skipIfPrev.test(before)) continue;
    }
    if (issues.some((i) => i.match.toLowerCase().includes(m[0].toLowerCase()) || m[0].toLowerCase().includes(i.match.toLowerCase()))) continue;
    issues.push({ type: h.type, match: m[0], titleHe: h.titleHe, explainHe: h.explainHe });
  }

  const lower = clean.toLowerCase();
  const usedTargets: string[] = [];
  const missedTargets: string[] = [];
  for (const t of targets) {
    const stem = t.toLowerCase().replace(/[,.…]+$/, "").trim();
    const core = stem.length > 5 ? stem.slice(0, Math.max(4, stem.length - 2)) : stem; // tolerate inflection
    if (lower.includes(core)) usedTargets.push(t);
    else missedTargets.push(t);
  }
  return { words, sentences, issues, usedTargets, missedTargets };
}
