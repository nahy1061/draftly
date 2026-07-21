import { useResume } from "../../context/ResumeContext";
import CloseButton from "../CloseButton";
import SectionPickerRow from "./SectionPickerRow";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

function SectionPicker({ onSelect, onClose, mode = "modal", activeSection, onActiveSectionSkip }) {
  const { resumeData, dispatch } = useResume();
  const { sectionOrder, skippedSections } = resumeData;

  // Pointer + keyboard sensors for accessible drag reorder
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function isDone(key) {
    return resumeData[key].length > 0;
  }

  function toggleSkip(key) {
    const willBecomeSkipped = !skippedSections.includes(key);
    // Nav away first — can't stay on a section that's about to disappear
    if (willBecomeSkipped && key === activeSection && onActiveSectionSkip) {
      onActiveSectionSkip(key);
    }
    dispatch({ type: "TOGGLE_SECTION_SKIP", payload: key });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.indexOf(active.id);
    const newIndex = sectionOrder.indexOf(over.id);
    const newOrder = arrayMove(sectionOrder, oldIndex, newIndex);
    dispatch({ type: "REORDER_SECTIONS", payload: newOrder });
  }

  function handleSelect(key) {
    onSelect(key);
    if (onClose) onClose();
  }

  function handleOverlayClick(e) {
    // Only close when clicking the backdrop itself, not the card
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  }

  // fullscreen = onboarding flow on first visit; modal = opened from the edit column header
  const wrapperClass =
    mode === "fullscreen"
      ? "min-h-screen bg-[#FAFBFD] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 p-6 flex flex-col items-center justify-center transition-colors duration-300"
      : "fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in";

  const cardClass =
    mode === "fullscreen"
      ? "w-full max-w-lg"
      : "relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 max-h-[80vh] overflow-y-auto themed-scrollbar shadow-2xl";

  return (
    <div className={wrapperClass} onClick={mode === "modal" ? handleOverlayClick : undefined}>
      <div className={cardClass} onClick={(e) => e.stopPropagation()}>
        {mode === "modal" && <CloseButton onClick={onClose} />}

        <h2 className="font-display text-2xl font-bold mb-1">
          {mode === "fullscreen" ? "Let's build your resume" : "Jump to a section"}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Choose what to fill first, skip sections you don't need, or drag to reorder them.
        </p>

        <button
          type="button"
          onClick={() => handleSelect("personalInfo")}
          className="w-full flex justify-between items-center border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 mb-2 text-left hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
        >
          <span className="font-medium text-sm">Personal Info</span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Always first</span>
        </button>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {sectionOrder.map((key) => (
                <SectionPickerRow
                  key={key}
                  sectionKey={key}
                  skipped={skippedSections.includes(key)}
                  done={isDone(key)}
                  onSelect={handleSelect}
                  onToggleSkip={toggleSkip}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {mode === "fullscreen" ? (
          <button
            type="button"
            onClick={() => handleSelect("personalInfo")}
            className="w-full mt-6 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-600/10 active:scale-95 transition-all duration-200"
          >
            Start Building
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-6 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 px-5 py-2.5 rounded-xl transition-colors duration-200 font-medium"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default SectionPicker;