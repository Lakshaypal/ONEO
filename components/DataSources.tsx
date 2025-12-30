
import React from 'react';
import { Database, FileText, ExternalLink, ShieldCheck, Landmark, Users } from 'lucide-react';

const DataSources: React.FC = () => {
  const sources = [
    {
      title: "Kovind Committee Report (2024)",
      desc: "Comprehensive recommendations on constitutional amendments and financial projections for ONOE.",
      link: "https://onoe.gov.in/",
      icon: FileText,
      color: "blue"
    },
    {
      title: "IndiaVotes",
      desc: "India's largest open election database for historical timeline and frequency analysis.",
      link: "https://www.indiavotes.com/",
      icon: Database,
      color: "orange"
    },
    {
      title: "ECI Expenditure Reports",
      desc: "Detailed breakdown of costs associated with Lok Sabha and State Assembly elections.",
      link: "https://www.eci.gov.in/expenditure-reports",
      icon: Landmark,
      color: "emerald"
    },
    {
      title: "Data.gov.in - 2024 Results",
      desc: "Constituency-wise results and voter turnout data for the latest General Election.",
      link: "https://www.data.gov.in/resource/constituency-wise-detailed-result-during-2024",
      icon: Users,
      color: "purple"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><Database size={150}/></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Data Sources & Methodologies</h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            The ESFIS platform is backed by official government reports and validated third-party election datasets. Our simulation models adhere to the constraints outlined in the constitutional framework of India.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sources.map((source, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm group hover:border-blue-500 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-${source.color}-50 text-${source.color}-600 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                <source.icon size={28} />
              </div>
              <a href={source.link} target="_blank" className="text-slate-300 hover:text-blue-600 transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-3">{source.title}</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
              {source.desc}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 w-max px-3 py-1 rounded-full">
              <ShieldCheck size={12} /> Verified Data Stream
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
        <h4 className="text-lg font-bold text-slate-800 mb-4">Research Disclaimer</h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          The simulations provided on this platform are for analytical and policy-discussion purposes only. While every effort is made to ensure accuracy using historical datasets, future election costs and cycles are subject to legislative changes, delimitation exercises, and demographic shifts.
        </p>
      </div>
    </div>
  );
};

export default DataSources;
