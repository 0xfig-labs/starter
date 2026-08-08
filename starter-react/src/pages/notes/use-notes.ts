import { useCallback, useEffect, useState } from "react";

import type { Note } from "./types";

let nextId = 1;
const notesStore: Note[] = [];

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await Promise.resolve();
    setNotes([...notesStore]);
    setIsLoading(false);
  }, []);

  async function createNote(input: Pick<Note, "title" | "body">) {
    setIsSubmitting(true);
    setError(null);
    await Promise.resolve();
    const note = { id: nextId++, ...input };
    notesStore.unshift(note);
    setNotes([...notesStore]);
    setIsSubmitting(false);
    return note;
  }

  useEffect(() => {
    void reload();
  }, [reload]);

  return { notes, isLoading, isSubmitting, error, reload, createNote };
}
