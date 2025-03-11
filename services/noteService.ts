import mongoose from "mongoose";
import Note from "../models/Note";

export const getAllNotes = async () => {
  const notes = await Note.find();
  return notes.length > 0 ? notes : [];
};

export const getNoteById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return null;
  }
  return await Note.findById(id);
};

export const getNotesByCategory = async (categoryId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error("❌ Invalid category ID:", categoryId);
      return [];
    }

    return await Note.find({ category: categoryId });
  } catch (error) {
    console.error("❌ Error fetching notes by category:", error);
    throw error;
  }
};

export const createNewNote = async (
  title: string,
  content: string,
  categoryId: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error("❌ Invalid category ID:", categoryId);
      return null;
    }

    const newNote = new Note({ title, content, category: categoryId });
    return await newNote.save();
  } catch (error) {
    console.error("❌ Error creating new note:", error);
    throw error;
  }
};

export const updateExistingNote = async (
  id: string,
  title: string,
  content: string,
  categoryId: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid ObjectId:", id);
      return null;
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, category: categoryId },
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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return null;
  }
  return await Note.findByIdAndDelete(id);
};
