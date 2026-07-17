import { useResume } from "../../../context/ResumeContext";
import ClickableSection from "../shared/ClickableSection";
import DraggablePreviewSection from "../shared/DraggablePreviewSection";
import SortableSectionProvider from "../shared/SortableSectionProvider";
import PersonalInfoPreview from "../sections/PersonalInfoPreview";
import { PREVIEW_COMPONENTS } from "../previewComponentsMap";
import { LIST_SECTIONS } from "../../../utils/sectionMeta";

// Fixed by section TYPE, not draggable placement — a section either
// belongs in the sidebar or the main column based on what it is.
// Reordering still works within each group independently.
const SIDEBAR_SECTIONS = ["skills", "languages", "interests"];

function renderSection(key, resumeData) {
  const Component = PREVIEW_COMPONENTS[key];
  return (
    <DraggablePreviewSection key={key} sectionKey={key} wrapAsClickable={!LIST_SECTIONS.includes(key)}>
      <Component {...{ [key]: resumeData[key] }} />
    </DraggablePreviewSection>
  );
}

function ModernTemplate() {
  const { resumeData } = useResume();

  return (
    <div className="bg-white dark:bg-[#233256] rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto print:max-w-none print:shadow-none print:rounded-none text-[#1C2541] dark:text-[#F2EFE9]">
      {/* Header spans full width — name/title/contact stay prominent
         regardless of the two-column split below it */}
      <div className="p-8 sm:p-10 pb-6 border-b-2 border-[#F4B942]">
        <ClickableSection sectionKey="personalInfo">
          <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
        </ClickableSection>
      </div>

      <div className="flex flex-col sm:flex-row print:flex-row">
        {/* Sidebar — narrow, accent-colored, own independent drag group */}
        <div className="sm:w-1/3 bg-[#1C2541] dark:bg-[#171F35] text-[#FAF8F3] p-6">
          <SortableSectionProvider allowedKeys={SIDEBAR_SECTIONS}>
            {(sidebarKeys) => sidebarKeys.map((key) => renderSection(key, resumeData))}
          </SortableSectionProvider>
        </div>

        {/* Main column — everything else, own independent drag group */}
        <div className="sm:w-2/3 p-8 sm:p-10">
          <SortableSectionProvider
            allowedKeys={resumeData.sectionOrder.filter((k) => !SIDEBAR_SECTIONS.includes(k))}
          >
            {(mainKeys) => mainKeys.map((key) => renderSection(key, resumeData))}
          </SortableSectionProvider>
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate;