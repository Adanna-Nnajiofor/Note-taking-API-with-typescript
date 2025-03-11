import { Note } from "../models/Note";
import { Types } from "mongoose";

export function validateMiddleware(note: Partial<Note>) {
  if (!note.title || typeof note.title !== "string") {
    throw new Error("Invalid title: Title must be a string.");
  }
  if (!note.content || typeof note.content !== "string") {
    throw new Error("Invalid content: Content must be a string.");
  }

  if (
    !note.category ||
    (!(note.category instanceof Types.ObjectId) &&
      (typeof note.category !== "string" ||
        !Types.ObjectId.isValid(note.category)))
  ) {
    throw new Error("Invalid category: Must be a valid ObjectId.");
  }
}
