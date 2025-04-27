"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStores";

export default function CartPage() {
  const cartStore = useCartStore((state) => state);
  const [cartItems, setCartItems] = useState(cartStore.cart);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setCartItems(cartStore.cart);
    setSubTotal(
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [cartStore.cart, cartItems]);

  return (
    <div
      dir="rtl"
      className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16"
    >
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        سلة التسوق الخاصة بك
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            سلة التسوق الخاصة بك فارغة
          </h2>
          <p className="text-muted-foreground mb-6">
            يبدو أنك لم تقم بإضافة أي شيء إلى سلة التسوق الخاصة بك بعد.
          </p>
          <Link href="/products">
            <Button>متابعة التسوق</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="hidden md:grid md:grid-cols-6 text-sm text-muted-foreground mb-4">
                  <div className="md:col-span-3">المنتج</div>
                  <div className="text-center">السعر</div>
                  <div className="text-center">الكمية</div>
                  <div className="text-right">المجموع</div>
                </div>
                <Separator className="mb-6 hidden md:block" />
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4"
                    >
                      <div className="md:col-span-3 flex gap-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <Link
                              href={`/products/${item.id}`}
                              className="hover:underline"
                            >
                              {item.name}
                            </Link>
                          </h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            <p>مقاس: {item.size}</p>
                            <p>اللون: {item.color}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground md:hidden mt-2"
                            onClick={() => {
                              cartStore.removeFromCart(item.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            إزالة
                          </Button>
                        </div>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <span className="md:hidden font-medium mr-2">
                          السعر:
                        </span>
                        {item.price.toFixed(2)}
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="md:hidden font-medium mr-2">
                          الكمية:
                        </span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              cartStore.decrementQuantity(item.id);
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              cartStore.incrementQuantity(item.id);
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end">
                        <span className="md:hidden font-medium mr-2">
                          المجموع:
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground hidden md:flex ml-4"
                          onClick={() => {
                            cartStore.removeFromCart(item.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <Link href="/products">
                <Button variant="outline" className="gap-1">
                  <ChevronRight className="h-4 w-4" />
                  متابعة التسوق
                </Button>
              </Link>
              <Button variant="outline" onClick={() => cartStore.clearCart()}>
                إزالة الكل
              </Button>
            </div>
          </div>
          <div>
            <div className="rounded-lg border shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold">ملخص الطلب</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>EGP {subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">شحن</span>
                  <span>EGP 30</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>المجموع</span>
                  <span>EGP {(subTotal + 30).toFixed(2)}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/checkout">
                  <Button className="w-full">الشروع في الخروج</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
