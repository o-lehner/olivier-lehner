"use client";
import { useState, useEffect } from "react";
import AppCard from "@/components/AppCard";
import { apps } from "@/lib/apps";
import { useLang, t } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLang();
  const tr = (k: keyof typeof t) => t[k][lang];
  const [filter, setFilter] = useState<"all" | "macos" | "web">("all");

  const filtered = apps.filter((a) => (filter === "all" ? true : a.category === filter));

  return (
    <main className="flex-1 animate-[pageIn_0.5s_ease-out]">
      {/* hero - wyrównane pionowo */}
      <section className="mx-auto max-w-[1080px] px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center">
          <div className="flex items-center animate-[pageIn_0.5s_ease-out_0.05s_both]">
            <h1 className="font-mono font-bold tracking-[-0.06em] leading-[0.9] text-[36px] sm:text-[52px] lg:text-[56px] whitespace-pre-line">
              {tr("heroTitle")}
              <span className="text-[#8b5cf6]">_</span>
            </h1>
          </div>

          {/* preview - WERSJA 1: Okno JSON animowane */}
          <div className="animate-[pageIn_0.5s_ease-out_0.12s_both]">
            <AnimatedJson />
          </div>
        </div>
      </section>

      <style>{`@keyframes pageIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {/* apps grid - opencode tabs */}
      <section id="apps" className="mx-auto max-w-[1080px] px-4 sm:px-6 animate-[pageIn_0.5s_ease-out_0.2s_both]">
        <div className="flex gap-6 sm:gap-8 border border-[#27272a] bg-[#0f0f10]/30 px-4 overflow-x-auto">
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

function AnimatedJson() {
  const lines = [
    '{',
    '  "want": "app",',
    '  "found": null, // or paid',
    '  "so": "build()",',
    '  "now": "exists",',
    '  "share": "free"',
    '}',
  ];
  const [visible, setVisible] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (visible >= lines.length) {
      setDone(true);
      return;
    }
    const line = lines[visible];
    if (charCount < line.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisible((v) => v + 1);
        setCharCount(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [visible, charCount]);
  const renderLine = (text: string, idx: number) => {
    const isActive = idx === visible;
    const display = isActive ? text.slice(0, charCount) : idx < visible ? text : "";
    if (text === "{" || text === "}") return <span className="text-zinc-600">{display}</span>;
    // syntax highlight
    const m = display.match(/^(\s*)"(.*?)"(\s*:\s*)(.*)$/);
    if (!m) return <span>{display}</span>;
    const [, sp, key, colon, rest] = m;
    let valColor = "text-zinc-100";
    if (rest.includes("null")) valColor = "text-[#fb923c]";
    else if (rest.includes("build") || rest.includes("free")) valColor = "text-[#22c55e]";
    return (
      <>
        <span className="text-zinc-600">{sp}</span>
        <span className="text-[#8b5cf6]">&quot;{key}&quot;</span>
        <span className="text-zinc-500">{colon}</span>
        <span className={valColor}>{rest.replace(/^"/, "&quot;").replace(/"$/, "&quot;")}</span>
      </>
    );
  };
  return (
    <div className="border border-[#27272a] bg-[#0f0f10] overflow-hidden rounded-[12px] flex flex-col">
      <div className="flex items-center justify-between border-b border-[#27272a] bg-[#18181b] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
          <span className="h-2 w-2 rounded-full bg-[#eab308]" />
          <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          <span className="ml-2 text-[11px] font-mono tracking-wide text-zinc-500">config.json — olivier</span>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-zinc-600">● READY</span>
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5 font-mono text-[12.5px] leading-6 flex-1 h-[148px]">
        {lines.map((line, i) => (
          <div key={i} style={{ height: "1.5em" }}>
            {i < visible ? (
              <div>
                {renderLine(line, i)}
                {i === lines.length - 1 && done && <span className="ml-1 inline-block h-[14px] w-[7px] translate-y-[2px] bg-white animate-[blink_0.9s_step-end_infinite]" />}
              </div>
            ) : i === visible ? (
              <div>
                {renderLine(line.slice(0, charCount), i)}
                <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] bg-white animate-[blink_0.9s_step-end_infinite]" />
              </div>
            ) : (
              <div className="opacity-0 select-none" aria-hidden>
                {line || "\u00A0"}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`@keyframes blink { 0%,50% { opacity: 1 } 51%,100% { opacity: 0 } }`}</style>
    </div>
  );
}


