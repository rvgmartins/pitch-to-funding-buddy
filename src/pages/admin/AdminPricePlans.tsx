import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2, Check } from "lucide-react";

const plans = [
  { 
    id: 1, 
    name: "Free", 
    price: "€0", 
    period: "/month", 
    subscribers: 1247,
    features: ["1 Startup", "Basic Deck Analysis", "Community Support"],
    status: "Active"
  },
  { 
    id: 2, 
    name: "Starter", 
    price: "€29", 
    period: "/month", 
    subscribers: 456,
    features: ["3 Startups", "Advanced Deck Analysis", "Email Support", "Investor Matching"],
    status: "Active"
  },
  { 
    id: 3, 
    name: "Pro", 
    price: "€99", 
    period: "/month", 
    subscribers: 234,
    features: ["Unlimited Startups", "AI-Powered Insights", "Priority Support", "Investor Network Access", "Custom Branding"],
    status: "Active"
  },
  { 
    id: 4, 
    name: "Enterprise", 
    price: "Custom", 
    period: "", 
    subscribers: 12,
    features: ["Everything in Pro", "Dedicated Account Manager", "API Access", "White-label Solution", "SLA Guarantee"],
    status: "Active"
  },
];

export default function AdminPricePlans() {
  return (
    <AdminLayout title="Price Plans">
      <div className="flex justify-end mb-6">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <Badge variant="outline" className="border-green-500 text-green-600">
                  {plan.status}
                </Badge>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {plan.subscribers} subscribers
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
