import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Eye, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Pitches Submetidos",
    value: "12",
    change: "+2",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Visualizações",
    value: "1,847",
    change: "+12%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Interesse de Investidores",
    value: "8",
    change: "+3",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Tempo Médio de Análise",
    value: "2.3 dias",
    change: "-0.5",
    trend: "down",
    icon: Clock,
  },
];

const chartData = [
  { name: "Jan", views: 120, interest: 2 },
  { name: "Fev", views: 280, interest: 4 },
  { name: "Mar", views: 450, interest: 5 },
  { name: "Abr", views: 380, interest: 3 },
  { name: "Mai", views: 620, interest: 7 },
  { name: "Jun", views: 847, interest: 8 },
];

const recentActivity = [
  {
    id: 1,
    type: "view",
    message: "Um investidor visualizou o seu pitch",
    time: "Há 2 horas",
    investor: "Venture Capital PT",
  },
  {
    id: 2,
    type: "interest",
    message: "Novo interesse demonstrado",
    time: "Há 5 horas",
    investor: "Tech Angels",
  },
  {
    id: 3,
    type: "view",
    message: "Um investidor visualizou o seu pitch",
    time: "Há 1 dia",
    investor: "Startup Lisboa Fund",
  },
  {
    id: 4,
    type: "feedback",
    message: "Feedback recebido sobre o pitch",
    time: "Há 2 dias",
    investor: "Portugal Ventures",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard" breadcrumb="Dashboard">
      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card transition-shadow hover:shadow-card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-success" />
                    )}
                    <span className="text-sm font-medium text-success">
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      vs mês anterior
                    </span>
                  </div>
                </div>
                <div className="stat-icon">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <BarChart3 className="h-5 w-5 text-primary" />
              Estatísticas de Visualização
            </CardTitle>
            <select className="rounded-lg border bg-background px-3 py-1.5 text-sm">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="stat-icon mt-0.5 !p-2">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.investor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
