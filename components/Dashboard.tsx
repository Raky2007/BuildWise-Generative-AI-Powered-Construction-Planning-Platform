import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FeasibilityReport, ProjectInfo } from '../types';

interface DashboardProps {
  report: FeasibilityReport;
  project: ProjectInfo;
}

const Dashboard: React.FC<DashboardProps> = ({ report, project }) => {
  const costData = [
    { name: 'Raw Materials', value: report.detailedCost.materials, color: '#000000' },
    { name: 'Labor Contracts', value: report.detailedCost.labor, color: '#F97316' },
    { name: 'Statutory/GST', value: report.detailedCost.overhead, color: '#64748B' },
    { name: 'Neural Buffer', value: report.detailedCost.contingency, color: '#E2E8F0' },
  ];

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b-4 border-black">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <span className="px-4 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">Neural Validated</span>
             <span className="text-slate-400 text-xs font-black uppercase tracking-[0.15em]">{project.location} • Phase 01 Alpha</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-black tracking-tight leading-none">{project.name}</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-white px-8 py-6 rounded-[32px] shadow-xl border border-slate-50 flex flex-col items-start min-w-[200px] hover:border-black transition-all">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Build Score</span>
            <span className="text-4xl font-black text-orange-500 leading-none tracking-tight">{report.score}%</span>
          </div>
          <button className="bg-orange-500 text-black px-8 py-6 rounded-[32px] font-black hover:bg-black hover:text-white transition-all duration-500 flex items-center gap-4 shadow-xl shadow-orange-500/20 active:scale-95 text-xs uppercase tracking-widest">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 9l-4-4m0 0L8 9m4-4v12" />
            </svg>
            Export Dossier
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white p-10 lg:p-14 rounded-[48px] shadow-xl border border-slate-50 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 mb-12">
               <h3 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-4">
                 <div className="w-2 h-10 bg-black rounded-full"></div>
                 Capital Allocation
               </h3>
               <div className="text-left md:text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Net Estimated Capex</p>
                  <p className="text-3xl font-black text-black tracking-tight">
                    {formatPrice(costData.reduce((acc, curr) => acc + curr.value, 0))}
                  </p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-[300px] relative group-hover:scale-105 transition-transform duration-700">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                    >
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} className="outline-none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: '900', fontSize: '12px', padding: '16px' }} 
                      formatter={(value: number) => formatPrice(value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <p className="text-center">
                      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Currency</span>
                      <span className="block text-2xl font-black text-black tracking-tight">INR</span>
                   </p>
                </div>
              </div>
              <div className="space-y-4">
                {costData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-5 rounded-[24px] hover:bg-slate-50 transition-all border-2 border-transparent hover:border-black group/item shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-lg shadow-sm" style={{ backgroundColor: item.color }}></div>
                      <span className="text-black font-black uppercase text-[10px] tracking-[0.1em] opacity-50 group-hover/item:opacity-100 transition-opacity">{item.name}</span>
                    </div>
                    <span className="text-black font-black text-lg tracking-tight">{formatPrice(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 lg:p-14 rounded-[48px] shadow-xl border border-slate-50 relative group">
             <h3 className="text-2xl font-black text-black mb-8 flex items-center gap-4 uppercase tracking-tight">
               <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
               Consultant Synopsis
             </h3>
             <p className="text-xl lg:text-2xl font-bold text-slate-700 leading-tight italic border-l-4 border-orange-500 pl-8 py-2">
               "{report.summary}"
             </p>
          </div>
        </div>

        <div className="space-y-12">
           <div className="bg-black p-10 rounded-[48px] shadow-xl text-white flex flex-col justify-between min-h-[300px] group">
              <div>
                 <h4 className="text-orange-500 font-black uppercase text-[9px] tracking-[0.3em] mb-8">Expert Final Verdict</h4>
                 <p className="text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-orange-500 transition-colors duration-500">
                    Project viability is <span className="underline decoration-4 underline-offset-4 decoration-orange-500/30">{report.score > 72 ? 'OPTIMAL' : 'STRATEGIC'}</span> relative to regional indices.
                 </p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                 <div className="flex -space-x-4">
                    {[...Array(3)].map((_, i) => (
                       <div key={i} className={`w-10 h-10 rounded-xl border-2 border-black bg-slate-900 flex items-center justify-center font-black text-[10px] text-orange-500 shadow-xl`}>G3</div>
                    ))}
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-[0.1em]">Validated Matrix</p>
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">3 Agents Synced</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2 bg-white p-10 lg:p-14 rounded-[48px] shadow-xl border border-slate-100">
          <h3 className="text-2xl font-black text-black mb-10 flex items-center gap-4 uppercase tracking-tight">
            <div className="w-2 h-10 bg-black rounded-full"></div>
            Neural Risk Audit
          </h3>
          <div className="space-y-6">
            {report.risks.map((risk, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-[32px] border-2 border-slate-50 hover:border-black transition-all group shadow-sm">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black transition-all ${
                  risk.level === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-black'
                }`}>
                  {risk.level[0]}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                     <h4 className="font-black text-black uppercase tracking-tight text-lg">{risk.category}</h4>
                     <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${risk.level === 'High' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>{risk.level} Criticality</span>
                  </div>
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed group-hover:text-slate-700 transition-colors">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-10 lg:p-14 rounded-[48px] shadow-xl border border-slate-100">
          <h3 className="text-2xl font-black text-black mb-10 flex items-center gap-4 uppercase tracking-tight">
            <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
            Neural Path Optimization
          </h3>
          <div className="space-y-6">
            {report.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-6 group items-start">
                <div className="shrink-0 w-12 h-12 rounded-[16px] bg-slate-50 text-black flex items-center justify-center font-black text-lg group-hover:bg-orange-500 group-hover:scale-110 transition-all shadow-inner">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <p className="text-slate-500 text-base font-bold leading-snug group-hover:text-black transition-colors py-2">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;