import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="mx-auto w-full max-w-7xl px-4 pb-8 pt-14">
			<section className="relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10 sm:py-14">
				<div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
				<div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
				<p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					TanStack Start Base Template
				</p>
				<h1 className="mb-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
					Start simple, ship quickly.
				</h1>
				<p className="mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg">
					This base starter intentionally keeps things light: two routes, clean
					structure, and the essentials you need to build from scratch.
				</p>
				<div className="flex flex-wrap gap-3">
					<a
						href="/about"
						className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
					>
						About This Starter
					</a>
					<a
						href="https://tanstack.com/router"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						Router Guide
					</a>
				</div>
			</section>

			<section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{(
					[
						[
							"Type-Safe Routing",
							"Routes and links stay in sync across every page.",
						],
						[
							"Server Functions",
							"Call server code from your UI without creating API boilerplate.",
						],
						[
							"Streaming by Default",
							"Ship progressively rendered responses for faster experiences.",
						],
						[
							"Tailwind Native",
							"Design quickly with utility-first styling and reusable tokens.",
						],
					] as const
				).map(([title, desc]) => (
					<Card key={title} className="p-5">
						<CardHeader className="p-0">
							<CardTitle className="mb-2 text-base">{title}</CardTitle>
						</CardHeader>
						<CardDescription className="text-sm">{desc}</CardDescription>
					</Card>
				))}
			</section>

			<section className="mt-8 rounded-2xl border bg-card p-6">
				<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					Quick Start
				</p>
				<ul className="m-0 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
					<li>
						Edit{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
							src/routes/index.tsx
						</code>{" "}
						to customize the home page.
					</li>
					<li>
						Update{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
							src/components/Header.tsx
						</code>{" "}
						and{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
							src/components/Footer.tsx
						</code>{" "}
						for brand links.
					</li>
					<li>
						Add routes in{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
							src/routes
						</code>{" "}
						and tweak visual tokens in{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
							src/styles.css
						</code>
						.
					</li>
				</ul>
			</section>
		</main>
	);
}
