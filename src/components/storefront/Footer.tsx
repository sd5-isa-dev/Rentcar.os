"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Twitter, Linkedin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white relative z-10 overflow-hidden border-t border-white/[0.04]">
      
      {/* ── Ambient Background Glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* ── 1. The Pre-Footer Cinematic CTA ── */}
      <div className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 pt-24 md:pt-32 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-10 bg-[#050505] border border-white/[0.04] rounded-[32px] md:rounded-[48px] p-10 md:p-16 lg:p-20 relative overflow-hidden group"
        >
          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="max-w-2xl relative z-10 text-center md:text-start">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-6">
              Prêt à prendre <br className="hidden md:block"/> le volant ?
            </h2>
            <p className="text-sm md:text-base font-medium text-white/50 leading-relaxed max-w-md mx-auto md:mx-0">
              Rejoignez la collection privée RentCar-OS et accédez instantanément aux véhicules les plus exclusifs du Maroc.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <Link 
              href="/#collection"
              className="bg-white text-[#0A0A0A] font-bold uppercase tracking-widest text-[11px] px-8 py-5 rounded-full hover:bg-[#EAEAEA] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center gap-3 group/btn"
            >
              Réserver maintenant
              <ChevronRight size={16} strokeWidth={2.5} className="rtl:-scale-x-100 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── 2. Main Footer Navigation ── */}
      <div className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 pt-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column (Spans 4) */}
          <div className="lg:col-span-4 flex flex-col items-start md:items-start text-start">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <span className="text-[#0A0A0A] font-black text-xl leading-none">R</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                RentCar-OS
              </span>
            </Link>
            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs mb-8">
              L'excellence de la mobilité. Une plateforme digitale conçue pour ceux qui exigent l'extraordinaire.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-full bg-[#050505] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white hover:text-[#0A0A0A] hover:border-white transition-all duration-300">
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Links Column 1 */}
          <div className="lg:col-span-2 text-start">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">La Collection</h4>
            <ul className="space-y-4">
              {['Luxe & Sport', 'SUV Premium', 'Berlines Affaires', 'Citadines'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/60 hover:text-white text-sm font-bold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 text-start">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Services</h4>
            <ul className="space-y-4">
              {['Chauffeur Privé', 'Transfert VIP', 'Mariages', 'Longue Durée'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/60 hover:text-white text-sm font-bold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2 text-start">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Conciergerie</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+212600000000" className="text-white/60 hover:text-white text-sm font-bold transition-colors flex items-center gap-1 group w-fit">
                  +212 6 00 00 00 00 
                  <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all rtl:-scale-x-100" />
                </a>
              </li>
              <li>
                <a href="mailto:vip@rentcar-os.com" className="text-white/60 hover:text-white text-sm font-bold transition-colors flex items-center gap-1 group w-fit">
                  vip@rentcar-os.com 
                  <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all rtl:-scale-x-100" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── 3. Bottom Legal & Watermark ── */}
      <div className="border-t border-white/[0.04] bg-[#050505]">
        <div className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs font-bold text-white/30 uppercase tracking-widest text-center md:text-start">
            <p>© {new Date().getFullYear()} RENTCAR-OS</p>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Mentions Légales</Link>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Tanger, Maroc</span>
          </div>

        </div>
      </div>

      {/* Massive Background Typography Mark (Visible slightly behind content) */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center overflow-hidden pointer-events-none select-none z-[-1] opacity-[0.02]">
        <h1 className="text-[15vw] font-black text-white whitespace-nowrap tracking-tighter leading-none">
          RENTCAR-OS
        </h1>
      </div>

    </footer>
  );
}