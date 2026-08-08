import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type StateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function LoadingState({ title = "Loading" }: Partial<Pick<StateProps, "title">>) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{title}…</p>
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

export function EmptyState({ title, description, action }: StateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border p-6 text-center">
      <h2 className="font-medium">{title}</h2>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ title, description, onRetry }: StateProps & { onRetry?: () => void }) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
      <h2 className="font-medium text-destructive">{title}</h2>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      {onRetry ? (
        <Button className="mt-4" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
