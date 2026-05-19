"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type Standard = { title: string; category: string; copy: string };

// Animation Variants - Works on Mobile & Desktop
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function QualityContent() {
  const { t } = useTranslation("content");
  const standards = t("quality.standards", { returnObjects: true }) as Standard[];
  const hero = t("quality.hero", { returnObjects: true }) as { eyebrow: string; titleLead: string; titleAccent: string; description: string };

  return (
    <main className="min-h-screen bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white pb-20 pt-16 sm:pb-32 sm:pt-24 lg:pb-40 lg:pt-56">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12 relative">
          
          {/* Left Column - Header with Animations */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
          >
            <div className="lg:sticky lg:top-32 xl:top-40">
              {/* Animated Line */}
              <motion.span 
                className="mb-4 sm:mb-6 block h-px w-8 sm:w-12 bg-[#FF6B00] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              
              {/* Label */}
              <motion.p 
                className="mb-3 sm:mb-4 text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#FF6B00]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {hero.eyebrow}
              </motion.p>
              
              {/* Main Heading */}
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-light tracking-tight text-white leading-[1.1] sm:leading-[1.1] mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {hero.titleLead} <br />
                <span className="font-medium">{hero.titleAccent}</span>
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                className="max-w-sm text-sm sm:text-base lg:text-lg font-light text-white/60 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {hero.description}
              </motion.p>
            </div>
          </motion.div>

          {/* Right Column - Scrolling Cards with Staggered Animation */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-8 sm:gap-12 lg:gap-20 xl:gap-32"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {standards.map((standard, idx) => (
              <motion.div 
                key={standard.title}
                variants={itemVariants}
                className="flex flex-col gap-4 sm:gap-6 group cursor-pointer"
              >
                {/* Index Number */}
                <motion.div 
                  className="text-xs sm:text-sm font-mono text-white/30 transition-colors duration-300 group-hover:text-[#FF6B00]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  0{idx + 1}
                </motion.div>
                
                {/* Content Block */}
                <div className="pr-2">
                  <motion.h2 
                    className="mb-2 sm:mb-3 text-xl sm:text-2xl lg:text-3xl font-medium text-white uppercase tracking-tight leading-snug transition-colors duration-300 group-hover:text-white/90"
                    whileHover={{ x: 5 }}
                  >
                    {standard.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="mb-3 sm:mb-5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#FF6B00]"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    // {standard.category}
                  </motion.p>
                  
                  <motion.p 
                    className="max-w-md text-sm sm:text-base font-light leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/80"
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 0.8 }}
                  >
                    {standard.copy}
                  </motion.p>
                </div>

                {/* Divider Line - Mobile Only */}
                <motion.div 
                  className="mt-2 h-px w-12 bg-white/10 lg:hidden origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + idx * 0.15 }}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </main>
  );
}

export default function QualityPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/quality");
  }, [router]);

  return null;
}