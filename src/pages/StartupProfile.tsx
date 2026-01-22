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
  "Ideia",
  "MVP",
  "Early Revenue",
  "Growth",
  "Scale-up",
];

export default function StartupProfile() {
  return (
    <DashboardLayout title="Perfil da Startup" breadcrumb="Configurações">
      <div className="mx-auto max-w-4xl">
        <Accordion type="multiple" defaultValue={["details", "pitch"]} className="space-y-4">
          {/* Business Details */}
          <AccordionItem value="details" className="rounded-lg border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Dados da Empresa</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Startup</Label>
                  <Input id="name" placeholder="Ex: TechVenture AI" defaultValue="TechVenture AI" />
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
                  <Label htmlFor="category">Categoria</Label>
                  <Select defaultValue="ai">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
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
                  <Label htmlFor="stage">Fase</Label>
                  <Select defaultValue="mvp">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a fase" />
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
                  <Label htmlFor="email">Email de Contacto</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contacto@empresa.com"
                      className="pl-10"
                      defaultValue="hello@techventure.ai"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+351 912 345 678"
                      className="pl-10"
                      defaultValue="+351 912 345 678"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="short-description">Descrição Curta</Label>
                  <Input
                    id="short-description"
                    placeholder="Uma frase que descreve a sua startup"
                    defaultValue="Plataforma de IA para automação de processos empresariais"
                  />
                  <p className="text-xs text-muted-foreground">
                    Esta descrição aparece nos resultados de pesquisa
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="full-description">Descrição Completa</Label>
                  <Textarea
                    id="full-description"
                    placeholder="Descreva a sua startup em detalhe..."
                    rows={4}
                    defaultValue="A TechVenture AI desenvolve soluções de inteligência artificial para automação de processos empresariais. A nossa plataforma permite que empresas automatizem tarefas repetitivas, reduzindo custos operacionais em até 60%."
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Pitch Information */}
          <AccordionItem value="pitch" className="rounded-lg border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Informação do Pitch</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="problem">Problema</Label>
                  <Textarea
                    id="problem"
                    placeholder="Qual problema a sua startup resolve?"
                    rows={3}
                    defaultValue="As empresas gastam milhares de horas por mês em tarefas repetitivas que poderiam ser automatizadas, resultando em custos elevados e erros humanos."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution">Solução</Label>
                  <Textarea
                    id="solution"
                    placeholder="Como a sua startup resolve este problema?"
                    rows={3}
                    defaultValue="A nossa plataforma de IA identifica automaticamente processos que podem ser automatizados e cria fluxos de trabalho inteligentes, sem necessidade de programação."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="market">Mercado</Label>
                  <Textarea
                    id="market"
                    placeholder="Descreva o seu mercado alvo"
                    rows={3}
                    defaultValue="O mercado global de automação de processos empresariais vale €15B e cresce 25% ao ano. Focamo-nos em PMEs europeias com 50-500 funcionários."
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="funding">Investimento Pretendido</Label>
                    <Input
                      id="funding"
                      placeholder="Ex: €500.000"
                      defaultValue="€500.000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="use-of-funds">Uso do Investimento</Label>
                    <Input
                      id="use-of-funds"
                      placeholder="Ex: Produto, Marketing, Equipa"
                      defaultValue="40% Produto, 30% Marketing, 30% Equipa"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Team */}
          <AccordionItem value="team" className="rounded-lg border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Equipa</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Adicione informações sobre os fundadores e membros chave da equipa
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                          JS
                        </div>
                        <div>
                          <p className="font-medium">João Silva</p>
                          <p className="text-sm text-muted-foreground">CEO & Co-Founder</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                          MC
                        </div>
                        <div>
                          <p className="font-medium">Maria Costa</p>
                          <p className="text-sm text-muted-foreground">CTO & Co-Founder</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button variant="outline" className="w-full border-dashed">
                  + Adicionar Membro da Equipa
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Traction */}
          <AccordionItem value="traction" className="rounded-lg border bg-card shadow-card">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="stat-icon">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Métricas e Tração</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="mrr">MRR (Receita Mensal)</Label>
                  <Input id="mrr" placeholder="€0" defaultValue="€15.000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customers">Clientes</Label>
                  <Input id="customers" placeholder="0" defaultValue="45" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="growth">Crescimento Mensal</Label>
                  <Input id="growth" placeholder="0%" defaultValue="25%" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cac">CAC</Label>
                  <Input id="cac" placeholder="€0" defaultValue="€120" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ltv">LTV</Label>
                  <Input id="ltv" placeholder="€0" defaultValue="€2.400" />
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
            Guardar Alterações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
