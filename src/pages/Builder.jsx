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

// Maps a section key -> the actual form component to render for it.
// Lives outside the component so it isn't recreated every render.
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
  const [activeTab, setActiveTab] = useState("edit"); // "edit" | "preview"
  const { resumeData } = useResume();

  const navOrder = ["personalInfo", ...resumeData.sectionOrder];

  // Which of the 7 cycling sections is currently shown, Starts at whatever's first in sectionOrder.
  const [activeSection, setActiveSection] = useState(navOrder[0]);

  const currentIndex = navOrder.indexOf(activeSection);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === navOrder.length - 1;

  function handleNext() {
    if (!isLast) setActiveSection(navOrder[currentIndex + 1]);
  }

  function handlePrev() {
    if (!isFirst) setActiveSection(navOrder[currentIndex - 1]);
  }

  const ActiveFormComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="min-h-screen bg-[#FAF8F3] dark:bg-[#1C2541] text-[#1C2541] dark:text-[#F2EFE9]">
      {/* Top header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#1C2541]/10 dark:border-[#F2EFE9]/10">
        <Link to="/" className="font-display text-xl font-semibold">
          Draftly
        </Link>
        <ThemeToggle />
      </header>

      {/* Tab switcher — mobile only */}
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

      {/* Main content: form + preview */}
      <div className="flex flex-col md:flex-row">
        {/* Edit Section */}
        <div
          className={`${
            activeTab === "edit" ? "block" : "hidden"
          } md:block flex-1 p-6`}
        >
          <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3] mb-4">
            Editor
          </h2>

          {/* Section label row — click any label to jump straight to it */}
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

          {/* Only the active section's form renders here */}
          <ActiveFormComponent />

          {/* Next / Prev controls */}
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
              {SECTION_LABELS[activeSection]} ({currentIndex + 1} of{" "}
              {navOrder.length})
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

        {/* Preview Section */}
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
    </div>
  );
}

export default Builder;
