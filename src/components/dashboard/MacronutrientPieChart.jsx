import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon, Info } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export default function MacronutrientPieChart() {
  const { healthData } = useHealthData();
  const data = healthData?.macronutrientSplit || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMacro = data[activeIndex] || data[0];

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between h-full">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">Insulin-Targeted Macro Balance</h3>
            <p className="text-[11px] text-slate-400">Optimal macronutrient split for glycemic control</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
          Daily Split
        </span>
      </div>

      {/* Donut Chart & Legend Stack */}
      <div className="space-y-4">
        {/* Donut Chart Display */}
        <div className="h-48 sm:h-52 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#0f172a"
                    strokeWidth={2.5}
                    className="transition-all duration-300 cursor-pointer hover:opacity-90"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
                formatter={(val, name) => [`${val}% (${data.find(d => d.name === name)?.grams || ''})`, name]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-white">{activeMacro?.value}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {activeMacro?.name?.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Macro List Items */}
        <div className="space-y-2">
          {data.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeIndex === idx 
                  ? 'bg-slate-800/90 border-health-500/50 shadow-sm' 
                  : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-slate-200 truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-xs shrink-0 ml-2">
                  <span className="font-extrabold text-white">{item.value}%</span>
                  <span className="text-slate-400 text-[11px] font-medium">({item.grams})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Rationale Footer */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
        <Info className="w-4 h-4 text-health-400 shrink-0 mt-0.5" />
        <span className="text-[11px] text-slate-300 leading-snug">
          <strong>45% Healthy MUFAs & Omegas:</strong> Delays gastric emptying, preventing sharp glucose surges after meals.
        </span>
      </div>
    </div>
  );
}
