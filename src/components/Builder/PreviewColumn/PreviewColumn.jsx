import { useRef } from "react";
import { useBuilderNav } from "../../../context/BuilderNavContext";
import ResumePreview from "../../ResumePreview/ResumePreview";
import PreviewColumnHeader from "./PreviewColumnHeader";

function PreviewColumn() {
  const { activeTab } = useBuilderNav();
  // printRef is passed down so PrintButton can target the unscaled resume node
  const printRef = useRef(null);
  return (
    <div
      className={`${activeTab === "preview" ? "block" : "hidden"} md:block print:block flex-1 p-6 md:border-l border-slate-200/50 dark:border-slate-800/50 bg-slate-100 dark:bg-[#080B13]/40 transition-colors duration-300`}
    >
      <PreviewColumnHeader printRef={printRef} />
      <ResumePreview printRef={printRef} />
    </div>
  );
}

export default PreviewColumn;
