"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User as UserIcon, Globe, Home, Compass, CalendarDays, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  user?: { name: string; email: string } | null;
}

const LANGUAGES = [
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

export default function Navbar({ user }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
  
  const pathname = usePathname();
  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";

  // Handle dynamic glass effect based on scroll position
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Simulate Language Switch (In a real app, this would trigger i18n logic and change document.dir)
  const handleLangSwitch = (lang: typeof LANGUAGES[0]) => {
    setActiveLang(lang);
    setLangOpen(false);
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = lang.code;
    }
  };

  return (
    <>
      {/* ── DESKTOP & TOP NAV (OLED Glassmorphism) ── */}
      <header
        className={`fixed top-0 start-0 end-0 z-50 transition-all duration-500 border-b ${
          scrolled || !isHome
            ? "bg-[#050505]/80 backdrop-blur-2xl border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-4"
            : "bg-gradient-to-b from-black/80 to-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-[2520px] mx-auto px-4 md:px-10 xl:px-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <span className="text-[#0A0A0A] font-bold text-lg leading-none">R</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
              RentCar-OS
            </span>
          </Link>

          {/* Center Navigation (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "La Collection", href: "/#collection" },
              { name: "Services VIP", href: "/services" },
              { name: "L'Expérience", href: "/experience" },
            ].map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Elegant Language Switcher */}
            <div ref={langRef} className="relative hidden sm:block">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Globe size={16} />
                <span className="text-[11px] font-bold uppercase tracking-widest">{activeLang.code}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full end-0 mt-2 w-40 bg-[#111] border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] p-2 z-50 backdrop-blur-xl"
                  >
                    {LANGUAGES.map((lang) => (
                      <button 
                        key={lang.code} 
                        onClick={() => handleLangSwitch(lang)}
                        className={`w-full text-start px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-between ${
                          activeLang.code === lang.code ? "bg-white text-[#0A0A0A]" : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {lang.label}
                        {activeLang.code === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-5 bg-white/10 hidden sm:block mx-1" />

            {/* Auth / Profile */}
            {user ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-3 px-2 py-2 pe-4 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center text-xs font-bold shadow-inner">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white hidden sm:block">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
                
                <AnimatePresence>
                  {userOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full end-0 mt-2 w-56 bg-[#111] border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] p-2 z-50 backdrop-blur-xl"
                    >
                      <div className="px-4 py-4 border-b border-white/[0.08] mb-2">
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-white/40 truncate mt-0.5">{user.email}</p>
                      </div>
                      <Link href="/reservations" className="block px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                        Mes réservations
                      </Link>
                      <button className="w-full text-start px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors mt-1">
                        Déconnexion
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/client-login"
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-full bg-white text-[#0A0A0A] hover:bg-[#EAEAEA] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
              >
                <UserIcon size={14} strokeWidth={2.5} />
                <span className="hidden sm:block">Espace Client</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── MOBILE NATIVE APP BOTTOM BAR ── */}
      <div className="md:hidden fixed bottom-0 start-0 end-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-3xl border-t border-white/[0.08] pb-safe pt-2 px-6 flex justify-between items-center shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
        <Link href="/" className={`flex flex-col items-center gap-1.5 p-2 transition-colors duration-300 ${pathname === '/' ? "text-white" : "text-white/40"}`}>
          <Home size={22} strokeWidth={pathname === '/' ? 2.5 : 1.5} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Accueil</span>
        </Link>
        <Link href="/#collection" className={`flex flex-col items-center gap-1.5 p-2 transition-colors duration-300 ${pathname.includes('collection') ? "text-white" : "text-white/40"}`}>
          <Compass size={22} strokeWidth={pathname.includes('collection') ? 2.5 : 1.5} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Explorer</span>
        </Link>
        <Link href="/reservations" className={`flex flex-col items-center gap-1.5 p-2 transition-colors duration-300 ${pathname.includes('reservations') ? "text-white" : "text-white/40"}`}>
          <CalendarDays size={22} strokeWidth={pathname.includes('reservations') ? 2.5 : 1.5} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Voyages</span>
        </Link>
        <Link href={user ? "/profile" : "/client-login"} className={`flex flex-col items-center gap-1.5 p-2 transition-colors duration-300 ${pathname.includes('profile') || pathname.includes('login') ? "text-white" : "text-white/40"}`}>
          <UserIcon size={22} strokeWidth={pathname.includes('profile') || pathname.includes('login') ? 2.5 : 1.5} />
          <span className="text-[9px] font-bold uppercase tracking-widest">{user ? "Profil" : "Compte"}</span>
        </Link>
      </div>
    </>
  );
}