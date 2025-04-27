"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useRouter, usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductFilter({ data }: any) {
  const [priceRange, setPriceRange] = useState([0, data.highPrice]);
  const [options, setOptions] = useState({
    search: "",
    category: "all",
    color: "all",
    size: "all",
    priceRange: [0, data.highPrice],
  });
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleSupmit = async () => {
    const params = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      if (key === "priceRange") {
        value = priceRange[0] + "," + priceRange[1];
      }

      if (value) {
        params.append(key, value as string);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">بحث</h3>
        <div className="relative">
          <Input
            type="search"
            value={options.search}
            onChange={(e) => setOptions({ ...options, search: e.target.value })}
            placeholder="البحث عن المنتجات..."
          />
        </div>
      </div>

      <Separator />

      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">الأقسام</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                categoryOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-2">
          <RadioGroup
            dir="rtl"
            value={options.category}
            onValueChange={(value) =>
              setOptions({ ...options, category: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="category-all" />
              <Label htmlFor="category-all">جميع الأقسام</Label>
            </div>
            {data.categories_data.map(
              (category: { id: string; name: string }) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.id} id={category.id} />
                  <Label htmlFor={category.id}>{category.name}</Label>
                </div>
              )
            )}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={sizeOpen} onOpenChange={setSizeOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">مقاس</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                sizeOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <RadioGroup
            dir="rtl"
            value={options.size}
            onValueChange={(value) => setOptions({ ...options, size: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="size-all" />
              <Label htmlFor="size-all">جميع المقاسات</Label>
            </div>
            {data.sizes_data.map((size: { id: string; name: string }) => (
              <div
                key={size.id}
                className="flex items-center space-x-2 uppercase"
              >
                <RadioGroupItem value={size.id} id={`size-${size.name}`} />
                <Label htmlFor={`size-${size.name}`}>{size.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={colorOpen} onOpenChange={setColorOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">الألوان</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                colorOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <RadioGroup
            dir="rtl"
            value={options.color}
            onValueChange={(value) => setOptions({ ...options, color: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="color-all" />
              <Label htmlFor="color-all">جميع الألوان</Label>
            </div>
            {data.colors_data.map((color: { id: string; name: string }) => (
              <div
                key={color.id}
                className="flex items-center space-x-2 uppercase"
              >
                <RadioGroupItem value={color.id} id={`color-${color.name}`} />
                <Label htmlFor={`color-${color.name}`}>{color.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">نطاق السعر</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                priceOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            defaultValue={[0, data.highPrice]}
            max={data.highPrice}
            step={1}
            value={priceRange}
            onValueChange={(e) => {
              setPriceRange([...e.values()]);
              setOptions({
                ...options,
                priceRange: [...e.values()],
              });
            }}
          />
          <div className="flex items-center justify-between">
            <span>EGP {priceRange[1]}</span>
            <span>EGP {priceRange[0]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Button className="w-full" onClick={handleSupmit}>
        تطبيق
      </Button>
    </div>
  );
}
