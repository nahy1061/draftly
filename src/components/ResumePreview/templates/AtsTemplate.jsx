import { useResume } from "../../../context/ResumeContext";
import ClickableSection from "../shared/ClickableSection";
import DraggablePreviewSection from "../shared/DraggablePreviewSection";
import SortableSectionProvider from "../shared/SortableSectionProvider";
import AtsPersonalInfo from "./AtsPersonalInfo";
import { PREVIEW_COMPONENTS } from "../previewComponentsMap";
import { LIST_SECTIONS } from "../../../utils/sectionMeta";

function AtsTemplate() {
  const { resumeData } = useResume();

  return (
    <div
      className="
        bg-white max-w-2xl mx-auto p-10 font-sans
        print:max-w-none print:p-0
        **:text-black!
        [&_h2]:text-sm! [&_h2]:font-bold! [&_h2]:uppercase! [&_h2]:tracking-wide!
        [&_h2]:border-b-2! [&_h2]:border-black! [&_h2]:pb-1! [&_h2]:mb-3!
        [&_span]:bg-transparent! [&_span]:p-0!
        [&_a]:underline!
      "
    >
      <ClickableSection sectionKey="personalInfo">
        <AtsPersonalInfo personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      <div className="mt-2 space-y-5">
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

export default AtsTemplate;
