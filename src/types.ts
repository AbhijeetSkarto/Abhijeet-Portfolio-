export interface DiagnosticInputs {
  businessName: string;
  businessSize: string;
  industry: string;
  revenueStage: string;
  bottleneck: string;
  goals: string;
}

export interface AiLeverageOpportunity {
  title: string;
  description: string;
  leverageLevel: "High" | "Medium" | "Low";
  timeToImplement: string;
  estimatedImpact: string;
}

export interface GtmQuickWin {
  tactic: string;
  action: string;
  expectedOutcome: string;
}

export interface BottleneckAnalysis {
  coreRootCause: string;
  underlyingSymptom: string;
  architecturalMistake: string;
}

export interface DiagnosticResult {
  executiveSummary: string;
  bottleneckAnalysis: BottleneckAnalysis;
  aiLeverageOpportunities: AiLeverageOpportunity[];
  gtmQuickWins: GtmQuickWin[];
  roadmap: {
    day1_30: string;
    day31_60: string;
    day61_90: string;
  };
  customQuoteFromAbhijeet: string;
}

export interface ContactInputs {
  name: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  context: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  category: "Strategy" | "Execution" | "Leadership" | "Expansion";
}

export interface ServiceItem {
  id: string;
  num: string;
  icon: string;
  title: string;
  description: string;
  outcomes: string[];
}
