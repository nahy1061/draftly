import { useResume } from "../context/ResumeContext";
import { BuilderNavProvider, useBuilderNav } from "../context/BuilderNavContext";
import SectionPicker from "../components/SectionPicker/SectionPicker";
import BuilderHeader from "../components/Builder/BuilderHeader";
import BuilderMain from "../components/Builder/BuilderMain";

function BuilderContent() {
  const { resumeData } = useResume();
  const { handlePickSection, showPicker, setShowPicker, activeSection, handleActiveSectionSkip } =
    useBuilderNav();

  if (!resumeData.hasSeenSectionPicker) {
    return <SectionPicker mode="fullscreen" onSelect={handlePickSection} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] dark:bg-[#1C2541] text-[#1C2541] dark:text-[#F2EFE9]">
      <BuilderHeader />
      <BuilderMain />

      {showPicker && (
        <SectionPicker
          mode="modal"
          onSelect={handlePickSection}
          onClose={() => setShowPicker(false)}
          activeSection={activeSection}
          onActiveSectionSkip={handleActiveSectionSkip}
        />
      )}
    </div>
  );
}

// Wrapping in its own component so BuilderContent can call
// useBuilderNav() — a component can't use a context it's also
// the one providing.
function Builder() {
  return (
    <BuilderNavProvider>
      <BuilderContent />
    </BuilderNavProvider>
  );
}

export default Builder;