
import { ElectionStats, StateCycle, ConstitutionalArticle, ImpactComparison, FinancialMetric, AdminMetric } from './types';

export const HISTORICAL_STATS: ElectionStats[] = [
  { year: 2004, lsCost: 1016, assemblyCost: 1200, mccDays: 520, manpowerCount: 4.5, securityDeployment: 7.2 },
  { year: 2009, lsCost: 1114, assemblyCost: 1500, mccDays: 610, manpowerCount: 5.2, securityDeployment: 8.5 },
  { year: 2014, lsCost: 3870, assemblyCost: 2800, mccDays: 780, manpowerCount: 8.5, securityDeployment: 12.0 },
  { year: 2019, lsCost: 4500, assemblyCost: 3500, mccDays: 850, manpowerCount: 11.0, securityDeployment: 15.0 },
  { year: 2024, lsCost: 5200, assemblyCost: 4200, mccDays: 920, manpowerCount: 12.5, securityDeployment: 18.0 },
];

export const STATES_DATA: StateCycle[] = [
  { id: 'UP', name: 'Uttar Pradesh', lastElection: 2022, nextScheduled: 2027, alignmentYear: 2029, governanceDisruptionScore: 85, region: 'North' },
  { id: 'WB', name: 'West Bengal', lastElection: 2021, nextScheduled: 2026, alignmentYear: 2029, governanceDisruptionScore: 92, region: 'East' },
  { id: 'MH', name: 'Maharashtra', lastElection: 2019, nextScheduled: 2024, alignmentYear: 2029, governanceDisruptionScore: 78, region: 'West' },
  { id: 'TN', name: 'Tamil Nadu', lastElection: 2021, nextScheduled: 2026, alignmentYear: 2029, governanceDisruptionScore: 88, region: 'South' },
  { id: 'KA', name: 'Karnataka', lastElection: 2023, nextScheduled: 2028, alignmentYear: 2029, governanceDisruptionScore: 72, region: 'South' },
  { id: 'GJ', name: 'Gujarat', lastElection: 2022, nextScheduled: 2027, alignmentYear: 2029, governanceDisruptionScore: 65, region: 'West' },
  { id: 'RJ', name: 'Rajasthan', lastElection: 2023, nextScheduled: 2028, alignmentYear: 2029, governanceDisruptionScore: 70, region: 'North' },
  { id: 'OD', name: 'Odisha', lastElection: 2024, nextScheduled: 2029, alignmentYear: 2029, governanceDisruptionScore: 40, region: 'East' },
  { id: 'MP', name: 'Madhya Pradesh', lastElection: 2023, nextScheduled: 2028, alignmentYear: 2029, governanceDisruptionScore: 62, region: 'Central' },
  { id: 'TG', name: 'Telangana', lastElection: 2023, nextScheduled: 2028, alignmentYear: 2029, governanceDisruptionScore: 58, region: 'South' },
];

export const FINANCIAL_HEADS: FinancialMetric[] = [
  { head: 'Security Forces Deployment', currentCost: 3200, onoeCost: 1850, description: 'Travel allowance, base pay, and transit logistics for CAPF/State police.' },
  { head: 'EVM & VVPAT Logistics', currentCost: 1500, onoeCost: 2100, description: 'Storage, transport, and initial capex. ONOE requires 30% more buffer units.' },
  { head: 'Polling Personnel', currentCost: 1800, onoeCost: 1100, description: 'Training and honorarium for 12M+ government staff and teachers.' },
  { head: 'MCC Administrative Costs', currentCost: 950, onoeCost: 320, description: 'Indirect costs from project delays and specialized enforcement staff.' },
  { head: 'Voter Awareness & Comms', currentCost: 450, onoeCost: 280, description: 'SVEEP activities and media campaign efficiency gains.' }
];

export const ADMIN_METRICS: AdminMetric[] = [
  { category: 'Security Deployment (Lakhs)', currentValue: 18.5, onoeValue: 12.2, unit: 'Personnel' },
  { category: 'MCC Paralysis (Days/Year)', currentValue: 124, onoeValue: 38, unit: 'Days' },
  { category: 'Man-Days Diverted (Millions)', currentValue: 15.6, onoeValue: 9.8, unit: 'Man-Days' },
  { category: 'Educational Disruptions', currentValue: 45, onoeValue: 12, unit: 'School Days' }
];

export const COMPARISON_DATA: ImpactComparison[] = [
  { metric: 'Annual Election Expenditure', current: 7500, onoe: 4800, unit: '₹ Cr', description: 'Savings in logistics, personnel, and administration' },
  { metric: 'Avg. MCC Days per Cycle', current: 120, onoe: 45, unit: 'Days', description: 'Reduction in policy paralysis and governance pauses' },
  { metric: 'Security Personnel Mobilization', current: 18, onoe: 11, unit: 'Lakh', description: 'Reduced repeated cross-country movement' },
  { metric: 'EVM/VVPAT Requirement', current: 2.5, onoe: 4.2, unit: 'Mn Units', description: 'Initial CAPEX increase for synchronization' },
];

export const CONSTITUTIONAL_PROVISIONS: ConstitutionalArticle[] = [
  { 
    article: '83(2)', 
    title: 'LS Duration', 
    impact: 'Current 5-year fixed term without flexibility for synchronization.', 
    recommendation: 'Amend to allow extension or curtailment for alignment with the state assemblies.' 
  },
  { 
    article: '172(1)', 
    title: 'Assembly Duration', 
    impact: 'State assemblies have varied expiry dates.', 
    recommendation: 'Enable synchronization of the first assembly term with the Parliament.' 
  },
  { 
    article: '356', 
    title: "President's Rule", 
    impact: 'Potential misuse or frequent application in case of hung assemblies.', 
    recommendation: 'Fresh elections for the remainder of the term only to maintain the cycle.' 
  },
];
