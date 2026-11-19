import Link from "next/link";
import { hackathons, openSource, profile } from "@/lib/content";
import { formatDate, type PostMeta } from "@/lib/posts";

const h2 = "text-lg font-semibold text-zinc-950 dark:text-zinc-50";
import { chipBase, tagColor } from "@/lib/tag-colors";

export function AboutBlock() {
  return (
    <div className="mx-auto max-w-3xl text-left">
      <h1 className={h2}>about</h1>
      <div className="mt-3 space-y-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {profile.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}

export function HackathonsBlock() {
  return (
    <section className="mt-10">
      <h2 className={h2}>hackathons</h2>
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

export function OpenSourceBlock() {
  return (
    <section className="mt-10">
      <h2 className={h2}>open source</h2>
      <ul className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {openSource.map((c) => (
          <li key={c.url}>
            <a href={c.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 py-3 text-sm">
              {c.status === "merged" ? <MergedIcon /> : <OpenIcon />}
              <span className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {c.repo}#{c.number}
              </span>
              <span className="min-w-0 truncate text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300">
                {c.title}
              </span>
              <span aria-hidden="true" className="ml-auto text-zinc-400 transition-transform group-hover:translate-x-0.5">
                ↗
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
      <div className="flex items-baseline justify-between gap-4">
        <h2 className={h2}>writing</h2>
        <Link href="/writing" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">
          all writing →
        </Link>
      </div>
      <ul className="mt-4 space-y-6">
        {posts.slice(0, 3).map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group block"
              style={{ "--accent": tagColor(post.tags[0] ?? post.slug).accent } as React.CSSProperties}
            >
              <h3 className="font-medium text-zinc-900 transition-colors group-hover:text-[var(--accent)] dark:text-zinc-100">
                {post.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{post.description}</p>
              <div className="mt-2 flex items-center gap-2">
                {post.tags[0] && <span className={`${chipBase} ${tagColor(post.tags[0]).chip}`}>{post.tags[0]}</span>}
                <time dateTime={post.date} className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {formatDate(post.date)}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
