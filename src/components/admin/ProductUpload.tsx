"use client";

import { useState } from "react";
import { importProducts } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProductUpload({ onImportSuccess }: { onImportSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAction(formData: FormData) {
    setLoading(true);
    setMessage("");
    
    try {
      const res = await importProducts(formData);
      if (res.success) {
        setMessage(`Success: Imported ${res.count} products.`);
        onImportSuccess();
      } else {
        setMessage(`Error: ${res.error}`);
      }
    } catch (e: any) {
      setMessage(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">Import Products from Excel</h3>
      <p className="text-sm text-muted-foreground">Upload the Price List 2026 V3.0.xlsx file to initialize the product catalog.</p>
      
      <form action={handleAction} className="flex items-end gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="file">Excel File</Label>
          <Input id="file" name="file" type="file" accept=".xlsx,.xls" required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Importing..." : "Upload & Import"}
        </Button>
      </form>
      {message && <p className="text-sm font-medium mt-2">{message}</p>}
    </div>
  );
}
