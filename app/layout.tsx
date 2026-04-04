import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/components/Favorites";
import { ThemeProvider } from "@/components/ThemeContext";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "GameZone – Free Online Games",
    template: "%s | GameZone",
  },
  description: "Play 1000+ free online browser games instantly. Action, puzzle, racing, sports, adventure and more. No download, no sign-up required!",
  keywords: ["free online games", "browser games", "play games online", "free games no download"],
  openGraph: {
    title: "GameZone – Free Online Games",
    description: "Play 1000+ free online browser games. No download required!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameZone – Free Online Games",
    description: "Play 1000+ free online browser games. No download required!",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <FavoritesProvider>
            {children}
            <CookieBanner />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
