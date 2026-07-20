import { useBuilderNav } from "../../../context/BuilderNavContext";

function SectionPickerButton() {
  const { setShowPicker } = useBuilderNav();

  return (
    <button
      type="button"
      onClick={() => setShowPicker(true)}
      className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
    >
      Reorder / Skip Sections
    </button>
  );
}

export default SectionPickerButton;
