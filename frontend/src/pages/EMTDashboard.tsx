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

      {/* Back to Home */}
      <button
        onClick={onHome}
        className="text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg w-fit"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold">EMT Dashboard</h1>

      <button
        onClick={onStart}
        className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg"
      >
        Start New Incident
      </button>

      <button
        onClick={onContinue}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Continue Last Incident
      </button>

      <button
        onClick={onView}
        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg"
      >
        View Saved Incidents
      </button>
    </div>
  );
}