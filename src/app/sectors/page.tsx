"use client";

import { motion, Variants } from "framer-motion";

const SECTORS = [
  { id: "01", prefix: "(I)", title: "MINING &", subtitle: "QUARRYING", desc: "Heavy equipment, quarry materials, field logistics and technical supply solutions for extraction environments.", tag: "Extraction", image: "/01.png" },
  { id: "02", prefix: "(II)", title: "OIL, GAS &", subtitle: "ENERGY", desc: "Industrial support for refinery, upstream, downstream and energy infrastructure requirements.", tag: "Infrastructure", image: "/02.jpg" },
  { id: "03", prefix: "(III)", title: "CONSTRUCTION &", subtitle: "INFRASTRUCTURE", desc: "Civil works, utilities, site preparation, BTP support and project mobilisation.", tag: "Civil Works", image: "/03.png" },
  { id: "04", prefix: "(IV)", title: "INDUSTRIAL", subtitle: "OPERATIONS", desc: "Maintenance, mechanical, electrical and utility services for productive industrial facilities.", tag: "Facility Ops", image: "/04.jpg" },
  { id: "05", prefix: "(V)", title: "TRADE &", subtitle: "LOGISTICS", desc: "Import-export, procurement, freight coordination and supply chain management.", tag: "Supply Chain", image: "/08.png" },
  { id: "06", prefix: "(VI)", title: "FACILITIES &", subtitle: "REAL ESTATE", desc: "Operational property support, site services, camps, yards and commercial facility management.", tag: "Asset Upkeep", image: "/09.png" },
];

// FIXED: Explicitly typed the array as a 4-number tuple to fix the TypeScript compilation error
const awwwardsEase = [0.76, 0, 0.24, 1] as [number, number, number, number];

// Staggered reveal variants for the grid items
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

// Fade up with slight scale reveal variant for individual cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: awwwardsEase },
  },
};

// Mask reveal animation for hero text lines
const maskVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.9, delay: 0.1, ease: awwwardsEase },
  },
};

export default function SectorsPage() {
  return (
    <main className="min-h-screen bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white pb-32">
      
      {/* ── Background Atmospheric Glow ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* FIXED: Replaced h-[600px] w-[600px] with h-150 w-150 */}
        <div className="absolute -left-40 top-0 h-150 w-150 rounded-full bg-[#FF6B00]/5 blur-[150px]" />
        {/* FIXED: Replaced h-[500px] w-[500px] with h-125 w-125 */}
        <div className="absolute bottom-1/4 right-0 h-125 w-125 rounded-full bg-[#1A2C4D]/40 blur-[120px]" />
      </div>

      {/* ── Compact Cinematic Hero Section (Just Title) ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-40 lg:px-12 lg:pt-48">
        <div className="max-w-4xl">
          {/* Animated, masked headline */}
          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[85px]">
            {/* First masked line */}
            <span className="relative block overflow-hidden py-1">
              <motion.span initial="hidden" animate="visible" variants={maskVariants} className="block">
                One operational partner
              </motion.span>
            </span>
            {/* Second masked line */}
            <span className="relative block overflow-hidden py-1">
              <motion.span initial="hidden" animate="visible" variants={maskVariants} className="block text-[#FF6B00]">
                multiple strategic industries.
              </motion.span>
            </span>
          </h1>
        </div>
      </section>

      {/* ── Staggered reveal Static Grid Layout ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {SECTORS.map((sector) => (
            <motion.div 
              key={sector.id} 
              variants={cardVariants}
              // FIXED: Replaced rounded-[2rem] with rounded-4xl
              className="group relative flex flex-col overflow-hidden rounded-4xl border border-white/10 bg-[#060A11]/60 shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors duration-500 hover:border-[#FF6B00]/40"
            >
              
              {/* Premium Image Container */}
              <div className="relative h-60 overflow-hidden bg-[#020408]">
                <img
                  src={sector.image}
                  alt={`${sector.title} ${sector.subtitle}`}
                  // FIXED: Replaced duration-[1200ms] with duration-1200
                  className="h-full w-full object-cover transition-all duration-1200 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#060A11] via-transparent to-transparent opacity-90" />
                
                {/* Floating Tag */}
                <div className="absolute left-6 top-6 rounded-md border border-white/10 bg-[#0F1B2E]/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#FF6B00] backdrop-blur-md">
                  {sector.tag}
                </div>
              </div>

              {/* Text Content Block */}
              <div className="flex flex-1 flex-col p-8 pt-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/30 transition-colors group-hover:text-white/50">
                    {sector.prefix} DIVISION {sector.id}
                  </span>
                </div>
                
                <h3 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#FF6B00]">
                  {sector.title} <br /> {sector.subtitle}
                </h3>
                
                <p className="mb-8 flex-1 text-sm font-light leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
                  {sector.desc}
                </p>

                {/* Animated CTA Button */}
                <a 
                  href="/contact" 
                  className="inline-flex w-max items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors group-hover:text-[#FF6B00]"
                >
                  Explore Operations 
                  <svg className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </main>
  );
}