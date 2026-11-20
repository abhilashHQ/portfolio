import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { PostToc, ReadingProgress } from "@/components/post-chrome";
import { formatDate, getHeadings, getPost, getPosts } from "@/lib/posts";
import { chipBase, tagColor } from "@/lib/tag-colors";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | abhilash`,
    description: post.description,
    openGraph: post.cover ? { images: [post.cover] } : undefined,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }]],
      },
    },
  });
  const headings = getHeadings(post.body);
  const accent = tagColor(post.tags[0] ?? post.slug).accent;

  return (
    <main
      className="flex flex-1 px-5 py-12 sm:px-8 sm:py-16"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <ReadingProgress />
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[minmax(0,640px)_1fr]">
        <article className="min-w-0">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Link href="/writing" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
              writing
            </Link>
            {post.tags[0] && (
              <>
                <span aria-hidden="true">·</span>
                <span className={`${chipBase} ${tagColor(post.tags[0]).chip}`}>{post.tags[0]}</span>
              </>
            )}
          </nav>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-between gap-4 border-b border-zinc-200 pb-4 font-mono text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <span>by abhilash</span>
            <span>
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
            </span>
          </div>

          {post.cover && (
            <div className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <Image src={post.cover} alt="" fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
            </div>
          )}

          <div data-post-body className="post-body mt-10">
            {content}
          </div>

          <div className="mt-12 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <Link key={t} href="/writing" className={`${chipBase} ${tagColor(t).chip}`}>
                {t}
              </Link>
            ))}
          </div>

          <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <Link
              href="/writing"
              className="inline-flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
            >
              ← all writing
            </Link>
          </div>
        </article>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <PostToc headings={headings} />
          </aside>
        )}
      </div>
    </main>
  );
}
