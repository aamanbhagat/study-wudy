"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

interface UserState {
  email: string;
  name: string;
}

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<UserState | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      if (data.user) {
        const meta = (data.user.user_metadata ?? {}) as { display_name?: string };
        setUser({
          email: data.user.email ?? "",
          name: meta.display_name ?? data.user.email?.split("@")[0] ?? "Student",
        });
      }
      setLoaded(true);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
        return;
      }
      const meta = (session.user.user_metadata ?? {}) as { display_name?: string };
      setUser({
        email: session.user.email ?? "",
        name: meta.display_name ?? session.user.email?.split("@")[0] ?? "Student",
      });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    setUser(null);
    toast.success("Signed out.");
    router.push("/login");
    router.refresh();
  }

  if (!loaded) {
    return <div className="h-9 animate-pulse rounded-md bg-white/5" />;
  }

  if (!user) {
    return (
      <Button asChild variant="ghost" size="sm" className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white">
        <Link href="/login">
          <LogIn className="h-4 w-4" /> Sign in
        </Link>
      </Button>
    );
  }

  const initials = user.name.slice(0, 2).toUpperCase();
  return (
    <div className="flex items-center gap-2 rounded-md bg-white/5 p-1.5">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-brand-navy"
        aria-hidden
      >
        {initials || <UserIcon className="h-4 w-4" />}
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-xs font-semibold text-white">{user.name}</p>
        <p className="truncate text-[10px] text-white/60">{user.email}</p>
      </div>
      <button
        onClick={logout}
        title="Sign out"
        className="rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
        aria-label="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
