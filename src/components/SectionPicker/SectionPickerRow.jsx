import { SECTION_LABELS } from "../../utils/constants";

function SectionPickerRow({
  sectionKey,
  index,
  isLast,
  skipped,
  done,
  onSelect,
  onMove,
  onToggleSkip,
}) {
  return (
    <div
      className={`flex items-center gap-2 border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-3 ${
        skipped ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(sectionKey)}
        disabled={skipped}
        className={`flex-1 text-left ${skipped ? "cursor-not-allowed" : ""}`}
      >
        <p className="font-medium">{SECTION_LABELS[sectionKey]}</p>
        <p className="text-xs text-[#1C2541]/50 dark:text-[#F2EFE9]/50">
          {skipped ? "Skipped" : done ? "Added" : "Not started"}
        </p>
      </button>

      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => onMove(index, -1)}
          disabled={index === 0}
          className="text-xs px-1 disabled:opacity-20"
          aria-label={`Move ${SECTION_LABELS[sectionKey]} up`}
        >
          ▲
        </button>
        <button
          type="button"
          onClick={() => onMove(index, 1)}
          disabled={isLast}
          className="text-xs px-1 disabled:opacity-20"
          aria-label={`Move ${SECTION_LABELS[sectionKey]} down`}
        >
          ▼
        </button>
      </div>

      <button
        type="button"
        onClick={() => onToggleSkip(sectionKey)}
        className="text-xs px-3 py-1.5 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
      >
        {skipped ? "Unskip" : "Skip"}
      </button>
    </div>
  );
}

export default SectionPickerRow;