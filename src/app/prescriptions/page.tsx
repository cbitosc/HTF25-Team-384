import { DashboardLayout } from '@/components/dashboard-layout';
import { SmartPrescriptionReader } from '@/components/smart-prescription-reader';

export default function PrescriptionsPage() {
  return (
    <DashboardLayout>
      <main>
        <SmartPrescriptionReader />
      </main>
    </DashboardLayout>
  );
}
