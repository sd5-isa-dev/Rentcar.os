"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function ClientAuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Simulate redirect after success
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex">
      
      {/* ── Left Side: Form Section ── */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-white">
        
        {/* Top Nav */}
        <div className="p-6 md:p-10 flex justify-between items-center">
          <Link href="/" className="w-10 h-10 bg-[#FAFAFA] rounded-full flex items-center justify-center text-[#0A0A0A] hover:bg-black/5 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0A0A0A] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <span className="font-bold text-[#0A0A0A] tracking-tight">RentCar-OS</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 md:px-24 xl:px-32 pb-20">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-md mx-auto"
              >
                <div className="mb-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] tracking-tight mb-3">
                    {isLogin ? "Bon retour." : "Rejoignez l'élite."}
                  </h1>
                  <p className="text-sm font-medium text-[#888]">
                    {isLogin 
                      ? "Connectez-vous pour gérer vos réservations et vos préférences." 
                      : "Créez un compte pour accéder à notre flotte de véhicules premium."}
                  </p>
                </div>

                {/* Social Login Options */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-[16px] border border-black/[0.06] hover:bg-[#FAFAFA] transition-colors text-sm font-bold text-[#0A0A0A]">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-[16px] border border-black/[0.06] hover:bg-[#FAFAFA] transition-colors text-sm font-bold text-[#0A0A0A]">
                    <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="Github" className="w-4 h-4 opacity-70" />
                    Apple
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-black/[0.04]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#aaa]">ou</span>
                  <div className="flex-1 h-px bg-black/[0.04]" />
                </div>

                {/* Authentication Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {!isLogin && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                      <input 
                        type="text" required value={name} onChange={e => setName(e.target.value)}
                        placeholder="Nom complet" 
                        className="w-full pl-12 pr-4 py-4 bg-[#FAFAFA] border border-black/[0.04] rounded-[16px] text-sm font-bold text-[#0A0A0A] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                      />
                    </motion.div>
                  )}

                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                    <input 
                      type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="Adresse email" 
                      className="w-full pl-12 pr-4 py-4 bg-[#FAFAFA] border border-black/[0.04] rounded-[16px] text-sm font-bold text-[#0A0A0A] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                    <input 
                      type="password" required value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Mot de passe" 
                      className="w-full pl-12 pr-4 py-4 bg-[#FAFAFA] border border-black/[0.04] rounded-[16px] text-sm font-bold text-[#0A0A0A] outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                    />
                  </div>

                  {isLogin && (
                    <div className="flex justify-end pt-1">
                      <button type="button" className="text-xs font-bold text-[#888] hover:text-[#0A0A0A] transition-colors">
                        Mot de passe oublié ?
                      </button>
                    </div>
                  )}

                  <button 
                    type="submit" disabled={loading}
                    className="w-full bg-[#0A0A0A] text-white py-4 rounded-[16px] text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#222] transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : (
                      <>
                        {isLogin ? "Se connecter" : "Créer mon compte"}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                {/* Toggle Login/Register */}
                <p className="text-center text-sm font-medium text-[#888] mt-8">
                  {isLogin ? "Nouveau sur RentCar-OS ?" : "Vous avez déjà un compte ?"}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 font-bold text-[#0A0A0A] hover:underline underline-offset-4"
                  >
                    {isLogin ? "Créer un compte" : "Se connecter"}
                  </button>
                </p>

              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto text-center py-20"
              >
                <div className="w-20 h-20 bg-[#0A0A0A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A] tracking-tight mb-2">Authentification réussie</h2>
                <p className="text-sm font-medium text-[#888]">Redirection vers votre espace...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right Side: Cinematic Image ── */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#0A0A0A] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Porsche"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Floating Glass Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-20 left-16 right-16"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-10">
            <p className="text-2xl font-bold text-white leading-tight mb-4 tracking-tight">
              "La perfection n'est pas un détail, c'est l'essence même de chaque voyage."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-white text-sm font-bold">
                RC
              </div>
              <div>
                <p className="text-sm font-bold text-white">RentCar-OS Premium</p>
                <p className="text-xs font-medium text-white/50">Service Conciergerie</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}