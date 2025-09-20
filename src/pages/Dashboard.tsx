import { StudentMateHeader } from "@/components/StudentMateHeader";
import { TodaySchedule } from "@/components/TodaySchedule";
import { TasksDueSoon } from "@/components/TasksDueSoon";
import { FocusTimer } from "@/components/FocusTimer";

export function Dashboard() {
  return (
    <div className="pb-20 px-4 space-y-6">
      <StudentMateHeader userName="Alex Chen" currentGPA={3.85} />
      
      <div className="grid gap-4">
        <TodaySchedule />
        <TasksDueSoon />
        <FocusTimer />
      </div>
    </div>
  );
}