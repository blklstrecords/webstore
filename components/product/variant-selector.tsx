"use client";

import { ProductOption, ProductVariant } from "lib/shopify/types";
import { Suspense } from "react";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export async function VariantSelector({
  options,
  variants,
  handleSelectVariant,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  handleSelectVariant: (combination: Combination | null) => Promise<void>;
}) {
  const hasNoOptionsOrJustOneOption = !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = async (name: string, value: string) => {
    await handleSelectVariant(combinations.find((combination) => combination[name] === value) || null);
  };

  return options.map((option) => (
    <form key={option.id}>
      <Suspense fallback={<div className="mb-8 h-12 animate-pulse rounded" />}></Suspense>
    </form>
  ));
}
