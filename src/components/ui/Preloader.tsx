"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const easeExpOut = [0.16, 1, 0.3, 1] as const;
const easeExpInOut = [0.87, 0, 0.13, 1] as const;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [exit, setExit] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setExit(true);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
      }, 900);
    }, 1600);

    return () => {
      clearTimeout(exitTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#060A11]"
        >
          {/* Dot-grid texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />

          {/* Exit curtains */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[#FF6B00]"
            initial={{ y: "100%" }}
            animate={exit ? { y: "0%", transition: { duration: 0.55, ease: easeExpInOut } } : { y: "100%" }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[#060A11]"
            initial={{ y: "100%" }}
            animate={exit ? { y: "0%", transition: { duration: 0.55, ease: easeExpInOut, delay: 0.15 } } : { y: "100%" }}
          />

          {/* Main content */}
          <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">

            {/* Eyebrow */}
            <div className="overflow-hidden mb-2">
              <motion.p
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, ease: easeExpOut, delay: 0.1 }}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF6B00]/70 sm:text-xs"
              >
                  {t("preloader.eyebrow")}
              </motion.p>
            </div>

            {/* Brand name */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.0, ease: easeExpOut, delay: 0.2 }}
                className="text-5xl font-black uppercase leading-none tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl"
              >
                Afs
                <motion.span
                  initial={{ color: "#ffffff" }}
                  animate={{ color: "#FF6B00" }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  ec
                </motion.span>
                mo
              </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mt-3 sm:mt-4">
              <motion.p
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, ease: easeExpOut, delay: 0.45 }}
                className="text-[11px] font-light uppercase tracking-[0.3em] text-white/30 sm:text-sm"
              >
                  {t("preloader.subtitle")}
              </motion.p>
            </div>
          </div>

          {/* Thin accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: easeExpOut, delay: 0.5 }}
            className="absolute bottom-[14%] left-1/2 z-10 h-px w-[min(280px,70vw)] -translate-x-1/2 origin-left bg-gradient-to-r from-[#FF6B00]/80 via-[#FF6B00]/30 to-transparent"
          />

          {/* Corner metadata */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-6 left-4 z-10 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 sm:bottom-8 sm:left-8 sm:text-[10px]"
          >
            {t("preloader.established")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-6 right-4 z-10 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 sm:bottom-8 sm:right-8 sm:text-[10px]"
          >
            {t("preloader.location")}
          </motion.p>

          {/* Top-right L-bracket accent */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: easeExpOut, delay: 0.3 }}
            className="absolute right-4 top-6 z-10 h-px w-16 origin-right bg-gradient-to-l from-[#FF6B00]/60 to-transparent sm:right-8 sm:top-8 sm:w-24"
          />
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: easeExpOut, delay: 0.4 }}
            className="absolute right-4 top-6 z-10 h-12 w-px origin-top bg-gradient-to-b from-[#FF6B00]/60 to-transparent sm:right-8 sm:top-8 sm:h-16"
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}