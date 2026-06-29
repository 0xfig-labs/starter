import { LanguagesIcon } from "lucide-react";

import { useTranslation } from "@/shared/i18n/hooks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { value: "en-US", short: "EN", labelKey: "language.en-US" },
  { value: "zh-CN", short: "中文", labelKey: "language.zh-CN" },
] as const;

/** Segmented-button style — for Settings page or sidebars. */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "en-US";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg border p-0.5"
      aria-label={t("language.label")}
    >
      {languages.map((lang) => (
        <Button
          key={lang.value}
          variant={current === lang.value ? "default" : "ghost"}
          size="sm"
          className="h-7 px-2 text-xs"
          onClick={() => void i18n.changeLanguage(lang.value)}
        >
          {lang.short}
        </Button>
      ))}
    </div>
  );
}

/** Icon-button dropdown — for header/toolbar. */
export function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "en-US";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" aria-label={t("language.label")} />}
      >
        <LanguagesIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={current}
          onValueChange={(val) => void i18n.changeLanguage(val)}
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem key={lang.value} value={lang.value}>
              <span className="mr-2 w-5 text-xs text-muted-foreground">{lang.short}</span>
              {t(lang.labelKey)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
