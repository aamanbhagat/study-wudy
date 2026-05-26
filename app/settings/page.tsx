"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Settings as SettingsIcon, Save, KeyRound, Bell, Sun, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettingsStore, type AiProvider } from "@/store/useSettingsStore";

const SettingsSchema = z.object({
  displayName: z.string().min(1, "Required").max(40),
  dailyMinuteTarget: z.number().int().min(15).max(720),
  fieldFocus: z.enum(["balanced", "math", "cs", "physics"]),
  theme: z.enum(["light", "dark", "system"]),
  aiProvider: z.enum(["auto", "anthropic", "gemini", "grok"]),
  showLatex: z.boolean(),
  notifyMorningPlan: z.boolean(),
  notifySessionReminders: z.boolean(),
  notifyAnkiOverdue: z.boolean(),
  notifyStreakWarning: z.boolean(),
  anthropicKeyHint: z.string().optional(),
  geminiKeyHint: z.string().optional(),
});

type SettingsForm = z.infer<typeof SettingsSchema>;

const DEFAULTS: SettingsForm = {
  displayName: "Aman",
  dailyMinuteTarget: 240,
  fieldFocus: "balanced",
  theme: "system",
  aiProvider: "auto",
  showLatex: true,
  notifyMorningPlan: true,
  notifySessionReminders: true,
  notifyAnkiOverdue: true,
  notifyStreakWarning: true,
  anthropicKeyHint: "",
  geminiKeyHint: "",
};

const STORAGE_KEY = "settings-form-v1";

export default function SettingsPage() {
  const { setTheme, setDailyMinuteTarget, setShowLatex, setAiProvider } = useSettingsStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SettingsForm>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: DEFAULTS,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<SettingsForm>;
        reset({ ...DEFAULTS, ...parsed });
      } catch {
        // ignore
      }
    }
  }, [reset]);

  async function onSubmit(values: SettingsForm) {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    setTheme(values.theme);
    setDailyMinuteTarget(values.dailyMinuteTarget);
    setShowLatex(values.showLatex);
    setAiProvider(values.aiProvider as AiProvider);
    // Future: persist to Supabase user_settings.
    await new Promise((r) => setTimeout(r, 250));
    toast.success("Settings saved.");
  }

  const dailyTarget = watch("dailyMinuteTarget");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Daily targets, theme, notifications, API keys.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <SettingsIcon className="h-4 w-4 text-brand-navy" /> Profile & study targets
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="displayName">Display name</Label>
              <Input id="displayName" {...register("displayName")} />
              {errors.displayName && (
                <p className="text-xs text-destructive">{errors.displayName.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Field focus</Label>
              <Select value={watch("fieldFocus")} onValueChange={(v) => setValue("fieldFocus", v as SettingsForm["fieldFocus"], { shouldDirty: true })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced (all 3 fields)</SelectItem>
                  <SelectItem value="math">Math-heavy</SelectItem>
                  <SelectItem value="cs">CS-heavy</SelectItem>
                  <SelectItem value="physics">Physics-heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Daily minute target</Label>
                <span className="font-mono text-sm tabular-nums">{dailyTarget} min</span>
              </div>
              <Slider
                min={15}
                max={720}
                step={15}
                value={[dailyTarget]}
                onValueChange={(v) => setValue("dailyMinuteTarget", v[0], { shouldDirty: true })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sun className="h-4 w-4 text-brand-navy" /> Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Theme</Label>
              <Select value={watch("theme")} onValueChange={(v) => setValue("theme", v as SettingsForm["theme"], { shouldDirty: true })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Render LaTeX in cards & notes</p>
                <p className="text-xs text-muted-foreground">Disable for plain math display.</p>
              </div>
              <Switch
                checked={watch("showLatex")}
                onCheckedChange={(v) => setValue("showLatex", v, { shouldDirty: true })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-brand-navy" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <ToggleRow
              label="Morning study plan"
              hint="Daily AI-built plan posted at session start."
              checked={watch("notifyMorningPlan")}
              onChange={(v) => setValue("notifyMorningPlan", v, { shouldDirty: true })}
            />
            <ToggleRow
              label="Session reminders"
              hint="Nudge if you haven't started a session by your usual time."
              checked={watch("notifySessionReminders")}
              onChange={(v) => setValue("notifySessionReminders", v, { shouldDirty: true })}
            />
            <ToggleRow
              label="Anki overdue alerts"
              hint="Toast if more than 20 cards are overdue."
              checked={watch("notifyAnkiOverdue")}
              onChange={(v) => setValue("notifyAnkiOverdue", v, { shouldDirty: true })}
            />
            <ToggleRow
              label="Streak warnings"
              hint="Flag if your streak is at risk (no session by 9pm)."
              checked={watch("notifyStreakWarning")}
              onChange={(v) => setValue("notifyStreakWarning", v, { shouldDirty: true })}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-brand-gold" /> AI provider
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Default model</Label>
              <Select
                value={watch("aiProvider")}
                onValueChange={(v) => setValue("aiProvider", v as SettingsForm["aiProvider"], { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (use whichever key is set)</SelectItem>
                  <SelectItem value="anthropic">Anthropic — Claude Sonnet 4.5</SelectItem>
                  <SelectItem value="gemini">Google — Gemini 2.0 Flash</SelectItem>
                  <SelectItem value="grok">xAI — Grok 4</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Picks which model to use for tutoring, study guides, test generation, recall evaluation.
              </p>
            </div>
            <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Current state</p>
              <p className="mt-1">
                Both keys live in <code className="rounded bg-background px-1 py-0.5">.env.local</code>.
                The server resolves the provider in this order: <span className="font-medium">your selection → AI_PROVIDER env → whichever key is set</span>.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <KeyRound className="h-4 w-4 text-brand-navy" /> API keys
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <p className="md:col-span-2 text-sm text-muted-foreground">
              Anthropic, Gemini, and Voyage keys live in{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>. Edit and
              restart the dev server to update them. Keys never leave the server.
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="anthropicKeyHint">Anthropic key hint</Label>
              <Input
                id="anthropicKeyHint"
                placeholder="e.g. last 4 chars"
                {...register("anthropicKeyHint")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="geminiKeyHint">Gemini key hint</Label>
              <Input
                id="geminiKeyHint"
                placeholder="e.g. last 4 chars"
                {...register("geminiKeyHint")}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => reset(DEFAULTS)}>
            Reset
          </Button>
          <Button type="submit" variant="brand" disabled={!isDirty || isSubmitting}>
            {isSubmitting ? "Saving…" : "Save changes"} <Save className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
