"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

/* ── Ambient Floating Particles ── */
const Particles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 blur-[1px]"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200],
            opacity: [0.2, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function CinematicHero({ initialSearch }: { initialSearch?: any }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth Parallax setup
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [location, setLocation] = useState(initialSearch?.location || "Tanger");
  const [startDate, setStartDate] = useState(initialSearch?.start || "");
  const [endDate, setEndDate] = useState(initialSearch?.end || "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <section ref={containerRef} className="relative h-[100svh] min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-[#000000]">
      
      {/* ── 1. The Deep Canvas (Background & Parallax) ── */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-full">
        {/* Hyper-premium dark automotive image */}
        <img 
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2500&auto=format&fit=crop" 
          alt="Cinematic Mobility" 
          className="w-full h-full object-cover opacity-60 mix-blend-lighten"
        />
        {/* Ambient Lighting Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#000000]" />
      </motion.div>

      <Particles />

      {/* ── 2. Cinematic Typography ── */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 w-full max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 flex flex-col items-center text-center mt-20"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/50 mb-6 flex items-center justify-center gap-4">
            <span className="w-8 h-px bg-white/20" />
            La Collection Privée
            <span className="w-8 h-px bg-white/20" />
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
            Redéfinissez <br className="hidden md:block"/> l'Excellence.
          </h1>
        </motion.div>

        {/* ── 3. Ultra-Premium Glass Island (Search Widget) ── */}
        {/* Note the use of `ps-`, `pe-`, `ms-` for RTL support without breaking the layout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl relative group"
        >
          {/* Animated Glow Behind the Glass */}
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative bg-[#0A0A0A]/40 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-2 md:p-2.5 rounded-[2rem] md:rounded-full flex flex-col md:flex-row items-stretch md:items-center gap-2 ring-1 ring-white/5">
            
            {/* Location */}
            <div className="flex-1 bg-white/5 rounded-t-[1.5rem] md:rounded-full px-6 py-4 flex items-center gap-4 transition-colors hover:bg-white/10 border border-transparent hover:border-white/10">
              <MapPin className="text-white/40 shrink-0" size={20} />
              <div className="w-full text-start">
                <label className="block text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-0.5">Lieu</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-sm font-semibold text-white bg-transparent outline-none placeholder:text-white/20" 
                  placeholder="Aéroport, Hôtel, Ville..."
                />
              </div>
            </div>

            {/* Dates */}
            <div className="flex-[1.2] bg-white/5 md:rounded-full px-6 py-4 flex items-center gap-4 transition-colors hover:bg-white/10 border border-transparent hover:border-white/10">
              <Calendar className="text-white/40 shrink-0" size={20} />
              <div className="w-full flex items-center gap-4">
                <div className="flex-1 text-start">
                  <label className="block text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-0.5">Départ</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full text-sm font-semibold text-white bg-transparent outline-none [color-scheme:dark]" />
                </div>
                <div className="w-px h-8 bg-white/10 shrink-0" />
                <div className="flex-1 text-start">
                  <label className="block text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] mb-0.5">Retour</label>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full text-sm font-semibold text-white bg-transparent outline-none [color-scheme:dark]" />
                </div>
              </div>
            </div>

            {/* Premium Call to Action */}
            <button 
              onClick={handleSearch}
              className="bg-white text-[#0A0A0A] rounded-b-[1.5rem] md:rounded-full px-8 py-5 md:py-0 md:h-full min-h-[64px] flex items-center justify-center gap-3 hover:bg-[#EAEAEA] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 duration-200"
            >
              <span className="font-bold text-sm uppercase tracking-wider">Explorer</span>
              {/* rtl:-scale-x-100 ensures the arrow flips correctly for Arabic */}
              <ChevronRight size={18} strokeWidth={2.5} className="rtl:-scale-x-100" />
            </button>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}