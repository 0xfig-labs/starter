import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

type ErrorBoundaryState = {
  error: Error | null;
};

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="flex min-h-svh items-center justify-center bg-background p-6 text-foreground">
        <section className="max-w-md rounded-xl bg-card p-6 ring-1 ring-border">
          <h1 className="text-lg font-semibold">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">{this.state.error.message}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Reload app
          </Button>
        </section>
      </main>
    );
  }
}
