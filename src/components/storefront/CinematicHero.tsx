"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStorefrontMessages, isLocale, type Locale } from "@/lib/i18n";

type HeroMessages = {
  eyebrow: string;
  title: string;
  subtitle: string;
  location: string;
  pickup: string;
  dropoff: string;
  cta: string;
  locationPlaceholder: string;
};

const HERO_COPY: Record<Locale, HeroMessages> = {
  fr: {
    eyebrow: "Mobilité Privée",
    title: "Redéfinissez le luxe en mouvement.",
    subtitle: "Expérience automobile cinématique, pensée pour le Maroc.",
    location: "Lieu",
    pickup: "Départ",
    dropoff: "Retour",
    cta: "Vérifier la disponibilité", // Action-oriented CTA
    locationPlaceholder: "Aéroport, hôtel, ville...",
  },
  en: {
    eyebrow: "Private Mobility",
    title: "Redefine luxury in motion.",
    subtitle: "A cinematic automotive experience built for Morocco.",
    location: "Location",
    pickup: "Pickup",
    dropoff: "Return",
    cta: "Check Availability", // Action-oriented CTA
    locationPlaceholder: "Airport, hotel, city...",
  },
  ar: {
    eyebrow: "تنقل خاص",
    title: "أعد تعريف الفخامة في التنقل.",
    subtitle: "تجربة سيارات سينمائية مصممة للمغرب.",
    location: "الموقع",
    pickup: "الانطلاق",
    dropoff: "العودة",
    cta: "التحقق من التوفر", // Action-oriented CTA
    locationPlaceholder: "مطار، فندق، مدينة...",
  },
};

export default function CinematicHero({ initialSearch }: { initialSearch?: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const langParam = searchParams.get("lang");
  const locale: Locale = isLocale(langParam) ? langParam : "fr";
  const navCopy = getStorefrontMessages(locale);
  const copy = HERO_COPY[locale];

  const [location, setLocation] = useState(initialSearch?.location || "Tanger");
  const [startDate, setStartDate] = useState(initialSearch?.start || "");
  const [endDate, setEndDate] = useState(initialSearch?.end || "");

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseX.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (location) params.set("location", location);
    if (startDate) params.set("start", startDate);
    if (endDate) params.set("end", endDate);
    params.set("lang", locale);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex h-[100svh] min-h-[720px] w-full items-center justify-center overflow-hidden bg-[#050506]"
    >
      <motion.div style={{ y: yImage }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2400&auto=format&fit=crop"
          alt="Luxury car"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050506]" />
      </motion.div>

      <motion.div style={{ y: yContent, opacity: opacityContent }} className="relative z-20 mx-auto flex w-full max-w-[2520px] flex-col items-center px-4 text-center md:px-10 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="mb-5 flex items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/70 md:text-xs">
            <span className="h-px w-8 bg-[#D4AF37]/50" />
            {copy.eyebrow}
            <span className="h-px w-8 bg-[#D4AF37]/50" />
          </p>
          <h1 className="mx-auto max-w-5xl text-balance font-display text-5xl font-semibold leading-[0.92] tracking-tight text-white md:text-7xl lg:text-[92px]">
            {copy.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-white/80 md:text-base font-medium">{copy.subtitle}</p>
        </motion.div>

        {/* High-Contrast Search Widget */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl"
        >
          {/* Glowing Aura */}
          <div className="absolute -inset-1.5 rounded-[2.2rem] bg-gradient-to-r from-white/10 via-[#D4AF37]/20 to-white/10 blur-2xl" />
          
          <div className="relative rounded-[1.8rem] p-2.5 ring-1 ring-white/30 bg-black/50 backdrop-blur-3xl md:rounded-full md:p-3 shadow-2xl">
            <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
              
              <div className="flex flex-1 items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 md:rounded-full transition-colors hover:bg-white/10">
                <MapPin className="shrink-0 text-[#D4AF37]" size={20} />
                <div className="w-full text-start">
                  <label className="mb-0.5 block text-[10px] font-bold uppercase tracking-widest text-white/50">{copy.location}</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/30"
                    placeholder={copy.locationPlaceholder}
                  />
                </div>
              </div>

              <div className="flex flex-[1.25] items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 md:rounded-full transition-colors hover:bg-white/10">
                <Calendar className="shrink-0 text-[#D4AF37]" size={20} />
                <div className="flex w-full items-center gap-4">
                  <div className="flex-1 text-start">
                    <label className="mb-0.5 block text-[10px] font-bold uppercase tracking-widest text-white/50">{copy.pickup}</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none [color-scheme:dark]" />
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div className="flex-1 text-start">
                    <label className="mb-0.5 block text-[10px] font-bold uppercase tracking-widest text-white/50">{copy.dropoff}</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-transparent text-sm font-bold text-white outline-none [color-scheme:dark]" />
                  </div>
                </div>
              </div>

              {/* Conversion-Optimized CTA */}
              <button
                onClick={handleSearch}
                className="group flex min-h-[64px] items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-4 text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white md:rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                <span className="text-sm font-black uppercase tracking-widest">{copy.cta}</span>
                <ChevronRight size={18} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}