"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { chipBase, tagColor } from "@/lib/tag-colors";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date_created: string;
  cover: string;
  links: { repo: string | null; live: string | null; demo: string | null };
};

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

const pillBase = "rounded-full border px-3 py-1.5 text-xs transition-colors";
const pillOn = "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900";
const pillOff =
  "border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600";
const linkClass = "text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white";

const toggle = (value: string) => (current: string[]) =>
  current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const tags = useMemo(() => [...new Set(projects.flatMap((p) => p.tags))].sort(), [projects]);
  const years = useMemo(
    () => [...new Set(projects.map((p) => p.date_created.slice(0, 4)))].sort((a, b) => Number(b) - Number(a)),
    [projects],
  );
  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const tagMatch = selectedTags.length === 0 || p.tags.some((t) => selectedTags.includes(t));
        const yearMatch = selectedYears.length === 0 || selectedYears.includes(p.date_created.slice(0, 4));
        return tagMatch && yearMatch;
      }),
    [projects, selectedTags, selectedYears],
  );

  return (
    <>
      <section className="mt-10" aria-labelledby="filter-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 id="filter-heading" className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            filter by tag
          </h2>
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {filtered.length} of {projects.length} projects
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedTags([])}
            aria-pressed={selectedTags.length === 0}
            className={`${pillBase} ${selectedTags.length === 0 ? pillOn : pillOff}`}
          >
            all
          </button>
          {tags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTags(toggle(tag))}
                aria-pressed={active}
                className={`${pillBase} ${active ? pillOn : pillOff}`}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <p className="mr-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">filter by year</p>
          <button
            type="button"
            onClick={() => setSelectedYears([])}
            aria-pressed={selectedYears.length === 0}
            className={`${pillBase} ${selectedYears.length === 0 ? pillOn : pillOff}`}
          >
            all
          </button>
          {years.map((year) => {
            const active = selectedYears.includes(year);
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYears(toggle(year))}
                aria-pressed={active}
                className={`${pillBase} ${active ? pillOn : pillOff}`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <article
            key={project.slug}
            className="flex min-w-0 gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 sm:size-24">
              <Image src={project.cover} alt={`${project.title} cover`} fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 className="text-lg font-medium tracking-tight text-zinc-950 dark:text-zinc-50">{project.title}</h2>
                <time dateTime={project.date_created} className="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {monthYear.format(new Date(`${project.date_created}T00:00:00`))}
                </time>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className={`${chipBase} ${tagColor(tag).chip}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noreferrer" className={linkClass}>
                    repo ↗
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer" className={linkClass}>
                    live site ↗
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className={linkClass}>
                    demo ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
