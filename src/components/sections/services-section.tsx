"use client";

import React from "react";
import { services } from "../../data/services"; 
import * as Icons from "lucide-react";
import { Wrench } from "lucide-react";
import FadeIn from "../animation/FadeIn";

// Define the expected shape of a service object
interface Service {
  id: string | number;
  icon: string;
  title: string;
  description: string;
}

const Services = () => {
  return (
    <section id="services" className="relative py-20 bg-black overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 opacity-10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <FadeIn delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium tracking-wider uppercase">
                What I Offer
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4 max-w-2xl mx-auto">
              Built for innovation. Designed for results.
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Comprehensive solutions to transform your ideas into exceptional digital experiences.
            </p>
          </div>
        </FadeIn>

        {/* Top Section: 2 Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {(services as Service[]).slice(0, 2).map((service, index) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Code2;
            
            return (
              <FadeIn key={service.id} delay={100 + index * 100}>
                <div className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-6 relative z-10">
                    
                    {/* Icon Wrapper */}
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl w-fit flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:to-primary/10 rounded-3xl transition-all duration-300 pointer-events-none" />
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Section: 4 Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(services as Service[]).slice(2).map((service, index) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Code2;
            
            return (
              <FadeIn key={service.id} delay={300 + index * 100}>
                <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="flex flex-col gap-4 relative z-10">
                    
                    {/* Icon Wrapper */}
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl w-fit flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:to-primary/10 rounded-2xl transition-all duration-300 pointer-events-none" />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;