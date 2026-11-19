"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDate, type PostMeta } from "@/lib/format";
import { chipBase, tagColor } from "@/lib/tag-colors";

export function WritingList({ posts }: { posts: PostMeta[] }) {
  const [tag, setTag] = useState("all");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const tags = useMemo(() => [...new Set(posts.flatMap((p) => p.tags))].sort(), [posts]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (tag === "all" || p.tags.includes(tag)) &&
        (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    );
  }, [posts, tag, query]);

  return (
    <section className="mt-10 border-t border-zinc-200 pt-10 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">all posts</h2>
        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">filter by tag</span>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="h-9 appearance-none rounded-md border border-zinc-200 bg-white pl-3 pr-8 text-xs text-zinc-600 outline-none transition-colors hover:border-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
            >
              <option value="all">all tags</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </label>
          <button
            type="button"
            onClick={() => {
              setSearching((s) => !s);
              setQuery("");
            }}
            aria-pressed={searching}
            aria-label="search posts"
            className="grid size-9 place-items-center rounded-md border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </div>
      </div>

      {searching && (
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search posts"
          className="mt-4 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
        />
      )}

      <ul className="mt-8 space-y-9">
        {filtered.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group relative block"
              style={{ "--accent": tagColor(post.tags[0] ?? post.slug).accent } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute -left-4 top-1 h-0 w-[3px] rounded-full bg-[var(--accent)] transition-all duration-300 group-hover:h-6 max-sm:hidden"
              />
              <h3 className="text-[17px] font-medium leading-snug text-zinc-950 transition-colors group-hover:text-[var(--accent)] dark:text-zinc-50">
                {post.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[15px] leading-6 text-zinc-500 dark:text-zinc-400">
                {post.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t} className={`${chipBase} ${tagColor(t).chip}`}>
                    {t}
                  </span>
                ))}
                <time dateTime={post.date} className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {formatDate(post.date)}
                </time>
                <span className="font-mono text-xs text-zinc-400">· {post.readingMinutes} min read</span>
              </div>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && <li className="text-sm text-zinc-500">no posts match.</li>}
      </ul>
    </section>
  );
}
