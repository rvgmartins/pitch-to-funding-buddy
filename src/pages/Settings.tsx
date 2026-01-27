import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Menu, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Users, 
  Mail,
  Smartphone,
  Globe,
  Trash2,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Privacy & Sharing Settings
  const [shareWithInvestors, setShareWithInvestors] = useState(true);
  const [showInDirectory, setShowInDirectory] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [shareMetrics, setShareMetrics] = useState(false);
  const [shareTeamInfo, setShareTeamInfo] = useState(true);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [investorInterest, setInvestorInterest] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  // Profile Settings
  const [name, setName] = useState("João Silva");
  const [email, setEmail] = useState("joao@techventure.ai");
  const [phone, setPhone] = useState("+351 912 345 678");

  const handleSaveProfile = () => {
    toast({
      title: "Perfil atualizado",
      description: "As suas alterações foram guardadas com sucesso.",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Definições de privacidade atualizadas",
      description: "As suas preferências de partilha foram guardadas.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notificações atualizadas",
      description: "As suas preferências de notificação foram guardadas.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
      
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Mobile Header */}
          <div className="flex items-center gap-4 mb-6 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>

          {/* Header */}
          <div className="mb-8 hidden lg:block">
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="space-y-6 max-w-4xl">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardContent>
            </Card>

            {/* Privacy & Investor Sharing */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Investor Visibility</CardTitle>
                    <CardDescription>Control what investors can see about your startup</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Share Profile with Investors</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow verified investors to view your startup profile and pitch deck
                    </p>
                  </div>
                  <Switch 
                    checked={shareWithInvestors} 
                    onCheckedChange={setShareWithInvestors}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show in Startup Directory</Label>
                    <p className="text-sm text-muted-foreground">
                      Appear in the public directory for investors to discover
                    </p>
                  </div>
                  <Switch 
                    checked={showInDirectory} 
                    onCheckedChange={setShowInDirectory}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Share Financial Metrics</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow investors to see your revenue and growth metrics
                    </p>
                  </div>
                  <Switch 
                    checked={shareMetrics} 
                    onCheckedChange={setShareMetrics}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Share Team Information</Label>
                    <p className="text-sm text-muted-foreground">
                      Display founder and team member profiles to investors
                    </p>
                  </div>
                  <Switch 
                    checked={shareTeamInfo} 
                    onCheckedChange={setShareTeamInfo}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Direct Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Let investors contact you directly through the platform
                    </p>
                  </div>
                  <Switch 
                    checked={allowMessages} 
                    onCheckedChange={setAllowMessages}
                  />
                </div>
                <Button onClick={handleSavePrivacy}>Save Privacy Settings</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Choose how you want to be notified</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your device
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label className="text-base">Investor Interest Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when investors view your profile
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={investorInterest} 
                    onCheckedChange={setInvestorInterest}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label className="text-base">Weekly Performance Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your pitch performance
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={weeklyReport} 
                    onCheckedChange={setWeeklyReport}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label className="text-base">Product Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        News about new features and improvements
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={productUpdates} 
                    onCheckedChange={setProductUpdates}
                  />
                </div>
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </CardContent>
            </Card>

            {/* Data & Account */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <Shield className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Data & Account</CardTitle>
                    <CardDescription>Manage your data and account settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Export Your Data</p>
                      <p className="text-sm text-muted-foreground">
                        Download all your startup data and analytics
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div className="flex items-center gap-3">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">Delete Account</p>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
