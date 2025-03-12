import mongoose from "mongoose";
import Note from "../models/Note";

// Define a proper Category Type
type CategoryType = string | { id?: string; name: string; description: string };

export const getAllNotes = async () => {
  const notes = await Note.find().populate("category");
  return notes.length > 0 ? notes : [];
};

export const getNoteById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return null;
  }
  return await Note.findById(id).populate("category");
};

export const getNotesByCategory = async (category: CategoryType) => {
  try {
    // ✅ Check if category is an embedded object with 'name'
    if (typeof category === "object" && "name" in category) {
      return await Note.find({ "category.name": category.name });
    }

    // ✅ If category is a valid ObjectId, search directly
    if (
      typeof category === "string" &&
      mongoose.Types.ObjectId.isValid(category)
    ) {
      return await Note.find({ category }).populate("category");
    }

    console.error("❌ Invalid category:", category);
    return [];
  } catch (error) {
    console.error("❌ Error fetching notes by category:", error);
    throw error;
  }
};

export const createNewNote = async (
  title: string,
  content: string,
  category: CategoryType
) => {
  try {
    let categoryData;

    if (
      typeof category === "string" &&
      mongoose.Types.ObjectId.isValid(category)
    ) {
      categoryData = category;
    } else if (
      typeof category === "object" &&
      "name" in category &&
      "description" in category
    ) {
      categoryData = category;
    } else {
      console.error("❌ Invalid category:", category);
      return null;
    }

    const newNote = new Note({ title, content, category: categoryData });
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
  category: CategoryType
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid ObjectId:", id);
      return null;
    }

    let categoryData;

    if (
      typeof category === "string" &&
      mongoose.Types.ObjectId.isValid(category)
    ) {
      categoryData = category;
    } else if (
      typeof category === "object" &&
      "name" in category &&
      "description" in category
    ) {
      categoryData = category;
    } else {
      console.error("❌ Invalid category:", category);
      return null;
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, category: categoryData },
      { new: true, runValidators: true }
    ).populate("category");

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
