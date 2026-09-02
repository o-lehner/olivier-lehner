"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAppBySlug } from "@/lib/apps";
import { useLang, t } from "@/lib/i18n";

export default function AppDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const tr = (k: keyof typeof t) => t[k][lang];
  const app = getAppBySlug(slug);
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => {
    if (lightbox === null || !app) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? v : (v - 1 + app.screenshots.length) % app.screenshots.length));
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : (v + 1) % app.screenshots.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, app]);

  if (!app) {
    return (
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 py-16 text-center">
        <p className="font-mono text-sm text-zinc-500">404 — nie znaleziono apki / app not found</p>
        <Link href="/" className="mt-4 inline-block border border-[#27272a] px-4 py-2 text-xs tracking-widest hover:bg-[#18181b]">
          {tr("back")}
        </Link>
      </div>
    );
  }

  const primaryAction = app.downloadUrl ? { label: tr("download"), href: app.downloadUrl } : app.websiteUrl ? { label: tr("openSite"), href: app.websiteUrl } : null;

  return (
    <main className="mx-auto max-w-[900px] px-4 sm:px-6 py-6 sm:py-8">
      <Link href="/#apps" className="inline-flex items-center gap-2 text-[11px] tracking-widest font-mono text-zinc-500 hover:text-white transition-colors mb-6">
        {tr("back")}
      </Link>

      {/* minimal header: icon + name + short desc + pobierz */}
      <div className="border border-[#27272a] bg-[#0f0f10] p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-[14px] sm:rounded-[16px] bg-[#18181b] flex items-center justify-center overflow-hidden text-[24px] shadow-[0_6px_18px_rgba(0,0,0,0.45),0_1px_6px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-white/[0.07] ring-inset">
            {app.icon.startsWith("/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={app.icon} alt={app.name} className="h-full w-full object-cover rounded-[inherit]" />
            ) : (
              app.icon
            )}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.09] via-white/[0.02] to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]" />
          </div>
          <div className="min-w-0">
            <h1 className="font-mono font-bold text-[20px] sm:text-[22px] tracking-tight">{app.name}</h1>
            <p className="mt-1 text-[13px] leading-5 text-zinc-400 font-mono">{app.description[lang]}</p>
          </div>
        </div>
        {primaryAction && (
          <a
            href={primaryAction.href}
            target={primaryAction.href === "#" ? undefined : "_blank"}
            onClick={(e) => {
              if (primaryAction.href === "#") {
                e.preventDefault();
                alert(lang === "pl" ? "Podmień link w src/lib/apps.ts → downloadUrl" : "Replace link in src/lib/apps.ts → downloadUrl");
              }
            }}
            className="mt-5 inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-[11px] tracking-widest font-mono font-bold hover:bg-zinc-100 transition-colors rounded-[6px]"
          >
            {primaryAction.label} ↓
          </a>
        )}
      </div>

      {/* screenshots - uniform + lightbox scroll */}
      <section className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-mono font-bold tracking-widest text-[11px] text-zinc-300">{tr("screenshots")}</h2>
          <span className="h-px flex-1 bg-[#27272a]" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {app.screenshots.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setLightbox(i)}
              className="group border border-[#27272a] bg-[#0f0f10] hover:border-[#8b5cf6]/40 overflow-hidden text-left focus:outline-none focus:border-[#8b5cf6]/60"
            >
              <div className="aspect-[16/10] bg-[#18181b] flex items-center justify-center overflow-hidden p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${app.name} screenshot ${i + 1}`} className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-300" loading="lazy" />
              </div>
            </button>
          ))}
        </div>
      </section>
      {/* lightbox - przewijanie w tym samym oknie */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" onClick={() => setLightbox(null)}>
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 h-9 w-9 rounded-full bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white hover:border-zinc-600 flex items-center justify-center text-[18px] leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v === null ? v : (v - 1 + app.screenshots.length) % app.screenshots.length));
            }}
            className="absolute left-2 sm:left-4 z-10 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#18181b] border border-[#27272a] text-zinc-300 hover:text-white hover:border-zinc-600 flex items-center justify-center text-[18px]"
            aria-label="Prev"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v === null ? v : (v + 1) % app.screenshots.length));
            }}
            className="absolute right-2 sm:right-4 z-10 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#18181b] border border-[#27272a] text-zinc-300 hover:text-white hover:border-zinc-600 flex items-center justify-center text-[18px]"
            aria-label="Next"
          >
            ›
          </button>
          <div className="relative max-h-[85vh] max-w-[92vw] sm:max-w-[88vw] flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={app.screenshots[lightbox]} alt={`${app.name} screenshot ${lightbox + 1}`} className="max-h-[78vh] max-w-full object-contain rounded-[8px] border border-[#27272a] bg-[#0f0f10] shadow-[0_16px_48px_rgba(0,0,0,0.6)]" />
            <span className="text-[11px] font-mono tracking-widest text-zinc-400">
              {lightbox + 1} / {app.screenshots.length}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
