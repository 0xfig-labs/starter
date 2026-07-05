import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { useAppForm } from "#/hooks/demo.form";

export const Route = createFileRoute("/demo/form/simple")({
	component: SimpleForm,
});

const schema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
});

function SimpleForm() {
	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
		},
		validators: {
			onBlur: schema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			alert("Form submitted successfully!");
		},
	});

	return (
		<main className="flex min-h-svh items-center justify-center">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2">
						TanStack Form
					</p>
					<CardTitle className="text-2xl">Simple Form</CardTitle>
					<p className="text-muted-foreground mt-2">
						A small validated form using the generated field helpers.
					</p>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-6"
					>
						<form.AppField name="title">
							{(field) => <field.TextField label="Title" />}
						</form.AppField>

						<form.AppField name="description">
							{(field) => <field.TextArea label="Description" />}
						</form.AppField>

						<div className="flex justify-end">
							<form.AppForm>
								<form.SubscribeButton label="Submit" />
							</form.AppForm>
						</div>
					</form>
				</CardContent>
			</Card>
		</main>
	);
}
