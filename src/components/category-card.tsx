import Link from "next/link";

import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  name: string;
  image: string;
  href: string;
}

export function CategoryCard({ name, image, href }: CategoryCardProps) {
  const imagePath = image.startsWith("/") ? image : `/category/${image}`;

  return (
    <div className="group relative overflow-hidden rounded-lg">
      <Link href={href} className="block">
        <div className="relative h-[300px] w-full overflow-hidden">
          <img
            src={imagePath || "/placeholder.svg"}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
            <h3 className="text-2xl font-bold">{name}</h3>
            <Button className="mt-4" variant="outline" size="sm">
              تسوق الآن{" "}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
