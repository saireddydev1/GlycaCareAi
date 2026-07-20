import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, Pause, RotateCcw, ShieldCheck, Zap, Info, Heart, Activity } from 'lucide-react';

export default function InsulinLiver3D() {
  const [healingProgress, setHealingProgress] = useState(45);
  const [isAutoHealing, setIsAutoHealing] = useState(true);
  const [selectedStructure, setSelectedStructure] = useState('rightLobe');
  const canvasRef = useRef(null);

  // Auto-healing cycle interval
  useEffect(() => {
    let interval;
    if (isAutoHealing) {
      interval = setInterval(() => {
        setHealingProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [isAutoHealing]);

  // Particle Canvas Overlay Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = canvas.parentElement.clientWidth || 600);
    const height = (canvas.height = 360);

    // Generate biophotonic glutathione healing sparkles & fat droplets
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.5,
      speedY: - (Math.random() * 0.8 + 0.4),
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      isGlutathione: Math.random() > 0.3
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isGlutathione) {
          // Green/Teal Glutathione Healing Sparkle
          ctx.fillStyle = `rgba(45, 212, 191, ${p.opacity * (healingProgress / 100 + 0.2)})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#2dd4bf';
        } else {
          // Yellow Dissolving Fatty Droplet
          ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity * (1 - healingProgress / 100)})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#f59e0b';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [healingProgress]);

  // Interpolate tissue colors based on healing progress
  const factor = healingProgress / 100;

  // Healthy tissue color vs Fatty Steatotic color
  // Fatty: #d97706 / #b45309 -> Healthy: #881337 / #991b1b
  const organFillPrimary = factor > 0.7 ? '#881337' : factor > 0.3 ? '#b45309' : '#d97706';
  const organFillSecondary = factor > 0.7 ? '#991b1b' : factor > 0.3 ? '#d97706' : '#f59e0b';

  const structures = {
    rightLobe: {
      title: "Right Hepatic Lobe",
      desc: "Primary site of lipid accumulation in Stage 1/2 NAFLD. Responsive to low-GI fiber lipolysis.",
      status: factor > 0.5 ? "Clearing Steatosis" : "Elevated Lipid Deposits"
    },
    leftLobe: {
      title: "Left Hepatic Lobe",
      desc: "Smaller tapered lobe containing major bile duct arborizations. Massaged by Dhanurasana pose.",
      status: factor > 0.5 ? "Optimal Parenchyma" : "Mild Fat Accumulation"
    },
    falciform: {
      title: "Falciform Ligament",
      desc: "Peritoneal fold dividing right and left lobes, attaching the liver to the anterior abdominal wall.",
      status: "Anatomical Boundary"
    },
    portalVein: {
      title: "Hepatic Portal Vein & Artery",
      desc: "Carries nutrient-rich blood from stomach and intestines. High insulin surges spike portal glucose.",
      status: factor > 0.5 ? "Normal Portal Flow" : "High Insulin Pressure"
    },
    gallbladder: {
      title: "Gallbladder",
      desc: "Stores concentrated bile for emulsifying healthy MUFA fats from your 7-day low-GI meal plan.",
      status: "Active Bile Storage"
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-health-500/50 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-health-950/50 flex flex-col justify-between">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-health-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-20">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-health-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Medical Organ Simulation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 tracking-tight flex items-center gap-2">
            Anatomical Human Liver Self-Healing Engine
          </h3>
        </div>

        {/* Healing Auto-Play Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsAutoHealing(!isAutoHealing)}
            className={`
              px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-md
              ${isAutoHealing
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}
            `}
          >
            {isAutoHealing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isAutoHealing ? 'Pause Healing Cycle' : 'Play Self-Healing'}</span>
          </button>

          <button
            onClick={() => setHealingProgress(0)}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition-colors"
            title="Reset to 0% Steatosis"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ANATOMICAL HUMAN LIVER SVG & CANVAS CONTAINER */}
      <div className="relative w-full h-80 sm:h-96 flex items-center justify-center my-3 overflow-hidden rounded-2xl bg-slate-950/60 border border-slate-800/80">
        {/* Canvas for Glutathione Sparkle Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* Regeneration Percentage Overlay Ring */}
        <div className="absolute top-3 right-3 z-20 p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-center backdrop-blur-md space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hepatic Regeneration</span>
          <p className="text-3xl font-black text-white">{healingProgress}%</p>
          <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 via-teal-400 to-emerald-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${healingProgress}%` }}
            />
          </div>
        </div>

        {/* Selected Anatomical Structure Info Box */}
        <div className="absolute top-3 left-3 z-20 p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 max-w-xs backdrop-blur-md space-y-1 hidden sm:block">
          <span className="text-[10px] uppercase font-bold text-health-400 tracking-wider">Structure Focus</span>
          <h4 className="text-xs font-bold text-white">{structures[selectedStructure].title}</h4>
          <p className="text-[11px] text-slate-300 leading-tight">{structures[selectedStructure].desc}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Status: {structures[selectedStructure].status}
          </span>
        </div>

        {/* HIGH-ACCURACY ANATOMICAL HUMAN LIVER VECTOR GRAPHIC */}
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full max-h-[340px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-all duration-500"
        >
          <defs>
            {/* Healthy Reddish Burgundy Tissue Gradient */}
            <radialGradient id="healthyTissueGrad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#be123c" />
              <stop offset="45%" stopColor="#881337" />
              <stop offset="85%" stopColor="#4c0519" />
              <stop offset="100%" stopColor="#2e020d" />
            </radialGradient>

            {/* Fatty Steatotic Yellowish-Brown Tissue Gradient */}
            <radialGradient id="fattyTissueGrad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="40%" stopColor="#d97706" />
              <stop offset="80%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>

            {/* Vessel Gradients */}
            <linearGradient id="portalVeinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="hepaticArteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <linearGradient id="gallbladderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Healing Wave Clip Filter */}
            <linearGradient id="healingWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${Math.max(0, healingProgress - 15)}%`} stopColor="#000" stopOpacity="0" />
              <stop offset={`${healingProgress}%`} stopColor="#2dd4bf" stopOpacity="0.8" />
              <stop offset={`${Math.min(100, healingProgress + 15)}%`} stopColor="#000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Base Anatomical Liver Outline Path (Right Lobe Dome, Left Lobe Taper, Inferior Visceral Notch) */}
          <g className="transition-all duration-700">
            {/* Fatty Base Organ Layer */}
            <path
              d="M 220 220 
                 C 200 120, 320 60, 480 60 
                 C 620 60, 690 120, 710 200 
                 C 730 280, 680 360, 610 390 
                 C 540 420, 460 400, 390 415 
                 C 320 430, 240 400, 180 340 
                 C 130 290, 150 220, 220 220 Z"
              fill="url(#fattyTissueGrad)"
              stroke="#78350f"
              strokeWidth="4"
            />

            {/* Self-Healed Organ Layer (Revealed progressively by opacity = factor) */}
            <path
              d="M 220 220 
                 C 200 120, 320 60, 480 60 
                 C 620 60, 690 120, 710 200 
                 C 730 280, 680 360, 610 390 
                 C 540 420, 460 400, 390 415 
                 C 320 430, 240 400, 180 340 
                 C 130 290, 150 220, 220 220 Z"
              fill="url(#healthyTissueGrad)"
              stroke="#881337"
              strokeWidth="4"
              opacity={factor}
              className="transition-opacity duration-300"
            />
          </g>

          {/* 2. Active Healing Sweep Wave Overlay */}
          <rect
            x="120"
            y="50"
            width="620"
            height="380"
            fill="url(#healingWaveGrad)"
            pointerEvents="none"
          />

          {/* 3. Anatomical Fatty Nodules (Dissolve as factor increases) */}
          <g opacity={1 - factor} className="transition-opacity duration-500">
            <circle cx="340" cy="180" r="18" fill="#fef08a" opacity="0.6" />
            <circle cx="420" cy="240" r="24" fill="#fde047" opacity="0.7" />
            <circle cx="520" cy="190" r="15" fill="#fef08a" opacity="0.5" />
            <circle cx="480" cy="300" r="20" fill="#fde047" opacity="0.6" />
            <circle cx="280" cy="270" r="14" fill="#fef08a" opacity="0.6" />
          </g>

          {/* 4. Anatomical Vessels & Structures */}
          {/* Hepatic Portal Vein (Blue) */}
          <path
            d="M 430 400 C 420 340, 400 300, 390 250"
            fill="none"
            stroke="url(#portalVeinGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            onClick={() => setSelectedStructure('portalVein')}
            className="cursor-pointer hover:stroke-cyan-300 transition-colors"
          />

          {/* Hepatic Artery (Red) */}
          <path
            d="M 450 400 C 440 340, 430 300, 420 240"
            fill="none"
            stroke="url(#hepaticArteryGrad)"
            strokeWidth="12"
            strokeLinecap="round"
            onClick={() => setSelectedStructure('portalVein')}
            className="cursor-pointer hover:stroke-rose-300 transition-colors"
          />

          {/* Gallbladder (Green) */}
          <path
            d="M 490 380 Q 520 410 540 370 Q 520 330 490 380 Z"
            fill="url(#gallbladderGrad)"
            stroke="#047857"
            strokeWidth="3"
            onClick={() => setSelectedStructure('gallbladder')}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          />

          {/* Falciform Ligament Divider Line */}
          <path
            d="M 470 60 C 450 160, 430 260, 420 360"
            fill="none"
            stroke="#fecdd3"
            strokeWidth="4"
            strokeDasharray="6,4"
            opacity="0.7"
            onClick={() => setSelectedStructure('falciform')}
            className="cursor-pointer"
          />

          {/* 5. Clickable Anatomical Feature Hotspot Buttons */}
          {/* Right Lobe Hotspot */}
          <g
            onClick={() => setSelectedStructure('rightLobe')}
            className="cursor-pointer group"
            transform="translate(340, 150)"
          >
            <circle r="14" fill="#0f172a" stroke="#2dd4bf" strokeWidth="2.5" className="group-hover:scale-125 transition-transform" />
            <circle r="6" fill="#2dd4bf" className="animate-ping" />
            <text x="22" y="5" fill="#ffffff" fontSize="14" fontWeight="bold">Right Lobe</text>
          </g>

          {/* Left Lobe Hotspot */}
          <g
            onClick={() => setSelectedStructure('leftLobe')}
            className="cursor-pointer group"
            transform="translate(590, 220)"
          >
            <circle r="14" fill="#0f172a" stroke="#34d399" strokeWidth="2.5" className="group-hover:scale-125 transition-transform" />
            <circle r="6" fill="#34d399" className="animate-ping" />
            <text x="22" y="5" fill="#ffffff" fontSize="14" fontWeight="bold">Left Lobe</text>
          </g>

          {/* Gallbladder Hotspot */}
          <g
            onClick={() => setSelectedStructure('gallbladder')}
            className="cursor-pointer group"
            transform="translate(515, 385)"
          >
            <circle r="12" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
            <text x="18" y="4" fill="#34d399" fontSize="12" fontWeight="bold">Gallbladder</text>
          </g>
        </svg>
      </div>

      {/* Interactive Healing Stage Range Slider */}
      <div className="space-y-2 relative z-20 pt-3 border-t border-slate-800">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            Drag Slider to Control Liver Healing Stage:
          </span>
          <span className={`font-extrabold text-sm ${healingProgress > 70 ? 'text-emerald-400' : healingProgress > 35 ? 'text-teal-300' : 'text-amber-400'}`}>
            {healingProgress === 100 ? '100% Fully Regenerated' : `${healingProgress}% Fat Cleared`}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={healingProgress}
          onChange={(e) => {
            setIsAutoHealing(false);
            setHealingProgress(Number(e.target.value));
          }}
          className="w-full accent-health-500 cursor-pointer bg-slate-800 rounded-lg h-2.5"
        />

        <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
          <span className="text-amber-400 font-semibold">0% (Stage 2 NAFLD / Steatosis)</span>
          <span className="text-teal-300 font-semibold">50% (Active ALT Enzyme Reduction)</span>
          <span className="text-emerald-400 font-semibold">100% (Normal Hepatic Parenchyma)</span>
        </div>
      </div>

      {/* Clinical Rationale Footer */}
      <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3 relative z-20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
          <span>
            <strong>Clinical Self-Healing Mechanism:</strong> Low-GI nutrition & abdominal yoga twist postures compress visceral fat, massaged hepatic portal veins, and stimulate intracellular glutathione lipolysis.
          </span>
        </div>
        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0 hidden sm:inline-block">
          Active Autophagy
        </span>
      </div>
    </div>
  );
}
