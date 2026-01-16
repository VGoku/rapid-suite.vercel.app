/**
 * NewNote Page
 * ------------
 * This screen allows the user to create a new note.
 * It collects title, content, tags, and automatically
 * attaches a timestamp and optional geolocation.
 */

import { useState } from "react";
import type { Note } from "../types/Note";
import Button from "../components/Button";
import useTimestamp from "../hooks/useTimestamp";
import useGeoLocation from "../hooks/useGeoLocation";

export default function NewNote({
  onSave,
  onCancel,
}: {
  onSave: (note: Note) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags] = useState<string[]>([]);

  const getTimestamp = useTimestamp();
  const location = useGeoLocation();

  /**
   * Handles creating a new note object and passing it
   * back to the parent via onSave.
   */
  function handleSave() {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      tags,
      timestamp: getTimestamp(),
      location: location || undefined,
    };

    onSave(newNote);
  }

  return (
  <main
    className="
      p-6 min-h-screen
      bg-slate-50 text-slate-800
      dark:bg-slate-900 dark:text-slate-100
    "
  >
    <h1 className="text-3xl font-bold mb-6">Create New Note</h1>

    <div className="flex flex-col gap-4 max-w-xl">

      {/* TITLE INPUT */}
      <input
        className="
          p-3 rounded-md
          bg-white text-slate-800 border border-slate-300
          dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
        "
        placeholder="Note title..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      {/* CONTENT INPUT */}
      <textarea
        className="
          p-3 rounded-md min-h-[150px]
          bg-white text-slate-800 border border-slate-300
          dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
        "
        placeholder="Write your note..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      {/* TAGS PLACEHOLDER */}
      <div className="text-slate-600 dark:text-slate-400 text-sm">
        Tags feature coming soon...
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <Button variant="primary" onClick={handleSave}>
          Save Note
        </Button>

        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  </main>
);
}