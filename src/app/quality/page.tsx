"use client";

import { motion } from "framer-motion";

const standards = [
  {
    category: "Safety",
    title: "ISO 45001 Certified",
    description: "Comprehensive occupational health and safety management systems across all operations.",
  },
  {
    category: "Quality",
    title: "ISO 9001 Registered",
    description: "Quality management protocols ensuring consistency, traceability, and continuous improvement.",
  },
  {
    category: "Environmental",
    title: "ISO 14001 Compliance",
    description: "Environmental management systems integrating sustainability into every project phase.",
  },
  {
    category: "Supply Chain",
    title: "Vetted Supplier Network",
    description: "Rigorous vendor assessment and on-going performance monitoring for resilient delivery.",
  },
  {
    category: "Risk Management",
    title: "Enterprise Risk Framework",
    description: "Structured risk identification, mitigation, and contingency planning across industrial domains.",
  },
  {
    category: "Governance",
    title: "Audited HSE Reporting",
    description: "Transparent safety metrics, incident reporting, and quarterly stakeholder assurance reviews.",
  },
];

export default function QualityPage() {
  return (
    <main className="bg-primary text-white">
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Quality & HSE</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Trust built on rigorous standards.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">
            Our commitment to safety, quality, and reliability is backed by industry certifications and continuous auditing.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {standards.map((standard, index) => (
              <motion.article
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group overflow-hidden rounded-3xl border border-tertiary bg-secondary p-8 shadow-[0_28px_90px_rgba(0,0,0,0.24)] transition duration-300 hover:border-[#FF8C00]/50"
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  initial={{ boxShadow: "inset 0 0 0 1px rgba(255,107,0,0)" }}
                  whileHover={{ boxShadow: "inset 0 0 20px 2px rgba(255,107,0,0.15)" }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 space-y-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-white/50">
                    {standard.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                    {standard.title}
                  </h2>
                  <p className="text-white/70 leading-7">{standard.description}</p>
                </div>

                <motion.div
                  className="absolute top-0 right-0 h-12 w-12 rounded-full bg-[#FF8C00]/0 blur-2xl"
                    whileHover={{ background: "#FF8C0020" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
