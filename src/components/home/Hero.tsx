"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { withLocalePath } from "@/i18n/routing";
import { useTranslation } from "react-i18next";

const slides = [
  {
    id: 1,
    category: "Mining Operations",
    title: "Driving extraction\nefficiency through\ninnovation.",
    image: "/hero/hero1.webp",
  },
  {
    id: 2,
    category: "Oil & Gas",
    title: "Powering infrastructure\nwith reliable energy\nsolutions.",
    image: "/hero/hero2.webp",
  },
  {
    id: 3,
    category: "Construction",
    title: "Building the backbone\nof West African\nindustry.",
    image: "/hero/hero3.webp",
  },
  {
    id: 4,
    category: "Logistics",
    title: "Global supply chain\nexcellence at\nyour doorstep.",
    image: "/hero/hero4.webp",
  },
];

const DURATION = 5000;

// Force TypeScript to recognize this as a 4-number tuple to fix the transition error
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Explicitly type the variants for Framer Motion
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const maskReveal: Variants = {
  hidden: { y: "120%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: customEase },
  },
  exit: {
    y: "-50%",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: customEase },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.4 },
  },
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === "fr" ? "fr" : "en";

  const { t } = useTranslation("home");
  const rawServices = t("services.items", { returnObjects: true }) as any[];
  const localizedSlides = slides.map((s, i) => ({
    ...s,
    category: (Array.isArray(rawServices) && rawServices[i]?.category) || s.category,
    title: (Array.isArray(rawServices) && rawServices[i]?.title) || s.title,
  }));

  const goTo = useCallback((i: number) => {
    setIndex(i);
    setAnimKey((k) => k + 1);
  }, []);

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
      {/* ── Images without zoom effect ── */}
      {localizedSlides.map((slide, i) => (
        <motion.img
          key={slide.id}
          src={slide.image}
          alt={slide.category}
          className="absolute inset-0 h-full w-full object-cover"
          loading={i === 0 ? "eager" : "lazy"}
          initial={{ opacity: 0 }}
          animate={{
            opacity: i === index ? 1 : 0,
          }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
          }}
          style={{ zIndex: i === index ? 1 : 0 }}
        />
      ))}

      {/* Overlay - Adjusted for better mobile visibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to right, rgba(15,27,46,0.85) 0%, rgba(15,27,46,0.50) 50%, rgba(15,27,46,0.25) 100%)",
        }}
      />

      {/* Slide Content */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center px-4 pb-20 sm:px-6 sm:pb-24 md:px-16 md:pb-20 lg:px-24"
        style={{ zIndex: 3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Category label */}
            <div className="mb-4 sm:mb-5 overflow-hidden">
              <motion.p
                variants={maskReveal}
                className="text-[9px] sm:text-[10px] md:text-[11px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.20em] md:tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                {localizedSlides[index].category}
              </motion.p>
            </div>

            {/* Headline - Split by line for staggered mask reveal */}
            <h1 className="flex flex-col text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] sm:leading-[1.14] md:leading-[1.13] tracking-tight text-white antialiased">
              {localizedSlides[index].title.split("\n").map((line: string, idx: number) => (
                <span key={idx} className="overflow-hidden py-0.5 sm:py-1">
                  <motion.span variants={maskReveal} className="block">
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Link
                href={withLocalePath(locale, "/services")}
                className="group mt-6 sm:mt-7 md:mt-9 flex w-fit items-center gap-3 sm:gap-4"
              >
                <span className="text-xs sm:text-sm md:text-[15px] font-normal tracking-wide text-white">
                  Learn more
                </span>
                {/* Updated Tailwind sizes and var syntax */}
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-11.5 md:w-11.5 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:border-(--accent) group-hover:bg-[rgba(255,140,0,0.08)]">
                  <ArrowRight
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4.5 md:w-4.5 stroke-white transition-colors duration-300 group-hover:stroke-(--accent)"
                    strokeWidth={1.8}
                  />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Counter (Visible only on small screens) */}
      <div className="absolute bottom-10 left-4 sm:left-6 z-10 text-[9px] sm:text-[10px] font-medium tracking-[0.18em] sm:tracking-[0.2em] text-white/70 md:hidden">
        0{index + 1} <span className="mx-1 opacity-50">/</span> 0{slides.length}
      </div>

      {/* Bottom Tab Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ zIndex: 4, borderTop: "0.5px solid rgba(255,255,255,0.15)" }}
      >
        {localizedSlides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => goTo(i)}
            className="flex-1 px-2 py-3 sm:py-4 text-left transition-colors hover:bg-white/5 sm:px-4 md:px-6"
          >
            {/* Text hidden on mobile, visible on sm+ */}
            <span
              className="hidden text-[8px] sm:text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.16em] md:tracking-[0.18em] transition-colors duration-300 sm:block"
              style={{
                color: index === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.38)",
              }}
            >
              {slide.category}
            </span>

            {/* Animated underline */}
            <div
              className="mt-1.5 sm:mt-2 h-0.5 w-full overflow-hidden"
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