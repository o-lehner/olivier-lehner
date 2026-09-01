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

          {/* code preview - generic */}
          <div className="border border-[#27272a] bg-[#0f0f10] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#27272a] bg-[#18181b] px-3 py-2">
              <span className="text-[10px] tracking-widest font-mono text-zinc-500">OLIVIER.LEHNER — SH</span>
              <span className="text-[10px] font-mono text-zinc-600">read-only</span>
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
            <div className="border-t border-[#27272a] bg-[#09090b] px-3 py-2 flex items-center gap-2 text-[10px] font-mono text-zinc-600">
              <span className="text-[#8b5cf6]">▸</span> <span className="text-zinc-500">built with next.js + vercel</span>
            </div>
          </div>
        </div>
      </section>

      {/* apps grid */}
      <section id="apps" className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <div className="flex justify-start border-y border-[#27272a] bg-[#0f0f10]/30 px-3 sm:px-4 py-3">
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
    </main>
  );
}
