"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Smile, Frown, Meh, SmilePlus, CloudRain, Wind } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

export function MoodTracker() {
  const { t } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { toast } = useToast();

  const moods = [
    { name: t('mood_happy'), icon: Smile, color: 'text-green-500', key: 'Happy' },
    { name: t('mood_calm'), icon: Wind, color: 'text-teal-500', key: 'Calm' },
    { name: t('mood_neutral'), icon: Meh, color: 'text-yellow-500', key: 'Neutral' },
    { name: t('mood_anxious'), icon: CloudRain, color: 'text-purple-500', key: 'Anxious' },
    { name: t('mood_sad'), icon: Frown, color: 'text-blue-500', key: 'Sad' },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    toast({
        title: "Mood Logged!",
        description: `You've logged your mood as: ${mood}`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <SmilePlus className="w-5 h-5 text-primary" />
            <span>{t('mood_tracker_title')}</span>
        </CardTitle>
        <CardDescription>{t('mood_tracker_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around flex-wrap">
          {moods.map((mood) => (
            <Button
              key={mood.key}
              variant="ghost"
              className={cn(
                'flex flex-col h-16 w-16 sm:h-20 sm:w-20 rounded-lg items-center justify-center gap-1 transition-all',
                selectedMood === mood.key ? 'bg-accent' : ''
              )}
              onClick={() => handleMoodSelect(mood.key)}
              aria-pressed={selectedMood === mood.key}
              aria-label={`Select mood: ${mood.name}`}
            >
              <mood.icon className={cn('w-6 h-6 sm:w-8 sm:h-8', mood.color)} />
              <span className="text-xs text-muted-foreground">{mood.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
