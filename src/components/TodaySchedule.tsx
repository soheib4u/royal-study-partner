import { Calendar, Clock, MapPin } from "lucide-react";
import { DashboardWidget } from "./DashboardWidget";

interface ClassSession {
  id: string;
  subject: string;
  time: string;
  location: string;
  professor: string;
}

const mockClasses: ClassSession[] = [
  {
    id: "1",
    subject: "Advanced Mathematics",
    time: "9:00 - 10:30",
    location: "Room 205",
    professor: "Dr. Smith"
  },
  {
    id: "2", 
    subject: "Physics Lab",
    time: "14:00 - 16:00",
    location: "Lab B",
    professor: "Prof. Johnson"
  }
];

export function TodaySchedule() {
  return (
    <DashboardWidget title="Today's Schedule" icon={Calendar}>
      <div className="space-y-3">
        {mockClasses.length > 0 ? (
          mockClasses.map((classItem) => (
            <div key={classItem.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <div className="w-2 h-12 bg-gradient-primary rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{classItem.subject}</h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {classItem.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {classItem.location}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{classItem.professor}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground">No classes scheduled for today</p>
          </div>
        )}
      </div>
    </DashboardWidget>
  );
}