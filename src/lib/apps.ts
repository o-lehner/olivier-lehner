export type AppCategory = "macos" | "web";

export type AppEntry = {
  slug: string;
  icon: string; // emoji or /icons/xxx.png
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
    icon: "/icons/remo.png",
    name: "REMO",
    category: "macos",
    version: "1.1",
    size: "2.1 MB",
    os: "macOS 14+",
    downloadUrl: "/downloads/Remo.dmg",
    description: {
      pl: "remo to sticky notes, tylko trochę bardziej rozbudowane. możesz dowolnie zmieniać wygląd notatek, kolory, zwijać je, przypinać, sortować i ogólnie urządzić je tak, jak ci wygodnie. prosta apka do zapisywania wszystkiego, co może ci wylecieć z głowy.",
      en: "remo is sticky notes, just a bit more fleshed out. you can change how notes look, colors, collapse them, pin, sort and just set them up however you want. simple app for saving everything that might slip your mind.",
    },
    longDescription: {
      pl: "remo to sticky notes, tylko trochę bardziej rozbudowane. możesz dowolnie zmieniać wygląd notatek, kolory, zwijać je, przypinać, sortować i ogólnie urządzić je tak, jak ci wygodnie. prosta apka do zapisywania wszystkiego, co może ci wylecieć z głowy.",
      en: "remo is sticky notes, just a bit more fleshed out. you can change how notes look, colors, collapse them, pin, sort and just set them up however you want. simple app for saving everything that might slip your mind.",
    },
    screenshots: ["/screenshots/remo/1.jpg", "/screenshots/remo/2.jpg", "/screenshots/remo/3.jpg", "/screenshots/remo/4.jpg", "/screenshots/remo/5.jpg"],
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
