"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalScrollTracker() {
  const { scrollYProgress } = useScroll();
  
  // Spring physics makes the progress bar feel heavy and smooth, rather than strictly linear
  const scaleY = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    // Hidden on mobile (too cluttered), visible on desktop. 
    // mix-blend-difference ensures it stays visible whether it crosses over a dark or light image.
    <div className="pointer-events-none fixed bottom-0 right-6 top-0 z-[100] hidden flex-col items-center justify-center gap-6 mix-blend-difference xl:flex">
      
      {/* Top Label */}
      <div className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white [writing-mode:vertical-lr] rotate-180">
        Scroll
      </div>
      
      {/* The Kinetic Progress Track */}
      <div className="relative h-40 w-[2px] overflow-hidden rounded-full bg-white/20">
        <motion.div 
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute bottom-0 left-0 right-0 top-0 bg-[#FF6B00]"
        />
      </div>
      
      {/* Live Percentage Counter */}
      <div className="text-[10px] font-mono font-bold tracking-widest text-white [writing-mode:vertical-lr] rotate-180">
        {progress.toString().padStart(3, '0')}%
      </div>
      
    </div>
  );
}