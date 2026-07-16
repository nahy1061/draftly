import { useResume } from "../../context/ResumeContext";

function ProgressIndicator() {
  const { resumeData } = useResume();
  const { sectionOrder, skippedSections, personalInfo } = resumeData;

  const personalInfoDone = Boolean(personalInfo.fullName);
  const eligibleSections = sectionOrder.filter((key) => !skippedSections.includes(key));

  const doneCount =
    (personalInfoDone ? 1 : 0) +
    eligibleSections.filter((key) => resumeData[key].length > 0).length;

  const totalCount = 1 + eligibleSections.length;

  // Build an array of totalCount slots, mark the first `doneCount` of
  // them as filled — regardless of WHICH specific sections are done.
  const segments = Array.from({ length: totalCount }, (_, i) => i < doneCount);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mb-2">
        <span>Progress</span>
        <span>
          {doneCount} of {totalCount} sections
        </span>
      </div>
      <div className="flex gap-1.5">
        {segments.map((filled, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              filled ? "bg-[#F4B942]" : "bg-[#1C2541]/10 dark:bg-[#F2EFE9]/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;