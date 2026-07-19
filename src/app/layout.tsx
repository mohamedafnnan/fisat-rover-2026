import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { SkipLink } from "@/components/layout/skip-link";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  ...buildMetadata(),
  applicationName: siteConfig.name,
  category: "technology",
  // Icons: src/app/icon.tsx + apple-icon.tsx (Next file conventions)
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
      </head>
      <body className="min-h-dvh font-sans">
        <AppProviders>
          <SkipLink />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
