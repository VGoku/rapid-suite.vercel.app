import { useState, useEffect } from "react";
import type { EMTIncidentData } from "../pages/EMTIncident";

/**
 * Stores EMT incidents in localStorage.
 * Uses lazy initialization to avoid React warnings.
 */
export default function useLocalIncidents() {
  // Load from localStorage ONLY once, during initial state creation
  const [incidents, setIncidents] = useState<EMTIncidentData[]>(() => {
    const saved = localStorage.getItem("emt-incidents");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever incidents change
  useEffect(() => {
    localStorage.setItem("emt-incidents", JSON.stringify(incidents));
  }, [incidents]);

  return { incidents, setIncidents };
}