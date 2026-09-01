# Olivier Lehner — Apps

Surowa strona w stylu [opencode.ai](https://opencode.ai) — mono fonty, bordery, zero zaokrągleń, fioletowe akcenty (#8b5cf6). Na górze logo `OLIVIER_LEHNER`, grid aplikacji, po kliknięciu podstrona ze screenshotami i krokami. PL/EN przełącznik.

**Lokalizacja:** `~/Documents/olivier-lehner`

## Szybki start

```bash
cd ~/Documents/olivier-lehner
npm install
npm run dev    # http://localhost:3000
npm run build  # sprawdź czy buduje się bez błędów
```

## Jak dodać nową aplikację (30s, bez CMSa)

Edytuj tylko jeden plik: `src/lib/apps.ts` i dodaj obiekt do tablicy `apps`:

```ts
{
  slug: "moja-apka",        // URL: /app/moja-apka
  icon: "⬢",                // emoji / znak
  name: "Moja Apka",
  category: "macos",        // "macos" | "web"
  version: "1.0.0",
  size: "5.2 MB",
  os: "macOS 13+",
  downloadUrl: "/downloads/moja-apka.dmg", // lub "#" na start, potem podmień
  // websiteUrl: "https://...", // jeśli to strona, użyj tego zamiast downloadUrl
  githubUrl: "https://github.com/...",
  description: { pl: "Krótki opis PL", en: "Short EN" },
  longDescription: { pl: "Długi opis PL", en: "Long EN" },
  screenshots: ["1","2","3"], // ile placeholderów
  steps: { pl: ["Krok 1","Krok 2"], en: ["Step 1","Step 2"] },
  features: { pl: ["Feat 1"], en: ["Feat 1"] },
  updatedAt: "2026-09-01",
}
```

Potem:

1. Wrzuć plik `.dmg/.zip` do `public/downloads/` (link to `/downloads/nazwa.dmg`)
2. Wrzuć screenshoty PNG do `public/screenshots/moja-apka/` i podmień placeholdery w `src/app/app/[slug]/page.tsx` (albo zostaw grid — podmienia się w komponencie)
3. `git push` → Vercel sam zdeployuje

## Donate link

W `src/components/Header.tsx:38` jest przycisk `WESPRZYJ / DONATE`. Teraz ma `alert("Podmień...")`. Podmień:

```tsx
href="https://buymeacoffee.com/twoj-profil"
// lub https://ko-fi.com/... / https://paypal.me/... / Stripe
```

## Kolory / styl opencode

- Tło: `#09090b` (zinc-950), karty: `#0f0f10`, border: `#27272a`
- Font: `Geist Mono` (jak opencode.ai) — `src/app/layout.tsx`
- Akcent: `#8b5cf6` fioletowy — zmień w `src/app/globals.css` → `--accent`
- Wszystko mono, bez `rounded`, surowe bordery

## Deploy na Vercel (free)

1. Wejdź na vercel.com → New Project → Import z GitHuba (wrzuć ten folder na GitHub)
2. Framework: Next.js, Build: `npm run build`, Output: `.next`
3. Deploy — dostajesz `olivier-lehner.vercel.app`
4. Domenę podłączysz później w Vercel → Domains

Alternatywa: `npx vercel --prod` z katalogu projektu.

## Struktura

```
src/
  lib/apps.ts        ← tu dodajesz apki (3 mocki już są)
  lib/i18n.tsx       ← PL/EN + tłumaczenia
  components/Header.tsx
  components/AppCard.tsx
  app/page.tsx       ← homepage + hero + grid + about
  app/app/[slug]/page.tsx ← podstrona apki
  app/globals.css    ← kolory opencode + fiolet
public/downloads/    ← pliki .dmg
public/screenshots/  ← screenshoty
```

## Mocki

3 apki na start:
- **SzybkiZapis** (macOS, 8.4 MB) — notatki głosowe
- **MergePro** (macOS, 12.1 MB) — łączenie PDF
- **Katalog Stron** (web) — katalog twoich stron

Podmień je na prawdziwe jak będziesz miał gotowe.
