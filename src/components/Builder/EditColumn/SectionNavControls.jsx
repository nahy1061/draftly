import { useBuilderNav } from "../../../context/BuilderNavContext";
import { SECTION_LABELS } from "../../../utils/constants";

function SectionNavControls() {
  const {
    activeSection,
    currentIndex,
    navOrder,
    isFirst,
    isLast,
    handlePrev,
    handleNext,
  } = useBuilderNav();

  return (
    <div className="flex items-center justify-between gap-2 mt-8">
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirst}
        className="shrink-0 px-3 sm:px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-55/40 dark:hover:bg-slate-900/60 disabled:opacity-30 transition-all duration-200"
      >
        Previous
      </button>
      <span className="min-w-0 flex-1 text-center truncate text-xs sm:text-sm text-slate-500 dark:text-slate-400 self-center font-medium">
        {SECTION_LABELS[activeSection]} ({currentIndex + 1} of {navOrder.length}
        )
      </span>
      <button
        type="button"
        onClick={handleNext}
        disabled={isLast}
        className="shrink-0 px-3 sm:px-5 py-2 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-30 active:scale-95 transition-all duration-200 font-medium"
      >
        Next
      </button>
    </div>
  );
}

export default SectionNavControls;
