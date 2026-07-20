import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { Activity, TrendingDown } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export default function MetabolicProgressChart() {
  const { healthData } = useHealthData();
  const data = healthData?.glucoseTrend || [];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-health-400" />
            <h3 className="text-base font-bold text-white">Metabolic & Glucose Stabilization Trend</h3>
          </div>
          <p className="text-xs text-slate-400">Tracking Fasting Blood Glucose (mg/dL) vs HOMA-IR Index over time</p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-teal-500/80"></span>
            <span className="text-slate-300">Fasting Glucose</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-400"></span>
            <span className="text-slate-300">HOMA-IR Index</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            
            {/* Primary YAxis for Glucose */}
            <YAxis 
              yAxisId="left" 
              domain={[80, 130]} 
              stroke="#94a3b8" 
              tick={{ fontSize: 11 }} 
              unit=" mg"
            />
            
            {/* Secondary YAxis for HOMA-IR */}
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[1.5, 4.0]} 
              stroke="#fbbf24" 
              tick={{ fontSize: 11 }}
            />

            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#334155', 
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(value, name) => [
                name === 'glucose' ? `${value} mg/dL` : value,
                name === 'glucose' ? 'Fasting Glucose' : 'HOMA-IR Index'
              ]}
            />

            <ReferenceLine 
              yAxisId="left" 
              y={100} 
              stroke="#10b981" 
              strokeDasharray="4 4" 
              label={{ value: 'Target Glucose (100 mg/dL)', fill: '#10b981', fontSize: 10, position: 'insideTopLeft' }} 
            />

            <Area 
              yAxisId="left" 
              type="monotone" 
              dataKey="glucose" 
              stroke="#14b8a6" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#glucoseGrad)" 
            />

            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="homaIR" 
              stroke="#fbbf24" 
              strokeWidth={2.5} 
              dot={{ r: 4, fill: '#fbbf24' }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <TrendingDown className="w-4 h-4" />
          Glucose levels normalized from 112 to 95 mg/dL over 30 days
        </span>
        <span className="text-slate-400 text-[11px]">HOMA-IR Target &lt; 1.90</span>
      </div>
    </div>
  );
}
