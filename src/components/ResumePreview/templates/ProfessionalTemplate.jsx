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
    <div className="bg-white dark:bg-[#233256] rounded-lg shadow-lg p-8 sm:p-10 max-w-2xl mx-auto print:max-w-none print:shadow-none print:rounded-none text-[#1C2541] dark:text-[#F2EFE9]">
      <ClickableSection sectionKey="personalInfo">
        <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      <SortableSectionProvider>
        {(visibleSections) =>
          visibleSections.map((key) => {
            const Component = PREVIEW_COMPONENTS[key];
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
  );
}

export default ProfessionalTemplate;
