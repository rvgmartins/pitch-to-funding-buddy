import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Server, Database, Cpu, HardDrive, RefreshCw, Activity } from "lucide-react";

const systemStatus = [
  { name: "API Server", status: "Operational", uptime: "99.99%", icon: Server },
  { name: "Database", status: "Operational", uptime: "99.95%", icon: Database },
  { name: "AI Processing", status: "Operational", uptime: "99.87%", icon: Cpu },
  { name: "Storage", status: "Operational", uptime: "100%", icon: HardDrive },
];

const recentLogs = [
  { time: "14:32:05", level: "INFO", message: "User login successful: joao@techventure.ai" },
  { time: "14:31:42", level: "INFO", message: "Subscription payment processed: TXN-001" },
  { time: "14:30:18", level: "WARN", message: "Rate limit approaching for API endpoint /analyze" },
  { time: "14:28:55", level: "INFO", message: "Deck analysis completed for startup ID: 1247" },
  { time: "14:27:30", level: "ERROR", message: "Failed to send email notification: timeout" },
  { time: "14:25:12", level: "INFO", message: "New user registered: carlos@startup.io" },
];

export default function AdminSystem() {
  return (
    <AdminLayout title="System">
      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {systemStatus.map((system) => (
          <Card key={system.name}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <system.icon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{system.name}</p>
                  <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                    {system.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Uptime: {system.uptime}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Resource Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>Current system resource utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>CPU Usage</span>
                <span>42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Memory Usage</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Storage Usage</span>
                <span>35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>API Requests (24h)</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>System maintenance actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Backup Database
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              Run Health Check
            </Button>
            <Button variant="outline" className="w-full justify-start text-yellow-600 hover:text-yellow-700">
              <Server className="h-4 w-4 mr-2" />
              Restart Services
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Logs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>Recent system activity</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex gap-4 p-2 rounded bg-muted/50">
                <span className="text-muted-foreground">{log.time}</span>
                <Badge 
                  variant="outline" 
                  className={
                    log.level === "ERROR" ? "border-red-500 text-red-600" :
                    log.level === "WARN" ? "border-yellow-500 text-yellow-600" :
                    "border-blue-500 text-blue-600"
                  }
                >
                  {log.level}
                </Badge>
                <span className="flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
