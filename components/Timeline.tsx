
import React, { useState } from 'react';
import { TimelinePhase } from '../types';

interface TimelineProps {
  phases: TimelinePhase[];
}

const Timeline: React.FC<TimelineProps> = ({ phases }) => {
  const [selectedPhase, setSelectedPhase] = useState<TimelinePhase | null>(null);
  const [showCriticalPath, setShowCriticalPath] = useState(false);

  // Simple logic to identify critical path based on dependencies
  const isCritical = (phase: TimelinePhase) => {
    if (!showCriticalPath) return false;
    const isDependedOn = phases.some(p => p.dependencies?.includes(phase.phase));
    const hasDependencies = (phase.dependencies?.length ?? 0) > 0;
    return isDependedOn || hasDependencies || phase.duration > 3;
  };

  const getWorkerEstimate = (phase: TimelinePhase) => {
    const baseWorkers = 12;
    const durationMultiplier = Math.ceil(phase.duration / 1.5);
    return baseWorkers + (durationMultiplier * 6);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-slate-50 overflow-x-auto custom-scrollbar">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-[10px] font-black tracking-[0.2em] uppercase rounded-full mb-3">Neural Gantt Matrix</div>
            <h3 className="text-2xl font-black text-black uppercase tracking-tight">Timeline Sequencing</h3>
          </div>
          <button 
            onClick={() => setShowCriticalPath(!showCriticalPath)}
            className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-3 border-2 active:scale-95 ${
              showCriticalPath 
              ? 'bg-black text-white border-black shadow-lg shadow-orange-500/10' 
              : 'bg-white text-slate-400 border-slate-50 hover:border-black hover:text-black'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${showCriticalPath ? 'bg-orange-500 animate-pulse' : 'bg-slate-300'}`}></div>
            {showCriticalPath ? 'Clear Analysis' : 'Isolate Critical Path'}
          </button>
        </div>

        <div className="min-w-[1000px] pb-6">
          <div className="flex mb-8 border-b-2 border-slate-100 pb-6">
            <div className="w-64 shrink-0 font-black text-slate-400 text-[9px] uppercase tracking-widest">Phase Architecture</div>
            <div className="flex-1 grid grid-cols-12 gap-3 text-center font-black text-slate-400 text-[9px] uppercase tracking-widest">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="border-l border-slate-50 py-1">M{i + 1}</div>
               ))}
            </div>
          </div>

          <div className="space-y-6">
            {phases.map((phase, idx) => {
              const critical = isCritical(phase);
              const isSelected = selectedPhase?.phase === phase.phase;

              return (
                <div key={idx} className="flex items-center group relative">
                  <div className="w-64 shrink-0 pr-8">
                    <h4 className={`font-black text-sm uppercase tracking-tight transition-all duration-500 truncate ${isSelected ? 'text-orange-500 translate-x-1' : 'text-black group-hover:text-orange-500'}`} title={phase.phase}>
                      {phase.phase}
                    </h4>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{phase.duration} WEEKS DURATION</p>
                  </div>
                  <div className="flex-1 grid grid-cols-12 gap-3 relative h-12">
                    <div className="absolute inset-0 grid grid-cols-12 gap-3">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className="bg-slate-50/50 rounded-xl border border-transparent"></div>
                       ))}
                    </div>
                    <button 
                      onClick={() => setSelectedPhase(isSelected ? null : phase)}
                      className={`h-full rounded-2xl flex items-center justify-center text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-500 z-10 px-4 border-2 shadow-md active:scale-95 ${
                        isSelected 
                          ? 'bg-orange-500 text-black border-black shadow-orange-500/20' 
                          : critical
                            ? 'bg-black text-white border-orange-500'
                            : 'bg-black text-white border-transparent hover:bg-slate-900'
                      }`}
                      style={{
                        gridColumnStart: phase.startWeek + 1,
                        gridColumnEnd: `span ${Math.max(1, phase.duration)}`
                      }}
                    >
                      <span className="truncate">{phase.phase}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedPhase ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-top-6 duration-700">
          <div className="lg:col-span-2 bg-black text-white p-10 lg:p-14 rounded-[48px] shadow-2xl relative overflow-hidden group">
            <div className="flex items-center gap-6 mb-10 relative z-10">
              <div className="w-3 h-12 bg-orange-500 rounded-full"></div>
              <div>
                <h4 className="text-3xl font-black uppercase tracking-tight leading-none">{selectedPhase.phase}</h4>
                <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Neural Phase Analytics</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 relative z-10">
              <div>
                <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Daily Peak Workforce</h5>
                <div className="flex items-end gap-4 mb-6">
                  <span className="text-5xl font-black text-white tracking-tight">{getWorkerEstimate(selectedPhase)}</span>
                  <div className="flex flex-col mb-1">
                     <span className="text-[10px] font-black text-orange-500 uppercase leading-none">Workers</span>
                     <span className="text-[8px] font-bold text-slate-400 uppercase">IS-Certified</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${i < 8 ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]' : 'bg-white/5'}`}></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Sequence Integrity</h5>
                <div className="flex items-center gap-4 group/item cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-black shadow-lg shadow-orange-500/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-base font-black text-white uppercase tracking-tight">Supply Ready</span>
                </div>
                <div className="flex items-center gap-4 group/item cursor-default">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 border border-white/10">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  </div>
                  <span className="text-base font-black text-slate-500 uppercase tracking-tight">Antecedents Clear</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 lg:p-14 rounded-[48px] border border-slate-50 shadow-xl flex flex-col">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Antecedent Matrix</h5>
            <div className="space-y-4 flex-1">
              {selectedPhase.dependencies && selectedPhase.dependencies.length > 0 ? (
                selectedPhase.dependencies.map((dep, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-[24px] border border-transparent hover:border-black transition-all group shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-[10px] font-black group-hover:bg-orange-500 transition-colors">{String(i + 1).padStart(2, '0')}</div>
                    <span className="text-sm font-black text-black uppercase tracking-tight">{dep}</span>
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/50 rounded-[32px] border-2 border-dashed border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Zero Dependencies</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => setSelectedPhase(null)}
              className="w-full mt-10 py-5 rounded-2xl bg-black text-white font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all duration-500 shadow-lg active:scale-95"
            >
              Close Details
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50/50 p-10 rounded-[48px] text-center border-2 border-dashed border-slate-100">
          <p className="text-slate-300 font-black uppercase text-[10px] tracking-[0.3em]">Select neural node on timeline for granular data</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
