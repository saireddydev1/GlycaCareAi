import React from 'react';
import { Clock, Activity, Utensils, Flame, CheckCircle2 } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export default function DailyLogWidget() {
  const { healthData } = useHealthData();
  const logs = healthData?.recentLogs || [];

  const getLogIcon = (type) => {
    if (type.includes('Glucose')) return <Activity className="w-4 h-4 text-emerald-400" />;
    if (type.includes('Meal') || type.includes('Lunch')) return <Utensils className="w-4 h-4 text-cyan-400" />;
    return <Flame className="w-4 h-4 text-amber-400" />;
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-health-400" />
          <h3 className="text-base font-bold text-white">Today's Daily Log History</h3>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-health-500/10 text-health-300 border border-health-500/20">
          {logs.length} Entries
        </span>
      </div>

      <div className="space-y-3">
        {logs.slice(0, 5).map((log) => (
          <div 
            key={log.id} 
            className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800/80">
                {getLogIcon(log.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{log.type}</span>
                  <span className="text-[10px] text-slate-500">{log.time}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">{log.value}</p>
                {log.note && (
                  <p className="text-[10px] text-slate-500 italic mt-0.5">"{log.note}"</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              Recorded
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
