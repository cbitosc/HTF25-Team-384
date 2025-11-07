'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, Sparkles, Volume2 } from 'lucide-react';
import { smartPrescriptionReader, SmartPrescriptionReaderOutput } from '@/ai/flows/smart-prescription-reader-flow';
import Image from 'next/image';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';
import { useToast } from '@/hooks/use-toast';

export function SmartPrescriptionReader() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartPrescriptionReaderOutput | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      setAudio(null);
    }
  };

  const toDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  }

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setAudio(null);
    try {
        const dataUri = await toDataURL(file);
        const response = await smartPrescriptionReader({ photoDataUri: dataUri });
        setResult(response);
    } catch (error) {
      console.error('Error with prescription reader:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze the prescription image. Please try another one.',
      });
    }
    setLoading(false);
  };
  
  const handlePlayAudio = async () => {
    if (!result?.parsedPrescription) return;

    if (audio) {
      audio.play();
      return;
    }

    setAudioLoading(true);
    try {
      const summaryText = result.parsedPrescription.map(p => p.instruction).join('. ');
      const response = await textToSpeech({ text: summaryText || 'No prescription details found.' });
      if (response.audioDataUri) {
        const newAudio = new Audio(response.audioDataUri);
        setAudio(newAudio);
        newAudio.play();
      } else {
        toast({
            variant: 'destructive',
            title: 'Audio Generation Failed',
            description: 'Could not generate audio for the summary. Please try again later.',
        });
      }
    } catch (error) {
        console.error("Failed to generate audio:", error);
        toast({
            variant: 'destructive',
            title: 'Audio Generation Failed',
            description: 'Could not generate audio for the summary. Please try again later.',
        });
    } finally {
        setAudioLoading(false);
    }
  }

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          <span>Smart Prescription Reader</span>
        </CardTitle>
        <CardDescription>
          Upload an image of your prescription to get a digital summary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
              <input type="file" accept="image/*" className="hidden" id="prescription-upload" onChange={handleFileChange} />
              <label htmlFor="prescription-upload" className="flex flex-col items-center justify-center w-full h-full text-center p-4 cursor-pointer">
                {previewUrl ? (
                    <Image src={previewUrl} alt="Prescription preview" width={200} height={200} className="max-h-full w-auto object-contain rounded-md" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                  </>
                )}
              </label>
            </div>
            <Button onClick={handleSubmit} disabled={loading || !file} className="w-full">
              {loading ? <Loader2 className="animate-spin" /> : 'Analyze Prescription'}
            </Button>
          </div>
          <div className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="ml-2">Reading your prescription...</p>
            </div>
          )}
          {result && (
              <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2 text-xl">
                        <div className='flex items-center gap-2'>
                          <Sparkles className="w-5 h-5 text-primary" />
                          Extracted Details
                        </div>
                        <Button variant="outline" size="icon" onClick={handlePlayAudio} disabled={audioLoading}>
                            {audioLoading ? <Loader2 className="animate-spin h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            <span className="sr-only">Listen to Summary</span>
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {result.parsedPrescription.length > 0 ? (
                        <div className="space-y-4">
                            {result.parsedPrescription.map((item, index) => (
                                <div key={index} className="p-3 bg-background rounded-md">
                                    <p className="font-semibold text-base">{item.medication}</p>
                                    <p className="text-sm text-muted-foreground">{item.dosage} - {item.frequency}</p>
                                    <p className="text-base font-medium mt-1">{item.instruction}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Could not parse prescription details. Please try another image.</p>
                    )}
                </CardContent>
              </Card>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
