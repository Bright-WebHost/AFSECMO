"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { useInView, useMotionValue, useSpring, motion, Variants } from "framer-motion";

const stats = [
  { label: "Years Experience", target: 18 },
  { label: "Clients Served", target: 46 },
  { label: "Global Offices", target: 6 },
];

const values = [
  { title: "Precision first", copy: "Every recommendation is tested against practical operability, safety, and long-term value." },
  { title: "Built to last", copy: "We design solutions with real-world industrial lifecycles and supply chain realities in mind." },
  { title: "Client-aligned", copy: "Our teams embed with operators and owners to align every output with business-critical metrics." },
  { title: "Responsible scale", copy: "Sustainability and resilience are core design principles, not afterthoughts." },
];

const leaders = [
  { name: "Ari Bennett", role: "Founder & CEO" },
  { name: "Mina Laurent", role: "Chief Operating Officer" },
  { name: "Ravi Kapoor", role: "Head of Engineering" },
  { name: "Sofia Chen", role: "Strategy Director" },
];

// --- 1. PREMIUM NUMBER COUNTER ---
function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 40, stiffness: 100 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    return spring.on("change", (latest) => setValue(Math.floor(latest)));
  }, [spring]);

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  return (
    <div ref={ref} className="group relative flex flex-col justify-center overflow-hidden rounded-4xl border border-white/10 bg-[#060A11]/60 p-10 backdrop-blur-md transition-all duration-500 hover:border-[#FF6B00]/40 hover:bg-[#060A11]/90">
      <div className="absolute inset-0 z-0 bg-linear-to-br from-[#FF6B00]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <p className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/40 drop-shadow-sm group-hover:from-[#FF6B00] group-hover:to-[#FFD580] transition-all duration-500">
          {value}+
        </p>
        <div className="mt-6 h-px w-12 bg-[#FF6B00] transition-all duration-700 group-hover:w-full" />
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white/90 transition-colors">
          {label}
        </p>
      </div>
    </div>
  );
}

// --- 2. KINETIC FLASHLIGHT CARD ---
function ValueCard({ title, copy, index }: { title: string; copy: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Make the first item span two columns on desktop for an asymmetric premium layout
  const isLarge = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-4xl border border-white/10 bg-[#060A11]/60 p-10 backdrop-blur-md transition-colors duration-500 ${isLarge ? 'md:col-span-2' : ''}`}
    >
      {/* Flashlight Mouse Tracker */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute -inset-px z-0 rounded-4xl opacity-0 transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,107,0,0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#FF6B00] transition-colors group-hover:border-[#FF6B00]/40 group-hover:bg-[#FF6B00]/10">
          <span className="font-mono text-sm font-bold">0{index + 1}</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">{title}</h3>
          <p className="text-sm sm:text-base leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
            {copy}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <main className="relative bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white overflow-hidden pb-32">
      
      {/* Global Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-[#FF6B00]/5 blur-[200px]" />
        <div className="absolute bottom-1/3 left-0 h-[600px] w-[600px] rounded-full bg-[#1A2C4D]/40 blur-[150px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-12 lg:pt-48 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#FF6B00]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">Corporate Profile</span>
            </div>
            <h1 className="text-4xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
              A premium industrial partner <br />
              <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/40">
                built for scale.
              </span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="relative rounded-4xl border border-white/10 bg-[#060A11]/60 p-8 sm:p-12 shadow-[0_32px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          >
            {/* Top right decorative blueprint corner */}
            <div className="absolute top-0 right-0 p-4 opacity-30">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M40 0H0V1H39V40H40V0Z" fill="#FF6B00"/>
              </svg>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-6">Company Story</p>
            <p className="text-base leading-relaxed text-white/80 sm:text-lg">
              From the first industrial advisory mandate to an integrated engineering and delivery practice, AFSECMO has grown with a clear obsession: <strong className="text-white">deliver operational resilience where stakes are highest.</strong>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              We combine technical depth, strategic clarity, and execution focus to serve edge-case industrial projects across complex environments globally.
            </p>
          </motion.div>

        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative z-10 border-y border-white/5 bg-[#020408]/30 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((item) => (
              <Counter key={item.label} target={item.target} label={item.label} />
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUES & MISSION BENTO GRID --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-[#FF6B00]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">Mission & Values</span>
          </div>
          <h2 className="text-3xl font-light text-white sm:text-5xl leading-tight">
            Committed to clarity, craft, and <span className="font-semibold">enduring performance.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((item, idx) => (
            <ValueCard key={item.title} title={item.title} copy={item.copy} index={idx} />
          ))}
        </div>
      </section>

      {/* --- LEADERSHIP ROSTER --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-[#FF6B00]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">Executive Command</span>
          </div>
          <h2 className="text-3xl font-light text-white sm:text-5xl">
            Leaders with operational pedigree.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#060A11]/40 p-8 transition-all duration-300 hover:border-[#FF6B00]/30 hover:bg-[#060A11]/80"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00] mb-4">
                  {leader.role}
                </p>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {leader.name}
                </h3>
              </div>
              <div className="h-px w-full bg-white/10 transition-all duration-500 group-hover:bg-white/30" />
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}