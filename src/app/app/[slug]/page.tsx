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

      {/* header */}
      <div className="border border-[#27272a] bg-[#0f0f10] p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 border border-[#27272a] bg-[#18181b] flex items-center justify-center text-[22px]">{app.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="font-mono font-bold text-[18px] sm:text-[22px] tracking-tight">{app.name}</h1>
              <span
                className={`text-[10px] tracking-widest px-1.5 py-0.5 border font-bold ${
                  app.category === "macos" ? "border-zinc-700 text-zinc-400 bg-zinc-900" : "border-[#8b5cf6]/30 text-[#a78bfa] bg-[#8b5cf6]/10"
                }`}
              >
                {app.category === "macos" ? "macOS" : "WEB"}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 border border-[#27272a] px-1.5 py-0.5 bg-[#09090b]">{app.version}</span>
            </div>
            <p className="text-[13px] leading-6 text-zinc-400 font-mono max-w-[600px]">{app.longDescription[lang]}</p>
            <p className="mt-2 text-[12px] font-mono text-zinc-500">{app.description[lang]}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {primaryAction && (
                <a
                  href={primaryAction.href}
                  target={primaryAction.href === "#" ? undefined : "_blank"}
                  onClick={(e) => {
                    if (primaryAction.href === "#") {
                      e.preventDefault();
                      alert(lang === "pl" ? "Podmień link w src/lib/apps.ts → downloadUrl / websiteUrl" : "Replace link in src/lib/apps.ts → downloadUrl / websiteUrl");
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#8b5cf6] px-5 py-2.5 text-[11px] tracking-widest font-bold text-white hover:bg-[#7c3aed] transition-colors"
                >
                  {primaryAction.label} {app.category === "macos" ? "↓" : "↗"}
                </a>
              )}
              {app.githubUrl && (
                <a
                  href={app.githubUrl}
                  onClick={(e) => {
                    if (app.githubUrl === "#") {
                      e.preventDefault();
                      alert("Podmień githubUrl w src/lib/apps.ts");
                    }
                  }}
                  className="inline-flex items-center gap-2 border border-[#27272a] bg-[#18181b] px-4 py-2.5 text-[11px] tracking-widest font-bold text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  GITHUB ↗
                </a>
              )}
              <span className="inline-flex items-center text-[11px] font-mono text-zinc-600 px-2">
                {app.os} · {app.size}
              </span>
            </div>
          </div>

          {/* info box */}
          <div className="sm:w-[200px] shrink-0 border border-[#27272a] bg-[#09090b] p-3 h-fit">
            <div className="text-[10px] tracking-widest font-mono text-zinc-500 mb-2">{tr("info")}</div>
            <dl className="space-y-2 text-[11px] font-mono">
              <div className="flex justify-between gap-2">
                <dt className="text-zinc-500">{tr("version")}</dt>
                <dd className="text-zinc-300">{app.version}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-zinc-500">{tr("size")}</dt>
                <dd className="text-zinc-300">{app.size}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-zinc-500">{tr("system")}</dt>
                <dd className="text-zinc-300">{app.os}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-zinc-500">{tr("updated")}</dt>
                <dd className="text-zinc-300">{app.updatedAt}</dd>
              </div>
            </dl>
          </div>
        </div>
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
                {/* placeholder grid */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <span className="text-[28px] opacity-20">{app.icon}</span>
                <span className="text-[10px] tracking-widest font-mono text-zinc-600">SCREENSHOT {i + 1}</span>
                <span className="text-[11px] font-mono text-zinc-500 text-center leading-tight">{app.name} — preview</span>
                <span className="absolute bottom-2 right-2 text-[9px] font-mono text-zinc-700 border border-[#27272a] px-1 bg-[#09090b]">1600×1000</span>
              </div>
              <div className="border-t border-[#27272a] px-3 py-2 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wide text-zinc-500">0{i + 1} — {app.slug}</span>
                <span className="text-[10px] text-zinc-700">PNG</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] font-mono text-zinc-600">→ podmień placeholdery na prawdziwe PNG w /public/screenshots/{app.slug}/</p>
      </section>

      {/* steps + features */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <section className="border border-[#27272a] bg-[#0f0f10] p-4 sm:p-5">
          <h2 className="font-mono font-bold tracking-widest text-[11px] text-zinc-300 mb-4">{tr("howItWorks")}</h2>
          <ol className="space-y-3">
            {app.steps[lang].map((step, i) => (
              <li key={i} className="flex gap-3 text-[13px] leading-6 font-mono">
                <span className="shrink-0 h-6 w-6 flex items-center justify-center border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[#a78bfa] text-[11px] font-bold">0{i + 1}</span>
                <span className="text-zinc-400 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="border border-[#27272a] bg-[#0f0f10] p-4 sm:p-5">
          <h2 className="font-mono font-bold tracking-widest text-[11px] text-zinc-300 mb-4">{tr("features")}</h2>
          <ul className="grid grid-cols-2 gap-2">
            {app.features[lang].map((f) => (
              <li key={f} className="flex items-center gap-2 border border-[#27272a] bg-[#09090b] px-3 py-2 text-[12px] font-mono text-zinc-400">
                <span className="h-1.5 w-1.5 bg-[#8b5cf6] shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-4 border border-[#27272a] bg-[#09090b] p-3">
            <div className="text-[10px] tracking-widest font-mono text-zinc-500 mb-1">TIP</div>
            <p className="text-[11px] leading-5 font-mono text-zinc-500">
              {lang === "pl"
                ? "Wszystkie pliki są lokalnie — nic nie wysyłam. Chcesz nową funkcję? Napisz na GitHub Issues."
                : "All files stay local — nothing is sent out. Want a feature? Open a GitHub Issue."}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
