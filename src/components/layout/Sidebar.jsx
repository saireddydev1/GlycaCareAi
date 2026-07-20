import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  LayoutDashboard, 
  ClipboardList, 
  Sparkles, 
  TestTube2, 
  User, 
  ShieldCheck,
  TrendingDown,
  Flame
} from 'lucide-react';
import { useHealthData } from '../../context/HealthDataContext';

export default function Sidebar({ isOpen, onCloseMobile }) {
  const { healthData } = useHealthData();
  const metabolicScore = healthData?.userProfile?.metabolicScore || 74;

  const navItems = [
    { label: 'Home Page', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Health Assessment', path: '/assessment', icon: ClipboardList },
    { label: 'AI Recommendations', path: '/recommendations', icon: Sparkles, badge: '7-Day Plan' },
    { label: 'Lab Analytics', path: '/labs', icon: TestTube2 },
    { label: 'Profile & History', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:static top-[57px] bottom-0 left-0 z-40
        w-64 glass-panel border-r border-slate-800/80
        flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Nav Links */}
        <div className="space-y-6">
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Navigation
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    end={item.path === '/'}
                    className={({ isActive }) => `
                      flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-health-500/20 to-emerald-500/10 text-health-300 border border-health-500/30 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Focus Widget */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">Clinical Focus</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Targeting <span className="text-health-300 font-medium">HOMA-IR &lt; 1.9</span> & liver AST/ALT enzymes through low-GI fiber and daily yoga twist postures.
            </p>
          </div>
        </div>

        {/* Bottom Metabolic Health Card */}
        <div className="pt-4 border-t border-slate-800">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-health-950/60 border border-health-500/20 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">Metabolic Score</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <TrendingDown className="w-3 h-3" />
                Optimal
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">{metabolicScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-teal-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metabolicScore}%` }}
              ></div>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-health-400" />
                NAFLD Guard
              </span>
              <span>Updated Today</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
