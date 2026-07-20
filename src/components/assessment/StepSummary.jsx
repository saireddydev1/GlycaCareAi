import React from 'react';
import { ShieldCheck, Activity, TestTube2, HeartPulse, CheckCircle2, Sparkles } from 'lucide-react';

export default function StepSummary({ formData, onComplete }) {
  const glucose = parseFloat(formData.fastingGlucose || 98);
  const insulin = parseFloat(formData.fastingInsulin || 11.2);
  const homaIR = ((glucose * insulin) / 405).toFixed(2);
  const alt = parseFloat(formData.alt || 38);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Assessment Summary & AI Risk Profiling</h3>
          <p className="text-xs text-slate-400">Review your baseline metrics before generating tailored recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
            <Activity className="w-3 h-3 text-health-400" />
            HOMA-IR Score
          </span>
          <p className="text-xl font-extrabold text-white mt-1">{homaIR}</p>
          <p className={`text-[10px] font-semibold ${homaIR > 1.9 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {homaIR > 1.9 ? 'Target: < 1.90' : 'Optimal'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
            <TestTube2 className="w-3 h-3 text-health-400" />
            Liver ALT Enzyme
          </span>
          <p className="text-xl font-extrabold text-white mt-1">{alt} <span className="text-xs font-normal text-slate-400">U/L</span></p>
          <p className={`text-[10px] font-semibold ${alt > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {alt > 30 ? 'Mildly Elevated' : 'Optimal'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
            <HeartPulse className="w-3 h-3 text-health-400" />
            Fasting Glucose
          </span>
          <p className="text-xl font-extrabold text-white mt-1">{glucose} <span className="text-xs font-normal text-slate-400">mg/dL</span></p>
          <p className="text-[10px] text-emerald-400 font-semibold">Normal Range</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-health-950/60 border border-health-500/30 space-y-3">
        <div className="flex items-center gap-2 text-health-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Clinical Recommendation Strategy:</span>
        </div>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>7-Day Meal Plan:</strong> Low-GI foods with extra virgin olive oil, wild salmon, and cruciferous sprouts to reduce liver fat accumulation.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Daily Yoga Regimen:</strong> Focus on <em>Dhanurasana</em> (Bow Pose) and <em>Kapalbhati Pranayama</em> to compress visceral fat deposits and stimulate hepatic circulation.</span>
          </li>
        </ul>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-3 px-4 bg-gradient-to-r from-health-500 to-emerald-500 hover:from-health-600 hover:to-emerald-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-health-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Save Metrics & Launch Dashboard
      </button>
    </div>
  );
}
