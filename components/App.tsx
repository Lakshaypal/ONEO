import React, { useState } from 'react';
import Layout from './Layout';
import Dashboard from './Dashboard';
import TimelineView from './TimelineView';
import ConstitutionalView from './ConstitutionalView';
import ScenarioBuilder from './ScenarioBuilder';
import FinancialImpact from './FinancialImpact';
import AdministrativeImpact from './AdministrativeImpact';
import GovernanceImpact from './GovernanceImpact';
import DataSources from './DataSources';
import { ViewType } from '../types';

export type ScenarioType = 'NORMAL' | 'EARLY_DISSOLUTION' | 'HUNG_ASSEMBLY' | 'PRESIDENTS_RULE';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.DASHBOARD);
  
  // GLOBAL SYNC STATE
  const [isOnoe, setIsOnoe] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<string>('ALL');
  const [period, setPeriod] = useState<5 | 10 | 15>(10);

  // GLOBAL SCENARIO STATE
  const [scenario, setScenario] = useState<ScenarioType>('NORMAL');
  const [disruptionYear, setDisruptionYear] = useState<number>(2026);
  const [disruptionStateId, setDisruptionStateId] = useState<string>('UP');

  const renderView = () => {
    switch (currentView) {
      case ViewType.DASHBOARD:
        return (
          <Dashboard 
            setView={setCurrentView} 
            isOnoe={isOnoe} 
            setIsOnoe={setIsOnoe}
            selectedStateId={selectedStateId}
            setSelectedStateId={setSelectedStateId}
          />
        );
      case ViewType.TIMELINE:
        return (
          <TimelineView 
            isOnoe={isOnoe} 
            setIsOnoe={setIsOnoe}
            selectedStateId={selectedStateId}
            setSelectedStateId={setSelectedStateId}
            scenario={scenario}
            disruptionYear={disruptionYear}
            disruptionStateId={disruptionStateId}
          />
        );
      case ViewType.FINANCIAL:
        return (
          <FinancialImpact 
            isOnoe={isOnoe}
            setIsOnoe={setIsOnoe}
            period={period}
            setPeriod={setPeriod}
          />
        );
      case ViewType.ADMIN:
        return (
          <AdministrativeImpact 
            isOnoe={isOnoe}
            period={period}
            setPeriod={setPeriod}
          />
        );
      case ViewType.GOVERNANCE:
        return (
          <GovernanceImpact 
            isOnoe={isOnoe}
            period={period}
            setPeriod={setPeriod}
          />
        );
      case ViewType.CONSTITUTIONAL:
        return <ConstitutionalView />;
      case ViewType.SCENARIO:
        return (
          <ScenarioBuilder 
            scenario={scenario}
            setScenario={setScenario}
            disruptionYear={disruptionYear}
            setDisruptionYear={setDisruptionYear}
            disruptionStateId={disruptionStateId}
            setDisruptionStateId={setDisruptionStateId}
            isOnoe={isOnoe}
            setView={setCurrentView}
          />
        );
      case ViewType.REFERENCES:
        return <DataSources />;
      default:
        return <Dashboard setView={setCurrentView} isOnoe={isOnoe} setIsOnoe={setIsOnoe} selectedStateId={selectedStateId} setSelectedStateId={setSelectedStateId} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;