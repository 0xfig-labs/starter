// Example: Notes 数据类型
export type Note = {
  id: number;
  title: string;
  body: string;
};

export type CreateNoteInput = Pick<Note, "title" | "body">;
