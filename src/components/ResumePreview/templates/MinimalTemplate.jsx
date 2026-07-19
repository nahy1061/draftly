import { useResume } from "../../../context/ResumeContext";
import DraggablePreviewSection from "../shared/DraggablePreviewSection";
import SortableSectionProvider from "../shared/SortableSectionProvider";
import PersonalInfoPreview from "../sections/PersonalInfoPreview";
import { PREVIEW_COMPONENTS } from "../previewComponentsMap";
import { LIST_SECTIONS } from "../../../utils/sectionMeta";
import ClickableSection from "../shared/ClickableSection";

function MinimalTemplate() {
  const { resumeData } = useResume();

  return (
    <div
      className="
        bg-white max-w-2xl mx-auto p-10 sm:p-14
        text-[#1C2541]
        print:max-w-none print:p-0
        [&_h2]:text-[10px]! [&_h2]:font-normal! [&_h2]:tracking-[0.2em]! [&_h2]:text-[#1C2541]/40!
        [&_span]:bg-transparent! [&_span]:p-0! [&_span]:text-[#1C2541]/70!
      "
    >
      <ClickableSection sectionKey="personalInfo">
        <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      <div className="mt-10 space-y-8">
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
    </div>
  );
}

export default MinimalTemplate;
