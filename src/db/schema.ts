import { pgTable, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid().primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 128 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type CreateNoteType = typeof notes.$inferInsert;
export type SelectNoteType = typeof notes.$inferSelect;
