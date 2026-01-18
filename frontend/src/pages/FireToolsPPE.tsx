/**
 * FireToolsPPE.tsx
 * -----------------
 * A simple, professional PPE checklist for firefighters.
 *
 * Features:
 * - Tap-to-check items
 * - Saves automatically to localStorage
 * - High-contrast, glove-friendly UI
 */

import { useState, useEffect } from "react";
import type { ViewState } from "../App";

type FireToolsPPEProps = {
  setView: (next: ViewState) => void;
};

type PPEItem = {
  id: string;
  label: string;
  checked: boolean;
};

export default function FireToolsPPE({ setView }: FireToolsPPEProps) {
  // ------------------------------------------------------------
  // INITIAL CHECKLIST ITEMS
  // ------------------------------------------------------------
  const defaultItems: PPEItem[] = [
    { id: "helmet", label: "Helmet", checked: false },
    { id: "hood", label: "Protective Hood", checked: false },
    { id: "coat", label: "Turnout Coat", checked: false },
    { id: "pants", label: "Turnout Pants", checked: false },
    { id: "boots", label: "Boots", checked: false },
    { id: "gloves", label: "Gloves", checked: false },
    { id: "scba", label: "SCBA", checked: false },
    { id: "radio", label: "Radio", checked: false },
    { id: "flashlight", label: "Flashlight", checked: false },
  ];

  // ------------------------------------------------------------
  // LOAD SAVED CHECKLIST FROM LOCAL STORAGE
  // ------------------------------------------------------------
  const [items, setItems] = useState<PPEItem[]>(() => {
  const saved = localStorage.getItem("fire_ppe_checklist");
  return saved ? JSON.parse(saved) : defaultItems;
});

  // ------------------------------------------------------------
  // SAVE CHECKLIST AUTOMATICALLY
  // ------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("fire_ppe_checklist", JSON.stringify(items));
  }, [items]);

  // ------------------------------------------------------------
  // TOGGLE CHECKED STATE
  // ------------------------------------------------------------
  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => setView({ name: "fire-tools" })}
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
        PPE Checklist
      </h1>

      {/* CHECKLIST */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`
              p-4 rounded-lg cursor-pointer select-none
              border border-slate-700 bg-slate-800
              flex items-center justify-between
              transition
              ${item.checked ? "opacity-70" : ""}
            `}
          >
            <span className="text-white text-lg">{item.label}</span>

            <span
              className={`
                w-6 h-6 rounded border
                flex items-center justify-center
                ${item.checked ? "bg-green-600 border-green-500" : "border-white/40"}
              `}
            >
              {item.checked && (
                <span className="text-white text-sm font-bold">✓</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}