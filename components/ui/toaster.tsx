"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Sonner
      theme={(resolvedTheme as "light" | "dark") ?? "light"}
      richColors
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "group toast",
        },
      }}
    />
  );
}
