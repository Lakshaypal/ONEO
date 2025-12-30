
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  Legend
} from 'recharts';
import { 
  Landmark, 
  TrendingDown, 
  Calculator, 
  IndianRupee, 
  TrendingUp,
  ArrowDownCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingDown as SavingIcon,
  ShieldCheck
} from 'lucide-react';

interface FinancialImpactProps {
  isOnoe: boolean;
  setIsOnoe: (val: boolean) => void;
  period: 5 | 10 | 15;
  setPeriod: (val: 5 | 10 | 15) => void;
}

const FinancialImpact: React.FC<FinancialImpactProps> = ({ isOnoe, setIsOnoe, period, setPeriod }) => {
  // BASELINE COSTING (₹ Crore)
  const LS_BASE_COST = 9200;
  const ASSEMBLY_BASE_COST = 3400;
  const AVG_STATES_PER_YEAR = 5.6;
  const INITIAL_CAPEX = 5500; // EVM/VVPAT Upgrade for ONOE

  // Current fragmented spending logic
  const annualCurrentAvg = (LS_BASE_COST / 5) + (AVG_STATES_PER_YEAR * ASSEMBLY_BASE_COST);
  
  // ONOE integrated spending logic (35% efficiency target)
  const annualOnoeAvg = ((LS_BASE_COST + (28 * ASSEMBLY_BASE_COST)) / 5) * 0.65;

  const totals = useMemo(() => {
    const current = annualCurrentAvg * period;
    const onoe = (annualOnoeAvg * period) + INITIAL_CAPEX;
    const savings = isOnoe ? (current - onoe) : 0;
    const reliefPercentage = ((current - onoe) / current * 100).toFixed(1);
    return { current, onoe, savings, reliefPercentage };
  }, [period, isOnoe]);

  const barData = [
    { name: 'Current (Fragmented)', cost: Math.round(totals.current), color: '#94a3b8' },
    { name: 'ONOE (Synchronized)', cost: Math.round(totals.onoe), color: '#3b82f6' },
  ];

  const trendData = useMemo(() => {
    return Array.from({ length: period + 1 }, (_, i) => ({
      year: `Year ${i}`,
      current: Math.round(annualCurrentAvg * i),
      onoe: i === 0 ? 0 : Math.round((annualOnoeAvg * i) + INITIAL_CAPEX)
    }));
  }, [period]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* 1. INTERACTIVE PROJECTION HEADER */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
            <Landmark size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">Fiscal Auditor Panel</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Simulating Multi-Year Governance Expenditure</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projection Period:</span>
             <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
               {[5, 10, 15].map(p => (
                 <button 
                  key={p} 
                  onClick={() => setPeriod(p as any)} 
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${period === p ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}
                 >
                   {p}Y
                 </button>
               ))}
             </div>
          </div>
          
          <div className="h-10 w-px bg-slate-200 hidden lg:block" />

          <button 
            onClick={() => setIsOnoe(!isOnoe)}
            className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isOnoe ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            {isOnoe ? 'ONOE Active' : 'Simulate ONOE'}
          </button>
        </div>
      </div>

      {/* 2. KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 rounded-[3rem] bg-white border border-slate-200 shadow-sm group relative overflow-hidden transition-all hover:border-blue-400">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-slate-50 text-slate-400 rounded-[1.5rem] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"><Calculator size={28}/></div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status Quo Budget</span>
              <span className="text-xs font-black text-slate-900">₹ Crores</span>
            </div>
          </div>
          <h3 className="text-5xl font-black text-slate-900">₹{Math.round(totals.current).toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-slate-400 mt-4 uppercase italic">Staggered Election Cycles</p>
          <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-5 transition-opacity"><TrendingUp size={140}/></div>
        </div>

        <div className={`p-10 rounded-[3rem] transition-all relative overflow-hidden group transform hover:-translate-y-2 ${isOnoe ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' : 'bg-white border border-slate-200 shadow-sm'}`}>
          <div className="flex justify-between items-start mb-8">
            <div className={`p-4 rounded-[1.5rem] ${isOnoe ? 'bg-white/20 backdrop-blur' : 'bg-blue-50 text-blue-600'}`}><IndianRupee size={28}/></div>
            <div className="text-right">
              <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${isOnoe ? 'text-blue-200' : 'text-slate-400'}`}>ONOE Budget</span>
              <span className={`text-xs font-black ${isOnoe ? 'text-white' : 'text-slate-900'}`}>₹ Crores</span>
            </div>
          </div>
          <h3 className="text-5xl font-black">₹{Math.round(totals.onoe).toLocaleString()}</h3>
          <p className={`text-[11px] font-bold mt-4 uppercase ${isOnoe ? 'text-blue-100' : 'text-slate-400'}`}>
            Includes ₹{INITIAL_CAPEX} Cr CAPEX
          </p>
          <div className="absolute top-0 right-0 p-10 opacity-10"><Landmark size={140}/></div>
        </div>

        <div className="p-10 rounded-[3rem] bg-emerald-50 border border-emerald-100 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-white text-emerald-600 rounded-[1.5rem] shadow-sm"><SavingIcon size={28}/></div>
            <div className="text-right">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Projected Savings</span>
              <span className="text-xs font-black text-emerald-800">₹ Crores</span>
            </div>
          </div>
          <h3 className="text-5xl font-black text-emerald-700">₹{Math.round(totals.savings).toLocaleString()}</h3>
          <div className="mt-4 flex items-center gap-2">
            <div className="px-3 py-1 bg-emerald-200 rounded-full text-[10px] font-black text-emerald-800 uppercase tracking-widest">
               {isOnoe ? `+ ${totals.reliefPercentage}% Gain` : 'Inactive'}
            </div>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-10 text-emerald-600"><ArrowDownCircle size={140}/></div>
        </div>
      </div>

      {/* 3. CHART ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="p-12 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <h4 className="text-2xl font-black text-slate-900 mb-12 flex items-center gap-4">
             <Calculator size={24} className="text-blue-600" /> Aggregated Fiscal Matrix
          </h4>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} 
                />
                <Bar dataKey="cost" radius={[20, 20, 0, 0]} barSize={100}>
                  {barData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-12 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <h4 className="text-2xl font-black text-slate-900 mb-12 flex items-center gap-4">
             <Clock size={24} className="text-emerald-600" /> Multi-Year Trend Analysis
          </h4>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" tick={{fontSize: 10}} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 10}} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} />
                <Legend iconType="circle" />
                <Line type="monotone" name="Staggered Spend" dataKey="current" stroke="#cbd5e1" strokeWidth={5} dot={{r: 6}} activeDot={{r: 10}} />
                <Line type="monotone" name="Synchronized Spend" dataKey="onoe" stroke="#3b82f6" strokeWidth={5} dot={{r: 6}} activeDot={{r: 10}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. METHODOLOGY CALLOUT */}
      <div className="p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl border border-slate-800">
         <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-xl shadow-blue-500/20 rotate-6">
            <ShieldCheck size={48} />
         </div>
         <div className="flex-1">
            <h5 className="text-2xl font-black mb-3">Auditor Methodology Note</h5>
            <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-3xl italic">
              "Cost projections are calculated using ECI historical expenditure reports and adjusted for the initial ₹5,500 Cr EVM/VVPAT synchronization buffer. ONOE efficiency gains are derived from consolidated logistics, single polling station personnel, and reduced multi-level security mobility."
            </p>
         </div>
         <button className="flex-shrink-0 flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all group">
            Download Audit Report <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>

    </div>
  );
};

export default FinancialImpact;