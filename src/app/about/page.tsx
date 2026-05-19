"use client";

import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type AboutActivity = { title: string; copy: string; image: string };
type AboutStat = { label: string; value: string };

const premiumEase = [0.215, 0.61, 0.355, 1] as [number, number, number, number];

export function AboutContent() {
  const { t } = useTranslation("content");
  const activities = t("about.activities", { returnObjects: true }) as AboutActivity[];
  const stats = t("about.stats", { returnObjects: true }) as AboutStat[];
  const hero = t("about.hero", { returnObjects: true }) as {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    imageAlt: string;
  };
  const section = t("about.section", { returnObjects: true }) as { eyebrow: string; title: string };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } },
  };

  return (
    <main className="min-h-screen bg-[#0F1B2E] text-white selection:bg-[#FF6B00] selection:text-white pb-32">
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-end justify-center pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/08.png"
            alt={hero.imageAlt}
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0F1B2E] via-[#0F1B2E]/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 text-center lg:px-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="mx-auto mb-6 flex h-px w-16 bg-[#FF6B00]" />
            <h1 className="mb-6 text-4xl font-light uppercase leading-[0.95] tracking-tight text-white drop-shadow-xl sm:text-6xl lg:text-[80px]">
              AFSECMO <br />
              <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-white to-white/60">
                {hero.titleLead} {hero.titleAccent}
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-sm font-light leading-relaxed text-white/80 sm:text-base">
              {hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-10 max-w-5xl px-6 lg:px-12">
        <div className="grid grid-cols-1 divide-y divide-white/10 rounded-3xl border border-white/10 bg-[#060A11]/80 shadow-2xl backdrop-blur-xl md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <p className="text-4xl font-light tracking-tight text-white md:text-5xl">{item.value}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl overflow-hidden px-6 py-32 lg:px-12">
        <div className="mb-24 text-center">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#FF6B00]">{section.eyebrow}</h2>
          <p className="mx-auto max-w-3xl text-3xl font-light leading-tight text-white sm:text-5xl">
            {section.title}
          </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {activities.map((activity, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={activity.title} className={`group flex flex-col lg:items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: premiumEase }}
                  className="h-80 w-full overflow-hidden rounded-3xl sm:h-96 lg:h-[500px] lg:w-3/5"
                >
                  <img src={activity.image} alt={activity.title} className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
                  className={`relative z-10 w-full -mt-16 lg:mt-0 lg:w-2/5 ${isEven ? "lg:-ml-20" : "lg:-mr-20"}`}
                >
                  <div className="rounded-3xl border border-white/10 bg-[#060A11]/85 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-12">
                    <h3 className="mb-6 text-2xl font-light uppercase tracking-tight text-white sm:text-3xl">{activity.title}</h3>
                    <div className="mb-6 h-px w-12 bg-[#FF6B00]" />
                    <p className="text-sm leading-relaxed text-white/60 sm:text-base">{activity.copy}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/about");
  }, [router]);

  return null;
}