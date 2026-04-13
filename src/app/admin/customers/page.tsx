import { adminDb } from "@/lib/firebase/admin";
import { Customer } from "@/lib/types/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

async function getCustomers(): Promise<Customer[]> {
  const snapshot = await adminDb.collection("customers").get();
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Customer);
}

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers (CRM)</h1>
        <p className="text-muted-foreground">Manage your registered customers, B2B clients, and internal notes.</p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID / Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Business ID</TableHead>
              <TableHead>CRM Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No customers found.</TableCell>
              </TableRow>
            ) : (
              customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">
                    {c.email || c.id}
                  </TableCell>
                  <TableCell>{c.phone_number || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={c.role === "admin" ? "default" : c.role === "b2b_customer" ? "secondary" : "outline"}>
                      {c.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{c.business_id || "-"}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {c.crm_notes || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
