
'use client';

import { useState } from 'react';
import { mockPrescriptionRequests } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CheckCircle, XCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PrescriptionRequest } from '@/lib/types';

export function PrescriptionApprovalQueue() {
  const [requests, setRequests] = useState<PrescriptionRequest[]>(mockPrescriptionRequests);
  const { toast } = useToast();

  const handleApproval = (requestId: string, approved: boolean) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, status: approved ? 'Approved' : 'Rejected', pharmacyStatus: approved ? 'Pending' : undefined } : req
    );
    setRequests(updatedRequests);

    const request = requests.find(req => req.id === requestId);
    if (!request) return;

    if (approved) {
      toast({
        title: 'Prescription Approved!',
        description: `${request.medication} for ${request.patientName} is ready to be sent to the pharmacy.`,
      });
    } else {
       toast({
        variant: 'destructive',
        title: 'Prescription Rejected',
        description: `The request for ${request.medication} for ${request.patientName} has been rejected.`,
      });
    }
  };

  const handleSendToPharmacy = (requestId: string) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, pharmacyStatus: 'Sent' } : req
    );
    setRequests(updatedRequests);
    
    const request = requests.find(req => req.id === requestId);
    if (request) {
        toast({
            title: 'Prescription Sent!',
            description: `The prescription for ${request.patientName} has been forwarded to the designated pharmacy.`,
        });
    }
  };

  const getStatusBadgeVariant = (status: PrescriptionRequest['status']) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescription Approval Queue</CardTitle>
        <CardDescription>Review and approve new medication requests from patients.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.patientName}</TableCell>
                <TableCell>{request.medication}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(request.status)} className={cn(request.status === 'Approved' && 'bg-green-600')}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleApproval(request.id, true)}>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleApproval(request.id, false)}>
                        <XCircle className="mr-2 h-4 w-4 text-red-600" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {request.status === 'Approved' && request.pharmacyStatus === 'Pending' && (
                     <Button variant="default" size="sm" onClick={() => handleSendToPharmacy(request.id)}>
                        <Send className="mr-2 h-4 w-4" />
                        Send to Pharmacy
                      </Button>
                  )}
                  {(request.status === 'Rejected' || request.pharmacyStatus === 'Sent') && (
                    <span className="text-sm text-muted-foreground">Action taken</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
