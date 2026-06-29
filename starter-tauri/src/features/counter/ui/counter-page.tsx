import { useTranslation } from "@/shared/i18n/hooks";
import { PageHeader } from "@/components/app";
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/shared/stores/use-counter-store";

export function CounterPage() {
  const { t } = useTranslation();
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <section className="rounded-xl bg-card p-6 ring-1 ring-border">
        <PageHeader title={t("pages.counter.title")} description={t("pages.counter.description")} />
      </section>
      <section className="flex flex-col items-center justify-center gap-6 rounded-xl bg-muted/50 p-6 md:col-span-2">
        <span className="text-7xl font-bold tabular-nums">{count}</span>
        <div className="flex gap-2">
          <Button onClick={decrement} variant="outline">
            {t("pages.counter.decrement")}
          </Button>
          <Button onClick={increment}>{t("pages.counter.increment")}</Button>
        </div>
        <Button onClick={reset} variant="ghost" size="sm">
          {t("pages.counter.reset")}
        </Button>
      </section>
    </div>
  );
}
