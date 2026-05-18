"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const phases = [
  {
    num: "01",
    title: "Requirement Review",
    description:
      "We conduct a deep operational assessment with your team to understand constraints, strategic goals, and technical requirements.",
  },
  {
    num: "02",
    title: "Planning & Design",
    description:
      "Develop detailed project roadmaps, resource allocation, and contingency plans calibrated for industrial complexity.",
  },
  {
    num: "03",
    title: "Execution",
    description:
      "Deploy team on-site with real-time progress tracking, risk mitigation, and stakeholder alignment at every phase gate.",
  },
  {
    num: "04",
    title: "Quality & Assurance",
    description:
      "Rigorous independent testing, performance validation, and safety certification before handoff to operations.",
  },
  {
    num: "05",
    title: "After-Service Support",
    description:
      "Continuous monitoring, knowledge transfer, and optimization support for 6–24 months post-completion.",
  },
];

export default function MethodPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="bg-primary text-white">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Our Method</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            A structured process built for industrial precision.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">
            Five phases of rigorous planning, execution, and validation ensure every project delivers lasting operational value.
          </p>
        </div>
      </section>

      <section ref={containerRef} className="relative px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-linear-to-b from-transparent via-white/20 to-transparent" />

            <motion.div
              className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 transform bg-[#FF8C00]"
              style={{ height: lineHeight }}
            />

            <div className="space-y-20 lg:space-y-24">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid gap-8 ${index % 2 === 0 ? "lg:grid-cols-[1fr_1fr] lg:text-right" : "lg:grid-cols-[1fr_1fr]"}`}
                >
                  <div className={index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"}>
                    <p className="text-sm uppercase tracking-[0.35em] text-[#FF8C00]">Phase {phase.num}</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                      {phase.title}
                    </h2>
                    <p className="mt-5 max-w-lg text-white/70 leading-8">
                      {phase.description}
                    </p>
                  </div>

                  <div
                    className={`flex items-center justify-center ${index % 2 === 0 ? "lg:col-start-2 lg:text-left" : "lg:col-start-1 lg:text-right"}`}
                  >
                    <div className="rounded-full border-4 border-[#FF8C00]/30 w-20 h-20 flex items-center justify-center">
                      <span className="text-2xl font-black text-[#FF8C00]">{phase.num}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
