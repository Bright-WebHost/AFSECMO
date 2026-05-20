"use client";

import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    id: "mining",
    eyebrow: "Sectors Served",
    title: "Driving extraction efficiency through innovation in Mining.",
    image: "/about1.png",
  },
  {
    id: "oil-gas",
    eyebrow: "What We Do",
    title: "Powering infrastructure with reliable Oil & Gas solutions.",
    image: "/about2.jpg",
  },
  {
    id: "construction",
    eyebrow: "Our Impact",
    title: "Building the backbone of West African industrial construction.",
    image: "/about3.jpg",
  },
  {
    id: "logistics",
    eyebrow: "Logistics",
    title: "Delivering global supply chain excellence to your doorstep.",
    image: "/about4.png",
  },
];

// ─── Individual card — each tracks its own mouse position ───────────────────
function Card({ card }: { card: (typeof cards)[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const bubbleBackground = useMotionTemplate`
    radial-gradient(
      420px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.13),
      transparent 75%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative h-[440px] cursor-pointer overflow-hidden rounded-2xl bg-black"
    >
      {/* 1 — Background image */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
        loading="lazy"
      />

      {/* 2 — Permanent dark gradient (top + bottom readable) */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.14) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* 3 — Cursor spotlight bubble */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-350 group-hover:opacity-100"
        style={{ background: bubbleBackground }}
      />

      {/* 4 — Text: eyebrow + title at top-left */}
      <div className="absolute inset-0 z-30 flex flex-col p-7">
        <span className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/65">
          {card.eyebrow}
        </span>
        <h3 className="max-w-[230px] text-xl font-light leading-[1.35] text-white">
          {card.title}
        </h3>
      </div>

      {/* 5 — Arrow circle at bottom-right */}
      <div className="absolute bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-transparent transition-all duration-300 group-hover:border-white group-hover:bg-white/12">
        <ArrowRight
          className="h-4 w-4 stroke-white transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={1.8}
        />
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ServicesGrid() {
  return (
    <section
      className="w-full px-12 py-20 font-sans lg:px-16"
      style={{ background: "#f4f4f4" }}
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Section header */}
        <div className="mb-4 flex items-start justify-between gap-10">
          <div>
            <span className="mb-5 block text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              Discover AFSECMO
            </span>
            <p className="max-w-[620px] text-[clamp(24px,3vw,38px)] font-light leading-[1.2] tracking-tight text-[#111]">
              We are a leading industrial partner driving infrastructure,
              energy, and logistics across West Africa and beyond.
            </p>
          </div>

          <button className="group mt-1 flex flex-shrink-0 items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#999] transition-colors duration-250 hover:text-white">
            View all sectors
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#ccc] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[rgba(255,140,0,0.10)]">
              <ArrowRight
                className="h-[13px] w-[13px] transition-colors duration-300 group-hover:stroke-[var(--accent)]"
                strokeWidth={2}
              />
            </span>
          </button>
        </div>

        {/* Thin divider */}
        <div className="mb-8 h-px w-full bg-black/10" />

        {/* 4-column equal grid */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}