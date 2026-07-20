import React, { createContext, useContext, useState, useEffect } from 'react';
import initialMockData from '../data/mockBackendData.json';

const HealthDataContext = createContext();

export const useHealthData = () => useContext(HealthDataContext);

export const HealthDataProvider = ({ children }) => {
  const [healthData, setHealthData] = useState(() => {
    const saved = localStorage.getItem('health_platform_data');
    return saved ? JSON.parse(saved) : initialMockData;
  });

  useEffect(() => {
    localStorage.setItem('health_platform_data', JSON.stringify(healthData));
  }, [healthData]);

  // HOMA-IR formula: (Fasting Glucose mg/dL * Fasting Insulin µIU/mL) / 405
  const calculateHomaIR = (glucose, insulin) => {
    if (!glucose || !insulin) return null;
    const homa = (parseFloat(glucose) * parseFloat(insulin)) / 405;
    return parseFloat(homa.toFixed(2));
  };

  // TyG Index formula: ln[Fasting Triglycerides (mg/dL) * Fasting Glucose (mg/dL) / 2]
  const calculateTyGIndex = (triglycerides, glucose) => {
    if (!triglycerides || !glucose) return null;
    const tyg = Math.log((parseFloat(triglycerides) * parseFloat(glucose)) / 2);
    return parseFloat(tyg.toFixed(2));
  };

  // Function to add a daily glucose or meal log
  const addDailyLog = (type, value, note) => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      value,
      note: note || '',
      status: 'optimal'
    };

    setHealthData(prev => {
      const updatedLogs = [newLog, ...prev.recentLogs];
      
      // If it's a glucose log, update current metrics & trend chart
      let updatedMetrics = { ...prev.currentMetrics };
      let updatedTrend = [...prev.glucoseTrend];

      if (type === 'Fasting Glucose' || type === 'Blood Glucose') {
        const numericVal = parseFloat(value);
        if (!isNaN(numericVal)) {
          updatedMetrics.fastingGlucose = {
            ...updatedMetrics.fastingGlucose,
            value: numericVal,
            status: numericVal > 100 ? (numericVal > 125 ? 'high' : 'warning') : 'normal'
          };

          const todayLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
          const newHoma = calculateHomaIR(numericVal, updatedMetrics.fastingInsulin?.value || 11.2) || 2.7;

          updatedTrend.push({
            date: todayLabel,
            glucose: numericVal,
            homaIR: newHoma,
            target: 100
          });

          // Keep last 10 entries
          if (updatedTrend.length > 10) updatedTrend.shift();
        }
      }

      return {
        ...prev,
        recentLogs: updatedLogs,
        currentMetrics: updatedMetrics,
        glucoseTrend: updatedTrend
      };
    });
  };

  // Function to update user assessment & recalculate risk markers
  const saveAssessmentResults = (formData) => {
    const glucose = parseFloat(formData.fastingGlucose || 98);
    const insulin = parseFloat(formData.fastingInsulin || 11.2);
    const alt = parseFloat(formData.alt || 38);
    const ast = parseFloat(formData.ast || 27);
    const tri = parseFloat(formData.triglycerides || 165);
    const hdl = parseFloat(formData.hdl || 48);

    const homaIR = calculateHomaIR(glucose, insulin) || 2.71;
    const tyg = calculateTyGIndex(tri, glucose) || 4.65;

    // Calculate score out of 100
    let score = 100;
    if (homaIR > 1.9) score -= 15;
    if (homaIR > 2.9) score -= 15;
    if (alt > 30) score -= 15;
    if (tri > 150) score -= 10;
    if (hdl < 50) score -= 5;
    score = Math.max(30, Math.min(100, score));

    setHealthData(prev => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        age: formData.age || prev.userProfile.age,
        weightKg: formData.weightKg || prev.userProfile.weightKg,
        heightCm: formData.heightCm || prev.userProfile.heightCm,
        metabolicScore: score,
        diagnosis: homaIR > 2.5 ? "Elevated Insulin Resistance & NAFLD Risk" : "Optimizing Metabolic Sensitivity"
      },
      currentMetrics: {
        ...prev.currentMetrics,
        fastingGlucose: { ...prev.currentMetrics.fastingGlucose, value: glucose, status: glucose > 100 ? 'warning' : 'normal' },
        fastingInsulin: { ...prev.currentMetrics.fastingInsulin, value: insulin, status: insulin > 8 ? 'warning' : 'normal' },
        homaIR: { ...prev.currentMetrics.homaIR, value: homaIR, status: homaIR > 1.9 ? 'warning' : 'normal' },
        alt: { ...prev.currentMetrics.alt, value: alt, status: alt > 30 ? 'warning' : 'normal' },
        ast: { ...prev.currentMetrics.ast, value: ast, status: ast > 30 ? 'warning' : 'normal' },
        triglycerides: { ...prev.currentMetrics.triglycerides, value: tri, status: tri > 150 ? 'warning' : 'normal' },
        hdl: { ...prev.currentMetrics.hdl, value: hdl, status: hdl < 50 ? 'warning' : 'normal' }
      },
      assessmentData: formData
    }));
  };

  const value = {
    healthData,
    addDailyLog,
    saveAssessmentResults,
    calculateHomaIR,
    calculateTyGIndex
  };

  return (
    <HealthDataContext.Provider value={value}>
      {children}
    </HealthDataContext.Provider>
  );
};
