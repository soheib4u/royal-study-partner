import { BookOpen, Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface SubjectsProps {
  onNavigateToSubject: (id: string) => void;
}

export function Subjects({ onNavigateToSubject }: SubjectsProps) {
  const [subjects, setSubjects] = useLocalStorage('studentmate-subjects', []);
  const [showAdd, setShowAdd] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    color: 'bg-blue-500',
    teacher: '',
    nextClass: ''
  });

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.teacher) return;
    setSubjects([
      ...subjects,
      {
        id: uuidv4(),
        ...newSubject
      }  
    ]);
    setShowAdd(false);
    setNewSubject({ name: '', color: 'bg-blue-500', teacher: '', nextClass: '' });
  };

  return (
    <div className="pb-20 px-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Subjects</h1>
        <Button className="luxury-button" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </div>

      {showAdd && (
        <div className="luxury-card p-4 mb-4 animate-fade-in">
          <input
            className="input mb-2"
            placeholder="Subject Name"
            value={newSubject.name}
            onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
          />
          <input
            className="input mb-2"
            placeholder="Teacher"
            value={newSubject.teacher}
            onChange={e => setNewSubject({ ...newSubject, teacher: e.target.value })}
          />
          <input
            className="input mb-2"
            placeholder="Next Class (optional)"
            value={newSubject.nextClass}
            onChange={e => setNewSubject({ ...newSubject, nextClass: e.target.value })}
          />
          <select
            className="input mb-2"
            value={newSubject.color}
            onChange={e => setNewSubject({ ...newSubject, color: e.target.value })}
          >
            <option value="bg-blue-500">Blue</option>
            <option value="bg-purple-500">Purple</option>
            <option value="bg-green-500">Green</option>
            <option value="bg-orange-500">Orange</option>
          </select>
          <div className="flex gap-2">
            <Button className="luxury-button" onClick={handleAddSubject}>Save</Button>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => onNavigateToSubject(subject.id)}
            className="luxury-card p-4 animate-scale-in cursor-pointer hover:scale-105 transition-all"
          >
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

      {subjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No subjects yet</h3>
          <p className="text-muted-foreground mb-4">Add your first subject to get started</p>
          <Button className="luxury-button" onClick={() => setShowAdd(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </div>
      )}
    </div>
  );
}