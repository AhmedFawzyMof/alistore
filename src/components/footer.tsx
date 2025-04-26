import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer dir="rtl" className="bg-muted">
      <div className="max-w-screen-2xl mx-auto container px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Ali Store</h3>
            <p className="text-sm text-muted-foreground">
              لبس شيك لكل مناسبة. اكتشف أحدث الصيحات وكلاسيكيات ما بتقدمش.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">المتجر</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-foreground"
                >
                  الأقسام
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Print(name). All rights reserved.
          </p>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <p>تم إنشاء هذا الموقع بواسطة</p>
            <Link
              href="/https://www.tiktok.com/@printnamehq?_t=ZS-8vq3H94ul0s&_r=1"
              className="hover:text-foreground"
            >
              Print(name)
            </Link>
            <Link
              href="https://ahmedfawzymof.github.io/portfolio"
              className="hover:text-foreground"
            >
              Ahmed Moftah
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
