import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SECTION_LABELS } from "../../utils/constants";

function SectionPickerRow({ sectionKey, skipped, done, onSelect, onToggleSkip }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: sectionKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 bg-white dark:bg-slate-900 transition-colors ${
        skipped ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 touch-none"
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
        <p className="font-medium text-sm">{SECTION_LABELS[sectionKey]}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {skipped ? "Skipped" : done ? "Added" : "Not started"}
        </p>
      </button>

      <button
        type="button"
        onClick={() => onToggleSkip(sectionKey)}
        className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
      >
        {skipped ? "Unskip" : "Skip"}
      </button>
    </div>
  );
}

export default SectionPickerRow;