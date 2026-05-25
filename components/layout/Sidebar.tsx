"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Map,
  BookOpen,
  Layers,
  Trophy,
  BarChart3,
  MessageSquare,
  Beaker,
  FileText,
  Settings,
  Rocket,
  Menu,
  X,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { StreakCounter } from "@/components/shared/StreakCounter";
import { XPBar } from "@/components/shared/XPBar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { UserMenu } from "@/components/layout/UserMenu";

interface NavItem {
  href: string;
  label: string;
  icon: typeof Home;
}

const NAV_PRIMARY: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/curriculum", label: "Curriculum Map", icon: Map },
  { href: "/study", label: "Study Session", icon: BookOpen },
  { href: "/cards", label: "Review Cards", icon: Layers },
  { href: "/tests", label: "Tests", icon: Trophy },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/history", label: "History", icon: History },
];
const NAV_SECONDARY: NavItem[] = [
  { href: "/tutor", label: "AI Tutor", icon: MessageSquare },
  { href: "/lab", label: "Code Lab", icon: Beaker },
  { href: "/notes", label: "Notes", icon: FileText },
];
const NAV_FOOTER: NavItem[] = [{ href: "/settings", label: "Settings", icon: Settings }];

interface SidebarProps {
  streakDays?: number;
  totalXp?: number;
}

export function Sidebar({ streakDays = 0, totalXp = 0 }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
    return pathname.startsWith(href);
  };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={cn(
          "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
          active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
        )}
        aria-current={active ? "page" : undefined}
      >
        {active && (
          <motion.span
            layoutId="sidebar-active"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-1 rounded-r-full bg-brand-gold"
          />
        )}
        <Icon className={cn("h-4 w-4 shrink-0", active ? "text-brand-gold" : "text-white/60 group-hover:text-white")} />
        <span>{item.label}</span>
      </Link>
    );
  };

  const Body = (
    <>
      <div className="flex items-center gap-2.5 px-5 pb-4 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold/15 ring-1 ring-brand-gold/30">
          <Rocket className="h-5 w-5 text-brand-gold" />
        </div>
        <div className="leading-tight">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">Master</p>
          <p className="text-sm font-bold">Study App</p>
        </div>
        <div className="ml-auto md:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-1.5 text-white/70 hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <Separator className="bg-white/10" />
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1" aria-label="Primary">
          {NAV_PRIMARY.map(renderItem)}
        </nav>
        <p className="mb-1 mt-6 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/40">Tools</p>
        <nav className="space-y-1" aria-label="Tools">
          {NAV_SECONDARY.map(renderItem)}
        </nav>
        <Separator className="my-4 bg-white/10" />
        <nav className="space-y-1" aria-label="Settings">
          {NAV_FOOTER.map(renderItem)}
        </nav>
      </ScrollArea>
      <div className="space-y-3 border-t border-white/10 p-4">
        <UserMenu />
        <div className="flex items-center justify-between gap-2">
          <StreakCounter days={streakDays} size="sm" className="bg-orange-500/15 ring-orange-500/30 text-orange-200" />
          <ThemeToggle className="text-white/70 hover:bg-white/10 hover:text-white" />
        </div>
        <XPBar xp={totalXp} />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-2 border-b bg-background/95 px-4 py-2 backdrop-blur md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-1.5 hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-navy">
          <Rocket className="h-3.5 w-3.5 text-brand-gold" />
        </div>
        <span className="text-sm font-semibold">Master Study App</span>
        <ThemeToggle className="ml-auto" />
      </div>

      {/* Desktop sidebar */}
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen w-[220px] flex-col bg-brand-navy text-white shadow-xl md:flex"
        aria-label="Sidebar"
      >
        {Body}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="relative flex h-full w-[260px] flex-col bg-brand-navy text-white shadow-xl"
          >
            {Body}
          </motion.aside>
        </div>
      )}
    </>
  );
}
