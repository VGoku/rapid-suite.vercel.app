/**
 * PoliceGeneralNotes.tsx
 * -----------------------
 * General Notes tool for Police Mode.
 *
 * A simple free‑form notes system:
 * - Title
 * - Note text
 *
 * Saved notes appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceGeneralNotesProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceGeneralNotes({ setView }: PoliceGeneralNotesProps) {
  // Form fields
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  // Saved notes
  const [savedNotes, setSavedNotes] = useState<
    Array<{
      noteTitle: string;
      noteText: string;
    }>
  >([]);

  /**
   * Saves the current note.
   * Requires at least a title or text.
   */
  function saveNote() {
    if (!noteTitle.trim() && !noteText.trim()) {
      alert("Please enter a title or note text before saving.");
      return;
    }

    setSavedNotes([
      ...savedNotes,
      {
        noteTitle,
        noteText,
      },
    ]);

    // Clear form fields
    setNoteTitle("");
    setNoteText("");
  }

  return (
    <div className="p-4 space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "police-dashboard" })}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
        "
      >
        ← Back
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        General Notes
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..."
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-28"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveNote}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Note
      </button>

      {/* SAVED NOTES LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Notes</h2>

        {savedNotes.length === 0 && (
          <p className="text-white/50 text-sm">No notes saved yet.</p>
        )}

        {savedNotes.map((entry, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p className="font-semibold">{entry.noteTitle || "Untitled Note"}</p>
            <p className="mt-2 text-white/70">{entry.noteText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}