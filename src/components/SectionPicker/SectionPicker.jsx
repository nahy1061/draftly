import { useResume } from "../../context/ResumeContext";
import CloseButton from "../CloseButton";
import SectionPickerRow from "./SectionPickerRow";
import penLogo from "../../assets/logo/pen-logo.png";
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
      ? "relative min-h-screen bg-[#FAFBFD] dark:bg-[#0B0F19] bg-[radial-gradient(at_top_right,rgba(99,102,241,0.08),transparent_50%),radial-gradient(at_bottom_left,rgba(139,92,246,0.05),transparent_50%)] dark:bg-[radial-gradient(at_top_right,rgba(99,102,241,0.15),transparent_40%),radial-gradient(at_bottom_left,rgba(139,92,246,0.10),transparent_40%)] text-slate-900 dark:text-slate-100 p-6 flex flex-col items-center justify-center transition-colors duration-300 overflow-hidden"
      : "fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in";

  const cardClass =
    mode === "fullscreen"
      ? "relative z-10 w-full max-w-lg bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none animate-fade-in"
      : "relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 max-h-[80vh] overflow-y-auto themed-scrollbar shadow-2xl";

  return (
    <div className={wrapperClass} onClick={mode === "modal" ? handleOverlayClick : undefined}>

      {/* Decorative background blobs — fullscreen only, pointer-events-none so they don't interfere */}
      {mode === "fullscreen" && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:1.5s]" />
          <div className="absolute top-[40%] left-[10%] w-48 h-48 bg-indigo-300/8 dark:bg-indigo-400/8 rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      <div className={cardClass} onClick={(e) => e.stopPropagation()}>
        {mode === "modal" && <CloseButton onClick={onClose} />}

        {/* Logo + brand mark — only shown on the onboarding fullscreen */}
        {mode === "fullscreen" && (
          <div className="flex items-center gap-2.5 mb-6">
            <img src={penLogo} alt="Draftly" className="h-7 w-7 object-contain dark:invert" />
            <span className="font-display text-lg font-bold tracking-tight bg-linear-to-r from-slate-900 via-indigo-950 to-indigo-900 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Draftly
            </span>
          </div>
        )}

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
