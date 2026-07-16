import { useBuilderNav } from "../../context/BuilderNavContext";

// Wraps any preview section so clicking it jumps the Edit column to that section — and switches the mobile tab to "edit" too, since otherwise on mobile you'd change activeSection but still be staring at the Preview tab.
function ClickableSection({ sectionKey, entryId, children }) {
  const { handlePickSection, handlePickEntry, setActiveTab } = useBuilderNav();

  function handleClick() {
    if (entryId) {
      handlePickEntry(sectionKey, entryId);
    } else {
      handlePickSection(sectionKey);
    }
    setActiveTab("edit");
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg transition-colors hover:bg-[#3C6E71]/5 dark:hover:bg-[#7FA8A3]/5 -mx-2 px-2"
    >
      {children}
    </div>
  );
}

export default ClickableSection;
