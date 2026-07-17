import { useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useResume } from "../context/ResumeContext";

// Every template shares this SAME drag logic — they only differ in
// how sections are visually ARRANGED, not in how reordering works.
// Pulling this out once means we're not rebuilding sensors/handleDragEnd
// three times as we add templates.
export function useSectionDragDrop() {
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

  const visibleSections = resumeData.sectionOrder.filter(
    (key) => !resumeData.skippedSections.includes(key)
  );

  return { sensors, handleDragEnd, visibleSections };
}