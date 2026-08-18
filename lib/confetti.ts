"use client";

/**
 * Zero-dependency canvas confetti. Fired on wins: gamble hits, achievement
 * unlocks, big paydays, rich retirements. Self-contained — creates a
 * fixed-position canvas, animates, removes itself. Respects reduced motion.
 */

const COLORS = ["#4ade80", "#fbbf24", "#c084fc", "#38bdf8", "#f87171", "#f8fafc"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  spin: number;
  shape: 0 | 1; // rect | circle
  wobble: number;
}

let activeCanvas: HTMLCanvasElement | null = null;
let activeParticles: Particle[] = [];
let rafId = 0;

/** intensity: "win" (small burst) | "jackpot" (full-screen rain) */
export function fireConfetti(intensity: "win" | "jackpot" = "win"): void {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const count = intensity === "jackpot" ? 160 : 70;
  const canvas = ensureCanvas();
  const { innerWidth: w, innerHeight: h } = window;

  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0;
    activeParticles.push({
      x: intensity === "jackpot" ? Math.random() * w : fromLeft ? -10 : w + 10,
      y: intensity === "jackpot" ? -20 - Math.random() * h * 0.5 : h * (0.35 + Math.random() * 0.3),
      vx:
        intensity === "jackpot"
          ? (Math.random() - 0.5) * 3
          : (fromLeft ? 1 : -1) * (4 + Math.random() * 7),
      vy: intensity === "jackpot" ? 2 + Math.random() * 3 : -(6 + Math.random() * 6),
      size: 5 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      shape: Math.random() < 0.7 ? 0 : 1,
      wobble: Math.random() * Math.PI * 2,
    });
  }

  if (!rafId) tick(canvas);
}

function ensureCanvas(): HTMLCanvasElement {
  if (activeCanvas) return activeCanvas;
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  activeCanvas = canvas;
  return canvas;
}

function tick(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const step = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    activeParticles = activeParticles.filter((p) => p.y < canvas.height + 30);

    for (const p of activeParticles) {
      p.vy += 0.35; // gravity
      p.vx *= 0.985;
      p.wobble += 0.1;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.shape === 0) {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (activeParticles.length > 0) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = 0;
      activeCanvas?.remove();
      activeCanvas = null;
    }
  };

  rafId = requestAnimationFrame(step);
}

/** Witty one-liners shown alongside a win. */
export const WIN_QUIPS = [
  "CHA-CHING. 💸",
  "Absolute W.",
  "Print the money slide.",
  "The group chat hears about this one.",
  "Comp committee in shambles.",
  "Screenshot this for LinkedIn.",
  "Your financial advisor just smiled in their sleep.",
  "That's going in the memoir.",
  "Somewhere, a recruiter felt a disturbance.",
  "Vest in peace? No — vest in POWER.",
] as const;

export function pickWinQuip(): string {
  return WIN_QUIPS[Math.floor(Math.random() * WIN_QUIPS.length)];
}
