import React from 'react';
import { Moon, Utensils, HeartPulse, Clock } from 'lucide-react';

export default function StepLifestyle({ formData, updateForm }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
        <div className="p-2 bg-health-500/10 text-health-400 rounded-xl">
          <HeartPulse className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Lifestyle & Metabolic Habits</h3>
          <p className="text-xs text-slate-400">Personalize your 7-day diet & daily yoga plan parameters</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-health-400" />
            Intermittent Fasting Window Preference
          </label>
          <select
            value={formData.fastingWindow || '14:10'}
            onChange={(e) => updateForm({ fastingWindow: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500"
          >
            <option value="12:12">12:12 (Standard overnight fast)</option>
            <option value="14:10">14:10 (Moderate liver glycogen depletion - Recommended)</option>
            <option value="16:8">16:8 (Accelerated AMPK & Autophagy)</option>
            <option value="None">No structured fasting window</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-health-400" />
            Nightly Restorative Sleep (Hours)
          </label>
          <select
            value={formData.sleepHours || '7-8'}
            onChange={(e) => updateForm({ sleepHours: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500"
          >
            <option value="< 6">&lt; 6 hours (High Cortisol / Insomnia risk)</option>
            <option value="6-7">6-7 hours</option>
            <option value="7-8">7-8 hours (Optimal circadian repair)</option>
            <option value="> 8">&gt; 8 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-health-400" />
            Dietary Style Preference
          </label>
          <select
            value={formData.dietPreference || 'Mediterranean Low-GI'}
            onChange={(e) => updateForm({ dietPreference: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500"
          >
            <option value="Mediterranean Low-GI">Mediterranean Low-GI (Olive Oil, Wild Fish, Berries)</option>
            <option value="Vegetarian Low-GI">Vegetarian Low-GI (Legumes, Tofu, Nuts, Seeds)</option>
            <option value="Low-Carb Moderate Fat">Low-Carb Moderate Fat (&lt; 70g Net Carbs/day)</option>
            <option value="Standard Whole Foods">Standard Whole Foods (Minimal Processed Food)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Known Clinical Fatty Liver Status
          </label>
          <select
            value={formData.nafldStatus || 'Diagnosed Stage 1 NAFLD'}
            onChange={(e) => updateForm({ nafldStatus: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-health-500"
          >
            <option value="Diagnosed Stage 1 NAFLD">Diagnosed Stage 1 NAFLD (Grade 1 Steatosis)</option>
            <option value="Diagnosed Stage 2 NAFLD">Diagnosed Stage 2 NAFLD (Inflammation / NASH)</option>
            <option value="Suspected Fatty Liver">Suspected Fatty Liver (Elevated ALT/AST)</option>
            <option value="Prevention Focus">Prevention Focus (Healthy Liver Maintenance)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
