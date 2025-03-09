import mongoose from "mongoose";
import Note from "../models/Note";

export const getAllNotes = async () => {
  return await Note.find();
};

export const getNoteById = async (id: string) => {
  return await Note.findById(id);
};

export const createNewNote = async (title: string, content: string) => {
  const newNote = new Note({ title, content });
  return await newNote.save();
};

export const updateExistingNote = async (
  id: string,
  title: string,
  content: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid ObjectId:", id);
      return null;
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      console.error("❌ Note not found for ID:", id);
    }

    return updatedNote;
  } catch (error) {
    console.error("❌ Error updating note:", error);
    throw error;
  }
};

export const deleteNoteById = async (id: string) => {
  return await Note.findByIdAndDelete(id);
};
