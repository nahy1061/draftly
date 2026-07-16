import { useBuilderNav } from "../../context/BuilderNavContext";

function SectionPickerButton() {
  const { setShowPicker } = useBuilderNav();

  return (
    <button
      type="button"
      onClick={() => setShowPicker(true)}
      className="text-xs px-3 py-1.5 rounded-full border border-[#1C2541]/20 dark:border-[#F2EFE9]/20"
    >
      Reorder / Skip Sections
    </button>
  );
}

export default SectionPickerButton;