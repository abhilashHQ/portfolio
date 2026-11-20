import Image from "next/image";
import Link from "next/link";
import {
  AboutBlock,
  HackathonsBlock,
  OpenSourceBlock,
  SectionHeader,
  WritingBlock,
} from "@/components/blocks";
import { LocationPill } from "@/components/location-pill";
import { ContactBlock } from "@/components/contact-block";
import { ContributionGraph } from "@/components/contribution-graph";
import { DitherGradient } from "@/components/dither-gradient";
import { FeaturedCard } from "@/components/featured-card";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { featuredProjects, profile } from "@/lib/content";
import type { Contributions } from "@/lib/github";
import type { PostMeta } from "@/lib/posts";
import projects from "@/data/projects.json";

export function Portfolio({ posts, contributions }: { posts: PostMeta[]; contributions: Contributions | null }) {
  return (
    <main className="flex flex-1 flex-col items-center px-5 py-8 sm:py-10">
      <section className="relative flex w-full max-w-3xl flex-row items-center gap-5">
        <div className="absolute right-0 top-0">
          <ThemeToggle />
        </div>
        <div className="relative size-24 shrink-0 overflow-hidden rounded-lg sm:size-28">
          <Image src={profile.avatar} alt="abhilash profile" fill priority sizes="112px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
            {profile.name}
          </p>
          <SocialLinks />
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{profile.tagline}</p>
        </div>
      </section>

      <div className="mt-6 w-full max-w-3xl">
        <LocationPill location={profile.location} />
      </div>

      <section className="mt-8 w-full max-w-3xl">
        <AboutBlock />

        <div className="mx-auto mt-10 max-w-3xl space-y-6 text-left">
          <section>
            <SectionHeader
              label="featured projects"
              count={`${featuredProjects.length} of ${projects.length}`}
              href="/projects"
              linkText="all projects"
            />
            <div className="mt-4 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {featuredProjects.map((project) => (
                <FeaturedCard key={project.name} project={project} />
              ))}
            </div>

            <section className="mt-10">
              <Link
                href="/projects"
                className="group relative flex min-h-32 items-center gap-5 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-left transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
              >
                <DitherGradient
                  from="blue"
                  direction="left"
                  opacity={0.75}
                  className="translate-x-10 motion-reduce:translate-x-0 opacity-0 mix-blend-screen transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:mix-blend-normal [mask-image:linear-gradient(to_right,transparent_0%,transparent_28%,black_55%,black_100%)]"
                />
                <div
                  className="relative z-10 grid size-24 shrink-0 grid-cols-2 gap-px overflow-hidden rounded-md bg-black"
                  aria-hidden="true"
                >
                  {projects.slice(0, 4).map((p) => (
                    <div key={p.slug} className="relative">
                      <Image src={p.cover} alt="" fill sizes="48px" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="relative z-10 min-w-0 flex-1">
                  <span className="block text-base font-medium text-zinc-900 dark:text-zinc-100">
                    explore the full collection
                  </span>
                  <span className="mt-1 block text-sm text-zinc-500 transition-transform duration-200 group-hover:translate-x-1 dark:text-zinc-400">
                    see every project <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </section>

            <OpenSourceBlock />
            <WritingBlock posts={posts} />
            <HackathonsBlock />

            <div className="mt-10">
              <ContributionGraph data={contributions} username={profile.github} />
            </div>

            <ContactBlock />
          </section>
        </div>
      </section>
    </main>
  );
}
