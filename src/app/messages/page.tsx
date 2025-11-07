import { DashboardLayout } from '@/components/dashboard-layout';
import { Messages } from '@/components/messages';
import { Card, CardHeader } from '@/components/ui/card';

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <main className="flex flex-col h-full">
        <Card className="border-0 shadow-none bg-transparent mb-4">
            <CardHeader className="p-0">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Messages
                </h1>
                <p className="text-muted-foreground">
                    Communicate with your healthcare provider.
                </p>
            </CardHeader>
        </Card>
        <Messages />
      </main>
    </DashboardLayout>
  );
}
