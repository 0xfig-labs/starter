import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export const Route = createFileRoute("/404")({
	component: NotFound,
});

function NotFound() {
	return (
		<main className="flex min-h-[60vh] items-center justify-center px-4">
			<Card className="w-full max-w-md text-center">
				<CardContent className="space-y-4 pt-6">
					<p className="text-6xl font-bold text-muted-foreground">404</p>
					<h1 className="text-2xl font-semibold">Page not found</h1>
					<p className="text-muted-foreground">
						The page you are looking for does not exist or has been moved.
					</p>
					<Button asChild>
						<Link to="/">Go home</Link>
					</Button>
				</CardContent>
			</Card>
		</main>
	);
}
