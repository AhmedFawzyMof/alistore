"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useMobile } from "@/hooks/use-mobile";

export function Header() {
  const isMobile = useMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-screen-2xl mx-auto container flex h-16 items-center px-4 md:px-6">
        {isMobile && (
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl text-black">Ali Store</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="font-medium transition-colors hover:text-black"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="font-medium transition-colors hover:text-black"
          >
            Shop All
          </Link>
          <Link
            href="/categories"
            className="font-medium transition-colors hover:text-black"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="font-medium transition-colors hover:text-black"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-medium transition-colors hover:text-black"
          >
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen && !isMobile ? (
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] md:w-[300px] pr-8 border-gray-200 focus:border-gray-400"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 text-gray-500"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-gray-600 hover:text-black hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="text-gray-600 hover:text-black hover:bg-gray-100"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
      {isMobile && (
        <nav
          className={`md:hidden ${
            isMenuOpen ? "max-h-60 px-4 py-3" : "max-h-0"
          } overflow-hidden flex flex-col items-end gap-6 text-sm transition-all duration-300 ease-in-out`}
        >
          <Link
            href="/"
            className="font-medium transition-colors hover:text-black"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="font-medium transition-colors hover:text-black"
          >
            Shop All
          </Link>
          <Link
            href="/categories"
            className="font-medium transition-colors hover:text-black"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="font-medium transition-colors hover:text-black"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-medium transition-colors hover:text-black"
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
