"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// ── Dummy Data for Premium Reviews ──
// We split them into 3 columns to feed our distinct scrolling tracks.
const REVIEWS_COL_1 = [
  { name: "Karim T.", car: "Porsche 911 Carrera", text: "Un service voiturier irréprochable à l'aéroport de Casablanca. La voiture était dans un état clinique." },
  { name: "Sarah M.", car: "Range Rover Sport", text: "L'expérience RentCar-OS redéfinit le luxe au Maroc. Support client réactif et très professionnel." },
  { name: "Omar B.", car: "Mercedes G-Class", text: "Exactement ce que je cherchais pour mon séjour. Zéro paperasse inutile, tout est fluide et premium." },
  { name: "Jean D.", car: "Audi RSQ8", text: "Une flotte impressionnante. Le véhicule m'a été livré directement à mon hôtel avec une ponctualité parfaite." },
];

const REVIEWS_COL_2 = [
  { name: "Nadia L.", car: "Maserati Levante", text: "Je loue chez eux à chaque voyage d'affaires. Une discrétion et un service dignes des grands palaces." },
  { name: "Fahd E.", car: "BMW M8 Competition", text: "La puissance à l'état pur, avec la tranquillité d'esprit de l'assurance tous risques incluse. Magique." },
  { name: "Amine R.", car: "Mercedes S-Class", text: "Un confort absolu pour nos déplacements présidentiels. Le chauffeur était d'une élégance rare." },
  { name: "Sophie C.", car: "Porsche Cayenne", text: "C'est la troisième fois que j'utilise leur plateforme. Toujours aussi simple, rapide et luxueux." },
];

const REVIEWS_COL_3 = [
  { name: "Mehdi K.", car: "Ferrari F8 Tributo", text: "Le rêve est devenu réalité le temps d'un weekend. Processus de réservation ultra-sécurisé et rapide." },
  { name: "Youssef A.", car: "Range Rover Velar", text: "Parfait de la réservation jusqu'à la restitution. Un vrai service 5 étoiles sur toute la ligne." },
  { name: "Ines H.", car: "Audi e-tron GT", text: "Ravi de voir une option électrique aussi premium. La conciergerie 24/7 a répondu à toutes mes attentes." },
  { name: "Lucas P.", car: "Mercedes AMG GT", text: "Un son exceptionnel et un service qui l'est tout autant. RentCar-OS est mon nouveau partenaire mobilité." },
];

// Helper to render individual review cards
const ReviewCard = ({ review }: { review: any }) => (
  <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-4 w-full">
    <div className="flex justify-between items-start">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
        ))}
      </div>
      <Quote size={20} className="text-white/10" />
    </div>
    <p className="text-white/80 font-medium text-sm leading-relaxed">
      "{review.text}"
    </p>
    <div className="mt-2 pt-4 border-t border-white/5 flex flex-col">
      <span className="text-white font-bold text-sm tracking-wide">{review.name}</span>
      <span className="text-[#D4AF37]/80 text-[10px] font-bold uppercase tracking-widest mt-1">
        A loué : {review.car}
      </span>
    </div>
  </div>
);

export default function PremiumReviews() {
  return (
    <section className="relative h-[90vh] min-h-[700px] w-full bg-[#000000] overflow-hidden flex flex-col items-center justify-center py-20">
      
      {/* ── Background Ambient Glows ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Section Header (Stays on top) ── */}
      <div className="absolute top-16 md:top-24 inset-x-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <span className="text-[#D4AF37] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
          L'Excellence Prouvée
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
          Ce que disent <br className="hidden md:block"/> nos clients.
        </h2>
      </div>

      {/* ── Top and Bottom Fade Gradients for seamless loop cutoff ── */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#000000] via-[#000000]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-20 pointer-events-none" />

      {/* ── The 3-Column Tilted Grid ── */}
      <div className="flex gap-4 md:gap-6 h-[250%] w-full max-w-[1400px] px-4 md:px-8 rotate-[-4deg] scale-105 opacity-80 mt-10">
        
        {/* COLUMN 1: Outer Left (Moves DOWN) */}
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          className="flex flex-col gap-4 md:gap-6 w-1/3"
        >
          {/* Duplicate the array to create a seamless infinite scroll loop */}
          {[...REVIEWS_COL_1, ...REVIEWS_COL_1, ...REVIEWS_COL_1].map((review, i) => (
            <ReviewCard key={`col1-${i}`} review={review} />
          ))}
        </motion.div>

        {/* COLUMN 2: Middle (Moves UP) */}
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex flex-col gap-4 md:gap-6 w-1/3 pt-24" // pt-24 offsets the middle column slightly
        >
          {[...REVIEWS_COL_2, ...REVIEWS_COL_2, ...REVIEWS_COL_2].map((review, i) => (
            <ReviewCard key={`col2-${i}`} review={review} />
          ))}
        </motion.div>

        {/* COLUMN 3: Outer Right (Moves DOWN) */}
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }} // Different duration for organic staggered feel
          className="flex flex-col gap-4 md:gap-6 w-1/3"
        >
          {[...REVIEWS_COL_3, ...REVIEWS_COL_3, ...REVIEWS_COL_3].map((review, i) => (
            <ReviewCard key={`col3-${i}`} review={review} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}