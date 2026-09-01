export type AppCategory = "macos" | "web";

export type AppEntry = {
  slug: string;
  icon: string; // emoji or char
  name: string;
  category: AppCategory;
  version: string;
  size: string;
  os: string;
  downloadUrl?: string;
  websiteUrl?: string;
  githubUrl?: string;
  description: { pl: string; en: string };
  longDescription: { pl: string; en: string };
  screenshots: string[]; // placeholder ids
  steps: { pl: string[]; en: string[] };
  features: { pl: string[]; en: string[] };
  updatedAt: string;
};

export const apps: AppEntry[] = [
  {
    slug: "szybki-zapis",
    icon: "◐",
    name: "SzybkiZapis",
    category: "macos",
    version: "1.2.0",
    size: "8.4 MB",
    os: "macOS 13+",
    downloadUrl: "#",
    githubUrl: "#",
    description: {
      pl: "Notatki głosowe → tekst w 1 klik. Transkrypcja lokalnie, bez wysyłania w chmurę.",
      en: "Voice notes → text in 1 click. Local transcription, no cloud needed.",
    },
    longDescription: {
      pl: "SzybkiZapis to minimalistyczna apka na Maca która zamienia nagrania głosowe na tekst. Klikasz skrót, mówisz, tekst ląduje w schowku. Działa offline (Whisper.cpp), wspiera PL/EN, automatycznie usuwa ciszę i filler words.",
      en: "SzybkiZapis is a minimal Mac app that turns voice notes into text. Hit the shortcut, speak, text goes to clipboard. Works offline (Whisper.cpp), supports PL/EN, auto-removes silence and fillers.",
    },
    screenshots: ["1", "2", "3"],
    steps: {
      pl: [
        "Pobierz .dmg i przeciągnij do /Applications",
        "Nadaj uprawnienia do mikrofonu w Ustawieniach",
        "Ustaw skrót np. ⌥ + Space i mów — tekst w schowku",
      ],
      en: [
        "Download .dmg and drag to /Applications",
        "Grant microphone permission in Settings",
        "Set shortcut e.g. ⌥ + Space and speak — text to clipboard",
      ],
    },
    features: {
      pl: ["Offline Whisper", "Schowek + auto-wklej", "PL/EN", "Usuwanie ciszy"],
      en: ["Offline Whisper", "Clipboard + auto-paste", "PL/EN", "Silence removal"],
    },
    updatedAt: "2026-08-28",
  },
  {
    slug: "merge-pro",
    icon: "⬢",
    name: "MergePro",
    category: "macos",
    version: "0.9.4",
    size: "12.1 MB",
    os: "macOS 14+",
    downloadUrl: "#",
    description: {
      pl: "Łączy PDF-y, zdjęcia i skany w jeden plik. Drag & drop, sortowanie, OCR.",
      en: "Merge PDFs, images and scans into one file. Drag & drop, sorting, OCR.",
    },
    longDescription: {
      pl: "MergePro powstał bo Preview jest wolny i brzydki. Wrzucasz pliki, układasz miniatury, klikasz MERGE. Do tego OCR (polskie znaki), kompresja i szyfrowanie hasłem. Wszystko lokalnie.",
      en: "MergePro was built because Preview is slow and ugly. Drop files, reorder thumbnails, hit MERGE. Plus OCR (Polish chars), compression and password encryption. All local.",
    },
    screenshots: ["1", "2"],
    steps: {
      pl: [
        "Pobierz i uruchom — nie wymaga instalacji",
        "Przeciągnij PDF/JPG/PNG na okno",
        "Ułóż kolejność, wybierz [MERGE] → gotowe w ~/Downloads",
      ],
      en: [
        "Download and run — no install needed",
        "Drag PDF/JPG/PNG onto window",
        "Reorder, hit [MERGE] → done in ~/Downloads",
      ],
    },
    features: {
      pl: ["PDF + JPG + PNG", "OCR PL", "Szyfrowanie", "Kompresja"],
      en: ["PDF + JPG + PNG", "OCR PL", "Encryption", "Compression"],
    },
    updatedAt: "2026-08-15",
  },
  {
    slug: "katalog-stron",
    icon: "▦",
    name: "Katalog Stron",
    category: "web",
    version: "live",
    size: "—",
    os: "Web",
    websiteUrl: "https://example.com",
    githubUrl: "#",
    description: {
      pl: "Moje strony i narzędzia webowe — wszystkie w jednym miejscu. Podgląd live + kod.",
      en: "My websites & web tools — all in one place. Live preview + source.",
    },
    longDescription: {
      pl: "Prosty katalog moich projektów webowych. Każda strona ma opis, stack (Next.js / Astro / Tailwind) i link do wersji live + GitHub. Aktualizowane na bieżąco — jak zrobię nową stronę, ląduje tu.",
      en: "Simple catalog of my web projects. Each site has a description, stack (Next.js / Astro / Tailwind) and live + GitHub links. Updated continuously — new site = new entry here.",
    },
    screenshots: ["1", "2", "3", "4"],
    steps: {
      pl: [
        "Wejdź na stronę główną katalogu",
        "Wybierz projekt i kliknij [OTWÓRZ]",
        "Przeglądaj kod na GitHubie jeśli chcesz forknąć",
      ],
      en: [
        "Open the catalog homepage",
        "Pick a project and hit [OPEN]",
        "Browse code on GitHub if you want to fork",
      ],
    },
    features: {
      pl: ["Next.js", "Live preview", "Open source", "Responsywne"],
      en: ["Next.js", "Live preview", "Open source", "Responsive"],
    },
    updatedAt: "2026-09-01",
  },
];

export function getAppBySlug(slug: string) {
  return apps.find((a) => a.slug === slug);
}
