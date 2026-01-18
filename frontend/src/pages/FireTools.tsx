/**
 * FireTools.tsx
 * --------------
 * Firefighter utility tools hub.
 *
 * This page provides quick access to specialized firefighter tools.
 * Each tool is displayed as a high‑contrast card for fast visibility
 * in low‑light or high‑stress environments.
 */

import type { ViewState } from "../App";

type FireToolsProps = {
  setView: (next: ViewState) => void;
};

export default function FireTools({ setView }: FireToolsProps) {
  /**
   * Tool definitions for the Fire Tools menu.
   * Each tool has:
   * - id: unique identifier
   * - label: display name
   * - view: the view state to navigate to
   * - description: short text shown on the card
   */
  const fireToolsList = [
    {
      id: "hydrants",
      label: "Hydrant Map",
      view: "fire-tools-hydrants",
      description: "Static map with hydrant markers",
    },
    {
      id: "hazmat",
      label: "Hazmat Reference",
      view: "fire-tools-hazmat",
      description: "DOT placards and hazard classes",
    },
    {
      id: "preplans",
      label: "Pre‑Plan Notes",
      view: "fire-preplan", // <-- Correct view name
      description: "Create and view structure pre‑plans",
    },
    {
      id: "ppe",
      label: "PPE Checklist",
      view: "fire-tools-ppe",
      description: "Personal protective equipment checklist",
    },
  ] as const;

  return (
    <div className="p-4 space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "fire-dashboard" })}
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
        Firefighter Tools
      </h1>

      {/* TOOL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fireToolsList.map((tool) => (
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

            {/* Tool description */}
            <p className="text-white/60 text-sm mt-2">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}