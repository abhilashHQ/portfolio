import type { Metadata } from "next";
import Link from "next/link";
import { ProjectsGrid, type Project } from "@/components/projects-grid";
import projects from "@/data/projects.json";

export const metadata: Metadata = {
  title: "projects | abhilash",
  description: "A collection of projects by Abhilash.",
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <section className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
        >
          ← back home
        </Link>
        <div className="mt-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">projects</h1>
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            agents, search systems and backends i&apos;ve built and shipped.
          </p>
        </div>
        <ProjectsGrid projects={projects as Project[]} />
      </section>
    </main>
  );
}
