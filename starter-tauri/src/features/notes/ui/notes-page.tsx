import { useState } from "react";

import { EmptyState, ErrorState, LoadingState, PageHeader } from "@/components/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotes } from "@/features/notes/model/use-notes";
import { useTranslation } from "@/shared/i18n/hooks";

export function NotesPage() {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t("pages.notes.defaultTitle"));
  const { notes, isLoading, isSubmitting, error, reload, createNote } = useNotes();

  async function addNote() {
    const note = await createNote({ title, body: t("pages.notes.defaultBody") });
    if (note) setTitle("");
  }

  return (
    <section className="max-w-2xl rounded-xl bg-card p-6 ring-1 ring-border">
      <PageHeader
        title={t("pages.notes.title")}
        description={t("pages.notes.description")}
        action={
          <Button variant="outline" onClick={reload} disabled={isLoading || isSubmitting}>
            {t("pages.notes.reload")}
          </Button>
        }
      />
      <div className="mt-4 flex gap-2">
        <Input value={title} onChange={(event) => setTitle(event.target.value)} />
        <Button onClick={addNote} disabled={!title.trim() || isSubmitting}>
          {isSubmitting ? t("pages.notes.adding") : t("pages.notes.add")}
        </Button>
      </div>
      <div className="mt-4">
        {error ? (
          <ErrorState title={t("pages.notes.errorTitle")} description={error} onRetry={reload} />
        ) : null}
        {!error && isLoading ? <LoadingState title={t("pages.notes.loading")} /> : null}
        {!error && !isLoading && notes.length === 0 ? (
          <EmptyState
            title={t("pages.notes.emptyTitle")}
            description={t("pages.notes.emptyDescription")}
          />
        ) : null}
        {!error && !isLoading && notes.length > 0 ? (
          <ul className="space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="rounded-lg bg-muted/50 p-3">
                <div className="font-medium">{note.title}</div>
                <div className="text-sm text-muted-foreground">{note.body}</div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
