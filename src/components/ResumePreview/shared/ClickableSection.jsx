import { useBuilderNav } from "../../../context/BuilderNavContext";

// Click preview section → jump to edit column (and switch mobile tab to edit)
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
      className="cursor-pointer rounded-lg transition-colors hover:bg-[#3C6E71]/5 -mx-2 px-2"
    >
      {children}
    </div>
  );
}

export default ClickableSection;
