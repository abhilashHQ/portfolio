"use client";

import { useEffect, useId, useState } from "react";
import { flushSync } from "react-dom";
import { applyTheme, DEFAULT_THEME, revealTheme, THEME_KEY, type Theme } from "@/lib/theme";

// Crescent cutout sits 7.5 units off center at -5deg in dark, and slides 20 units out in light.
const CUT = { cx: 12 + 7.5 * Math.cos((-5 * Math.PI) / 180), cy: 12 + 7.5 * Math.sin((-5 * Math.PI) / 180) };
const CUT_OUT = { dx: 12.5 * Math.cos((-5 * Math.PI) / 180), dy: 12.5 * Math.sin((-5 * Math.PI) / 180) };
const RAYS = 8;

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return DEFAULT_THEME;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const maskId = `moon-${useId().replace(/[^\w-]/g, "")}`;

  useEffect(() => setTheme(readTheme()), []);

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = (theme ?? DEFAULT_THEME) === "dark" ? "light" : "dark";
    const box = e.currentTarget.getBoundingClientRect();
    revealTheme(box.left + box.width / 2, box.top + box.height / 2, () => {
      flushSync(() => setTheme(next));
      applyTheme(next);
    });
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  }

  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "switch to light mode" : "switch to dark mode"}
      aria-pressed={dark}
      className="-m-1.5 flex size-8 touch-manipulation items-center justify-center rounded-full text-zinc-500 transition-[scale,background-color,color] duration-150 ease-out select-none hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.96] motion-reduce:transition-colors dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
    >
      {theme && (
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
          className="theme-icon"
          style={{ rotate: dark ? "-40deg" : "0deg" }}
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="white" />
              <circle
                r="7.5"
                cx={CUT.cx}
                cy={CUT.cy}
                fill="black"
                style={{ translate: dark ? "0 0" : `${CUT_OUT.dx}px ${CUT_OUT.dy}px` }}
              />
            </mask>
          </defs>
          <circle cx="12" cy="12" r="8" fill="currentColor" mask={`url(#${maskId})`} style={{ scale: dark ? "1" : "0.5625" }} />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {Array.from({ length: RAYS }, (_, i) => (
              <line
                key={i}
                x1="19.5"
                y1="12"
                x2="22"
                y2="12"
                style={
                  {
                    rotate: `${i * 45}deg`,
                    scale: dark ? "0.48" : "1",
                    opacity: dark ? 0 : 1,
                    "--ray-delay": `${dark ? 0.018 * i : 0.06 + (RAYS - 1 - i) * 0.018}s`,
                    "--ray-fade": dark ? "0.12s" : "0.18s",
                  } as React.CSSProperties
                }
              />
            ))}
          </g>
        </svg>
      )}
    </button>
  );
}
