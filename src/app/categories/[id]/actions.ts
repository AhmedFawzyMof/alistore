import { db } from "@/db";
import { categories, products } from "@/db/schemas";
import { tryCatch } from "@/lib/trycatch";
import { eq, and } from "drizzle-orm";

export async function getProducts(id: number) {
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
      .where(and(eq(products.categoryId, id), eq(products.isActive, true)))
      .orderBy(products.createdAt)
  );

  if (error) {
    return { error: error.message };
  }

  return { data };
}
