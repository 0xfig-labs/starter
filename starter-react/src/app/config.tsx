import { TerminalIcon } from "lucide-react";

export const appConfig = {
  name: "starter-react",
  description: "Template",
  logo: {
    icon: <TerminalIcon className="size-4" />,
    label: "Starter App logo",
  },
} as const;
