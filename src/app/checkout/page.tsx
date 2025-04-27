"use client";

import type React from "react";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStores";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const cartStore = useCartStore((state) => state);
  const [cartItems, setCartItems] = useState(cartStore.cart);
  const [subTotal, setSubTotal] = useState(0);
  const [tabValue, setTabValue] = useState("details");

  useEffect(() => {
    setCartItems(cartStore.cart);
    setSubTotal(
      cartItems.reduce(
        (total, item: { price: number; quantity: number }) =>
          total + item.price * item.quantity,
        0
      )
    );
  }, [cartStore.cart, cartItems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed!", {
      description: "Your order has been successfully placed.",
    });
  };

  return (
    <div
      dir="rtl"
      className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16"
    >
      <Link
        href="/cart"
        className="inline-flex items-center gap-1 text-sm font-medium mb-8 hover:underline"
      >
        <ChevronRight className="h-4 w-4" />
        العودة إلى سلة التسوق
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-8">الدفع</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" value={tabValue} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="details"
                onClick={() => setTabValue("details")}
              >
                تفاصيل
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                onClick={() => setTabValue("shipping")}
              >
                الشحن
              </TabsTrigger>
            </TabsList>
            <TabsContent dir="rtl" value="details" className="space-y-6 pt-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">معلومات شخصية</h2>
                <p className="text-sm text-muted-foreground">
                  يرجى إدخال بياناتك الشخصية لإكمال طلبك.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">الاسم الأول</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">اسم العائلة</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">بريد إلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم التليفون</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  onClick={() => setTabValue("shipping")}
                  className="w-full"
                >
                  متابعة الشحن
                </Button>
              </form>
            </TabsContent>
            <TabsContent dir="rtl" value="shipping" className="space-y-6 pt-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">عنوان الشحن</h2>
                <p className="text-sm text-muted-foreground">
                  الرجاء إدخال عنوان الشحن الذي تريد تسليم طلبك إليه.
                </p>
              </div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">عنوان الشارع</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">شقة، جناح، وما إلى ذلك</Label>
                  <Input id="address2" placeholder="Apt 4B" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="save-address"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="save-address">
                      احفظ هذا العنوان للطلبات المستقبلية
                    </Label>
                  </div>
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  وضع الطلب
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <div className="text-xs text-muted-foreground mt-1">
                        <p>مقاس: {item.size}</p>
                        <p>اللون: {item.color}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        الكمية: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المجموع الفرعي</span>
                  <span>EGP {subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">شحن</span>
                  <span>EGP {30}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>المجموع</span>
                  <span>EGP {(subTotal + 30).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
