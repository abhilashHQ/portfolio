const PALETTE = [
  { chip: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300", accent: "#0284c7" },
  { chip: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300", accent: "#7c3aed" },
  { chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", accent: "#059669" },
  { chip: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300", accent: "#d97706" },
  { chip: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300", accent: "#e11d48" },
  { chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", accent: "#4f46e5" },
  { chip: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300", accent: "#0d9488" },
  { chip: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300", accent: "#c026d3" },
  { chip: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300", accent: "#ea580c" },
  { chip: "bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300", accent: "#65a30d" },
];

function hash(s: string) {
  let h = 2166136261;
  for (const ch of s.toLowerCase()) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

export function tagColor(tag: string) {
  return PALETTE[hash(tag) % PALETTE.length];
}

export const chipBase = "rounded-full px-2 py-1 font-mono text-[10px]";
