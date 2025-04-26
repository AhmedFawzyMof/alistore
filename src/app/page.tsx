import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { getCategories, getProducts } from "./actions";

export default async function Home() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <div dir="rtl" className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="max-w-screen-2xl mx-auto container px-4 md:px-6">
          <div className="w-full grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
                  اكتشف ستايلك
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  استكشف تشكيلتنا المختارة من اللبس الفاخر لكل مناسبة. من
                  الكاجوال للرسمي، هتلاقي عندنا حاجة لكل ذوق.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="gap-1.5">
                    تسوق الآن
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    شوف الأقسام
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/2.svg"
                alt="Hero Image"
                className="w-full overflow-hidden rounded-xl object-cover"
                width={450}
                height={550}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="max-w-screen-2xl mx-auto container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-black">
                أحدث المنتجات
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                اطلع على أحدث منتجاتنا
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {products.error && <p>حدث خطأ ما، يرجى المحاولة مرة أخرى</p>}
            {products.data?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.basePrice}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-black hover:bg-gray-100"
              >
                عرض جميع المنتجات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-black">
                تسوق على حسب القسم
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                هتلاقي بالظبط اللي بتدور عليه
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
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
      </section>
    </div>
  );
}
