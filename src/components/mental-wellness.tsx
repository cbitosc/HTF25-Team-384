
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, BookOpen, Volume2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useTranslation } from '@/hooks/use-translation';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';

const meditationScript = "Welcome to this moment of calm. Find a comfortable position. Close your eyes, and take a deep breath in... and out. Feel the ground beneath you. Notice the gentle rhythm of your breath... as it flows in... and out. Let any thoughts drift by like clouds in the sky. You are here, in this peaceful present moment. Take one more deep breath... and when you're ready, gently open your eyes.";

export function MentalWellness() {
  const { t } = useTranslation();
  const [showMeditation, setShowMeditation] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStartMeditation = async () => {
    if (audioDataUri) {
        setShowMeditation(true);
        return;
    }

    setLoading(true);
    try {
      const response = await textToSpeech({ text: meditationScript });
      if (response.audioDataUri) {
        setAudioDataUri(response.audioDataUri);
        setShowMeditation(true);
        toast({
            title: "Meditation Ready",
            description: "Take a moment to relax and follow the guide.",
        });
      } else {
        // This will be caught by the catch block below
        throw new Error("Audio generation returned empty data.");
      }
    } catch (error) {
        console.error("Failed to generate meditation audio:", error);
        toast({
            variant: 'destructive',
            title: "Audio Failed",
            description: "Could not prepare the meditation audio. Please try again.",
        });
    } finally {
        setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            <span>{t('mental_wellness_title')}</span>
        </CardTitle>
        <CardDescription>{t('mental_wellness_description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-base">
          {t('mental_wellness_meditation_prompt')}
        </p>
        {!showMeditation && (
            <Button onClick={handleStartMeditation} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookOpen className="mr-2 h-4 w-4" />}
                {t('mental_wellness_start_meditation')}
            </Button>
        )}
        
        <Collapsible open={showMeditation} onOpenChange={setShowMeditation} className="w-full">
            <CollapsibleContent>
                <Card className='w-full text-left mt-4'>
                    <CardContent className='p-4 space-y-4'>
                        <p className='text-sm'>{meditationScript}</p>
                        {audioDataUri && (
                            <audio controls src={audioDataUri} className="w-full mt-4">
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </CardContent>
                </Card>
            </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
