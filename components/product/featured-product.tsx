import { Product } from "lib/shopify/types";
import FeaturedProductClient from "./featured-product-client";

export function FeaturedProduct({ product }: { product: Product }) {
  const variants = product.variants || [];

  // If there's only one variant, nothing to choose
  if (!variants.length || variants.length <= 1) return null;

  return (
    <FeaturedProductClient
      variants={variants.map((v) => ({ id: v.id, title: v.title, availableForSale: v.availableForSale }))}
      backgroundImage={product.images?.[0]?.url}
      logo={product.featuredImage?.url}
      title={product.title}
      supportPrice={product.priceRange.maxVariantPrice}
      descriptionHtml={product.descriptionHtml}
    />
  );
}
