"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, Shield, Clock,
  CreditCard, AlertCircle, Check, Loader2, CheckCircle2,
  User, Phone, Sparkles, Flame
} from "lucide-react";

/* ─────────────────────────────────────────────
   Types & Helpers
───────────────────────────────────────────── */
interface BookingWidgetProps {
  car: { id: string; name: string; pricePerDay: number; isAvailable: boolean; };
  bookedDates?: string[];
  initialStart?: string;
  initialEnd?: string;
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];
const parseDate = (str: string) => new Date(str.split("-")[0] as any, (str.split("-")[1] as any) - 1, str.split("-")[2] as any);
const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const isInRange = (date: Date, start: Date, end: Date) => date >= start && date <= end;
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAY_NAMES = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];

/* ─────────────────────────────────────────────
   Dark Theme Calendar Component
───────────────────────────────────────────── */
function Calendar({
  viewYear, viewMonth, onPrev, onNext, startDate, endDate, hoverDate, onDayClick, onDayHover, bookedSet, today
}: any) {
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const rangeEnd = endDate ?? (startDate && hoverDate && hoverDate > startDate ? hoverDate : null);

  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
          <ChevronLeft size={16} className="text-white" />
        </button>
        <span className="text-[14px] font-bold text-white tracking-wide">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={onNext} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
          <ChevronRight size={16} className="text-white" />
        </button>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-white/40 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = new Date(viewYear, viewMonth, i + 1);
          const dateStr = formatDate(day);
          const isPast = day < today && !isSameDay(day, today);
          const isBooked = bookedSet.has(dateStr);
          const isStart = startDate ? isSameDay(day, startDate) : false;
          const isEnd = endDate ? isSameDay(day, endDate) : false;
          const isToday = isSameDay(day, today);
          const inRange = startDate && rangeEnd && !isStart && !isEnd && isInRange(day, startDate, rangeEnd);
          const disabled = isPast || isBooked;

          return (
            <div key={dateStr} className={`relative flex items-center justify-center h-10 ${inRange ? "bg-[#D4AF37]/10" : ""} ${isStart ? "rounded-l-full bg-[#D4AF37]/10" : ""} ${isEnd ? "rounded-r-full bg-[#D4AF37]/10" : ""}`}>
              <button
                disabled={disabled} onClick={() => !disabled && onDayClick(day)} onMouseEnter={() => !disabled && onDayHover(day)} onMouseLeave={() => onDayHover(null)}
                className={`
                  w-9 h-9 rounded-full text-[13px] font-bold transition-all duration-200 relative z-10 flex items-center justify-center
                  ${disabled ? "text-white/20 cursor-not-allowed line-through" 
                    : (isStart || isEnd) ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105" 
                    : inRange ? "text-[#D4AF37] hover:bg-white/10" 
                    : isToday ? "text-white ring-1 ring-[#D4AF37] ring-inset" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"}
                `}
              >
                {i + 1}
                {isBooked && !isPast && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Booking Widget
───────────────────────────────────────────── */
export default function BookingWidget({ car, bookedDates = [], initialStart, initialEnd }: BookingWidgetProps) {
  const router = useRouter();
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);

  const [startDate, setStartDate] = useState<Date | null>(initialStart ? parseDate(initialStart) : null);
  const [endDate, setEndDate] = useState<Date | null>(initialEnd ? parseDate(initialEnd) : null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  
  const [step, setStep] = useState<"idle" | "picking-start" | "picking-end">(initialStart && initialEnd ? "idle" : "picking-start");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
  }, [startDate, endDate]);

  const subtotal = days * car.pricePerDay;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const handleDayClick = (day: Date) => {
    if (step === "picking-start" || (step === "idle" && !endDate)) {
      setStartDate(day); setEndDate(null); setStep("picking-end"); setShowForm(false);
    } else if (step === "picking-end") {
      if (day <= startDate!) { setStartDate(day); setEndDate(null); } 
      else { setEndDate(day); setStep("idle"); }
    } else {
      setStartDate(day); setEndDate(null); setStep("picking-end"); setShowForm(false);
    }
  };

  const handleBook = async () => {
    if (!startDate || !endDate || !firstName || !lastName || !phone) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/public/book", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId: car.id, startDate: formatDate(startDate), endDate: formatDate(endDate), firstName, lastName, phone, totalAmount: total })
      });
      if (!res.ok) { const data = await res.json().catch(() => ({})); throw new Error(data.error || "Erreur de réservation."); }
      setIsSuccess(true);
    } catch (e: any) { setError(e.message || "Une erreur est survenue."); } 
    finally { setLoading(false); }
  };

  /* ── 1. Success UI ── */
  if (isSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="sticky top-28 bg-[#0A0A0A]/90 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-2xl p-8 text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-[#D4AF37] text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Demande Confirmée</h2>
          <p className="text-[14px] text-white/70 font-medium leading-relaxed mb-8">
            Excellente nouvelle, {firstName}. Votre demande a été transmise. Un de nos concierges vous contactera au <b className="text-white">{phone}</b> dans les prochaines minutes.
          </p>
          <button onClick={() => router.push("/")} className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-200 transition-all shadow-lg active:scale-95 w-full uppercase tracking-wider">
            Retour à l'accueil
          </button>
        </div>
      </motion.div>
    );
  }

  /* ── 2. Widget Content ── */
  const widgetContent = (
    <div className="flex flex-col h-full">
      <AnimatePresence mode="popLayout">
        
        {/* State A: Date Selection */}
        {!showForm && (
          <motion.div key="calendar" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            
            {/* Dynamic Price Header & Urgency */}
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[36px] font-black text-white tracking-tighter leading-none">
                  {car.pricePerDay.toLocaleString("fr-MA")}
                </span>
                <span className="text-[13px] font-bold uppercase tracking-widest text-[#D4AF37]">MAD / jour</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-white/60 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5">
                <Flame size={12} className="text-orange-500" /> Forte demande ce mois-ci
              </div>
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setStep("picking-start"); setEndDate(null); }} className={`flex flex-col items-start px-4 py-3 rounded-2xl border transition-colors ${step === "picking-start" ? "bg-white/10 border-[#D4AF37]/50" : "bg-white/5 border-white/5 hover:bg-white/10"}`}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Départ</span>
                <span className={`text-[13px] font-bold ${startDate ? "text-white" : "text-white/40"}`}>
                  {startDate ? startDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "Ajouter date"}
                </span>
              </button>
              <button onClick={() => startDate && setStep("picking-end")} className={`flex flex-col items-start px-4 py-3 rounded-2xl border transition-colors ${step === "picking-end" ? "bg-white/10 border-[#D4AF37]/50" : "bg-white/5 border-white/5 hover:bg-white/10"}`}>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Retour</span>
                <span className={`text-[13px] font-bold ${endDate ? "text-white" : "text-white/40"}`}>
                  {endDate ? endDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "Ajouter date"}
                </span>
              </button>
            </div>

            {/* Calendar */}
            <Calendar viewYear={viewYear} viewMonth={viewMonth} onPrev={prevMonth} onNext={nextMonth} startDate={startDate} endDate={endDate} hoverDate={hoverDate} onDayClick={handleDayClick} onDayHover={setHoverDate} bookedSet={bookedSet} today={today} />

            {/* Price Breakdown */}
            {days > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex justify-between text-[13px] font-medium text-white/70">
                  <span>{car.pricePerDay.toLocaleString("fr-MA")} MAD × {days} jour{days > 1 ? "s" : ""}</span>
                  <span>{subtotal.toLocaleString("fr-MA")} MAD</span>
                </div>
                <div className="flex justify-between text-[13px] font-medium text-white/70">
                  <span>Service Conciergerie (5%)</span>
                  <span>{serviceFee.toLocaleString("fr-MA")} MAD</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center mt-2">
                  <span className="text-[14px] font-bold text-white uppercase tracking-widest">Total</span>
                  <span className="text-[20px] font-bold text-[#D4AF37]">{total.toLocaleString("fr-MA")} MAD</span>
                </div>
              </motion.div>
            )}

            {!car.isAvailable ? (
              <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-[13px] font-medium text-red-200 leading-relaxed">Ce véhicule n'est pas disponible pour le moment.</p>
              </div>
            ) : (
              <button 
                onClick={() => setShowForm(true)} 
                disabled={days === 0}
                className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-wider text-sm py-4 rounded-full hover:bg-white transition-colors disabled:opacity-30 disabled:hover:bg-[#D4AF37] disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 duration-200"
              >
                Réserver ce véhicule
              </button>
            )}
          </motion.div>
        )}

        {/* State B: User Details Form */}
        {showForm && (
          <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft size={16} className="text-white" />
              </button>
              <span className="text-[14px] font-bold text-white">Détails du conducteur</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" className="w-full pl-11 pr-4 py-3.5 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder:text-white/30" />
                </div>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                  <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom" className="w-full pl-11 pr-4 py-3.5 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder:text-white/30" />
                </div>
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Téléphone (+212...)" type="tel" className="w-full pl-11 pr-4 py-3.5 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder:text-white/30" />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-3 text-[13px] font-medium text-red-400 bg-red-950/30 rounded-2xl p-4 border border-red-500/30">
                <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
              </div>
            )}

            <button
              onClick={handleBook} disabled={loading || !firstName || !lastName || !phone}
              className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-wider text-sm py-4 rounded-full hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-95 duration-200"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /> Traitement...</> : <><Check size={18} /> Confirmer • {total.toLocaleString("fr-MA")} MAD</>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Indicators Footer */}
      <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
        {[ { icon: Shield, text: "Assurance Premium incluse" }, { icon: Clock, text: "Annulation gratuite jusqu'à 24h" }, { icon: Sparkles, text: "Préparation clinique du véhicule" } ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-[12px] font-bold text-white/50">
            <Icon size={14} className="text-[#D4AF37]" /> {text}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP WIDGET ── */}
      <div className="hidden lg:block sticky top-28 z-30">
        <div className="bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] p-8 relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          {widgetContent}
        </div>
      </div>

      {/* ── MOBILE STICKY BOTTOM BAR & DRAWER ── */}
      <div className="lg:hidden">
        {/* Floating Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/90 backdrop-blur-2xl border-t border-white/10 px-6 py-4 pb-safe flex items-center justify-between gap-4 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]">
          <div>
            <p className="text-[20px] font-black text-white leading-none tracking-tight">
              {car.pricePerDay.toLocaleString("fr-MA")} <span className="text-[12px] font-bold uppercase tracking-widest text-[#D4AF37]">MAD/j</span>
            </p>
            {days > 0 && <p className="text-[11px] font-bold text-white/60 mt-1 underline decoration-white/20 underline-offset-4">{total.toLocaleString("fr-MA")} MAD total</p>}
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            disabled={!car.isAvailable}
            className="bg-[#D4AF37] text-black font-black uppercase tracking-wider text-xs px-8 py-3.5 rounded-full hover:bg-white transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-95"
          >
            {days > 0 ? "Réserver" : "Voir dates"}
          </button>
        </div>

        {/* Mobile Fullscreen Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-0 z-50 flex flex-col bg-[#050505]">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#050505] sticky top-0 z-10">
                <div>
                  <p className="font-bold text-white text-lg leading-tight">{car.name}</p>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-[#D4AF37]">{car.pricePerDay} MAD / jour</p>
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <User size={20} className="text-white hidden" /> {/* Hidden hack to keep space */}
                  <span className="text-white font-bold">X</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6 bg-[#050505]">
                {widgetContent}
                <div className="h-24" /> {/* Spacer for bottom scroll */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}