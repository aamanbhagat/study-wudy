import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AiProvider = "auto" | "anthropic" | "gemini" | "grok";

interface SettingsState {
  theme: "light" | "dark" | "system";
  dailyMinuteTarget: number;
  showLatex: boolean;
  aiProvider: AiProvider;
  setTheme: (t: "light" | "dark" | "system") => void;
  setDailyMinuteTarget: (n: number) => void;
  setShowLatex: (b: boolean) => void;
  setAiProvider: (p: AiProvider) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      dailyMinuteTarget: 240,
      showLatex: true,
      aiProvider: "auto",
      setTheme: (theme) => set({ theme }),
      setDailyMinuteTarget: (dailyMinuteTarget) => set({ dailyMinuteTarget }),
      setShowLatex: (showLatex) => set({ showLatex }),
      setAiProvider: (aiProvider) => set({ aiProvider }),
    }),
    { name: "master-study-settings" },
  ),
);

export function providerForRequest(p: AiProvider): "anthropic" | "gemini" | "grok" | undefined {
  return p === "auto" ? undefined : p;
}
