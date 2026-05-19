"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ContactCTA() {
  const easeOutQuart = [0.25, 1, 0.5, 1] as const;
  const { t } = useTranslation("home");

  return (
    <section className="relative w-full overflow-hidden bg-[#0F1B2E] px-4 py-16 sm:px-6 lg:px-8 xl:py-28 selection:bg-[#FF6B00] selection:text-white">
      
      {/* Structural Atmospheric Glow Backing */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* FIXED: Standardized w-[600px] sizes */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B00]/5 blur-[150px]" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)"
          }}
        />
      </div>

      {/* FIXED: Reduced padding on mobile (p-6) so text doesn't overflow small screens */}
      <div className="relative z-10 mx-auto max-w-5xl rounded-4xl border border-white/10 bg-[#060A11]/40 p-6 backdrop-blur-md sm:p-12 lg:p-16 shadow-[0_24px_64px_rgba(0,0,0,0.3)]">
        
        <div className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full pointer-events-none" />

        <div className="flex flex-col items-center text-center gap-6">
          
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#FF6B00]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B00]">{t("contact.eyebrow")}</span>
            <span className="h-px w-6 bg-[#FF6B00]" />
          </div>

          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl leading-tight">
            {t("contact.titleLead")} <br className="hidden md:block" />
            <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/40">
              {t("contact.titleAccent")}
            </span>
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-white/50 sm:text-base">
            {t("contact.description")}
          </p>

          <div className="pt-4 w-full sm:w-auto">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(255,107,0,0.35)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: easeOutQuart }}
              // FIXED: w-full on mobile so button is easy to tap, w-auto on desktop
              className="group relative flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#FF6B00] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#FF8C00]"
            >
              <div className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
              
              <span className="relative z-20">{t("contact.cta")}</span>
              
              <svg 
                className="relative z-20 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}