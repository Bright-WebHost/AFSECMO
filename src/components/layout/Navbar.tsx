'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const navItems = [
  "Home",
  "Services",
  "Sectors",
  "Method",
  "Quality",
  "About Us",
  "Projects",
  "Careers",
  "Contact",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { scrollY } = useScroll();
  
  const background = useTransform(
    scrollY,
    [0, 40],
    ["rgba(15,27,46,0)", "rgba(15,27,46,0.96)"]
  );
  
  const borderBottom = useTransform(
    scrollY,
    [0, 40],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );

  // Helper function to keep desktop and mobile routing synced
  const getHref = (item: string) => {
    switch (item) {
      case "Home": return "/";
      case "Services": return "/services";
      case "Contact": return "/contact";
      case "About Us": return "/about";
      case "Projects": return "/projects";
      case "Method": return "/method";
      case "Quality": return "/quality";
      case "Careers": return "/careers";
      default: return "#";
    }
  };

  return (
    <>
      <motion.header
        style={{ background, borderBottomColor: borderBottom }}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="inline-flex items-center" aria-label="AFSECMO home">
            <Image src="/logo.svg" alt="AFSECMO Group logo" width={110} height={22} className="h-6 sm:h-7 w-auto" priority />
            <span className="sr-only">AFSECMO Group</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item}
                href={getHref(item)}
                className="text-sm font-medium text-white transition duration-200 hover:text-[#FF8C00]"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition duration-200 hover:border-white/20 hover:text-[#FF8C00]"
            >
              {language}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-200 hover:border-white/20 hover:text-[#FF8C00] lg:hidden"
              aria-label="Open mobile menu"
            >
              <span className="block h-0.5 w-5 bg-current" />
              <span className="my-1 block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 overflow-y-auto bg-primary/98 px-6 py-8"
          >
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setMobileOpen(false)} className="inline-flex items-center" aria-label="AFSECMO home">
                <Image src="/logo.svg" alt="AFSECMO Group logo" width={110} height={22} className="h-6 sm:h-7 w-auto" priority />
                <span className="sr-only">AFSECMO Group</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-200 hover:border-white/20 hover:text-[#FF8C00]"
                aria-label="Close mobile menu"
              >
                <span className="block h-0.5 w-5 rotate-45 bg-current" />
                <span className="block h-0.5 w-5 -rotate-45 bg-current" />
              </button>
            </div>

            <div className="mt-12 space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={getHref(item)}
                  onClick={() => setMobileOpen(false)}
                  className="block text-3xl font-semibold uppercase tracking-[0.2em] text-white transition duration-200 hover:text-[#FF8C00]"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.28em] text-white/70">Language</p>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition duration-200 hover:border-white/20 hover:text-[#FF8C00]"
                >
                  {language}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex max-w-max items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:border-white/20 hover:text-[#FF8C00]"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}