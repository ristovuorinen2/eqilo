import { adminDb } from "@/lib/firebase/admin";
import { Cart } from "@/lib/types/firestore";
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

async function getCarts(): Promise<Cart[]> {
  const snapshot = await adminDb.collection("carts").orderBy("updated_at", "desc").get();
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Cart);
}

export default async function AdminCartsPage() {
  const carts = await getCarts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Carts & Shareable Links</h1>
        <p className="text-muted-foreground">Manage active carts, override prices, and generate shareable links for customers.</p>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cart ID</TableHead>
              <TableHead>User / Customer ID</TableHead>
              <TableHead>Items Count</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No active carts found.</TableCell>
              </TableRow>
            ) : (
              carts.map((cart) => {
                const date = (cart.updated_at && 'toDate' in cart.updated_at) 
                  ? (cart.updated_at as any).toDate() 
                  : new Date(cart.updated_at as any);
                
                return (
                  <TableRow key={cart.id}>
                    <TableCell className="font-medium truncate max-w-[150px]">{cart.id}</TableCell>
                    <TableCell>{cart.user_id || "Anonymous"}</TableCell>
                    <TableCell>{cart.items.reduce((sum, item) => sum + item.quantity, 0)} items</TableCell>
                    <TableCell>
                      {cart.is_public_link ? (
                        <Badge variant="default">Public Link</Badge>
                      ) : (
                        <Badge variant="secondary">Private Cart</Badge>
                      )}
                    </TableCell>
                    <TableCell>{date.toLocaleDateString()} {date.toLocaleTimeString()}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
