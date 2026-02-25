import { GoogleAnalytics } from "@next/third-parties/google";
import { baseUrl } from "lib/utils";
import { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const { SITE_NAME, SITE_DESCRIPTION } = process.env;

const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
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
    images: [{ url: `${baseUrl}/share.png`, alt: SITE_NAME ?? "BLKLST Records" }],
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
    <html
      lang="en"
      className={`${dmMono.className} scroll-smooth bg-no-repeat bg-fixed bg-cover bg-center text-white`}
      style={{ backgroundPosition: "top center" }}
    >
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <main className="pt-20">{children}</main>
        <GoogleAnalytics gaId="G-KSE2X48PG9" />
      </body>
    </html>
  );
}
