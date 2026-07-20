import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Activity } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <div className="p-4 bg-health-500/10 rounded-2xl border border-health-500/30 animate-pulse mb-4">
          <Activity className="w-10 h-10 text-health-400 animate-spin" />
        </div>
        <p className="text-sm text-slate-400 font-medium">Securing health session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
