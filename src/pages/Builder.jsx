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
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-body">
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