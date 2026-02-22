import { baseUrl } from "lib/utils";
import { DM_Mono } from "next/font/google";
import Image from "next/image";
import { ReactNode } from "react";
import "./globals.css";
import logoImage from "./logo-white.png";

const { SITE_NAME, SITE_DESCRIPTION } = process.env;

const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME ?? "BLKLST Records",
    template: `%s | ${SITE_NAME ?? "BLKLST Records"}`,
  },
  description:
    SITE_DESCRIPTION ??
    "BLKLST Records is an independent underground record label from Helsinki, Finland. Dark techno and experimental electronic music. Artists, releases and events.",
  keywords: ["BLKLST", "BLKLST Records", "music", "merch", "shop"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_NAME ?? "BLKLST Records",
    description:
      SITE_DESCRIPTION ??
      "BLKLST Records — BLKLST Records is an independent underground record label from Helsinki, Finland. Dark techno and experimental electronic music. Artists, releases and events.",
    url: baseUrl,
    siteName: SITE_NAME ?? "BLKLST Records",
    images: [{ url: `${baseUrl}/opengraph-image`, alt: SITE_NAME ?? "BLKLST Records" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME ?? "BLKLST Records",
    description:
      SITE_DESCRIPTION ??
      "BLKLST Records — BLKLST Records is an independent underground record label from Helsinki, Finland. Dark techno and experimental electronic music. Artists, releases and events.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  manifest: "/site.webmanifest",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME ?? "BLKLST Records",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      // Add official social profiles here if available
    ],
  };

  return (
    <html lang="en" className={`${dmMono.className} scroll-smooth`}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <header className="fixed left-0 top-0 z-20 w-full">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
            <a href="/" aria-label={SITE_NAME} className="flex items-center gap-3">
              <Image src={logoImage} alt={`BLKLST Records`} width={200} height={200} className="" />
            </a>
          </div>
        </header>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
