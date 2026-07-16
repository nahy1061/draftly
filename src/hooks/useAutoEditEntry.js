import { useEffect } from "react";
import { useBuilderNav } from "../context/BuilderNavContext";

// Used by each list-based form (Education, Experience, etc). 
// Watches for a "pending entry" matching THIS section —  if found, calls the form's own handleEdit with the matching entry, then clears the pending state so it doesn't re-trigger.
export function useAutoEditEntry(sectionKey, entries, onEdit) {
  const { activeSection, pendingEntryId, clearPendingEntry } = useBuilderNav();

  useEffect(() => {
    if (activeSection === sectionKey && pendingEntryId) {
      const entry = entries.find((e) => e.id === pendingEntryId);
      if (entry) onEdit(entry);
      clearPendingEntry();
    }
  }, [activeSection, pendingEntryId]);
}