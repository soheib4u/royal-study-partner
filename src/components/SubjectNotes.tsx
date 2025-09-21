import { useState } from "react";
import { Plus, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Note } from "@/types";
import { AddNoteDialog } from "@/components/AddNoteDialog";

interface SubjectNotesProps {
  subjectId: string;
}

export function SubjectNotes({ subjectId }: SubjectNotesProps) {
  const [notes] = useLocalStorage<Note[]>('studentmate-notes', []);
  const [showAddNote, setShowAddNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const subjectNotes = notes
    .filter(note => note.subjectId === subjectId)
    .filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowAddNote(true)} className="luxury-button">
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>

      {subjectNotes.length === 0 ? (
        <div className="luxury-card p-8 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No notes yet</h3>
          <p className="text-muted-foreground mb-4">Start taking notes for this subject</p>
          <Button onClick={() => setShowAddNote(true)} className="luxury-button">
            <Plus className="w-4 h-4 mr-2" />
            Create First Note
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {subjectNotes.map((note) => (
            <div key={note.id} className="luxury-card p-4 animate-scale-in">
              <h3 className="font-semibold text-foreground mb-2">{note.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                {note.content}
              </p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                <Button variant="ghost" size="sm" className="h-6">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddNoteDialog 
        open={showAddNote} 
        onOpenChange={setShowAddNote}
        subjectId={subjectId}
      />
    </div>
  );
}