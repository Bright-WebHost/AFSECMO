"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    category: "Mining Operations",
    title: "Driving extraction\nefficiency through\ninnovation.",
    image: "/hero/hero1.jpg",
  },
  {
    id: 2,
    category: "Oil & Gas",
    title: "Powering infrastructure\nwith reliable energy\nsolutions.",
    image: "/hero/hero2.jpg",
  },
  {
    id: 3,
    category: "Construction",
    title: "Building the backbone\nof West African\nindustry.",
    image: "/hero/hero3.jpg",
  },
  {
    id: 4,
    category: "Logistics",
    title: "Global supply chain\nexcellence at\nyour doorstep.",
    image: "/hero/hero4.png",
  },
];

const DURATION = 5000; // 5 seconds per slide

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex(i);
    setAnimKey((k) => k + 1);
  }, []);

  // Eagerly preload all images before the carousel even starts
  useEffect(() => {
    const preloaded: HTMLImageElement[] = [];
    slides.forEach((s) => {
      const img = new Image();
      img.fetchPriority = "high";
      img.src = s.image;
      preloaded.push(img);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % slides.length;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative h-[90vh] w-full overflow-hidden font-sans"
      style={{ background: "var(--background)" }}
    >
      {/*
        ── Images: all mounted at once, crossfade via opacity ──
        No AnimatePresence "wait" mode — that causes the black gap.
        Both the outgoing and incoming image are visible simultaneously,
        so the transition is a true crossfade with zero black frames.
      */}
      {slides.map((slide, i) => (
        <motion.img
          key={slide.id}
          src={slide.image}
          alt={slide.category}
          className="absolute inset-0 h-full w-full object-cover"
          loading={i === 0 ? "eager" : "lazy"}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          // Stack active image on top so its fade-in wins over the exiting one
          style={{ zIndex: i === index ? 1 : 0 }}
        />
      ))}

      {/* Overlay — above all images, below content */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to right, rgba(15,27,46,0.82) 0%, rgba(15,27,46,0.50) 50%, rgba(15,27,46,0.20) 100%)",
        }}
      />

      {/* Slide Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-16 pb-20 md:px-24" style={{ zIndex: 3 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Category label */}
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: "var(--accent)" }}
            >
              {slides[index].category}
            </p>

            {/* Headline */}
            <h1 className="whitespace-pre-line text-5xl font-light leading-[1.13] tracking-tight text-white antialiased md:text-6xl lg:text-[3.5rem]">
              {slides[index].title}
            </h1>

            {/* CTA */}
            <button className="group mt-9 flex items-center gap-4">
              <span className="text-[15px] font-normal tracking-wide text-white">
                Learn more
              </span>
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[rgba(255,140,0,0.08)]">
                <ArrowRight
                  className="h-[18px] w-[18px] stroke-white transition-colors duration-300 group-hover:stroke-[var(--accent)]"
                  strokeWidth={1.8}
                />
              </span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Tab Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ zIndex: 4, borderTop: "0.5px solid rgba(255,255,255,0.15)" }}
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            className="flex-1 px-6 py-4 text-left transition-colors hover:bg-white/5"
          >
            <span
              className="block text-[10.5px] font-medium uppercase tracking-[0.18em] transition-colors duration-300"
              style={{
                color: index === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
              }}
            >
              {slide.category}
            </span>

            {/* Animated underline — accent orange */}
            <div
              className="mt-2 h-[2px] w-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              {index === i && (
                <motion.div
                  key={animKey}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                  className="h-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}