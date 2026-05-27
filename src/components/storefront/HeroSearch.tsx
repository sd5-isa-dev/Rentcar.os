"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState("Tanger");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);
    router.push(`/?${params.toString()}`);
  };

  return (
    <section className="relative h-[95vh] min-h-[650px] w-full flex items-center justify-center overflow-hidden">
      
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 w-full h-full bg-[#0A0A0A]">
        <img 
          // Using a high-end, cinematic dark Porsche/Mercedes image for immediate premium feel
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2500&auto=format&fit=crop" 
          alt="Luxury Mobility" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Gradient overlays to ensure text readability and seamless blending into the next white section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 flex flex-col items-center text-center mt-10 md:mt-0">
        
        {/* Animated Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-xl">
              <Sparkles size={12} />
              Mobilité Premium
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[84px] leading-[1.05] font-bold text-white tracking-tight mb-6 drop-shadow-xl">
            Prenez le volant de <br className="hidden md:block"/> l'extraordinaire.
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 font-medium mb-12 drop-shadow-md max-w-2xl mx-auto">
            La flotte de véhicules la plus exclusive du Maroc. Louez la voiture de vos rêves en quelques secondes.
          </p>
        </motion.div>

        {/* ── Floating Glassmorphic Search Pill ── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-2xl border border-white/20 p-2 md:p-2.5 rounded-[2rem] md:rounded-full shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2"
        >
          {/* Location Field */}
          <div className="flex-1 bg-white rounded-t-[1.5rem] md:rounded-full px-6 py-4 flex items-center gap-4 transition-colors hover:bg-[#FAFAFA]">
            <MapPin className="text-[#888] shrink-0" size={20} />
            <div className="w-full text-left">
              <label className="block text-[10px] font-bold text-[#888] uppercase tracking-widest mb-0.5">Lieu de départ</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm font-bold text-[#0A0A0A] bg-transparent outline-none placeholder:text-[#ccc]" 
                placeholder="Ville, hôtel, aéroport..."
              />
            </div>
          </div>

          {/* Dates Wrapper */}
          <div className="flex-[1.2] bg-white md:rounded-full px-6 py-4 flex items-center gap-4 transition-colors hover:bg-[#FAFAFA]">
            <Calendar className="text-[#888] shrink-0" size={20} />
            <div className="w-full flex items-center gap-4">
              <div className="flex-1 text-left">
                <label className="block text-[10px] font-bold text-[#888] uppercase tracking-widest mb-0.5">Départ</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={e => setStartDate(e.target.value)} 
                  className="w-full text-sm font-bold text-[#0A0A0A] bg-transparent outline-none cursor-pointer" 
                />
              </div>
              <div className="w-px h-8 bg-black/10 shrink-0" />
              <div className="flex-1 text-left">
                <label className="block text-[10px] font-bold text-[#888] uppercase tracking-widest mb-0.5">Retour</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={e => setEndDate(e.target.value)} 
                  className="w-full text-sm font-bold text-[#0A0A0A] bg-transparent outline-none cursor-pointer" 
                />
              </div>
            </div>
          </div>

          {/* Search CTA */}
          <button 
            onClick={handleSearch}
            className="bg-[#0A0A0A] text-white rounded-b-[1.5rem] md:rounded-full px-8 py-5 md:py-0 md:h-full min-h-[64px] flex items-center justify-center gap-2 hover:bg-[#222] transition-colors shadow-lg active:scale-95 duration-200 group"
          >
            <span className="font-bold text-sm md:hidden lg:block whitespace-nowrap">Trouver un véhicule</span>
            <Search size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
          </button>
        </motion.div>

        {/* ── Micro-Trust Indicators ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/80 text-[11px] font-bold uppercase tracking-widest"
        >
          <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-white"/> Assurance incluse</div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-white/30" />
          <div className="flex items-center gap-2"><Sparkles size={16} className="text-white"/> Véhicules certifiés</div>
        </motion.div>

      </div>
    </section>
  );
};