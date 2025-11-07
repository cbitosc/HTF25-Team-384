
"use client";

import { explainLikeIm5, ExplainLikeIm5Output } from '@/ai/flows/explain-like-im-5-mode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Pill, Sunrise, Sunset, UtensilsCrossed, Volume2, Bot, Loader2, Upload, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const instruction = "Take 1 tablet Metformin 500 mg BID with food.";

const iconMap: { [key: string]: React.ElementType } = {
  pill: Pill,
  morning: Sunrise,
  night: Sunset,
  food: UtensilsCrossed,
  breakfast: UtensilsCrossed,
  sunrise: Sunrise,
  sunset: Sunset,
  tablet: Pill,
};

export function Eli5Card() {
  const [eli5, setEli5] = useState<ExplainLikeIm5Output | null>(null);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const getExplanation = async () => {
    try {
      setLoading(true);
      const result = await explainLikeIm5({ instruction, language: 'English' });
      setEli5(result);
      if (result.audioDataUri) {
        setAudio(new Audio(result.audioDataUri));
      }
    } catch (error) {
      console.error("Error fetching ELI5 explanation:", error);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
           <Bot className="w-5 h-5 text-primary" />
          <span>Your Prescription Explained</span>
        </CardTitle>
        <CardDescription>Original: "{instruction}"</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="ml-2">Simplifying your prescription...</p>
          </div>
        ) : eli5 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-background rounded-lg">
               <div className="flex -space-x-2">
                {eli5.iconSuggestions.map((iconName, index) => {
                  const Icon = iconMap[iconName.toLowerCase()];
                  if (!Icon) return null;
                  return (
                      <div key={index} className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center ring-2 ring-background">
                          <Icon className="w-5 h-5" />
                      </div>
                  )
                })}
               </div>
              <p className="text-lg font-semibold text-foreground">
                {eli5.simpleExplanation}
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="w-full" variant="outline" onClick={playAudio} disabled={!audio}>
                <Volume2 className="mr-2 h-4 w-4" />
                Play Audio
              </Button>
              <Link href="/prescriptions" className="w-full">
                <Button className="w-full" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Prescription
                </Button>
              </Link>
            </div>
          </div>
        ) : (
            <Button onClick={getExplanation} className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Simplify
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
