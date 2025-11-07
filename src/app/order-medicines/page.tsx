import { DashboardLayout } from '@/components/dashboard-layout';
import { OrderMedicines } from '@/components/order-medicines';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OrderMedicinesPage() {
  return (
    <DashboardLayout>
      <main className="space-y-4">
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="p-0">
                <h1 className="text-3xl font-bold tracking-tight font-headline">
                    Order Medicines
                </h1>
                <p className="text-muted-foreground">
                    Get your medicines delivered to your doorstep.
                </p>
            </CardHeader>
        </Card>
        <OrderMedicines />
      </main>
    </DashboardLayout>
  );
}
