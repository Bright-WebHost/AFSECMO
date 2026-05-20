"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AtAGlance() {
  const { t } = useTranslation("home");

  // AFSECMO specific data based on your company profile
  const stats = [
    {
      id: 1,
      value: "4",
      label: "Core industrial sectors served",
    },
    {
      id: 2,
      value: "2024",
      label: "Year established in Abidjan, Côte d'Ivoire",
    },
    {
      id: 3,
      value: "360°",
      label: "Integrated logistics and supply chain",
    },
  ];

  return (
    // Base light background to match the reference
    <section className="w-full bg-[#f8f9fa] py-20 sm:py-32 font-sans selection:bg-[#FF8C00] selection:text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl font-light text-gray-900 sm:text-4xl lg:text-5xl">
            {t("stats.title", "At a glance")}
          </h2>
        </motion.div>

        {/* 3-Column Stats Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col"
            >
              {/* Massive, light font for the number */}
              <div className="text-6xl font-light tracking-tight text-gray-900 lg:text-7xl">
                {stat.value}
              </div>
              
              {/* Label text */}
              <div className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                {stat.label}
              </div>

              {/* Thin, distinct bottom border matching the screenshot */}
              <div className="mt-8 h-px w-full bg-gray-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}