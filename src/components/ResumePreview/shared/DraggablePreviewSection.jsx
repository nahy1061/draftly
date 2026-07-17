import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ClickableSection from "./ClickableSection";

function DraggablePreviewSection({
  sectionKey,
  children,
  wrapAsClickable = true,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sectionKey });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none", // let dnd-kit handle touch here, don't let the browser scroll it
  };

  const content = wrapAsClickable ? (
    <ClickableSection sectionKey={sectionKey}>{children}</ClickableSection>
  ) : (
    children
  );

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
}

export default DraggablePreviewSection;
