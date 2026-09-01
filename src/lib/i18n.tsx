"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "pl" | "en";

type Dict = Record<string, { pl: string; en: string }>;

export const t = {
  apps: { pl: "APLIKACJE", en: "APPS" },
  about: { pl: "O MNIE", en: "ABOUT" },
  contact: { pl: "KONTAKT", en: "CONTACT" },
  donate: { pl: "WESPRZYJ", en: "DONATE" },
  heroTitle: {
    pl: "Aplikacje które\noszczędzają czas.",
    en: "Apps that\nsave time.",
  },
  heroSub: {
    pl: "Narzędzia na macOS i web które sam chciałem mieć. Surowe, szybkie, bez subskrypcji. Pobierz i używaj.",
    en: "macOS & web tools I wanted for myself. Raw, fast, no subscriptions. Download and go.",
  },
  allApps: { pl: "Wszystkie aplikacje", en: "All apps" },
  count: { pl: "3 aplikacje", en: "3 apps" },
  filterAll: { pl: "Wszystkie", en: "All" },
  filterMac: { pl: "macOS", en: "macOS" },
  filterWeb: { pl: "Web", en: "Web" },
  download: { pl: "POBIERZ", en: "DOWNLOAD" },
  openSite: { pl: "OTWÓRZ STRONĘ", en: "OPEN SITE" },
  details: { pl: "SZCZEGÓŁY", en: "DETAILS" },
  back: { pl: "← WRÓĆ", en: "← BACK" },
  screenshots: { pl: "SCREENSHOTY", en: "SCREENSHOTS" },
  howItWorks: { pl: "JAK TO DZIAŁA", en: "HOW IT WORKS" },
  features: { pl: "FUNKCJE", en: "FEATURES" },
  info: { pl: "INFO", en: "INFO" },
  version: { pl: "Wersja", en: "Version" },
  size: { pl: "Rozmiar", en: "Size" },
  system: { pl: "System", en: "System" },
  updated: { pl: "Aktualizacja", en: "Updated" },
  footer: {
    pl: "Zrobione w PL. Surowe jak opencode.ai — mono, bordery, bez zaokrągleń.",
    en: "Made in PL. Raw like opencode.ai — mono, borders, no radius.",
  },
  donatePlaceholder: {
    pl: "Link do dotacji — podmień w kodzie",
    en: "Donate link — replace in code",
  },
} satisfies Dict;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pl",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pl");
  useEffect(() => {
    const saved = localStorage.getItem("olivier-lang") as Lang | null;
    if (saved === "pl" || saved === "en") setLang(saved);
    else {
      const nav = navigator.language.toLowerCase();
      if (nav.startsWith("en")) setLang("en");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("olivier-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

export function useT() {
  const { lang } = useLang();
  return (key: keyof typeof t) => t[key][lang];
}
