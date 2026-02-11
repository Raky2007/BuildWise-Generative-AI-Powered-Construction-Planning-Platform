
import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryProps {
  entries: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ entries, onSelect, onDelete }) => {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24">
      <header className="pb-8 border-b-2 border-black">
        <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-full mb-3 shadow-xl">Audit Archives</div>
        <h1 className="text-4xl font-black text-black tracking-tight leading-none">Project History</h1>
      </header>

      {entries.length === 0 ? (
        <div className="bg-white p-20 rounded-[48px] shadow-xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">No records found</h3>
          <p className="text-slate-500 font-bold text-sm">Initiate a new neural conception to begin your archive.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100 hover:border-black transition-all duration-500 group flex flex-col md:flex-row md:items-center justify-between gap-8"
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center font-black text-xl text-white shadow-xl ${
                  entry.project.type === 'residential' ? 'bg-orange-500' : entry.project.type === 'commercial' ? 'bg-black' : 'bg-slate-400'
                }`}>
                  {entry.project.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black text-black uppercase tracking-tight">{entry.project.name}</h3>
                    <span className="text-[8px] font-black uppercase px-2 py-1 bg-slate-100 rounded-full tracking-widest">{entry.project.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.1em]">
                    <span>{entry.project.location}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span>{formatDate(entry.timestamp)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onSelect(entry)}
                  className="bg-black text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-all duration-300 shadow-xl flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Restore View
                </button>
                <button 
                  onClick={() => onDelete(entry.id)}
                  className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
