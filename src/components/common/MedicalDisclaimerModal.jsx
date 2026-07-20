import React from 'react';
import { AlertTriangle, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MedicalDisclaimerModal() {
  const { disclaimerAccepted, acceptDisclaimer } = useAuth();

  if (disclaimerAccepted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl p-6 sm:p-8 border border-health-500/30 shadow-2xl overflow-hidden">
        {/* Glowing top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-health-400 to-emerald-400"></div>

        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Educational & Clinical Compliance Notice
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Medical Disclaimer & Terms of Use
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 mb-6">
          <p className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 text-slate-200">
            Welcome to the <strong>GlycaCare Metabolic Health Platform</strong>. Before accessing your health dashboard, AI recommendations, and lab analytics, please carefully review the following mandatory clinical notice:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <FileText className="w-5 h-5 text-health-400 shrink-0 mt-0.5" />
              <span>
                <strong>Educational Purpose Only:</strong> All content, algorithms, HOMA-IR calculations, 7-day diet plans, and Yoga regimens provided in this application are for informational and self-monitoring purposes.
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <FileText className="w-5 h-5 text-health-400 shrink-0 mt-0.5" />
              <span>
                <strong>No Medical Advice:</strong> This platform is not a substitute for professional medical advice, diagnosis, or treatment. Never disregard or delay professional medical advice because of something presented on this dashboard.
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <FileText className="w-5 h-5 text-health-400 shrink-0 mt-0.5" />
              <span>
                <strong>Consultation Recommended:</strong> Always consult your physician, endocrinologist, or registered dietitian before changing your diet, supplement routine, or physical exercise program, especially if you have diagnosed Type 2 Diabetes, Stage 2/3 NAFLD, or severe metabolic risk.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Mandatory check upon initial login
          </span>
          <button
            onClick={acceptDisclaimer}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-health-500 to-emerald-500 hover:from-health-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-health-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
