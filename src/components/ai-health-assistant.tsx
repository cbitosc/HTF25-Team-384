"use client";
import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';
import { symptomChecker, SymptomCheckerOutput } from '@/ai/flows/symptom-checker-flow';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useTranslation } from '@/hooks/use-translation';

export function AiHealthAssistant() {
    const { t } = useTranslation();
    const [symptoms, setSymptoms] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<SymptomCheckerOutput | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setResult(null);
        try {
            const response = await symptomChecker({ symptoms });
            setResult(response);
        } catch (error) {
            console.error("Error with symptom checker:", error);
        }
        setLoading(false);
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span>{t('ai_assistant_title')}</span>
        </CardTitle>
        <CardDescription>
          {t('ai_assistant_description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            <Textarea 
                placeholder={t('ai_assistant_placeholder')}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={loading || !symptoms.trim()} className="w-full">
                {loading ? t('ai_assistant_analyzing') : t('ai_assistant_button')}
            </Button>

            {result && (
                 <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertTitle>{t('ai_analysis_title')}</AlertTitle>
                    <AlertDescription>
                       <p className='font-semibold mt-2'>{t('analysis')}:</p>
                       <p>{result.analysis}</p>
                       <p className='font-semibold mt-2'>{t('recommendation')}:</p>
                       <p>{result.recommendation}</p>
                       <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {t('disclaimer')}
                        </div>
                    </AlertDescription>
                </Alert>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
