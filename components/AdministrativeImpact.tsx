
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  AlertCircle, 
  Zap, 
  TrendingDown, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Info,
  School,
  Lock,
  Search,
  Truck,
  BarChart3
} from 'lucide-react';

interface AdministrativeImpactProps {
  isOnoe: boolean;
  period: 5 | 10 | 15;
  setPeriod: (val: 5 | 10 | 15) => void;
}

/**
 * ADMINISTRATIVE LOAD CALCULATION ENGINE
 * Benchmarks based on ECI Reports & Kovind Committee Framework
 */
const ECI_NORMS = {
  LS_POLLING_STAFF: 12.0, // Millions of personnel
  ASSEMBLY_POLLING_STAFF_AVG: 0.45, // Millions per state
  LS_SECURITY_FORCES: 18.0, // Lakhs of personnel
  ASSEMBLY_SECURITY_FORCES_AVG: 0.8, // Lakhs per state
  MCC_DURATION_LS: 75, // Days
  MCC_DURATION_ASSEMBLY: 45, // Days
  SCHOOL_CLOSURE_PER_ELECTION: 12, // Days (including prep and polling)
  AVG_STATES_PER_YEAR: 5.6 // National average frequency of assembly polls
};

const AdministrativeImpact: React.FC<AdministrativeImpactProps> = ({ isOnoe, period, setPeriod }) => {
  
  // DYNAMIC CALCULATIONS BASED ON PERIOD
  const metrics = useMemo(() => {
    const lsEvents = Math.floor(period / 5); 
    const assemblyEvents = Math.round(ECI_NORMS.AVG_STATES_PER_YEAR * period);
    
    // CURRENT SYSTEM (FRAGMENTED)
    const current = {
      totalElections: lsEvents + assemblyEvents,
      mccDays: (lsEvents * ECI_NORMS.MCC_DURATION_LS) + (assemblyEvents * ECI_NORMS.MCC_DURATION_ASSEMBLY),
      staffManDays: (lsEvents * ECI_NORMS.LS_POLLING_STAFF) + (assemblyEvents * ECI_NORMS.ASSEMBLY_POLLING_STAFF_AVG),
      securityInstances: (lsEvents * ECI_NORMS.LS_SECURITY_FORCES) + (assemblyEvents * ECI_NORMS.ASSEMBLY_SECURITY_FORCES_AVG),
      schoolDays: (lsEvents + assemblyEvents) * ECI_NORMS.SCHOOL_CLOSURE_PER_ELECTION * 0.45,
      logisticsEffort: (lsEvents + assemblyEvents) * 12.5 
    };

    // ONOE SYSTEM (SYNCHRONIZED - Kovind Model Efficiency)
    const synchronizedCycles = Math.floor(period / 5);
    const onoe = {
      totalElections: synchronizedCycles,
      mccDays: synchronizedCycles * ECI_NORMS.MCC_DURATION_LS,
      staffManDays: synchronizedCycles * ECI_NORMS.LS_POLLING_STAFF * 1.12, 
      securityInstances: synchronizedCycles * ECI_NORMS.LS_SECURITY_FORCES * 1.05,
      schoolDays: synchronizedCycles * ECI_NORMS.SCHOOL_CLOSURE_PER_ELECTION,
      logisticsEffort: synchronizedCycles * 15.0 
    };

    return { current, onoe };
  }, [period]);

  const kpis = [
    { label: 'Poll Events Conducted', current: metrics.current.totalElections, onoe: metrics.onoe.totalElections, icon: Calendar, unit: '', color: 'blue' },
    { label: 'Cumulative MCC Days', current: metrics.current.mccDays, onoe: metrics.onoe.mccDays, icon: Clock, unit: 'Days', color: 'red' },
    { label: 'Admin Man-Days', current: metrics.current.staffManDays.toFixed(1), onoe: metrics.onoe.staffManDays.toFixed(1), icon: Users, unit: 'M', color: 'emerald' },
    { label: 'Educational Resilience', current: 0, onoe: Math.round(metrics.current.schoolDays - metrics.onoe.schoolDays), icon: School, unit: 'Days Saved', color: 'amber' }
  ];

  // COLOUR DESIGN MAPPING (Government Standard)
  const CATEGORY_COLORS = {
    staff: '#3b82f6',     // Blue: Polling & Election Staff Deployment
    security: '#10b981',  // Green: Security Forces Deployment
    mcc: '#f59e0b',       // Amber: Model Code of Conduct (MCC) Enforcement
    logistics: '#f97316', // Orange: Logistics & Material Movement
    closures: '#ef4444'   // Red: School / Office Closures
  };

  /**
   * DATA NORMALIZATION FOR GROUPED VISUALIZATION
   * Different units are weighted into a "Strain Index" for side-by-side comparison.
   */
  const groupedData = [
    {
      category: 'Staff Duty',
      current: Number(metrics.current.staffManDays.toFixed(1)),
      onoe: Number(metrics.onoe.staffManDays.toFixed(1)),
      color: CATEGORY_COLORS.staff,
      unit: 'Millions'
    },
    {
      category: 'Security',
      current: Number(metrics.current.securityInstances.toFixed(1)),
      onoe: Number(metrics.onoe.securityInstances.toFixed(1)),
      color: CATEGORY_COLORS.security,
      unit: 'Lakhs'
    },
    {
      category: 'MCC',
      current: Math.round(metrics.current.mccDays / 5), // Scaled for index
      onoe: Math.round(metrics.onoe.mccDays / 5),
      color: CATEGORY_COLORS.mcc,
      unit: 'Scaled Days',
      realValCur: metrics.current.mccDays,
      realValOnoe: metrics.onoe.mccDays
    },
    {
      category: 'Logistics',
      current: Math.round(metrics.current.logisticsEffort),
      onoe: Math.round(metrics.onoe.logisticsEffort),
      color: CATEGORY_COLORS.logistics,
      unit: 'Work Units'
    },
    {
      category: 'Closures',
      current: Math.round(metrics.current.schoolDays),
      onoe: Math.round(metrics.onoe.schoolDays),
      color: CATEGORY_COLORS.closures,
      unit: 'Days'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      
      {/* 1. EXPLANATORY HEADER */}
      <section className="bg-slate-900 p-8 md:p-12 rounded-[4rem] shadow-2xl text-white relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none -mr-10 -mt-10">
          <ShieldCheck size={200} className="text-blue-500" />
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Info size={14} /> Admin load Briefing
              </span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/10">
                Kovind Committee Ch. 4 (2024)
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">Administrative Capacity Audit</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mt-4">
              Analyzing the strain on human resources and security infrastructure. Synchronizing polls transforms <span className="text-white">staggered deployment fatigue</span> into a <span className="text-blue-400">unified administrative window</span>.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 bg-white/5 p-6 rounded-[3rem] border border-white/10 backdrop-blur-lg shrink-0 shadow-2xl min-w-[320px]">
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest text-center mb-1">Set Audit Timeline</span>
             <div className="flex bg-slate-800 p-2 rounded-[2rem] border border-slate-700">
               {[5, 10, 15].map(p => (
                 <button 
                  key={p} 
                  onClick={() => setPeriod(p as any)} 
                  className={`flex-1 py-4 rounded-2xl text-[12px] font-black uppercase transition-all ${period === p ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                   {p} Years
                 </button>
               ))}
             </div>
             <p className="text-[9px] font-black text-slate-500 uppercase text-center mt-2 tracking-widest">
               Total Events: {metrics.current.totalElections} (Actual)
             </p>
          </div>
        </div>
      </section>

      {/* 2. TOP METRIC COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const reduction = kpi.current ? (((Number(kpi.current) - Number(kpi.onoe)) / Number(kpi.current)) * 100).toFixed(0) : '0';
          return (
            <div key={idx} className="p-8 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm hover:border-blue-400 transition-all group flex flex-col justify-between overflow-hidden relative">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 bg-${kpi.color}-50 text-${kpi.color}-600 rounded-2xl group-hover:bg-${kpi.color}-600 group-hover:text-white transition-all shadow-sm`}>
                   <kpi.icon size={26}/>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{kpi.label}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                   <h3 className="text-4xl font-black text-slate-900 tabular-nums">{kpi.onoe}</h3>
                   <span className="text-[10px] font-black text-slate-400 uppercase">{kpi.unit}</span>
                </div>
                {Number(reduction) > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] font-bold text-slate-300 line-through">Baseline: {kpi.current}</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-{reduction}%</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none transition-transform group-hover:rotate-12">
                 <kpi.icon size={140} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. GROUPED BURDEN DISTRIBUTION MODULE */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT: GROUPED BURDEN DISTRIBUTION GRAPH (3 cols) */}
        <div className="lg:col-span-3 p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm flex flex-col border-b-4 border-b-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                <BarChart3 size={28} className="text-slate-800" /> Burden Distribution Graph
              </h4>
              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest max-w-sm">Direct side-by-side comparison of strain types. Bars grouped by category.</p>
            </div>
            <div className="flex gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-2 px-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                 <span className="text-[9px] font-black text-slate-400 uppercase">Status Quo</span>
               </div>
               <div className="flex items-center gap-2 px-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                 <span className="text-[9px] font-black text-blue-600 uppercase">ONOE</span>
               </div>
            </div>
          </div>

          <div className="flex-1 min-h-[480px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={groupedData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="2 2" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fontWeight: '900', fill: '#1e293b'}} 
                  dy={20}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
                  labelStyle={{ fontWeight: 'black', marginBottom: '8px', textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Bar dataKey="current" name="Status Quo" radius={[6, 6, 0, 0]} barSize={32}>
                  {groupedData.map((entry, index) => (
                    <Cell key={`cell-cur-${index}`} fill="#e2e8f0" />
                  ))}
                </Bar>
                <Bar dataKey="onoe" name="ONOE Target" radius={[6, 6, 0, 0]} barSize={32}>
                  {groupedData.map((entry, index) => (
                    <Cell key={`cell-onoe-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-4">
             {[
               { label: 'Staff Duty', color: CATEGORY_COLORS.staff, icon: Users },
               { label: 'Security', color: CATEGORY_COLORS.security, icon: Lock },
               { label: 'MCC', color: CATEGORY_COLORS.mcc, icon: Clock },
               { label: 'Logistics', color: CATEGORY_COLORS.logistics, icon: Truck },
               { label: 'Closures', color: CATEGORY_COLORS.closures, icon: School }
             ].map((leg, i) => (
               <div key={i} className="flex flex-col items-center gap-3 group">
                  <div className="p-3 rounded-2xl shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: `${leg.color}15`, color: leg.color }}>
                     <leg.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase text-center tracking-tighter leading-none">{leg.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* RIGHT: GOVERNANCE PAUSE GAUGE (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="p-10 rounded-[4rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group h-full flex flex-col justify-center border border-slate-800">
            <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform"><Clock size={400}/></div>
            
            <div className="relative z-10 flex flex-col">
              <h4 className="text-2xl font-black mb-10 flex items-center gap-4 text-blue-400">
                <Clock size={28} /> Governance Pause Gauge
              </h4>
              
              <div className="space-y-12 mb-12">
                 <div className="space-y-5">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status Quo Stagnation</p>
                       <span className="text-xl font-black text-white">{metrics.current.mccDays} Total Days</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <div className="h-full bg-red-600 w-full opacity-60 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                    </div>
                 </div>

                 <div className="space-y-5">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ONOE Sync Flow</p>
                       <span className="text-xl font-black text-blue-400">{metrics.onoe.mccDays} Total Days</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                       <div className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-1000" style={{ width: `${(metrics.onoe.mccDays / metrics.current.mccDays) * 100}%` }} />
                    </div>
                 </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-4 shadow-inner">
                 <div className="flex items-center gap-4">
                    <AlertCircle size={20} className="text-amber-400" />
                    <span className="text-xs font-black uppercase tracking-tight text-white">Efficiency Summary</span>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                   Synchronization returns <span className="text-emerald-400 font-bold">{metrics.current.mccDays - metrics.onoe.mccDays} days</span> of active policy execution. The side-by-side grouped bars clearly demonstrate the specific load reduction in each operational category.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER SOURCES & IMPACT */}
      <section className="p-12 rounded-[4.5rem] bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-12 relative overflow-hidden">
         <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={24}/></div>
              <h5 className="text-lg font-black text-slate-900 uppercase">Audit Baseline</h5>
            </div>
            <ul className="space-y-4">
               {[
                 { name: 'ECI Deployment Norms (2019/2024)', link: '#' },
                 { name: 'IndiaVotes Historical Load Records', link: '#' },
                 { name: 'Kovind Report Ch 4.2 Projections', link: '#' }
               ].map((s, i) => (
                 <li key={i} className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase group cursor-pointer hover:text-blue-600 transition-colors">
                    <span>{s.name}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                 </li>
               ))}
            </ul>
         </div>

         <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingDown size={24}/></div>
              <h5 className="text-lg font-black text-slate-900 uppercase">Impact Assessment</h5>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
              "Transitioning to a single cycle reduces <span className="text-red-600 font-bold">Public Disruption</span> by grouping school/office closures into a single predictable window every 5 years."
            </p>
         </div>

         <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <Search size={20} className="text-slate-400" />
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visual Audit Rule</h5>
            </div>
            <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">
              Grouped bar distribution enables officials to evaluate <span className="text-slate-900">relative performance</span> across distinct administrative pillars at a glance.
            </p>
         </div>
      </section>

    </div>
  );
};

export default AdministrativeImpact;
