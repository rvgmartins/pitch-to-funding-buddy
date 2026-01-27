import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";

const subscriptions = [
  { id: 1, user: "João Silva", plan: "Pro", amount: "€99/mo", started: "Jan 15, 2024", nextBilling: "Feb 15, 2024", status: "Active" },
  { id: 2, user: "Maria Santos", plan: "Starter", amount: "€29/mo", started: "Dec 3, 2023", nextBilling: "Feb 3, 2024", status: "Active" },
  { id: 3, user: "Pedro Costa", plan: "Pro", amount: "€99/mo", started: "Nov 20, 2023", nextBilling: "Feb 20, 2024", status: "Cancelled" },
  { id: 4, user: "Ana Oliveira", plan: "Enterprise", amount: "€499/mo", started: "Oct 1, 2023", nextBilling: "Feb 1, 2024", status: "Active" },
  { id: 5, user: "Carlos Ferreira", plan: "Starter", amount: "€29/mo", started: "Jan 8, 2024", nextBilling: "Feb 8, 2024", status: "Past Due" },
  { id: 6, user: "Sofia Martins", plan: "Free", amount: "€0/mo", started: "Jan 20, 2024", nextBilling: "-", status: "Active" },
];

export default function AdminSubscriptions() {
  return (
    <AdminLayout title="Subscriptions">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">892</div>
            <p className="text-sm text-muted-foreground">Active Subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">€47,830</div>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <p className="text-sm text-muted-foreground">Past Due</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">45</div>
            <p className="text-sm text-muted-foreground">Cancelled This Month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Subscriptions</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search subscriptions..." className="pl-9 w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Started</th>
                  <th className="pb-3 font-medium">Next Billing</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{sub.user}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant="secondary">{sub.plan}</Badge>
                    </td>
                    <td className="py-4 font-medium">{sub.amount}</td>
                    <td className="py-4 text-muted-foreground">{sub.started}</td>
                    <td className="py-4 text-muted-foreground">{sub.nextBilling}</td>
                    <td className="py-4">
                      <Badge 
                        variant="outline"
                        className={
                          sub.status === "Active" ? "border-green-500 text-green-600" :
                          sub.status === "Cancelled" ? "border-red-500 text-red-600" :
                          "border-yellow-500 text-yellow-600"
                        }
                      >
                        {sub.status}
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
