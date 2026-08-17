/** Player-facing metrics. Net worth is the score; burnout at 100 ends the run. */
export interface GameStats {
  netWorth: number;
  /** 0–100. 100 = breakdown, game over. */
  burnout: number;
  title: string;
}

/** Delta applied to GameStats when a choice or event resolves. */
export interface StatEffect {
  netWorth?: number;
  /**
   * Multiplicative net-worth change, e.g. -0.25 = lose 25%. Used by market
   * RNG events. Only applied when net worth is positive (a crash can't
   * shrink your student loans).
   */
  netWorthPct?: number;
  burnout?: number;
  /** When set, replaces the player's current title. */
  title?: string;
}

/** One branch outcome: flavor text + stat delta + where the story goes next. */
export interface Outcome {
  /** Consequence text shown on the outcome screen. */
  text: string;
  effect: StatEffect;
  /** Scenario id for next year. Omit to end the run. */
  next?: string;
  /** Ending kind when the run ends here (no `next`). Defaults to "retired". */
  ending?: EndingKind;
}

export interface Choice {
  id: string;
  label: string;
  outcome: Outcome;
  /**
   * Rewarded-ad gate. When set, picking this choice plays a rewarded ad first:
   * ad completed → `outcome`; ad skipped/failed → `adFallback`.
   */
  requiresAd?: boolean;
  adFallback?: Outcome;
}

export interface Scenario {
  id: string;
  /** Career year, starting at 1. */
  year: number;
  /** Player age this year (age = 21 + year). */
  age: number;
  /**
   * Pool membership. A scenario with `slot: "y2-bigtech-oncall"` is an
   * alternate version of that hub: any `next` pointing at the hub id picks
   * randomly from the whole pool (hub + its variants). Hubs omit this field.
   */
  slot?: string;
  headline: string;
  text: string;
  choices: Choice[];
}

/** Sudden events rolled between years (market crash, layoffs, viral moment...). */
export interface RandomEvent {
  id: string;
  headline: string;
  text: string;
  effect: StatEffect;
  /** 0–1 chance to fire on any given year transition. */
  probability: number;
  /** Earliest career year it can fire (default 1). */
  minYear?: number;
  /** Fires at most once per run. */
  once?: boolean;
}

export type EndingKind = "burnout" | "retired";

export interface Ending {
  kind: EndingKind;
  headline: string;
  achievement: string;
}

export type GamePhase = "intro" | "scenario" | "outcome" | "gameover";

/** One line in the run history — powers the terminal-style log and the scorecard. */
export interface LogEntry {
  year: number;
  age: number;
  headline: string;
  choiceLabel?: string;
  isRandomEvent?: boolean;
}
