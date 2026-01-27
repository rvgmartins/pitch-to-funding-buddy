import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, CheckCircle, Menu } from "lucide-react";

const currentPlan = {
  name: "Pro",
  price: "€99",
  period: "/month",
  status: "Active",
  nextBilling: "Feb 15, 2024",
  features: [
    "Unlimited pitch analysis",
    "Full fundraising insights",
    "Priority support",
    "Custom reports"
  ]
};

const paymentHistory = [
  { id: "INV-001", date: "Jan 15, 2024", amount: "€99.00", status: "Paid", method: "Visa ****4242" },
  { id: "INV-002", date: "Dec 15, 2023", amount: "€99.00", status: "Paid", method: "Visa ****4242" },
  { id: "INV-003", date: "Nov 15, 2023", amount: "€99.00", status: "Paid", method: "Visa ****4242" },
  { id: "INV-004", date: "Oct 15, 2023", amount: "€99.00", status: "Paid", method: "Visa ****4242" },
];

const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: 2, type: "Mastercard", last4: "5555", expiry: "08/26", isDefault: false },
];

export default function Payments() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Mobile Header */}
          <div className="flex items-center gap-4 mb-6 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">Payments</h1>
          </div>

          {/* Header */}
          <div className="mb-8 hidden lg:block">
            <h1 className="text-2xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground">Manage your subscription and billing</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Current Plan */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Your active subscription</CardDescription>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    {currentPlan.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{currentPlan.price}</span>
                  <span className="text-muted-foreground">{currentPlan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Next billing date: <span className="font-medium text-foreground">{currentPlan.nextBilling}</span>
                </p>
                <div className="grid gap-2 mb-6">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="ghost" className="text-destructive hover:text-destructive">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your cards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {method.type} ****{method.last4}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires {method.expiry}
                        </p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge variant="secondary" className="text-xs">Default</Badge>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Invoice</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Method</th>
                      <th className="pb-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-0">
                        <td className="py-4 font-mono text-sm">{payment.id}</td>
                        <td className="py-4 text-muted-foreground">{payment.date}</td>
                        <td className="py-4 font-medium">{payment.amount}</td>
                        <td className="py-4">
                          <Badge 
                            variant="outline"
                            className="border-green-500 text-green-600"
                          >
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-muted-foreground text-sm">{payment.method}</td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
