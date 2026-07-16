import { formatMonthYear } from "../../utils/formatDate";
import ClickableSection from "./ClickableSection";

const CertificationsPreview = ({ certifications }) => {
  return (
    <div>
      {certifications.length > 0 && (
        <div className="mt-6">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] dark:text-[#7FA8A3] mb-3">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((entry) => (
              <ClickableSection key={entry.id} sectionKey="certifications" entryId={entry.id}>
              <div key={entry.id} className="flex justify-between items-baseline">
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-sm text-[#3C6E71] dark:text-[#7FA8A3]">
                    {entry.issuer}
                  </p>
                </div>
                <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60">
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