"use client";
import Link from "next/link";
import Image from "next/image";
import { AppEntry } from "@/lib/apps";
import { useLang } from "@/lib/i18n";

export default function AppCard({ app }: { app: AppEntry }) {
  const { lang } = useLang();
  const isImage = app.icon.startsWith("/");
  return (
    <Link
      href={`/app/${app.slug}`}
      className="group relative flex flex-col items-center text-center border border-[#27272a] bg-[#0f0f10] hover:border-[#8b5cf6]/40 hover:bg-[#18181b] transition-colors p-6 sm:p-8"
    >
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-[18px] sm:rounded-[22px] bg-[#18181b] flex items-center justify-center overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-white/[0.07] ring-inset group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_4px_12px_rgba(139,92,246,0.18),0_0_0_1px_rgba(255,255,255,0.08)_inset] group-hover:-translate-y-0.5 transition-all duration-300">
        {isImage ? (
          <Image src={app.icon} alt={app.name} width={96} height={96} className="h-full w-full object-cover rounded-[inherit]" sizes="96px" />
        ) : (
          <span className="text-[28px]">{app.icon}</span>
        )}
        {/* 3D gloss */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.09] via-white/[0.02] to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]" />
      </div>
      <h3 className="mt-4 font-mono font-bold text-[15px] tracking-tight group-hover:text-[#a78bfa] transition-colors">{app.name}</h3>
      <p className="mt-1 text-[11px] font-mono tracking-wide text-zinc-500">
        {app.slug === "always-on-the-top"
          ? lang === "pl"
            ? "pin okien na wierzch"
            : "pin windows on top"
          : lang === "pl"
            ? "apka sticky notes"
            : "sticky notes app"}
      </p>

      <span className="mt-5 inline-flex items-center justify-center border border-[#27272a] bg-[#09090b] px-5 py-2 text-[11px] tracking-widest font-mono font-bold text-zinc-300 group-hover:text-white group-hover:border-zinc-600 group-hover:bg-[#18181b] transition-colors">
        {lang === "pl" ? "ZOBACZ →" : "VIEW →"}
      </span>

      {/* purple left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
