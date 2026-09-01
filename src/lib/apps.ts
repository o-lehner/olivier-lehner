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
    slug: "remo",
    icon: "◩",
    name: "REMO",
    category: "macos",
    version: "1.1",
    size: "2.1 MB",
    os: "macOS 14+",
    downloadUrl: "/downloads/Remo.dmg",
    description: {
      pl: "Aplikacja typu sticky notes — rozbudowana, z sortowaniem i wygodnym układaniem na ekranie. Mocno personalizowana i bardzo ładna.",
      en: "Feature-rich sticky notes — sort, arrange and personalize freely on screen. Beautiful and powerful.",
    },
    longDescription: {
      pl: "Aplikacja typu sticky notes — rozbudowana, z sortowaniem i wygodnym układaniem na ekranie. Mocno personalizowana i bardzo ładna. Formatowanie tekstu, kolorowe karteczki, pływające okna zawsze na wierzchu.",
      en: "Feature-rich sticky notes — sort, arrange and personalize freely on screen. Beautiful and powerful. Rich text, colorful cards, floating windows always on top.",
    },
    screenshots: ["1", "2", "3"],
    steps: {
      pl: [
        "Pobierz REMO.dmg i przeciągnij Remo.app do /Applications",
        "Uruchom Remo — kliknij + lub Cmd+N aby dodać notatkę",
        "Kliknij ↗ przy notatce aby przypiąć pływające okno na wierzch",
      ],
      en: [
        "Download REMO.dmg and drag Remo.app to /Applications",
        "Launch Remo — click + or Cmd+N to add a note",
        "Click ↗ on a note to pin a floating window on top",
      ],
    },
    features: {
      pl: ["Sticky notes", "Rich text", "Kolorowe karteczki", "Pływające okna"],
      en: ["Sticky notes", "Rich text", "Colorful cards", "Floating windows"],
    },
    updatedAt: "2026-09-01",
  },
];

export function getAppBySlug(slug: string) {
  return apps.find((a) => a.slug === slug);
}
