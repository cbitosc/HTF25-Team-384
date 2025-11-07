
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserNav } from "../user-nav";
import { Languages } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { DoctorSosQueue } from "./doctor-sos-queue";

export function DoctorHeader() {
  const { language, setLanguage } = useTranslation();

  return (
    <>
      <div className="ml-auto flex items-center gap-2">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-auto h-9 text-xs border-none bg-transparent shadow-none">
            <Languages className="w-4 h-4 mr-1" />
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
            <SelectItem value="bn">বাংলা</SelectItem>
            <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
            <SelectItem value="ta">தமிழ்</SelectItem>
            <SelectItem value="te">తెలుగు</SelectItem>
          </SelectContent>
        </Select>

        <DoctorSosQueue />

      </div>
      <UserNav />
    </>
  );
}
