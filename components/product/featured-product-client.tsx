"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoImage from "../logo-white.png";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
};

export default function FeaturedProductClient({
  variants,
  backgroundImage,
  title,
  supportPrice,
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
    <div className="pointer-events-auto w-full text-white">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mx-auto max-w-xl text-center overflow-auto">
          <div className="text-md">
            Ole osa perustajatukareita!
            <br />
            Ostamalla tämän, lähetämme sinulle
            <br />
            kuvassa näkyvän OG first-printin,
            <br />
            tuet ja saat itsellesi kutsun
            <br />
            ensimmäiseen ja viralliseen
            <br />
            BLKLST label-night tapahtumaan.
            <br />
            <br />
            Myynnissä vain rajoitettu määrä,
            <br />
            koska kaikki ei mahdu tälle listalle.
          </div>
          <div>
            <Image src={logoImage} alt={title ?? "Featured product"} className="mx-auto h-56 object-contain" />
          </div>
          {/*<div className="mb-2 text-xs font-semibold text-neutral-300">SUPPORT PRICE</div>
          <div className="mb-8 text-xl font-semibold">
            {supportPrice ? `${Number(supportPrice.amount).toFixed(2).replace(".", ",")} €` : ""}
          </div>*/}

          <div className="mb-1 text-xs uppercase tracking-wide font-semibold text-neutral-300">Select a size</div>

          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {variants.map((v) => (
              <a
                key={v.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(v.id);
                }}
                href="#"
                className={`text-xl font-bold uppercase tracking-widest ${v.availableForSale ? "hover:underline text-white" : "text-neutral-400 cursor-not-allowed"}`}
                aria-disabled={!v.availableForSale}
              >
                {v.title}
              </a>
            ))}
          </div>
          <div className="text-xs mb-6">
            <a href="/gildan-5000.pdf" target="_blank" className="hover:underline">
              Speksit paidasta tästä.
            </a>
          </div>
          <div className="text-xs mb-8">
            <a href="https://linktr.ee/blklst" target="_blank" className="hover:underline">
              Tsekkaa meidän some-feedit,
              <br />
              musat, julkaisut ja läpät täältä
            </a>
          </div>
          <div className="text-sm mb-8">
            Terveisin,
            <br />
            Mölyset &amp; Pölyset
          </div>
        </div>
      </div>
    </div>
  );
}
