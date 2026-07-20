import React, { useState } from 'react';
import { X, Activity, Utensils, Flame, CheckCircle2 } from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export default function QuickLogModal({ isOpen, onClose }) {
  const { addDailyLog } = useHealthData();
  const [logType, setLogType] = useState('Fasting Glucose');
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    addDailyLog(logType, value, note);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setValue('');
      setNote('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 border border-health-500/30 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-health-500/10 text-health-400 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Log Daily Metric</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-white">Metric Logged Successfully!</h4>
            <p className="text-xs text-slate-400">Dashboard charts & metabolic indicators updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Metric Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Fasting Glucose', label: 'Glucose', icon: Activity },
                  { id: 'Lunch Log', label: 'Meal', icon: Utensils },
                  { id: 'Yoga Session', label: 'Yoga', icon: Flame }
                ].map(item => {
                  const Icon = item.icon;
                  const selected = logType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLogType(item.id)}
                      className={`
                        p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all
                        ${selected 
                          ? 'bg-health-500/20 border-health-500/60 text-health-300 shadow-sm' 
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'}
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {logType === 'Fasting Glucose' ? 'Blood Glucose Value (mg/dL)' : logType === 'Lunch Log' ? 'Meal Type / GI Level' : 'Session Duration'}
              </label>
              <input
                type="text"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={logType === 'Fasting Glucose' ? 'e.g. 96' : logType === 'Lunch Log' ? 'e.g. Salmon Avocado Bowl (Low GI)' : 'e.g. 25 mins Dhanurasana'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-health-500 focus:ring-1 focus:ring-health-500 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Notes / Context (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. After 14hr fast, feeling energetic"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-health-500 focus:ring-1 focus:ring-health-500 placeholder-slate-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-health-500 to-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-health-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Save & Update Charts
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
