
'use client';

import { mockDoctorPatients, caregivers } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Bell, User, Users } from 'lucide-react';
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
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function CaregiverEngagementPanel() {
    const { toast } = useToast();
    const [reminderMessage, setReminderMessage] = useState('');

    const handleSendReminder = (patientName: string, caregiverName: string) => {
        if (!reminderMessage.trim()) {
            toast({
                variant: 'destructive',
                title: 'Message is empty',
                description: 'Please write a reminder message to send.',
            });
            return;
        }

        toast({
            title: `Reminder Sent to ${caregiverName}`,
            description: `Message for ${patientName}: "${reminderMessage}"`,
        });
        setReminderMessage(''); // Clear textarea after sending
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family/Caregiver Engagement</CardTitle>
        <CardDescription>Send reminders and engage with patient support systems.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDoctorPatients.map((patient) => {
          const caregiver = caregivers.find((c) => c.id === patient.caregiverId);
          return (
            <div key={patient.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">Patient</p>
                </div>
              </div>
              {caregiver ? (
                <div className="flex items-center justify-between pl-4 border-l-2 ml-5">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback><Users className="w-4 h-4" /></AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-sm">{caregiver.name}</p>
                            <p className="text-xs text-muted-foreground">{caregiver.relationship}</p>
                        </div>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Bell className="mr-2 h-4 w-4" /> Reminder
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Send Reminder to {caregiver.name}</DialogTitle>
                                <DialogDescription>
                                    This message will be sent to {caregiver.name} regarding {patient.name}.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Label htmlFor="message">Reminder Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="e.g., 'Please ensure Sunita Devi takes her evening medication.'"
                                    value={reminderMessage}
                                    onChange={(e) => setReminderMessage(e.target.value)}
                                />
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type="submit" onClick={() => handleSendReminder(patient.name, caregiver.name)}>Send Reminder</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
              ) : (
                <div className="pl-4 border-l-2 ml-5">
                    <p className="text-sm text-muted-foreground">No caregiver assigned.</p>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
