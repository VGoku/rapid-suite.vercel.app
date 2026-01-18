/**
 * PoliceIncidentGenerator.tsx
 * ----------------------------
 * Quick Incident Generator for Police Mode.
 *
 * Officers select:
 * - Incident type
 * - Outcome
 * - Actions taken
 * - Evidence collected
 * - Additional notes
 *
 * The tool generates a formatted summary that can be copied.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceIncidentGeneratorProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceIncidentGenerator({
  setView,
}: PoliceIncidentGeneratorProps) {
  // Form fields
  const [incidentType, setIncidentType] = useState("");
  const [incidentOutcome, setIncidentOutcome] = useState("");
  const [actionsTaken, setActionsTaken] = useState("");
  const [evidenceCollected, setEvidenceCollected] = useState("");
  const [notes, setNotes] = useState("");

  // Generated summary text
  const [generatedSummary, setGeneratedSummary] = useState("");

  /**
   * Builds a formatted incident summary.
   */
  function generateSummary() {
    if (!incidentType.trim()) {
      alert("Please enter an incident type before generating.");
      return;
    }

    const summary = `
Incident Summary
----------------
Incident Type: ${incidentType}
Outcome: ${incidentOutcome || "N/A"}
Actions Taken: ${actionsTaken || "N/A"}
Evidence Collected: ${evidenceCollected || "N/A"}

Notes:
${notes || "None"}
    `.trim();

    setGeneratedSummary(summary);
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
        Quick Incident Generator
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={incidentType}
          onChange={(e) => setIncidentType(e.target.value)}
          placeholder="Incident Type (e.g., Traffic Stop, Domestic Call)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={incidentOutcome}
          onChange={(e) => setIncidentOutcome(e.target.value)}
          placeholder="Outcome (e.g., Arrest, Warning, Report Taken)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <textarea
          value={actionsTaken}
          onChange={(e) => setActionsTaken(e.target.value)}
          placeholder="Actions Taken"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <textarea
          value={evidenceCollected}
          onChange={(e) => setEvidenceCollected(e.target.value)}
          placeholder="Evidence Collected"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-20"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional Notes"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600 h-24"
        />
      </div>

      {/* GENERATE BUTTON */}
      <button
        onClick={generateSummary}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Generate Summary
      </button>

      {/* GENERATED SUMMARY */}
      {generatedSummary && (
        <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-700 text-white whitespace-pre-wrap">
          <h2 className="text-xl font-semibold mb-2">Generated Summary</h2>
          <pre className="text-white/90">{generatedSummary}</pre>
        </div>
      )}
    </div>
  );
}