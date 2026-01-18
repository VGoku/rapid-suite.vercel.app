/**
 * PoliceDomesticCall.tsx
 * -----------------------
 * Domestic call documentation tool for Police Mode.
 *
 * Fields:
 * - Parties involved
 * - Relationship
 * - Injuries observed
 * - Weapons present
 * - Children present
 * - Scene condition
 * - Arrest made
 * - Notes
 *
 * Saved entries appear in a list below the form.
 */

import { useState } from "react";
import type { ViewState } from "../App";

type PoliceDomesticCallProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceDomesticCall({ setView }: PoliceDomesticCallProps) {
  // Form fields
  const [partiesInvolved, setPartiesInvolved] = useState("");
  const [relationship, setRelationship] = useState("");
  const [injuriesObserved, setInjuriesObserved] = useState("");
  const [weaponsPresent, setWeaponsPresent] = useState("");
  const [childrenPresent, setChildrenPresent] = useState("");
  const [sceneCondition, setSceneCondition] = useState("");
  const [arrestMade, setArrestMade] = useState("");
  const [notes, setNotes] = useState("");

  // Saved domestic call entries
  const [savedCalls, setSavedCalls] = useState<
    Array<{
      partiesInvolved: string;
      relationship: string;
      injuriesObserved: string;
      weaponsPresent: string;
      childrenPresent: string;
      sceneCondition: string;
      arrestMade: string;
      notes: string;
    }>
  >([]);

  /**
   * Saves the current domestic call entry.
   * Requires at least "parties involved".
   */
  function saveDomesticCall() {
    if (!partiesInvolved.trim()) {
      alert("Please enter the parties involved before saving.");
      return;
    }

    setSavedCalls([
      ...savedCalls,
      {
        partiesInvolved,
        relationship,
        injuriesObserved,
        weaponsPresent,
        childrenPresent,
        sceneCondition,
        arrestMade,
        notes,
      },
    ]);

    // Clear form fields
    setPartiesInvolved("");
    setRelationship("");
    setInjuriesObserved("");
    setWeaponsPresent("");
    setChildrenPresent("");
    setSceneCondition("");
    setArrestMade("");
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
        Domestic Call
      </h1>

      {/* INPUT FIELDS */}
      <div className="space-y-4 text-white">
        <input
          value={partiesInvolved}
          onChange={(e) => setPartiesInvolved(e.target.value)}
          placeholder="Parties Involved"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder="Relationship (e.g., spouse, roommates)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={injuriesObserved}
          onChange={(e) => setInjuriesObserved(e.target.value)}
          placeholder="Injuries Observed"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={weaponsPresent}
          onChange={(e) => setWeaponsPresent(e.target.value)}
          placeholder="Weapons Present"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={childrenPresent}
          onChange={(e) => setChildrenPresent(e.target.value)}
          placeholder="Children Present"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={sceneCondition}
          onChange={(e) => setSceneCondition(e.target.value)}
          placeholder="Scene Condition (e.g., damaged property)"
          className="w-full p-2 rounded bg-slate-800 border border-slate-600"
        />

        <input
          value={arrestMade}
          onChange={(e) => setArrestMade(e.target.value)}
          placeholder="Arrest Made? (Yes / No)"
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
        onClick={saveDomesticCall}
        className="
          w-full py-2 rounded-lg font-semibold
          bg-blue-600 hover:bg-blue-700
          text-white
        "
      >
        Save Domestic Call
      </button>

      {/* SAVED LIST */}
      <div className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold text-white">Saved Calls</h2>

        {savedCalls.length === 0 && (
          <p className="text-white/50 text-sm">No domestic calls saved yet.</p>
        )}

        {savedCalls.map((call, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white/90"
          >
            <p><strong>{call.partiesInvolved}</strong></p>
            <p>Relationship: {call.relationship}</p>
            <p>Injuries: {call.injuriesObserved}</p>
            <p>Weapons: {call.weaponsPresent}</p>
            <p>Children: {call.childrenPresent}</p>
            <p>Scene: {call.sceneCondition}</p>
            <p>Arrest: {call.arrestMade}</p>
            <p className="mt-2 text-white/70">{call.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}