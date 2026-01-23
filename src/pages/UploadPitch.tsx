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
  { id: 1, title: "Upload", description: "Upload pitch deck" },
  { id: 2, title: "Analysis & Scoring", description: "AI analyzing" },
  { id: 3, title: "Review", description: "View results" },
  { id: 4, title: "Payment", description: "Unlock access" },
];

const analysisResults = [
  { label: "Problem", value: "Clearly defined with market data", score: 85, locked: false },
  { label: "Solution", value: "Innovative and differentiated", score: 78, locked: false },
  { label: "Market", value: "TAM: €15B, SAM: €2B, SOM: €200M", score: 82, locked: true },
  { label: "Business Model", value: "B2B SaaS with solid unit economics", score: 88, locked: true },
  { label: "Team", value: "Relevant industry experience", score: 75, locked: true },
  { label: "Traction", value: "€15K MRR, 45 customers, 25% growth", score: 80, locked: true },
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
              {currentStep === 1 && "Upload Pitch Deck"}
              {currentStep === 2 && "Analyzing and scoring your pitch..."}
              {currentStep === 3 && "Analysis Results"}
              {currentStep === 4 && "Unlock Full Access"}
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
                  Drag your pitch deck here
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  or click to select a file
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
                      Select File
                    </span>
                  </Button>
                </label>
                <p className="mt-4 text-xs text-muted-foreground">
                  Supported formats: PDF, PPTX (max. 50MB)
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
                  Start AI Analysis
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Analyzing and scoring your pitch...</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI is extracting information and calculating your pitch score
                  </p>
                </div>
                <div className="mx-auto max-w-md space-y-2">
                  <Progress value={analysisProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">{analysisProgress}% complete</p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                    <p className="text-4xl font-bold text-primary">{overallScore}/100</p>
                    <p className="text-sm text-muted-foreground">Above industry average</p>
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
                    <p className="font-medium">4 metrics locked</p>
                    <p className="text-sm text-muted-foreground">
                      Unlock to see full analysis and find investors
                    </p>
                  </div>
                </div>

                <Button className="btn-gold w-full" size="lg" onClick={() => setCurrentStep(4)}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Unlock Full Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="rounded-xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Pro Plan</h3>
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
                      Complete pitch analysis
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      All metrics unlocked
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Investor matching
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      AI improvement suggestions
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="btn-gold w-full" size="lg">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay €99 and Unlock
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Secure payment via Stripe
                  </p>
                </div>

                <div className="text-center">
                  <Button variant="ghost" onClick={() => setCurrentStep(3)}>
                    ← Back to results
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
              <CardTitle className="text-base">How does it work?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <p className="font-medium">Upload your pitch</p>
                  <p className="text-sm text-muted-foreground">
                    PDF or PPTX with your startup presentation
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <p className="font-medium">AI analyzes and scores</p>
                  <p className="text-sm text-muted-foreground">
                    Automatic score based on investor criteria
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <p className="font-medium">Review the results</p>
                  <p className="text-sm text-muted-foreground">
                    See the score and free analysis preview
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  4
                </div>
                <div>
                  <p className="font-medium">Pay to unlock</p>
                  <p className="text-sm text-muted-foreground">
                    Access complete analysis and investor matching
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <Sparkles className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Our AI technology automatically extracts information from your pitch,
                such as problem, solution, market, team, and financial metrics.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
