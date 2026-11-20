"use client";

import { useEffect, useState } from "react";

const clock = new Intl.DateTimeFormat("en", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
const hourOf = new Intl.DateTimeFormat("en", { timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23" });

function now() {
  const d = new Date();
  const hour = Number(hourOf.format(d));
  return { time: clock.format(d).replace(" ", "").toLowerCase(), day: hour >= 6 && hour < 18 };
}

const Sun = () => (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </>
);
const Moon = () => <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />;

export function LocationPill({ location }: { location: string }) {
  const [state, setState] = useState<ReturnType<typeof now> | null>(null);

  useEffect(() => {
    setState(now());
    const id = setInterval(() => setState(now()), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      title="open to internships"
      className="inline-flex h-8 items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 pe-3 ps-2.5 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="location-sonar absolute inset-0 rounded-full bg-emerald-500" />
        <span className="location-beat relative size-2 rounded-full bg-emerald-500" />
      </span>
      <span className="sr-only">open to internships,</span>
      <span>{location}</span>
      <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
        ·
      </span>
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-zinc-400 dark:text-zinc-500"
      >
        {state && (state.day ? <Sun /> : <Moon />)}
      </svg>
      <time className="min-w-[7ch] tabular-nums" suppressHydrationWarning>
        {state?.time ?? ""}
        <span className="sr-only"> local time</span>
      </time>
    </div>
  );
}
