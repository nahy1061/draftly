import { useResume } from "../../context/ResumeContext";
import { SECTION_LABELS } from "../../utils/constants";

// mode="fullscreen" -> the first-visit screen
// mode="modal"      -> reopenable overlay, same component either way
function SectionPicker({ onSelect, onClose, mode = "modal" }) {
  const { resumeData, dispatch } = useResume();
  const { sectionOrder, skippedSections } = resumeData;

  function isDone(key) {
    return resumeData[key].length > 0;
  }

  function toggleSkip(key) {
    dispatch({ type: "TOGGLE_SECTION_SKIP", payload: key });
  }

  // Swaps a section with its neighbor (direction: -1 = up, +1 = down)
  function moveSection(index, direction) {
    const newOrder = [...sectionOrder];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    dispatch({ type: "REORDER_SECTIONS", payload: newOrder });
  }

  function handleSelect(key) {
    onSelect(key);
    if (onClose) onClose();
  }

  const wrapperClass =
    mode === "fullscreen"
      ? "min-h-screen bg-[#FAF8F3] dark:bg-[#1C2541] text-[#1C2541] dark:text-[#F2EFE9] p-6 flex flex-col items-center justify-center"
      : "fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50";

  const cardClass =
    mode === "fullscreen"
      ? "w-full max-w-lg"
      : "w-full max-w-lg bg-[#FAF8F3] dark:bg-[#1C2541] rounded-2xl p-6 max-h-[80vh] overflow-y-auto";

  return (
    <div className={wrapperClass}>
      <div className={cardClass}>
        <h2 className="font-display text-2xl font-semibold mb-1">
          {mode === "fullscreen" ? "Let's build your resume" : "Jump to a section"}
        </h2>
        <p className="text-sm text-[#1C2541]/60 dark:text-[#F2EFE9]/60 mb-6">
          Choose what to fill first, skip sections you don't need, or reorder them.
        </p>

        {/* Personal Info — always first, not reorderable/skippable */}
        <button
          type="button"
          onClick={() => handleSelect("personalInfo")}
          className="w-full flex justify-between items-center border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-3 mb-2 text-left"
        >
          <span className="font-medium">Personal Info</span>
          <span className="text-xs text-[#1C2541]/40 dark:text-[#F2EFE9]/40">Always first</span>
        </button>

        <div className="space-y-2">
          {sectionOrder.map((key, index) => {
            const skipped = skippedSections.includes(key);
            const done = isDone(key);

            return (
              <div
                key={key}
                className={`flex items-center gap-2 border border-[#1C2541]/10 dark:border-[#F2EFE9]/10 rounded-lg p-3 ${
                  skipped ? "opacity-50" : ""
                }`}
              >
                <button type="button" onClick={() => handleSelect(key)} className="flex-1 text-left">
                  <p className="font-medium">{SECTION_LABELS[key]}</p>
                  <p className="text-xs text-[#1C2541]/50 dark:text-[#F2EFE9]/50">
                    {skipped ? "Skipped" : done ? "Added" : "Not started"}
                  </p>
                </button>

                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    className="text-xs px-1 disabled:opacity-20"
                    aria-label={`Move ${SECTION_LABELS[key]} up`}
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === sectionOrder.length - 1}
                    className="text-xs px-1 disabled:opacity-20"
                    aria-label={`Move ${SECTION_LABELS[key]} down`}
                  >
                    ▼
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSkip(key)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
                >
                  {skipped ? "Unskip" : "Skip"}
                </button>
              </div>
            );
          })}
        </div>

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