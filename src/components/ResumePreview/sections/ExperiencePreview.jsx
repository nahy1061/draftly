import { calculateDuration } from "../../../utils/calculateDuration";
import { formatMonthYear } from "../../../utils/formatDate";
import ClickableSection from "../shared/ClickableSection";

const ExperiencePreview = ({ experience }) => {
  return (
    <div>
      {experience.length > 0 && (
        <div className="mt-6 print:mt-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] mb-3 print:mb-1.5">
            Experience
          </h2>
          <div className="space-y-3 print:space-y-1.5">
            {experience.map((entry) => (
              <ClickableSection
                key={entry.id}
                sectionKey="experience"
                entryId={entry.id}
              >
                <div key={entry.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline gap-3">
                    <p className="font-medium min-w-0 flex-1">{entry.position}</p>
                    <p className="text-sm text-[#1C2541]/60 shrink-0 whitespace-nowrap">
                      {formatMonthYear(entry.startDate)} –{" "}
                      {entry.current
                        ? "Present"
                        : formatMonthYear(entry.endDate)}
                    </p>
                  </div>
                  <div className="flex justify-between items-baseline gap-3">
                    <p className="text-sm text-[#3C6E71] min-w-0 flex-1">{entry.company}</p>
                    <p className="text-xs font-mono-draft uppercase tracking-wide text-[#1C2541]/40 shrink-0 whitespace-nowrap">
                      {calculateDuration(
                        entry.startDate,
                        entry.current ? "" : entry.endDate,
                      )}
                    </p>
                  </div>
                  {entry.responsibilities && (
                    <p className="text-xs text-[#1C2541]/60 mt-1">
                      {entry.responsibilities}
                    </p>
                  )}
                </div>
              </ClickableSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperiencePreview;