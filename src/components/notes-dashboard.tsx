"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { SearchIcon, PlusIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { EditNoteDialog } from "@/components/dialogs/edit-note";
import { DeleteNoteDialog } from "@/components/dialogs/delete-note";

type Note = {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

function getNotes(userId: string): Note[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(`notes_${userId}`);
  return data ? JSON.parse(data) : [];
}

function saveNotes(userId: string, notes: Note[]) {
  localStorage.setItem(`notes_${userId}`, JSON.stringify(notes));
}

export function NotesDashboard({ userId }: { userId: string }) {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [search, setSearch] = React.useState("");
  const [newNote, setNewNote] = React.useState("");

  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

  React.useEffect(() => {
    setNotes(getNotes(userId));
  }, [userId]);

  function handleAdd() {
    if (!newNote.trim()) return;
    const note: Note = {
      id: uuidv4(),
      userId,
      content: newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [note, ...notes];
    setNotes(updated);
    saveNotes(userId, updated);
    setNewNote("");
  }

  function openEditDialog(note: Note) {
    setSelectedNote(note);
    setEditDialogOpen(true);
  }

  function handleSaveEdit(newContent: string) {
    if (!selectedNote) return;
    const updated = notes.map((n) =>
      n.id === selectedNote.id
        ? { ...n, content: newContent, updatedAt: new Date().toISOString() }
        : n,
    );
    setNotes(updated);
    saveNotes(userId, updated);
    setEditDialogOpen(false);
    setSelectedNote(null);
  }

  function openDeleteDialog(note: Note) {
    setSelectedNote(note);
    setDeleteDialogOpen(true);
  }

  function handleDelete() {
    if (!selectedNote) return;
    const updated = notes.filter((n) => n.id !== selectedNote.id);
    setNotes(updated);
    saveNotes(userId, updated);
    setDeleteDialogOpen(false);
    setSelectedNote(null);
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
        />
      </div>
      <div className="flex gap-2 mb-6">
        <Textarea
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={2}
        />
        <Button onClick={handleAdd} className="h-fit">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      <ul className="space-y-4">
        {filteredNotes.length === 0 ? (
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
                  onClick={() => openEditDialog(note)}
                >
                  <PencilIcon className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => openDeleteDialog(note)}
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
