import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { ShieldCheck } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">Admin Panel</span>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          {/* Page header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
          </div>

          {/* Page content */}
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
