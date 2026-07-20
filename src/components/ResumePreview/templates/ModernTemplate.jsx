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

function renderSection(key, resumeData, taggedForSidebar = false) {
  const Component = PREVIEW_COMPONENTS[key];
  const section = (
    <DraggablePreviewSection
      key={key}
      sectionKey={key}
      wrapAsClickable={!LIST_SECTIONS.includes(key)}
    >
      <Component {...{ [key]: resumeData[key] }} />
    </DraggablePreviewSection>
  );

  // Tag sidebar sections with their key so the CSS below can give
  // Skills/Languages/Interests three distinct looks even though they
  // all come from the same shared, pill-styled preview components.
  return taggedForSidebar ? (
    <div key={key} data-modern-key={key}>
      {section}
    </div>
  ) : (
    section
  );
}

function ModernTemplate() {
  const { resumeData } = useResume();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto print:max-w-none print:shadow-none print:rounded-none text-[#1C2541]">

      {/* ── Header ─────────────────────────────────────────────────────────
          CSS overrides scoped here so other templates using
          PersonalInfoPreview are completely unaffected:
            • h1  → larger, bolder name
            • img.rounded-full → gold ring on profile photo           */}
      <div
        className="
          px-8 sm:px-10 pt-8 sm:pt-10 pb-7
          [&_h1]:text-4xl! [&_h1]:font-bold! [&_h1]:leading-tight!
          [&_img.rounded-full]:ring-2! [&_img.rounded-full]:ring-[#F4B942]/55!
          [&_img.rounded-full]:ring-offset-2! [&_img.rounded-full]:ring-offset-white!
        "
      >
        <ClickableSection sectionKey="personalInfo">
          <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
        </ClickableSection>
      </div>

      {/* Gradient accent divider — richer than the old static yellow border */}
      <div className="h-0.75 bg-linear-to-r from-[#F4B942] via-[#3C6E71]/60 to-transparent" />

      <div className="flex flex-col sm:flex-row print:flex-row">

        {/* ── Sidebar ──────────────────────────────────────────────────────
            Slightly deeper tan (#E2D8C3 vs #EAE0CB) for more contrast.
            Section headings (h2) get a 2px teal left accent bar.
            Skill pills get a visible border on top of their bg tint.
            Languages → bulleted list, Interests → dot-separated inline. */}
        <div
          className="
            sm:w-1/3 bg-[#E2D8C3] p-6 sm:p-8
            border-b sm:border-b-0 sm:border-r border-[#1C2541]/15

            [&>*+*]:mt-6!

            [&_h2]:text-[10px]! [&_h2]:font-bold! [&_h2]:tracking-[0.18em]!
            [&_h2]:text-[#1C2541]/75! [&_h2]:mb-3! [&_h2]:uppercase!
            [&_h2]:pl-2.5! [&_h2]:border-l-2! [&_h2]:border-[#3C6E71]!
            [&_span]:text-xs!

            [&_[data-modern-key='languages']_.flex-wrap]:flex-col!
            [&_[data-modern-key='languages']_.flex-wrap]:items-start!
            [&_[data-modern-key='languages']_.flex-wrap]:gap-1.5!
            [&_[data-modern-key='languages']_span]:bg-transparent!
            [&_[data-modern-key='languages']_span]:text-[#1C2541]!
            [&_[data-modern-key='languages']_span]:font-medium!
            [&_[data-modern-key='languages']_span]:px-0!
            [&_[data-modern-key='languages']_span]:py-0!
            [&_[data-modern-key='languages']_span]:before:content-['•']!
            [&_[data-modern-key='languages']_span]:before:mr-2!
            [&_[data-modern-key='languages']_span]:before:text-[#3C6E71]!

            [&_[data-modern-key='interests']_span]:bg-transparent!
            [&_[data-modern-key='interests']_span]:text-[#1C2541]/60!
            [&_[data-modern-key='interests']_span]:px-0!
            [&_[data-modern-key='interests']_span]:py-0!
            [&_[data-modern-key='interests']_span]:after:content-['·']!
            [&_[data-modern-key='interests']_span]:after:ml-2!
            [&_[data-modern-key='interests']_span:last-child]:after:content-none!

            [&_[data-modern-key='skills']_span]:border!
            [&_[data-modern-key='skills']_span]:border-[#3C6E71]/25!
          "
        >
          <SortableSectionProvider allowedKeys={SIDEBAR_SECTIONS}>
            {(sidebarKeys) =>
              sidebarKeys.map((key) => renderSection(key, resumeData, true))
            }
          </SortableSectionProvider>
        </div>

        {/* ── Main column — everything else, own independent drag group */}
        <div className="sm:w-2/3 p-8 sm:p-10"
        >
          <SortableSectionProvider
            allowedKeys={resumeData.sectionOrder.filter(
              (k) => !SIDEBAR_SECTIONS.includes(k),
            )}
          >
            {(mainKeys) =>
              mainKeys.map((key) => renderSection(key, resumeData))
            }
          </SortableSectionProvider>
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate;
