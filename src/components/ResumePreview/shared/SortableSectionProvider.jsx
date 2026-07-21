import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSectionDragDrop } from "../../../hooks/useSectionDragDrop";

// Render-prop wrapper — children receive visibleSections for mapping
function SortableSectionProvider({ children, strategy = verticalListSortingStrategy, allowedKeys = null }) {
  const { sensors, handleDragEnd, visibleSections } = useSectionDragDrop(allowedKeys);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={visibleSections} strategy={strategy}>
        {children(visibleSections)}
      </SortableContext>
    </DndContext>
  );
}

export default SortableSectionProvider;