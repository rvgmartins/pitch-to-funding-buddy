import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Check, 
  File,
  X,
  Loader2,
  Sparkles,
  CreditCard,
  Lock,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Building2,
  MapPin,
  Wallet,
  Layers,
  FileText,
  Send,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

// Main flow steps
const mainSteps = [
  { id: 1, title: "Startup Details", description: "Complete profile" },
  { id: 2, title: "Analysis & Scoring", description: "AI analyzing" },
  { id: 3, title: "Review", description: "View results" },
  { id: 4, title: "Payment", description: "Unlock access" },
];

// Onboarding sub-steps (now only 2)
const onboardingSteps = [
  { id: 1, title: "Upload" },
  { id: 2, title: "Confirm Data" },
];

// Sector options from the reference image
const sectorOptions = [
  { value: "saas", label: "SAAS" },
  { value: "health-tech", label: "Health Tech" },
  { value: "fintech", label: "FinTEch" },
  { value: "mobility", label: "Mobility" },
  { value: "energy", label: "Energy" },
  { value: "mkt-tech", label: "Mkt Tech" },
  { value: "food-tech", label: "Food Tech" },
  { value: "re-tech", label: "RE Tech" },
  { value: "media-tech", label: "Media Tech" },
  { value: "cyber-security", label: "Cyber Security" },
  { value: "edu-tech", label: "Edu Tech" },
  { value: "telco", label: "Telco" },
  { value: "legal-tech", label: "Legal Tech" },
  { value: "travel-tech", label: "Travel Tech" },
  { value: "wellness-tech", label: "Wellness Tech" },
  { value: "robotics", label: "Robotics" },
  { value: "semiconductors", label: "Semiconductors" },
  { value: "sport-tech", label: "Sport Tech" },
  { value: "gaming", label: "Gaming" },
  { value: "consumer-tech", label: "Consumer Tech" },
  { value: "chemicals", label: "Chemicals" },
  { value: "space-tech", label: "Space Tech" },
  { value: "engineering-manufacturing", label: "Engineering & Manufacturing" },
  { value: "blue-tech", label: "Blue Tech" },
  { value: "esg-impact", label: "ESG Impact" },
  { value: "supply-chain", label: "Supply Chain" },
  { value: "ai", label: "AI" },
  { value: "blockchain", label: "Blockchain" },
  { value: "biotech", label: "BioTech" },
  { value: "deep-tech", label: "Deep Tech" },
  { value: "e-commerce", label: "E-commerce" },
];

// Round options
const roundOptions = [
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
  { value: "series-c-above", label: "Series C and above" },
  { value: "secondary", label: "Secondary" },
];

// Segment options
const segmentOptions = [
  { value: "b2c", label: "B2C" },
  { value: "b2b", label: "B2B" },
  { value: "b2b2c", label: "B2B2C" },
];

// Ask options
const askOptions = [
  { value: "under-250k", label: "Under 250k" },
  { value: "250k-1m", label: "250k to 1M" },
  { value: "1m-5m", label: "1M to 5M" },
  { value: "5m-15m", label: "5M to 15M" },
  { value: "15m-50m", label: "15M to 50M" },
  { value: "above-50m", label: "Above 50M" },
];

// Region options
const regionOptions = [
  { value: "europe", label: "Europe" },
  { value: "us", label: "US" },
  { value: "asia", label: "Asia" },
  { value: "africa", label: "Africa" },
  { value: "latam", label: "Latam" },
  { value: "middle-east", label: "Middle East" },
];

// Investor Match Summary data
const investorMatchData = {
  relevantInvestors: 47,
  stageMatch: "Pre-Seed / Seed",
  sectorMatch: "AI/ML, SaaS",
  geography: "Europe",
  checkSize: "€100K - €500K"
};

// What's Working Well
const workingWell = [
  { title: "Clear Problem Definition", description: "Strong market validation with quantifiable pain points" },
  { title: "Innovative Solution", description: "Differentiated approach with defensible technology" },
  { title: "Team Background", description: "Relevant industry experience and complementary skills" },
];

// Where Investors Will Push Back
const investorConcerns = [
  { title: "Market Size Clarity", description: "TAM/SAM/SOM needs more granular breakdown", locked: true },
  { title: "Go-to-Market Strategy", description: "Customer acquisition channels need validation", locked: true },
  { title: "Unit Economics", description: "LTV/CAC ratio and payback period unclear", locked: true },
];

// What Happens Next
const nextSteps = [
  { icon: FileText, title: "Review Positioning", description: "Fine-tune your pitch narrative based on insights" },
  { icon: Target, title: "Finalize Target List", description: "Get matched with relevant investors for your stage" },
  { icon: Send, title: "Structured Execution", description: "Access outreach templates and tracking tools" },
];

export default function UploadPitch() {
  // Main flow step (1-4)
  const [mainStep, setMainStep] = useState(1);
  // Onboarding sub-step (1-2)
  const [onboardingStep, setOnboardingStep] = useState(1);
  // Modal open state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  // Processing state (between upload and confirm)
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  // Form state for Confirm Data step
  const [sector, setSector] = useState("");
  const [round, setRound] = useState("");
  const [segment, setSegment] = useState("");
  const [ask, setAsk] = useState("");
  const [region, setRegion] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".pptx") || file.name.endsWith(".ppt"))) {
      setUploadedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const processUploadAndContinue = () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing the pitch deck
    setTimeout(() => {
      // Pre-fill some fields as if extracted from pitch
      setSector("saas");
      setRound("seed");
      setSegment("b2b");
      setAsk("250k-1m");
      setRegion("europe");
      
      setIsProcessing(false);
      setOnboardingStep(2);
    }, 2500);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setMainStep(2);
    setIsOnboardingOpen(false);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setOverallScore(81);
        setMainStep(3);
      }
    }, 500);
  };

  const goBackOnboarding = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const goNextOnboarding = () => {
    if (onboardingStep === 1) {
      processUploadAndContinue();
    } else if (onboardingStep === 2) {
      // Complete onboarding, start analysis
      startAnalysis();
    }
  };

  const isStep1Valid = uploadedFile !== null;
  const isStep2Valid = sector && round && segment && ask && region;

  const canContinueOnboarding = () => {
    switch (onboardingStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      default: return false;
    }
  };

  // Render onboarding wizard content (for modal)
  const renderOnboardingContent = () => (
    <div className="flex flex-col md:flex-row h-[90vh] md:h-[80vh] max-h-[700px] w-full overflow-visible rounded-lg shadow-2xl">
      {/* Left sidebar - Steps */}
      <div className="w-full md:w-72 shrink-0 bg-foreground p-4 md:p-6 text-background flex flex-col">
        <h1 className="mb-1 text-xl md:text-2xl font-bold">
          {onboardingSteps.find(s => s.id === onboardingStep)?.title}
        </h1>
        <p className="mb-4 md:mb-6 text-xs md:text-sm text-gray-400">
          Complete all the following steps {onboardingStep}/2
        </p>

        <div className="flex md:flex-col gap-2 md:gap-0 md:space-y-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {onboardingSteps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 md:gap-3 rounded-lg px-2 md:px-3 py-2 md:py-2.5 transition-all whitespace-nowrap",
                onboardingStep === step.id && "bg-white/10"
              )}
            >
              <div
                className={cn(
                  "flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border-2 transition-all text-xs md:text-sm flex-shrink-0",
                  onboardingStep > step.id
                    ? "border-white bg-transparent"
                    : onboardingStep === step.id
                    ? "border-white bg-white text-foreground"
                    : "border-gray-500 text-gray-500"
                )}
              >
                {onboardingStep > step.id ? (
                  <Check className="h-3 w-3 md:h-4 md:w-4" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs md:text-sm font-medium hidden md:inline",
                  onboardingStep >= step.id ? "text-white" : "text-gray-500"
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right content area */}
      <div className="flex flex-1 flex-col bg-white p-4 md:p-6 overflow-y-auto">
        {/* Progress bar - 2 onboarding steps */}
        <div className="mb-6 flex gap-2">
          {onboardingSteps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-all",
                onboardingStep >= step.id ? "bg-foreground" : "bg-gray-200"
              )}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="flex-1">
          {/* Processing/Loading State */}
          {isProcessing && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/10 to-orange-600/10">
                  <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Analyzing your pitch deck...</h3>
              <p className="mt-2 text-gray-500 text-center max-w-sm">
                Our AI is extracting key information from your pitch to pre-fill your startup profile.
              </p>
            </div>
          )}

          {/* Onboarding Step 1: Upload Pitch */}
          {onboardingStep === 1 && !isProcessing && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Upload your pitch deck</h2>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-gray-700">Upload Pitch Deck (PDF, PowerPoint)</Label>
                
                {!uploadedFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all",
                      isDragOver
                        ? "border-orange-500 bg-orange-500/5"
                        : "border-gray-300 hover:border-orange-400"
                    )}
                  >
                    <Upload className="mb-4 h-10 w-10 text-orange-400" />
                    <p className="mb-1 text-center font-medium text-gray-700">
                      Drop File Here or Click To Upload
                    </p>
                    <p className="mb-4 text-sm text-gray-500">
                      Supported: PDF, PPT, PPTX
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="pitch-upload"
                    />
                    <label htmlFor="pitch-upload">
                      <Button variant="outline" className="cursor-pointer border-gray-300" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10">
                      <File className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={removeFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Onboarding Step 2: Confirm Data */}
          {onboardingStep === 2 && !isProcessing && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Confirm your startup details</h2>
                <p className="mt-1 text-gray-500">We've extracted the following information from your pitch. Please verify and adjust if needed.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Sector</Label>
                  <Select value={sector} onValueChange={setSector}>
                    <SelectTrigger className="w-full border-gray-200 bg-white">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {sectorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Round</Label>
                  <Select value={round} onValueChange={setRound}>
                    <SelectTrigger className="w-full border-gray-200 bg-white">
                      <SelectValue placeholder="Select round" />
                    </SelectTrigger>
                    <SelectContent>
                      {roundOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Segment</Label>
                  <Select value={segment} onValueChange={setSegment}>
                    <SelectTrigger className="w-full border-gray-200 bg-white">
                      <SelectValue placeholder="Select segment" />
                    </SelectTrigger>
                    <SelectContent>
                      {segmentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Ask</Label>
                  <Select value={ask} onValueChange={setAsk}>
                    <SelectTrigger className="w-full border-gray-200 bg-white">
                      <SelectValue placeholder="Select ask amount" />
                    </SelectTrigger>
                    <SelectContent>
                      {askOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">Region</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-full border-gray-200 bg-white">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        {!isProcessing && (
          <div className="mt-4 md:mt-6 flex gap-2 md:gap-3 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              className="flex-1 rounded-lg h-12"
              onClick={goBackOnboarding}
              disabled={onboardingStep === 1}
            >
              Go back
            </Button>
            <Button
              className="flex-1 bg-foreground text-background rounded-lg h-12 hover:bg-foreground/90"
              onClick={goNextOnboarding}
              disabled={!canContinueOnboarding()}
            >
              {onboardingStep === 1 ? "Continue" : "Start Analysis"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Render Analysis step (main step 2)
  const renderAnalysis = () => (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-12 shadow-lg">
      <div className="space-y-6 py-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Analyzing and scoring your pitch...</h3>
          <p className="mt-2 text-gray-500">
            Our AI is extracting information and calculating your pitch score
          </p>
        </div>
        <div className="mx-auto max-w-md space-y-2">
          <Progress value={analysisProgress} className="h-2" />
          <p className="text-sm text-gray-500">{analysisProgress}% complete</p>
        </div>
      </div>
    </div>
  );

  // Render Review step (main step 3)
  const renderReview = () => (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Overall Score Card */}
      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-4">
              {/* Score Ring - matching DeckScore */}
              <div className="relative">
                <svg className="w-20 h-20 md:w-24 md:h-24 -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted/20"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#onboardingScoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${overallScore * 2.64} 264`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="onboardingScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                    <Zap className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-foreground">{overallScore}%</p>
                <p className="text-lg font-medium text-orange-600">Fundable with Improvements</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-3">
              Your startup shows strong potential. With targeted improvements in key areas, 
              you can significantly increase your chances of securing investment.
            </p>
          </div>
        </div>
      </div>

      {/* Investor Match Summary */}
      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Investor Match Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <Building2 className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{investorMatchData.relevantInvestors}</p>
            <p className="text-xs text-muted-foreground">Relevant Investors</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <Layers className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">{investorMatchData.stageMatch}</p>
            <p className="text-xs text-muted-foreground">Stage Focus</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">{investorMatchData.sectorMatch}</p>
            <p className="text-xs text-muted-foreground">Sector Match</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <MapPin className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">{investorMatchData.geography}</p>
            <p className="text-xs text-muted-foreground">Geography</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50 col-span-2 md:col-span-1">
            <Wallet className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">{investorMatchData.checkSize}</p>
            <p className="text-xs text-muted-foreground">Check Size</p>
          </div>
        </div>
      </div>

      {/* What's Working Well & Concerns Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* What's Working Well */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            What's Working Well
          </h3>
          <div className="space-y-3">
            {workingWell.map((item, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">{item.title}</p>
                  <p className="text-sm text-green-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Where Investors Will Push Back */}
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-5 w-5" />
            Where Investors Will Push Back
          </h3>
          <div className="space-y-3">
            {investorConcerns.map((item, index) => (
              <div key={index} className={cn(
                "flex gap-3 p-3 rounded-lg border",
                item.locked ? "bg-gray-50 border-gray-200" : "bg-amber-50 border-amber-100"
              )}>
                {item.locked ? (
                  <Lock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={cn("font-medium", item.locked ? "text-gray-500" : "text-amber-900")}>
                    {item.title}
                  </p>
                  <p className={cn("text-sm", item.locked ? "text-gray-400 blur-sm select-none" : "text-amber-700")}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Unlock full analysis to see detailed insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What Happens Next
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-foreground">{step.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-foreground to-foreground/90 p-6 md:p-8 text-center">
        <h3 className="text-xl font-bold text-background mb-2">Ready to unlock your full potential?</h3>
        <p className="text-background/70 mb-6">
          Get complete analysis, investor matches, and personalized recommendations
        </p>
        <Button 
          size="lg"
          className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-base"
          onClick={() => setMainStep(4)}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Unlock Full Access
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  // Render Payment step (main step 4)
  const renderPayment = () => (
    <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-lg">
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
            <span className="text-gray-500">/pitch</span>
          </div>
          <ul className="mb-6 space-y-3">
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              Complete pitch analysis
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              All metrics unlocked
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              Investor matching
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              AI improvement suggestions
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              Priority support
            </li>
          </ul>
          <Button className="w-full bg-foreground text-background py-6 text-base hover:bg-foreground/90">
            <CreditCard className="mr-2 h-4 w-4" />
            Pay €99 and Unlock
          </Button>
          <p className="mt-3 text-center text-xs text-gray-500">
            Secure payment via Stripe
          </p>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={() => setMainStep(3)}>
            ← Back to results
          </Button>
        </div>
      </div>
    </div>
  );

  // Progress stepper component matching design
  const renderMainProgressStepper = () => (
    <div className="mb-6 md:mb-12 px-2 md:px-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-1 md:gap-0">
          {mainSteps.map((step, index) => {
            const isCompleted = mainStep > step.id;
            const isCurrent = mainStep === step.id;
            const isPending = mainStep < step.id;

            return (
              <div key={step.id} className="flex flex-1 items-start">
                {/* Step circle and content */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={cn(
                      "flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-full transition-all",
                      isCompleted && "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20",
                      isCurrent && "bg-foreground text-background",
                      isPending && "border-2 border-muted-foreground/30 text-muted-foreground/50"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
                    ) : (
                      <span className="text-xs md:text-base font-medium">{step.id}</span>
                    )}
                  </div>
                  
                  {/* Labels */}
                  <div className="mt-2 md:mt-3 text-center">
                    <p className={cn(
                      "text-[10px] md:text-sm font-medium leading-tight",
                      (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground/50"
                    )}>
                      {step.title}
                    </p>
                    <p className={cn(
                      "text-[9px] md:text-xs hidden sm:block",
                      (isCompleted || isCurrent) ? "text-muted-foreground" : "text-muted-foreground/40"
                    )}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {index < mainSteps.length - 1 && (
                  <div className="relative mt-4 md:mt-6 flex-1 px-1 md:px-4">
                    <div className={cn(
                      "h-0.5 w-full",
                      isCompleted ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-muted-foreground/20"
                    )} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Startup Onboarding" breadcrumb="Onboarding">
      {/* Main Progress Steps - always visible */}
      {renderMainProgressStepper()}
      
      {/* Onboarding Modal with blur backdrop */}
      <Dialog open={isOnboardingOpen && mainStep === 1} onOpenChange={setIsOnboardingOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-[900px] w-full border-0 p-0 gap-0 overflow-visible bg-transparent shadow-none [&>button]:hidden">
          {renderOnboardingContent()}
        </DialogContent>
      </Dialog>

      {mainStep === 2 && renderAnalysis()}
      {mainStep === 3 && renderReview()}
      {mainStep === 4 && renderPayment()}
    </DashboardLayout>
  );
}
