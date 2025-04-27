import db from "@/db";
import { categories, products } from "@/db/schemas";
import { tryCatch } from "@/lib/trycatch";
import { eq } from "drizzle-orm";

export async function getCategories() {
  const { data, error } = await tryCatch(
    db
      .select({
        id: categories.categoryId,
        name: categories.name,
        image: categories.image,
      })
      .from(categories)
      .orderBy(categories.name)
  );

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getProducts() {
  const { data, error } = await tryCatch(
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
      .where(eq(products.isActive, true))
      .orderBy(products.createdAt)
      .limit(4)
  );

  if (error) {
    return { error: error.message };
  }

  return { data };
}
