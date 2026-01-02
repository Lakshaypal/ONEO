import React, { useMemo, useState, useEffect } from 'react';
import { 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Users, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Gavel, 
  Calendar,
  Layers,
  Info,
  ArrowRight,
  TrendingDown,
  BrainCircuit,
  HelpCircle,
  ArrowLeft,
  ListChecks,
  AlertCircle,
  History,
  Briefcase,
  // Added missing icon import
  Database
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { analyzePolicyScenario } from '../services/geminiService';

// BENCHMARKS (Sourced from Kovind Report & ECI Data)
const BENCHMARKS = {
  LS_POLL_COST: 9500,
  ASSEMBLY_POLL_COST_AVG: 420,
  MCC_DAYS_FRAGMENTED: 124, 
  MCC_DAYS_SYNC: 15,
  AVG_STATES_PER_YEAR: 5.6,
};

type SyncModel = 'FULL' | 'PARTIAL' | 'STATUS_QUO';
type Horizon = 5 | 10 | 15;

const ScenarioBuilder: React.FC = () => {
  // 1. WIZARD STATE
  const [step, setStep] = useState(1);
  const [model, setModel] = useState<SyncModel>('FULL');
  const [horizon, setHorizon] = useState<Horizon>(10);

  // 2. AI & EXPLANATION STATE
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showSimpleExplanation, setShowSimpleExplanation] = useState(false);

  // 3. CALCULATION ENGINE
  const data = useMemo(() => {
    const currentStateCycles = Math.round(BENCHMARKS.AVG_STATES_PER_YEAR * horizon);
    const currentLSCycles = Math.floor(horizon / 5);
    const currentTotalCycles = currentStateCycles + currentLSCycles;
    
    const currentCost = ((BENCHMARKS.LS_POLL_COST / 5) + (BENCHMARKS.AVG_STATES_PER_YEAR * BENCHMARKS.ASSEMBLY_POLL_COST_AVG)) * horizon;
    const currentMCC = BENCHMARKS.MCC_DAYS_FRAGMENTED * horizon;

    let efficiency = 1.0;
    let projectedTotalCycles = currentTotalCycles;
    
    if (model === 'FULL') {
      efficiency = 0.65;
      projectedTotalCycles = Math.floor(horizon / 5);
    } else if (model === 'PARTIAL') {
      efficiency = 0.85;
      projectedTotalCycles = Math.floor(horizon / 5) * 2;
    }

    const projectedCost = (currentCost * efficiency) + (model !== 'STATUS_QUO' ? 5500 : 0);
    const projectedMCC = model !== 'STATUS_QUO' ? BENCHMARKS.MCC_DAYS_SYNC * horizon : currentMCC;
    const reliefPercent = model === 'STATUS_QUO' ? 0 : Math.round(((currentTotalCycles - projectedTotalCycles) / currentTotalCycles) * 100);

    return {
      cost: { current: Math.round(currentCost), projected: Math.round(projectedCost) },
      mcc: { current: Math.round(currentMCC), projected: Math.round(projectedMCC) },
      cycles: { current: currentTotalCycles, projected: projectedTotalCycles },
      relief: reliefPercent
    };
  }, [model, horizon]);

  // 4. TRIGGER AI REPORT
  useEffect(() => {
    if (step === 4) {
      const fetchAiInsight = async () => {
        setIsAiLoading(true);
        const prompt = `Analyze this scenario in simple, non-technical language:
        Election System: ${model === 'FULL' ? 'Unified (One Nation One Election)' : model === 'PARTIAL' ? 'Clustered (Partial Sync)' : 'Current Staggered System'}
        Time Window: ${horizon} Years
        Result: Workload reduced by ${data.relief}% because staff are only deployed ${data.cycles.projected} times instead of ${data.cycles.current} times.
        Governance Impact: Policy delays (MCC) reduced from ${data.mcc.current} to ${data.mcc.projected} days.
        
        Please provide:
        1. A summary in simple words.
        2. What this means for administrative workload.
        3. Why this happened (in plain language).`;

        const result = await analyzePolicyScenario(prompt);
        setAiInsight(result);
        setIsAiLoading(false);
      };
      fetchAiInsight();
    }
  }, [step, model, horizon]);

  const handleReset = () => {
    setStep(1);
    setModel('FULL');
    setHorizon(10);
    setAiInsight(null);
  };

  // --- STEP 1: SYSTEM SELECTION ---
  if (step === 1) return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900">Step 1: What do you want to analyze?</h2>
        <p className="text-xl text-slate-500 font-medium italic">Choose how elections should be conducted in this scenario.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { id: 'STATUS_QUO', label: 'Current Election System', icon: History, desc: 'Elections are conducted one by one, as scheduled.' },
          { id: 'PARTIAL', label: 'Partial One Nation One Election', icon: Layers, desc: 'Elections are grouped into two windows every 5 years.' },
          { id: 'FULL', label: 'Full One Nation One Election', icon: Gavel, desc: 'All elections happen together at the same time.' }
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => { setModel(opt.id as any); setStep(2); }}
            className={`p-10 rounded-[3rem] border-4 text-center transition-all group hover:-translate-y-2 ${model === opt.id ? 'bg-blue-600 border-blue-600 text-white shadow-2xl' : 'bg-white border-slate-100 hover:border-blue-200'}`}
          >
            <div className={`w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center mb-8 ${model === opt.id ? 'bg-white/20' : 'bg-slate-50 text-blue-600'}`}>
              <opt.icon size={48} />
            </div>
            <h4 className="text-xl font-black mb-4 uppercase leading-tight">{opt.label}</h4>
            <p className={`text-sm font-medium leading-relaxed ${model === opt.id ? 'text-blue-100' : 'text-slate-400'}`}>
              "How elections are conducted under this system."
            </p>
          </button>
        ))}
      </div>
    </div>
  );

  // --- STEP 2: SELECT PERIOD ---
  if (step === 2) return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in slide-in-from-right-8">
      <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600"><ArrowLeft size={16}/> Back</button>
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900">Step 2: How many years of impact?</h2>
        <p className="text-xl text-slate-500 font-medium italic">Select the time window for this calculation.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 bg-white rounded-[3.5rem] border border-slate-200 shadow-sm">
        {[5, 10, 15].map(h => (
          <button 
            key={h} 
            onClick={() => { setHorizon(h as any); setStep(3); }}
            className={`py-12 rounded-[2.5rem] text-2xl font-black uppercase transition-all ${horizon === h ? 'bg-blue-600 text-white shadow-xl scale-105' : 'bg-slate-50 text-slate-400 hover:text-slate-600'}`}
          >
            {h} Years
          </button>
        ))}
      </div>
      <div className="p-8 bg-blue-50 rounded-[2.5rem] flex items-start gap-4 border border-blue-100">
        <Info size={24} className="text-blue-600 shrink-0 mt-1" />
        <p className="text-lg text-blue-800 font-medium leading-relaxed italic">
          <strong>Tip:</strong> Longer periods show how administrative savings add up over time.
        </p>
      </div>
    </div>
  );

  // --- STEP 3: CONFIRMATION ---
  if (step === 3) return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in slide-in-from-right-8">
      <button onClick={() => setStep(2)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-blue-600"><ArrowLeft size={16}/> Back</button>
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900">Step 3: Ready to see the results?</h2>
        <p className="text-xl text-slate-500 font-medium italic">We will now calculate the impact on workload and policy delays.</p>
      </div>
      <div className="p-12 bg-slate-900 rounded-[4rem] text-white flex flex-col gap-10 shadow-2xl">
         <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-lg"><Activity size={40}/></div>
            <div>
               <h4 className="text-2xl font-black uppercase">Configuration</h4>
               <p className="text-blue-300 text-lg font-medium">Analyzing <strong>{model.replace('_', ' ')}</strong> over <strong>{horizon} Years</strong></p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-4">
               <ShieldCheck className="text-emerald-400" />
               <span className="text-sm font-bold uppercase tracking-tight">Administrative Workload</span>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-4">
               <Clock className="text-amber-400" />
               <span className="text-sm font-bold uppercase tracking-tight">Governance Delays (MCC)</span>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-4">
               <Briefcase className="text-blue-400" />
               <span className="text-sm font-bold uppercase tracking-tight">Financial Savings</span>
            </div>
         </div>
      </div>
      <button onClick={() => setStep(4)} className="w-full py-10 bg-blue-600 text-white rounded-[3rem] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-4">
        Calculate Impact Report <ArrowRight size={28}/>
      </button>
    </div>
  );

  // --- STEP 4: RESULTS REPORT ---
  return (
    <div className="space-y-12 py-10 animate-in fade-in duration-1000 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
           <div className="p-5 bg-blue-600 text-white rounded-[2rem] shadow-xl"><ListChecks size={32}/></div>
           <div>
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Policy Analysis Report</h2>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Impact of your selected scenario</p>
           </div>
        </div>
        <button onClick={handleReset} className="px-10 py-5 bg-white border border-slate-200 rounded-[2rem] font-black text-[11px] uppercase text-slate-500 hover:text-blue-600 transition-all shadow-sm flex items-center gap-3">
          <RotateCcw size={18} /> Run Another Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          
          {/* ADMINISTRATIVE RELIEF KEY CARD */}
          <div className="p-12 rounded-[4rem] bg-emerald-600 text-white shadow-2xl relative overflow-hidden group border border-emerald-500">
             <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform">
                <Briefcase size={240} />
             </div>
             <div className="relative z-10 space-y-4">
                <p className="text-sm font-black text-emerald-100 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                   <ShieldCheck size={20}/> Result: Administrative Relief
                </p>
                <h3 className="text-8xl font-black tracking-tighter tabular-nums">{data.relief}%</h3>
                <p className="text-2xl font-medium text-emerald-50 leading-tight">Reduction in repeated election-related tasks.</p>
                <div className="pt-10 border-t border-emerald-500/50 mt-10">
                   <p className="text-lg text-emerald-100 font-medium leading-relaxed italic">
                      "In this scenario, elections happen less often, allowing the administration to focus more on routine governance rather than election preparation."
                   </p>
                </div>
             </div>
          </div>

          {/* AUTOMATED POLICY INSIGHT (AI) */}
          <div className="p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-5 mb-10">
               <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-lg"><BrainCircuit size={28}/></div>
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Automated Policy Insight</h3>
            </div>
            
            {isAiLoading ? (
              <div className="py-24 flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-8 border-slate-100 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-sm font-black uppercase text-slate-400 tracking-[0.2em]">Analyzing administrative data...</p>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in duration-1000">
                <div className="p-10 bg-blue-50 border-l-8 border-blue-600 rounded-r-[3rem]">
                   <h5 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-4">Summary in Simple Words</h5>
                   <p className="text-2xl text-slate-800 leading-relaxed font-bold">
                     {aiInsight?.split('\n')[0] || "Analysis complete."}
                   </p>
                </div>
                <div className="text-xl text-slate-600 font-medium whitespace-pre-line leading-loose">
                  {aiInsight?.split('\n').slice(1).join('\n')}
                </div>
                <div className="pt-10 border-t border-slate-100 flex items-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                   <AlertCircle size={16}/> Report based on Kovind Committee Data (2024).
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR VISUALS */}
        <div className="lg:col-span-5 space-y-10">
           
           {/* BEFORE VS AFTER TABLE */}
           <div className="p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm flex flex-col">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-10">
                 <Activity size={20} className="text-blue-600" /> Comparison of Load
              </h4>
              <div className="space-y-8">
                 <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl">
                    <span className="text-sm font-bold text-slate-500 uppercase">Preparation Cycles</span>
                    <div className="flex items-center gap-4">
                       <span className="text-lg font-black text-slate-300 line-through">{data.cycles.current}</span>
                       <ArrowRight size={18} className="text-slate-400" />
                       <span className="text-2xl font-black text-blue-600">{data.cycles.projected}</span>
                    </div>
                 </div>
                 <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl">
                    <span className="text-sm font-bold text-slate-500 uppercase">Governance Delays</span>
                    <div className="flex items-center gap-4">
                       <span className="text-lg font-black text-slate-300 line-through">{data.mcc.current} Days</span>
                       <ArrowRight size={18} className="text-slate-400" />
                       <span className="text-2xl font-black text-red-600">{data.mcc.projected} Days</span>
                    </div>
                 </div>
                 <div className="flex justify-between items-center p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                    <span className="text-sm font-bold text-emerald-700 uppercase">Staff Fatigue</span>
                    <span className="text-2xl font-black text-emerald-600">Reduced</span>
                 </div>
              </div>
           </div>

           {/* WHY THIS HAPPENED */}
           <div className="p-12 rounded-[4rem] bg-blue-600 text-white shadow-2xl flex flex-col gap-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform pointer-events-none">
                 <HelpCircle size={180} />
              </div>
              <div className="flex items-center gap-5 relative z-10">
                 <div className="p-4 bg-white text-blue-600 rounded-2xl shadow-xl"><Info size={24}/></div>
                 <h4 className="text-xl font-black uppercase tracking-tight">Why This Happened</h4>
              </div>
              <p className="text-xl text-blue-50 leading-relaxed font-medium italic relative z-10">
                "Because elections are conducted together, administrative staff are deployed fewer times, and the policy freeze window (MCC) only happens once every five years."
              </p>
              <div className="pt-8 border-t border-blue-500 mt-2 relative z-10">
                 <button 
                  onClick={() => setShowSimpleExplanation(!showSimpleExplanation)}
                  className="text-[11px] font-black uppercase text-blue-200 flex items-center gap-3 hover:gap-5 transition-all"
                 >
                   {showSimpleExplanation ? 'Hide Explanation' : 'Explain this in simple language'} <ChevronRight size={18}/>
                 </button>
                 {showSimpleExplanation && (
                   <div className="mt-6 p-8 bg-white text-slate-900 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-top-4">
                      <p className="text-sm font-medium leading-loose">
                        Under the current system, every time an election is called, government staff must leave their regular office work to manage polling booths. By holding elections together, these staff members only have to do this duty once, instead of multiple times over many years. This keeps offices running smoothly and prevents delays in government projects.
                      </p>
                   </div>
                 )}
              </div>
           </div>

           {/* BAR CHART: ELECTION FREQUENCY */}
           <div className="p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm flex flex-col h-[400px]">
              <div className="mb-10">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                   <TrendingDown size={20} className="text-blue-600" /> Deployment Frequency
                </h4>
              </div>
              
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Current System', cycles: data.cycles.current },
                      { name: 'Your Scenario', cycles: data.cycles.projected }
                    ]} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fontSize: 10, fontWeight: '900', fill: '#64748b'}} 
                        />
                       <YAxis hide />
                       <Tooltip cursor={{fill: '#f8fafc'}} />
                       <Bar dataKey="cycles" radius={[12, 12, 0, 0]} barSize={60}>
                          <Cell fill="#e2e8f0" />
                          <Cell fill="#2563eb" />
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="px-10 py-6 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center gap-5">
              <Database size={24} className="text-slate-400" />
              <p className="text-[10px] font-black text-slate-400 uppercase leading-relaxed tracking-[0.1em]">
                Analysis based on publicly available election data and official committee reports.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioBuilder;