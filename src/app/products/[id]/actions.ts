"use server";

import { db } from "@/db";
import { categories, products, productSizes, sizes } from "@/db/schemas";
import { tryCatch } from "@/lib/trycatch";
import { and, eq } from "drizzle-orm";

export async function getProductDetails(id: number) {
  const { data, error } = await tryCatch(
    db
      .select({
        id: products.productId,
        name: products.name,
        image: products.image,
        basePrice: products.basePrice,
        category: products.categoryId,
        description: products.description,
        shortDiscription: products.shortDiscription,
        isActive: products.isActive,
        categoryId: products.categoryId,
        size_name: sizes.name,
      })
      .from(products)
      .innerJoin(productSizes, eq(productSizes.productId, products.productId))
      .innerJoin(sizes, eq(sizes.sizeId, productSizes.sizeId))
      .where(eq(products.productId, id))
  );

  if (error) {
    throw new Error(error.message);
  }

  const product: Record<string, any> = {};

  data.forEach((item: any) => {
    if (!product[item.id]) {
      product[item.id] = {
        id: item.id,
        name: item.name,
        image: item.image,
        basePrice: item.basePrice,
        category: item.category,
        description: item.description,
        shortDiscription: item.shortDiscription,
        isActive: item.isActive,
        categoryId: item.categoryId,
        sizes: [item.size_name],
        colors: [],
      };
    }

    if (!product[item.id].sizes.includes(item.size_name)) {
      product[item.id].sizes.push(item.size_name);
    }
  });

  const { data: related_products, error: related_products_error } =
    await tryCatch(
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
            eq(products.categoryId, product[id].categoryId)
          )
        )
        .orderBy(products.createdAt)
        .limit(4)
    );

  if (related_products_error) {
    return { error: related_products_error.message };
  }

  return { related_products: related_products, product: product[id] };
}
