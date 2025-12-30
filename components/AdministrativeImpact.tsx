
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ShieldCheck, Users, Calendar, AlertCircle, Map, Zap, TrendingDown, BookOpen } from 'lucide-react';
import { ADMIN_METRICS, STATES_DATA } from '../constants';

interface AdministrativeImpactProps {
  isOnoe: boolean;
}

const AdministrativeImpact: React.FC<AdministrativeImpactProps> = ({ isOnoe }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* 1. RELIEF KPI HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ADMIN_METRICS.map((metric, idx) => {
          const displayValue = isOnoe ? metric.onoeValue : metric.currentValue;
          const reduction = (((metric.currentValue - metric.onoeValue) / metric.currentValue) * 100).toFixed(0);
          return (
            <div key={idx} className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm hover:border-blue-400 transition-all group relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                   {idx === 0 ? <ShieldCheck size={18}/> : idx === 1 ? <Zap size={18}/> : idx === 2 ? <Users size={18}/> : <BookOpen size={18}/>}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors line-clamp-1">{metric.category}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-slate-900">{displayValue}</h3>
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{metric.unit}</span>
              </div>
              {isOnoe && (
                <div className="mt-6 flex items-center gap-2">
                  <div className="p-1 bg-emerald-100 text-emerald-600 rounded-lg"><TrendingDown size={14} /></div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">-{reduction}% Reduction</span>
                </div>
              )}
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                 <ShieldCheck size={100} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LOGISTICS BURDEN CHART */}
        <div className="lg:col-span-2 p-12 rounded-[3.5rem] bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                <Users size={28} className="text-blue-600" /> Administrative Relief Tracker
              </h4>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Comparative Manpower & Security Scaling</p>
            </div>
            <div className="flex gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-2 px-3 py-1">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                 <span className="text-[9px] font-black text-slate-500 uppercase">Fragmented</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                 <span className="text-[9px] font-black text-blue-600 uppercase">Synchronized</span>
               </div>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_METRICS} barGap={16}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold', fill: '#94a3b8'}} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                />
                <Bar dataKey="currentValue" fill="#f1f5f9" radius={[12, 12, 0, 0]} name="Staggered Cycle" />
                <Bar dataKey="onoeValue" fill="#3b82f6" radius={[12, 12, 0, 0]} name="ONOE Framework" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* REGIONAL BURDEN HEATMAP */}
        <div className="p-12 rounded-[3.5rem] bg-slate-900 text-white shadow-2xl flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform"><Map size={300}/></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-black mb-10 flex items-center gap-4 text-blue-400">
              <Map size={28} /> Disruption Delta
            </h4>
            <div className="space-y-8">
              {STATES_DATA.slice(0, 6).map(state => {
                const impact = isOnoe ? Math.round(state.governanceDisruptionScore * 0.35) : state.governanceDisruptionScore;
                return (
                  <div key={state.id} className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
                      <span className="text-slate-400">{state.name}</span>
                      <span className={`${impact > 60 ? 'text-red-400' : 'text-emerald-400'} px-2 py-0.5 bg-white/5 rounded-full`}>{impact}% Load</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${impact > 60 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'}`}
                        style={{ width: `${impact}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-5 relative z-10">
             <AlertCircle size={24} className="text-blue-400 flex-shrink-0 mt-1" />
             <p className="text-[11px] text-slate-300 font-bold leading-relaxed uppercase tracking-tight">
               Administrative load is highest during the <span className="text-white">staggered 'Mini-General Election'</span> years. ONOE centralizes these disruption windows into a singular event every 5 years.
             </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdministrativeImpact;
