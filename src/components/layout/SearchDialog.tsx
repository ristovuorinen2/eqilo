"use client";

import * as React from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/actions/admin";
import { Product } from "@/lib/types/firestore";

export function SearchDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (open && products.length === 0) {
      getProducts().then(setProducts);
    }
  }, [open, products.length]);

  const onSelect = (id: string) => {
    setOpen(false);
    router.push(`/product/${id}`);
  };

  const filteredProducts = query 
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase()))
    : products.slice(0, 10); // Show max 10 initially

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search equipment by name or SKU... (⌘K)" 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[400px]">
            <CommandEmpty>No equipment found matching your search.</CommandEmpty>
            <CommandGroup heading={query ? "Search Results" : "Suggested Equipment"}>
              {filteredProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  value={`${product.name} ${product.sku}`}
                  onSelect={() => onSelect(product.id)}
                  className="flex items-center gap-3 p-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0 border">
                    <Search className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate text-sm">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">SKU: {product.sku}</p>
                  </div>
                  <div className="font-bold text-sm">
                    €{product.price.toFixed(2)}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
