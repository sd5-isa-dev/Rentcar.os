"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal, Users, Settings2, ArrowUpRight, Search, Heart
} from "lucide-react";
import CinematicHero from "./CinematicHero";
import PremiumExperience from "./PremiumExperience";

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
function UltraLuxuryCarCard({ car, startDate, endDate }: { car: Car; startDate?: string; endDate?: string }) {
  const [imgError, setImgError] = useState(false);
  const href = `/car/${car.id}${startDate ? `?start=${startDate}&end=${endDate}` : ""}`;

  let coverImage: string | null = null;
  if (typeof car.imageUrl === 'string' && car.imageUrl.trim() !== "") {
    try {
      const parsed = JSON.parse(car.imageUrl);
      coverImage = Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : parsed;
    } catch {
      coverImage = car.imageUrl;
    }
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Animated Glow Background (Revealed on Hover) */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-white/15 to-transparent rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]" />
      
      <Link href={href} className="relative flex flex-col h-full bg-[#050505] rounded-[24px] border border-white/[0.06] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.05)]">
        
        {/* ── Immersive Image Container ── */}
        <div className="relative aspect-[16/10] bg-[#111] overflow-hidden">
          {coverImage && !imgError ? (
            <Image
              src={coverImage}
              alt={car.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#222] flex items-center justify-center">
              <span className="text-4xl font-bold text-white/10 tracking-tighter">{car.brand.toUpperCase()}</span>
            </div>
          )}

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating Top Elements */}
          <div className="absolute top-4 start-4 end-4 flex justify-between items-start">
            <span className="bg-white/10 backdrop-blur-xl border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">
              {car.category}
            </span>
            <button 
              onClick={(e) => e.preventDefault()} 
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all shadow-lg"
            >
              <Heart size={14} />
            </button>
          </div>

          {/* Availability Status */}
          {!car.isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-white border border-white/20 px-4 py-2 rounded-full">
                Indisponible
              </span>
            </div>
          )}
        </div>

        {/* ── High-Contrast Content ── */}
        <div className="p-6 flex flex-col flex-1 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">{car.brand}</p>
              <h3 className="font-bold text-xl text-white leading-tight tracking-tight">
                {car.model} <span className="text-white/30 font-medium">{car.year}</span>
              </h3>
            </div>
            <div className="text-end shrink-0">
              <p className="text-xl font-bold text-white leading-none">
                {car.pricePerDay.toLocaleString("fr-MA")} <span className="text-[10px] uppercase tracking-widest text-white/40 ms-0.5">MAD</span>
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/30 mt-1.5">/ jour</p>
            </div>
          </div>

          {/* Premium Quick Action Glass Bar */}
          <div className="mt-auto relative overflow-hidden rounded-[16px] bg-white/[0.02] border border-white/[0.04] p-1.5 transition-colors duration-300 group-hover:bg-white/[0.05]">
            <div className="flex items-center justify-between p-2.5">
              <div className="flex items-center gap-4 text-white/50">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                  <Users size={14} className="text-white/30" /> {car.seats}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                  <Settings2 size={14} className="text-white/30" /> {car.transmission === "AUTOMATIC" ? "Auto" : "Manu"}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 rtl:group-hover:-rotate-45 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function StorefrontClient({ cars, initialSearch }: StorefrontClientProps) {
  const router = useRouter();

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
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            <AnimatePresence>
              {available.map(car => (
                <UltraLuxuryCarCard key={car.id} car={car} startDate={initialSearch?.start} endDate={initialSearch?.end} />
              ))}
            </AnimatePresence>
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