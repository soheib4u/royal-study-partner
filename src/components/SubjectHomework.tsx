import { useState } from "react";
import { Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { cn } from "@/lib/utils";

interface SubjectHomeworkProps {
  subjectId: string;
}

export function SubjectHomework({ subjectId }: SubjectHomeworkProps) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('studentmate-tasks', []);

  const subjectTasks = tasks
    .filter(task => task.subjectId === subjectId)
    .sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });  

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'homework': return 'bg-blue-500';
      case 'assignment': return 'bg-purple-500';
      case 'quiz': return 'bg-orange-500';
      case 'other': return 'bg-gray-500';
      default: return 'bg-primary';
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

  return (
    <div className="space-y-4">
      {subjectTasks.length === 0 ? (
        <div className="luxury-card p-8 text-center">
          <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No homework yet</h3>
          <p className="text-muted-foreground">Tasks for this subject will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subjectTasks.map((task) => (
            <div key={task.id} className={cn(
              "luxury-card p-4 animate-scale-in transition-all",
              task.completed && "opacity-60"
            )}>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    task.completed 
                      ? "bg-green-500 border-green-500" 
                      : "border-muted-foreground hover:border-primary"
                  )}
                >
                  {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                </button>

                <div className={`w-10 h-10 ${getTaskTypeColor(task.type)} rounded-lg flex items-center justify-center`}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold",
                    task.completed ? "line-through text-muted-foreground" : "text-foreground"
                  )}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{task.dueDate} at {task.dueTime}</span>
                    <span className={getPriorityColor(task.priority)}>
                      ● {task.priority} priority
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className="capitalize">
                    {task.type}
                  </Badge>
                  {new Date(task.dueDate) < new Date() && !task.completed && (
                    <div className="flex items-center gap-1 text-red-400">
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-xs">Overdue</span>
                    </div>
                  )}
                </div>
              </div>
              
              {task.description && (
                <p className="text-sm text-muted-foreground mt-3 ml-10">
                  {task.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}