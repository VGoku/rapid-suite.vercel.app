/**
 * PoliceStatements.tsx
 * ---------------------
 * Statements documentation tool for Police Mode.
 *
 * Fields:
 * - Person name
 * - Role (Witness / Suspect / Victim / Other)
 * - Statement text
 * - Time given
 * - Additional notes
 *
 * Saved entries appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceStatementsProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceStatements({ setView }: PoliceStatementsProps) {
  // Form fields
  const [personName, setPersonName] = useState("");
  const [personRole, setPersonRole] = useState("");
  const [statementText, setStatementText] = useState("");
  const [timeGiven, setTimeGiven] = useState("");
  const [notes, setNotes] = useState("");

  // Saved statements
  const [savedStatements, setSavedStatements] = useState<
    Array<{
      personName: string;
      personRole: string;
      statementText: string;
      timeGiven: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current statement entry.
   * Requires at least a name and statement text.
   */
  function saveStatement() {
    if (!personName.trim() || !statementText.trim()) {
      alert("Please enter a name and statement before saving.");
      return;
    }

    setSavedStatements([
      ...savedStatements,
      {
        personName,
        personRole,
        statementText,
        timeGiven,
        notes,
      },
    ]);

    // Clear form fields
    setPersonName("");
    setPersonRole("");
    setStatementText("");
    setTimeGiven("");
    setNotes("");
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
        Statements
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={personRole}
          onChange={(e) => setPersonRole(e.target.value)}
          placeholder="Role (Witness / Suspect / Victim / Other)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={statementText}
          onChange={(e) => setStatementText(e.target.value)}
          placeholder="Statement"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-28"
        />

        <input
          value={timeGiven}
          onChange={(e) => setTimeGiven(e.target.value)}
          placeholder="Time Given"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional Notes"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveStatement}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Statement
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Statements</h2>

        {savedStatements.length === 0 && (
          <p className="text-white/50 text-sm">No statements saved yet.</p>
        )}

        {savedStatements.map((entry, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>{entry.personName}</strong></p>
            <p>Role: {entry.personRole || "N/A"}</p>
            <p className="mt-2">{entry.statementText}</p>
            <p className="text-white/70 mt-1">Time: {entry.timeGiven || "N/A"}</p>
            <p className="text-white/70 mt-2">{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}