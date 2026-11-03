"use client";

import { useRef, useState } from "react";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutTemplate,
  PanelsTopLeft,
  ShoppingBag,
  Smartphone,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { categories, projects } from "@/data/projects";
import FadeIn from "../animation/FadeIn";
import ProjectCard from "../ui/ProjectCard";

const categoryIcons: Record<(typeof categories)[number], LucideIcon> = {
  All: Target,
  "Web Apps": Globe,
  "Mobile Apps": Smartphone,
  Dashboards: PanelsTopLeft,
  "Landing Pages": LayoutTemplate,
  "E-commerce": ShoppingBag,
  "Graduation Projects": Briefcase,
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  // Reset carousel when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Calculate card width based on 3 visible items on desktop, 1 on mobile
      // A more robust way would be measuring the first child, but this matches the code logic
      const cardWidth = container.offsetWidth / (window.innerWidth >= 1024 ? 3 : 1);
      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, filteredProjects.length - 3);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(newIndex);
  };

  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary/10 opacity-20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">My Work</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Showcasing my best work and achievements
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((category) => {
              const IconComponent = categoryIcons[category];
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`group relative px-6 py-3 rounded-full font-medium transition-colors ${
                    activeCategory === category
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {/* Background Layer */}
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-primary/20 opacity-100"
                        : "bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 group-hover:bg-white/10"
                    }`}
                  />

                  {/* Icon and Text */}
                  <div className="relative flex items-center gap-2">
                    <IconComponent
                      className={`w-4 h-4 ${
                        activeCategory === category ? "text-primary" : "text-white/60 group-hover:text-white"
                      }`}
                    />
                    <span className="text-sm">{category}</span>
                  </div>

                  {/* Active Indicator Bar */}
                  {activeCategory === category && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Projects Carousel */}
        <FadeIn delay={200}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar cross-browser
            >
              <div className="flex gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {filteredProjects.length > 3 && (
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous projects"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentIndex >= filteredProjects.length - 3}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next projects"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Navigation Dots */}
            {filteredProjects.length > 3 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: Math.max(1, filteredProjects.length - 2) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToIndex(index)}
                      className={`transition-all duration-300 rounded-full h-2 ${
                        currentIndex === index
                          ? "bg-primary w-6"
                          : "bg-white/30 w-2 hover:bg-white/60"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Projects;