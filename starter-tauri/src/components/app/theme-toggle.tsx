import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const themeOrder = ["light", "dark", "system"] as const;

type Theme = (typeof themeOrder)[number];

function getNextTheme(theme: string | undefined): Theme {
  const current = themeOrder.includes(theme as Theme) ? (theme as Theme) : "system";
  return themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length];
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current = themeOrder.includes(theme as Theme) ? (theme as Theme) : "system";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Theme: ${current}. Click to switch to ${getNextTheme(current)}.`}
      title={`Theme: ${current}`}
      onClick={() => setTheme(getNextTheme(current))}
    >
      {current === "light" ? <SunIcon className="size-4" /> : null}
      {current === "dark" ? <MoonIcon className="size-4" /> : null}
      {current === "system" ? <LaptopIcon className="size-4" /> : null}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
