import EditColumn from "./EditColumn/EditColumn";
import PreviewColumn from "./PreviewColumn/PreviewColumn";
import { useBuilderNav } from "../../context/BuilderNavContext";

// Mobile-only tab switcher — desktop shows edit + preview side by side
function BuilderMain() {
  const { activeTab, setActiveTab } = useBuilderNav();

  return (
    <>
      <div className="print:hidden md:hidden flex border-b border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "edit"
              ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "preview"
              ? "border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          Preview
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <EditColumn />
        <PreviewColumn />
      </div>
    </>
  );
}

export default BuilderMain;