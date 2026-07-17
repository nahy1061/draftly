import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSectionDragDrop } from "../../hooks/useSectionDragDrop";

// Every template wraps its section list in this.
// The DIFFERENCE between templates is entirely in `children` — a function that receives the ordered section keys    and decides how to arrange them (one column, a sidebar split, whatever).
// The drag machinery itself never changes.
function SortableSectionProvider({
  children,
  strategy = verticalListSortingStrategy,
}) {
  const { sensors, handleDragEnd, visibleSections } = useSectionDragDrop();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={visibleSections} strategy={strategy}>
        {children(visibleSections)}
      </SortableContext>
    </DndContext>
  );
}

export default SortableSectionProvider;
