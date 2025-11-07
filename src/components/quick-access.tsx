'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText, Pill, Video, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";

export function QuickAccess() {
    const { t } = useTranslation();

    const quickAccessItems = [
      { label: t("quick_access_appointments"), icon: Calendar, href: "/appointments" },
      { label: t("quick_access_teleconsultation"), icon: Video, href: "/teleconsultation" },
      { label: t("messages"), icon: MessageSquare, href: "/messages"},
      { label: t("quick_access_order_medicines"), icon: Pill, href: "/order-medicines" },
      { label: t("prescriptions"), icon: FileText, href: "/prescriptions" },
    ];

  return (
    <Card>
      <CardContent className="p-2 sm:p-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
          {quickAccessItems.map((item) => (
            <Link href={item.href} key={item.label}>
                <Button variant="outline" className="w-full h-20 sm:h-24 flex flex-col items-center justify-center gap-1 p-1">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-center">{item.label}</span>
                </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
