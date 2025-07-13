"use server";

import { db } from "@/db";
import { notes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const getNotes = async (userId: string) => {
  return db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(desc(notes.updatedAt));
};

export const createNote = async (userId: string, content: string) => {
  try {
    await db.insert(notes).values({ userId, content });
    return { success: true };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create note");
  }
};

export const updateNote = async (noteId: string, content: string) => {
  try {
    await db
      .update(notes)
      .set({ content, updatedAt: new Date() })
      .where(eq(notes.id, noteId));
    return { success: true };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update note");
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    await db.delete(notes).where(eq(notes.id, noteId));
    return { success: true };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete note");
  }
};
