"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/lib/actions/admin";
import { Product } from "@/lib/types/firestore";
import { ProductUpload } from "@/components/admin/ProductUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products & Catalog</h1>
        <p className="text-muted-foreground">Manage your store's inventory and categories.</p>
      </div>

      <ProductUpload onImportSuccess={loadProducts} />

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price (€)</TableHead>
              <TableHead className="text-right">Inventory</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading products...</TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No products found. Please import the price list.</TableCell>
              </TableRow>
            ) : (
              products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.sku}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell className="capitalize">{p.category_id.replace(/-/g, ' ')}</TableCell>
                  <TableCell className="text-right">{p.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{p.inventory_count}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
