import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import PersonalInfoForm from "../components/ResumeForm/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview/ResumePreview";
import EducationForm from "../components/ResumeForm/EducationForm";
import ExperienceForm from "../components/ResumeForm/ExperienceForm";
import ProjectsForm from "../components/ResumeForm/ProjectsForm";
import CertificationsForm from "../components/ResumeForm/CertificationsForm";
import LanguagesForm from "../components/ResumeForm/LanguagesForm";
import SkillsForm from "../components/ResumeForm/SkillsForm";
import InterestsForm from "../components/ResumeForm/InterestsForm";
import { useResume } from "../context/ResumeContext";
import { SECTION_LABELS } from "../utils/constants";
import SectionPicker from "../components/SectionPicker/SectionPicker";


// Lookup table: section key -> which form component to render for it.
// Defined outside the component so it's created once, not every render.
const SECTION_COMPONENTS = {
  personalInfo: PersonalInfoForm,
  education: EducationForm,
  experience: ExperienceForm,
  projects: ProjectsForm,
  certifications: CertificationsForm,
  languages: LanguagesForm,
  skills: SkillsForm,
  interests: InterestsForm,
};

function Builder() {
  // Controls which panel shows on mobile (Edit vs Preview tab)
  const [activeTab, setActiveTab] = useState("edit");

  const { resumeData, dispatch } = useResume();

  // The full click-through order: Personal Info always first, then
  // whatever order the other 7 sections are currently in
  // (resumeData.sectionOrder — reorderable via SectionPicker).
  const navOrder = ["personalInfo", ...resumeData.sectionOrder];

  // Which single section's form is currently showing in the Edit column
  const [activeSection, setActiveSection] = useState(navOrder[0]);

  // Whether the "Jump to Section" modal is currently open
  const [showPicker, setShowPicker] = useState(false);

  // Where activeSection sits inside navOrder, and whether we're at
  // either end (used to disable Previous/Next at the boundaries)
  const currentIndex = navOrder.indexOf(activeSection);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === navOrder.length - 1;

  function handleNext() {
    if (!isLast) setActiveSection(navOrder[currentIndex + 1]);
  }

  function handlePrev() {
    if (!isFirst) setActiveSection(navOrder[currentIndex - 1]);
  }

  // Called whenever a section is picked directly — from the label row,
  // or from SectionPicker (fullscreen or modal). Centralized here so
  // both entry points share the same "mark picker as seen" logic.
  function handlePickSection(key) {
    setActiveSection(key);
    if (!resumeData.hasSeenSectionPicker) {
      dispatch({ type: "MARK_PICKER_SEEN" });
    }
  }

  // The actual component to render for whichever section is active
  const ActiveFormComponent = SECTION_COMPONENTS[activeSection];

  // FIRST VISIT: if the picker hasn't been shown yet, show ONLY the
  // fullscreen picker — skip the normal Edit/Preview layout entirely.
  // Once a section is picked, hasSeenSectionPicker flips to true and
  // this component re-renders into the normal layout below.
  if (!resumeData.hasSeenSectionPicker) {
    return <SectionPicker mode="fullscreen" onSelect={handlePickSection} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] dark:bg-[#1C2541] text-[#1C2541] dark:text-[#F2EFE9]">
      {/* Top header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
        <Link to="/" className="font-display text-xl font-semibold">
          Draftly
        </Link>
        <ThemeToggle />
      </header>

      {/* Tab switcher — mobile only, hidden on desktop via md:hidden */}
      <div className="md:hidden flex border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "edit"
              ? "border-b-2 border-[#F4B942] text-[#1C2541] dark:text-[#F2EFE9]"
              : "text-[#1C2541]/40 dark:text-[#F2EFE9]/40"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === "preview"
              ? "border-b-2 border-[#F4B942] text-[#1C2541] dark:text-[#F2EFE9]"
              : "text-[#1C2541]/40 dark:text-[#F2EFE9]/40"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Main content: Edit column + Preview column, stacked on mobile,
         side-by-side on desktop (md:flex-row) */}
      <div className="flex flex-col md:flex-row">
        {/* ===== Edit column ===== */}
        <div
          className={`${
            activeTab === "edit" ? "block" : "hidden"
          } md:block flex-1 p-6`}
        >
          {/* Header row: "Editor" label + button to reopen the picker */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3]">
              Editor
            </h2>
            <button
              type="button"
              onClick={() => setShowPicker(true)}
              className="text-xs px-3 py-1.5 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
            >
              Reorder / Skip Sections
            </button>
          </div>

          {/* Section label row — click any label to jump straight to
             that section's form (bypasses Next/Prev stepping) */}
          <div className="flex flex-wrap gap-2 mb-6">
            {navOrder.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveSection(key)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeSection === key
                    ? "bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] border-transparent"
                    : "border-[#1C2541]/20 dark:border-[#F2EFE9]/20 text-[#1C2541]/60 dark:text-[#F2EFE9]/60"
                }`}
              >
                {SECTION_LABELS[key]}
              </button>
            ))}
          </div>

          {/* Only ONE form renders at a time — whichever matches
             activeSection */}
          <ActiveFormComponent />

          {/* Previous / status / Next controls */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className="px-5 py-2 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 disabled:opacity-30"
            >
              Previous
            </button>
            <span className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60 self-center">
              {SECTION_LABELS[activeSection]} ({currentIndex + 1} of {navOrder.length})
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={isLast}
              className="px-5 py-2 rounded-full bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>

        {/* ===== Preview column ===== */}
        <div
          className={`${
            activeTab === "preview" ? "block" : "hidden"
          } md:block flex-1 p-6 md:border-l-2 border-[#1C2541]/10 dark:border-[#F2EFE9]/10 bg-[#F1E9D8]/40 dark:bg-[#171F35]`}
        >
          <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3] mb-4">
            Live Preview
          </h2>
          <ResumePreview />
        </div>
      </div>

      {/* Modal picker — only exists in the DOM while showPicker is true.
         Same SectionPicker component as the fullscreen one, just a
         different `mode`, rendered as an overlay on top of everything. */}
      {showPicker && (
        <SectionPicker
          mode="modal"
          onSelect={handlePickSection}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}

export default Builder;