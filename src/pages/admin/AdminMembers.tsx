import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const members = [
  { id: 1, name: "João Silva", email: "joao@techventure.ai", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Maria Santos", email: "maria@greentech.com", role: "User", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Pedro Costa", email: "pedro@startup.io", role: "User", status: "Inactive", lastLogin: "1 week ago" },
  { id: 4, name: "Ana Oliveira", email: "ana@fintech.pt", role: "Admin", status: "Active", lastLogin: "5 min ago" },
  { id: 5, name: "Carlos Ferreira", email: "carlos@healthtech.com", role: "User", status: "Pending", lastLogin: "Never" },
];

export default function AdminMembers() {
  return (
    <AdminLayout title="Members">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Members</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-9 w-64" />
            </div>
            <Button>Add Member</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Last Login</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b last:border-0">
                    <td className="py-4 font-medium">{member.name}</td>
                    <td className="py-4 text-muted-foreground">{member.email}</td>
                    <td className="py-4">
                      <Badge variant={member.role === "Admin" ? "default" : "secondary"}>
                        {member.role}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge 
                        variant="outline"
                        className={
                          member.status === "Active" ? "border-green-500 text-green-600" :
                          member.status === "Inactive" ? "border-gray-500 text-gray-600" :
                          "border-yellow-500 text-yellow-600"
                        }
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-muted-foreground">{member.lastLogin}</td>
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
