"use client";

import { Code2, Download, MapPin, Sparkles } from "lucide-react";

import RadialGradientBackground from "../backgrounds/RadialGradientBackground";
import FadeIn from "../animation/FadeIn";
import { PERSONAL_INFO } from "@/constants/data";
import { skills } from "@/data/skills";

const About = () => {
  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      <RadialGradientBackground variant="about" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-12 text-left">
            <div className="flex flex-col gap-8">
              <FadeIn delay={60}>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 rounded-full bg-primary/10">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">
                    Full-Stack Developer
                  </span>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Crafting Digital Experiences That Matter
                </h2>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="flex flex-col gap-4">
                  {PERSONAL_INFO.bio.map((paragraph, index) => (
                    <p key={index} className="text-gray-400 leading-relaxed text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={300}>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin aria-hidden="true" className="h-5 w-5 text-primary" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <button
                onClick={() => window.open(PERSONAL_INFO.resume, "_blank")}
                className="inline-flex items-center justify-center rounded-full gap-2 px-6 py-3 bg-white hover:bg-white/90 text-black font-semibold    transition-colors w-fit"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </FadeIn>
          </div>

          {/* Right Column - Info Grid */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 gap-4">
              
              {/* Expertise Card (Spans 2 columns) */}
              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">Expertise</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Specialized in building scalable web applications with modern technologies and best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Code Card (1 column) */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Clean Code</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Writing maintainable, well-documented code that scales.
                  </p>
                </div>
              </div>

              {/* Performance Card (1 column) */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 duration-300"></div>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Optimizing for speed and efficiency in every project.
                  </p>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>

        {/* Tech Stack & Expertise Section */}
        <div className="w-full max-w-6xl mx-auto mt-24">
          <FadeIn delay={200}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Tech Stack & Expertise
              </h2>
              <p className="text-gray-400 text-base">
                Technologies I work with to build amazing products
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
                {[...skills, ...skills].map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={`${skill.id}-${index}`} className="relative group">
                      <div className="absolute inset-0 bg-linear-to-b from-white/5 to-white/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 duration-300"></div>
                      <div className="relative flex h-36 w-36 flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl px-4 hover:border-primary/30 hover:bg-white/10 transition-all duration-300">
                        <Icon className="w-10 h-10 mb-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default About;