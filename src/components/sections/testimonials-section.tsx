"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import Image from "next/image";
import FadeIn from "../animation/FadeIn";

// Define the type for a testimonial
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const nextTestimonial = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    scrollToIndex(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(newIndex);
  };

  // Stats to overlay on the images based on the reference
  const testimonialStats = [
    { value: "3x", label: "Faster Delivery" },
    { value: "100%", label: "On-Time Delivery" },
    { value: "5x", label: "Client Satisfaction" },
  ];

  return (
    <section id="testimonials" className="relative py-20 bg-black overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Quote className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              Trusted by forward-thinking teams
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Empowering clients with design-driven, high-quality solutions built for success.
            </p>
          </div>
        </FadeIn>

        {/* Testimonial Carousel */}
        <FadeIn delay={100}>
          <div className="relative max-w-5xl mx-auto">
            
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-hidden scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              <div className="flex">
                {(testimonials as Testimonial[]).map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full shrink-0 px-4"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center  rounded-3xl p-8 md:p-12">
                      
                      {/* Image Section */}
                      <div className="relative w-full md:w-1/3 shrink-0">
                        <div className="relative h-72 rounded-2xl overflow-hidden bg-gray-800">
                          {/* Note: If you have actual images, uncomment the Image component below */}
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                          />
                          
                          {/* Stat Badge Overlay */}
                          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {testimonialStats[index % testimonialStats.length].value}
                            </div>
                            <div className="text-sm text-white/80 font-medium">
                              {testimonialStats[index % testimonialStats.length].label}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 flex flex-col justify-center">
                        <Quote className="w-10 h-10 text-primary/40 mb-6" />
                        
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 font-light">
                          "{testimonial.quote}"
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <div className="text-white font-medium text-lg">
                              {testimonial.name}
                            </div>
                            <div className="text-white/60 text-sm">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          </div>
                          
                          {/* Star Rating */}
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-primary text-primary"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors z-20 hidden md:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors z-20 hidden md:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {(testimonials as Testimonial[]).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  currentIndex === index
                    ? "bg-primary w-6"
                    : "bg-white/30 w-2 hover:bg-white/60"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Testimonials;