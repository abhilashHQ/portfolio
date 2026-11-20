"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="back to top"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      data-shown={shown}
      className="fixed bottom-4 right-4 z-[60] flex size-10 translate-y-2 scale-95 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-500 opacity-0 backdrop-blur-md transition-[opacity,translate,scale,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none hover:text-zinc-950 data-[shown=true]:pointer-events-auto data-[shown=true]:translate-y-0 data-[shown=true]:scale-100 data-[shown=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:text-zinc-50 sm:bottom-8 sm:right-8"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
