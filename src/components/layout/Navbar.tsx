"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { type Locale } from "@/i18n/locales";
import { stripLocale, withLocalePath } from "@/i18n/routing";

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
const easeIn = [0.42, 0, 1, 1] as [number, number, number, number];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ locale?: Locale }>();
  const { t } = useTranslation("common");
  const locale = params?.locale === "fr" ? "fr" : "en";
  const currentPath = stripLocale(pathname);

  const isHomePage = currentPath === "/";

  // ─── Dynamic Scroll Transforms (Transparent on Hero, Dark Blue on Scroll) ───
  const bgOpacity = useTransform(scrollY, [0, 100], ["rgba(15,23,42,0)", "rgba(15,23,42,0.95)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], ["rgba(30,41,59,0)", "rgba(30,41,59,0.8)"]);
  const textColor = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0.95)", "rgba(255,255,255,1)"]);

  const headerBackground = isHomePage ? bgOpacity : "rgba(15,23,42,0.95)";
  const headerBorderColor = isHomePage ? borderOpacity : "rgba(30,41,59,0.8)";
  const headerTextColor = isHomePage ? textColor : "rgba(255,255,255,1)";

  const isActive = (href: string) => {
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  const handleLanguageToggle = () => {
    const newLocale: Locale = locale === "en" ? "fr" : "en";
    const newPath = withLocalePath(newLocale, currentPath);
    router.push(newPath);
  };

  const menuVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeExp } },
    exit: { x: 40, opacity: 0, transition: { duration: 0.25, ease: easeIn } },
  };

  return (
    <>
      <motion.header
        style={{ background: headerBackground, borderBottomColor: headerBorderColor }}
        className="fixed inset-x-0 top-0 z-50 h-16 lg:h-20 border-b border-slate-700 backdrop-blur-sm transition-shadow duration-300"
      >
        {/* Fixed height container - doesn't scale with content */}
        <div className="mx-auto h-full flex max-w-full items-center justify-between px-4 lg:px-12">

          {/* Mobile Menu Button - LEFT */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
            className="lg:hidden relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg transition-colors shrink-0"
            style={isHomePage ? ({ color: headerTextColor } as any) : { color: "white" }}
          >
            <span className="block h-0.5 w-6 bg-current rounded-full" />
            <span className="block h-0.5 w-6 bg-current rounded-full" />
            <span className="block h-0.5 w-6 bg-current rounded-full" />
          </button>

          {/* Left: Desktop Nav links */}
          <nav className="hidden items-center gap-8 lg:flex flex-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  href={withLocalePath(locale, item.href)}
                  className="group relative text-sm font-medium uppercase tracking-wide transition-colors duration-200"
                >
                  <motion.span 
                    style={{ color: headerTextColor }}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {t(`nav.${item.key}`)}
                  </motion.span>
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Language Switcher + Logo */}
          <div className="flex items-center gap-2 lg:gap-8 ml-auto shrink-0">
            {/* Language Toggle Switch */}
            <motion.button
              onClick={handleLanguageToggle}
              className="hidden sm:flex relative items-center h-10 w-16 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shrink-0"
              style={{
                backgroundColor: locale === "en" ? "#FF6B00" : "#6B7280",
              }}
              aria-label="Toggle language"
            >
              {/* Animated toggle circle */}
              <motion.div
                className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-xs"
                animate={{ x: locale === "en" ? 4 : 28 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {locale === "en" ? "EN" : "FR"}
              </motion.div>

              {/* Labels */}
              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <span
                  className="text-xs font-bold uppercase tracking-wider transition-opacity"
                  style={{ opacity: locale === "en" ? 1 : 0.5, color: "white" }}
                >
                  EN
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-wider transition-opacity"
                  style={{ opacity: locale === "fr" ? 1 : 0.5, color: "white" }}
                >
                  FR
                </span>
              </div>
            </motion.button>

            {/* Logo Container - Fixed size, doesn't affect navbar height */}
            <Link 
              href={withLocalePath(locale, "/")} 
              aria-label="Home" 
              className="relative z-10 shrink-0 flex items-center justify-center"
            >
              {/* Mobile logo: smaller */}
              <div className="lg:hidden h-8 w-auto flex items-center">
                <Image
                  src="/logo.jpeg"
                  alt="Logo"
                  width={240}
                  height={60}
                  className="h-full w-auto max-w-[120px] object-contain"
                  priority
                />
              </div>

              {/* Desktop logo: larger */}
              <div className="hidden lg:flex h-12 w-auto items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={240}
                  height={60}
                  className="h-full w-auto max-w-[180px] object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: easeExp }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(380px,90vw)] flex-col bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl"
            >
              {/* Decorative accent line */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 to-transparent opacity-80" />

              {/* Header with logo and close button */}
              <div className="relative flex items-center justify-between border-b border-slate-700 px-6 py-6">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <div className="h-10 w-auto flex items-center">
                    <Image 
                      src="/logo.png" 
                      alt="Logo" 
                      width={240}
                      height={60}
                      className="h-full w-auto max-w-[120px] object-contain"
                      priority 
                    />
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-700 text-white hover:bg-slate-600 transition-colors shrink-0"
                >
                  <span className="absolute h-0.5 w-5 rotate-45 bg-current" />
                  <span className="absolute h-0.5 w-5 -rotate-45 bg-current" />
                </button>
              </div>

              {/* Navigation menu */}
              <motion.nav 
                variants={menuVariants} 
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                className="relative flex flex-1 flex-col justify-start gap-1 px-6 py-8"
              >
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.key} variants={itemVariants}>
                      <Link
                        href={withLocalePath(locale, item.href)}
                        onClick={() => setMobileOpen(false)}
                        className="group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200"
                        style={{ 
                          backgroundColor: active ? "rgba(255,107,0,0.15)" : "transparent",
                        }}
                      >
                        <span 
                          className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform" 
                          style={{ 
                            backgroundColor: active ? "#FF6B00" : "rgba(255,255,255,0.3)",
                            transform: active ? "scale(1.3)" : "scale(1)"
                          }} 
                        />
                        <span 
                          className="text-base font-semibold uppercase tracking-wide"
                          style={{ color: active ? "#FF6B00" : "rgba(255,255,255,0.9)" }}
                        >
                          {t(`nav.${item.key}`)}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Footer info */}
              <div className="relative border-t border-slate-700 px-6 py-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Est. 2024 · Abidjan
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}