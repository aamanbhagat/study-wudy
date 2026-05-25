"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  streakDays?: number;
  totalXp?: number;
}

const PUBLIC_ROUTES = ["/login", "/signup", "/auth/callback"];

export function AppLayout({ children, streakDays, totalXp }: AppLayoutProps) {
  const pathname = usePathname();
  const isPublic = PUBLIC_ROUTES.some((p) => pathname?.startsWith(p));

  if (isPublic) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{children}</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar streakDays={streakDays} totalXp={totalXp} />
      <main className="md:pl-[220px]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
