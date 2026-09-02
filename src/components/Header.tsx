"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLang, t } from "@/lib/i18n";

export default function Header() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const tr = (k: keyof typeof t) => t[k][lang];
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur">
      <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-10 h-[72px] sm:h-[80px] flex items-center justify-between gap-4">
        {/* logo - pixel art (inspired by Piskel, fixed size/padding) */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-pixel.png"
            alt="OLIVIER LEHNER"
            width={263}
            height={24}
            className="h-[16px] sm:h-[20px] lg:h-[24px] w-auto object-contain select-none"
            style={{ imageRendering: "pixelated" }}
            draggable={false}
          />
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

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-black border border-white px-4 py-2 text-[11px] tracking-widest font-mono font-bold hover:bg-zinc-100 transition-colors rounded-[6px]"
          >
            {tr("donate")}
          </button>
        </div>
      </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[520px] max-h-[90vh] overflow-auto border border-[#27272a] bg-[#0f0f10] rounded-[12px] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#27272a] bg-[#18181b] px-4 py-3">
              <span className="text-[11px] font-mono tracking-widest text-zinc-400">
                {lang === "pl" ? "WESPRZYJ — WYBIERZ METODĘ" : "SUPPORT — CHOOSE METHOD"}
              </span>
              <button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white text-[18px] leading-none px-1">
                ×
              </button>
            </div>
            <div className="grid gap-3 p-4">
              {/* Stripe — ikony tylko */}
              <a
                href="https://donate.stripe.com/8x25kDdyA72LdWo7SEao800"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-3 border border-[#27272a] bg-[#09090b] hover:border-[#8b5cf6]/40 hover:bg-[#18181b] py-6 px-4 transition-colors group"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                  {/* Apple Pay */}
                  <span className="inline-flex items-center justify-center rounded-[6px] bg-white px-3 py-1.5 h-[28px]">
                    <span className="text-[13px] font-bold tracking-tight text-black leading-none"> Pay</span>
                  </span>
                  {/* Google Pay */}
                  <span className="inline-flex items-center justify-center rounded-[6px] bg-white px-3 py-1.5 h-[28px] gap-0.5">
                    <span className="text-[13px] font-bold tracking-tight leading-none">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]"> </span>
                      <span className="text-black">Pay</span>
                    </span>
                  </span>
                  {/* BLIK */}
                  <span className="inline-flex items-center justify-center rounded-[6px] bg-white px-3 py-1.5 h-[28px]">
                    <span className="text-[11px] font-black tracking-tighter text-black leading-none">BLIK</span>
                  </span>
                  {/* Karta */}
                  <span className="inline-flex items-center justify-center rounded-[6px] bg-white px-2.5 py-1.5 h-[28px] w-[44px]">
                    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="shrink-0">
                      <rect x="0.5" y="0.5" width="19" height="13" rx="2" stroke="black" strokeOpacity="0.2" />
                      <rect x="1" y="4" width="18" height="2.5" fill="black" />
                      <rect x="2" y="9" width="4" height="2" rx="0.5" fill="black" fillOpacity="0.15" />
                    </svg>
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-600 group-hover:text-zinc-400">STRIPE</span>
              </a>
              {/* PayPal — ikona tylko */}
              <a
                href="https://paypal.me/OlivierLehner2006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 border border-[#27272a] bg-[#09090b] hover:border-[#8b5cf6]/40 hover:bg-[#18181b] py-5 px-4 transition-colors group"
              >
                <span className="inline-flex items-center justify-center rounded-[6px] bg-white px-4 py-1.5 h-[28px]">
                  <span className="text-[14px] font-bold italic tracking-tight leading-none">
                    <span className="text-[#003087]">Pay</span>
                    <span className="text-[#009CDE]">Pal</span>
                  </span>
                </span>
              </a>
              <p className="text-[10px] font-mono leading-relaxed text-zinc-600 px-1 text-center">
                {lang === "pl" ? "Dzięki za wsparcie! c:" : "Thanks for your support! c:"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
