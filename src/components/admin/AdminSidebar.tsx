import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ShieldCheck,
  CreditCard,
  Receipt,
  Settings,
  Server,
  LogOut,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import kloserLogo from "@/assets/kloser-logo-full.png";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Members", href: "/admin/members", icon: Users },
  { name: "Startups", href: "/admin/startups", icon: Building2 },
  { name: "KYC", href: "/admin/kyc", icon: ShieldCheck },
  { name: "Price Plans", href: "/admin/price-plans", icon: Tag },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "Transactions", href: "/admin/transactions", icon: Receipt },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "System", href: "/admin/system", icon: Server },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border hidden lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center px-5 border-b border-sidebar-border">
          <img src={kloserLogo} alt="Kloser.ai" className="h-10 w-auto" />
        </div>

        {/* Admin Badge */}
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-xl bg-orange-500/10 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Admin Panel</p>
              <p className="text-xs text-muted-foreground">Management Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/admin" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Back to App */}
        <div className="border-t border-sidebar-border p-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-5 w-5" />
            Back to App
          </Link>
        </div>
      </div>
    </aside>
  );
}
