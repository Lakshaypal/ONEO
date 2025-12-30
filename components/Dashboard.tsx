
import React, { useMemo } from 'react';
import { 
  ArrowRight, 
  IndianRupee, 
  Users, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Scale, 
  TrendingDown, 
  LayoutGrid, 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  HelpCircle, 
  Target, 
  Gavel, 
  BookOpen, 
  Database,
  Briefcase,
  History,
  ArrowDownCircle,
  ArrowRightCircle,
  FileText
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { HISTORICAL_STATS, STATES_DATA, COMPARISON_DATA, ADMIN_METRICS } from '../constants';
import { ViewType } from '../types';

interface DashboardProps {
  setView: (view: ViewType) => void;
  isOnoe: boolean;
  setIsOnoe: (val: boolean) => void;
  selectedStateId: string;
  setSelectedStateId: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, isOnoe, setIsOnoe, selectedStateId, setSelectedStateId }) => {
  // SIMULATED METRICS (Sourced from Kovind Committee Report 2024 & ECI Baseline Data)
  const stats = useMemo(() => {
    const current = {
      expenditure: 22000, // ₹ Cr per cycle (staggered)
      manDays: 15.6,     // Millions
      mccDays: 124,      // Total days per year avg
      disruption: 82,    // % Index
      readiness: 78
    };
    
    const onoe = {
      expenditure: 12450, // ₹ Cr per cycle (synchronized)
      manDays: 9.8,       // Millions (aligned with ADMIN_METRICS)
      mccDays: 38,        // Days per year avg
      disruption: 18,     // % Index
      readiness: 78
    };

    return isOnoe ? onoe : current;
  }, [isOnoe]);

  const readinessData = [
    { name: 'Legislative Consensus', value: stats.readiness, fill: '#3b82f6' },
    { name: 'Awaiting Ratification', value: 100 - stats.readiness, fill: '#f1f5f9' },
  ];

  const financialTrend = HISTORICAL_STATS.map(s => ({
    year: s.year,
    current: s.lsCost + s.assemblyCost,
    projected: isOnoe ? (s.lsCost + s.assemblyCost) * 0.62 : s.lsCost + s.assemblyCost
  }));

  // Hero KPI Definition for easier mapping
  const heroKpis = [
    { 
      label: 'Election Expenditure', 
      val: `₹${stats.expenditure.toLocaleString()} Cr`, 
      icon: IndianRupee, 
      color: isOnoe ? 'text-emerald-400' : 'text-slate-400',
      tip: 'Total exchequer cost for Lok Sabha and Assembly elections over a 5-year cycle.',
      sub: isOnoe ? `₹${(22000 - 12450).toLocaleString()} Cr Savings` : 'Staggered Cycle Baseline'
    },
    { 
      label: 'Admin Man-Days', 
      val: `${stats.manDays}M`, 
      icon: Users, 
      color: isOnoe ? 'text-blue-400' : 'text-slate-400',
      tip: 'Personnel effort (officials & teachers) deployed for electoral management and security.',
      sub: isOnoe ? '-37% Relief' : 'Current Status Baseline'
    },
    { 
      label: 'MCC Paralysis', 
      val: `${stats.mccDays} Days`, 
      icon: Clock, 
      color: isOnoe ? 'text-amber-400' : 'text-slate-400',
      tip: 'Average annual duration of policy paralysis due to Model Code of Conduct in various states.',
      sub: isOnoe ? '-86 Days Gain' : 'Current Status Baseline'
    },
    { 
      label: 'Disruption Index', 
      val: `${stats.disruption}%`, 
      icon: AlertCircle, 
      color: isOnoe ? 'text-rose-400' : 'text-slate-400',
      tip: 'A weighted index of governance interruption across education, security, and administrative services.',
      sub: isOnoe ? 'Highly Optimized' : 'High System Strain'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
      
      {/* 1. HERO KPI PANEL - COMMANDER'S VIEW */}
      <section className="bg-slate-900 p-8 md:p-12 rounded-[4rem] shadow-2xl relative overflow-hidden text-white border border-slate-800">
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none -mr-20 -mt-20">
          <Zap size={400} className="text-blue-500" />
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-5">
              <span className="px-4 py-2 bg-blue-600 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Target size={14} /> Executive Impact Summary
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-widest text-slate-300 border border-white/5">
                Kovind Report Framework v2.1
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">One Nation, One Election: <br/><span className="text-blue-400 text-2xl md:text-3xl lg:text-4xl block mt-2">Election Synchronization Feasibility & Impact Simulator</span></h2>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-[3rem] border border-white/10 backdrop-blur-lg shrink-0 shadow-2xl">
             <button 
               onClick={() => setIsOnoe(false)}
               className={`px-10 py-5 rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest transition-all duration-500 ${!isOnoe ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}
             >
               Current
             </button>
             <button 
               onClick={() => setIsOnoe(true)}
               className={`px-10 py-5 rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest transition-all duration-500 ${isOnoe ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'text-slate-400 hover:text-white'}`}
             >
               ONOE
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {heroKpis.map((kpi, i) => (
            <div key={i} className="group p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-2">
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl bg-white/10 ${kpi.color}`}>
                  <kpi.icon size={28} />
                </div>
                <div className="group/tip relative cursor-help">
                  <HelpCircle size={16} className="text-white/20 hover:text-white/50 transition-colors" />
                  <div className="absolute bottom-full mb-4 right-0 w-64 p-5 bg-slate-800 text-white text-[11px] font-medium leading-relaxed rounded-2xl opacity-0 invisible group-hover/tip:opacity-100 group-hover/tip:visible transition-all z-50 shadow-2xl border border-white/10 ring-1 ring-white/5">
                    <strong>Logic Source:</strong><br/>{kpi.tip}
                  </div>
                </div>
              </div>
              <h3 className="text-4xl font-black mb-1 tabular-nums animate-in slide-in-from-bottom-2 duration-500">
                {kpi.val}
              </h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{kpi.sub}</span>
                {isOnoe && <ArrowDownCircle size={16} className={kpi.color} />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CURRENT VS ONOE MATRIX & FINANCIAL TRENDS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Comparison Snapshot Matrix */}
        <div className="p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
               <Scale size={28} className="text-blue-600" /> Comparison Matrix
            </h4>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">Current</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-[9px] font-black uppercase text-blue-600 tracking-tighter">ONOE</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-10">
            {COMPARISON_DATA.map((item, idx) => (
              <div key={idx} className="group/item">
                <div className="flex justify-between text-[11px] font-black uppercase text-slate-500 tracking-wider mb-3">
                  <span className="flex items-center gap-2">{item.metric} <HelpCircle size={12} className="text-slate-300" /></span>
                  <span className="text-slate-400 font-bold">{item.unit}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    <div 
                      className="h-full transition-all duration-1000 bg-slate-300"
                      style={{ width: `${(item.current / (item.current + item.onoe)) * 100}%` }}
                    />
                    <div 
                      className={`h-full transition-all duration-1000 ${isOnoe ? 'bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-200'}`}
                      style={{ width: `${(item.onoe / (item.current + item.onoe)) * 100}%` }}
                    />
                  </div>
                  <div className="w-48 flex justify-between items-baseline text-sm font-black">
                    <span className="text-slate-300 line-through">₹{item.current}</span>
                    <span className={`text-lg ${isOnoe && item.onoe < item.current ? 'text-emerald-600' : 'text-blue-600'}`}>₹{isOnoe ? item.onoe : item.current}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic mt-3 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-slate-100 flex justify-between items-center">
             <div className="flex items-center gap-5">
               <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl shadow-sm"><TrendingDown size={24}/></div>
               <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Efficiency Ratio</p>
                 <p className="text-2xl font-black text-emerald-600">+35% Gain</p>
               </div>
             </div>
             <button onClick={() => setView(ViewType.FINANCIAL)} className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-3">
               Full Fiscal Audit <ArrowRight size={18} />
             </button>
          </div>
        </div>

        {/* 15-Year Spend Projection Area Chart */}
        <div className="p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-10">
              <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                 <TrendingUp size={28} className="text-emerald-600" /> 15-Year Fiscal Viability
              </h4>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Accumulated Savings</p>
                <p className="text-2xl font-black text-emerald-600">₹35,000 Cr+</p>
              </div>
            </div>
            
            <div className="h-[320px] mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialTrend}>
                  <defs>
                    <linearGradient id="colorCur" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 'bold'}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}} 
                  />
                  <Area type="monotone" dataKey="current" stroke="#cbd5e1" strokeWidth={4} fillOpacity={1} fill="url(#colorCur)" name="Baseline Spend" />
                  <Area type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorProj)" name="ONOE Spend" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2.5 bg-white text-blue-600 rounded-xl shadow-sm"><Zap size={18}/></div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency Multiplier</p>
              </div>
              <p className="text-2xl font-black text-slate-900 leading-tight">1.6x Greater</p>
              <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">Personnel Sync Gain</p>
            </div>
            <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 group hover:border-blue-300 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2.5 bg-white text-blue-600 rounded-xl shadow-sm"><History size={18}/></div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest tracking-tighter">Sync CAPEX</p>
              </div>
              <p className="text-2xl font-black text-blue-800 leading-tight">₹5,500 Cr</p>
              <p className="text-[10px] text-blue-400 font-bold mt-2 uppercase">EVM/VVPAT Synchronization</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NATIONAL ALIGNMENT GRID HUB */}
      <section className="p-12 rounded-[4.5rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          <div className="max-w-xl">
            <h4 className="text-3xl font-black text-slate-900 flex items-center gap-5">
              <LayoutGrid size={32} className="text-blue-600" /> Regional Synchronization Hub
            </h4>
            <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">State-wise cycle alignment under proposed mandate</p>
          </div>
          <div className="flex gap-4 bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 shadow-inner">
             <div className="flex items-center gap-3 px-6 py-2 border-r border-slate-200">
               <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Synchronized (2029)</span>
             </div>
             <div className="flex items-center gap-3 px-6 py-2">
               <div className="w-3 h-3 rounded-full bg-amber-500" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Pending Align</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {STATES_DATA.map((state) => {
            const isActive = selectedStateId === state.id;
            const isSynced = state.nextScheduled === 2029;
            return (
              <button 
                key={state.id} 
                onClick={() => setSelectedStateId(isActive ? 'ALL' : state.id)}
                className={`group/card p-8 rounded-[3rem] border transition-all text-left relative overflow-hidden ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-2xl scale-105 z-10' : 'bg-slate-50 border-slate-100 hover:border-blue-400 hover:-translate-y-2'}`}
              >
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>{state.id}</span>
                  <div className={`w-3 h-3 rounded-full ${isSynced ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-amber-500'}`} />
                </div>
                <h5 className="font-black text-base mb-2 truncate relative z-10">{state.name}</h5>
                <div className="flex items-center gap-3 mt-6 relative z-10">
                  <Calendar size={14} className={isActive ? 'text-blue-200' : 'text-slate-400'} />
                  <span className={`text-[11px] font-bold ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>Next Poll: {state.nextScheduled}</span>
                </div>
                {isActive && (
                  <div className="mt-6 pt-6 border-t border-blue-500/50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-1">
                     <div className="flex justify-between text-[9px] font-black uppercase text-blue-200">
                        <span>Governance Load</span>
                        <span>{state.governanceDisruptionScore}%</span>
                     </div>
                     <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-300" style={{ width: `${state.governanceDisruptionScore}%` }} />
                     </div>
                  </div>
                )}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] text-slate-900 group-hover/card:scale-125 transition-transform pointer-events-none">
                  <Database size={120} />
                </div>
              </button>
            );
          })}
          <div 
            onClick={() => setView(ViewType.TIMELINE)}
            className="p-8 rounded-[3rem] bg-slate-100/50 border border-slate-200 border-dashed flex flex-col items-center justify-center opacity-60 group/more cursor-pointer hover:opacity-100 transition-opacity"
          >
             <div className="w-14 h-14 rounded-[2rem] bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover/more:rotate-90 transition-transform shadow-sm">
               <ArrowRight size={24} className="text-slate-400" />
             </div>
             <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Explore Timeline</span>
          </div>
        </div>
      </section>

      {/* 4. LEGISLATIVE READINESS & ADMIN RELIEF GAUGE */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Constitutional Readiness Pie Gauge */}
        <div className="p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden group">
          <div className="flex flex-col items-center mb-8 relative z-10">
            <div className="p-5 bg-blue-50 text-blue-600 rounded-[2.5rem] mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6">
              <Gavel size={36} />
            </div>
            <h4 className="text-2xl font-black text-slate-900">Legislative Feasibility</h4>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Constitutional Amendment Score</p>
          </div>
          
          <div className="relative w-56 h-56 mb-8 transform transition-transform group-hover:scale-105">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={readinessData} 
                  innerRadius={75} 
                  outerRadius={105} 
                  paddingAngle={0} 
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900">{stats.readiness}%</span>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Ready</span>
            </div>
          </div>
          
          <div className="space-y-3 w-full relative z-10">
            {[
              { label: 'Art. 83 (LS Tenure)', status: 'Drafted' },
              { label: 'Art. 172 (State Tenure)', status: 'Approved' }
            ].map((art, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-blue-200 transition-colors">
                <span className="text-[11px] font-bold text-slate-700">{art.label}</span>
                <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-100/50 px-3 py-1 rounded-full">{art.status}</span>
              </div>
            ))}
          </div>
          
          <button onClick={() => setView(ViewType.CONSTITUTIONAL)} className="mt-10 flex items-center justify-center gap-3 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:gap-5 transition-all w-full py-5 border-t border-slate-50 group">
            Legal Roadmap <ArrowRight size={18} />
          </button>
        </div>

        {/* Administrative Relief Summary Chart */}
        <div className="lg:col-span-2 p-12 rounded-[4rem] bg-white border border-slate-200 shadow-sm flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h4 className="text-2xl font-black text-slate-900 flex items-center gap-5">
                 <ShieldCheck size={32} className="text-blue-600" /> Administrative Relief Tracker
              </h4>
              <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Efficiency gains across personnel and security mobilization</p>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 rounded-full border border-emerald-100 shadow-sm">
              <Zap size={18} className="text-emerald-600" />
              <span className="text-[11px] font-black text-emerald-700 uppercase tracking-tighter">Sync Gain: Optimized</span>
            </div>
          </div>
          
          <div className="h-[300px] mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_METRICS} barGap={18}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}} 
                />
                <Bar dataKey="currentValue" fill="#f1f5f9" radius={[14, 14, 0, 0]} name="Baseline Load" />
                <Bar dataKey="onoeValue" fill="#3b82f6" radius={[14, 14, 0, 0]} name="Synchronized Load" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Staff Mobilized', val: isOnoe ? '12.2M' : '18.5M', icon: Users, color: 'text-blue-600' },
              { label: 'Security Logistics', val: isOnoe ? '-45%' : 'Staggered', icon: ShieldCheck, color: 'text-emerald-600' },
              { label: 'School Days Saved', val: isOnoe ? '33 Days' : '0', icon: BookOpen, color: 'text-amber-600' }
            ].map((box, idx) => (
              <div key={idx} className="flex items-center gap-6 p-7 bg-slate-50 rounded-[3rem] border border-slate-100 group hover:border-blue-400 transition-all shadow-sm">
                <div className={`p-4 bg-white ${box.color} rounded-2xl shadow-sm group-hover:scale-110 transition-transform`}><box.icon size={26}/></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{box.label}</p>
                  <p className="text-2xl font-black text-slate-900 leading-none">{box.val}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-10 border-t border-slate-50 flex justify-end">
            <button 
              onClick={() => setView(ViewType.ADMIN)}
              className="flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 group"
            >
              Administrative Deep Dive <ArrowRightCircle size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. DATA TRANSPARENCY & METHODOLOGY SECTION */}
      <section className="bg-slate-50 p-12 md:p-16 rounded-[4.5rem] border border-slate-200 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
            <Database size={200} />
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 relative z-10">
            <div className="lg:col-span-1">
               <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-200">
                    <Database size={32} />
                  </div>
                  <h5 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">Sim Model <br/>Transparency</h5>
               </div>
               <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">
                 ESFIS utilizes certified expenditure data from <strong>ECI Audits</strong> and constitutional recommendations from the <strong>Kovind Committee Report (March 2024)</strong>. All projections are benchmarked against 2024 pricing indexes.
               </p>
               <button onClick={() => setView(ViewType.REFERENCES)} className="flex items-center gap-4 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:gap-6 transition-all group">
                  Audit Citations <ArrowRight size={16} className="group-hover:translate-x-1" />
               </button>
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[12px] font-black text-slate-400 uppercase tracking-widest">
                     <Target size={20} className="text-blue-500" /> Key Assumptions
                  </div>
                  <ul className="text-[13px] text-slate-600 font-bold space-y-4 pl-5 list-disc marker:text-blue-500">
                     <li>Initial CAPEX of ₹5,500 Cr for EVM/VVPAT synchronization.</li>
                     <li>Logistical efficiency gain calculated at ~35% over 5-year cycles.</li>
                     <li>Legislative alignment targeting the 19th Lok Sabha window (2029).</li>
                  </ul>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[12px] font-black text-slate-400 uppercase tracking-widest">
                     <Briefcase size={20} className="text-amber-500" /> Governance Context
                  </div>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed italic border-l-4 border-amber-200 pl-6 py-2">
                    "Synchronizing elections curtails the multi-state 'Mini-General Election' drain on policy focus, ensuring long-term administrative continuity for welfare execution."
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 shadow-sm">ECI Expenditure</span>
                    <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 shadow-sm">IndiaVotes Dataset</span>
                  </div>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[12px] font-black text-slate-400 uppercase tracking-widest">
                     <AlertCircle size={20} className="text-red-500" /> Risk Statement
                  </div>
                  <p className="text-[12px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">
                    Simulation models do not account for hung assembly dissolution or emergency national polls. Use the Scenario Builder for stress-testing mid-cycle collapses.
                  </p>
                  <button onClick={() => setView(ViewType.SCENARIO)} className="p-5 bg-white border border-slate-200 rounded-[2.5rem] w-full text-[11px] font-black text-slate-900 uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all text-center shadow-sm">
                    Launch Scenario Builder
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER NAVIGATION - GUIDED BRIEFING */}
      <section className="flex flex-col items-center justify-center gap-10 py-16 bg-white/40 rounded-[4rem] border border-slate-100">
         <div className="flex items-center gap-5">
            <span className="w-16 h-px bg-slate-200" />
            <p className="text-[13px] font-black text-slate-400 uppercase tracking-[0.3em]">Deep Audit Modules</p>
            <span className="w-16 h-px bg-slate-200" />
         </div>
         <div className="flex flex-wrap justify-center gap-8">
            {[
              { view: ViewType.TIMELINE, label: 'Sync Timeline', color: 'hover:border-blue-500 hover:text-blue-600' },
              { view: ViewType.FINANCIAL, label: 'Fiscal Audit', color: 'hover:border-emerald-500 hover:text-emerald-600' },
              { view: ViewType.ADMIN, label: 'Personnel Audit', color: 'hover:border-purple-500 hover:text-purple-600' },
              { view: ViewType.GOVERNANCE, label: 'Governance Impact', color: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-blue-100' }
            ].map((btn, i) => (
              <button 
                key={i} 
                onClick={() => setView(btn.view)}
                className={`px-12 py-6 border border-slate-200 rounded-[2.5rem] text-[12px] font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl ${btn.color} transform hover:-translate-y-1`}
              >
                {btn.label}
              </button>
            ))}
         </div>
      </section>

    </div>
  );
};

export default Dashboard;
