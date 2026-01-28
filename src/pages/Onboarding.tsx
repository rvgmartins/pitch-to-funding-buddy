import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import kloserLogo from "@/assets/kloser-logo-full.png";

// Main flow steps
const mainSteps = [
  { id: 1, title: "Upload", description: "Upload pitch" },
  { id: 2, title: "Confirm Data", description: "Verify details" },
  { id: 3, title: "Analysis", description: "AI scoring" },
  { id: 4, title: "Review", description: "View results" },
  { id: 5, title: "Payment", description: "Unlock access" },
];

// Sector options from the reference image
const sectorOptions = [
  { value: "saas", label: "SAAS" },
  { value: "health-tech", label: "Health Tech" },
  { value: "fintech", label: "FinTech" },
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

export default function Onboarding() {
  const navigate = useNavigate();
  
  // Current step (1-5)
  const [currentStep, setCurrentStep] = useState(1);
  // Processing state (between upload and confirm)
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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
      setCurrentStep(2);
    }, 2500);
  };

  const startAnalysis = () => {
    setCurrentStep(3);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setOverallScore(81);
        setCurrentStep(4);
      }
    }, 500);
  };

  const handlePaymentSuccess = () => {
    // After payment, redirect to dashboard
    navigate("/dashboard");
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goNext = () => {
    if (currentStep === 1) {
      processUploadAndContinue();
    } else if (currentStep === 2) {
      startAnalysis();
    }
  };

  const isStep1Valid = uploadedFile !== null;
  const isStep2Valid = sector && round && segment && ask && region;

  const canContinue = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      default: return false;
    }
  };

  // Progress stepper component
  const renderProgressStepper = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {mainSteps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step circle and content */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full transition-all text-sm",
                    isCompleted && "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20",
                    isCurrent && "bg-foreground text-background",
                    isPending && "border-2 border-muted-foreground/30 text-muted-foreground/50"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    <span className="font-medium">{step.id}</span>
                  )}
                </div>
                
                {/* Labels */}
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-xs font-medium leading-tight hidden sm:block",
                    (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground/50"
                  )}>
                    {step.title}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < mainSteps.length - 1 && (
                <div className="relative flex-1 px-2 md:px-4 mt-[-20px]">
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
  );

  // Step 1: Upload
  const renderUploadStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Upload your pitch deck</h2>
          <p className="mt-1 text-gray-500">Upload your pitch deck and our AI will analyze it</p>
        </div>

        <div className="space-y-4">
          <Label className="text-base text-gray-700">Pitch Deck (PDF, PowerPoint)</Label>
          
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all cursor-pointer",
                isDragOver
                  ? "border-orange-500 bg-orange-500/5"
                  : "border-gray-300 hover:border-orange-400"
              )}
              onClick={() => document.getElementById('pitch-upload')?.click()}
            >
              <Upload className="mb-4 h-12 w-12 text-orange-400" />
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
              <Button variant="outline" className="border-gray-300">
                Choose File
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10">
                <File className="h-6 w-6 text-orange-500" />
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

        <div className="mt-8 flex gap-3">
          <Button
            className="flex-1 bg-foreground text-background rounded-lg h-12 hover:bg-foreground/90"
            onClick={goNext}
            disabled={!canContinue()}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Processing state
  const renderProcessing = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex flex-col items-center justify-center py-8">
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
      </div>
    </div>
  );

  // Step 2: Confirm Data
  const renderConfirmDataStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-6">
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

        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-lg h-12"
            onClick={goBack}
          >
            Go back
          </Button>
          <Button
            className="flex-1 bg-foreground text-background rounded-lg h-12 hover:bg-foreground/90"
            onClick={goNext}
            disabled={!canContinue()}
          >
            Start Analysis
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Step 3: Analysis
  const renderAnalysisStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
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
    </div>
  );

  // Step 4: Review
  const renderReviewStep = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overall Score Card */}
      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-4">
              {/* Score Ring */}
              <div className="relative">
                <svg className="w-20 h-20 md:w-24 md:h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted/20"
                  />
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
          onClick={() => setCurrentStep(5)}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Unlock Full Access
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  // Step 5: Payment
  const renderPaymentStep = () => (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
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
            <Button 
              className="w-full bg-foreground text-background py-6 text-base hover:bg-foreground/90"
              onClick={handlePaymentSuccess}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay €99 and Unlock
            </Button>
            <p className="mt-3 text-center text-xs text-gray-500">
              Secure payment via Stripe
            </p>
          </div>

          <div className="text-center">
            <Button variant="ghost" onClick={() => setCurrentStep(4)}>
              ← Back to results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-center">
            <img src={kloserLogo} alt="Kloser.ai" className="h-10 w-auto" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Progress stepper */}
          {renderProgressStepper()}

          {/* Step content */}
          {isProcessing && renderProcessing()}
          {!isProcessing && currentStep === 1 && renderUploadStep()}
          {!isProcessing && currentStep === 2 && renderConfirmDataStep()}
          {currentStep === 3 && renderAnalysisStep()}
          {currentStep === 4 && renderReviewStep()}
          {currentStep === 5 && renderPaymentStep()}
        </div>
      </main>
    </div>
  );
}
