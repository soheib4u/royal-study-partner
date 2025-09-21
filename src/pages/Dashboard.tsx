// Founded by Soheib
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentMateHeader } from "@/components/StudentMateHeader";
import { TodaySchedule } from "@/components/TodaySchedule";
import { TasksDueSoon } from "@/components/TasksDueSoon";
import { FocusTimer } from "@/components/FocusTimer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Project } from "@/types";
import { AddProjectDialog } from "@/components/AddProjectDialog";

interface DashboardProps {
  onNavigateToProfile: () => void;
  onNavigateToProject: (id: string) => void;
}  

export function Dashboard({ onNavigateToProfile, onNavigateToProject }: DashboardProps) {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects] = useLocalStorage<Project[]>('studentmate-projects', []);
  const { t } = useTranslation();

  return (
    <div className="pb-20 px-4 space-y-6">
      <StudentMateHeader userName="Alex Chen" currentGPA={3.85} onNavigateToProfile={onNavigateToProfile} />
      <div className="grid gap-4">
        <TodaySchedule />
        <TasksDueSoon />
        {/* Projects Section */}
        <div className="luxury-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">{t('projects')}</h3>
            <Button onClick={() => setShowAddProject(true)} className="luxury-button">
              <Plus className="w-4 h-4 mr-2" />
              {t('add_project')}
            </Button>
          </div>
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <Button onClick={() => setShowAddProject(true)} className="luxury-button rounded-xl py-6 px-8">
                <Plus className="w-5 h-5 mr-2" />
                Create First Project
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {projects.slice(0, 3).map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => onNavigateToProject(project.id)}
                  className="luxury-card p-4 cursor-pointer hover:scale-105 transition-all"
                >
                  <h4 className="font-medium text-foreground">{project.title}</h4>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <FocusTimer />
      </div>
      
      <AddProjectDialog open={showAddProject} onOpenChange={setShowAddProject} />
    </div>
  );
}