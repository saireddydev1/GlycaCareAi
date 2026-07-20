import React from 'react';
import { Activity, TestTube2, ShieldCheck, Scale, TrendingDown, ArrowUpRight, Flame } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export default function MetabolicOverview() {
  const { healthData } = useHealthData();
  const metrics = healthData?.currentMetrics || {};
  const profile = healthData?.userProfile || {};

  const statCards = [
    {
      title: 'HOMA-IR Index',
      value: metrics.homaIR?.value || 2.71,
      unit: 'index',
      target: 'Target < 1.90',
      status: metrics.homaIR?.status || 'warning',
      trend: '-0.4 vs last month',
      icon: Activity,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30'
    },
    {
      title: 'Fasting Glucose',
      value: metrics.fastingGlucose?.value || 98,
      unit: 'mg/dL',
      target: 'Target < 100 mg/dL',
      status: metrics.fastingGlucose?.status || 'normal',
      trend: '-4 mg/dL',
      icon: Activity,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30'
    },
    {
      title: 'ALT Liver Enzyme',
      value: metrics.alt?.value || 38,
      unit: 'U/L',
      target: 'Healthy < 30 U/L',
      status: metrics.alt?.status || 'warning',
      trend: '-6 U/L in 60d',
      icon: TestTube2,
      color: 'from-teal-500/20 to-teal-600/10 border-teal-500/30'
    },
    {
      title: 'Visceral Fat Level',
      value: metrics.visceralFatIndex?.value || 8,
      unit: 'Level',
      target: 'Healthy < 6',
      status: metrics.visceralFatIndex?.status || 'warning',
      trend: '-1 Level',
      icon: Flame,
      color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top Welcome Banner */}
      <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-health-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-health-950/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-health-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-health-500/10 text-health-300 border border-health-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Clinical Status: {profile.diagnosis || 'Stage 1 NAFLD & Mild Insulin Resistance'}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Welcome back, <span className="gradient-text">{profile.name || 'Alex'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Your overall metabolic health index is <strong>{profile.metabolicScore || 74}/100</strong>. HOMA-IR is responding favorably to your low-GI diet & daily yoga twists.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className={`p-4 rounded-2xl glass-card border ${card.color} glass-card-hover flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">{card.title}</span>
                  <div className="p-1.5 rounded-lg bg-slate-900/80 text-health-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-white tracking-tight">{card.value}</span>
                  <span className="text-xs text-slate-400 font-medium">{card.unit}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{card.target}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" />
                  {card.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
