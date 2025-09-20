import { useState } from "react";
import { Plus, Clock, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ClassSchedule, Subject } from "@/types";
import { cn } from "@/lib/utils";
import { AddClassDialog } from "@/components/AddClassDialog";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function Schedule() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [classes] = useLocalStorage<ClassSchedule[]>('studentmate-classes', []);
  const [subjects] = useLocalStorage<Subject[]>('studentmate-subjects', []);

  const todayClasses = classes.filter(cls => cls.day === selectedDay);

  const getSubjectColor = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.color || 'bg-primary';
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'Unknown Subject';
  };

  return (
    <div className="pb-20 px-4 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Schedule</h1>
        <Button onClick={() => setShowAddDialog(true)} className="luxury-button">
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Day Selector */}
      <div className="luxury-card p-4">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                selectedDay === day
                  ? "bg-gradient-primary text-luxury-cream shadow-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-3">
        {todayClasses.length === 0 ? (
          <div className="luxury-card p-8 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No classes scheduled</h3>
            <p className="text-muted-foreground mb-4">Add your first class for {selectedDay}</p>
            <Button onClick={() => setShowAddDialog(true)} className="luxury-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Class
            </Button>
          </div>
        ) : (
          todayClasses
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((cls) => (
              <div key={cls.id} className="luxury-card p-4 animate-scale-in">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${getSubjectColor(cls.subjectId)} rounded-xl flex items-center justify-center`}>
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{getSubjectName(cls.subjectId)}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {cls.startTime} - {cls.endTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {cls.room}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {cls.professor}
                      </div>
                    </div>
                  </div>

                  <Badge variant={cls.type === 'exam' ? 'destructive' : cls.type === 'quiz' ? 'secondary' : 'outline'}>
                    {cls.type}
                  </Badge>
                </div>
              </div>
            ))
        )}
      </div>

      <AddClassDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        selectedDay={selectedDay}
      />
    </div>
  );
}