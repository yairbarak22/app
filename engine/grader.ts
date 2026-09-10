/** Answer normalization and tolerant matching for typed answers. */

const UK_TO_US: Record<string, string> = {
  colour: "color", colours: "colors", favourite: "favorite", neighbour: "neighbor", neighbours: "neighbors",
  travelling: "traveling", travelled: "traveled", traveller: "traveler", organise: "organize", organised: "organized",
  organising: "organizing", realise: "realize", realised: "realized", recognise: "recognize", recognised: "recognized",
  apologise: "apologize", apologised: "apologized", centre: "center", theatre: "theater", programme: "program",
  grey: "gray", practise: "practice", practised: "practiced", licence: "license", cancelled: "canceled",
  cancelling: "canceling", jewellery: "jewelry", cheque: "check", tyre: "tire", behaviour: "behavior",
  humour: "humor", flavour: "flavor", labour: "labor", honour: "honor", metre: "meter", litre: "liter",
  catalogue: "catalog", dialogue: "dialog", analyse: "analyze", defence: "defense", offence: "offense",
  mum: "mom", pyjamas: "pajamas", aeroplane: "airplane", learnt: "learned", dreamt: "dreamed", spelt: "spelled",
  burnt: "burned", "whilst": "while", "amongst": "among", "towards": "toward", "afterwards": "afterward",
};

const ZERO_ARTICLE = new Set(["", "-", "—", "–", "x", "0", "no article", "zero", "zero article", "nothing", "none", "∅"]);

/** Basic normalization: case, spacing, punctuation, spelling variants. Contractions are NOT expanded here. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/["]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([.,!?;:])\s*/g, "$1 ")
    .replace(/[.,!?;:]+\s*$/g, "")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/[.,!?;:]/g, "")
    .trim()
    .split(" ")
    .map((w) => UK_TO_US[w] ?? w)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** All contraction expansions of a normalized string (handles ambiguous 's and 'd). */
export function contractionVariants(s: string): string[] {
  let variants = [s];
  const apply = (from: RegExp, tos: string[]) => {
    const next: string[] = [];
    for (const v of variants) {
      if (!from.test(v)) { next.push(v); continue; }
      for (const to of tos) next.push(v.replace(from, to));
    }
    variants = next;
  };
  apply(/\bwon't\b/g, ["will not"]);
  apply(/\bcan't\b/g, ["cannot"]);
  apply(/\bcannot\b/g, ["can not"]);
  apply(/\bshan't\b/g, ["shall not"]);
  apply(/\bain't\b/g, ["is not"]);
  apply(/n't\b/g, [" not"]);
  apply(/\b(\w+)'ll\b/g, ["$1 will"]);
  apply(/\b(\w+)'re\b/g, ["$1 are"]);
  apply(/\b(\w+)'ve\b/g, ["$1 have"]);
  apply(/\bi'm\b/g, ["i am"]);
  apply(/\blet's\b/g, ["let us"]);
  // ambiguous ones: branch
  for (let i = 0; i < 3; i++) {
    apply(/\b(\w+)'s\b/, ["$1 is", "$1 has", "$1's"]);
    apply(/\b(\w+)'d\b/, ["$1 would", "$1 had"]);
  }
  // collapse the possessive leftover marker for comparison and dedupe
  return Array.from(new Set(variants.map((v) => v.replace(/\s+/g, " ").trim())));
}

/** Damerau-Levenshtein distance (adjacent transposition counts as one edit). */
function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) => {
    const row = new Array<number>(n + 1).fill(0);
    row[0] = i;
    return row;
  });
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[m][n];
}

export interface GradeResult {
  ok: boolean;
  /** Correct apart from a single-letter typo (counted correct, corrected form shown). */
  typo: boolean;
  given: string;
  expected: string; // canonical expected answer (for display)
}

export interface GradeOptions {
  /** "vocab": lenient typos anywhere in words >= 5 letters. "grammar": typos allowed only away from word endings (default). "strict": exact. */
  mode?: "vocab" | "grammar" | "strict";
}

function typoMatch(given: string, expected: string, mode: "vocab" | "grammar"): boolean {
  const g = given.split(" ");
  const e = expected.split(" ");
  if (g.length !== e.length) return false;
  let diffs = 0;
  for (let i = 0; i < g.length; i++) {
    if (g[i] === e[i]) continue;
    diffs++;
    if (diffs > 1) return false;
    const minLen = mode === "vocab" ? 5 : 6;
    if (e[i].length < minLen || editDistance(g[i], e[i]) > 1) return false;
    // in grammar mode the word ending (where inflections live) must be identical
    if (mode === "grammar" && g[i].slice(-3) !== e[i].slice(-3)) return false;
  }
  return diffs === 1;
}

/** Grade a typed answer against the canonical answer and accepted alternatives. */
export function grade(givenRaw: string, answer: string, accept: string[] = [], opts: GradeOptions = {}): GradeResult {
  const mode = opts.mode ?? "grammar";
  const expectedAll = [answer, ...accept];
  const given = normalize(givenRaw);
  // zero-article convention
  if (expectedAll.some((e) => e.trim() === "-")) {
    if (ZERO_ARTICLE.has(given)) return { ok: true, typo: false, given, expected: answer };
  }
  const givenVariants = new Set(contractionVariants(given));
  for (const e of expectedAll) {
    const en = normalize(e);
    for (const v of contractionVariants(en)) if (givenVariants.has(v)) return { ok: true, typo: false, given, expected: answer };
  }
  if (mode !== "strict") {
    for (const e of expectedAll) {
      const en = normalize(e);
      for (const ev of contractionVariants(en)) for (const gv of givenVariants) if (typoMatch(gv, ev, mode)) return { ok: true, typo: true, given, expected: answer };
    }
  }
  return { ok: false, typo: false, given, expected: answer };
}

/** For "order" exercises: compare word sequences ignoring case/punctuation. */
export function gradeOrder(words: string[], answer: string, accept: string[] = []): boolean {
  const g = normalize(words.join(" "));
  return [answer, ...accept].some((a) => normalize(a) === g);
}
