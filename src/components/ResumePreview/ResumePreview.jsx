import { useResume } from "../../context/ResumeContext";
import CertificationsPreview from "./CertificationsPreview";
import EducationPreview from "./EducationPreview";
import ExperiencePreview from "./ExperiencePreview";
import InterestsPreview from "./InterestsPreview";
import LanguagesPreview from "./LanguagesPreview";
import PersonalInfoPreview from "./PersonalInfoPreview";
import ProjectsPreview from "./ProjectsPreview";
import SkillsPreview from "./SkillsPreview";

const PREVIEW_COMPONENTS = {
  education: EducationPreview,
  experience: ExperiencePreview,
  projects: ProjectsPreview,
  certifications: CertificationsPreview,
  languages: LanguagesPreview,
  skills: SkillsPreview,
  interests: InterestsPreview,
};

function ResumePreview() {
  const { resumeData } = useResume();

  return (
    <div className="bg-white dark:bg-[#233256] rounded-lg shadow-lg p-8 sm:p-10 max-w-2xl mx-auto text-[#1C2541] dark:text-[#F2EFE9]">
      <PersonalInfoPreview personalInfo={resumeData.personalInfo} />

      {resumeData.sectionOrder
        .filter((key) => !resumeData.skippedSections.includes(key))
        .map((key) => {
          const Component = PREVIEW_COMPONENTS[key];
          return <Component key={key} {...{ [key]: resumeData[key] }} />;
        })}
    </div>
  );
}

export default ResumePreview;
