"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  { id: "01", title: "Mining Logistics Support", sector: "Mining & Quarry", scope: "Heavy equipment mobilisation & supply chain.", location: "Ivorian Sites", image: "/01.png", span: "lg:col-span-2" },
  { id: "02", title: "Industrial Procurement", sector: "Oil & Gas", scope: "Centralised purchasing of process equipment.", location: "Abidjan Hub", image: "/02.jpg", span: "lg:col-span-1" },
  { id: "03", title: "BTP Infrastructure", sector: "Civil Engineering", scope: "Steel, concrete supply, and heavy earthworks.", location: "Koumassi", image: "/03.png", span: "lg:col-span-1" },
  { id: "04", title: "Preventive Maintenance", sector: "Industrial", scope: "Rotating equipment overhaul & reporting.", location: "National Facilities", image: "/04.jpg", span: "lg:col-span-2" },
  { id: "05", title: "Facility Utilities", sector: "Utilities", scope: "Electrical distribution & plumbing networks.", location: "Camp Operations", image: "/05.png", span: "lg:col-span-3" },
];

export default function ProjectShowcase() {
  return (
    <main className="min-h-screen bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white pb-32">
      
      {/* ── Editorial Header ── */}
      <section className="mx-auto max-w-7xl px-6 pt-40 pb-20 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="mb-6 block h-px w-12 bg-[#FF6B00]" />
          <h1 className="text-5xl font-light tracking-tight text-white sm:text-7xl lg:text-[80px] leading-[0.95]">
            Operational <br />
            <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/40">
              Portfolio.
            </span>
          </h1>
        </motion.div>
      </section>

      {/* ── High-Impact Visual Grid ── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((proj) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#060A11] h-[450px] transition-all duration-700 hover:border-[#FF6B00]/40 ${proj.span}`}
            >
              {/* IMAGE LAYER: Now lively & interactive */}
              <div className="absolute inset-0 z-0">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="h-full w-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#060A11] via-[#060A11]/60 to-transparent" />
              </div>

              {/* CONTENT LAYER */}
              <div className="relative z-10 flex h-full flex-col justify-end p-10">
                <div className="mb-4">
                  <div className="inline-block rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white mb-4">
                    {proj.sector}
                  </div>
                  <h3 className="text-3xl font-light text-white uppercase tracking-tight mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed max-w-xs transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                    {proj.scope}
                  </p>
                </div>
                
                <div className="flex items-end justify-between pt-6 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
                    {proj.location}
                  </span>
                  <span className="text-4xl font-black text-white/20 group-hover:text-[#FF6B00]/40 transition-colors">
                    {proj.id}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}