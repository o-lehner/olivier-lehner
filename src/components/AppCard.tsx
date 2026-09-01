"use client";
import Link from "next/link";
import { AppEntry } from "@/lib/apps";
import { useLang } from "@/lib/i18n";

export default function AppCard({ app }: { app: AppEntry }) {
  const { lang } = useLang();
  return (
    <Link
      href={`/app/${app.slug}`}
      className="group relative flex flex-col border border-[#27272a] bg-[#0f0f10] hover:border-[#8b5cf6]/40 hover:bg-[#18181b] transition-colors p-4 sm:p-5"
    >
      {/* top meta */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 border border-[#27272a] bg-[#18181b] flex items-center justify-center text-[16px] group-hover:border-[#8b5cf6]/30 group-hover:bg-[#1f1f23] transition-colors">
            {app.icon}
          </div>
          <div>
            <h3 className="font-mono font-bold text-[13px] tracking-tight leading-none group-hover:text-[#a78bfa] transition-colors">
              {app.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`text-[9px] tracking-widest px-1 py-0.5 border font-bold ${
                  app.category === "macos"
                    ? "border-zinc-700 text-zinc-400 bg-zinc-900"
                    : "border-[#8b5cf6]/30 text-[#a78bfa] bg-[#8b5cf6]/10"
                }`}
              >
                {app.category === "macos" ? "macOS" : "WEB"}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">{app.version}</span>
              <span className="text-zinc-700 text-[10px]">·</span>
              <span className="text-[10px] text-zinc-500">{app.size}</span>
            </div>
          </div>
        </div>
        <span className="text-zinc-600 group-hover:text-[#8b5cf6] transition-colors text-[14px]">↗</span>
      </div>

      <p className="text-[12.5px] leading-[1.6] text-zinc-400 line-clamp-2 min-h-[40px]">{app.description[lang]}</p>

      {/* footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[#1f1f23] pt-3">
        <div className="flex gap-1.5 flex-wrap">
          {app.features[lang].slice(0, 3).map((f) => (
            <span key={f} className="text-[10px] tracking-wide text-zinc-500 border border-[#27272a] px-1.5 py-0.5 bg-[#09090b]">
              {f}
            </span>
          ))}
        </div>
        <span className="text-[10px] tracking-widest text-zinc-500 group-hover:text-white transition-colors">
          {lang === "pl" ? "SZCZEGÓŁY →" : "DETAILS →"}
        </span>
      </div>

      {/* purple left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
