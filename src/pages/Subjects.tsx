import { BookOpen, Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Subject {
  id: string;
  name: string;
  color: string;
  teacher: string;
  nextClass?: string;
}

const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Advanced Mathematics",
    color: "bg-blue-500",
    teacher: "Dr. Smith",
    nextClass: "Tomorrow 9:00 AM"
  },
  {
    id: "2", 
    name: "Physics",
    color: "bg-purple-500",
    teacher: "Prof. Johnson",
    nextClass: "Today 2:00 PM"
  },
  {
    id: "3",
    name: "Chemistry",
    color: "bg-green-500", 
    teacher: "Dr. Williams",
    nextClass: "Friday 10:00 AM"
  },
  {
    id: "4",
    name: "History",
    color: "bg-orange-500",
    teacher: "Prof. Davis",
    nextClass: "Monday 11:00 AM"
  }
];

export function Subjects() {
  return (
    <div className="pb-20 px-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Subjects</h1>
        <Button className="luxury-button">
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </div>

      <div className="grid gap-4">
        {mockSubjects.map((subject) => (
          <div key={subject.id} className="luxury-card p-4 animate-scale-in">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{subject.name}</h3>
                <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                {subject.nextClass && (
                  <p className="text-xs text-luxury-gold mt-1">Next: {subject.nextClass}</p>
                )}
              </div>

              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {mockSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No subjects yet</h3>
          <p className="text-muted-foreground mb-4">Add your first subject to get started</p>
          <Button className="luxury-button">
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </div>
      )}
    </div>
  );
}