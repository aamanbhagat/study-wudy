"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function next() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  if (!mounted) return <div className={cn("h-9 w-9", className)} />;

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Laptop;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={next}
      title={`Theme: ${theme}`}
      aria-label="Toggle theme"
      className={className}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
