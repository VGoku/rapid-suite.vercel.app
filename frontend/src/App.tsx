/**
 * App.tsx
 * -------
 * Main controller for the entire application.
 *
 * Responsibilities:
 * - Navigation between all screens
 * - Saving notes
 * - Saving EMT incidents
 * - Saving Firefighter incidents
 * - Editing existing incidents
 * - Viewing incident history
 * - Rendering Home, Settings, EMT, Firefighter, and Note screens
 */

import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Settings from "./pages/Settings";

// Note Screens
import NewNote from "./pages/NewNote";
import ViewNote from "./pages/ViewNote";

// EMT Screens
import EMTDashboard from "./pages/EMTDashboard";
import EMTIncident from "./pages/EMTIncident";
import EMTIncidentHistory from "./pages/EMTIncidentHistory";
import EMTIncidentView from "./pages/EMTIncidentView";

// Firefighter Screens
import FireDashboard from "./pages/FireDashboard";
import FireIncident from "./pages/FireIncident";
import FireIncidentHistory from "./pages/FireIncidentHistory";
import FireIncidentView from "./pages/FireIncidentView";
import FireIncidentEdit from "./pages/FireIncidentEdit";
import FireTools from "./pages/FireTools";
import FireToolsPPE from "./pages/FireToolsPPE";
import FireToolsHazmat from "./pages/FireToolsHazmat";
import FireToolsHydrants from "./pages/FireToolsHydrants";
import FireToolsPrePlan from "./pages/FireToolsPrePlan";

// Police Screens
import PoliceDashboard from "./pages/PoliceDashboard";
import PoliceTrafficStop from "./pages/PoliceTrafficStop";
import PoliceDomesticCall from "./pages/PoliceDomesticCall";
import PoliceSuspiciousPerson from "./pages/PoliceSuspiciousPerson";
import PoliceTheftBurglary from "./pages/PoliceTheftBurglary";
import PoliceOfficerActions from "./pages/PoliceOfficerActions";
import PoliceEvidencePhotos from "./pages/PoliceEvidencePhotos";
import PoliceStatements from "./pages/PoliceStatements";
import PoliceGeneralNotes from "./pages/PoliceGeneralNotes";
import PoliceSceneLog from "./pages/PoliceSceneLog";
import PoliceBoloBoard from "./pages/PoliceBoloBoard";
import PoliceIncidentGenerator from "./pages/PoliceIncidentGenerator";

// Hooks
import useLocalNotes from "./hooks/useLocalNotes";
import useLocalIncidents from "./hooks/useLocalIncidents";
import useLocalFireIncidents from "./hooks/useLocalFireIncidents";

// Types
import type { Note } from "./types/Note";
import type { EMTIncidentData } from "./pages/EMTIncident";
import type { FireIncidentData } from "./types/FireIncidentData";

/**
 * ViewState controls which screen is visible.
 */
export type ViewState =
  | { name: "home" }
  | { name: "settings" }
  | { name: "new" }
  | { name: "view"; id: string }
  | { name: "emt" }
  | { name: "emt-incident" }
  | { name: "emt-edit"; index: number }
  | { name: "emt-history" }
  | { name: "emt-view"; index: number }
  | { name: "fire-dashboard" }
  | { name: "fire-incident" }
  | { name: "fire-edit"; index: number }
  | { name: "fire-history" }
  | { name: "fire-view"; index: number }
  | { name: "fire-continue" }
  | { name: "fire-tools" }
  | { name: "fire-tools-ppe" }
  | { name: "fire-tools-hydrants" }
  | { name: "fire-tools-hazmat" }
  | { name: "fire-tools-preplans" }
  | { name: "fire-preplan" }
  | { name: "police-dashboard" }
  | { name: "police-traffic" }
  | { name: "police-domestic" }
  | { name: "police-theft" }
  | { name: "police-suspicious" }
  | { name: "police-actions" }
  | { name: "police-evidence" }
  | { name: "police-statements" }
  | { name: "police-notes" }
  | { name: "police-scene-log" }
  | { name: "police-bolo" }
  | { name: "police-incident-generator" };
/**
 * Main application component.
 */

function App() {
  const [view, setView] = useState<ViewState>({ name: "home" });

  // Notes storage
  const { notes, setNotes } = useLocalNotes();

  // EMT incidents storage
  const { incidents, setIncidents } = useLocalIncidents();

  // Firefighter incidents storage
  const { fireIncidents, setFireIncidents } = useLocalFireIncidents();

  /**
   * Apply saved theme on load.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("settings_themeMode");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [view]);

  /**
   * Save a new note and navigate to its detail view.
   */
  function handleSaveNote(note: Note) {
    setNotes([note, ...notes]);
    setView({ name: "view", id: note.id });
  }

  /**
   * Delete a note and return to home.
   */
  function handleDeleteNote(id: string) {
    setNotes(notes.filter((n) => n.id !== id));
    setView({ name: "home" });
  }

  /**
   * Export a note as JSON.
   */
  function handleExportNote(note: Note) {
    const blob = new Blob([JSON.stringify(note, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${note.id}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  /**
   * Save or update an EMT incident.
   */
  function handleSaveEMTIncident(data: EMTIncidentData, editIndex?: number) {
    if (editIndex !== undefined) {
      const updated = [...incidents];
      updated[editIndex] = data;
      setIncidents(updated);
    } else {
      setIncidents([data, ...incidents]);
    }

    setView({ name: "emt" });
  }

  /**
   * Save or update a Firefighter incident.
   */
  function handleSaveFireIncident(
    data: FireIncidentData,
    editIndex?: number
  ) {
    if (editIndex !== undefined) {
      const updated = [...fireIncidents];
      updated[editIndex] = data;
      setFireIncidents(updated);
      setView({ name: "fire-history" }); // Edit → History
    } else {
      setFireIncidents([data, ...fireIncidents]);
      setView({ name: "fire-dashboard" }); // New → Dashboard
    }
  }

  // Current note being viewed
  const currentNote =
    view.name === "view" ? notes.find((n) => n.id === view.id) : null;

  return (
    <div
      className="
        min-h-screen w-screen font-inter
        bg-white text-black
        dark:bg-slate-900 dark:text-white
        transition-colors duration-300"
    >
      <Navbar />

      <main className="min-h-[calc(100vh-4rem)] px-8 py-12 flex justify-center items-start">
        <section
          className="
            w-full max-w-7xl rounded-xl shadow-xl p-10
            bg-slate-100 text-black
            dark:bg-slate-900 dark:text-white
            transition-colors duration-300
          "
        >
          {/* HOME */}
          {view.name === "home" && (
            <Home setView={setView} notes={notes} />
          )}

          {/* SETTINGS */}
          {view.name === "settings" && (
            <Settings onBack={() => setView({ name: "home" })} />
          )}

          {/* EMT SCREENS */}

          {view.name === "emt" && (
            <EMTDashboard
              onStart={() => setView({ name: "emt-incident" })}
              onContinue={() =>
                incidents.length > 0
                  ? setView({ name: "emt-edit", index: 0 })
                  : null
              }
              onView={() => setView({ name: "emt-history" })}
              onHome={() => setView({ name: "home" })}
            />
          )}

          {view.name === "emt-incident" && (
            <EMTIncident
              onSave={handleSaveEMTIncident}
              onCancel={() => setView({ name: "emt" })}
            />
          )}

          {view.name === "emt-edit" && (
            <EMTIncident
              initialData={incidents[view.index]}
              editIndex={view.index}
              onSave={handleSaveEMTIncident}
              onCancel={() => setView({ name: "emt" })}
            />
          )}

          {view.name === "emt-history" && (
            <EMTIncidentHistory
              incidents={incidents}
              onSelect={(_, index) =>
                setView({ name: "emt-view", index })
              }
              onBack={() => setView({ name: "emt" })}
            />
          )}

          {view.name === "emt-view" && (
            <EMTIncidentView
              incident={incidents[view.index]}
              onBack={() => setView({ name: "emt-history" })}
            />
          )}

          
          {/* FIREFIGHTER SCREENS*/}
          
          {view.name === "fire-dashboard" && (
            <FireDashboard
              setView={setView}
              fireIncidents={fireIncidents}
            />
          )}

          {view.name === "fire-tools" && (
          <FireTools setView={setView} />
          )}

          {view.name === "fire-tools-ppe" && (
          <FireToolsPPE setView={setView} />
          )}

          {view.name === "fire-preplan" && (
         <FireToolsPrePlan setView={setView} />
          )}


          {view.name === "fire-incident" && (
            <FireIncident
              setView={setView}
              onSave={handleSaveFireIncident}
            />
          )}

          {view.name === "fire-edit" && (
            <FireIncidentEdit
              setView={setView}
              incident={fireIncidents[view.index]}
              index={view.index}
              onSave={handleSaveFireIncident}
            />
          )}

          {view.name === "fire-history" && (
            <FireIncidentHistory
              setView={setView}
              incidents={fireIncidents}
            />
          )}

          {view.name === "fire-view" && (
  <FireIncidentView
    setView={setView}
    incident={fireIncidents[view.index]}
    index={view.index}
  />
)}

{view.name === "fire-tools-hydrants" && (
  <FireToolsHydrants setView={setView} />
)}

{view.name === "fire-tools-hazmat" && (
  <FireToolsHazmat setView={setView} />
)}

{view.name === "fire-tools-preplans" && (
  <div className="p-4 text-white">Pre-Plan Notes coming soon...</div>
)}

          {/* POLICE SCREENS */}

          {view.name === "police-dashboard" && (
  <PoliceDashboard setView={setView} />
)}

{/* POLICE: Traffic Stop */}
{view.name === "police-traffic" && (
  <PoliceTrafficStop setView={setView} />
)}

{/* POLICE: Domestic Call */}
{view.name === "police-domestic" && (
  <PoliceDomesticCall setView={setView} />
)}

{/* Police: Suspicious Person */}
{view.name === "police-suspicious" && (
  <PoliceSuspiciousPerson setView={setView} />
)}

{/* Police: Theft/Burglary */}
{view.name === "police-theft" && (
  <PoliceTheftBurglary setView={setView} />
)}

{/* Police: Officer Actions */}
{view.name === "police-actions" && (
  <PoliceOfficerActions setView={setView} />
)}

{/* Police: Evidence Photos */}
{view.name === "police-evidence" && (
  <PoliceEvidencePhotos setView={setView} />
)}

{/* Police: Statements */}
{view.name === "police-statements" && (
  <PoliceStatements setView={setView} />
)}

{/* Police: General Notes */}
{view.name === "police-notes" && (
  <PoliceGeneralNotes setView={setView} />
)}

{/* Police: Scene Log */}
{view.name === "police-scene-log" && (
  <PoliceSceneLog setView={setView} />
)}

{/* Police: BOLO Board */}
{view.name === "police-bolo" && (
  <PoliceBoloBoard setView={setView} />
)}

{/* Police: Incident Generator */}
{view.name === "police-incident-generator" && (
  <PoliceIncidentGenerator setView={setView} />
)}
          {/* ------------------------------------------------ */}
          {/* NOTES                                            */}
          {/* ------------------------------------------------ */}

          {view.name === "new" && (
            <NewNote
              onSave={handleSaveNote}
              onCancel={() => setView({ name: "home" })}
            />
          )}

          {view.name === "view" && currentNote && (
            <ViewNote
              note={currentNote}
              onEdit={() => setView({ name: "new" })}
              onDelete={() => handleDeleteNote(currentNote.id)}
              onExport={() => handleExportNote(currentNote)}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;