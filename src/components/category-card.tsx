import Link from "next/link";

import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
  href: string;
}

export function CategoryCard({ name, image, count, href }: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Link href={href} className="block">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="mt-2">{count} Products</p>
            <Button className="mt-4" variant="outline" size="sm">
              Shop Now
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
