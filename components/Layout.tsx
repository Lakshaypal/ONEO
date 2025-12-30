
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarRange, 
  Landmark, 
  ShieldCheck, 
  Scale, 
  Zap, 
  Menu, 
  X, 
  Info,
  ChevronLeft,
  ChevronRight,
  Database,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: ViewType.DASHBOARD, label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: ViewType.TIMELINE, label: 'Timeline Simulator', icon: CalendarRange },
    { id: ViewType.FINANCIAL, label: 'Financial Impact', icon: Landmark },
    { id: ViewType.ADMIN, label: 'Administrative Load', icon: ShieldCheck },
    { id: ViewType.GOVERNANCE, label: 'Governance & MCC', icon: BarChart3 },
    { id: ViewType.CONSTITUTIONAL, label: 'Legal Framework', icon: Scale },
    { id: ViewType.SCENARIO, label: 'Scenario Builder', icon: Zap },
    { id: ViewType.REFERENCES, label: 'Data Sources', icon: Database },
  ];

  // Close mobile menu when view changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [currentView]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 overflow-hidden">
      {/* Brand Section */}
      <div className={`p-6 flex items-center gap-3 flex-shrink-0 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 transform hover:rotate-6 transition-transform">
          E
        </div>
        {!isCollapsed && (
          <div className="flex flex-col overflow-hidden animate-in fade-in duration-300">
            <span className="font-black text-lg text-slate-900 leading-none">ESFIS</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sim & Analytics</span>
          </div>
        )}
      </div>

      {/* Navigation - Enable vertical scrolling with visible bar */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto sidebar-scroll">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${
                  isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-4 ring-blue-50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon size={22} className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                {!isCollapsed && (
                  <span className="font-bold text-sm whitespace-nowrap animate-in slide-in-from-left-2 duration-300">
                    {item.label}
                  </span>
                )}
                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl translate-x-2 group-hover:translate-x-0">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-[6px] border-transparent border-r-slate-900"></div>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 space-y-4 flex-shrink-0">
        {!isCollapsed && (
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
            <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase tracking-tight">
              Verified Policy Dataset v2.1 (Kovind Report)
            </p>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-3 rounded-2xl hover:bg-slate-100 text-slate-400 transition-colors hidden md:flex"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20}/><span className="text-xs font-bold">Collapse</span></div>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block h-full transition-all duration-300 ease-in-out z-40 flex-shrink-0 ${isCollapsed ? 'w-24' : 'w-72'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Slide-in) */}
      <aside className={`fixed top-0 left-0 bottom-0 w-72 z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative h-screen">
        {/* Header - Fixed at top of main area */}
        <header className="sticky top-0 z-30 px-6 py-5 border-b border-slate-200/60 backdrop-blur-md bg-white/70 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-600"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight text-slate-900 animate-in fade-in slide-in-from-top-2 duration-300">
                {menuItems.find(i => i.id === currentView)?.label}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Election Data Simulator</p>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-700 tracking-tighter">LIVE SIMULATION</span>
             </div>
             <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 transition-colors shadow-sm"
              title="Documentation"
              rel="noreferrer"
             >
              <ExternalLink size={18} />
             </a>
          </div>
        </header>

        {/* Content Body - Explicit scroll bar with overflow-y: auto */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <div className="max-w-7xl mx-auto space-y-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
