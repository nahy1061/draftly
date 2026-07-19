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
        bg-white max-w-2xl mx-auto p-10 text-black
        print:max-w-none print:p-0
        [&_h2]:text-sm! [&_h2]:font-bold! [&_h2]:uppercase! [&_h2]:tracking-normal! [&_h2]:text-black!
        [&_span]:bg-transparent! [&_span]:p-0! [&_span]:text-black!
        [&_a]:text-black! [&_a]:underline!
      "
    >
      {/* Deliberately NOT theme-aware (no dark: classes) — ATS output
         should always render as plain black-on-white, regardless of
         the app's own light/dark mode, since that's the safest,
         most universally readable format. */}

      <ClickableSection sectionKey="personalInfo">
        <AtsPersonalInfo personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      <div className="mt-4 space-y-6">
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