/**
 * EMTIncidentView.tsx
 * --------------------
 * Displays a saved incident in read‑only mode.
 * Includes:
 * - Back button
 * - Created timestamp
 * - Timeline
 * - Vitals
 * - Conditions
 * - Notes
 * - Photos (NEW)
 */

import type { EMTIncidentData } from "./EMTIncident";
import { generateIncidentPDF } from "../utils/generateIncidentPDF";

interface Props {
  incident: EMTIncidentData;
  onBack: () => void;
}

export default function EMTIncidentView({ incident, onBack }: Props) {
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

    {/* DOWNLOAD PDF */}
    <button
      onClick={() => generateIncidentPDF(incident)}
      className="
        px-4 py-2 rounded-lg w-fit font-medium
        bg-blue-600 text-white hover:bg-blue-700
        dark:bg-blue-500 dark:hover:bg-blue-400
      "
    >
      📄 Download PDF
    </button>

    {/* TITLE */}
    <h1 className="text-3xl font-bold">Incident Details</h1>

    {/* CREATED DATE */}
    <p className="text-slate-600 dark:text-slate-400">
      Created: {new Date(incident.createdAt).toLocaleString()}
    </p>

    {/* TIMELINE */}
    <div>
      <h2 className="text-xl font-semibold mb-2">Timeline</h2>
      <ul
        className="
          p-4 rounded-lg space-y-2
          bg-white border border-slate-300
          dark:bg-slate-800 dark:border-slate-700
        "
      >
        {incident.timeline.map((timelineEntry, index) => (
          <li key={index} className="text-slate-700 dark:text-slate-300">
            {timelineEntry}
          </li>
        ))}
      </ul>
    </div>

    {/* VITALS */}
    <div>
      <h2 className="text-xl font-semibold mb-2">Vitals</h2>
      <ul
        className="
          p-4 rounded-lg space-y-2
          bg-white border border-slate-300
          dark:bg-slate-800 dark:border-slate-700
        "
      >
        {incident.vitals.map((vitalEntry, index) => (
          <li key={index} className="text-slate-700 dark:text-slate-300">
            {vitalEntry}
          </li>
        ))}
      </ul>
    </div>

    {/* CONDITIONS */}
    <div>
      <h2 className="text-xl font-semibold mb-2">Conditions</h2>
      <div className="flex flex-wrap gap-2">
        {incident.conditions.map((conditionLabel, index) => (
          <span
            key={index}
            className="
              px-3 py-1 rounded-lg text-sm font-medium
              bg-green-600 text-white
              dark:bg-green-500 dark:text-white
            "
          >
            {conditionLabel}
          </span>
        ))}
      </div>
    </div>

    {/* NOTES */}
    <div>
      <h2 className="text-xl font-semibold mb-2">Notes</h2>
      <p
        className="
          p-4 rounded-lg whitespace-pre-wrap
          bg-white border border-slate-300
          dark:bg-slate-800 dark:border-slate-700
        "
      >
        {incident.notes}
      </p>
    </div>

    {/* PHOTOS */}
    {incident.photos && incident.photos.length > 0 && (
      <div>
        <h2 className="text-xl font-semibold mb-2">Photos</h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-3">
          {incident.photos.map((photoSrc, index) => (
            <img
              key={index}
              src={photoSrc}
              className="
                w-full h-24 object-cover rounded-lg
                border border-slate-300 dark:border-slate-700
              "
            />
          ))}
        </div>

        {/* Mobile Scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto">
          {incident.photos.map((photoSrc, index) => (
            <img
              key={index}
              src={photoSrc}
              className="
                w-24 h-24 object-cover rounded-lg flex-shrink-0
                border border-slate-300 dark:border-slate-700
              "
            />
          ))}
        </div>
      </div>
    )}
  </div>
);
}