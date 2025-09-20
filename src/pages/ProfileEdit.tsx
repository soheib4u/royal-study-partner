import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserProfile } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditProps {
  onBack: () => void;
}

export function ProfileEdit({ onBack }: ProfileEditProps) {
  const { toast } = useToast();
  const [profile, setProfile] = useLocalStorage<UserProfile>('studentmate-profile', {
    id: '1',
    name: 'Alex Chen',
    email: '',
    year: '2024',
    classType: 'undergraduate',
    academicGoals: '',
    currentGPA: 3.85
  });

  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    onBack();
  };

  return (
    <div className="pb-20 px-4 space-y-6 animate-slide-in-right">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
      </div>

      <div className="luxury-card p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Academic Year</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              placeholder="2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classType">Class Type</Label>
            <Select value={formData.classType} onValueChange={(value) => setFormData(prev => ({ ...prev, classType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="highschool">High School</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpa">Current GPA</Label>
          <Input
            id="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={formData.currentGPA}
            onChange={(e) => setFormData(prev => ({ ...prev, currentGPA: parseFloat(e.target.value) || 0 }))}
            placeholder="3.85"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goals">Academic Goals</Label>
          <Textarea
            id="goals"
            value={formData.academicGoals}
            onChange={(e) => setFormData(prev => ({ ...prev, academicGoals: e.target.value }))}
            placeholder="Describe your academic goals and aspirations..."
            rows={4}
          />
        </div>

        <Button onClick={handleSave} className="luxury-button w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </Button>
      </div>
    </div>
  );
}