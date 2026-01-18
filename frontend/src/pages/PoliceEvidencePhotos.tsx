/**
 * PoliceEvidencePhotos.tsx
 * -------------------------
 * Evidence & Photos documentation tool for Police Mode.
 *
 * Fields:
 * - Evidence description
 * - Location found
 * - Chain of custody notes
 * - Photo reference number
 * - Additional notes
 *
 * Saved entries appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceEvidencePhotosProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceEvidencePhotos({
  setView,
}: PoliceEvidencePhotosProps) {
  // Form fields
  const [evidenceDescription, setEvidenceDescription] = useState("");
  const [locationFound, setLocationFound] = useState("");
  const [chainOfCustody, setChainOfCustody] = useState("");
  const [photoReference, setPhotoReference] = useState("");
  const [notes, setNotes] = useState("");

  // Saved evidence entries
  const [savedEvidence, setSavedEvidence] = useState<
    Array<{
      evidenceDescription: string;
      locationFound: string;
      chainOfCustody: string;
      photoReference: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current evidence entry.
   * Requires at least an evidence description.
   */
  function saveEvidence() {
    if (!evidenceDescription.trim()) {
      alert("Please enter an evidence description before saving.");
      return;
    }

    setSavedEvidence([
      ...savedEvidence,
      {
        evidenceDescription,
        locationFound,
        chainOfCustody,
        photoReference,
        notes,
      },
    ]);

    // Clear form fields
    setEvidenceDescription("");
    setLocationFound("");
    setChainOfCustody("");
    setPhotoReference("");
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
        Evidence & Photos
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <textarea
          value={evidenceDescription}
          onChange={(e) => setEvidenceDescription(e.target.value)}
          placeholder="Evidence Description"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <input
          value={locationFound}
          onChange={(e) => setLocationFound(e.target.value)}
          placeholder="Location Found"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={chainOfCustody}
          onChange={(e) => setChainOfCustody(e.target.value)}
          placeholder="Chain of Custody Notes"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <input
          value={photoReference}
          onChange={(e) => setPhotoReference(e.target.value)}
          placeholder="Photo Reference Number"
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
        onClick={saveEvidence}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Evidence
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Evidence</h2>

        {savedEvidence.length === 0 && (
          <p className="text-white/50 text-sm">No evidence saved yet.</p>
        )}

        {savedEvidence.map((entry, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>{entry.evidenceDescription}</strong></p>
            <p>Location: {entry.locationFound}</p>
            <p>Chain of Custody: {entry.chainOfCustody}</p>
            <p>Photo Ref: {entry.photoReference}</p>
            <p className="mt-2 text-white/70">{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}