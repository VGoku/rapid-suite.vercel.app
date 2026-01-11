import type { EMTIncidentData } from "./EMTIncident";

interface Props {
  incidents: EMTIncidentData[];
  onSelect: (index: number) => void;
  onBack: () => void;
}

export default function EMTIncidentHistory({ incidents, onSelect, onBack }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={onBack}
        className="text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg w-fit"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">Saved Incidents</h1>

      {incidents.length === 0 ? (
        <p className="text-white/60">No incidents saved yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {incidents.map((inc, i) => (
            <div
              key={i}
              onClick={() => onSelect(i)}
              className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition"
            >
              <h2 className="text-xl font-semibold">Incident #{i + 1}</h2>
              <p className="text-white/70 text-sm">
                {new Date(inc.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}