import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";

// The correct import based on your tsconfig.json mapping!
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentCar-OSAdmin — Gestion de Location",
  description: "Plateforme d'administration interne — RentCar-OSCar Rental",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans bg-[#0d1117] text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}