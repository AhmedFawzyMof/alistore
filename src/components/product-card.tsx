"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string | null;
  category: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
}: ProductCardProps) {
  const goToProduct = () => {
    window.location.href = `/products/${id}`;
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/products/${id}`} className="relative block overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
      <div className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-medium text-gray-900 hover:text-black transition-colors">
            {name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm text-gray-500">{category}</p>
          <p className="font-medium text-gray-900">EGP {price.toFixed(2)}</p>
        </div>
        <Button className="mt-4 w-full" size="sm" onClick={goToProduct}>
          عرض تفاصيل المنتج
        </Button>
      </div>
    </div>
  );
}
