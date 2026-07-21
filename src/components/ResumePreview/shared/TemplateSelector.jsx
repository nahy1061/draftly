import { useResume } from "../../../context/ResumeContext";

// `available` flag exists for future templates — disabled + "(soon)" label when false
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
    <div className="flex flex-wrap gap-2 mb-4 print:hidden">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          disabled={!t.available}
          onClick={() => handleSelect(t.id)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
            resumeData.selectedTemplate === t.id
              ? "bg-indigo-600 dark:bg-indigo-500 text-white border-transparent"
              : "border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-400 dark:hover:border-indigo-500"
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