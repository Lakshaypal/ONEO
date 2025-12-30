
import React, { useMemo, useState } from 'react';
import { analyzePolicyScenario } from '../services/geminiService';
import { 
  Zap, Bot, RefreshCw, Send, CheckCircle2, 
  AlertTriangle, Clock, Landmark, Users, 
  ShieldAlert, Activity, ChevronRight, XCircle, 
  Settings2, Gavel, Calendar
} from 'lucide-react';
import { STATES_DATA } from '../constants';
import { ScenarioType } from '../App';
import { ViewType } from '../types';

interface ScenarioBuilderProps {
  scenario: ScenarioType;
  setScenario: (val: ScenarioType) => void;
  disruptionYear: number;
  setDisruptionYear: (val: number) => void;
  disruptionStateId: string;
  setDisruptionStateId: (val: string) => void;
  isOnoe: boolean;
  setView: (view: ViewType) => void;
}

const ScenarioBuilder: React.FC<ScenarioBuilderProps> = ({ 
  scenario, setScenario, 
  disruptionYear, setDisruptionYear, 
  disruptionStateId, setDisruptionStateId,
  isOnoe, setView
}) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>("");

  const scenarioOptions = [
    { 
      id: 'NORMAL' as ScenarioType, 
      label: 'Normal Cycle', 
      icon: Activity, 
      color: 'blue', 
      desc: 'Standard 5-year constitutional term for all assemblies.' 
    },
    { 
      id: 'EARLY_DISSOLUTION' as ScenarioType, 
      label: 'Early Dissolution', 
      icon: ShieldAlert, 
      color: 'rose', 
      desc: 'Sudden collapse of the ruling government leading to mid-term polls.' 
    },
    { 
      id: 'HUNG_ASSEMBLY' as ScenarioType, 
      label: 'Hung Assembly', 
      icon: Gavel, 
      color: 'amber', 
      desc: 'No party achieves majority, leading to stalemate or immediate re-election.' 
    },
    { 
      id: 'PRESIDENTS_RULE' as ScenarioType, 
      label: "President's Rule", 
      icon: Clock, 
      color: 'indigo', 
      desc: 'Administrative takeover by the Center under Article 356.' 
    },
  ];

  const metrics = useMemo(() => {
    // Basic logic for live delta calculation
    let costDelta = 0;
    let mccDelta = 0;
    let adminDelta = 0;

    if (scenario !== 'NORMAL') {
      costDelta = 1200; // Extra cost of emergency poll
      mccDelta = 45;    // Extra paralysis days
      adminDelta = 0.8; // Million man-days extra
    }

    if (isOnoe && scenario !== 'NORMAL') {
      // ONOE mitigates some but adds complexity to realign
      costDelta = 1800; // Re-syncing cost is higher
      mccDelta = 20;    // But paralysis window is narrower
    }

    return { costDelta, mccDelta, adminDelta };
  }, [scenario, isOnoe]);

  const runSimulationAI = async () => {
    setLoading(true);
    const stateName = STATES_DATA.find(s => s.id === disruptionStateId)?.name || 'State';
    const prompt = `
      Analyze this One Nation One Election (ONOE) contingency scenario:
      - Scenario Type: ${scenario}
      - Target State: ${stateName}
      - Disruption Year: ${disruptionYear}
      - Current Mode: ${isOnoe ? 'Synchronized (ONOE)' : 'Status Quo (Fragmented)'}

      Evaluate the specific impact on the synchronized cycle, fiscal drain for an emergency re-sync, and administrative fatigue for the ECI.
      Provide a specific recommendation for maintaining the ONOE cycle in case of this ${scenario} event.
    `;
    const result = await analyzePolicyScenario(prompt);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. LEFT PANEL: CONTROLS (5 cols) */}
      <div className="lg:col-span-5 space-y-8">
        <div className="p-10 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-black mb-10 flex items-center gap-4 text-slate-900">
            <Settings2 size={24} className="text-blue-600" />
            Scenario Configuration
          </h3>
          
          <div className="space-y-10">
            {/* Scenario Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Contingency</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scenarioOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setScenario(opt.id)}
                    className={`p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${
                      scenario === opt.id 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                      : 'bg-slate-50 border-slate-100 hover:border-blue-400'
                    }`}
                  >
                    <opt.icon size={20} className={`mb-4 ${scenario === opt.id ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-500'}`} />
                    <h4 className="text-sm font-black mb-2">{opt.label}</h4>
                    <p className={`text-[10px] font-medium leading-relaxed ${scenario === opt.id ? 'text-slate-400' : 'text-slate-500'}`}>
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Parameters */}
            <div className="pt-10 border-t border-slate-100 space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disruption Year</label>
                    <span className="text-sm font-black text-blue-600">{disruptionYear}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2024" max="2034" 
                    value={disruptionYear} 
                    onChange={(e) => setDisruptionYear(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 shadow-inner"
                  />
               </div>

               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Affected Entity</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-black text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    value={disruptionStateId}
                    onChange={(e) => setDisruptionStateId(e.target.value)}
                  >
                    {STATES_DATA.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
                  </select>
               </div>
            </div>

            <button 
              onClick={runSimulationAI}
              disabled={loading || scenario === 'NORMAL'}
              className={`w-full py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${
                loading ? 'bg-slate-100 text-slate-400' : 
                scenario === 'NORMAL' ? 'bg-slate-50 text-slate-300 cursor-not-allowed' :
                'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {loading ? <RefreshCw size={18} className="animate-spin" /> : <Bot size={18} />}
              {loading ? 'Consulting Advisor...' : 'Analyze Policy Delta'}
            </button>
          </div>
        </div>

        {/* Mini Tip Box */}
        <div className="p-8 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Bot size={120}/></div>
           <div className="relative z-10">
              <h4 className="text-sm font-black mb-4 flex items-center gap-2 text-blue-400">
                <ShieldAlert size={16} /> Impact Real-Time Sync
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Adjustments here instantly reflect in the <span className="text-white">Tactical Tracker</span>. Go to the timeline view to see exactly how election bars shift to maintain synchronization.
              </p>
              <button 
                onClick={() => setView(ViewType.TIMELINE)}
                className="mt-6 flex items-center gap-2 text-[10px] font-black text-white hover:gap-4 transition-all"
              >
                Go to Timeline <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>

      {/* 2. RIGHT PANEL: IMPACT & AI (7 cols) */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Live Delta Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-8 rounded-[3rem] bg-white border border-slate-200 shadow-sm group">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Fiscal Delta</p>
              <div className="flex items-center gap-2">
                 <h4 className={`text-3xl font-black ${metrics.costDelta > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                   {metrics.costDelta > 0 ? `+₹${metrics.costDelta}` : '₹0'}
                 </h4>
                 <span className="text-xs font-black text-slate-400">Cr</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase">Emergency Poll Cost</p>
           </div>
           <div className="p-8 rounded-[3rem] bg-white border border-slate-200 shadow-sm group">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Governance Gap</p>
              <div className="flex items-center gap-2">
                 <h4 className={`text-3xl font-black ${metrics.mccDelta > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                   {metrics.mccDelta > 0 ? `+${metrics.mccDelta}` : '0'}
                 </h4>
                 <span className="text-xs font-black text-slate-400">Days</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase">Additional MCC Days</p>
           </div>
           <div className="p-8 rounded-[3rem] bg-white border border-slate-200 shadow-sm group">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Admin Load</p>
              <div className="flex items-center gap-2">
                 <h4 className={`text-3xl font-black ${metrics.adminDelta > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                   {metrics.adminDelta > 0 ? `+${metrics.adminDelta}M` : '0'}
                 </h4>
              </div>
              <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase">Manpower Strain</p>
           </div>
        </div>

        {/* AI Analysis / Report Container */}
        <div className="h-full min-h-[500px] p-10 rounded-[4rem] bg-white border border-slate-200 shadow-xl flex flex-col relative overflow-hidden group">
          {!analysis && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 opacity-40">
              <div className="p-10 rounded-full bg-slate-50 border border-slate-100 transition-transform group-hover:scale-110">
                <Calendar size={48} className="text-slate-300" />
              </div>
              <div className="max-w-md">
                <h4 className="text-xl font-black text-slate-900">Simulation Awaiting Input</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Select a disruption scenario and click <span className="text-blue-600 font-bold">'Analyze Policy Delta'</span> to generate a deep-dive AI briefing on administrative realignments.
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin shadow-inner"></div>
                <Bot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" size={32} />
              </div>
              <div className="text-center">
                <p className="text-blue-600 font-black text-lg animate-pulse">Running Policy Simulation...</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Computing Fiscal & Legal Repercussions</p>
              </div>
            </div>
          )}

          {analysis && !loading && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                  <CheckCircle2 className="text-emerald-500" size={28} />
                  Contingency Impact Audit
                </h3>
                <button 
                  onClick={() => setAnalysis("")}
                  className="px-6 py-2 bg-slate-100 text-[10px] font-black text-slate-500 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-all uppercase tracking-widest"
                >
                  Clear Report
                </button>
              </div>
              
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 leading-loose text-lg font-medium bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
                  {analysis}
                </div>
              </div>

              <div className="mt-12 p-8 rounded-[3rem] bg-emerald-50 border border-emerald-100 flex items-start gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform"><Bot size={100}/></div>
                <div className="p-4 rounded-2xl bg-white text-emerald-600 shadow-sm relative z-10">
                  <ShieldAlert size={24} />
                </div>
                <div className="relative z-10">
                  <h5 className="font-black text-emerald-800 text-lg mb-1">Executive Summary</h5>
                  <p className="text-sm text-emerald-700/80 italic font-bold leading-relaxed">
                    "Synchronization reduces the 'mini-general election' frequency, which makes even emergency re-elections more manageable by sharing the heavy administrative infrastructure already in place."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioBuilder;
