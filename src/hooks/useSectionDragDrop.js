import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useResume } from "../context/ResumeContext";

// Optional allowedKeys scopes drag to a subset (e.g. Modern template sidebar vs main column)
export function useSectionDragDrop(allowedKeys = null) {
  const { resumeData, dispatch } = useResume();

  const sensors = useSensors(
    // delay + tolerance so a tap on mobile doesn't accidentally start a drag
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