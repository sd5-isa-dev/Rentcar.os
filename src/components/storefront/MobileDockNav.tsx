"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Compass, CalendarDays, User, Sparkles } from "lucide-react";
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

  const items = [
    { href: "/", icon: Home, label: t.nav.home, active: pathname === "/" },
    { href: "/#collection", icon: Compass, label: t.nav.explore, active: false },
    { href: "/reservations", icon: CalendarDays, label: t.nav.trips, active: pathname.includes("reservations") },
    { href: user ? "/profile" : "/client-login", icon: User, label: user ? t.nav.profile : t.nav.account, active: pathname.includes("profile") || pathname.includes("login") },
  ];

  return (
    <>
      <div className="md:hidden fixed inset-x-0 bottom-4 z-50 px-4">
        <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-[#0A0A0A]/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="absolute inset-0 lux-mesh-bg opacity-35" />
          <nav className="relative grid grid-cols-4 gap-1 p-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={withLocale(item.href)} className="relative">
                  <div
                    className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 transition-all duration-300 ${
                      item.active ? "text-white" : "text-white/50"
                    }`}
                  >
                    <AnimatePresence>
                      {item.active && (
                        <motion.div
                          layoutId="mobile-dock-active"
                          className="absolute inset-0 rounded-2xl border border-white/15 bg-white/[0.08]"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                    </AnimatePresence>
                    <Icon className="relative z-10" size={18} strokeWidth={item.active ? 2.2 : 1.8} />
                    <span className="relative z-10 text-[9px] font-semibold uppercase tracking-[0.18em]">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="md:hidden fixed inset-x-4 bottom-[108px] z-40">
        <Link href={withLocale('/#collection')} className="group flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white text-[#090909] px-5 py-3.5 shadow-[0_14px_30px_rgba(255,255,255,0.18)]">
          <Sparkles size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]">{t.nav.explore}</span>
        </Link>
      </div>
    </>
  );
}
