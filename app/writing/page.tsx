import type { Metadata } from "next";
import Link from "next/link";
import { WritingList } from "@/components/writing-list";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "writing | abhilash",
  description: "Notes and write-ups by Abhilash.",
};

export default function WritingPage() {
  return (
    <main className="flex flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
        >
          ← back home
        </Link>
        <div className="mt-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            writing.
            <br />
            <span className="text-zinc-400 dark:text-zinc-500">notes from building agents.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            write-ups on what i build, what broke, and what i think about the tools.
          </p>
        </div>
        <WritingList posts={getPosts()} />
      </section>
    </main>
  );
}
