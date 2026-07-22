import React from 'react';
import { TestTube2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StepLabMetrics({ formData, updateForm }) {
  const glucose = parseFloat(formData.fastingGlucose) || 0;
  const insulin = parseFloat(formData.fastingInsulin) || 0;
  const homaIRVal = glucose > 0 && insulin > 0 ? (glucose * insulin) / 405 : null;
  const homaIRDisplay = homaIRVal !== null ? homaIRVal.toFixed(2) : '--';

  const alt = parseFloat(formData.alt) || 0;
  const ast = parseFloat(formData.ast) || 0;
  const astAltRatioDisplay = alt > 0 && ast > 0 ? (ast / alt).toFixed(2) : '--';

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="p-2 bg-health-500/10 text-health-400 rounded-xl">
          <TestTube2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Recent Clinical Lab Markers</h3>
          <p className="text-xs text-slate-400">Enter recent blood panel results to calculate HOMA-IR & NAFLD risk</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Fasting Blood Glucose (mg/dL)
          </label>
          <input
            type="number"
            value={formData.fastingGlucose ?? ''}
            onChange={(e) => updateForm({ fastingGlucose: e.target.value })}
            placeholder="e.g. 95"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
          <p className="text-[10px] text-slate-500 mt-1">Normal: &lt; 100 mg/dL | Prediabetes: 100-125</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Fasting Insulin (µIU/mL)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.fastingInsulin ?? ''}
            onChange={(e) => updateForm({ fastingInsulin: e.target.value })}
            placeholder="e.g. 8.5"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
          <p className="text-[10px] text-slate-500 mt-1">Optimal: &lt; 8.0 µIU/mL</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            ALT - Alanine Transaminase (U/L)
          </label>
          <input
            type="number"
            value={formData.alt ?? ''}
            onChange={(e) => updateForm({ alt: e.target.value })}
            placeholder="e.g. 25"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
          <p className="text-[10px] text-slate-500 mt-1">Healthy Liver Target: &lt; 30 U/L</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            AST - Aspartate Transaminase (U/L)
          </label>
          <input
            type="number"
            value={formData.ast ?? ''}
            onChange={(e) => updateForm({ ast: e.target.value })}
            placeholder="e.g. 22"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
          <p className="text-[10px] text-slate-500 mt-1">Healthy Liver Target: &lt; 30 U/L</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Fasting Triglycerides (mg/dL)
          </label>
          <input
            type="number"
            value={formData.triglycerides ?? ''}
            onChange={(e) => updateForm({ triglycerides: e.target.value })}
            placeholder="e.g. 140"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            HDL Cholesterol (mg/dL)
          </label>
          <input
            type="number"
            value={formData.hdl ?? ''}
            onChange={(e) => updateForm({ hdl: e.target.value })}
            placeholder="e.g. 50"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
        </div>
      </div>

      {/* Live HOMA-IR & AST/ALT Calculator Card */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-slate-200">Automated HOMA-IR Index</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            homaIRVal === null ? 'bg-slate-800 text-slate-400 border border-slate-700' :
            homaIRVal > 2.5 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
            homaIRVal > 1.9 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {homaIRVal === null ? 'Enter Glucose & Insulin' : homaIRVal > 2.5 ? 'Elevated Resistance' : homaIRVal > 1.9 ? 'Borderline Sensitive' : 'Optimal Sensitivity'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400">Calculated HOMA-IR score</span>
            <p className="text-2xl font-extrabold text-white">{homaIRDisplay}</p>
            <p className="text-[10px] text-slate-500">Formula: (Glucose × Insulin) / 405</p>
          </div>
          <div>
            <span className="text-[11px] text-slate-400">AST / ALT Ratio</span>
            <p className="text-2xl font-extrabold text-white">{astAltRatioDisplay}</p>
            <p className="text-[10px] text-slate-500">&lt; 0.8 suggests NAFLD pattern</p>
          </div>
        </div>
      </div>
    </div>
  );
}
