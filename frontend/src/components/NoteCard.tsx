
import type { Note } from "../types/Note";
import { ClipboardDocumentIcon, TagIcon } from "@heroicons/react/24/outline";
import { formatTimestamp } from "../utils/formatTimestamp";

export default function NoteCard({
  note,
  onClick,
}: {
  note: Note;
  onClick?: () => void;
}) {
  return (
  <article
    onClick={onClick}
    className="
      flex gap-4 items-start p-4 rounded-xl cursor-pointer
      bg-white text-slate-800 border border-slate-200 shadow-sm
      hover:bg-slate-50 hover:shadow-md transition-all duration-200
      dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
      dark:hover:bg-slate-700
    "
    style={{ minWidth: 0 }}
  >
    {/* ICON BOX */}
    <div
      className="
        flex-shrink-0 p-3 rounded-md
        bg-blue-600 text-white
        dark:bg-blue-500
      "
    >
      <ClipboardDocumentIcon className="w-6 h-6" />
    </div>

    {/* MAIN CONTENT */}
    <div className="min-w-0 flex-1">
      {/* TITLE + TIMESTAMP */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold truncate">
          {note.title || "Untitled"}
        </h3>

        <div className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
          {formatTimestamp(note.timestamp)}
        </div>
      </div>

      {/* CONTENT PREVIEW */}
      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
        {note.content}
      </p>

      {/* TAGS */}
      {note.tags && note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((tagLabel) => (
            <span
              key={tagLabel}
              className="
                inline-flex items-center gap-1 text-xs font-medium
                px-2 py-1 rounded-full
                bg-slate-200 text-slate-800
                dark:bg-slate-700 dark:text-slate-100
              "
            >
              <TagIcon className="w-4 h-4" />
              {tagLabel}
            </span>
          ))}
        </div>
      )}
    </div>
  </article>
);
}