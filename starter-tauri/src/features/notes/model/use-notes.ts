import { useCallback, useEffect, useState } from "react";

import { notesApi } from "@/features/notes/api/notes";
import type { Note } from "./types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setNotes(await notesApi.list());
    } catch (reason) {
      setError(String(reason));
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function createNote(input: Pick<Note, "title" | "body">) {
    setIsSubmitting(true);
    setError(null);
    try {
      const note = await notesApi.create(input);
      setNotes((current) => [note, ...current]);
      return note;
    } catch (reason) {
      setError(String(reason));
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    void reload();
  }, [reload]);

  return { notes, isLoading, isSubmitting, error, reload, createNote };
}
