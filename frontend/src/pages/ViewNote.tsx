/**
 * ViewNote Page
 * -------------
 * Displays a single note in a clean, readable layout.
 * Provides actions for editing, deleting, and exporting.
 * This page is used after selecting a note from the list.
 */

import type { Note } from "../types/Note";
import Button from "../components/Button";
import { formatTimestamp } from "../utils/formatTimestamp";

export default function ViewNote({
  note,
  onEdit,
  onDelete,
  onExport,
}: {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onExport: () => void;
}) {
  // If the note doesn't exist (bad ID, deleted, etc.)
  if (!note) {
    return <div className="p-6 text-white">Not found</div>;
  }

  return (
  <article
    className="
      max-w-3xl mx-auto p-6 rounded-xl shadow-sm
      bg-white text-slate-800 border border-slate-200
      dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
    "
  >
    {/* HEADER: title + timestamp + actions */}
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{note.title}</h2>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {formatTimestamp(note.timestamp)}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="primary" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="ghost" onClick={onExport}>
          Export
        </Button>
      </div>
    </div>

    {/* CONTENT */}
    <div className="prose text-slate-700 dark:text-slate-300">
      <p>{note.content}</p>
    </div>
  </article>
);
}