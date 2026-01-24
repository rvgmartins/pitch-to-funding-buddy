import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  CheckCircle2, 
  ChevronDown,
  File,
  X
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

const steps = [
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

export default function UploadPitch() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit
      console.log("Form submitted");
    }
  };

  const isStep1Valid = experience && capitalRaised;
  const isStep2Valid = sector && upcomingRound && country;
  const isStep3Valid = true; // Upload is optional
  const isStep4Valid = timeline && roundSize && investorType;

  const canContinue = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      case 4: return isStep4Valid;
      default: return false;
    }
  };

  return (
    <DashboardLayout title="Upload Pitch" breadcrumb="Upload Pitch">
      <div className="flex min-h-[calc(100vh-12rem)] gap-0 overflow-hidden rounded-2xl">
        {/* Left sidebar - Steps */}
        <div className="w-80 shrink-0 bg-[hsl(222,47%,11%)] p-8 text-white">
          <h1 className="mb-2 text-3xl font-bold">
            {steps.find(s => s.id === currentStep)?.title}
          </h1>
          <p className="mb-8 text-muted-foreground">
            Complete all the following steps {currentStep}/4
          </p>

          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-4 rounded-xl px-4 py-3 transition-all",
                  currentStep === step.id && "bg-white/10"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    currentStep > step.id
                      ? "border-white bg-transparent"
                      : currentStep === step.id
                      ? "border-white bg-white text-[hsl(222,47%,11%)]"
                      : "border-muted-foreground/50 text-muted-foreground"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium",
                    currentStep >= step.id ? "text-white" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right content area */}
        <div className="flex flex-1 flex-col bg-white p-8">
          {/* Progress bar */}
          <div className="mb-8 flex gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "h-1 flex-1 rounded-full transition-all",
                  currentStep >= step.id ? "bg-[hsl(222,47%,11%)]" : "bg-gray-200"
                )}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1">
            {/* Step 1: Founder Details */}
            {currentStep === 1 && (
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

            {/* Step 2: Company Details */}
            {currentStep === 2 && (
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

            {/* Step 3: Data Sources / Upload */}
            {currentStep === 3 && (
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

            {/* Step 4: Round Dynamics */}
            {currentStep === 4 && (
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
          <div className="mt-8 flex gap-4">
            <Button
              variant="outline"
              className="flex-1 border-gray-200 py-6 text-base"
              onClick={goBack}
              disabled={currentStep === 1}
            >
              Go back
            </Button>
            <Button
              className="flex-1 bg-[hsl(222,47%,11%)] py-6 text-base hover:bg-[hsl(222,47%,15%)]"
              onClick={goNext}
              disabled={!canContinue()}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
