import { Check, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface Phase {
  number: number;
  title: string;
  subtitle: string;
  steps: Step[];
  toolStackValue: string;
  locked?: boolean;
}

const phases: Phase[] = [
  {
    number: 1,
    title: "Pre-Fundraise Readiness",
    subtitle: "Become investor-ready",
    toolStackValue: "€276/mo",
    steps: [
      { title: "Deck Assessment", description: "Get expert feedback on your pitch deck", completed: true },
      { title: "Financial Assessment", description: "Validate your financial model and projections", completed: true },
      { title: "Valuation Assessment", description: "Determine fair and defensible valuation", completed: false },
      { title: "Investor Assessment", description: "Identify your ideal investor profile", completed: false },
      { title: "Setup Data Room", description: "Organize documents for due diligence", completed: false },
    ],
  },
  {
    number: 2,
    title: "Fund Preparation",
    subtitle: "Build your target list",
    toolStackValue: "€477/mo",
    steps: [
      { title: "Fundraise Strategy", description: "Define your fundraising approach", completed: false },
      { title: "Deep Fund Analysis", description: "Research potential investors in depth", completed: false },
      { title: "Selecting & Prioritizing", description: "Create tiered investor list", completed: false },
      { title: "Final Approved List", description: "Confirm your target investors", completed: false },
    ],
  },
  {
    number: 3,
    title: "Investor Outreach",
    subtitle: "Start conversations",
    toolStackValue: "€704/mo",
    locked: true,
    steps: [
      { title: "Initial Outreach", description: "Begin investor conversations", completed: false },
      { title: "Pitch Review", description: "Perfect your live pitch", completed: false },
      { title: "Q&A Preparation", description: "Prepare for investor questions", completed: false },
      { title: "Follow-ups", description: "Maintain momentum with investors", completed: false },
      { title: "Soft Interest & Good News", description: "Convert interest to commitment", completed: false },
    ],
  },
  {
    number: 4,
    title: "Deal Execution & Closing",
    subtitle: "Close the round",
    toolStackValue: "€1151/mo",
    locked: true,
    steps: [
      { title: "Term Sheet Review", description: "Evaluate incoming term sheets", completed: false },
      { title: "Term Sheet Negotiation", description: "Negotiate optimal terms", completed: false },
      { title: "Investor Agreement Review", description: "Review final legal documents", completed: false },
      { title: "Deal Closing", description: "Execute and close your round", completed: false },
    ],
  },
];

const toolStackAccess = [
  { phase: 1, title: "Pre-Fundraise Readiness", value: "€276/mo", tools: "4 tools available", locked: false },
  { phase: 2, title: "Fund Preparation", value: "€477/mo", tools: "7 tools locked", locked: true },
  { phase: 3, title: "Investor Outreach", value: "€704/mo", tools: "10 tools locked", locked: true },
  { phase: 4, title: "Deal Execution & Closing", value: "€1151/mo", tools: "13 tools locked", locked: true },
];

export function FundraisingJourney() {
  const totalSteps = phases.reduce((acc, phase) => acc + phase.steps.length, 0);
  const completedSteps = phases.reduce(
    (acc, phase) => acc + phase.steps.filter((s) => s.completed).length,
    0
  );
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Your Fundraising Journey</h2>
          <p className="text-sm md:text-base text-muted-foreground">Track your progress through each stage of your fundraise</p>
        </div>

        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-2xl md:text-3xl font-bold text-foreground">{overallProgress}%</span>
            <span className="text-xs md:text-sm text-muted-foreground">
              Journey Progress <span className="font-medium text-foreground">{completedSteps} of {totalSteps} steps completed</span>
            </span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Phase indicators */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className={cn(
                "flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full text-xs md:text-sm font-bold",
                phase.steps.some((s) => s.completed)
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {phase.number}
            </div>
          ))}
        </div>
      </div>

      {/* Journey Map */}
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-semibold">Complete Journey Map</h3>
          <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">Scroll to explore all phases →</span>
        </div>

        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {phases.map((phase) => {
            const phaseCompleted = phase.steps.filter((s) => s.completed).length;
            const phaseTotal = phase.steps.length;
            const phaseProgress = Math.round((phaseCompleted / phaseTotal) * 100);

            return (
              <Card
                key={phase.number}
                className={cn(
                  "min-w-[280px] md:min-w-[320px] flex-shrink-0 rounded-xl shadow-card transition-shadow hover:shadow-card-hover",
                  phase.locked && "opacity-75",
                  phaseProgress > 0 && !phase.locked && "border-orange-500/50"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-primary">Phase {phase.number}</span>
                    {phase.locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <CardTitle className="text-lg">{phase.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Progress value={phaseProgress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {phaseProgress}% complete <span className="font-medium">{phaseCompleted}/{phaseTotal} steps</span>
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {phase.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-start gap-3 rounded-md border p-3 transition-colors",
                        step.completed
                          ? "border-primary/20 bg-primary/5"
                          : "border-border bg-background"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                          step.completed
                            ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
                            : "border-2 border-muted-foreground/30"
                        )}
                      >
                        {step.completed && <Check className="h-3 w-3" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 flex items-center justify-between border-t pt-3">
                    <span className="text-xs text-muted-foreground">Tool stack value</span>
                    <span className="text-sm font-bold text-orange-500">{phase.toolStackValue}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tool Stack Access */}
      <Card className="shadow-card rounded-xl">
        <CardHeader className="pb-3 md:pb-6">
          <CardTitle className="text-base md:text-lg">Your Tool Stack Access</CardTitle>
          <div className="flex flex-wrap gap-4 md:gap-6 pt-2">
            <div className="text-xs md:text-sm">
              <span className="text-muted-foreground">Investment Team</span>
              <span className="ml-2 font-bold text-foreground">€150/hr</span>
            </div>
            <div className="text-xs md:text-sm">
              <span className="text-muted-foreground">Senior Team</span>
              <span className="ml-2 font-bold text-foreground">€550/hr</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {toolStackAccess.map((item) => (
              <div
                key={item.phase}
                className={cn(
                  "rounded-xl border p-4 transition-colors",
                  item.locked
                    ? "border-border bg-muted/30"
                    : "border-primary/20 bg-primary/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary">Phase {item.phase}</span>
                  <span className="text-sm font-bold text-orange-500">{item.value}</span>
                </div>
                <h4 className="mt-2 text-sm font-medium">{item.title}</h4>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  {item.locked ? (
                    <>
                      <Lock className="h-3 w-3" />
                      <span>{item.tools}</span>
                    </>
                  ) : (
                    <span className="text-primary">{item.tools}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
