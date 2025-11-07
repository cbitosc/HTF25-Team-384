'use client';
import { healthDocuments } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { FileText, FlaskConical, ShieldCheck, Upload, Wallet } from 'lucide-react';
import { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

const iconMap: { [key: string]: React.ElementType } = {
  prescription: FileText,
  'lab report': FlaskConical,
  insurance: ShieldCheck,
};

export function HealthWallet() {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Selected",
        description: `${file.name} is ready for upload.`,
      });
      // In a real app, you would handle the file upload process here.
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          <span>{t('health_wallet_title')}</span>
        </CardTitle>
        <CardDescription>{t('health_wallet_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {healthDocuments.map((doc) => {
            const Icon = iconMap[doc.type] || FileText;
            return (
              <li key={doc.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.date}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter>
        <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
        />
        <Button variant="outline" className="w-full" onClick={handleUploadClick}>
          <Upload className="mr-2 h-4 w-4" />
          {t('health_wallet_upload_document')}
        </Button>
      </CardFooter>
    </Card>
  );
}
