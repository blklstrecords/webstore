import { FeaturedProduct } from "components/product/featured-product";
import { getCollectionProducts } from "lib/shopify";

import { defaultSort } from "lib/constants";

const PRODUCT_COLLECTION = "featured";

export const metadata = {
  description: "BLKLST Records — curated music, vinyl and limited merch. Shop releases and exclusive drops.",
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
