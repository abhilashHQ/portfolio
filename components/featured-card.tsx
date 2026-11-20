"use client";

import Image from "next/image";
import { useRef } from "react";
import type { FeaturedProject } from "@/lib/content";

export function FeaturedCard({ project }: { project: FeaturedProject }) {
  const video = useRef<HTMLVideoElement>(null);
  const external = project.href.startsWith("http");

  return (
    <article
      className="group min-w-0"
      onMouseEnter={() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        video.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        if (video.current) {
          video.current.pause();
          video.current.currentTime = 0;
        }
      }}
    >
      <a
        href={project.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="relative block aspect-video overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900"
        aria-label={`Visit ${project.name}`}
      >
        <Image
          src={project.cover}
          alt={`${project.name} preview`}
          fill
          sizes="(min-width: 640px) 384px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        {project.previewVideo && (
          <video
            ref={video}
            src={project.previewVideo}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <h3 className="absolute inset-x-4 bottom-3 text-lg font-medium tracking-tight text-white">
          {project.name} <span aria-hidden="true">↗</span>
        </h3>
      </a>
      <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{project.description}</p>
    </article>
  );
}
