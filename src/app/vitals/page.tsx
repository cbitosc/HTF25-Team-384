
import { DashboardLayout } from '@/components/dashboard-layout';
import { VitalsLogger } from '@/components/vitals-logger';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function VitalsPage() {
  return (
    <DashboardLayout>
      <main className="space-y-4">
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Health Vitals
                </h1>
                <p className="text-muted-foreground">
                    Track and manage your health metrics.
                </p>
            </CardHeader>
        </Card>
        <div>
            <VitalsLogger />
        </div>
      </main>
    </DashboardLayout>
  );
}
