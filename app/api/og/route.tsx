import { ImageResponse } from "next/og";
import { buildEnding, formatMoney } from "@/lib/gameLogic";
import { decodeShareParams } from "@/lib/share";

/**
 * Dynamic Open Graph card (1200x630) for shared runs.
 *
 * `/api/og`                          → generic promo card
 * `/api/og?k=retired&a=33&nw=...&t=` → the player's personalized scorecard
 *
 * Rendered with next/og (Satori). Every multi-child element needs explicit
 * flex display; styles are inline by design.
 */

export const runtime = "edge";

const COLORS = {
  bg: "#0a0e14",
  panel: "#10151f",
  border: "#1e2836",
  green: "#4ade80",
  red: "#f87171",
  dim: "#8b98a9",
  text: "#e2e8f0",
};

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 22, color: COLORS.dim, letterSpacing: 4 }}>{label}</span>
      <span style={{ fontSize: 54, fontWeight: 700, color: color ?? COLORS.text }}>
        {value}
      </span>
    </div>
  );
}

export function GET(request: Request): ImageResponse {
  const share = decodeShareParams(new URL(request.url).searchParams);

  const frame = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: COLORS.bg,
    padding: 64,
    fontFamily: "monospace",
  };

  if (!share) {
    // Generic promo card for the bare link.
    return new ImageResponse(
      (
        <div style={frame}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <span style={{ fontSize: 26, color: COLORS.green, fontWeight: 700 }}>
              tech-career-sim
            </span>
            <span style={{ fontSize: 24, color: COLORS.dim }}>free · no login · 3 min</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "center",
              gap: 18,
            }}
          >
            <span style={{ fontSize: 84, fontWeight: 800, color: COLORS.text }}>
              From graduation
            </span>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 800, gap: 24 }}>
              <span style={{ color: COLORS.text }}>to</span>
              <span style={{ color: COLORS.green }}>the exit.</span>
            </div>
            <span style={{ fontSize: 34, color: COLORS.dim, marginTop: 16 }}>
              15 years. One choice per year. Retire rich — or melt down trying.
            </span>
          </div>
          <span style={{ fontSize: 26, color: COLORS.dim }}>
            {">"} Layoffs, tech winters, and gold rushes await
          </span>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }

  const ending = buildEnding(share.kind, {
    netWorth: share.netWorth,
    burnout: 0,
    title: share.title,
  });
  const isBurnout = share.kind === "burnout";
  const accent = isBurnout ? COLORS.red : COLORS.green;

  return new ImageResponse(
    (
      <div style={frame}>
        <span style={{ fontSize: 24, color: COLORS.dim, letterSpacing: 6 }}>
          TECH CAREER SIMULATOR · PLAYER CARD
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            gap: 40,
          }}
        >
          <span style={{ fontSize: 88, fontWeight: 800, color: accent }}>
            {ending.headline}
          </span>
          <div style={{ display: "flex", gap: 96 }}>
            <Stat label="FINAL AGE" value={String(share.age)} />
            <Stat
              label="NET WORTH"
              value={formatMoney(share.netWorth)}
              color={share.netWorth < 0 ? COLORS.red : COLORS.green}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              borderTop: `2px solid ${COLORS.border}`,
              paddingTop: 28,
            }}
          >
            <span style={{ fontSize: 22, color: COLORS.dim, letterSpacing: 4 }}>
              FINAL TITLE
            </span>
            <span style={{ fontSize: 44, fontWeight: 700, color: COLORS.text }}>
              {share.title}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <span style={{ fontSize: 28, color: COLORS.text, fontWeight: 700 }}>
            Think you can beat this run?
          </span>
          <span style={{ fontSize: 28, color: COLORS.green, fontWeight: 700 }}>
            {">"} Play free
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
