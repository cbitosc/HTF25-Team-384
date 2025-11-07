
"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { AlertTriangle, PhoneOutgoing } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

type PreventiveNudgeAlertProps = {
  message: string;
};

export function PreventiveNudgeAlert({ message }: PreventiveNudgeAlertProps) {
  const { t } = useTranslation();
  return (
    <Alert variant="destructive" className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-6 w-6" />
        <div>
          <AlertTitle className="font-bold">{t('preventive_nudge_title')}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
      <Button variant="destructive" size="sm" className="ml-4 shrink-0 bg-white text-red-600 hover:bg-white/90">
        <PhoneOutgoing className="mr-2 h-4 w-4" />
        {t('preventive_nudge_contact_doctor')}
      </Button>
    </Alert>
  );
}
