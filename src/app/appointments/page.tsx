import { DashboardLayout } from '@/components/dashboard-layout';
import { Header } from '@/components/header';
import { Appointments } from '@/components/appointments';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <main className="space-y-4">
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Appointments
                </h1>
                <p className="text-muted-foreground">
                    Manage your upcoming and past appointments.
                </p>
            </CardHeader>
        </Card>
        <Appointments />
      </main>
    </DashboardLayout>
  );
}
