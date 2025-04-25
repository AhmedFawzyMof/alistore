"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export function ProductFilter() {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2">Search</h3>
        <div className="relative">
          <Input placeholder="Search products..." />
        </div>
      </div>

      <Separator />

      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">Categories</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                categoryOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="category-all" />
            <Label htmlFor="category-all">All Categories</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-tshirts" />
            <Label htmlFor="category-tshirts">T-Shirts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-jeans" />
            <Label htmlFor="category-jeans">Jeans</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-dresses" />
            <Label htmlFor="category-dresses">Dresses</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-jackets" />
            <Label htmlFor="category-jackets">Jackets</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-sweaters" />
            <Label htmlFor="category-sweaters">Sweaters</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={sizeOpen} onOpenChange={setSizeOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">Size</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                sizeOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="size-all" />
              <Label htmlFor="size-all">All Sizes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xs" id="size-xs" />
              <Label htmlFor="size-xs">XS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="s" id="size-s" />
              <Label htmlFor="size-s">S</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="m" id="size-m" />
              <Label htmlFor="size-m">M</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="l" id="size-l" />
              <Label htmlFor="size-l">L</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xl" id="size-xl" />
              <Label htmlFor="size-xl">XL</Label>
            </div>
          </RadioGroup>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={colorOpen} onOpenChange={setColorOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">Color</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                colorOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="w-8 h-8 rounded-full p-0 border-2 flex items-center justify-center"
              style={{ backgroundColor: "white" }}
            >
              <Check className="h-4 w-4 text-primary" />
              <span className="sr-only">White</span>
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 rounded-full p-0 border-2"
              style={{ backgroundColor: "black" }}
            >
              <span className="sr-only">Black</span>
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 rounded-full p-0 border-2"
              style={{ backgroundColor: "#6b7280" }}
            >
              <span className="sr-only">Gray</span>
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 rounded-full p-0 border-2"
              style={{ backgroundColor: "#ef4444" }}
            >
              <span className="sr-only">Red</span>
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 rounded-full p-0 border-2"
              style={{ backgroundColor: "#3b82f6" }}
            >
              <span className="sr-only">Blue</span>
            </Button>
            <Button
              variant="outline"
              className="w-8 h-8 rounded-full p-0 border-2"
              style={{ backgroundColor: "#22c55e" }}
            >
              <span className="sr-only">Green</span>
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <h3 className="font-medium">Price Range</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                priceOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex items-center justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Button className="w-full">Apply Filters</Button>
    </div>
  );
}
