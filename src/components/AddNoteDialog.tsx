import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Note } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AddNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectId: string;
}

export function AddNoteDialog({ open, onOpenChange, subjectId }: AddNoteDialogProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useLocalStorage<Note[]>('studentmate-notes', []);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNote: Note = {
      id: Date.now().toString(),
      subjectId,
      title: formData.title,
      content: formData.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes(prev => [...prev, newNote]);
    
    toast({
      title: "Note Created",
      description: "Your note has been saved successfully.",
    });

    setFormData({
      title: '',
      content: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter note title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Start writing your note..."
              rows={8}
              required
            />
          </div>

          <Button type="submit" className="luxury-button w-full">
            Save Note
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}