import PersonalInfoForm from "../ResumeForm/PersonalInfoForm";
import EducationForm from "../ResumeForm/EducationForm";
import ExperienceForm from "../ResumeForm/ExperienceForm";
import ProjectsForm from "../ResumeForm/ProjectsForm";
import CertificationsForm from "../ResumeForm/CertificationsForm";
import LanguagesForm from "../ResumeForm/LanguagesForm";
import SkillsForm from "../ResumeForm/SkillsForm";
import InterestsForm from "../ResumeForm/InterestsForm";
import SectionNavPills from "./SectionNavPills";
import SectionNavControls from "./SectionNavControls";
import ResetButton from "./ResetButton";
import { useBuilderNav } from "../../context/BuilderNavContext";

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

function EditColumn({ activeTab }) {
  const { activeSection, setShowPicker } = useBuilderNav();
  const ActiveFormComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div
      className={`${
        activeTab === "edit" ? "block" : "hidden"
      } md:block print:hidden flex-1 p-6`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3]">
          Editor
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="text-xs px-3 py-1.5 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
          >
            Reorder / Skip Sections
          </button>
          <ResetButton />
        </div>
      </div>

      <SectionNavPills />
      <ActiveFormComponent />
      <SectionNavControls />
    </div>
  );
}

export default EditColumn;