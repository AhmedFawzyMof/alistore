import { ProductCard } from "@/components/product-card";
import { getProducts } from "./actions";

export default async function CategoryProducts({ params }: { params: any }) {
  const products = await getProducts(Number(params.id));

  return (
    <div
      dir="rtl"
      className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16"
    >
      <h1 className="text-3xl font-bold tracking-tight mb-8">جميع المنتجات</h1>
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
    </div>
  );
}
