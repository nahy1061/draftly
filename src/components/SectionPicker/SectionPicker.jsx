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

  // Sensors = what kinds of input can start a drag. Pointer covers mouse + touch. 
  // Keyboard sensor makes dragging accessible via Tab-to-focus + arrow keys, not just pointer devices.
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function isDone(key) {
    return resumeData[key].length > 0;
  }

  function toggleSkip(key) {
    const willBecomeSkipped = !skippedSections.includes(key);
    if (willBecomeSkipped && key === activeSection && onActiveSectionSkip) {
      onActiveSectionSkip(key);
    }
    dispatch({ type: "TOGGLE_SECTION_SKIP", payload: key });
  }

  // Called when a drag finishes. `active` = the item that was dragged, `over` = whatever it was dropped on top of.
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return; // dropped on itself, or outside — no change

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
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  }

  const wrapperClass =
    mode === "fullscreen"
      ? "min-h-screen bg-[#FAF8F3] dark:bg-[#1C2541] text-[#1C2541] dark:text-[#F2EFE9] p-6 flex flex-col items-center justify-center"
      : "fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50";

  const cardClass =
    mode === "fullscreen"
      ? "w-full max-w-lg"
      : "relative w-full max-w-lg bg-[#FAF8F3] dark:bg-[#1C2541] rounded-2xl p-6 max-h-[80vh] overflow-y-auto themed-scrollbar";

  return (
    <div className={wrapperClass} onClick={mode === "modal" ? handleOverlayClick : undefined}>
      <div className={cardClass} onClick={(e) => e.stopPropagation()}>
        {mode === "modal" && <CloseButton onClick={onClose} />}

        <h2 className="font-display text-2xl font-semibold mb-1">
          {mode === "fullscreen" ? "Let's build your resume" : "Jump to a section"}
        </h2>
        <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mb-6">
          Choose what to fill first, skip sections you don't need, or drag to reorder them.
        </p>

        <button
          type="button"
          onClick={() => handleSelect("personalInfo")}
          className="w-full flex justify-between items-center border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-3 mb-2 text-left"
        >
          <span className="font-medium">Personal Info</span>
          <span className="text-xs text-[#1C2541]/40 dark:text-[#F2EFE9]/40">Always first</span>
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
            className="w-full mt-6 bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] px-5 py-2.5 rounded-full font-medium"
          >
            Start Building
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-6 border border-[#1C2541]/20 dark:border-[#F2EFE9]/20 px-5 py-2.5 rounded-full"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default SectionPicker;