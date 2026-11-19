"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RGB = [number, number, number];

const PALETTES = {
  green: { fill: [40, 210, 110], line: [150, 255, 180], star: [200, 255, 220] },
  blue: { fill: [53, 143, 243], line: [150, 200, 255], star: [205, 228, 255] },
  purple: { fill: [150, 110, 255], line: [200, 175, 255], star: [225, 210, 255] },
  pink: { fill: [240, 90, 190], line: [255, 170, 220], star: [255, 205, 235] },
  orange: { fill: [255, 150, 50], line: [255, 195, 130], star: [255, 220, 175] },
  red: { fill: [240, 70, 70], line: [255, 150, 140], star: [255, 195, 185] },
  grey: { fill: [92, 92, 100], line: [140, 140, 150], star: [165, 165, 175] },
} satisfies Record<string, { fill: RGB; line: RGB; star: RGB }>;

type PaletteName = keyof typeof PALETTES;
type ColorInput = PaletteName | number;
type Direction = "up" | "down" | "left" | "right";
type Bloom = "off" | "low" | "high" | "aura";

const rgba = ([r, g, b]: RGB, k = 1, a = 1) =>
  `rgba(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)},${a})`;

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16));

function hueToRgb(hue: number): RGB {
  const h = ((hue % 360) + 360) % 360;
  const c = (1 - Math.abs(1.16 - 1)) * 0.85;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = 0.58 - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function resolveColor(color: ColorInput): RGB {
  return typeof color === "number" ? hueToRgb(color) : PALETTES[color].fill;
}

const BLOOM = {
  low: { blur: 3, brightness: 1.35, opacity: 0.7, saturate: 1.4 },
  high: { blur: 5, brightness: 1.5, opacity: 0.78, saturate: 1.5 },
  aura: { blur: 15, brightness: 2.9, opacity: 0.1, saturate: 3 },
};

type DrawOptions = {
  from: ColorInput;
  to: ColorInput | "transparent";
  direction: Direction;
  cell: number;
  opacity: number;
};

function draw(
  canvas: HTMLCanvasElement,
  bloomCanvas: HTMLCanvasElement | null,
  width: number,
  height: number,
  opts: DrawOptions,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx || width <= 0 || height <= 0) return;

  const cols = Math.min(960, Math.max(4, Math.round(width / opts.cell)));
  const rows = Math.min(600, Math.max(4, Math.round(height / opts.cell)));
  canvas.width = cols;
  canvas.height = rows;

  const from = resolveColor(opts.from);
  const to = opts.to === "transparent" ? null : resolveColor(opts.to);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const t =
        1 -
        (opts.direction === "up"
          ? 1 - (y + 0.5) / rows
          : opts.direction === "down"
            ? (y + 0.5) / rows
            : opts.direction === "left"
              ? 1 - (x + 0.5) / cols
              : (x + 0.5) / cols);
      const on = t > BAYER_4X4[y & 3][x & 3];

      if (to) {
        ctx.fillStyle = rgba(on ? from : to, 1, opts.opacity);
        ctx.fillRect(x, y, 1, 1);
      } else {
        const alpha = (on ? 0.35 + 0.65 * t : 0.12 * t) * opts.opacity;
        if (alpha <= 0.004) continue;
        ctx.fillStyle = rgba(from, 1, alpha);
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  const bloomCtx = bloomCanvas?.getContext("2d") ?? null;
  if (bloomCanvas && bloomCtx) {
    bloomCanvas.width = cols;
    bloomCanvas.height = rows;
    bloomCtx.drawImage(canvas, 0, 0);
  }
}

function bloomStyle(bloom: Bloom): React.CSSProperties | null {
  if (bloom === "off") return null;
  const b = BLOOM[bloom];
  return {
    filter: `blur(${b.blur}px) brightness(${b.brightness}) saturate(${b.saturate})`,
    opacity: b.opacity,
    mixBlendMode: "plus-lighter",
    imageRendering: "auto",
  };
}

export function DitherGradient({
  from,
  to = "transparent",
  direction = "up",
  cell = 3,
  opacity = 1,
  bloom = "off",
  className,
}: {
  from: ColorInput;
  to?: ColorInput | "transparent";
  direction?: Direction;
  cell?: number;
  opacity?: number;
  bloom?: Bloom;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bloomRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const render = () => {
      const rect = container.getBoundingClientRect();
      draw(canvas, bloomRef.current, rect.width, rect.height, { from, to, direction, cell, opacity });
    };

    render();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(render);
    observer.observe(container);
    return () => observer.disconnect();
  }, [from, to, direction, cell, opacity, bloom]);

  const style = bloomStyle(bloom);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ imageRendering: "pixelated" }} />
      {style && <canvas ref={bloomRef} className="absolute inset-0 h-full w-full" style={style} />}
    </div>
  );
}
