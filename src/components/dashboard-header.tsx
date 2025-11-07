
"use client";

import { mockPatient } from '@/lib/data';
import { useTranslation } from '@/hooks/use-translation';
import { Header } from './header';

export function DashboardHeader() {
    const { t } = useTranslation();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('greeting_morning');
        if (hour < 18) return t('greeting_afternoon');
        return t('greeting_evening');
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex-1 space-y-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight font-headline">
                        {getGreeting()}, {mockPatient.name.split(' ')[0]}!
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {t('personal_health_companion')}
                    </p>
                </div>
            </div>
            <Header />
        </div>
    )
}
