import { useState } from "react";
import { TrendingUp, Award, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Grade, Subject, Task } from "@/types";
import { DashboardWidget } from "@/components/DashboardWidget";
import { AddGradeDialog } from "@/components/AddGradeDialog";

export function Progress() {
  const [showAddGrade, setShowAddGrade] = useState(false);
  const [grades] = useLocalStorage<Grade[]>('studentmate-grades', []);
  const [subjects] = useLocalStorage<Subject[]>('studentmate-subjects', []);
  const [tasks] = useLocalStorage<Task[]>('studentmate-tasks', []);

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'Unknown Subject';
  };

  const calculateOverallGPA = () => {
    if (grades.length === 0) return 0;
    const totalPercentage = grades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0);
    return (totalPercentage / grades.length / 100 * 4).toFixed(2);
  };  

  const getRecentGrades = () => {
    return grades
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  };

  const getCompletionStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return { totalTasks, completedTasks, completionRate };
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    if (percentage >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const stats = getCompletionStats();
  const recentGrades = getRecentGrades();

  return (
    <div className="pb-20 px-4 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Progress</h1>
        <Button onClick={() => setShowAddGrade(true)} className="luxury-button">
          Add Grade
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <DashboardWidget title="Overall GPA" icon={Award}>
          <div className="text-2xl font-bold text-luxury-cream">
            {calculateOverallGPA()}
          </div>
          <p className="text-sm text-muted-foreground">Current GPA</p>
        </DashboardWidget>

        <DashboardWidget title="Task Completion" icon={Target}>
          <div className="text-2xl font-bold text-luxury-cream">
            {stats.completionRate}%
          </div>
          <p className="text-sm text-muted-foreground">
            {stats.completedTasks}/{stats.totalTasks} completed
          </p>
        </DashboardWidget>
      </div>

      {/* Recent Grades */}
      <DashboardWidget title="Recent Grades" icon={TrendingUp}>
        {recentGrades.length === 0 ? (
          <div className="text-center py-6">
            <Award className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground text-sm">No grades recorded yet</p>
            <Button onClick={() => setShowAddGrade(true)} variant="ghost" className="mt-2 text-xs">
              Add your first grade
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentGrades.map((grade) => {
              const percentage = Math.round((grade.score / grade.maxScore) * 100);
              return (
                <div key={grade.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{grade.title}</h4>
                    <p className="text-sm text-muted-foreground">{getSubjectName(grade.subjectId)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{grade.date}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getGradeColor(percentage)}`}>
                      {grade.score}/{grade.maxScore}
                    </div>
                    <Badge variant={percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'destructive'}>
                      {percentage}%
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DashboardWidget>

      {/* Subject Performance */}
      <DashboardWidget title="Subject Performance" icon={Award}>
        {subjects.length === 0 ? (
          <div className="text-center py-6">
            <Target className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground text-sm">Add subjects to see performance</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subjects.map((subject) => {
              const subjectGrades = grades.filter(g => g.subjectId === subject.id);
              const avgPercentage = subjectGrades.length > 0 
                ? Math.round(subjectGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0) / subjectGrades.length)
                : 0;
              
              return (
                <div key={subject.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${subject.color} rounded-lg`} />
                    <div>
                      <h4 className="font-medium text-foreground">{subject.name}</h4>
                      <p className="text-sm text-muted-foreground">{subjectGrades.length} grades</p>
                    </div>
                  </div>
                  
                  <div className={`text-lg font-bold ${getGradeColor(avgPercentage)}`}>
                    {subjectGrades.length > 0 ? `${avgPercentage}%` : 'No grades'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DashboardWidget>

      <AddGradeDialog 
        open={showAddGrade} 
        onOpenChange={setShowAddGrade} 
      />
    </div>
  );
}