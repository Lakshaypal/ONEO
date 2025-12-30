
import React, { useMemo, useRef, useState } from 'react';
import { 
  Zap, 
  CalendarRange, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  Info,
  Layers,
  Activity
} from 'lucide-react';
import { STATES_DATA } from '../constants';
import { ScenarioType } from '../App';

const START_YEAR = 2000;
const END_YEAR = 2035;
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);
const LS_CYCLES = [2004, 2009, 2014, 2019, 2024, 2029, 2034];
const COL_WIDTH = 140; 

interface Term { 
  start: number; 
  end: number; 
  type: 'REGULAR' | 'LS' | 'ADJUSTED' | 'SYNCED' | 'VACANCY' | 'MCC'; 
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
  isOnoe, setIsOnoe, 
  selectedStateId, setSelectedStateId,
  scenario, disruptionYear, disruptionStateId
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const filteredStates = useMemo(() => {
    return selectedStateId === 'ALL' ? STATES_DATA : STATES_DATA.filter(s => s.id === selectedStateId);
  }, [selectedStateId]);

  const getStateTerms = (state: any, onoeMode: boolean): Term[] => {
    const terms: Term[] = [];
    let currentYear = state.lastElection - (Math.floor((state.lastElection - START_YEAR) / 5) * 5);
    if (currentYear < START_YEAR) currentYear += 5;

    // Build historical up to 2024
    while (currentYear < 2024) {
      terms.push({ start: currentYear, end: currentYear + 5, type: 'REGULAR', label: `${state.name} Historical Term` });
      terms.push({ start: currentYear - 0.2, end: currentYear, type: 'MCC', label: 'Historical MCC window' });
      currentYear += 5;
    }
    
    if (!onoeMode) {
      while (currentYear < END_YEAR) {
        let duration = 5;
        // Apply Scenario logic to the specific state
        if (state.id === disruptionStateId && currentYear <= disruptionYear && currentYear + 5 > disruptionYear) {
           if (scenario === 'EARLY_DISSOLUTION') duration = Math.max(0.5, disruptionYear - currentYear);
           if (scenario === 'HUNG_ASSEMBLY') duration = 0.5;
           if (scenario === 'PRESIDENTS_RULE') duration = 2.0;
        }

        terms.push({ start: currentYear, end: Math.min(currentYear + duration, END_YEAR), type: duration < 1 ? 'VACANCY' : 'REGULAR', label: `${state.name} Election Cycle` });
        terms.push({ start: currentYear - 0.2, end: currentYear, type: 'MCC', label: 'Policy Paralysis Window' });
        currentYear += duration;
      }
    } else {
      const targetSync = state.alignmentYear;
      if (currentYear < targetSync) {
        terms.push({ start: currentYear, end: targetSync, type: 'ADJUSTED', label: 'Alignment Transition' });
        terms.push({ start: currentYear - 0.2, end: currentYear, type: 'MCC', label: 'Pre-Sync MCC' });
      }
      let syncYear = targetSync;
      while (syncYear < END_YEAR) {
        // Even in ONOE, we might simulate a disruption that needs re-syncing
        let duration = 5;
        if (state.id === disruptionStateId && syncYear <= disruptionYear && syncYear + 5 > disruptionYear && scenario !== 'NORMAL') {
           duration = 0.5; // Triggered re-poll
        }

        terms.push({ start: syncYear, end: Math.min(syncYear + duration, END_YEAR), type: duration < 5 ? 'VACANCY' : 'SYNCED', label: duration < 5 ? 'Re-Syncing Poll' : 'Synchronized Cycle' });
        terms.push({ start: syncYear - 0.2, end: syncYear, type: 'MCC', label: 'Consolidated National MCC' });
        syncYear += duration;
      }
    }
    return terms;
  };

  const lsTerms = LS_CYCLES.map((year, idx): Term => ({ 
    start: year, 
    end: LS_CYCLES[idx + 1] || year + 5, 
    type: 'LS', 
    label: 'Lok Sabha Term' 
  })).filter(t => t.start < END_YEAR);

  const scrollTimeline = (dir: 'L' | 'R') => {
    if (timelineRef.current) {
      const scrollAmt = 800;
      timelineRef.current.scrollBy({ left: dir === 'L' ? -scrollAmt : scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-700 bg-slate-50/50 p-4 rounded-[3rem]">
      
      {/* 1. LEGEND (FIXED TOP) */}
      <div className="flex flex-wrap items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm sticky top-0 z-[60]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg"><CalendarRange size={24} /></div>
          <div>
            <h2 className="text-xl font-black text-slate-900 leading-none">Tactical Tracker</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Multi-Track Election Lifecycle (2000–2035)</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-700 border border-blue-800" /><span className="text-[10px] font-black text-slate-600 uppercase">Lok Sabha</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-emerald-600 border border-emerald-700" /><span className="text-[10px] font-black text-slate-600 uppercase">State Assembly</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-rose-600 border border-rose-700 shadow-sm animate-pulse" /><span className="text-[10px] font-black text-rose-600 uppercase">MCC (Paralysis)</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-amber-500 border border-amber-600" /><span className="text-[10px] font-black text-slate-600 uppercase">Adjustment</span></div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
             <button onClick={() => setIsOnoe(false)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${!isOnoe ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>Fragmented</button>
             <button onClick={() => setIsOnoe(true)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${isOnoe ? 'bg-blue-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>Synchronized</button>
           </div>
        </div>
      </div>

      {/* 2. TIMELINE CANVAS CONTAINER */}
      <div className="bg-slate-100/80 rounded-[4rem] border border-slate-200 shadow-inner flex flex-col overflow-hidden relative min-h-[700px] border-4 border-white">
        
        {/* Year Row (Sticky) */}
        <div className="flex border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
          <div className="w-64 p-8 border-r border-slate-200 bg-white flex-shrink-0 flex items-center justify-center gap-3">
             <button onClick={() => scrollTimeline('L')} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-blue-700 transition-all shadow-sm"><ChevronLeft size={20}/></button>
             <button onClick={() => scrollTimeline('R')} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-blue-700 transition-all shadow-sm"><ChevronRight size={20}/></button>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex relative" style={{ width: YEARS.length * COL_WIDTH }}>
              {YEARS.map(year => (
                <div key={year} className={`flex-shrink-0 w-[${COL_WIDTH}px] py-8 text-center border-r border-slate-200/50 relative ${LS_CYCLES.includes(year) ? 'bg-blue-50/30' : ''}`} style={{width: COL_WIDTH}}>
                  <span className={`text-sm font-black tracking-tight ${LS_CYCLES.includes(year) ? 'text-blue-700' : 'text-slate-400'}`}>{year}</span>
                  {year === 2024 && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-700 shadow-[0_-4px_10px_rgba(29,78,216,0.3)]" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tracks Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto sidebar-scroll" ref={timelineRef}>
          <div className="relative pb-40" style={{ width: YEARS.length * COL_WIDTH }}>
            
            {/* Lok Sabha Track */}
            <div className="flex border-b border-slate-200 bg-white/40 sticky top-0 z-40 backdrop-blur-sm">
              <div className="w-64 p-8 border-r border-slate-200 bg-white sticky left-0 z-30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-lg shadow-lg">LS</div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black text-slate-900 uppercase">Parliament</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Election Cycle</span>
                </div>
              </div>
              <div className="flex-1 relative h-32">
                {lsTerms.map((term, i) => (
                  <div 
                    key={i} 
                    className="absolute top-8 h-14 bg-blue-700 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center text-white border-4 border-white overflow-hidden group/term cursor-help transition-all hover:scale-[1.03] hover:z-20" 
                    style={{ left: (term.start - START_YEAR) * COL_WIDTH, width: (term.end - term.start) * COL_WIDTH }}
                  >
                    <ShieldCheck size={20} className="opacity-40" />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-72 bg-slate-900 text-white p-6 rounded-[2.5rem] opacity-0 invisible group-hover/term:opacity-100 group-hover/term:visible transition-all z-[70] shadow-2xl border border-white/10 pointer-events-none scale-90 group-hover/term:scale-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Lok Sabha Term</span>
                        <span className="text-[10px] font-black">{term.start}-{term.end}</span>
                      </div>
                      <p className="text-[11px] font-medium leading-relaxed opacity-80">{term.label}</p>
                    </div>
                  </div>
                ))}
                {/* Fixed Red MCC Indicators for LS */}
                {lsTerms.map((term, i) => (
                  <div key={`mcc-ls-${i}`} className="absolute top-0 bottom-0 bg-rose-600/10 border-x-4 border-rose-600 group/mcc" style={{ left: (term.start - START_YEAR - 0.2) * COL_WIDTH, width: 0.2 * COL_WIDTH }}>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/mcc:opacity-100 transition-opacity bg-rose-600 text-white px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest whitespace-nowrap z-50">National MCC Window</div>
                  </div>
                ))}
              </div>
            </div>

            {/* State Assembly Tracks */}
            <div className="divide-y divide-slate-200">
              {filteredStates.map((state) => (
                <div key={state.id} className="flex hover:bg-white/60 transition-colors group/row">
                  <div className="w-64 p-8 border-r border-slate-200 bg-white sticky left-0 z-30 flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-slate-200 group-hover/row:bg-blue-600 transition-all" />
                    <span className="text-sm font-black text-slate-800">{state.name}</span>
                  </div>
                  <div className="flex-1 relative h-24">
                    {getStateTerms(state, isOnoe).map((term, i) => (
                      <div 
                        key={i} 
                        className={`absolute top-4 h-14 rounded-2xl border-4 border-white shadow-md cursor-help group/term transition-all duration-700 
                        ${term.type === 'SYNCED' ? 'bg-emerald-600 text-white' : 
                          term.type === 'ADJUSTED' ? 'bg-amber-500 text-white border-dashed' : 
                          term.type === 'MCC' ? 'bg-rose-600 border-none animate-pulse' :
                          term.type === 'VACANCY' ? 'bg-slate-800 text-slate-500 border-none' :
                          'bg-emerald-500 text-white opacity-40'}`} 
                        style={{ 
                          left: (term.start - START_YEAR) * COL_WIDTH, 
                          width: Math.max(0.1, (term.end - term.start)) * COL_WIDTH,
                          height: term.type === 'MCC' ? '100%' : '56px',
                          top: term.type === 'MCC' ? '0' : '16px',
                          zIndex: term.type === 'MCC' ? 10 : 20
                        }}
                      >
                        {term.type === 'MCC' ? (
                           <div className="absolute inset-0 flex items-center justify-center">
                              <AlertCircle size={16} className="text-white opacity-40" />
                           </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/term:opacity-100 transition-opacity">
                             <span className="text-[10px] font-black uppercase tracking-tighter">Term Info</span>
                          </div>
                        )}
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-slate-900 text-white p-6 rounded-[2.5rem] opacity-0 invisible group-hover/term:opacity-100 group-hover/term:visible transition-all z-[70] shadow-2xl border border-white/10 pointer-events-none scale-90 group-hover/term:scale-100">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{term.type}</span>
                            <span className="text-[10px] font-black">{term.start.toFixed(1)}-{term.end.toFixed(1)}</span>
                          </div>
                          <p className="text-[11px] font-medium leading-relaxed opacity-80">{term.label}</p>
                          {term.type === 'MCC' && (
                             <div className="mt-3 pt-3 border-t border-white/10 text-[9px] font-bold text-rose-400 leading-tight">
                               Governance Alert: All developmental funding and new scheme announcements are legally frozen during this period.
                             </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SCENARIO IMPACT SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
        <div className="p-10 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm flex items-center gap-8 group">
           <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform"><Activity size={40}/></div>
           <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Administrative Fatigue Projection</p>
              <h4 className="text-3xl font-black text-slate-900">{isOnoe ? '64% Efficiency Gain' : 'Critical High Burden'}</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2">
                Synchronization reduces personnel deployment by consolidating logistics into a single cycle.
              </p>
           </div>
        </div>
        <div className="p-10 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform"><Layers size={180}/></div>
           <div className="relative z-10">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Simulation Scenario</p>
              <div className="flex items-center gap-3">
                 <Zap size={24} className="text-amber-500 animate-pulse" />
                 <h4 className="text-3xl font-black uppercase tracking-tighter">{scenario.replace('_', ' ')}</h4>
              </div>
              <p className="text-slate-400 text-sm font-medium mt-2">
                Impact tracked for <span className="text-white">{disruptionStateId}</span> in <span className="text-white">{disruptionYear}</span>.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
