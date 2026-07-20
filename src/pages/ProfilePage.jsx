import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, Activity, Scale, Ruler, ClipboardList, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealthData } from '../context/HealthDataContext';

export default function ProfilePage() {
  const { user, isDemoMode, logout } = useAuth();
  const { healthData } = useHealthData();
  const profile = healthData?.userProfile || {};
  const navigate = useNavigate();

  const heightMeters = (profile.heightCm || 165) / 100;
  const bmi = ((profile.weightKg || 74.5) / (heightMeters * heightMeters)).toFixed(1);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-tr from-health-600 to-emerald-400 rounded-2xl text-slate-950 font-bold shadow-lg">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Patient Profile & Biometrics
          </h1>
          <p className="text-xs text-slate-400">
            Manage your personal baseline parameters & active clinical session
          </p>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-health-500 to-emerald-400 flex items-center justify-center text-slate-950 font-extrabold text-2xl shadow-lg">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.displayName || 'Alex Morgan'}</h2>
              <p className="text-xs text-slate-400">{user?.email}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-health-500/10 text-health-300 border border-health-500/20">
                  {isDemoMode ? 'Demo Evaluator Session' : 'Firebase Verified'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/assessment')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-health-300 font-semibold rounded-xl text-xs border border-health-500/30 flex items-center gap-2 transition-all"
          >
            <ClipboardList className="w-4 h-4 text-health-400" />
            Update Assessment
          </button>
        </div>

        {/* Biometrics Summary Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Baseline Biometrics Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Age</span>
              <span className="text-lg font-bold text-white">{profile.age || 38} yrs</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Weight</span>
              <span className="text-lg font-bold text-white">{profile.weightKg || 74.5} kg</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Height</span>
              <span className="text-lg font-bold text-white">{profile.heightCm || 165} cm</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Body Mass Index</span>
              <span className="text-lg font-bold text-emerald-400">{bmi} kg/m²</span>
            </div>
          </div>
        </div>

        {/* Clinical Profile Details */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-health-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Clinical Metabolic Classification:</span>
          </div>
          <p className="text-sm font-semibold text-white">
            {profile.diagnosis || 'Stage 1 NAFLD & Mild Insulin Resistance'}
          </p>
          <p className="text-xs text-slate-400">
            Metabolic Health Score: <strong>{profile.metabolicScore || 74}/100</strong>
          </p>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold rounded-xl text-xs border border-rose-500/30 flex items-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Session
          </button>
        </div>
      </div>
    </div>
  );
}
