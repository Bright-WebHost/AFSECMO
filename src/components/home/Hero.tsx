"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface HeroProps {
  headline?: ReactNode;
}

// ─── REAL FACTUAL DATA ───
const stats = [
  { label: "Established", value: "2024" },
  { label: "Headquarters", value: "Abidjan" },
  { label: "Core Sectors", value: "Mining, Oil & Gas" },
];

type Spark = {
  id: number;
  left: string;
  duration: number;
  delay: number;
  size: number;
};

export default function Hero({ headline }: HeroProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);

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

  const autoGlowVariants = {
    animate: (i: number) => ({
      color: ["#ffffff", "#FF6B00", "#ffffff"],
      textShadow: [
        "0px 0px 0px rgba(255,107,0,0)",
        "0px 0px 25px rgba(255,107,0,0.9)",
        "0px 0px 0px rgba(255,107,0,0)",
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        delay: i * 0.8,
        ease: easeInOutExpo,
      },
    }),
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

        <motion.div
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-[#FF6B00]/40 to-transparent shadow-[0_0_15px_rgba(255,107,0,0.5)] z-0"
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
            style={{
              left: spark.left,
              width: spark.size,
              height: spark.size * 2,
            }}
          />
        ))}

        <motion.div
          animate={{
            x: ["-20%", "20%", "-20%"],
            y: ["-10%", "10%", "-10%"],
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF6B00] blur-[120px] mix-blend-screen"
        />

        <motion.div
          animate={{
            x: ["20%", "-20%", "20%"],
            y: ["10%", "-10%", "10%"],
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 h-[700px] w-[700px] rounded-full bg-[#1A2C4D] blur-[150px] mix-blend-screen"
        />
      </div>

      {/* ── Watermark headline (background text) ── */}
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
            className="text-[16vw] font-black uppercase leading-[0.8] tracking-tighter text-white/20 select-none"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.15)",
              filter: "drop-shadow(0 0 30px rgba(255, 107, 0, 0.15))",
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
            Africa Services & Equipements. Delivering central purchasing, industrial maintenance,
            and civil engineering (BTP) for demanding environments.
          </motion.p>
        </motion.div>
      </div>

      {/* ── SVG decorative lines ── */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <svg
          className="w-full h-full max-w-7xl mx-auto"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
        >
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
          <motion.path
            variants={drawLine}
            initial="hidden"
            animate="visible"
            d="M 1100 350 C 800 400, 700 200, 400 300 C 200 360, 100 200, -100 250"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
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

      {/* ── Hero image — constrained so it never bleeds off screen ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: [-8, 8, -8],
          rotateX: [2, -2, 2],
          rotateY: [-3, 3, -3],
        }}
        transition={{
          opacity: { duration: 1.5 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 11, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{
          scale: 1.04,
          rotateY: -6,
          transition: { duration: 0.8, ease: easeOutQuart },
        }}
        className="
          pointer-events-auto absolute z-30
          /* Mobile: horizontally centred, vertically centred, width capped to viewport */
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          /* Width: fills most of the viewport on mobile, grows on larger screens */
          w-[90vw] max-w-[360px]
          sm:w-[70vw]  sm:max-w-[600px]  sm:-translate-y-[55%]
          md:w-[65vw]  md:max-w-[800px]
          lg:w-[55vw]  lg:max-w-[900px]
          xl:w-[50vw]  xl:max-w-[1100px]
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.img
          src="/hero/hero1.png"
          alt="Precision Machine"
          className="object-contain w-full select-none"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 60%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,1) 60%)",
            filter: "drop-shadow(20px 30px 30px rgba(0, 0, 0, 0.8))",
          }}
        />
      </motion.div>

      {/* ── Stats bar ── */}
      <div
        className="absolute bottom-6 left-0 right-0 z-40 flex justify-center px-3 sm:bottom-8 sm:px-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ y: 80, opacity: 0, rotateX: 30 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: easeOutQuart }}
          className="
            flex w-full max-w-5xl flex-row divide-x divide-white/10
            rounded-2xl sm:rounded-full
            border border-white/10 bg-[#060A11]/60
            shadow-[0_30px_60px_rgba(0,0,0,0.8)]
            backdrop-blur-2xl overflow-hidden
          "
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, backgroundColor: "rgba(255,107,0,0.05)" }}
              className="group flex flex-1 cursor-default flex-col items-center justify-center px-2 py-3 text-center sm:px-6 sm:py-8 transition-all"
            >
              <motion.span
                custom={index}
                variants={autoGlowVariants}
                animate="animate"
                className="text-sm font-bold tracking-tight sm:text-3xl lg:text-4xl"
              >
                {stat.value}
              </motion.span>
              <span className="mt-0.5 text-[7px] font-bold uppercase tracking-widest text-white/40 transition-colors group-hover:text-white/90 sm:mt-2 sm:text-[10px] sm:tracking-[0.25em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}