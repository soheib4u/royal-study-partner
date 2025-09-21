import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project, ProjectMember } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface AddProjectMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  onUpdateProject: (project: Project) => void;
}

export function AddProjectMemberDialog({ open, onOpenChange, project, onUpdateProject }: AddProjectMemberDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: ''
  });  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember: ProjectMember = {
      id: Date.now().toString(),
      ...formData
    };

    onUpdateProject({
      ...project,
      members: [...project.members, newMember]
    });
    
    toast({
      title: "Member Added",
      description: `${formData.name} has been added to the project.`,
    });

    setFormData({ name: '', role: '', email: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter member name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="e.g., Developer, Designer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="member@email.com"
            />
          </div>

          <Button type="submit" className="luxury-button w-full">
            Add Member
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}