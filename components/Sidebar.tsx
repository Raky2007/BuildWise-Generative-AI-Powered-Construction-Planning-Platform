
import React from 'react';

interface SidebarProps {
  currentStep: string;
  setStep: (step: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, setStep }) => {
  const navItems = [
    { id: 'conception', label: 'Conception', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { id: 'dashboard', label: 'Analytics', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' },
    { id: 'planning', label: 'Timeline', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'risk_ai', label: 'Neural Guard', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { id: 'procurement', label: 'Materials', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'history', label: 'Archives', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col p-8 sticky top-0 border-r border-white/5 shadow-2xl z-50">
      <div className="flex items-center gap-3 mb-16 group cursor-pointer">
        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-2xl text-black shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-500">B</div>
        <div>
          <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Build</h1>
          <p className="text-[8px] font-black text-orange-500 tracking-[0.25em] uppercase mt-1">Industrial Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setStep(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
              currentStep === item.id 
                ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)]' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <svg className={`w-5 h-5 transition-colors ${currentStep === item.id ? 'text-black' : 'text-slate-600 group-hover:text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
            </svg>
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
            {currentStep === item.id && (
              <div className="absolute right-4 w-1.5 h-6 bg-orange-500 rounded-full animate-in slide-in-from-right-2"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <div className="p-5 bg-white/5 rounded-3xl border border-white/10 group hover:border-orange-500/30 transition-colors">
          <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.25em] mb-4">Neural Architecture</p>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-black text-white leading-tight">Gemini 3 Pro</span>
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-0.5">Planning & Logic</span>
                </div>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] animate-pulse"></div>
             </div>
             <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-black text-white leading-tight">Gemini 3 Flash</span>
                  <span className="block text-[8px] text-slate-500 uppercase tracking-widest mt-0.5">Rapid Risk Audit</span>
                </div>
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
