import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MedicalDisclaimerModal from '../common/MedicalDisclaimerModal';
import QuickLogModal from '../common/QuickLogModal';

export default function ProtectedLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 selection:bg-health-500">
      {/* Mandatory Medical Disclaimer Modal */}
      <MedicalDisclaimerModal />

      {/* Quick Metric Log Modal */}
      <QuickLogModal 
        isOpen={isQuickLogOpen} 
        onClose={() => setIsQuickLogOpen(false)} 
      />

      {/* Top Navbar */}
      <Navbar 
        onOpenQuickLog={() => setIsQuickLogOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar 
          isOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
