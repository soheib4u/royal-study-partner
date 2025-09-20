import { useState } from "react";
import { ArrowLeft, FileText, Notebook, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Subject, Note, Task } from "@/types";
import { SubjectNotes } from "@/components/SubjectNotes";
import { SubjectHomework } from "@/components/SubjectHomework";

interface SubjectDetailProps {
  subjectId: string;
  onBack: () => void;
}

export function SubjectDetail({ subjectId, onBack }: SubjectDetailProps) {
  const [subjects] = useLocalStorage<Subject[]>('studentmate-subjects', []);
  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <div className="pb-20 px-4">
        <p>Subject not found</p>
      </div>
    );
  }

  return (
    <div className="pb-20 px-4 space-y-6 animate-slide-in-right">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${subject.color} rounded-xl flex items-center justify-center`}>
            <Notebook className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{subject.name}</h1>
            <p className="text-muted-foreground">{subject.teacher}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <Notebook className="w-4 h-4" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="homework" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Homework
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes" className="mt-6">
          <SubjectNotes subjectId={subjectId} />
        </TabsContent>
        
        <TabsContent value="homework" className="mt-6">
          <SubjectHomework subjectId={subjectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}