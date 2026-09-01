"use client";
import { useState } from "react";
import AppCard from "@/components/AppCard";
import { apps } from "@/lib/apps";
import { useLang, t } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLang();
  const tr = (k: keyof typeof t) => t[k][lang];
  const [filter, setFilter] = useState<"all" | "macos" | "web">("all");

  const filtered = apps.filter((a) => (filter === "all" ? true : a.category === filter));

  return (
    <main className="flex-1">
      {/* hero like opencode.ai */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
        {/* terminal bar */}
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-zinc-500 mb-6">
          <span className="h-2 w-2 rounded-full bg-[#27272a] border border-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-[#27272a] border border-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" />
          <span className="ml-2 text-zinc-600">~/olivier-lehner — zsh — 80×24</span>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div>
            <h1 className="font-mono font-bold tracking-[-0.04em] leading-[0.9] text-[32px] sm:text-[44px] lg:text-[48px] whitespace-pre-line">
              {tr("heroTitle")}
              <span className="text-[#8b5cf6]">_</span>
            </h1>
            <p className="mt-4 max-w-[520px] text-[13px] sm:text-[14px] leading-6 text-zinc-400 font-mono">{tr("heroSub")}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href="#apps"
                className="inline-flex items-center gap-2 bg-[#8b5cf6] px-4 py-2 text-[11px] tracking-widest font-bold text-white hover:bg-[#7c3aed] transition-colors"
              >
                → {tr("apps")}
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 border border-[#27272a] bg-[#18181b] px-4 py-2 text-[11px] tracking-widest font-bold text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
              >
                {tr("about")}
              </a>
              <span className="inline-flex items-center border border-[#27272a] px-3 py-2 text-[10px] font-mono tracking-wide text-zinc-500">
                <span className="h-1.5 w-1.5 bg-emerald-500 mr-2 animate-pulse" /> 3 APPS · macOS + WEB
              </span>
            </div>
          </div>

          {/* code preview - opencode style */}
          <div className="border border-[#27272a] bg-[#0f0f10] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#27272a] bg-[#18181b] px-3 py-2">
              <span className="text-[10px] tracking-widest font-mono text-zinc-500">APPS.MANIFEST</span>
              <span className="text-[10px] font-mono text-zinc-600">read-only</span>
            </div>
            <pre className="p-4 text-[11px] sm:text-[12px] leading-5 font-mono overflow-x-auto">
              <code className="text-zinc-300">
                <span className="text-zinc-500">{`// olivier-lehner/apps.ts`}</span>
                {"\n"}
                <span className="text-[#a78bfa]">export const</span> <span className="text-white">apps</span> = {"["}
                {"\n"} <span className="text-zinc-500">{"//"}</span> <span className="text-emerald-400">macOS — SzybkiZapis</span>
                {"\n"} {"  {"} <span className="text-[#a78bfa]">name</span>: <span className="text-amber-300">&quot;SzybkiZapis&quot;</span>,{" "}
                <span className="text-[#a78bfa]">dl</span>: <span className="text-emerald-400">&quot;8.4 MB&quot;</span> {"},"}
                {"\n"} <span className="text-zinc-500">{"//"}</span> <span className="text-emerald-400">macOS — MergePro</span>
                {"\n"} {"  {"} <span className="text-[#a78bfa]">name</span>: <span className="text-amber-300">&quot;MergePro&quot;</span>,{" "}
                <span className="text-[#a78bfa]">dl</span>: <span className="text-emerald-400">&quot;12.1 MB&quot;</span> {"},"}
                {"\n"} <span className="text-zinc-500">{"//"}</span> <span className="text-emerald-400">web — Katalog Stron</span>
                {"\n"} {"  {"} <span className="text-[#a78bfa]">name</span>:{" "}
                <span className="text-amber-300">&quot;Katalog Stron&quot;</span>, <span className="text-[#a78bfa]">live</span>:{" "}
                <span className="text-emerald-400">true</span> {"}"}
                {"\n"}
                {"]"}
                {"\n"}
                <span className="text-zinc-500">{"// → kliknij kartę aby zobaczyć szczegóły"}</span>
              </code>
            </pre>
            <div className="border-t border-[#27272a] bg-[#09090b] px-3 py-2 flex items-center gap-2 text-[10px] font-mono text-zinc-600">
              <span className="text-[#8b5cf6]">▸</span> pnpm add @olivier/lehner —{" "}
              <span className="text-zinc-500">nie, po prostu pobierz .dmg</span>
            </div>
          </div>
        </div>
      </section>

      {/* apps grid */}
      <section id="apps" className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-y border-[#27272a] bg-[#0f0f10]/50 px-3 sm:px-4 py-3">
          <div className="flex items-center gap-3">
            <h2 className="font-mono font-bold tracking-widest text-[12px]">{tr("allApps")}</h2>
            <span className="text-[11px] font-mono text-zinc-500 border border-[#27272a] px-2 py-0.5 bg-[#09090b]">{tr("count")}</span>
          </div>
          <div className="flex items-center gap-1 border border-[#27272a] p-1 bg-[#09090b] w-fit">
            {[
              { id: "all", label: tr("filterAll") },
              { id: "macos", label: tr("filterMac") },
              { id: "web", label: tr("filterWeb") },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                className={`px-3 py-1 text-[11px] tracking-widest font-mono transition-colors ${
                  filter === f.id ? "bg-[#8b5cf6] text-white" : "text-zinc-500 hover:text-zinc-200 hover:bg-[#18181b]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
          {filtered.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>

        {filtered.length === 0 && <p className="py-12 text-center text-sm text-zinc-500 font-mono">Brak wyników</p>}
      </section>

      {/* about - raw */}
      <section id="about" className="mx-auto max-w-[1100px] px-4 sm:px-6 mt-10">
        <div className="border border-[#27272a] bg-[#0f0f10] p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px flex-1 bg-[#27272a]" />
            <span className="text-[11px] tracking-[0.2em] font-mono text-zinc-500">{tr("about")}</span>
            <span className="h-px flex-1 bg-[#27272a]" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-[13px] leading-6 font-mono">
            <div className="space-y-3 text-zinc-400">
              <p>
                {lang === "pl"
                  ? "Cześć, jestem Olivier. Robię małe, użyteczne apki na macOS i strony które rozwiązują moje własne problemy — a potem dzielę się nimi tutaj."
                  : "Hi, I'm Olivier. I build small, useful macOS apps and websites that solve my own problems — then share them here."}
              </p>
              <p className="text-zinc-500">
                {lang === "pl"
                  ? "Bez subskrypcji, bez trackingu, bez bullshitu. Pobierasz, używasz. Jak Ci się przyda — możesz postawić kawę (przycisk WESPRZYJ)."
                  : "No subscriptions, no tracking, no bullshit. You download, you use. If it helps — you can buy me a coffee (DONATE button)."}
              </p>
            </div>
            <div className="border border-[#27272a] bg-[#09090b] p-3 text-[11px] leading-5">
              <div className="text-zinc-500 mb-2">
                {lang === "pl" ? "// jak dodać nową apkę?" : "// how to add new app?"}
              </div>
              <code className="text-zinc-300">
                1. dodaj wpis w <span className="text-[#a78bfa]">src/lib/apps.ts</span>
                <br />
                2. wrzuć <span className="text-amber-300]">.dmg</span> do{" "}
                <span className="text-emerald-400">/public/downloads</span>
                <br />
                3. <span className="text-[#a78bfa]">git push</span> → Vercel deploy
                <br />
                <span className="text-zinc-600">— bez CMS, bez bazy, 30s</span>
              </code>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
