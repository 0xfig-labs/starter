import { Link } from "react-router";

import { useTranslation } from "@/shared/i18n/hooks";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className="max-w-xl rounded-xl bg-card p-6 ring-1 ring-border">
      <h1 className="text-lg font-semibold">{t("pages.notFound.title")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("pages.notFound.description")}</p>
      <Button className="mt-4" render={<Link to="/" />}>
        {t("pages.notFound.backToDashboard")}
      </Button>
    </section>
  );
}
