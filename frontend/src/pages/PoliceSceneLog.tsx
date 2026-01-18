/**
 * PoliceSceneLog.tsx
 * -------------------
 * Scene Log tool for Police Mode.
 *
 * Officers can quickly record timestamped events during an incident.
 * Each button adds a log entry with:
 * - Event label
 * - Timestamp
 * - Optional notes
 *
 * Saved logs appear in a timeline-style list.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceSceneLogProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceSceneLog({ setView }: PoliceSceneLogProps) {
  // Optional notes for the next log entry
  const [logNotes, setLogNotes] = useState("");

  // Saved log entries
  const [sceneLog, setSceneLog] = useState<
    Array<{
      eventLabel: string;
      timestamp: string;
      notes: string;
    }>
  >([]);

  /**
   * Adds a new log entry with the given event label.
   * Automatically timestamps the entry.
   */
  function addLogEntry(eventLabel: string) {
    const timestamp = new Date().toLocaleTimeString();

    setSceneLog([
      ...sceneLog,
      {
        eventLabel,
        timestamp,
        notes: logNotes,
      },
    ]);

    // Clear notes after logging
    setLogNotes("");
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
        Scene Log
      </h1>

      {/* NOTES INPUT */}
      <div className="space-y-2 text-white">
        <textarea
          value={logNotes}
          onChange={(e) => setLogNotes(e.target.value)}
          placeholder="Optional notes for this log entry..."
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => addLogEntry("Arrived on Scene")}
          className="py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Arrived on Scene
        </button>

        <button
          onClick={() => addLogEntry("Made Contact")}
          className="py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Made Contact
        </button>

        <button
          onClick={() => addLogEntry("Backup Requested")}
          className="py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Backup Requested
        </button>

        <button
          onClick={() => addLogEntry("Suspect Detained")}
          className="py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Suspect Detained
        </button>

        <button
          onClick={() => addLogEntry("Scene Cleared")}
          className="py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Scene Cleared
        </button>
      </div>

      {/* LOG LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Scene Timeline</h2>

        {sceneLog.length === 0 && (
          <p className="text-white/50 text-sm">No events logged yet.</p>
        )}

        {sceneLog.map((entry, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p>
              <strong>{entry.eventLabel}</strong> — {entry.timestamp}
            </p>
            {entry.notes && (
              <p className="mt-2 text-white/70">{entry.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}