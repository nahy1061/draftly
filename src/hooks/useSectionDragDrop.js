import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useResume } from "../context/ResumeContext";

// `allowedKeys` (optional) scopes this drag group to only a subset of
// sections — e.g. Modern template's sidebar vs main column, each
// getting their own independent drag zone. Without it, behaves exactly
// as before (all visible sections in one group).
export function useSectionDragDrop(allowedKeys = null) {
  const { resumeData, dispatch } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = resumeData.sectionOrder.indexOf(active.id);
    const newIndex = resumeData.sectionOrder.indexOf(over.id);
    const newOrder = arrayMove(resumeData.sectionOrder, oldIndex, newIndex);
    dispatch({ type: "REORDER_SECTIONS", payload: newOrder });
  }

  let visibleSections = resumeData.sectionOrder.filter(
    (key) => !resumeData.skippedSections.includes(key)
  );

  if (allowedKeys) {
    visibleSections = visibleSections.filter((key) => allowedKeys.includes(key));
  }

  return { sensors, handleDragEnd, visibleSections };
}