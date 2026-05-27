import type { Metadata } from "next";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import SmoothScrollProvider from "@/components/storefront/SmoothScrollProvider";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "RentCar-OS — L'Excellence Automobile",
  description: "La Collection Privée. Louez des véhicules premium avec une expérience digitale sans compromis.",
};

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The "dark" class forces our Tailwind dark-mode UI. 
    // RTL will naturally flip layouts using Tailwind's "start/end" utilities.
    <div className="dark min-h-screen flex flex-col bg-[#000000] text-white font-sans selection:bg-white/20 selection:text-[#0A0A0A] overflow-x-hidden">
      <SmoothScrollProvider>
        
        {/* ── Glassmorphic Navbar & Mobile App Bar ── */}
        <Navbar />

        {/* ── Main Content Area ── */}
        {/* pb-24 ensures content isn't blocked by the mobile native app bar */}
        <main className="flex-1 flex flex-col relative pb-24 md:pb-0">
          {children}
        </main>

        {/* ── Premium Footer ── */}
        <Footer />
        
      </SmoothScrollProvider>
    </div>
  );
}