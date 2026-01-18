/**
 * PoliceOfficerActions.tsx
 * -------------------------
 * Officer Actions documentation tool for Police Mode.
 *
 * Fields:
 * - Force used
 * - Handcuffs applied
 * - Miranda rights given
 * - Search conducted
 * - Evidence collected
 * - Additional notes
 *
 * Saved entries appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceOfficerActionsProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceOfficerActions({
  setView,
}: PoliceOfficerActionsProps) {
  // Form fields (toggle-style text inputs)
  const [forceUsed, setForceUsed] = useState("");
  const [handcuffsApplied, setHandcuffsApplied] = useState("");
  const [mirandaGiven, setMirandaGiven] = useState("");
  const [searchConducted, setSearchConducted] = useState("");
  const [evidenceCollected, setEvidenceCollected] = useState("");
  const [notes, setNotes] = useState("");

  // Saved officer action entries
  const [savedActions, setSavedActions] = useState<
    Array<{
      forceUsed: string;
      handcuffsApplied: string;
      mirandaGiven: string;
      searchConducted: string;
      evidenceCollected: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current officer actions entry.
   * Requires at least one field to be filled.
   */
  function saveOfficerActions() {
    const hasData =
      forceUsed.trim() ||
      handcuffsApplied.trim() ||
      mirandaGiven.trim() ||
      searchConducted.trim() ||
      evidenceCollected.trim() ||
      notes.trim();

    if (!hasData) {
      alert("Please enter at least one action before saving.");
      return;
    }

    setSavedActions([
      ...savedActions,
      {
        forceUsed,
        handcuffsApplied,
        mirandaGiven,
        searchConducted,
        evidenceCollected,
        notes,
      },
    ]);

    // Clear form fields
    setForceUsed("");
    setHandcuffsApplied("");
    setMirandaGiven("");
    setSearchConducted("");
    setEvidenceCollected("");
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
        Officer Actions
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={forceUsed}
          onChange={(e) => setForceUsed(e.target.value)}
          placeholder="Force Used (Yes / No / Details)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={handcuffsApplied}
          onChange={(e) => setHandcuffsApplied(e.target.value)}
          placeholder="Handcuffs Applied (Yes / No)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={mirandaGiven}
          onChange={(e) => setMirandaGiven(e.target.value)}
          placeholder="Miranda Rights Given (Yes / No)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={searchConducted}
          onChange={(e) => setSearchConducted(e.target.value)}
          placeholder="Search Conducted (Yes / No / Details)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={evidenceCollected}
          onChange={(e) => setEvidenceCollected(e.target.value)}
          placeholder="Evidence Collected (Yes / No / Details)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional Notes"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-24"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveOfficerActions}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Officer Actions
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Entries</h2>

        {savedActions.length === 0 && (
          <p className="text-white/50 text-sm">No officer actions saved yet.</p>
        )}

        {savedActions.map((entry, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>Force Used:</strong> {entry.forceUsed || "N/A"}</p>
            <p><strong>Handcuffs:</strong> {entry.handcuffsApplied || "N/A"}</p>
            <p><strong>Miranda:</strong> {entry.mirandaGiven || "N/A"}</p>
            <p><strong>Search:</strong> {entry.searchConducted || "N/A"}</p>
            <p><strong>Evidence:</strong> {entry.evidenceCollected || "N/A"}</p>
            <p className="mt-2 text-white/70">{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}