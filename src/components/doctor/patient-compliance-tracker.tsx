
'use client';

import { mockDoctorPatients } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';
import { Target } from 'lucide-react';

export function PatientComplianceTracker() {
    
    const getProgressColor = (adherence: number) => {
        if (adherence < 70) return 'bg-red-500';
        if (adherence < 90) return 'bg-yellow-500';
        return 'bg-green-500';
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Compliance Tracker</CardTitle>
        <CardDescription>Overview of patient adherence to medication and logging.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDoctorPatients.map((patient) => (
          <div key={patient.id} className="p-4 border rounded-lg space-y-3">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">Adherence Score</p>
                </div>
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-xl font-bold">{patient.adherence}%</span>
                </div>
            </div>
            <Progress value={patient.adherence} className="h-2 [&>div]:bg-primary" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
