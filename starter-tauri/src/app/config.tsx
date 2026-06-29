import { TerminalIcon } from "lucide-react";

export const appConfig = {
  name: "starter-tauri",
  displayName: "Starter App",
  description: "Template",
  logo: {
    icon: <TerminalIcon className="size-4" />,
    label: "Starter App logo",
  },
} as const;
