import { ProductCard } from "@/components/product-card";
import { ProductFilter } from "@/components/product-filter";
import { Pagination } from "@/components/pagination";

export default function ProductsPage() {
  const products = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "T-Shirts",
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Jeans",
    },
    {
      id: "3",
      name: "Casual Hoodie",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Hoodies",
    },
    {
      id: "4",
      name: "Summer Dress",
      price: 79.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Dresses",
    },
    {
      id: "5",
      name: "Leather Jacket",
      price: 129.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Jackets",
    },
    {
      id: "6",
      name: "Formal Shirt",
      price: 69.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Shirts",
    },
    {
      id: "7",
      name: "Wool Sweater",
      price: 89.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Sweaters",
    },
    {
      id: "8",
      name: "Cargo Pants",
      price: 74.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "Pants",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">All Products</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ProductFilter />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
          <div className="mt-12">
            <Pagination totalPages={5} currentPage={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
