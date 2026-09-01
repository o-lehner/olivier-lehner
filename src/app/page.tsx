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
      {/* hero - simplified */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
          <div className="flex items-center min-h-[180px] lg:min-h-[200px]">
            <h1 className="font-mono font-bold tracking-[-0.06em] leading-[0.9] text-[36px] sm:text-[52px] lg:text-[56px] whitespace-pre-line">
              {tr("heroTitle")}
              <span className="text-[#8b5cf6]">_</span>
            </h1>
          </div>

          {/* preview - minimal, no app names */}
          <div className="border border-[#27272a] bg-[#0f0f10] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#27272a] bg-[#18181b] px-3 py-2">
              <span className="text-[10px] tracking-widest font-mono text-zinc-400">SYSTEM</span>
              <span className="text-[10px] font-mono text-zinc-600">● ready</span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-7 text-zinc-300">
              <div>tools that save time</div>
              <div className="text-zinc-500">macOS · web — no bullshit</div>
              <div className="mt-2 text-[11px] text-zinc-600">raw. mono. fast.</div>
            </div>
            <div className="border-t border-[#27272a] bg-[#09090b] px-3 py-2 text-[10px] font-mono text-zinc-600">
              est. 2026 — ship weekly
            </div>
          </div>
        </div>
      </section>

      {/* apps grid - opencode tabs */}
      <section id="apps" className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <div className="flex gap-6 sm:gap-8 border-y border-[#27272a] bg-[#0f0f10]/30 px-4 overflow-x-auto">
          {[
            { id: "all", label: tr("filterAll") },
            { id: "macos", label: tr("filterMac") },
            { id: "web", label: tr("filterWeb") },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              className={`whitespace-nowrap py-3 text-[11px] tracking-widest font-mono border-b-2 -mb-px transition-colors ${
                filter === f.id
                  ? "border-[#8b5cf6] text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto hidden sm:flex items-center text-[10px] font-mono text-zinc-600 py-3">
            {filtered.length} · {filter === "all" ? "ALL" : filter.toUpperCase()}
          </span>
        </div>

        <div className={filtered.length === 1 ? "flex justify-center mt-4" : "grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4"}>
          <div className={filtered.length === 1 ? "w-full max-w-[360px]" : "contents"}>
            {filtered.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </div>

        {filtered.length === 0 && <p className="py-12 text-center text-sm text-zinc-500 font-mono">Brak wyników</p>}
      </section>
    </main>
  );
}
