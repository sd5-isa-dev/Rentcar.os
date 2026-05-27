"use client";

import { motion } from "framer-motion";
import { ChevronRight, Fuel, Gauge, Heart, Settings2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Car } from "./StorefrontClient";

type Props = {
  cars: Car[];
  startDate?: string;
  endDate?: string;
};

function VehicleCard({ car, startDate, endDate }: { car: Car; startDate?: string; endDate?: string }) {
  const [imgError, setImgError] = useState(false);
  const href = `/car/${car.id}${startDate ? `?start=${startDate}&end=${endDate}` : ""}`;

  const coverImage = useMemo(() => {
    if (typeof car.imageUrl !== "string" || car.imageUrl.trim() === "") return null;
    try {
      const parsed = JSON.parse(car.imageUrl);
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch {
      return car.imageUrl;
    }
  }, [car.imageUrl]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative snap-start"
    >
      <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-b from-white/18 to-transparent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

      <Link href={href} className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#070708] lux-transition hover:-translate-y-1.5 lux-shadow">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
          {coverImage && !imgError ? (
            <Image
              src={coverImage}
              alt={car.name}
              fill
              sizes="(max-width: 768px) 84vw, (max-width: 1280px) 42vw, 30vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#111] to-[#222]">
              <span className="text-3xl font-semibold tracking-tight text-white/20">{car.brand}</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-black/25" />

          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-xl">
              {car.category}
            </span>
            <button onClick={(e) => e.preventDefault()} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/60 backdrop-blur-xl transition-colors hover:text-white">
              <Heart size={14} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{car.brand}</p>
              <h3 className="text-xl font-semibold tracking-tight text-white">{car.model} <span className="text-white/35">{car.year}</span></h3>
            </div>
            <div className="text-end">
              <p className="text-xl font-bold text-white">{car.pricePerDay.toLocaleString("fr-MA")} <span className="text-[10px] text-white/45">MAD</span></p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/35">/ jour</p>
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
            <div className="mb-3 grid grid-cols-3 gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
              <span className="flex items-center gap-1"><Users size={13} className="text-white/35" /> {car.seats}</span>
              <span className="flex items-center gap-1"><Settings2 size={13} className="text-white/35" /> {car.transmission === "AUTOMATIC" ? "Auto" : "Manu"}</span>
              <span className="flex items-center gap-1"><Fuel size={13} className="text-white/35" /> {car.fuel}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-2.5">
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"><Gauge size={13} className="text-white/35" /> Premium spec</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0A0A0A] transition-transform group-hover:rotate-45">
                <ChevronRight size={14} className="rtl:rotate-180" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function VehicleShowcase({ cars, startDate, endDate }: Props) {
  return (
    <>
      <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-7 xl:gap-8">
        {cars.map((car) => (
          <VehicleCard key={car.id} car={car} startDate={startDate} endDate={endDate} />
        ))}
      </div>

      <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-none">
        <div className="flex gap-4 pb-2">
          {cars.map((car) => (
            <div key={car.id} className="w-[84vw] max-w-[420px] shrink-0">
              <VehicleCard car={car} startDate={startDate} endDate={endDate} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
