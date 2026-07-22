import React, { useState } from 'react';
import DietPlanView from '../components/recommendations/DietPlanView';
import YogaRegimenView from '../components/recommendations/YogaRegimenView';
import { Utensils, Flame, Sparkles } from 'lucide-react';

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState('diet');

  return (
    <div className="space-y-6">
      {/* Top Navigation Tabs for Recommendations */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            AI Personalized Recommendations
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Tailored nutrition & movement protocols for Insulin Sensitivity & Liver Health
          </p>
        </div>

        {/* Tab Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('diet')}
            className={`
              px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2
              ${activeTab === 'diet'
                ? 'bg-gradient-to-r from-health-500 to-emerald-500 text-white shadow-md shadow-health-500/20'
                : 'text-slate-400 hover:text-white'}
            `}
          >
            <Utensils className="w-4 h-4" />
            7-Day Diet Plan
          </button>

          <button
            onClick={() => setActiveTab('yoga')}
            className={`
              px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2
              ${activeTab === 'yoga'
                ? 'bg-gradient-to-r from-health-500 to-emerald-500 text-white shadow-md shadow-health-500/20'
                : 'text-slate-400 hover:text-white'}
            `}
          >
            <Flame className="w-4 h-4" />
            Yoga Regimen
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'diet' ? <DietPlanView /> : <YogaRegimenView />}
    </div>
  );
}
