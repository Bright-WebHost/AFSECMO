"use client";

import { motion } from "framer-motion";

// ─── AFSECMO Core Services Data ──────────────────────────────────────────────
const SERVICES = [
  {
    id: "mining",
    num: "01",
    category: "MINING",
    tag: "Heavy Operations",
    title: ["Mining & Quarry", "Support"],
    desc: "Operational support for mining and quarry environments, from field mobilisation and heavy equipment coordination to materials supply.",
    features: ["Heavy equipment & fleet coordination", "Spare parts, tools & consumables", "Preventive maintenance planning"],
    image: "/01.png",
  },
  {
    id: "energy",
    num: "02",
    category: "ENERGY",
    tag: "Field Support",
    title: ["Oil & Gas", "Services"],
    desc: "Industrial services for energy and hydrocarbons projects, supporting field teams with technical procurement and utilities.",
    features: ["Valves, fittings & process equipment", "Shutdown and turnaround assistance", "Industrial safety materials"],
    image: "/02.jpg",
  },
  {
    id: "infrastructure",
    num: "03",
    category: "INFRASTRUCTURE",
    tag: "Civil Works",
    title: ["Engineering &", "Construction"],
    desc: "Structured support for civil works, infrastructure delivery, industrial construction and site preparation requirements.",
    features: ["Earthworks, drainage & road support", "Concrete, steel & building materials", "Subcontractor mobilisation"],
    image: "/03.png",
  },
  {
    id: "maintenance",
    num: "04",
    category: "MAINTENANCE",
    tag: "Site Operations",
    title: ["Mechanical &", "Industrial"],
    desc: "Practical mechanical support designed to keep industrial sites operational, productive and critically safe.",
    features: ["Mechanical assemblies & repairs", "Welding, fabrication & fitting", "Conveyors & rotating equipment"],
    image: "/04.jpg",
  },
  {
    id: "utilities",
    num: "05",
    category: "UTILITIES",
    tag: "Facility Ops",
    title: ["Electrical &", "Plumbing"],
    desc: "Technical installation and maintenance support for industrial facilities, camps, warehouses and operational buildings.",
    features: ["Industrial electrical distribution", "Generator, lighting & cable solutions", "Facility troubleshooting"],
    image: "/05.png",
  },
  {
    id: "procurement",
    num: "06",
    category: "PROCUREMENT",
    tag: "Global Supply",
    title: ["Central", "Purchasing"],
    desc: "Professional sourcing and procurement coordination for companies that need reliable access to equipment and materials.",
    features: ["International supplier identification", "Commercial comparison & negotiation", "Customs & delivery follow-up"],
    image: "/06.png",
  },
  {
    id: "fleet",
    num: "07",
    category: "FLEET",
    tag: "Mobilisation",
    title: ["Equipment Rental", "& Fleet"],
    desc: "Equipment solutions for sites that require fast mobilisation, flexible rental arrangements and reliable field support.",
    features: ["Heavy machinery rental coordination", "Truck, vehicle & fleet support", "Equipment inspection & readiness"],
    image: "/07.png",
  },
  {
    id: "logistics",
    num: "08",
    category: "LOGISTICS",
    tag: "Transport",
    title: ["Logistics &", "Mobilisation"],
    desc: "End-to-end coordination for moving equipment, materials and teams from suppliers to operational sites.",
    features: ["Freight & local transport coordination", "Warehousing & staging support", "Last-mile site delivery"],
    image: "/08.png",
  },
  {
    id: "asset",
    num: "09",
    category: "ASSET MGT",
    tag: "Upkeep",
    title: ["Facility &", "Asset Support"],
    desc: "Support for operational properties, camps, workshops and industrial facilities that require professional service management.",
    features: ["Facility maintenance & repairs", "Commercial site setup assistance", "Asset handover & reporting"],
    image: "/09.png",
  },
];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
    <path d="M2.5 6.5l3 3 5-5" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Component: Cinematic Parallax Image ──────────────────────────────────────
// FIX: Removed mix-blend-luminosity and grayscale that caused the blue tint
function CinematicImage({ src, num }: { src: string; num: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0F1B2E]">
      <motion.img
        src={src}
        alt={`Service ${num}`}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full w-full object-cover opacity-75 transition-all duration-700 hover:opacity-100"
      />
      {/* Subtle dark gradient at bottom only */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060A11]/70 via-transparent to-transparent" />

      {/* Massive Background Number */}
      <div className="absolute -bottom-2 -right-2 select-none pointer-events-none text-[80px] sm:text-[120px] lg:text-[200px] font-black leading-none text-white/10 tracking-tighter">
        {num}
      </div>
    </div>
  );
}

// ─── Component: Service Card ───────────────────────────────────────────────────
// FIX: Always side-by-side on ALL screen sizes (mobile + desktop)
function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const isReversed = index % 2 !== 0;

  const TextContent = () => (
    <div className="relative z-20 flex w-1/2 flex-col justify-center overflow-y-auto p-4 text-white sm:p-8 lg:p-12">
      <div className="mb-2 flex flex-col gap-1 sm:mb-4 sm:gap-2">
        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#FF6B00] sm:text-xs sm:tracking-[0.3em]">
          {svc.category}
        </span>
        <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-white/40 sm:text-[10px] sm:tracking-[0.2em]">
          {svc.tag}
        </span>
      </div>
      <h2 className="mb-2 text-lg font-black uppercase leading-[0.95] tracking-tight text-white sm:mb-4 sm:text-3xl lg:text-5xl">
        {svc.title[0]}
        <br />
        <span className="text-[#FF6B00]">{svc.title[1]}</span>
      </h2>
      <p className="mb-3 text-[9px] font-light leading-relaxed text-white/60 sm:mb-6 sm:text-sm lg:text-base">
        {svc.desc}
      </p>
      <ul className="space-y-1.5 sm:space-y-3">
        {svc.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-[8px] tracking-wider text-white/80 sm:items-center sm:gap-4 sm:text-xs sm:tracking-widest lg:text-sm"
          >
            <span className="mt-0.5 flex-shrink-0 rounded-full bg-[#FF6B00]/10 p-1 sm:mt-0 sm:p-1.5">
              <Check />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );

  const ImageContent = () => (
    <div className="relative h-full w-1/2">
      <CinematicImage src={svc.image} num={svc.num} />
    </div>
  );

  return (
    <motion.div
      id={svc.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className={`mx-auto flex w-full max-w-7xl flex-row overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] lg:rounded-3xl ${
        index % 2 === 0 ? "bg-[#060A11]" : "bg-[#020408]"
      }`}
      style={{ height: "clamp(200px, 30vw, 500px)" }}
    >
      {isReversed ? (
        <>
          <ImageContent />
          <TextContent />
        </>
      ) : (
        <>
          <TextContent />
          <ImageContent />
        </>
      )}
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1B2E] font-sans selection:bg-[#FF6B00] selection:text-white">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-24 lg:px-12 lg:pb-16 lg:pt-40">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#FF6B00]/20 bg-[#FF6B00]/5 px-4 py-2 text-[9px] font-bold tracking-widest text-[#FF6B00] sm:px-5 lg:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF6B00]" />
            GLOBAL INDUSTRIAL SERVICES
          </div>
          <h1 className="mb-6 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-[110px]">
            Engineered for <br />
            <span className="text-[#FF6B00]">Excellence.</span>
          </h1>
          <p className="border-l-4 border-[#FF6B00] pl-5 text-sm font-light leading-relaxed text-white/60 sm:text-base lg:max-w-2xl lg:text-lg">
            From strategic planning to heavy equipment mobilisation, AFSECMO delivers precision across the full industrial project lifecycle.
          </p>
        </div>
      </section>

      {/* ── Sticky Filter Nav ── */}
      {/* FIX: Single horizontal scrollable row on all screen sizes */}
      <div className="sticky top-0 z-50 border-y border-white/5 bg-[#0F1B2E]/90 shadow-2xl backdrop-blur-xl">
        <div
          className="flex w-full overflow-x-auto scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollToService(s.id)}
              className={`group flex flex-none flex-col items-center justify-center gap-1.5 px-3 py-3 transition-all hover:bg-white/5 sm:gap-2 sm:px-4 sm:py-4 lg:py-6 lg:px-0 lg:flex-1 ${
                i < SERVICES.length - 1 ? "border-r border-white/5" : ""
              }`}
              style={{ minWidth: "clamp(64px, 11.11vw, 120px)" }}
            >
              <span className="text-sm font-black text-[#FF6B00] opacity-50 transition-opacity group-hover:opacity-100 sm:text-base lg:text-lg">
                {s.num}
              </span>
              <span className="whitespace-nowrap text-[7px] font-bold uppercase tracking-widest text-white/70 transition-colors group-hover:text-white sm:text-[8px] lg:text-[9px]">
                {s.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Editorial Cards List ── */}
      <div className="flex flex-col gap-4 px-3 py-10 sm:gap-8 sm:px-6 sm:py-16 lg:gap-16 lg:px-12 lg:py-32">
        {SERVICES.map((svc, index) => (
          <ServiceCard key={svc.id} svc={svc} index={index} />
        ))}
      </div>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#020408] px-6 py-20 text-center lg:py-40">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/10 blur-[80px] lg:h-[400px] lg:blur-[150px]" />
        <div className="relative z-10">
          <h2 className="mb-8 text-4xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-[120px]">
            Ready to <br />
            <span className="text-[#FF6B00]">Mobilise?</span>
          </h2>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,107,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            className="inline-block rounded-full bg-[#FF6B00] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-colors hover:bg-[#FF8C00] sm:px-10 sm:py-5 lg:px-14 lg:py-6 lg:text-sm"
          >
            Launch Inquiry Deck
          </motion.a>
        </div>
      </section>

    </div>
  );
}