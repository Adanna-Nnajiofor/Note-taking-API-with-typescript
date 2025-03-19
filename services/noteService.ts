import mongoose from "mongoose";
import Note from "../models/Note";

/**
 * Fetch all notes for a specific user.
 */
export const getAllNotes = async (userId: string) => {
  try {
    return await Note.find({ user: userId }).populate("category");
  } catch (error) {
    console.error(` Error fetching notes for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Fetch a single note by ID and user.
 */
export const getNoteById = async (id: string, userId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(` Invalid Note ID: ${id}`);
      return null;
    }

    return await Note.findOne({ _id: id, user: userId }).populate("category");
  } catch (error) {
    console.error(` Error fetching note ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch notes belonging to a specific category for a user.
 */
export const getNotesByCategory = async (
  categoryId: string,
  userId: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error(` Invalid Category ID: ${categoryId}`);
      return [];
    }

    return await Note.find({ category: categoryId, user: userId }).populate(
      "category"
    );
  } catch (error) {
    console.error(` Error fetching notes for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Create a new note.
 */
export const createNewNote = async (
  title: string,
  content: string,
  categoryId: string,
  userId: string
) => {
  try {
    if (!title || !content) {
      console.error(" Title and content are required.");
      return null;
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error(` Invalid Category ID: ${categoryId}`);
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

/**
 * Update an existing note.
 */
export const updateExistingNote = async (
  id: string,
  userId: string,
  title?: string,
  content?: string,
  categoryId?: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(` Invalid Note ID: ${id}`);
      return null;
    }

    const updateData: Partial<{
      title: string;
      content: string;
      category: mongoose.Types.ObjectId;
    }> = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      updateData.category = new mongoose.Types.ObjectId(categoryId);
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("category");

    if (!updatedNote) {
      console.error(` Note not found or unauthorized access: ${id}`);
      return null;
    }

    return updatedNote;
  } catch (error) {
    console.error(` Error updating note ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a note by ID.
 */
export const deleteNoteById = async (id: string, userId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(` Invalid Note ID: ${id}`);
      return null;
    }

    const deletedNote = await Note.findOneAndDelete({ _id: id, user: userId });

    if (!deletedNote) {
      console.error(` Note not found or unauthorized access: ${id}`);
      return null;
    }

    return deletedNote;
  } catch (error) {
    console.error(` Error deleting note ${id}:`, error);
    throw error;
  }
};
