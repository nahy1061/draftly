import PersonalInfoForm from "../../ResumeForm/PersonalInfoForm";
import EducationForm from "../../ResumeForm/EducationForm";
import ExperienceForm from "../../ResumeForm/ExperienceForm";
import ProjectsForm from "../../ResumeForm/ProjectsForm";
import CertificationsForm from "../../ResumeForm/CertificationsForm";
import LanguagesForm from "../../ResumeForm/LanguagesForm";
import SkillsForm from "../../ResumeForm/SkillsForm";
import InterestsForm from "../../ResumeForm/InterestsForm";
import SectionNavPills from "./SectionNavPills";
import SectionNavControls from "./SectionNavControls";
import EditColumnHeader from "./EditColumnHeader";
import { useBuilderNav } from "../../../context/BuilderNavContext";
import { useSwipeNavigation } from "../../../hooks/useSwipeNavigation";

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

function EditColumn() {
  const { activeSection, activeTab, handleNext, handlePrev } = useBuilderNav();
  const ActiveFormComponent = SECTION_COMPONENTS[activeSection];

  const swipeHandlers = useSwipeNavigation(handleNext, handlePrev);

  return (
    <div
      {...swipeHandlers}
      className={`${
        activeTab === "edit" ? "block" : "hidden"
      } md:block print:hidden flex-1 p-6`}
    >
      <EditColumnHeader />
      <SectionNavPills />
      <ActiveFormComponent />
      <SectionNavControls />
    </div>
  );
}

export default EditColumn;
