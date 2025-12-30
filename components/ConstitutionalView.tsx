
import React from 'react';
import { CONSTITUTIONAL_PROVISIONS } from '../constants';
import { Scale, FileText, ChevronRight } from 'lucide-react';

const ConstitutionalView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Scale size={200} />
        </div>
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Legal & Constitutional Roadmap</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Implementing ONOE requires specific amendments to the Constitution of India. Based on the Kovind Committee recommendations, we've identified the primary legal blockers and proposed solutions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONSTITUTIONAL_PROVISIONS.map((item, idx) => (
          <div key={idx} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col h-full hover:border-indigo-300 transition-all group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileText size={20} />
              </div>
              <span className="font-bold text-lg text-slate-800">Article {item.article}</span>
            </div>
            <h4 className="text-slate-900 font-bold mb-3">{item.title}</h4>
            <div className="flex-1 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Impact</p>
                <p className="text-sm text-slate-700 leading-relaxed">{item.impact}</p>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Recommendation</p>
                <p className="text-sm text-slate-700 leading-relaxed">{item.recommendation}</p>
              </div>
            </div>
            <button className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors py-3 border-t border-slate-50 pt-5">
              READ FULL CLAUSE <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-900">
          <Scale size={20} className="text-blue-600" />
          Proposed Amendment Strategy
        </h3>
        <div className="relative border-l-2 border-slate-100 ml-4 pl-10 space-y-14">
          <div className="relative">
            <div className="absolute -left-[45px] top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-md"></div>
            <h4 className="text-lg font-bold text-slate-900">Phase 1: Parliament & State Assemblies</h4>
            <p className="text-slate-500 mt-2 max-w-3xl leading-relaxed font-medium">Amending Articles 83 and 172 to synchronize the tenure of the Lok Sabha and State Legislative Assemblies. This requires a simple majority in Parliament as it doesn't immediately affect federal balance.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[45px] top-0 w-5 h-5 rounded-full bg-amber-400 border-4 border-white shadow-md"></div>
            <h4 className="text-lg font-bold text-slate-900">Phase 2: Local Bodies (Panchayats & Municipalities)</h4>
            <p className="text-slate-500 mt-2 max-w-3xl leading-relaxed font-medium">Synchronization of Local Body elections within 100 days of the LS/Assembly elections. This requires amendments to Articles 243K and 243ZA, needing ratification by at least half of the states.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[45px] top-0 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white shadow-md"></div>
            <h4 className="text-lg font-bold text-slate-900">Final: Single Electoral Roll</h4>
            <p className="text-slate-500 mt-2 max-w-3xl leading-relaxed font-medium">Integration of voter lists for Central, State, and Local elections through an amendment to Article 325. This streamlines the administrative burden significantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstitutionalView;
