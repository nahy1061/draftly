import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SECTION_LABELS } from "../../utils/constants";

function SectionPickerRow({ sectionKey, skipped, done, onSelect, onToggleSkip }) {
  // useSortable needs a unique `id` — we use the section key itself, since it's already unique per row.
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: sectionKey });

  // These two lines translate dnd-kit's internal drag state into real CSS
  // `transform` moves the row visually while dragging 
  // `transition` smooths it back into place once you drop it.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-3 bg-[#FAF8F3] dark:bg-[#1C2541] ${
        skipped ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-[#1C2541]/30 dark:text-[#F2EFE9]/30 touch-none"
        aria-label={`Drag to reorder ${SECTION_LABELS[sectionKey]}`}
      >
        ⠿
      </button>

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