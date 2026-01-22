import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2,
  Sparkles,
  ArrowRight,
  File,
  X,
  Lock,
  CreditCard,
  Star,
  TrendingUp,
  Target,
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Upload", description: "Carregar pitch deck" },
  { id: 2, title: "Análise & Scoring", description: "IA a analisar" },
  { id: 3, title: "Revisão", description: "Ver resultados" },
  { id: 4, title: "Pagamento", description: "Desbloquear acesso" },
];

const analysisResults = [
  { label: "Problema", value: "Claramente definido com dados de mercado", score: 85, locked: false },
  { label: "Solução", value: "Inovadora e diferenciada", score: 78, locked: false },
  { label: "Mercado", value: "TAM: €15B, SAM: €2B, SOM: €200M", score: 82, locked: true },
  { label: "Modelo de Negócio", value: "SaaS B2B com unit economics sólidos", score: 88, locked: true },
  { label: "Equipa", value: "Experiência relevante no setor", score: 75, locked: true },
  { label: "Tração", value: "€15K MRR, 45 clientes, 25% crescimento", score: 80, locked: true },
];

export default function UploadPitch() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".pptx"))) {
      setUploadedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(2);
    
    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setOverallScore(81);
        setCurrentStep(3);
      }
    }, 500);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setCurrentStep(1);
    setAnalysisProgress(0);
    setOverallScore(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <DashboardLayout title="Upload Pitch" breadcrumb="Upload Pitch">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    currentStep >= step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "mx-4 h-0.5 flex-1",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main upload area */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <Upload className="h-5 w-5 text-primary" />}
              {currentStep === 2 && <Sparkles className="h-5 w-5 text-primary" />}
              {currentStep === 3 && <Star className="h-5 w-5 text-primary" />}
              {currentStep === 4 && <CreditCard className="h-5 w-5 text-primary" />}
              {currentStep === 1 && "Carregar Pitch Deck"}
              {currentStep === 2 && "A analisar e pontuar o seu pitch..."}
              {currentStep === 3 && "Resultados da Análise"}
              {currentStep === 4 && "Desbloquear Acesso Completo"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && !uploadedFile && (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all",
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/30 hover:border-primary/50"
                )}
              >
                <div className="stat-icon mb-4 !p-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Arraste o seu pitch deck aqui
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  ou clique para selecionar um ficheiro
                </p>
                <input
                  type="file"
                  accept=".pdf,.pptx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="pitch-upload"
                />
                <label htmlFor="pitch-upload">
                  <Button className="btn-gold cursor-pointer" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Selecionar Ficheiro
                    </span>
                  </Button>
                </label>
                <p className="mt-4 text-xs text-muted-foreground">
                  Formatos suportados: PDF, PPTX (máx. 50MB)
                </p>
              </div>
            )}

            {currentStep === 1 && uploadedFile && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="stat-icon">
                    <File className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={removeFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="btn-gold w-full" size="lg" onClick={startAnalysis}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Iniciar Análise com IA
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">A analisar e pontuar o seu pitch...</h3>
                  <p className="text-sm text-muted-foreground">
                    A nossa IA está a extrair informações e calcular o score do seu pitch
                  </p>
                </div>
                <div className="mx-auto max-w-md space-y-2">
                  <Progress value={analysisProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{analysisProgress}% concluído</p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Score Global</p>
                    <p className="text-4xl font-bold text-primary">{overallScore}/100</p>
                    <p className="text-sm text-muted-foreground">Acima da média do setor</p>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                    <Star className="h-10 w-10 text-primary" />
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-3">
                  {analysisResults.map((result, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center justify-between rounded-lg border p-4 transition-all",
                        result.locked ? "bg-muted/30" : "bg-card"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="stat-icon !p-2">
                          {index === 0 && <Target className="h-4 w-4 text-primary" />}
                          {index === 1 && <Sparkles className="h-4 w-4 text-primary" />}
                          {index === 2 && <TrendingUp className="h-4 w-4 text-primary" />}
                          {index === 3 && <CreditCard className="h-4 w-4 text-primary" />}
                          {index === 4 && <Users className="h-4 w-4 text-primary" />}
                          {index === 5 && <TrendingUp className="h-4 w-4 text-primary" />}
                        </div>
                        <div>
                          <p className="font-medium">{result.label}</p>
                          {result.locked ? (
                            <p className="text-sm text-muted-foreground blur-sm select-none">
                              {result.value}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">{result.value}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {result.locked ? (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm blur-sm select-none">{result.score}</span>
                          </div>
                        ) : (
                          <span className={cn("text-lg font-bold", getScoreColor(result.score))}>
                            {result.score}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-primary/10 p-4">
                  <Lock className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">4 métricas bloqueadas</p>
                    <p className="text-sm text-muted-foreground">
                      Desbloqueie para ver a análise completa e encontrar investidores
                    </p>
                  </div>
                </div>

                <Button className="btn-gold w-full" size="lg" onClick={() => setCurrentStep(4)}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Desbloquear Acesso Completo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="rounded-xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Plano Pro</h3>
                    <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                      Popular
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">€99</span>
                    <span className="text-muted-foreground">/pitch</span>
                  </div>
                  <ul className="mb-6 space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Análise completa do pitch
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Todas as métricas desbloqueadas
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Matching com investidores
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Sugestões de melhoria com IA
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Suporte prioritário
                    </li>
                  </ul>
                  <Button className="btn-gold w-full" size="lg">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pagar €99 e Desbloquear
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Pagamento seguro via Stripe
                  </p>
                </div>

                <div className="text-center">
                  <Button variant="ghost" onClick={() => setCurrentStep(3)}>
                    ← Voltar aos resultados
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info sidebar */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Como funciona?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <p className="font-medium">Faça upload do pitch</p>
                  <p className="text-sm text-muted-foreground">
                    PDF ou PPTX com a apresentação da sua startup
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <p className="font-medium">IA analisa e pontua</p>
                  <p className="text-sm text-muted-foreground">
                    Score automático baseado em critérios de investidores
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <p className="font-medium">Reveja os resultados</p>
                  <p className="text-sm text-muted-foreground">
                    Veja o score e prévia da análise gratuita
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <p className="font-medium">Desbloqueie e conecte</p>
                  <p className="text-sm text-muted-foreground">
                    Pague para acesso total e matching com investidores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Star className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Scoring com IA</h3>
              <p className="text-sm text-muted-foreground">
                O nosso algoritmo analisa o seu pitch baseado nos mesmos critérios 
                que investidores de topo utilizam para avaliar startups.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
