
import { DashboardLayout } from '@/components/dashboard-layout';
import { HealthWallet } from '@/components/health-wallet';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function WalletPage() {
  return (
    <DashboardLayout>
      <main className="space-y-4">
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Health Wallet
                </h1>
                <p className="text-muted-foreground">
                    Your secure digital health locker.
                </p>
            </CardHeader>
        </Card>
        <div>
            <HealthWallet />
        </div>
      </main>
    </DashboardLayout>
  );
}
