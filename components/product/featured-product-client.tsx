"use client";

import React, { useEffect, useState } from "react";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
};

export default function FeaturedProductClient({
  variants,
  backgroundImage,
  logo,
  title,
  supportPrice,
  descriptionHtml,
}: {
  variants: Variant[];
  backgroundImage?: string | null;
  logo?: string | null;
  title?: string;
  supportPrice?: { amount: string; currencyCode: string };
  descriptionHtml?: string | null;
}) {
  useEffect(() => {
    if (backgroundImage) {
      document.documentElement.style.setProperty("--page-bg", `url(${backgroundImage})`);
      return () => {
        document.documentElement.style.setProperty("--page-bg", "none");
      };
    }
    return;
  }, [backgroundImage]);

  const handleClick = async (variantId: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merchandiseId: variantId }),
      });

      if (!res.ok) {
        console.error("Failed to add to cart");
        return;
      }

      const json = await res.json();
      if (json?.checkoutUrl) {
        window.location.href = json.checkoutUrl;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="pointer-events-auto w-full px-6">
      <div className="mx-auto w-full max-w-4xl mt-[30vh]">
        <div className="mx-auto max-w-xl text-center max-h-[70vh] overflow-auto">
          <h2 className="sticky top-0 bg-transparent text-3xl mb-3 font-bold">{title}</h2>

          <div className="mb-3 text-sm font-semibold text-neutral-600 dark:text-neutral-300">SUPPORT PRICE</div>
          <div className="mb-4 text-2xl font-semibold">
            {supportPrice ? `${supportPrice.amount} ${supportPrice.currencyCode}` : ""}
          </div>

          <div className="mb-4 text-sm uppercase tracking-wide text-neutral-500">Select a size</div>

          <div className="flex flex-wrap justify-center gap-4">
            {variants.map((v) => (
              <a
                key={v.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(v.id);
                }}
                href="#"
                className={`text-xl font-bold uppercase tracking-widest ${v.availableForSale ? "text-black hover:underline dark:text-white" : "text-neutral-400 cursor-not-allowed"}`}
                aria-disabled={!v.availableForSale}
              >
                {v.title}
              </a>
            ))}
          </div>

          {descriptionHtml ? (
            <div className="mt-4 text-sm text-neutral-700 dark:text-neutral-300">
              <div
                className={`${showMore ? "" : "max-h-24 overflow-hidden"}`}
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
              <button
                type="button"
                onClick={() => setShowMore((s) => !s)}
                className="mt-2 text-sm font-medium text-white hover:underline"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
