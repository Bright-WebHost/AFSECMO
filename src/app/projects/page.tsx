"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const projects = [
  {
    id: "proj-01",
    title: "Highwall Extraction Hub",
    sector: "Mining",
    type: "Asset Optimization",
    location: "Western Australia",
  },
  {
    id: "proj-02",
    title: "Platform Integrity Upgrade",
    sector: "Oil & Gas",
    type: "Structural Reinforcement",
    location: "North Sea",
  },
  {
    id: "proj-03",
    title: "Urban Logistics Terminal",
    sector: "Construction",
    type: "Facility Delivery",
    location: "Rotterdam",
  },
  {
    id: "proj-04",
    title: "Heavy-Load Corridor",
    sector: "Logistics",
    type: "Supply Chain Modernization",
    location: "Hamburg",
  },
  {
    id: "proj-05",
    title: "Process Plant Retrofit",
    sector: "Oil & Gas",
    type: "Systems Engineering",
    location: "Gulf Coast",
  },
  {
    id: "proj-06",
    title: "Tunnelling Support Base",
    sector: "Construction",
    type: "Civil Infrastructure",
    location: "Toronto",
  },
];

const categories = ["All", "Mining", "Oil & Gas", "Construction", "Logistics"];
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.sector === activeCategory),
    [activeCategory]
  );

  return (
    <main className="bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Projects</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Industrial initiatives brought to life.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">
            Explore our recent project portfolio across mining, energy, construction and logistics.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-[#FF8C00] text-black"
                  : "border border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: (ease as any) }}
                className="overflow-hidden rounded-4xl border border-white/10 bg-[#0b0b0b] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.24)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-white/60">{project.sector}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/60">
                    {project.type}
                  </span>
                </div>
                <h2 className="mt-8 text-2xl font-semibold text-white sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/70">{project.location}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
