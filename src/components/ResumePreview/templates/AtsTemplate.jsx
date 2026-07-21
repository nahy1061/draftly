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
       bg-white w-2xl p-10 font-sans
        print:w-auto print:p-0
        **:text-black!
        [&_h2]:text-sm! [&_h2]:font-bold! [&_h2]:uppercase! [&_h2]:tracking-wide!
        [&_h2]:border-b-2! [&_h2]:border-black! [&_h2]:pb-1! [&_h2]:mb-2!
        [&_span]:bg-transparent! [&_span]:p-0!
        [&_span]:after:content-['|'] [&_span]:after:ml-1.5 [&_span:last-child]:after:content-none
        [&_[data-ats-key='skills']_span]:after:content-[','] [&_[data-ats-key='skills']_span]:after:ml-0 [&_[data-ats-key='skills']_span]:after:mr-1.5
        [&_a]:underline!
      "
    >
      <ClickableSection sectionKey="personalInfo">
        <AtsPersonalInfo personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      <div className="mt-2 space-y-2">
        <SortableSectionProvider>
          {(visibleSections) =>
            visibleSections.map((key) => {
              const Component = PREVIEW_COMPONENTS[key];
              const sectionContent = (
                <DraggablePreviewSection
                  key={key}
                  sectionKey={key}
                  wrapAsClickable={!LIST_SECTIONS.includes(key)}
                >
                  <Component {...{ [key]: resumeData[key] }} />
                </DraggablePreviewSection>
              );

              // Skills get comma separators; all other sections use the default pipe style
              return key === "skills" ? (
                <div key={key} data-ats-key="skills">
                  {sectionContent}
                </div>
              ) : (
                sectionContent
              );
            })
          }
        </SortableSectionProvider>
      </div>
    </div>
  );
}

export default AtsTemplate;