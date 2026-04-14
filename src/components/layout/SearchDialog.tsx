"use client";

import * as React from "react";
import { Search } from "lucide-react";
import Image from "next/image";
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
import { getPublicProducts } from "@/lib/actions/products";
import { Product } from "@/lib/types/firestore";
import { useLanguage } from "../language-provider";
import { formatPrice } from "@/lib/utils";

export function SearchDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const router = useRouter();
  const { t } = useLanguage();

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
      getPublicProducts().then(setProducts);
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
            placeholder={t("search.placeholder")} 
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[400px]">
            <CommandEmpty>{t("search.no_results")}</CommandEmpty>
            <CommandGroup heading={query ? t("search.results") : t("search.suggested")}>
              {filteredProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  value={`${product.name} ${product.sku}`}
                  onSelect={() => onSelect(product.id)}
                  className="flex items-center gap-3 p-3 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center shrink-0 border border-border/50">
                    {product.image_urls?.[0] ? (
                      <Image src={product.image_urls[0]} alt="" width={40} height={40} className="w-full h-full object-contain p-1" />
                    ) : (
                      <Search className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                  </div>
                  <div className="text-sm font-extrabold text-primary flex flex-col items-end">
                    <span>{formatPrice(product.price)} €</span>
                    <span className="text-[9px] font-normal text-muted-foreground/80 uppercase tracking-widest">{t("product.incl_vat")} {product.tax_rate || 25.5}%</span>
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
