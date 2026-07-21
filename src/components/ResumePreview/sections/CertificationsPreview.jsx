import { formatMonthYear } from "../../../utils/formatDate";
import ClickableSection from "../shared/ClickableSection";

const CertificationsPreview = ({ certifications }) => {
  return (
    <div>
      {certifications.length > 0 && (
        <div className="mt-6 print:mt-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] mb-3 print:mb-1.5">
            Certifications
          </h2>
          <div className="space-y-3 print:space-y-1.5">
            {certifications.map((entry) => (
              <ClickableSection
                key={entry.id}
                sectionKey="certifications"
                entryId={entry.id}
              >
                <div
                  key={entry.id}
                  className="flex justify-between items-baseline gap-3 print:break-inside-avoid"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{entry.name}</p>
                    <p className="text-sm text-[#3C6E71]">{entry.issuer}</p>
                  </div>
                  <p className="text-sm text-[#1C2541]/60 shrink-0 whitespace-nowrap">
                    {formatMonthYear(entry.date)}
                  </p>
                </div>
              </ClickableSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsPreview;