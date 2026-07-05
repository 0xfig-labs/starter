import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	error: Error | null;
}

/**
 * Catches rendering errors and shows a fallback UI.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = { error: null };

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("ErrorBoundary caught:", error, info.componentStack);
	}

	render() {
		if (!this.state.error) return this.props.children;

		if (this.props.fallback) return this.props.fallback;

		return (
			<Card className="mx-auto mt-8 w-full max-w-md">
				<CardContent className="space-y-4 pt-6 text-center">
					<p className="text-4xl">⚠️</p>
					<h2 className="text-xl font-semibold">Something went wrong</h2>
					<pre className="max-h-32 overflow-auto rounded bg-muted p-3 text-left text-sm text-muted-foreground">
						{this.state.error.message}
					</pre>
					<Button onClick={() => this.setState({ error: null })}>
						Try again
					</Button>
				</CardContent>
			</Card>
		);
	}
}
