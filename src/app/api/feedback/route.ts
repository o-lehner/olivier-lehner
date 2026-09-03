import { NextRequest, NextResponse } from "next/server";

type Body = {
  appSlug?: string;
  appName?: string;
  type?: string;
  message?: string;
  contact?: string;
  lang?: string;
};

const ALLOWED_TYPES = new Set(["feature", "bug", "other"]);

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const appSlug = String(body.appSlug || "").trim().slice(0, 80);
  const appName = String(body.appName || appSlug || "").trim().slice(0, 80);
  const type = String(body.type || "").trim().toLowerCase();
  const message = String(body.message || "").trim();
  const contact = String(body.contact || "").trim().slice(0, 120);
  const lang = body.lang === "en" ? "en" : "pl";

  if (!appSlug) return NextResponse.json({ error: lang === "pl" ? "Brak appSlug" : "Missing appSlug" }, { status: 400 });
  if (!ALLOWED_TYPES.has(type)) return NextResponse.json({ error: lang === "pl" ? "Nieprawidłowy typ" : "Invalid type" }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: lang === "pl" ? "Wiadomość za krótka (min 10 znaków)" : "Message too short (min 10 chars)" }, { status: 400 });
  if (message.length > 2000) return NextResponse.json({ error: lang === "pl" ? "Wiadomość za długa (max 2000)" : "Message too long (max 2000)" }, { status: 400 });

  // honeypot / spam: if message looks like URL spam with many links, soft-reject
  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > 3) {
    return NextResponse.json({ error: lang === "pl" ? "Za dużo linków" : "Too many links" }, { status: 400 });
  }

  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    appSlug,
    type,
    message,
    contact: contact || null,
    lang,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    ua: req.headers.get("user-agent")?.slice(0, 200) || null,
  };

  // log always (Vercel Functions logs — backup)
  console.log("[feedback]", JSON.stringify(entry));

  // ── Prosto na maila: Resend jeśli skonfigurowany, inaczej FormSubmit (0 config) ──
  const FEEDBACK_TO = process.env.FEEDBACK_TO || "olivierlehner1@gmail.com";
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM = process.env.RESEND_FROM || "Feedback <onboarding@resend.dev>";

  let emailSent = false;

  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: [FEEDBACK_TO],
          subject: `[Feedback: ${appName}] ${type}`,
          text: `Aplikacja: ${appName} (${appSlug})\nTyp: ${type}\nLang: ${lang}\nContact: ${contact || "-"}\nIP: ${entry.ip || "-"}\nTime: ${entry.createdAt}\nID: ${entry.id}\n\n---\n\n${message}`,
          html: `<h2 style="margin:0">Feedback: ${escapeHtml(appName)}</h2><p style="color:#666">Aplikacja: <b>${escapeHtml(appName)}</b> (${escapeHtml(appSlug)})</p><p><b>Lang:</b> ${lang} | <b>Contact:</b> ${contact || "-"} | <b>IP:</b> ${entry.ip || "-"} | <b>ID:</b> ${entry.id}</p><hr/><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
          reply_to: contact.includes("@") ? contact : undefined,
        }),
      });
      if (res.ok) emailSent = true;
      else {
        const errText = await res.text();
        console.error("[feedback:resend_failed]", res.status, errText);
        if (res.status === 401 || res.status === 403) {
          return NextResponse.json(
            { error: lang === "pl" ? "Błąd konfiguracji Resend." : "Resend config error." },
            { status: 500 }
          );
        }
      }
    } catch (e) {
      console.error("[feedback:resend_error]", e);
    }
  }

  // fallback: FormSubmit — działa bez żadnego klucza, po prostu na maila
  if (!emailSent) {
    try {
      const fsRes = await fetch("https://formsubmit.co/ajax/8f54b7b7e2e6d6f58b8b12c14778d02b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://olivierlehner.pl",
          Referer: `https://olivierlehner.pl/app/${appSlug}`,
        },
        body: JSON.stringify({
          _subject: `FEEDBACK: ${appName} — ${appSlug}`,
          _template: "table",
          _captcha: "false",
          APLIKACJA: `${appName} (${appSlug})`,
          wiadomosc: message,
          email: contact || "-",
        }),
      });
      const fsBody = await fsRes.json().catch(() => null);
      console.log("[feedback:formsubmit]", fsRes.status, JSON.stringify(fsBody));
      // FormSubmit zwraca 200 nawet przy "needs Activation" — sprawdzamy body.success
      if (fsRes.ok && fsBody?.success !== "false") emailSent = true;
      else if (fsBody?.message?.includes("Activation")) {
        console.warn("[feedback] FormSubmit needs activation — check olivierlehner1@gmail.com for activate link");
        // traktujemy jako sukces dla usera (mamy log), ale mail dojdzie dopiero po kliknięciu linka
        emailSent = true;
      } else if (!fsRes.ok) {
        console.error("[feedback:formsubmit_failed]", fsRes.status, JSON.stringify(fsBody));
      }
    } catch (e) {
      console.error("[feedback:formsubmit_error]", e);
    }
  }

  // nawet jeśli email nie wyszedł, nie blokujemy usera — mamy log
  // ale jeśli oba providery padły, daj znać że mail nie dotarł (log jest)
  if (!emailSent) console.warn("[feedback] email not sent via any provider — only logged");

  return NextResponse.json({ ok: true, id: entry.id });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// optional: block GET
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
