import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, FileText, User } from "lucide-react";

const kycRequests = [
  { id: 1, name: "João Silva", company: "TechVenture AI", submitted: "2 hours ago", documents: 3, status: "Pending" },
  { id: 2, name: "Maria Santos", company: "GreenTech Solutions", submitted: "1 day ago", documents: 4, status: "Under Review" },
  { id: 3, name: "Pedro Costa", company: "FinanceFlow", submitted: "3 days ago", documents: 3, status: "Approved" },
  { id: 4, name: "Ana Oliveira", company: "HealthFirst", submitted: "5 days ago", documents: 2, status: "Rejected" },
  { id: 5, name: "Carlos Ferreira", company: "EduLearn Pro", submitted: "1 week ago", documents: 4, status: "Approved" },
];

export default function AdminKYC() {
  return (
    <AdminLayout title="KYC Verification">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">847</div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kycRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-muted-foreground">{request.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{request.submitted}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {request.documents} documents
                    </p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      request.status === "Approved" ? "border-green-500 text-green-600" :
                      request.status === "Rejected" ? "border-red-500 text-red-600" :
                      request.status === "Under Review" ? "border-yellow-500 text-yellow-600" :
                      "border-gray-500 text-gray-600"
                    }
                  >
                    {request.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
