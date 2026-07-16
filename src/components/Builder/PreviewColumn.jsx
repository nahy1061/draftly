import ResumePreview from "../ResumePreview/ResumePreview";
import PrintButton from "./PrintButton";

function PreviewColumn({ activeTab }) {
  return (
    <div
      className={`${
        activeTab === "preview" ? "block" : "hidden"
      } md:block print:block flex-1 p-6 md:border-l-2 border-[#1C2541]/10 dark:border-[#F2EFE9]/10 bg-[#F1E9D8]/40 dark:bg-[#171F35]`}
    >
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="hidden md:block font-mono-draft text-xs uppercase tracking-widest text-[#3C6E71] dark:text-[#7FA8A3]">
          Live Preview
        </h2>
        <PrintButton />
      </div>
      <ResumePreview />
    </div>
  );
}

export default PreviewColumn;