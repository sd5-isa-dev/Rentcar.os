"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface CarGalleryProps {
  images: string[];
  carName: string;
}

export default function CarGallery({ images, carName }: CarGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback if no images
  const displayImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2500&auto=format&fit=crop"];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));

  return (
    <div className="flex flex-col gap-4">
      {/* ── Main Featured Image ── */}
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full bg-[#F8F8F6] rounded-[32px] overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={displayImages[currentIndex]}
              alt={`${carName} - Vue ${currentIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (Fade in on hover on Desktop) */}
        {displayImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevImage}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 shadow-xl"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <button 
              onClick={nextImage}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 shadow-xl"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Fullscreen Hint */}
        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <Maximize2 size={18} />
        </div>
      </div>

      {/* ── Thumbnails Row ── */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-24 h-16 md:w-32 md:h-20 shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                currentIndex === idx 
                  ? "ring-2 ring-[#0A0A0A] ring-offset-2 scale-95 opacity-100" 
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="150px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}