import { createFormHook } from "@tanstack/react-form";

import {
	FormSelect,
	SubscribeButton,
	TextArea,
	TextField,
} from "../components/demo.FormComponents";
import { fieldContext, formContext } from "./demo.form-context";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		Select: FormSelect,
		TextArea,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
