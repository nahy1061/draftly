import { useBuilderNav } from "../../context/BuilderNavContext";
import { SECTION_LABELS } from "../../utils/constants";

function SectionNavControls() {
  const { activeSection, currentIndex, navOrder, isFirst, isLast, handlePrev, handleNext } =
    useBuilderNav();

  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={handlePrev}
        disabled={isFirst}
        className="px-5 py-2 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 disabled:opacity-30"
      >
        Previous
      </button>
      <span className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60 self-center">
        {SECTION_LABELS[activeSection]} ({currentIndex + 1} of {navOrder.length})
      </span>
      <button
        type="button"
        onClick={handleNext}
        disabled={isLast}
        className="px-5 py-2 rounded-full bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}

export default SectionNavControls;