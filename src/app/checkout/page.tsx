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

      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-6 pt-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p className="text-sm text-muted-foreground">
                  Please enter your personal details to complete your order.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue to Shipping
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="shipping" className="space-y-6 pt-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Shipping Address</h2>
                <p className="text-sm text-muted-foreground">
                  Please enter your shipping address where you want your order
                  to be delivered.
                </p>
              </div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">
                    Apartment, suite, etc. (optional)
                  </Label>
                  <Input id="address2" placeholder="Apt 4B" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Select>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" placeholder="10001" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="save-address"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="save-address">
                      Save this address for future orders
                    </Label>
                  </div>
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  Place Order
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
