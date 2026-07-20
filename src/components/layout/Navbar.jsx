import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  User, 
  LogOut, 
  PlusCircle, 
  ShieldAlert, 
  Sparkles,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';

export default function Navbar({ onOpenQuickLog, onToggleMobileSidebar, isMobileSidebarOpen }) {
  const { user, isDemoMode, logout } = useAuth();
  const { healthData } = useHealthData();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const currentGlucose = healthData?.currentMetrics?.fastingGlucose?.value || 98;
  const currentHoma = healthData?.currentMetrics?.homaIR?.value || 2.71;

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-slate-800/80 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Mobile Menu Toggle & Clickable Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 text-slate-400 hover:text-white rounded-lg lg:hidden hover:bg-slate-800/60"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-health-600 to-emerald-400 rounded-xl shadow-lg shadow-health-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Glyca<span className="gradient-text">Care</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-health-500/10 text-health-300 border border-health-500/30">
                  Metabolic AI
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Live Quick Metrics Pill (Desktop) */}
        <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-400">Glucose:</span>
            <span className="font-semibold text-white">{currentGlucose} mg/dL</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">HOMA-IR:</span>
            <span className={`font-semibold ${currentHoma > 1.9 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {currentHoma}
            </span>
          </div>
        </div>

        {/* Right: Quick Action & User Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuickLog}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-health-500 to-emerald-500 hover:from-health-600 hover:to-emerald-600 text-white font-medium rounded-xl text-xs sm:text-sm shadow-md shadow-health-500/20 transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Metric</span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-sm shadow-inner">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-slate-200 leading-tight">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  {isDemoMode && <Sparkles className="w-2.5 h-2.5 text-amber-400 inline" />}
                  {isDemoMode ? 'Demo Session' : 'Firebase Verified'}
                </p>
              </div>
            </button>

            {/* User Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-xl border border-slate-700/80 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-800">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-xs font-bold text-white truncate">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-2 text-left text-xs text-slate-200 hover:bg-slate-800/80 flex items-center gap-2 transition-colors"
                  >
                    <Home className="w-4 h-4 text-health-400" />
                    Visit Home Page
                  </Link>

                  <div className="px-4 py-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                    Insulin & Liver Shield Active
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
