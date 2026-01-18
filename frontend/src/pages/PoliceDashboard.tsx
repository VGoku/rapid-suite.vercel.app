/**
 * PoliceDashboard.tsx
 * --------------------
 * Main hub for Police Mode tools.
 *
 * Each tool is displayed as a high‑contrast card for quick access.
 * Matches the style of the Firefighter Tools page for consistency.
 */

import type { ViewState } from "../App";

type PoliceDashboardProps = {
  setView: (next: ViewState) => void;
};

export default function PoliceDashboard({ setView }: PoliceDashboardProps) {
  /**
   * List of police tools displayed on the dashboard.
   * Each tool has:
   * - id: unique identifier
   * - label: display name
   * - view: navigation target
   * - description: short text shown on the card
   */
  const policeTools = [
    {
      id: "traffic",
      label: "Traffic Stop",
      view: "police-traffic",
      description: "Document vehicle stops and violations",
    },
    {
      id: "domestic",
      label: "Domestic Call",
      view: "police-domestic",
      description: "Record details from domestic incidents",
    },
    {
      id: "theft",
      label: "Theft / Burglary",
      view: "police-theft",
      description: "Log property crimes and break‑ins",
    },
    {
      id: "suspicious",
      label: "Suspicious Person",
      view: "police-suspicious",
      description: "Quick notes on suspicious activity",
    },
    {
      id: "actions",
      label: "Officer Actions",
      view: "police-actions",
      description: "Track officer actions taken on scene",
    },
    {
      id: "evidence",
      label: "Evidence & Photos",
      view: "police-evidence",
      description: "Record evidence details and references",
    },
    {
      id: "statements",
      label: "Statements",
      view: "police-statements",
      description: "Collect witness and suspect statements",
    },
    {
      id: "notes",
      label: "General Notes",
      view: "police-notes",
      description: "Free‑form notes for any situation",
    },

    {
  id: "scene-log",
  label: "Scene Log",
  view: "police-scene-log",
  description: "Record timestamped events during an incident",
},

{
  id: "bolo",
  label: "BOLO Board",
  view: "police-bolo",
  description: "Post and view active BOLO alerts",
},

{
  id: "incident-generator",
  label: "Incident Generator",
  view: "police-incident-generator",
  description: "Generate quick formatted incident summaries",
},
  ] as const;

  return (
    <div className="p-4 space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "home" })}
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
        Police Tools
      </h1>

      {/* TOOL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policeTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setView({ name: tool.view })}
            className="
              p-6 rounded-lg bg-slate-800 border border-slate-700
              text-white cursor-pointer shadow-sm hover:shadow-md
              transition select-none
            "
          >
            <h2 className="text-xl font-semibold">{tool.label}</h2>
            <p className="text-white/60 text-sm mt-2">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}