/**
 * PoliceSuspiciousPerson.tsx
 * ---------------------------
 * Suspicious person documentation tool for Police Mode.
 *
 * Fields:
 * - Clothing description
 * - Behavior
 * - Direction of travel
 * - Vehicle involved
 * - Time observed
 * - Notes
 *
 * Saved entries appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceSuspiciousPersonProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceSuspiciousPerson({
  setView,
}: PoliceSuspiciousPersonProps) {
  // Form fields
  const [clothingDescription, setClothingDescription] = useState("");
  const [behaviorDescription, setBehaviorDescription] = useState("");
  const [directionOfTravel, setDirectionOfTravel] = useState("");
  const [vehicleInvolved, setVehicleInvolved] = useState("");
  const [timeObserved, setTimeObserved] = useState("");
  const [notes, setNotes] = useState("");

  // Saved suspicious person entries
  const [savedSuspiciousPersons, setSavedSuspiciousPersons] = useState<
    Array<{
      clothingDescription: string;
      behaviorDescription: string;
      directionOfTravel: string;
      vehicleInvolved: string;
      timeObserved: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current suspicious person entry.
   * Requires at least a clothing or behavior description.
   */
  function saveSuspiciousPerson() {
    if (!clothingDescription.trim() && !behaviorDescription.trim()) {
      alert("Please enter clothing or behavior details before saving.");
      return;
    }

    setSavedSuspiciousPersons([
      ...savedSuspiciousPersons,
      {
        clothingDescription,
        behaviorDescription,
        directionOfTravel,
        vehicleInvolved,
        timeObserved,
        notes,
      },
    ]);

    // Clear form fields
    setClothingDescription("");
    setBehaviorDescription("");
    setDirectionOfTravel("");
    setVehicleInvolved("");
    setTimeObserved("");
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
        Suspicious Person
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={clothingDescription}
          onChange={(e) => setClothingDescription(e.target.value)}
          placeholder="Clothing Description"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={behaviorDescription}
          onChange={(e) => setBehaviorDescription(e.target.value)}
          placeholder="Behavior (e.g., pacing, looking into cars)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={directionOfTravel}
          onChange={(e) => setDirectionOfTravel(e.target.value)}
          placeholder="Direction of Travel"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={vehicleInvolved}
          onChange={(e) => setVehicleInvolved(e.target.value)}
          placeholder="Vehicle Involved (if any)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={timeObserved}
          onChange={(e) => setTimeObserved(e.target.value)}
          placeholder="Time Observed"
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
        onClick={saveSuspiciousPerson}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Suspicious Person
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Entries</h2>

        {savedSuspiciousPersons.length === 0 && (
          <p className="text-white/50 text-sm">
            No suspicious persons saved yet.
          </p>
        )}

        {savedSuspiciousPersons.map((entry, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>{entry.clothingDescription || "Unknown Clothing"}</strong></p>
            <p>Behavior: {entry.behaviorDescription}</p>
            <p>Direction: {entry.directionOfTravel}</p>
            <p>Vehicle: {entry.vehicleInvolved}</p>
            <p>Time: {entry.timeObserved}</p>
            <p className="mt-2 text-white/70">{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}