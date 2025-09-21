import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DashboardWidgetProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function DashboardWidget({ title, icon: Icon, children, className = "" }: DashboardWidgetProps) {
  return (
    <div className={`luxury-card p-4 animate-scale-in ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-luxury-cream" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}  