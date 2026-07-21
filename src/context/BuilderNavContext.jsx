import { createContext, useContext, useState } from "react";
import { useResume } from "./ResumeContext";

const BuilderNavContext = createContext(null);

// Tracks which builder section/tab is active and handles prev/next skipping hidden sections
export function BuilderNavProvider({ children }) {
  const { resumeData, dispatch } = useResume();

  // personalInfo lives outside sectionOrder, so prepend it manually
  const navOrder = ["personalInfo", ...resumeData.sectionOrder];
  const [activeSection, setActiveSection] = useState(navOrder[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [pendingEntryId, setPendingEntryId] = useState(null);

  const currentIndex = navOrder.indexOf(activeSection);
  const nextIndex = getNextIndex(currentIndex);
  const prevIndex = getPrevIndex(currentIndex);
  // -1 means "no valid neighbor in that direction"
  const isFirst = prevIndex === -1;
  const isLast = nextIndex === -1;

  // Walk past skipped sections — returns -1 at the end of navOrder
  function getNextIndex(fromIndex) {
    let idx = fromIndex + 1;
    while (
      idx < navOrder.length &&
      resumeData.skippedSections.includes(navOrder[idx])
    ) {
      idx++;
    }
    return idx < navOrder.length ? idx : -1;
  }

  function getPrevIndex(fromIndex) {
    let idx = fromIndex - 1;
    while (idx >= 0 && resumeData.skippedSections.includes(navOrder[idx])) {
      idx--;
    }
    return idx >= 0 ? idx : -1;
  }

  function handleNext() {
    if (nextIndex !== -1) setActiveSection(navOrder[nextIndex]);
  }

  function handlePrev() {
    if (prevIndex !== -1) setActiveSection(navOrder[prevIndex]);
  }

  function handlePickSection(key) {
    setActiveSection(key);
    // First time a user jumps via the preview or picker counts as "seen"
    if (!resumeData.hasSeenSectionPicker) {
      dispatch({ type: "MARK_PICKER_SEEN" });
    }
  }

  function handleActiveSectionSkip(key) {
    // After skipping, land on the nearest non-skipped neighbor
    const next = getNextIndex(navOrder.indexOf(key));
    const prev = getPrevIndex(navOrder.indexOf(key));
    if (next !== -1) setActiveSection(navOrder[next]);
    else if (prev !== -1) setActiveSection(navOrder[prev]);
  }

  // Preview click → jump to section and auto-open that entry (see useAutoEditEntry)
  function handlePickEntry(sectionKey, entryId) {
    handlePickSection(sectionKey);
    setPendingEntryId(entryId);
  }

  function clearPendingEntry() {
    setPendingEntryId(null);
  }

  const value = {
    navOrder,
    activeSection,
    setActiveSection,
    currentIndex,
    isFirst,
    isLast,
    handleNext,
    handlePrev,
    handlePickSection,
    handleActiveSectionSkip,
    showPicker,
    setShowPicker,
    activeTab,
    setActiveTab,
    pendingEntryId,
    handlePickEntry,
    clearPendingEntry,
  };

  return (
    <BuilderNavContext.Provider value={value}>
      {children}
    </BuilderNavContext.Provider>
  );
}

export function useBuilderNav() {
  return useContext(BuilderNavContext);
}
