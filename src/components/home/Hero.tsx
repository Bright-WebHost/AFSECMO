"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeroProps {
  headline?: ReactNode;
}

type Spark = {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
};

export default function Hero({ headline }: HeroProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const { t } = useTranslation("home");
  const stats = t("hero.stats", { returnObjects: true }) as { label: string; value: string }[];

  useEffect(() => {
    setSparks(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
        size: Math.random() * 3 + 1,
      }))
    );
  }, []);

  const easeOutQuart = [0.25, 1, 0.5, 1] as [number, number, number, number];
  const easeInOutExpo = [0.87, 0, 0.13, 1] as [number, number, number, number];

  const revealUp3D: Variants = {
    hidden: { y: 60, opacity: 0, filter: "blur(10px)", scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 1.6, ease: easeOutQuart },
    },
  };

  const drawLine: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.6,
      transition: { duration: 4, ease: easeInOutExpo, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-[#0F1B2E] selection:bg-[#FF6B00] selection:text-white"
      style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          }}
        />

        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 0] }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "linear",
            }}
            className="absolute z-10 rounded-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.8)]"
            style={{ left: spark.left, width: spark.size, height: spark.size * 2 }}
          />
        ))}

        <motion.div
          animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "10%", "-10%"], scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF6B00] blur-[120px] mix-blend-screen"
        />
      </div>

      {/* ── Watermark headline ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ rotateX: [1, -1, 1], rotateY: [-2, 2, -2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="flex w-full flex-col items-center text-center"
          style={{ transform: "translateZ(-100px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: easeOutQuart }}
            // VISIBILITY FIX: Added text-white/5 for slight fill, adjusted viewport sizes
            className="text-[20vw] sm:text-[16vw] font-black uppercase leading-[0.8] tracking-tighter text-white/5 select-none"
            style={{
              // VISIBILITY FIX: Thicker 2px stroke, higher opacity (0.25)
              WebkitTextStroke: "2px rgba(255,255,255,0.25)",
              filter: "drop-shadow(0 0 30px rgba(255, 107, 0, 0.2))",
            }}
          >
            {headline || "Afsecmo"}
          </motion.div>

          <motion.p
            variants={revealUp3D}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-xl px-6 text-xs font-light leading-relaxed text-white/60 sm:mt-6 sm:max-w-2xl sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>
        </motion.div>
      </div>

      {/* ── SVG decorative lines ── */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full max-w-7xl mx-auto" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <motion.path
            variants={drawLine}
            initial="hidden"
            animate="visible"
            d="M -100 400 C 200 400, 300 100, 600 200 C 800 260, 900 100, 1100 150"
            fill="none"
            stroke="url(#orange-gradient)"
            strokeWidth="3"
            className="drop-shadow-[0_0_12px_rgba(255,107,0,0.9)]"
          />
          <defs>
            <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Hero image ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: [-8, 8, -8], rotateX: [2, -2, 2], rotateY: [-3, 3, -3] }}
        transition={{
          opacity: { duration: 1.5 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.04, rotateY: -6, transition: { duration: 0.8, ease: easeOutQuart } }}
        // MOBILE FIX: Kept -translate-y-1/2 consistent across all screen sizes
        className="pointer-events-auto absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[70vw] max-w-[1100px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.img
          src="/hero/hero1.png"
          alt={t("hero.imageAlt")}
          className="object-contain w-full select-none"
          style={{
            maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 60%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 60%)",
            filter: "drop-shadow(20px 30px 30px rgba(0, 0, 0, 0.8))",
          }}
        />
      </motion.div>

      {/* ── Glass Stats Bar ── */}
      <div
        className="absolute bottom-6 left-0 right-0 z-40 flex justify-center px-4 sm:bottom-10 sm:px-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ y: 80, opacity: 0, rotateX: 30 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: easeOutQuart }}
          className="
            flex w-full max-w-5xl flex-row divide-x divide-white/10
            rounded-[2rem] sm:rounded-full
            border border-white/10 bg-[#060A11]/60
            shadow-[0_30px_60px_rgba(0,0,0,0.8)]
            backdrop-blur-2xl overflow-hidden
          "
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, backgroundColor: "rgba(255,107,0,0.05)" }}
              // MOBILE FIX: Adjusted padding so it doesn't look cramped
              className="group flex flex-1 cursor-default flex-col items-center justify-center px-2 py-4 text-center sm:px-6 sm:py-8 transition-all"
            >
              {/* MOBILE FIX: Base text size is now text-xl (was text-sm) */}
              <span className="text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {stat.value}
              </span>
              {/* MOBILE FIX: Base text size is now text-[8px] (was text-[7px]) */}
              <span className="mt-1 text-[8px] font-bold uppercase tracking-widest text-[#FF6B00] transition-colors sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}