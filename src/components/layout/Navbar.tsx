"use client";

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
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "sectors", href: "/sectors" },
  { key: "method", href: "/method" },
  { key: "quality", href: "/quality" },
  { key: "projects", href: "/projects" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

const easeExp = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeIn  = [0.42, 0, 1, 1] as [number, number, number, number];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const params = useParams<{ locale?: Locale }>();
  const { t } = useTranslation("common");
  const locale = params?.locale === "fr" ? "fr" : "en";

  // Check if the current route is strictly the base Home Page root
  const isHomePage = pathname === `/${locale}` || pathname === `/` || pathname === `/${locale}/`;

  // ─── Dynamic Scroll Transforms (Only active on Home Page) ───
  const homeBgOpacity = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]);
  const homeBorderOpacity = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0)", "rgba(229,231,235,1)"]);
  const homeTextColor = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0.95)", "rgba(17,24,39,1)"]);
  const homeActiveTextColor = useTransform(scrollY, [0, 80], ["#FFFFFF", "#FF6B00"]);

  // ─── Static Styles Evaluation (Forced immediately on white layout sub-pages) ───
  const headerBackground = isHomePage ? homeBgOpacity : "rgba(255,255,255,1)";
  const headerBorderColor = isHomePage ? homeBorderOpacity : "rgba(229,231,235,1)";
  const headerTextColor = isHomePage ? homeTextColor : "rgba(17,24,39,1)";
  const itemActiveColor = isHomePage ? homeActiveTextColor : "#FF6B00";

  const isActive = (href: string) => {
    const localizedHref = withLocalePath(locale, href);
    return localizedHref === `/${locale}` ? pathname === localizedHref : pathname.startsWith(localizedHref);
  };

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
      {/* Scroll-aware dynamic header container */}
      <motion.header
        style={{ background: headerBackground, borderBottomColor: headerBorderColor }}
        className="fixed inset-x-0 top-0 z-50 border-b transition-shadow duration-300"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">

          {/* Left: Desktop Nav links matching structural alignment metrics */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={withLocalePath(locale, item.href)}
                  className="relative text-[12px] font-bold uppercase tracking-[0.15em] transition-colors duration-200"
                >
                  <motion.span style={{ color: active ? itemActiveColor : headerTextColor }}>
                    {t(`nav.${item.key}`)}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Brand Logo */}
          <Link href={withLocalePath(locale, "/")} aria-label="AFSECMO home" className="relative z-10 shrink-0">
            {/* Conditional logo inversion class tracking type text color parameters securely */}
            <Image
              src="/logo.svg"
              alt="AFSECMO Group"
              width={130}
              height={26}
              className={`h-6 w-auto sm:h-7 transition-all duration-200 ${
                isHomePage ? "invert brightness-0 scroll-invert-none" : "invert-0"
              }`}
              style={{
                filter: isHomePage ? "none" : "none" 
              }}
              priority
            />
          </Link>

          {/* Controls & Language switcher layout bar */}
          <div className="flex items-center gap-4">
            {/* mix-blend-difference allows automatic color switching against layout surfaces natively */}
            <div className="hidden sm:inline-flex mix-blend-difference">
              <LanguageSwitcher className="text-white" />
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden text-white mix-blend-difference"
            >
              <span className="block h-[2px] w-6 bg-current rounded-full" />
              <span className="block h-[2px] w-6 bg-current rounded-full" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer code below */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeExp }}
              className="fixed inset-y-0 right-0 z-70 flex w-[min(340px,90vw)] flex-col bg-[#060A11]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-transparent via-[#FF6B00]/50 to-transparent" />

              <div className="relative flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Image src="/logo.svg" alt="AFSECMO Group" width={100} height={20} className="h-6 w-auto" priority />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                >
                  <span className="absolute h-[1.5px] w-5 rotate-45 bg-current" />
                  <span className="absolute h-[1.5px] w-5 -rotate-45 bg-current" />
                </button>
              </div>

              <motion.nav variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-4">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.key} variants={itemVariants}>
                      <Link
                        href={withLocalePath(locale, item.href)}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3"
                        style={{ backgroundColor: active ? "rgba(255,107,0,0.08)" : "transparent" }}
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: active ? "#FF6B00" : "rgba(255,255,255,0.2)" }} />
                        <span className="text-xl font-semibold uppercase tracking-[0.12em]" style={{ color: active ? "#FF6B00" : "rgba(255,255,255,0.85)" }}>
                          {t(`nav.${item.key}`)}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <div className="relative border-t border-white/[0.07] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">{t("language.label")}</p>
                    <LanguageSwitcher compact />
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">Est. 2024 · Abidjan</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}