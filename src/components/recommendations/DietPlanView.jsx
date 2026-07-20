import React, { useState } from 'react';
import { SEVEN_DAY_DIET_PLAN } from '../../data/dietAndYogaData';
import { Utensils, Sparkles, CheckCircle2, ChevronRight, Info, ShieldCheck, Flame } from 'lucide-react';

export default function DietPlanView() {
  const [selectedDay, setSelectedDay] = useState(1);
  const currentPlan = SEVEN_DAY_DIET_PLAN.find(p => p.day === selectedDay) || SEVEN_DAY_DIET_PLAN[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl glass-panel border border-health-500/30 bg-gradient-to-r from-slate-900 to-health-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI Clinical Nutritionist Prescribed
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            7-Day Low-GI & Hepato-Protective Meal Plan
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Designed specifically to deplete intrahepatic glycogen stores, lower post-prandial insulin secretion, and resensitize skeletal muscle GLUT4 receptors.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800 shrink-0">
          <div>
            <span className="text-slate-400 block text-[10px]">Glycemic Target</span>
            <span className="font-bold text-emerald-400">GI &lt; 35 (Very Low)</span>
          </div>
          <span className="text-slate-700">|</span>
          <div>
            <span className="text-slate-400 block text-[10px]">Net Carb Limit</span>
            <span className="font-bold text-cyan-400">&lt; 65g / Day</span>
          </div>
        </div>
      </div>

      {/* Day selector tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SEVEN_DAY_DIET_PLAN.map((item) => (
          <button
            key={item.day}
            onClick={() => setSelectedDay(item.day)}
            className={`
              px-4 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all duration-200 shrink-0 border
              ${selectedDay === item.day
                ? 'bg-gradient-to-r from-health-500 to-emerald-500 text-white border-health-400 shadow-md shadow-health-500/20 scale-[1.02]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'}
            `}
          >
            Day {item.day}
          </button>
        ))}
      </div>

      {/* Current Day Focus Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold text-health-400 uppercase tracking-wider">{currentPlan.title}</span>
          <p className="text-sm font-semibold text-white mt-0.5">{currentPlan.focus}</p>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-health-500/10 text-health-300 border border-health-500/20">
          Day {currentPlan.day} Active
        </span>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'breakfast', label: 'Breakfast (08:30 AM)', meal: currentPlan.meals.breakfast, icon: Utensils, color: 'text-amber-400' },
          { key: 'lunch', label: 'Lunch (01:00 PM)', meal: currentPlan.meals.lunch, icon: Utensils, color: 'text-emerald-400' },
          { key: 'snack', label: 'Afternoon Snack (04:30 PM)', meal: currentPlan.meals.snack, icon: Utensils, color: 'text-cyan-400' },
          { key: 'dinner', label: 'Dinner (07:30 PM)', meal: currentPlan.meals.dinner, icon: Utensils, color: 'text-teal-400' },
        ].map((item) => {
          const m = item.meal;
          return (
            <div key={item.key} className="glass-panel p-5 rounded-2xl border border-slate-800 glass-card-hover space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Utensils className={`w-3.5 h-3.5 ${item.color}`} />
                  {item.label}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  GI: {m.gi} (Low)
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{m.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{m.ingredients}</p>
              </div>

              {/* Macros Breakdown */}
              <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-slate-300">
                <span className="px-2 py-0.5 bg-slate-900 rounded-md border border-slate-800">Carbs: {m.carbs}</span>
                <span className="px-2 py-0.5 bg-slate-900 rounded-md border border-slate-800">Protein: {m.protein}</span>
                <span className="px-2 py-0.5 bg-slate-900 rounded-md border border-slate-800">Fat: {m.fat}</span>
              </div>

              {/* Clinical Benefit Highlight */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Clinical Action:</strong> {m.benefit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Night Herbal Infusion Box */}
      {currentPlan.meals.night && (
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 to-amber-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Nocturnal Fasting Partner</span>
              <h5 className="text-sm font-bold text-white">{currentPlan.meals.night.name}</h5>
              <p className="text-xs text-slate-400">{currentPlan.meals.night.benefit}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
