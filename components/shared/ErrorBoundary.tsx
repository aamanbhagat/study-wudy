"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface State {
  hasError: boolean;
  error?: Error;
}

interface Props {
  children: React.ReactNode;
  fallback?: (error: Error, retry: () => void) => React.ReactNode;
  label?: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    if (typeof window !== "undefined") console.error("ErrorBoundary caught", error);
  }

  retry = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback(this.state.error, this.retry);
      return (
        <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div className="space-y-2">
            <p className="font-semibold">{this.props.label ?? "Something went wrong"}</p>
            <p className="text-xs opacity-80">{this.state.error.message}</p>
            <button
              onClick={this.retry}
              className="rounded border border-rose-300 px-2 py-1 text-xs font-medium hover:bg-rose-100"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
