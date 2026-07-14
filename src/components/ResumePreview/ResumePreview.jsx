import { useResume } from "../../context/ResumeContext";
import CertificationsPreview from "./CertificationsPreview";
import EducationPreview from "./EducationPreview";
import ExperiencePreview from "./ExperiencePreview";
import PersonalInfoPreview from "./PersonalInfoPreview";
import ProjectsPreview from "./ProjectsPreview";

function ResumePreview() {
  const { resumeData } = useResume();

  return (
    <div className="bg-white dark:bg-[#233256] rounded-lg shadow-lg p-8 sm:p-10 max-w-2xl mx-auto text-[#1C2541] dark:text-[#F2EFE9]">
      <PersonalInfoPreview personalInfo={resumeData.personalInfo} />
      <EducationPreview education={resumeData.education} />
      <ExperiencePreview experience={resumeData.experience} />
      <ProjectsPreview projects={resumeData.projects} />
      <CertificationsPreview certifications={resumeData.certifications} />
    </div>
  );
}

export default ResumePreview;