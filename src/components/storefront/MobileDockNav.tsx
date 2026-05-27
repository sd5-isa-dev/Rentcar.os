"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Compass, CalendarDays, User, Search } from "lucide-react";
import { getStorefrontMessages, isLocale, type Locale } from "@/lib/i18n";

export default function MobileDockNav({ user }: { user?: { name: string; email: string } | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const langParam = searchParams.get("lang");
  const locale: Locale = isLocale(langParam) ? langParam : "fr";
  const t = getStorefrontMessages(locale);

  const withLocale = (href: string) => {
    const [base, hash] = href.split("#");
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", locale);
    const query = params.toString();
    return `${base}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
  };

  // Reorganized to place a strong primary CTA (Search/Book) in the center
  const items = [
    { href: "/", icon: Home, label: t.nav.home, active: pathname === "/", isAction: false },
    { href: "/#collection", icon: Compass, label: t.nav.explore, active: false, isAction: false },
    { href: "/#search", icon: Search, label: "Réserver", active: false, isAction: true },
    { href: "/reservations", icon: CalendarDays, label: t.nav.trips, active: pathname.includes("reservations"), isAction: false },
    { href: user ? "/profile" : "/client-login", icon: User, label: user ? t.nav.profile : t.nav.account, active: pathname.includes("profile") || pathname.includes("login"), isAction: false },
  ];

  return (
    <div className="md:hidden fixed inset-x-0 bottom-6 z-50 px-4">
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#0A0A0A]/85 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 lux-mesh-bg opacity-35 pointer-events-none" />
        <nav className="relative flex items-center justify-between p-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            
            // Central Elevated Booking Button
            if (item.isAction) {
              return (
                <Link key={item.href} href={withLocale(item.href)} className="relative px-2">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-transform active:scale-95">
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                </Link>
              );
            }

            return (
              <Link key={item.href} href={withLocale(item.href)} className="relative flex-1">
                {/* 44x44px minimum touch target sizing (h-14 w-full = 56px) */}
                <div
                  className={`relative flex h-14 w-full flex-col items-center justify-center gap-1 rounded-[20px] transition-all duration-300 ${
                    item.active ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <AnimatePresence>
                    {item.active && (
                      <motion.div
                        layoutId="mobile-dock-active"
                        className="absolute inset-0 rounded-[20px] bg-white/[0.08]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </AnimatePresence>
                  <Icon className="relative z-10" size={20} strokeWidth={item.active ? 2.5 : 2} />
                  <span className="relative z-10 text-[9px] font-bold uppercase tracking-[0.1em]">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}