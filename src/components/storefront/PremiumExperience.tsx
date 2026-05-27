"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Sparkles, Key, Headphones, ArrowUpRight } from "lucide-react";

export default function PremiumExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax for the final massive background image
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={containerRef} className="bg-[#000000] pb-24 md:pb-40 relative z-20">
      
      {/* ── 1. Scroll-Driven Cinematic Typography ── */}
      <section className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 pt-20 md:pt-32 pb-16 md:pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/50 mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-white/20" /> L'expérience RentCar-OS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-8">
            Conçu pour ceux qui <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/80">
              exigent la perfection.
            </span>
          </h2>
        </motion.div>
      </section>

      {/* ── 2. The Dark Frosted Bento Grid ── */}
      <section className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 mb-24 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[320px] md:auto-rows-[400px]">
          
          {/* ── BENTO CARD 1: VIP Delivery (Large, Image Background) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 bg-[#050505] rounded-[32px] md:rounded-[48px] border border-white/[0.04] relative overflow-hidden group flex flex-col justify-end p-8 md:p-12"
          >
            {/* Image & Gradient Overlays */}
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop" 
              alt="Livraison VIP" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent opacity-90" />
            
            <div className="relative z-10 w-full">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-2xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl">
                <Key size={24} strokeWidth={1.5} className="text-white" />
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-md">
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">Service Voiturier VIP</h3>
                  <p className="text-white/50 font-medium text-sm md:text-base leading-relaxed">
                    Aéroport, hôtel de luxe, ou résidence privée. Votre véhicule vous est livré exactement où vous le désirez, à la minute près.
                  </p>
                </div>
                <button className="w-12 h-12 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center hover:scale-110 transition-transform duration-300 shrink-0">
                  <ArrowUpRight size={20} className="rtl:-scale-x-100" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── BENTO CARD 2: Concierge (Glassmorphic) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#050505] rounded-[32px] md:rounded-[48px] border border-white/[0.04] relative overflow-hidden group p-8 md:p-12 flex flex-col"
          >
            {/* Ambient Animated Glow */}
            <div className="absolute top-0 end-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 group-hover:bg-white/10 transition-colors duration-700" />
            
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-auto relative z-10">
              <Headphones size={24} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">Conciergerie 24/7</h3>
              <p className="text-white/50 font-medium text-sm leading-relaxed">
                Une équipe dédiée à votre disposition de jour comme de nuit pour répondre à vos moindres exigences.
              </p>
            </div>
          </motion.div>

          {/* ── BENTO CARD 3: Certified Fleet (Glassmorphic) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#050505] rounded-[32px] md:rounded-[48px] border border-white/[0.04] relative overflow-hidden group p-8 md:p-12 flex flex-col"
          >
            <div className="absolute bottom-0 start-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3 group-hover:bg-white/10 transition-colors duration-700" />
            
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-auto relative z-10">
              <Sparkles size={24} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">Flotte Certifiée</h3>
              <p className="text-white/50 font-medium text-sm leading-relaxed">
                Des véhicules impeccables, ultra-récents et rigoureusement inspectés avant chaque remise de clés.
              </p>
            </div>
          </motion.div>

          {/* ── BENTO CARD 4: Insurance (Wide, Immersive Dark) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 bg-[#050505] rounded-[32px] md:rounded-[48px] border border-white/[0.04] relative overflow-hidden group flex flex-col justify-end p-8 md:p-12"
          >
            {/* Subtle Abstract Dark Pattern/Noise could go here, using a sleek gradient for now */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10 h-full">
              <div className="flex flex-col h-full justify-between max-w-md">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                  <ShieldCheck size={24} strokeWidth={1.5} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">Couverture Absolue</h3>
                  <p className="text-white/50 font-medium text-sm md:text-base leading-relaxed">
                    Prenez la route l'esprit totalement libre. Notre assurance premium tous risques est incluse d'office, avec assistance 0km.
                  </p>
                </div>
              </div>
              
              {/* Abstract Security Graphic */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full rounded-3xl border border-white/10 bg-white/[0.02] relative overflow-hidden flex items-center justify-center group-hover:border-white/20 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
                <ShieldCheck size={80} strokeWidth={0.5} className="text-white/10" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 3. The Grand Cinematic Parallax Banner ── */}
      {/* This creates a breathtaking window into a luxury lifestyle scene */}
      <section className="relative h-[70vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2500&auto=format&fit=crop" 
            alt="Driving Experience" 
            className="w-full h-full object-cover"
          />
          {/* Heavy gradients to seamlessly blend the image back into the deep black background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-black/40 to-[#000000]" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <span className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
            L'ultime liberté
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
            Maîtrisez <br className="hidden md:block"/> l'horizon.
          </h2>
        </motion.div>
      </section>

    </div>
  );
}