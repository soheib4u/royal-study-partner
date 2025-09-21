import { useState } from "react";
import { ArrowLeft, Users, Plus, Calendar, Target, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Project, ProjectTask, ProjectMember } from "@/types";
import { cn } from "@/lib/utils";
import { AddProjectMemberDialog } from "@/components/AddProjectMemberDialog";
import { AddProjectTaskDialog } from "@/components/AddProjectTaskDialog";

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

export function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const [projects, setProjects] = useLocalStorage<Project[]>('studentmate-projects', []);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (  
      <div className="pb-20 px-4">
        <p>Project not found</p>
      </div>
    );
  }

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p));
  };

  const toggleTaskStatus = (taskId: string) => {
    const updatedTasks = project.tasks.map(task => {
      if (task.id === taskId) {
        let newStatus: ProjectTask['status'];
        switch (task.status) {
          case 'todo': newStatus = 'in-progress'; break;
          case 'in-progress': newStatus = 'completed'; break;
          case 'completed': newStatus = 'todo'; break;
          default: newStatus = 'todo';
        }
        return { ...task, status: newStatus };
      }
      return task;
    });

    const completedTasks = updatedTasks.filter(t => t.status === 'completed').length;
    const progress = updatedTasks.length > 0 ? (completedTasks / updatedTasks.length) * 100 : 0;

    updateProject({
      ...project,
      tasks: updatedTasks,
      progress: Math.round(progress)
    });
  };

  const getTaskStatusColor = (status: ProjectTask['status']) => {
    switch (status) {
      case 'todo': return 'bg-gray-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-muted-foreground';
    }
  };

  const daysUntilDeadline = Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="pb-20 px-4 space-y-6 animate-slide-in-right">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="luxury-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Overdue'}
              </span>
            </div>
            <Badge variant={project.status === 'completed' ? 'default' : project.status === 'in-progress' ? 'secondary' : 'outline'}>
              {project.status}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Due: {new Date(project.deadline).toLocaleDateString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Tasks ({project.tasks.length})
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Members ({project.members.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-foreground">Project Tasks</h3>
            <Button onClick={() => setShowAddTask(true)} className="luxury-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>

          {project.tasks.length === 0 ? (
            <div className="luxury-card p-8 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
              <p className="text-muted-foreground mb-4">Break down your project into manageable tasks</p>
              <Button onClick={() => setShowAddTask(true)} className="luxury-button">
                <Plus className="w-4 h-4 mr-2" />
                Add First Task
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {project.tasks.map((task) => {
                const assignedMember = project.members.find(m => m.id === task.assignedTo);
                return (
                  <div key={task.id} className="luxury-card p-4 animate-scale-in">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`w-10 h-10 ${getTaskStatusColor(task.status)} rounded-lg flex items-center justify-center transition-all hover:scale-105`}
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : task.status === 'in-progress' ? (
                          <Clock className="w-5 h-5 text-white" />
                        ) : (
                          <Target className="w-5 h-5 text-white" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-semibold",
                          task.status === 'completed' ? "line-through text-muted-foreground" : "text-foreground"
                        )}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>Due: {task.dueDate}</span>
                          <span className={getPriorityColor(task.priority)}>
                            ● {task.priority} priority
                          </span>
                          {assignedMember && (
                            <span>Assigned to: {assignedMember.name}</span>
                          )}
                        </div>
                      </div>

                      <Badge variant={task.status === 'completed' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'} className="capitalize">
                        {task.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="members" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-foreground">Team Members</h3>
            <Button onClick={() => setShowAddMember(true)} className="luxury-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          {project.members.length === 0 ? (
            <div className="luxury-card p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No team members</h3>
              <p className="text-muted-foreground mb-4">Add collaborators to your project</p>
              <Button onClick={() => setShowAddMember(true)} className="luxury-button">
                <Plus className="w-4 h-4 mr-2" />
                Add First Member
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {project.members.map((member) => (
                <div key={member.id} className="luxury-card p-4 animate-scale-in">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-luxury-cream" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      {member.email && (
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      )}
                    </div>

                    <Badge variant="outline">
                      {member.role}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddProjectMemberDialog 
        open={showAddMember} 
        onOpenChange={setShowAddMember}
        project={project}
        onUpdateProject={updateProject}
      />
      
      <AddProjectTaskDialog 
        open={showAddTask} 
        onOpenChange={setShowAddTask}
        project={project}
        onUpdateProject={updateProject}
      />
    </div>
  );
}