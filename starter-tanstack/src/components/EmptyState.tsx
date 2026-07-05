import type { LucideIcon } from "lucide-react";
import { Button } from "#/components/ui/button";

interface EmptyStateProps {
	icon?: LucideIcon;
	title: string;
	description?: string;
	action?: {
		label: string;
		onClick: () => void;
	};
}

/**
 * Centered empty-state placeholder with optional CTA.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={InboxIcon}
 *   title="No messages"
 *   description="You're all caught up."
 *   action={{ label: "Refresh", onClick: () => refetch() }}
 * />
 * ```
 */
export function EmptyState({
	icon: Icon,
	title,
	description,
	action,
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			{Icon && <Icon className="mb-4 size-12 text-muted-foreground/50" />}
			<h3 className="text-lg font-semibold">{title}</h3>
			{description && (
				<p className="mt-1 max-w-sm text-sm text-muted-foreground">
					{description}
				</p>
			)}
			{action && (
				<Button
					variant="outline"
					size="sm"
					className="mt-4"
					onClick={action.onClick}
				>
					{action.label}
				</Button>
			)}
		</div>
	);
}
