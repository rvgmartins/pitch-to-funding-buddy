import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const transactions = [
  { id: "TXN-001", user: "João Silva", type: "Subscription", amount: "+€99.00", date: "Jan 27, 2024", method: "Visa ****4242", status: "Completed" },
  { id: "TXN-002", user: "Maria Santos", type: "Subscription", amount: "+€29.00", date: "Jan 27, 2024", method: "Mastercard ****5555", status: "Completed" },
  { id: "TXN-003", user: "Pedro Costa", type: "Refund", amount: "-€99.00", date: "Jan 26, 2024", method: "Visa ****1234", status: "Completed" },
  { id: "TXN-004", user: "Ana Oliveira", type: "Subscription", amount: "+€499.00", date: "Jan 25, 2024", method: "Bank Transfer", status: "Pending" },
  { id: "TXN-005", user: "Carlos Ferreira", type: "Subscription", amount: "+€29.00", date: "Jan 24, 2024", method: "Visa ****9876", status: "Failed" },
  { id: "TXN-006", user: "Sofia Martins", type: "Upgrade", amount: "+€70.00", date: "Jan 23, 2024", method: "PayPal", status: "Completed" },
];

export default function AdminTransactions() {
  return (
    <AdminLayout title="Transactions">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-sm text-muted-foreground">Total Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">€125,430</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ArrowDownRight className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold text-red-600">€3,240</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Refunds</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9 w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Transaction ID</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Method</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b last:border-0">
                    <td className="py-4 font-mono text-sm">{txn.id}</td>
                    <td className="py-4 font-medium">{txn.user}</td>
                    <td className="py-4">
                      <Badge variant="secondary">{txn.type}</Badge>
                    </td>
                    <td className={`py-4 font-semibold ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount}
                    </td>
                    <td className="py-4 text-muted-foreground">{txn.date}</td>
                    <td className="py-4 text-muted-foreground text-sm">{txn.method}</td>
                    <td className="py-4">
                      <Badge 
                        variant="outline"
                        className={
                          txn.status === "Completed" ? "border-green-500 text-green-600" :
                          txn.status === "Failed" ? "border-red-500 text-red-600" :
                          "border-yellow-500 text-yellow-600"
                        }
                      >
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
