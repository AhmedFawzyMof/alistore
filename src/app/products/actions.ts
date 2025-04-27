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
import { desc, eq, like, gte, lte, and } from "drizzle-orm";
import { tryCatch } from "@/lib/trycatch";

export async function filterData() {
  const { data: categories_data, error: categories_error } = await tryCatch(
    db
      .select({
        id: categories.categoryId,
        name: categories.name,
      })
      .from(categories)
  );

  if (categories_error) {
    return { categories_data: categories_error.message };
  }

  const { data: colors_data, error: colors_error } = await tryCatch(
    db
      .select({
        id: colors.colorId,
        name: colors.name,
      })
      .from(colors)
  );

  if (colors_error) {
    return { colors_data: colors_error.message };
  }

  const { data: sizes_data, error: sizes_error } = await tryCatch(
    db
      .select({
        id: sizes.sizeId,
        name: sizes.name,
      })
      .from(sizes)
  );

  if (sizes_error) {
    return { sizes_data: sizes_error.message };
  }

  const { data: highPrice_data, error: highPrice_error } = await tryCatch(
    db
      .select({
        basePrice: products.basePrice,
      })
      .from(products)
      .orderBy(desc(products.basePrice))
      .limit(1)
  );

  if (highPrice_error) {
    return { highPrice_data: highPrice_error.message };
  }

  return {
    categories_data,
    colors_data,
    sizes_data,
    highPrice: highPrice_data[0].basePrice,
  };
}

export async function getProducts(options: {
  search?: string;
  category?: string;
  color?: string;
  size?: string;
  priceRange?: string;
  page?: string;
}) {
  const page = Number(options.page) || 1;
  const limit = 50;
  const offset = (page - 1) * limit;

  const conditions = [eq(products.isActive, true)];

  if (options.search && options.search.trim() !== "") {
    conditions.push(like(products.name, `%${options.search.trim()}%`));
  }

  if (options.category && options.category !== "all") {
    conditions.push(eq(products.categoryId, Number(options.category)));
  }

  if (options.color && options.color !== "all") {
    conditions.push(eq(productColors.colorId, Number(options.color)));
  }

  if (options.size && options.size !== "all") {
    conditions.push(eq(productSizes.sizeId, Number(options.size)));
  }

  if (options.priceRange) {
    const [min, max] = options.priceRange.split(",");
    if (min) {
      conditions.push(gte(products.basePrice, Number(min)));
    }
    if (max) {
      conditions.push(lte(products.basePrice, Number(max)));
    }
  }

  const { data, error } = await tryCatch(
    db
      .selectDistinct({
        id: products.productId,
        name: products.name,
        image: products.image,
        basePrice: products.basePrice,
        color: productColors.colorId,
        size: productSizes.sizeId,
        category: categories.name,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.categoryId))
      .innerJoin(colors, eq(colors.colorId, productColors.colorId))
      .innerJoin(productColors, eq(productColors.productId, products.productId))
      .innerJoin(sizes, eq(sizes.sizeId, productSizes.sizeId))
      .innerJoin(productSizes, eq(productSizes.productId, products.productId))
      .where(and(...conditions))
      .orderBy(products.createdAt)
      .groupBy(products.productId)
      .limit(limit)
      .offset(offset)
  );

  if (error) {
    console.error(error);
    return { data: error.message };
  }

  return { data };
}
