
"use client";

import { DoctorHeader } from '@/components/doctor/doctor-header';
import { PrescriptionApprovalQueue } from '@/components/doctor/prescription-approval-queue';
import { Button } from '@/components/ui/button';
import { LanguageProvider } from '@/hooks/use-translation';
import { LayoutDashboard, Users, HeartPulse, LogOut, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function DoctorOrdersPage() {
  return (
    <LanguageProvider>
      <div className="flex h-screen bg-secondary/50">
          <aside className="w-64 bg-background p-4 flex flex-col justify-between">
              <div>
                  <div className="flex items-center gap-2 p-2 mb-8">
                      <HeartPulse className="w-8 h-8 text-primary" />
                      <h1 className="text-xl font-bold font-headline text-primary">
                          MediHub
                      </h1>
                  </div>
                  <nav className="space-y-2">
                      <Link href="/doctor-dashboard">
                          <Button variant="ghost" className="w-full justify-start text-base">
                              <LayoutDashboard className="mr-2" />
                              Dashboard
                          </Button>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start text-base bg-primary/10 text-primary">
                          <ShoppingCart className="mr-2" />
                          Patient Orders
                      </Button>
                       <Link href="/doctor-dashboard/community-health">
                          <Button variant="ghost" className="w-full justify-start text-base">
                              <HeartPulse className="mr-2" />
                              Community Health
                          </Button>
                      </Link>
                  </nav>
              </div>
              <Link href="/">
                  <Button variant="ghost" className="w-full justify-start text-base">
                      <LogOut className="mr-2" />
                      Back to Home
                  </Button>
              </Link>
          </aside>
          <div className="flex flex-col flex-1 overflow-y-auto">
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-8">
                  <div className="flex-1">
                      <h1 className="text-2xl font-bold tracking-tight">Patient Orders</h1>
                      <p className="text-muted-foreground text-sm">Review and approve prescription requests.</p>
                  </div>
                  <DoctorHeader />
              </header>
              <main className="p-8 space-y-6">
                  <PrescriptionApprovalQueue />
              </main>
          </div>
      </div>
    </LanguageProvider>
  );
}
