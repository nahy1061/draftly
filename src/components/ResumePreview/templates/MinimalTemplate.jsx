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
       bg-white w-2xl p-10 sm:p-14
        text-[#1C2541]
        print:w-auto print:p-0

        [&_h1]:text-4xl! [&_h1]:font-bold! [&_h1]:leading-none!

        [&_h2]:flex! [&_h2]:items-center! [&_h2]:gap-3!
        [&_h2]:text-[10px]! [&_h2]:font-semibold! [&_h2]:tracking-[0.2em]! [&_h2]:text-[#3C6E71]!
        [&_h2]:after:content-['']! [&_h2]:after:flex-1!
        [&_h2]:after:h-px! [&_h2]:after:bg-[#1C2541]/10!

        [&_span]:bg-transparent! [&_span]:p-0! [&_span]:text-[#1C2541]/70!

        [&_.space-y-3>div]:pb-3.5! [&_.space-y-3>div]:border-b! [&_.space-y-3>div]:border-[#1C2541]/8!
        [&_.space-y-3>div:last-child]:border-b-0! [&_.space-y-3>div:last-child]:pb-0!
      "
    >
      <ClickableSection sectionKey="personalInfo">
        <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      <div className="mt-8 space-y-6 print:mt-4 print:space-y-3">
        <SortableSectionProvider>
          {(visibleSections) =>
            visibleSections.map((key) => {
              const Component = PREVIEW_COMPONENTS[key];
              // LIST_SECTIONS get per-entry click handlers, not a whole-section wrapper
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

