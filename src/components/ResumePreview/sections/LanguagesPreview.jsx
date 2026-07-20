import ClickableSection from "../shared/ClickableSection";

const LanguagesPreview = ({ languages }) => {
  return (
    <div>
      {languages.length > 0 && (
        <div className="mt-6 print:mt-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[#3C6E71] mb-3 print:mb-1.5">
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((entry) => (
              <ClickableSection
                key={entry.id}
                sectionKey="languages"
                entryId={entry.id}
              >
                <span
                  key={entry.id}
                  className="text-sm bg-[#3C6E71]/10 text-[#3C6E71] px-3 py-1 rounded-full"
                >
                  {entry.name} · {entry.proficiency}
                </span>
              </ClickableSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagesPreview;