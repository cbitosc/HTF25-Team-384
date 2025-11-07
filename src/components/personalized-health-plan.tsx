"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Droplet, Utensils, Heart, CheckCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { useTranslation } from '@/hooks/use-translation';

export function PersonalizedHealthPlan() {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <span>{t('personalized_health_plan_title')}</span>
        </CardTitle>
        <CardDescription>{t('personalized_health_plan_description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-500" />
                    <p className="font-medium">{t('hydration')}</p>
                </div>
                <p className="font-semibold">6 / 8 glasses</p>
            </div>
            <Progress value={75} />
        </div>
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <p className="font-medium">{t('exercise')}</p>
                </div>
                <p className="font-semibold">20 / 30 mins</p>
            </div>
            <Progress value={66} />
        </div>
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-orange-500" />
                    <p className="font-medium">{t('calories')}</p>
                </div>
                <p className="font-semibold">1200 / 1800 kcal</p>
            </div>
            <Progress value={66} />
        </div>
        <div className="flex items-center gap-2 text-sm pt-2 text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{t('medication_completed')}</span>
        </div>
      </CardContent>
    </Card>
  );
}
