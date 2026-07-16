import { createContext, useContext, useState } from "react";
import { useResume } from "./ResumeContext";

const BuilderNavContext = createContext(null);

export function BuilderNavProvider({ children }) {
  const { resumeData, dispatch } = useResume();

  const navOrder = ["personalInfo", ...resumeData.sectionOrder];
  const [activeSection, setActiveSection] = useState(navOrder[0]);
  const [showPicker, setShowPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");

  const currentIndex = navOrder.indexOf(activeSection);

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

  const nextIndex = getNextIndex(currentIndex);
  const prevIndex = getPrevIndex(currentIndex);
  const isFirst = prevIndex === -1;
  const isLast = nextIndex === -1;

  function handleNext() {
    if (nextIndex !== -1) setActiveSection(navOrder[nextIndex]);
  }

  function handlePrev() {
    if (prevIndex !== -1) setActiveSection(navOrder[prevIndex]);
  }

  function handlePickSection(key) {
    setActiveSection(key);
    if (!resumeData.hasSeenSectionPicker) {
      dispatch({ type: "MARK_PICKER_SEEN" });
    }
  }

  function handleActiveSectionSkip(key) {
    const next = getNextIndex(navOrder.indexOf(key));
    const prev = getPrevIndex(navOrder.indexOf(key));
    if (next !== -1) setActiveSection(navOrder[next]);
    else if (prev !== -1) setActiveSection(navOrder[prev]);
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
