import { User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface StudentMateHeaderProps {
  onNavigateToProfile?: () => void;
}

export function StudentMateHeader({ onNavigateToProfile }: StudentMateHeaderProps) {
  const [profile] = useLocalStorage('studentmate-profile', {
    id: '1',
    name: 'Student',
    email: '',
    year: '2024',
    classType: 'undergraduate',
    academicGoals: '',
    currentGPA: 0
  });
  return (
    <header className="luxury-card p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-luxury-cream" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{profile.name}</h2>
            {profile.currentGPA !== undefined && (
              <p className="text-sm text-muted-foreground">GPA: {profile.currentGPA.toFixed(2)}</p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={onNavigateToProfile}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-luxury-cream font-medium text-lg">Control your day. Own your future.</p>
      </div>
    </header>
  );
}