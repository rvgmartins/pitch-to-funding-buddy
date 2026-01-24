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
  Star,
  CreditCard,
  Lock,
  Target,
  TrendingUp,
  Users,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  DialogOverlay,
} from "@/components/ui/dialog";

// Main flow steps
const mainSteps = [
  { id: 1, title: "Startup Details", description: "Complete profile" },
  { id: 2, title: "Analysis & Scoring", description: "AI analyzing" },
  { id: 3, title: "Review", description: "View results" },
  { id: 4, title: "Payment", description: "Unlock access" },
];

// Onboarding sub-steps
const onboardingSteps = [
  { id: 1, title: "Founder Details" },
  { id: 2, title: "Company Details" },
  { id: 3, title: "Data Sources" },
  { id: 4, title: "Round Dynamics" },
];

const experienceOptions = [
  { value: "getting-started", label: "Getting Started - First time raising venture capital" },
  { value: "seasoned", label: "Seasoned - Have raised 1-2 venture before from institutional investors" },
  { value: "expert", label: "Expert - Have previously raised at least 3 or more venture rounds from institutional investors" },
];

const capitalRaisedOptions = [
  { value: "less-100k", label: "Less than 100K" },
  { value: "100k-500k", label: "100K - 500K" },
  { value: "500k-1m", label: "500K - 1M" },
  { value: "1m-5m", label: "1M - 5M" },
  { value: "more-5m", label: "More than 5M" },
];

const sectorOptions = [
  { value: "ai-ml", label: "AI/Machine Learning" },
  { value: "fintech", label: "FinTech" },
  { value: "healthtech", label: "HealthTech" },
  { value: "edtech", label: "EdTech" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS" },
  { value: "marketplace", label: "Marketplace" },
  { value: "other", label: "Other" },
];

const subSectorOptions = [
  { value: "b2b", label: "B2B" },
  { value: "b2c", label: "B2C" },
  { value: "b2b2c", label: "B2B2C" },
  { value: "d2c", label: "D2C" },
];

const roundOptions = [
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
  { value: "series-c", label: "Series C+" },
];

const countryOptions = [
  { value: "portugal", label: "Portugal" },
  { value: "spain", label: "Spain" },
  { value: "uk", label: "United Kingdom" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "usa", label: "United States" },
  { value: "other", label: "Other" },
];

const timelineOptions = [
  { value: "now", label: "Now" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6-12-months", label: "6-12 months" },
  { value: "12-plus-months", label: "12+ months" },
];

const roundSizeOptions = [
  { value: "less-500k", label: "Less than 500K" },
  { value: "500k-1m", label: "500K - 1M" },
  { value: "1m-3m", label: "1M - 3M" },
  { value: "3m-5m", label: "3M - 5M" },
  { value: "5m-10m", label: "5M - 10M" },
  { value: "more-10m", label: "More than 10M" },
];

const investorTypeOptions = [
  { value: "lead", label: "Lead investor" },
  { value: "follow-on", label: "Follow-on investors" },
  { value: "both", label: "Both lead and follow-on" },
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
  // Main flow step (1-4)
  const [mainStep, setMainStep] = useState(1);
  // Onboarding sub-step (1-4)
  const [onboardingStep, setOnboardingStep] = useState(1);
  // Modal open state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  // Form state
  const [experience, setExperience] = useState("");
  const [capitalRaised, setCapitalRaised] = useState("");
  const [sector, setSector] = useState("");
  const [subSector, setSubSector] = useState("");
  const [upcomingRound, setUpcomingRound] = useState("");
  const [country, setCountry] = useState("");
  const [timeline, setTimeline] = useState("");
  const [roundSize, setRoundSize] = useState("");
  const [investorType, setInvestorType] = useState("");

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

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setMainStep(2);
    
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
    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      // Complete onboarding, start analysis
      startAnalysis();
    }
  };

  const isStep1Valid = experience && capitalRaised;
  const isStep2Valid = sector && upcomingRound && country;
  const isStep3Valid = true;
  const isStep4Valid = timeline && roundSize && investorType;

  const canContinueOnboarding = () => {
    switch (onboardingStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      case 4: return isStep4Valid;
      default: return false;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Render onboarding wizard content (for modal)
  const renderOnboardingContent = () => (
    <div className="flex h-[600px] w-full overflow-hidden rounded-lg shadow-2xl">
      {/* Left sidebar - Steps */}
      <div className="w-72 shrink-0 bg-[hsl(222,47%,11%)] p-6 text-white flex flex-col">
        <h1 className="mb-1 text-2xl font-bold">
          {onboardingSteps.find(s => s.id === onboardingStep)?.title}
        </h1>
        <p className="mb-6 text-sm text-gray-400">
          Complete all the following steps {onboardingStep}/4
        </p>

        <div className="space-y-1">
          {onboardingSteps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                onboardingStep === step.id && "bg-white/10"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all text-sm",
                  onboardingStep > step.id
                    ? "border-white bg-transparent"
                    : onboardingStep === step.id
                    ? "border-white bg-white text-[hsl(222,47%,11%)]"
                    : "border-gray-600 text-gray-600"
                )}
              >
                {onboardingStep > step.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  onboardingStep >= step.id ? "text-white" : "text-gray-600"
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right content area */}
      <div className="flex flex-1 flex-col bg-white p-6 overflow-y-auto">
        {/* Progress bar */}
        <div className="mb-6 flex gap-2">
          {onboardingSteps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-all",
                onboardingStep >= step.id ? "bg-[hsl(222,47%,11%)]" : "bg-gray-200"
              )}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="flex-1">
          {/* Onboarding Step 1: Founder Details */}
          {onboardingStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Which best describes your prior experience with raising venture rounds? Please do not include any prior angel rounds.
                </p>
                <RadioGroup value={experience} onValueChange={setExperience} className="space-y-3">
                  {experienceOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.value} id={option.value} className="border-gray-300" />
                      <Label htmlFor={option.value} className="cursor-pointer text-base font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <p className="text-lg text-gray-700">
                  How much capital have you raised to date?
                </p>
                <Select value={capitalRaised} onValueChange={setCapitalRaised}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {capitalRaisedOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Onboarding Step 2: Company Details */}
          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base text-gray-700">Sector</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-gray-700">Sub-sector (optional)</Label>
                <Select value={subSector} onValueChange={setSubSector}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {subSectorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-gray-700">Upcoming Round</Label>
                <Select value={upcomingRound} onValueChange={setUpcomingRound}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
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

              <div className="space-y-3">
                <Label className="text-base text-gray-700">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Onboarding Step 3: Data Sources / Upload */}
          {onboardingStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Upload your pitch deck</h2>
                <p className="mt-1 text-gray-500">If you don't have one, you can skip this step.</p>
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
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <Upload className="mb-4 h-10 w-10 text-gray-400" />
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <File className="h-5 w-5 text-primary" />
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

              <div className="pt-4">
                <button className="text-sm text-gray-600 underline hover:text-gray-900">
                  I don't have a pitch deck
                </button>
              </div>
            </div>
          )}

          {/* Onboarding Step 4: Round Dynamics */}
          {onboardingStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base text-gray-700">When are you planning to raise your next round?</Label>
                <Select value={timeline} onValueChange={setTimeline}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-gray-700">What round size are you looking for?</Label>
                <Select value={roundSize} onValueChange={setRoundSize}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {roundSizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base text-gray-700">Are you looking for a lead or follow-on investors?</Label>
                <Select value={investorType} onValueChange={setInvestorType}>
                  <SelectTrigger className="w-full border-gray-200 bg-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {investorTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="flex-1 rounded-lg h-12"
            onClick={goBackOnboarding}
            disabled={onboardingStep === 1}
          >
            Go back
          </Button>
          <Button
            className="flex-1 bg-[hsl(222,47%,11%)] rounded-lg h-12 hover:bg-[hsl(222,47%,15%)]"
            onClick={goNextOnboarding}
            disabled={!canContinueOnboarding()}
          >
            Continue
          </Button>
        </div>
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
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
      <div className="space-y-6">
        {/* Overall Score */}
        <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Overall Score</p>
            <p className="text-4xl font-bold text-primary">{overallScore}/100</p>
            <p className="text-sm text-gray-500">Above industry average</p>
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
                result.locked ? "bg-gray-50" : "bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  {index === 0 && <Target className="h-5 w-5 text-primary" />}
                  {index === 1 && <Sparkles className="h-5 w-5 text-primary" />}
                  {index === 2 && <TrendingUp className="h-5 w-5 text-primary" />}
                  {index === 3 && <CreditCard className="h-5 w-5 text-primary" />}
                  {index === 4 && <Users className="h-5 w-5 text-primary" />}
                  {index === 5 && <TrendingUp className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <p className="font-medium">{result.label}</p>
                  {result.locked ? (
                    <p className="text-sm text-gray-400 blur-sm select-none">
                      {result.value}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">{result.value}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {result.locked ? (
                  <div className="flex items-center gap-1 text-gray-400">
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
            <p className="text-sm text-gray-500">
              Unlock to see full analysis and find investors
            </p>
          </div>
        </div>

        <Button 
          className="w-full bg-[hsl(222,47%,11%)] py-6 text-base hover:bg-[hsl(222,47%,15%)]" 
          onClick={() => setMainStep(4)}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Unlock Full Access
          <ArrowRight className="ml-2 h-4 w-4" />
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
          <Button className="w-full bg-[hsl(222,47%,11%)] py-6 text-base hover:bg-[hsl(222,47%,15%)]">
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
    <div className="mb-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between">
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
                      "flex h-12 w-12 items-center justify-center rounded-full transition-all",
                      isCompleted && "bg-foreground text-background",
                      isCurrent && "bg-foreground text-background",
                      isPending && "border-2 border-muted-foreground/30 text-muted-foreground/50"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    ) : (
                      <span className="text-base font-medium">{step.id}</span>
                    )}
                  </div>
                  
                  {/* Labels */}
                  <div className="mt-3 text-center">
                    <p className={cn(
                      "text-sm font-medium",
                      (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground/50"
                    )}>
                      {step.title}
                    </p>
                    <p className={cn(
                      "text-xs",
                      (isCompleted || isCurrent) ? "text-muted-foreground" : "text-muted-foreground/40"
                    )}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {index < mainSteps.length - 1 && (
                  <div className="relative mt-6 flex-1 px-4">
                    <div className={cn(
                      "h-0.5 w-full",
                      isCompleted ? "bg-foreground" : "bg-muted-foreground/20"
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
        <DialogContent className="max-w-[900px] w-full border-0 p-0 gap-0 overflow-visible bg-transparent shadow-none [&>button]:hidden">
          {renderOnboardingContent()}
        </DialogContent>
      </Dialog>

      {mainStep === 2 && renderAnalysis()}
      {mainStep === 3 && renderReview()}
      {mainStep === 4 && renderPayment()}
    </DashboardLayout>
  );
}
