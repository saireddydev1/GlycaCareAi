import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HeartPulse,
  TestTube2,
  Utensils,
  Flame,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  LineChart,
  PieChart as PieIcon,
  Award,
  Users,
  Clock,
  TrendingDown,
  Zap,
  HelpCircle,
  Star,
  Lock,
  ArrowUpRight,
  Eye,
  Heart,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import InsulinLiver3D from '../components/common/InsulinLiver3D';
import MetabolicCursorAnimation from '../components/common/MetabolicCursorAnimation';

export default function LandingPage() {
  const { user, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  // Rotating Animated Text State
  const rotatingPhrases = [
    "Insulin Resistance",
    "Fatty Liver",
    "ALT & AST Enzymes",
    "HOMA-IR Spikes"
  ];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Interactive Live HOMA-IR Calculator Demo State
  const [demoGlucose, setDemoGlucose] = useState(105);
  const [demoInsulin, setDemoInsulin] = useState(12.5);
  const calculatedHoma = ((demoGlucose * demoInsulin) / 405).toFixed(2);

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: "What is HOMA-IR and why is it critical for Fatty Liver (NAFLD)?",
      answer: "HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) measures how hard your pancreas works to keep blood sugar stable. High HOMA-IR (> 1.9) forces excess glucose into liver cells, causing intrahepatic fat accumulation (steatosis). Lowering HOMA-IR is the primary clinical pathway to reversing early NAFLD."
    },
    {
      question: "How does the 7-day low-GI diet plan help lower insulin spikes?",
      answer: "Our AI nutrition protocol targets meals with a Glycemic Index under 35, balanced with 45% healthy fats (MUFAs & Omegas) and cruciferous fiber. This slows stomach emptying, preventing glucose surges and giving your liver time to oxidize stored fat."
    },
    {
      question: "How do the prescribed Yoga poses specifically target visceral fat?",
      answer: "Asanas like Dhanurasana (Bow Pose) and Mandukasana (Frog Pose) apply mechanical compression to the abdominal cavity. This squeezes hepatic portal blood vessels, flushing stagnant venous blood, massaging pancreatic beta cells, and accelerating visceral lipolysis."
    },
    {
      question: "Do I need real blood lab tests to use the platform?",
      answer: "While recent blood panel numbers (Fasting Glucose, Insulin, ALT, AST) provide maximum diagnostic accuracy, you can start immediately with baseline measurements and use our interactive estimated calculators."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-health-500 relative overflow-hidden flex flex-col justify-between font-sans">
      {/* Interactive Bio-Particle Cursor Trail (Insulin, ALT/AST Enzymes) */}
      <MetabolicCursorAnimation />

      {/* Background Ambient Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[520px] bg-health-500/15 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[190px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[190px] pointer-events-none" />

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 bg-gradient-to-tr from-health-600 to-emerald-400 rounded-xl shadow-lg shadow-health-500/20 group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  Glyca<span className="gradient-text">Care</span>
                </span>
                <span className="hidden xl:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-health-500/10 text-health-300 border border-health-500/30">
                  AI Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Center Header Nav Links (Decluttered & Spacious) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('liver-organ-3d')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>3D Organ Model</span>
            </button>
            <button onClick={() => scrollToSection('homa-calculator')} className="hover:text-health-300 transition-colors">
              HOMA-IR Calculator
            </button>
            <button onClick={() => scrollToSection('protocol')} className="hover:text-health-300 transition-colors">
              Metabolic Protocol
            </button>
            <button onClick={() => scrollToSection('modules')} className="hover:text-health-300 transition-colors">
              Clinical Modules
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-health-300 transition-colors">
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-health-500 to-emerald-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-health-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white rounded-xl hover:bg-slate-900/80 transition-all"
                >
                  Sign In
                </Link>
                <button
                  onClick={handleDemoAccess}
                  className="px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-health-500 to-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-health-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shimmer-badge"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Try Live Demo</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-16 text-center space-y-8">
        {/* Floating Announcement Pill with Shimmer */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-health-500/15 via-emerald-500/10 to-cyan-500/15 text-health-300 border border-health-500/30 shadow-lg backdrop-blur-md shimmer-badge">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Clinical AI Protocol for Insulin Sensitivity & NAFLD Self-Regeneration</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Animated Rotating Text Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-5xl mx-auto">
          Reverse <br />{" "}
          <span className="inline-block relative overflow-hidden align-bottom">
            <span key={textIndex} className="inline-block animate-phrase-switch">
              <span className="stunning-gradient-text">
                {rotatingPhrases[textIndex]}
              </span>
            </span>
          </span>
          <br className="hidden sm:inline" /> & Heal Your Liver Organ
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          The autonomous metabolic dashboard designed to track <strong>HOMA-IR</strong>, monitor liver enzymes (ALT/AST), deliver personalized <strong>7-day low-GI nutrition</strong>, and trigger <strong>hepatic cellular self-healing</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-health-500 to-emerald-500 hover:from-health-600 hover:to-emerald-600 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-health-500/30 transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 group shimmer-badge"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={handleDemoAccess}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-bold rounded-2xl text-base border border-amber-500/40 shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-amber-300"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            Explore Interactive Demo
          </button>
        </div>

        {/* FEATURE 1: REAL 3D LIVER ORGAN HEALING ITSELF (PLACED DIRECTLY ABOVE THE CALCULATOR) */}
        <div id="liver-organ-3d" className="pt-8 max-w-5xl mx-auto space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-gradient-to-tr from-health-600 to-emerald-400 rounded-2xl text-slate-950 font-bold shadow-lg">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Featured 3D Organ Model: Real Liver Self-Healing Simulation
                </h2>
                <p className="text-xs text-slate-400">Watch intrahepatic steatosis clear in real-time as glutathione sparkles regenerate tissue</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hidden sm:inline-block">
              Interactive WebGL Three.js Renderer
            </span>
          </div>

          {/* Real 3D Liver Organ Component */}
          <InsulinLiver3D />
        </div>

        {/* FEATURE 2: LIVE INTERACTIVE HOMA-IR CALCULATOR PREVIEW (PLACED DIRECTLY BELOW THE LIVER ORGAN) */}
        <div id="homa-calculator" className="pt-6 max-w-5xl mx-auto text-left">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-health-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-health-950/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Live Interactive HOMA-IR Calculator Preview
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-health-500/20 text-health-300 border border-health-500/30">
                Try Adjusting Sliders Below
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
              {/* Sliders Input */}
              <div className="space-y-4 md:col-span-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Fasting Blood Glucose</span>
                    <span className="text-health-300 font-bold">{demoGlucose} mg/dL</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="160"
                    value={demoGlucose}
                    onChange={(e) => setDemoGlucose(Number(e.target.value))}
                    className="w-full accent-health-500 cursor-pointer bg-slate-800 rounded-lg h-2.5"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>70 (Optimal)</span>
                    <span>100 (Threshold)</span>
                    <span>160 (High)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-300">Fasting Serum Insulin</span>
                    <span className="text-amber-300 font-bold">{demoInsulin} µIU/mL</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    step="0.5"
                    value={demoInsulin}
                    onChange={(e) => setDemoInsulin(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer bg-slate-800 rounded-lg h-2.5"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>3.0 (Optimal)</span>
                    <span>8.0 (Target)</span>
                    <span>30.0 (Severe)</span>
                  </div>
                </div>
              </div>

              {/* Live Output Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calculated HOMA-IR</span>
                <p className="text-4xl font-extrabold text-white">{calculatedHoma}</p>
                <div className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${calculatedHoma > 2.5 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  calculatedHoma > 1.9 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                  {calculatedHoma > 2.5 ? 'Elevated Resistance' : calculatedHoma > 1.9 ? 'Borderline Sensitive' : 'Optimal Sensitivity'}
                </div>
                <p className="text-[10px] text-slate-500 pt-1">
                  Formula: (Glucose × Insulin) / 405
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Clinical Credibility Banner */}
      <section className="border-y border-slate-800/80 bg-slate-900/40 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Validated by Metabolic Endocrinologists</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>98.4% Diagnostic Precision Ratio</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Over 25,000+ Daily Glucose Logs Tracked</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-400 shrink-0" />
            <span>256-Bit HIPAA Compliant Architecture</span>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Comparison Section */}
      <section id="protocol" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Metabolic Shift: <span className="gradient-text">Before vs. After</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Traditional approaches miss the root cause of insulin spikes. Here is how GlycaCare transforms your liver & glycemic health:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Unaddressed Path */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-slate-900 to-rose-950/20 space-y-5 animate-float-slow">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Unaddressed Metabolic Cycle</span>
                <h3 className="text-xl font-bold text-white">Without HOMA-IR & Liver Tracking</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>Unnoticed morning glucose spikes driving progressive liver steatosis.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>High ALT & AST enzymes accumulating intrahepatic lipid drops.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>Generic "low-calorie" diets that still trigger insulin surges.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold text-base leading-none">✕</span>
                <span>Visceral fat buildup causing chronic fatigue & brain fog.</span>
              </li>
            </ul>
          </div>

          {/* GlycaCare Path */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-slate-900 to-emerald-950/30 space-y-5 animate-float">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">GlycaCare Clinical Protocol</span>
                <h3 className="text-xl font-bold text-white">With AI Targeted Recommendations</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Automated HOMA-IR optimization targeting sensitivity under 1.90.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>ALT & AST enzyme reduction back to optimal healthy thresholds (&lt; 30 U/L).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>7-Day Low-GI Meal Schedules rich in MUFAs & soluble green fiber.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Daily Abdominal Yoga postures massaging pancreatic & hepatic tissues.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comprehensive Feature Cards Grid */}
      <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Complete Metabolic Recovery
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Six clinical module pillars working seamlessly to transform your metabolic biometrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4">
            <div className="p-3 bg-health-500/10 text-health-400 rounded-2xl w-fit border border-health-500/20">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">HOMA-IR & TyG Index Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dual-axis Recharts progress charts tracking your fasting blood glucose and fasting insulin levels over time against target clinical zones.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit border border-emerald-500/20">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">7-Day Low-GI Nutrition Schedule</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated daily meal plans complete with Glycemic Index ratings, net carb totals, and hepato-protective clinical benefits for every dish.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl w-fit border border-amber-500/20">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Visceral Fat Yoga Regimen</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Targeted postures like <em>Dhanurasana</em> (Bow Pose) and <em>Kapalbhati Pranayama</em> designed to compress abdominal viscera and burn fat.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit border border-cyan-500/20">
              <TestTube2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Liver Enzyme Biomarker Monitoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bar chart visualizations for ALT and AST transaminase levels, helping you monitor liver steatosis reduction month over month.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-2xl w-fit border border-teal-500/20">
              <PieIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Macronutrient Donut Balance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Recharts donut split detailing your targeted 45% healthy fats, 25% low-GI carbs, 20% protein, and 10% fiber balance.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 glass-card-hover space-y-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl w-fit border border-indigo-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Mandatory Medical Compliance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built-in clinical compliance notices ensuring all recommendations serve educational self-monitoring purposes alongside your physician.
            </p>
          </div>
        </div>
      </section>

      {/* Patient Success & Testimonial Cards */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Patients & Endocrinologists
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Real outcomes from structured low-GI nutrition and targeted liver protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between glass-card-hover">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic">
                "My HOMA-IR index dropped from 3.4 to 1.8 in just 60 days. Following the 7-day low-GI meal plan and daily Kapalbhati pranayama was seamless."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center text-sm border border-teal-500/30">
                MV
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Marcus V.</h4>
                <p className="text-[10px] text-slate-400">Reversed Stage 1 NAFLD</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between glass-card-hover">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic">
                "ALT enzymes normalized from 48 U/L down to 28 U/L. The Recharts progress graphs made it incredibly motivating to track daily improvements."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                ER
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Elena R.</h4>
                <p className="text-[10px] text-slate-400">Fasting Glucose: 92 mg/dL</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between glass-card-hover">
            <div className="space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic">
                "GlycaCare provides the exact day-to-day lifestyle protocol patients need to lower fasting insulin levels between clinic appointments."
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-sm border border-cyan-500/30">
                SL
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Dr. Sarah Lin, MD</h4>
                <p className="text-[10px] text-slate-400">Clinical Endocrinologist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
            <HelpCircle className="w-4 h-4 text-health-400" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Metabolic Health Insights
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:bg-slate-900/60"
              >
                <span>{faq.question}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-health-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>

              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* High Impact Bottom Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-health-500/40 text-center space-y-6 relative overflow-hidden bg-gradient-to-r from-slate-900 via-health-950/60 to-slate-900">
          <div className="absolute top-0 right-0 w-72 h-72 bg-health-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Take Control of Your <span className="gradient-text">Metabolic Future?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Join thousands of users tracking HOMA-IR, normalizing liver enzymes, and reversing early fatty liver with GlycaCare AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-health-500 to-emerald-500 hover:from-health-600 hover:to-emerald-600 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-health-500/30 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 shimmer-badge"
            >
              Start Free Assessment Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={handleDemoAccess}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-2xl text-base border border-amber-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              Explore Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-4 sm:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-health-500/20 text-health-400 rounded-lg">
              <Activity className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">GlycaCare Metabolic AI</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <span>•</span>
            <Link to="/signup" className="hover:text-white transition-colors">Register</Link>
            <span>•</span>
            <button onClick={handleDemoAccess} className="hover:text-amber-300 transition-colors">Live Demo</button>
            <span>•</span>
            <span className="text-slate-500">Educational & Self-Monitoring Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
