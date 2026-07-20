import { useResume } from "../../../context/ResumeContext";
import { useBuilderNav } from "../../../context/BuilderNavContext";
import { SECTION_LABELS } from "../../../utils/constants";

function SectionNavPills() {
  const { resumeData } = useResume();
  const { navOrder, activeSection, setActiveSection } = useBuilderNav();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {navOrder
        .filter(
          (key) =>
            key === "personalInfo" || !resumeData.skippedSections.includes(key),
        )
        .map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveSection(key)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
              activeSection === key
                ? "bg-indigo-600 dark:bg-indigo-500 text-white border-transparent font-medium shadow-sm shadow-indigo-500/10"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-55/40 dark:hover:bg-slate-900/60"
            }`}
          >
            {SECTION_LABELS[key]}
          </button>
        ))}
    </div>
  );
}

export default SectionNavPills;
