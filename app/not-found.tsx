import Link from "next/link";

export const metadata = {
  title: "404 — Not Found",
  description: "Page not found — BLKLST Records.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto my-12 max-w-3xl rounded-lg border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-black">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-lg">We couldn’t find that page. It may have moved or never existed.</p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/" className="rounded-full bg-black px-6 py-3 text-white hover:opacity-90">
          Return Home
        </Link>
        <Link href="/" className="text-sm text-neutral-600 hover:underline dark:text-neutral-400">
          Visit the store
        </Link>
      </div>
    </div>
  );
}
