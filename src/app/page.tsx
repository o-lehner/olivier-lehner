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
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-start">
          <div className="flex items-center min-h-[180px] lg:min-h-[200px]">
            <h1 className="font-mono font-bold tracking-[-0.06em] leading-[0.9] text-[36px] sm:text-[52px] lg:text-[56px] whitespace-pre-line">
              {tr("heroTitle")}
              <span className="text-[#8b5cf6]">_</span>
            </h1>
          </div>

          {/* code preview - opencode tabs style */}
          <div className="border border-[#27272a] bg-[#0f0f10] overflow-hidden">
            <div className="flex items-center gap-6 bg-[#18181b] border-b border-[#27272a] px-4 overflow-x-auto">
              <span className="py-3 text-[11px] tracking-widest font-mono border-b-2 border-[#8b5cf6] text-white -mb-px">SH</span>
              <span className="py-3 text-[11px] tracking-widest font-mono text-zinc-500">NPM</span>
              <span className="py-3 text-[11px] tracking-widest font-mono text-zinc-500">BUN</span>
              <span className="py-3 text-[11px] tracking-widest font-mono text-zinc-500">BREW</span>
              <span className="ml-auto hidden sm:inline text-[10px] font-mono text-zinc-600">read-only</span>
            </div>
            <pre className="p-4 text-[11px] sm:text-[12px] leading-5 font-mono overflow-x-auto">
              <code className="text-zinc-300">
                <span className="text-zinc-500">$ olivier --build</span>
                {"\n"}
                <span className="text-[#a78bfa]">stack</span> = [<span className="text-amber-300">&quot;next.js&quot;</span>,{" "}
                <span className="text-amber-300">&quot;swift&quot;</span>, <span className="text-amber-300">&quot;tailwind&quot;</span>]
                {"\n"}
                <span className="text-[#a78bfa]">focus</span> = <span className="text-emerald-400">&quot;tools that save time&quot;</span>
                {"\n"}
                <span className="text-zinc-500">{"// ship fast, no bullshit"}</span>
                {"\n"}
                <span className="text-[#a78bfa]">ship</span>() {"{"} <span className="text-white">build</span>().<span className="text-white">fast</span>();{" "}
                <span className="text-white">publish</span>(); {"}"}
                {"\n"}
                {"\n"}
                <span className="text-emerald-400">✓ 3 apps live</span> <span className="text-zinc-500">· macOS + web</span>
                {"\n"}
                <span className="text-zinc-600">— raw. mono. no bullshit.</span>
              </code>
            </pre>
            <div className="border-t border-[#27272a] bg-[#09090b] px-3 py-2 flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <span className="flex items-center gap-2">
                <span className="text-[#8b5cf6]">▸</span> <span className="text-zinc-500">built with next.js + vercel</span>
              </span>
              <span className="hidden sm:inline border border-[#27272a] px-1.5 py-0.5 text-zinc-500">⎘ copy</span>
            </div>
          </div>
        </div>
      </section>

      {/* apps grid - opencode tabs */}
      <section id="apps" className="mx-auto max-w-[1100px] px-4 sm:px-6">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
          {filtered.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>

        {filtered.length === 0 && <p className="py-12 text-center text-sm text-zinc-500 font-mono">Brak wyników</p>}
      </section>
    </main>
  );
}
