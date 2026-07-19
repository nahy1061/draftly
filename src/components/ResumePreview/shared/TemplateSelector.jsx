import { useResume } from "../../../context/ResumeContext";

const TEMPLATES = [
  { id: "professional", label: "Professional", available: true },
  { id: "modern", label: "Modern", available: true },
  { id: "minimal", label: "Minimal", available: true },
  { id: "ats", label: "ATS-Friendly", available: true },
];

function TemplateSelector() {
  const { resumeData, dispatch } = useResume();

  function handleSelect(id) {
    dispatch({ type: "SET_TEMPLATE", payload: id });
  }

  return (
    <div className="flex gap-2 mb-4 print:hidden">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          disabled={!t.available}
          onClick={() => handleSelect(t.id)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
            resumeData.selectedTemplate === t.id
              ? "bg-[#1C2541] dark:bg-[#F4B942] text-[#FAF8F3] dark:text-[#1C2541] border-transparent"
              : "border-[#1C2541]/20 dark:border-[#F2EFE9]/20 text-[#1C2541]/60 dark:text-[#F2EFE9]/60"
          }`}
        >
          {t.label}
          {!t.available ? " (soon)" : ""}
        </button>
      ))}
    </div>
  );
}

export default TemplateSelector;