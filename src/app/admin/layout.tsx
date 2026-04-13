import Link from "next/link";
import { ReactNode } from "react";
import { LayoutDashboard, Package, Users, ShoppingCart } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="w-64 border-r bg-background flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold tracking-tight text-primary">Eqilo Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium">
            <Package className="h-4 w-4" />
            Products & Catalog
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium">
            <Users className="h-4 w-4" />
            Customers (CRM)
          </Link>
          <Link href="/admin/carts" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium">
            <ShoppingCart className="h-4 w-4" />
            Carts & Links
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
