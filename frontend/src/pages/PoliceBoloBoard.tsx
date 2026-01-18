/**
 * PoliceBoloBoard.tsx
 * --------------------
 * BOLO (Be On The Lookout) Board for Police Mode.
 *
 * Officers can add BOLO entries including:
 * - Suspect description
 * - Vehicle information
 * - Last known direction
 * - Risk level
 * - Additional notes
 *
 * Saved BOLOs appear in a high‑visibility list.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceBoloBoardProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceBoloBoard({ setView }: PoliceBoloBoardProps) {
  // Form fields
  const [suspectDescription, setSuspectDescription] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState("");
  const [lastDirection, setLastDirection] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [notes, setNotes] = useState("");

  // Saved BOLO entries
  const [boloList, setBoloList] = useState<
    Array<{
      suspectDescription: string;
      vehicleInfo: string;
      lastDirection: string;
      riskLevel: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current BOLO entry.
   * Requires at least a suspect description or vehicle info.
   */
  function saveBolo() {
    if (!suspectDescription.trim() && !vehicleInfo.trim()) {
      alert("Please enter a suspect or vehicle description before saving.");
      return;
    }

    setBoloList([
      ...boloList,
      {
        suspectDescription,
        vehicleInfo,
        lastDirection,
        riskLevel,
        notes,
      },
    ]);

    // Clear form fields
    setSuspectDescription("");
    setVehicleInfo("");
    setLastDirection("");
    setRiskLevel("");
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
        BOLO Board
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <textarea
          value={suspectDescription}
          onChange={(e) => setSuspectDescription(e.target.value)}
          placeholder="Suspect Description"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <textarea
          value={vehicleInfo}
          onChange={(e) => setVehicleInfo(e.target.value)}
          placeholder="Vehicle Information (Make / Model / Color / Plate)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <input
          value={lastDirection}
          onChange={(e) => setLastDirection(e.target.value)}
          placeholder="Last Known Direction"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
          placeholder="Risk Level (Low / Medium / High)"
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
        onClick={saveBolo}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Add BOLO
      </button>

      {/* BOLO LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Active BOLOs</h2>

        {boloList.length === 0 && (
          <p className="text-white/50 text-sm">No BOLOs posted yet.</p>
        )}

        {boloList.map((entry, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-slate-800 border border-blue-600 text-white shadow-md"
          >
            <p className="font-semibold text-lg">
              {entry.suspectDescription || "Unknown Suspect"}
            </p>

            {entry.vehicleInfo && (
              <p className="mt-1 text-white/80">Vehicle: {entry.vehicleInfo}</p>
            )}

            {entry.lastDirection && (
              <p className="mt-1 text-white/80">
                Last Direction: {entry.lastDirection}
              </p>
            )}

            {entry.riskLevel && (
              <p className="mt-1 text-white/80">Risk Level: {entry.riskLevel}</p>
            )}

            {entry.notes && (
              <p className="mt-2 text-white/60">{entry.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}