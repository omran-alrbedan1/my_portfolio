"use client";

import { Sparkles } from "lucide-react";

import FadeIn from "@/components/animation/FadeIn";
import { skills, type SkillCategory } from "@/data/skills";

const categories: SkillCategory[] = [
  "Frontend Development",
  "Backend & APIs",
  "Tools & Others",
];

export default function SkillsSection() {
  const skillGroups = categories.map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category),
  }));

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-black py-20 text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn delay={100}>
          <header className="mb-14 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Skills & Technologies
              </span>
            </span>
            <h2 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              My Development Toolkit
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              Technologies and tools I work with across frontend, backend, and
              product design.
            </p>
          </header>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ category, items }, categoryIndex) => (
            <FadeIn key={category} delay={categoryIndex * 100}>
              <section className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="h-8 w-1 rounded-full bg-primary" />
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                </div>

                <ul className="flex flex-wrap gap-3">
                  {items.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <li
                        key={skill.id}
                        className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white/80 transition-colors hover:border-primary/30 hover:text-white"
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-primary"
                        />
                        <span>{skill.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
