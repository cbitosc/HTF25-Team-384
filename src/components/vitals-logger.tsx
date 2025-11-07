
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Activity, Droplet, Gauge, HeartPulse, Mic, Plus, Loader2, Thermometer, Wind } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logVitalsWithVoice } from '@/ai/flows/log-vitals-with-voice-flow';
import { useTranslation } from '@/hooks/use-translation';

const VitalsTab = ({
  label,
  unit,
  id,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm">
      {label}
    </Label>
    <div className="flex items-center gap-2">
      <Input id={id} name={id} placeholder={`Enter ${label.toLowerCase()}`} value={value} onChange={onChange} />
      <span className="text-sm text-muted-foreground">{unit}</span>
    </div>
  </div>
);

export function VitalsLogger() {
    const { t } = useTranslation();
    const [vitals, setVitals] = useState({
        sugar: '',
        bp: '',
        pain: '',
        heartRate: '',
        temperature: '',
        oxygen: '',
    });
    const [isListening, setIsListening] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const { toast } = useToast();
    const recognitionRef = useRef<any>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVitals(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveLog = () => {
        // In a real app, you'd send this data to a server.
        console.log('Saving vitals:', vitals);
        toast({
            title: 'Vitals Saved',
            description: 'Your health data has been successfully logged.',
        });
        // Clear fields after saving
        setVitals({ sugar: '', bp: '', pain: '', heartRate: '', temperature: '', oxygen: '' });
    };

    const handleVoiceLog = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast({
                variant: 'destructive',
                title: 'Voice Recognition Not Supported',
                description: 'Your browser does not support voice recognition.',
            });
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            toast({ title: 'Listening...', description: 'Please speak your vitals clearly.' });
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            toast({
                variant: 'destructive',
                title: 'Voice Recognition Error',
                description: event.error === 'not-allowed' ? 'Microphone access was denied.' : 'An error occurred during voice recognition.',
            });
            setIsListening(false);
        };

        recognition.onresult = async (event: any) => {
            const spokenText = event.results[0][0].transcript;
            toast({ title: 'Processing your voice log...' });
            setAiLoading(true);
            try {
                const parsedVitals = await logVitalsWithVoice({ phrase: spokenText });
                setVitals(prev => ({
                    ...prev,
                    sugar: parsedVitals.bloodSugar?.toString() || prev.sugar,
                    bp: parsedVitals.bloodPressure || prev.bp,
                    pain: parsedVitals.painLevel?.toString() || prev.pain,
                    heartRate: parsedVitals.heartRate?.toString() || prev.heartRate,
                    temperature: parsedVitals.temperature?.toString() || prev.temperature,
                    oxygen: parsedVitals.oxygen?.toString() || prev.oxygen,
                }));
                toast({
                    variant: 'default',
                    title: 'Vitals Updated',
                    description: 'Your vitals have been updated from your voice input.',
                });
            } catch (error) {
                console.error('Error parsing vitals with AI', error);
                toast({
                    variant: 'destructive',
                    title: 'AI Parsing Error',
                    description: 'Could not understand the vitals from your speech.',
                });
            } finally {
                setAiLoading(false);
            }
        };

        recognition.start();
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary"/>
            <span>{t('vitals_logger_title')}</span>
        </CardTitle>
        <CardDescription>{t('vitals_logger_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sugar" className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="mb-4 inline-grid w-auto grid-cols-6 min-w-full sm:min-w-fit">
                <TabsTrigger value="sugar" className="text-xs sm:text-sm"><Droplet className="w-4 h-4 mr-1"/>{t('vitals_sugar')}</TabsTrigger>
                <TabsTrigger value="bp" className="text-xs sm:text-sm"><HeartPulse className="w-4 h-4 mr-1"/>{t('vitals_bp')}</TabsTrigger>
                <TabsTrigger value="pain" className="text-xs sm:text-sm"><Gauge className="w-4 h-4 mr-1"/>{t('vitals_pain')}</TabsTrigger>
                <TabsTrigger value="heartRate" className="text-xs sm:text-sm"><HeartPulse className="w-4 h-4 mr-1"/>Heart Rate</TabsTrigger>
                <TabsTrigger value="temp" className="text-xs sm:text-sm"><Thermometer className="w-4 h-4 mr-1"/>Temp</TabsTrigger>
                <TabsTrigger value="oxygen" className="text-xs sm:text-sm"><Wind className="w-4 h-4 mr-1"/>Oxygen</TabsTrigger>
              </TabsList>
            </div>
          <TabsContent value="sugar">
            <VitalsTab label={t('vitals_log_blood_sugar')} unit="mg/dL" id="sugar" value={vitals.sugar} onChange={handleInputChange} />
          </TabsContent>
          <TabsContent value="bp">
            <VitalsTab label={t('vitals_log_blood_pressure')} unit="mmHg" id="bp" value={vitals.bp} onChange={handleInputChange}/>
          </TabsContent>
          <TabsContent value="pain">
            <VitalsTab label={t('vitals_log_pain_level')} unit="/ 10" id="pain" value={vitals.pain} onChange={handleInputChange}/>
          </TabsContent>
           <TabsContent value="heartRate">
            <VitalsTab label="Heart Rate" unit="bpm" id="heartRate" value={vitals.heartRate} onChange={handleInputChange}/>
          </TabsContent>
           <TabsContent value="temp">
            <VitalsTab label="Temperature" unit="°F" id="temperature" value={vitals.temperature} onChange={handleInputChange}/>
          </TabsContent>
           <TabsContent value="oxygen">
            <VitalsTab label="Oxygen Saturation" unit="%" id="oxygen" value={vitals.oxygen} onChange={handleInputChange}/>
          </TabsContent>
        </Tabs>
        <div className="flex gap-2 mt-4">
          <Button className="w-full" onClick={handleSaveLog}>
            <Plus className="mr-2 h-4 w-4" />
            {t('vitals_save_log')}
          </Button>
          <Button variant="secondary" size="icon" aria-label={t('vitals_log_with_voice')} onClick={handleVoiceLog} disabled={isListening || aiLoading}>
            {isListening || aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

    