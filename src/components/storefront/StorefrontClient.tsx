"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal, Search
} from "lucide-react";
import CinematicHero from "./CinematicHero";
import PremiumExperience from "./PremiumExperience";
import VehicleShowcase from "./VehicleShowcase";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: "ECONOMY" | "COMFORT" | "SUV" | "LUXURY" | "VAN" | string;
  pricePerDay: number;
  seats: number;
  transmission: "MANUAL" | "AUTOMATIC" | string;
  fuel: "DIESEL" | "GASOLINE" | "ELECTRIC" | "HYBRID" | string;
  imageUrl?: string | null;
  isAvailable: boolean;
}

interface StorefrontClientProps {
  cars: Car[];
  initialSearch?: { location?: string; start?: string; end?: string };
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const CATEGORIES = [
  { value: "ALL", label: "Collection Complète" },
  { value: "LUXURY", label: "Luxe & Sport" },
  { value: "SUV", label: "SUV Premium" },
  { value: "COMFORT", label: "Berlines Affaires" },
  { value: "ECONOMY", label: "Citadines" },
];

/* ─────────────────────────────────────────────
   Ultra-Luxury Car Card Component
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function StorefrontClient({ cars, initialSearch }: StorefrontClientProps) {
  // Filter State
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [showFilters, setShowFilters] = useState(false);

  const absoluteMaxPrice = useMemo(() => Math.max(...cars.map(c => c.pricePerDay), 2500), [cars]);

  const filtered = useMemo(() => {
    return cars.filter(car => {
      if (activeCategory !== "ALL" && car.category !== activeCategory) return false;
      if (car.pricePerDay > maxPrice) return false;
      return true;
    });
  }, [cars, activeCategory, maxPrice]);

  const available = filtered.filter(c => c.isAvailable);
  const activeFilterCount = [maxPrice < absoluteMaxPrice].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#000000]">

      {/* ── 1. CINEMATIC HERO ── */}
      <CinematicHero initialSearch={initialSearch} />

      {/* ── 2. STICKY GLASS FILTER BAR ── */}
      <div className="sticky top-[72px] z-40 bg-[#000000]/80 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`
                  px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border
                  ${activeCategory === cat.value
                    ? "bg-white text-[#0A0A0A] border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    : "bg-transparent text-white/50 border-white/[0.08] hover:bg-white/5 hover:text-white"}
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">
              <b className="text-white">{available.length}</b> Disponibles
            </span>
            <div className="w-px h-6 bg-white/10" />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border
                ${showFilters || activeFilterCount > 0 
                  ? "border-white bg-white/10 text-white" 
                  : "border-white/[0.08] text-white/50 hover:bg-white/5 hover:text-white"}`}
            >
              <SlidersHorizontal size={14} /> Options
              {activeFilterCount > 0 && <span className="w-4 h-4 bg-white text-[#0A0A0A] rounded-full flex items-center justify-center text-[9px]">{activeFilterCount}</span>}
            </button>
          </div>
        </div>

        {/* Expandable Filter Drawer (Dark Mode) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/[0.06] bg-white/[0.02]"
            >
              <div className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 py-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Budget Maximum — <span className="text-white">{maxPrice} MAD</span></label>
                  <input type="range" min={100} max={absoluteMaxPrice} step={50} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-white" />
                </div>
                <div className="flex items-end justify-end pb-1">
                  {activeFilterCount > 0 && (
                    <button onClick={() => { setActiveCategory("ALL"); setMaxPrice(absoluteMaxPrice); setShowFilters(false); }} className="text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors">
                      Réinitialiser
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 3. CINEMATIC VEHICLE GRID ── */}
      <main className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 py-16 md:py-24 relative z-10">
        
        {available.length > 0 && (
          <motion.div layout>
            <VehicleShowcase cars={available} startDate={initialSearch?.start} endDate={initialSearch?.end} />
          </motion.div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-32 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <Search size={32} className="text-white/30" />
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-3">Aucun véhicule trouvé</h3>
            <p className="text-white/50 font-medium max-w-md mb-8">Nous n'avons trouvé aucun véhicule correspondant à vos critères d'exigence actuels.</p>
            <button onClick={() => { setActiveCategory("ALL"); setMaxPrice(absoluteMaxPrice); }} className="bg-white text-[#0A0A0A] font-bold uppercase tracking-widest text-[11px] px-8 py-4 rounded-full hover:bg-[#EAEAEA] transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Réinitialiser la recherche
            </button>
          </div>
        )}

      </main>

      {/* ── 4. PREMIUM STORYTELLING EXPERIENCE ── */}
      <PremiumExperience />
      
    </div>
  );
}