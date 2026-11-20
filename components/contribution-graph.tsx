"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Contributions, Day, Week } from "@/lib/github";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const CELL = 10;
const GAP = 3;
const PITCH = CELL + GAP;
const WEEK_STAGGER_MS = 8;
const MIN_LABEL_GAP_WEEKS = 3;

type Tip = { x: number; y: number; text: string } | null;

function dayOf(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

// weeks[w][dow], null where the year window has no day (partial first/last week).
function toMatrix(weeks: Week[]) {
  return weeks.map((week) => {
    const column: (Day | null)[] = Array(7).fill(null);
    for (const day of week.contributionDays) column[dayOf(day.date).getUTCDay()] = day;
    return column;
  });
}

function monthLabels(matrix: (Day | null)[][]) {
  const starts: { month: string; week: number }[] = [];
  let last = -1;
  matrix.forEach((column, week) => {
    const first = column.find(Boolean);
    if (!first) return;
    const month = dayOf(first.date).getUTCMonth();
    if (month !== last) {
      starts.push({ month: MONTHS[month], week });
      last = month;
    }
  });
  return starts.filter((s, i) => !starts[i + 1] || starts[i + 1].week - s.week >= MIN_LABEL_GAP_WEEKS);
}

function tipText(day: Day) {
  const d = dayOf(day.date);
  const when = `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
  if (day.count === 0) return `no contributions on ${when}`;
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${when}`;
}

export function ContributionGraph({ data, username }: { data: Contributions | null; username: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [tip, setTip] = useState<Tip>(null);
  const [tipVisible, setTipVisible] = useState(false);
  const tipRef = useRef<HTMLSpanElement>(null);
  const matrix = useMemo(() => toMatrix(data?.weeks ?? []), [data]);

  // Center the pill over the cell, but keep it inside the frame so it never widens the page.
  useLayoutEffect(() => {
    const pill = tipRef.current;
    const frame = frameRef.current;
    if (!pill || !frame || !tip) return;
    const half = pill.offsetWidth / 2;
    const left = Math.min(Math.max(tip.x - half, 0), frame.clientWidth - pill.offsetWidth);
    pill.style.transform = `translate(${left - tip.x}px, calc(-100% - 6px))`;
  }, [tip]);

  useEffect(() => {
    const scroller = scrollRef.current;
    const grid = gridRef.current;
    if (!scroller || !grid) return;

    const pinToNewest = () => (scroller.scrollLeft = scroller.scrollWidth);
    pinToNewest();
    window.addEventListener("resize", pinToNewest);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(grid);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", pinToNewest);
    };
  }, []);

  function showTip(day: Day, el: HTMLElement) {
    const frame = frameRef.current;
    if (!frame) return;
    const f = frame.getBoundingClientRect();
    const c = el.getBoundingClientRect();
    setTip({ x: c.left - f.left + c.width / 2, y: c.top - f.top, text: tipText(day) });
    setTipVisible(true);
  }

  const header = (
    <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[12px]">
      <h2 className="text-zinc-500 dark:text-zinc-400">contributions</h2>
      {data && (
        <span className="whitespace-nowrap tabular-nums text-zinc-400 dark:text-zinc-500">
          <span aria-hidden="true" className="me-2 opacity-60">
            /
          </span>
          {data.total.toLocaleString("en")} in the last year
        </span>
      )}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ms-auto font-sans text-[13px] text-zinc-400 transition-colors hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50"
      >
        @{username}
      </a>
    </div>
  );

  if (!data) return <section className="w-full">{header}</section>;

  const lastWeek = matrix.length - 1;
  const width = matrix.length * PITCH - GAP;

  return (
    <section className="w-full">
      {header}
      <div className="mt-4">
        <div
          ref={frameRef}
          className="relative flex w-fit max-w-full text-xs text-zinc-500 dark:text-zinc-400"
          onPointerLeave={() => setTipVisible(false)}
        >
          <div aria-hidden="true" className="mr-[5px] mt-[23px] flex shrink-0 flex-col">
            {["", "mon", "", "wed", "", "fri", ""].map((label, i) => (
              <span key={i} style={{ height: PITCH, lineHeight: `${CELL}px` }}>
                {label}
              </span>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="min-w-0 flex-1 overflow-hidden p-[3px] [mask-image:linear-gradient(to_right,transparent,black_32px)]"
          >
            <div style={{ width }}>
              <div aria-hidden="true" className="relative h-5">
                {monthLabels(matrix).map(({ month, week }) => (
                  <span key={`${month}-${week}`} className="absolute top-0 leading-none" style={{ left: week * PITCH }}>
                    {month}
                  </span>
                ))}
              </div>

              <div
                ref={gridRef}
                role="img"
                aria-label={`${data.total.toLocaleString("en")} github contributions in the last year`}
                data-shown={shown}
                className="group flex flex-col"
                style={{ gap: GAP }}
              >
                {Array.from({ length: 7 }, (_, dow) => (
                  <div key={dow} className="flex" style={{ gap: GAP }}>
                    {matrix.map((column, week) => {
                      const day = column[dow];
                      if (!day) return <div key={week} className="shrink-0" style={{ width: CELL }} />;
                      return (
                        <div
                          key={day.date}
                          onPointerEnter={(e) => showTip(day, e.currentTarget)}
                          style={{ width: CELL, height: CELL, transitionDelay: `${(lastWeek - week) * WEEK_STAGGER_MS}ms` }}
                          className={`contribution-level-${day.level} shrink-0 scale-[0.6] rounded-[2px] opacity-0 transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:outline-1 hover:outline-offset-1 hover:outline-zinc-950/50 group-data-[shown=true]:scale-100 group-data-[shown=true]:opacity-100 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none dark:hover:outline-zinc-50/50`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            data-show={tipVisible}
            className="group/tip pointer-events-none absolute left-0 top-0 z-10 size-0"
            style={{ transform: tip ? `translate(${tip.x}px, ${tip.y}px)` : undefined }}
          >
            <span ref={tipRef} className="block w-max">
              <span className="block translate-y-1 whitespace-nowrap rounded-md bg-zinc-950 px-2 py-1 text-[13px] font-medium text-zinc-50 opacity-0 transition-[opacity,translate] duration-100 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-[show=true]/tip:translate-y-0 group-data-[show=true]/tip:opacity-100 group-data-[show=true]/tip:duration-[120ms] motion-reduce:translate-y-0 dark:bg-zinc-50 dark:text-zinc-950">
                {tip?.text}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
