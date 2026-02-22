import { DM_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { baseUrl } from "lib/utils";
import Image from "next/image";
import logoFile from "./logo-white.png";

const { SITE_NAME } = process.env;

const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${dmMono.className} scroll-smooth`}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <header className="fixed left-0 top-0 z-20 w-full">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
            <a href="/" aria-label={SITE_NAME} className="flex items-center gap-3">
              <Image src={logoFile} alt={`${SITE_NAME} logo`} width={200} height={200} className="" />
            </a>
          </div>
        </header>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
