import { DashboardLayout } from '@/components/dashboard-layout';
import { Teleconsultation } from '@/components/teleconsultation';

export default function TeleconsultationPage() {
  return (
    <DashboardLayout>
      <main className="h-full">
        <Teleconsultation />
      </main>
    </DashboardLayout>
  );
}
