"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute block h-1 w-1 rounded-full bg-white/25"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            filter: "blur(0.6px)",
          }}
          animate={{ y: [-4, -22, -4], opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function CinematicBackgroundEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.2, 0.32, 0.12]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050506]" />

      <motion.div
        style={{ y: orbY }}
        className="absolute -top-32 left-1/2 h-[55vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_65%)] blur-3xl"
      />

      <div className="absolute inset-0 lux-mesh-bg opacity-60" />

      <motion.div
        style={{ opacity: gridOpacity }}
        className="absolute inset-0"
      >
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:46px_46px]" />
      </motion.div>

      <ParticleField />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(92,141,255,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(124,92,255,0.16),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70" />
    </div>
  );
}
