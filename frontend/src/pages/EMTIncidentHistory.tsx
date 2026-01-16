/**
 * EMTIncidentHistory.tsx
 * -----------------------
 * Displays all saved EMT incidents.
 *
 * Includes:
 * - Search bar
 * - Condition filter chips
 * - Date filters
 * - Filtered incident list
 * - Clean UI for recruiters
 *
 * This page is intentionally structured so it can be reused
 * for Firefighter and Police modes with minimal changes.
 */

import { useState } from "react";
import type { EMTIncidentData } from "./EMTIncident";

interface Props {
  incidents: EMTIncidentData[];
  onSelect: (incident: EMTIncidentData, index: number) => void;
  onBack: () => void;
}

// Allowed date filter values
type DateFilterOption = "all" | "today" | "7" | "30";

export default function EMTIncidentHistory({
  incidents,
  onSelect,
  onBack,
}: Props) {
  /**
   * SEARCH + FILTER STATE
   * ---------------------
   * searchQuery: text search across notes, timeline, vitals, conditions
   * activeConditions: multi-select condition filters
   * dateFilter: "all", "today", "7", "30"
   */
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConditions, setActiveConditions] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilterOption>("all");

  /**
   * FILTERING LOGIC
   * ----------------
   * Applies:
   * - Date filter
   * - Condition filter
   * - Text search
   */
  const filteredIncidents = incidents.filter((incident) => {
    const createdDate = new Date(incident.createdAt);

    // --- DATE FILTER ---
    if (dateFilter === "today") {
      const today = new Date();
      if (createdDate.toDateString() !== today.toDateString()) return false;
    }

    if (dateFilter === "7") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 7);
      if (createdDate < cutoff) return false;
    }

    if (dateFilter === "30") {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      if (createdDate < cutoff) return false;
    }

    // --- CONDITION FILTER ---
    if (activeConditions.length > 0) {
      const matchesAllConditions = activeConditions.every((condition) =>
        incident.conditions.includes(condition)
      );
      if (!matchesAllConditions) return false;
    }

    // --- TEXT SEARCH ---
    const search = searchQuery.toLowerCase();

    if (search) {
      const matchesSearch =
        incident.notes.toLowerCase().includes(search) ||
        incident.timeline.some((entry) =>
          entry.toLowerCase().includes(search)
        ) ||
        incident.vitals.some((vital) =>
          vital.toLowerCase().includes(search)
        ) ||
        incident.conditions.some((condition) =>
          condition.toLowerCase().includes(search)
        );

      if (!matchesSearch) return false;
    }

    return true;
  });

  return (
  <div className="flex flex-col gap-6 text-slate-800 dark:text-slate-100">

    {/* BACK BUTTON */}
    <button
      onClick={onBack}
      className="
        px-4 py-2 rounded-lg w-fit font-medium
        bg-slate-200 text-slate-800 hover:bg-slate-300
        dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
      "
    >
      ← Back
    </button>

    {/* TITLE */}
    <h1 className="text-3xl font-bold">Saved EMT Incidents</h1>

    {/* SEARCH BAR */}
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search incidents..."
        className="
          w-full p-3 rounded-lg
          bg-white text-slate-800 border border-slate-300
          dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
        "
      />
    </div>

    {/* CONDITION FILTER CHIPS */}
    <div className="flex flex-wrap gap-2">
      {[
        "Conscious",
        "Unconscious",
        "Breathing",
        "Not Breathing",
        "Bleeding",
        "Shock",
        "Cardiac",
        "Trauma",
      ].map((conditionLabel) => (
        <button
          key={conditionLabel}
          onClick={() => {
            setActiveConditions((prev) =>
              prev.includes(conditionLabel)
                ? prev.filter((c) => c !== conditionLabel)
                : [...prev, conditionLabel]
            );
          }}
          className={`
            px-3 py-1 rounded-lg border text-sm font-medium
            ${
              activeConditions.includes(conditionLabel)
                ? "bg-green-600 text-white border-green-700 dark:bg-green-500 dark:border-green-600"
                : "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
            }
          `}
        >
          {conditionLabel}
        </button>
      ))}
    </div>

    {/* DATE FILTER BUTTONS */}
    <div className="flex gap-3">
      {[
        { label: "All", value: "all" as DateFilterOption },
        { label: "Today", value: "today" as DateFilterOption },
        { label: "Last 7 Days", value: "7" as DateFilterOption },
        { label: "Last 30 Days", value: "30" as DateFilterOption },
      ].map((filterOption) => (
        <button
          key={filterOption.value}
          onClick={() => setDateFilter(filterOption.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium
            ${
              dateFilter === filterOption.value
                ? "bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-400"
                : "bg-slate-200 text-slate-800 border border-slate-300 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-600"
            }
          `}
        >
          {filterOption.label}
        </button>
      ))}
    </div>

    {/* INCIDENT LIST */}
    <div className="flex flex-col gap-4">
      {filteredIncidents.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400">
          No incidents match your filters.
        </p>
      )}

      {filteredIncidents.map((incident, index) => (
        <div
          key={index}
          onClick={() => onSelect(incident, index)}
          className="
            p-4 rounded-xl cursor-pointer transition shadow-sm
            bg-white text-slate-800 border border-slate-200 hover:bg-slate-50
            dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700
          "
        >
          <h2 className="text-xl font-semibold">
            Incident #{index + 1}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {new Date(incident.createdAt).toLocaleString()}
          </p>

          <p className="mt-2 text-slate-700 dark:text-slate-300 text-sm line-clamp-2">
            {incident.notes || "No notes recorded."}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {incident.conditions.map((condition, i) => (
              <span
                key={i}
                className="
                  px-2 py-1 rounded text-xs font-medium
                  bg-green-600 text-white
                  dark:bg-green-500 dark:text-white
                "
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}