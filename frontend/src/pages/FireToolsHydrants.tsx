/**
 * FireToolsHydrants.tsx
 * ----------------------
 * Lightweight hydrant quick reference guide.
 *
 * Provides:
 * - Hydrant color codes and flow ranges
 * - Basic distance considerations
 * - High-contrast firefighter-friendly layout
 */

import type { ViewState } from "../App";

type FireToolsHydrantsProps = {
  setView: (next: ViewState) => void;
};

export default function FireToolsHydrants({ setView }: FireToolsHydrantsProps) {
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
        Hydrant Reference
      </h1>

     {/* STATIC MAP DEMO */}
<div className="relative w-full h-64 rounded-lg overflow-hidden border border-slate-700">
  {/* Background map */}
  <div
    className="absolute inset-0 bg-darkgray-500"
    style={{
  backgroundImage:
    "url('https://worldtravelshop.com/unionstreet/images/UnionStreetMap.png')",
}}
  />

  {/* Hydrant markers — evenly spread across the map */}
<div className="absolute" style={{ top: "20%", left: "5%" }}>
  <div className="w-4 h-4 rounded-full bg-blue-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "40%", left: "15%" }}>
  <div className="w-4 h-4 rounded-full bg-green-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "60%", left: "25%" }}>
  <div className="w-4 h-4 rounded-full bg-orange-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "30%", left: "35%" }}>
  <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "50%", left: "45%" }}>
  <div className="w-4 h-4 rounded-full bg-blue-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "25%", left: "55%" }}>
  <div className="w-4 h-4 rounded-full bg-green-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "65%", left: "65%" }}>
  <div className="w-4 h-4 rounded-full bg-orange-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "35%", left: "75%" }}>
  <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "55%", left: "85%" }}>
  <div className="w-4 h-4 rounded-full bg-blue-500 border border-white shadow" />
</div>

<div className="absolute" style={{ top: "30%", left: "95%" }}>
  <div className="w-4 h-4 rounded-full bg-green-500 border border-white shadow" />
</div>
</div>
{/* LEGEND */}
<div className="text-white/80 text-sm space-y-1 mt-2">
  <p>• Blue — 1500+ GPM</p>
  <p>• Green — 1000–1499 GPM</p>
  <p>• Orange — 500–999 GPM</p>
  <p>• Red — &lt; 500 GPM</p>
</div>

      {/* HYDRANT COLOR CODES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Color Codes</h2>

        <div className="space-y-2 text-white/80">
          <p>• <span className="text-blue-400 font-semibold">Blue</span> — 1500+ GPM (Excellent)</p>
          <p>• <span className="text-green-400 font-semibold">Green</span> — 1000–1499 GPM (Good)</p>
          <p>• <span className="text-orange-400 font-semibold">Orange</span> — 500–999 GPM (Moderate)</p>
          <p>• <span className="text-red-400 font-semibold">Red</span> — &lt; 500 GPM (Poor)</p>
        </div>
      </div>

      {/* DISTANCE GUIDELINES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Distance Notes</h2>

        <div className="space-y-2 text-white/80">
          <p>• Ideal hydrant distance: 50–150 ft from the structure</p>
          <p>• Avoid hydrants blocked by vehicles or obstacles</p>
          <p>• Check for secondary hydrants if flow is low</p>
          <p>• Be aware of dead-end mains (lower pressure)</p>
        </div>
      </div>

      {/* GENERAL REMINDERS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">General Reminders</h2>

        <div className="space-y-2 text-white/80">
          <p>• Verify hydrant caps and threads before connecting</p>
          <p>• Look for signs of damage or leaks</p>
          <p>• Note hydrant location for future pre-plans</p>
          <p>• Flow test results vary by city and season</p>
        </div>
      </div>
    </div>
  );
}