"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2000); // 2 seconds loader

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: isLoading ? "0%" : "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060A11] text-white"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: isLoading ? "0%" : "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-4xl font-light tracking-[0.2em] text-[#FF6B00] uppercase"
        >
          Afsecmo <span className="font-bold text-white">Group</span>
        </motion.h1>
      </div>
      
      {/* Loading Progress Line */}
      <div className="absolute bottom-1/4 left-1/2 w-48 -translate-x-1/2 overflow-hidden h-[2px] bg-white/10 rounded-full">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: isLoading ? "0%" : "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="h-full w-full bg-[#FF6B00]"
        />
      </div>
    </motion.div>
  );
}