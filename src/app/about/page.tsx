"use client";

import { motion, Variants } from "framer-motion";

// ─── VERIFIED COMPANY DATA ───
const ACTIVITIES = [
  { 
    title: "Central Purchasing & Trading", 
    copy: "Acting as a dedicated 'Centrale d'achat', we manage complex import-export logistics and global trading to secure the industrial supply chain.", 
    image: "/01.png" 
  },
  { 
    title: "Construction & BTP", 
    copy: "Comprehensive civil engineering, general construction, and building renovation services specifically tailored for demanding operational sites.", 
    image: "/02.jpg" 
  },
  { 
    title: "Industrial Maintenance", 
    copy: "Heavy mechanical and industrial maintenance protocols designed to minimize downtime and protect vital operational lifecycles.", 
    image: "/03.png" 
  },
  { 
    title: "General Contracting", 
    copy: "End-to-end site preparation and utility management, encompassing advanced electrical and plumbing engineering services.", 
    image: "/04.jpg" 
  },
];

const COMPANY_STATS = [
  { label: "Established", value: "2024" },
  { label: "Headquarters", value: "Abidjan" },
  { label: "Legal Entity", value: "SARL" },
];

const premiumEase = [0.215, 0.61, 0.355, 1] as [number, number, number, number];

export default function AboutPage() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } }
  };

  return (
    <main className="min-h-screen bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white pb-32">
      
      {/* ── 1. CINEMATIC IMAGE HERO ── */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-end justify-center pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/08.png" 
            alt="AFSECMO Industrial Operations"
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0F1B2E] via-[#0F1B2E]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="mb-6 mx-auto flex h-px w-16 bg-[#FF6B00]" />
            <h1 className="text-4xl font-light tracking-tight text-white sm:text-6xl lg:text-[80px] leading-[0.95] mb-6 drop-shadow-xl uppercase">
              AFSECMO <br />
              <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/60">
                Corporate Profile.
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-sm sm:text-base font-light leading-relaxed text-white/80">
              <strong className="text-white font-medium">Société Africa Services & Equipements pour les Compagnies Minières, Oil & Gas.</strong> Dedicated to securing the supply chain and engineering infrastructure for West Africa's most demanding industrial environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. REAL CORPORATE DATA STRIP ── */}
      <section className="relative z-20 mx-auto max-w-5xl px-6 lg:px-12 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 rounded-3xl border border-white/10 bg-[#060A11]/80 backdrop-blur-xl shadow-2xl">
          {COMPANY_STATS.map((item, idx) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
              className="flex flex-col items-center justify-center py-8"
            >
              <p className="text-4xl md:text-5xl font-light tracking-tight text-white">
                {item.value}
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. ASYMMETRIC EDITORIAL OVERLAPS (OPERATIONS) ── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-12 overflow-hidden">
        <div className="mb-24 text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF6B00] mb-4">
            Primary Activities
          </h2>
          <p className="text-3xl font-light text-white sm:text-5xl max-w-3xl mx-auto leading-tight">
            Engineering and procurement for heavy industry.
          </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {ACTIVITIES.map((activity, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={activity.title} className={`flex flex-col lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} group`}>
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                  className="w-full lg:w-3/5 h-80 sm:h-96 lg:h-[500px] overflow-hidden rounded-3xl"
                >
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
                  className={`w-full lg:w-2/5 relative z-10 -mt-16 lg:mt-0 ${isEven ? 'lg:-ml-20' : 'lg:-mr-20'}`}
                >
                  <div className="rounded-3xl border border-white/10 bg-[#060A11]/85 p-8 sm:p-12 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                    <h3 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-tight mb-6">{activity.title}</h3>
                    <div className="h-px w-12 bg-[#FF6B00] mb-6" />
                    <p className="text-sm sm:text-base leading-relaxed text-white/60">{activity.copy}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}