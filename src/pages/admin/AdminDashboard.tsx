import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CreditCard, Receipt, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { name: "Total Startups", value: "1,247", icon: Building2, change: "+12%" },
  { name: "Active Subscriptions", value: "892", icon: CreditCard, change: "+8%" },
  { name: "Total Transactions", value: "3,456", icon: Receipt, change: "+23%" },
  { name: "Total Members", value: "2,103", icon: Users, change: "+5%" },
];

const registrationData = [
  { date: "Jan 1", registrations: 12 },
  { date: "Jan 2", registrations: 19 },
  { date: "Jan 3", registrations: 8 },
  { date: "Jan 4", registrations: 25 },
  { date: "Jan 5", registrations: 32 },
  { date: "Jan 6", registrations: 18 },
  { date: "Jan 7", registrations: 29 },
  { date: "Jan 8", registrations: 45 },
  { date: "Jan 9", registrations: 38 },
  { date: "Jan 10", registrations: 52 },
  { date: "Jan 11", registrations: 41 },
  { date: "Jan 12", registrations: 67 },
  { date: "Jan 13", registrations: 55 },
  { date: "Jan 14", registrations: 48 },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationData}>
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="registrations" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRegistrations)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
