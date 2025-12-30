
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { Clock, AlertTriangle, ShieldAlert, Zap, BarChart3, Map } from 'lucide-react';
import { STATES_DATA } from '../constants';

// Added missing interface for GovernanceImpact props
interface GovernanceImpactProps {
  isOnoe: boolean;
}

const GovernanceImpact: React.FC<GovernanceImpactProps> = ({ isOnoe }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl"><Clock size={24}/></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Policy Stagnation</span>
          </div>
          {/* Use isOnoe prop to display simulated reduction in MCC duration */}
          <h3 className="text-4xl font-black text-slate-900">{isOnoe ? '1.5 Mo' : '4-5 Mo'}</h3>
          <p className="text-sm text-slate-500 font-bold mt-2 leading-relaxed">
            {isOnoe 
              ? 'Estimated annual duration of Model Code of Conduct (MCC) under synchronized cycles.' 
              : 'Average annual duration of Model Code of Conduct (MCC) across India.'}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-amber-600 text-white shadow-xl shadow-amber-200 lg:col-span-2 overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 opacity-10"><BarChart3 size={240}/></div>
          <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
               <ShieldAlert size={24} />
               MCC Impact Assessment
             </h3>
             <p className="text-amber-50 leading-relaxed max-w-lg">
               Model Code of Conduct (MCC) restricts the announcement of new schemes, financial grants, and project launches. With frequent elections, the administrative focus shifts from development to management.
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Map size={20} className="text-blue-600" />
            Governance Disruption by State (%)
          </h4>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STATES_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={100} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="governanceDisruptionScore" radius={[0, 10, 10, 0]} name="Disruption Score">
                  {STATES_DATA.map((entry, index) => {
                    // Reduce disruption score in ONOE simulation
                    const impact = isOnoe ? entry.governanceDisruptionScore * 0.4 : entry.governanceDisruptionScore;
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={impact > 80 ? '#ef4444' : impact > 60 ? '#f59e0b' : '#3b82f6'} 
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
              <Zap size={20} />
              Policy Paralysis Simulation
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-10">
              Under the current cycle, Union decisions are often postponed during Assembly polls to avoid political friction. ONOE streamlines this into a unified decision window.
            </p>
            <div className="space-y-6">
               <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Delay Buffer</span>
                    <span className="text-xs font-bold text-red-400">High Risk</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full">
                    <div className="h-full bg-red-500 w-[85%]" />
                  </div>
               </div>
               <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">ONOE Delay Buffer</span>
                    <span className="text-xs font-bold text-emerald-400">Low Risk</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full">
                    <div className="h-full bg-emerald-500 w-[20%]" />
                  </div>
               </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
             <AlertTriangle className="text-amber-500" size={32} />
             <p className="text-xs text-slate-400 font-bold italic">Source: Kovind Report Appendix 4.2 - "Impact on National Level Policy Execution".</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceImpact;
