"use client";

import { useState } from "react";
import { useLang, t } from "@/lib/i18n";

export default function FeedbackSection({ appSlug, appName }: { appSlug: string; appName: string }) {
  const { lang } = useLang();
  const tr = (k: keyof typeof t) => t[k][lang];

  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [honey, setHoney] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = message.trim().length >= 10 && !sending;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (honey) return;
    if (message.trim().length < 10) {
      setError(tr("feedbackValidation"));
      return;
    }
    const last = localStorage.getItem("feedback-last");
    if (last && Date.now() - Number(last) < 30_000) {
      setError(lang === "pl" ? "Poczekaj chwilę przed kolejnym wysłaniem." : "Please wait a moment before sending again.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appSlug, appName, type: "other", message: message.trim(), contact: contact.trim(), lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || tr("feedbackError"));
      localStorage.setItem("feedback-last", String(Date.now()));
      setSuccess(true);
      setMessage("");
      setContact("");
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : tr("feedbackError"));
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-6">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="font-mono font-bold tracking-widest text-[11px] text-zinc-300">{tr("feedbackTitle")}</h2>
        <span className="h-px flex-1 bg-[#27272a]" />
      </div>

      <div className="border border-[#27272a] bg-[#0f0f10] rounded-[12px] overflow-hidden">
        <div className="p-4 sm:p-5">
          <h3 className="font-mono font-bold text-[13px] tracking-tight text-white">
            {lang === "pl" ? "Znalazłeś błąd? Masz pomysł?" : "Found a bug? Have an idea?"}
          </h3>
          <p className="mt-1 text-[12px] leading-5 font-mono text-zinc-400">
            {lang === "pl" ? `Napisz co poprawić w ${appName} — każda wiadomość trafia prosto do mnie.` : `Tell me what to fix in ${appName} — every message goes straight to me.`}
          </p>

          {success ? (
            <div className="mt-4 border border-[#22c55e]/30 bg-[#22c55e]/10 rounded-[10px] px-4 py-3">
              <p className="text-[13px] font-mono font-bold text-[#22c55e]">{tr("feedbackSuccessTitle")}</p>
              <p className="mt-1 text-[12px] leading-5 font-mono text-zinc-300">{tr("feedbackSuccessDesc")}</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-2 text-[11px] tracking-widest font-mono text-zinc-400 hover:text-white transition-colors"
              >
                {lang === "pl" ? "WYŚLIJ KOLEJNY →" : "SEND ANOTHER →"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <input type="text" value={honey} onChange={(e) => setHoney(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={lang === "pl" ? "Np. nie działa skrót Cmd+N / fajnie gdyby dało się..." : "E.g. Cmd+N doesn't work / it would be cool if..."}
                rows={3}
                maxLength={2000}
                required
                className="w-full min-h-[88px] resize-y rounded-[10px] border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[13px] leading-5 font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#8b5cf6]/60 focus:ring-1 focus:ring-[#8b5cf6]/20 transition-colors"
              />

              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={lang === "pl" ? "email (opcjonalnie, jeśli chcesz odpowiedź)" : "email (optional, if you want a reply)"}
                maxLength={120}
                className="w-full rounded-[10px] border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[13px] font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#8b5cf6]/60 focus:ring-1 focus:ring-[#8b5cf6]/20 transition-colors"
              />

              {error && <div className="rounded-[10px] border border-[#ef4444]/30 bg-[#ef4444]/10 px-3.5 py-2 text-[12px] font-mono text-[#fca5a5]">{error}</div>}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-[10px] bg-white text-black px-5 py-2.5 text-[11px] tracking-widest font-mono font-bold hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {sending ? tr("feedbackSending") : tr("feedbackSubmit")}
              </button>

              <p className="text-[10px] leading-4 font-mono text-zinc-600">
                {lang === "pl" ? "Trafia prosto na olivierlehner1@gmail.com. Bez spamu." : "Goes straight to olivierlehner1@gmail.com. No spam."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
