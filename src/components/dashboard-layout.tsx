
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bot, FileText, HeartPulse, Home, MessageSquare, Settings, Stethoscope, Video, Wallet, Pill, Calendar, LogOut } from "lucide-react";
import { Header } from "./header";
import { GlobalAlert } from "./global-alert";
import { DashboardHeader } from "./dashboard-header";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/teleconsultation", label: "Teleconsultation", icon: Video },
  { href: "/prescriptions", label: "Prescriptions", icon: FileText },
  { href: "/order-medicines", label: "Order Medicines", icon: Pill },
  { href: "/vitals", label: "Health Vitals", icon: HeartPulse },
  { href: "/wallet", label: "Health Wallet", icon: Wallet },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/", label: "Back to Home", icon: LogOut },
];

export function DashboardLayout({ children, header }: { children: React.ReactNode, header?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="bg-sidebar border-r">
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                    <HeartPulse className="w-8 h-8 text-primary" />
                    <h1 className="text-xl font-bold font-headline group-data-[collapsible=icon]:hidden text-primary">
                        MediHub
                    </h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
            <SidebarMenu>
                {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                    <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                        className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 overflow-y-auto">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-8">
                <SidebarTrigger className="md:hidden" />
                {header || <Header />}
            </header>
            <div className="space-y-6 p-4 sm:p-8 pt-6 bg-secondary/50 flex-1">
                {children}
            </div>
            <div className="p-4 bg-secondary/50">
                <GlobalAlert />
            </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
