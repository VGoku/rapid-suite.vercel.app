/**
 * FireToolsHazmat.tsx
 * --------------------
 * Lightweight Hazmat quick reference guide.
 *
 * Provides:
 * - Hazard classes
 * - Common placards
 * - Basic first-action reminders (non-medical, non-procedural)
 * - High-contrast firefighter-friendly layout
 */

import type { ViewState } from "../App";

type FireToolsHazmatProps = {
  setView: (next: ViewState) => void;
};

export default function FireToolsHazmat({ setView }: FireToolsHazmatProps) {
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
        Hazmat Quick Guide
      </h1>

      {/* HAZARD CLASSES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Hazard Classes</h2>

        <div className="space-y-2 text-white/80">
          <p>• Class 1 — Explosives</p>
          <p>• Class 2 — Gases</p>
          <p>• Class 3 — Flammable Liquids</p>
          <p>• Class 4 — Flammable Solids</p>
          <p>• Class 5 — Oxidizers</p>
          <p>• Class 6 — Toxic & Infectious Substances</p>
          <p>• Class 7 — Radioactive Materials</p>
          <p>• Class 8 — Corrosives</p>
          <p>• Class 9 — Miscellaneous Dangerous Goods</p>
        </div>
      </div>

      {/* COMMON PLACARDS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Common Placards</h2>

        <div className="space-y-2 text-white/80">
          <p>• Red Diamond — Flammable</p>
          <p>• Yellow Diamond — Oxidizer</p>
          <p>• White Diamond — Toxic</p>
          <p>• Blue Diamond — Health Hazard</p>
          <p>• Orange Panel — UN Number</p>
        </div>
      </div>

      {/* FIRST ACTION REMINDERS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">First Actions</h2>

        <div className="space-y-2 text-white/80">
          <p>• Isolate the area</p>
          <p>• Identify placards from a safe distance</p>
          <p>• Avoid vapor clouds and low-lying areas</p>
          <p>• Notify command immediately</p>
          <p>• Wait for Hazmat team unless trained & equipped</p>
        </div>
      </div>
    </div>
  );
}