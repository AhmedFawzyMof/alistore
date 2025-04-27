import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  userId: integer("user_id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.roleId),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const roles = sqliteTable("roles", {
  roleId: integer("role_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const categories = sqliteTable("categories", {
  categoryId: integer("category_id").primaryKey({ autoIncrement: true }),
  image: text("image").notNull(),
  name: text("name").notNull(),
});

export const products = sqliteTable("products", {
  productId: integer("product_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  image: text("image"),
  shortDiscription: text("short_discription"),
  description: text("description"),
  basePrice: real("base_price").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.categoryId),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const colors = sqliteTable("colors", {
  colorId: integer("color_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const sizes = sqliteTable("sizes", {
  sizeId: integer("size_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const productColors = sqliteTable("product_colors", {
  productColorId: integer("product_color_id").primaryKey({
    autoIncrement: true,
  }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.productId),
  colorId: integer("color_id")
    .notNull()
    .references(() => colors.colorId),
});

export const productSizes = sqliteTable("product_sizes", {
  productSizeId: integer("product_size_id").primaryKey({
    autoIncrement: true,
  }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.productId),
  sizeId: integer("size_id")
    .notNull()
    .references(() => sizes.sizeId),
});

export const orders = sqliteTable("orders", {
  orderId: integer("order_id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.userId),
  productId: integer("product_id")
    .notNull()
    .references(() => products.productId),
  quantity: integer("quantity").notNull(),
  address: text("address").notNull(),
  apartment: text("apartment").notNull(),
  city: text("city").notNull(),
  totalPrice: real("total_price").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
