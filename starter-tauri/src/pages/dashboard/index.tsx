import { Link } from "react-router";

import { useTranslation } from "@/shared/i18n/hooks";
import { PageHeader } from "@/components/app";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <section className="rounded-xl bg-card p-6 ring-1 ring-border">
        <PageHeader
          title={t("pages.dashboard.title")}
          description={t("pages.dashboard.description")}
          action={<Button render={<Link to="/notes" />}>{t("pages.dashboard.openNotes")}</Button>}
        />
      </section>
      <section className="rounded-xl bg-muted/50 p-6 md:col-span-2">
        <h2 className="font-medium">{t("pages.dashboard.templateRule")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("pages.dashboard.templateRuleDesc")}
        </p>
      </section>
    </div>
  );
}
