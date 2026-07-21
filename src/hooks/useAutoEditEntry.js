import { useEffect } from "react";
import { useBuilderNav } from "../context/BuilderNavContext";

// Opens the matching list entry for edit when user taps it in the preview
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