
"use client";

import { useState } from 'react';
import { mockSosAlerts } from '@/lib/data';
import { Button } from '../ui/button';
import { Phone, Siren, X } from 'lucide-react';
import { SosAlert } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

export function DoctorSosQueue() {
  const [alerts, setAlerts] = useState<SosAlert[]>(mockSosAlerts);
  const { toast } = useToast();

  const handleDismiss = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    toast({
      title: 'Alert Dismissed',
      description: 'The SOS alert has been marked as resolved.',
    });
  };

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Siren className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">SOS</span>
               {alerts.length > 0 && (
                 <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0 bg-white text-red-600 border-red-600 border-2">
                    {alerts.length}
                </Badge>
               )}
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Siren className="w-6 h-6 text-destructive" />
                    Incoming SOS Alerts
                </DialogTitle>
                <DialogDescription>
                    Review and act on patient emergency requests immediately.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {alerts.length > 0 ? alerts.map(alert => (
                    <div key={alert.id} className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-bold text-lg">{alert.patientName}</p>
                            <p className="text-destructive font-medium">{alert.reason}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Phone className="mr-2 h-4 w-4" />
                                Call Patient
                            </Button>
                             <Button variant="ghost" size="icon" onClick={() => handleDismiss(alert.id)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-muted-foreground py-8">No active SOS alerts.</p>
                )}
            </div>
             <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
