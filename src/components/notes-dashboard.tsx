"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchIcon, PlusIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { EditNoteDialog } from "@/components/dialogs/edit-note";
import { DeleteNoteDialog } from "@/components/dialogs/delete-note";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/app/notes/actions";
import { v4 as uuidv4 } from "uuid";

type Note = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export function NotesDashboard({ userId }: { userId: string }) {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [search, setSearch] = React.useState("");
  const [newNote, setNewNote] = React.useState("");
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchNotes = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotes(userId);
      setNotes(data as Note[]);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  async function handleAdd() {
    if (!newNote.trim()) return;
    const tempId = uuidv4();
    const now = new Date();
    const optimisticNote: Note = {
      id: tempId,
      userId,
      content: newNote,
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [optimisticNote, ...prev]);
    setNewNote("");
    setLoading(true);
    try {
      await createNote(userId, optimisticNote.content);
      await fetchNotes();
    } catch (error) {
      console.error("Failed to create note:", error);
      setNotes((prev) => prev.filter((note) => note.id !== tempId));
      alert("Failed to add note. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Optimistic Update
  async function handleSaveEdit(newContent: string) {
    if (!selectedNote) return;
    const prevNotes = [...notes];
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNote.id
          ? { ...note, content: newContent, updatedAt: new Date() }
          : note,
      ),
    );
    setEditDialogOpen(false);
    setSelectedNote(null);
    setLoading(true);
    try {
      await updateNote(selectedNote.id, newContent);
      await fetchNotes();
    } catch (error) {
      console.error("Failed to update note:", error);
      setNotes(prevNotes);
      alert("Failed to update note. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedNote) return;
    const prevNotes = [...notes];
    setNotes((prev) => prev.filter((note) => note.id !== selectedNote.id));
    setDeleteDialogOpen(false);
    setSelectedNote(null);
    setLoading(true);
    try {
      await deleteNote(selectedNote.id);
      await fetchNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
      setNotes(prevNotes);
      alert("Failed to delete note. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Your Notes</h2>
      <div className="relative max-w-xs mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </span>
        <Input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          disabled={loading}
        />
      </div>
      <div className="flex gap-2 mb-6">
        <Textarea
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={2}
          disabled={loading}
        />
        <Button
          onClick={handleAdd}
          className="h-fit"
          disabled={loading || !newNote.trim()}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      <ul className="space-y-4">
        {loading && notes.length === 0 ? (
          <li>Loading...</li>
        ) : filteredNotes.length === 0 ? (
          <li className="text-muted-foreground">No notes found.</li>
        ) : (
          filteredNotes.map((note) => (
            <li
              key={note.id}
              className="rounded border p-4 flex flex-col gap-2 bg-card"
            >
              <div className="whitespace-pre-wrap">{note.content}</div>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>
                  Created: {new Date(note.createdAt).toLocaleString()}
                </span>
                <span>
                  Updated: {new Date(note.updatedAt).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedNote(note);
                    setEditDialogOpen(true);
                  }}
                  disabled={loading}
                >
                  <PencilIcon className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setSelectedNote(note);
                    setDeleteDialogOpen(true);
                  }}
                  disabled={loading}
                >
                  <Trash2Icon className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>

      {selectedNote && (
        <EditNoteDialog
          noteContent={selectedNote.content}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleSaveEdit}
        />
      )}

      {selectedNote && (
        <DeleteNoteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
