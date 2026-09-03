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
    en: "Apps that\nsave your time.",
  },
  heroSub: {
    pl: "Narzędzia na macOS i web które sam chciałem mieć. Surowe, szybkie, bez subskrypcji. Pobierz i używaj.",
    en: "macOS & web tools I wanted for myself. Raw, fast, no subscriptions. Download and go.",
  },
  allApps: { pl: "Wszystkie aplikacje", en: "All apps" },
  count: { pl: "2 aplikacje", en: "2 apps" },
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
  feedbackTitle: { pl: "FEEDBACK", en: "FEEDBACK" },
  feedbackHeading: { pl: "Masz pomysł albo znalazłeś błąd?", en: "Got an idea or found a bug?" },
  feedbackDesc: {
    pl: "Napisz co dodać, co poprawić, co nie działa. Czytam wszystko i odpisuję jeśli zostawisz kontakt.",
    en: "Tell me what to add, fix, or improve. I read everything and reply if you leave contact.",
  },
  feedbackTypeLabel: { pl: "TYP", en: "TYPE" },
  feedbackTypeFeature: { pl: "Pomysł", en: "Feature" },
  feedbackTypeBug: { pl: "Błąd", en: "Bug" },
  feedbackTypeOther: { pl: "Inne", en: "Other" },
  feedbackMessageLabel: { pl: "WIADOMOŚĆ", en: "MESSAGE" },
  feedbackPlaceholder: {
    pl: "Np. fajnie byłoby gdyby REMO miało... / nie działa mi...",
    en: "E.g. it would be cool if REMO had... / doesn't work when...",
  },
  feedbackContactLabel: { pl: "KONTAKT (opcjonalnie)", en: "CONTACT (optional)" },
  feedbackContactPlaceholder: {
    pl: "email lub @github — jeśli chcesz odpowiedź",
    en: "email or @github — if you want a reply",
  },
  feedbackSubmit: { pl: "WYŚLIJ FEEDBACK →", en: "SEND FEEDBACK →" },
  feedbackSending: { pl: "WYSYŁANIE…", en: "SENDING…" },
  feedbackSuccessTitle: { pl: "Dzięki! 🙏", en: "Thanks! 🙏" },
  feedbackSuccessDesc: {
    pl: "Dostałem feedback. Sprawdzę i dam znać jeśli zostawiłeś kontakt.",
    en: "Got it. I'll check it out and reply if you left contact.",
  },
  feedbackError: {
    pl: "Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio.",
    en: "Something went wrong. Try again or write directly.",
  },
  feedbackValidation: {
    pl: "Napisz co najmniej 10 znaków.",
    en: "Please write at least 10 characters.",
  },
  feedbackVia: { pl: "lub napisz bezpośrednio:", en: "or write directly:" },
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
