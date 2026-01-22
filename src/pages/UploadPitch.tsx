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
  X
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Upload", description: "Carregar pitch deck" },
  { id: 2, title: "Análise", description: "IA a analisar" },
  { id: 3, title: "Revisão", description: "Confirmar dados" },
  { id: 4, title: "Publicar", description: "Ativar procura" },
];

export default function UploadPitch() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

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
        setCurrentStep(3);
      }
    }, 500);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setCurrentStep(1);
    setAnalysisProgress(0);
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
              <Upload className="h-5 w-5 text-primary" />
              {currentStep === 1 && "Carregar Pitch Deck"}
              {currentStep === 2 && "A analisar o seu pitch..."}
              {currentStep === 3 && "Análise concluída"}
              {currentStep === 4 && "Pronto para publicar"}
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
                  <h3 className="text-lg font-semibold">A analisar o seu pitch...</h3>
                  <p className="text-sm text-muted-foreground">
                    A nossa IA está a extrair informações do seu pitch deck
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
                <div className="flex items-center gap-3 rounded-lg bg-success/10 p-4 text-success">
                  <CheckCircle2 className="h-5 w-5" />
                  <p className="font-medium">Análise concluída com sucesso!</p>
                </div>
                <p className="text-muted-foreground">
                  Reveja os dados extraídos na página de perfil da startup e faça ajustes se necessário.
                </p>
                <Button className="btn-gold" size="lg" onClick={() => setCurrentStep(4)}>
                  Continuar para Revisão
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tudo pronto!</h3>
                  <p className="text-sm text-muted-foreground">
                    O seu pitch está pronto para ser publicado e encontrar investidores
                  </p>
                </div>
                <Button className="btn-gold" size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Publicar e Iniciar Procura
                </Button>
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
                  <p className="font-medium">IA analisa o conteúdo</p>
                  <p className="text-sm text-muted-foreground">
                    Extraímos automaticamente informações chave
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <p className="font-medium">Reveja e ajuste</p>
                  <p className="text-sm text-muted-foreground">
                    Confirme os dados extraídos e adicione mais detalhes
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <p className="font-medium">Encontre investidores</p>
                  <p className="text-sm text-muted-foreground">
                    A nossa plataforma conecta-o aos investidores certos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Sparkles className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Análise com IA</h3>
              <p className="text-sm text-muted-foreground">
                A nossa tecnologia de IA extrai automaticamente informações do seu pitch, 
                como problema, solução, mercado, equipa e métricas financeiras.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
