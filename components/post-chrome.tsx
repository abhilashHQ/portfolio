"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>("[data-post-body]");
    if (!article) return;
    const update = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / total)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        className="h-full origin-left bg-[var(--accent)] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

type Heading = { depth: number; text: string; id: string };

export function PostToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    const update = () => {
      let current = els[0]?.id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
        else break;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [headings]);

  return (
    <nav className="sticky top-20">
      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">on this page</p>
      <ul className="mt-3 space-y-2 border-l border-zinc-200 text-sm dark:border-zinc-800">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id} className={`relative ${h.depth === 3 ? "pl-7" : "pl-4"}`}>
              {isActive && (
                <span aria-hidden="true" className="absolute -left-px top-0 h-full w-0.5 rounded-full bg-[var(--accent)]" />
              )}
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block normal-case leading-5 transition-colors hover:text-zinc-950 ${
                  isActive ? "font-medium text-[var(--accent)]" : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
