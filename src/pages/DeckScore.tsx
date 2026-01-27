import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Star,
  Users,
  Check,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Building2,
  MapPin,
  Wallet,
  Layers,
  FileText,
  Send,
  Sparkles,
  BarChart3,
  Lightbulb,
  DollarSign,
  Clock,
  Zap
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Investor Match Summary data
const investorMatchData = {
  relevantInvestors: 47,
  stageMatch: "Pre-Seed / Seed",
  sectorMatch: "AI/ML, SaaS",
  geography: "Europe",
  checkSize: "€100K - €500K"
};

// What's Working Well - expanded with more details
const workingWell = [
  { title: "Clear Problem Definition", description: "Strong market validation with quantifiable pain points. Your pitch clearly articulates the problem space and demonstrates deep understanding of customer needs." },
  { title: "Innovative Solution", description: "Differentiated approach with defensible technology. The product architecture shows clear competitive moats and innovation potential." },
  { title: "Team Background", description: "Relevant industry experience and complementary skills. The founding team has the right mix of technical and business expertise." },
  { title: "Early Traction", description: "Initial metrics show promising product-market fit indicators with growing user engagement and positive feedback loops." },
  { title: "Scalable Business Model", description: "Revenue model demonstrates clear path to profitability with strong unit economics potential at scale." },
];

// Where Investors Will Push Back - all unlocked with full details
const investorConcerns = [
  { title: "Market Size Clarity", description: "TAM/SAM/SOM needs more granular breakdown. Consider adding bottom-up analysis to complement top-down estimates. Include data sources and methodology." },
  { title: "Go-to-Market Strategy", description: "Customer acquisition channels need validation. Provide evidence from pilot programs or early sales cycles. Detail CAC by channel and conversion rates." },
  { title: "Unit Economics", description: "LTV/CAC ratio and payback period unclear. Break down cohort analysis and show retention curves. Include gross margin assumptions." },
  { title: "Competitive Landscape", description: "Need deeper analysis of direct and indirect competitors. Map competitive advantages and potential responses from incumbents." },
  { title: "Financial Projections", description: "Revenue forecasts need more conservative scenario planning. Add sensitivity analysis and key assumption drivers." },
];

// Detailed Score Breakdown
const scoreBreakdown = [
  { category: "Problem & Solution", score: 85, description: "Clear value proposition with validated pain points" },
  { category: "Market Opportunity", score: 72, description: "Large addressable market, needs better segmentation" },
  { category: "Business Model", score: 78, description: "Solid revenue model with growth potential" },
  { category: "Traction & Metrics", score: 88, description: "Strong early indicators and growth trajectory" },
  { category: "Team & Execution", score: 90, description: "Experienced team with relevant background" },
  { category: "Competitive Position", score: 68, description: "Good differentiation, needs moat strengthening" },
  { category: "Financials & Ask", score: 75, description: "Reasonable ask with clear use of funds" },
];

// What Happens Next
const nextSteps = [
  { icon: FileText, title: "Review Positioning", description: "Fine-tune your pitch narrative based on insights" },
  { icon: Target, title: "Finalize Target List", description: "Get matched with relevant investors for your stage" },
  { icon: Send, title: "Structured Execution", description: "Access outreach templates and tracking tools" },
];

// Improvement Recommendations
const improvements = [
  { icon: BarChart3, title: "Strengthen Market Analysis", description: "Add bottom-up TAM calculation with clear data sources. Include market growth drivers and timing considerations.", priority: "High" },
  { icon: DollarSign, title: "Detail Unit Economics", description: "Break down LTV by customer segment. Show CAC trends over time and path to efficiency at scale.", priority: "High" },
  { icon: Lightbulb, title: "Expand Competitive Analysis", description: "Create a detailed competitive matrix. Highlight sustainable advantages and barrier-to-entry analysis.", priority: "Medium" },
  { icon: Clock, title: "Add Milestone Roadmap", description: "Define 12-18 month milestones with clear success metrics. Link funding to specific achievements.", priority: "Medium" },
  { icon: Zap, title: "Showcase Customer Evidence", description: "Include customer testimonials, case studies, or pilot results. Quantify value delivered.", priority: "Low" },
];

export default function DeckScore() {
  const overallScore = 81;

  return (
    <DashboardLayout title="Deck Score" breadcrumb="Deck Score">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Overall Score Card */}
        <div className="rounded-2xl bg-card p-6 md:p-8 shadow-lg border border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                  <Star className="h-10 w-10 text-amber-500" />
                </div>
                <div>
                  <p className="text-5xl md:text-6xl font-bold text-foreground">{overallScore}%</p>
                  <p className="text-lg font-medium text-amber-600">Fundable with Improvements</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Your startup shows strong potential. With targeted improvements in key areas, 
                you can significantly increase your chances of securing investment. Below you'll find 
                detailed analysis and actionable recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="rounded-2xl bg-card p-6 md:p-8 shadow-lg border border-border">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Detailed Score Breakdown
          </h3>
          <div className="space-y-4">
            {scoreBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.category}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="text-lg font-bold text-foreground ml-4">{item.score}%</span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Investor Match Summary */}
        <div className="rounded-2xl bg-card p-6 md:p-8 shadow-lg border border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Investor Match Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold text-foreground">{investorMatchData.relevantInvestors}</p>
              <p className="text-sm text-muted-foreground">Relevant Investors</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <Layers className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-base font-semibold text-foreground">{investorMatchData.stageMatch}</p>
              <p className="text-sm text-muted-foreground">Stage Focus</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-base font-semibold text-foreground">{investorMatchData.sectorMatch}</p>
              <p className="text-sm text-muted-foreground">Sector Match</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-base font-semibold text-foreground">{investorMatchData.geography}</p>
              <p className="text-sm text-muted-foreground">Geography</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/50 col-span-2 md:col-span-1">
              <Wallet className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-base font-semibold text-foreground">{investorMatchData.checkSize}</p>
              <p className="text-sm text-muted-foreground">Check Size</p>
            </div>
          </div>
        </div>

        {/* What's Working Well & Concerns Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* What's Working Well */}
          <div className="rounded-2xl bg-card p-6 shadow-lg border border-border">
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

          {/* Where Investors Will Push Back - All Unlocked */}
          <div className="rounded-2xl bg-card p-6 shadow-lg border border-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
              Where Investors Will Push Back
            </h3>
            <div className="space-y-3">
              {investorConcerns.map((item, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amber-900">{item.title}</p>
                    <p className="text-sm text-amber-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Improvement Recommendations */}
        <div className="rounded-2xl bg-card p-6 md:p-8 shadow-lg border border-border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Improvement Recommendations
          </h3>
          <div className="space-y-4">
            {improvements.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.priority === "High" ? "bg-red-100 text-red-700" :
                      item.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens Next */}
        <div className="rounded-2xl bg-card p-6 md:p-8 shadow-lg border border-border">
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
      </div>
    </DashboardLayout>
  );
}
