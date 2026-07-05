import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";

interface LoadingSkeletonProps {
	variant?: "card" | "table" | "text" | "avatar";
	count?: number;
	className?: string;
}

/**
 * Repeating skeleton placeholders for loading states.
 *
 * @example
 * ```tsx
 * <LoadingSkeleton variant="card" count={3} />
 * ```
 */
export function LoadingSkeleton({
	variant = "text",
	count = 1,
	className,
}: LoadingSkeletonProps) {
	return (
		<div className={cn("space-y-3", className)}>
			{Array.from({ length: count }).map((_, i) => (
				// ponytail: static skeleton list — index is stable and never reorders
				// biome-ignore lint/suspicious/noArrayIndexKey: static non-reorderable skeleton list
				<div key={`${variant}-${i}`}>
					{variant === "card" && <CardSkeleton />}
					{variant === "table" && <TableRowSkeleton />}
					{variant === "avatar" && <AvatarSkeleton />}
					{variant === "text" && <TextSkeleton />}
				</div>
			))}
		</div>
	);
}

function TextSkeleton() {
	return (
		<div className="space-y-2">
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	);
}

function CardSkeleton() {
	return (
		<div className="space-y-3 rounded-lg border p-4">
			<Skeleton className="h-5 w-2/3" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-4/5" />
		</div>
	);
}

function TableRowSkeleton() {
	return (
		<div className="flex gap-4 py-3">
			<Skeleton className="h-4 flex-1" />
			<Skeleton className="h-4 w-24" />
			<Skeleton className="h-4 w-16" />
		</div>
	);
}

function AvatarSkeleton() {
	return (
		<div className="flex items-center gap-3">
			<Skeleton className="size-10 rounded-full" />
			<div className="space-y-1.5">
				<Skeleton className="h-4 w-28" />
				<Skeleton className="h-3 w-20" />
			</div>
		</div>
	);
}
