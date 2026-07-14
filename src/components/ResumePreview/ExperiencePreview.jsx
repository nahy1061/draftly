import { calculateDuration } from "../../utils/calculateDuration";
import { formatMonthYear } from "../../utils/formatDate";

const ExperiencePreview = ({ experience }) => {
  return (
    <div>
      {experience.length > 0 && (
        <div className="mt-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] dark:text-[#7FA8A3] mb-3">
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((entry) => (
              <div key={entry.id}>
                <div className="flex justify-between items-baseline">
                  <p className="font-medium">{entry.position}</p>
                  <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60">
                    {formatMonthYear(entry.startDate)} –{" "}
                    {entry.current ? "Present" : formatMonthYear(entry.endDate)}
                  </p>
                </div>
                <p className="text-sm text-[#3C6E71] dark:text-[#7FA8A3]">
                  {entry.company}
                </p>
                {entry.responsibilities && (
                  <p className="text-xs text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mt-1">
                    {entry.responsibilities}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencePreview;