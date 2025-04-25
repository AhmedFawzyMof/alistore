import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="max-w-screen-2xl mx-auto container px-4 md:px-6">
          <div className="w-full grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
                  Discover Your Style
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  Explore our curated collection of premium clothing for every
                  occasion. From casual to formal, we have something for
                  everyone.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="gap-1.5">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/placeholder.svg?height=550&width=450"
                alt="Hero Image"
                className="aspect-[4/5] overflow-hidden rounded-xl object-cover shadow-lg"
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
                Featured Products
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Check out our latest arrivals and bestsellers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <ProductCard
              id="1"
              name="Classic White T-Shirt"
              price={29.99}
              image="/placeholder.svg?height=400&width=300"
              category="T-Shirts"
            />
            <ProductCard
              id="2"
              name="Slim Fit Jeans"
              price={59.99}
              image="/placeholder.svg?height=400&width=300"
              category="Jeans"
            />
            <ProductCard
              id="3"
              name="Casual Hoodie"
              price={49.99}
              image="/placeholder.svg?height=400&width=300"
              category="Hoodies"
            />
            <ProductCard
              id="4"
              name="Summer Dress"
              price={79.99}
              image="/placeholder.svg?height=400&width=300"
              category="Dresses"
            />
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-black hover:bg-gray-100"
              >
                View All Products
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
                Shop by Category
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Find exactly what you're looking for
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            <CategoryCard
              name="Men's Collection"
              image="/placeholder.svg?height=300&width=400"
              count={42}
              href="/categories/mens"
            />
            <CategoryCard
              name="Women's Collection"
              image="/placeholder.svg?height=300&width=400"
              count={56}
              href="/categories/womens"
            />
            <CategoryCard
              name="Accessories"
              image="/placeholder.svg?height=300&width=400"
              count={24}
              href="/categories/accessories"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
