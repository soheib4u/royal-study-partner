import { useState } from "react";
import { BookOpen, FileText, HelpCircle, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, Subject } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TaskCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TASK_TYPES = [
  { id: 'homework', label: 'Homework', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'assignment', label: 'Assignment', icon: FileText, color: 'bg-purple-500' },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle, color: 'bg-orange-500' },
  { id: 'other', label: 'Other', icon: MoreHorizontal, color: 'bg-gray-500' },
];

export function TaskCreationDialog({ open, onOpenChange }: TaskCreationDialogProps) {
  const { toast } = useToast();
  const [tasks, setTasks] = useLocalStorage<Task[]>('studentmate-tasks', []);
  const [subjects] = useLocalStorage<Subject[]>('studentmate-subjects', []);
  
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [selectedType, setSelectedType] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium' as const
  });

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Task = {
      id: Date.now().toString(),
      ...formData,
      type: selectedType as any,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);
    
    toast({
      title: "Task Created",
      description: `Your ${selectedType} has been added successfully.`,
    });

    // Reset form
    setStep('type');
    setSelectedType('');
    setFormData({
      title: '',
      description: '',
      subjectId: '',
      dueDate: '',
      dueTime: '',
      priority: 'medium'
    });
    
    onOpenChange(false);
  };

  const handleClose = () => {
    setStep('type');
    setSelectedType('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Dark overlay effect when content is shown */}
        <div className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-300",
          step === 'details' ? "opacity-100" : "opacity-0 pointer-events-none"
        )} />
        
        {step === 'type' ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Choose Task Type</h2>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {TASK_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className="luxury-card p-6 hover:scale-105 transition-all duration-200 group text-center"
                  >
                    <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-medium text-foreground group-hover:text-luxury-cream transition-colors">
                      {type.label}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                New {TASK_TYPES.find(t => t.id === selectedType)?.label}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setStep('type')}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={`Enter ${selectedType} title`}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subjectId} onValueChange={(value) => setFormData(prev => ({ ...prev, subjectId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueTime">Due Time</Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add any additional details..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="luxury-button w-full">
                Create {TASK_TYPES.find(t => t.id === selectedType)?.label}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}