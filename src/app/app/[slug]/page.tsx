"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAppBySlug } from "@/lib/apps";
import { useLang, t } from "@/lib/i18n";
import FeedbackSection from "@/components/FeedbackSection";

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
  const [showFloatingBack, setShowFloatingBack] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowFloatingBack(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="mx-auto max-w-[900px] px-4 sm:px-6 py-6 sm:py-8">
      <Link href="/#apps" className="inline-flex items-center gap-2 text-[11px] tracking-widest font-mono text-zinc-500 hover:text-white transition-colors mb-6">
        {tr("back")}
      </Link>

      {/* header — ikona DUŻA, mobile stack */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-3 border border-[#27272a] bg-[#0f0f10] p-5 sm:p-6">
          {/* mobile: ikona DUŻA na górze centru, desktop: oryginalny rozmiar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-4">
            <div className="relative mx-auto sm:mx-0 h-24 w-24 sm:h-16 sm:w-16 shrink-0 rounded-[22px] sm:rounded-[16px] bg-[#18181b] flex items-center justify-center overflow-hidden text-[28px] shadow-[0_10px_28px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-white/[0.08] ring-inset">
              {app.icon.startsWith("/") ? (
                <Image src={app.icon} alt={app.name} width={96} height={96} className="h-full w-full object-cover rounded-[inherit]" sizes="96px" />
              ) : (
                app.icon
              )}
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.10] via-white/[0.03] to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_1px_0_rgba(255,255,255,0.14)_inset]" />
            </div>
            <div className="min-w-0 text-center sm:text-left flex-1">
              <h1 className="font-mono font-bold text-[22px] sm:text-[24px] lg:text-[26px] tracking-tight leading-none">{app.name}</h1>
              <p className="mt-2 text-[13px] sm:text-[13px] leading-5 sm:leading-5 text-zinc-400 font-mono">{app.description[lang]}</p>
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
              className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-[11px] tracking-widest font-mono font-bold hover:bg-zinc-100 transition-colors rounded-[10px]"
            >
              {primaryAction.label} ↓
            </a>
          )}
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2 text-[11px] font-mono">
            <span className="border border-[#27272a] bg-[#18181b] px-2.5 py-1 text-zinc-400">{app.size}</span>
            <span className="border border-[#27272a] bg-[#18181b] px-2.5 py-1 text-zinc-400">{app.os}</span>
          </div>
        </div>
        <div className="border border-[#27272a] bg-[#0f0f10] p-4 sm:p-5 flex flex-col">
          <h3 className="font-mono font-bold tracking-widest text-[11px] text-zinc-300">{lang === "pl" ? "JĘZYKI" : "LANGUAGES"}</h3>
          <div className="h-px bg-[#27272a] my-3" />
          <div className="flex flex-col gap-2.5">
            <span className="inline-flex items-center gap-2 text-[12px] font-mono text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] shrink-0" /> Polski
            </span>
            <span className="inline-flex items-center gap-2 text-[12px] font-mono text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6] shrink-0" /> English
            </span>
          </div>
        </div>
      </div>

      {/* screenshots - uniform + lightbox scroll */}
      <section className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-mono font-bold tracking-widest text-[11px] text-zinc-300">{tr("screenshots")}</h2>
          <span className="h-px flex-1 bg-[#27272a]" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {app.screenshots.map((src, i) => {
            const isVideo = src.endsWith(".mp4") || src.endsWith(".mov") || src.endsWith(".webm");
            return (
              <button
                key={src + i}
                onClick={() => setLightbox(i)}
                className="group relative overflow-hidden rounded-[12px] aspect-[16/10] text-left focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 bg-[#18181b]"
              >
                {isVideo ? (
                  <video
                    src={src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover rounded-[12px] group-hover:scale-[1.02] transition-transform duration-300"
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`${app.name} screenshot ${i + 1}`}
                    width={600}
                    height={375}
                    className="h-full w-full object-cover rounded-[12px] group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                )}
                {isVideo && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="h-8 w-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white text-[14px] backdrop-blur">▶</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* feedback */}
      <FeedbackSection appSlug={app.slug} appName={app.name} />
      {/* floating back — widoczny po zjechaniu na dół, nad mobile footerem */}
      <Link
        href="/#apps"
        aria-hidden={!showFloatingBack}
        className={`fixed left-4 sm:left-6 z-30 inline-flex items-center gap-2 border border-[#27272a] bg-[#0f0f10]/90 backdrop-blur px-4 py-2.5 text-[11px] tracking-widest font-mono font-bold text-zinc-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-200 rounded-[10px] hover:bg-[#18181b] hover:text-white hover:border-zinc-600 ${showFloatingBack ? "bottom-[76px] sm:bottom-6 opacity-100 translate-y-0" : "bottom-6 opacity-0 translate-y-4 pointer-events-none"}`}
      >
        {tr("back")}
      </Link>

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
            {app.screenshots[lightbox].endsWith(".mp4") || app.screenshots[lightbox].endsWith(".mov") || app.screenshots[lightbox].endsWith(".webm") ? (
              <video
                src={app.screenshots[lightbox]}
                controls
                autoPlay
                playsInline
                className="max-h-[78vh] max-w-full object-contain rounded-[8px] border border-[#27272a] bg-[#0f0f10] shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
              />
            ) : (
              <Image src={app.screenshots[lightbox]} alt={`${app.name} screenshot ${lightbox + 1}`} width={1200} height={750} className="max-h-[78vh] w-auto max-w-full object-contain rounded-[8px] border border-[#27272a] bg-[#0f0f10] shadow-[0_16px_48px_rgba(0,0,0,0.6)]" sizes="90vw" />
            )}
            <span className="text-[11px] font-mono tracking-widest text-zinc-400">
              {lightbox + 1} / {app.screenshots.length}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
