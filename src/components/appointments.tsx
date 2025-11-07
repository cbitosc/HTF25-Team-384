"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Verma', specialty: 'Cardiologist', time: '10:00 AM', date: new Date(new Date().setDate(new Date().getDate() + 1))},
  { id: 2, doctor: 'Dr. Priya', specialty: 'Dermatologist', time: '2:30 PM', date: new Date(new Date().setDate(new Date().getDate() + 3))},
];

export function Appointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled."
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Check your scheduled consultations.</CardDescription>
            </CardHeader>
            <CardContent>
                {upcomingAppointments.length > 0 ? (
                    <ul className='space-y-4'>
                        {upcomingAppointments.map(appt => (
                            <li key={appt.id} className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
                                <div>
                                    <p className='font-semibold'>{appt.doctor}</p>
                                    <p className='text-sm text-muted-foreground'>{appt.specialty}</p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-sm font-medium'>{appt.date.toLocaleDateString()}</p>
                                    <p className='text-sm text-muted-foreground'>{appt.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming appointments.</p>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Book a New Appointment</CardTitle>
                <CardDescription>Find a doctor and schedule a visit.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button className="mt-4 w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Book Now
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Book Appointment</DialogTitle>
                            <DialogDescription>
                                Please confirm the details for your new appointment.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="doctor" className="text-right">Doctor</Label>
                                <Input id="doctor" defaultValue="Dr. Verma" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">Date</Label>
                                <Input id="date" defaultValue={date?.toLocaleDateString()} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit" onClick={handleBooking}>Confirm</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    </div>
  );
}
