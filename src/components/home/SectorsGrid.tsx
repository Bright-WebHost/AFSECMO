"use client";

import { motion, Variants } from "framer-motion";

const pillars = [
  {
    id: "01",
    title: "Field-ready service",
    description:
      "Solutions designed for real operating conditions: site constraints, urgent requests, equipment availability, logistics and safety standards.",
  },
  {
    id: "02",
    title: "Professional coordination",
    description:
      "A single point of contact for sourcing, suppliers, transport, on-site teams and project follow-up.",
  },
  {
    id: "03",
    title: "Long-term relationships",
    description:
      "We focus on reliable partnerships with clients, suppliers and contractors to support recurring operational needs.",
    image: "/about.png",
  },
];

export default function MethodologyGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0F1B2E] px-4 py-20 sm:px-6 lg:px-8 xl:py-32 selection:bg-[#FF6B00] selection:text-white">

      {/* ── Background Lighting ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle white lift to break the darkness */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent" />
        {/* Top hairline */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Orange bloom centre */}
        <div className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#FF6B00]/10 blur-[160px]" />
        {/* White bloom top-right */}
        <div className="absolute -top-20 right-0 h-[400px] w-[400px] rounded-full bg-white/[0.04] blur-[120px]" />
        {/* Dark sink bottom-right */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-black/40 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 lg:mb-16 w-full"
        >
          <div className="mb-4 lg:mb-6 flex items-center gap-4">
            <span className="h-px w-8 lg:w-10 bg-[#FF6B00]" />
            <span className="text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
              Company Profile
            </span>
          </div>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight lg:leading-none">
            Dependable execution,{" "}
            <br className="hidden md:block" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
              not only promises.
            </span>
          </h2>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2"
        >

          {/* ────────────────────────────────────────────────────────
              Mobile : 01 & 02 sit side-by-side in a 2-col grid
              Desktop: left column, stacked vertically (flex-col)
          ──────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:flex lg:flex-col">
            {pillars.slice(0, 2).map((pillar) => (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                /* min-h keeps cards tall enough on mobile */
                className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0c1522]/90 p-4 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-[#0a1220]/95 sm:justify-center sm:p-8 lg:flex-1 lg:p-12"
                style={{ minHeight: "200px" }}
              >
                {/* Glass shine sweep */}
                <div className="absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                {/* Hover ambient glow */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                {/* Inner whitish sheen */}
                <div className="absolute inset-0 z-0 bg-gradient-to-tl from-transparent to-white/[0.03]" />

                {/*
                  Number: anchored bottom-right, clamp() keeps it
                  proportional and fully in frame on every viewport.
                */}
                <div
                  className="absolute bottom-0 right-0 z-0 select-none font-black leading-[1] text-white/[0.08] transition-all duration-700 group-hover:text-white/[0.14]"
                  style={{ fontSize: "clamp(72px, 16vw, 150px)" }}
                >
                  {pillar.id}
                </div>

                <div className="relative z-20">
                  <div className="mb-2 text-xs font-bold tracking-wider text-[#FF6B00] sm:mb-4 sm:text-xl">
                    {pillar.id} .
                  </div>
                  <h3 className="mb-1 text-sm font-semibold tracking-tight text-white sm:mb-3 sm:text-2xl lg:text-3xl leading-snug">
                    {pillar.title}
                  </h3>
                  {/* Full description only from sm up */}
                  <p className="hidden text-sm leading-relaxed text-white/55 sm:block sm:text-base lg:text-lg">
                    {pillar.description}
                  </p>
                  {/* Truncated on mobile */}
                  <p className="block text-[11px] leading-relaxed text-white/50 line-clamp-3 sm:hidden">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ────────────────────────────────────────────────────────
              Card 03 — full viewport width on mobile,
                        right column on lg+ (no changes to desktop)
              Image: true full-bleed background
              Number: top-right, fully visible
          ──────────────────────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.12] transition-all duration-500 hover:border-white/20"
            style={{ minHeight: "400px" }}
          >
            {/* ── Full-bleed background image ── */}
            <div className="absolute inset-0 z-0">
              <img
                src={pillars[2].image}
                alt="Industrial Operations"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Dark gradient: heavy at bottom, lighter at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A11]/95 via-[#060A11]/55 to-[#060A11]/20" />
              {/* Subtle white veil at top */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
            </div>

            {/* Glass shine */}
            <div className="absolute inset-0 z-30 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

            {/*
              Number: top-right, fully contained.
              clamp() prevents it from spilling outside the card.
              We use padding so it never touches the edge.
            */}
            <div
              className="absolute top-3 right-3 z-20 select-none font-black leading-[1] text-white/[0.15] transition-all duration-700 group-hover:text-white/[0.28] sm:top-6 sm:right-6"
              style={{ fontSize: "clamp(64px, 14vw, 180px)" }}
            >
              {pillars[2].id}
            </div>

            {/* ── Text block pinned to bottom ── */}
            <div className="relative z-20 mt-auto p-4 sm:p-8 lg:p-10">
              <div className="rounded-2xl border border-white/[0.12] bg-[#0F1B2E]/80 backdrop-blur-md p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <div className="mb-2 text-base font-bold tracking-wider text-[#FF6B00] sm:mb-3 sm:text-xl">
                  {pillars[2].id} .
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-2xl lg:text-3xl">
                  {pillars[2].title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90 sm:text-base lg:text-lg">
                  {pillars[2].description}
                </p>
              </div>

              {/* Animated accent line */}
              <div className="mt-4 h-px w-14 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-60 transition-all duration-700 ease-out group-hover:w-40" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}