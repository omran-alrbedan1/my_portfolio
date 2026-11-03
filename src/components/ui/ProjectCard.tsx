"use client";

import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";

import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-300 hover:border-primary/30">
      <div className="relative aspect-video overflow-hidden bg-[#08090a]">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/15 via-[#0c1114] to-[#050607] p-6">
            <span className="relative z-10 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {project.category}
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-10 end-1 font-mono text-[8rem] font-black leading-none text-white/[0.035]"
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
            <h3 className="relative z-10 max-w-[18rem] text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {project.title}
            </h3>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {project.category}
        </span>
        <h3 className="mt-2 text-xl font-semibold text-white transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        {project.description ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
            {project.description}
          </p>
        ) : null}

        {project.stack.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <li
                key={technology}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live site in a new tab`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-primary/90"
            >
              Live site
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} source repository in a new tab`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-primary/40 hover:text-primary"
            >
              Repository
              <Code2 aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
