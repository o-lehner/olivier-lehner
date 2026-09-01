"use client";
import Link from "next/link";
import { useLang, t } from "@/lib/i18n";

export default function Header() {
  const { lang, setLang } = useLang();
  const tr = (k: keyof typeof t) => t[k][lang];

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 h-[56px] flex items-center justify-between gap-4">
        {/* logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="hidden sm:flex h-7 w-7 items-center justify-center border border-[#27272a] bg-[#18181b] text-[12px] font-bold tracking-tighter group-hover:border-[#8b5cf6]/50 transition-colors">
            OL
          </div>
          <span className="font-mono font-bold tracking-[-0.04em] text-[15px] sm:text-[16px]">
            OLIVIER<span className="text-[#8b5cf6]">_</span>LEHNER
          </span>
          <span className="hidden lg:inline text-[10px] tracking-widest text-zinc-500 border border-[#27272a] px-1.5 py-0.5 ml-1">
            v0.1.0
          </span>
        </Link>

        {/* nav - desktop */}
        <nav className="hidden md:flex items-center gap-1 text-[11px] tracking-widest">
          <Link href="/#apps" className="px-3 py-1.5 hover:text-white text-zinc-400 transition-colors">
            {tr("apps")}
          </Link>
          <span className="text-zinc-700">·</span>
          <a href="#about" className="px-3 py-1.5 hover:text-white text-zinc-400 transition-colors">
            {tr("about")}
          </a>
          <span className="text-zinc-700">·</span>
          <a href="https://github.com" target="_blank" className="px-3 py-1.5 hover:text-white text-zinc-400 transition-colors">
            GITHUB ↗
          </a>
        </nav>

        {/* right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* lang switch */}
          <div className="flex items-center border border-[#27272a] text-[11px] font-mono">
            <button
              onClick={() => setLang("pl")}
              className={`px-2.5 py-1.5 tracking-widest transition-colors ${
                lang === "pl" ? "bg-[#8b5cf6] text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-[#18181b]"
              }`}
            >
              PL
            </button>
            <div className="w-px h-4 bg-[#27272a]" />
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1.5 tracking-widest transition-colors ${
                lang === "en" ? "bg-[#8b5cf6] text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-[#18181b]"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(tr("donatePlaceholder"));
            }}
            className="hidden sm:inline-flex items-center gap-2 border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-3 sm:px-4 py-1.5 text-[11px] tracking-widest font-bold text-[#a78bfa] hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] transition-colors"
          >
            <span className="hidden sm:inline">♥</span> {tr("donate")}
          </a>
        </div>
      </div>
    </header>
  );
}
