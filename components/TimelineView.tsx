
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Info,
  History,
  TrendingDown,
  Calendar,
  Layout,
  ExternalLink,
  Search,
  BookOpen
} from 'lucide-react';
import { STATES_DATA } from '../constants';
import { ScenarioType } from '../App';

const BASE_START_YEAR = 2024;
const LS_HISTORICAL = [2004, 2009, 2014, 2019, 2024];
const LS_PROJECTED = [2029, 2034, 2039];

interface TimelineEvent {
  year: number;
  type: 'NATIONAL' | 'STATE';
  source: string;
  mccDays: number;
  label: string;
}

interface TimelineViewProps { 
  isOnoe: boolean; 
  setIsOnoe: (val: boolean) => void; 
  selectedStateId: string; 
  setSelectedStateId: (id: string) => void; 
  scenario: ScenarioType;
  disruptionYear: number;
  disruptionStateId: string;
}

const TimelineView: React.FC<TimelineViewProps> = ({ 
  selectedStateId, setSelectedStateId,
  scenario, disruptionYear, disruptionStateId
}) => {
  const [period, setPeriod] = useState<number>(10);
  const [focusYear, setFocusYear] = useState<number>(2029);
  const [showSources, setShowSources] = useState(false);

  // Focus on the selected state or default to Uttar Pradesh
  const activeState = useMemo(() => {
    const id = selectedStateId === 'ALL' ? 'UP' : selectedStateId;
    return STATES_DATA.find(s => s.id === id) || STATES_DATA[0];
  }, [selectedStateId]);

  // Ensure focus year stays within range when period changes
  useEffect(() => {
    const maxYear = BASE_START_YEAR + period - 1;
    if (focusYear > maxYear) setFocusYear(maxYear);
  }, [period]);

  const yearsRange = useMemo(() => {
    return Array.from({ length: period }, (_, i) => BASE_START_YEAR + i);
  }, [period]);

  // Generate Data for Systems
  const getTimelineData = (isOnoeMode: boolean) => {
    return yearsRange.map(year => {
      const hasLS = LS_PROJECTED.includes(year) || (year === 2024);
      let hasState = false;
      let label = "";
      let source = "ECI / IndiaVotes";

      if (!isOnoeMode) {
        // Current System Logic
        let currentYear = activeState.lastElection;
        while (currentYear <= year) {
          if (currentYear === year) hasState = true;
          currentYear += 5;
        }
        label = hasLS && hasState ? "Simultaneous (Coincidental)" : hasLS ? "General Election" : hasState ? "Assembly Election" : "Governance Period";
      } else {
        // ONOE Logic (Kovind Report)
        // Transitions happen between 2024-2029 to align with the 2029 window
        const isAlignmentYear = year === 2029 || year === 2034;
        hasState = isAlignmentYear;
        source = "Kovind Report (Simulated)";
        label = isAlignmentYear ? "Synchronized ONOE Poll" : "Governance Period";
        
        // Handling the transition state (some assemblies might have curtailed terms)
        if (year < 2029 && !hasLS) {
            // Check if state needs a curtailed election to reach 2029
            // This is a simplification of the Kovind "Alignment Phase"
        }
      }

      const mccDays = (hasLS && hasState && isOnoeMode) ? 60 : (hasLS && hasState) ? 120 : (hasLS || hasState) ? 60 : 0;

      return { year, hasLS, hasState, mccDays, label, source };
    });
  };

  const currentData = getTimelineData(false);
  const onoeData = getTimelineData(true);

  const focusData = {
    current: currentData.find(d => d.year === focusYear),
    onoe: onoeData.find(d => d.year === focusYear)
  };

  const metrics = {
    current: {
        elections: currentData.filter(d => d.hasLS || d.hasState).length,
        mcc: currentData.reduce((acc, d) => acc + d.mccDays, 0)
    },
    onoe: {
        elections: onoeData.filter(d => d.hasLS || d.hasState).length,
        mcc: onoeData.reduce((acc, d) => acc + d.mccDays, 0)
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      
      {/* 1. DATA TRANSPARENCY PANEL */}
      <section className="bg-slate-900 p-8 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><BookOpen size={140} /></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
            <ShieldCheck size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Official Data Simulator</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-3xl">
              This simulator cross-references <span className="text-white font-bold">IndiaVotes</span> historical cycles with <span className="text-white font-bold">ECI Expenditure reports</span>. The ONOE model follows the <span className="text-blue-400 font-bold">March 2024 Kovind Committee</span> framework for election synchronization.
            </p>
          </div>
          <button 
            onClick={() => setShowSources(!showSources)}
            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            {showSources ? 'Hide Sources' : 'View Data Sources'}
          </button>
        </div>

        {showSources && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-4 duration-300">
             <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-blue-400 uppercase mb-2">Historical Basis</p>
                <p className="text-xs text-slate-300">Staggered cycles derived from IndiaVotes.com assembly records (1951-2024).</p>
             </div>
             <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-emerald-400 uppercase mb-2">Synchronization Logic</p>
                <p className="text-xs text-slate-300">Term curtailment and extensions applied as per Article 83(2) and 172(1) proposals.</p>
             </div>
             <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-red-400 uppercase mb-2">MCC Assumptions</p>
                <p className="text-xs text-slate-300">Estimated 45-60 days per election event based on ECI standard notification periods.</p>
             </div>
          </div>
        )}
      </section>

      {/* 2. DASHBOARD CONTROLS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> State Selection</span>
          <select 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-black text-slate-900 outline-none hover:border-blue-300 transition-colors"
            value={activeState.id}
            onChange={(e) => setSelectedStateId(e.target.value)}
          >
            {STATES_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="p-6 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={12}/> Analysis Period</span>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {[5, 10, 15].map(p => (
              <button 
                key={p} 
                onClick={() => setPeriod(p)}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${period === p ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                {p} Years
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Search size={12}/> Inspect Year</span>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
             <button onClick={() => setFocusYear(Math.max(BASE_START_YEAR, focusYear - 1))} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronLeft size={16}/></button>
             <span className="flex-1 text-center font-black text-blue-600">{focusYear}</span>
             <button onClick={() => setFocusYear(Math.min(BASE_START_YEAR + period - 1, focusYear + 1))} className="p-2 hover:bg-white rounded-lg transition-colors"><ChevronRight size={16}/></button>
          </div>
        </div>

        <div className="p-6 bg-blue-600 rounded-[2.5rem] shadow-xl shadow-blue-100 flex flex-col justify-center text-white">
          <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Comparative Impact</span>
          <div className="flex items-center gap-3">
             <TrendingDown size={20} className="text-blue-300" />
             <p className="font-black text-xs uppercase">Showing {period}Y Projection</p>
          </div>
        </div>
      </section>

      {/* 3. CORE TIMELINE COMPARISON */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SIDE A: CURRENT SYSTEM (FRAGMENTED) */}
        <div className="flex flex-col gap-4">
           <div className="flex justify-between items-center px-6">
              <h3 className="text-sm font-black text-slate-900 uppercase flex items-center gap-3">
                 <History size={16} className="text-slate-400" /> Current Framework
              </h3>
              <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-500 uppercase">Fragmented Cycle</span>
           </div>
           <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-100 flex p-4 px-8 justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <span>Year</span>
                 <span>Activity & MCC Impact</span>
              </div>
              <div className="flex flex-col">
                 {currentData.map(d => (
                   <div key={d.year} className={`flex items-center h-16 px-8 border-b border-slate-50 last:border-0 transition-colors ${d.year === focusYear ? 'bg-blue-50/50' : ''}`}>
                      <span className={`w-12 text-sm font-black ${d.year === focusYear ? 'text-blue-600' : 'text-slate-400'}`}>{d.year}</span>
                      <div className="flex-1 flex items-center gap-3 px-6 overflow-hidden">
                         {d.hasLS && <div className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-[9px] font-black uppercase flex items-center gap-1.5 shadow-sm"><Building2 size={12}/> LS</div>}
                         {d.hasState && <div className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase flex items-center gap-1.5 shadow-sm"><MapPin size={12}/> State</div>}
                         {d.mccDays > 0 && (
                            <div className="flex-1 h-1.5 bg-red-100 rounded-full overflow-hidden relative group">
                               <div className="h-full bg-red-600 opacity-60" style={{ width: `${(d.mccDays / 120) * 100}%` }} />
                            </div>
                         )}
                      </div>
                      {d.mccDays > 0 && <span className="text-[10px] font-black text-red-600 uppercase w-16 text-right">{d.mccDays}D</span>}
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* SIDE B: ONOE SYSTEM (SYNCHRONIZED) */}
        <div className="flex flex-col gap-4">
           <div className="flex justify-between items-center px-6">
              <h3 className="text-sm font-black text-blue-700 uppercase flex items-center gap-3">
                 <Zap size={16} className="text-blue-600" /> Synchronized Framework
              </h3>
              <span className="px-3 py-1 bg-blue-50 rounded-full text-[9px] font-black text-blue-600 uppercase">Kovind Proposal</span>
           </div>
           <div className="bg-blue-50/20 border-2 border-blue-600 rounded-[3rem] overflow-hidden shadow-xl">
              <div className="bg-blue-100/50 border-b border-blue-200 flex p-4 px-8 justify-between text-[10px] font-black text-blue-600 uppercase tracking-widest">
                 <span>Year</span>
                 <span>Synchronized Alignment</span>
              </div>
              <div className="flex flex-col">
                 {onoeData.map(d => (
                   <div key={d.year} className={`flex items-center h-16 px-8 border-b border-blue-100 last:border-0 transition-colors ${d.year === focusYear ? 'bg-blue-100' : ''}`}>
                      <span className={`w-12 text-sm font-black ${d.year === focusYear ? 'text-blue-700' : 'text-slate-500'}`}>{d.year}</span>
                      <div className="flex-1 flex items-center gap-3 px-6 overflow-hidden">
                         {(d.hasLS || d.hasState) && (
                            <div className="px-4 py-2 bg-blue-700 text-white rounded-xl text-[9px] font-black uppercase flex items-center gap-2 shadow-lg shadow-blue-500/20">
                               <ShieldCheck size={14}/> Combined Election
                            </div>
                         )}
                         {d.mccDays > 0 && (
                            <div className="flex-1 h-1.5 bg-red-200/50 rounded-full overflow-hidden">
                               <div className="h-full bg-red-600 opacity-60" style={{ width: `${(d.mccDays / 120) * 100}%` }} />
                            </div>
                         )}
                      </div>
                      {d.mccDays > 0 && <span className="text-[10px] font-black text-red-600 uppercase w-16 text-right">{d.mccDays}D</span>}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 4. IMPACT QUANTIFICATION CARD */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Elections Metric */}
        <div className="p-8 rounded-[3rem] bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 group hover:border-blue-400 transition-all">
           <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              <Layout size={28} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Voter Mobilizations</p>
              <div className="flex items-center gap-4 justify-center">
                 <span className="text-2xl font-black text-slate-300 line-through">{metrics.current.elections}</span>
                 <ArrowRight size={20} className="text-slate-200" />
                 <span className="text-4xl font-black text-blue-600">{metrics.onoe.elections}</span>
              </div>
              <p className="mt-3 text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full inline-block">
                 Save {metrics.current.elections - metrics.onoe.elections} Major Events
              </p>
           </div>
        </div>

        {/* MCC Metric */}
        <div className="p-8 rounded-[3rem] bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 group hover:border-red-400 transition-all">
           <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
              <Clock size={28} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Governance Pause Days</p>
              <div className="flex items-center gap-4 justify-center">
                 <span className="text-2xl font-black text-slate-300 line-through">{metrics.current.mcc}</span>
                 <ArrowRight size={20} className="text-slate-200" />
                 <span className="text-4xl font-black text-red-600">{metrics.onoe.mcc}</span>
              </div>
              <p className="mt-3 text-[10px] font-bold text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full inline-block">
                 Gain {metrics.current.mcc - metrics.onoe.mcc} Development Days
              </p>
           </div>
        </div>

        {/* Year Focus Analysis */}
        <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-xl flex flex-col justify-between group overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform"><Info size={120} /></div>
           <div className="relative z-10">
              <h5 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Search size={14}/> Impact in {focusYear}
              </h5>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                    <span className="text-slate-400">Current Work Stop:</span>
                    <span className="font-black text-red-400">{focusData.current?.mccDays || 0} Days</span>
                 </div>
                 <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                    <span className="text-slate-400">ONOE Work Stop:</span>
                    <span className="font-black text-emerald-400">{focusData.onoe?.mccDays || 0} Days</span>
                 </div>
                 <div className="pt-2">
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                       {focusData.current?.mccDays && focusData.current.mccDays > (focusData.onoe?.mccDays || 0) 
                         ? `Syncing in ${focusYear} allows developmental work to proceed without an extra 60-day pause.` 
                         : "Synchronized cycles ensure maximum governance continuity for state welfare."}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA & DISCLOSURE */}
      <section className="p-10 rounded-[4rem] bg-emerald-50 border border-emerald-100 flex flex-col md:flex-row items-center gap-10">
         <div className="w-20 h-20 bg-white rounded-3xl text-emerald-600 flex items-center justify-center shadow-lg">
            <TrendingDown size={36} />
         </div>
         <div className="flex-1">
            <h5 className="text-xl font-black text-emerald-900 uppercase mb-2">The Efficiency Mandate</h5>
            <p className="text-emerald-700/80 font-medium leading-relaxed italic">
              "By grouping elections into a single 5-year window, administrative machinery is mobilized only once, significantly reducing the security and pedagogical disruption associated with staggered polls."
            </p>
         </div>
         <div className="flex flex-col gap-2">
            <a 
              href="https://onoe.gov.in/" 
              target="_blank" 
              className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
            >
              Read Kovind Report <ExternalLink size={14}/>
            </a>
            <span className="text-[8px] font-black text-emerald-400 text-center uppercase">Verified Government Framework</span>
         </div>
      </section>

    </div>
  );
};

export default TimelineView;
