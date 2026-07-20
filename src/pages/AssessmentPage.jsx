import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthData } from '../context/HealthDataContext';
import StepBaseline from '../components/assessment/StepBaseline';
import StepLabMetrics from '../components/assessment/StepLabMetrics';
import StepLifestyle from '../components/assessment/StepLifestyle';
import StepSummary from '../components/assessment/StepSummary';
import { ArrowLeft, ArrowRight, Check, ClipboardList } from 'lucide-react';

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { healthData, saveAssessmentResults } = useHealthData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => ({
    age: healthData?.userProfile?.age || 38,
    gender: healthData?.userProfile?.gender || 'Female',
    weightKg: healthData?.userProfile?.weightKg || 74.5,
    heightCm: healthData?.userProfile?.heightCm || 165,
    activityLevel: 'Moderately Active',
    fastingGlucose: healthData?.currentMetrics?.fastingGlucose?.value || 98,
    fastingInsulin: healthData?.currentMetrics?.fastingInsulin?.value || 11.2,
    alt: healthData?.currentMetrics?.alt?.value || 38,
    ast: healthData?.currentMetrics?.ast?.value || 27,
    triglycerides: healthData?.currentMetrics?.triglycerides?.value || 165,
    hdl: healthData?.currentMetrics?.hdl?.value || 48,
    fastingWindow: '14:10',
    sleepHours: '7-8',
    dietPreference: 'Mediterranean Low-GI',
    nafldStatus: 'Diagnosed Stage 1 NAFLD'
  }));

  const updateForm = (fieldObj) => {
    setFormData(prev => ({ ...prev, ...fieldObj }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmit = () => {
    saveAssessmentResults(formData);
    navigate('/dashboard');
  };

  const steps = [
    { number: 1, title: 'Biometrics' },
    { number: 2, title: 'Lab Markers' },
    { number: 3, title: 'Lifestyle' },
    { number: 4, title: 'AI Review' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-tr from-health-600 to-emerald-400 rounded-2xl shadow-lg text-slate-950 font-bold">
          <ClipboardList className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Metabolic Health Assessment
          </h1>
          <p className="text-xs text-slate-400">
            Multi-step diagnostic wizard for HOMA-IR calculation & liver steatosis risk scoring
          </p>
        </div>
      </div>

      {/* Progress Steps Indicator */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center gap-1.5">
                <div 
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300
                    ${currentStep > step.number 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                      : currentStep === step.number 
                        ? 'bg-health-500 text-white ring-4 ring-health-500/20 shadow-md shadow-health-500/30' 
                        : 'bg-slate-900 border border-slate-700 text-slate-500'}
                  `}
                >
                  {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                </div>
                <span className={`text-[11px] font-semibold hidden sm:inline ${
                  currentStep === step.number ? 'text-health-300' : 'text-slate-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded ${
                  currentStep > idx + 1 ? 'bg-emerald-500' : 'bg-slate-800'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Form Body */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
        {currentStep === 1 && <StepBaseline formData={formData} updateForm={updateForm} />}
        {currentStep === 2 && <StepLabMetrics formData={formData} updateForm={updateForm} />}
        {currentStep === 3 && <StepLifestyle formData={formData} updateForm={updateForm} />}
        {currentStep === 4 && <StepSummary formData={formData} onComplete={handleFinalSubmit} />}

        {/* Wizard Controls */}
        {currentStep < 4 && (
          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentStep === 1 
                  ? 'opacity-40 cursor-not-allowed text-slate-600' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-health-500 to-emerald-500 hover:from-health-600 hover:to-emerald-600 text-white font-semibold rounded-xl text-xs shadow-md shadow-health-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue to Step {currentStep + 1}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
