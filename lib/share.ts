import type { EndingKind } from "./types";

/**
 * Share-link stat seeding (the viral engine's plumbing).
 *
 * A finished run is encoded into query params (`?k=retired&a=33&nw=1500000&t=...`).
 * The shared URL then does two jobs:
 *   1. `generateMetadata` on the home page points OG/Twitter cards at
 *      `/api/og?<same params>` so the link unfurls into the player's card.
 *   2. The page shows a "challenge" banner to the friend who clicked.
 *
 * All decoding is defensive: params come from the open internet.
 */

export interface ShareData {
  kind: EndingKind;
  age: number;
  netWorth: number;
  title: string;
}

type ParamSource = URLSearchParams | Record<string, string | string[] | undefined>;

function readParam(source: ParamSource, key: string): string | null {
  if (source instanceof URLSearchParams) return source.get(key);
  const value = source[key];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export function encodeShareParams(data: ShareData): string {
  const params = new URLSearchParams({
    k: data.kind,
    a: String(Math.round(data.age)),
    nw: String(Math.round(data.netWorth)),
    t: data.title,
  });
  return params.toString();
}

/** Returns null unless all params are present and sane. */
export function decodeShareParams(source: ParamSource): ShareData | null {
  const kind = readParam(source, "k");
  const age = Number(readParam(source, "a"));
  const netWorth = Number(readParam(source, "nw"));
  const title = (readParam(source, "t") ?? "").trim();

  if (kind !== "burnout" && kind !== "retired") return null;
  if (!Number.isFinite(age) || !Number.isFinite(netWorth) || title.length === 0)
    return null;

  return {
    kind,
    age: Math.min(120, Math.max(18, Math.round(age))),
    netWorth: Math.min(999_000_000, Math.max(-999_000_000, Math.round(netWorth))),
    title: title.slice(0, 60),
  };
}
