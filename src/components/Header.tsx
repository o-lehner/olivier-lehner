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

          <div className="relative group/kot">
            <button
              onClick={() => setOpen(true)}
              className="relative z-10 inline-flex items-center gap-2 bg-white text-black border border-white px-4 py-2 text-[11px] tracking-widest font-mono font-bold rounded-[6px] shadow-[0_0_14px_rgba(139,92,246,0.35),0_0_0_1px_rgba(139,92,246,0.25)] ring-1 ring-[#8b5cf6]/20 animate-[donateGlow_2.2s_ease-in-out_infinite] hover:bg-zinc-100 hover:shadow-[0_0_20px_rgba(139,92,246,0.5),0_0_0_1px_rgba(139,92,246,0.4)] hover:ring-[#8b5cf6]/30 transition-all group-hover/kot:bg-zinc-100 group-hover/kot:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            >
              {tr("donate")}
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kot.png"
              alt=""
              width={56}
              height={56}
              draggable={false}
              className="absolute -top-[30px] -right-[18px] sm:-right-[20px] w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] object-contain pointer-events-none select-none z-20 drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)] animate-[kotBeg_2.8s_ease-in-out_infinite] group-hover/kot:animate-none group-hover/kot:scale-110 group-hover/kot:rotate-[8deg] group-hover/kot:-translate-y-0.5 transition-transform duration-200"
            />
          </div>
          <style>{`@keyframes kotBeg { 0%,72%,100% { transform: translateY(0) rotate(0deg) } 76% { transform: translateY(-2px) rotate(-4deg) } 80% { transform: translateY(-2px) rotate(4deg) } 84% { transform: translateY(0) rotate(-2deg) } } @keyframes donateGlow { 0%,100% { box-shadow: 0 0 14px rgba(139,92,246,0.35), 0 0 0 1px rgba(139,92,246,0.25) } 50% { box-shadow: 0 0 22px rgba(139,92,246,0.55), 0 0 0 1px rgba(139,92,246,0.4) } }`}</style>
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
            <div className="grid gap-2.5 p-3">
              {/* Stripe — ikony tylko */}
              <a
                href="https://donate.stripe.com/8x25kDdyA72LdWo7SEao800"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center border border-[#27272a] bg-[#09090b] hover:border-[#8b5cf6]/40 hover:bg-[#18181b] py-5 px-3 transition-colors group"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap w-full">
                  {/* Apple Pay */}
                  <span className="inline-flex items-center justify-center rounded-[10px] bg-white px-5 py-2 h-[46px] flex-1 min-w-[92px] max-w-[120px]">
                    <span className="text-[18px] font-bold tracking-tight text-black leading-none"> Pay</span>
                  </span>
                  {/* Google Pay */}
                  <span className="inline-flex items-center justify-center rounded-[10px] bg-white px-5 py-2 h-[46px] flex-1 min-w-[92px] max-w-[120px] gap-0.5">
                    <span className="text-[18px] font-bold tracking-tight leading-none">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-black"> Pay</span>
                    </span>
                  </span>
                  {/* BLIK */}
                  <span className="inline-flex items-center justify-center rounded-[10px] bg-white px-5 py-2 h-[46px] flex-1 min-w-[92px] max-w-[120px]">
                    <span className="text-[16px] font-black tracking-tighter text-black leading-none">BLIK</span>
                  </span>
                  {/* Karta */}
                  <span className="inline-flex items-center justify-center rounded-[10px] bg-white px-4 py-2 h-[46px] flex-1 min-w-[92px] max-w-[120px]">
                    <svg width="28" height="18" viewBox="0 0 20 14" fill="none" className="shrink-0">
                      <rect x="0.5" y="0.5" width="19" height="13" rx="2" stroke="black" strokeOpacity="0.15" />
                      <rect x="1" y="4.5" width="18" height="3" fill="black" />
                      <rect x="2.5" y="9.8" width="6" height="3" rx="0.7" fill="black" fillOpacity="0.12" />
                    </svg>
                  </span>
                </div>
              </a>
              {/* PayPal — ikona tylko */}
              <a
                href="https://paypal.me/OlivierLehner2006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center border border-[#27272a] bg-[#09090b] hover:border-[#8b5cf6]/40 hover:bg-[#18181b] py-5 px-3 transition-colors group"
              >
                <span className="inline-flex items-center justify-center rounded-[10px] bg-white px-8 py-2 h-[46px] w-full max-w-[260px]">
                  <span className="text-[18px] font-bold italic tracking-tight leading-none">
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
