'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { type Locale } from "@/i18n/locales";
import { withLocalePath } from "@/i18n/routing";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "sectors", href: "/sectors" },
  { key: "method", href: "/method" },
  { key: "quality", href: "/quality" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

// Typed as tuples so framer-motion accepts them as Easing
const easeExp = [0.16, 1,    0.3, 1] as [number, number, number, number];
const easeIn  = [0.42, 0,    1,   1] as [number, number, number, number]; // replaces "easeIn" string

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const params = useParams<{ locale?: Locale }>();
  const { t } = useTranslation("common");
  const locale = params?.locale === "fr" ? "fr" : "en";

  const isActive = (href: string) => {
    const localizedHref = withLocalePath(locale, href);
    return localizedHref === `/${locale}` ? pathname === localizedHref : pathname.startsWith(localizedHref);
  };

  const bgOpacity     = useTransform(scrollY, [0, 60], ["rgba(6,10,17,0)",    "rgba(6,10,17,0.97)"]);
  const borderOpacity = useTransform(scrollY, [0, 60], ["rgba(255,255,255,0)", "rgba(255,255,255,0.07)"]);
  const blurAmount    = useTransform(scrollY, [0, 60], ["blur(0px)",           "blur(20px)"]);

  const menuVariants: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
    exit:    { transition: { staggerChildren: 0.03,  staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    hidden:  { x: 40, opacity: 0 },
    visible: { x: 0,  opacity: 1, transition: { duration: 0.5,  ease: easeExp } },
    exit:    { x: 40, opacity: 0, transition: { duration: 0.25, ease: easeIn  } },
  };

  return (
    <>
      {/* ── Scroll-aware header ── */}
      <motion.header
        style={{ background: bgOpacity, borderBottomColor: borderOpacity, backdropFilter: blurAmount }}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">

          {/* Logo */}
          <Link href={withLocalePath(locale, "/")} aria-label="AFSECMO home" className="relative z-10 shrink-0">
            <Image
              src="/logo.svg"
              alt="AFSECMO Group"
              width={110} height={22}
              className="h-6 w-auto sm:h-7"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={withLocalePath(locale, item.href)}
                  className="relative px-3 py-2 text-[13px] font-medium transition-colors duration-200"
                  style={{ color: active ? "#FF6B00" : "rgba(255,255,255,0.75)" }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; }}
                >
                  {t(`nav.${item.key}`)}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-px bg-[#FF6B00]"
                      style={{ boxShadow: "0 0 6px rgba(255,107,0,0.8)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:inline-flex" />

            {/* Hamburger — fixed line thickness & alignment */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 transition-all duration-200 hover:border-[#FF6B00]/40 lg:hidden"
            >
              <span className="block h-[1.5px] w-5.5 rounded-full bg-white" />
              <span className="block h-[1.5px] w-3.5 self-start ml-2.5 rounded-full bg-white/60" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeExp }}
              className="fixed inset-y-0 right-0 z-70 flex w-[min(340px,90vw)] flex-col bg-[#060A11] shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
            >
              {/* Dot texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Left orange accent */}
              <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-transparent via-[#FF6B00]/50 to-transparent" />

              {/* Drawer header */}
              <div className="relative flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
                <Link href="/" onClick={() => setMobileOpen(false)} aria-label="AFSECMO home">
                  <Image src="/logo.svg" alt="AFSECMO Group" width={100} height={20} className="h-6 w-auto" priority />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:border-[#FF6B00]/40 hover:text-[#FF6B00]"
                >
                  <span className="absolute h-[1.5px] w-5 rotate-45 rounded-full bg-current" />
                  <span className="absolute h-[1.5px] w-5 -rotate-45 rounded-full bg-current" />
                </button>
              </div>

              {/* Nav links */}
              <motion.nav
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-4"
              >
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.key} variants={itemVariants}>
                      <Link
                        href={withLocalePath(locale, item.href)}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200"
                        style={{ backgroundColor: active ? "rgba(255,107,0,0.08)" : "transparent" }}
                      >
                        <span
                          className="h-1 w-1 shrink-0 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: active ? "#FF6B00" : "rgba(255,255,255,0.2)",
                            boxShadow: active ? "0 0 6px rgba(255,107,0,0.8)" : "none",
                          }}
                        />
                        <span
                          className="text-xl font-semibold uppercase tracking-[0.12em] transition-colors duration-200"
                          style={{ color: active ? "#FF6B00" : "rgba(255,255,255,0.85)" }}
                        >
                          {t(`nav.${item.key}`)}
                        </span>
                        <span className="ml-auto translate-x-0 text-[#FF6B00]/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#FF6B00]/70">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Drawer footer */}
              <div className="relative border-t border-white/[0.07] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">{t("language.label")}</p>
                    <LanguageSwitcher compact />
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
                    Est. 2024 · Abidjan
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}