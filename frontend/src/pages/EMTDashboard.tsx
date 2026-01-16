/**
 * EMTDashboard.tsx
 * -----------------
 * Main EMT landing screen.
 * Provides:
 * - Start New Incident
 * - Continue Last Incident
 * - View Saved Incidents
 * - Back to Home
 */

interface Props {
  onStart: () => void;
  onContinue: () => void;
  onView: () => void;
  onHome: () => void;   // <-- NEW
}

export default function EMTDashboard({ onStart, onContinue, onView, onHome }: Props) {
  return (
    <div className="flex flex-col gap-6">

      {/* BACK TO HOME */}
      <button
        onClick={onHome}
        className="
          px-4 py-2 rounded-lg w-fit font-medium
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
        "
      >
        ← Back to Home
      </button>

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        EMT Dashboard
      </h1>

      {/* START NEW INCIDENT */}
      <button
        onClick={onStart}
        className="
          px-6 py-3 rounded-lg text-lg font-medium
          bg-blue-600 text-white hover:bg-blue-700
          dark:bg-blue-500 dark:hover:bg-blue-400
        "
      >
        Start New Incident
      </button>

      {/* CONTINUE LAST INCIDENT */}
      <button
        onClick={onContinue}
        className="
          px-6 py-3 rounded-lg text-lg font-medium
          bg-green-600 text-white hover:bg-green-700
          dark:bg-green-500 dark:hover:bg-green-400
        "
      >
        Continue Last Incident
      </button>

      {/* VIEW SAVED INCIDENTS */}
      <button
        onClick={onView}
        className="
          px-6 py-3 rounded-lg text-lg font-medium
          bg-slate-200 text-slate-800 hover:bg-slate-300
          dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
        "
      >
        View Saved Incidents
      </button>
    </div>
  );
}