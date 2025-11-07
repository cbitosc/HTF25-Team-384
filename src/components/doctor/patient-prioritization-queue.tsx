
'use client';

import { mockDoctorPatients } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Phone, MessageSquare, Video } from 'lucide-react';
import { DoctorPatient } from '@/lib/types';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';


export function PatientPrioritizationQueue() {

    const getRiskBadgeVariant = (riskLevel: DoctorPatient['riskLevel']) => {
        switch (riskLevel) {
            case 'Critical': return 'destructive';
            case 'High': return 'default';
            default: return 'secondary';
        }
    };
    
    const getRiskTextColor = (riskLevel: DoctorPatient['riskLevel']) => {
         switch (riskLevel) {
            case 'Critical': return 'text-destructive';
            case 'High': return 'text-red-500';
            default: return 'text-amber-500';
        }
    }

    const sortedPatients = [...mockDoctorPatients].sort((a, b) => {
        const riskOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Smart Patient Prioritization Queue</CardTitle>
        <CardDescription>Patients ranked by risk level for immediate attention.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Key Symptoms</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPatients.map((patient) => (
                  <TableRow key={patient.id} className={cn(patient.riskLevel === 'Critical' && 'bg-destructive/10')}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{patient.name}</div>
                                <div className="text-sm text-muted-foreground">Age: {patient.age}</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(patient.riskLevel)} className={cn(patient.riskLevel === 'High' && 'bg-red-500')}>
                        {patient.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                        <span className={cn('font-medium', getRiskTextColor(patient.riskLevel))}>
                            {patient.symptoms.join(', ')}
                        </span>
                    </TableCell>
                    <TableCell>{patient.lastSeen}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm"><Phone className="mr-2 h-4 w-4" /> Call</Button>
                        <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
                        <Link href="/teleconsultation">
                          <Button variant="outline" size="sm"><Video className="mr-2 h-4 w-4" /> Teleconsult</Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

    