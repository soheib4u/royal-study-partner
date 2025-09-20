export interface UserProfile {
  id: string;
  name: string;
  email: string;
  year: string;
  classType: string;
  academicGoals: string;
  currentGPA: number;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  teacher: string;
  nextClass?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  type: 'homework' | 'assignment' | 'quiz' | 'other';
  dueDate: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: string;
}

export interface ClassSchedule {
  id: string;
  subjectId: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  professor: string;
  type: 'class' | 'exam' | 'quiz' | 'assignment';
}

export interface Note {
  id: string;
  subjectId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  id: string;
  subjectId: string;
  type: 'exam' | 'quiz' | 'homework' | 'assignment';
  title: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
  members: ProjectMember[];
  tasks: ProjectTask[];
  createdAt: string;
}

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
  email?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}