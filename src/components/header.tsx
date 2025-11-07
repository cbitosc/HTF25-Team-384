
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";
import { Languages, Siren } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const { language, setLanguage } = useTranslation();
  const { toast } = useToast();

  const handleSos = () => {
    // This will attempt to open the device's dialer with an emergency number.
    // In a real-world scenario, this would be integrated with a proper emergency service.
    window.location.href = "tel:102"; 
    toast({
        title: "Emergency Alert Sent",
        description: "Your location and details have been shared with emergency contacts.",
    });
  }

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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Siren className="w-4 h-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">SOS</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to send an SOS alert?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will immediately notify your emergency contacts and local services with your current location. Only use this in a genuine emergency.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSos}>
                Yes, Send Alert
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
      <UserNav />
    </>
  );
}
