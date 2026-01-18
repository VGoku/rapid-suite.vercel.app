/**
 * PoliceTheftBurglary.tsx
 * ------------------------
 * Theft / Burglary documentation tool for Police Mode.
 *
 * Fields:
 * - Incident type (Theft, Burglary, Vehicle Break‑In)
 * - Point of entry
 * - Items stolen
 * - Serial numbers
 * - Suspect description
 * - Cameras on site
 * - Notes
 *
 * Saved entries appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceTheftBurglaryProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceTheftBurglary({
  setView,
}: PoliceTheftBurglaryProps) {
  // Form fields
  const [incidentType, setIncidentType] = useState("");
  const [pointOfEntry, setPointOfEntry] = useState("");
  const [itemsStolen, setItemsStolen] = useState("");
  const [serialNumbers, setSerialNumbers] = useState("");
  const [suspectDescription, setSuspectDescription] = useState("");
  const [camerasOnSite, setCamerasOnSite] = useState("");
  const [notes, setNotes] = useState("");

  // Saved theft/burglary entries
  const [savedIncidents, setSavedIncidents] = useState<
    Array<{
      incidentType: string;
      pointOfEntry: string;
      itemsStolen: string;
      serialNumbers: string;
      suspectDescription: string;
      camerasOnSite: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current theft/burglary entry.
   * Requires at least an incident type.
   */
  function saveIncident() {
    if (!incidentType.trim()) {
      alert("Please enter an incident type before saving.");
      return;
    }

    setSavedIncidents([
      ...savedIncidents,
      {
        incidentType,
        pointOfEntry,
        itemsStolen,
        serialNumbers,
        suspectDescription,
        camerasOnSite,
        notes,
      },
    ]);

    // Clear form fields
    setIncidentType("");
    setPointOfEntry("");
    setItemsStolen("");
    setSerialNumbers("");
    setSuspectDescription("");
    setCamerasOnSite("");
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
        Theft / Burglary
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={incidentType}
          onChange={(e) => setIncidentType(e.target.value)}
          placeholder="Incident Type (Theft, Burglary, Vehicle Break‑In)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={pointOfEntry}
          onChange={(e) => setPointOfEntry(e.target.value)}
          placeholder="Point of Entry (e.g., window, door)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={itemsStolen}
          onChange={(e) => setItemsStolen(e.target.value)}
          placeholder="Items Stolen"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <textarea
          value={serialNumbers}
          onChange={(e) => setSerialNumbers(e.target.value)}
          placeholder="Serial Numbers (if available)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <textarea
          value={suspectDescription}
          onChange={(e) => setSuspectDescription(e.target.value)}
          placeholder="Suspect Description"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <input
          value={camerasOnSite}
          onChange={(e) => setCamerasOnSite(e.target.value)}
          placeholder="Cameras on Site? (Yes / No)"
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
        onClick={saveIncident}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Incident
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Incidents</h2>

        {savedIncidents.length === 0 && (
          <p className="text-white/50 text-sm">No incidents saved yet.</p>
        )}

        {savedIncidents.map((incident, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>{incident.incidentType}</strong></p>
            <p>Entry: {incident.pointOfEntry}</p>
            <p>Items: {incident.itemsStolen}</p>
            <p>Serials: {incident.serialNumbers}</p>
            <p>Suspect: {incident.suspectDescription}</p>
            <p>Cameras: {incident.camerasOnSite}</p>
            <p className="mt-2 text-white/70">{incident.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}