"use client";
import Link from "next/link";
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
      <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 border border-[#27272a] bg-[#18181b] flex items-center justify-center overflow-hidden group-hover:border-[#8b5cf6]/30 transition-colors">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={app.icon} alt={app.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-[28px]">{app.icon}</span>
        )}
      </div>
      <h3 className="mt-4 font-mono font-bold text-[15px] tracking-tight group-hover:text-[#a78bfa] transition-colors">{app.name}</h3>
      <p className="mt-1 text-[11px] font-mono tracking-wide text-zinc-500">
        {lang === "pl" ? "apka sticky notes" : "sticky notes app"}
      </p>

      <span className="mt-5 inline-flex items-center justify-center border border-[#27272a] bg-[#09090b] px-5 py-2 text-[11px] tracking-widest font-mono font-bold text-zinc-300 group-hover:text-white group-hover:border-zinc-600 group-hover:bg-[#18181b] transition-colors">
        {lang === "pl" ? "ZOBACZ →" : "VIEW →"}
      </span>

      {/* purple left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
