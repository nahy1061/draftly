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
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
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
              filled ? "bg-indigo-600 dark:bg-indigo-500" : "bg-slate-200 dark:bg-slate-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressIndicator;