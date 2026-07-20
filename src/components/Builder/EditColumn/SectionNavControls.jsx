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
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirst}
        className="px-5 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-55/40 dark:hover:bg-slate-900/60 disabled:opacity-30 transition-all duration-200"
      >
        Previous
      </button>
      <span className="text-sm text-slate-500 dark:text-slate-400 self-center font-medium">
        {SECTION_LABELS[activeSection]} ({currentIndex + 1} of {navOrder.length}
        )
      </span>
      <button
        type="button"
        onClick={handleNext}
        disabled={isLast}
        className="px-5 py-2 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-30 active:scale-95 transition-all duration-200 font-medium"
      >
        Next
      </button>
    </div>
  );
}

export default SectionNavControls;
