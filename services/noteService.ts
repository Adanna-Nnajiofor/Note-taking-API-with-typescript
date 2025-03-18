import mongoose from "mongoose";
import Note from "../models/Note";

export const getAllNotes = async (userId: string) => {
  const notes = await Note.find({ user: userId }).populate("category");
  return notes.length > 0 ? notes : [];
};

export const getNoteById = async (id: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(" Invalid ObjectId:", id);
    return null;
  }
  return await Note.findOne({ _id: id, user: userId }).populate("category");
};

export const getNotesByCategory = async (
  categoryId: string,
  userId: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error(" Invalid category ID:", categoryId);
      return [];
    }
    return await Note.find({ category: categoryId, user: userId }).populate(
      "category"
    );
  } catch (error) {
    console.error(" Error fetching notes by category:", error);
    throw error;
  }
};

export const createNewNote = async (
  title: string,
  content: string,
  categoryId: string,
  userId: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error(" Invalid category ID:", categoryId);
      return null;
    }

    const newNote = new Note({
      title,
      content,
      category: categoryId,
      user: userId,
    });

    return await newNote.save();
  } catch (error) {
    console.error(" Error creating new note:", error);
    throw error;
  }
};

export const updateExistingNote = async (
  id: string,
  userId: string,
  title?: string,
  content?: string,
  categoryId?: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(`Invalid ObjectId for note: ${id}`);
      return null;
    }

    const updateData: Record<string, any> = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      updateData.category = categoryId;
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("category");

    if (!updatedNote) {
      console.error(`Note not found or user does not own it: ${id}`);
    }

    return updatedNote;
  } catch (error) {
    console.error(`Error updating note (ID: ${id}, User: ${userId}):`, error);
    throw error;
  }
};

export const deleteNoteById = async (id: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId for note: ${id}`);
    return null;
  }

  const deletedNote = await Note.findOneAndDelete({ _id: id, user: userId });

  if (!deletedNote) {
    console.error(`Note not found or user does not own it: ${id}`);
  }

  return deletedNote;
};
