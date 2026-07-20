import React, { useState } from 'react';
import { YOGA_REGIMEN } from '../../data/dietAndYogaData';
import { Flame, Clock, HeartPulse, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function YogaRegimenView() {
  const [expandedId, setExpandedId] = useState('dhanurasana');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl glass-panel border border-health-500/30 bg-gradient-to-r from-slate-900 to-emerald-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Abdominal Visceral Massaging Asanas
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Daily Targeted Yoga & Pranayama Regimen
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Mechanically stimulates hepatic portal circulation, compresses intra-abdominal fat deposits, and triggers parasympathetic vagal activity to suppress cortisol spikes.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shrink-0 flex items-center gap-2">
          <Clock className="w-4 h-4 text-health-400" />
          <span>Recommended Daily Practice: <strong>25 - 30 mins</strong></span>
        </div>
      </div>

      {/* Grid of Yoga Poses */}
      <div className="space-y-4">
        {YOGA_REGIMEN.map((pose) => {
          const isExpanded = expandedId === pose.id;
          return (
            <div 
              key={pose.id}
              className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded ? 'border-health-500/50 shadow-xl' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header Bar */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : pose.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-slate-900/60 hover:bg-slate-900/90"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={pose.image} 
                    alt={pose.name} 
                    className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{pose.category}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                        {pose.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{pose.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                      <Clock className="w-3.5 h-3.5 text-health-400" />
                      {pose.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline-block text-xs font-semibold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    Organs: {pose.targetOrgans}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Physiological & Clinical Mechanism:</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {pose.clinicalBenefit}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-health-300">
                        <HeartPulse className="w-4 h-4" />
                        <span>Primary Target Anatomical Regions:</span>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold">
                        {pose.targetOrgans}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {pose.description}
                      </p>
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                      Step-by-Step Execution Guide:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pose.instructions.map((step, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300">
                          <span className="w-5 h-5 rounded-full bg-health-500/20 text-health-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
