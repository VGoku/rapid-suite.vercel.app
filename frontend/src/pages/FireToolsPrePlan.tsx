/**
 * FireToolsPrePlan.tsx
 * ---------------------
 * Simple pre-plan notes tool for firefighters.
 *
 * Fields:
 * - Structure name
 * - Address
 * - Hazards
 * - Access points
 * - Hydrant distance
 * - General notes
 *
 * Notes are stored in local component state (no backend required).
 */

import { useState } from "react";
import type { ViewState } from "../App";

type FireToolsPrePlanProps = {
  setView: (next: ViewState) => void;
};

export default function FireToolsPrePlan({ setView }: FireToolsPrePlanProps) {
  // Form fields
  const [structure, setStructure] = useState("");
  const [address, setAddress] = useState("");
  const [hazards, setHazards] = useState("");
  const [access, setAccess] = useState("");
  const [hydrant, setHydrant] = useState("");
  const [notes, setNotes] = useState("");

  // Saved pre-plan entries
  const [saved, setSaved] = useState<
    Array<{
      structure: string;
      address: string;
      hazards: string;
      access: string;
      hydrant: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current pre-plan entry.
   * Requires at least a structure name.
   */
  function savePrePlan() {
    if (!structure.trim()) {
      alert("Please enter a structure name before saving.");
      return;
    }

    setSaved([
      ...saved,
      { structure, address, hazards, access, hydrant, notes },
    ]);

    // Clear form fields after saving
    setStructure("");
    setAddress("");
    setHazards("");
    setAccess("");
    setHydrant("");
    setNotes("");
  }

  return (
    <div className="p-4 space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "fire-tools" })}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
        "
      >
        ← Back
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
        Pre‑Plan Notes
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={structure}
          onChange={(e) => setStructure(e.target.value)}
          placeholder="Structure Name"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={hazards}
          onChange={(e) => setHazards(e.target.value)}
          placeholder="Hazards (e.g., propane tank, solar panels)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={access}
          onChange={(e) => setAccess(e.target.value)}
          placeholder="Access Points (e.g., rear gate, side alley)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={hydrant}
          onChange={(e) => setHydrant(e.target.value)}
          placeholder="Nearest Hydrant Distance"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="General Notes"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-24"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={savePrePlan}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-red-600 hover:bg-red-700
          text-white
        "
      >
        Save Pre‑Plan
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Pre‑Plans</h2>

        {saved.length === 0 && (
          <p className="text-white/50 text-sm">
            No pre‑plans saved yet.
          </p>
        )}

        {saved.map((p, i) => (
          <div
            key={i}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>{p.structure}</strong></p>
            <p>{p.address}</p>
            <p>Hazards: {p.hazards}</p>
            <p>Access: {p.access}</p>
            <p>Hydrant: {p.hydrant}</p>
            <p className="mt-2 text-white/70">{p.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}