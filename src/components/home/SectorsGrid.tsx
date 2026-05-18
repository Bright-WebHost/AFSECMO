"use client";

import { motion, Variants } from "framer-motion";

const pillars = [
  {
    id: "01",
    title: "Field-ready service",
    description: "Solutions designed for real operating conditions: site constraints, urgent requests, equipment availability, logistics and safety standards.",
  },
  {
    id: "02",
    title: "Professional coordination",
    description: "A single point of contact for sourcing, suppliers, transport, on-site teams and project follow-up.",
  },
  {
    id: "03",
    title: "Long-term relationships",
    description: "We focus on reliable partnerships with clients, suppliers and contractors to support recurring operational needs.",
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
        ease: [0.25, 1, 0.5, 1] as const 
      } 
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0F1B2E] px-4 py-20 sm:px-6 lg:px-8 xl:py-32 selection:bg-[#FF6B00] selection:text-white">
      
      {/* Dynamic Lighting Contrast Adjustments */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* FIXED: Changed arbitrary h-175 to a safe bracket value so it always compiles */}
        <div className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#FF6B00]/8 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-black/40 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* SECTION HEADER */}
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
          {/* FIXED: Removed whitespace-nowrap! Used <br /> to break lines cleanly on desktop, while letting it flow naturally on mobile */}
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight lg:leading-none">
            Dependable execution, <br className="hidden md:block" />
            <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/40">
              not only promises.
            </span>
          </h2>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          
          {/* LEFT COLUMN: Stacked Cards (01 & 02) */}
          <div className="flex flex-col gap-6">
            {pillars.slice(0, 2).map((pillar) => (
              <motion.div
                key={pillar.id}
                variants={itemVariants}
                className="group relative flex flex-1 flex-col justify-center overflow-hidden rounded-4xl border border-white/10 bg-[#060A11]/85 p-8 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-[#090F1A]/95 sm:p-12"
              >
                {/* Premium Glass Shine / Reflection Effect */}
                <div className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                
                {/* Hover Ambient Glow Inside Card */}
                <div className="absolute inset-0 z-0 bg-linear-to-br from-[#FF6B00]/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* Massive Holographic Number */}
                {/* FIXED: Changed text-white/2 to text-white/5 for safe compilation */}
                <div className="absolute -bottom-10 -right-4 z-0 select-none text-[120px] sm:text-[150px] font-black leading-none text-white/5 transition-transform duration-700 group-hover:-translate-y-2 group-hover:text-white/10">
                  {pillar.id}
                </div>

                <div className="relative z-20">
                  <div className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold tracking-wider text-[#FF6B00]">
                    {pillar.id} .
                  </div>
                  <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold tracking-tight text-white lg:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-white/50 lg:text-lg">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: Tall Feature Card (03) */}
          <motion.div
            variants={itemVariants}
            className="group relative flex min-h-[450px] sm:min-h-[600px] flex-col overflow-hidden rounded-4xl border border-white/10 bg-[#060A11]/90 p-8 transition-all duration-500 hover:border-white/20 sm:p-12 lg:min-h-full"
          >
            {/* Premium Glass Shine / Reflection Effect */}
            <div className="absolute inset-0 z-30 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

            <div className="absolute inset-0 z-0 h-full w-full overflow-hidden flex items-center justify-center p-2 pb-36">
              <img 
                src={pillars[2].image} 
                alt="Industrial Operations" 
                className="h-full w-full object-contain opacity-100 transition-all duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>

            <div className="absolute -right-8 top-6 z-20 select-none text-[150px] sm:text-[200px] font-black leading-none text-white/5 transition-transform duration-700 group-hover:-translate-x-2">
              {pillars[2].id}
            </div>

            <div className="relative z-20 flex h-full flex-col justify-end">
              <div className="p-6 rounded-3xl border border-white/10 bg-[#0F1B2E]/90 backdrop-blur-md w-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <div className="mb-3 text-lg sm:text-xl font-bold tracking-wider text-[#FF6B00]">
                  {pillars[2].id} .
                </div>
                <h3 className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight text-white lg:text-3xl">
                  {pillars[2].title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90 lg:text-lg">
                  {pillars[2].description}
                </p>
              </div>
              
              <div className="mt-6 h-px w-full max-w-20 bg-linear-to-r from-[#FF6B00] to-transparent opacity-60 transition-all duration-700 ease-out group-hover:max-w-50" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}