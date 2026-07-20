import React from 'react';
import { TestTube2, Activity, ShieldCheck, Info, FileSpreadsheet } from 'lucide-react';
import { useHealthData } from '../context/HealthDataContext';
import LiverEnzymesChart from '../components/dashboard/LiverEnzymesChart';

export default function LabResultsPage() {
  const { healthData } = useHealthData();
  const metrics = healthData?.currentMetrics || {};

  const labItems = [
    { name: 'Fasting Blood Glucose', value: `${metrics.fastingGlucose?.value} mg/dL`, range: '< 100 mg/dL', status: 'Normal', note: 'Optimal fasting baseline' },
    { name: 'Fasting Serum Insulin', value: `${metrics.fastingInsulin?.value} µIU/mL`, range: '< 8.0 µIU/mL', status: 'Elevated', note: 'Indicates underlying insulin resistance' },
    { name: 'Calculated HOMA-IR', value: `${metrics.homaIR?.value}`, range: '< 1.90', status: 'Warning', note: '(Glucose × Insulin) / 405' },
    { name: 'ALT (Alanine Transaminase)', value: `${metrics.alt?.value} U/L`, range: '< 30 U/L', status: 'Elevated', note: 'Correlates with intrahepatic fat (steatosis)' },
    { name: 'AST (Aspartate Transaminase)', value: `${metrics.ast?.value} U/L`, range: '< 30 U/L', status: 'Normal', note: 'Normal muscle & heart tissue marker' },
    { name: 'Fasting Triglycerides', value: `${metrics.triglycerides?.value} mg/dL`, range: '< 150 mg/dL', status: 'Borderline', note: 'Correlates with TyG Index score' },
    { name: 'HDL Cholesterol', value: `${metrics.hdl?.value} mg/dL`, range: '> 50 mg/dL', status: 'Optimal', note: 'Protective lipid particle' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-tr from-health-600 to-emerald-400 rounded-2xl text-slate-950 font-bold shadow-lg">
          <TestTube2 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Clinical Lab Analytics & Blood Panels
          </h1>
          <p className="text-xs text-slate-400">
            Comprehensive biomarker evaluation for Insulin Resistance & NAFLD
          </p>
        </div>
      </div>

      {/* Lab Markers Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-health-400" />
            <h3 className="text-sm font-bold text-white">Latest Blood Panel Metrics</h3>
          </div>
          <span className="text-xs text-slate-400">Recorded: July 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/40 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Biomarker</th>
                <th className="px-4 py-3">Your Result</th>
                <th className="px-4 py-3">Reference Target</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Clinical Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {labItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-200">{item.name}</td>
                  <td className="px-4 py-3.5 font-extrabold text-white">{item.value}</td>
                  <td className="px-4 py-3.5 text-slate-400">{item.range}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Normal' || item.status === 'Optimal' 
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 italic text-[11px]">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Liver Enzymes Recharts Bar Chart */}
      <LiverEnzymesChart />
    </div>
  );
}
