import { useResume } from "../../context/ResumeContext";
import CertificationsPreview from "./CertificationsPreview";
import ClickableSection from "./ClickableSection";
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
    <div className="bg-white dark:bg-[#233256] rounded-lg shadow-lg p-8 sm:p-10 max-w-2xl mx-auto print:max-w-none print:shadow-none print:rounded-none text-[#1C2541] dark:text-[#F2EFE9]">
      <ClickableSection sectionKey="personalInfo">
        <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
      </ClickableSection>

      {resumeData.sectionOrder
        .filter((key) => !resumeData.skippedSections.includes(key))
        .map((key) => {
          const Component = PREVIEW_COMPONENTS[key];
          return (
            <ClickableSection key={key} sectionKey={key}>
              <Component {...{ [key]: resumeData[key] }} />
            </ClickableSection>
          );
        })}
    </div>
  );
}

export default ResumePreview;