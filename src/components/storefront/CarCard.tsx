"use client";

import React from 'react';
import { Heart, Star, Fuel, Settings2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Vehicle } from '@prisma/client';

interface CarCardProps {
  car: Vehicle;
  onClick: (car: Vehicle) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  // Psychological trigger: simulate low stock for high-demand vehicles
  const isLowStock = Math.random() > 0.7; 

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      onClick={() => onClick(car)}
      className="group cursor-pointer bg-[#0A0A0A] rounded-[24px] border border-white/10 overflow-hidden flex flex-col transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20"
    >
      <div className="relative aspect-[4/3] w-full bg-[#111] overflow-hidden">
        <img 
          src={car.imageUrl || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop'} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Availability Badge for Urgency */}
        {isLowStock ? (
           <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10 shadow-lg">
             Plus que 2
           </div>
        ) : (
           <div className="absolute top-4 left-4 bg-[#D4AF37]/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full z-10 shadow-lg">
             Top Choix
           </div>
        )}
        
        <button className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors z-10">
          <Heart className="w-4 h-4 fill-current" />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-display font-bold text-xl text-white tracking-tight">
              {car.brand} {car.model}
            </h3>
            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-0.5">{car.year} • {car.category}</p>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md border border-white/5">
            <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-white text-xs font-bold">5.0</span>
          </div>
        </div>
        
        {/* Scannable Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 mb-2 border-y border-white/10">
          <div className="flex flex-col items-center gap-1.5">
            <Settings2 className="w-4 h-4 text-white/40" />
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-wide">Auto</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 border-x border-white/10">
            <Fuel className="w-4 h-4 text-white/40" />
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-wide">Essence</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Users className="w-4 h-4 text-white/40" />
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-wide">5 Places</span>
          </div>
        </div>
        
        {/* Conversion CTA & Prominent Pricing */}
        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-0.5">Tarif Journalier</span>
            <div className="flex items-baseline gap-1">
              {/* Daily Price is highly prominent */}
              <span className="font-bold text-2xl text-white">{car.dailyRate}</span>
              <span className="text-[#D4AF37] text-xs font-bold uppercase">MAD</span>
            </div>
          </div>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onClick(car); 
            }}
            className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors duration-300 shadow-lg active:scale-95"
          >
            Réserver
          </button>
        </div>
      </div>
    </motion.div>
  );
};