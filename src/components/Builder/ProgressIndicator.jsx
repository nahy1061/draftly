import { useResume } from "../../context/ResumeContext";

function ProgressIndicator() {
  const { resumeData } = useResume();
  const { sectionOrder, skippedSections, personalInfo } = resumeData;

  // Personal Info counts as "done" if the required field is filled
  const personalInfoDone = Boolean(personalInfo.fullName);

  // Only count sections that AREN'T skipped
  const eligibleSections = sectionOrder.filter((key) => !skippedSections.includes(key));

  const doneCount =
    (personalInfoDone ? 1 : 0) +
    eligibleSections.filter((key) => resumeData[key].length > 0).length;

  const totalCount = 1 + eligibleSections.length; // +1 for Personal Info

  const percent = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mb-1">
        <span>Progress</span>
        <span>
          {doneCount} of {totalCount} sections
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#1C2541]/10 dark:bg-[#F2EFE9]/10 overflow-hidden">
        <div
          className="h-full bg-[#F4B942] transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressIndicator;