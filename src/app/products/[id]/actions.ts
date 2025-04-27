"use server";

import db from "@/db";
import {
  categories,
  colors,
  productColors,
  products,
  productSizes,
  sizes,
} from "@/db/schemas";
import { tryCatch } from "@/lib/trycatch";
import { and, eq } from "drizzle-orm";

export async function getProductDetails(id: number) {
  const { data, error } = await tryCatch(
    db
      .select({
        productId: products.productId,
        name: products.name,
        image: products.image,
        basePrice: products.basePrice,
        category: categories.name,
        description: products.description,
        shortDiscription: products.shortDiscription,
        isActive: products.isActive,
        categoryId: categories.categoryId,
        sizeName: sizes.name,
        colorName: colors.name,
      })
      .from(products)
      .innerJoin(productSizes, eq(productSizes.productId, products.productId))
      .innerJoin(sizes, eq(sizes.sizeId, productSizes.sizeId))
      .innerJoin(productColors, eq(productColors.productId, products.productId))
      .innerJoin(colors, eq(colors.colorId, productColors.colorId))
      .innerJoin(categories, eq(categories.categoryId, products.categoryId))
      .where(eq(products.productId, id))
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return { error: "Product not found" };
  }

  const product = {
    id: data[0].productId,
    name: data[0].name,
    image: data[0].image,
    basePrice: data[0].basePrice,
    category: data[0].category,
    description: data[0].description,
    shortDiscription: data[0].shortDiscription,
    isActive: data[0].isActive,
    categoryId: data[0].categoryId,
    sizes: [] as string[],
    colors: [] as string[],
  };

  const sizesSet = new Set<string>();
  const colorsSet = new Set<string>();

  data.forEach((item) => {
    if (item.sizeName) {
      sizesSet.add(item.sizeName);
    }
    if (item.colorName) {
      colorsSet.add(item.colorName);
    }
  });

  product.sizes = Array.from(sizesSet);
  product.colors = Array.from(colorsSet);

  const { data: relatedProducts, error: relatedProductsError } = await tryCatch(
    db
      .select({
        id: products.productId,
        name: products.name,
        image: products.image,
        basePrice: products.basePrice,
        category: categories.name,
      })
      .from(products)
      .innerJoin(categories, eq(categories.categoryId, products.categoryId))
      .where(
        and(
          eq(products.isActive, true),
          eq(products.categoryId, product.categoryId)
        )
      )
      .orderBy(products.createdAt)
      .limit(4)
  );

  if (relatedProductsError) {
    return { error: relatedProductsError.message };
  }

  return { related_products: relatedProducts, product };
}
