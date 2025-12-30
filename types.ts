
export interface ElectionStats {
  year: number;
  lsCost: number; // in Crores
  assemblyCost: number; // in Crores
  mccDays: number;
  manpowerCount: number; // in Millions
  securityDeployment: number; // Personnel in Lakhs
}

export interface StateCycle {
  id: string;
  name: string;
  lastElection: number;
  nextScheduled: number;
  alignmentYear: number;
  governanceDisruptionScore: number;
  region: 'North' | 'South' | 'East' | 'West' | 'Northeast' | 'Central';
}

export interface ScenarioState {
  earlyDissolution: boolean;
  hungAssemblyProb: number;
  presidentsRuleYear: number | null;
  includeLocalBodies: boolean;
}

// Added missing interface for Financial impact calculations
export interface FinancialMetric {
  head: string;
  currentCost: number;
  onoeCost: number;
  description: string;
}

// Added missing interface for Administrative burden metrics
export interface AdminMetric {
  category: string;
  currentValue: number;
  onoeValue: number;
  unit: string;
}

// Added missing interface for Impact comparison data
export interface ImpactComparison {
  metric: string;
  current: number;
  onoe: number;
  unit: string;
  description: string;
}

// Added missing interface for Legal roadmap articles
export interface ConstitutionalArticle {
  article: string;
  title: string;
  impact: string;
  recommendation: string;
}

export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  TIMELINE = 'TIMELINE',
  FINANCIAL = 'FINANCIAL',
  ADMIN = 'ADMIN',
  GOVERNANCE = 'GOVERNANCE',
  CONSTITUTIONAL = 'CONSTITUTIONAL',
  SCENARIO = 'SCENARIO',
  REFERENCES = 'REFERENCES'
}
