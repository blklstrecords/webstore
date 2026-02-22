"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
      <h2 className="text-xl font-bold">Oh no!</h2>
      <p className="my-2">
        There was an issue with our storefront. This could be a temporary issue, please try your action again.
      </p>
      <div className="mt-4 flex w-full gap-3">
        <button
          className="flex-1 rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
          onClick={() => reset()}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="flex-1 rounded-full border border-neutral-200 p-4 text-center hover:bg-neutral-100 dark:border-neutral-800"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
