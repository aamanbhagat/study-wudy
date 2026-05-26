"use client";

import { useSettingsStore, providerForRequest } from "@/store/useSettingsStore";

/**
 * Returns the provider string to send with AI requests, or undefined when
 * the user has selected "auto" — in which case the server picks based on env.
 */
export function useAiProvider(): "anthropic" | "gemini" | "grok" | undefined {
  const aiProvider = useSettingsStore((s) => s.aiProvider);
  return providerForRequest(aiProvider);
}
