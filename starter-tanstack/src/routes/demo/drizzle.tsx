import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { db } from "#/db/index";
import { todos } from "#/db/schema";

const getTodos = createServerFn({ method: "GET" }).handler(async () => {
	return await db.query.todos.findMany({
		orderBy: [desc(todos.createdAt)],
	});
});

const createTodo = createServerFn({
	method: "POST",
})
	.validator((data: { title: string }) => data)
	.handler(async ({ data }) => {
		await db.insert(todos).values({ title: data.title });
		return { success: true };
	});

export const Route = createFileRoute("/demo/drizzle")({
	component: DemoDrizzle,
	loader: async () => await getTodos(),
});

function DemoDrizzle() {
	const router = useRouter();
	const todos = Route.useLoaderData();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const title = formData.get("title") as string;

		if (!title) return;

		try {
			await createTodo({ data: { title } });
			router.invalidate();
			(e.target as HTMLFormElement).reset();
		} catch (error) {
			console.error("Failed to create todo:", error);
		}
	};

	return (
		<main className="flex min-h-svh items-center justify-center">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>Drizzle Demo</CardTitle>
				</CardHeader>
				<CardContent>
					<h2 className="font-semibold mb-4">Todos</h2>

					<ul className="space-y-3 mb-6">
						{todos.map((todo) => (
							<li key={todo.id} className="rounded-lg border p-4">
								<div className="flex items-center justify-between">
									<span className="font-medium">{todo.title}</span>
									<span className="text-xs text-muted-foreground">
										#{todo.id}
									</span>
								</div>
							</li>
						))}
						{todos.length === 0 && (
							<li className="rounded-lg border p-4 text-center text-muted-foreground">
								No todos yet. Create one below!
							</li>
						)}
					</ul>

					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-2 sm:flex-row"
					>
						<Input
							type="text"
							name="title"
							placeholder="Add a new todo..."
							className="min-w-0 flex-1"
						/>
						<Button type="submit" className="whitespace-nowrap">
							Add Todo
						</Button>
					</form>

					<Card className="mt-8">
						<h3 className="font-semibold mb-2">Powered by Drizzle ORM</h3>
						<p className="text-muted-foreground mb-4 text-sm">
							Next-generation ORM for Node.js & TypeScript with PostgreSQL
						</p>
						<div className="space-y-2 text-sm">
							<p className="font-medium">Setup Instructions:</p>
							<ol className="text-muted-foreground list-inside list-decimal space-y-2">
								<li>
									Configure your <code>DATABASE_URL</code> in .env.local
								</li>
								<li>
									Run: <code>bunx --bun drizzle-kit generate</code>
								</li>
								<li>
									Run: <code>bunx --bun drizzle-kit migrate</code>
								</li>
								<li>
									Optional: <code>bunx --bun drizzle-kit studio</code>
								</li>
							</ol>
						</div>
					</Card>
				</CardContent>
			</Card>
		</main>
	);
}
