import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { Subjects } from "./Subjects";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'subjects':
        return <Subjects />;
      case 'schedule':
        return <div className="pb-20 px-4"><h1 className="text-2xl font-bold mb-4">Schedule</h1><p className="text-muted-foreground">Coming soon...</p></div>;
      case 'tasks':
        return <div className="pb-20 px-4"><h1 className="text-2xl font-bold mb-4">Tasks</h1><p className="text-muted-foreground">Coming soon...</p></div>;
      case 'progress':
        return <div className="pb-20 px-4"><h1 className="text-2xl font-bold mb-4">Progress</h1><p className="text-muted-foreground">Coming soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-safe-area-top">
        {renderContent()}
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
