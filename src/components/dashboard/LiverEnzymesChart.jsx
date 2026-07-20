import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine,
  Legend 
} from 'recharts';
import { TestTube2, ShieldCheck } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export default function LiverEnzymesChart() {
  const { healthData } = useHealthData();
  const data = healthData?.liverTrend || [];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <TestTube2 className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">Hepatic Enzyme Reduction (ALT / AST)</h3>
          </div>
          <p className="text-xs text-slate-400">Monthly progress tracking reduction in liver fat & inflammation</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            ALT decreased by 10 U/L
          </span>
        </div>
      </div>

      <div className="h-56 sm:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 60]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#334155', 
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(val, name) => [`${val} U/L`, name === 'alt' ? 'ALT (Alanine Transaminase)' : 'AST (Aspartate Transaminase)']}
            />

            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              formatter={(value) => value === 'alt' ? 'ALT Enzyme (U/L)' : 'AST Enzyme (U/L)'}
            />

            <ReferenceLine 
              y={30} 
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              label={{ value: 'Upper Clinical Limit (30 U/L)', fill: '#ef4444', fontSize: 10, position: 'top' }} 
            />

            <Bar dataKey="alt" fill="#14b8a6" radius={[6, 6, 0, 0]} maxBarSize={30} />
            <Bar dataKey="ast" fill="#06b6d4" radius={[6, 6, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
        * <strong>Clinical Note:</strong> ALT values above 30 U/L correlate with intrahepatic lipid accumulation. Target threshold is &lt; 30 U/L.
      </p>
    </div>
  );
}
