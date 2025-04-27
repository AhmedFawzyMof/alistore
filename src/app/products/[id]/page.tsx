"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { getProductDetails } from "./actions";
import { tryCatch } from "@/lib/trycatch";
import { useCartStore } from "@/stores/cartStores";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductPage({ params }: { params: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [relatedProducts, setRelatedProducts] = useState<any>([]);
  const [inCart, setInCart] = useState(false);
  const cartStore = useCartStore((state) => state);

  const { id } = use(params) as { id: string };

  useEffect(() => {
    async function fetchProductDetails() {
      const { data, error } = await tryCatch(getProductDetails(Number(id)));

      if (error) {
        toast.error(error.message);
        return;
      }

      setProduct(data.product);
      setRelatedProducts(data.related_products);
    }

    fetchProductDetails();

    const itemInCart = cartStore.productInCart(Number(id));

    if (itemInCart) {
      setQuantity(itemInCart.quantity);
      setSelectedSize(itemInCart.size);
      setSelectedColor(itemInCart.color);
    }
    setInCart(!!itemInCart);
  }, []);

  const incrementQuantity = () => {
    if (quantity < 20) {
      if (inCart) {
        cartStore.incrementQuantity(Number(id));
        setQuantity(cartStore.productInCart(Number(id))!.quantity);
      }

      setQuantity(quantity + 1);
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      if (inCart) {
        cartStore.decrementQuantity(Number(id));
      }
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (inCart) {
      toast.error("Item already in cart");
      return;
    }

    if (product.sizes.length > 0) {
      if (!selectedSize) {
        toast.warning("Please select a size");
        return;
      }
    }

    if (product.colors.length > 0) {
      if (!selectedColor) {
        toast.warning("Please select a color");
        return;
      }
    }

    cartStore.addToCart({
      id: Number(id),
      name: product.name,
      image: product.image,
      price: product.basePrice,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    });

    setInCart(true);
    const itemInCart = cartStore.productInCart(Number(id));
    setQuantity(itemInCart!.quantity);
    setSelectedSize(itemInCart!.size);
    setSelectedColor(itemInCart!.color);

    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} (${selectedSize}, ${selectedColor})`,
    });
  };

  return (
    <div
      dir="rtl"
      className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16"
    >
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm font-medium mb-8 hover:underline"
      >
        <ChevronRight className="h-4 w-4" />
        العودة إلى المنتجات
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="text-2xl font-bold">EGP {product.basePrice}</div>

          <p className="text-muted-foreground">{product.shortDiscription}</p>

          {product.sizes?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">
                مقاس <span className="text-red-500">*</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="w-12 h-12 uppercase"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-muted-foreground mt-1">
                  الرجاء تحديد مقاس
                </p>
              )}
            </div>
          )}
          {product.colors?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">
                اللون <span className="text-red-500">*</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color: string) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                    className="uppercase"
                  >
                    {color}
                  </Button>
                ))}
              </div>
              {!selectedColor && (
                <p className="text-sm text-muted-foreground mt-1">
                  الرجاء اختيار اللون
                </p>
              )}
            </div>
          )}
          <div>
            <h3 className="font-medium mb-2">الكمية</h3>
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
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= 20}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" size="lg" onClick={addToCart}>
              أضف إلى السلة
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">وصف</h2>
        <div className="space-y-4">
          <p>{product.description}</p>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">قد يعجبك أيضاً</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map(
              (product: {
                id: number;
                name: string;
                basePrice: number;
                image: string;
                category: string;
              }) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.basePrice}
                  image={product.image}
                  category={product.category}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
