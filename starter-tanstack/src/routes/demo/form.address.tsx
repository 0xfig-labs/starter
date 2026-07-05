import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";

import { useAppForm } from "#/hooks/demo.form";

export const Route = createFileRoute("/demo/form/address")({
	component: AddressForm,
});

function AddressForm() {
	const form = useAppForm({
		defaultValues: {
			street: "",
			city: "",
			state: "",
			zip: "",
		},
		onSubmit: ({ value }) => {
			console.log(value);
			alert("Form submitted successfully!");
		},
	});

	return (
		<main className="flex min-h-svh items-center justify-center">
			<Card className="w-full max-w-3xl">
				<CardHeader>
					<p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2">
						TanStack Form
					</p>
					<CardTitle className="text-2xl">Address Form</CardTitle>
					<p className="text-muted-foreground mt-2">
						A complex form with multiple field types.
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
						<form.AppField name="street">
							{(field) => <field.TextField label="Street Address" />}
						</form.AppField>

						<form.AppField name="city">
							{(field) => <field.TextField label="City" />}
						</form.AppField>

						<div className="grid grid-cols-2 gap-4">
							<form.AppField name="state">
								{(field) => <field.TextField label="State" />}
							</form.AppField>

							<form.AppField name="zip">
								{(field) => <field.TextField label="ZIP Code" />}
							</form.AppField>
						</div>

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
