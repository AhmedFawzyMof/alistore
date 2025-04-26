import Link from "next/link";
import { CategoryCard } from "@/components/category-card";
import { getCategories } from "../actions";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">جميع الأقسام</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {categories.error && <p>حدث خطأ ما، يرجى المحاولة مرة أخرى</p>}
        {categories.data?.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            href={`/categories/${category.id}`}
          />
        ))}
      </div>
    </div>
  );
}
