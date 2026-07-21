import { useResume } from "../../../context/ResumeContext";
import ClickableSection from "../shared/ClickableSection";
import DraggablePreviewSection from "../shared/DraggablePreviewSection";
import SortableSectionProvider from "../shared/SortableSectionProvider";
import PersonalInfoPreview from "../sections/PersonalInfoPreview";
import { PREVIEW_COMPONENTS } from "../previewComponentsMap";
import { LIST_SECTIONS } from "../../../utils/sectionMeta";

function ProfessionalTemplate() {
  const { resumeData } = useResume();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-2xl print:w-auto print:shadow-none print:rounded-none text-[#1C2541]">
      {/* Teal masthead — Professional's visual anchor vs other templates */}
      <div
        className="
          bg-[#3C6E71] px-8 sm:px-10 pt-8 sm:pt-10 pb-6 sm:pb-7 print:px-6 print:pt-5 print:pb-4
          **:text-white!
          [&_h2]:text-[#F4B942]!
          [&_svg]:text-[#F4B942]!
          [&_a]:text-[#F4B942]!
          [&_a:hover]:text-white!
          **:border-white/20!
          [&_.cursor-pointer:hover]:bg-white/10!
        "
      >
        <ClickableSection sectionKey="personalInfo">
          <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
        </ClickableSection>
      </div>

      {/* Body — gold underline on section headings via Tailwind descendant selectors */}
      <div
        className="
        px-8 sm:px-10 pb-8 sm:pb-10 pt-6 sm:pt-7 print:px-6 print:pb-6 print:pt-4
        [&_h2]:border-b-2! [&_h2]:border-[#F4B942]/60! [&_h2]:pb-1.5! [&_h2]:mb-3!
        print:[&_h2]:mb-2! print:[&_h2]:pb-1!
        "
      >
        <SortableSectionProvider>
          {(visibleSections) =>
            visibleSections.map((key) => {
              const Component = PREVIEW_COMPONENTS[key];
              // LIST_SECTIONS entries are click-to-edit at the item level, not section level
              return (
                <DraggablePreviewSection
                  key={key}
                  sectionKey={key}
                  wrapAsClickable={!LIST_SECTIONS.includes(key)}
                >
                  <Component {...{ [key]: resumeData[key] }} />
                </DraggablePreviewSection>
              );
            })
          }
        </SortableSectionProvider>
      </div>
    </div>
  );
}

export default ProfessionalTemplate;
