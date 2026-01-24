import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Building2, Globe, Mail, Phone, Save, Users, TrendingUp, Target } from "lucide-react";

const categories = [
  "FinTech",
  "HealthTech",
  "EdTech",
  "CleanTech",
  "AI/Machine Learning",
  "E-commerce",
  "SaaS",
  "Marketplace",
  "IoT",
  "Blockchain",
];

const stages = [
  "Idea",
  "MVP",
  "Early Revenue",
  "Growth",
  "Scale-up",
];

export default function StartupProfile() {
  return (
    <DashboardLayout title="Startup Profile" breadcrumb="Settings">
      <div className="mx-auto max-w-4xl">
        <Accordion type="multiple" defaultValue={["details", "pitch"]} className="space-y-4">
          {/* Business Details */}
          <AccordionItem value="details" className="rounded-md border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Company Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Startup Name</Label>
                  <Input id="name" placeholder="e.g. TechVenture AI" defaultValue="TechVenture AI" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                      https://
                    </span>
                    <Input
                      id="website"
                      placeholder="techventure.ai"
                      className="rounded-l-none"
                      defaultValue="techventure.ai"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="ai">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase().replace(/\//g, "-")}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select defaultValue="mvp">
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage.toLowerCase().replace(" ", "-")}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@company.com"
                      className="pl-10"
                      defaultValue="hello@techventure.ai"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 890"
                      className="pl-10"
                      defaultValue="+351 912 345 678"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="short-description">Short Description</Label>
                  <Input
                    id="short-description"
                    placeholder="One sentence that describes your startup"
                    defaultValue="AI platform for business process automation"
                  />
                  <p className="text-xs text-muted-foreground">
                    This description appears in search results
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="full-description">Full Description</Label>
                  <Textarea
                    id="full-description"
                    placeholder="Describe your startup in detail..."
                    rows={4}
                    defaultValue="TechVenture AI develops artificial intelligence solutions for business process automation. Our platform enables companies to automate repetitive tasks, reducing operational costs by up to 60%."
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Pitch Information */}
          <AccordionItem value="pitch" className="rounded-md border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Pitch Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="problem">Problem</Label>
                  <Textarea
                    id="problem"
                    placeholder="What problem does your startup solve?"
                    rows={3}
                    defaultValue="Companies spend thousands of hours per month on repetitive tasks that could be automated, resulting in high costs and human errors."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">Solution</Label>
                  <Textarea
                    id="solution"
                    placeholder="How does your startup solve this problem?"
                    rows={3}
                    defaultValue="Our AI platform automatically identifies processes that can be automated and creates intelligent workflows, without the need for programming."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="market">Market</Label>
                  <Textarea
                    id="market"
                    placeholder="Describe your target market"
                    rows={3}
                    defaultValue="The global business process automation market is worth €15B and grows 25% annually. We focus on European SMEs with 50-500 employees."
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="funding">Funding Requested</Label>
                    <Input
                      id="funding"
                      placeholder="e.g. €500,000"
                      defaultValue="€500,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="use-of-funds">Use of Funds</Label>
                    <Input
                      id="use-of-funds"
                      placeholder="e.g. Product, Marketing, Team"
                      defaultValue="40% Product, 30% Marketing, 30% Team"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Team */}
          <AccordionItem value="team" className="rounded-md border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Team</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Add information about the founders and key team members
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-dashed rounded-md">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                          JS
                        </div>
                        <div>
                          <p className="font-medium">John Smith</p>
                          <p className="text-sm text-muted-foreground">CEO & Co-Founder</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed rounded-md">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                          MC
                        </div>
                        <div>
                          <p className="font-medium">Mary Collins</p>
                          <p className="text-sm text-muted-foreground">CTO & Co-Founder</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button variant="outline" className="w-full border-dashed rounded-md">
                  + Add Team Member
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Traction */}
          <AccordionItem value="traction" className="rounded-md border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Metrics & Traction</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="mrr">MRR (Monthly Revenue)</Label>
                  <Input id="mrr" placeholder="€0" defaultValue="€15,000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customers">Customers</Label>
                  <Input id="customers" placeholder="0" defaultValue="45" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="growth">Monthly Growth</Label>
                  <Input id="growth" placeholder="0%" defaultValue="25%" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cac">CAC</Label>
                  <Input id="cac" placeholder="€0" defaultValue="€120" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ltv">LTV</Label>
                  <Input id="ltv" placeholder="€0" defaultValue="€2,400" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="churn">Churn Rate</Label>
                  <Input id="churn" placeholder="0%" defaultValue="2.5%" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button className="btn-gold" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
