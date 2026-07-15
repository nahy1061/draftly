import { SECTION_LABELS } from "../../utils/constants";

function SectionNavPills({ navOrder, activeSection, skippedSections, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {navOrder
        .filter((key) => key === "personalInfo" || !skippedSections.includes(key))
        .map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeSection === key
                ? "bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] border-transparent"
                : "border-[#1C2541]/20 dark:border-[#F2EFE9]/20 text-[#1C2541]/60 dark:text-[#F2EFE9]/60"
            }`}
          >
            {SECTION_LABELS[key]}
          </button>
        ))}
    </div>
  );
}

export default SectionNavPills;