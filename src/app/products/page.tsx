import { ProductCard } from "@/components/product-card";
import { ProductFilter } from "@/components/product-filter";
import { Pagination } from "@/components/pagination";
import { filterData, getProducts } from "./actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductsPage({ searchParams }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = await filterData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: any = await getProducts(await searchParams);

  return (
    <div
      dir="rtl"
      className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16"
    >
      <h1 className="text-3xl font-bold tracking-tight mb-8">جميع المنتجات</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ProductFilter data={filter} />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.data.length === 0 && <p>لا يوجد منتجات</p>}
            {products.error && <p>حدث خطاء ما، يرجى المحاولة مرة اخرى</p>}
            {products.data.map((product: any) => (
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
          <div dir="ltr" className="mt-12">
            <Pagination
              totalPages={products.totalPages}
              currentPage={products.currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
