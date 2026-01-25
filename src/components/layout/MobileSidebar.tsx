import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  CreditCard,
  LogOut,
  ChevronDown,
  Plus,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import kloserLogo from "@/assets/klogo.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Startup Profile", href: "/profile", icon: Building2 },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStartup?: {
    name: string;
    pitchCount: number;
  };
}

export function MobileSidebar({ 
  open, 
  onOpenChange, 
  currentStartup = { name: "TechVenture AI", pitchCount: 3 } 
}: MobileSidebarProps) {
  const location = useLocation();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu de navegação</SheetTitle>
        </SheetHeader>
        
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
            <img src={kloserLogo} alt="Kloser.ai" className="h-8 w-auto" />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Startup Selector */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-xl bg-sidebar-accent p-3 text-left transition-all hover:bg-sidebar-accent/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5">
                    <Building2 className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-sidebar-foreground">
                      {currentStartup.name}
                    </p>
                    <p className="text-xs text-sidebar-muted">
                      {currentStartup.pitchCount} Pitches
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-sidebar-muted" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white z-[60]">
                <DropdownMenuItem onClick={handleLinkClick}>
                  <Building2 className="mr-2 h-4 w-4" />
                  TechVenture AI
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLinkClick}>
                  <Building2 className="mr-2 h-4 w-4" />
                  GreenTech Solutions
                </DropdownMenuItem>
                <DropdownMenuItem className="text-foreground" onClick={handleLinkClick}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Startup
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleLinkClick}
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

          {/* Add Startup Button */}
          <div className="p-4">
            <Link to="/onboarding" onClick={handleLinkClick}>
              <Button className="w-full rounded-full font-medium" size="lg">
                <Plus className="mr-2 h-4 w-4" />
                New Startup
              </Button>
            </Link>
          </div>

          {/* User / Logout */}
          <div className="border-t border-sidebar-border p-4">
            <Link
              to="/login"
              onClick={handleLinkClick}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
