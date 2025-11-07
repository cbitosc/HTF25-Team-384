"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles, AlertCircle, FileText, Loader2 } from 'lucide-react';
import { explainMyReport, ExplainMyReportOutput } from '@/ai/flows/explain-my-report';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useTranslation } from '@/hooks/use-translation';

const sampleReport = `
Test Name: Complete Blood Count (CBC)
Hemoglobin: 11.2 g/dL (Normal: 13.5-17.5) - Slightly Low
White Blood Cell Count: 8,500 /mcL (Normal: 4,500-11,000)
Platelet Count: 140,000 /mcL (Normal: 150,000-450,000) - Borderline Low
`;

export function ExplainMyReport() {
    const { t } = useTranslation();
    const [reportText, setReportText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ExplainMyReportOutput | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        setResult(null);
        try {
            const response = await explainMyReport({ report: reportText || sampleReport });
            setResult(response);
        } catch (error) {
            console.error("Error with explain my report:", error);
        }
        setLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>{t('explain_my_report_title')}</span>
                </CardTitle>
                <CardDescription>
                    {t('explain_my_report_description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Textarea
                        placeholder={sampleReport.trim()}
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        rows={6}
                    />
                    <Button onClick={handleSubmit} disabled={loading} className="w-full">
                        {loading ? <Loader2 className="animate-spin" /> : t('explain_my_report_button')}
                    </Button>

                    {result && (
                        <Alert>
                            <Sparkles className="h-4 w-4" />
                            <AlertTitle>{t('explain_my_report_ai_title')}</AlertTitle>
                            <AlertDescription>
                                <p className='font-semibold mt-2'>{t('summary')}:</p>
                                <p>{result.summary}</p>
                                <Accordion type="single" collapsible className="w-full mt-3">
                                    {result.breakdown.map((item, index) => (
                                        <AccordionItem value={`item-${index}`} key={index}>
                                            <AccordionTrigger>{item.parameter}: <span className="ml-2 font-bold">{item.value}</span></AccordionTrigger>
                                            <AccordionContent>
                                                {item.explanation}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                                <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    {t('disclaimer_info_only')}
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
