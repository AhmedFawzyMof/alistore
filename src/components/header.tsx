"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { useMobile } from "@/hooks/use-mobile";
import { useCartStore } from "@/stores/cartStores";

export function Header() {
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartStore = useCartStore((state) => state);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cartStore.setCart(JSON.parse(storedCart));
    }

    if (!storedCart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b bg-white shadow-sm"
    >
      <div className="max-w-screen-2xl mx-auto container flex h-16 items-center justify-center gap-4 px-4 md:px-6">
        <div className="flex ml-auto gap-3">
          {isMobile && (
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-black">Ali Store</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-black"
            >
              الرئيسية
            </Link>
            <Link
              href="/products"
              className="font-medium transition-colors hover:text-black"
            >
              المتجر
            </Link>
            <Link
              href="/categories"
              className="font-medium transition-colors hover:text-black"
            >
              الأقسام
            </Link>
            <Link
              href="/contact"
              className="font-medium transition-colors hover:text-black"
            >
              اتصل بنا
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative text-gray-600 hover:text-black hover:bg-gray-100"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartStore.getTotalQuantity() > 0 && (
                <Badge className="absolute top-0 -left-2 -z-30">
                  {cartStore.getTotalQuantity()}
                </Badge>
              )}
              <span className="sr-only">عربة التسوق</span>
            </Button>
          </Link>
        </div>
      </div>
      {isMobile && (
        <nav
          className={`md:hidden ${
            isMenuOpen ? "max-h-60 px-4 py-3" : "max-h-0"
          } overflow-hidden flex flex-col items-start gap-6 text-sm transition-all duration-300 ease-in-out`}
        >
          <Link
            href="/"
            className="font-medium transition-colors hover:text-black"
          >
            الرئيسية
          </Link>
          <Link
            href="/products"
            className="font-medium transition-colors hover:text-black"
          >
            المتجر{" "}
          </Link>
          <Link
            href="/categories"
            className="font-medium transition-colors hover:text-black"
          >
            الأقسام
          </Link>
          <Link
            href="/contact"
            className="font-medium transition-colors hover:text-black"
          >
            اتصل بنا
          </Link>
        </nav>
      )}
    </header>
  );
}
