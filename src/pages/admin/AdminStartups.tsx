import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const startups = [
  { id: 1, name: "TechVenture AI", sector: "AI/ML", stage: "Series A", score: 87, status: "Verified" },
  { id: 2, name: "GreenTech Solutions", sector: "CleanTech", stage: "Seed", score: 72, status: "Pending" },
  { id: 3, name: "FinanceFlow", sector: "FinTech", stage: "Series B", score: 91, status: "Verified" },
  { id: 4, name: "HealthFirst", sector: "HealthTech", stage: "Pre-Seed", score: 65, status: "Verified" },
  { id: 5, name: "EduLearn Pro", sector: "EdTech", stage: "Seed", score: 78, status: "Under Review" },
  { id: 6, name: "LogiTrack", sector: "Logistics", stage: "Series A", score: 84, status: "Verified" },
];

export default function AdminStartups() {
  return (
    <AdminLayout title="Startups">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Startups</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search startups..." className="pl-9 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Startup</th>
                  <th className="pb-3 font-medium">Sector</th>
                  <th className="pb-3 font-medium">Stage</th>
                  <th className="pb-3 font-medium">Score</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {startups.map((startup) => (
                  <tr key={startup.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{startup.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground">{startup.sector}</td>
                    <td className="py-4">
                      <Badge variant="secondary">{startup.stage}</Badge>
                    </td>
                    <td className="py-4">
                      <span className={`font-semibold ${startup.score >= 80 ? 'text-green-600' : startup.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {startup.score}%
                      </span>
                    </td>
                    <td className="py-4">
                      <Badge 
                        variant="outline"
                        className={
                          startup.status === "Verified" ? "border-green-500 text-green-600" :
                          startup.status === "Under Review" ? "border-yellow-500 text-yellow-600" :
                          "border-gray-500 text-gray-600"
                        }
                      >
                        {startup.status}
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
