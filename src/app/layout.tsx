import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ali Store - Premium Clothing Store",
  description:
    "Discover the latest fashion trends and premium clothing for all occasions",
  keywords: ["Ali Store", "Clothing", "Fashion", "Print(name)", "AhmedMoftah"],
  authors: [
    { name: "Ahmed Moftah", url: "https://github.com/AhmedMoftah" },
    { name: "Mohanad Refaei" },
    {
      name: "Print(name)",
      url: "https://www.tiktok.com/@printnamehq?_t=ZS-8vq3H94ul0s&_r=1",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={cairo.className}>
      <body>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
