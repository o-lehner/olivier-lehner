"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAppBySlug } from "@/lib/apps";
import { useLang, t } from "@/lib/i18n";

export default function AppDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const tr = (k: keyof typeof t) => t[k][lang];
  const app = getAppBySlug(slug);

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
          <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 border border-[#27272a] bg-[#18181b] flex items-center justify-center text-[24px]">{app.icon}</div>
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

      {/* screenshots */}
      <section className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-mono font-bold tracking-widest text-[11px] text-zinc-300">{tr("screenshots")}</h2>
          <span className="h-px flex-1 bg-[#27272a]" />
          <span className="text-[11px] font-mono text-zinc-600">{app.screenshots.length} images</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {app.screenshots.map((id, i) => (
            <div key={id + i} className="group border border-[#27272a] bg-[#0f0f10] hover:border-[#8b5cf6]/30 transition-colors overflow-hidden">
              <div className="aspect-[16/10] bg-[#18181b] flex flex-col items-center justify-center gap-2 p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <span className="text-[28px] opacity-20">{app.icon}</span>
                <span className="text-[10px] tracking-widest font-mono text-zinc-600">SCREENSHOT {i + 1}</span>
                <span className="text-[11px] font-mono text-zinc-500 text-center leading-tight">{app.name} — preview</span>
              </div>
              <div className="border-t border-[#27272a] px-3 py-2 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wide text-zinc-500">0{i + 1} — {app.slug}</span>
                <span className="text-[10px] text-zinc-700">PNG</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
