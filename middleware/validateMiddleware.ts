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
    !(
      (
        note.category instanceof Types.ObjectId || // Case 1: category is a valid ObjectId
        (typeof note.category === "string" &&
          Types.ObjectId.isValid(note.category)) || // Case 2: category is a valid string ObjectId
        (typeof note.category === "object" &&
          "id" in note.category &&
          Types.ObjectId.isValid(note.category.id))
      ) // Case 3: category is an object with a valid `id`
    )
  ) {
    throw new Error(
      "Invalid category: Must be a valid ObjectId, string, or Category object."
    );
  }
}
