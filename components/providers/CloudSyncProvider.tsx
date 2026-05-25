"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { syncSessionsFromCloud } from "@/lib/study-sessions";
import { syncStudiedFromCloud } from "@/lib/studied-tracker";
import { syncCardProgressFromCloud } from "@/lib/cards-store";
import { syncTestsFromCloud } from "@/lib/tests-store";

/**
 * Mounts once at the app root. When the user is authenticated (now or
 * after a SIGNED_IN event), pulls all per-user data from Supabase and
 * merges into localStorage. Failures are silent — local-only mode keeps
 * working.
 */
export function CloudSyncProvider({ children }: { children: React.ReactNode }) {
  const ranForUser = useRef<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function syncOnce(userId: string) {
      if (ranForUser.current === userId) return;
      ranForUser.current = userId;
      try {
        await Promise.all([
          syncSessionsFromCloud(),
          syncStudiedFromCloud(),
          syncCardProgressFromCloud(),
          syncTestsFromCloud(),
        ]);
        // Notify any mounted listeners (dashboard, history, cards) that
        // localStorage was updated so they can refresh.
        window.dispatchEvent(new CustomEvent("cloud-sync-complete"));
      } catch (e) {
        console.warn("Cloud sync failed:", (e as Error).message);
      }
    }

    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) void syncOnce(data.user.id);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session?.user) {
        void syncOnce(session.user.id);
      }
      if (event === "SIGNED_OUT") {
        ranForUser.current = null;
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return <>{children}</>;
}
