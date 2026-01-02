
import React, { useMemo, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Legend
} from 'recharts';
import { 
  Landmark, 
  TrendingDown, 
  Calculator, 
  IndianRupee, 
  ShieldCheck,
  CheckCircle2,
  Info,
  Layers,
  Calendar
} from 'lucide-react';

interface FinancialImpactProps {
  isOnoe: boolean;
  setIsOnoe: (val: boolean) => void;
  period: 5 | 10 | 15;
  setPeriod: (val: 5 | 10 | 15) => void;
}

type ElectionScope = 'LS_STATES' | 'ALL_BODIES';

const FinancialImpact: React.FC<FinancialImpactProps> = ({ period, setPeriod }) => {
  const [scope, setScope] = useState<ElectionScope>('LS_STATES');

  // OFFICIAL BASELINE COSTING (₹ Crore) - Based on ECI & Kovind Reports
  const LS_BASE_COST = 9200;
  const ASSEMBLY_BASE_COST = 3400;
  const LOCAL_BODIES_ADDITIONAL = 2200; // Annualized staggered cost for 250k+ local bodies
  const AVG_STATES_PER_YEAR = 5.6;
  const ONE_TIME_SYNC_CAPEX = 5500; // EVM/VVPAT Synchronization Buffer

  const financials = useMemo(() => {
    // CURRENT SYSTEM: Staggered cycles across Parliament and States
    const annualLS = LS_BASE_COST / 5;
    const annualStates = AVG_STATES_PER_YEAR * ASSEMBLY_BASE_COST;
    const annualLocal = scope === 'ALL_BODIES' ? LOCAL_BODIES_ADDITIONAL : 0;
    
    const currentTotal = (annualLS + annualStates + annualLocal) * period;

    // ONOE SYSTEM: Integrated 5-year cycles (35% operational efficiency target)
    const integratedCycleCost = (LS_BASE_COST + (28 * ASSEMBLY_BASE_COST));
    const integratedLocal = scope === 'ALL_BODIES' ? (LOCAL_BODIES_ADDITIONAL * 5 * 0.4) : 0;
    
    const onoeOperational = ((integratedCycleCost + integratedLocal) / 5) * 0.65;
    const onoeTotal = (onoeOperational * period) + ONE_TIME_SYNC_CAPEX;

    const savings = currentTotal - onoeTotal;
    const savingsPercent = ((savings / currentTotal) * 100).toFixed(1);

    return {
      current: Math.round(currentTotal),
      onoe: Math.round(onoeTotal),
      savings: Math.round(savings),
      percent: savingsPercent
    };
  }, [period, scope]);

  const barData = [
    { name: 'Current System', cost: financials.current, fill: '#94a3b8' },
    { name: 'Synchronized System', cost: financials.onoe, fill: '#2563eb' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      
      {/* 1. SELECTION CONTROLS (Simplicity First) */}
      <section className="bg-white p-8 rounded-[3.5rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-blue-600 text-white rounded-3xl shadow-lg shadow-blue-100">
            <Calculator size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">Fiscal Impact Report</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Projected Expenditure Comparison</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Audit Window</span>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              {[5, 10, 15].map(p => (
                <button 
                  key={p} 
                  onClick={() => setPeriod(p as any)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${period === p ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
                >
                  {p} Years
                </button>
              ))}
            </div>
          </div>

          <div className="h-10 w-px bg-slate-200 mx-2 hidden lg:block" />

          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Election Scope</span>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button 
                onClick={() => setScope('LS_STATES')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${scope === 'LS_STATES' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
              >
                <Landmark size={14} /> LS + States
              </button>
              <button 
                onClick={() => setScope('ALL_BODIES')}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${scope === 'ALL_BODIES' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
              >
                <Layers size={14} /> + Local Bodies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FINANCIAL KPI CARDS (Auto-displayed Savings) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm relative group overflow-hidden">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Current Spending (Baseline)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-black text-slate-900 tabular-nums">₹{financials.current.toLocaleString()}</span>
            <span className="text-sm font-black text-slate-400">Cr</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase flex items-center gap-2">
            <Info size={12} /> Fragmented staggered cycles
          </p>
          <div className="absolute -bottom-8 -right-8 opacity-[0.03] text-slate-900 group-hover:scale-110 transition-transform">
             <Landmark size={160} />
          </div>
        </div>

        <div className="p-10 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm relative group overflow-hidden">
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6">New System Cost (ONOE)</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-black text-blue-600 tabular-nums">₹{financials.onoe.toLocaleString()}</span>
            <span className="text-sm font-black text-blue-300">Cr</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-6 uppercase flex items-center gap-2">
            <Calendar size={12} /> Includes Sync Capex Buffer
          </p>
          <div className="absolute -bottom-8 -right-8 opacity-[0.03] text-blue-600 group-hover:scale-110 transition-transform">
             <ShieldCheck size={160} />
          </div>
        </div>

        <div className="p-10 rounded-[3.5rem] bg-emerald-600 text-white shadow-2xl shadow-emerald-200 relative group overflow-hidden animate-in fade-in zoom-in duration-500">
          <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-6 flex items-center gap-2">
            <CheckCircle2 size={14} /> Total Money Saved
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-black tabular-nums">₹{financials.savings.toLocaleString()}</span>
            <span className="text-sm font-black text-emerald-200">Cr</span>
          </div>
          <div className="mt-6">
            <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              {financials.percent}% Fiscal Relief
            </span>
          </div>
          <div className="absolute -bottom-8 -right-8 opacity-10 text-white group-hover:scale-110 transition-transform">
             <TrendingDown size={180} />
          </div>
        </div>
      </section>

      {/* 3. COMPARISON CHART & EXPLANATORY SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* CHART (3 cols) */}
        <div className="lg:col-span-3 p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm flex flex-col">
          <h4 className="text-xl font-black text-slate-900 mb-12 flex items-center gap-4 uppercase tracking-tight">
             <IndianRupee size={22} className="text-blue-600" /> Expenditure Benchmarking
          </h4>
          <div className="flex-1 min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={barData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                barSize={120}
              >
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 12, fontWeight: '900', fill: '#1e293b'}} 
                  dy={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94a3b8'}} 
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
                />
                <Bar dataKey="cost" radius={[16, 16, 0, 0]}>
                   {barData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] font-medium text-slate-500 mt-8 leading-relaxed text-center px-10">
            Projected savings represent estimated reduction in election-related expenditure due to synchronized elections, based on official expenditure data and committee recommendations.
          </p>
        </div>

        {/* POLICY NOTES (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
           <div className="p-10 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl border border-slate-800 flex flex-col justify-between h-full">
              <div>
                <h4 className="text-xl font-black mb-8 flex items-center gap-4 text-blue-400">
                   <Info size={24} /> Auditor Assumptions
                </h4>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        <span className="text-white font-black">Sync Buffer:</span> Includes a one-time Capex of ₹5,500 Cr for additional EVM/VVPAT manufacturing and storage capacity.
                      </p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        <span className="text-white font-black">Logistics Gain:</span> Estimated 35% reduction in recurring movement, security transit, and personnel mobilization costs.
                      </p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        <span className="text-white font-black">Local Body Factor:</span> Alignment with Panchayats/Municipalities adds one-time logistics load but saves significant recurring annual mobilization.
                      </p>
                   </div>
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Policy Reference</p>
                 <p className="text-xs text-slate-300 font-bold leading-relaxed">
                   Source: ECI Expenditure Audit (2024) & Kovind Committee Fiscal Projections (Vol 2). All figures are simulation-based and rounded for policy analysis.
                 </p>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default FinancialImpact;
