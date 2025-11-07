
import { DashboardLayout } from '@/components/dashboard-layout';
import { AiHealthAssistant } from '@/components/ai-health-assistant';
import { QuickAccess } from '@/components/quick-access';
import { VitalsLogger } from '@/components/vitals-logger';
import { MoodTracker } from '@/components/mood-tracker';
import { HealthWallet } from '@/components/health-wallet';
import { FamilyHealthHub } from '@/components/family-health-hub';
import { HealthLiteracyCard } from '@/components/health-literacy-card';
import { ExplainMyReport } from '@/components/explain-my-report';
import { PersonalizedHealthPlan } from '@/components/personalized-health-plan';
import { MentalWellness } from '@/components/mental-wellness';
import { DashboardHeader } from '@/components/dashboard-header';
import { Eli5Card } from '@/components/eli5-card';


export default function DashboardPage() {
  
  return (
    <DashboardLayout header={<DashboardHeader />}>
          <QuickAccess />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <AiHealthAssistant />
            </div>
             <div className="lg:col-span-2">
              <Eli5Card />
            </div>
            <div className="lg:col-span-1">
              <VitalsLogger />
            </div>
            <div className="lg:col-span-1">
              <MoodTracker />
            </div>
            <div className="lg:col-span-1">
              <HealthWallet />
            </div>
            <div className="lg:col-span-1">
              <FamilyHealthHub />
            </div>
            <div className="lg:col-span-1">
                <ExplainMyReport />
            </div>
            <div className="lg:col-span-1">
              <PersonalizedHealthPlan />
            </div>
            <div className="lg:col-span-1">
              <MentalWellness />
            </div>
            <div className="lg:col-span-1">
              <HealthLiteracyCard />
            </div>
          </div>
    </DashboardLayout>
  );
}
