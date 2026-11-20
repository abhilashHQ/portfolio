import Link from "next/link";
import { hackathons, openSource, profile } from "@/lib/content";
import type { PostMeta } from "@/lib/posts";

import { tagColor } from "@/lib/tag-colors";

export const inlineLink =
  "text-zinc-900 underline decoration-zinc-300 decoration-1 underline-offset-4 transition-[text-decoration-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100";

const sideLink =
  "ms-auto font-sans text-[13px] text-zinc-400 transition-colors hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50";

export function SectionHeader({
  label,
  count,
  href,
  linkText,
  as: Tag = "h2",
}: {
  label: string;
  count?: string;
  href?: string;
  linkText?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[12px]">
      <Tag className="text-zinc-500 dark:text-zinc-400">{label}</Tag>
      {count && (
        <span className="whitespace-nowrap tabular-nums text-zinc-400 dark:text-zinc-500">
          <span aria-hidden="true" className="me-2 opacity-60">
            /
          </span>
          {count}
        </span>
      )}
      {href && (
        <Link href={href} className={`group inline-flex items-center gap-1 ${sideLink}`}>
          {linkText}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-3 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export function AboutBlock() {
  return (
    <div className="mx-auto max-w-3xl text-left">
      <SectionHeader as="h1" label="about" />
      <div className="mt-3 space-y-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {profile.about.map((segments, i) => (
          <p key={i}>
            {segments.map((s, j) =>
              typeof s === "string" ? (
                s
              ) : (
                <a key={j} href={s.href} target="_blank" rel="noreferrer" className={inlineLink}>
                  {s.text}
                </a>
              ),
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export function HackathonsBlock() {
  return (
    <section className="mt-10">
      <SectionHeader label="hackathons" count={String(hackathons.length)} />
      <ul className="mt-4 space-y-3">
        {hackathons.map((h) => (
          <li
            key={h.statement}
            className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <a
              href={h.link}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300"
            >
              {h.statement} <span aria-hidden="true" className="text-zinc-400">↗</span>
            </a>
            <p className="shrink-0 font-mono text-xs text-zinc-900 dark:text-zinc-100">{h.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const MergedIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-label="merged" className="text-violet-600">
    <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
  </svg>
);

const OpenIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-label="open" className="text-green-600">
    <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
  </svg>
);

const compact = new Intl.DateTimeFormat("en", { month: "short", day: "numeric" });
const monthYear = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return `${d.toLocaleString("en", { month: "short" })} '${String(d.getFullYear()).slice(2)}`;
};
const fmtCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n));

export function OpenSourceBlock() {
  const merged = openSource.filter((c) => c.status === "merged").length;
  const open = openSource.length - merged;
  const count = [merged && `${merged} merged`, open && `${open} open`].filter(Boolean).join(" · ");

  return (
    <section className="mt-10">
      <SectionHeader label="open source" count={count} />
      <ul className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {openSource.map((c) => (
          <li key={c.url}>
            <a href={c.url} target="_blank" rel="noreferrer" className="group flex items-start gap-3 py-3 text-sm">
              <span className="mt-0.5 shrink-0">{c.status === "merged" ? <MergedIcon /> : <OpenIcon />}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-zinc-50">
                  {c.title}
                </span>
                <span className="mt-0.5 block truncate font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {c.repo}#{c.number}
                </span>
              </span>
              <span className="shrink-0 text-right font-mono text-xs tabular-nums">
                <span className="block">
                  <span className="text-emerald-600 dark:text-emerald-500">+{fmtCount(c.additions)}</span>{" "}
                  <span className="text-red-600 dark:text-red-400">−{fmtCount(c.deletions)}</span>
                </span>
                <time dateTime={c.date} className="mt-0.5 block text-zinc-500 dark:text-zinc-400">
                  {compact.format(new Date(`${c.date}T00:00:00`))}
                </time>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WritingBlock({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="mt-10">
      <SectionHeader label="writing" count={String(posts.length)} href="/writing" linkText="all writing" />
      <ul className="mt-3 flex flex-col [@media(hover:hover)_and_(pointer:fine)]:[&:has(>li:hover)>li:not(:hover)]:opacity-45">
        {posts.slice(0, 3).map((post) => (
          <li key={post.slug} className="transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <Link
              href={`/writing/${post.slug}`}
              className="group grid grid-cols-[4.5rem_1fr] items-baseline gap-3 py-2"
              style={{ "--accent": tagColor(post.tags[0] ?? post.slug).accent } as React.CSSProperties}
            >
              <time
                dateTime={post.date}
                className="font-mono text-[12px] tabular-nums text-zinc-400 transition-colors duration-150 group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400"
              >
                {monthYear(post.date)}
              </time>
              <div className="min-w-0">
                <h3 className="text-pretty text-[15px] leading-normal text-zinc-900 underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:decoration-[var(--accent)] dark:text-zinc-100">
                  {post.title}
                </h3>
                <p className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-400">{post.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
