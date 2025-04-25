"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=300",
      size: "M",
      color: "White",
      quantity: 1,
    },
    {
      id: "2",
      name: "Slim Fit Jeans",
      price: 59.99,
      image: "/placeholder.svg?height=400&width=300",
      size: "32",
      color: "Blue",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.error("Item removed", {
      description: "The item has been removed from your cart",
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="hidden md:grid md:grid-cols-6 text-sm text-muted-foreground mb-4">
                  <div className="md:col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
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
                            <p>Size: {item.size}</p>
                            <p>Color: {item.color}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground md:hidden mt-2"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="text-center flex items-center justify-center">
                        <span className="md:hidden font-medium mr-2">
                          Price:
                        </span>
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="md:hidden font-medium mr-2">
                          Quantity:
                        </span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end">
                        <span className="md:hidden font-medium mr-2">
                          Total:
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground hidden md:flex ml-4"
                          onClick={() => removeItem(item.id)}
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
                  <ChevronLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setCartItems([]);
                  toast.error("Cart cleared", {
                    description: "Your cart has been cleared.",
                  });
                }}
              >
                Clear Cart
              </Button>
            </div>
          </div>
          <div>
            <div className="rounded-lg border shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
