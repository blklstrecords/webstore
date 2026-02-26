import { FeaturedProduct } from "components/product/featured-product";
import { getCollectionProducts } from "lib/shopify";

import { defaultSort } from "lib/constants";
import type { Metadata } from "next";

const PRODUCT_COLLECTION = "featured";

export const metadata: Metadata = {
  description:
    "BLKLST Records is an independent underground record label from Helsinki, Finland. Dark techno and experimental electronic music. Artists, releases and events.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const products = await getCollectionProducts({
    collection: PRODUCT_COLLECTION,
    ...defaultSort,
  });

  if (!products || products.length === 0 || !products[0]) {
    return (
      <>
        <p className="py-3 text-lg">{`No products found in the "${PRODUCT_COLLECTION}" collection`}</p>
      </>
    );
  }

  return (
    <>
      <FeaturedProduct product={products[0]} />
    </>
  );
}
