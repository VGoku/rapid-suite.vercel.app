/**
 * PoliceTrafficStop.tsx
 * ----------------------
 * Traffic stop documentation tool for Police Mode.
 *
 * Fields:
 * - Vehicle make/model/color
 * - License plate
 * - Reason for stop
 * - Driver behavior
 * - Violations
 * - Notes
 *
 * Saved entries appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceTrafficStopProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceTrafficStop({ setView }: PoliceTrafficStopProps) {
  // Form fields
  const [vehicleInfo, setVehicleInfo] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [stopReason, setStopReason] = useState("");
  const [driverBehavior, setDriverBehavior] = useState("");
  const [violations, setViolations] = useState("");
  const [notes, setNotes] = useState("");

  // Saved traffic stop entries
  const [savedStops, setSavedStops] = useState<
    Array<{
      vehicleInfo: string;
      licensePlate: string;
      stopReason: string;
      driverBehavior: string;
      violations: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current traffic stop entry.
   * Requires at least vehicle info or license plate.
   */
  function saveTrafficStop() {
    if (!vehicleInfo.trim() && !licensePlate.trim()) {
      alert("Please enter vehicle info or a license plate before saving.");
      return;
    }

    setSavedStops([
      ...savedStops,
      {
        vehicleInfo,
        licensePlate,
        stopReason,
        driverBehavior,
        violations,
        notes,
      },
    ]);

    // Clear form fields
    setVehicleInfo("");
    setLicensePlate("");
    setStopReason("");
    setDriverBehavior("");
    setViolations("");
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
        Traffic Stop
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={vehicleInfo}
          onChange={(e) => setVehicleInfo(e.target.value)}
          placeholder="Vehicle (Make / Model / Color)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          placeholder="License Plate"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={stopReason}
          onChange={(e) => setStopReason(e.target.value)}
          placeholder="Reason for Stop (e.g., speeding, expired tags)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={driverBehavior}
          onChange={(e) => setDriverBehavior(e.target.value)}
          placeholder="Driver Behavior (e.g., nervous, cooperative)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={violations}
          onChange={(e) => setViolations(e.target.value)}
          placeholder="Violations Observed"
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
        onClick={saveTrafficStop}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Traffic Stop
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Stops</h2>

        {savedStops.length === 0 && (
          <p className="text-white/50 text-sm">No traffic stops saved yet.</p>
        )}

        {savedStops.map((stop, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>{stop.vehicleInfo || "Unknown Vehicle"}</strong></p>
            <p>Plate: {stop.licensePlate || "N/A"}</p>
            <p>Reason: {stop.stopReason}</p>
            <p>Behavior: {stop.driverBehavior}</p>
            <p>Violations: {stop.violations}</p>
            <p className="mt-2 text-white/70">{stop.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}