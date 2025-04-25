"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Heart, Minus, Plus, Share2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";

export default function ProductPage({ params }: { params: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const { id } = use(params) as { id: string };

  const product = {
    id: id,
    name: "Classic White T-Shirt",
    price: 29.99,
    description:
      "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear and easy to style with any outfit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray", "Navy"],
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    rating: 4.5,
    reviewCount: 128,
  };

  // Mock related products
  const relatedProducts = [
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
  ];

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (!selectedSize) {
      toast.warning("Please select a size");
      return;
    }

    if (!selectedColor) {
      toast.warning("Please select a color");
      return;
    }

    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} (${selectedSize}, ${selectedColor})`,
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm font-medium mb-8 hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border cursor-pointer"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full object-cover aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                        ? "fill-primary text-primary opacity-50"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <p className="text-muted-foreground">{product.description}</p>

          <div>
            <h3 className="font-medium mb-2">
              Size <span className="text-red-500">*</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="w-12 h-12"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-sm text-muted-foreground mt-1">
                Please select a size
              </p>
            )}
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-2">
              Color <span className="text-red-500">*</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
            {!selectedColor && (
              <p className="text-sm text-muted-foreground mt-1">
                Please select a color
              </p>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" size="lg" onClick={addToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <div className="space-y-4">
          <p>
            Our Classic White T-Shirt is a wardrobe essential that combines
            comfort, quality, and style. Made from 100% organic cotton, this
            t-shirt offers breathability and softness that lasts wash after
            wash.
          </p>
          <p>
            The versatile design makes it perfect for layering or wearing on its
            own. The classic fit is neither too loose nor too tight, providing a
            comfortable silhouette that flatters any body type.
          </p>
          <p>
            This t-shirt is ethically manufactured using sustainable practices,
            making it an environmentally conscious choice without compromising
            on quality or comfort.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedProducts.map((product) => (
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
      </div>
    </div>
  );
}
