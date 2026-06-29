import { call } from "@/shared/api/tauri";

import type { CreateNoteInput, Note } from "../model/types";

export const notesApi = {
  list: () => call<Note[]>("notes_list"),
  create: (input: CreateNoteInput) => call<Note>("notes_create", { input }),
};
