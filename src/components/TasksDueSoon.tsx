import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { DashboardWidget } from "./DashboardWidget";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    dueDate: "Tomorrow",
    priority: "high",
    completed: false
  },  
  {
    id: "2",
    title: "Math Problem Set 5",
    subject: "Mathematics",
    dueDate: "Friday",
    priority: "medium", 
    completed: false
  },
  {
    id: "3",
    title: "History Essay Draft",
    subject: "History",
    dueDate: "Next Week",
    priority: "low",
    completed: true
  }
];

const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high': return 'text-red-400';
    case 'medium': return 'text-luxury-gold';
    case 'low': return 'text-green-400';
  }
};

export function TasksDueSoon() {
  return (
    <DashboardWidget title="Tasks Due Soon" icon={AlertTriangle}>
      <div className="space-y-2">
        {mockTasks.slice(0, 3).map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg group hover:bg-secondary/80 transition-colors">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 p-0 hover:bg-transparent"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </Button>
            
            <div className="flex-1">
              <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">{task.subject}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className={`text-xs ${getPriorityColor(task.priority)}`}>{task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
        
        {mockTasks.length === 0 && (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground">All caught up! 🎯</p>
          </div>
        )}
      </div>
    </DashboardWidget>
  );
}