import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Grade, Subject } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AddGradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}  

export function AddGradeDialog({ open, onOpenChange }: AddGradeDialogProps) {
  const { toast } = useToast();
  const [grades, setGrades] = useLocalStorage<Grade[]>('studentmate-grades', []);
  const [subjects] = useLocalStorage<Subject[]>('studentmate-subjects', []);
  
  const [formData, setFormData] = useState({
    subjectId: '',
    type: 'exam' as const,
    title: '',
    score: '',
    maxScore: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGrade: Grade = {
      id: Date.now().toString(),
      subjectId: formData.subjectId,
      type: formData.type,
      title: formData.title,
      score: parseFloat(formData.score),
      maxScore: parseFloat(formData.maxScore),
      date: formData.date
    };

    setGrades(prev => [...prev, newGrade]);
    
    toast({
      title: "Grade Added",
      description: "Your grade has been recorded successfully.",
    });

    setFormData({
      subjectId: '',
      type: 'exam',
      title: '',
      score: '',
      maxScore: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Grade</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="homework">Homework</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Midterm Exam, Quiz 1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                step="0.1"
                min="0"
                value={formData.score}
                onChange={(e) => setFormData(prev => ({ ...prev, score: e.target.value }))}
                placeholder="85"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxScore">Max Score</Label>
              <Input
                id="maxScore"
                type="number"
                step="0.1"
                min="0"
                value={formData.maxScore}
                onChange={(e) => setFormData(prev => ({ ...prev, maxScore: e.target.value }))}
                placeholder="100"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <Button type="submit" className="luxury-button w-full">
            Add Grade
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}