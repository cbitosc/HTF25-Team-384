
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useState, useEffect } from 'react';

const tips = [
    'health_literacy_tip_1',
    'health_literacy_tip_2',
    'health_literacy_tip_3',
    'health_literacy_tip_4',
    'health_literacy_tip_5',
    'health_literacy_tip_6',
];

export function HealthLiteracyCard() {
  const { t } = useTranslation();
  const [randomTip, setRandomTip] = useState('');

  useEffect(() => {
    // This check is to prevent hydration mismatch errors in Next.js
    // by ensuring random number generation happens only on the client.
    const randomIndex = Math.floor(Math.random() * tips.length);
    setRandomTip(t(tips[randomIndex]));
  }, [t]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span>{t('health_literacy_title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base">
            {randomTip || t(tips[0])}
        </p>
      </CardContent>
    </Card>
  );
}
