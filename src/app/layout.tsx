import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Olivier Lehner — Apps",
  description: "Aplikacje na macOS i web które oszczędzają czas. Surowe, szybkie, bez subskrypcji.",
  openGraph: {
    title: "Olivier Lehner — Apps",
    description: "Aplikacje na macOS i web które oszczędzają czas.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#050507] text-[#fafafa]">
        <LanguageProvider>
          {/* opencode-like centered column with side borders */}
          <div className="mx-auto w-full max-w-[1080px] min-h-screen flex flex-col bg-[#09090b] border-x border-[#1f1f23] shadow-[0_0_0_1px_rgba(0,0,0,1)]">
            <Header />
            <div className="flex-1 flex flex-col">{children}</div>
            <footer className="border-t border-[#27272a] mt-12">
              <div className="mx-auto max-w-[1080px] px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-3 justify-between text-[11px] font-mono tracking-wide text-zinc-500">
                <span>© 2026 OLIVIER LEHNER — raw. mono. no bullshit.</span>
                <span className="text-zinc-600">
                  inspiracja: <a href="https://opencode.ai" target="_blank" className="underline hover:text-zinc-300">opencode.ai</a> · zbudowane na Next.js + Vercel
                </span>
              </div>
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
