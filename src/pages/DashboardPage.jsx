import React from 'react';
import MetabolicOverview from '../components/dashboard/MetabolicOverview';
import MetabolicProgressChart from '../components/dashboard/MetabolicProgressChart';
import LiverEnzymesChart from '../components/dashboard/LiverEnzymesChart';
import MacronutrientPieChart from '../components/dashboard/MacronutrientPieChart';
import DailyLogWidget from '../components/dashboard/DailyLogWidget';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Banner & Overview Metrics Cards */}
      <MetabolicOverview />

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MetabolicProgressChart />
        </div>
        <div className="lg:col-span-1">
          <MacronutrientPieChart />
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiverEnzymesChart />
        </div>
        <div className="lg:col-span-1">
          <DailyLogWidget />
        </div>
      </div>
    </div>
  );
}
