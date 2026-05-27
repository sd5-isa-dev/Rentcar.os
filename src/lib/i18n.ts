export const SUPPORTED_LOCALES = ["fr", "en", "ar"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES: Locale[] = ["ar"];

export function isLocale(value?: string | null): value is Locale {
  if (!value) return false;
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
}

export const storefrontMessages = {
  fr: {
    nav: {
      collection: "La Collection",
      services: "Services VIP",
      experience: "L'Expérience",
      home: "Accueil",
      explore: "Explorer",
      trips: "Voyages",
      profile: "Profil",
      account: "Compte",
      clientArea: "Espace Client",
    },
  },
  en: {
    nav: {
      collection: "Collection",
      services: "VIP Services",
      experience: "Experience",
      home: "Home",
      explore: "Explore",
      trips: "Trips",
      profile: "Profile",
      account: "Account",
      clientArea: "Client Area",
    },
  },
  ar: {
    nav: {
      collection: "المجموعة",
      services: "خدمات كبار الشخصيات",
      experience: "التجربة",
      home: "الرئيسية",
      explore: "استكشاف",
      trips: "رحلات",
      profile: "الملف الشخصي",
      account: "الحساب",
      clientArea: "مساحة العميل",
    },
  },
} as const;

export function getStorefrontMessages(locale: Locale) {
  return storefrontMessages[locale];
}
