"use client";
import Link from "next/link";
import { useLang, t } from "@/lib/i18n";

export default function Header() {
  const { lang, setLang } = useLang();
  const tr = (k: keyof typeof t) => t[k][lang];

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6 h-[64px] sm:h-[72px] flex items-center justify-between gap-4">
        {/* logo - large, no nav */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <span className="font-mono font-bold tracking-[-0.06em] text-[20px] sm:text-[26px] lg:text-[28px] leading-none">
            OLIVIER<span className="text-[#8b5cf6]">_</span>LEHNER
          </span>
        </Link>

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
            className="inline-flex items-center gap-2 bg-white text-black border border-white px-4 py-2 text-[11px] tracking-widest font-mono font-bold hover:bg-zinc-100 transition-colors rounded-[6px]"
          >
            {tr("donate")}
          </a>
        </div>
      </div>
    </header>
  );
}
