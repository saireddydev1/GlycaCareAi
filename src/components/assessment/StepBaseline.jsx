import React from 'react';
import { User, Activity, Scale, Ruler } from 'lucide-react';

export default function StepBaseline({ formData, updateForm }) {
  const heightMeters = (parseFloat(formData.heightCm) || 0) / 100;
  const weight = parseFloat(formData.weightKg) || 0;
  const bmi = heightMeters > 0 && weight > 0 ? (weight / (heightMeters * heightMeters)).toFixed(1) : '--';

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="p-2 bg-health-500/10 text-health-400 rounded-xl">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Baseline Biometrics</h3>
          <p className="text-xs text-slate-400">Enter your baseline body measurements for BMI calculation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-health-400" />
            Age (years)
          </label>
          <input
            type="number"
            value={formData.age ?? ''}
            onChange={(e) => updateForm({ age: e.target.value })}
            placeholder="e.g. 35"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Gender
          </label>
          <select
            value={formData.gender ?? ''}
            onChange={(e) => updateForm({ gender: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500"
          >
            <option value="">Select Gender...</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-health-400" />
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.weightKg ?? ''}
            onChange={(e) => updateForm({ weightKg: e.target.value })}
            placeholder="e.g. 70"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-health-400" />
            Height (cm)
          </label>
          <input
            type="number"
            value={formData.heightCm ?? ''}
            onChange={(e) => updateForm({ heightCm: e.target.value })}
            placeholder="e.g. 170"
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500 placeholder-slate-600"
          />
        </div>
      </div>

      {/* Calculated BMI Badge */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400">Calculated Body Mass Index (BMI)</span>
          <p className="text-xl font-extrabold text-white mt-0.5">{bmi} <span className="text-xs font-normal text-slate-400">kg/m²</span></p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          bmi === '--' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
          parseFloat(bmi) > 30 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
          parseFloat(bmi) > 25 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        }`}>
          {bmi === '--' ? 'Enter Biometrics' : parseFloat(bmi) > 30 ? 'Obesity Category' : parseFloat(bmi) > 25 ? 'Overweight Category' : 'Optimal Weight'}
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-health-400" />
          Weekly Physical Activity Level
        </label>
        <select
          value={formData.activityLevel ?? ''}
          onChange={(e) => updateForm({ activityLevel: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500"
        >
          <option value="">Select Activity Level...</option>
          <option value="Sedentary">Sedentary (Desk Job, minimal exercise)</option>
          <option value="Lightly Active">Lightly Active (1-2 light walks/week)</option>
          <option value="Moderately Active">Moderately Active (3-4 yoga/cardio sessions)</option>
          <option value="Very Active">Very Active (5+ intense workouts/week)</option>
        </select>
      </div>
    </div>
  );
}
