import { useTranslation } from "@/shared/i18n/hooks";
import { PageHeader, LanguageSwitcher, ThemeToggle } from "@/components/app";

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-xl space-y-4">
      <section className="rounded-xl bg-card p-6 ring-1 ring-border">
        <PageHeader
          title={t("pages.settings.title")}
          description={t("pages.settings.description")}
          action={<ThemeToggle />}
        />
      </section>
      <section className="rounded-xl bg-card p-6 ring-1 ring-border">
        <h2 className="text-sm font-medium">{t("language.label")}</h2>
        <div className="mt-3">
          <LanguageSwitcher />
        </div>
      </section>
    </div>
  );
}
