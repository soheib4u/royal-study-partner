// Founded by Soheib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dashboard } from "./Dashboard";
import { Subjects } from "./Subjects";
import { Schedule } from "./Schedule";
import { Tasks } from "./Tasks";
import { Progress } from "./Progress";
import { ProfileEdit } from "./ProfileEdit";
import { SubjectDetail } from "./SubjectDetail";
import { ProjectDetail } from "./ProjectDetail";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentView, setCurrentView] = useState<{
    type: 'main' | 'profile' | 'subject-detail' | 'project-detail';
    data?: any;
  }>({ type: 'main' });

  const renderContent = () => {
    if (currentView.type === 'profile') {
      return <ProfileEdit onBack={() => setCurrentView({ type: 'main' })} />;
    }
    if (currentView.type === 'subject-detail') {
      return <SubjectDetail subjectId={currentView.data} onBack={() => setCurrentView({ type: 'main' })} />;
    }
    if (currentView.type === 'project-detail') {
      return <ProjectDetail projectId={currentView.data} onBack={() => setCurrentView({ type: 'main' })} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigateToProfile={() => setCurrentView({ type: 'profile' })} onNavigateToProject={(id) => setCurrentView({ type: 'project-detail', data: id })} />;
      case 'subjects':
        return <Subjects onNavigateToSubject={(id) => setCurrentView({ type: 'subject-detail', data: id })} />;
      case 'schedule':
        return <Schedule />;
      case 'tasks':
        return <Tasks />;
      case 'progress':
        return <Progress />;
      default:
        return <Dashboard onNavigateToProfile={() => setCurrentView({ type: 'profile' })} onNavigateToProject={(id) => setCurrentView({ type: 'project-detail', data: id })} />;
    }
  };

  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-safe-area-top">
        {/* Example translated welcome message */}
        <h1 className="text-center text-2xl font-bold mb-4">{t('welcome')}</h1>
        {renderContent()}
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
